<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>会员信息查询</title>
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
					<input id="memberName" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'名称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'memberName','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="memberNickName" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'昵称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'memberNickName','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="memeberTel" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'手机:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'memeberTel','url':''" />
				</div>
				<div class="easy-input-line">
					<input id="wxNickName" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'','width':'200','label':'微信昵称:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':'','id':'wxNickName','url':''" />
				</div>
				<div class="easy-input-line">
					<select class="easyui-combobox" id="memberOrderby" name="memberOrderby" data-options="panelHeight:'auto',editable:false,'label':'排序:','width':200,'labelWidth':80 " >
						<option value="1" selected="selected">会员积分</option>
						<option value="2">注册时间</option>
					</select>
				</div>
				<div class="easy-input-line">
					<input id="cardtype" class="jeasycombo" />
				</div>
				<div class="easy-input-line">
					<input id="searchFdateStart" class="easyui-datetimebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'注册日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'searchFdateStart'" />
				</div>
				<div class="easy-input-line">
					<input id="searchFdateEnd" class="easyui-datetimebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'至:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'searchFdateEnd'" />
				</div>
				<div class="easy-input-line">
					<input id="watchTimeStart" class="easyui-datetimebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'关注日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'watchTimeStart'" />
				</div>
				<div class="easy-input-line">
					<input id="watchTimeEnd" class="easyui-datetimebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'至:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'watchTimeEnd'" />
				</div>
				<div class="easy-input-line">
					<input id="cancelWatchTimeStart" class="easyui-datetimebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'取消关注日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'cancelWatchTimeStart'" />
				</div>
				<div class="easy-input-line">
					<input id="cancelWatchTimeEnd" class="easyui-datetimebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'至:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'cancelWatchTimeEnd'" />
				</div>
				<div class="easy-input-line">
					<select class="easyui-combobox" id="isbindwxuser" name="isbindwxuser" data-options="panelHeight:'auto',editable:false,'label':'绑定微信:','width':200,'labelWidth':80 " >
						<option value="0" selected="selected">全部</option>
						<option value="1">未绑定</option>
						<option value="2">已绑定</option>
					</select>
				</div>
				<div class="easy-input-line">
					<select class="easyui-combobox" id="watchState" name="watchState" data-options="panelHeight:'auto',editable:false,'label':'关注状态:','width':200,'labelWidth':80 " >
						<option value="-1" selected="selected">全部</option>
						<option value="0">未关注</option>
						<option value="1">已关注</option>
						<option value="2">取消关注</option>
					</select>
				</div>
				<div class="easy-input-line">
					<select class="easyui-combobox" id="iserpmember" name="iserpmember" data-options="panelHeight:'auto',editable:false,'label':'ERP会员:','width':200,'labelWidth':80 " >
						<option value="" selected="selected">全部</option>
						<option value="1">是</option>
						<option value="2">否</option>
					</select>
				</div>
				<div class="easy-input-line">
					<input id="storeids" class="jeasycombo" />
				</div>
				<div class="easy-input-line">
					<input id="memberState" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'会员状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':0,'fname':'全部','selected':true},{'fid':1,'fname':'有效'},{'fid':2,'fname':'禁用'}],'id':'memberState'" />
				</div>
				<div class="easy-input-line">
					<input id="isBangTelState" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'绑定手机状态:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':'-1','fname':'全部'},{'fid':0,'fname':'未绑定'},{'fid':1,'fname':'已绑定','selected':true}],'id':'isBangTelState'" />
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
<div id="memberhistory" style="display: none;">
	<table id="memberhistoryTable" style="margin-left:0px !important;">
		<thead>
			<tr>
				<th>日期</th>
				<th>线上积分</th>
				<th>线下积分</th>
				<th>说明</th>
		        <th>积分类型</th>
		        <th>交易单据号</th>
		    </tr>
		</thead>
	    <tbody></tbody>
	</table>
</div>
<div id="clearscore" style="display: none;algin:center;">
	<input type="hidden" id="Fid">
	<input type="hidden" id="Score">
	<input type="hidden" id="Fuserid">
	<input type="hidden" id="FStoreScore">
	<input type="hidden" id="FOfflineScore">
	<div class="easy-input-line" style="algin:center;">
		<input id="fdate" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'330','label':'截止日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'fdate'" />
	</div>
	<div style="text-align:center;padding:5px 0">
		<span class="easyui-linkbutton" onclick="beSure()" data-options="iconCls:'icon-save'">确定</span>
	</div>
