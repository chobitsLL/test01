//打开增加窗口
function toAdd(ids,rows){
	$('#addForm').form('clear');
	$('#addWindow').window({title:"增加企业库房"});
	$('#addWindow').window('open');
	$('#btnAdd').show();
	$('#btnEdit').hide();
	
}
//打开修改窗口
function toEdit(ids,rows){
	$('#addWindow').window({title:"修改企业库房"});
	$('#addForm').form('clear');
	$('#btnAdd').hide();
	$('#btnEdit').show();
	$('#addWindow').window('open');
	$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'get',
			url:"unit/getWareHouseByfids.do?ids="+ids,
			dataType : "json",
			success:function(value){	
				$.messager.progress("close");//隐藏加载
				$('#FId').textbox('setValue',value.rows[0].fid);
				$('#FName').textbox('setValue',value.rows[0].fname);
				$('#FOuterId').textbox('setValue',value.rows[0].fouterid);
				$('#FLinkPerson').textbox('setValue',value.rows[0].flinkperson);
				$('#FTelNo').textbox('setValue',value.rows[0].ftelno);
				$('#FAddress').textbox('setValue',value.rows[0].faddress);
				$('#FPostNo').textbox('setValue',value.rows[0].fpostno);
				},error:function(){
					$.messager.progress("close");//隐藏加载
					$.messager.alert("提示","请求出错！","warning");
				}
	})
}
//选中数据的有效值
var faccepted=[];
//所选项审核状态
var fstopped=[];
//删除
function del(ids,rows){
	fstopped=[];
	faccepted=[];
	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		fstopped.push(rows[i].fstopped);
		}
	var facceptedStr=faccepted.join(","); 
	 var fstoppedStr=fstopped.join(",");
	/* alert(id); */
		if(fstoppedStr.indexOf("1") >=0||fstoppedStr==1){
			$.messager.alert('提示','该数据包含已终止的数据，请重新选择',"warning");				
		}else if(facceptedStr.indexOf("1") >=0||facceptedStr==1){
			$.messager.alert('提示','该数据包含已有效的数据，请重新选择',"warning");	
			}else{
				$.messager.confirm('确认','您确认想要删除选中的数据吗？',function(r){    
			    if (r){    
			    	$.messager.progress({text : "正在处理，请稍候..."});
			    	$.ajax({
						type:'get',
						url:"unit/updateWareHouseStateDel.do?ids="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示','删除成功','info');
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert('提示','删除失败',"warning");
							}
						
						},error:function(){
							$.messager.progress("close");//隐藏加载
							$.messager.alert("提示","请求出错！","warning");
						}
					})   
			    }    
			});
		}
		
}
//有效
function accept(ids,rows){
	fstopped=[];
	faccepted=[];
	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		fstopped.push(rows[i].fstopped);
		}
	var facceptedStr=faccepted.join(","); 
	 var fstoppedStr=fstopped.join(",");
	/* alert(id); */
	if(ids.length==0){
		$.messager.alert('提示','您还没有选择数据');
	}else{
		if(fstoppedStr.indexOf("1") >=0||fstoppedStr==1){
			$.messager.alert('提示','该数据包含已终止的数据，请重新选择',"warning");				
		}else if(facceptedStr.indexOf("1") >=0||facceptedStr==1){
			$.messager.alert('提示','该数据包含已有效的数据，请重新选择',"warning");	
			}else{
				$.messager.confirm('确认','您确定要更改当前数据状态吗？',function(r){    
			    if (r){    
			    	$.messager.progress({text : "正在处理，请稍候..."});
			    	$.ajax({
						type:'get',
						url:"unit/updateWareHouseState.do?ids="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示','状态修改成功',"info");
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert('提示','状态修改失败',"warning");
							}
						
						},error:function(){
							$.messager.progress("close");//隐藏加载
							$.messager.alert("提示","请求出错！","warning");
						}
					})   
			    }    
			});
		}
		
	}
}

