<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>购物积分规则</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript" src="template/easy/j/order/cardScore.js"></script>
<script type="text/javascript"
	src="template/easy/j/order/jquery.serializejson.min.js"></script>


</head>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<!-- 公共菜单  -->
		<%@ include file="../com/menu.jsp"%>
		<div data-options="region:'center'">
			<div class="easyui-layout " data-options="fit:true">
				<div title="查询" class="easy-param"
					data-options="region:'west',border:false,headerCls:'easy-param-header'">
					<form id="easyParam">
						<div class="easy-input-line">
							<input id='validdatebegin' name='validdatebegin'
								class="easyui-datebox" data-options="'width':200,'label':'开始日期:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='validdateend' name='validdateend'
								class="easyui-datebox" data-options="'width':200,'label':'结束日期:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id="stockclassid" name="stockclassid" />
						</div>
						<div class="easy-input-line">
							<input id="markids" name="markids" />
						</div>
						<div class="easy-input-line">
							<input id="state" name="state" class="easyui-combobox" data-options="'width':200,'label':'有效:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id="stop" name="stop" class="easyui-combobox" data-options="'width':200,'label':'终止:','labelWidth':60" />
						</div>
					</form>
					<div class="easy-searchbtn">
						<span class="easyui-linkbutton easy-search" id="btnSearch"
							data-options="iconCls:'icon-search'">查询</span> 
						<span class="easyui-linkbutton" id="btnReset"
							data-options="iconCls:'icon-clear'">重置</span>
					</div>
				</div>
				<div data-options="region:'center',border:false,iconCls:'icon-ok'">
					<div id="easy-tool"></div>
					<table id="cardTable"></table>
				</div>
			</div>
			<!-- 类型弹窗 -->
			<div id="onClickFStock" class="easyui-dialog"
				style="width: auto; height: auto; padding: 10px; left: auto; right: auto; top: 100px;"
				data-options="iconCls:'icon-save', modal:true, closed:true">
				<div style="padding: 10px 10px 10px 10px; width: 260px; float: left;">
					
				</div>
			</div>

			<div id="column_filter"></div>
		</div>
	</div>
	<script type="text/javascript">

var columns=[  
              {field:'ck',checkbox:true},
              {field:'fvaliddatebegin',title:'开始日期'},
              {field:'fvaliddateend',title:'结束日期'},
              {field:'fstockclassname',title:'类型',width:100},
              {field:'fmarknames',title:'品牌',width:100},
              {field:'cardname',title:'适用会员等级'},
              {field:'fscoretype',fmt:'fmt_fscoretype',title:'计算方式'},
              {field:'fscore',title:'比例'},
              {field:'faccepted',fmt:'fmt_faccepted',title:'有效'},
              {field:'fstopped',fmt:'fmt_fstopped',title:'终止'}
              ]
Util.fmt_fstopped = function(val,row,index){
	var stoppedname = '';
	if(val==1){
		stoppedname = "是";
	}else {
		stoppedname = "否";
	}
	return stoppedname;
}              
Util.fmt_faccepted = function(val,row,index){
	var acceptedname = '';
	if(val==1){
		acceptedname = "是";
	}else {
		acceptedname = "否";
	}
	return acceptedname;
}              
Util.fmt_fscoretype = function(val,row,index){
	var scoretypename = '';
	if(val == 1){
		scoretypename = "每消费一元可积分";
	}else if(val == 2){
		scoretypename = "每积一分需要消费金额";
	}else if(val == 3){
		scoretypename = "每消费满一元可积分";
	}else if(val == 4){
		scoretypename = "每积一分需要满足消费金额";
	}
	return scoretypename;
}              
//菜单ID
window.menuid=505;
window.currentColumns = new Array();
window.defaultColumns = [columns];
//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [
          	{id:"#payType",name:"payType",type:"select"},
          	{id:"#FAccepted",name:"FAccepted",type:"select"}];
$(function(){
	$('#cardTable').datagrid({
		/*url:searchUrl,*/
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
		columns:window.currentColumns
		})
	var menu_function = "${role505.ffunction}";
	if(menu_function.indexOf("编辑")!=-1){
		menu_function +=",新增,删除,编辑";
	}
		//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#cardTable",
		defaultColumns : window.defaultColumns,
		button_role : menu_function,
		button : [{
			text:'新增',
			iconCls:'icon-add',
			onclick:function(ids,rows){
				var url = "cardScore/queryUpdateCardScore.do?type=0&id=0";
				Util.dialog("新增购物积分规则",url);
			}},
		   {
			text:'编辑',
			iconCls:'icon-edit',
			onclick:function(ids,rows){
// 				var ids=getFids();
				var boo  = isAllowOperate(ids,rows,4);
				if (boo !== "true"){
					return;
				}
				
				var url = "cardScore/queryUpdateCardScore.do?type=1&id="+ids;
				Util.dialog("修改购物积分规则",url);
			}},
		   {
			text:'有效',
			iconCls:'icon-edit',
			onclick:function(ids,rows){
// 				var ids=getFids();
				var boo  = isAllowOperate(ids,rows,1);
				if (boo == "true"){
					operated(ids,1);
				}
			}},
			{
			text:'终止',
			iconCls:'icon-edit',
			plain:true,
			onclick:function(ids,rows){
// 				var ids=getFids();
				var boo  = isAllowOperate(ids,rows,3);
				if (boo == "true"){
					operated(ids,3);
				}
			}},
			{
			text:'删除',
			iconCls:'icon-remove',
			onclick:function(ids,rows){
// 				var ids=getFids();
				var boo  = isAllowOperate(ids,rows,2);
				if (boo == "true"){
					operated(ids,2);
				}
			}}]
	});
})
</script>
</body>
</html>
