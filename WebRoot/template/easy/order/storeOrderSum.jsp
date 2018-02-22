<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>订单汇总统计</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript" src="template/easy/j/order/storeOrderSum.js"></script>
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
					<form id="formSum">
						<div class="easy-input-line">
							<select class="easyui-combobox" id="selecttype1"
									name="selecttype1" data-options="panelHeight:'auto',editable:false,'width':200,'label':'一级汇总:','labelWidth':60">
										<option value ="0" selected="selected">品牌</option>
								    	<option value ="1">类别</option>
									  	<option value ="2">日期</option>
									  	<option value ="3">店铺</option>
									  	<option value ="4">销售员</option>
									  	<option value ="5">商品</option>
									  	<option value ="6">省</option>
									  	<option value ="7">市</option>
									  	<option value ="8">区</option>
									</select>
						</div>
						<div class="easy-input-line">
							<select class="easyui-combobox" id="selecttype2"
									name="selecttype2" data-options="panelHeight:'auto',editable:false,'width':200,'label':'二级汇总:','labelWidth':60">
										<option value ="0" selected="selected">品牌</option>
								    	<option value ="1">类别</option>
									  	<option value ="2">日期</option>
									  	<option value ="3">店铺</option>
									  	<option value ="4">销售员</option>
									  	<option value ="5">商品</option>
									  	<option value ="6">省</option>
									  	<option value ="7">市</option>
									  	<option value ="8">区</option>
									</select>
						</div>
						<div class="easy-input-line">
							<input id='begindate' name='begindate'
								class="easyui-datebox" data-options="'width':200,'label':'销售日期:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='fenddate' name='fenddate'
								class="easyui-datebox" data-options="'width':200,'label':'至:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<input id='storeid' name='storeid'/>
						</div>
						<div class="easy-input-line">
							<input id='mark' name='mark'/>
						</div>
						<div class="easy-input-line">
							<input id='stockclass' name='stockclass'/>
						</div>
						<div class="easy-input-line">
							<input id='stock' name='stock'
								class="easyui-textbox" data-options="'width':200,'label':'商品名称:','labelWidth':60" />
						</div>
						<div class="easy-input-line">
							<select class="easyui-combobox" id="state1"
									name="state1" data-options="panelHeight:'auto',editable:false,'width':200,'label':'已达状态:','labelWidth':60">
										<option value ="0">全部</option>
								    	<option value ="1" selected="selected">已付款</option>
									  	<option value ="2">已发货</option>
									  	<option value ="3">已收货</option>
									  	<option value ="4">已评价</option>
									  	<option value ="5">已退货</option>
									  	<option value ="6">已取消</option>
									</select>
						</div>
						<div class="easy-input-line">
							<select class="easyui-combobox" id="state2"
									name="state2" data-options="panelHeight:'auto',editable:false,'width':200,'label':'未达状态:','labelWidth':60">
										<option value ="0" selected="selected">全部</option>
								    	<option value ="1">未付款</option>
									  	<option value ="2">未发货</option>
									  	<option value ="3">未收货</option>
									  	<option value ="4">未评价</option>
									  	<option value ="5">未退货</option>
									  	<option value ="6">未取消</option>
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
					<div id="easy-tool" >
					</div>
					<table id="easyuiTable"></table>
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
	
	var selecttype1 = '一级汇总';
	var selecttype2 = '二级汇总';
	var hid = false;
	if(selecttype1 == selecttype2){
		hid = true;
	}
	var columns=[ 
	     		//{field:'fid',checkbox:true},
	    		{field:'fitem1',title:selecttype1},
	    		{field:'fitem2',title:selecttype2,hidden:hid},
	    		{field:'fquanty',title:'销售数量'},
	    		{field:'fstockamount',title:'销售金额'},
	    		{field:'ftotalamount',title:'实付金额'},
	    		{field:'fname',title:'销售单位'}
	    		];
	   //菜单ID
	   window.menuid=100;
	   window.currentColumns = new Array();
	   window.defaultColumns = [columns];
	   //查询参数数据
	   //{id:"标签的ID",
	   //name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
	   //type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
	   //value:"固定值，当type='value'时取此值"
	   //ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
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
// 		    onLoadSuccess: function (data) {
// 		    	$(this).datagrid('doCellTip', { 'max-width': '5px', 'delay': 500 });
// 			},
			//点击加号显示隐藏内容
//		    view: detailview,
//	    	detailFormatter:function(index,row){
//	    		return '<div class="ddv" style="padding:5px 0"></div>';
//	    	}
	   	});
	   		
	   	//初始化列编辑组件
       	$("#column_filter").jeasycolumn({
       		datagrid : "#easyuiTable",
       		showFilter : false,
       		defaultColumns : window.defaultColumns
       	});
	   	//店铺名称
		$('#storeid').jeasycombo({
			multiple : false,//是否多选
			type : "list",//弹出的样式
			label : "店铺名称:",
			btnclass:"btn-success",//自定义按钮样式
			url : 'select/selectStore.do?selecttype=3&unitid=0&userid=${sessionScope.user.FID}&storetypes=',
			width:200,
			labelWidth:60
		});
		//商品品牌
		$('#mark').jeasycombo({
			multiple : true,//是否多选
			type : "list",//弹出的样式
			label : "商品品牌:",
			btnclass:"btn-success",//自定义按钮样式
			url : "select/mark.do",
			width:200,
			labelWidth:60
		});
		//商品类别
		$('#stockclass').jeasycombo({
			multiple : true,//是否多选
			type : "tree",//弹出的样式
			label : "商品类别:",
			btnclass:"btn-success",//自定义按钮样式
			url : "select/stockClass.do?t=2",
			width:200,
			labelWidth:60
		});
	   		
	   })
	
	</script>
</body>
</html>
