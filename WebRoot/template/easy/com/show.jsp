<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>举例窗口</title>
<%@ include file="../com/import.jsp"%>
</head>
<body>
	<div class="easyui-panel" data-options="border:false,cls:'easy-input-panel'" style="display: none;max-width: 500px;">
		<div class="easy-input-line">
			<input id="fname" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'400','label':'姓名:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'','id':'fname'" />
		</div>
		<div class="easy-input-line">
			<input id="fnickname" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'400','label':'昵称:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'','id':'fnickname'" />
		</div>
		<div class="easy-input-line">
			<input id="fage" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'400','label':'年龄:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'','id':'fage'" />
		</div>
		<div class="easy-input-line">
			<input id="ftype" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'400','label':'职业:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'','id':'ftype'" />
		</div>
		<div class="easy-input-line">
			<input id="fsex" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'400','label':'性别:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'请输入性别','data':[{'fid':0,'fname':'男'},{'fid':1,'fname':'女'}],'id':'fsex'" />
		</div>
		<div class="easy-input-line">
			<input id="faddress" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'400','label':'地址:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'','id':'faddress'" />
		</div>
		<div class="easy-input-line">
			<input id="fdesc" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'100','width':'400','label':'情况:','labelWidth':'150','multiline':'true','required':false,'missingMessage':'','id':'fdesc'" />
		</div>
		<div class="easy-input-line">
			<input id="ffile" class="easyui-filebox" data-options="'editor':'easyui-filebox','height':'','width':'400','label':'文件:','labelWidth':'150','multiline':false,'required':false,'missingMessage':'','id':'ffile'" />
		</div>
		<div class="easy-input-line">
			<label class="textbox-label textbox-label-before" style="text-align: right; width: 145px;padding-right: 1px;">开关:</label>
			<input class="easyui-switchbutton" checked>
		</div>
		<div class="easy-input-line">
			<label class="textbox-label textbox-label-before" style="text-align: right; width: 145px;padding-right: 1px;">是否开启:</label>
			<input class="easyui-switchbutton" data-options="onText:'开启',offText:'关闭',width:80">
		</div>
		<div style="text-align:center;padding:5px 0">
			<span class="easyui-linkbutton" onclick="" data-options="iconCls:'icon-save'">保存</span>
		</div>
	</div>
	<div id="prizePnl" style="margin-left: 60px;"></div>
	<div>
		<span class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="javascript:showValue();">取值</span>
	</div>

<script type="text/javascript" src="template/easy/j/com/jaccordion.js"></script>
<script>
var acc = jaccordion($("#prizePnl"));

var values = [
	{"fid":"1","fname":"新的奖项2","fdescription":"2","fmoney":"2","fmaximum":"2","fprizetype":"0","fcardid":""},
	{"fid":"2","fname":"新的奖项3","fdescription":"3","fmoney":"3","fmaximum":"3","fprizetype":"0","fcardid":""},
	{"fid":"3","fname":"新的奖项","fdescription":"4","fmoney":"4","fmaximum":"4","fprizetype":"0","fcardid":""},
	{"fid":"4","fname":"新的奖项","fdescription":"","fmoney":"","fmaximum":"","fprizetype":"0","fcardid":""}
];

$(function(){
	acc.setValue(values);
});


function showValue(){
	if(acc.isEmpty()){
		return;
	}
	var v = acc.getValue();
	console.log(JSON.stringify(v));
}
/* $('#prizePnl').accordion({    
    animate:false   
});

var input = $("<input />");
input.change(function(){
	console.log($(this).val());
});

$('#prizePnl').accordion('add', {
	title: '新标题',
	content: input,
	selected: false
}); */



</script>
</body>
</html>
<!-- 保留数据 勿删 -->
<!-- {title:"举例窗口",width:500,iscenter:true,inputs:
[{"editor":"easyui-textbox","height":"","width":"400","label":"姓名:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"fname"},
{"editor":"easyui-textbox","height":"","width":"400","label":"昵称:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"fnickname"},
{"editor":"easyui-textbox","height":"","width":"400","label":"年龄:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"fage"},
{"editor":"easyui-textbox","height":"","width":"400","label":"职业:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"ftype"},
{"editor":"easyui-combobox","height":"","width":"400","label":"性别:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"请输入性别","data":[{"fid":0,"fname":"男"},{"fid":1,"fname":"女"}],"id":"fsex"},
{"editor":"easyui-textbox","height":"","width":"400","label":"地址:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"faddress"},
{"editor":"easyui-textbox","height":"100","width":"400","label":"情况:","labelWidth":"150","multiline":"true","required":false,"missingMessage":"","id":"fdesc"},
{"editor":"easyui-filebox","height":"","width":"400","label":"文件:","labelWidth":"150","multiline":false,"required":false,"missingMessage":"","id":"ffile"},
]} -->