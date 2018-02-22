/**
 * 获取当前页参数
 */
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURIComponent(r[2]); return null;
}

function move_on(obj){
	var before = $(obj).prev();
	$(obj).insertBefore(before);
} 
function move_down(obj){
	var after = $(obj).next();
	$(after).insertBefore(obj);
} 

function send(){
	document.getElementById('page').style.display="none";
	document.getElementById('news').style.display="";
}
function jump(){
	document.getElementById('news').style.display="none";
	document.getElementById('page').style.display="";
}
function asend(){
	document.getElementById('div2_4').style.display="none";
	document.getElementById('div2_5').style.display="";
	document.getElementById('sound').style.display="none";
	document.getElementById('tectum').style.display="none";
	document.getElementById('picture').style.display="none";
	document.getElementById('language').style.display="none";
	document.getElementById('itextpage').style.display="none";
}
function ajump(){
	document.getElementById('div2_5').style.display="none";
	document.getElementById('div2_4').style.display="";
	document.getElementById('sound').style.display="none";
	document.getElementById('tectum').style.display="none";
	document.getElementById('picture').style.display="none";
	document.getElementById('language').style.display="none";
	document.getElementById('itextpage').style.display="none";
}
//子菜单点击事件
function menuclick(obj,fparentid,fid,type,fcontent){
	$("#replyType").attr("ruleID",0);
	$("#replyType").attr("replytype",0);
	document.getElementById('subFcontent').value = "";
	$("#subFcontent").val("");
	$("#textar").val("");
	$("#move_on").unbind();
	$("#move_on").click(function(){
		 var order=$(".save_order[value_id="+fid+"]").attr("value_order");
		 var object=$(".save_order[value_id="+fid+"]");
		 var i=parseInt(order)-1;
		 if(i==0){return;}
		 var order2=$(".save_order[value_order="+i+"]",object.parent()).attr("value_id");
		var before = $(obj).prev();
		$(obj).insertBefore(before);
		$(".save_order[value_id="+fid+"]").attr("value_order",i);
		$(".save_order[value_id="+order2+"]",object.parent()).attr("value_order",order);
	});
	$("#move_down").unbind();
	$("#move_down").click(function(){
		var order=$(".save_order[value_id="+fid+"]").attr("value_order");
		var object=$(".save_order[value_id="+fid+"]");
		var i=parseInt(order)+1;
		var order2=$(".save_order[value_order="+i+"]",object.parent()).attr("value_id");
		var after = $(obj).next();
		if(after.attr("id")=="floor"||i>=6){
			return;
		}
		$(after).insertBefore(obj);
		$(".save_order[value_id="+fid+"]").attr("value_order",i);
		$(".save_order[value_id="+order2+"]",object.parent()).attr("value_order",order);
	}); 
	$(obj).attr("class","c3");
	$(obj).siblings().attr("class","two");
    document.getElementById("menu1").className="one";
    document.getElementById("menu2").className="one";
    document.getElementById("menu3").className="one";
	document.getElementById("div1").style.display="none";
	document.getElementById("div2").style.display="none";
	document.getElementById("div3").style.display="block";  
	document.getElementById("save_OAMenu").style.display="none";
	document.getElementById("save_subOAMenu").style.display="block";
	document.getElementById("subMenuName").value=$(obj).text();
	document.getElementById("div3_1").innerHTML=$(obj).text();
	var target_radios = document.getElementsByName("radio2");
	target_radios[0].checked=false;
	target_radios[1].checked=false;
	var index_radio = type==2 ? 1 : 0;
	if(type>0&&type!=2){
		document.getElementById('page').style.display="none";
		document.getElementById('news').style.display="";
	}else{
			document.getElementById('news').style.display="none";
			document.getElementById('page').style.display="";
	}
	//当 type=1时，默认选中文字div隐藏其他同类div
	if(index_radio==0){
		var lang=$('#language');
		lang.css("display","");
		lang.siblings(".form-inline").css("display","none");
		/*判断FType发送消息  否则跳转url**/
		 if(type==1){
		 	var foaid=$("#wxcommoa").val();
			var data={};
		 	data["fid"]=fid;
		 	data["foaid"]=foaid;
			var ruleReplyType=$("#replyType").attr("replyType");
			data["replyType"]=ruleReplyType; 
			var dat={
					jsonobj:JSON.stringify(data)
				};	
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"OAMenu/selecttext.do",
				data:dat,
				dataType:"json",
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					var replytype = $("#replyType").attr("replytype",data.freplytype);//将后台传的值赋值到隐藏域
					var ruleID=$("#replyType").attr("ruleID",data.freplyruleid);
					var faid=$("#replyType").attr("faid",data.fid);
					$("#textar").val(data.ftext);
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
	   			}
			});
		 } 
	}
	target_radios[index_radio].checked = true;
	
	if(fcontent!=""&&fcontent!=undefined&&type==2){
		document.getElementById("subFcontent").value=fcontent;
	}
	else{
		document.getElementById("subFcontent").value="";
	}
	document.getElementById("subFid").value=fid;
	document.getElementById("fparentID").value=fparentid;
	
}

