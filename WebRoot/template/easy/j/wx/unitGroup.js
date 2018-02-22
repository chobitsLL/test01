function uGroupSave(){
	var oaid = $("#wxcommoa1").val();
	var groupName = $("#groupName").val();
	if(oaid==undefined||oaid==""){
		$.messager.alert("提示", "请先选择公众号！", "warning");
		return false;
	}
	if(groupName==undefined||groupName==""){
		$.messager.alert("提示", "分组名不能为空！", "warning");
		return false;
	}
	// 获取用户填写的参数
	var uGroupData = getUGroup(oaid);
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"wUnitGroup/insertUnit.do",
		data:uGroupData,
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", "新增成功",function(){
					//查询前先组织查询条件
					$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
					$("#easy_table").datagrid("load","wUnitGroup/unitgroup.do");
				});
				$("#groupName").textbox("setValue","");
				$("#wxstoreleb").jeasycombo("setvalue","");
				$('#dialogid').dialog('close');
			} else {
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
    	}
	});
};
//查询
function getUGroup(oaid){ // 获取用户填写的参数的函数
	var fname=$("#groupName").val();
	var wxstore=$("#wxstoreleb").val();
    var data={};
	data["FName"] = fname;
	data["oaid"] = oaid;
	data["fstoreid"]=wxstore;
	var dat={
    		jsonobj:JSON.stringify(data)
    };
	return dat; 
}

//修改
function unitSave(){
	var row = $("#easy_table").datagrid("getSelected");
	var fid=row.fid;
	var fname=$("#groupNames").val();
	var fstoreid=$("#wxstorelebs").val();
	var oaid=row.foaid;
	var wxgroupid=row.fwxgroupid;
	var data={};
	data["fid"]=fid;
	data["fname"]=fname;
	data["oaid"]=oaid;
	data["fstoreid"]=fstoreid;
	data["wxgroupid"]=wxgroupid;
	data["isChangeName"]=fname==row.fname?false:true;
	var dat={
		     jsonobj:JSON.stringify(data)
	}; 
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
			type:"POST",
			url:"wUnitGroup/editUnit.do",
			dataType : "json",
			data:dat,
			success: function(data){
				$.messager.progress("close");//隐藏加载中
				if(data.result){
					$('#updialogid').dialog('close');
					$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
					$("#easy_table").datagrid("load","wUnitGroup/unitgroup.do");
				} else {
					$.messager.alert("提示", data.msg, "warning");
				}
    		},
    		error:function(){
    			$.messager.progress("close");//隐藏加载中
    			$.messager.alert("提示", "请求出错！", "warning");
	    	}
	 });
};
//管理按钮
function Administration(){
	// 获取旧数据
	var row = $("#easy_table").datagrid("getSelected");
	window.open(basePath+"wUser/page.do?unitgroup="+row.fid+"&unitgroupname="+row.fname);    
}
//同步粉丝
function sysnfans(){
	var row = $("#easy_table").datagrid("getSelected");
	var unitgroup=row.fid;
	var foaid = row.foaid;
	var fwxgroupid = row.fwxgroupid;
	if(foaid==""||fwxgroupid==""){ 
		$.messager.alert("提示", "请先同步分组到微信！", "warning");
		return false;
	}else{
		$.messager.alert("提示", "由于同步的粉丝较多，可能会用时较长请耐心等候(1万粉丝约需要40-50分钟)！", "warning");
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"wUnitGroup/syncWXGroupPerson.do?unitgroup="+unitgroup+"&foaid="+foaid+"&fwxgroupid="+fwxgroupid,
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result==true||data.res=="none"){
				$.messager.alert("提示", "同步成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","wUnitGroup/unitgroup.do");
			}else {
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "同步出错！", "warning");
    	}
	});
}
function removeGroup(ids){
	var rows = $("#easy_table").datagrid("getChecked");//多选
	var fid = new Array();
	for (var i = 0; i < rows.length; i++) {
		fid[i] = rows[i].fid;
	}
	if(fid == null || fid.length == 0){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return;
	}
	var ids = fid.join(",");//数组转化成字符串
	
	var userid="${sessionScope.user.FID}";
	if(userid==""){
		$.messager.alert("提示", "您还未登录！", "warning");
		return false;
	}
	if(ids==""){
		$.messager.alert("提示", "请选择一个要删除的选项！", "warning");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
   	   url:"wUnitGroup/deleteUnit.do?ids="+ids,
   	   dataType:"json",
   	   success:function(data){
   			$.messager.progress("close");//隐藏加载中
			if(data.result==false){
				$.messager.alert("提示", "删除失败！！", "warning");
			} else{
				$.messager.alert("提示", "删除成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","wUnitGroup/unitgroup.do");
			}
   		 },error:function(json) { 
   			$.messager.progress("close");//隐藏加载中
   			$.messager.alert("提示", "请求出错！", "warning");
        }
   	 });    
}

/***
 * 王文樟 20160425同步微信分组
 */
function sysWXGroup(){
	var oaid = $("#wxcommoa").val();
	if(oaid==undefined||oaid==""){
		$.messager.alert("提示", "请先选择公众号！", "warning");
		return false;
	}
	var jsonobj={};
	jsonobj["oaid"]=oaid;
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"wUnitGroup/syncWXGroup.do?oaid="+oaid,
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", "同步成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","wUnitGroup/unitgroup.do");
			} else {
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "同步出错！", "warning");
    	}
	});
}
/***
 *  胡亚婷 20160707同步店铺粉丝
 * wxunitUserfid--tbwWechatUser.FID拼的字符串param.put("wxunitUserfid","1,2,3,4")
 * groupids--粉丝分组ID--param.put("groupids","22")
 * foaid--公众号ID--param.put("foaid","11") 
 */
function allstoresfans(){
	var rows = $("#easy_table").datagrid("getChecked");//多选
	var fid = new Array();
	for (var i = 0; i < rows.length; i++) {
		fid[i] = rows[i].fid;
	}
	if(fid == null || fid.length == 0){
		$.messager.alert("提示", "请至少选择一行数据！", "warning");
		return;
	}
	var groupids = fid.join(",");//数组转化成字符串
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"wUnitGroup/syncWXStoreGroupPerson.do?groupids="+groupids,
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", data.msg, "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","wUnitGroup/unitgroup.do");
			} else {
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "同步出错！", "warning");
    	}
	});
}