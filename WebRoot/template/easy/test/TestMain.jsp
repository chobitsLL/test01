<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>easyUI</title>
<%@ include file="js/import.jsp"%>
<!-- <script type="text/javascript" src="template/easy/test/js/TestApp.js"></script> -->
<style type="text/css">
	.nav-panel {
	    background-image: url("http://1img.caishen.cn/rich/994f8ab7624146c9e43e9e03493863f7c1606de813a38fe005dd9ae2c372f09f202cefb9.jpg");
	    border-color: rgb(68, 82, 90) !important;
	}
</style>

</head>
<script type="text/javascript">
	//新增选项卡
	function addTab(title, url, id) {
		if ($('#jpushTabs').tabs('exists', title)) {
			$('#jpushTabs').tabs('select', title);
		} else {
			var content = '<iframe id = "' + id
					+ '" scrolling="auto" frameborder="0" src="' + url
					+ '" style="width:100%;height:100%;border:none;"></iframe>';
			$('#jpushTabs').tabs('add', {
				title : title,
				content : content,
				closable : true,
				onAdd : function() {
					alert();
				}
			});
		}
	}
</script>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'center'">
			<div class="easyui-layout " data-options="fit:true">
				<div name="res_menu_navigation"
					data-options="region:'west',split:true,title:'导航菜单',border:false"
					style="width: 150px; overflow: scroll; overflow-x: hidden; overflow-y: hidden;">
					<div class="easyui-accordion" data-options="fit:true">
						<div name="res_menu_permissionManagement" title="Jpush"
							align="left" data-options="iconCls:'icon-ok'"
							style="padding: 2px;">
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('Jpush推送','template/easy/test/TestApp.jsp')">Jpush推送</a><br>
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('Jpush属性管理','template/easy/test/jpushDevice.jsp')">Jpush属性管理</a><br>
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('订单接口测试','template/easy/test/orderTest.jsp')">订单接口测试</a><br>
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('js测试','template/easy/test/closureTest.jsp')">js测试</a><br>
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('mybatis测试','index.jsp')">mybatis测试</a><br>
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('file测试','template/easy/test/fileTest.jsp')">file测试</a><br>
							<a name="" class="easyui-linkbutton"
								data-options="iconCls:'icon-emp', plain:true"
								style="width: 100%; text-align: left;"
								onclick="addTab('后台功能测试','template/easy/test/javaTest.jsp')">后台功能测试</a><br>
						</div>
					</div>
				</div>
				<div data-options="region:'center',border:false,iconCls:'icon-ok'" style="overflow:hidden">
					<div id="jpushTabs" class="easyui-tabs" 
						 data-options="fit:true">

					</div>
				</div>
			</div>
		</div>

	</div>
</body>
</html>