//图文消息
function imagetext(){
	document.getElementById('itextpage').style.display="";
	document.getElementById('language').style.display="none";
	document.getElementById('picture').style.display="none";
	document.getElementById('tectum').style.display="none";
	document.getElementById('sound').style.display="none";
}
//文字
function textarr(){
	$("#replyType").val("language");
	$("#replyType").attr("replyType",0);
	document.getElementById('language').style.display="";
	document.getElementById('itextpage').style.display="none";
	document.getElementById('picture').style.display="none";
	document.getElementById('tectum').style.display="none";
	document.getElementById('sound').style.display="none";
}

//图片
function photo(){
	document.getElementById('picture').style.display="";
	document.getElementById('language').style.display="none";
	document.getElementById('itextpage').style.display="none";
	document.getElementById('tectum').style.display="none";
	document.getElementById('sound').style.display="none";
}

//视频
function video(){
	document.getElementById('tectum').style.display="";
	document.getElementById('picture').style.display="none";
	document.getElementById('language').style.display="none";
	document.getElementById('itextpage').style.display="none";
	document.getElementById('sound').style.display="none";
}
//语音
function voice(){
	document.getElementById('sound').style.display="";
	document.getElementById('tectum').style.display="none";
	document.getElementById('picture').style.display="none";
	document.getElementById('language').style.display="none";
	document.getElementById('itextpage').style.display="none";
}
//图文消息
function aimagetext(){
	document.getElementById('aitextpage').style.display="";
	document.getElementById('alanguage').style.display="none";
	document.getElementById('apicture').style.display="none";
	document.getElementById('atectum').style.display="none";
	document.getElementById('asound').style.display="none";
}
//一级文字
function atextarr(){
	$("#areplyType").val("alanguage");
	$("#areplyType").attr("replyType",0);
	document.getElementById('alanguage').style.display="";
	document.getElementById('aitextpage').style.display="none";
	document.getElementById('apicture').style.display="none";
	document.getElementById('atectum').style.display="none";
	document.getElementById('asound').style.display="none";
}

//一级图片
function aphoto(){
	document.getElementById('apicture').style.display="";
	document.getElementById('alanguage').style.display="none";
	document.getElementById('aitextpage').style.display="none";
	document.getElementById('atectum').style.display="none";
	document.getElementById('asound').style.display="none";
}

//一级视频
function avideo(){
	document.getElementById('atectum').style.display="";
	document.getElementById('apicture').style.display="none";
	document.getElementById('alanguage').style.display="none";
	document.getElementById('aitextpage').style.display="none";
	document.getElementById('asound').style.display="none";
}
//一级语音
function avoice(){
	document.getElementById('asound').style.display="";
	document.getElementById('atectum').style.display="none";
	document.getElementById('apicture').style.display="none";
	document.getElementById('alanguage').style.display="none";
	document.getElementById('aitextpage').style.display="none";
}

//文字输入框
var len_prev = 0;
function words_deal(){
	 var textar=$("#textar").val();
	 var len = textar.replace(/[^\x00-\xff]/g, '**').length;
	 var len2 = $("#textar").val().length;
	 window.console.info("len_");
	 if(len>600){
		 textar=textar.substring(0,len_prev);
		 $("#textar").val(textar);
	 }else{
		 var len_ = 600-len;
		 window.console.info("len_"+len_);
	 	$("#textCount").innerHTML=len_+"";
	 	len_prev = len2;
	 }
	 var allInput = document.getElementById("textar");
	 for (var int = 0; int < allInput.length; int++) {
		 var item = allInput[i];
		 if (item.type == "text") {
	            item.value = "";
	        }
	}
}

