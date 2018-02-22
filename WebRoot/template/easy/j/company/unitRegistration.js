//关闭窗口
function closeDialog(value){
	$.messager.alert('提示',value.msg);
	$('.easy-dlg').dialog('close');
	$('#easy_table').datagrid('reload');
}
//打开增加窗口
function toAdd(id,ids){
//	Util.dialog("新增联营商","unit/addRegistration.do",400,550);
	window.open("unit/addRegistration.do");
}
function toEdit(ids,rows){
	window.open("unit/selectUnitRegistration.do?ids="+ids,"修改联营商");
}
//查询
function search(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","unit/getUnitInfoRegistration.do");
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
						url:"unit/deleteUnitRegistration.do?unitIDs="+ids,
						dataType : "json",
						success:function(value){
							$.messager.progress("close");//隐藏加载
							if(value.result){
								$.messager.alert('提示',value.msg,"info");
								
								$('#easy_table').datagrid('reload');
								
							}else{
								$.messager.alert("提示",value.msg,"warning");			
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
//有效操作
function accept(ids,rows){
	faccepted=[];
	var data={};//{'17':'3','213':'1'}
	for (var i = 0; rows && i < rows.length; i++) {
		//状态更改，版本+1----frowversion
		data[rows[i].fid]=rows[i].frowversion+1;
		faccepted.push(rows[i].faccepted);
		}
	
	var facceptedStr=faccepted.join(",");
/* 		alert(JSON.stringify(data)); */
	var data2=JSON.stringify(data);
	/* alert(facceptedStr); */
		if(facceptedStr.indexOf("0") >=0||facceptedStr==0){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'get',
				url:"unit/updateUnitRegistrationAccepted.do?ids="+ids+"&jsonobj="+data2,
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
	var data={};//{'17':'2','213':'2'}
	for (var i = 0; rows && i < rows.length; i++) {
		//状态更改，版本+1----frowversion
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
					url:"unit/updateUnitRegistrationAudit.do?ids="+ids+"&jsonobj="+data2,
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
				$.messager.alert('提示','存在数据已审核,请重新选择！',"warning","warning");
			}
		}else{
			
			$.messager.alert('提示','数据中存在未有效,请先有效！',"warning");
		}
}
$(function(){
//获取searchForm中数据,重新加载主表格数据
$('#btnSearch').bind('click',function(){
	search();
})
//重置查询条件
$('#btnReset').bind('click',function(){
	Util.resetParam(paramArray);
})

	//查询下拉框
	$("#FAccepted").combobox({
		valueField: "id",    
	    textField: "text", 
		data:[{"id":-1,"text":"全部","selected":true},{"id":1,"text":"有效"},{"id":0,"text":"未有效"}]
	});
	$("#FAuditState").combobox({
		valueField: "id",    
	    textField: "text", 
		data:[{"id":-1,"text":"全部","selected":true},{"id":1,"text":"已审核"},{"id":0,"text":"未审核"}]
	});
})

	




