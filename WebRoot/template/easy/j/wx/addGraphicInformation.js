var fileserver=$("#fileServerPath").val();
var markmod = $(".left_menu").attr("titmark");//取主标题的标识
if(markmod!= ""){//判断主标题
	var sss=$(".left_menu").find("span").html();
	//alert(sss)
	$("#titlefrist").empty();
	$("#titlefrist").attr("value",sss);
}

$.ajax({
	type:"post",
	url:"mater/selectPublic.do",
	dataType:'json',
	success:function(data){
		var html = "";
		$(data.rows).each(function(){
			html="<span id='public"+this.fid+"' fid="+this.fid+" publ='0' style='margin-left: 5px;' onclick='publicclick("+this.fid+")'><img src='img/box.png'>&nbsp;<span style='color: #d7231f;'>"+this.fname+"</span></span>";
			$("#publicStation").append(html);
		});
	}
});

$(function(){
	//点击事件弹出添加对话框(图片库)
	$("#photogallery_dlg").dialog({
		modal:true,
		closed:true,
		width:750,
	    height:430,
	    title:"选择图片",
		buttons:[{text:'确定',iconCls:'icon-ok',handler:function(){Pustimg();}},
				 {text:'取消',iconCls:'icon-cancel',handler:function(){
						$("#photogallery_dlg").dialog("close");
				 }}]
	});
	
	//点击事件弹出添加对话框(图片)
	$("#reghtsept_dlg").dialog({
		modal:true,
		closed:true,
		width:830,
		height:610,
		title:"选择图片",
		buttons:[{text:'确定',iconCls:'icon-ok',handler:function(){picturesure();}},
				 {text:'取消',iconCls:'icon-cancel',handler:function(){
						$("#reghtsept_dlg").dialog("close");
				 }}]
	});
	
	$("#btn-desc").jeasyupload({
		url:"upload_video_json.do",
		btn:$("#btn-desc"),
		parent:$("#uploadDiv"),
		customImg:function(i,file,o){
			
			$("#fshareimg").attr("src",fileserver + file["relativeurl"]).show();
			$(".delmove").css("display","inline-block");
			$("#FShareImgUrl").val(fileserver+file["relativeurl"]);
			var html ="";
			var urlname =  file["ffilename"];
//	 		alert(file["relativeurl"])
			var srcurl=fileserver+file["relativeurl"];//图片路径
			var url = file["relativeurl"];//图片路径
			var markmod = $(".left_menu").attr("titmark");//取主标题的标识
			if(markmod !=undefined && markmod!= ""){//判断主标题
				//alert(1)
				html="<img src="+srcurl+" imgsrc="+url+" class='titpicture' name ="+urlname+" materialtyp='0'>";
				$(".pic_face").find("label").remove();//清除label
				$(".pic_face").find("img").remove();//清除之前的img
				//$(".title_com").css("top","214px");
				$(".left_menu").css("border","0px;");
				$(".pic_face").append(html);
				$(".left_menu").attr("noteadd","");
			}else{//判断副标题
				//alert(2)
				$(".maintilt").each(function (){
					var fmotel=$(this).attr("motel");
					if(fmotel){
						$(this).find(".methad_teeo").css("background-image","url('"+srcurl+"')");
						$(this).find(".methad_teeo").attr("materialtyp","0");
						$(this).find(".methad_teeo").attr("name",urlname);
						$(this).find(".methad_teeo").attr("url",srcurl);
						$(this).find(".methad_teeo").attr("imgsrc",url);
						$(this).attr("noteadd","");
					}
				});
			}
		}
	});
});

//初始化富文本编辑器
var ue = UE.getEditor('editor',{
	autoFloatEnabled:false,
	//用于在编辑富文本时给内容增加默认的样式
	iframeCssUrl: 'http://jimg.caishen.cn/j/ueditor/themes/iframe.css',
	//手机端使用单独的预览页面
	iframeUrlMap:{
        'preview':'~/dialogs/preview/m_preview.html',
    }
});
ue.ready(function(){
	var toolbar = $(".edui-default .edui-editor-toolbarbox");
	toolbar.css({"left": "1095px","position": "fixed","top": "146px","width": "250px","z-index": "1000"});
});
//输入标题
function titMode(){
	var markmod = $(".left_menu").attr("titmark");//取主标题的标识
	if(markmod !=undefined && markmod!= ""){//判断主标题
		var tit_ht = $("#titlefrist").val();
		$(".title_com").html(tit_ht);
	}else{//判断副标题
		$(".maintilt").each(function (){
			var fmotel=$(this).attr("motel");
			if(fmotel==1){
				var tit_ht = $("#titlefrist").val();
				$(this).find(".click_tit").html(tit_ht);
			}
		});
	}
	$("#prompt").css("display","none");
}

//此页面凡是更换样式都需要获取id
function Backmesg(){
	$(".cent").find("img").attr("src","img/back2.png");
}
function Backleave(){
	$(".cent").find("img").attr("src","img/back1.png");
}
function Addtitmesg(){
	$(".addtitle").find("img").attr("src","img/deepplus.png");
}
function Addtitleave(){
	$(".addtitle").find("img").attr("src","img/plus.png");
}
function addvice(){
	 titlemenu();
}
var tem="";

//公共调用
var titlefas = "";var titlesec = "";var showcover = "";var digest = "";
var desc = "";var articleurl = "";var imgurl = "";
function Publicstation(){
	titlefas = $("#titlefrist").val();//标题
	titlesec = $("#titlesecond").val();//作者
	showcover = $("#tickbox").attr("ordercheck");//显示封面
	digest = $("#abstract").val();//摘要
	desc =$("iframe[id*=ueditor]").contents().find("body").html();//UE.getEditor('editor').getContent();//富文本内容
	articleurl = $("#articleurl").find("input").val();//原文链接
	imgurl = $("#fshareimg").attr("src");//图片路径
}
//公共清空
function Publicempty(){
	//将右侧中的所有值全部清空
	$("#titlefrist").val("");
	$("#titlesecond").val("");
	$("#tickbox").attr("ordercheck","0");
	$("#abstract").val("");
	$("#tickbox").find("img").attr("src","img/box.png");
	$("iframe[id*=ueditor]").contents().find("body").html("");
	$("#originalbox").find("img").attr("src","img/box.png");
	$("#originalbox").attr("original","0");
	$("#articleurl").css("display","none");
	$("#articleurl").find("input").val("");
}

//添加副标题
function titlemenu(){
	var titm= $(".maintilt").length;
	$("#fshareimg").attr("src","");
	$(".delmove").css("display","none");
	if(titm>=6){
		$(".vice").css("display","none");
	}
	/**清除主标题标识及边框**/
	var faltit={//将图片外div的宽高设置为正常状态
			"width":"320px",
			"height":"187px",
			"background-color":"#e7e8eb",
			"border":"1px solid #e7e8eb",
	};
	$(".left_menu").css(faltit);
	var fasttit= $(".left_menu").attr("titmark");
	if(fasttit==1){
		Publicstation();
		var fimgurl = $(".titpicture").attr("name");
		var type = $(".titpicture").attr("materialtyp");//素材来源
		var srcimg = $(".titpicture").attr("src");
		var url = $(".titpicture").attr("imgsrc");
		var media_id = $(".titpicture").attr("media_id");
		var html = "<div id ='wubecause' class='beokensure' fname='' fmarker='' fabstract='' fshowcover='' fcontent='' fsourceurl='' fimgurl='' order='0' fmaterialtype='' fsrcimg='' halfurl='' media_id=''></div>";
		$("#dispnone").append(html);
		$("#wubecause").attr("fname",titlefas);
		$("#wubecause").attr("fmarker",titlesec);
		$("#wubecause").attr("fabstract",digest);
		$("#wubecause").attr("fshowcover",showcover);
		$("#wubecause").attr("fcontent",desc);
		$("#wubecause").attr("fsourceurl",articleurl);
		$("#wubecause").attr("fimgurl",fimgurl);
		$("#wubecause").attr("fmaterialtype",type);
		$("#wubecause").attr("fsrcimg",articleurl);
		$("#wubecause").attr("halfurl",url);
		$("#wubecause").attr("media_id",media_id);
		Publicempty();
		$(".beokensure").eq(0).attr("original",$("#originalbox").attr("original"));
		$(".title_com").css({"width":"310px","top":"158px"});
		var titpic = {//设置图片的正常宽高
				"width":"320px",
				"height":"187px",};
		$(".titpicture").css(titpic);
		var picface={"margin":"0"};
		$(".pic_face").css(picface);
		$(".left_menu").attr("titmark","");//清除主标签标志
	}
	/**清除副标题标识及边框*/
	$(".maintilt").css("border","1px solid #e7e8eb");//将其他同级元素的边框设为原始灰色
	$(this).css("border","2px solid #d7231f");//为当前元素添加边框
	if($(".maintilt").size()==0){
		html="<div id='templatemod1' class='maintilt' onmouseover='Vicemesg(this)' onmouseleave='Viceleave(this)'onclick='Ovcetit(1,this)' motel='1' noteadd='1' order ='1' tem='1' style='border:2px solid #d7231f;'>"+
		 "<div id='' class='click_tit'>标题</div>"+
		 "<div class='methad_teeo' style='background-size:100% 100%; background-image: url(img/defaultpic.png)'></div>"+
		 "<div order='1' class='delete_tit' style='display:none;'><img src='img/trash.png' onclick='deletit(this,event)' style='float: right; margin-top: 10px; margin-right: 10px'></div>"+
		 "</div>";
		 $("#templtitle").append(html);
		 var htm= "<div id ='youbecause1' order = '1' class='beokensure' fname='' fmarker='' fabstract='' fshowcover='0' fcontent='' fsourceurl='' fimgurl='' halfurl='' original="+$("#originalbox").attr("original")+"></div>";
		 $("#dispnone").append(htm);
	}else{
		$(".maintilt").each(function(){
			 var fmotel =$(this).attr("motel");
			 if(fmotel==1){
				var trr = $(".maintilt[motel]").attr("tem");
				var tte= $("#templtitle").find(".maintilt:last-child").attr("tem");
				var tmm = parseInt(tte);
				var tuu = tmm+1;
				//获取右侧菜单中的值-存入副标题隐藏域
				Publicstation();
				var fimgurl =$(".methad_teeo").attr("name");
				var type = $(".methad_teeo").attr("materialtyp");
				var srcimg = $(".methad_teeo").attr("url");
				var url = $(".methad_teeo").attr("imgsrc");
				var media_id = $(".methad_teeo").attr("media_id");
				var htm2 = "<div id ='youbecause"+tuu+"' order = '"+tuu+"' class='beokensure' fname='' fmarker='' fabstract='' fshowcover='0' fcontent='' fsourceurl='' fimgurl='' halfurl='' media_id=''></div>";
				$("#youbecause"+trr+"").attr("order",tuu);
				$("#youbecause"+trr+"").attr("fname",titlefas);
				$("#youbecause"+trr+"").attr("fmarker",titlesec);
				$("#youbecause"+trr+"").attr("fabstract",digest);
				$("#youbecause"+trr+"").attr("fshowcover",showcover);
				$("#youbecause"+trr+"").attr("fcontent",desc);
				$("#youbecause"+trr+"").attr("fsourceurl",articleurl);
				$("#youbecause"+trr+"").attr("fimgurl",fimgurl);
				$("#youbecause"+trr+"").attr("fmaterialtype",type);
				$("#youbecause"+trr+"").attr("fsrcimg",articleurl);
				$("#youbecause"+trr+"").attr("halfurl",url);
				$("#youbecause"+trr+"").attr("media_id",media_id);
				$("#dispnone").append(htm2);
				Publicempty();
				$(".beokensure").eq(trr).attr("original",$("#originalbox").attr("original"));
				$(".maintilt").removeAttr("motel");//清除所有副标题的标示
			 }
		});
		var html="";var tmm="";var tuu="";
		var tte= $("#templtitle").find(".maintilt:last-child").attr("tem");
		if(tte==undefined){
			tmm==0;
			tuu= tmm+1;
		}else{
			tmm= parseInt(tte);
			tuu= tmm+1;
		}
		var order = $("#templtitle").find(".maintilt").size();
		var or =order+1;
		html="<div id='templatemod"+tuu+"' class='maintilt' onmouseover='Vicemesg(this)' onmouseleave='Viceleave(this)'onclick='Ovcetit("+tuu+",this)' motel='1' noteadd='1' order ="+or+" tem="+tuu+" style='border:2px solid #d7231f;'>"+
		 "<div id='' class='click_tit'>标题</div>"+
		 "<div class='methad_teeo' style='background-size:100% 100%; background-image: url(img/defaultpic.png)'></div>"+
		 "<div order='"+tuu+"' class='delete_tit' style='display:none;'><img src='img/trash.png' onclick='deletit(this,event)' style='float: right; margin-top: 10px; margin-right: 10px'></div>"+
		 "</div>";
		$("#templtitle").append(html);
	}
}
//副标题鼠标悬浮事件
function Vicemesg(obj){
	$(obj).find(".delete_tit").css("display","block");
}
function Viceleave(obj){
	$(obj).find(".delete_tit").css("display","none");
}
	
