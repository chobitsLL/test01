//关闭窗口
function closeDialog(value){
	$('.easy-dlg').dialog('close');
 //跳转富文本编辑页面
window.location.href="tag/ruleUeditor.do?fid="+value.fid;
}
$("#FType").combobox({
	  data:[{"fid":-1,"fname":"全部","selected":true},{"fid":1,"fname":"积分任务规则"},{"fid":2,"fname":"经纪人DM单管理"},{"fid":3,"fname":"专属顾问提示"}]
})
$("#FAccepted").combobox({
	valueField:"id",
	textField:"text",
	data:[{"id":-1,"text":"全部","selected":true},{"id":0,"text":"未有效"},{"id":1,"text":"有效"},{"id":2,"text":"终止"}]
})
//条件查询
$('#btnSearch').bind('click',function(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","tag/queryRuleInfo.do");
})

$('#btnReset').bind('click',function(){
	Util.resetParam(paramArray);
})
//去添加頁面
function toAdd(id,ids){
	Util.dialog("添加自定义规则","tag/addRuleInfo.do",400,200)
}

//所选项
var faccepted=[];
//去修改頁面
function toEdit(ids,rows){
	faccepted=[];
	for(var i=0;i<rows.length;i++){
		faccepted.push(rows[i].faccepted);
	}
	if(faccepted[0]==1){
		$.messager.alert('提示',"已有效的数据不能编辑","error");
	}else if(faccepted[0]==2){
		$.messager.alert('提示',"已终止的数据不能编辑","error");
	}else{
		Util.dialog("编辑自定义规则","tag/selectRuleInfo.do?fid="+ids,400,200)
	}
}
//删除
function del(ids,rows){
	faccepted=[];
	for(var i=0;i<rows.length;i++){
		faccepted.push(rows[i].faccepted);
	}
	var facceptedStr=faccepted.join(",");
	if(facceptedStr.indexOf("1")>=0 || facceptedStr==1){
		$.messager.alert("提示","您选中的活动包含已有效的数据,不能删除，请重新选择!","error");
	}else if(facceptedStr.indexOf("2")>=0 || facceptedStr==2){
		$.messager.alert("提示","您选中的活动包含已终止的数据,不能删除，请重新选择！","error");
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		 $.ajax({
	  		  type:"POST",
	  		  url:"tag/delRuleInfo.do?ids="+ids,
	  		  dataType:"json",
	  		  async : false, // 同步 等待ajax返回值
	  		  success:function(data){
	  			$.messager.progress("close");//隐藏加载
	  			  if (data) {
	  				$.messager.alert('提示',"删除成功！","info");
	  				$("#easy_table").datagrid('reload');
	  			  }else{
	  				$.messager.alert("提示","删除失败！","error");
	  			  }
	  		  },error:function(){
	  			$.messager.progress("close");//隐藏加载
	  			$.messager.alert("提示","请求错误","error");
	  			}
	  	  });
	}
}
//有效
function accept(ids,rows){
	faccepted=[];
	for(var i=0;i<rows.length;i++){
		faccepted.push(rows[i].faccepted);
	}
	var facceptedStr=faccepted.join(",");
	if(facceptedStr.indexOf("1")>=0||facceptedStr.indexOf("2")>=0){
		$.messager.alert("提示","选择了已有效数据,不能重复有效！","error");
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		 $.ajax({
	  		  type:"POST",
	  		  url:"tag/updateConfirm.do?fid="+ids,
	  		  dataType:"json",
	  		  async : false, // 同步 等待ajax返回值
	  		  success:function(data){
	  			$.messager.progress("close");//隐藏加载
	  			  if (data.result) {
	  				$.messager.alert('提示',data.msg,"info");
	  				$("#easy_table").datagrid('reload');
	  			  }else{
	  				$.messager.alert("提示",data.msg,"error");
	  			  }
	  		  },error:function(){
	  			$.messager.progress("close");//隐藏加载
	  			$.messager.alert("提示","请求错误","error");
	  			}
	  	  });
	}
}

//终止
function stop(ids,rows){
	faccepted=[];
	for(var i=0;i<rows.length;i++){
		faccepted.push(rows[i].faccepted);
	}
	var facceptedStr=faccepted.join(",");
	if(facceptedStr.indexOf("0")>=0 || facceptedStr==0){
		$.messager.alert("提示","选择了未有效数据,只能终止已有效数据！","error");
	}else if(facceptedStr.indexOf("2")>=0 || facceptedStr==2){
		$.messager.alert("提示","选择了已终止数据,不能重复终止！","error");
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		 $.ajax({
	  		  type:"POST",
	  		  url:"tag/updateStop.do?fid="+ids,
	  		  dataType:"json",
	  		  async : false, // 同步 等待ajax返回值
	  		  success:function(data){
	  			$.messager.progress("close");//隐藏加载
	  			  if (data) {
	  				$.messager.alert('提示',"终止成功！","info");
	  				$("#easy_table").datagrid('reload');
	  			  }else{
	  				$.messager.alert("提示","终止失败！","error");
	  			  }
	  		  },error:function(){
	  			$.messager.progress("close");//隐藏加载
	  			$.messager.alert("提示","请求错误","error");
	  			}
	  	  });
	}
}