</div>
<div id="stockhistory" style="display: none;algin:center;">
	<table id="stockhistoryTable" style="margin-left:0px !important;">
		<thead>
			<tr>
				<th>浏览时间</th>
				<th>商品</th>
				<th>店铺</th>
				<th>浏览次数</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>
<div id="shoppinghistory" style="display: none;algin:center;">
	<table id="shoppinghistoryTable" style="margin-left:0px !important;">
		<thead>
			<tr>
				<th>交易日期</th>
				<th>订单号</th>
				<th>商品名称</th>
				<th>数量</th>
				<th>销售金额</th>
				<th>订单状态</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>
<div id="servicehistory" style="display: none;algin:center;">
	<table id="servicehistoryTable" style="margin-left:0px !important;">
		<thead>
			<tr>
				<th>服务日期</th>
				<th>服务单号</th>
				<th>商品名称</th>
				<th>数量</th>
				<th>安装或维修</th>
				<th>服务状态</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>

<script type="text/javascript">
//查询参数数据
//{id:"标签的ID",
// name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
// type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
// value:"固定值，当type='value'时取此值"
// ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [{id:"#memberName",name:"membername",type:"text"},
        		  {id:"#memberNickName",name:"membernickname",type:"text"},
        	      {id:"#wxNickName",name:"wxnickname",type:"text"},
       	  		  {id:"#memeberTel",name:"membertel",type:"text"},
       	  		  {id:"#memberState",name:"memberstate",type:"select",defval:"0"},
       	  		  {id:"#memberOrderby",name:"memberOrderby",type:"select",defval:"1"},
       	  		  {id:"#cardtype",name:"cardtypeid",type:"combo"},
       	  		  {id:"#storeids",name:"storeids",type:"combo"},
       	  		  {id:"#searchFdateStart",name:"beginDate",type:"date"},
       	          {id:"#searchFdateEnd",name:"endDate",type:"date"},
       	          {id:"#watchTimeStart",name:"watchTimeStart",type:"date"},
       	          {id:"#watchTimeEnd",name:"watchTimeEnd",type:"date"},
       	          {id:"#cancelWatchTimeStart",name:"cancelWatchTimeStart",type:"date"},
       	          {id:"#cancelWatchTimeEnd",name:"cancelWatchTimeEnd",type:"date"},
       	          {id:"#isbindwxuser",name:"isbindwxuser",type:"select",defval:"0"},
       	          {id:"#watchState",name:"watchState",type:"select",defval:"-1"},
       	          {id:"#iserpmember",name:"iserpmember",type:"select",defval:""},
       	  		  {id:"#isBangTelState",name:"fisbindtel",type:"select",defval:"1"}
		          ]
