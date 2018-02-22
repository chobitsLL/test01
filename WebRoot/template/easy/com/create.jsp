<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>可视化编辑</title>
<%@ include file="../com/import.jsp"%>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<div data-options="region:'center'">
		<div style="padding: 5px 0 5px 10px;">
			<span style="display: inline-block;">
				<span class="easyui-linkbutton" id="btnCode" data-options="iconCls:'icon-code'">生成页面</span>
				<span class="easyui-linkbutton" id="btnCopy" data-options="iconCls:'icon-copy'">复制</span>
				<span class="easyui-linkbutton" id="btnDel"  data-options="iconCls:'icon-remove'">删除</span>
				<span class="easyui-linkbutton" id="btnAdd"  data-options="iconCls:'icon-add'">新增</span>
			</span>
			<span style="display: inline-block;float: right;text-align: right;padding-right: 5px;">
				<input id="creat_width" class="easyui-numberbox" data-options="'editor':'easyui-numberbox','width':123,'label':'width:','labelWidth':60" />
				<input id="creat_labelwidth"  class="easyui-numberbox" data-options="'editor':'easyui-numberbox','width':142,'label':'labelWidth:','labelWidth':80" />
				<span class="easyui-linkbutton" id="btnSet"  data-options="iconCls:'icon-save'">统一设置</span>
			</span>
		</div>
		<div style="padding: 5px 0 5px 10px;text-align: right;padding-right: 5px;">
			<input id="test_page" class="easyui-textbox" data-options="'editor':'easyui-textbox','width':268,'label':'url:','labelWidth':60" />
			<span class="easyui-linkbutton" id="btnTest"  data-options="iconCls:'icon-code'">测试页面</span>
		</div>
		<div style="padding: 5px 0 5px 10px;text-align: right;padding-right: 5px;">
				<!-- <textarea id="loadData" cols="20" rows="10" style="width: 277px; height: 206px;"></textarea> -->
				<input id="loadData" class="easyui-textbox" data-options="'editor':'easyui-textbox','width':230,'label':'加载数据:','labelWidth':80,multiline:true,width:370,height:270" />
		</div>
		<div style="padding: 5px 0 5px 10px;text-align: right;padding-right: 5px;">
			<span class="easyui-linkbutton" id="btnLoad"  data-options="iconCls:'icon-reload'">加载数据</span>
			<span class="easyui-linkbutton" id="btnExample"  data-options="iconCls:'icon-code'">举个栗子</span>
		</div>
		<div style="padding: 5px 0 5px 10px;text-align: right;padding-right: 5px;">
			<input id="testdata" class="easyui-textbox" data-options="'editor':'easyui-textbox','width':268,'label':'测试data:','labelWidth':60" />
			<span class="easyui-linkbutton" id="btnCombo"  data-options="iconCls:'icon-code'">测试弹出</span>
		</div>
		<div id="create_panel" class="easy-input-panel">
			
		</div>
	</div>
	<div data-options="region:'east',title:'属性',split:true" style="width:300px;">
		<table id="propertygrid"></table>
		<table class="table-info">
				<tr><td>id</td><td>ID编号</td></tr>
				<tr><td>height</td><td>高度(多行下有效)</td></tr>
				<tr><td>width</td><td>总宽度</td></tr>
				<tr><td>label</td><td>标题</td></tr>
				<tr><td>labelWidth</td><td>标题宽度</td></tr>
				<tr><td>multiline</td><td>是否多行文本</td></tr>
				<tr><td>required</td><td>是否必填</td></tr>
				<tr><td>missingMessage</td><td>提示信息</td></tr>
				<tr><td>editor</td><td>编辑器</td></tr>
				<tr><td>url</td><td>远程数据地址</td></tr>
				<tr><td>data</td><td>固定数据</td></tr>
				<tr><td>multiple</td><td>是否多选</td></tr>
				<tr><td>type</td><td>显示类型(jeasy组件有效)</td></tr>
			</table>
	</div> 
