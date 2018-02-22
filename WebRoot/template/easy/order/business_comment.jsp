<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>商品评价管理</title>
<%@ include file="../com/import.jsp"%>
<style type="text/css">
.fcontent, .freplycontent {
	overflow-wrap: break-word;
    word-break: break-all;
}
.freplycontent{color:#eea236;}
.col0{color:#5cb85c;text-decoration: none;}
.col1{color:#eea236;text-decoration: none;}
.col2{}
.shareimg{max-height: 100px;max-width:100px;margin-left: 5px;}
.label{font-weight: bold;}
</style>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="easyui-layout " data-options="fit:true">
			<div title="查询" class="easy-param" data-options="region:'west',border:false,headerCls:'easy-param-header'">
				<div class="easy-input-line">
					<input id="datetype" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'日期类型:',panelHeight:'auto','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':1,'fname':'评价日期','selected':true},{'fid':2,'fname':'审核日期'},{'fid':3,'fname':'回复日期'}],'id':'datetype'" />
				</div>
				<div class="easy-input-line">
					<input id="begindate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'begindate'" />
				</div>
				<div class="easy-input-line">
					<input id="stopdate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'结束日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'stopdate'" />
				</div>
				<div class="easy-input-line">
					<input id="storetype" />
				</div>
				<div class="easy-input-line">
					<input id="storename" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'店铺名称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'storename'" />
				</div>
				<div class="easy-input-line">
					<input id="marks" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'商品品牌:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'marks'" />
				</div>
				<div class="easy-input-line">
					<input id="stockclass" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'商品类别:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'stockclass','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="stockname" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'商品名称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'stockname'" />
				</div>
				<div class="easy-input-line">
					<input id="orderno" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'主订单号:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'orderno','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="username" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'会员昵称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'username','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="audittype" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'审核状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':-1,'fname':'全部','selected':true},{'fid':0,'fname':'未审核'},{'fid':1,'fname':'已审核'}],'id':'audittype'" />
				</div>
				<div class="easy-input-line">
					<input id="commtype" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'回复状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':-1,'fname':'全部','selected':true},{'fid':0,'fname':'未回复'},{'fid':1,'fname':'已回复'}],'id':'commtype'" />
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

<div id="checkComment" style="display: none;overflow-x: hidden;">
	<input id="idval" type="hidden" />
	<div id="panel_comme" class="easyui-panel" title="评论信息" data-options="border:false" style="width:100%;padding:10px;">   
	    <div><span class="label">商品名称：</span><span id="check_stockname"></span></div>
	    <div><span class="label">商品评论：</span><span id="check_commmemo" style="padding-right: 10px;"></span></div>
	    <div><span class="label">商品评分：</span><span id="check_fstockgrade"></span>&#12288;( 商品 / 物流 / 服务 )</div>
		<div><span class="label">评论时间：</span><span id="check_commmaketime"></span></div>
	</div>
	<div id="panel_share" class="easyui-panel" title="晒单信息" data-options="border:false" style="width:100%;padding:10px;"></div>
	<div id="panel_audit" class="easyui-panel" title="审核信息" data-options="border:false" style="width:100%;padding:10px;">  
		<div><span class="label">审核时间：</span><span id="check_faudittime"></span></div> 
	    <div><span class="label">审核状态：</span><span id="check_fstate"></span></div>
	    <div><span class="label">&#12288;审核人：</span><span id="check_fauditperosn"></span></div>
	</div>
</div>

