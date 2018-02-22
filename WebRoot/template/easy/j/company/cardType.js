//关闭窗口
function closeDialog(value){
	$.messager.alert("提示",value.msg,"info");
	$('.easy-dlg').dialog('close');
	$('#easy_table').datagrid('reload');
}
//条件查询
$('#btnSearch').bind('click',function(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","unit/getCardType.do");
})

$('#btnReset').bind('click',function(){
	Util.resetParam(paramArray);
})
$("#FAccepted").combobox({
	data:[{"fid":-1,"fname":"全部","selected":true},{"fid":1,"fname":"有效"},{"fid":0,"fname":"未有效"},{"fid":2,"fname":"终止"}]
});

//打开新增窗口
function toAdd(ids,rows){
	Util.dialog("新增会员级别","unit/addCardType0.do",400,500);
}

//打开修改窗口
function toEdit(ids,rows){
	Util.dialog("修改会员级别","unit/editCardType1.do?id="+ids,400,500);
}
//选中数据的有效值
var faccepted=[];
//删除
function del(ids,rows){
	faccepted=[];
	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		}
	var facceptedStr=faccepted.join(","); 

	if(facceptedStr.indexOf("1") >=0||facceptedStr==1){
		$.messager.alert('提示','存在已经有效的记录，不允许删除',"warning");				
	}else{
		$.messager.confirm('确认','您确认想要删除选中的数据吗？',function(r){    
		    if (r){
		    	$.messager.progress({text : "正在处理，请稍候..."});
		    	$.ajax({
					type:'get',
					url:"unit/delCardType.do?ids="+ids,
					dataType : "json",
					success:function(value){
						$.messager.progress("close");//隐藏加载
						if(value.result){
							$.messager.alert('提示',"删除成功","info");
						}else{
							$.messager.alert('提示',"删除失败","warning");
						}
					
					},error:function(){
						$.messager.progress("close");//隐藏加载
        				$.messager.alert('提示','请求出错!',"warning");
        			}
				})   
		    }    
		});
	}
	
}
//有效状态更改
function accept(ids,rows){
	faccepted=[];
	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		}
	var facceptedStr=faccepted.join(",");
	
	if(facceptedStr.indexOf("1") >=0||facceptedStr==1){
		$.messager.alert('提示','数据中包含已有效数据！',"warning");			
	}else{
		$.messager.confirm('确认','您确定要有效么？',function(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'get',
				url:"unit/updateCardTypeAccepted.do?ids="+ids,
				dataType : "json",
				success:function(value){
					$.messager.progress("close");//隐藏加载
					if(value.result){
						$.messager.alert("提示",value.msg,"info");
						$('#easy_table').datagrid('reload');
					}else{
						$.messager.alert("提示",value.msg,"warning");			
					}
					
				
				},error:function(){
					$.messager.progress("close");//隐藏加载
					$.messager.alert("提示","请求出错！","warning");
				}
				
			})
	})
	}			
		
}
	
var fstopped=[];//获取选中数据终止状态
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
	if(fstoppedStr.indexOf("1") >=0||fstoppedStr==1){
		$.messager.alert('提示','该数据包含已终止的数据，请重新选择',"warning");				
	}else if(facceptedStr.indexOf("0") >=0||facceptedStr==0){
		$.messager.alert('提示','该数据包含未有效的数据，请重新选择',"warning");	
		}else{
			$.messager.confirm('确认','您确定要终止么？',function(r){    
		    if (r){
		    	$.messager.progress({text : "正在处理，请稍候..."});
		    	$.ajax({
					type:'get',
					url:"unit/stopCardType.do?ids="+ids,
					dataType : "json",
					success:function(value){
						$.messager.progress("close");//隐藏加载
						if(value.result){
							$.messager.alert('提示',value.msg,"info");
							$('#easy_table').datagrid('reload');
							
						}else{
							$.messager.alert('提示',value.msg,"warning");
						}
					
					},error:function(){
						$.messager.progress("close");//隐藏加载
        				$.messager.alert('提示','请求出错!',"warning");
        			}
				})   
		    }    
		});
	}
		
}
	
//设置默认类型
function defaul(ids,rows){
	if(rows.length>1){
		$.messager.alert('提示','设置默认类型时只能选择一条数据！',"warning");			
	}else{
		$.messager.confirm('确认','默认类型只允许有一条，你确认要将当前选择的会员级别设置为默认类型吗？',function(r){
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
        			type:"POST",
        			url:"unit/updateCardTypeDefaultType.do?ids="+ids,
        			dataType:"json",
        			success: function(value){
        				$.messager.progress("close");//隐藏加载
        				if(value.result){
        					$.messager.alert('提示',value.msg,"info");
        					$("#easy_table").datagrid('reload');
							
						}else{
							$.messager.alert('提示',value.msg,"warning");
        					
        				}
        			},error:function(){
        				$.messager.progress("close");//隐藏加载
        				$.messager.alert('提示','请求出错!',"warning");
        			}
        		});	
			}
			
		})
	}
}
