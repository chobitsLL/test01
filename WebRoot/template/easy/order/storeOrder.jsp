<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>订单管理</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript" src="template/easy/j/order/storeOrder.js"></script>
<script type="text/javascript" src="template/easy/j/order/datagrid-detailview.js"></script>
<script type="text/javascript" src="template/easy/j/order/jquery.serializejson.min.js"></script>
<script type="text/javascript" src="template/easy/j/order/ajaxfileupload.js"></script>
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
					<form id="formSearch">
						<div>
							<div class="easy-input-line">
								<input id='masterno' name='masterno'
									class="easyui-textbox" data-options="'label':'主订单号:','width':200,'labelWidth':60" />
							</div>
							
							<div class="easy-input-line">
								<input id='retailno' name='retailno'
									class="easyui-textbox" data-options="'label':'订单单号:','width':200,'labelWidth':60" />
							</div>
							
							<div class="easy-input-line">
								<select onmouseover="this.style.cursor='hand'" class="easyui-combobox" id="orderstate"
										name="orderstate" data-options="panelHeight:'auto',editable:false,'label':'已达状态:','width':200,'labelWidth':60" >
										<option value="0" selected="selected">全部</option>
								    	<option value ="1">已付款</option>
									  	<option value ="2">已发货</option>
									  	<option value ="3">已收货</option>
									  	<option value ="4">已评价</option>
									  	<option value ="5">已退货</option>
									  	<option value ="6">已取消</option>
										</select>
							</div>
							
							<div class="easy-input-line">
								<select onmouseover="this.style.cursor='hand'" class="easyui-combobox" id="failedorderstate"
										name="failedorderstate" data-options="panelHeight:'auto',editable:false,'label':'未达状态:','width':200,'labelWidth':60" >
										<option value="0" selected="selected">全部</option>
										<option value="1">未付款</option>
									  	<option value ="2">未发货</option>
									  	<option value ="3">未收货</option>
									  	<option value ="4">未评价</option>
									  	<option value ="5">未退货</option>
									  	<option value ="6">未取消</option>
										</select>
							</div>
							
							<div class="easy-input-line">
								<input  id="storename" name="storename" />
							</div>
							
							<div class="easy-input-line">
								<select class="easyui-combobox" id="datetype"
										name="datetype" data-options="panelHeight:'auto',editable:false,'label':'生产日期:','width':200,'labelWidth':60 " >
										<option value="1" selected="selected">下单时间</option>
										<option value="2">付款时间</option>
										<option value="3">审核时间</option>
										<option value="4">发货时间</option>
										<option value="5">确认收货时间</option>
										</select>
							</div>
							<div class="easy-input-line">
								<input id='orderFdateStart' name='orderFdateStart'
									class="easyui-datebox" data-options="'label':'开始时间:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='orderFdateEnd' name='orderFdateEnd'
									class="easyui-datebox" data-options="'label':'结束时间:','width':200,'labelWidth':60" />
							</div>
						</div>
						<div id="subwhere" style="display: none;">
							<div class="easy-input-line">
								<input id='paytype' name='paytype'/>
							</div>
							<div class="easy-input-line">
								<input id='receiver' name='receiver'
									class="easyui-textbox" data-options="'label':'收货人:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='saleno' name='saleno' class="easyui-textbox" 
									data-options="'label':'交易号:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='retailtype' name='retailtype'/>
							</div>
							<div class="easy-input-line">
								<input id='storestate' name='storestate'/>
							</div>
							<div class="easy-input-line">
								<input id='unitname' name='unitname'/>
							</div>
							<div class="easy-input-line">
								<input id='stockclassname' name='stockclassname' />
							</div>
							<div class="easy-input-line">
								<input id='markname' name='markname' />
							</div>
							<div class="easy-input-line">
								<select class="easyui-combobox" id="refundstate"
										name="refundstate" data-options="panelHeight:'auto',editable:false,'label':'审核状态:','width':200,'labelWidth':60 ">
										<option value="0" selected="selected">全部</option>
										<option value="1">未审核</option>
										<option value="2">已审核</option>
										<option value="3">审核不通过</option>
										</select>
							</div>
							<div class="easy-input-line">
								<input id='sellermemo' name='sellermemo' class="easyui-textbox" 
									data-options="'label':'卖家备注:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='buyermomo' name='buyermomo' class="easyui-textbox" 
									data-options="'label':'买家备注:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='stockname' name='stockname' class="easyui-textbox" 
									data-options="'label':'商品:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='nickname' name='nickname' class="easyui-textbox" 
									data-options="'label':'用户昵称:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='orderftelno' name='orderftelno' class="easyui-textbox" 
									data-options="'label':'会员手机:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='sendunit' name='sendunit' class="easyui-textbox" 
									data-options="'label':'物流公司:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='expressNo' name='expressNo' class="easyui-textbox" 
									data-options="'label':'物流单号:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line" style="float:left;">
								<div style="width:60px;float:left" >收货确认人:</div>
								<div style="width:140px;float:left">
									<input id='confirmer' name='confirmer' class="easyui-textbox" 
									data-options="'width':140" />
								</div>
							</div>
							<div class="easy-input-line" style="float:left;">
								<input id='auditor' name='auditor' class="easyui-textbox" 
									data-options="'label':'审核人:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='shipper' name='shipper' class="easyui-textbox" 
									data-options="'label':'发货人:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='chamberlain' name='chamberlain' class="easyui-textbox" 
									data-options="'label':'收款人:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line">
								<input id='revtel' name='revtel' class="easyui-textbox" 
									data-options="'label':'收货电话:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line" style="float:left;">
								<div style="width:60px;float:left" >服务类订单:</div>
								<div style="width:140px;float:left">
									<select class="easyui-combobox" id="serviceorder"
										name="serviceorder" data-options="panelHeight:'auto',editable:false,'width':140" >
										<option value="-1" selected="selected">全部</option>
										<option value="1">是</option>
										<option value="0">否</option>
										</select>
								</div>
							</div>
							<div class="easy-input-line" style="float:left;">
								<select class="easyui-combobox" id="servicestate"
										name="servicestate" data-options="panelHeight:'auto',editable:false,'label':'服务状态:','width':200,'labelWidth':60 " >
										<option value="-1" selected="selected">全部</option>
										<option value="0">未使用</option>
										<option value="1">已使用</option>
										</select>
							</div>
							<div class="easy-input-line">
								<input id='fname' name='fname' class="easyui-textbox" 
									data-options="'label':'销售人员:','width':200,'labelWidth':60" />
							</div>
							<div class="easy-input-line" style="float:left;">
								<div style="width:60px;float:left" >销售员微信昵称:</div>
								<div style="width:140px;float:left">
									<input id='wxnickname' name='wxnickname' class="easyui-textbox" 
									data-options="'width':140" />
								</div>
							</div>
							<div class="easy-input-line" style="float:left;">
								<select class="easyui-combobox" id="fhide"
										name="fhide" data-options="panelHeight:'auto',editable:false,'label':'隐藏:','width':200,'labelWidth':60 " >
										<option value="-1" selected="selected">全部</option>
										<option value="0">否</option>
									  	<option value="1">是</option>
								</select>
							</div>
						</div>
						<div class="easy-searchbtn">
								<span class="easyui-linkbutton easy-search" id="btnSelect"
									data-options="iconCls:'icon-search'">查询</span> 
								<span class="easyui-linkbutton easy-search" id="btnReset"
									data-options="iconCls:'icon-clear'">重置</span>
								<span onclick="showwhere()" id="showwhere"
									class="easyui-linkbutton easy-search">展开↓</span> 
								<span onclick="hidewhere()" id="hidewhere" 
									class="easyui-linkbutton easy-search" style="display: none">收起↑</span>
									
						</div>
					</form>
					
				</div>
				<div data-options="region:'center',border:false,iconCls:'icon-ok'">
					<div class="easyui-layout " data-options="fit:true">
						<div style="height:50%" data-options="region:'center',border:false,iconCls:'icon-ok'">
							<div id="easy-tool"></div>
							<table id="storeTable"></table>
						</div>
						<div style="height:50%" title="订单详情" class="easy-param"
								data-options="region:'south',border:false,split:true">
								<div id="easyuiDetails" style="padding: 10px 36px;min-width: 1000px;">
								</div>
						</div>
					</div>
					
				</div>
			</div>
			
			<!-- 类型弹窗 -->
			<div id="onClickFStock" class="easyui-dialog"
				style="width: auto; height: auto; padding: 10px; left: auto; right: auto; top: 100px;"
				data-options="iconCls:'icon-save', modal:true, closed:true">
				<div
					style="padding: 10px 10px 10px 10px; width: 260px; float: left;">
					ssss</div>
			</div>


			<div id="column_filter"></div>
		</div>
		<%-- 审核弹窗 --%>
		<div id="audit" class="easyui-dialog" data-options="modal:true, closed:true"
			style="width: 300px; min-height: 34px;">
			<div class="messager-body panel-body panel-body-noborder"
				title="" style="">
				<div class="messager-icon messager-question"></div>
				<div>审核意见</div>
				<br>
				<div style="clear: both;"></div>
				<div>
					<input class="messager-input" id="deallogmemo" type="text">
				</div>
			</div>
		</div>

		<input type="hidden" id="ismanager"
					unit="${sessionScope.is_b_a_unit}"
					server="${sessionScope.is_b_server==true}"
					store="${sessionScope.is_b_m_store==true}"
					link="${sessionScope.is_b_a_link==true}"
					custom="${sessionScope.is_b_a_custom==true}"
					employee="${sessionScope.is_b_m_employee==true}"
					b_m_station="${sessionScope.is_b_m_station==true}"
					b_station=" ${sessionScope.is_b_station==true}" />
	</div>
	<script type="text/javascript">
	var columns=[  
	              	{field:'ck',checkbox:true},
			        {field:'fstorename',title:'店铺'},
			        {field:'freceiver',title:'顾客姓名'},
			        {field:'frevtel',title:'顾客手机号'},
			        {field:'fno',title:'订单号'},
			        {field:'fmaketime',title:'下单时间'},
			        {field:'fstockname',title:'商品'},
			        {field:'fquanty',title:'数量'},
			        {field:'fprice',title:'单价'},
			        {field:'fstockamount',title:'销售'},
			        {field:'ftotalamount',title:'实付'},
			        {field:'fstate',title:'状态'}
	              ]
	//菜单ID