//一级文字输入框
var len_prev = 0;
function awords_deal(){
	 var textar=$("#atextar").val();
	 var len = textar.replace(/[^\x00-\xff]/g, '**').length;
	 var len2 = $("#atextar").val().length;
	 if(len>600){
		 textar=textar.substring(0,len_prev);
		 $("#atextar").val(textar);
	 }else{
	 	$("#atextCount").text(600-len);
	 	len_prev = len2;
	 }
	 var allInput = document.getElementById("atextar");
	 for (var int = 0; int < allInput.length; int++) {
		 var item = allInput[i];
		 if (item.type == "text") {
	            item.value = "";
	        }
	}
}
//查询主菜单
function queryOAMenu(ids){
	// 将选中的公众号的名称设置到左侧演示区
	var texts=$('#wxcommoa').jeasycombo("getvalue").texts;	
	if(!texts) texts=texts_oaname;
	document.getElementById("texts").innerHTML=texts;
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"OAMenu/queryOAMenu.do?fOAID="+ids,
	    dataType:"json",
	    success:function(data){
	    	$.messager.progress("close");//隐藏加载中
	    	$("#hideOrder").empty();
	    	document.getElementById("div1").style.display="block"; // 点击左侧菜单进行操作
	    	document.getElementById("div2").style.display="none"; // 一级菜单编辑
	    	document.getElementById("div3").style.display="none"; // 二级菜单编辑
	    	var length=data.length;
	    	document.getElementById("menu1").innerHTML="";
    		document.getElementById("menu1ID").value="";
    		document.getElementById("menu1Type").value="";
    		document.getElementById("menu1Url").value="";
    		document.getElementById("menu2").innerHTML="";
    		document.getElementById("menu2ID").value="";
    		document.getElementById("menu2Type").value="";
    		document.getElementById("menu2Url").value="";
    		document.getElementById("menu3").innerHTML="";
    		document.getElementById("menu3ID").value="";
    		document.getElementById("menu3Type").value="";
    		document.getElementById("menu3Url").value="";
    		document.getElementById("menu1").style.backgroundImage='';
    		document.getElementById("menu2").style.backgroundImage='';
    		document.getElementById("menu3").style.backgroundImage='';
    		$("#menu1").attr("data-content","");
    		$("#menu2").attr("data-content","");
    		$("#menu3").attr("data-content","");
			$("#newmenu1").hide();
			$("#newmenu2").hide();
			$("#newmenu3").hide();
	    	if(length==0){
	    		document.getElementById("menu1").style.backgroundImage="url(img/kj.png)";
	    		document.getElementById("menu2").style.backgroundImage="url(img/kj.png)";
	    		document.getElementById("menu3").style.backgroundImage="url(img/kj.png)";
	    	}
	    	else if(length==1){
	    		document.getElementById("menu1").innerHTML=data[0].fname;
	    		document.getElementById("menu1ID").value=data[0].fid;
	    		document.getElementById("menu1Type").value=data[0].ftype;
	    		document.getElementById("menu1Url").value=data[0].fcontent;
	    		document.getElementById("menu2").style.backgroundImage="url(img/kj.png)";
	    		document.getElementById("menu3").style.backgroundImage="url(img/kj.png)";
	    	}
	    	else if(length==2){
	    		document.getElementById("menu1").innerHTML=data[0].fname;
	    		document.getElementById("menu1ID").value=data[0].fid;
	    		document.getElementById("menu1Type").value=data[0].ftype;
	    		document.getElementById("menu1Url").value=data[0].fcontent;
	    		document.getElementById("menu2").innerHTML=data[1].fname;
	    		document.getElementById("menu2ID").value=data[1].fid;
	    		document.getElementById("menu2Type").value=data[1].ftype;
	    		document.getElementById("menu2Url").value=data[1].fcontent;
	    		document.getElementById("menu3").style.backgroundImage="url(img/kj.png)";
	    	}
	    	else {
	    		document.getElementById("menu1").innerHTML=data[0].fname;
	    		document.getElementById("menu1ID").value=data[0].fid;
	    		document.getElementById("menu1Type").value=data[0].ftype;
	    		document.getElementById("menu1Url").value=data[0].fcontent;
	    		document.getElementById("menu2").innerHTML=data[1].fname;;
	    		document.getElementById("menu2ID").value=data[1].fid;
	    		document.getElementById("menu2Type").value=data[1].ftype;
	    		document.getElementById("menu2Url").value=data[1].fcontent;
	    		document.getElementById("menu3").innerHTML=data[2].fname;
	    		document.getElementById("menu3ID").value=data[2].fid;
	    		document.getElementById("menu3Type").value=data[2].ftype;
	    		document.getElementById("menu3Url").value=data[2].fcontent;
	    	}
	    	// 保存一级菜单排序
	    	var hideOrder=$("#hideOrder");
	    	for(var i=0;i<length;i++){
	    		var d='<div class="save_order" value_id='+data[i].fid+' value_order='+data[i].forder+' style="display:none;"></div>';
	    		hideOrder.append(d);
	    	}
	    },error:function(){
	    	$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}

//一级菜单保存并发布按钮
$("#save_OAMenu").click(function(){
	var menuName=$("#menuName").val();
	var len = menuName.replace(/[^\x00-\xff]/g, '**').length;
	if(len>8){
		$.messager.alert("提示", "您输入的名称过长,请重新输入！", "warning");
		return false;
	}
	var ftype= 0;
 	var check_display = document.getElementById("div2_3").style.display;
 	if (check_display=="block") {
 		ftype = $("input[name='radio1']:checked").val();
 	} else if (check_display=="none") { //有子菜单，type=0
 	} else {
 		return;
 	}
	if (ftype==1) {
		$.messager.alert("提示", '暂不支持"发送消息"类型菜单。', "warning");
		return;
	}
	var fcontent=$("#fcontent").val().replace(" ","");
	var fid=$("#fid").val();
	var fOAID=$("#wxcommoa").val();
	var textContent = $("#atextar").val();//文本域中的值
	var reply = $("#areplyType");
	var materialID = reply.attr("materialID");
	var ruleID = reply.attr("ruleID");
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"OAMenu/queryOAMenuByParentID.do?parentID="+fid,
	    dataType:"json",
	    async: false,
	    success:function(data){
	    	$.messager.progress("close");//隐藏加载中
	    	if(ftype==2 && data.length==0){
	    		if (fcontent=="") {
					$.messager.alert("提示", "页面地址不能为空！", "warning");
					return false;
				}
	    		else{
	    			var data={}; 
	    			data["menuName"]=menuName;
	    			data["ftype"]=ftype;
	    			data["fname"]=menuName;
	    			data["fcontent"]=fcontent;
	    			data["fid"]=fid;
	    			data["flevel"]=1;
	    			data["foaid"]=fOAID;
	    			data["fparentid"]=fid;
	    			data["textContent"] = textContent;
	    			data["materialID"] = materialID;
	    			data["ruleID"] = ruleID;
	    			var dat={
	    				jsonobj:JSON.stringify(data)
	    			};
	    			$.ajax({
	    				type:"POST",
	    				url:"OAMenu/editMenu.do",
	    				data:dat,
	    				dataType:"json",
	    				success:function(data){
	    					$.messager.progress("close");//隐藏加载中
	    					if (data.result==1) {
	    						queryOAMenu(fOAID);
	    					}
	    					$.messager.alert("提示", data.msg, "warning");
	    				},error:function(){
	    					$.messager.progress("close");//隐藏加载中
	    					$.messager.alert("提示", "请求出错！", "warning");
	    	   			}
	    			});
	    		}
	    	}	
	    	else{
	    		var data={}; 
	    		data["menuName"]=menuName;
	    		data["ftype"]=ftype;
	    		data["fname"]=menuName;
	    		data["fcontent"]=fcontent;
	    		data["fid"]=fid;
	    		data["flevel"]=1;
	    		data["foaid"]=fOAID;
	    		data["fparentid"]=fid;
	    		data["textContent"] = textContent;
	    		data["materialID"] = materialID;
	    		data["ruleID"] = ruleID;
	    		var dat={
	    			jsonobj:JSON.stringify(data)
	    		};
   			$.ajax({
   				type:"POST",
   				url:"OAMenu/editMenu.do",
   				data:dat,
   				dataType:"json",
   				success:function(data){
   					$.messager.progress("close");//隐藏加载中
   					if (data.result==1) {
   						queryOAMenu(fOAID);
   					}
   					$.messager.alert("提示",data.msg, "warning");
   				},error:function(){
   					$.messager.progress("close");//隐藏加载中
   					$.messager.alert("提示", "请求出错！", "warning");
   	   			}
   			});
   		}
	    },error:function(){
	    	$.messager.progress("close");//隐藏加载中
	    	$.messager.alert("提示", "请求出错！", "warning");
  			}
	});
});

