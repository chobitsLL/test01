<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div style="display: none;">
	<a>隐藏域-存储一些值</a>
	<input type="hidden" id="nav-userid" value="${sessionScope.user.FID}" />
	<input type="hidden" id="nav-username" value="${sessionScope.user.FNickName}" />
	<input type="hidden" id="fileServerPath" value="${applicationScope.fileServerPath}" />
</div>
<div class="easy-theme" style="display: none;">
	<div class="easy-theme-close"><a href="javascript:Util.hideTheme()">&times;</a></div>
	<div class="easy-theme-body">
		<span title="默认(蓝)" class="easy-theme-default" onclick="Util.changeTheme('default')"></span>
		<span title="黑" class="easy-theme-black" onclick="Util.changeTheme('black')"></span>
		<span title="绿" class="easy-theme-green" onclick="Util.changeTheme('green')"></span>
	</div>
</div>
<!-- 顶部导航栏   -->
<div data-options="region:'north'" class="nav-panel">
	<span class="nav-logo"></span>
	<span class="nav-info">
		<a class="jboot-nav-link" href="menu/center.do?pfid=1">O2O平台</a>&#12288;
		<a class="jboot-nav-link" href="menu/center.do?pfid=2">统采平台</a>&#12288;
		<!-- <a class="jboot-nav-link" href="menu/change.do?template=red">返回旧版Bootstrap</a>&#12288;&#12288; -->
		<a class="jboot-nav-link" <c:if test="${empty sessionScope.user.FID}">style="display: none;"</c:if> href="menu/center.do" style="margin: 0 5px;">用户 ${sessionScope.user.FNickName}，您好！</a>
		<a class="jboot-nav-link" <c:if test="${empty sessionScope.user.FID}">style="display: none;"</c:if> href="javascript:Util.navLogout();">【退出】</a>
		<span id="localtime" class="jboot-nav-name">2017年03月02日&#12288;星期三</span>&#12288;&#12288;&#12288;&#12288;
		<a class="jboot-nav-link" href="javascript:Util.showTheme()" style="float:right;">设置-换肤</a>
	</span>
</div>

<!-- 左侧菜单栏   -->
<c:set var="pfid" value="platform_${defaultPlatform}" />
<input type="hidden" value="${defaultPlatform}" id="platform">
<div class="easy-menu" data-options="region:'west'" style="width:150px;">
	<div class="easyui-accordion" data-options="fit:true,selected:false,animate:false,onSelect:menuSelect,onUnselect:menuUnselect" style="border: none;">
		<c:forEach var="menu" items="${sessionScope[pfid].mainmenus}">
			<c:if test="${menu.FID == 100}">
			<div title="企业管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].entermenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 200}">
			<div title="人员管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].managermenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 300}">
			<div title="店铺管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].storemenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 400}">
			<div title="商品管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].stocksmenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 500}">
			<div title="订单管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].ordermenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 600}">
			<div title="售后协同" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].mentmenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 800}">
			<div title="微信推广" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].chatmenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 900}">
			<div title="统计管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].activity}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 1000}">
			<div title="标签管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].tagmenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 1100}">
			<div title="会务管理" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].mentmenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
			<c:if test="${menu.FID == 1200}">
			<div title="专属顾问" data-options="iconCls:'menu-rightarrow'" style="overflow:auto;">
				<c:forEach var="menu" items="${sessionScope[pfid].advisermenus}">
					<div class="rightNaviDIV"><a href="${menu.FURL}" target="_blank">${menu.FName}</a></div>
				 </c:forEach>
			</div>
			</c:if>
		</c:forEach>	    
	</div>
</div>