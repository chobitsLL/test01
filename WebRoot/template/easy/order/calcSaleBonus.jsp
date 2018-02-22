<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>销售提成重算</title>
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
					<input id="FBeginDate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'销售日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FBeginDate'" />
				</div>
				<div class="easy-input-line">
					<input id="FEndDate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'至:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FEndDate'" />
				</div>
				<div class="easy-input-line">
					<input id="selectType" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'计算状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'全部','fid':0},{'fname':'未计算','fid':1},{'fname':'已计算','fid':2}],'id':'selectType'" />
				</div>
				<div class="easy-input-line">
					<input id="FStoreID" />
				</div>
				<div class="easy-input-line">
					<input id="FSaleUserID" />
				</div>
				<div class="easy-searchbtn">
					<span class="easyui-linkbutton easy-search" id="btnSearch" data-options="iconCls:'icon-search'" onclick="search()">查询</span>
					<span class="easyui-linkbutton" id="btnReset" data-options="iconCls:'icon-clear'" onclick="Util.resetParam(paramArray)">重置</span>
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
var paramArray = [
 {id:"#FSaleUserID",name:"saleUserId",type:"combo"},
 {id:"#FBeginDate",name:"beginDate",type:"date"},
 {id:"#FEndDate",name:"endDate",type:"date"},
 {id:"#FStoreID",name:"storeId",type:"combo"},
 {id:"#selectType",name:"selectType",type:"select"}
];
//默认的表格列数据和菜单ID
var menuid = 511;//菜单ID
window.currentColumns = new Array();
var columns =  [
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"编号",hidden:true},
	{field:"fdate",title:"销售日期",width:150},
	{field:"fno",title:"销售单号",width:200},
	{field:"fstorename",title:"销售店铺",width:180},
	{field:"fusername",title:"用户名称",width:120},
	{field:"fpersonname",title:"销售人员",width:100},
	{field:"flinkunitname",title:"联营商",width:160},
	{field:"fhavecalc",title:"计算状态",width:160}
];
window.defaultColumns = [columns]; 	
//查询事件
function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","saleBonus/queryCalcSaleBonus.do");
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
		button_role : "${role511.ffunction}",
		button:[{text:"重算", iconCls:"icon-money",onclick:function(ids,rows){
					calc(ids,rows);
			   }}]
	});
	
	//店铺
	$("#FStoreID").jeasycombo({
		width:200,
		label:"店铺名称:",
		labelWidth:80,
		type : "list",//弹出的样式
		multiple : false,//是否多选
		detail:true,
		isinline:false,
		dlgwidth:1000,
		linenum:4,
		//注意 ： 此处只选择五种类型的店铺 企业0、门店1、员工2、加盟商3、村级服务站6
		url : "select/selectStore.do?selecttype=1&unitid=0&userid=${sessionScope.user.FID}&storetypes=0,1,2,3,6"
	});
	
	//销售人
	$("#FSaleUserID").jeasycombo({
		width:200,
		label:"销售人员:",
		labelWidth:80,
		type : "list",//弹出的样式
		multiple : false,//是否多选
		detail:true,
		isinline:false,
		dlgwidth:800,
		linenum:4,
		url: "select/selectUser.do"
	});
});

//重算
function calc(ids,rows){
	$.messager.confirm('确认','您确认要【重算】选中的内容吗？',function(r){
		if (r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:"saleBonus/calcSaleBonus.do",
				dataType : "json",					
				data: {ids:ids},		
				success: function(data){
					$.messager.progress("close");
					if (data.result) {
						$.messager.alert("提示","重算成功！", "info");
						search();
					}else{
						$.messager.alert("提示",data.msg, "error");
					}
				}
			});
		}
	});
}
</script>
</body>
</html>
<!-- 保留数据 勿删 -->
<!-- {title:"查询条件",width:257,iscenter:false,inputs:
[{"editor":"easyui-datebox","height":"","width":"200","label":"销售日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FBeginDate"},
{"editor":"easyui-datebox","height":"","width":"200","label":"至:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FEndDate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"提成类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未计算","fid":1},{"fname":"已计算","fid":2}],"id":"selectType"},
{"editor":"jeasycombo","height":"","width":"200","label":"店铺名称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FStoreID"},
{"editor":"jeasycombo","height":"","width":"200","label":"销售人员:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FSaleUserID"},
]} -->