//默认的表格列数据和菜单ID
window.menuid = 902;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"funituserid",title:"编号",hidden:true},      
	{field:"fname",title:"名称",width:100},
	{field:"fnickname",title:"昵称",width:120},
	{field:"ftelno",title:"手机",width:90},
	{field:"fstorescore",title:"线上积分",width:80},
	{field:"fofflinescore",title:"线下积分",width:80},    
	{field:"fcardtypename",title:"会员卡类型",width:70},    
	{field:"iserpmember",title:"ERP会员",width:60},    
	{field:"fwxnickname",title:"微信名称",width:120},
	{field:"storename",title:"绑定门店",width:120},
	{field:"fstate",title:"状态",width:50,editor:"validatebox",fmt:'fmt_fstate'},
	{field:"fgender",title:"性别",width:50,editor:"validatebox",fmt:'fmt_fgender'},
	{field:"fregtime",title:"注册时间",width:130,fmt:'fmt_fregtime'},
	{field:"flogincount",title:"登录次数",width:60},    
	{field:"flastlogintime",title:"最后登录时间",width:130},
	{field:"fwatchflag",title:"关注状态",width:60},
	{field:"fwatchtime",title:"关注时间",width:130},
	{field:"fwatchendtime",title:"取消关注时间",width:130},
	{field:"fisbindtel",title:"绑定手机号",width:80},
	/* {field:"ffcuntion",title:"操作",width:240,formatter: function(value,row,index){
		var stras = "<span onclick='browsHistory(this,"+this.funituserid+")'><a>浏览历史 </a></span>"
				  + "<span onclick='ShoppingHistory(this,"+this.funituserid+")'><a>购物历史 </a></span>"
				  + "<span onclick='ServiceHistory(this,"+this.funituserid+")'><a>服务历史</a></span>";
		return stras;
	}}, */
]];
Util.fmt_fstate = function(value,row,index){
	if (row.fstate == 0) {
		value = "未有效";
	}else if (row.fstate == 1){
		value = "有效";
	}else if (row.fstate == 2){
		value = "禁用";
	}else{
		value = "删除";
	}
	return value;
}
Util.fmt_fgender = function(value,row,index){
	if (row.fgender == 0) {
		value = "男";
	}else if (row.fgender == 1){
		value = "女";
	}
	return value;
}
Util.fmt_fregtime = function(value,row,index){
	return value==""?"":value;
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
		button_role : "${role902.ffunction}",
		button:[
			{text:"禁用",onclick:function(ids,rows){
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				realids = realids.join(",");
				updatestate(realids);
			}},
			{text:"开启",onclick:function(ids,rows){				
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				realids = realids.join(",");
				updstate(realids);
			}},
			{text:"历史积分",onclick:function(ids,rows){				
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				if(realids.length > 1){
					$.messager.alert("提示", "只能选择一行数据！", "warning");
					return;
				} 
				realids = realids.join(",");
				scorehistory(realids);
			}},
			{text:"解除绑定",onclick:function(ids,rows){				
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				realids = realids.join(",");
				removebind(realids);
			}},
			{text:"积分清零",onclick:function(ids,rows){				
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				realids = realids.join(",");
				$.ajax({
					type:"POST",
					url:"user/queryScore.do",
					data:{"id":realids},
					dataType:"json",
					success:function(data){
						if(data.total == 0){
							$.messager.alert("提示","该条数据的积分是0，不用清空!", "info");
						}else{
							
							$("#clearscore").dialog("open");
							$("#Fid").val(data.fid);
							$("#Score").val(data.total);
							$("#Fuserid").val(data.fuserid);
							$("#FStoreScore").val(data.fstorescore);
							$("#FOfflineScore").val(data.fofflinescore);
						}
					}
				});
			}},
			{text:"导出Excel",nocheck:true,onclick:function(ids,rows){
				exportExcel_MemberInfo();
			}},
			{text:"浏览历史",onclick:function(ids,rows){
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				if(realids.length > 1){
					$.messager.alert("提示", "只能选择一行数据！", "warning");
					return;
				}
				realids = realids.join(",");
				browsHistory(realids);
			}},
			{text:"购物历史",onclick:function(ids,rows){
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				if(realids.length > 1){
					$.messager.alert("提示", "只能选择一行数据！", "warning");
					return;
				}
				realids = realids.join(",");
				shoppingHistory(realids);
			}},
			{text:"服务历史",onclick:function(ids,rows){
				var realids = [];
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i];
					realids.push(row.funituserid);
				}
				if(realids.length > 1){
					$.messager.alert("提示", "只能选择一行数据！", "warning");
					return;
				} 
				realids = realids.join(",");
				serviceHistory(realids);
			}}
        ]
	});
	
	$("#cardtype").jeasycombo({
		width:200,
		label:"会员卡类型：",
		labelWidth:80,
		multiple : false,//是否多选
		isinline:false,
		dlgwidth:600,
		linenum:4,
		type : "list",//弹出的样式
		url: 'select/getCardType.do'
	});
	$("#storeids").jeasycombo({
		width:200,
		label:"门店：",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:600,
		linenum:4,
		type : "list",//弹出的样式
		url: 'user/getStoreByUnit.do'
	});
	
	$("#btnSearch").bind("click", function(){
		search();
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
	$("#memberhistory").dialog({
		title:"历史记录查询",
	    width:800,    
	    height:400,
	    closed:true,
	    modal:false   
	});
	$("#clearscore").dialog({
		title:"积分清零",
	    width:400,    
	    height:200,
	    closed:true,
	    modal:false,
	    onBeforeOpen:function(){
			var txt = $("#fdate").val("");
			return true;
		}   
	});
	$("#stockhistory").dialog({
		title:"浏览历史",
	    width:800,    
	    height:400,
	    closed:true,
	    modal:false   
	});
	$("#shoppinghistory").dialog({
		title:"购物历史",
	    width:900,    
	    height:400,
	    closed:true,
	    modal:false   
	});
	$("#servicehistory").dialog({
		title:"服务历史",
	    width:800,    
	    height:400,
	    closed:true,
	    modal:false   
	});
});