//终止
function stop(ids,rows){
	fstopped=[];
	faccepted=[];
	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		fstopped.push(rows[i].fstopped);
		}
	var facceptedStr=faccepted.join(","); 
	 var fstoppedStr=fstopped.join(",");
	/* alert(id); */
		if(fstoppedStr.indexOf("1") >=0||fstoppedStr==1){
			$.messager.alert('提示','该数据包含已终止的数据，请重新选择',"warning");				
		}else if(facceptedStr.indexOf("0") >=0||facceptedStr==0){
			$.messager.alert('提示','该数据包含未有效的数据，请重新选择',"warning");	
			}else{
				$.messager.confirm('确认','您确定要更改当前数据状态吗？',function(r){    
			    if (r){    
			    	$.messager.progress({text : "正在处理，请稍候..."});
			    	$.ajax({
						type:'get',
						url:"unit/updateWareHouseStateStop.do?ids="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示','状态修改成功',"info");
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert('提示','状态修改失败',"warning");
							}
						
						},error:function(){
							$.messager.progress("close");//隐藏加载
							$.messager.alert("提示","请求出错！","warning");
						}
					})   
			    }    
			});
		}
}
//获取添加表单数据
function getAddForm(){
	var formdata=$('#addForm').serializeJSON();
	
	return formdata;
};
function getAddFormStr(){
	var formdata=$('#addForm').serializeJSON();
	var data={jsonobj:JSON.stringify([formdata])}
	return data;
};
/*//填充页面信息
function toEdit(value){
	
	}*/
//关闭窗口
function closeDialog(){
	$('.easy-dlg').dialog('close');
	$('#easy_table').datagrid('reload');
}

$(function(){
	//获取searchForm中数据,重新加载主表格数据
	$('#btnSearch').bind('click',function(){
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","unit/getUnitWareHouse.do");
	})
	//重置查询条件
	$('#btnReset').bind('click',function(){
		Util.resetParam(paramArray);
	})
	//增加
	$("#btnAdd").bind('click',function(){
		//获取表单中所有验证框的验证结果
		var isValid = $('#addForm').form('validate')
		var data=getAddForm();
		if(isValid){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:"unit/addWareHouse.do",
				dataType : "json",
				data:data,
				success:function(value){
					$.messager.progress("close");//隐藏加载
						if(value.result){
							$.messager.alert('提示',value.msg,"info");
							$('#addWindow').window('close');
							$('#easy_table').datagrid('reload');
							
						}else{
							$.messager.alert('提示',value.msg,"warning");
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载
						$.messager.alert("提示","请求出错！","warning");
					}
		})
		}
			
	})
	//修改信息
	$('#btnEdit').bind('click',function(){
		var isValid = $('#addForm').form('validate');
		var data=getAddFormStr();
		
		if(isValid){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'post',
				url:"unit/updateWareHouseInfo.do",
				dataType : "json",
				data:data,
				success:function(value){
					$.messager.progress("close");//隐藏加载
					/* alert(JSON.stringify(value)); */
					if(value.result){
						$.messager.alert('提示',value.msg,'info');
						$('#addWindow').window('close');
						$('#easy_table').datagrid('reload');
					}else{
						$.messager.alert('提示',value.msg,"warning");
					}
				
				},error:function(){
					$.messager.progress("close");//隐藏加载
					$.messager.alert("提示","请求出错！","warning");
				}
			})
			
		}
		
		
		
	})
	
	
	//查询-状态
	$("#state").combobox({
		valueField: "id",    
        textField: "text", 
		data:[{"id":-1,"text":"全部","selected":true},{"id":0,"text":"无效"},{"id":1,"text":"有效"},{"id":2,"text":"终止"}]
	});
	
	
})
//validatebox中validType属性扩展
$.extend($.fn.validatebox.defaults.rules, {
	//移动手机号码验证
    Mobile: {//value值为文本框中的值
        validator: function (value) {
            var reg = /^1[3|4|5|8|9]\d{9}$/;
            return reg.test(value);
        },
        message: 'Please enter your mobile phone number correct.'
    }
})