//主标题点击事件
function Hosttit(){
	var  tel = $("#templtitle").find(".maintilt").size();//maintilt
	console.log("tel:"+tel);
	if(tel!=0){//以下事件只有有副标题的时候执行
		//副标题事件开始
		$(".maintilt").each(function (){
			var fmotel=$(this).attr("motel");
			if(fmotel==1){
				var thh = $(".maintilt[motel]").attr("tem");
				//alert(thh)
				Publicstation();
				var fimgurl = $(".maintilt[motel]").find(".methad_teeo").attr("name");
				//alert(fimgurl)
				var type = $(".methad_teeo").attr("materialtyp");
				var srcimg = $(".methad_teeo").attr("url");
				var url = $(".methad_teeo").attr("imgsrc");
				var media_id = $(".methad_teeo").attr("media_id");
				if($("#youbecause"+thh+"").attr("order")==undefined){
					var htm2 = "<div id ='youbecause"+thh+"' order = '"+thh+"' class='beokensure' fname='' fmarker='' fabstract='' fshowcover='0' fcontent='' fsourceurl='' fimgurl='' halfurl='' media_id=''></div>";
					$("#dispnone").append(htm2);
				}
				$("#youbecause"+thh+"").attr("order",thh);
				$("#youbecause"+thh+"").attr("fname",titlefas);
				$("#youbecause"+thh+"").attr("fmarker",titlesec);
				$("#youbecause"+thh+"").attr("fabstract",digest);
				$("#youbecause"+thh+"").attr("fshowcover",showcover);
				$("#youbecause"+thh+"").attr("fcontent",desc);
				$("#youbecause"+thh+"").attr("fsourceurl",articleurl);
				$("#youbecause"+thh+"").attr("fimgurl",fimgurl);
				$("#youbecause"+thh+"").attr("fmaterialtype",type);
				$("#youbecause"+thh+"").attr("fsrcimg",articleurl);
				$("#youbecause"+thh+"").attr("halfurl",url);
				$("#youbecause"+thh+"").attr("media_id",media_id);
				$(".maintilt").removeAttr("motel");
			}
		});
		$(".maintilt").attr("style","");//清除所有副标题中的边框
		$(".left_menu").css("border","2px solid #d7231f");//为主标题添加边框
		$(".left_menu").css("background-color","#fff");//为主标题添加背景色
		$(".left_menu").attr("titmark","1");//打上主标签标识
		var faltit ={//设置选中状态的图片外div的缩放宽高
				"width":"290px",
				"height":"132px",
				"margin-left":"13px",
				"margin-top":"13px",};
		$(".pic_face").removeAttr("style");
		$(".titpicture").removeAttr("style");
		$(".title_com").removeAttr("style");
	}
	//将左侧已输入标题内容设入右侧标题栏(主标题)
	var fname=$("#wubecause").attr("fname");//标题
	var fmarker = $("#wubecause").attr("fmarker");
	var fshowcover = $("#wubecause").attr("fshowcover");
	var fabstract =  $("#wubecause").attr("fabstract");
	var fcontent =  $("#wubecause").attr("fcontent");
	var fsourceurl = $("#wubecause").attr("fsourceurl");
	$("#titlefrist").val(fname);
	$("#titlesecond").val(fmarker);
	$("#abstract").val(fabstract);
	$("#tickbox").attr("ordercheck",fshowcover);
	if(fshowcover==1){
		$("#tickbox").find("img").attr("src","img/tick.png");
	}else{
		$("#tickbox").find("img").attr("src","img/box.png");
	}
	$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
	if(fsourceurl!="" ||fsourceurl!=undefined){
		$("#originalbox").find("img").attr("src","img/tick.png");
		$("#articleurl").css("display","");
		$("#originalbox").attr("original","1");
		$("#articleurl").find("input").val(fsourceurl);
	}else{
		$("#originalbox").find("img").attr("src","img/box.png");
		$("#articleurl").css("display","none");
		$("#originalbox").attr("original","0");
	}
	//将左侧已显示图片显示到右侧
	var noteadd = $(".left_menu").attr("noteadd");
	if(noteadd==1){
		$("#fshareimg").attr("src","");
		$(".delmove").css("display","none");
	}else{
		var url= $(".pic_face").find("img").attr("src");
		$("#fshareimg").attr("src",url).show();
		$(".delmove").css("display","inline-block");
	}
}
//副标题点击事件
function Ovcetit(tem,obj){
	//var basePath = $("#lithreaber").attr("serverimg");
	//下面的事件加载前先存储右侧的值
	var title = $(".left_menu").attr("titmark");
	if(title==1){//如果主标题被选中
		Publicstation();
	    var fimgurl =$(".titpicture").attr("name");
		var type = $(".titpicture").attr("materialtyp");
		var srcimg = $(".titpicture").attr("src");
		var url = $(".titpicture").attr("imgsrc");
		var media_id = $(".titpicture").attr("media_id");
		$("#wubecause").attr("fname",titlefas);
		$("#wubecause").attr("fmarker",titlesec);
		$("#wubecause").attr("fabstract",digest);
		$("#wubecause").attr("fshowcover",showcover);
		$("#wubecause").attr("fcontent",desc);
		$("#wubecause").attr("fsourceurl",articleurl);
		$("#wubecause").attr("fimgurl",fimgurl);
		$("#wubecause").attr("fmaterialtype",type);
		$("#wubecause").attr("fsrcimg",articleurl);
		$("#wubecause").attr("halfurl",url);
		$("#wubecause").attr("media_id",media_id);
		Publicempty();
		$(".beokensure").eq(0).attr("original",$("#originalbox").attr("original"));
		//先放值
		var fname = $("#youbecause"+tem+"").attr("fname");
		var fmarker = $("#youbecause"+tem+"").attr("fmarker");
		var fshowcover = $("#youbecause"+tem+"").attr("fshowcover");
		var fabstract =  $("#youbecause"+tem+"").attr("fabstract");
		var fcontent =  $("#youbecause"+tem+"").attr("fcontent");
		//var original =$("#originalbox").attr("original");
		var fsourceurl = $("#youbecause"+tem+"").attr("fsourceurl");
		 //将右侧中的所有值全部清空再将值放入右侧菜单
		$("#titlefrist").val(fname);
		$("#titlesecond").val(fmarker);
 		$("#abstract").val(fabstract);
		$("#tickbox").attr("ordercheck",fshowcover);
		if(fshowcover==1){
			$("#tickbox").find("img").attr("src","img/tick.png");
		}else{
			$("#tickbox").find("img").attr("src","img/box.png");
		}
		$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
		if(fsourceurl!="" ||fsourceurl!=undefined){
			$("#originalbox").find("img").attr("src","img/tick.png");
			$("#articleurl").css("display","");
			$("#originalbox").attr("original","1");
			$("#articleurl").find("input").val(fsourceurl);
		}else{
			$("#originalbox").find("img").attr("src","img/box.png");
			$("#articleurl").css("display","none");
			$("#originalbox").attr("original","0");
		}
		$(".left_menu").attr("titmark","");//清除主标签标志
		$("#templatemod"+tem+"").css("border","2px solid #d7231f");//为当前元素添加边框
		$("#templatemod"+tem+"").attr("motel","1");
	}else{
		$(".maintilt").css("border","1px solid #e7e8eb");//将其他同级元素的边框设为原始灰色
		var tte= $(".maintilt[motel]").attr("tem");
		$("#templatemod"+tem+"").css("border","2px solid #d7231f");//为当前元素添加边框
		//取到值
		if(tem!=tte){
			Publicstation();
			var fimgurl =$(".maintilt[motel]").find(".methad_teeo").attr("name");
			var type = $(".methad_teeo").attr("materialtyp");
			var srcimg = $(".methad_teeo").attr("url");
			var url = $(".methad_teeo").attr("imgsrc");
			var media_id = $(".methad_teeo").attr("media_id");
			$("#youbecause"+tte+"").attr("order",tte);
			$("#youbecause"+tte+"").attr("fname",titlefas);
			$("#youbecause"+tte+"").attr("fmarker",titlesec);
			$("#youbecause"+tte+"").attr("fabstract",digest);
			$("#youbecause"+tte+"").attr("fshowcover",showcover);
			$("#youbecause"+tte+"").attr("fcontent",desc);
			$("#youbecause"+tte+"").attr("fsourceurl",articleurl);
			$("#youbecause"+tte+"").attr("fimgurl",fimgurl);
			$("#youbecause"+tte+"").attr("fmaterialtype",type);
			$("#youbecause"+tte+"").attr("fsrcimg",articleurl);
			$("#youbecause"+tte+"").attr("halfurl",url);
			$("#youbecause"+tte+"").attr("media_id",media_id);
		}
		Publicempty();
		$(".beokensure").eq(tte).attr("original",$("#originalbox").attr("original"));
		console.log("2.tte="+tte+" tem="+tem);
		//放值
		var fname = $("#youbecause"+tem+"").attr("fname");
		var fmarker = $("#youbecause"+tem+"").attr("fmarker");
		var fshowcover = $("#youbecause"+tem+"").attr("fshowcover");
		var fabstract =  $("#youbecause"+tem+"").attr("fabstract");
		var fcontent =  $("#youbecause"+tem+"").attr("fcontent");
		//var original =$("#originalbox").attr("original");
		var fsourceurl = $("#youbecause"+tem+"").attr("fsourceurl");
		 //将右侧中的所有值全部清空,再将值放入右侧菜单
		$("#titlefrist").val(fname);
		$("#titlesecond").val(fmarker);
 		$("#abstract").val(fabstract);
		$("#tickbox").attr("ordercheck",fshowcover);
		if(fshowcover==1){
			$("#tickbox").find("img").attr("src","img/tick.png");
		}else{
			$("#tickbox").find("img").attr("src","img/box.png");
		}
		$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
		if(fsourceurl!="" ||fsourceurl!=undefined){
			$("#originalbox").find("img").attr("src","img/tick.png");
			$("#articleurl").css("display","");
			$("#originalbox").attr("original","1");
			$("#articleurl").find("input").val(fsourceurl);
		}else{
			$("#originalbox").find("img").attr("src","img/box.png");
			$("#articleurl").css("display","none");
			$("#originalbox").attr("original","0");
		}
		 
		$("#templatemod"+tte+"").removeAttr("motel");
		$("#templatemod"+tem+"").attr("motel","1");
	}	
	
	var border = {
			"border":"1px solid #e7e8eb",
			"border-bottom":"none !important",
	};
	var  tel = $("#templtitle").find(".maintilt").size();//maintilt
	
	var faltit={//将图片外div的宽高设置为正常状态
			"width":"320px",
			"height":"187px",
			"background-color":"#e7e8eb",
			"border":"1px solid #e7e8eb",};
	$(".left_menu").css(faltit);
	$(".left_menu").attr("titmark","");//清除主标签标志
	$(".title_com").css({"width":"310px","top":"158px"});
	var titpic = {//设置图片的正常宽高
			"width":"320px",
			"height":"187px",};
	$(".titpicture").css(titpic);
	var picface={
			"margin":"0",};
	$(".pic_face").css(picface);
	//将左侧已显示图片显示到右侧
	var upload = $(obj).attr("noteadd");
	if(upload=="" ||upload==undefined){
		var url = $(obj).find("div").next().attr("url");
		$("#fshareimg").attr("src",fileserver + url).show();
		$(".delmove").css("display","inline-block");
	}else{
		$("#fshareimg").attr("src","");
		$(".delmove").css("display","none");
	}
}
//删除当前副标题
function deletit(obj,event){
	//阻止事件冒泡
	event.stopPropagation();
	var titmen = $(".maintilt").length;
	if(titmen<=7){//副标题上限7个
		$(".vice").css("display","");
	}
	var the= $(obj).parent().parent().attr("tem");
	$("#youbecause"+the+"").remove();  //删除对应的隐藏域
	$(obj).parent().parent().remove();//删除当前副标题
	var topthe = the-1;//将其上一级设为选中
	if(topthe==0){
		$(".left_menu").attr("titmark","1");
		var sty = {
			  "background-color": "#fff",
	          "border": "2px solid #d7231f",
	    	  "height": "162px",
	    	  "width": "320px",};
		$(".left_menu").attr("style",sty);
		var faltit ={//设置选中状态的图片外div的缩放宽高
				"width":"290px",
				"height":"132px",
				"margin-left":"13px",
				"margin-top":"13px",};
		$(".pic_face").removeAttr("style");
		$(".titpicture").removeAttr("style");
		$(".title_com").removeAttr("style");
		$(".maintilt").css("border","1px solid #e7e8eb");//将其他同级元素的边框设为原始灰色
		$(".maintilt").removeAttr("motel");
		var fasttit = $(".left_menu").attr("titmark");
		if(fasttit==1){
			var	fname= $("#wubecause").attr("fname");//标题
			var	fmarker = $("#wubecause").attr("fmarker");
			var	fshowcover = $("#wubecause").attr("fshowcover");
			var	fabstract =  $("#wubecause").attr("fabstract");
			var	fcontent =  $("#wubecause").attr("fcontent");
			var	original = $("#originalbox").attr("original");
			var	fsourceurl = $("#wubecause").attr("fsourceurl");
			 //将右侧中的所有值全部清空,再将值放入右侧菜单
			$("#titlefrist").val(fname);
			$("#titlesecond").val(fmarker);
	 		$("#abstract").val(fabstract);
			$("#tickbox").attr("ordercheck",fshowcover);
			if(fshowcover==1){
				$("#tickbox").find("img").attr("src","img/tick.png");
			}else{
				$("#tickbox").find("img").attr("src","img/box.png");
			}
			$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
			if(original==1){
				$("#originalbox").find("img").attr("src","img/tick.png");
				$("#articleurl").css("display","");
				$("#articleurl").find("input").val(fsourceurl);
			}else{
				$("#originalbox").find("img").attr("src","img/box.png");
				$("#articleurl").css("display","none");
			}
		}
	}else{
		$(".maintilt").removeAttr("motel");
		$("#templatemod"+topthe+"").attr("motel","1");
		$(".maintilt").css("border","1px solid #e7e8eb");//将其他同级元素的边框设为原始灰色
		$("#templatemod"+topthe+"").attr("style","border:2px solid #d7231f !important");
		
		Publicempty();
		//放值
		var	fname = $("#youbecause"+topthe+"").attr("fname");
		var	fmarker = $("#youbecause"+topthe+"").attr("fmarker");
		var	fshowcover = $("#youbecause"+topthe+"").attr("fshowcover");
		var	fabstract =  $("#youbecause"+topthe+"").attr("fabstract");
		var	fcontent =  $("#youbecause"+topthe+"").attr("fcontent");
		var	original =$("#originalbox").attr("original");
		var	fsourceurl = $("#youbecause"+topthe+"").attr("fsourceurl");
		//将右侧中的所有值全部清空,再将值放入右侧菜单
		$("#titlefrist").val(fname);
		$("#titlesecond").val(fmarker);
 		$("#abstract").val(fabstract);
		$("#tickbox").attr("ordercheck",fshowcover);
		if(fshowcover==1){
			$("#tickbox").find("img").attr("src","img/tick.png");
		}else{
			$("#tickbox").find("img").attr("src","img/box.png");
		}
		$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
		if(original==1){
			$("#originalbox").find("img").attr("src","img/tick.png");
			$("#articleurl").css("display","");
			$("#articleurl").find("input").val(fsourceurl);
		}else{
			$("#originalbox").find("img").attr("src","img/box.png");
			$("#articleurl").css("display","none");
		}
	}
}
//删除当前图片
function delimg(){
	$("#fshareimg").attr("src","");
	var markmod = $(".left_menu").attr("titmark");//取主标题的标识
	if(markmod !=undefined && markmod!= ""){//判断主标题
		$(".pic_face").find("img").remove();//清除之前的img	
		var html="";
		html="<label style='font-weight:normal;'>封面图片</label>";
		$(".delmove").css("display","none");
		$(".pic_face").append(html);
		$(".left_menu").attr("noteadd","1");//重新将上传图片标识赋值
		$("#wubecause").attr("fimgurl","");
		$("#wubecause").attr("media_id","");
	}else{//判断副标题
		$(".maintilt").each(function (){
			var fmotel=$(this).attr("motel");
			if(fmotel==1){
				$(this).find(".methad_teeo").css("background-image","url('img/defaultpic.png')");//将图片设置为原始图片
				$(".delmove").css("display","none");
				$(this).attr("noteadd","1");//重新将上传图片标识赋值
				$(this).attr("fimgurl","");
				$(this).attr("media_id","");
			}
		});
		
	}
}
$(".cent").click(function(){
	location.href="template/red/wx/graphicnewseditor.jsp";
});
//点击打勾
function piccheck(){
	var check =$("#tickbox").attr("ordercheck");
	if(check==0 ||check==""){
		$("#tickbox").find("img").attr("src","img/tick.png");
		$("#tickbox").attr("ordercheck","1");
	}else if (check==1){
		$("#tickbox").find("img").attr("src","img/box.png");
		$("#tickbox").attr("ordercheck","0");
	}
}
//点击打勾
function originallink(){
	var original =$("#originalbox").attr("original");
	if(original==0 ||original==""){
		$("#originalbox").find("img").attr("src","img/tick.png");
		$("#originalbox").attr("original","1");
		$("#articleurl").css("display","");
		$("#linkprompt").css("display","none");
	}else if (original==1){
		$("#originalbox").find("img").attr("src","img/box.png");
		$("#originalbox").attr("original","0");
		$("#articleurl").css("display","none");
	}
}
//点击打勾
function DMlink(){
	var dmcheck =$("#dmbox").attr("dmcheck");
	if(dmcheck==0 ||dmcheck==""){
		$("#dmbox").find("img").attr("src","img/tick.png");
		$("#dmbox").attr("dmcheck","1");
	}else if (dmcheck==1){
		$("#dmbox").find("img").attr("src","img/box.png");
		$("#dmbox").attr("dmcheck","0");
	}
}
//点击打勾
function publicclick(tem){
	var publ =$("#public"+tem+"").attr("publ");
	if(publ==0 ||publ==""){
		$("#public"+tem+"").find("img").attr("src","img/tick.png");
		$("#public"+tem+"").attr("publ","1");
	}else if (publ==1){
		$("#public"+tem+"").find("img").attr("src","img/box.png");
		$("#public"+tem+"").attr("publ","0");
	}
}
//右侧鼠标悬浮事件(图片)
function Rightoptions(){
	$(".overtwice").attr("src","img/picture01.png");
	var fcolor = {
			"color":"#e72120",
			"border":"#e42621 1px solid",
	};
	$("#reghtsept").css(fcolor);
}
function Rightleave(){
	$(".overtwice").attr("src","img/picture.png");
	var fcolor = {
			"color":"#616366",
			"border":"#e7e8eb 1px solid",
			"border-bottom":"none",};
	$("#reghtsept").css(fcolor);
}