//save_subOAMenu   二级菜单保存并发布按钮
$("#save_subOAMenu").click(function(){ //subMenuName  subType  subFcontent subFid fparentID
	var menuName=$("#subMenuName").val();
    var len = menuName.replace(/[^\x00-\xff]/g, '**').length;
	if(len>16){
		$.messager.alert("提示", "您输入的名称过长,请重新输入！", "warning");
		return false;
	}
	var ftype=$("input[name='radio2']:checked").val();
	if (ftype==1) {
		$.messager.alert("提示", '暂不支"持发送消息"类型菜单。', "warning");
		return false;
	}
	var fcontent=$("#subFcontent").val();
	if(ftype==2){
		if(fcontent.indexOf("http://")!=0){
			$.messager.alert("提示", "链接地址必须以http://开头！", "warning");
			return false;
		}
		if(fcontent==""){
			$.messager.alert("提示", "页面地址不能为空！", "warning");
			return false;
		}
	}
	var fid=$("#subFid").val();
	var fparentID=$("#fparentID").val();
	var fOAID=$("#wxcommoa").val();
	var data={}; 
	data["menuName"]=menuName;
	data["ftype"]=ftype;
	data["fname"]=menuName;
	data["fcontent"]=fcontent;
	data["fid"]=fid;
	data["flevel"]=2;
	data["foaid"]=fOAID;
	data["fparentid"]=fparentID;
	// 取“发送消息”的设置内容
	var reply = $("#replyType");
	var ruleID = reply.attr("ruleID");
	data["ruleID"] = ruleID;
	if (ftype==1) {
		var ruleReplyType = reply.attr("replyType");
		data["replyType"] = ruleReplyType;
		if (ruleReplyType==0){// 文字
			var textContent = $("#textar").val();//文本域中的值
			data["textContent"] = textContent;
		} else { // 其他，有素材ID
			var materialID = reply.attr("materialID");
			data["materialID"] = materialID;
		}
	}
	var dat={
		jsonobj:JSON.stringify(data)
	};
	if(fid==""){
		$.messager.progress({text : "正在处理，请稍候..."});
		//添加子菜单
		$.ajax({
			type:"POST",
			url:"OAMenu/saveSubMenu.do",
			data:dat,
			dataType:"json",
			success:function(data){
				$.messager.progress("close");//隐藏加载中
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
   			}
		});
	}
	else{
		$.messager.progress({text : "正在处理，请稍候..."});
		//修改子菜单
		$.ajax({
			type:"POST",
			url:"OAMenu/editMenu.do",
			data:dat,
			dataType:"json",
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result==1) {
					queryOAMenu(fOAID);
				}
				$.messager.alert("提示", data.msg, "warning");
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
   			}
		});
	}
});

//添加菜单
function addMenu(obj,fparentID,length){
	/* $(".popover").popover('hide'); */
	var fOAID=$("#wxcommoa").val();
	var type=$("#subType").val();
	var data={}; 
	data["ftype"]=2;
	data["fname"]="子菜单名称";
	data["fcontent"]="";
	data["foaid"]=fOAID;
	data["fparentid"]=fparentID;
	var dat={
			jsonobj:JSON.stringify(data)
		};
	if(length==0){
		$.messager.confirm('确认','添加子菜单后,父级菜单的内容将被删除，您确定要添加吗?',function(r){
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"OAMenu/updMenu.do?fid="+fparentID,
				dataType:"json",
				success:function(data){
					if (data.result==1) {
						$.messager.progress({text : "正在处理，请稍候..."});
						$.ajax({
							type:"POST",
							url:"OAMenu/addMenu.do?FLevel=2",
							data:dat,
							dataType:"json",
							success:function(data){
								$.messager.progress("close");//隐藏加载中
								if (data.result==1) {
									$.messager.alert("提示", "添加成功！", "warning");
									queryOAMenu(fOAID);
									$(obj).removeClass("ccc");
								}
							},error:function(){
								$.messager.progress("close");//隐藏加载中
								$.messager.alert("提示", "请求出错！", "warning");
				   			}
						});
					}
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
	   			}
			});
			}
		});
	}
	else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:"POST",
			url:"OAMenu/addMenu.do?FLevel=2",
			data:dat,
			dataType:"json",
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result==1) {
					$.messager.alert("提示", "添加成功！", "warning");
					queryOAMenu(fOAID);
					$(obj).removeClass("ccc");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
   			}
		});
	}
}
//添加父级菜单
function add(){
	var fOAID=$("#wxcommoa").val();
	var type=$("#type").val();
	var data={}; 
	data["ftype"]=2;
	data["fname"]="菜单名称";
	data["fcontent"]="";
	data["foaid"]=fOAID;
	var dat={
			jsonobj:JSON.stringify(data)
		};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"OAMenu/addMenu.do?FLevel=1",
		data:dat,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result==1) {
				queryOAMenu(fOAID);
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}

