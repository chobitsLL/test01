function confirm(){
	var remark=$("#remark").val();
	if(remark.length>16){
		$.messager.alert("提示", "修改备注最多输入16个字符 ！", "warning");
		$("#remark").textbox("setValue","");
		return false;
	}
	var row = $("#easy_table").datagrid("getSelected");
	var officialid = row.fid;
    var remark = $('#remark').val();
	var data={};
	data["fid"]=officialid;
	data["fname"]=remark;
	var dat={
		jsonobj:JSON.stringify(data)
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"oa/updateRemarksName.do",
		dataType : "json",
		data:dat,
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result) {
				$.messager.alert("提示", "操作成功！", "warning");
				$('#updialogid').dialog('close');
	  			$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	  			$("#easy_table").datagrid("load","oa/officialAccountAdministration.do");
			}else{
				$.messager.alert("提示", "修改失败！", "warning");
				$('#updialogid').dialog('close');
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}
/**
 * 设为主公众号
 * @param fid
 * @param funitid
 */
function asMainOA(){
	var row = $("#easy_table").datagrid("getSelected");
	if(row==null){
		$.messager.alert("提示", "请选择一条数据", "warning");
		return false;
	}
	var fid = row.fid;
	var funitid = row.funitid;
	$.messager.progress({text : "正在处理，请稍候..."});
	//执行查询
	$.ajax({
		url:'oa/asMainOA.do',
		type:'post',
		async:false,
		dataType:'json',
		data:{fid:fid,funitid:funitid},
		success:function(data) {
			$.messager.progress("close");//隐藏加载中
			if(data.loginFlag){
				if(data.executeFlag){
					$.messager.alert("提示", "操作成功！", "warning");
		  			$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		  			$("#easy_table").datagrid("load","oa/officialAccountAdministration.do");
				}else{
					$.messager.alert("提示", "操作失败，请稍后重试！", "warning");
				}
			}else{
				$.messager.alert("提示", "登录超时，请重新登录后再操作！", "warning");
			}
		},
		error:function(e) {
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "操作失败，请稍后重试！", "warning");
		}
	});
}