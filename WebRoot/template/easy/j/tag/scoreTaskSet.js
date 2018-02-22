
//查询
function search(){
	if(dateVerified()){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","DMScoreSet/scoreTaskByPage.do");
	$(".easy-dlg").dialog("destroy");//关闭弹出框
	}
};

/**
 * 打开添加积分任务页面
 */
function openAddPage(){
	var type = $("#ftype").val();
	if(type==0){
		Util.dialog("新增DM单积分任务","DMScoreSet/addScoreTask.do",700,600);
	}else{
		Util.dialog("新增DM单积分任务","DMScoreSet/addBonusTask.do",700,600);
	}
}

/**
 * 打开编辑积分任务窗口
 */
function openEditPage(id,rows){
	var row = rows[0];
	var length = id.split(",").length;
	if(length > 1){
		$.messager.alert("提示","只能选择一条记录！", "warning");
		return;
	}
	var status = row.faccepted;
	if(status == 1 && row.fstopped ==0){
		$.messager.alert("提示","任务已经有效，不能编辑！", "warning");
		return;
	}
	var fstopped = row.fstopped;
	if(fstopped == 1){
		$.messager.alert("提示","任务已经终止，不能编辑！", "warning");
		return;
	}
	var type = $("#ftype").val();
	if(type==0){
		Util.dialog("修改DM单积分任务","DMScoreSet/editScoreTask.do?fid=" + id,700,500);
	}else{
		Util.dialog("修改DM单积分任务","DMScoreSet/editBonusTask.do?fid=" + id,700,500);
	}
}

/**
 * 删除积分任务
 */
function deleteTask(ids){
	//只有未有效的任务可以删除
	var flag = true;
	$("#jboottable-scoreTaskSet tbody tr[class='jboot-active']").each(function(){
		var status = $(this).find("td:eq(8)").text();
		if(status == "是" || status == "终止"){
			$.messager.alert("提示","只能删除未有效的任务，请检查！", "warning");
			flag = false;
			return false;
		};
	});
	if(!flag) return;
	
	var length = ids.split(",").length;
	$.messager.alert("提示","选中" + length + "条记录，确定删除吗?", "confirm", function(){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			url:'DMScoreSet/delete.do',
			type:'post',
			async:false,
			dataType:'json',
			data:{strFids:ids},
			success:function(data) {
				$.messager.progress("close");
				if(data.loginFlag){
					if(data.executeFlag){
						$.messager.alert("提示","选中记录操作成功！");
					}else{
						$.messager.alert("提示","操作成功" + data.exeSuccNum + "条，操作失败" + data.exeErrNum + "条!");
					}
					$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
					$("#easy_table").datagrid("load","DMScoreSet/scoreTaskByPage.do");
				}else{
					$.messager.alert("提示","登录超时，请重新登录后再操作！");
				}
			},
			error:function(e) {
				$.messager.progress("close");
				$.messager.alert("提示","操作失败，请稍后重试！");
			}
		});
	});
}

/**
 * 将任务设为有效
 */
function toAccepted(ids){
	//检查是否包含已经有效或终止的数据
	var flag = true;
	var id = ids.split(",");
	for (var i = 0; i < id.length; i++) {
		var stop = $("#valid"+id[i]+"").attr("fstopped");
		var accept = $("#valid"+id[i]+"").attr("faccepted");
		if(stop=="1" ||(stop=="" && accept=="1")){//已终止状态
			$.messager.alert("提示","选中的记录包含有效或被终止数据，请检查！", "warning");
			flag = false;
			return false;
		}
	}
	if(!flag) return;
	var length = ids.split(",").length;
	$.messager.alert("提示","选中" + length + "条记录，确定执行该操作吗?", "confirm", function(){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			url:'DMScoreSet/toAccepted.do',
			type:'post',
			async:false,
			dataType:'json',
			data:{strFids:ids},
			success:function(data) {
				$.messager.progress("close");
				if(data.dmInfoFlag){
					if(data.loginFlag){
						if(data.isExist){
							if(length == 1){
								$.messager.alert("提示","同一公众号同一DM单只能有一个有效积分任务");
							}else{
								$.messager.alert("提示","操作成功" + data.exeSuccNum + "条，操作失败" + data.exeErrNum + "条!</br>原因：同一公众号同一DM单只能有一个有效积分任务！");
							}
						}else{
							if(data.executeFlag){
								$.messager.alert("提示","选中记录操作成功！");
							}else{
								$.messager.alert("提示","操作成功" + data.exeSuccNum + "条，操作失败" + data.exeErrNum + "条!");
							}
						}
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","DMScoreSet/scoreTaskByPage.do");
					}else{
						$.messager.alert("提示","登录超时，请重新登录后再操作！");
					}
				}else{
					$.messager.alert("提示","当前DM单已经存在有效数据，一个DM单只能加入一种类型的任务，要么积分、要么佣金!");
				}
			},
			error:function(e) {
				$.messager.progress("close");
				$.messager.alert("提示","操作失败，请稍后重试！");
			}
		});
	});
}

/**
 * 终止有效的任务
 */
function toStopped(ids){
	//检查是否包含未有效或已终止的数据
	var flag = true;
	var id = ids.split(",");
	for (var i = 0; i < id.length; i++) {
		var stop = $("#valid"+id[i]+"").attr("fstopped");
		var accept = $("#valid"+id[i]+"").attr("faccepted");
		if(accept=="" ||stop=="1"){//已终止状态
			$.messager.alert("提示","选中的记录包含未有效或已终止的数据，请检查！", "warning");
			flag = false;
			return false;
		}
	}
	if(!flag) return;
	var length = ids.split(",").length;
	$.messager.alert("提示","选中" + length + "条记录，确定终止吗?", "confirm", function(){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			url:'DMScoreSet/toStopped.do',
			type:'post',
			async:false,
			dataType:'json',
			data:{strFids:ids},
			success:function(data) {
				$.messager.progress("close");
				if(data.loginFlag){
					if(data.executeFlag){
						$.messager.alert("提示","选中记录操作成功！");
					}else{
						$.messager.alert("提示","操作成功" + data.exeSuccNum + "条，操作失败" + data.exeErrNum + "条!");
					}
					$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
					$("#easy_table").datagrid("load","DMScoreSet/scoreTaskByPage.do");
				}else{
					$.messager.alert("提示","登录超时，请重新登录后再操作！");
				}
			},
			error:function(e) {
				$.messager.progress("close");
				$.messager.alert("提示","操作失败，请稍后重试！");
			}
		});
	});
}

/**
 * 开始日期和结束日期不能同时为空
 */
function dateVerified(){
	var startDate = $("#startDate").val();
	var endDate = $("#endDate").val();
	if(startDate != "" && endDate == ""){
		$.messager.alert("提示","结束日期不能为空！", "warning");
		return false;
	}else if(startDate == "" && endDate != ""){
		$.messager.alert("提示","开始日期不能为空！", "warning");
		return false;
	}else{
		return true;
	}
}

/**
 * 判断执行结果
 */
function resultIsTrue(data){
	if(data.loginFlag){
		if(data.executeFlag){
			$.messager.alert("提示","选中记录操作成功！");
		}else{
			$.messager.alert("提示","操作成功" + data.exeSuccNum + "条，操作失败" + data.exeErrNum + "条!");
		}
	}else{
		$.messager.alert("提示","登录超时，请重新登录后再操作！");
	}
}
