function queryPricePolicy(type){
	$("#jboottable-pricePolicy").jboottable("search");
}

//前往更新页面
function toUpdate(ids,rows){
	var isStop=rows[0].fstopped;
	if(isStop == 1){
		$.messager.alert("提示","数据已终止！","error");
		return;
	}
	var isAccepted = rows[0].faccepted;
	if(isAccepted == 1){
		$.messager.alert("提示","数据已有效！","error");
		return;
	}
	window.open("facPricePolicy/updatePricePolicy.do?type=2&fid="+ids);
}
//是否有已终止
function isStop(rows){
	for ( var i = 0; i < rows.length; i++) {
		if(rows[i].fstopped == '1'){
			return "stoped";
		}
	}
	return true;
}
//是否有未终止
function isUnStop(rows){
	for ( var i = 0; i < rows.length; i++) {
		if(rows[i].fstopped == '0'){
			return "unstoped";
		}
	}
	return true;
}
//删除政策
function toDelete(ids,rows){
	var flag = isUnStop(rows);
	var fflag = isAccepted(rows)
	if(fflag == 'accpeted'){
		$.messager.alert("提示","数据中包含已有效的数据，请重新选择！","error");
	}else{
		$.messager.confirm("提示","您确认要删除选中的政策吗？", function(r) {
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type : 'post',
					url : 'facPricePolicy/deletePolicy.do',
					data:{
						ids:ids
					},
					dataType : "json",
					success : function(data){
						$.messager.progress("close");//隐藏加载
						if(data.result==false){
							$.messager.alert("提示",data.msg,"error");
						}else if(data.result == true){
							$.messager.alert("提示",data.msg,"info",function(){
								   $("#easy_table").datagrid('reload');
							    });
						}else{
							$.messager.alert("提示","未知错误！","error");
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载
						 $.messager.alert("提示","系统错误！","error");
					}
				});
			}
			
		});
	}
}
//终止政策
function toStop(ids,rows){
	var flag = isStop(rows);
	var fflag = isUnAccepted(rows);
	if(fflag == 'unaccpeted'){
		$.messager.alert("提示","数据中包含未有效的数据，请重新选择！","error");
	}else if(flag == 'stoped'){
		$.messager.alert("提示","数据中包含已终止的数据，请重新选择！","error");
	}else if(flag == true){
		$.messager.confirm("确定","您确认要终止选中的政策吗？",function(r){
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type : 'post',
					url : 'facPricePolicy/stopPolicy.do',
					data:{
						ids:ids
					},
					dataType : "json",
					success : function(data){
						$.messager.progress("close");//隐藏加载
						if(data.result==false){
							$.messager.alert("提示",data.msg,"error");
						}else if(data.result == true){
							$.messager.alert("提示",data.msg,"info",function(){
								   $("#easy_table").datagrid('reload');
							    });
						}else{
							$.messager.alert("提示","未知错误！","error");
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载
						$.messager.alert("提示","系统错误！","error");
					}
				});
			}
			
		});
	}
}

//是否有已有效
function isAccepted(rows){
	for ( var i = 0; i < rows.length; i++) {
		if(rows[i].faccepted == '1'){
			return "accpeted";
		}
	}
	return true;
}
//是否有未有效
function isUnAccepted(rows){
	for ( var i = 0; i < rows.length; i++) {
		if(rows[i].faccepted == '0'){
			return "unaccpeted";
		}
	}
	return true;
}
//有效
function toAccepted(ids,rows){
	var flag = isAccepted(rows);
	if(flag == true){
		$.messager.confirm("确定","您确认要有效选中的政策吗？", function(r) {
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type : 'post',
					url : 'facPricePolicy/acceptedPolicy.do',
					data:{
						ids:ids
					},
					dataType : "json",
					success : function(data){
						$.messager.progress("close");//隐藏加载
						if(data.result==false){
							$.messager.alert("提示",data.msg,"error");
						}else if(data.result == true){
							$.messager.alert("提示",data.msg,"info",function(){
								   $("#easy_table").datagrid('reload');
							    });
						}else{
							$.messager.alert("提示","未知错误！","error");
						}
					},error:function(){
						 $.messager.progress("close");//隐藏加载
						 $.messager.alert("提示","系统错误！","error");
					}
				});
			}
			
		});
	}else if(flag == 'accpeted'){
		$.messager.alert("提示","数据中包含已有效的数据，请重新选择！","error");
	}
}

function toNoPolicy(){
	window.open("facPricePolicy/factoryStockNoPolicy.do");
}