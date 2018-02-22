<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>销售提成政策</title>
<%@ include file="../com/import.jsp"%>
<style type="text/css">
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
					<input id="FBeginDate" class="easyui-datebox" data-options="editable:false,'editor':'easyui-datebox','height':'','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FBeginDate'" />
				</div>
				<div class="easy-input-line">
					<input id="FEndDate" class="easyui-datebox" data-options="editable:false,'editor':'easyui-datebox','height':'','width':'200','label':'结束日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FEndDate'" />
				</div>
				<div class="easy-input-line">
					<input id="FBonusTypeID" />
				</div>
				<div class="easy-input-line">
					<input id="FBonusModeID" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'提成模式:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'固定金额','fid':1},{'fname':'销售额比例','fid':2}],'id':'FBonusModeID'" />
				</div>
				<div class="easy-input-line">
					<input id="FStoreID" class="jeasycombo" data-options="'editor':'jeasycombo','height':'','width':'200','label':'所属店铺:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FStoreID'" />
				</div>
				<div class="easy-input-line">
					<input id="accepId" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'有效:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fid':'-1','fname':'全部','selected':true},{'fid':0,'fname':'未有效'},{'fid':1,'fname':'已有效'}],'id':'accepId'" />
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
 {id:"#FBonusTypeID",name:"bonusType",type:"select"},
 {id:"#FBonusModeID",name:"bonusMode",type:"select"},
 {id:"#FBeginDate",name:"beginDate",type:"date"},
 {id:"#FEndDate",name:"endDate",type:"date"},
 {id:"#FStoreID",name:"storeId",type:"combo"},
 {id:"#accepId",name:"accepId",type:"select",defval:"-1"}
];
//默认的表格列数据和菜单ID
var menuid = 509;//菜单ID
window.currentColumns = new Array();
var columns =  [
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"编号",hidden:true},
	{field:"fbegindate",title:"开始日期",width:80},
	{field:"fenddate",title:"结束日期",width:80},
	{field:"fstorename",title:"适用店铺",width:150},
	{field:"fbonustypename",title:"提成类型",width:100},
	{field:"fbonusmodename",title:"提成模式",width:75},
	{field:"fbonusamount",title:"提成金额(比例)",width:100},
	{field:"faccepted",title:"有效",width:95,fmt:'fmt_faccepted'},
	{field:"fstopped",title:"终止",hidden:true},
	{field:"fscope",title:"适用范围",width:80,fmt:'fmt_fscope'}
];
window.defaultColumns = [columns]; 
Util.fmt_faccepted = function(value,row,index){
	return value?"<span class='accept'>有效</span>":"无效";
}
Util.fmt_fscope = function(value,row,index){
	return "<span style='color:orange;' class='easyui-tooltip' title='"+"【适用类别】："+row.fstockclassnames+"<br/>【适用品牌】："+
	row.fmarknames+"<br/>【适用商品】："+row.fstocknames+"<br/> 【联销商】："+row.flinkunitname+"'>查看详情</span>";
}
//查询事件
function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","saleBonus/getSaleBonusPolicy_red.do");
	$(".easy-dlg").dialog("destroy");//关闭弹出框
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
	    onLoadSuccess: function(){
            $(".easyui-tooltip").tooltip();
		}
	});
	//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		button_role : "${role509.ffunction}",
		button:[{text:"添加",iconCls:"icon-add", nocheck: true,onclick:function(ids,rows){
					//window.location.href = "saleBonus/goAddSaleBonusPolicy.do?pageid=500";
					Util.dialog("增加销售提成政策","saleBonus/goAddSaleBonusPolicy.do",800,600);
				}},
		        {text:"编辑",iconCls:"icon-edit",onclick:function(ids,rows){
		        	if(rows.length>1){
		        		$.messager.alert("提示","只能编辑一条数据！", "warning"); 
		        		return;
		        	}
	        		if(rows[0].faccepted==1){
	        			$.messager.alert("提示","数据已有效，不能编辑！", "warning");
	        			return false;
	        		}
		        	Util.dialog("编辑销售提成政策","saleBonus/editSaleBonusPolicy.do?saleBonusPolicyID="+ids,800,600);
		        }},
		        {text:"删除",iconCls:"icon-remove",onclick:function(ids,rows){
		        	deletePolicy(ids,rows);
		        }},
		        {text:"有效",iconCls:"icon-ok",onclick:function(ids,rows){
					acceptedState(ids,rows);
		        }},
				{text:"终止",iconCls:"icon-stop",onclick:function(ids,rows){
					stopState(ids,rows);
			    }}]
	});
	
	$("#FStoreID").jeasycombo({
		width:200,
		label:"店铺名称:",
		labelWidth:80,
		multiple : false,//是否多选
		type : "list",//弹出的样式
		detail:true,
		isinline:false,
		dlgwidth:800,
		linenum:4
		//url : "select/selectStore.do?selecttype=1&unitid=${sessionScope.b_m_boss.funitid}&userid=${sessionScope.user.FID}&storetypes="+storetype
	});
	$("#FBonusTypeID").combobox({
		width:200,
		label:"提成类型:",
		labelWidth:80,
		data:[{"fname":"员工店铺提成","fid":1},{"fname":"村级服务站提成","fid":2},{"fname":"加盟商提成","fid":4},{"fname":"企业店铺提成","fid":5},{"fname":"门店店铺提成","fid":6}], //{"fname":"转发提成","fid":0},{"fname":"联销商结算","fid":3},
		onChange: function(ids, texts){
    	    if(ids==undefined || ids ==""){
				$("#FStoreID").jeasycombo("setvalue","");
			} else{
				$("#FStoreID").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid=0&userid=${sessionScope.user.FID}&storetypes=&bonusType="+ids);
            }
        }
	});
});

