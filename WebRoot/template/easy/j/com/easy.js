var Util = {};

//创建获取页面参数信息
Util.initParam = function(paramList){
	var params = {};
	var arrParams = new Array();
	for ( var i = 0; i < paramList.length; i++) {
		var param = paramList[i];
		var key = param.key;
		if(key==undefined){
			key="ids";
		}
		var v = ""; 
		//直接取值类型
		switch (param.type) {
		case "text"://文本
		case "date"://时间
		case "select": v = $(param.id).val(); break;//下拉选择
		//组件取值类型
		case "jselect": v = $(param.id).jbootselect("getvalue"); break;//自定义下拉组件选择
		case "combo": v = $(param.id).jeasycombo("getvalue")[key]; break;//弹出选择
		case "check": v = $(param.id).is(":checked")?1:0; break;//复选框
		case "value": v = param.value;//固定值
		default:  break;
		}
		
		//debug("param.id: " + param.id + "|param.type: " + param.type + "|v: " + v);
		
		// 对双引号进行转义
		v = v==undefined ? "" : v;
		var mv = v.replace(new RegExp(/(")/g),'\\\"');
		
		arrParams.push(param.name+':"'+mv+'"');//ajax post参数
	}
	params.jsonobj="{"+arrParams.join(",")+"}";
	return params;
};

Util.resetParam = function(paramList,except){
	for ( var i = 0; i < paramList.length; i++) {
		var param = paramList[i];
		if(except && except.indexOf(param.name)!=-1){
			continue;
		}
		if(param.defval == undefined){
		switch (param.type) {
		case "date"		:	$(param.id).datebox("clear"); break;//文本框
		case "select"	: 	$(param.id).combobox("reset"); break;//下拉选择
		case "jselect"	: 	$(param.id).val(""); break;//自定义下拉组件选择
		case "combo"	:   $(param.id).jeasycombo("setvalue",""); break;//弹出选择
		case "text"		:	$(param.id).textbox("clear"); break;//文本框
		default:  break;
		}
		}else{
			switch (param.type) {
			case "date"		:	$(param.id).datebox("setValue",param.defval); break;//文本框
			case "select"	: 	//下拉选择
				if (param.defval=="null") {
					console.log(param.name+" : "+param.defval+" : "+(param.defval == undefined));
					$(param.id).combobox("setValue",null);
				}else{
					$(param.id).combobox("setValue",param.defval);
				}
				break;
			case "jselect"	: 	$(param.id).val(param.defval); break;//自定义下拉组件选择
			case "combo"	:   $(param.id).jeasycombo("setvalue",param.defval); break;//弹出选择
			case "text"		:	$(param.id).textbox("setValue",param.defval); break;//文本框
			default:  break;
			}
		}
	}
};

Util.navLogout = function(){
	$.ajax({
		url: 'user/logout.do',
		type: 'POST',
		async: false,
		dataType: "text",
		success: function(data) {
			if (data == "success") {
				window.location.href="user/login.jsp";				
			} 
		}
	});  
};

//切换主题
Util.changeTheme = function(theme){
	$.ajax({
		url: 'user/changeTheme.do?theme='+theme,
		dataType: "json",
		success: function(data) {
			if (data.result) {
				window.location.reload();				
			}
		}
	});
};

//显示主题选择框
Util.showTheme = function(){
	$(".easy-theme").show(200);
};

//隐藏主题选择框
Util.hideTheme = function(){
	$(".easy-theme").hide(200);
};

//弹出窗口
Util.dialog = function(title,href,w,h,c){
	if(w == undefined){w = 500;}
	if(h == undefined){h = 500;}
	if(c == undefined){c = true;}
	//console.log(href);
	var dlg = $("<div class='easy-dlg'><iframe frameborder='0' src='"+href+"' style='width:100%;height:100%;margin:0;padding:0;'></iframe></div>").appendTo("body");
	dlg.dialog({
		title : title,
	    width: w,
	    height: h,
	    cache: false,
	    modal: true,
	    closable: c,
	    onClose : function(){
	    	dlg.dialog("destroy");
	    }
	}).dialog("open");
};

//获取开关的值
Util.getValueSwitch = function(id){
	var status= $(id).switchbutton("options").checked;
	return status;
};
//设置开关的值
Util.setValueSwitch = function(id,value){
	if(value==1){
		$(id).switchbutton("check");
	}else{
		$(id).switchbutton("uncheck");
	}
};

/** 导出数据 
 * url 方法的URL地址
 * fileName 文件名前缀
 * sheetTitle 工作簿名称
 * headers 表头
 * jsonParam 参数
 * **/
Util.exportExcel = function(data){
	if(confirm("您确定导出Excel吗?")){
		
		var exportForm = document.createElement("form");
		document.body.appendChild(exportForm);
		exportForm.method = 'post';
		exportForm.action = data.url;
		exportForm.target = '_blank';
		
		//创建隐藏表单
	    var newElement1 = document.createElement("input");
	    newElement1.setAttribute("name", "jsonParam");
	    newElement1.setAttribute("type", "hidden");
	    newElement1.setAttribute("value", data.jsonParam);
	    exportForm.appendChild(newElement1);
	    
	    var newElement2 = document.createElement("input");
	    newElement2.setAttribute("name", "sheetTitle");
	    newElement2.setAttribute("type", "hidden");
	    newElement2.setAttribute("value", data.sheetTitle);
	    exportForm.appendChild(newElement2);
	    
	    var newElement3 = document.createElement("input");
	    newElement3.setAttribute("name", "headers");
	    newElement3.setAttribute("type", "hidden");
	    newElement3.setAttribute("value", JSON.stringify(data.headers));
	    exportForm.appendChild(newElement3);
	    
	    var newElement4 = document.createElement("input");
	    newElement4.setAttribute("name", "fileName");
	    newElement4.setAttribute("type", "hidden");
	    newElement4.setAttribute("value", data.fileName);
	    exportForm.appendChild(newElement4);
	 
	    exportForm.submit();
	    
	    document.body.removeChild(exportForm); 
	}
};
//显示当前日期
Util.showLocale = function(){
	var objD = new Date();  
    var str;
    var yy = objD.getYear();  
    if(yy<1900) yy = yy+1900;  
    var MM = objD.getMonth()+1;  
    if(MM<10) MM = '0' + MM;  
    var dd = objD.getDate();  
    if(dd<10) dd = '0' + dd;  
    var ww = objD.getDay();  
    if  (ww==0)  ww="星期日";  
    if  (ww==1)  ww="星期一";  
    if  (ww==2)  ww="星期二";  
    if  (ww==3)  ww="星期三";  
    if  (ww==4)  ww="星期四";  
    if  (ww==5)  ww="星期五";  
    if  (ww==6)  ww="星期六";  
    colorfoot="</font>";
    str = yy + "年" + MM + "月" + dd + "日 " + ww;  
    //return(str);
    $("#localtime").html(str);
    
    $("span.nav-logo").after("<span class='nav-title'>"+$("title").text()+"<span>");
}; 

/**获取url地址上面的参数**/  
Util.requestParam = function(argname){
    var url = location.href;
    var arrStr = url.substring(url.indexOf("?")+1).split("&");
    for(var i =0;i<arrStr.length;i++){
        var loc = arrStr[i].indexOf(argname+"="); 
        if(loc!=-1){
            return arrStr[i].replace(argname+"=","").replace("?","");
            break;
        }           
    }
    return "";
};

/**退出系统**/
Util.navLogout = function(){
	$.ajax({
		url: 'user/logout.do',
		type: 'POST',
		async: false,
		success: function(data) {
			if (data == "success") {
				window.location.href="user/getLoginAD.do";
			}
		}
	});
};

/**格式化 是,否**/
Util.fmt_yesno = function(value,row,index){
	return value==1?"是":"否";
};
/**格式化 金额**/
Util.fmt_money = function(value,row,index){
	return Number(value).toFixed(2);
};

/**主菜单 展开**/
function menuSelect(title,index){
	var select = ".easy-menu .panel:eq("+index+")";
	var tabs = $(".easy-menu .panel").not(select);
	tabs.hide();
	var s = $(select);
	s.find(".panel-body").css({"min-height":s.parent().height()-30});
}
/**主菜单 收起**/
function menuUnselect(title,index){
	$(".easy-menu .panel").fadeIn(200);
}

//显示图片详情
function showImgDetail(obj){
	var $this = $(obj);
	var img = $("img.showImgDetail");
	if(img.length == 0){
		$("body").append("<img class='showImgDetail'/>");
	}
	img.attr("src",$this.attr("src"));
	var top = $this.offset().top;// + $this.outerHeight(true);
	var left = $this.offset().left;
	img.css({ "top":top,"left":left, });
	img.show();
	var height = img.outerHeight(true);
	if( (top - height) < 0 ){
		img.css({ "top":top + $this.outerHeight(true) });
	}else{
		img.css({ "top":top - height });
	}
	
}
//隐藏图片详情
function hideImgDetail(){
	$("img.showImgDetail").hide();
}

//跳转登录页面
function gotoLogin(){
	window.location.href="user/getLoginAD.do";
}

$.extend($.fn.combobox.methods, {
	//组件默认选中第一个
	selectfirst : function(jq){
		return jq.each(function(){
			var data = $(this).combobox('getData');  
			if (data.length > 0) {
				$(this).combobox('select', data[0].fid);
			}
		});
	}
});
$(function(){
	Util.showLocale();
	
});