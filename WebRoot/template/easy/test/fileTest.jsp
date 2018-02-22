<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>fileTest</title>
<%@ include file="js/import.jsp"%>
<script type="text/javascript" src="template/easy/test/js/jpush.js"></script>
<script type="text/javascript" src="js/jquery/ajaxfileupload.js"></script>
<script type="text/javascript" src="template/easy/test/js/fileTest.js"></script>


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
						<a href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-upload" plain="true" onclick="ajaxFileUpload()" >上传Logo</a>
						<input id="fileImage" type="file" style="display:none;" name="fileImage" accept="image/*" />
					</div>
					<div class="easy-input-line">
						    <a href="download/ResponseEntity.do" >下载</a>  
					</div>
						
					<div class="easy-input-line">
					</div>
					
				</div>
				<div data-options="region:'east',split:true" title="data说明" style="width:500px;">
					<div id="dataex" style="padding: 10px">
						<input class="easyui-textbox" />
					</div>
				</div>
			</div>
				
			</form>
			<form method='post' enctype='multipart/form-data' 
							action="upload/multipleFile.do">
							<input name='fileImage' type='file' multiple='multiple' />
							<input type="submit" >
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
		
	</div>
</body>
</html>
