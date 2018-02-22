//获取searchForm中数据,重新加载主表格数据
$('#btnSearch').bind('click',function(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","unit/getUnitInfoStation.do");
})
//重置查询条件
$('#btnReset').bind('click',function(){
	Util.resetParam(paramArray);
})
//打开增加窗口
function toAdd(id,ids){
	Util.dialog("添加销售服务站点","unit/addStation.do",370,420);
}
//打开修改窗口
function toEdit(ids,rows){
	var faccepted=[];
	for (var i = 0; rows && i < rows.length; i++) {
		faccepted.push(rows[i].faccepted);
		}
		if(faccepted[0]==0){
			Util.dialog("修改销售服务站点","unit/selectUnitStationt.do?ids="+ids,370,420);
		}else{
			$.messager.alert('提示',"数据已生效,不能修改！","warning");
		}
		
}
//删除
function del(ids,rows){
	faccepted=[];
	/* alert(JSON.stringify(rows)); */
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
						url:"unit/deleteUnitStation.do?unitIDs="+ids,
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
							$.messager.alert("提示","请求出错！","warning");
						}	
					})   
			    }    
			});
		}
}
//有效状态更改
function accept(ids,rows){
	faccepted=[];
	var data={};//{'17':'3','213':'1'}
	for (var i = 0; rows && i < rows.length; i++) {
		//版本
		data[rows[i].fid]=rows[i].frowversion+1;
		faccepted.push(rows[i].faccepted);
		}
	var facceptedStr=faccepted.join(",");
	/* alert(id); */
	var data2=JSON.stringify(data);
	/* alert(facceptedStr); */
		if(facceptedStr.indexOf("0") >=0||facceptedStr==0){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'get',
				url:"unit/updateUniStationtAccepted.do?ids="+ids+"&jsonobj="+data2,
				dataType : "json",
				success:function(value){
					$.messager.progress("close");//隐藏加载
					if(value.result){
						$.messager.alert("提示","有效成功","info");
						$('#easy_table').datagrid('reload');
					}else{
						$.messager.alert("提示",value.msg,"warning");			
					}
					
				
				},error:function(){
					$.messager.progress("close");//隐藏加载
					$.messager.alert("提示","请求出错！","warning");
				}
				
			})
			
		}else{
			$.messager.alert('提示','数据中不包含能够有效数据！',"warning");
		}			
		
}
//所选项审核状态
var fAudit=[];
//审核状态的更改
function audit(ids,rows){
	faccepted=[];
	fAudit=[];
	var fAudit=[];
	var data={};//{'17':'2','213':'2'}
	for (var i = 0; rows && i < rows.length; i++) {
		data[rows[i].fid]=rows[i].frowversion+1;
		fAudit.push(rows[i].fauditstate);
		faccepted.push(rows[i].faccepted);
		}
	
	var fAuditStr=fAudit.join(",");//审核
	var facceptedStr=faccepted.join(",");//有效
	faccepted=[];
	var data2=JSON.stringify(data);		
		//判断是否有未有效数据
		if(!(facceptedStr.indexOf("0")>=0)){
			//判断选择的数据是否有已审核的
			if(!(fAuditStr.indexOf("1")>=0)){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type:'get',
					url:"unit/updateUnitStationAudit.do?ids="+ids+"&jsonobj="+data2,
					dataType : "json",
					success:function(value){
						$.messager.progress("close");//隐藏加载
						if(value.result){
							$.messager.alert("提示","审核成功","info");
							$('#easy_table').datagrid('reload');
						}else{
							$.messager.alert("提示",value.msg,"warning");			
						}						
					},error:function(){
						$.messager.progress("close");//隐藏加载
						$.messager.alert("提示","请求出错！","warning");
					}						
				})
				
			}else{
				$.messager.alert('提示','存在数据已审核,请重新选择！',"warning");
			}
		}else{
			
			$.messager.alert('提示','数据中存在未有效,请先有效！',"warning");
		}
}
var rowArr=[];
//打开指定村级服务站窗口
function storeSave(ids,rows){
		rowArr=rows;
		$('#storeName').combobox('setValue',"");
		$('#storeName').combobox('setText',"");
		fAudit=[];
		for (var i = 0; rows && i < rows.length; i++) {
			fAudit.push(rows[i].fauditstate);
			}
		var fAuditStr=fAudit.join(",");
		if(fAuditStr!=""){
			if(!(fAuditStr.indexOf("0")>=0||fAuditStr==0)){
					$('#storeWindow').window('open');
			}else{
				$.messager.alert('提示','存在数据未审核,请重新选择！',"warning")
			}
			
		}else{
			$.messager.alert('提示','您还没有选择数据',"warning");
		}
	
	
}
//取消
$('#btnStoreClose').bind('click',function(){
	$('#storeWindow').window('close');
})
//指定村级服务站
$('#btnStoreSave').bind('click',function(){
	var unituserids=[];
	for (var i = 0; i < rowArr.length; i++) {
		unituserids.push(rowArr[i].funituserid);
		}
	var unituserid=unituserids.join(","); 
	var storeId=$('#storeName').combo('getValue');
	
	//判断要指定村级服务站的选项是否有未审核的
	if(storeId!=""){
		window.location.href="unit/updateUnitStationStore.do?storeId="+storeId+"&unitUserIds="+unituserid;
		/*$.ajax({
			type:'get',
			url:"unit/updateUnitStationStore.do?storeId="+storeId+"&unitUserIds="+unituserid,
			dataType : "json",
			success:function(value){
				$.messager.alert("info",value.msg);
				if(value.result){
					$('#storeWindow').window('close');
					$('#easy_table').datagrid('reload');
				}
			},error:function(){
				$.messager.alert("error","请求出错！");
			}
			
		})*/
	}else{
		$.messager.alert('提示','村级服务站不能为空',"warning");
	}
})
//关闭窗口
function closeDialog(value){
	$.messager.alert('提示',value.msg,"info");
	$('.easy-dlg').dialog('close');
	$('#easy_table').datagrid('reload');
}
$(function(){
	//查询下拉框
	$("#FAccepted").combobox({
		data:[{"fid":-1,"fname":"全部","selected":true},{"fid":1,"fname":"有效"},{"fid":0,"fname":"未有效"}]
	});
	$("#FAuditState").combobox({
		data:[{"fid":-1,"fname":"全部","selected":true},{"fid":1,"fname":"已审核"},{"fid":0,"fname":"未审核"}]
	});
	
})
