//关闭窗口
function closeDialog(value){
	$.messager.alert('提示',value.msg);
	$('.easy-dlg').dialog('close');
	$('#easy_table').datagrid('reload');
}

//打开增加窗口
function toAdd(ids,rows){
	Util.dialog("添加区域运费设置","unit/addunsendfee.do",400,500);
}

//打开修改窗口
function toEdit(ids,rows){
	Util.dialog("修改区域运费设置","unit/getByIDSendFee.do?id="+ids,400,500);
}

//删除
function del(ids,rows){
		$.messager.confirm('确认','您确认想要删除选中的数据吗？',function(r){    
		    if (r){    
		    	$.messager.progress({text : "正在处理，请稍候..."});
		    	$.ajax({
		    		type:"POST",
		    		url:"unit/deleSendFee.do?ids="+ids,
		    		dataType:"json",
		    		success: function(data){
		    			$.messager.progress("close");//隐藏加载
		    			if(data.result){
							$.messager.alert('提示','删除成功',"info");
							$('#easy_table').datagrid('reload');
							
						}else{
							$.messager.alert('提示','删除失败',"warning");
						}
					
					},error:function(){
						$.messager.progress("close");//隐藏加载
        				$.messager.alert("提示","请求出错!","warning");
        			}
		    	});
		    }    
		})
}		
$(function(){
	//初始化查询下拉组件--区域
	$("#areaid").jeasycombo({
	    multiple : false,//是否多选
		type:"tree",//弹出的样式
		url:"select/sendarea.do",
		label:"区域:",
		labelWidth:80,
		width:200
	 }); 
	//商品类型
	$("#stockclassid").jeasycombo({
		multiple : true,//是否多选
		type:"tree",//弹出的样式
		url : "select/stockClass.do?t=2",
		label:"商品类型:",
		labelWidth:80,
		width:200
	});
	//获取searchForm中数据,重新加载主表格数据
	$('#btnSearch').bind('click',function(){
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","unit/tblsendfee.do");
	})
	//重置查询条件
	$('#btnReset').bind('click',function(){
		Util.resetParam(paramArray);
	})
});