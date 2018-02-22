$(function(){
	//全选
	$("#checkAll").click(function(){
		if($(this).hasClass("liactive")){
		     $(this).removeClass("liactive");
		     $(".tabul").find(".tabli").removeClass("liactive");
		     $(".tabul").find("input:checkbox").prop("checked", false);
		     $("#panuplode").addClass("disabled");
			 $("#pandele").addClass("disabled");
			 $("#panmove").addClass("disabled");
		}else{
			$(this).addClass("liactive");
			$(".tabul").find(".tabli").addClass("liactive");
		    $(".tabul").find("input:checkbox").prop("checked", true);
			var liss=$(".tabul").find("li.liactive");
			if(liss.length>0){
				$("#panuplode").removeClass("disabled");
				$("#pandele").removeClass("disabled");
				$("#panmove").removeClass("disabled");
			}
		}
	});
	
	//公众号combo
	$("#oacombo").jeasycombo({
		multiple : true,//是否多选
		dlgwidth:800,
		type : "list",//弹出的样式
		url:"wUser/queryOAUnitID.do",
		onChange:function(ids,texts){
			upToWeiXin(ids);
		}
	});
	
	//查询
	$(".divright li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var groupid=$(".divright ul").find(".active");
		$(".groupname").find(".gname").html(groupid.find("span").html());
		$(".groupname").find(".gcount").html(groupid.find("em").html());
		$("#groupid").val(groupid.attr("gnum"));
		search(15,1);
	});
	
	//上传图片
	$("#evaluaImg").jeasyupload({
		url:"upload_richtext_multiple_json.do",
		multiple:false,//是否多选
		btn:$("#btn"),
		parent:$("#jboot-upload"),
		customImg:function(i,file,o){
			var div = $("<img style='width:70px;height:70px;padding:5px;margin:10px;' />");
			div.attr("src",file["url"]);
			div.attr("relativeurl",file["relativeurl"]);
			$("#result").val(file["url"]);
			if(file["error"]===0){
				var groupid=$(".divright ul").find(".active").attr("gnum");
				$.ajax({
					dataType:'JSON',
					type : 'post',
					url : 'mater/insertMatInfo.do',
					data:{
							jsonStr:JSON.stringify({
							name:file["ffilename"],
							url:file["relativeurl"],
							type:0,
							mgroupid:groupid,
							fremark:"",
						    }),
						    type:0
					   },
					dataType : "json",
					success : function(data){
						if(data.error){
							$.messager.alert("提示",data.info,"error");
						}else{
							$.messager.alert("提示",data.info,"info");
							//成功之后修改数量
							chengeCount("+1",1);
							refresh();
						}
					}
				});
			}
		}
	});
	
	//批量移动分组
	$("#panmove").tooltip({
		showEvent:"click",
		hideEvent:"no",
		position: 'bottom',    
		content : panmove_content,
		onShow : function(){
			$("#panmove").tooltip("update",panmove_content);
		}
	});
	
	//批量删除
	$("#pandele").tooltip({
		showEvent:"click",
		hideEvent:"no",
		position: 'bottom',    
		content : pandele_content,
		onShow : function(){
			$("#pandele").tooltip("update",pandele_content);
		}
	});
	
});

//查询数据
function search(pageSize,pageNo){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
		dataType : "json",
		url : 'mater/getMatInfo.do',
		data:{ 
			jsonobj : "{fmgrouptype:"+$("#groupid").val()+",type:0}",
			pageSize : pageSize,
			pageNo : pageNo
		},
		success : function(data){
			ajaxPageSuccess(data);
			$(".pageNum").html(pageNo+"/"+Math.ceil(data.total/pageSize));
			$.messager.progress("close");//隐藏加载中
		},
		error : function() {
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示","请求出错!", "error");
		}
	});
}

