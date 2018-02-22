<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<!DOCTYPE html>
<html>
<head>
<title>积分行为规则</title>
<%@ include file="../com/import.jsp"%>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="easyui-layout " data-options="fit:true">
			<div title="查询" class="easy-param" data-options="region:'west',border:false,headerCls:'easy-param-header'">
				<div class="easy-input-line edithide">
					<input id="beginDate" class="easyui-datebox" data-options="'editor':'easyui-textbox','height':'25','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'beginDate'" />
				</div>
				<div class="easy-searchbtn">
					<span class="easyui-linkbutton" id="btnSearch" data-options="iconCls:'icon-search'" onclick="search()">查询</span>
					<span class="easyui-linkbutton" id="btnReset"  data-options="iconCls:'icon-clear'"  onclick="Util.resetParam(paramArray)">重置</span>
				</div>
			</div>
			<div data-options="region:'center',border:false,iconCls:'icon-ok'">
				<div id="easy-tool"></div>
				<table id="easy_table"></table> 
			</div>
		</div>
		<div id="column_filter"></div>
	</div>
</div>
<script type="text/javascript">
//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [
	{id:"#beginDate",name:"beginDate",type:"date"}
	];
//默认的表格列数据和菜单ID
window.menuid = 506;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"ID",hidden:true},
	{field:"fbegindate",title:"开始日期",width:140},    
	{field:"fenddate",title:"结束日期",width:140},  
	{field:"factiontype",title:"行为类型",width:80,editor:"validatebox",fmt:'fmt_factiontype'},
	{field:"fperiodtype",title:"周期",width:60,editor:"validatebox",fmt:'fmt_fperiodtype'},
	{field:"ftime",title:"次数",width:80},  
	{field:"fshopamount",title:"最小消费金额",width:100},  
	{field:"fscore",title:"积分",width:80},
	{field:"fabstract",title:"说明",width:160}  
]];
Util.fmt_factiontype = function(value,row,index){
	if(row.factiontype == 0){
		value = "登录";
	} else if(row.factiontype == 1){
		value = "评价";
	} else if(row.factiontype == 2){
		value = "晒单";
	} else if(row.factiontype == 3){
		value = "签到";
	} else if(row.factiontype == 4){
		value = "注册";
	} 
	return value;
}
Util.fmt_fperiodtype = function(value,row,index){
	if(row.fperiodtype == 0){
		value = "无";
	} else if(row.fperiodtype == 1){
		value = "天";
	} else if(row.fperiodtype == 2){
		value = "周";
	} else if(row.fperiodtype == 3){
		value = "月";
	} else if(row.fperiodtype == 4){
		value = "年";
	} 
	return value;
}
$(function(){
	//初始化表格
	$("#easy_table").datagrid({
		bodyCls:"easy-grid",
		toolbar:"#easy-tool",
		fit:true,
		rownumbers:true,
		singleSelect : true,
		selectOnCheck : false,
		checkOnSelect : false,
		pagination : true,
		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
        pageSize : 20, //每页显示的记录条数，默认为5  
	    columns : window.currentColumns
	});
	//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		button_role : "${role506.ffunction}",
		button:[
			{text:"添加",nocheck:true,iconCls:"icon-add",onclick:function(ids,rows){
				addNew();
			}},
			{text:"编辑",iconCls:"icon-edit",onclick:function(ids,rows){				
				edit(ids);
			}},
			{text:"删除",iconCls:"icon-remove",onclick:function(ids,rows){				
				del(ids);
			}}
        ]
	});
});

//查询
function search(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","scorePolicyController/QueryScorePolicy.do");
	$(".easy-dlg").dialog("destroy");//关闭弹出框
} 
//新增
function addNew(){
	Util.dialog("添加积分行为规则","scorePolicyController/addPolicy.do",700);
}
//编辑
function edit(ids){
	Util.dialog("修改积分行为规则","scorePolicyController/ScorePolicyUI.do?FID="+ids,700);
}
//删除
function del(ids){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"scorePolicyController/deleteScorePolicy.do",
		dataType:"json",
		data: { FIDs : ids },
		success:function(data){
			$.messager.progress("close");
			if (data.result) {
				$.messager.alert("提示", data.msg,"info");
				search();
			}else{
				$.messager.alert("提示", data.msg,"warning");
			}
		},error:function(){
			$.messager.progress("close");
			$.messager.alert("提示", "操作超时","warning");
		}
	});
}
function closeDialog(){
	$('.easy-dlg').dialog('close');
	$('#easy_table').datagrid('reload');
}
</script>
</body>
</html>