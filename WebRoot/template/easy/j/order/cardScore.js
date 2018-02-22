$(function(){
	
	//日期字段只读
	$(".datebox :text").attr("readonly","readonly");
	//初始化有效下拉框
	$("#state").combobox({
		valueField: "id",    
        textField: "text", 
        editable:false,
		data:[{"id":-1,"text":"全部","selected":true},{"id":0,"text":"未有效"},{"id":1,"text":"已有效"}]
	});
	//初始化终止下拉框
	$("#stop").combobox({
		valueField: "id",    
        textField: "text", 
        editable:false,
		data:[{"id":-1,"text":"全部","selected":true},{"id":0,"text":"未终止"},{"id":1,"text":"已终止"}]
	});
	
	$("#stockclassid").jeasycombo({
		width:200,
		labelWidth:60,
		label:'类别:',
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		url : "select/stockClass.do?t=2"
	});
	$("#markids").jeasycombo({
		width:200,
		labelWidth:60,
		label:'品牌:',
		multiple : true,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		url : "select/mark.do"
	});
	
	var paramArray = [{id:"#validdatebegin",name:"validdatebegin",type:"date"},
	      		        {id:"#validdateend",name:"validdateend",type:"date"},
	    		        {id:"#state",name:"state",type:"select",defval:"-1"},
	    		        {id:"#stop",name:"stop",type:"select",defval:"-1"},
	    		        {id:"#stockclassid",name:"stockclassid",type:"combo"},
	    		        {id:"#markids",name:"markids",type:"combo"}];
	//查询按钮
	$("#btnSearch").click(function() {
		$("#cardTable").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#cardTable").datagrid("load","cardScore/queryCardScore.do");
	});
	
	//重置按钮
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
});

//查询方法
function funSearch(){
//	var json = getQueryCondition();
////	alert(json);
//    $('#cardTable').datagrid({
////		技能列表	
//		queryParams:{
//			jsonobj:json
//		},
//		url:'cardScore/queryCardScore.do'
//	});
    var paramArray = [{id:"#validdatebegin",name:"validdatebegin",type:"text"},
	      		        {id:"#validdateend",name:"validdateend",type:"text"},
	    		        {id:"#state",name:"state",type:"text"},
	    		        {id:"#stockclassid",name:"stockclassid",type:"text"},
	    		        {id:"#markids",name:"markids",type:"select"}];
	$("#cardTable").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#cardTable").datagrid("load","cardScore/queryCardScore.do");
}

////有效按钮
//function accepted(){
//	var ids=getFids();
//	var boo  = isAllowOperate(ids,1);
//	if (boo == "true"){
//		operated(ids,1);
//	}
////	$.messager.alert('温馨提示',boo);
//}
//
////删除按钮
//function deleted(){
//	var ids=getFids();
//	var boo  = isAllowOperate(ids,2);
//	if (boo == "true"){
//		operated(ids,2);
//	}
//}
//
////终止按钮
//function stopped(){
//	var ids=getFids();
//	var boo  = isAllowOperate(ids,3);
//	if (boo == "true"){
//		operated(ids,3);
//	}
//}

//是否可以有效=1、删除=2、终止=3、编辑=4
function isAllowOperate(ids, rows, type){
	if (ids ==""){
		$.messager.alert('温馨提示',"您还没有选择数据！");
		return "false";
	}
	if (type == 4){
		if(ids.indexOf(",") != -1){
			$.messager.alert('温馨提示',"请选择一条要操作的记录！");
			return "false";
		}
	}
	var row = $('#cardTable').datagrid('getChecked');
	var row = rows;
	for ( var i = 0; i < row.length; i++) {
		var accpeted = row[i].faccepted;
		if ((type == 1) || (type == 2) || (type == 4)){
			if(accpeted == 1){
				$.messager.alert('温馨提示',"不能选择已经有效的数据，请重新选择！");
				return "false";
			}
		}
		else if (type == 3){
			var stopped = row[i].fstopped;
			if ((accpeted == 0) || (stopped == 1)) {
				$.messager.alert('温馨提示',"不能选择无效或者已终止的数据，请重新选择！");
				return "false";
			}
		}
	}
	return "true";
}

//type(有效=1,删除=2,终止=3)
function operated(ids, type) {
	var url = "";
	if (type == 1) {
		url = "cardScore/operatedCardScore_accepted.do";
	} else if (type == 2) {
		url = "cardScore/operatedCardScore_delete.do";
	} else if (type == 3) {
		url = "cardScore/operatedCardScore_stop.do";
	}

	$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r) {
		if (r) {
			var flag = false;
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type : 'post',
				url : url,
				dataType : 'json',
				async : false,
				data : {
					ids : ids,
					type : type
				},
				success : function(data) {
					$.messager.progress('close');
					if (data.result) {
//						$.messager.alert('温馨提示','添加成功', "info");
//						window.location.href = "template/red/order/cardScore.jsp";
						$("#cardTable").datagrid('reload');
					} else {
						var msg = "操作失败";
						if (data.msg != "") {
							msg = data.msg;
						}
						$.messager.alert('温馨提示',msg, "error");
//						$.jbootmsg(msg, "error");
					}

				},
				error : function() {
					$.messager.progress('close');
//					$.jbootloading("hide");
//					$.jbootmsg("操作失败", "error");
				}
			});
		}
	});
}

//获取查询筛选条件 方法
function getQueryCondition(){
	var jsonobj = $("#easyParam").serializeJSON();
	//FValidDateBegin=&FValidDateEnd=&FStockClassID=-1&FMarkID=-1&state=-1
	return JSON.stringify(jsonobj);
} 

//合并两个json对象
function mergeJsonObj(jsonObj1, jsonObj2) {
    var jsonResult = {};
    for ( var item in jsonObj1) {
        jsonResult[item] = jsonObj1[item];
    }
    for ( var item in jsonObj2) {
        jsonResult[item] = jsonObj2[item];
    }
    return jsonResult;
}



//重置
function resetParam(){
	$("#easyParam").form('clear');
	$('#state').combobox('setValues','-1');
}

//获取cardTable的行数
function getTableRows(){
	var tabLength = $('#cardTable').datagrid('getRows').length;
	return tabLength;
}
//关闭弹窗
function closeDialog(){
	$('.easy-dlg').dialog({closed:true});
}


function getFids(){
	var ids = '';
	$("input[name='fid']:checked").each(function(){
		ids=ids+$(this).val()+",";
	});
	ids=ids.substring(0,ids.length-1);
	return ids;
}
