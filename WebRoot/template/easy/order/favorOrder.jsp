<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>促销订单</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript" src="template/easy/j/order/favorOrder.js"></script>
<script type="text/javascript" src="template/easy/j/order/jeasyui_doCellTip.js"></script>
<script type="text/javascript" src="template/easy/j/order/datagrid-detailview.js"></script>
<script type="text/javascript" src="template/easy/j/order/jquery.serializejson.min.js"></script>
<style type="text/css">
	#easyuiDetails .form-inline {
		border-bottom: 0.5px dashed #c8c8c8;
    	height: 26px;
    	line-height: 26px;
	}
	.form-inline .form-group {
	    display: inline-block;
	    margin-bottom: 0;
	    vertical-align: middle;
	    margin-left: 6px;
	    font-family: "微软雅黑" !important;
	    font-size: 10px !important;
	    white-space: nowrap;
	    display: inline-block;
	    width: 24%;
	}
	.form-group .title {
		color: #323232 !important;
		font-weight:bold;
	}
	.form-group .labelValue {
		color: #787878 !important;
	}
	
</style>

</head>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<!-- 公共菜单  -->
		<%@ include file="../com/menu.jsp"%>
		<div data-options="region:'center'">
			<div class="easyui-layout " data-options="fit:true">
				<div title="查询" class="easy-param"
					data-options="region:'west',border:false,headerCls:'easy-param-header'">
					<form id="formSum">
						<div class="easy-input-line">
							<input id='searchFdateStart' name='searchFdateStart'
								class="easyui-datebox" data-options="'width':200,'label':'开始时间:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='searchFdateEnd' name='searchFdateEnd'
								class="easyui-datebox" data-options="'width':200,'label':'结束时间:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='searchRealNo' name='searchRealNo'
								class="easyui-textbox" data-options="'width':200,'label':'订单号:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id="searchMark" name="searchMark" />
						</div>
						<div class="easy-input-line">
							<input id="searchStockClass" name="searchStockClass" />
						</div>
						<div class="easy-input-line">
							<input id='searchStockName' name='searchStockName'
								class="easyui-textbox" data-options="'width':200,'label':'商品名称:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='searchReceiver' name='searchReceiver'
								class="easyui-textbox" data-options="'width':200,'label':'联系人:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='searchTel' name='searchTel'
								class="easyui-textbox" data-options="'width':200,'label':'联系电话:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<select class="easyui-combobox" id="searchMode"
									name="searchMode" data-options="panelHeight:'auto',editable:false,'width':200,'label':'优惠方式:','labelWidth':60">
										<option value="0" selected="selected">全部</option>
									    <option value="1">满减</option>
									    <option value="2">直减</option>
									    <option value="3">打折</option>
									    <option value="4">赠品</option>
									</select>
						</div>
						<div class="easy-input-line">
							<input id='searchPolicyID' name='searchPolicyID'
								class="easyui-textbox" data-options="'width':200,'label':'政策编号:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<select class="easyui-combobox" id="searchPayRate"
									name="searchPayRate" data-options="panelHeight:'auto',editable:false,'width':200,'label':'承担方:','labelWidth':60">
										<option value="0" selected="selected">全部</option>
									    <option value="1">有商家承担</option>
									    <option value="2">有厂家承担</option>
									    <option value="3">有总部承担</option>
									</select>
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
					<div class="easyui-layout " data-options="fit:true">
						<div style="height:50%" data-options="region:'center',border:false,iconCls:'icon-ok'">
							<div id="easy-tool" >
							</div>
								<table id="easyuiTable"></table>
						</div>
						<div style="height:50%" title="订单详情" class="easy-param"
								data-options="region:'south',border:false,split:true">
								<div id="easyuiDetails" style="padding: 10px 36px;min-width: 1000px;">
								</div>
						</div>
					</div>
				</div>
			</div>


			<div id="column_filter"></div>
		</div>
	</div>
	
	<script type="text/javascript">
	//判断用户是否登录   如果未登录就跳转到登录页面
	var userid="${sessionScope.user.FID}";
	var unitid="${sessionScope.b_unit_id}";
	if(userid==""){
	  	window.location.href="user/login.jsp";
	}
	var columns = [
                   	{field:'fid',checkbox:true},
                   	{field:'fmaketime',title:'订单日期'},
                   	{field:'fno',title:'订单号'},
                   	{field:'fname',align:'center',title:'商品名称'},
                   	{field:'freceiver',align:'center',title:'联系人'},
                   	{field:'frevtel',align:'center',title:'联系电话'},
                   	{field:'fquanty',align:'center',title:'销售数量'},
                   	{field:'fprice',align:'center',title:'销售单价'},
                   	{field:'fstockamount',align:'center',title:'销售金额'},
                   	{field:'fperamount',align:'center',title:'优惠金额'}
                   	];
	var menuid = 512;//菜单ID
	window.currentColumns = new Array();
	var defaultColumns = [columns];

	$(function(){
     	//数据网络参数设置
     	$("#easyuiTable").datagrid({
     		toolbar:"#easy-tool",
     		bodyCls:"easy-grid",
     		fit:true,
     		rownumbers:true,
     		singleSelect : true,
     		selectOnCheck : false,
     		checkOnSelect : false,
     		pagination : true,
     		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
     	    pageSize : 20, //每页显示的记录条数，默认为5  
     	    onClickRow:function(rowIndex,row){
     	    	var fmode = row.fmode;
        		var mode = "";
        		if(fmode == 1){
        			mode = "满减";
        		}else if(fmode == 2){
        			mode = "直减";
        		}else if(fmode == 3){
        			mode = "打折";
        		}else if(fmode == 4){
        			mode = "赠品";
        		}
     	    	var html = "";
         		html+='<div class="form-inline">'
        			+'<div class="form-group"><label class="title">销售数量：</label><label class="labelValue" title="'+row.fquanty+'" class="value">'+row.fquanty+'</label></div>'
        			+'<div class="form-group"><label class="title">销售单价：</label><label class="labelValue" title="'+row.fprice+'" class="value">'+row.fprice+'</label></div>'
        			+'<div class="form-group"><label class="title">销售金额：</label><label class="labelValue" title="'+row.ftotalamount+'" class="value">'+row.ftotalamount+'</label></div>'
        			+'<div class="form-group"><label class="title">运费金额：</label><label class="labelValue" title="'+row.fsendamount+'" class="value">'+row.fsendamount+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline">'
        			+'<div class="form-group"><label class="title" >销售店铺：</label><label class="labelValue" title="'+row.fstorename+'" class="value">'+row.fstorename+'</label></div>'
        			+'<div class="form-group"><label class="title" >收  货  人：</label><label class="labelValue" title="'+row.freceiver+'" class="value">'+row.freceiver+'</label></div>'
        			+'<div class="form-group"><label class="title" >收货电话：</label><label class="labelValue" title="'+row.frevtel+'" class="value">'+row.frevtel+'</label></div>'
        			+'<div class="form-group"><label class="title" >用  户  名：</label><label class="labelValue" title="'+row.fnickname+'" class="value">'+row.fnickname+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline">'
        			+'<div class="form-group" style="width: 96%"><label class="title" >商品名称：</label><label class="labelValue" title="'+row.fname+'" class="value">'+row.fname+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline">'
        			+'<div class="form-group" style="width: 48%"><label class="title" >收货地址：</label><label class="labelValue" title="'+row.frevaddress+'" class="value">'+row.frevaddress+'</label></div>'
        			+'<div class="form-group"><label class="title" >促销政策编号：</label><label class="labelValue" title="'+row.ffavorpolicyid+'" class="value">'+row.ffavorpolicyid+'</label></div>'
        			+'<div class="form-group"><label class="title" >联合政策编号：</label><label class="labelValue" title="'+row.flinkpolicyids+'" class="value">'+row.flinkpolicyids+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline">'
        			+'<div class="form-group"><label class="title" >优惠方式：</label><label class="labelValue" title="'+mode+'" class="value">'+mode+'</label></div>'
        			+'<div class="form-group"><label class="title" >总部承担：</label><label class="labelValue" title="'+row.fcorpfeepayamount+'" class="value">'+row.fcorpfeepayamount+'</label></div>'
        			+'<div class="form-group"><label class="title" >厂家承担：</label><label class="labelValue" title="'+row.funitfeepayamount+'" class="value">'+row.funitfeepayamount+'</label></div>'
        			+'<div class="form-group"><label class="title" >商家承担：</label><label class="labelValue" title="'+row.fstorefeepayamount+'" class="value">'+row.fstorefeepayamount+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline">'
        			+'<div class="form-group" style="width: 96%"><label class="title" >优惠说明：</label><label class="labelValue" title="'+row.ffavorcontent+'" class="value">'+row.ffavorcontent+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline">'
        			+'<div class="form-group" style="width: 96%"><label class="title" >政策说明：</label><label class="labelValue" title="'+row.ffavorpolicycontent+'" class="value">'+row.ffavorpolicycontent+'</label></div>'
        			+'</div>'
        			+'<div class="form-inline" style="height:auto !important;">'
        			+'<div class="form-group" style="width: 96%"><label class="title" >承担说明：</label><label class="labelValue" title="'+row.fbearcontent+'" class="" style="white-space: pre-line;line-height: 24px;">'+row.fbearcontent+'</label></div>'
        			+'</div>';
     	    	$("#easyuiDetails").html(html);
     		},
     	    columns : window.currentColumns,
     	    //鼠标停留0.5秒显示详细
//      	    onLoadSuccess: function (data) {
//      	    	$(this).datagrid('doCellTip', { 'max-width': '5px', 'delay': 500 });
//      		},
     		//点击加号显示隐藏内容
//      	    view: detailview,
//          	detailFormatter:function(index,row){
//	         		return '<div class="ddv" style="padding:5px 0"></div>';
//          	}
     	});
    	//初始化列编辑组件
       	$("#column_filter").jeasycolumn({
       		datagrid : "#easyuiTable",
       		defaultColumns : window.defaultColumns,
       	});
	});
	</script>
</body>
</html>
