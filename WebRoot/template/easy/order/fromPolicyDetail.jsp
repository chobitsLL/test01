<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>认筹明细查询</title>
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
				<div class="easy-input-line">
					<select class="easyui-combobox" id="fpaystate" name="fpaystate" data-options="panelHeight:'auto',editable:false,'label':'付款状态:','width':200,'labelWidth':80 " >
						<option value="" selected="selected">全部</option>
						<option value="0">未付款</option>
						<option value="1">已付款</option>
					</select>
				</div>
				<div class="easy-input-line">
					<select class="easyui-combobox" id="fvouchertype" name="fvouchertype" data-options="panelHeight:'auto',editable:false,'label':'券类型:','width':200,'labelWidth':80 " >
						<option value="" selected="selected">全部</option>
						<option value="2">代金券</option>
						<option value="4">礼品券</option>
					</select>
				</div>
				<div class="easy-input-line">
					<select class="easyui-combobox" id="fvoucherstate" name="fvoucherstate" data-options="panelHeight:'auto',editable:false,'label':'券核销状态:','width':200,'labelWidth':80 " >
						<option value="" selected="selected">全部</option>
						<option value="0">未核销</option>
						<option value="1">已核销</option>
					</select>
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
      	{id:"#fname",name:"fname",type:"text"},
      	{id:"#fno",name:"fno",type:"text"},
     	/* {id:"#fids",name:"fids",type:"text"}, */
      	{id:"#fpaystate",name:"fpaystate",type:"select",defval:""},
      	{id:"#fvouchertype",name:"fvouchertype",type:"select",defval:""},
      	{id:"#fvoucherstate",name:"fvoucherstate",type:"select",defval:""}
	];
//默认的表格列数据和菜单ID
window.menuid = 517;//菜单ID
var currentColumns = new Array();
var defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"认筹政策",width:60},  
	{field:"ftitle",title:"DM单",width:120},  
	{field:"storename",title:"门店",width:140},
	{field:"username",title:"员工姓名",width:80},  
	{field:"fjobno",title:"工号",width:60},
	{field:"flinkman",title:"联系人",width:80},
	{field:"flinkno",title:"联系电话",width:100},
	{field:"payamount",title:"付款金额",width:80},  
	{field:"fpayed",title:"付款状态",width:80},  
	{field:"fdealtype",title:"券领取状态",width:100},
	{field:"cash",title:"券核销状态",width:100},  
	{field:"fcardtype",title:"券类型",width:60,editor:"validatebox",formatter:function(value,row,index){
		if(row.fcardtype == 2){
			value = "代金券";
		} else if(row.fcardtype == 4){
			value = "礼品券";
		} 
		return value;
	}},
	{field:"consumetime",title:"核销日期",width:130},  
	{field:"fconsumebillno",title:"核销单号",width:120}  
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
		button_role : "${role517.ffunction}",
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
	$("#easy_table").datagrid("load","fromPolicyDetail/queryFromPolicyDetail.do");
}

</script>
</body>
</html>