function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","user/queryMemeberInfo.do");
}
//禁用
function updatestate(ids){
	$.ajax({
		type: 'post',
		url: 'user/updateState.do',
		data: {ids:ids},
		dataType : "json",
		success:function(data){
			if (data.result) {
				$.messager.alert("提示","禁用成功","info");
			} else {
				var msg = "操作失败";
				if (data.msg != ""){
					msg = data.msg;
				}
				$.messager.alert("提示",msg,"error");
			}
			search();
		},error:function(){
			$.messager.alert("提示","操作失败","error");
		}
	});	
}
//开启
function updstate(ids){
	$.ajax({
		type: 'post',
		url: 'user/updState.do',
		data: {ids:ids},
		dataType : "json",
		success:function(data){
			if (data.result) {
				$.messager.alert("提示","开启成功","info");
			} else {
				var msg = "操作失败";
				if (data.msg != ""){
					msg = data.msg;
				}
				$.messager.alert("提示",msg,"error");
			}	
			search();
		},error:function(){
			$.messager.alert("提示","操作失败","error");
		}
	});	
}
//解除绑定
function removebind(ids){
	$.ajax({
		type: 'post',
		url: 'user/removeWxbind.do',
		data: {ids:ids},
		dataType : "json",
		success:function(data){
			if (data.result) {
				$.messager.alert("提示","操作成功","info");
			} else {
				var msg = "操作失败";
				if (data.msg != ""){
					msg = data.msg;
				}
				$.messager.alert("提示",msg,"error");
			}	
			search();
		},error:function(){
			$.messager.alert("提示","操作失败","error");
		}
	});	
}
//积分历史
function scorehistory(ids){
	$.ajax({
		type: 'post',
		url: 'user/getSocreHistory.do',
		data: {ids:ids},
		dataType : "json",
		success:function(data){
			if (!data.result) {
				var msg = "操作失败";
				if (data.msg != ""){
					msg = data.msg;
				}
				$.messager.alert("提示",msg,"error");
			} else {
				if (data.rows.rows.length>0){	
					var tbody = $("#memberhistoryTable").find("tbody");
					tbody.html("");
			        for(var i=0;i<data.rows.rows.length;i++){
			        	var tr = $("<tr></tr>");
			        	var row=data.rows.rows[i];
			        	tr.append("<td style='width:160px;'>"+row["fdate"]+"</td>");
			        	tr.append("<td style='width:80px;'>"+row["fstorescore"]+"</td>");
			        	tr.append("<td style='width:80px;'>"+row["fofflinescore"]+"</td>");
			        	tr.append("<td style='width:203px;'>"+row["fabstract"]+"</td>");
			        	tr.append("<td style='width:120px;'>"+row["fscoretype"]+"</td>");
			        	tr.append("<td style='width:180px;'>"+row["fbillno"]+"</td>");
			        	tr.appendTo(tbody);
			        }
					$("#memberhistory").dialog("open");
				} else {
					$.messager.alert("提示","无历史数据！","error");
				}
			}
	  	}
	});
}

