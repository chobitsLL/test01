<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>easyUI</title>
<%@ include file="js/import.jsp"%>
<script type="text/javascript" src="template/easy/test/js/jpush.js"></script>
<script type="text/javascript" src="template/easy/test/js/TestApp.js"></script>


</head>
<script type="text/javascript">

</script>
<body>
	<div class="easyui-layout" data-options="fit:true" style="overflow:auto;">
		<div style="min-width: 280px;margin: 0 auto;float: left;">
			<div style="width: 280px;float: left;">
				<form id="easyuiForm">
					<div class="easyui-panel"
						data-options="border:false,cls:'easy-input-panel'">
						<div class="easy-input-line">
							<input id="platForm" class="easyui-combobox" />
						</div>
						<div class="easy-input-line">
							<input id="regID" class="easyui-textbox" data-options="'width':230,'label':'注册regID:','labelWidth':90,prompt:''" />
						</div>
						<div class="easy-input-line">
							<input id="appKey" class="easyui-textbox" data-options="'width':230,'label':'appKey:','labelWidth':90,prompt:''" />
						</div>
						<div class="easy-input-line">
							<input id="masterSecret" class="easyui-textbox" data-options="'width':230,'label':'masterSecret:','labelWidth':90,prompt:''" />
						</div>
						<div class="easy-input-line">
							<input id="alias" class="easyui-textbox" data-options="'width':230,'label':'别名数组:','labelWidth':90,prompt:'多个用逗号隔开'" />
						</div>
						<div class="easy-input-line">
							<input id="tags" class="easyui-textbox" data-options="'width':230,'label':'标签数组:','labelWidth':90,prompt:'多个用逗号隔开'" />
						</div>
						<div class="easy-input-line">
							<input id="title" class="easyui-textbox" data-options="'width':230,'label':'推送标题:','labelWidth':90,prompt:'标题'" />
						</div>
						<div class="easy-input-line">
							<input id="btype" class="easyui-textbox" data-options="'width':230,'label':'推送类型:','labelWidth':90,prompt:'类型'" />
						</div>
						<div class="easy-input-line">
							<input id="badge" class="easyui-textbox" data-options="'width':230,'label':'badge:','labelWidth':90,prompt:'默认自增1'" />
						</div>
					</div>
					<div style="width: 1280px;float: left;">
						<div class="easy-input-line">
							<label class="textbox-label textbox-label-before" style="text-align: right; width: 85px; height: 26px; line-height: 26px;float: left;" for="_easyui_textbox_input3">推送内容:</label>
							<textarea id="content" rows=5 style="width:1000px" name=""  class="textarea easyui-validatebox" ></textarea>
						</div>
					</div>
				</form>
			</div>
			<div style="width: 280px;float: left;">
				<form id="easyuiForm">
					<div class="easyui-panel"
						data-options="border:false,cls:'easy-input-panel'">
						<div class="easy-input-line">
							<input id="stType" class="easyui-combobox" />
						</div>
						<div id="schNameDIV" class="easy-input-line">
							<input id="schName" class="easyui-textbox" data-options="'width':230,'label':'任务名称:','labelWidth':90" />
						</div>
						<div id="startDIV" class="easy-input-line">
							<input id="startTime" class="easyui-datetimebox" data-options="'width':230,'label':'开始时间:','labelWidth':90" />
						</div>
						<div id="hideDIV" style="display:none;">
							<div class="easy-input-line">
								<input id="endTime" class="easyui-datetimebox" data-options="'width':230,'label':'结束时间:','labelWidth':90" />
							</div>
							<div class="easy-input-line">
								<input id="schTime" class="easyui-timespinner" data-options="'width':230,'label':'执行时间:','labelWidth':90,showSeconds:true" />
							</div>
							<div class="easy-input-line">
								<input id="timeUnit" class="easyui-combobox"/>
							</div>
							<div class="easy-input-line">
								<input id="point" class="easyui-combobox"/>
							</div>
							<div class="easy-input-line">
								<input id="frequency" class="easyui-textbox" data-options="'width':230,'label':'执行周期:','labelWidth':90" />
							</div>
						</div>
						
						
					</div>
				</form>
			</div>
		</div>
		<div style="padding: 5px 20px;width: 280px;">
	        <span class="easyui-linkbutton" id="sendPush"
				 data-options="iconCls:'icon-save'">推送</span>
			<!-- <span class="easyui-linkbutton" id="sendPush"
				onclick="sendTest()" data-options="iconCls:'icon-save'">测试</span> -->
			<span class="easyui-linkbutton" id="btnReset"
						data-options="iconCls:'icon-search'">重置</span>
		</div>
		<div id="divData" style="padding: 5px 10px">
			<label id="labelID">
			
			</label>
		</div>
	</div>
</body>
</html>