//右侧鼠标悬浮事件(视频)
function Rightoptions1(){
	$(".overtwice1").attr("src","img/video01.png");
	var fcolor = {
			"color":"#e72120",
			"border":"#e42621 1px solid",};
	$("#reghtsept1").css(fcolor);
}
function Rightleave1(){
	$(".overtwice1").attr("src","img/video.png");
	var fcolor = {
			"color":"#616366",
			"border":"#e7e8eb 1px solid",
			"border-bottom":"none",};
	$("#reghtsept1").css(fcolor);
}
//右侧鼠标悬浮事件(音频)
function Rightoptions3(){
	$(".overtwice3").attr("src","img/audio01.png");
	var fcolor = {
			"color":"#e72120",
			"border":"#e42621 1px solid",};
	$("#reghtsept3").css(fcolor);
}
function Rightleave3(){
	$(".overtwice3").attr("src","img/audio.png");
	var fcolor = {
			"color":"#616366",
			"border":"#e7e8eb 1px solid",
			"border-bottom":"1px solid #e7e8eb",};
	$("#reghtsept3").css(fcolor);
}

function fenyuar(){
	$(".heartyou").attr("style","border:1px solid #d7231f;");
}
function yheyuar(){
	$(".heartyou").attr("style","border:1px solid #e7e8eb;");
}
function chunyuar(){
	$(".featyou").attr("style","border:1px solid #d7231f;");
}
function ckuuyuar(){
	$(".featyou").attr("style","border:1px solid #e7e8eb;");
}
function jumpyuar(){
	$(".jump").attr("style","border:1px solid #d7231f;");
}
function jumphov(){
	$(".jump").attr("style","border:1px solid #e7e8eb;");
}
//图片点击事件
function Suspensionbox(cleclen){
	var logo= $("#picturenice"+cleclen+"").attr("logo");
	if(logo==1){
		$("#picturenice"+cleclen+"").find(".cleaver").css("display","none");
		$("#picturenice"+cleclen+"").removeAttr("logo");
	}else{
		$("#picturenice"+cleclen+"").find(".cleaver").css("display","inline-block");
		$("#picturenice"+cleclen+"").attr("logo","1");
	}
}
//图片确定点击事件(1.获取有选中标识的图片 2.循环将图片路径append到富文本中)未选中图片给予提示
function picturesure(){
	var html="";
	$(".picturebox[logo]").each(function(n,v){
		 var src = $(this).find("img").attr("src");
		 var wximgurl = $(this).find("img").attr("wximgurl");
		 if(wximgurl!="undefined"||wximgurl!=undefined){
			 html+="<p><img src='"+src+"' wximgurl='"+wximgurl+"'></p>";
			 $("#reghtsept_dlg").dialog("close");
		 }
	});
	$("iframe[id*=ueditor]").contents().find("body").append(html);
	var logos =$(".picturebox[logo]").length;
	if (logos==0){
		$("#pictureprompt").css("display","");
		return;
	}else{
		$("#pictureprompt").css("display","none");
	}
}
//"图片"按钮点击事件
function rightpicture(){
	//移除选中的图片   王文樟20161010
	$(".picturebox[logo]").each(function(){
		$(this).removeAttr("logo");
		$(this).find(".cleaver").css("display","none");
	});
	var data={};
	data["type"]=0;
	var dat = {
			jsonobj :JSON.stringify(data)
	};
	$.ajax({
		type:"post",
		dataType:'json',
		data:dat,
		url : "mater/getGroupCheart.do",//获取数据的url参数由组件自动添加
 		success : function(data){
 			$(".leftmenu").find("div").remove();
 			var html ="";
 			html ='<div id ="groupsize'+0+'" fid='+0+' onclick="groupid(0,0,this)" class="grouping">未分组</div>'
			 +'</div>';
			 $(".leftmenu").append(html);
 			$(data.rows).each(function(){
 				var fname = this.fname;
//	 				if(fname ==""){
//	 					fname="未分组";
//	 				}
 				html ='<div id ="groupsize'+this.fid+'" fid='+this.fid+' onclick="groupid('+this.fid+',0,this)" class="grouping">'+fname+'</div>'
 					 +'</div>';
 				$(".leftmenu").append(html);
 			});
 			$("#reghtsept_dlg").dialog("open");
 			$("#reghtsept_dlg").dialog("resize");
 		}
 	});
}
//分组点击事件
function groupid(fid,type,obj){
	group(1,fid,type);
	$(".grouping").removeClass("selectGroup");
	$(obj).addClass("selectGroup");
	$(".grouping").removeAttr("push");
	$("#groupsize"+fid+"").attr("push","1");
}
//根据分组，上一页，下一页查询事件
function group(pageno,fid,type){
	$("#picturemore").empty();
	$("#videoseal").empty();
	$("#music").empty();
	$(".buttment").remove();
	$("#picturemore").find(".picturebox").removeAttr("logo");
	$(".cleaver").css("display","none");
	if(pageno=="" ||pageno==undefined){
		pageno=1;
	}
	var pagesize = 12;
	if(type==1){
		pagesize=4;
	}
	var data={};
	data["type"]=type;
	data["pageNo"]=pageno;
	data["pageSize"]=pagesize;
	data["fmgrouptype"]=fid;
	var dat = {
			jsonobj :JSON.stringify(data)
	};
	$.ajax({
		type:"post",
		dataType:'json',
		data:dat,
		url : "mater/getMatInMo.do",//获取数据的url参数由组件自动添加
 		success : function(data){
 			var ftype = "";
 			$(data.resultMap.rows).each(function(){
 				ftype = this.ftype;
	 			var cleclen = $("#picturemore").find(".picturebox").size()+1;
	 			var widthleng="";
	 			if(cleclen>4){
	 				widthleng=226;
	 			}else if (cleclen<=4){
	 				widthleng=36;
	 			}
	 			var url = this.furl;
	 			var srcurl=fileserver+url;//图片路径
	 			var wxurl=this.fwxurl;//微信图片路径
	 			var html="";
	 			if(this.ftype==0){
		 			html='<div id="picturenice'+cleclen+'"  onclick="Suspensionbox('+cleclen+')" class="picturebox">'
	 				     +'<div class="picmmu"><img class="goumen" src="'+srcurl+'" wxImgUrl="'+wxurl+'"></div>'
	 					 +'<div style="display:none;" class="cleaver">'
	 					 +'<img class="cleaver-check" src="img/yes03.png" /></div>'
	 					 +'</div>';
					$("#picturemore").append(html);
	 			}else if(this.ftype==1){
	 				html= '<div id="video'+this.fid+'" class="videoreal" onclick="videobeau('+this.fid+')" style=" margin-left: 20px; margin-top: 20px;width: 282px;display:inline-block;">'
		 	    		  +'<div id="videolev" class="videotit" fid='+this.fid+' url='+this.furl+'>'
		 	    		  +'<div>'
		 	    		  +'<label class="videopao">标题</label>'
		 	    		  +'<div class="videobig"></div>'
		 	    		  +'<span class="titbottom"></span>'
		 	    		  +'<label class="videolast">'+this.fname+'</label>'
		 	    		  +'</div>'+'</div>'
		 	    		  +'<div class="videoall" style="display:none;"><img style="margin-left: 117px;margin-top:96px;" src="img/yes03.png"></div>'
		 	    		  +'</div>';
		 	    	$("#videoseal").append(html);
	 			}else if(this.ftype==2){
		 			html='<tr onclick="checkred('+this.fid+',this)" class="audio" style=" border-bottom: 1px solid #e7e7eb;height: 50px;" id="checkredio'+this.fid+'">'
		 		    	 +'<td class="rediobtn" style="width: 200px;"><img class="sucmelu" src="img/ontckeck.png"></td>'
		 		    	 +'<td style="width: 300px;" url = '+this.furl+'>'+this.fname+'</td>'
		 		    	 +'<td style="width: 300px;text-align:center;"><img style="width: 40px;height: 40px" src="img/trumpet03.png"></td>'
		 		    	 +'</tr>';
		 			}
	 			   $("#music").append(html);
 			});
 			var htm = "";
 			htm='<div class="buttment">'
 				+'<span style="display: inline-block;  line-height: 25px;">'
 				+'<span style="border: 1px solid #e7e8eb;"onclick="heartone('+ftype+')" class="featyou" onmouseover="chunyuar()" onmouseleave="ckuuyuar()"><img style="margin-bottom: 5px;" src="img/topye.png"></span>'
 				+'<label id ="hearpagenow" style="font-weight: normal">'+data.pageno+'</label>'
 				+'<span> / </span>'
 				+'<label id ="hearpageall" style="font-weight: normal">'+data.pageCount+'</label>'
 				+'<span style="border: 1px solid #e7e8eb;"onclick="heartnext('+ftype+')" class="heartyou" onmouseover="fenyuar()" onmouseleave="yheyuar()"><img style="margin-bottom: 5px;" src="img/nextye.png"></span>'
 				+'</span>'
 				+'<span style="display: inline-block; width: 80px;margin-left: 10px;"><input type="text" class="form-control input-sm hearmysize"></span>'
 				+'<span class="jump" onclick = "jsumbtn('+ftype+')" onmouseover="jumpyuar()" onmouseleave="jumphov()">跳转</span>'
 				+'</div>';
 			if(ftype==0){
 				$("#pictureo").append(htm);
 			}else if(ftype==1){
 				$("#video").append(htm);
 			}else if(ftype==2){
 				$("#voiceo").append(htm);
 			}
 			
 		}
	});
}
//下一页
function heartnext(ftype){
	var pagenow = $("#hearpagenow").html();
	var pageall = $("#hearpageall").html();
	var page = parseInt(pagenow)+1;
	if(pagenow==pageall){
		$.messager.alert("提示","已经是最后一页！","error");
		return;
	}else{
		var fid="";
		if(ftype==0){
			fid =$(".leftmenu").find(".grouping[push]").attr("fid");
			group(page,fid,0);
		}else if(ftype==1){
			
		}else if(ftype==2){
			fid =$(".leftaudio").find(".grouping[push]").attr("fid");
			group(page,fid,2);
		}
		
	}
}
//上一页
function heartone(ftype){
	var pagenow = $("#hearpagenow").html();
	var pageall = $("#hearpageall").html();
	var page = parseInt(pagenow)-1;
	if(pagenow==1){
		$.messager.alert("提示","已经是第一页了！","error");
		return;
	}else{
		var fid="";
		if(ftype==0){
			fid =$(".leftmenu").find(".grouping[push]").attr("fid");
			group(page,fid,0);
		}else if(ftype==1){
			
		}else if(ftype==2){
			fid =$(".leftaudio").find(".grouping[push]").attr("fid");
			group(page,fid,2);
		}
		
	}
}
//跳转
function jsumbtn(ftype){
	var  jumpye = parseInt($(".hearmysize").val());
	var pageall = parseInt($("#hearpageall").html());
	if(jumpye>pageall){
		$.messager.alert("提示","请输入正确的页码！","error");
		return;
	}else{
		var fid="";
		if(ftype==0){
			fid =$(".leftmenu").find(".grouping[push]").attr("fid");
			group(jumpye,fid,0);
		}else if(ftype==1){
			
		}else if(ftype==2){
			fid =$(".leftaudio").find(".grouping[push]").attr("fid");
			group(jumpye,fid,2);
		}
		
	}
}

