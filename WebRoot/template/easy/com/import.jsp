<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"+ request.getServerName() + ":" + request.getServerPort()+ path + "/";
	//主题
	String mytheme = "default";
    Cookie cookies[]=request.getCookies();
    for(int i = 0;i<cookies.length;i++){
    	if(cookies[i].getName().equals("mytheme")){
    		mytheme = cookies[i].getValue();
    		if(mytheme.equals("")){
    			mytheme = "default";
    		}
    		break;
    	}
    }
%>
<base href="<%=basePath%>">
<meta http-equiv=X-UA-Compatible content="IE=edge,chrome=1">
<meta content=always name=referrer>
<meta name="renderer" content="webkit">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<link rel="icon" href="http://jimg.caishen.cn/cdn/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="http://jimg.caishen.cn/cdn/favicon.ico" type="image/x-icon" />
<!-- 
<link rel="stylesheet" type="text/css" href="http://jimg.caishen.cn/j/jquery-easyui-1.5.1/themes/default/easyui.css">
<link rel="stylesheet" type="text/css" href="http://jimg.caishen.cn/j/jquery-easyui-1.5.1/themes/icon-1.3.css">
 -->
<link rel="stylesheet" type="text/css" href="template/easy/test/js/easyui.css">
<link rel="stylesheet" type="text/css" href="template/easy/test/js/icon-1.3.css">
 
<link rel="stylesheet" type="text/css" href="template/easy/j/com/easy.css">
<!-- 自定义主题 -->
<link rel="stylesheet" type="text/css" href="template/easy/j/com/easy_default.css">
<!-- HTML5 Shim 和 Respond.js 用于让 IE8 支持 HTML5元素和媒体查询 -->
<!-- 注意： 如果通过 file://  引入 Respond.js 文件，则该文件无法起效果 -->
<!--[if lt IE 9]>
   <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
   <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<!-- 
<script type="text/javascript" src="http://jimg.caishen.cn/j/jquery-easyui-1.5.1/jquery.min.js"></script>
<script type="text/javascript" src="http://jimg.caishen.cn/j/jquery-easyui-1.5.1/jquery.easyui.dayo.js"></script>
 -->
<script type="text/javascript" src="template/easy/test/js/jquery.min.js"></script>
<script type="text/javascript" src="template/easy/test/js/jquery.easyui.dayo.js"></script>
 
<!-- <script type="text/javascript" src="http://jimg.caishen.cn/j/jquery-easyui-1.5.1/locale/easyui-lang-zh_CN.js"></script> -->
<script type="text/javascript" src="template/easy/j/com/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="template/easy/j/com/jeasyui.js"></script>
<script type="text/javascript" src="template/easy/j/com/easy.js"></script>
<%-- <script type="text/javascript" src="http://dayotest.oss-cn-hangzhou.aliyuncs.com/customer/${sessionScope.user.FColumns}.js"></script> --%>