</div>
<div id="codedlg"><textarea id="codearea" style="resize: none;"></textarea></div>
<script type="text/javascript">
var panel = null;
var currentEditor = null;//当前编辑的项
var changeEditor = null;//当前编辑的项(预留的编辑项，防止点击过快)
var defaultOption = {
	editor: 'easyui-textbox',
	height: '',
	width: 230,
	label:'默认标题:',
	labelWidth: 80,
	multiline: false,
	required: false,
	missingMessage: "",
	multiple: false,
	type: "list",
	//url:"upload_image_wx_multiple_json.do"
};

//创建一个新的编辑项
function create(option){
	option = $.extend({}, defaultOption, option);

	var draggable = $("<div class='easy-create-item'></div>").appendTo(panel);
	var input = $("<input class='easy-create-input'/>");//.appendTo(draggable);
	var drop  = $("<span class='easy-create-drop'>&#12288;</span>").appendTo(draggable);
	input.addClass(option.editor);
	draggable.data("option",option);
	//input.attr("data-options",JSON.stringify(option));
	input.appendTo(draggable);
	switch (option.editor) {
	case "easyui-textbox":input.textbox(option);break;
	case "easyui-checkbox":input.checkbox(option);break;
	case "easyui-numberbox":input.numberbox(option);break;
	case "easyui-datebox":input.datebox(option);break;
	case "easyui-datetimebox":input.datetimebox(option);break;
	case "easyui-combobox":input.combobox(option);break;
	case "easyui-combotree":input.combotree(option);break;
	case "jeasyupload":input.jeasyupload(option);break;
	case "jeasycombo":input.jeasycombo(option);break;
	default:input.textbox(option);break;
	}
	
	//初始化拖拽功能
	draggable.draggable({
		handle:drop,
		deltaX:0,
		deltaY:0,
		onStopDrag:function(){
			$(this).removeAttr("style");
		}
	}).droppable({
		onDragOver:function(e,source){
			$(this).addClass("easy-create-over");
		},
		onDragLeave:function(e,source){
			$(this).removeClass("easy-create-over");
		},
		onDrop:function(e,source){
			$(this).removeClass("easy-create-over");
			$(source).insertBefore(this);
		}
	});
	
	draggable.click(function(){
		draggable.addClass("easy-create-active");
		if(draggable != currentEditor){
			if(currentEditor != null){
				currentEditor.removeClass("easy-create-active");
			}
			draggable.addClass("easy-create-active");
			option = draggable.data("option");
			newPropertyData = propertyData;
			for (var i = 0; i < newPropertyData.rows.length; i++) {
				var pp = newPropertyData.rows[i];
				//console.log(pp.name+" : "+option[pp.name]);
				if(pp.name == "data"){
					pp.value = JSON.stringify(option[pp.name]);
				}else{
					pp.value = option[pp.name];
				}
			}
			//console.log(".data : "+JSON.stringify(newPropertyData.data));
			//newPropertyData.data = JSON.stringify(newPropertyData.data);
			$("#propertygrid").propertygrid("loadData", newPropertyData);
			currentEditor = draggable;
		}
	});
}