//视频分组点击事件
function rightvideo(){
	var data={};
	data["type"]=1;
	var dat = {
			jsonobj :JSON.stringify(data)
	};
	$.ajax({
		type:"post",
		dataType:'json',
		data:dat,
		url : "mater/getGroupCheart.do",//获取数据的url参数由组件自动添加
 		success : function(data){
 			$(".leftvideo").find("div").remove();
 			var html ="";
 			html ='<div id ="groupsize'+0+'" fid='+0+' onclick="groupid(0,0,this)" class="grouping">未分组</div>'
			 +'</div>';
			 $(".leftvideo").append(html);
 			$(data.rows).each(function(){
 				var fname = this.fname;
//		 				if(fname ==""){
//		 					fname="未分组";
//		 				}
//		 				var html =""
 				html ='<div id ="groupsize'+this.fid+'" fid='+this.fid+' onclick="groupid('+this.fid+',1,this)" class="grouping">'+fname+'</div>'
 					 +'</div>';
 				$(".leftvideo").append(html);
 			});
 		}
 	});
}
//视频确定点击事件(1.获取有选中标识的视频 2.循环将视频路径append到富文本中)未选中视频给予提示
function videosure(obj){
	$(".videoreal[logmer]").each(function(){
		var aaa= $(".videoreal[logmer]").attr("id");
		var src =$(".videoreal[logmer]").find("#videolev").attr("url");
		var fid =$(".videoreal[logmer]").find("#videolev").attr("fid");
		var url ="http://o2o.caishen.cn:8888/DFServer/fileserver/"+src;
		var html="<div id='cover'>"
				 +"<img style='width:150px;heigth:150px;' playid="+fid+" url="+url+" onclick='playVedio(this)' src='img/banner.jpg'/>"
				 +"</div>"
				 +'<img class="closeCover hidden" onclick="closeBTN();" src="mobile/img/close.png" style="right: 0px;position: absolute; z-index: 10086;top: 55px;">'
				 +"<div id='playVedio'></div>";
		$("iframe[id*=ueditor]").contents().find("body").append(html);
		$("#reghtsept1").jbootdialog("hide");
	});
}
function playVedio(obj){
	$(".closeCover").removeClass("hidden");
	$("#cover").addClass("showCoverPage");
	var url = $(obj).attr("url");
	var playid = $(obj).attr("playid");
    var flashvars={
        f:url,
        c:0,//=0：调用ckplayer.js =1：调用ckplayer.xml
        loaded:'loadedHandler',
        p:1,//=0：默认暂停  =1：默认播放=2：默认不加载视频
        my_url:'http://192.168.11.80/dayoshop/playVedio.html?play='+playid
    };
    var video=[''];
    CKobject.embed('ckplayer/ckplayer.swf','playVedio','ckplayer','500','300',false,flashvars,video);
    var screenWidth = document.body.clientWidth;//
    var screenHeight = $(window).height();
    var playerWidth = $("#ckplayer").width();
    var playerHeight = $("embed").height();
    $("#ckplayer").css({
		'left':15,
		'top':80,
		'position':'absolute',
		'z-index':1000
    });
    $("#cover").addClass("showCoverPage");
}

