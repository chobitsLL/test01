<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>easyUI</title>
<%@ include file="js/import.jsp"%>
<script type="text/javascript" src="template/easy/test/js/jpush.js"></script>
<script type="text/javascript" src="template/easy/test/js/myclosure.js"></script>
<script type="text/javascript" src="template/easy/test/js/closureTest.js"></script>



</head>
<script type="text/javascript">


</script>
<body>
	<div class="easyui-layout" data-options="fit:true" style="overflow:auto;">
		<input class="easyui-textbox" id="ctext" value="11111111111"/>
		<input class="easyui-textbox" id="cdate" value=""/>
		<div style="width: 100%;margin: 0 auto;float: left;">
			<div style="padding: 5px 20px;width: 280px;">
		        <span class="easyui-linkbutton" id="sendPush"
					onclick="sendPush()" data-options="iconCls:'icon-save'">推送</span>
				<span class="easyui-linkbutton" id="btnReset"
							data-options="iconCls:'icon-search'">重置</span>
			</div>
		</div>
	</div>
</body>
</html>