//删除子菜单
function delMenu(){
	$.messager.confirm('确认','您确定要执行该操作吗？',function(r){
		if(r){
			var fid=$("#subFid").val();//fparentID
			var fparentID=$("#fparentID").val();
			var fOAID=$("#wxcommoa").val();
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"OAMenu/delMenu.do?fid="+fid+"&fparentID="+fparentID+"&fOAID="+fOAID,
				dataType:"json",
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if (data.result==1) {
						queryOAMenu(fOAID);
						document.getElementById("div1").style.display="block";
						document.getElementById("div2").style.display="none";
						document.getElementById("div3").style.display="none";
					}
					else{
						$.messager.alert("提示", "删除操作失败！", "warning");
					}
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
				}
			});
		}
	});
}
//删除一级菜单
function deleteMenu(){
	var fid=$("#fid").val();
	var fOAID=$("#wxcommoa").val();
	$.messager.confirm('确认','删除一级菜单同时会将该菜单下的所有二级子菜单删除，你确定要删除吗？',function(r){  
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"OAMenu/deleteMenu.do?fid="+fid+"&fOAID="+fOAID,
				dataType:"json",
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if (data.result==1) {
						queryOAMenu(fOAID);
						document.getElementById("div1").style.display="block";
						document.getElementById("div2").style.display="none";
						document.getElementById("div3").style.display="none";
					}
					else{
						$.messager.alert("提示", "删除操作失败！", "warning");
					}
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
	   			}
			});
		}
	});
}

function isUrl(id){//subFcontent  fcontent

};

