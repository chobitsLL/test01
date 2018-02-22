<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<title>jQuery实现节点克隆、替换和互换</title>  
<%@ include file="../test/js/import.jsp"%>
<script type="text/javascript">  
    $(function (){  
       //克隆结点  
        //在计算机后克隆一个北京节点  
        //先给所有的li添加一个点击事件  
        $("li").click(function (){  
            alert($(this).text());  
        });   
    });  
    
    function butTest(){
    	
        //注意：  
        //1、clone(true)可以获取到被克隆的节点的时间，而clone()没有  
        //2、注意修改被克隆节点的id属性  
        $("#beijing").clone(true).attr("id","bj").insertAfter($("#computer"));  
          
        //节点替换  
        //替换#city 节点的第一个li子节点  注：不常用
        $("<li>尚硅谷</li>").replaceAll($("#city li:first"));  
        //替换#city 节点的第三个li子节点  注：常用
        $("#city li:eq(2)").replaceWith($("<li>东京</li>"));  
          
        //节点的互换  
        //广州节点和印刷工程节点的互换  
        var $guangzhou2 = $("#guangzhou").clone(true);  
        var $print2 = $("#print").clone(true);  
        //alert("a");  
//         var $print = $("#print").replaceWith($guangzhou2);  
        //alert(2);  
        $("#print").replaceWith($guangzhou2);  
        $("#guangzhou").replaceWith($print2);  
    }
</script>  
</head>  
<body>
	<div>
		<input type="button" value="测试" onclick="butTest()" />
	</div>  
    <p>选择你所喜欢的城市？</p>  
    <ul id="city">  
        <li>哈尔滨</li>  
        <li id="beijing">北京</li>  
        <li>上海</li>  
        <li id="guangzhou">广州</li>  
    </ul>  
    <p>选择你所喜欢的专业？</p>  
    <ul id="major">  
        <li id="computer">计算机</li>  
        <li>会计</li>  
        <li>管理学</li>  
        <li id="print">印刷工程</li>  
    </ul>  
</body>  
</html>  