<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>javaTest</title>
<%@ include file="js/import.jsp"%>
<script type="text/javascript" src="js/jquery/ajaxfileupload.js"></script>
<script type="text/javascript" src="template/easy/test/js/test.js"></script>


</head>
<script type="text/javascript">


</script>
<body>
	<div class="easyui-layout" data-options="fit:true" style="overflow:auto;">
		<div style="width: 100%;margin: 0 auto;float: left;">
			<div style="padding: 5px 20px;width: 280px;">
		        <span class="easyui-linkbutton" id="sendPush"
					onclick="aopTest()" data-options="iconCls:'icon-save'">测试</span>
				<span class="easyui-linkbutton" id="sendPush"
						onclick="userClick()" data-options="iconCls:'icon-save'">测试user</span>
				
			</div>
		</div>
	</div>
</body>
</html>