//“音频”按钮点击事件
function rightaudio(){
	var data={};
	data["type"]=2;
	var dat = {
			jsonobj :JSON.stringify(data)
	};
	$.ajax({
		type:"post",
		dataType:'json',
		data:dat,
		url : "mater/getGroupCheart.do",//获取数据的url参数由组件自动添加
 		success : function(data){
 			$(".leftaudio").find("div").remove();
 			var html ="";
 			html ='<div id ="groupsize'+0+'" fid='+0+' onclick="groupid(0,0,this)" class="grouping">未分组</div>'
			 +'</div>';
			 $(".leftaudio").append(html);
 			$(data.rows).each(function(){
 				var fname = this.fname;
//	 				if(fname ==""){
//	 					fname="未分组";
//	 				}
//	 				var html =""
 				html ='<div id ="groupsize'+this.fid+'" fid='+this.fid+' onclick="groupid('+this.fid+',2,this)" class="grouping">'+fname+'</div>'
 					 +'</div>';
 				$(".leftaudio").append(html);
 			});
 		}
 	});
}
//音频确定点击事件(1.获取有选中标识的音频 2.循环将音频路径append到富文本中)未选中音频给予提示
function sureaudio(){
	$(".audio[redlogo]").each(function(){
		var src = $(this).find(".rediobtn").next().attr("url");
		var url ="http://o2o.caishen.cn:8888/DFServer/fileserver/"+src;
		var html="<embed height='50px' width='400px' src="+url+" />";
		$("iframe[id*=ueditor]").contents().find("body").append(html);
		$("#reghtsept3").jbootdialog("hide");
	});
}

//视频点击事件
function videobeau(fid){
	var labe = $("#videoseal").find(".videoreal").size();
	var logmer =$("#video"+fid+"").attr("logmer");
	if(logmer==1){
		$("#video"+fid+"").find(".videoall").css("display","none");
		$("#video"+fid+"").find("#videolev").attr("border","1px solid #e7e8eb;");
		$("#video"+fid+"").removeAttr("logmer");
	}else {
		$("#video"+fid+"").find(".videoall").css("display","");
		$("#video"+fid+"").find("#videolev").attr("border","none");
		$("#video"+fid+"").attr("logmer","1");
	}
}
//视频(文字)点击事件
function videoexs(){
	$("#video1").css("display","");
	$(".vio1").css("color","#ef2423");
	$(".vio2").css("color","#616366");
	$("#vidweb").css("display","none");
}
//视频网址(文字)点击事件
function videoweb(){
	$("#video1").css("display","none");
	$(".vio1").css("color","#616366");
	$(".vio2").css("color","#ef2423");
	$("#vidweb").css("display","");
}
//选中点击事件(音频)
function checkred(fid,obj){
	if($("#checkredio"+fid+"").attr("redlogo")==1){
		$("#checkredio"+fid+"").find(".sucmelu").attr("src","img/ontckeck.png");
		$("#checkredio"+fid+"").removeAttr("redlogo");
	}else{
		$("#checkredio"+fid+"").attr("redlogo","1");
		$("#checkredio"+fid+"").find(".sucmelu").attr("src","img/check01.png");
	}
}

function deleteprompt(){
	$("#prompt").css("display","none");
}
function deletemain(){
	$("#mainprompt").css("display","none");
}
function deletelink(){
	$("#linkprompt").css("display","none");
}
//公共调用样式
function menu(){
	$(".maintilt").attr("style","");//清除所有副标题中的边框
	$(".left_menu").css("border","2px solid #d7231f");//为主标题添加边框
	$(".left_menu").css("background-color","#fff");//为主标题添加背景色
	$(".maintilt").removeAttr("motel");
	$(".left_menu").attr("titmark","1");//打上主标签标识
	var faltit ={//设置选中状态的图片外div的缩放宽高
			"width":"290px",
			"height":"132px",
			"margin-left":"13px",
			"margin-top":"13px",};
	$(".pic_face").removeAttr("style");
	var titpic = {//设置图片的缩放宽高
			"width":"290px",
			"height":"132px",};
	$(".titpicture").css(titpic);
	var titmac = {//设置标题栏的缩放宽高
			"width":"290px",
			"margin-left":"17px",
			"top": "212px",};
	$(".title_com").css(titmac);
	//将左侧已输入标题内容设入右侧标题栏(主标题)
	var fname=$("#wubecause").attr("fname");//标题
	var fmarker = $("#wubecause").attr("fmarker");
	var fshowcover = $("#wubecause").attr("fshowcover");
	var fabstract =  $("#wubecause").attr("fabstract");
	var fcontent =  $("#wubecause").attr("fcontent");
	var original =$("#originalbox").attr("original");
	var fsourceurl = $("#wubecause").attr("fsourceurl");
	$("#titlefrist").val(fname);
	$("#titlesecond").val(fmarker);
	$("#abstract").val(fabstract);
	$("#tickbox").attr("ordercheck",fshowcover);
	if(fshowcover==1){
		$("#tickbox").find("img").attr("src","img/tick.png");
	}else{
		$("#tickbox").find("img").attr("src","img/box.png");
	}
	$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
	if(original==1){
		$("#originalbox").find("img").attr("src","img/tick.png");
		$("#articleurl").css("display","");
		$("#articleurl").find("input").val(fsourceurl);
	}else{
		$("#originalbox").find("img").attr("src","img/box.png");
		$("#articleurl").css("display","none");
	}
	//将左侧已显示图片显示到右侧
	var noteadd = $(".left_menu").attr("noteadd");
	if(noteadd==1){
		$("#fshareimg").attr("src","");
		$(".delmove").css("display","none");
	}else{
		var url= $(".pic_face").find("img").attr("src");
		$("#fshareimg").attr("src",url).show();
		$(".delmove").css("display","inline-block");
	}
}