// 	window.menuid=108;
	window.currentColumns = new Array();
	window.defaultColumns = [columns];
	$(function(){
		var userid="${sessionScope.user.FID}";
		var unitid="${sessionScope.b_unit_id}";
		//设置时间  
// 		var curr_time = new Date();
// 		$("#orderFdateStart").datebox("setValue",myformatter(curr_time));  
		//输入框只能输入数字
// 		$("#fscore").textbox('textbox').bind('keyup', function(e){
// 	        $("#fscore").textbox('setValue', $(this).val().replace(/[^\d.]/g,''));
// 		});
		//日期字段只读
		$(".datebox :text").attr("readonly","readonly");
		
		//数据网络参数设置
		$("#storeTable").datagrid({
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
	        onClickRow:function(rowIndex,row){
	        	var fpaytype = row.fpaytype;
				var paytype = "";
				if(fpaytype ==0){
					paytype="线上付款";
				}else if(fpaytype ==1 || fpaytype ==7 ){
					paytype="银联支付";
				}else if(fpaytype ==2 || fpaytype ==6 ){
					paytype="支付宝支付";
				}else if(fpaytype ==3 ){
					paytype="微信支付";
				}else if(fpaytype ==4 ){
					paytype="财付通";
				}else {
					paytype="货到付款";
				}
				
				
				var freved= row.freved;
				var reved="";
				if(freved==0){
					reved="未收货";
				}else if(freved==1){
					reved="已收货";
				}else if(freved==2){
					reved="自动收货";
				}else{
					reved="";
				}
				var fchecked=row.fchecked;
				var checkeda="";
				if(fchecked==0){
					checkeda="未审核";
				}else if(fchecked==1){
					checkeda="已审核";
				}else if(fchecked==2){
					checkeda="自动审核";
				}else if(fchecked==3){
					checkeda="审核未通过";
				}else if(fchecked==4){
					checkeda="审核未通过";
				}else{
					checkeda="";
				}
				
				var fsended=row.fsended;
				var sended="";
				if(fsended==0){
					sended="未发货";
				}else if(fsended==1){
					sended="已发货";
				}else{
					sended="";
				}
				
				var fsalesauth=row.fsalesauth;
				var salesauth="";
				if(fsalesauth==0){
					salesauth="范围之内";
				}else if(fsalesauth==1){
					salesauth="范围之外";
				}else{
					salesauth="";
				}
				 
				var fstoretype=row.fstoretype;
				var storetype="";
				if(fstoretype==0){
					storetype="企业店铺";
				}else if(fstoretype==1){
					storetype="门店店铺";
				}else if(fstoretype==2){
					storetype="员工店铺";
				}else if(fstoretype==3){
					storetype="加盟商店铺";
				}else if(fstoretype==4){
					storetype="自营电子货架";
				}else if(fstoretype==5){
					storetype="加盟商电子货架";
				}else if(fstoretype==6){
					storetype="村级服务站";
				}else{
					storetype="";
				}
				var fdelete=row.fdelete;
				var deleteflag="";
				if(fdelete==0){
					deleteflag="未被删除";
				}else if(fdelete==1){
					deleteflag="已被删除";
				}else if(fdelete==""){
					deleteflag="";
				}
				var fcancel=row.fcancel;
				var cancel="";
				if(fcancel==0){
					cancel="正常";
				}else if(fcancel==1){
					cancel="已取消";
				}else if(fcancel==""){
					cancel="";
				}
				var fpayed=row.fpayed;
				var payed="";
				if(fpayed==0){
					payed="未付款";
				}else if(fpayed==1){
					payed="已付款";
				}else if(fpayed==2){
					payed="待评价";
				}
				
				var freturnstate = row.freturnstate;
				var returnstate="";
				if(freturnstate==0){
					returnstate="无";
				}else if(freturnstate==1){
					returnstate="退货中";
				}
				
				var fcheckeds = row.fcheckeds;
				var checked = "";
				if(fcheckeds==0){
					checked = "未核销";
				}else{
					checked = "已核销";
				}
	        	var html = ''
	        		html+='<div class="form-inline">'
					+'<div class="form-group"><label class="title">会员昵称：</label><label class="labelValue" title="'+row.fnickname+'" >'+row.fnickname+'</label></div>'
					+'<div class="form-group"><label class="title">会员手机：</label><label class="labelValue" title="'+row.ftelno+'" >'+row.ftelno+'</label></div>'
					+'<div class="form-group"><label class="title">收货人手机：</label><label class="labelValue" title="'+row.frevtel+'" >'+row.frevtel+'</label></div>'
					+'<div class="form-group"><label class="title" >主订单号：</label><label class="labelValue" title="'+row.fmno+'" >'+row.fmno+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">付款方式：</label><label class="labelValue" title="'+paytype+'" paytype="'+row.fpaytype+'" class="value fpaytype">'+paytype+'</label></div>'
					+'<div class="form-group"><label class="title">付款状态：</label><label class="labelValue" title="'+payed+'" payed="'+row.fpayed+'" class="value fpayed">'+payed+'</label></div>'
					+'<div class="form-group"><label class="title">审核人：</label><label class="labelValue" title="'+row.fchecker+'" >'+row.fchecker+'</label></div>'
					+'<div class="form-group"><label class="title">审核状态：</label><label class="labelValue" title="'+checkeda+'" check="'+row.fchecked+'" class="value fchecked">'+checkeda+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">审核时间：</label><label class="labelValue" title="'+row.fchecktime+'" >'+row.fchecktime.substring(0,row.fchecktime.lastIndexOf(" "))+'</label></div>'
					+'<div class="form-group"><label class="title">审核备注：</label><label class="labelValue" title="'+row.fcheckmemo+'" >'+row.fcheckmemo+'</label></div>'
					+'<div class="form-group"><label class="title">收货人：</label><label class="labelValue" title="'+row.freceiver+'" >'+row.freceiver+'</label></div>'
					+'<div class="form-group"><label class="title">确认收货人：</label><label class="labelValue" title="'+row.frever+'" >'+row.frever+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">发货人：</label><label class="labelValue" title="'+row.fsender+'" >'+row.fsender+'</label></div>'
					+'<div class="form-group"><label class="title">发货状态：</label><label class="labelValue" title="'+sended+'" sended="'+row.fsended+'" class="value fsended">'+sended+'</label></div>'
					+'<div class="form-group"><label class="title">发货时间：</label><label class="labelValue" title="'+row.fsendtime+'" >'+row.fsendtime.substring(0,row.fsendtime.lastIndexOf(" "))+'</label></div>'
					+'<div class="form-group"><label class="title">是否删除：</label><label class="labelValue" title="'+deleteflag+'" >'+deleteflag+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">签收人：</label><label class="labelValue" title="'+row.fsiger+'" >'+row.fsiger+'</label></div>'
					+'<div class="form-group"><label class="title">签收状态：</label><label class="labelValue" title="'+row.fsigned+'" >'+row.fsigned+'</label></div>'
					+'<div class="form-group"><label class="title">签收时间：</label><label class="labelValue" title="'+row.fsigntime+'" >'+row.fsigntime.substring(0,row.fsigntime.lastIndexOf(" "))+'</label></div>'
					+'<div class="form-group"><label class="title">确认状态：</label><label class="labelValue" title="'+reved+'" >'+reved+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">确认时间：</label><label class="labelValue" title="'+row.frevtime+'" >'+row.frevtime.substring(0,row.frevtime.lastIndexOf(" "))+'</label></div>'
					+'<div class="form-group"><label class="title">三包范围：</label><label class="labelValue" title="'+salesauth+'" >'+salesauth+'</label></div>'
					+'<div class="form-group"><label class="title">卖家备注：</label><label class="labelValue" title="'+row.fsellermemo+'" >'+row.fsellermemo+'</label></div>'
					+'<div class="form-group"><label class="title">服务核销时间：</label><label class="labelValue" title="'+row.fservicechecktime+'" >'+row.fservicechecktime+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">发票单位：</label><label class="labelValue" title="'+row.finvoicetitle+'" >'+row.finvoicetitle+'</label></div>'
					+'<div class="form-group"><label class="title">运费金额：</label><label class="labelValue" title="'+row.fsendamount+'" >'+row.fsendamount+'</label></div>'
					+'<div class="form-group"><label class="title">取消状态：</label><label class="labelValue" title="'+cancel+'" cancel="'+row.fcancel+'" class="value fcancel">'+cancel+'</label></div>'
					+'<div class="form-group"><label class="title">物流公司：</label><label class="labelValue" title="'+row.fwlcompany+'" >'+row.fwlcompany+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">服务码：</label><label class="labelValue" title="'+row.fservicecode+'" >'+row.fservicecode+'</label></div>'
					+'<div class="form-group"><label class="title">使用状态：</label><label class="labelValue" title="'+row.fservicechecked+'" >'+row.fservicechecked+'</label></div>'
					+'<div class="form-group"><label class="title">截止日期：</label><label class="labelValue" title="'+row.fservicedate+'" >'+row.fservicedate+'</label></div>'
					+'<div class="form-group"><label class="title">服务核销人：</label><label class="labelValue" title="'+row.fcheckperson+'" >&#12288;'+row.fcheckperson+'</label></div>'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">收货地址：</label><label class="labelValue" title="'+row.frevaddress+'" class="value revaddress">'+row.frevaddress+'</label></div>'
					+'<div class="form-group"><label class="title">买家备注：</label><label class="labelValue" title="'+row.fbuyermomo+'" >'+row.fbuyermomo+'</label></div>'
					+'<div class="form-group"><label class="title">店铺类型：</label><label class="labelValue" title="'+storetype+'" fstoretype='+row.fstoretype+' >'+storetype+'</label></div>'
					+'<input type="hidden" class="freturnstate" returnstate="'+row.freturnstate+'" />'
					+'<input type="hidden" class="freved" reved="'+row.freved+'" />'
					+'<input type="hidden" class="syncerp" fsyncerp="'+row.fsyncerp+'" />'
					+'</div>'
					+'<div class="form-inline">'
					+'<div class="form-group"><label class="title">销售人员：</label><label class="labelValue" title="'+row.salesperson+'" >'+row.salesperson+'</label></div>'
					+'<div class="form-group"><label class="title" style="width:125px;">销售员微信昵称：</label><label class="labelValue" title="'+row.fwxnickname+'" >'+row.fwxnickname+'</label></div>'
					+'</div>'
					+'<div class="form-inline borderNone">'
					+'<div class="form-group"><label class="title">是否核销：</label><label class="labelValue" title="'+checked+'" >'+checked+'</label></div>'
					+'<div class="form-group"><label class="title" style="width:125px;">兑奖人：</label><label class="labelValue" title="'+row.fcheckers+'" >'+row.fcheckers+'</label></div>'
					+'<div class="form-group"><label class="title" style="width:125px;">核销时间：</label><label class="labelValue" title="'+row.fchecktimes+'" >'+row.fchecktimes+'</label></div>'
					+'</div>';
	        	$("#easyuiDetails").html(html);
	        },
		    columns : window.currentColumns,
// 	        view: detailview,
// 	    	detailFormatter:function(index,row){
// 	    		return '<table><tr>' +
// 				'<td style="border:0;padding-right:10px">' +
// 				'<p>会员昵称: ' + row.fnickname + '</p>' +
// 				'<p>付款方式: ' + paytype + '</p>' +
// 				'</td>' +
// 				'<td style="border:0">' +
// 				'<p>会员手机: ' + row.ftelno + '</p>' +
// 				'<p>付款状态: ' + payed + '</p>' +
// 				'</td>' +
// 				'</tr></table>';
// 	    	}
//	    	当展开一行时触发。
//	    	onExpandRow: function(index,row){
//	    		alert(index);
//	    	}
		});
		var menu_function = "${role501.ffunction}";
		$("#column_filter").jeasycolumn({
			datagrid : "#storeTable",
			defaultColumns : window.defaultColumns,
			button_role : menu_function,
			button : [{
				text:'订单详情',
				iconCls:'icon-add',
				onclick:function(ids,row){
// 					var ids = getFids();
					if(ids=="" || ids==undefined){
						$.messager.alert('温馨提示',"请选择一条数据！","info");
						return false;
					}else if(ids.indexOf(",")>=0){
						$.messager.alert('温馨提示',"只能选择一条数据！","info");
						return false;
					}
					
// 					var row = $('#storeTable').datagrid('getChecked');
					var editid = row[0].fid;
					var storetype = row[0].fstoretype;
					var fusecssoft = row[0].fusecssoft;
					
					var url = "managerorders/OTLookOrder_red.do?&pageid=500&editid="+editid+"&preid=-1&nextid=-2&storetype="+storetype+
	 				"&fusecssoft="+fusecssoft+"&print=0";
					//订单详情弹窗
					Util.dialog("订单:"+row[0].fno,url,1100);
					
				}
			},{
				text:'取消订单',
				iconCls:'icon-edit',
				onclick:function(ids,row){
// 					if(isAllowFid() == "false"){return;}
// 					var ids = getFids();
// 					var row = $('#storeTable').datagrid('getChecked');
					var isPayed = false;
					for (var i = 0; i < row.length; i++) {
						if (row[i].fsended == 1){
		    				$.messager.alert('温馨提示',"请选择未发货的订单进行操作!","error");
		    				return;
		    			}else if (row[i].fcancel == 1){
		    				$.messager.alert('温馨提示',"请选择未被取消的订单进行操作！","error");
		    				return;
		    			}
		    			else if (row[i].fsyncerp == 2){
		    				 $.messager.alert('温馨提示',"订单【"+row[i].fno+"】请在ERP中执行本操作！","error");
		    				 return;
		    			}
		    			  
		    			if (row[i].fpayed == 1){
		    				isPayed = true;
		    			}
					}
					if (isPayed){
						$.messager.confirm('温馨提示',"存在已付款定单，取消后不能申请退款，确认要执行该操作吗？",function(r) {
							if (r) {
		    					dealOrder(ids, 1, row);
							}
		    			});
		    		}else {
		    			dealOrder(ids, 1, row);
		    		}
				}
			},{
				text:'审核',
				iconCls:'icon-edit',
				onclick:function(ids,row){
// 					if(isAllowFid() == "false"){return;}
// 					var ids = getFids();
// 					var row = $('#storeTable').datagrid('getChecked');
				    for (var i = 0; i < row.length; i++) {
						if(row[i].fpaytype!=99){//支付状态
							$.messager.alert('温馨提示',"支付方式不是货到付款，请重新选择！","error");
							return;
						}
						if(row[i].fcancel!=0){//取消状态
							$.messager.alert('温馨提示',"该订单已取消，请重新选择！","error");
							return;
						}
						if(row[i].fchecked!=0){//审核状态
							$.messager.alert('温馨提示',"请选择未审核的数据！","error");
							return;
						}
						if(row[i].fsended!=0){//发货状态
							$.messager.alert('温馨提示',"请选择未发货的数据！","error");
							return;
						}
					}
					dealOrder(ids, 2, row);
				}
			},{
				text:'发货',
				iconCls:'icon-edit',
				onclick:function(ids,row){
// 					if(isAllowFid() == "false"){return;}
// 					var ids = getFids();
// 					var row = $('#storeTable').datagrid('getChecked');
				    for (var i = 0; i < row.length; i++) {
				    	if(row[i].fsended!=0){
							$.messager.alert('温馨提示',"该订单已发货，请重新选择！","error");
							return;
						}
						if(row[i].fcancel!=0){
							$.messager.alert('温馨提示',"该订单已取消,请重新选择！","error");
							return;
						}
						if(!(row[i].fchecked==1 ||row[i].fchecked==2)){
							$.messager.alert('温馨提示',"请选择已审核或自动审核的订单！","error");
							return;
						}
						if(row[i].freturnstate!=0){
							$.messager.alert('温馨提示',"该订单处于退货中，无法发货！","error");
							return;
						}
						if(row[i].fpaytype==99){
							if(row[i].fchecked!=1){
							  $.messager.alert('温馨提示',"请选择货到付款和已审核的数据发货！","error");
							  return;
							}
						}else if(row[i].fpayed!=1){
								$.messager.alert('温馨提示',"请选择已付款的数据发货！","error");
								return;
						}
					}
				    dealOrder(ids, 3, row);
				}
			},{
				text:'确认收货',
				iconCls:'icon-edit',
				onclick:function(ids,row){
// 					if(isAllowFid() == "false"){return;}
// 					var ids = getFids();
// 					var row = $('#storeTable').datagrid('getChecked');
				    for (var i = 0; i < row.length; i++) {
				    	if(row[i].fsended!=1){
							$.messager.alert('温馨提示',"请选择已发货的订单收货!","error");
							return;
						}else if(row[i].freved==1){
							$.messager.alert('温馨提示',"该订单已收货无需重复收货!","error");
							return;
						}else if(row[i].fcancel!=0){
							$.messager.alert('温馨提示',"该订单已被取消无法收货!","error");
							return;
						}else if(row[i].fpaytype!= 99 && row[i].freturnstate!=0){
							$.messager.alert('温馨提示',"该订单正处在退货中无法收货!","error");
							return;
						}
				    }
				    dealOrder(ids, 5, row);
				}
			},{
				text:'收款',
				iconCls:'icon-edit',
				onclick:function(ids,row){
// 					if(isAllowFid() == "false"){return;}
// 					var ids = getFids();
// 					var row = $('#storeTable').datagrid('getChecked');
				    for (var i = 0; i < row.length; i++) {
				    	if(row[i].fpaytype!=99){
							$.messager.alert('温馨提示',"请选择货到付款的订单收款！","error");
							return;
						}else if(row[i].fsended!=1){
							$.messager.alert('温馨提示',"请选择已发货的订单收款！","error");
							return;
						}else if(row[i].freved!=1){
							$.messager.alert('温馨提示',"请选择已收货的订单收款！","error");
							return;
						}else if(row[i].fpayed==2){
							$.messager.alert('温馨提示',"该订单已收款无需重复收款！","error");
							return;
						}else if(row[i].fcancel!=0){
							$.messager.alert('温馨提示',"该订单已取消,请重新选择！","error");
							return;
							}
						//else if(row[i].freturnstate!=0){
//								$.messager.alert('温馨提示',"该订单正处于退货中无法收货!","error");
//								return;
//							}
				    }
				    dealOrder(ids, 4, row);
				}
			},{
				text:'导出Excel',
				iconCls:'icon-edit',
				nocheck:true,
				onclick:function(ids,rows){
					var options = $('#storeTable').datagrid('getPager').data("pagination").options;  
					var total = options.total; 
					if(total == 0){
						$.messager.alert('温馨提示',"请先执行查询订单！");
						return;
					}
					var row = $('#storeTable').datagrid('options');
					var jsonobj = row.queryParams.jsonobj;
					exportExcel_Order(jsonobj, total);
				}
			},{
				text:'隐藏',
				iconCls:'icon-edit',
				onclick:function(ids,rows){
// 					if(isAllowFid() == "false"){return;}
// 					var ids = getFids();
					updateHide(ids);
				}
			}]
		});
		
		//店铺
		$('#storename').jeasycombo({
			type : "list",//弹出的样式
			label : "店铺:",
			btnclass:"btn-success",//自定义按钮样式
			url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes=",
			width:200,
			labelWidth:60,
			multiple:false,//是否多选
		});
		
		//付款方式
		$('#paytype').jeasycombo({
			type : "list",//弹出的样式
			label : "付款方式:",
			btnclass:"btn-success",//自定义按钮样式
			width:200,
			labelWidth:60,
			multiple:true,//是否多选
		    data:{"rows":[{"fname":"网银支付(PC端支付)","fid":"1"},{"fname":"网银支付(手机端支付)","fid":"7"},{"fname":"支付宝(PC端支付)","fid":"2"},
	              {"fname":"支付宝(手机端支付)","fid":"6"},{"fname":"微信支付","fid":3},{"fname":"财付通","fid":4},
	              {"fname":"货到付款","fid":99}]
		    	 }
		});
		//订单类型
		$('#retailtype').jeasycombo({
			type : "list",//弹出的样式
			label : "订单类型:",
			btnclass:"btn-success",//自定义按钮样式
			width:200,
			labelWidth:60,
			multiple:true,
		    data:{"rows":
		    	 	[{"fname":"企业订单","fid":0},
                  	 {"fname":"加盟商订单","fid":1},
			      	 {"fname":"联营商订单","fid":2}]
		    	 }
		});
// 		//店铺类型
		$('#storestate').jeasycombo({
			type : "list",//弹出的样式
			label : "店铺类型:",
			btnclass:"btn-success",//自定义按钮样式
			width:200,
			labelWidth:60,
			multiple:true,
		    data:{"rows":[{"fname":"企业店铺","fid":0},{"fname":"门店店铺","fid":1},{"fname":"员工店铺","fid":2},
			        {"fname":"加盟商店铺","fid":3},{"fname":"村级服务站","fid":6},{"fname":"PC企业商城","fid":7}]
		    	 }
		});
		//销售单位
		$('#unitname').jeasycombo({
			type : "list",//弹出的样式
			label : "销售单位:",
			btnclass:"btn-success",//自定义按钮样式
			width:200,
			labelWidth:60,
			multiple:true,
		    url: 'unitstock/selectPool.do?unitid='+unitid+'&type=1'
		});
		//类别
		$('#stockclassname').jeasycombo({
			type : "tree",//弹出的样式
			label : "类别:",
			btnclass:"btn-success",//自定义按钮样式
			width:200,
			labelWidth:60,
			multiple:true,
			url : "select/stockClass.do?t=2"
		});
		//品牌
		$('#markname').jeasycombo({
			type : "list",//弹出的样式
			label : "品牌:",
			btnclass:"btn-success",//自定义按钮样式
			width:200,
			labelWidth:60,
			multiple:true,
			url : "select/mark.do"
		});
		
		//初始化列编辑组件
// 		$("#column_filter").jbootcolumn({
// 			datagrid : "#cardTable",
// 			defaultColumns : defaultColumns
// 		});
	
	
	});
	
	
	
	
	</script>
</body>
</html>
