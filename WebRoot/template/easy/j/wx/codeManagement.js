//复制链接方法
function copyUrl(){
	var row = $("#easy_table").datagrid("getSelected");
	if(row==null){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return false;
	}
	$("#dialogid").dialog().dialog("open");
	$("#linkUrl").empty();
	var fqrcodeurl=row.fqrcodeurl;
	var url = $("#pathid").val()+"select/qr.do?content="+fqrcodeurl+"&w=140";
	$("#linkUrl").html(url);
}

//预览二维码方法
function selectCodeUrl(){
	var row = $("#easy_table").datagrid("getSelected");
	if(row==null){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return false;
	}
	$("#selectCode").dialog().dialog("open");
	$("#img").attr("src","");
	var fqrcodeurl=row.fqrcodeurl;
	$("#img").attr("src","select/qr.do?content="+fqrcodeurl+"&w=140");
}