<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>退换货管理</title>
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
					<input id="datetype" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'日期类型:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'申请时间','fid':1,selected:true},{'fname':'审核时间','fid':2},{'fname':'收货时间','fid':3},{'fname':'付款时间','fid':4},{'fname':'发货时间','fid':5},{'fname':'确认收货时间','fid':6}],'id':'datetype'" />
				</div>
				<div class="easy-input-line">
					<input id="orderFdateStart" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'orderFdateStart'" />
				</div>
				<div class="easy-input-line">
					<input id="orderFdateEnd" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'结束日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'orderFdateEnd'" />
				</div>
				<div class="easy-input-line">
					<input id="refundstate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'退换货状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':0,'fname':'全部'},{'fid':1,'fname':'未处理'},{'fid':2,'fname':'已拒绝'},{'fid':3,'fname':'已同意'},{'fid':4,'fname':'已完成'},{'fid':5,'fname':'卖家等待收货'},{'fid':6,'fname':'已取消'},{'fid':7,'fname':'待退款'},{'fid':8,'fname':'待发货'},{'fid':9,'fname':'等待买家收货'}],'id':'refundstate'" />
				</div>
				<div class="easy-input-line">
					<input id="storename" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'店铺:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'storename'" />
				</div>
				<div class="easy-input-line">
					<input id="retailno" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'订单号:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'retailno','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="refundno" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'退换单号:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'refundno','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="orderftelno" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'会员手机:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'orderftelno','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="storestate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'店铺类型:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'固定金额','fid':1},{'fname':'销售额比例','fid':2}],'id':'storestate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="applytype" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'申请类型:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'未发货退货','fid':0},{'fname':'已发货退货','fid':1},{'fname':'已发货换货','fid':2}],'id':'applytype'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="reviewstate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'审核状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':0,'fname':'全部'},{'fid':1,'fname':'未审核'},{'fid':2,'fname':'审核不通过'},{'fid':3,'fname':'审核通过'}],'id':'reviewstate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="nickname" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'用户昵称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'nickname','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="retailtype" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'订单类型:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'企业订单','fid':0},{'fname':'加盟商订单','fid':1},{'fname':'联营商订单','fid':2}],'id':'retailtype'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="unitname" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'单位:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'unitname'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="sendunit" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'物流公司:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'sendunit','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="expressNo" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'物流单号:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'expressNo','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="revgoodstate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'收货状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'全部','fid':0},{'fname':'未收货','fid':1},{'fname':'已收货','fid':2}],'id':'revgoodstate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="paystate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'付款状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'全部','fid':0},{'fname':'未付款','fid':1},{'fname':'已付款','fid':2}],'id':'paystate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="sendgoodstate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'发货状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'全部','fid':0},{'fname':'未发货','fid':1},{'fname':'已发货','fid':2}],'id':'sendgoodstate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="checkstate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'确认收货:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'全部','fid':0},{'fname':'未确认','fid':1},{'fname':'已确认','fid':2}],'id':'checkstate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="cancelstate" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'取消状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'全部','fid':0},{'fname':'未取消','fid':1},{'fname':'已取消','fid':2}],'id':'cancelstate'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="stockname" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'商品:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'stockname','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="markname" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'品牌:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'markname'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="stockclassname" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'类别:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'stockclassname'" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="auditPerson" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'审核人:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'auditPerson','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="signer" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'收货人:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'signer','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="payer" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'付款人:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'payer','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="sender" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'发货人:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'sender','url':''" />
				</div>
				<div class="easy-input-line smore" style="display: none;">
					<input id="rever" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'确认收货人:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'rever','url':''" />
				</div>
				<div class="easy-searchbtn">
					<span class="easyui-linkbutton" id="btnSearch" data-options="iconCls:'icon-search'" onclick="search()">查询</span>
					<span class="easyui-linkbutton" id="btnReset"  data-options="iconCls:'icon-clear'"  onclick="Util.resetParam(paramArray)">重置</span>
					<span class="easyui-linkbutton" id="btnMore"   data-options="" isshow="0" onclick="searchMore()">展开↓</span>
				</div>
			</div>
			<div data-options="region:'center',border:false,iconCls:'icon-ok'">
				<div class="easyui-layout " data-options="fit:true">
					<div data-options="region:'center',border:false">
						<div id="easy-tool"></div>
						<table id="easy_table"></table>
					</div>
					<div id="detail" title="详情" data-options="region:'south',height:280,split:true,bodyCls:'detailbody'">
					</div>
				</div>
			</div>
		</div>
		<div id="column_filter"></div>
	</div>
