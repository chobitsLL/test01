$(function(){
	//设置时间  
//	var times = new Date();
//	$("#searchFdateStart").datebox("setValue",myformatter(times));  
	//日期字段只读
	$(".datebox :text").attr("readonly","readonly");
	funJeasycombo();
	$('#btnSelect').bind('click',function(){
		doSearch();
	});
	
	//查询按钮
	var paramArray = [{id:"#fdateType", name:"fdateType",type:"select",defval:'0'},
			        {id:"#FValidDateBegin", name:"FValidDateBegin",type:"date"},
			        {id:"#FValidDateEnd", name:"FValidDateEnd",type:"date"},
			        {id:"#FMType", name:"FMType",type:"combo"},
			        {id:"#fstoType", name:"fstoType",type:"combo"},
			        {id:"#FStoreID", name:"FStoreID",type:"combo"},
			        {id:"#fmark", name:"fmark",type:"combo"},
			        {id:"#ftype", name:"ftype",type:"combo"},
			        {id:"#FStockID", name:"FStockID",type:"text"},
			        {id:"#FQUserID", name:"FQUserID",type:"text"},
			        {id:"#FState", name:"FState",type:"combo"}];
	
	$('#btnSelect').bind('click',function(){
		$("#easyuiTable").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easyuiTable").datagrid("load","consultmanager/consultSelect.do");
	})
	//重置按钮
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
	//禁用或启用按钮
//	$("#").linkbutton({disabled: true});
//	$("#").linkbutton({disabled: false});
	
});

function doSearch(){
	$("#easyuiTable").datagrid('reload');
}

function funJeasycombo(){
	//咨询类型
	$('#FMType').jeasycombo({
		label:'咨询类型:',
		multiple : true,//是否多选
		type : "list",//弹出的样式
		dlgheight:250,
		dlgwidth:500,
		width:200,
		labelWidth:60,
		btnclass:"btn-success",//自定义按钮样式
		data:{"total":9,"rows":[{"fname":"产品咨询","fid":1},{"fname":"库存配送","fid":2},{"fname":"发票保修","fid":3},{"fname":"支付信息","fid":4},
		                        {"fname":"其它问题","fid":5}]}
		
	});
	
	$("#fstoType").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		width:200,
		labelWidth:60,
		dlgheight:250,
		dlgwidth:500,
		editable:false,
		label:'店铺类型:',
		//0-企业店铺，1-门店店铺，2-员工店铺，3-加盟商店铺，4-自营电子货架，5-加盟商电子货架，6-村级服务站
		data:{"total":0,"rows":[{"fname":"企业店铺","fid":0},{"fname":"门店店铺","fid":1},
	                        {"fname":"员工店铺","fid":2},{"fname":"加盟商店铺","fid":3},{"fname":"PC企业商城","fid":7}]},
		onChange :function(newValue,oldValue){
			if(newValue==undefined || newValue ==""){
				$("#FStoreID").jeasycombo("setvalue","");
			}else{
				$("#FStoreID").jeasycombo("reload","managerorders/getStoreName.do?type="+newValue);
			}
		}
	});    
	   
	//级联二级下拉框
   $("#FStoreID").jeasycombo({
	   width:200,
		labelWidth:60,
		label:'店铺:',
		editable:false,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		btnclass:"sd",
		data:{"total":0,"rows":[]},
		beforeShow:function(){
			var fstoType = $("#fstoType").jeasycombo("getvalue");
			if(fstoType.ids != ""){
				return true;
			}else{
				$.messager.alert('温馨提示', "请选择店铺类型","warning");
				return false;
			}
		}
	}); 
	$("#fmark").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		width:200,
		labelWidth:60,
		isinline:false,
		dlgwidth:800,
		linenum:4,
		btnclass:"btn-success",//自定义按钮样式
		label:'品牌:',
		url:"select/mark.do"
	});
	$("#ftype").jeasycombo({
		width:200,
		labelWidth:60,
		label:'类别:',
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		url : "select/stockClass.do?t=2"
	});
	$("#FState").jeasycombo({
		width:200,
		labelWidth:60,
		dlgheight:150,
		dlgwidth:300,
		label:'咨询状态:',
		multiple : false,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		data:{"total":2,"rows":[{"fname":"待回复","fid":0},{"fname":"已回复","fid":1}]}
	});
	
}

//回复
function doAswer(obj) {
	$("#writeText").textbox("setValue","");
	if (obj.length > 1) {
		$.messager.alert('温馨提示', "请重新选择，目前只支持单一操作！", "info");
		return;
	}
	if (obj[0].fstate == '1') {
		$.messager.alert('温馨提示', "您都已经回复完毕了！", "info");
		return;
	}
	$("#FQContent").html(obj[0].fqcontent);
	$("#FQDate").html(obj[0].fqdate);

	$('#easyuiPopup').dialog({
		title : "回复",
		closed : false,
		// toolbar: [{
		// text:"保存",
		// iconCls:'icon-save',
		// handler:function(){
		// }
		// }],
		buttons : [ {
			text : '回复',
			width : 60,
			handler : function() {
				var row = getSelections();
				var ids = row[0].fid;
				// alert(ids)
				var FAContent = $("#writeText").val();
				var data = {};
				data["FAContent"] = FAContent;
				data["ids"] = ids;
				var dat = {
					jsonobj : JSON.stringify(data),
				}
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type : 'post',
					url : 'consultmanager/addResponse.do',
					dataType : 'json',
					data : dat,
					success : function(data) {
						$.messager.progress('close');
						if (data.result) {
							$.messager.alert('温馨提示', "回复成功！");
							doSearch();
						} else {
							$.messager.alert('温馨提示', "回复失败！");
						}
					}
				});
				$('#easyuiPopup').dialog({
					closed : true,
				});
			}
		}, {
			text : '关闭',
			width : 60,
			handler : function() {
				$('#easyuiPopup').dialog({
					closed : true,
				});
			}
		} ]

	});
}
//删除
function delBtn(id) {
	$.messager.confirm('温馨提示', "您确定要执行该操作吗？", function(r) {
		if (r) {
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				url : "consultmanager/delConsultM.do?ids=" + id,
				dataType : "json",
				success : function(data) {
					$.messager.progress('close');
					if (data.result == false) {
						$.messager.alert('温馨提示', "删除失败", "error");
					} else {
						$.messager.alert('温馨提示', "删除成功", "alert", function() {
							doSearch();
						});
					}
				}
			});
		}
	});
}

// 获取Table的行数
function getTableRows(){
	var tabLength = $('#easyuiTable').datagrid('getRows').length;
	return tabLength;
}
//返回复选框选中的所有行
function getChecked(){
	var obj = $('#easyuiTable').datagrid('getChecked');
	return obj;
}
//返回所有选中的行，当没有选中的记录时，将返回空数组。
function getSelections(){
	var obj = $('#easyuiTable').datagrid('getSelections');
	return obj;
}
//重置
function resetParam(){
	$("#easyuiForm").form('clear');
//	$('#state').combobox('setValues','-1');
}

//关闭弹窗
function closeDialog(){
	$('.easy-dlg').dialog({closed:true});
}
//获取复选框id
function getFids(){
	var ids = '';
	$("input[name='fid']:checked").each(function(){
		ids=ids+$(this).val()+",";
	});
	ids=ids.substring(0,ids.length-1);
	return ids;
}

