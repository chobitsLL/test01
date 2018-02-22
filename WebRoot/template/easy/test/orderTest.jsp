<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>easyUI</title>
<%@ include file="js/import.jsp"%>
<script type="text/javascript" src="template/easy/test/js/jpush.js"></script>
<script type="text/javascript" src="template/easy/test/js/orderTest.js"></script>


</head>
<script type="text/javascript">


</script>
<body>
	<div class="easyui-layout" data-options="fit:true" style="overflow:auto;">
		<div style="width: 100%;margin: 0 auto;float: left;">
			<form id="easyuiForm">
			<div class="easyui-layout" style="width:auto;height:500px;">
				<div class="easyui-panel"
					data-options="region:'center',border:false,cls:'easy-input-panel'">
					<div class="easy-input-line">
						<input id="telNo" class="easyui-textbox" data-options="'label':'telNo:','labelWidth':50,'width':230,value:'15210436828'" />
					</div>
					<div class="easy-input-line">
						<input id="pwd" class="easyui-textbox" data-options="'label':'pwd:','labelWidth':50,'width':230,value:'123456'" />
					</div>
					<div class="easy-input-line">
						<input id="tokenID" class="easyui-textbox" data-options="'label':'token','labelWidth':50,'width':230" />
					</div>
					<div class="easy-input-line">
						<span class="easyui-linkbutton" id="sendPush"
							onclick="loginClick()" data-options="">登录</span>
						<span class="easyui-linkbutton" id="sendPush"
							onclick="logout()" data-options="">注销</span>
					</div>
					<div class="easy-input-line">
						<input id="jeasyupload"/>
						<input type="hidden" id="certurl" name="certurl">
					</div>
					<div class="easy-input-line">
						<input type="checkbox" name='checkbox' />
					</div>
					<div class="easy-input-line">
						<input id="restful" class="easyui-combobox" />
					</div>
					<div class="easy-input-line">
						<input id="controller" class="easyui-combobox" />
					</div>
					<div class="easy-input-line">
						<input id="controllerUrl" class="easyui-combobox" />
					</div>
					<div class="easy-input-line">
						<label class="textbox-label textbox-label-before" style="text-align: right; width: 85px; height: 26px; line-height: 26px;float: left;" for="_easyui_textbox_input3">data文本:</label>
						<textarea id="textID" rows=5 style="width:600px" name=""  
							class="textarea easyui-validatebox" 
							>page=1&state=7&orderid=3744</textarea>
					</div>
				</div>
				<div data-options="region:'east',split:true" title="data说明" style="width:500px;">
					<div id="dataex" style="padding: 10px">
						<input class="easyui-textbox" />
					</div>
				</div>
			</div>
				
			</form>
		</div>
		<div style="padding: 5px 20px;width: 280px;">
	        <span class="easyui-linkbutton" id="sendPush"
				onclick="sendPush()" data-options="iconCls:'icon-save'">推送</span>
	        <span class="easyui-linkbutton" id="sendPush"
				onclick="testClick()" data-options="iconCls:'icon-save'">测试</span>
	        <span class="easyui-linkbutton" id="sendPush"
				onclick="testClick1()" data-options="iconCls:'icon-save'">测试1</span>
			<span class="easyui-linkbutton" id="btnReset"
						data-options="iconCls:'icon-search'">重置</span>
			<a href='restful/AppOrder/MOfixInfo.do?orderid=4044&type=0'>电子保单</a>
		</div>
		<div id="divData" style="padding: 5px 10px">
			<label id="labelID">
			
			</label>
		</div>
		<form method='post' enctype='multipart/form-data' 
			action="/dayoshop/upload_richtext_multiple_json.do">
							<input name='imgFile' type='file' multiple='multiple' />
							<input type="submit" >
						</form>
	</div>
</body>
</html>