function menu1(){
	$("#areplyType").attr("ruleID",0);
	$("#areplyType").attr("replytype",0);
	$("#atextar").val("");
	// 一级菜单menu1 加表示选中的样式
	document.getElementById("menu1").className="c2";
	document.getElementById("menu2").className="one";
	document.getElementById("menu3").className="one";
	// 显示一级菜单编辑区、保存按钮
	document.getElementById("div1").style.display="none";
	document.getElementById("div2").style.display="block";
	document.getElementById("div3").style.display="none";
	document.getElementById("div2_2").style.display="none";
	document.getElementById("save_OAMenu").style.display="block";
	document.getElementById("save_subOAMenu").style.display="none";
	var menu1=$("#menu1").text();
	var type=$("#menu1Type").val();
	var url=$("#menu1Url").val();
	var fid=$("#menu1ID").val();
		document.getElementById("menuName").value=menu1;//data-content FContent  
		document.getElementById("div2_1").innerHTML=menu1;
		document.getElementById("fcontent").value=url;
		document.getElementById("fid").value=fid;
		window.console.info(menu1+"--"+type);
	if(menu1==""){
		document.getElementById("div2_3").style.display="block";
		document.getElementById("div2_4").style.display="block";
		document.getElementById("div2").style.display="none";
		   add();
	}
	else{
		var target_radios = document.getElementsByName("radio1");
		var index_radio = type==2 ? 1 : 0;
		target_radios[index_radio].checked = true;
		$("input[name='radio1'][value="+type+"]").attr("checked",true); 
		document.getElementById("div2").style.display="block";
		document.getElementById("save_OAMenu").style.display="block";
		if (type==1) {
			document.getElementById("div2_5").style.display="";
			document.getElementById("div2_4").style.display="none";
			$("#fcontent").val("");
		} else if(type==2) {
			document.getElementById("div2_4").style.display="";
			document.getElementById("div2_5").style.display="none";
		} else if(type==0) {
			document.getElementById("div2_4").style.display="none";
			document.getElementById("div2_5").style.display="none";
		}
		//当 type=1时，默认选中文字div隐藏其他同类div
		if(index_radio==0){
			var lang=$('#alanguage');
			lang.css("display","");
			lang.siblings(".form-inline").css("display","none");//隐藏相同的兄元素
			/*判断FType发送消息  否则跳转url**/
			 if(type==1){
			 	var fOAID=$("#wxcommoa").val();
				var data={};
			 	data["fid"]=fid;
			 	data["foaid"]=foaid;
				var ruleReplyType=$("#areplyType").attr("replyType");
				data["replyType"]=ruleReplyType; 
				var dat={
						jsonobj:JSON.stringify(data)
					};	
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type:"POST",
					url:"OAMenu/selecttext.do",
					data:dat,
					dataType:"json",
					success:function(data){
						$.messager.progress("close");//隐藏加载中
						var replytype = $("#areplyType").attr("replytype",data.freplytype);//将后台传的值赋值到隐藏域
						var ruleID=$("#areplyType").attr("ruleID",data.freplyruleid);
						var faid=$("#areplyType").attr("faid",data.fid);
						$("#atextar").val(data.ftext);
					},error:function(){
						$.messager.progress("close");//隐藏加载中
						$.messager.alert("提示", "请求出错！", "warning");
		   			}
				});
			 } 
		}
		var id=$("#menu1ID").val();
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:"POST",
			url:"OAMenu/queryOAMenuByParentID.do?parentID="+id,
		    dataType:"json",
		    success:function(data){
		    	$.messager.progress("close");//隐藏加载中
		    	var ruleID=$("#areplyType").attr("ruleID",data.freplyruleid);
		    	createMenu("menu1",data,fid,menu1);
				$("#newmenu2").hide();
				$("#newmenu3").hide();
				document.getElementById("menu1").className="c2";
		    },error:function(){
		    	$.messager.progress("close");//隐藏加载中
		    	$.messager.alert("提示", "请求出错！", "warning");
   			}
		});
		// 如果type==1,获取对应的自动回复规则的内容，显示在页面上
		if (type==1) {
			queryReplyRuleByMenuID(id);
		}
	}
};
//刷新菜单
function createMenu(menuid,data,fid,title){
	data=prepareOrders(fid,data);
	$("#"+menuid).html("");
	if(data.length>0){
		$(".menuright").hide();
		$(".menuexist").show();
	}else{
		$(".menunoexist").show();
	}
	var content="";
	
	/*************************************************遍历跳转页面的菜单名称，页面地址********************************************************************/
	for (var i = 0; i < data.length; i++) {
		if(data[i].fcontent!=""){
			var data_content = JSON.stringify(data[i].fcontent);
			content=content+'<div class=\'two\' onclick=\"menuclick(this,'+fid+','+data[i].fid+','+data[i].ftype+',\''+data_content.substring(1,data_content.length-1)+'\')\" >'+data[i].fname+'</div>';//<i><img src=\'img/shang.png\'/></i>   <img style=" width: 8px; height: 40px;" src=\'img/shang.png\'/><img style=" width: 8px; height: 40px;" src=\'img/xia.png\'/>
		}
		else{
			content=content+'<div class=\'two\' onclick=\'menuclick(this,'+fid+','+data[i].fid+','+data[i].ftype+')\' >'+data[i].fname+'</div>';
		}
	}
	if (data.length<5) {
		content=content+'<div class=\'two\' id=\'floor\' style=\'background-image: url(img/kj.png)\' onclick=\'addMenu(this,'+fid+','+data.length+')\'></div>';
	}
 	var oldmenu = $("#"+menuid);
	var newmenu = $('<div class="one" id="'+menuid+'">'+title+'</div>');
	oldmenu.after(newmenu);
	oldmenu.empty();
	oldmenu.remove();
	//重新初始化
	newmenu.click(function(){
		 if(menuid=="menu1"){
			 menu1();
		 }else if(menuid=="menu2"){
			 menu2();
		 }else if(menuid=="menu3"){
			 menu3();
		 }
	}); 
	 if(menuid=="menu1"){
		 $("#newmenu2").hide();
		 $("#newmenu3").hide();
		 var newmenu_num=$("#newmenu1");
		 if(newmenu_num) newmenu_num.remove();
		 newmenu.after("<div class='popover' id='newmenu1' style='position: absolute;bottom: 0px; left: 45px; display: block;'>"+content+"</div>");
	 }else if(menuid=="menu2"){
		 $("#newmenu1").hide();
		 $("#newmenu3").hide();
		 var newmenu_num=$("#newmenu2");
		 if(newmenu_num) newmenu_num.remove();
		 newmenu.after("<div class='popover' id='newmenu2' style='position: absolute;bottom: 0px; left: 136px; display: block;'>"+content+"</div>");
	 }else if(menuid=="menu3"){
		 $("#newmenu1").hide();
		 $("#newmenu2").hide();
		 var newmenu_num=$("#newmenu3");
		 if(newmenu_num) newmenu_num.remove();
		 newmenu.after("<div class='popover' id='newmenu3' style='position: absolute;bottom: 0px; left: 227px; display: block;'>"+content+"</div>");
	 }
}
function menu2(){
	$("#areplyType").attr("ruleID",0);
	$("#areplyType").attr("replytype",0);
	$("#atextar").val("");
	document.getElementById("menu2").className="c2";
	document.getElementById("menu1").className="one";
	document.getElementById("menu3").className="one";
	document.getElementById("div1").style.display="none";
	document.getElementById("div2").style.display="block";
	document.getElementById("div3").style.display="none";
	document.getElementById("div2_2").style.display="none";
	document.getElementById("save_OAMenu").style.display="block";
	document.getElementById("save_subOAMenu").style.display="none";
	var menu1=$("#menu2").text();
	var type=$("#menu2Type").val();
	var url=$("#menu2Url").val();
	var fid=$("#menu2ID").val();
		document.getElementById("menuName").value=menu1;//data-content FContent  
		document.getElementById("div2_1").innerHTML=menu1;
		document.getElementById("fcontent").value=url;
		document.getElementById("fid").value=fid;
		window.console.info(menu1+"--"+type);
		if(menu1==""){
			document.getElementById("div2_3").style.display="block";
			document.getElementById("div2_4").style.display="block";
			document.getElementById("div2").style.display="none";
			add();
		}
		else{
			var target_radios = document.getElementsByName("radio1");
			var index_radio = type==2 ? 1 : 0;
			target_radios[index_radio].checked = true;
			document.getElementById("div2").style.display="block";
			document.getElementById("save_OAMenu").style.display="block";
			if (type==1) {
				document.getElementById("div2_5").style.display="";
				document.getElementById("div2_4").style.display="none";
				$("#fcontent").val("");
			} else if(type==2) {
				document.getElementById("div2_4").style.display="";
				document.getElementById("div2_5").style.display="none";
			} else if(type==0) {
				document.getElementById("div2_4").style.display="none";
				document.getElementById("div2_5").style.display="none";
			}
			//当 type=1时，默认选中文字div隐藏其他同类div
			if(index_radio==0){
				var lang=$('#alanguage');
				lang.css("display","");
				lang.siblings(".form-inline").css("display","none");//隐藏相同的兄元素
				/*判断FType发送消息  否则跳转url**/
				 if(type==1){
				 	var fOAID=$("#wxcommoa").val();
					var data={};
				 	data["fid"]=fid;
				 	data["foaid"]=foaid;
					var ruleReplyType=$("#areplyType").attr("replyType");
					data["replyType"]=ruleReplyType; 
					var dat={
							jsonobj:JSON.stringify(data)
						};	
					$.messager.progress({text : "正在处理，请稍候..."});
					$.ajax({
						type:"POST",
						url:"OAMenu/selecttext.do",
						data:dat,
						dataType:"json",
						success:function(data){
							$.messager.progress("close");//隐藏加载中
							var replytype = $("#areplyType").attr("replytype",data.freplytype);//将后台传的值赋值到隐藏域
							var ruleID=$("#areplyType").attr("ruleID",data.freplyruleid);
							var faid=$("#areplyType").attr("faid",data.fid);
							$("#atextar").val(data.ftext);
						},error:function(){
							$.messager.progress("close");//隐藏加载中
							$.messager.alert("提示", "请求出错！", "warning");
			   			}
					});
				 } 
			}
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"OAMenu/queryOAMenuByParentID.do?parentID="+fid,
			    dataType:"json",
			    success:function(data){
			    	$.messager.progress("close");//隐藏加载中
			    	var ruleID=$("#areplyType").attr("ruleID",data.freplyruleid);
			    	createMenu("menu2",data,fid,menu1);
					$("#newmenu1").hide();
					$("#newmenu3").hide();
					document.getElementById("menu2").className="c2";
					var ruleID=$("#areplyType").attr("ruleID",data.parentID);
			    },error:function(){
			    	$.messager.progress("close");//隐藏加载中
			    	$.messager.alert("提示", "请求出错！", "warning");
	   			}
			});
		}
}
function menu3(){
	$("#areplyType").attr("ruleID",0);
	$("#areplyType").attr("replytype",0);
	$("#atextar").val("");	
	document.getElementById("menu3").className="c2";
	document.getElementById("menu1").className="one";
	document.getElementById("menu2").className="one";
	document.getElementById("div1").style.display="none";
	document.getElementById("div3").style.display="none";
	document.getElementById("div2_2").style.display="none";
	document.getElementById("save_subOAMenu").style.display="none";
	var menu1=$("#menu3").text();
	var type=$("#menu3Type").val();
	var url=$("#menu3Url").val();
	var fid=$("#menu3ID").val();
		document.getElementById("menuName").value=menu1;//data-content FContent  
		document.getElementById("div2_1").innerHTML=menu1;
		document.getElementById("fcontent").value=url;
		document.getElementById("fid").value=fid;
		if(menu1==""){
			document.getElementById("div2_3").style.display="block";
			document.getElementById("div2_4").style.display="block";
			document.getElementById("div2").style.display="none";
			add();
		}
		else{
			var target_radios = document.getElementsByName("radio1");
			var index_radio = type==2 ? 1 : 0;
			target_radios[index_radio].checked = true;
			document.getElementById("save_OAMenu").style.display="block";
			document.getElementById("div2").style.display="block";
			if (type==1) {
				document.getElementById("div2_5").style.display="";
				document.getElementById("div2_4").style.display="none";
				$("#fcontent").val("");
			} else if(type==2) {
				document.getElementById("div2_4").style.display="";
				document.getElementById("div2_5").style.display="none";
			} else if(type==0) {
				document.getElementById("div2_4").style.display="none";
				document.getElementById("div2_5").style.display="none";
			}
			//当 type=1时，默认选中文字div隐藏其他同类div
			if(index_radio==0){
				var lang=$('#alanguage');
				lang.css("display","");
				lang.siblings(".form-inline").css("display","none");//隐藏相同的兄元素
				/*判断FType发送消息  否则跳转url**/
				 if(type==1){
				 	var fOAID=$("#wxcommoa").val();
					var data={};
				 	data["fid"]=fid;
				 	data["foaid"]=foaid;
					var ruleReplyType=$("#areplyType").attr("replyType");
					data["replyType"]=ruleReplyType; 
					var dat={
							jsonobj:JSON.stringify(data)
						};	
					$.messager.progress({text : "正在处理，请稍候..."});
					$.ajax({
						type:"POST",
						url:"OAMenu/selecttext.do",
						data:dat,
						dataType:"json",
						success:function(data){
							$.messager.progress("close");//隐藏加载中
							var replytype = $("#areplyType").attr("replytype",data.freplytype);//将后台传的值赋值到隐藏域
							var ruleID=$("#areplyType").attr("ruleID",data.freplyruleid);
							var faid=$("#areplyType").attr("faid",data.fid);
							$("#atextar").val(data.ftext);
						},error:function(){
							$.messager.progress("close");//隐藏加载中
							$.messager.alert("提示", "请求出错！", "warning");
			   			}
					});
				 } 
			}
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"OAMenu/queryOAMenuByParentID.do?parentID="+fid,
			    dataType:"json",
			    success:function(data){
			    	$.messager.progress("close");//隐藏加载中
			    	var ruleID=$("#areplyType").attr("ruleID",data.freplyruleid);
			    	createMenu("menu3",data,fid,menu1);
					$("#newmenu1").hide();
					$("#newmenu2").hide();
					document.getElementById("menu3").className="c2";
			    },error:function(){
			    	$.messager.progress("close");//隐藏加载中
			    	$.messager.alert("提示", "请求出错！", "warning");
	   			}
			});
		}
		
}
function prepareOrders(parentId,data){
	var parent = $(".save_order[value_id="+parentId+"]");
	var sons = $(".save_order", parent);
	if (sons.size()>0) {
		var newData = [];
		for (var i =0; i<data.length; i++) {
			var order = parseInt(sons.eq(i).attr("value_order"));
			newData[order-1] = data[i];
		}
		if (newData.length>data.length) newData = correctOrders(newData); // 修正prepareOrders中发生的order错误（未解决错误的order记录） lzy 160114
		return newData;
	} else {
		for (var i=0; i<data.length;i++) {
			parent.append('<input type="hidden" class="save_order" value_id='+data[i].fid+' value_order='+data[i].forder+' />');			
		} 
		return data;
	}
}
// 修正prepareOrders中发生的order错误 lzy 160114
function correctOrders(data) {
	var newData = [];
	var correct = 0;
	for (var i =0; i<data.length; i++) {
		if (data[i]) {
			newData[i-correct] = data[i];
			continue;
		} else {
			correct++;
			debugm('菜单Order错误['+(i+1)+']：\n'+JSON.stringify(data));
			continue;
		}
	}
	return newData;
}