//添加数据
function ajaxPageSuccess(data,type){
	var html="";
	var tbody = $(".tabul");
	var path = tbody.attr("path");
	tbody.empty();
	//左侧数据
	$(data.rows).each(function(){
		var uploadedIMG = "";
		if(this.oaid!=0){
			uploadedIMG+="<span style='position: absolute; top: 0px;left: 0px;border-radius: 25px;'><img style='width:50px;height:25px;' src='template/red/wx/img/uploaded.png'/></span>";
		}
		html+='<li class="tabli" >'
         +'<div class="divbottom_li" style="position: relative; top: 0px;left: 0px">'
         +uploadedIMG
           +'<img src="'+path+this.furl+'"/>'
           +'<span class="divbottom_span">'
             +'<label class="check">'
               +'<input type="checkbox" fid="'+this.fid+'" fname="'+this.fname+'" src="'+this.furl+'" ftype='+this.ftype+' />'
               +'<span class="bottomName" fid='+this.fid+'>'+this.fname+'</span>'
             +'</label>'
           +'</span>'
         +'</div>'
         +'<div class="itembtn">'
	         +'<span class="gedit normal" title="编辑"></span>'
	         +'<span class="gmove normal" title="移动分组"></span>'
	         +'<span class="gdel normal" title="删除"></span>'
	         +'<span class="gupdown normal" title="上传至微信"></span>'
         +'</div>'
         +'</li>';
	});
	tbody.append(html);

	//编辑
	$(".itembtn .normal[title='编辑']").tooltip({
		showEvent:"click",
		hideEvent:"no",
		position: 'bottom',    
		content:function (){
			   var ediCon=$(this).parents(".tabli").find(".divbottom_span span").html();
			   var fid=$(this).parents(".tabli").find(".divbottom_span span").attr("fid");
			   return "<div class='popcon'><div class='poptitle'><label>编辑名称</label><input type='text' value='"+ediCon+"' fid='"+fid+"' style='display:block;' class='validatebox-text name-text'/></div><div class='popbottom'><a class='l-btn l-btn-small' onclick='popsure(1,this)' href='javascript:;'>确定</a><a onclick='popcancel(this)' class='l-btn l-btn-small' href='javascript:;'>取消</a></div></div>";
		}
	}).attr("title","编辑");
	
	//移动分组
	$(".itembtn .normal[title='移动分组']").tooltip({
		showEvent:"click",
		hideEvent:"no",
		position: 'bottom',    
		content:function (){
			var html="";
			var groupid=$(".divright li"); 
			var groupActid=$(".divright ul").find(".active").attr("gnum");
			var fid=$(this).parents(".tabli").find(".divbottom_span span").attr("fid");
			html="<div class='popcon'><div class='poptitle'>";
			$(groupid).each(function(){
				if(groupActid!=$(this).attr("gnum")){
					html+="<div class='groupedi' oldgroupid="+groupActid+"><input style='height:0;' type='radio' name='group'fid="+fid+" groupid='"+$(this).attr("gnum")+"'/>"+$(this).find("span").text()+"</div>";
				}
			});
			html+="</div><div class='popbottom'><a class='l-btn l-btn-small' onclick='popsure(2,this)' href='javascript:;'>确定</a><a onclick='popcancel(this)' class='l-btn l-btn-small' href='javascript:;'>取消</a></div></div>";
			return html;    
		 }
	}).attr("title","移动分组");
	
	//删除
	$(".itembtn .normal[title='删除']").tooltip({
		showEvent:"click",
		hideEvent:"no",
		position: 'bottom',    
		content:function (){
			  var html="";
			   var fid=$(this).parents(".tabli").find(".divbottom_span span").attr("fid");
			   var groupid=$(".divright ul").find(".active").attr("gnum");
			   html="<div class='popcon'><div class='poptitle' fid="+fid+" groupid="+groupid+">确定删除此素材吗？</div><div class='popbottom'><a class='l-btn l-btn-small' onclick='popsure(3,this)' href='javascript:;'>确定</a><a onclick='popcancel(this)' class='l-btn l-btn-small' href='javascript:;'>取消</a></div></div>";
			  return html;    
		 }
	}).attr("title","删除");
	
	//上传至微信
	$(".itembtn .normal[title='上传至微信']").click(function(){
		var fid=$(this).parents(".tabli").find(".divbottom_span span").attr("fid");
		var fname=$(this).parents(".tabli").attr("name");
		var furl=$(this).parents(".tabli").find(".divbottom_li img").attr("src");
		singleUpload = {
			 type:'image', 
			 fileUrl:furl,
			 fileName:fname,
			 FMaterialsID:fid
		};
		$("#ismultiple").val(0);
		//console.log(JSON.stringify(singleUpload));
		$("#oacombo").jeasycombo("show");
	});
	
	//全选去掉
	$("#checkAll").removeClass("liactive");
	
	//绑定点击复选框时关闭弹出框
	$(".tabul").find("input").click(function(){
		$(".tooltip").hide();
	});
}
//批量移动分组,生成弹出内容
function panmove_content(){
	var html="";
	var groupid=$(".divright li"); 
	var groupActid=$(".divright ul").find(".active").attr("gnum");
	//选中的数据
	var actives=$(".tabul").find("input:checked");
	var values = actives.map(function(){
		return $(this).attr("fid");
	}).get().join(",");
	
	html="<div class='popcon'><div class='poptitle'>";
	$(groupid).each(function(){
		if(groupActid!=$(this).attr("gnum")){
			html+="<div class='groupedi' oldgroupid="+groupActid+"><input style='height:0;' type='radio' name='group' fid='"+values+"' groupid='"+$(this).attr("gnum")+"'/>"+$(this).find("span").text()+"</div>";
		}
	});
	html+="</div><div class='popbottom'><a class='l-btn l-btn-small' onclick='popsure(2,this)' href='javascript:;'>确定</a><a onclick='popcancel(this)' class='l-btn l-btn-small' href='javascript:;'>取消</a></div></div>";
	return html;   
}

