//获取searchForm中数据,重新加载主表格数据
$('#btnSearch').bind('click',function(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","unit/getArea.do");
})
//重置查询条件
$('#btnReset').bind('click',function(){
	Util.resetParam(paramArray);
})
//打开增加窗口
function toAdd(ids,rows){
	var warehouseid=$("#FwareNameAdd").combobox("setValue","");
	var areaid=$("#FareaNameAdd").jeasycombo("setvalue","");
	$('#addWindow').window({title:"新增企业配送区域"});
	$('#addWindow').window('open');
	$("#btnAdd").show();
	$("#btnEdit").hide();
}
//增加
$("#btnAdd").bind('click',function(){
	var data=getAddForm();
	var area=data['areaid'];
	var ware = $("#FwareNameAdd").combobox('getValue');
	var sync = $('#syncStock').val();
	if(sync==1&&(ware=="" || ware==null)){
		$.messager.alert("提示","请选择库房！","warning");
		return false;
	}
	if(area=="" || area==null){
		$.messager.alert("提示","请选择区域!","warning");
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"unit/addArea.do",
			dataType : "json",
			data:{'jsonobj':JSON.stringify(data)},
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
    				$.messager.alert("提示","请求出错!","warning");
    			}
			
	})
	}
		
})
//打开修改窗口
function toEdit(ids,rows){
	$('#addWindow').window({title:"修改企业配送区域"});
	$('#btnAdd').hide();
	$('#btnEdit').show();
		var id=ids[0];
		$('#addWindow').window('open');
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'get',
			url:"unit/getAreaById.do?id="+ids,
			dataType : "json",
			success:function(value){	
				$.messager.progress("close");//隐藏加载
				$("#FId").textbox('setValue',value.fid);
				$('#FwareNameAdd').combobox('setValue',value.wfid);
				$("#FareaNameAdd").jeasycombo('setvalue',value.afid+"");	
				}
			
	})
}
//修改信息
$('#btnEdit').bind('click',function(){
	var ids=$("#FId").val();
	var data=getAddForm();
	data['ids']=ids;
	dat={jsonobj:JSON.stringify(data)};
	var area=data['areaid'];
	var ware = $("#FwareNameAdd").combobox('getValue');
	var sync = $('#syncStock').val();
	if(sync==1&&(ware=="" || ware==null)){
		$.messager.alert("提示","请选择库房！","warning");
		return false;
	}
	if(area=="" || area==null){
		$.messager.alert("提示","请选择区域!","warning");
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'post',
			url:"unit/editArea.do",
			dataType : "json",
			data:dat,
			success:function(value){
				/* alert(JSON.stringify(value)); */
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
				$.messager.alert("提示","请求出错!","warning");
			}
		})
		
	
}
		
})
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
		}else if(facceptedStr.indexOf("1") >=0||facceptedStr=="1"){
			$.messager.alert('提示','该数据包含已有效的数据，请重新选择',"warning");	
			}else{
				$.messager.confirm('确认','您确认想要删除选中的数据吗？',function(r){    
			    if (r){    
			    	$.messager.progress({text : "正在处理，请稍候..."});
			    	$.ajax({
						type:'get',
						url:"unit/updateAreaDel.do?ids="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示','删除成功',"info");
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert('提示','删除失败',"warning");
							}
						
						},error:function(){
							$.messager.progress("close");//隐藏加载
	        				$.messager.alert("提示","请求出错!","warning");
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
						url:"unit/updateArea.do?ids="+ids,
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
	        				$.messager.alert("提示","请求出错!","warning");
	        			}
					})   
			    }    
			});
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
						url:"unit/updateAreaStop.do?ids="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示','状态修改成功');
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert('提示','状态修改失败',"error");
							}
						
						},error:function(){
							$.messager.progress("close");//隐藏加载
	        				$.messager.alert("提示","请求出错!","error");
	        			}
					})   
			    }    
			});
		}
		
}

//默认
function defaul(ids,rows){
	faccepted=[];

	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		}
	var facceptedStr=faccepted.join(","); 
	if(faccepted.length>1){
		$.messager.alert('提示','该操作仅支持单行操作，请重新选择！',"warning");
	}else if(faccepted.length==1){
		if(facceptedStr.indexOf("0")>=0 || facceptedStr==0){
			$.messager.alert('提示','该数据无效，不可设置默认区域！',"warning");
		}else{
			$.messager.confirm('确认','确定要设置当前数据为默认配送区域？',function(r){    
			    if (r){    
			    	$.messager.progress({text : "正在处理，请稍候..."});
			    	$.ajax({
						type:'get',
						url:"unit/isDefaultArea.do?ids="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示','状态修改成功');
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert('提示','状态修改失败',"warning");
							}
						
						},error:function(){
							$.messager.progress("close");//隐藏加载
	        				$.messager.alert("提示","请求出错!","warning");
	        			}
					})   
			    }    
			});
		}
	}
	
	
}
//获取addForm中数据
function getAddForm(){
	var warehouseid=$("#FwareNameAdd").combobox("getValue");
	var areaid=$("#FareaNameAdd").val();
	var formdata={'warehouseid':warehouseid,'areaid':areaid}
	return formdata;
};