//排序按钮点击事件
$("#paixu").click(function(){
	$(this).hide();
	document.getElementById("yidong").style.display="block";
	document.getElementById("save_OAMenu").style.display="none";
	document.getElementById("save_subOAMenu").style.display="none";
	document.getElementById("div2").style.display="none";
	document.getElementById("div3").style.display="none";
	document.getElementById("div1").style.display="block";
});
//排序保存按钮
$("#save_paixu").click(function(){
	var orders = [];
	var fOAID=$("#wxcommoa").val();
	$(".save_order").each(function(){
		var id = $(this).attr("value_id");
		var order = $(this).attr("value_order");
		orders.push({"id":id, "order":order});
	});
	var param = JSON.stringify(orders);
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"OAMenu/updateOrder.do",
		data:{orders:param,fOAID:fOAID},
	    dataType:"json",
	    success:function(data){
	    	$.messager.progress("close");//隐藏加载中
	    	if (data.result==1) {
				$.messager.confirm('确认','保存成功！',function(r){  
					if(r){
						var fOAID=$("#wxcommoa").val();
						var texts=$('#wxcommoa').jeasycombo("getvalue").texts;	
						window.location.href = $("base").attr("href")+"OAMenu/page.do?fOAID="+fOAID+"&texts="+texts;
					}
				});
	    	}else{
				$.messager.alert("提示", "保存失败！", "warning");
			}
	    },error:function(){
	    	$.messager.progress("close");//隐藏加载中
	    	$.messager.alert("提示", "请求出错！", "warning");
		}
	});
});