function beSure(){
	var fdate = $("#fdate").datebox('getValue');
	var funituserid = $("#Fid").val();
	var fuserid = $("#Fuserid").val();
	var fstorescore = $("#FStoreScore").val();//线上积分（页面获取）--王龙
	var fofflinescore = $("#FOfflineScore").val();//线下积分（页面获取）--王龙
	var score = $("#Score").val();
	if(fdate == ""){
		$.messager.alert("提示","请输入日期!", "error");
		return false;
	}
	var dat = {};
	dat["funituserid"]=funituserid;
	dat["fdate"]=fdate;
	dat["fuserid"]=fuserid;
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : "POST",
		url : "user/queryScoreLedger.do",
		dataType : "json",
		data : {jsonobj:JSON.stringify(dat)},
		success : function(data) {
			$.messager.progress("close");//隐藏加载中
			
			var total = 0;
			var json = {};
			var up = 0;
			var down = 0;
			var fidList = [];
			for(var i=0;i<data.length;i++){
				var json = {};
				total += data[i].total;
				up += data[i].up;
				down += data[i].down;
				var fid = data[i].fid;
				json["fid"]=fid;
				fidList.push(json);
			}
			dat["ids"] = fidList;
// 			if(total != undefined){
				if(total != 0){
					/* sum = (fscore-score) > 0 ? score : fscore;
					dat["sum"]=sum; */
					if((total-score) < 0){
						dat["fstorescore"]=up;
						dat["fofflinescore"]=down;
						//dat["type"]=1;
					}else{
						dat["fstorescore"]=fstorescore;
						dat["fofflinescore"]=fofflinescore;
						//dat["type"]=2;
					}
					$.messager.progress({text : "正在处理，请稍候..."});
			 		$.ajax({
			 			type : "POST",
			 			url : "user/clearScore.do",
			 			dataType : "json",
			 			data : {jsonobj:JSON.stringify(dat)},
			 			success:function(data){
			 				$.messager.progress("close");//隐藏加载中
			 				if (data.loginFlag) {
			 					if (data.saveFlag) {
			 						$("#clearscore").dialog("close");
			 						$.messager.alert("提示","操作成功！");
			 						search();
			 					} else {
			 						$.messager.alert("提示","操作失败，请稍后重试！");
			 					}
			 				} else {
			 					$.messager.alert("提示","登录超时，请重新登录后操作！");
			 				}		
			 			},error:function(){
			 				$.messager.progress("close");//隐藏加载中
			 			    $.messager.alert("提示","操作失败","error");
			 			}
			 		});
				} else {
					$.messager.alert("提示","该时间段内积分为0，不用清零操作","error"); 				} 
// 			}else{
//  				$.messager.alert("提示","截止日期不可选择注册前的日期!","error");
//  			}
		},
		error : function() {
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示","服务器错误!", "error");
		}
	});
}
/******导出会员信息******/
function exportExcel_MemberInfo(){
	Util.exportExcel({
		url:"user/exportExcel_member.do",
		jsonParam:Util.initParam(paramArray).jsonobj,
		sheetTitle:"会员信息",
		fileName:"会员信息",
		headers:{"fname":"名称", "fnickname":"昵称", "ftelno":"手机", "fstorescore":"线上积分", "fofflinescore":"线下积分", 
			"fstate2":"状态", "fgender2":"性别", "fregtime2":"注册时间", "flogincount":"登录次数", "fcardtypename":"会员卡类型", "flastlogintime":"最后登录时间",
			"iserpmember":"ERP会员", "fwxnickname":"微信名称"}
	})
}
//浏览历史
function browsHistory(unituserid){
	$.ajax({
		type: 'post',
		url: 'user/getStockHistory.do',
		data: {unituserid: unituserid},
		dataType : "json",
		success:function(data){
			if(data.result){
				var str = "";
				var tbody = $("#stockhistoryTable").find("tbody");
				tbody.html("");
		        for(var i = 0;i < data.datalist.length;i ++){
		        	var tr = $("<tr></tr>");
		        	var row = data.datalist[i];
		        	//浏览时间   商品   店铺   浏览次数  
		        	tr.append("<td class='t80'>"+row["fdate"]+"</td>");
		        	tr.append("<td class='t160'>"+row["stockname"]+"</td>");
		        	tr.append("<td class='t100'>"+row["storename"]+"</td>");
		        	tr.append("<td class='t60'>"+row["fcount"]+"</td>");
		        	tr.appendTo(tbody);
		        }
				$("#stockhistory").dialog("open");
			}else{
				$.messager.alert("提示","暂无历史数据！","error");
			}
		},error:function(){
			$.messager.alert("提示","查询出错，请稍后重试！","error");
		}
	});
}
//购物历史
function shoppingHistory(unituserid){
	$.ajax({
		type: 'post',
		url: 'user/getShoppingHistory.do',//tblRetail 
		data: {unituserid: unituserid},
		dataType : "json",
		success:function(data){
			if(data.result){
				var str = "";
				var tbody = $("#shoppinghistoryTable").find("tbody");
				tbody.html("");
		        for(var i = 0;i < data.datalist.length;i ++){
		        	var tr = $("<tr></tr>");
		        	var row=data.datalist[i];
		        	//交易日期   订单号   商品名称   数量   销售金额    订单状态
		        	tr.append("<td class='t70'>"+row["fdate"]+"</td>");
		        	tr.append("<td class='t100'>"+row["fno"]+"</td>");
		        	tr.append("<td class='t120'>"+row["fstockname"]+"</td>");
		        	tr.append("<td class='t10'>"+row["fquanty"]+"</td>");
		        	tr.append("<td class='t40'>"+row["ftotalamount"]+"</td>");
		        	tr.append("<td class='t50'>"+row["fstate"]+"</td>");
		        	tr.appendTo(tbody);
		        }
				$("#shoppinghistory").dialog("open");
			}else{
				$.messager.alert("提示","暂无历史数据！","error");
			}
		},error:function(){
			$.messager.alert("提示","查询出错，请稍后重试！","error");
		}
	});
}
//服务历史
function serviceHistory(unituserid){
	$.ajax({
		type: 'post',
		url: 'user/getServiceHistory.do',//tblSMDoc 
		data: {unituserid: unituserid},
		dataType : "json",
		success:function(data){
			if(data.result){
				var str = "";
				var tbody = $("#servicehistoryTable").find("tbody");
				tbody.html("");
		        for(var i = 0;i < data.datalist.length;i ++){
		        	var tr = $("<tr></tr>");
		        	var row = data.datalist[i];
		        	//服务日期    服务单号  商品名称  数量  安装或维修    服务状态
		        	tr.append("<td class='t100'>"+row["fdate"]+"</td>");
		        	tr.append("<td class='t100'>"+row["fno"]+"</td>");
		        	tr.append("<td class='t160'>"+row["fstockname"]+"</td>");
		        	tr.append("<td class='t60'>"+row["fquanty"]+"</td>");
		        	tr.append("<td class='t80'>"+row["fsmtype"]+"</td>");
		        	tr.append("<td class='t80'>"+row["fstatus"]+"</td>");
		        	tr.appendTo(tbody);
		        }
				$("#servicehistory").dialog("open");
			}else{
				if(data.msg == ""){
					$.messager.alert("提示","暂无历史数据！","error");
				}else{
					$.messager.alert("提示",data.msg,"error");
				}
			}
		},error:function(){
			$.messager.alert("提示","查询出错，请稍后重试！","error");
		}
	});
}
</script>
</body>
</html>