function secondmenu(order){
	var faltit={//将图片外div的宽高设置为正常状态
			"width":"320px",
			"height":"187px",
			"background-color":"#e7e8eb",
			"border":"1px solid #e7e8eb",};
	$(".left_menu").css(faltit);
	$(".left_menu").attr("titmark","");//清除主标签标志
	$(".title_com").css({"width":"310px","top":"158px"});
	var titpic = {//设置图片的正常宽高
			"width":"320px",
			"height":"187px",};
	$(".titpicture").css(titpic);
	var picface={
			"margin":"0",
	};
	$(".pic_face").css(picface);
	$(".maintilt").css("border","1px solid #e7e8eb");//将其他同级元素的边框设为原始灰色
	$("#templatemod"+order+"").css("border","2px solid #d7231f");//为当前元素添加边框
	$("#templatemod"+order+"").removeAttr("motel");
	$("#templatemod"+order+"").attr("motel","1");
	$(".left_menu").attr("titmark","");//打上主标签标识
	//放值
	var fname = $("#youbecause"+order+"").attr("fname");
	var fmarker = $("#youbecause"+order+"").attr("fmarker");
	var fshowcover = $("#youbecause"+order+"").attr("fshowcover");
	var fabstract =  $("#youbecause"+order+"").attr("fabstract");
	var fcontent =  $("#youbecause"+order+"").attr("fcontent");
	var original =$("#originalbox").attr("original");
	var fsourceurl = $("#youbecause"+order+"").attr("fsourceurl");
	 //将右侧中的所有值全部清空,再将值放入右侧菜单
	console.log("111_"+fname);
	$("#titlefrist").val(fname);
	$("#titlesecond").val(fmarker);
	$("#abstract").val(fabstract);
	$("#tickbox").attr("ordercheck",fshowcover);
	if(fshowcover==1){
		$("#tickbox").find("img").attr("src","img/tick.png");
	}else{
		$("#tickbox").find("img").attr("src","img/box.png");
	}
	$("iframe[id*=ueditor]").contents().find("body").html(fcontent);
	if(original==1){
		$("#originalbox").find("img").attr("src","img/tick.png");
		$("#articleurl").css("display","");
		$("#articleurl").find("input").val(fsourceurl);
	}else{
		$("#originalbox").find("img").attr("src","img/box.png");
		$("#articleurl").css("display","none");
	}
}
function keepfist(){
	var titlefas = $("#titlefrist").val();//标题
	var titlesec = $("#titlesecond").val();//作者
	var showcover = $("#tickbox").attr("ordercheck");//显示封面
	var digest = $("#abstract").val();//摘要
	var desc =$("iframe[id*=ueditor]").contents().find("body").html();//UE.getEditor('editor').getContent();//富文本内容
	var articleurl = $("#articleurl").find("input").val();//原文链接
	var fimgurl = $(".titpicture").attr("name");//图片路径
	var srcimg = $(".titpicture").attr("src");
	var type =$(".titpicture").attr("materialtyp");
	var url = $(".titpicture").attr("imgsrc");
	var localurl = $(".titpicture").attr("src");
	var media_id = $(".titpicture").attr("media_id");
	media_id = media_id==undefined||media_id=="undefined"?"":media_id;
	if(titlefas=="" ||titlefas=="undefined"){
		$.messager.alert("提示","请输入标题!","error");
		return;
	}
	if(desc=="" || desc=="undefined"){
		$.messager.alert("提示","请输入正文内容!","error");
		return;
	}
//		if(articleurl=="" || articleurl=="undefined"){
//			$.messager.alert("提示","请输入原文链接!","error");
//			return;
//		}
	if($("#dispnone").find("#wubecause").size()==0){
		var html = "<div id ='wubecause' class='beokensure' fname='' fmarker='' fabstract='' fshowcover='' fcontent='' fsourceurl='' fimgurl='' order='0' fmaterialtype='' fsrcimg='' halfurl=''></div>";
		$("#dispnone").append(html);
	}
	$("#wubecause").attr("order",0);
	$("#wubecause").attr("fname",titlefas);
	$("#wubecause").attr("fmarker",titlesec);
	$("#wubecause").attr("fabstract",digest);
	$("#wubecause").attr("fshowcover",showcover);
	$("#wubecause").attr("fcontent",desc);
	$("#wubecause").attr("fsourceurl",articleurl);
	$("#wubecause").attr("fimgurl",fimgurl);
	$("#wubecause").attr("fmaterialtype",type);
	$("#wubecause").attr("fsrcimg",articleurl);
	$("#wubecause").attr("halfurl",url);
	$("#wubecause").attr("flocalurl",localurl);
	$("#wubecause").attr("media_id",media_id);
}
function keepsecond(){
	var taa = $(".maintilt[motel]").attr("tem");
	var titlefas = $("#titlefrist").val();//标题
	var titlesec = $("#titlesecond").val();//作者
	var showcover = $("#tickbox").attr("ordercheck");//显示封面
	var digest = $("#abstract").val();//摘要
	var desc =$("iframe[id*=ueditor]").contents().find("body").html();//UE.getEditor('editor').getContent();//富文本内容
	var articleurl = $("#articleurl").find("input").val();//原文链接
	var fimgurl = $(".methad_teeo").attr("name");//图片名称
	var srcimg = $(".methad_teeo").attr("url")//图片路径
	var type = $(".methad_teeo").attr("materialtyp");
	var url = $(".methad_teeo").attr("imgsrc");
	var media_id = $(".methad_teeo").attr("media_id");
	if(titlefas=="" ||titlefas=="undefined"){
		$.messager.alert("提示","请输入标题!","error");return;}
	if(desc=="" || desc=="undefined"){
		$.messager.alert("提示","请输入正文内容!","error");return;}
	if(articleurl=="" || articleurl=="undefined"){
//			$.messager.alert("提示","请输入原文链接!","error");return;
	}
	$("#youbecause"+taa+"").attr("order",taa);
	$("#youbecause"+taa+"").attr("fname",titlefas);
	$("#youbecause"+taa+"").attr("fmarker",titlesec);
	$("#youbecause"+taa+"").attr("fabstract",digest);
	$("#youbecause"+taa+"").attr("fshowcover",showcover);
	$("#youbecause"+taa+"").attr("fcontent",desc);
	$("#youbecause"+taa+"").attr("fsourceurl",articleurl);
	$("#youbecause"+taa+"").attr("fimgurl",fimgurl);
	$("#youbecause"+taa+"").attr("fmaterialtype",type);
	$("#youbecause"+taa+"").attr("fsrcimg",articleurl);
	$("#youbecause"+taa+"").attr("halfurl",url);
	$("#youbecause"+taa+"").attr("media_id",media_id);
}
//保存事件
function keepsave(){
	var dat = handleData();
	if(dat){
		$.messager.progress({text : "正在处理，请稍候..."});
		var a= $("#publicStation").find("span").size();
		var foaid = "";
		$("#publicStation span[publ=1]").each(function(){
			foaid += $(this).attr("fid")+",";
		});
		if(foaid==""){
			$.messager.alert("提示","请选择公众号!","error");
			$.messager.progress("close");//隐藏加载中
			return false;
		}
		console.log(JSON.stringify(dat))
		$.ajax({
			type:"post",
			url:"mater/insertMessage.do",
			data:dat,
			dataType:'json',
			success:function(data){
				var map = "";
				var fid= data.newsIDs.split(",");
				var fsrcimg ="";
				var fimgurl = "";
				var type = "";
				var values = "";
				for (var i = 0; i < fid.length; i++) {
					values=fid[i];
					//王文樟修改  halfurl改为fimgurl
					fsrcimg = $(".beokensure").eq(i).attr("halfurl");
					fimgurl = $(".beokensure").eq(i).attr("fimgurl");
					map +=JSON.stringify({
						fileUrl:fsrcimg,
						fileName:fimgurl,
						FMaterialsID:values,
						FOAID:foaid.substring(0,foaid.lastIndexOf(",")),
						type:'thumb',})+",";
				}
				map="["+map.substring(0,map.length-1)+"]";
				if(data.result){
					$.ajax({
						dataType:'JSON',
						type : 'post',
						url : 'mater/upWxInfo.do?type=99&newsIDs='+data.newsIDs,
						data:{
							params:map
						},
						dataType : "json",
						success : function(data){
							$.messager.progress("close");
							if(data.error){
								$.messager.alert("提示",data.info,"error");
							}else{
								$.messager.progress("close");
								$.messager.alert("提示","保存成功！","info");
								location.href="template/easy/wx/graphicnewseditor.jsp";
							}
						}
					});
					
				}else{
					$.messager.progress("close");
				}
			}
		});
	}
}
//预览事件
function preview(){
	var dat = handleData();
	if(dat){
		var ttt="";
		var a= $("#publicStation").find("span").size();
		for (var i = 0; i < a; i++) {
			var foaid = $("#publicStation span[publ=1]").attr("fid");
		}
		if (ttt==""){ttt=foaid;}else{ttt=foaid+","+ttt;}
		$.ajax({
			type:"post",
			url:"mater/insertMessage.do",
			data:dat,
			dataType:'json',
			success:function(data){
				var ppp=$(".beokensure").attr("fgroupcode");
				location.href='mater/previewMessage.do?fgroupcode='+tgt+'';
				}
			})
		}
}
	//保存并群发事件
