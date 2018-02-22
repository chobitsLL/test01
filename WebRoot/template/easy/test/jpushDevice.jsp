<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>easyUI</title>
<%@ include file="js/import.jsp"%>
<script type="text/javascript" src="template/easy/test/js/jpush.js"></script>
<script type="text/javascript" src="template/easy/test/js/jpushDevice.js"></script>


</head>
<script type="text/javascript">


</script>
<body>
	<div class="easyui-layout" data-options="fit:true" style="overflow:auto;">
		<div style="width: 100%;margin: 0 auto;float: left;">
			<form id="easyuiForm">
				<div class="easyui-panel"
					data-options="border:false,cls:'easy-input-panel'">
					<div class="easy-input-line">
						<input id="controllerUrl" class="easyui-combobox" />
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
						<label class="textbox-label textbox-label-before" style="text-align: right; width: 85px; height: 26px; line-height: 26px;float: left;" for="_easyui_textbox_input3">data文本:</label>
						<textarea id="textID" rows=5 style="width:1000px" name=""  class="textarea easyui-validatebox" >regID=160a3797c832e03fbab</textarea>
					</div>
				</div>
			</form>
		</div>
		<div style="padding: 5px 20px;width: 280px;">
	        <span class="easyui-linkbutton" id="sendPush"
				onclick="sendPush()" data-options="iconCls:'icon-save'">推送</span>
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