<!-- 保留数据 勿删 -->
<!-- {title:"查询条件",width:257,iscenter:false,inputs:
[{"editor":"easyui-textbox","height":"","width":"200","label":"名称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"memberName","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"昵称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"memberNickName","url":""},
{"editor":"easyui-textbox","height":"","width":"200","label":"电话:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"memeberTel","url":""},
{"editor":"easyui-combobox","height":"","width":"200","label":"状态:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":0,"fname":"全部","selected":true},{"fid":1,"fname":"有效"},{"fid":2,"fname":"禁用"}],,"id":"memberState"},
{"editor":"easyui-combobox","height":"","width":"200","label":"排序:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":1,"fname":"会员积分","selected":true},{"fid":2,"fname":"注册时间"}],,"id":"memberOrderby"},
{"editor":"jeasycombo","height":"","width":"200","label":"会员卡类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"cardtype","url":"select/getCardType.do"},
{"editor":"easyui-datebox","height":"","width":"200","label":"注册日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"searchFdateStart"},
{"editor":"easyui-datebox","height":"","width":"200","label":"至:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"searchFdateEnd"},
{"editor":"easyui-combobox","height":"","width":"200","label":"绑定微信:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":0,"fname":"全部","selected":true},{"fid":1,"fname":"未绑定"},{"fid":2,"fname":"已绑定"}],"id":"isbindwxuser"},
{"editor":"easyui-combobox","height":"","width":"200","label":"ERP会员:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":"","fname":"全部","selected":true},{"fid":0,"fname":"否"},{"fid":1,"fname":"是"}],"id":"iserpmember"},
]} -->