function Savemass(){
	
	//验证是否需要填写原文链接
//		var articleurl = "";
//		$(".beokensure").each(function(){
//			var original = $(this).attr("original");
//			if(original == "1" && (articleurl=="" || articleurl=="undefined")){
//				$.messager.alert("提示","请输入原文链接！","error");return;
//			}
//		});
	
	if($(".left_menu").attr("titmark")==1){
		keepfist();
	}else{
		keepsecond();
	}
	var titdis= $("#dispnone").find("div").size();
	var tat="";var tbt="";var tct="";
	var tdt="";var tet="";var tft="";var tvt = "";
	var tgt="";var tht=0; var tnt="";var tmt = "";
	for (var i =0; i <titdis; i++) {
		var titlefas= $(".beokensure").eq(i).attr("fname");//标题
		var titlesec = $(".beokensure").eq(i).attr("fmarker");//作者
		var showcover = $(".beokensure").eq(i).attr("fshowcover");//封面选中
		var digest =  $(".beokensure").eq(i).attr("fabstract");//摘要
		var desc =  $(".beokensure").eq(i).attr("fcontent");//正文
		var articleurl = $(".beokensure").eq(i).attr("fsourceurl");//原文链接
		var order =$(".beokensure").eq(i).attr("order");
		var imgurl = $(".beokensure").eq(i).attr("fimgurl");
		var srcimg = $(".beokensure").eq(i).attr("halfurl");
		var materialtype = "";
		if($(".beokensure").eq(i).attr("fmaterialtype")==""){
			materialtype=-1;
		}else{
			materialtype= $(".beokensure").eq(i).attr("fmaterialtype");
		}
	if(titlefas=="" ||titlefas=="undefined"){
		var thisid =  $(".beokensure").attr("id");
		if(thisid=="wubecause"){menu();}
		else{
			var order = $(".beokensure").attr("order");
			secondmenu(order);
		}
		$.messager.alert("提示","请输入标题！","error");return;}
	if(desc=="" || desc=="undefined"){
		var thisid =  $(".beokensure").attr("id");
		if(thisid=="wubecause"){menu();}
		else if($(".beokensure").attr("order") !=undefined || $(".beokensure").attr("order") !=""){
			var order = $(".beokensure").attr("order");
			secondmenu(order);
		}
		$.messager.alert("提示","请输入正文！","error");return;}
	if(originalbox==0 || originalbox=="undefined"){
		var thisid =  $(".beokensure").attr("id");
		if(thisid=="wubecause"){menu();}
		else if($(".beokensure").attr("order") !=undefined || $(".beokensure").attr("order") !=""){
			var order = $(".beokensure").attr("order");
			secondmenu(order);
		}
	}
	if(tat==""){tat=titlefas;}else{tat=tat+","+titlefas;}
	if(tbt==""){tbt=titlesec;}else{tbt=tbt+","+titlesec;}
	if(tct==""){tct=showcover;}else{tct=tct+","+showcover;}
	if(tdt==""){tdt=digest;}else{tdt=tdt+","+digest;}
	if(tet==""){tet=desc;}else{tet=tet+","+desc;}
	if(tft==""){tft=articleurl;}else{tft=tft+","+articleurl;}
	if(tht==""){tht=order;}else{tht =tht+","+order;}
	if(tmt==""){tmt=imgurl;}else{tmt=tmt+","+imgurl;}
	if(tnt==""){tnt=materialtype;}else {tnt = tnt+","+materialtype;}
	if(tvt==""){tvt=srcimg;}else{tvt= tvt+","+srcimg;}
	var grapsize = requestParam("order");
	var grap = parseInt(grapsize);
	tgt=grap+1;
}
	var data = {};
	data ["fname"] = tat;
	data ["fmarker"] = tbt;
	data ["fshowcover"] =tct; 
	data ["fabstract"] = tdt;
	data ["fcontent"] = tet;
	data ["fsourceurl"] = tft;
	data ["fgroupcode"] = tgt;
	data ["findex"] = tht;
	data ["fimgurl"] = tmt;
	data ["fsrcimg"] = tvt;
	data ["fmaterialgroup"] = tnt;
	var dat = {
			jsonobj :JSON.stringify(data)
	};
	var ttt="";
	var a= $("#publicStation").find("span").size();
	for (var i = 0; i < a; i++) {
		var foaid = $("#publicStation span[publ=1]").attr("fid");
	}
	if (ttt==""){ttt=foaid;}else{ttt=foaid+","+ttt;}
	$.ajax({
		type:"post",
		url:"mater/insertMessage.do",
		data:dat,
		dataType:'json',
		success:function(data){
			var map = "";
			var fid= data.fids.split(",");
			var fsrcimg ="";
			var fimgurl = "";
			var type = "";
			var values = "";
			if($(".beokensure").eq(i).attr("fmaterialtype")==0){//为未上传的素材
				for (var i = 0; i < fid.length; i++) {
					values=fid[i];
					fsrcimg = $(".beokensure").eq(i).attr("halfurl");
					fimgurl = $(".beokensure").eq(i).attr("fimgurl");
					map +=JSON.stringify({
						fileUrl:fsrcimg,
						fileName:fimgurl,
						FMaterialsID:values,
						FOAID:ttt,
						type:'thumb',})+",";
				}
			}
			map="["+map.substring(0,map.length-1)+"]";
			if(data.result){
				$.ajax({
					dataType:'JSON',
					type : 'post',
					url : 'mater/upWxInfo.do?type=1&newsIDs='+data.newsIDs,//isNews=1,表示保存并群发图文消息
					data:{
						params:map
					},
					 dataType : "json",
					 success : function(data){
							if(data.error){
								$.messager.alert("提示",data.info,"error");
							}else{//展示要群发的群组
								//弹出选择微信分组对话框
								$("#edit_cm").jbootdialog({
							    	title:"设置类别品牌",
							        body:('<form class="form-horizontal" role="form">'
										   +'<div class="form-group">'
										   +'<label class="col-sm-2 control-label">群发对象</label>'
										   +'<div class="col-sm-9"><input class="form-control" id="massObject" type="text">'
										   +'<label class="label label-danger jboot-input-msg" id="complinkmark_error"></label>'
										   +'</div></div>'
										   +'<div class="form-group">'
									  	   +'<label class="col-sm-2 control-label">微信分组</label>'
										   +'<div class="col-sm-9"><input class="form-control" id="massGroup" type="text">'
										   +'<label class="label label-danger jboot-input-msg" id="complinkclass_error"></label>'
										   +'</div></div>'
								    	   +'</div>'
							               +'</form>'),
							      	footer:"<button class='btn btn-primary' id='editcm'>确定</button><button id='hidden-cancel' class='btn btn-default' data-dismiss='modal'>取消</button>"
							    });
								
								//经营品牌
								$("#massObject").jbootcombo({
									multiple : true,//是否多选
									type : "list",//弹出的样式
									width: 430,
									isinline:false,//是否每行一个选项
									dlgwidth:900,//自定义弹出框的宽度
									linenum:4,//当每行多个选项时，每一行选项的个数
									btnclass:"btn-success",//自定义按钮样式
									data:storedata ={"total":2,"rows":[{"fname":"全部粉丝","fid":0},{"fname":"按分组发送","fid":1}]},
								});
							   //店铺名称
								$("#massGroup").jbootcombo({
									multiple: true,
									type: "list",
									width: 430,
									isinline:false,//是否每行一个选项
									dlgwidth:900,//自定义弹出框的宽度
									linenum:4,//当每行多个选项时，每一行选项的个数
									btnclass:"btn-success",//自定义按钮样式
									url:"store/selStoreN.do?type=0,1,2", //0-企业店铺，1-门店店铺，2-员工店铺
								});
							}
					 }
				});
				
			}
		}
	});
}