</div>

<div id="checkrefund" style="display: none;overflow-x: hidden;"></div>
<div id="imgdlg" style="display: none;overflow-x: hidden;"></div>
<script type="text/javascript" src="${applicationScope.staticPath}order/refundorder.js"></script>
<script type="text/javascript">
//表格-店铺类型数据
var refundstateArr = {1:"未处理",2:"已拒绝",3:"已同意",4:"已完成",5:"卖家等待收货",6:"已取消",7:"待退款",8:"待发货",9:"等待买家收货",10:"等待买家收货"};
var refundtypeArr = {1:"未发货退货",2:"已发货退货",2:"已发货换货"};
//查询参数数据
var paramArray = [
 {id:"#datetype",name:"datetype",type:"select",defval:"1"},
 {id:"#orderFdateStart",name:"orderFdateStart",type:"date",defval:initDate()},
 {id:"#orderFdateEnd",name:"orderFdateEnd",type:"date"},
 {id:"#storestate",name:"storestate",type:"select",defval:"null"},
 {id:"#storename",name:"storename",type:"combo"},
 {id:"#retailno",name:"retailno",type:"text"},
 {id:"#applytype",name:"applytype",type:"select",defval:"null"},
 {id:"#refundno",name:"refundno",type:"text"},
 {id:"#nickname",name:"nickname",type:"text"},
 {id:"#orderftelno",name:"orderftelno",type:"text"},
 {id:"#retailtype",name:"retailtype",type:"select",defval:"null"},
 {id:"#unitname",name:"unitname",type:"combo"},
 {id:"#sendunit",name:"sendunit",type:"text"},
 {id:"#expressNo",name:"expressNo",type:"text"},
 {id:"#refundstate",name:"refundstate",type:"select"},
 {id:"#reviewstate",name:"reviewstate",type:"select"},
 {id:"#revgoodstate",name:"revgoodstate",type:"select"},
 {id:"#paystate",name:"paystate",type:"select"},
 {id:"#sendgoodstate",name:"sendgoodstate",type:"select"},
 {id:"#checkstate",name:"checkstate",type:"select"},
 {id:"#cancelstate",name:"cancelstate",type:"select"},
 {id:"#markname",name:"markname",type:"combo"},
 {id:"#stockclassname",name:"stockclassname",type:"combo"},
 {id:"#stockname",name:"stockname",type:"text"},
 {id:"#auditPerson",name:"auditPerson",type:"text"},
 {id:"#sender",name:"sender",type:"text"},
 {id:"#signer",name:"signer",type:"text"},
 {id:"#payer",name:"payer",type:"text"},
 {id:"#rever",name:"rever",type:"text"}
];
//默认的表格列数据和菜单ID
var menuid = 502;//菜单ID
window.currentColumns = new Array();
var columns =  [
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"编号",hidden:true},
	{field:"fstorename",title:"店铺",width:130},
	{field:"freturnno",title:"退货单号",width:160},
	{field:"fbegintime",title:"申请时间",width:160},
	{field:"refundtype",title:"退货类型",width:90,fmt:'fmt_refundtype'},
	{field:"fstockname",title:"商品",width:240},
	{field:"freturnquanty",title:"数量",width:50},
	{field:"fshouldamount",title:"金额",width:70},
	{field:"refundstate",title:"状态",width:90,fmt:'fmt_refundstate'}
];
window.defaultColumns = [columns];
Util.fmt_refundtype = function(value,row,index){
	return refundtypeArr[value];
}
Util.fmt_refundstate = function(value,row,index){
	return refundstateArr[value];
}
//查询事件
function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","managerorders/queryRefundOrders.do");
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
	    columns : window.currentColumns,
	    onSelect : function(index, row){
	    	showDetail(row);
	    }
	});
	//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		button_role : "${role502.ffunction}",
		button:[{text:"审核",iconCls:"icon-accept", onclick:function(ids,rows){
					commonDeal(ids,rows,1);
				}},
				{text:"收货",iconCls:"icon-accept", onclick:function(ids,rows){
					commonDeal(ids,rows,2);
				}},
				{text:"退款",iconCls:"icon-money", onclick:function(ids,rows){
					if(rows.length>1){
						$.messager.alert("提示","只能选择一个订单进行退款！");
						return;
					}
					auditChech(ids);
					if(map.result=="false" && map.msg=="积分不足，是否继续退款，如果继续退款，则退货单不再扣减积分"){
						$.messager.confirm('提示', map.msg+",该用户总积分:"+map.allStoreScore
								+",退货应扣积分："+map.tmpScore +"("+map.FScore+"积分可以抵扣"
										+map.fscoretoamount+"元)，确定要退款吗？", function(r){
							if(f){
								$("#isNeedScore1").val(1);
								commonDeal(ids,rows,3);
							}
						});
					}else{
						$("#isNeedScore1").val(0);
						commonDeal(ids,rows,3);
					}
				}},
				{text:"发货",iconCls:"icon-accept",onclick:function(ids,rows){
					commonDeal(ids,rows, 4);
				}},
				{text:"确认收货",iconCls:"icon-accept",onclick:function(ids,rows){
					commonDeal(ids,rows, 5);
				}},
				{text:"取消",iconCls:"icon-stop",onclick:function(ids,rows){
					commonDeal(ids,rows, 6);
				}},
				{text:"导出Excel",nocheck:true,iconCls:"icon-excel",onclick:function(){
					exportExcel_refund();
				}}]
	});
	
	$("#orderFdateStart").datebox("setValue", initDate());
	
	//判断用户是否登录   如果未登录就跳转到登录页面
	var userid="${sessionScope.user.FID}";
	var unitid="${sessionScope.b_unit_id}";
	
	$("#storestate").combobox({
		width:200,
		label:"店铺类型:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		data : [{"fname":"企业店铺","fid":0},{"fname":"门店店铺","fid":1},{"fname":"员工店铺","fid":2},
		        {"fname":"加盟商店铺","fid":3},{"fname":"村级服务站","fid":6},{"fname":"PC企业商城","fid":7}],
		onChange :function(newValue,oldValue){
			if(newValue==undefined || newValue ==""){
				$("#storename").jeasycombo("setvalue","");
			}else{
				$("#storename").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=${sessionScope.user.FID}&storetypes="+newValue);
			}
		}
	});
	
	//店铺类型---级联 -- 店铺名称
	$("#storename").jeasycombo({
		width:200,
		label:"店铺名称:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		url : "select/selectStore.do?selecttype=1&unitid=0&userid=${sessionScope.user.FID}&storetypes="
	});
	
	//单位
	$("#unitname").jeasycombo({
		width:200,
		label:"单位:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		url: 'unitstock/selectPool.do?unitid='+unitid+'&type=1'
	});
	
	//经营品牌
	$("#markname").jeasycombo({
		width:200,
		label:"品牌:",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		url : "select/mark.do",
	});
	
	//经营类别
	$("#stockclassname").jeasycombo({
		width:200,
		label:"类别:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		url : "select/stockClass.do?t=2",
	});
	
	//退换货审核
	$("#checkrefund").dialog({
		modal:true,
		closed:true,
		width:800,
		height:500,
		title:"退换货审核",
		buttons:[{text:'通过',iconCls:'icon-accept',handler:function(){auditRefund(1);}},
		         {text:'不通过',iconCls:'icon-stop',handler:function(){auditRefund(0);}},
				 {text:'取消',iconCls:'icon-cancel',handler:function(){
						$("#checkrefund").dialog("close");
				 }}]
	});
	
	//查看图片
	$("#imgdlg").dialog({
		modal:true,
		closed:true,
		width:800,
		height:500,
		title:"查看图片"
	});
	
	$("#applytype").combobox("setValue",null);
	$("#retailtype").combobox("setValue",null);
});

