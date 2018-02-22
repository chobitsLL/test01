<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>认筹汇总查询</title>
<%@ include file="../com/import.jsp"%>
<style type="text/css"></style>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="easyui-layout " data-options="fit:true">
			<div title="查询" class="easy-param" data-options="region:'west',border:false,headerCls:'easy-param-header'">
				<div class="easy-input-line">
					<input id="fbegintime" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'fbegintime'" />
				</div>
				<div class="easy-input-line">
					<input id="fendtime" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'结束日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'fendtime'" />
				</div>
				<div class="easy-input-line">
					<input id="ffrom" class="jeasycombo" />
				</div>
				<div class="easy-input-line">
					<input id="ftitle" class="jeasycombo" />
				</div>
				<div class="easy-input-line">
					<input id="fstoreid" class="jeasycombo" />
				</div>
				<div class="easy-input-line">
					<input id="fname" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'员工姓名:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'fname','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="fno" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'工号:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'fno','url':''" />
				</div>
				<div class="easy-searchbtn">
					<span class="easyui-linkbutton easy-search" id="btnSearch" data-options="iconCls:'icon-search'">查询</span>
					<span class="easyui-linkbutton" id="btnReset" data-options="iconCls:'icon-clear'">重置</span>
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
<div id="fids" class="hide"></div>
<script type="text/javascript">
//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [
		{id:"#fbegintime",name:"fbegintime",type:"date"},
		{id:"#fendtime",name:"fendtime",type:"date"},
		{id:"#ffrom",name:"ffrom",type:"combo"},
		{id:"#ftitle",name:"ftitle",type:"combo"},
		{id:"#fstoreid",name:"fstoreid",type:"combo"},
		/* {id:"#fids",name:"fids",type:"text"}, */
		{id:"#fname",name:"fname",type:"text"},
		{id:"#fno",name:"fno",type:"text"}
	];
//默认的表格列数据和菜单ID
window.menuid = 516;//菜单ID
var currentColumns = new Array();
var defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"认筹政策",width:60},  
	{field:"ftitle",title:"DM单",width:120},  
	{field:"fname",title:"门店",width:140},
	{field:"fusername",title:"员工姓名",width:80},  
	{field:"fjobno",title:"工号",width:60},
	{field:"dmsum",title:"报名人员",width:80},  
	{field:"paysum",title:"已付款人数",width:90},  
	{field:"payamount",title:"付款金额",width:80},
	{field:"sumuser",title:"领券人数",width:80},  
	{field:"sumunituser",title:"已领券数",width:80},
	{field:"cash",title:"代金券核销数",width:100},  
	{field:"gift",title:"礼品券核销数",width:100}  
]];

$(function(){
	$("#fstoreid").jeasycombo({
		width:200,
		label:"门店:",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:600,
		linenum:4,
		type : "list",//弹出的样式
		url: 'select/stockFstore.do?type=0'
	}); 
	$("#ftitle").jeasycombo({
		width:200,
		label:"DM单:",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:600,
		linenum:1,
		type : "list",//弹出的样式
		url: 'fromPolicy/queryFavorTitle.do'
	});
	$('#ffrom').jeasycombo({
		multiple : true,//是否多选
		label:"认筹政策:",
		labelWidth:80,
		width:200,
		dlgwidth:600,
		dlgheight:400,
		linenum:1,
		type:"list",
		url : "fromPolicy/queryFavorPolicy.do",
		/* onChange: function(ids, texts){
			$("#fids").val(ids);
		} */
	});
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
		button_role : "${role516.ffunction}",
	});
	$("#btnSearch").bind("click", function(){
		search();
  });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
});
//查询事件
function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","fromPolicy/queryFromPolicy.do");
}

</script>
</body>
</html>
