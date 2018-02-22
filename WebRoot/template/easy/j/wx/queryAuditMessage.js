//审核
function auditMessage(ids, type){//参数，获取fid,名字
	if (ids == null || ids == ""){
		$.messager.alert("提示", "请选择要审核的留言！", "warning");
		return;
	}
	window.messageids = ids;
	var userid = "${sessionScope.user.FID}";
	if(userid == ""){
		$.messager.alert("提示", "您还未登录，请您先登录后再操作！", "warning");
		return;
	} 
	if (type == 0){
		$('#auditPop').dialog().dialog("open");
	}else {
		var result = audit_Message(1);
		if (!result){
			return;
		}
	}
} 
function confirm(){
	var result = audit_Message(0);
	if (!result){
		 return false;
	}
}
function audit_Message(type){
   var gameID = $("#gameid").val();
   var reason = $("#reason").val();
   if ((type == 0) && (reason == null || reason == "")){
	 	$.messager.alert("提示", "请输入原因！", "warning");
		return false;
   }
   $.messager.progress({text : "正在处理，请稍候..."});
   $.ajax({
	   url:'game/auditMessage.do?',
	   type:"GET",
	   data:{
		   "reason": reason,
		   "ids":window.messageids,
		   "gameID":gameID,
		   "auditType":type,
	   },
	   success:function(data){
		   $.messager.progress("close");//隐藏加载中
		   if(data.result){
			   $.messager.confirm('确认','操作成功！',function(r){ 
					if(r){
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","game/queryAuditMessage.do?gameid="+gameid);
					   if (type == 0){
						   $('#auditPop').dialog().dialog("open");
					   }
					}
			   });
		   }else {
			   if (type == 0){
				   $('#auditPop').dialog().dialog("open");
			   }
			   $.messager.alert("提示", data.msg, "warning")
		   }
	   },error:function(data){
		   $.messager.progress("close");//隐藏加载中
		   $.messager.alert("提示", "请求出错！", "warning");
	   }
   });
}