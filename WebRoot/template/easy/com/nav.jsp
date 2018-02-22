<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="jboot-nav" style="display: none;">
	<div class="jboot-nav-body">
		<a class="jboot-nav-link" href="menu/center.do">返回财小神首页</a>
		<span class="jboot-nav-name">|</span>
		<span class="jboot-nav-name">欢迎您</span>
		<a class="jboot-nav-link" <c:if test="${empty sessionScope.user.FID}">style="display: none;"</c:if> href="menu/center.do" style="margin: 0 5px;">${sessionScope.user.FNickName}</a>
		<a class="jboot-nav-link" <c:if test="${empty sessionScope.user.FID}">style="display: none;"</c:if> href="javascript:navLogout();">【退出】</a>
		<a class="jboot-nav-link" href="user/userInfo.do" style="float:right;">修改密码</a>
		<a target="_blank" class="jboot-nav-link" style="float:right;" href="template/red/help/questionAnswer.jsp">帮助中心</a>
		<a class="jboot-nav-link" style="float:right;" href="menu/center.do?pfid=1">O2O平台</a>
		<a class="jboot-nav-link" style="float:right;" href="menu/center.do?pfid=2">统采平台</a>
	</div>	
    <div class="hide">
   	   <a>隐藏域-存储一些值</a>
   	   <input type="hidden" id="nav-userid" value="${sessionScope.user.FID}" />
   	   <input type="hidden" id="nav-username" value="${sessionScope.user.FNickName}" />
    </div>
</div>

<div data-options="region:'north'" class="nav-panel">
	<span class="nav-logo"></span>
	<span class="nav-info">
		<a class="jboot-nav-link" <c:if test="${empty sessionScope.user.FID}">style="display: none;"</c:if> href="menu/center.do" style="margin: 0 5px;">${sessionScope.user.FNickName}</a>
		<a class="jboot-nav-link" <c:if test="${empty sessionScope.user.FID}">style="display: none;"</c:if> href="javascript:navLogout();">【退出】</a>
		<span class="jboot-nav-name">用户888，您好！</span>&#12288;&#12288;&#12288;&#12288;
		<span class="jboot-nav-name">2017年03月02日&#12288;星期三</span>&#12288;&#12288;&#12288;&#12288;
		<a class="jboot-nav-link" href="javascript:" style="float:right;">设置-换肤</a>
	</span>
</div>