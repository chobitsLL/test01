//获取添加表单提交数据---
	function getAddFormStr(){
		var formdata=$('#addForm').serializeJSON();
		var data={jsonobj:JSON.stringify(formdata)}
		return data;
	};
	//关闭窗口
	function closeDialog(value){
		$.messager.alert('提示',value.msg);
		$('.easy-dlg').dialog('close');
		$('#easy_table').datagrid('reload');
	}
	//查询-有效下拉框
    $("#FAccepted").combobox({
		data:[{"fid":-1,"fname":"全部","selected":true},{"fid":1,"fname":"有效"},{"fid":0,"fname":"未有效"}]
	});
    //查询-支付方式
    $("#payType").jeasycombo({
  		multiple : true,//是否多选
  		type : "list",//弹出的样式
  		detail:true,
  		label:'支付方式',
  		labelWidth:80,
  		width:200,
  		url : "payController/getPayType.do",
  	});
	//获取searchForm中数据,重新加载主表格数据
	$('#btnSearch').bind('click',function(){
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","payController/getPayCfg.do");
	})
	//重置查询条件
	$('#btnReset').bind('click',function(){
		Util.resetParam(paramArray);
	})
	//打开增加窗口
	function toAdd(ids,rows){
		Util.dialog("添加支付方式","template/easy/company/addPayCfg.jsp",350,440);
	}
	var faccepted=[];//表单复选框选中有效值
	//打开修改窗口
	function toEdit(ids,rows){
		faccepted=[];
		for (var i = 0; rows && i < rows.length; i++) {
			faccepted.push(rows[i].faccepted)
			}
			var facceptedStr=faccepted[0];
			if(facceptedStr=="否"){
				if(rows[0].fisonline==1){
					Util.dialog("修改支付方式","payController/selectPayCfg.do?ids="+ids,350,440);
				}else{
					Util.dialog("修改支付方式","payController/selectPayCfg.do?ids="+ids,400,200);	
				}
			}else{
				$.messager.alert('提示',"数据已生效,不能修改！","error");
			}			
	}
	
	
	//删除
	function del(ids,rows){
		faccepted=[];
		for (var i = 0; rows && i < rows.length; i++) {
			faccepted.push(rows[i].faccepted)
			}
			var facceptedStr=faccepted.join(",");
			if(facceptedStr.indexOf("是")>=0||facceptedStr=="是"){
				$.messager.alert('提示',"存在已经有效的记录，不允许删除!","error");
				}else{
					$.messager.confirm('确认','您确认想要删除选中的数据吗？',function(r){    
					    if (r){
					    	$.messager.progress({text : "正在处理，请稍候..."});
							$.ajax({
								type:'post',
								url:"payController/deletePayCfg.do?ids="+ids,
								dataType : "json",
								success:function(value){
									$.messager.progress("close");//隐藏加载
									if(value.result){
										$.messager.alert('提示',"删除成功","info");
										$('#easy_table').datagrid('reload');
									}else{
										$.messager.alert('提示',value.msg,"error");
									}
									},error:function(){
										$.messager.progress("close");//隐藏加载
				        				$.messager.alert("提示","请求出错!","error");
				        			}
								
								})
					    	}
					})
			}
	}
	
	//有效
	function accept(ids,rows){
		faccepted=[];
		//版本
		var frowversion={};
		for (var i = 0; rows && i < rows.length; i++) {
			faccepted.push(rows[i].faccepted);
			frowversion[rows[i].fid]=rows[i].frowversion+1;
			}
		var frowversionStr=JSON.stringify(frowversion);
			var facceptedStr=faccepted.join(",");
			if(facceptedStr.indexOf("否")>=0||facceptedStr=="否"){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type:'post',
					url:"payController/updatePayCfgAccep.do?jsonobj="+frowversionStr+"&ids="+ids+"&type=1",
					dataType : "json",
					success:function(value){	
						$.messager.progress("close");//隐藏加载
						if(value.result){
							$.messager.alert('提示',"有效成功","info");
							$('#easy_table').datagrid('reload');
						}else{
							$.messager.alert('提示',value.msg,"error");
						}
						},error:function(){
							$.messager.progress("close");//隐藏加载
	        				$.messager.alert("提示","请求出错!","error");
	        			}
					
					})
				    

				}else{
					$.messager.alert('提示',"数据中不包含能够有效数据！","error");					
				}
	}
	
	//禁用
	function disable(ids,rows){
		faccepted=[];
		//数据版本
		var frowversion={};
		for (var i = 0; rows && i < rows.length; i++) {
			faccepted.push(rows[i].faccepted);
			frowversion[rows[i].fid]=rows[i].frowversion+1;
			}
		var frowversionStr=JSON.stringify(frowversion);
			var facceptedStr=faccepted.join(",");
			if(facceptedStr.indexOf("是")>=0||facceptedStr=="是"){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type:'post',
					url:"payController/disablePayCfgAccep.do?jsonobj="+frowversionStr+"&ids="+ids,
					dataType : "json",
					success:function(value){	
						$.messager.progress("close");//隐藏加载
						if(value.result){
							$.messager.alert('提示',value.msg,"info");
							$('#easy_table').datagrid('reload');
						}else{
							$.messager.alert('提示',value.msg,"error");
						}
						},error:function(){
							$.messager.progress("close");//隐藏加载
	        				$.messager.alert("提示","请求出错!","error");
	        			}
					
					})
				    

				}else{
					$.messager.alert('提示',"数据中不能够包含已禁用数据！！","error");					
				}
	}