function inter(){
	for (var i = 0; i < fid.length; i++) {
		if($(".beokensure").eq(i).attr("fmaterialtype")==0){//为未上传的素材
			values=fid[i];
			ftitle = $(".beokensure").eq(i).attr("fname");
			fthumb_media_id = $(".beokensure").eq(i).attr("");
			fauthor = $(".beokensure").eq(i).attr("fmarker");
			fdigest = $(".beokensure").eq(i).attr("fabstract");
			fshow_cover_pic = $(".beokensure").eq(i).attr("fshowcover");
			fcontent = $(".beokensure").eq(i).attr("fcontent");
			fcontent_source_url = $(".beokensure").eq(i).attr("fsrcimg");
			map +=JSON.stringify({
				title:ftitle,
				thumb_media_id:fthumb_media_id,
				author:fauthor,
				digest:fdigest,
				show_cover_pic:fshow_cover_pic,
				content:fcontent,
				content_source_url:fcontent_source_url,
				FOAID:ttt,})+",";
			}
		}
	map="["+map.substring(0,map.length-1)+"]";
	$.ajax({
		dataType:'JSON',
		type : 'post',
		url : 'mater/UploadWeChat.do',
		data:{
			params:map
		},
		 dataType : "json",
		 success : function(data){
			 
		 }
	});
}	
function closeBTN(){
	$("#cover").addClass("showCoverPage");
    $(".closeCover").addClass("hidden");
    $("#playVedio").html("");
}//closeCover
function handleData(){
	//验证是否需要填写原文链接
//		var articleurl = "";
//		$(".beokensure").each(function(){
//			var original = $(this).attr("original");
//			if(original == "1" && (articleurl=="" || articleurl=="undefined")){
//				$.messager.alert("提示","请输入原文链接！","error");return;
//			}
//		});
	if($(".left_menu").attr("titmark")==1){
		var titlefas = $("#titlefrist").val();//标题
		var titlesec = $("#titlesecond").val();//作者
		var showcover = $("#tickbox").attr("ordercheck");//显示封面
		var digest = $("#abstract").val();//摘要
		var desc =$("iframe[id*=ueditor]").contents().find("body").html();//UE.getEditor('editor').getContent();//富文本内容
		var articleurl = $("#articleurl").find("input").val();//原文链接
		var fimgurl = $(".titpicture").attr("name");//图片路径
		var srcimg = $(".titpicture").attr("src");
		var type =$(".titpicture").attr("materialtyp");
		var imgsrc = $(".titpicture").attr("imgsrc");
		if(titlefas=="" ||titlefas=="undefined"){
			$.messager.alert("提示","请输入标题！","error");return false;}
		if(desc=="" || desc=="undefined"){
			$.messager.alert("提示","请输入正文！","error");return false;}
		if($(".templtitle").find(".maintilt").size()==0){
			$("#dispnone").append("<div class='beokensure'></div>");
		}
		$(".beokensure").eq(0).attr("fthumburl",srcimg);
		$(".beokensure").eq(0).attr("halfurl",srcimg);
		$(".beokensure").eq(0).attr("fname",titlefas);
		$(".beokensure").eq(0).attr("fmaker",titlesec);
		$(".beokensure").eq(0).attr("fabstract",digest);
		$(".beokensure").eq(0).attr("fshowcover",showcover);
		$(".beokensure").eq(0).attr("fcontent",desc);
		$(".beokensure").eq(0).attr("fsourceurl",articleurl);
		$(".beokensure").eq(0).attr("order",0);
		$(".beokensure").eq(0).attr("fmaterialtype",type);
	}else{
		var taa = $(".maintilt[motel]").attr("tem");
		var titlefas = $("#titlefrist").val();//标题
		var titlesec = $("#titlesecond").val();//作者
		var showcover = $("#tickbox").attr("ordercheck");//显示封面
		var digest = $("#abstract").val();//摘要
		var desc =$("iframe[id*=ueditor]").contents().find("body").html();//UE.getEditor('editor').getContent();//富文本内容
		var articleurl = $("#articleurl").find("input").val();//原文链接
		var fimgurl = $(".methad_teeo").attr("name");//图片名称
		var srcimg = $(".methad_teeo").attr("url");//图片路径
		var type = $(".methad_teeo").attr("materialtyp");
		var imgsrc = $(".methad_teeo").attr("imgsrc");
		var fgroupcode = $(".beokensure").eq(0).attr("fgroupcode");
		if(titlefas=="" ||titlefas=="undefined"){
			$.messager.alert("提示","请输入标题！","error");return false;}
		if(desc=="" || desc=="undefined"){
			$.messager.alert("提示","请输入正文！","error");return false;}
		$(".beokensure").eq(taa).attr("fname",titlefas);
		$(".beokensure").eq(taa).attr("fmarker",titlesec);
		$(".beokensure").eq(taa).attr("fabstract",digest);
		$(".beokensure").eq(taa).attr("fshowcover",showcover);
		$(".beokensure").eq(taa).attr("fcontent",desc);
		$(".beokensure").eq(taa).attr("fsourceurl",articleurl);
		$(".beokensure").eq(taa).attr("fmaterialtype",type);
		$(".beokensure").eq(taa).attr("fthumburl",imgsrc);
		$(".beokensure").eq(taa).attr("halfurl",imgsrc);
		$(".beokensure").eq(taa).attr("fgroupcode",fgroupcode);
		$(".beokensure").eq(taa).attr("findex",taa);
	}
	
	var titdis= $("#dispnone").find("div").size();
	var tat="";var tbt="";var tct="";
	var tdt="";var tet="";var tft="";var tvt = "";
	var tgt="";var tht=0; var tnt="";var tmt = "";
	var dataList = new Array();
	for (var i =0; i <titdis; i++) {
		var id = $(".beokensure").eq(i).attr("fid");
		var titlefas= $(".beokensure").eq(i).attr("fname");//标题
		if(titlefas==undefined){
			continue;
		}
		var titlesec = $(".beokensure").eq(i).attr("fmarker");//作者
		var showcover = $(".beokensure").eq(i).attr("fshowcover");//封面选中
		var digest =  $(".beokensure").eq(i).attr("fabstract");//摘要
		var desc =  $(".beokensure").eq(i).attr("fcontent");//正文
		//var original =$(".beokensure").eq(i).attr("original");
		var articleurl = $(".beokensure").eq(i).attr("fsourceurl");//原文链接
		var order =$(".beokensure").eq(i).attr("order");
		var imgname = $(".beokensure").eq(i).attr("fimgurl");
		var srcimg = $(".beokensure").eq(i).attr("halfurl");
		var materialtype = $(".beokensure").eq(i).attr("fmaterialtype");
		if(materialtype==""){
			materialtype=-1;
		}else if(materialtype==undefined||materialtype=="undefined"){
			materialtype=0;
		}
		if(titlefas=="" ||titlefas=="undefined"){
			var or =  $(".beokensure").eq(i).attr("order");
			if(or==0){
				menu();
			}else{
				var order = $(".beokensure").eq(i).attr("order");
				secondmenu(order);
			}
			$.messager.alert("提示","请输入标题！","error");return false;}
		if(desc=="" || desc=="undefined"){
			var or =  $(".beokensure").eq(i).attr("order");
			if(or==0){
				menu();
			}else if($(".beokensure").eq(i).attr("order") !=undefined || $(".beokensure").eq(i).attr("order") !=""){
				var order = $(".beokensure").eq(i).attr("order");
				secondmenu(order);
			}
			$.messager.alert("提示","请输入正文！","error");return false;}
		if(originalbox==0 || originalbox=="undefined"){
			var or =  $(".beokensure").eq(i).attr("order");
			if(or==0){
				menu();
			}else if($(".beokensure").eq(i).attr("order") !=undefined || $(".beokensure").eq(i).attr("order") !=""){
				var order = $(".beokensure").eq(i).attr("order");
				secondmenu(order);
			}
		}
 		tgt=id;
 		//var grapsize = requestParam("fgroupcode");
		//var grap = parseInt(grapsize);
		var data = {};
		data ["fname"] = titlefas;
		data ["fmarker"] = titlesec;
		data ["fshowcover"] =showcover; 
		data ["fabstract"] = digest;
		data ["fcontent"] = desc;
		data ["fsourceurl"] = articleurl;
		data ["fgroupcode"] = 0;//默认未分组
		data ["findex"] = order;
		data ["fimgname"] = imgname;
		data ["fsrcimg"] = srcimg;
		data ["fmaterialgroup"] = materialtype;
		dataList.push(data);
	}
	var dat = {
		jsonobj :JSON.stringify({'dataList':dataList})
	};
	return dat;
}
/*************************图片库************************************/
//图片库点击事件
function materiallibrary(){
	$.messager.progress({text : "正在处理，请稍候..."});
	$("#Material").find(".picturebox").remove();
	$.ajax({
		type:"post",
		url:"mater/materiallibrary.do",
		dataType:'json',
		success:function(data){
			$("#Material").parent().next().find("#pagenow").html("1");
			$("#Material").parent().next().find("#pageall").html(Math.ceil(data.total/10));
			$(data.rows).each(function(n,value){
			 	//var picture =  $("#Material").find(".picturebox").size();
			 	
				var url =fileserver+this.furl;
				var html="";
				var page = parseInt(n/10)+1;
				html='<div id="picturenice'+this.fid+'" onclick="Materialbox('+this.fid+',this)" class="picturebox hidden picturepage'+page+'">'
			     +'<div class="picmmu"><img class="goumen hidden" media_id="'+this.fwxmediaid+'" name="'+this.fname+'" url="'+this.furl+'" srctemp="'+url+'"></div>'
				 +'<div class="cleaver material hidden">'
				 +'<img class="cleaver-check" src="img/yes03.png"></div>'
				 +'</div>';
				 $("#Material").append(html);
			});
			showPage(1);
			$.messager.progress("close");//隐藏加载中
 			$("#photogallery_dlg").dialog("open");
 			$("#photogallery_dlg").dialog("resize");
		}
	});
}

//图片点击事件
function Materialbox(cleclen,obj){
	var hidden = $(obj).find(".material");
	if(hidden.hasClass("hidden")){
		$(".material").addClass("hidden");
		$(".picturebox").removeAttr("logo");
		hidden.removeClass("hidden");
		$(obj).attr("logo","1");
	}else{
		$(".material").addClass("hidden");
		$(obj).removeAttr("logo");
	}
}
//确定
function Pustimg(){
	var src= $(".picturebox[logo]").find("img").attr("src");
	var url= $(".picturebox[logo]").find("img").attr("url");
	var name= $(".picturebox[logo]").find("img").attr("name");
	var media_id= $(".picturebox[logo]").find("img").attr("media_id");
	var markmod = $(".left_menu").attr("titmark");//取主标题的标识
	if(markmod !=undefined && markmod!= ""){//判断主标题
		html="<img src="+src+" media_id="+media_id+" imgsrc="+url+" class='titpicture' name ="+name+" materialtyp='1'>"
		$(".pic_face").find("label").remove();//清除label
		$(".pic_face").find("img").remove();//清除之前的img
		//$(".title_com").css("top","214px");
		$(".left_menu").css("border","0px;");
		$(".pic_face").append(html);
		$(".left_menu").attr("noteadd","");
		
		//将左侧已显示图片显示到右侧
		var noteadd = $(".left_menu").attr("noteadd");
		if(noteadd==1){
			$("#fshareimg").attr("src","");
			$(".delmove").css("display","none");
		}else{
			var url= $(".pic_face").find("img").attr("src");
			$("#fshareimg").attr("src",src).show();
			$(".delmove").css("display","inline-block");
		}
	}else{//判断副标题
		var id= $(".maintilt[motel]").attr("order");
			$("#templatemod"+id+"").find(".methad_teeo").css("background-image","url('"+src+"')");
			$("#templatemod"+id+"").find(".methad_teeo").attr("materialtyp","1");
			$("#templatemod"+id+"").find(".methad_teeo").attr("name",name);
			$("#templatemod"+id+"").find(".methad_teeo").attr("url",url);
			$("#templatemod"+id+"").find(".methad_teeo").attr("imgsrc",url);
			$("#templatemod"+id+"").find(".methad_teeo").attr("media_id",media_id);
			$("#templatemod"+id+"").attr("noteadd","");
			var noteadd = $(this).attr("noteadd");
			if(noteadd==1){
				$("#fshareimg").attr("src","");
				$(".delmove").css("display","none");	
			}else{
				var url= $(".pic_face").find("img").attr("src");
				$("#fshareimg").attr("src",src).show();
				$("#fshareimg").attr("url",url);
				$(".delmove").css("display","inline-block");
			}
	}
	$("#photogallery_dlg").dialog("close");
}
//上一页
function prePage(obj){
	var nowPageNum = parseInt($(obj).parent().find("#pagenow").html());
	if(nowPageNum-1>0){
		$(obj).parent().find("#pagenow").html(nowPageNum-1);
		showPage(nowPageNum-1);
	}else{
		$(obj).parent().find("#pagenow").html(1);
		showPage(1);
	}
}
//下一页
function nextPage(obj){
	var nowPageNum = parseInt($(obj).parent().find("#pagenow").html());
	var totalPageNum = parseInt($(obj).parent().find("#pageall").html());
	if(nowPageNum+1<=totalPageNum){
		$(obj).parent().find("#pagenow").html(nowPageNum+1);
		showPage(nowPageNum+1);
	}else{
		$(obj).parent().find("#pagenow").html(totalPageNum);
		showPage(totalPageNum);
	}
}

//跳转页面
function jsumpPage(obj){
	//正整数
	var pageNum = $(obj).prev().find("input").val();
	var totalNum = parseInt($(obj).parent().find("#pageall").html());
	
	$(".pageNumError").remove();
	if(!/^\+?[1-9][0-9]*$/.test(pageNum)){
		$(obj).after("<font class='pageNumError' style='color:#d21e20;font-size:14px;padding-left:15px;'>请输入大于0的数字</font>");
		return;
	}
	if(pageNum<=totalNum){
		$(obj).parent().find("#pagenow").html(pageNum);
		showPage(pageNum);
	}else{
		$(obj).parent().find("#pagenow").html(totalNum);
		showPage(totalNum);
	}
}

//显示指定页的数据
function showPage(page){
	$(".picturebox").addClass("hidden");
	var box = $(".picturepage"+page).removeClass("hidden");
	var img = box.find(".goumen").removeClass("hidden");
	img.each(function(){
		$(this).attr("src",$(this).attr("srctemp"));
	});
}