function searchMore(){
	var isshow = $("#btnMore").attr("isshow");
	if(isshow=="0"){
		$("#btnMore").find(".l-btn-text").text("收起↑");
	   	$("#btnMore").attr("isshow",1);
	   	$(".smore").show();
	}else if(isshow=="1"){
		$("#btnMore").find(".l-btn-text").text("展开↓");
	   	$("#btnMore").attr("isshow",0);
	   	$(".smore").hide();
	}
}

//初始化开始日期 当月第1日
function initDate(){
	var date=new Date;
	var year=date.getFullYear(); 
	var month=date.getMonth()+1;
	month =(month<10 ? "0"+month:month); 
	var mydate = (year.toString()+"-"+month.toString())+"-01";
	return mydate;
}
</script>
</body>
</html>
<!-- 保留数据 勿删 -->
<!-- {title:"查询条件",width:257,iscenter:false,inputs:
[{"editor":"easyui-datebox","height":"","width":"200","label":"开始日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"orderFdateStart"},
{"editor":"easyui-datebox","height":"","width":"200","label":"结束日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"orderFdateEnd"},
{"editor":"easyui-combobox","height":"","width":"200","label":"日期类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"申请时间","fid":1},{"fname":"审核时间","fid":2},{"fname":"收货时间","fid":3},{"fname":"付款时间","fid":4},{"fname":"发货时间","fid":5},{"fname":"确认收货时间","fid":6}],"id":"datetype"},
{"editor":"easyui-combobox","height":"","width":"200","label":"退换货状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":0,"fname":"全部"},{"fid":1,"fname":"未处理"},{"fid":2,"fname":"已拒绝"},{"fid":3,"fname":"已同意"},{"fid":4,"fname":"已完成"},{"fid":5,"fname":"卖家等待收货"},{"fid":6,"fname":"已取消"},{"fid":7,"fname":"待退款"},{"fid":8,"fname":"待发货"},{"fid":9,"fname":"等待买家收货"}],"id":"refundstate"},
{"editor":"jeasycombo","height":"","width":"200","label":"店铺:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"storename"},
{"editor":"easyui-textbox","height":"","width":"200","label":"订单号:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"retailno","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"退换单号:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"refundno","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"会员手机:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"orderftelno","url":""},
{"editor":"easyui-combobox","height":"","width":"200","label":"店铺类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"固定金额","fid":1},{"fname":"销售额比例","fid":2}],"id":"storestate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"申请类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"固定金额","fid":1},{"fname":"销售额比例","fid":2}],"id":"applytype"},
{"editor":"easyui-combobox","height":"","width":"200","label":"审核状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":0,"fname":"全部"},{"fid":1,"fname":"未审核"},{"fid":2,"fname":"审核不通过"},{"fid":3,"fname":"审核通过"}],"id":"reviewstate"},
{"editor":"easyui-textbox","height":"","width":"200","label":"用户昵称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"nickname","url":""},
{"editor":"easyui-combobox","height":"","width":"200","label":"订单类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"固定金额","fid":1},{"fname":"销售额比例","fid":2}],"id":"retailtype"},
{"editor":"jeasycombo","height":"","width":"200","label":"单位:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"unitname"},
{"editor":"easyui-textbox","height":"","width":"200","label":"物流公司:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"sendunit","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"物流单号:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"expressNo","url":""},
{"editor":"easyui-combobox","height":"","width":"200","label":"收货状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未收货","fid":1},{"fname":"已收货","fid":2}],"id":"revgoodstate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"付款状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未付款","fid":1},{"fname":"已付款","fid":2}],"id":"paystate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"发货状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未发货","fid":1},{"fname":"已发货","fid":2}],"id":"sendgoodstate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"确认收货:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未确认","fid":1},{"fname":"已确认","fid":2}],"id":"checkstate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"取消状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未取消","fid":1},{"fname":"已取消","fid":2}],"id":"cancelstate"},
{"editor":"easyui-textbox","height":"","width":"200","label":"商品:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"stockname","url":""},
{"editor":"jeasycombo","height":"","width":"200","label":"品牌:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"markname"},
{"editor":"jeasycombo","height":"","width":"200","label":"类别:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"stockclassname"},
{"editor":"easyui-textbox","height":"","width":"200","label":"审核人:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"auditPerson","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"收货人:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"signer","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"付款人:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"payer","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"发货人:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"sender","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"确认收货人:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"rever","url":""},
]} -->