//更新编辑项
function change(key,value,editItem){
	var option = editItem.data("option");
	var oldEditor = option.editor;
	option[key] = value;
	editItem.data("option",option);
	var input = editItem.find(".easy-create-input");
	
	if(key == "id"){
		input.attr("id",value);
		return;
	}
	if(key == "data"){
		try {
			option[key] = eval('(' + value + ')');
		} catch (e) {
			$.messager.alert("提示", "data转换失败，请检查格式是否正确！<br>"+e, "error");
			return;
		}
	}
	
	switch (oldEditor) {
	case "easyui-textbox"	 :input.textbox("destroy");break;
	case "easyui-checkbox"   :input.checkbox("destroy");break;
	case "easyui-numberbox"  :input.numberbox("destroy");break;
	case "easyui-datebox"    :input.datebox("destroy");break;
	case "easyui-datetimebox":input.datetimebox("destroy");break;
	case "easyui-combobox"   :input.combobox("destroy");break;
	case "easyui-combotree"  :input.combotree("destroy");break;
	case "jeasyupload"	 	 :input.jeasyupload("destroy");break;
	case "jeasycombo"		 :input.jeasycombo("destroy");break;
	default:input.textbox("destroy");break;
	}
	
	console.log("OPTIONS:"+JSON.stringify(option));
	editItem.find("label").remove();
	editItem.find("input").remove();
	editItem.find(".textbox").remove();
	//editItem.empty();
	input = $("<input class='easy-create-input'/>").appendTo(editItem);

	switch (option.editor) {
	case "easyui-textbox"    :input.textbox(option);break;
	case "easyui-checkbox"   :input.checkbox(option);break;
	case "easyui-numberbox"  :input.numberbox(option);break;
	case "easyui-datebox"    :input.datebox(option);break;
	case "easyui-datetimebox":input.datetimebox(option);break;
	case "easyui-combobox"   :input.combobox(option);break;
	case "easyui-combotree"  :input.combotree(option);break;
	case "jeasyupload"	 	 :input.jeasyupload(option);break;
	case "jeasycombo"		 :input.jeasycombo(option);break;
	default:input.textbox(option);break;
	}
}
//测试data
var testData = {"total":9,"rows":[{"fshortcode":"所有","fname":"自营5","fid":34},{"fshortcode":"洗衣机","fname":"容量","fid":3},{"fshortcode":"洗衣机","fname":"类型","fid":13},{"fshortcode":"洗衣机","fname":"能效等级","fid":14},{"fshortcode":"冰箱","fname":"门款式","fid":6}]};
// true  false 选择框数据
var TFComboxOption = {type:"combobox",options:{data:[{fid:true,fname:"true"},{fid:false,fname:"false"}],required:true}};
var propertyData = {
	total:0,
	rows:[
		{"name":"id","value":"","group":"通用","editor":"text"},
		{"name":"height","value":"","group":"通用","editor":"numberbox"},
		{"name":"width","value":"","group":"通用","editor":"numberbox"},
		{"name":"label","value":"","group":"通用","editor":"text"},
		{"name":"labelWidth","value":"","group":"通用","editor":"numberbox"},
		{"name":"multiline","value":false,"group":"通用","editor":TFComboxOption},
		{"name":"required","value":false,"group":"通用","editor":TFComboxOption},
		{"name":"missingMessage","value":"","group":"通用","editor":"text"},
		{"name":"editor","value":"","group":"通用","editor":{
			type:"combobox",
			options:{
				//textbox,textarea,checkbox,numberbox,datebox,combobox,combotree
				data:[{fid:"easyui-textbox",fname:"easyui-textbox"},
				      {fid:"easyui-combobox",fname:"easyui-combobox"},
				      {fid:"jeasycombo",fname:"jeasycombo"},
				      {fid:"easyui-datebox",fname:"easyui-datebox"},
				      {fid:"easyui-datetimebox",fname:"easyui-datetimebox"},
				      {fid:"jeasyupload",fname:"jeasyupload"},
				      {fid:"easyui-checkbox",fname:"easyui-checkbox"},
				      {fid:"easyui-numberbox",fname:"easyui-numberbox"},
				      {fid:"easyui-combotree",fname:"easyui-combotree"}],
				required:true
			}
		}},
		{"name":"url","value":"","group":"通用","editor":"text"},
		{"name":"data","value":"","group":"通用","editor":{
			type:"textbox",
			options:{
				height:150,
				multiline:true
			}
		}},
		{"name":"multiple","value":false,"group":"通用","editor":TFComboxOption},
		{"name":"type","value":"list","group":"通用","editor":{type:"combobox",options:{data:[{fid:"list",fname:"list (弹出：列表模式 )"},{fid:"tree",fname:"tree (弹出：树形模式)"},{fid:"image",fname:"image (文件：图片模式)"},{fid:"text",fname:"text (文件：文本模式)"}]}}}
	]
};