//批量删除,生成弹出内容
function pandele_content(){
	var html="";
	//选中的状态
	var actives=$(".tabul").find("input:checked");
	var values = actives.map(function(){
		return $(this).attr("fid");
	}).get().join(",");
	console.log(values);
	var groupid=$(".divright ul").find(".active").attr("gnum");;
	html="<div class='popcon'><div class='poptitle' fid='"+values+"' groupid="+groupid+">确定删除此素材吗？</div><div class='popbottom'><a class='l-btn l-btn-small' onclick='popsure(3,this)' href='javascript:;'>确定</a><a onclick='popcancel(this)' class='l-btn l-btn-small' href='javascript:;'>取消</a></div></div>";
	return html;    
}

//确定
function popsure(type,obj){
	switch(type){
	case 1://编辑
		var name=$(obj).parents(".popcon").find("input").val();
		var fid=$(obj).parents(".popcon").find("input").attr("fid");
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			dataType:'JSON',
			type : 'post',
			url : 'mater/updateMatInfo.do',
			data:{
					name:name,
					fid:fid
			   },
			dataType : "json",
			success : function(data){
				$.messager.progress("close");//隐藏加载中
				if(data.error){
					$.messager.alert("提示",data.info,"error");
				}else{
					$.messager.alert("提示",data.info,"info");
					refresh();
				}
			}
		});
		break;
	case 2://分组
		var value=$("input[name='group']:checked");
		var fid=$(obj).parents(".popcon").find("input").attr("fid");
		var oldgroupid=$(obj).parents(".popcon").find(".groupedi").attr("oldgroupid");
		if(!value.attr("groupid")){
			$.messager.alert("提示","请选择分组","error");
			return false;
		}
		if(fid==""){
			$.messager.alert("提示","请至少选择一条数据","error");
			return false;
		}
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			dataType:'JSON',
			type : 'post',
			url : 'mater/moveMatGroup.do',
			data:{
				 fId:value.attr("fid"),
				 newgroup:value.attr("groupid"),
				 oldgroupId:oldgroupid
			   },
			dataType : "json",
			success : function(data){
				$.messager.progress("close");//隐藏加载中
				if(data.error){
					$.messager.alert("提示",data.info,"error");
				}else{
					$.messager.alert("提示",data.info,"info");
					chengeCount("+"+value.attr("groupid").split(",").length,2,value.attr("groupid"));
					chengeCount("-"+value.attr("groupid").split(",").length,1);
					refresh();
				}
			}
		});
		break;
	case 3://删除
		var fid=$(obj).parents(".popcon").find(".poptitle").attr("fid");
		var groupid=$(obj).parents(".popcon").find(".poptitle").attr("groupid");
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			dataType:'JSON',
			type : 'post',
			url : 'mater/delMatInfo.do',
			data:{fId:fid,groupid:groupid},
			dataType : "json",
			success : function(data){
				$.messager.progress("close");//隐藏加载中
				if(data.error){
					$.messager.alert("提示",data.info,"error");
				}else{
					$.messager.alert("提示",data.info,"info");
					chengeCount("-"+fid.split(",").length,1);
					refresh();
				}
			}
		});
		break;
	case 4://上传
		break;
	}
	$(".tooltip").hide();
}
//取消
function popcancel(obj){
	$(".tooltip").hide();
}

