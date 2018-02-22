//点击新增按钮
function addNew(){
	var fname=$("#Fname").val();
	var fremark=$("#Fremark").val();
	var date={};
	date["fname"]=fname;
	date["fremark"]=fremark;
	var dat={
		jsonobj:JSON.stringify(date)
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	//添加
	$.ajax({
		type:"POST",
		url:"mater/insertmaterialgroup.do",
		dataType:"json",
		data:dat,
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$('#dialogid').dialog('close')
				$.messager.alert("提示", "添加成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","mater/selectmaterialgroup.do");
			}else{
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}
//点击修改按钮
function editMg(){
	var row = $("#easy_table").datagrid("getSelected");
	var fid=row.fid;
	var fname=$("#FName").val();
	var fremark=$("#FRemark").val();
	var date={};
	date["fid"]=fid;
	date["fname"]=fname;
	date["fremark"]=fremark;
	var dat={
		jsonobj:JSON.stringify(date)
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"mater/updatematerialgroup.do",
		dataType : "json",
		data:dat,
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$('#updialogid').dialog('close')
				$.messager.alert("提示", "修改成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","mater/selectmaterialgroup.do");
			}else{
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(data){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}
//删除事件
function editDele(){
	var row = $("#easy_table").datagrid("getSelected");
	if(row==null){
		$.messager.alert("提示", "请选择一条数据", "warning");
	}
	var fid=row.fid;
 	var date={};
 	date["fid"]=fid;
 	var dat={
			jsonobj:JSON.stringify(date)
	};
 	$.messager.progress({text : "正在处理，请稍候..."});
 	$.ajax({
		type:"POST",
		url:"mater/deletematerialgroup.do",
		dataType : "json",
		data:dat,
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", "删除成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","mater/selectmaterialgroup.do");
			}else{
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}