//是否已加载分配原因
var isLoadReason = false;

//点击编辑
function edit(ids,rows){
	if(!isLoadReason){
		$("#reasonid").jeasycombo({
			width:300,
			label:"分配原因:",
			labelWidth:60,
			multiple: false,//是否多选
			dlgwidth: 800,
			type : "list",//弹出的样式
			url : "adviserApp/queryAdviserReason.do?type=1",
		});
		isLoadReason = true;
	}
	
	var row = rows[0];
	var faccepted=0;
	$.ajax({
		type:'POST',
		url:"adviserApp/updateAdviserCheck.do?fid="+ids,
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			faccepted=data.faccepted;
		}
	});
	if(faccepted==1){
		$.messager.alert("提示","已分配的数据不能修改！","error");
		return false;
	}
	
	$("#editids").val(ids);
	$("#username").textbox("setValue",row.username);
	$("#fcount").numberbox("setValue","");
	$("#reasonid").jeasycombo("setvalue","");
	$("#edit_adviser").dialog("open");
}

//修改专属顾问数据
function adviserSave(){
    var ids = $("#editids").val();;
	var fcount = $("#fcount").val();
	var reasonid = $("#reasonid").jeasycombo("getvalue");
	var fsourceids =$("#fsourceids").val();
	var data = {};
	data["fid"] = ids;
	data["fcount"] = fcount;
	data["reasonid"] = reasonid;
	data["fsourceids"] = fsourceids;
	if(reasonid.ids==0 || reasonid.ids==""){
		$.messager.alert("提示","请选择分配原因！","error");
		return false;
	}
	if(fcount==0 || fcount==""){
		$.messager.alert("提示","请填写有效的分配数量！","error");
		return false;
	}
	
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"adviserApp/updateAdviserAS.do",
		data:{"jsonobj" : JSON.stringify(data)},
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			$.messager.progress("close");
			$.messager.alert("提示",data.msg,data.result==true?"info":"error");
			if(data.result){
				$("#edit_adviser").dialog("close");
				search();
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress("close");
			$.messager.alert("提示","修改异常！【"+textStatus+"】","error");
		}
	});
}

//删除
function del(ids,rows){
	for(var i=0;i < rows.length;i++){
		if(rows[i].faccepted=="已分配"){
			$.messager.alert("提示","已分配的数据不能删除！","error");
			return;
		}
	}
	$.messager.confirm('确认', '您确定要删除吗？', function(r){if (r){
		$.messager.progress({text : "正在处理，请稍候..."});
		var dat = {};
		dat["setids"]=ids;
		dat["type"]= "0";
		$.ajax({
			type:'POST',
			url:"adviserApp/deleteAdviserAllotSet.do",
			data:{"jsonobj":JSON.stringify(dat)},
			dataType : "json",
			async : false, // 同步 等待ajax返回值
			success:function(data){
				$.messager.progress("close");
				if(data.result){
					$.messager.alert("提示",data.msg,"info");
					search();
				}else{
					$.messager.alert("提示",data.msg,"error");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress("close");
				$.messager.alert("提示","删除异常！","error");
			}
		});
	}});
}

//分配
function allot(ids,rows){
	if(rows.length>1){
		$.messager.alert("提示","分配数据只能单选喔！","error");
		return;
	}
	var dat = {};
	dat["allotsetid"] = ids;
	dat["type"]= "1";
	$.messager.confirm('确认', '您确定要分配吗？', function(r){if (r){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"adviserApp/updateUnitUserAdviserAS.do",
			data:{"jsonobj":JSON.stringify(dat)},
			dataType : "json",
			async : false, // 同步 等待ajax返回值
			success:function(data){
				$.messager.progress("close");
				if(data.result){
					$.messager.alert("提示",data.msg,"info");
					search();
				}else{
					$.messager.alert("提示",data.msg,"error");
				}
				
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress("close");
				$.messager.alert("提示","分配异常！","error");
			}
		});
	}});
}