<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>


<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0" />
<meta http-equiv="Cache-Control" content="no-siteapp" />


<link href="../css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="../css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="../lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="../lib/Hui-iconfont/1.0.1/iconfont.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css"/>
<link rel="stylesheet" href="../css/bootstrapValidator.min.css"/>


  <link rel="stylesheet" href="../css/zTree/demo.css" type="text/css">
  <link rel="stylesheet" href="../css/zTree/metroStyle/metroStyle.css" type="text/css">
    


<!-- https://www.cnblogs.com/sxdcgaq8080/p/6085456.html -->

<title>添加角色</title>
</head>
<body style="width: 70%;">
<div class="pd-20">
  <form action="" method="post" class="form form-horizontal" id="form-role-add">
    <div class="row cl">
            <label class="form-label col-2"><span class="c-red">*</span>角色名称：</label>
            <div class="formControls col-10">
                <input type="text" class="input-text"  placeholder="" id="roleName" name="roleName" datatype="*4-16" nullmsg="角色名称不能为空">
            </div>
        </div>
        <div class="row cl">
            <label class="form-label col-2">备注：</label>
            <div class="formControls col-10">
                <input type="text" class="input-text" placeholder="" id="" name="roleCre">
            </div>
        </div>
        
        <div class="content_wrap  row cl">
            <div class="zTreeDemoBackground"  >
                <button type="button" class="btn btn-success radius  fen"  ><i class="icon-ok"></i> 分配权限</button>
                <button type="button" class="btn btn-default radius  yin"  ><i class="icon-ok"></i> 隐藏权限</button>
                <ul id="treeDemo" class="ztree" style="display:none;"></ul>
            </div>
        </div>
        <div class="row cl">
            <div class="col-10 col-offset-8">
                <button type="button" class="btn btn-success radius" id="roleAdd" ><i class="icon-ok"></i> 添加</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="reset" class="btn btn-success radius"><i class="icon-ok"></i>清空</button>
            </div>
        </div>
  </form>
</div>
<script type="text/javascript" src="../lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="../lib/Validform/5.3.2/Validform.min.js"></script> 
<script type="text/javascript" src="../lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="../lib/layer/1.9.3/layer.js"></script>
<script type="text/javascript" src="../js/H-ui.js"></script> 
<script type="text/javascript" src="../js/H-ui.admin.js"></script>
<script type="text/javascript" src="../bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/bootstrapValidator.min.js"></script>
<script type="text/javascript" src="../js/systeminfo/role/roleadd.js"></script>

<script type="text/javascript" src="../js/zTree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="../js/zTree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="../js/zTree/jquery.ztree.exedit.js"></script>
<script type="text/javascript" src="../js/systeminfo/role/zTreeUse.js"></script>
</body>
</html>