<div id="replyComment" style="display: none;overflow-x: hidden;">
	<input id="reply_idval" type="hidden" />
	<div id="reply_comme" class="easyui-panel" title="评论信息" data-options="border:false" style="width:100%;padding:10px;">   
	    <div><span class="label">商品名称：</span><span id="reply_stockname"></span></div>
	    <div><span class="label">商品评论：</span><span id="reply_commmemo" style="padding-right: 10px;"></span></div>
	    <div><span class="label">商品评分：</span><span id="reply_fstockgrade"></span>&#12288;( 商品 / 物流 / 服务 )</div>
		<div><span class="label">评论时间：</span><span id="reply_commmaketime"></span></div>
	</div>
	<div id="reply_share" class="easyui-panel" title="晒单信息" data-options="border:false" style="width:100%;padding:10px;"></div>
	<div id="reply_audit" class="easyui-panel" title="审核信息" data-options="border:false" style="width:100%;padding:10px;"> 
		<div><span class="label">审核时间：</span><span id="reply_faudittime"></span></div>
	    <div><span class="label">审核状态：</span><span id="reply_fstate"></span></div>
	    <div><span class="label">&#12288;审核人：</span><span id="reply_fauditperosn"></span></div>  
	</div>
	<div id="reply_reply" class="easyui-panel" title="回复信息" data-options="border:false" style="width:100%;padding:10px;">   
	    <div><span class="label">回复内容：</span><input id="reply_replymemo" class="easyui-textbox" data-options="multiline:true,height:100,width:600"/></div>
		<div><span class="label">回复时间：</span><span id="reply_replymaketime"></span></div>
	    <div><span class="label">&#12288;回复人：</span><span id="reply_replyname"></span></div>
	</div>
</div>
<script type="text/javascript" src="${applicationScope.staticPath}order/business_comment.js"></script>
<script type="text/javascript">
//查询参数数据
var paramArray = [
 {id:"#datetype",name:"datetype",type:"select",defval:"1"},
 {id:"#begindate",name:"begindate",type:"date"},
 {id:"#stopdate",name:"stopdate",type:"date"},
 {id:"#storetype",name:"storetype",type:"combo"},
 {id:"#storename",name:"storename",type:"combo"},
 {id:"#marks",name:"markname",type:"combo"},
 {id:"#stockclass",name:"stockclassname",type:"combo"},
 {id:"#stockname",name:"stockname",type:"text"},
 {id:"#orderno",name:"orderno",type:"text"},
 {id:"#username",name:"nickname",type:"text"},
 {id:"#audittype",name:"auditstate",type:"select",defval:"-1"},
 {id:"#commtype",name:"fcommenttype",type:"select",defval:"-1"}
];
//默认的表格列数据和菜单ID
window.menuid = 504;//菜单ID
window.currentColumns = new Array();
var columns =  [
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"commid",title:"编号",hidden:true},
	{field:"storename",title:"店铺名称",width:80},
	{field:"fno",title:"主订单号",width:110},
	{field:"fstockname",title:"商品名称",width:110},
	{field:"commname",title:"会员昵称",width:65},
	{field:"commmaketime",title:"评价日期",width:75},
	{field:"commmemo",title:"评价内容",width:140},
	{field:"fstockgrade",title:"商品/物流/服务",width:95,fmt:'fmt_fstockgrade'},
	{field:"fsval",title:"审核状态值",hidden:true},
	{field:"fstate",title:"审核状态",width:80},
	{field:"fauditperosn",title:"审核人",width:65},
	{field:"faudittime",title:"审核时间",width:75},
	{field:"fcommenttype",title:"回复状态值",hidden:true},
	{field:"replyname",title:"回复人",width:65},
	{field:"replymemo",title:"回复内容",width:80},
	{field:"replymaketime",title:"回复时间",width:75}
];
window.defaultColumns = [columns]; 
Util.fmt_fstockgrade = function(value,row,index){
	return row.fstockgrade+' / '+row.fflowgrade+' / '+row.fservergrade;
}
//查询事件
function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","managerorders/queryOrderComment.do");
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
		button_role : "${role504.ffunction}",
		button:[{text:"审核",idfield:"commid",iconCls:"icon-accept",onclick:function(ids,rows){
					if(rows.length>1){
						$.messager.alert("提示","只能进行单个数据操作，！","warning");
						return false;
					}
					var path = "${applicationScope.fileServerPath}";
					checkOrderComment(rows[0],path);
				}},
				{text:"回复",idfield:"commid",iconCls:"icon-comment", onclick:function(ids,rows){
					if(rows.length>1){
						$.messager.alert("提示","只能进行单个数据操作，！","warning");
						return false;
					}
					var path = "${applicationScope.fileServerPath}"; 
					replyOrderComment(rows[0],path);
				}},
				{text:"查看晒单", onclick:function(ids,rows){
					if(rows.length>1){
						$.messager.alert("提示","只能进行单个数据操作，！","warning");
						return false;
					}
					var path = "${applicationScope.fileServerPath}"; 
					shareComment(rows[0],path);
				}}]
	});
	
	$("#storetype").jeasycombo({
		width:200,
		label:"店铺类型:",
		labelWidth:80,
		dlgheight:250,
		dlgwidth:500,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		data:{"total":0,"rows":[{"fname":"企业店铺","fid":0},{"fname":"门店店铺","fid":1},{"fname":"员工店铺","fid":2},{"fname":"PC企业商城","fid":7},
		        {"fname":"加盟商店铺","fid":3}]},
		onChange :function(newValue,oldValue){
			if(newValue==undefined || newValue ==""){
				$("#storename").jeasycombo("setvalue","");
			}else{
				$("#storename").jeasycombo("reload","managerorders/getStoreName.do?type="+newValue);
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
		data:{"total":0,"rows":[]},
		beforeShow:function(){
			var fstoType = $("#storetype").jeasycombo("getvalue");
			if(fstoType.ids != ""){
				return true;
			}else{
				$.messager.alert('温馨提示', "请选择店铺类型","warning");
				return false;
			}
		}
	});
	
	//经营品牌
	$("#marks").jeasycombo({
		width:200,
		label:"商品品牌:",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		url : "select/mark.do",
	});
	//经营类别
	$("#stockclass").jeasycombo({
		width:200,
		label:"商品类别:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		url : "select/stockClass.do?t=2",
	});
	
	//审核订单评论
	$("#checkComment").dialog({
		modal:true,
		closed:true,
		width:800,
		height:500,
		title:"审核订单评论",
		buttons:[{text:'通过',iconCls:'icon-accept',handler:function(){auditComment(1);}},
		         {text:'不通过',iconCls:'icon-stop',handler:function(){auditComment(2);}},
				 {text:'取消',iconCls:'icon-cancel',handler:function(){
						$("#checkComment").dialog("close");
				 }}]
	});
	
	//回复订单评论
	$("#replyComment").dialog({
		modal:true,
		closed:true,
		width:800,
		height:500,
		title:"回复订单评论",
		buttons:[{text:'保存',iconCls:'icon-save',handler:function(){replyComment(1);}},
				 {text:'取消',iconCls:'icon-cancel',handler:function(){
						$("#replyComment").dialog("close");
				 }}]
	});
});
</script>
</body>
</html>


