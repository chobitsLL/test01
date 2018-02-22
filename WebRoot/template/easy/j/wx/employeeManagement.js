//查询
function search(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","wUser/queryEmployee.do");
}
//置为员工、粉丝   type=1员工 type=0普通粉丝
function upWutype(type,id){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
  		type: 'post',
  		url: 'wUser/updateWechatUsertype.do',
  		data: {wxunitUserfid:id,type:type},//type=1员工 type=0普通粉丝
  		success:function(result){
  			$.messager.progress("close");//隐藏加载中
  			if(result){
  				$.messager.alert("提示", result.msg, "info");
  				search();
  			}else{
  				$.messager.alert("提示", result.msg,"error");
  			}
  		},error:function(){
  			$.messager.progress("close");//隐藏加载中
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
//设置权限
function uploadRight(id, ftype){
	if(ftype == 0){
		$.messager.alert("提示", "只有员工才能分配权限！", "warning");
		return false;
	}
	$("#Fid").val(id);
	//$('#setRole').dialog('clear')
	$("input[name='FRight']:checked").prop("checked", false);
	$('#setRole').dialog('open');
}
//保存权限设置
function save(){
	//var fright = $("#froletype").combobox('getValues').join();
	var fright = $("input[name='FRight']:checked").map(function () {
        return $(this).val();
    }).get().join(',');
	var fid = $("#Fid").val();
	$.messager.progress({text : "正在处理，请稍候..."});
  	$.ajax({
  		type: 'post',
  		url: 'wUser/updateRight.do',
  		data: {wxWechatUserfid:fid,FRight:fright},
  		success:function(result){
  			$.messager.progress("close");//隐藏加载中
  			if(result){
  				$.messager.alert("提示", "操作成功！", "info");
  			}else{
  				$.messager.alert("提示", "操作失败！", "warning");
  			}
  			$('#setRole').dialog('close');
  			search();
  		},error:function(){
  			$.messager.progress("close");//隐藏加载中
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
//绑定店铺
function resetStore(ids){
	$("#resetStoreid").val(ids);
	$('#resetStore').dialog('open');
}
//保存绑定店铺
function bindStore(ids){
	var ids = $("#resetStoreid").val();
	var fstoreid = $("#bind_store").val();
	if(fstoreid == ""){
		$.messager.alert("提示", "请选择门店","warning");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
  	$.ajax({
  		type: 'post',
  		url: 'wxBind/resetBindStore.do',
  		data: {ids:ids,fstoreid:fstoreid},
  		success:function(json){
  			$.messager.progress("close");//隐藏加载中
  			if(json.result){
  				$("#resetStore").dialog("close");
  				$.messager.alert("提示","操作成功！","info",function(){
  					search();
  				});
  			}else{
  				$.messager.alert("提示", "操作失败！","error");
  			}
  		},error:function(){
  			$.messager.progress("close");//隐藏加载中
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
//置为专属顾问
function setAdviser(ids){
	$.messager.progress({text : "正在处理，请稍候..."});
  	$.ajax({
  		type: 'post',
  		url: 'wUser/setAdviser.do',
  		data: {ids:ids},
  		success:function(data){
  			$.messager.progress("close");//隐藏加载中
  			if(data.result){
  				$.messager.alert("提示", data.msg, "info");
  				search();
  			}else{
  				$.messager.alert("提示", data.msg, "error");
  			}
  		},error:function(){
  			$.messager.progress("close");//隐藏加载中
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
//检查是否是专属顾问
function checkWxUser(ids){
  	$.ajax({
  		type: 'post',
  		url: 'wUser/checkWxUser.do',
  		data: {ids:ids},
  		success:function(data){
  			if(data.result){
  			    $("#cancelResion").jeasycombo("setvalue","");
  			    $("#cancelid").val(ids);
				$("#cancel").dialog("open");
  			}else{
  				$.messager.alert("提示", data.msg,"error");
  			}
  		},error:function(){
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
//取消设置确定
function cancelSubmit(){
	var ids = $("#cancelid").val();
	var cancelResion = $("#cancelResion").val();
	if(cancelResion == ""){
		$.messager.alert("提示", "请选择取消原因！", "warning");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
  	$.ajax({
  		type: 'post',
  		url: 'wUser/cancelWxUser.do',
  		data: {ids:ids,resid:cancelResion},
  		success:function(data){
  			$.messager.progress("close");//隐藏加载中
  			if(data.result){
  				$.messager.alert("提示", data.msg, "info");
  				search();
  				$.messager.progress("close");//隐藏加载中
  				$("#cancel").dialog("close");
  			}else{
  				$.messager.alert("提示", data.msg, "error");
  			}
  		},error:function(){
  			$.messager.progress("close");//隐藏加载中
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
//导出Exexl
function exportExcel_empmanager(){
	Util.exportExcel({
		url:"wUser/exportExcel_Employee.do",
		jsonParam:Util.initParam(paramArray).jsonobj,
		sheetTitle:"员工管理导出信息",
		fileName:"员工管理",
		headers:{"storename":"门店", "fwxnickname":"微信昵称", "ftelno":"手机号", "fname":"姓名", "fjobno":"工号","fright":"权限(1=议价,2=核销兑换码,3=核销服务码)", 
			"fauditor":"审核人", "faudittime":"审核时间", "fagentaudited":"是否经纪人(0=否,1=是)", "ftype":"是否员工(0=否,1=是)", "typename":"分类",
			"rankname":"岗位", "adviser":"专属顾问(0=否,1=是)", "ranknamehiger":"上级岗位", "parentusername":"上级人员"} 
	})
}//设置岗位
function setStation(){
	var fjobno=$("#setfjobno").val();
	var ids =$("#easy_table").datagrid("getSelected").fid;
	var rankid=$("#setRank").val();
	if(rankid==""||rankid==undefined||rankid=="undefined"){
		$.messager.alert("提示", "岗位不能为空！", "warning");
		 return false;
	}
	if(fjobno.length>15){
		$.messager.alert("提示", "工号长度超出限制！", "warning");
		return false;
	}
	var fstoreid=$("#storeid").val();
	if(fstoreid==""||fstoreid==undefined||fstoreid=="undefined"){
		$.messager.alert("提示", "门店不能为空！！", "warning");
		 return false;
	}
    var setUserhiger = $("#setUserHiger").val();
    if(setUserhiger==""||setUserhiger==undefined||setUserhiger=="undefined"){
    	setUserhiger=ids;
	}
  	$.ajax({
  		type: 'post',
  		url: 'wUser/setStation.do',
  		data: {
  			ids: ids,//粉丝id
  			rankid:rankid,
  			fjobno:fjobno,
  			setUserhiger:setUserhiger,
  			fstoreid:fstoreid
  		},
  		success:function(date){
  			if(date.result){
  				$.messager.alert("提示", date.msg);
  				search();
  				$('#setStation').dialog('close');
  			}else{
  				$.messager.alert("提示", date.msg, "warning");
  			}
  		},error:function(){
  			$.messager.alert("提示", "请求出错！", "warning");
  		}
  	});
}