//删除
function deletePolicy(ids,rows){
	for (var i = 0; i < rows.length; i++) {
		if(rows[i].faccepted==1){
			$.messager.alert("提示","存在已有效的记录,请去掉后再进行操作！", "warning");
			return false;
		}
	}
	$.messager.confirm('确认','您确认要【删除】选中的政策吗？',function(r){
		if (r){    
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:"saleBonus/deleteSaleBonusPolicy.do",
				dataType : "json",
				data: {saleBonusPolicyIDs:ids},
				success: function(data){
					$.messager.progress("close");
					if (data.result) {
						$.messager.alert("提示","删除成功！", "info");
						search();
					}else{
						$.messager.alert("提示",data.msg, "error");
					}
				}
			});    
	    }
	});
}

//有效 王娟娟 
function acceptedState(ids,rows){
	for (var i = 0; i < rows.length; i++) {
		if(rows[i].faccepted==1){
			$.messager.alert("提示","存在已有效的记录,请去掉后再进行操作！", "warning");
			return false;
		}
	}
	$.messager.confirm('确认','您确定要进行【有效】操作吗？',function(r){
		if (r){    
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type: 'post',
				url:  "saleBonus/accepSaleBP.do",
				data: {saleBonusPolicyIDs:ids},
				success:function(data){
					$.messager.progress("close");
				   	if(data==1){
				   		$.messager.alert("提示","有效成功！", "info");
					  	search();
				  	}else if(data==""){
				  		$.messager.alert("提示","您无此权限","error");
					}else{
						$.messager.alert("提示","有效失败！","error");	  
				  	}
				},error:function(){
       				$.messager.progress("close");
       				$.messager.alert("提示","更改状态失败！", "error");
       			}
		  });
	    }
	}); 
}

//王娟娟  终止
function stopState(ids,rows){
	for (var i = 0; i < rows.length; i++) {
		if(rows[i].faccepted==0){
			$.messager.alert("提示","存在未有效的记录,请去掉后再进行操作！", "warning");
			return false;
		}
		if(rows[i].fstopped==1){
			$.messager.alert("提示","存在已终止的记录,请去掉后再进行操作！", "warning");
			return false;
		}
	}
	$.messager.confirm('确认','您确定要进行【终止】操作吗？',function(r){
		if (r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type: 'post',
				url:  "saleBonus/stopSaleBP.do",
				data: {saleBonusPolicyIDs:ids},
				success:function(data){
					$.messager.progress("close");
				   	if(data==1){
						$.messager.alert("提示","终止成功！", "info");
				  	}else if(data==""){
				  		$.messager.alert("提示","您无此权限！","error");
					}else{
						$.messager.alert("提示","终止失败！","error");	  
				  	}
				},error:function(){
       				$.messager.progress("close");
       				$.messager.alert("提示","终止失败！", "error");
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
[{"editor":"easyui-datebox","height":"","width":"200","label":"开始日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FBeginDate"},
{"editor":"easyui-datebox","height":"","width":"200","label":"结束日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FEndDate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"提成类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"员工店铺提成","fid":1},{"fname":"村级服务站提成","fid":2},{"fname":"加盟商提成","fid":4},{"fname":"企业店铺提成","fid":5},{"fname":"门店店铺提成","fid":6}],"id":"FBonusTypeID"},
{"editor":"easyui-combobox","height":"","width":"200","label":"提成模式:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"固定金额","fid":1},{"fname":"销售额比例","fid":2}],"id":"FBonusModeID"},
{"editor":"jeasycombo","height":"","width":"200","label":"所属店铺:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FStoreID"},
{"editor":"easyui-combobox","height":"","width":"200","label":"有效:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fid":"","fname":"全部","selected":true},{"fid":0,"fname":"未有效"},{"fid":1,"fname":"已有效"}],"id":"accepId"},
]} -->