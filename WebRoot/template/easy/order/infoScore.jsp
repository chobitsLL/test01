<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>完善资料积分设置</title>
<%@ include file="../com/import.jsp"%>
<style type="text/css"></style>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="easyui-layout " data-options="fit:true">
			<div data-options="region:'center',border:false,iconCls:'icon-ok'">
				<div id="easy-tool"></div>
				<table id="easy_table"></table> 
			</div>
		</div>
		<div id="column_filter"></div>
	</div>
</div>

<div id="save-dialog" style="display: none;overflow-x: hidden;">
	<input id="fid" type="hidden" />
	<div class="easy-input-line" style="padding-top: 20px;">
		<input id="fCountScore" class="easyui-numberbox" data-options="'width':'400','label':'奖励积分:','labelWidth':'150','required':true,'missingMessage':'请输入奖励积分'" />
	</div>
</div>
<script type="text/javascript">
//查询参数数据
//默认的表格列数据和菜单ID
var menuid = 513;//菜单ID
window.currentColumns = new Array();
var columns =  [
	{field:"fid",title:"编号",hidden:true},
	{field:"fname",title:"资料名称",width:200},
	{field:"fscore",title:"奖励积分",width:200},
];
window.defaultColumns = [columns]; 
//查询事件
function search(){
	//查询前先组织查询条件
	//$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","infoscore/getInfoScore.do");
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
		button_role : "${role513.ffunction}",
		button:[{text:"查询", iconCls:"icon-search", nocheck:true,onclick:function(ids,rows){
					search();
				}},
				{text:"快速设置", iconCls:"icon-cog", nocheck:true,onclick:function(ids,rows){
					$("#fid").val("");
					$("#fCountScore").numberbox("clear");
			        $("#save-dialog").dialog("open");
				}},
				{text:"编辑", iconCls:"icon-edit",onclick:function(ids,rows){
					if(rows.length > 1 ){
						$.messager.alert("提示","只能选择一条数据进行操作！","warning");
						return false;
					}
					$("#fid").val(rows[0].fid);
					$("#fCountScore").numberbox("setValue",rows[0].fscore);
					$("#save-dialog").dialog("open");
				}}]
	});
	
	//快速设置、编辑
	$("#save-dialog").dialog({
		modal:true,
		closed:true,
		width:500,
		height:150,
		title:"设置奖励积分",
		buttons:[{text:'保存',iconCls:'icon-save',handler:function(){save();}},
				 {text:'取消',iconCls:'icon-cancel',handler:function(){
						$("#save-dialog").dialog("close");
				 }}]
	});
	
});

//保存
function save(){
	var fid=$("#fid").val();
	var fscore=$("#fCountScore").numberbox("getValue");
	if(fscore==""){
		$.messager.alert("提示","奖励积分不能为空","warning");
    	return false;
    }
	var url="infoscore/insertInfoScore.do?fscore="+fscore;
    if(fid!=""){
    	url="infoscore/editInfoScore.do?fscore="+fscore+"&fid="+fid;
    }
	
    $.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:url,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");
			if(data.result){
				$("#save-dialog").dialog("close");
				//$.messager.alert("提示","设置成功","info");
				$.jmsg("设置成功");
				search();
			}else{
				$.messager.alert("提示","设置失败","warning");
			}
		},
		error:function(){
			$.messager.progress("close");
			$.messager.alert("提示","系统错误","error");
		}
	});
}
</script>
</body>
</html>
<!-- 保留数据 勿删 -->
<!-- {title:"查询条件",width:257,iscenter:false,inputs:
[{"editor":"easyui-datebox","height":"","width":"200","label":"销售日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FBeginDate"},
{"editor":"easyui-datebox","height":"","width":"200","label":"至:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FEndDate"},
{"editor":"easyui-combobox","height":"","width":"200","label":"提成类型:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"全部","fid":0},{"fname":"未计算","fid":1},{"fname":"已计算","fid":2}],"id":"selectType"},
{"editor":"jeasycombo","height":"","width":"200","label":"店铺名称:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FStoreID"},
{"editor":"jeasycombo","height":"","width":"200","label":"销售人员:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FSaleUserID"},
]} -->