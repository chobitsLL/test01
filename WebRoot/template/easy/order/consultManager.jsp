<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>商品咨询管理</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript" src="template/easy/j/order/consultManager.js"></script>
<script type="text/javascript" src="template/easy/j/order/jeasyui_doCellTip.js"></script>
<script type="text/javascript" src="template/easy/j/order/datagrid-detailview.js"></script>
<script type="text/javascript" src="template/easy/j/order/jquery.serializejson.min.js"></script>


</head>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<!-- 公共菜单  -->
		<%@ include file="../com/menu.jsp"%>
		<div data-options="region:'center'">
			<div class="easyui-layout " data-options="fit:true">
				<div title="查询" class="easy-param"
					data-options="region:'west',border:false,headerCls:'easy-param-header'">
					<!-- 下拉框不可编辑editable:false multiple:true是否多选 -->
					<form id="easyuiForm">
						<div class="easy-input-line">
							<select class="easyui-combobox" 
								id=fdateType name='fdateType'
								data-options="'width':200,panelHeight:'auto','label':'日期类型:','labelWidth':60,editable:false" >
								<option value="0" selected="selected">咨询日期</option>
			               		<option value="1">回复日期</option>		
							</select>
						</div>
						<div class="easy-input-line">
							<input id='FValidDateBegin' name='FValidDateBegin'
								class="easyui-datebox" data-options="'width':200,'label':'开始时间:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='FValidDateEnd' name='FValidDateEnd'
								class="easyui-datebox" data-options="'width':200,'label':'结束时间:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id="FMType" name="FMType" />
						</div>
						<div class="easy-input-line">
							<input id="fstoType" name="fstoType" />
						</div>
						<div class="easy-input-line">
							<input id="FStoreID" name="FStoreID" />
						</div>
						<div class="easy-input-line">
							<input id="fmark" name="fmark" />
						</div>
						<div class="easy-input-line">
							<input id="ftype" name="ftype" />
						</div>
						<div class="easy-input-line">
							<input id='FStockID' name='FStockID'
								class="easyui-textbox" data-options="'width':200,'label':'商品:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='FQUserID' name='FQUserID'
								class="easyui-textbox" data-options="'width':200,'label':'用户:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id="FState" name="FState" />
						</div>
					
						
					</form>
					<div class="easy-searchbtn">
						<span class="easyui-linkbutton easy-search" id="btnSelect"
							data-options="iconCls:'icon-search'">查询</span> 
						<span class="easyui-linkbutton" id="btnReset"
							data-options="iconCls:'icon-clear'">重置</span>
					</div>
				</div>
				<div data-options="region:'center',border:false,iconCls:'icon-ok'">
					<div id="easy-tool" >
						<!-- <span class="easyui-linkbutton topButton" id="doAswer"  
							data-options="iconCls:'icon-add',plain:true">回复</span> 
						<span class="easyui-linkbutton topButton" id="delBtn"  
							data-options="iconCls:'icon-add',plain:true">删除</span>  -->
					</div>
					<table id="easyuiTable"></table>
				</div>
			</div>


			<div id="column_filter"></div>
			<!-- 弹窗页面 -->
			<div id="easyuiPopup" class="easyui-dialog"
				style="width: auto; height: auto; padding: 10px; left: auto; right: auto; top: 100px;"
				data-options="iconCls:'icon-save', modal:true, closed:true">
				<div style="width: 550px; max-height: 400px;overflow:auto; float: left;">
					<div style="border-bottom: 1px solid #95b8e7;padding-left: 15px!important;">
						<div class="easy-input-line" style="margin: 15px 0;">
							<font class="r-title-ch" style="font-size: 14px!important;">用户</font>
						</div>
						<div class="easy-input-line" style="margin-bottom: 10px;">
							<label class="label" style="">咨询内容：</label>
							<label  id="FQContent" style=""></label>
						</div>
						<div class="easy-input-line" style="margin-bottom: 10px;">
							<label class="label" style="">咨询时间：</label>
							<label id="FQDate" style=""></label>
						</div>
					</div>
					
					<div style="padding-left: 15px!important;">
						<div class="easy-input-line" style="margin: 15px 0;">
							<font class="r-title-ch" style="font-size: 14px!important;">请输入回复内容</font>
						</div>
						<div class="easy-input-line" style="margin-bottom: 10px;">
							<input class="easyui-textbox" data-options="multiline:true" id="writeText"
								 style="width:500px;height:50px">
							<!-- <textarea id="" rows=5 name=""  class="textarea easyui-validatebox" ></textarea> -->
						</div>
					</div>
						
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	//判断用户是否登录   如果未登录就跳转到登录页面
	var userid="${sessionScope.user.FID}";
	var unitid="${sessionScope.b_unit_id}";
    if(userid==""){
		$.jbootmsg("您还未登陆，请您先登陆后再操作","error");//user/login
	  	window.location.href="user/login.jsp";		
	} 
    
    var columns=[   
				{field:'ck',checkbox:true},
				{field:'fstorename',align:'center',title:'店铺'},
				{field:'fmtype',align:'center',title:'咨询类型',fmt:'fmt_fmtype'},
				{field:'fstockname',align:'center',title:'商品'},
				{field:'fusername',align:'center',title:'用户'},
				{field:'fqdate',align:'center',title:'咨询日期'},
				{field:'fqcontent',align:'center',title:'咨询内容'},
				{field:'fstate',align:'center',title:'咨询状态',fmt:'fmt_fstate'},
				{field:'fapersoner',align:'center',title:'回复人'},
				{field:'facontent',align:'center',title:'回复内容'},
				{field:'fadate',align:'center',title:'回复日期'}
				]
Util.fmt_fmtype = function(value,row,index){
    	var mtype = value;
		var fmtype="";
		 if(mtype==1){
			 fmtype="产品咨询";
		 }else if(mtype==2){
			 fmtype="库房配送";
		 }else if(mtype==3){
			 fmtype="发票保修";
		 }else if(mtype==4){
			 fmtype="支付信息";
		 }else if(mtype==5){
			 fmtype="其他问题";
		 }
		return fmtype;
}    
Util.fmt_fstate = function(value,row,index){
	var state = value;
	var fstate="";
	if(state==0){
		fstate="待回复";
	}else if(state==1){
		fstate="已回复";
	}	 
	return fstate;
}    
   //菜单ID
   window.menuid=503;
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
   	$('#easyuiTable').datagrid({
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
   		columns:window.currentColumns,
   	 	//鼠标停留0.5秒显示详细
// 	    onLoadSuccess: function (data) {
// 	    	$(this).datagrid('doCellTip', { 'max-width': '5px', 'delay': 500 });
// 		},
		//点击加号显示隐藏内容
//	    view: detailview,
//    	detailFormatter:function(index,row){
//    		return '<div class="ddv" style="padding:5px 0"></div>';
//    	}
   		})
   	var menu_function = "${role503.ffunction}";
   		//初始化列编辑组件
   	$("#column_filter").jeasycolumn({
   		datagrid : "#easyuiTable",
   		defaultColumns : window.defaultColumns,
   		button_role : menu_function,
   		button : [{
   			text:'回复',
   			iconCls:'icon-edit',
   			onclick:function(id,ids){
//    				var obj = getSelections();
   				doAswer(ids);
   			}},
   		   {
   			text:'删除',
   			iconCls:'icon-remove',
   			onclick:function(id,ids){
   				delBtn(id);
   			}}]
   	});
   })
	</script>
</body>
</html>