<!-- 保留数据 勿删 -->
<!-- {title:"查询条件",width:257,iscenter:false,inputs:
[{"editor":"easyui-combobox","height":"","width":"200","label":"日期类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":0,"fname":"评价日期","selected":true},{"fid":1,"fname":"审核日期"},{"fid":2,"fname":"回复日期"}],"id":"datetype"},
{"editor":"easyui-datebox","height":"","width":"200","label":"开始日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"begindate"},
{"editor":"easyui-datebox","height":"","width":"200","label":"结束日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"stopdate"},
{"editor":"easyui-textbox","height":"","width":"200","label":"店铺类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"storetype"},
{"editor":"jeasycombo","height":"","width":"200","label":"店铺名称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"storename"},
{"editor":"jeasycombo","height":"","width":"200","label":"商品品牌:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"marks"},
{"editor":"jeasycombo","height":"","width":"200","label":"商品类别:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"stockclass","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"商品名称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"stockname"},
{"editor":"easyui-textbox","height":"","width":"200","label":"主订单号:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"orderno","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"会员昵称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":"","id":"username","url":""},
{"editor":"easyui-combobox","height":"","width":"200","label":"审核状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":-1,"fname":"全部","selected":true},{"fid":0,"fname":"未审核"},{"fid":1,"fname":"已审核"}],"id":"audittype"},
{"editor":"easyui-combobox","height":"","width":"200","label":"回复状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":-1,"fname":"全部","selected":true},{"fid":0,"fname":"未回复"},{"fid":1,"fname":"已回复"}],"id":"commtype"},
]} -->