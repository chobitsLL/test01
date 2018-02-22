<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>销售提成查询</title>
<%@ include file="../com/import.jsp"%>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="easyui-layout " data-options="fit:true">
			<div title="查询" class="easy-param" data-options="region:'west',border:false,headerCls:'easy-param-header'">
				<div class="easy-input-line">
					<input id="FBeginDate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FBeginDate'" />
				</div>
				<div class="easy-input-line">
					<input id="FEndDate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'结束日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FEndDate'" />
				</div>
				<div class="easy-input-line">
					<input id="FUnitID" class="jeasycombo"/>
				</div>
				<div class="easy-input-line">
					<input id="FStoreID" class="jeasycombo"/>
				</div>
				<div class="easy-input-line">
					<input id="FSaleUserID" class="jeasycombo"/>
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
<script type="text/javascript">
//查询参数数据
//{id:"标签的ID",
// name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
// type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
// value:"固定值，当type='value'时取此值"
// ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [{id:"#FBeginDate",name:"beginDate",type:"date"},
		  		  {id:"#FEndDate",name:"endDate",type:"date"},
				  {id:"#FUnitID",name:"unitID",type:"combo"},
		  		  {id:"#FStoreID",name:"storeID",type:"combo"},
		  		  {id:"#FSaleUserID",name:"saleUserID",type:"combo"}
		  		  ];
//默认的表格列数据和菜单ID
window.menuid = 903;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"编号",hidden:true},
	{field:"fsaledate",title:"销售日期",width:130},      
	{field:"fsaleno",title:"销售单号",width:200},    
	{field:"fstorename",title:"店铺名称",width:120},    
	{field:"fsaleusername",title:"销售员",width:80},    
	{field:"fsaleamount",title:"销售金额",width:80},    
	{field:"fbonusamount",title:"提成金额",width:80},    
	{field:"fbonusmodename",title:"提成模式",width:80},    
	{field:"fbonustypename",title:"提成类型",width:80},    
	{field:"flinkunitname",title:"联销商",width:160}   
]];

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
		button_role : "${role903.ffunction}",
	});
	
	$("#btnSearch").bind("click", function(){
		search();
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
	var userid="${sessionScope.user.FID}";
	var unitid="${sessionScope.b_unit_id}";
	$("#FUnitID").jeasycombo({
		width:200,
		label:"所属单位:",
		labelWidth:80,
		multiple : false,//是否多选
		detail:false,
		isinline:false,
		dlgwidth:500,
		linenum:1,
		type : "list",//弹出的样式
		url: "unitstock/selectPool.do?unitid="+unitid+"&type=1",
	});
	$("#FStoreID").jeasycombo({
		width:200,
		label:"店铺名称:",
		labelWidth:80,
		multiple : false,//是否多选
		detail:false,
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		//注意 ： 此处只选择五种类型的店铺 企业0、门店1、员工2、加盟商3、村级服务站6
		url: "select/selectStore.do?selecttype=3&unitid="+unitid+"&userid="+userid+"&storetypes=0,1,2,3,6",
	});
	$("#FSaleUserID").jeasycombo({
		width:200,
		label:"销售人员:",
		labelWidth:80,
		multiple : false,//是否多选
		detail:false,
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		url: "priceDoc/selectGrid.do?sql=2&multiple=true",
	});
});

function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","saleBonus/saleBonusQry.do");
}

</script>
</body>
</html>