var enter = '\r\n';
var tab = '\t';
function createCode(){
	var items = "";
	var inputArray = "";
	var create_title = $("#create_title").val();
	var title_width = $("#title_width").val();
	var is_center = $("#is_center").is(":checked");
	var panel_cls = 'easy-input-panel';
	if(is_center){
		panel_cls = 'easy-input-panel-center';
	}
	$(".easy-create-item").each(function(){
		var option = $(this).data("option");
		var data = JSON.stringify(option);
		inputArray += data+","+enter;
		data = data.substring(1,data.length-1);
		data = data.replace(new RegExp(/(")/g),"'");
		var id = "";
		if(option.id != undefined){
			id = 'id="'+option.id+'"';
		}
		var item = tab+tab+'<div class="easy-input-line" data-options="'+option.label+'">'+enter
			+tab+tab+tab+'<input '+id+' class="'+option.editor+'" data-options="'+data+'" />'+enter
			+tab+tab+'</div>'+enter;
		items += item;
		console.log(item);
	});
	inputArray = '['+inputArray+']';
	inputArray = '{title:"'+create_title+'",width:'+title_width+',iscenter:'+is_center+',inputs:'+enter+inputArray+'}';
	
	var html = '<'+'%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>'+enter
	+'<'+'%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>'+enter
	+'<!DOCTYPE html>'+enter
	+'<html>'+enter
	+'<head>'+enter
	+'<title>'+create_title+'</title>'+enter
	+'<'+'%@ include file="../com/import.jsp"%>'+enter
	+'</head>'+enter
	+'<body>'+enter
	+tab+'<div class="easyui-panel" data-options="border:false,cls:\''+panel_cls+'\'">'+enter
	+items
	+tab+tab+'<div style="text-align:center;padding:5px 0">'+enter
	+tab+tab+tab+'<span class="easyui-linkbutton" onclick="" data-options="iconCls:\'icon-save\'">保存</span>'+enter
	+tab+tab+'</div>'+enter
	+tab+'</div>'+enter
	+'<script>'+enter
	+enter
	+'<'+'/script>'+enter
	+'</body>'+enter
	+'</html>'+enter
	+'<!-- 保留数据 勿删 -->'+enter
	+'<!-- '+inputArray+' -->';

	$("#codearea").val(html);
	$("#codearea").css({
		width: window.innerWidth*0.8 - 20,
		height: window.innerHeight*0.8 - 44
	});
	$("#codedlg").dialog({
		width: window.innerWidth*0.8,
		height: window.innerHeight*0.8
	}).dialog("center").dialog("open");
}

//加载数据
function loadData(data){
	try {
		$("#create_panel").empty();
		
		var inputs = data.inputs;
		for (var i = 0; i < inputs.length; i++) {
			create(inputs[i]);
		}
		$("#create_title").val(data.title);
		$("#title_width").val(data.width);
    	$("#title_width_s").text(" W : "+data.width);
    	if(data.iscenter){
    		$("#is_center").prop("checked",true);
			$("#create_panel").addClass("easy-input-panel-center");
    	}else{
    		$("#is_center").prop("checked",false);
			$("#create_panel").removeClass("easy-input-panel-center");
    	}
    	
    	$("#create_panel").dialog("resize",{width:data.width});
	} catch (e) {
		$.messager.alert("提示", "data转换失败，请检查格式是否正确！<br>"+e, "error");
		return;
	}
}

$(function(){
	$("body").keydown(function(e){
		//移除一个选项
        if(e.keyCode == 46){ 
        	currentEditor.remove();
        	currentEditor = null;
        } 
    });
	$("#create_panel").dialog({
	    title: '窗口',
	    width: 500,
	    height: 500,
	    closed: false,
	    resizable: true,
	    draggable: false,
	    closable: false,
	    inline: true,
	    left:"10px",
	    top:"50px",
	    onResize:function(width, height){
	    	//var w = $("#create_panel").width();
	    	$("#title_width_s").text(" W : "+width);
	    	$("#title_width").val(width);
	    }
	}).dialog("open");
	
	panel = $("#create_panel");
	//增加
	$("#btnAdd").click(function(){
		create({});
	});
	//复制
	$("#btnCopy").click(function(){
		if(currentEditor == null){
			create({});
		}else{
			var option = currentEditor.data("option");
			create(option);
		}
	});
	//生成代码
	$("#btnCode").click(function(){
		createCode();
	});
	//删除
	$("#btnDel").click(function(){
		currentEditor.remove();
		currentEditor = null;
	});
	//统一设置
	$("#btnSet").click(function(){
		var width = $("#creat_width").val();
		var labelwidth = $("#creat_labelwidth").val();
		$(".easy-create-item").each(function(){
			if(width != ""){
				change("width",width,$(this));
			}
			if(labelwidth != ""){
				change("labelWidth",labelwidth,$(this));
			}
		});
	});
	//测试页面
	$("#btnTest").click(function(){
		var create_title = $("#create_title").val();
		var title_width = $("#title_width").val();
		var test_page = $("#test_page").val();
		//template/easy/unitperson/edit.jsp
		Util.dialog(create_title,test_page,title_width);
	});
	//加载数据
	$("#btnLoad").click(function(){
		var data = $("#loadData").textbox("getText");
		data = eval('(' + data + ')');
		loadData(data);
	});
	//举个例子
	$("#btnExample").click(function(){
		var data = {title:"举例窗口",width:500,iscenter:false,inputs:
			[{"editor":"easyui-textbox","height":"","width":"400","label":"姓名:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"fname"},
			 {"editor":"easyui-textbox","height":"","width":"400","label":"昵称:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"fnickname"},
			 {"editor":"easyui-textbox","height":"","width":"400","label":"年龄:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"fage"},
			 {"editor":"easyui-textbox","height":"","width":"400","label":"职业:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"ftype"},
			 {"editor":"easyui-combobox","height":"","width":"400","label":"性别:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"请输入性别","data":[{"fid":0,"fname":"男"},{"fid":1,"fname":"女"}],"id":"fsex"},
			 {"editor":"easyui-textbox","height":"","width":"400","label":"地址:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"faddress"},
			 {"editor":"easyui-textbox","height":"100","width":"400","label":"情况:","labelWidth":"150","multiline":"true","required":false,"missingMessage":"","id":"fdesc"},
			 {"editor":"easyui-filebox","height":"","width":"400","label":"文件:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"ffile"},
			 ]};
		loadData(data);
		//alert($("#example").val());
	});
	
	$("#propertygrid").propertygrid({
		data:propertyData,
		onEndEdit : function(index, row, changes){
			if(changes.value != undefined){
				change(row.name,changes.value,currentEditor);
			}
		}
	});
	
	$("#codedlg").dialog({
		title : "代码",
	    width: 800,
	    height: 600,
	    cache: false,
	    modal: true,
	    closed: true
	});
	
	var title = $("#create_panel").parent().find(".panel-title");
	title.html("<input id='create_title' style='width:200px;border-radius: 5px;border:1px solid #95b8e7;' value='默认窗口' />"
		+"<input id='title_width' type='hidden' value='500' /><span id='title_width_s'> W : 486</span>&nbsp;<input id='is_center' type='checkbox' >居中");
	$("#is_center").click(function(){
		if($("#is_center").is(":checked")){
			$("#create_panel").addClass("easy-input-panel-center");
		}else{
			$("#create_panel").removeClass("easy-input-panel-center");
		}
	});
	
	var storage = window.localStorage;
	if(storage){
		var test_page = storage.getItem("test_page");
		$("#");
		storage.setItem("pageLoadCount",0)
	}
	
	$("#testdata").textbox("setText",JSON.stringify(testData));//测试数据
	$("#btnCombo1").jeasycombo({
		onlybtn:true,//是否仅保留按钮不显示文本框
		multiple : true,//是否多选
		//dlgwidth:600,//自定义弹出框的宽度
		//isinline:false,//是否每行一个选项
		//linenum:3,//当每行多个选项时，每一行选项的个数
		type : "list",//弹出的样式
		data:testData,
		codefield:"fshortcode",//编码/简码字段
		onChange:function(ids,texts,codes){
			alert("1您选择的是："+texts+"  code："+codes);
		}
	});
	
	$("#btnCombo").jeasycombo({
		onlybtn:true,//是否仅保留按钮不显示文本框
		multiple : true,//是否多选
		parentselect : true,//只返回父节点的值//当多选并且子节点全部选中时
		type : "tree",//弹出的样式
		btnclass:"btn-warning",//自定义按钮样式
		url:"jboot-ui/demo/combo-data-tree.json",
		onChange:function(ids,texts,codes){
			alert("1您选择的是："+texts+"  code："+codes);
		}
	});
});

</script>
</body>
</html>