//修改数量
function chengeCount(count,type,old){
	var groupid="";
	if(type==1){
	  groupid=$(".divright ul").find(".active");
	}else if(type==2){
	  groupid=$(".divright ul").find("li[gnum="+old+"]");
	}
	var spancount=groupid.find("em").attr("count");
	var chengeNum=parseInt(spancount)+parseInt(count);
	groupid.find("em").html("("+chengeNum+")").attr("count",chengeNum);
	$(".groupname").find(".gcount").html("("+chengeNum+")");
}

var singleUpload = {};
//上传至微信
function upToWeiXin(ids){
	var ismultiple = $("#ismultiple").val();
	//选中的状态
	var array = new Array();
	if(ismultiple==1){
		var actives=$(".tabul").find("input:checked");
		actives.each(function(){
			var $this = $(this);
			var type = $this.attr("ftype");
			array.push({
				fileUrl : $this.attr("src"),
				fileName : $this.attr("fname"),
				FMaterialsID : $this.attr("fid"),
				// 图片=0,视频=1,语音     目前不支持视频和语音
				type : type=="0"?"image":type,
				FOAID : ids
			});
		});
	}else{
		//其他的值在点击按钮时赋值
		singleUpload.FOAID=ids;
		array.push(singleUpload);
	}
	
	//console.log(ismultiple+"_"+array.length+"_"+JSON.stringify(array));
	//return;
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
		dataType : "json",
		url : 'mater/upWxInfo.do?type=99',
		data:{ params : JSON.stringify(array) },
		success : function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.error){
				$.messager.alert("提示",data.info,"error");
			}else{
				$.messager.alert("提示",data.info,"info");
				refresh();
			}
		}
	});
}

//批量上传
function upToWeiXinMultiple(){
	$("#ismultiple").val(1);
	singleUpload={};
	//console.log(JSON.stringify(singleUpload));
	$("#oacombo").jeasycombo("show");
}

//上一页
function prePage(obj){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	//var totalPageNum = parseInt(page[1]);
	var pageSize = 15;
	if(nowPageNum==1){
		$.messager.alert("提示","已是第一页咯!", "info");
		return;
	}else{
		nowPageNum--;
	}
	search(pageSize,nowPageNum);
}

//下一页
function nextPage(obj){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	var totalPageNum = parseInt(page[1]);
	var pageSize = 15;
	if(nowPageNum==totalPageNum){
		$.messager.alert("提示","已是最后一页咯!", "info");
		return;
	}else{
		nowPageNum++;
	}
	search(pageSize,nowPageNum);
}

//跳转页面
function jumpPage(obj){
	$(".pageNumError").remove();
	var page = $(".pageNum").html().split("/");
	var totalPageNum = parseInt(page[1]);
	var pageNum = parseInt($(obj).prev().val());
	if(!/^\+?[1-9][0-9]*$/.test(pageNum)){
		$(obj).after("<font class='pageNumError' style='color:#d21e20;font-size:14px;padding-left:15px;'>请输入大于0的数字</font>");
		return;
	}
	var pageSize = 15;
	//console.log(pageNum+" - "+totalPageNum);
	if(pageNum>totalPageNum){
		search(pageSize,totalPageNum);
	}else{
		search(pageSize,pageNum);
	}
}

//刷新当前页数据
function refresh(){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	var pageSize = 15;
	search(pageSize,nowPageNum);
}