function queryReplyRuleByMenuID(id){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"OAMenu/queryReplyRuleByMenuID.do?id="+id,
	    dataType:"json",
	    success:function(data){
	    	$.messager.progress("close");//隐藏加载中
	    },error:function(){
	    	$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}

function debugm(msg){
	if (window.console) {
		window.console.info('debug[oaMenu] | '+msg);
	}
}
/**
 * wwz 同步微信菜单
 */
function syncWXMenu(obj){
	var ids=$("#wxcommoa").val();
	if(ids==undefined||ids==""){
		$.messager.alert("提示", "请先选择公众号！", "warning");
	}else{
		$.messager.confirm('确认','同步微信公众平台菜单会覆盖掉当前设置的自定义菜单，是否继续同步？',function(r){
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type:"POST",
					url:"OAMenu/syncWXMenu.do?ids="+ids,
				    dataType:"json",
				    success:function(data){
				    	$.messager.progress("close");//隐藏加载中
				    	if(data.result){
				    		$.messager.alert("提示", "菜单同步成功！", "warning");
				    	}else{
				    		$.messager.alert("提示", "请求出错，请重新同步！", "warning");
				    	}
				    },error:function(){
				    	$.messager.progress("close");//隐藏加载中
				    	$.messager.alert("提示", "同步出错！", "warning");
					}
				});
			}
		}); 
	}
}