//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray =  [{id:"#searchStore",name:"storeIDs",type:"combo"},
		          {id:"#searchStock",name:"subStockName",type:"text"},
		          {id:"#searchMark",name:"markIDs",type:"combo"},
		          {id:"#searchStockClass",name:"stockClassIDs",type:"combo"},
		          {id:"#searchMode",name:"mode",type:"select",defval:'-1'},
		          {id:"#searchChecked",name:"checked",type:"select",defval:'-1'},
		          {id:"#searchStoped",name:"stopped",type:"select",defval:'0'},
		          {id:"#searchNo",name:"policyno",type:"text"}
		          ];
//默认的表格列数据和菜单ID
window.menuid = 415;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[
 {field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:"fid",title:"政策编号",width:100},
	{field:"fbegaindate",title:"开始时间"},
	{field:"fbegaindate",title:"结束时间"},
//	{field:"fsubstocknames",title:"适用商品",width:300},
	{field:"mode",title:"优惠方式",width:100},
	{field:"fullcuttype",title:"满减方式",width:100},
	{field:"isalone",title:"独立政策",width:100},
	{field:"ftotalamount",title:"购满金额",width:100},
	{field:"fperamount",title:"优惠金额/折扣率",width:100},
	{field:"ffeepayable",title:"优惠承担方式",width:100},
	{field:"fstate",title:"状态",width:100}
	]]
$(function(){
	//店铺
	$('#searchStore').jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		iconCls:"btn-success",//自定义按钮样式
		url : "select/stockFstore.do?type=0",
		label:"店铺:",
		labelWidth:80,
		width:200,
		isinline:false,//是否每行一个选项
		linenum:4,//当每行多个选项时，每一行选项的个数
	})
	//类别
	$('#searchStockClass').jeasycombo({
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		url : "select/stockClass.do?t=2",
		label:"商品类别:",
		labelWidth:80,
		width:200
	}) 
	//品牌
		$('#searchMark').jeasycombo({
			multiple : true,//是否多选
			type : "list",//弹出的样式
			iconCls:"btn-success",//自定义按钮样式
			url : "select/mark.do",
			label:"商品品牌:",
			labelWidth:80,
			width:200,
			isinline:false,//是否每行一个选项
			linenum:4,//当每行多个选项时，每一行选项的个数
		})
	//有效
		$("#searchChecked").combobox({
			data:[{'fid':-1,'fname':'全部','selected':true},{'fid':0,'fname':'无效'},{'fid':1,'fname':'有效'}]
		})
		//优惠方式
		$("#searchMode").combobox({
			data:[{'fid':-1,'fname':'全部','selected':true},{'fid':1,'fname':'满减'},{'fid':2,'fname':'直减'},{'fid':3,'fname':'打折'},{'fid':4,'fname':'赠品'},{'fid':5,'fname':'积分抵现'}]
		})
		//有效
		$("#searchStoped").combobox({
			data:[{'fid':-1,'fname':'全部'},{'fid':0,'fname':'否','selected':true},{'fid':1,'fname':'是'}]
		})
	//初始化表格
	$("#easy_table").datagrid({
		bodyCls:"easy-grid",
		toolbar:"#easy-tool",
		fit:true,
		rownumbers:true,
		singleSelect : true,
		selectOnCheck : false,
		checkOnSelect : false,
		pagination : true,
		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
      pageSize : 20, //每页显示的记录条数，默认为5  
	    columns : window.currentColumns,
	    onClickRow:function(index,row){
	    	showDetail(index,row);
	    }
	});
	//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		//注释的c标签也会起作用  请不要删掉
	 	button_role : $("#button_role").val(),
		button:[{text:"新增",iconCls:"icon-add",nocheck:true,// nocheck:true 代表不检查
			onclick:function(ids,rows){
				window.open("favorpolicy/editfavorpolicy.do?type=1");
		}},
		{text:"删除",iconCls:"icon-remove",
			onclick:function(ids,rows){
				aDelete(ids,rows)
		}},
		{text:"编辑",iconCls:"icon-edit",
			onclick:function(ids,rows){
				aEdit(ids,rows)
		}},
		{text:"有效",iconCls:"icon-ok",
			onclick:function(ids,rows){
				valid(ids,rows);
		}},
		{text:"终止",iconCls:"icon-stop",
			onclick:function(ids,rows){
				stop(ids,rows);
		}},
		{text:"适用店铺",iconCls:"icon-edit",
			onclick:function(ids,rows){
				beforeSetStores(ids,rows);
		}},
		{text:"政策预览",iconCls:"icon-edit",
			onclick:function(ids,rows){
				bef_preView(ids,rows);
		}}
	]
});
	$("#btnSearch").bind("click", function(){
		search();
  });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	})
	//预览选择框
	var preview='<div style="padding-top:20px;">'+  
   	'<div style="height: 45px"><input id="preStoreName" type="text"></div>'+
   	'<div style="height: 45px"><input id="preStockName" type="text"></div>'+
   	'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="preView();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closePreviewdialog()" >取消</a></div></div>'
	$("#preview-dialog").append(preview);
	$("#preview-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})


	//商品名称
	$("#preStockName").jeasycombo({
		multiple : false,//是否多选
		isinline:false,
		label:'商品名称',
		width:300,
		labelWidth:80,
		dlgwidth:800,
		linenum:1,
		type : "list",//弹出的样式
		btnclass : "btn-success",//按钮样式
		data:{"total":0,"rows":[]}
	});
	//店铺名称
	$("#preStoreName").jeasycombo({
		multiple : false,//是否多选
		isinline:false,
		label:'店铺名称',
		width:300,
		labelWidth:80,
		dlgwidth:800,
		linenum:1,
		type : "list",//弹出的样式
		btnclass : "btn-success",//按钮样式
		data:{"total":0,"rows":[]},
		onChange: function(ids, texts){
			var id = $('#preId').val();
			var storeid = $("#preStoreName").jeasycombo("getvalue").ids;
			$("#preStockName").jeasycombo("reload", "favorpolicy/getPreStock.do?id="+id+"&p_storeId="+storeid);
			$("#preStockName").jeasycombo("disabled", false);
		}
	})

});
	//适用店铺框
	var stores='<div style="padding-top:20px;">'+  
   	'<div style="height: 45px"><input id="addStores" type="text"></div>'+
   	'<div style="padding-left:220px;"><a class="easyui-linkbutton" onclick="setStores();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closeStoresdialog()" >取消</a></div></div>'
	$("#stores-dialog").append(stores);
	$("#stores-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})

//适用店铺
$("#addStores").jeasycombo({
	multiple : true,//是否多选
	isinline:false,
	label:'适用店铺',
	width:300,
	labelWidth:80,
	dlgwidth:800,
	linenum:4,
	type : "list",//弹出的样式
	btnclass : "btn-success",//按钮样式
	url : "select/stockFstore.do?type=0"
});

//适用店铺--按钮
function beforeSetStores(ids,rows){
	for ( var i = 0; i < rows.length; i++) {
		if(rows[i].faccpted == "2"){
			$.messager.alert("提示","数据中包含已终止的数据，请重新选择！","error");
			return;
		}
	}
	$('#ids').val(ids);
		$("#stores-dialog").dialog("open");
}
function search(){
	//查询前先组织查询条件
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","favorpolicy/getsearch.do");
	}
//设置适用店铺--保存(弹出)
function setStores(){
	var ids = $('#ids').val();
	var usjson={
			ids:ids,
			fstoreids:$("#addStores").jeasycombo("getvalue").ids,
			fstorenames:$("#addStores").jeasycombo("getvalue").texts
			};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
		url : 'favorpolicy/updateStores.do',
		data:{
			jsonStr:JSON.stringify(usjson)
		},
		dataType : "json",
		success : function(data){
			$.messager.progress("close");//隐藏加载
			if(data.result==false){
				$.messager.alert("提示",data.msg,"error");
			}else if(data.result == true){
				$.messager.alert("提示",data.msg,"info");
				$("#easy_table").datagrid("reload");//刷新数据
				$("#stores-dialog").dialog("close");
			}else{
				$.messager.alert("提示","未知错误！","error");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载
			$.messager.alert("提示","系统错误！","error");
		}
	});
}

//单行编辑
function aEdit(id,rows){
	var flag = canBeValid(rows);
	if(flag == true){
		window.open("favorpolicy/modifyfavorpolicy.do?type=2&id="+id);
	}else if(flag == 'checked'){
		$.messager.alert("提示","数据已有效，请重新选择！","error");
	}else if(flag == 'stoped'){
		$.messager.alert("提示","数据已终止，请重新选择！","error");
	}
}

//单行删除
function aDelete(id,rows) {
	var flag = canBeValid(rows);
	if (flag == true) {
		$.messager.confirm("确定","您确认要删除该促销政策吗？", function(r) {
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type : 'post',
					url : 'favorpolicy/deleteSingle.do',
					data : {
						id : id
					},
					dataType : "json",
					success : function(data) {
						$.messager.progress("close");//隐藏加载
						if (data.result == false) {
							$.messager.alert("提示",data.msg, "error");
						} else if (data.result == true) {
							$.messager.alert("提示",data.msg,"info",function(){
								  $("#easy_table").datagrid('reload');
							    });
							/*$.messager.alert("提示",data.msg, "info");
							$("#jboottable-favorpolicy").jboottable("refresh");//刷新数据*/
						} else {
							$.messager.alert("提示","未知错误！", "error");
						}
					},
					error : function() {
						$.messager.progress("close");//隐藏加载
						$.messager.alert("提示","系统错误！", "error");
					}
				});
			}
		});
	} else if (flag == 'checked') {
		$.messager.alert("提示","数据已有效，请重新选择！", "error");
	} else if (flag == 'stoped') {
		$.messager.alert("提示","数据已终止，请重新选择！", "error");
	}
}

//有效
function valid(ids,rows){
	var flag = canBeValid(rows);
	if(flag == true){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type : 'post',
			url : 'favorpolicy/validpolicy.do',
			data:{
				ids:ids
			},
			dataType : "json",
			success : function(data){
				$.messager.progress("close");//隐藏加载
				if(data.result==false){
					
					$.messager.alert("提示",data.msg,"error");
				}else if(data.result == true){
					$.messager.alert("提示",data.msg,"info",function(){
						$("#easy_table").datagrid('reload');
					    });
					/*$.messager.alert("提示",data.msg,"info");
					$("#jboottable-favorpolicy").jboottable("refresh");//刷新数据*/
				}else{
					$.messager.alert("提示","未知错误！","error");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载
				 $.messager.alert("提示","系统错误！","error");
			}
		});
	}else if(flag == 'checked'){
		$.messager.alert("提示","数据中包含已有效的数据，请重新选择！","error");
	}else if(flag == 'stoped'){
		$.messager.alert("提示","数据中包含已终止的数据，请重新选择！","error");
	}
}

//查询状态（编辑、有效、删除【按钮】）  0=无效，1=有效，2=终止
function canBeValid(rows){
	for ( var i = 0; i < rows.length; i++) {
		var fstate = rows[i].faccpted;
		if(fstate == '1'){
			return "checked";
		}
		if(fstate == '2'){
			return "stoped";
		}
	}
	return true;
}

//查询状态  0=无效，1=有效，2=终止
function isStop(rows){
	for ( var i = 0; i < rows.length; i++) {
		var fstate = rows[i].faccpted;
		if(fstate != '1'){
			return "stoped";
		}
	}
	return true;
}

//终止
function stop(ids,rows){
	var flag = isStop(rows);
	if(flag == true){
		$.messager.confirm("确定","您确认要终止选中的政策吗？", function(r) {
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					type : 'post',
					url : 'favorpolicy/stoppolicy.do',
					data:{
						ids:ids
					},
					dataType : "json",
					success : function(data){
						$.messager.progress("close");//隐藏加载
						if(data.result==false){
							$.messager.alert("提示",data.msg,"error");
						}else if(data.result == true){
							$.messager.alert("提示",data.msg,"info",function(){
								   $("#easy_table").datagrid('reload');
							    });
							/*$.messager.alert("提示",data.msg,"info");
							$("#jboottable-favorpolicy").jboottable("refresh");//刷新数据*/
						}else{
							$.messager.alert("提示","未知错误！","error");
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载
						 $.messager.alert("提示","系统错误！","error");
					}
				});
			}
		});
	}else if(flag == 'stoped'){
		$.messager.alert("提示","数据中包含无效或已终止的数据，请重新选择！","error");
	}
}

//促销政策预览--保存
function preView(){
	var id = $('#preId').val();
	var unitid = queryUnitID();
	var storeids = $("#preStoreName").jeasycombo("getvalue").ids;
	var stockids = $("#preStockName").jeasycombo("getvalue").ids;
	var stockid = queryStockID(stockids);
	if(storeids == ''){
		$.messager.alert("提示","请选择店铺","error");
		return;
	}
	if(stockids == ''){
		$.messager.alert("提示","请选择商品","error");
		return;
	}
	window.open("stockDeTails/MOstockinfoById.do?FStockID="+stockid+"&unitid="+unitid+"&storeid="+storeids+"&virstore="+storeids+"&type=1&vtype=1");
	//window.open("stockDeTails/getFavorPolicyInfo.do?stockId="+stockids+"&storeId="+storeids+"&markId=0&treeCode=''&unitId="+unitid+"&type=1");
	//$.messager.alert("提示","正在建设中...","error");
	$("#preview-dialog").dialog("close");
}

//政策预览
function bef_preView(ids,rows){
	if(rows.length>1){
		$.messager.alert("提示","请只选择一条数据！", "error");
		return false;
	}
	$('#preId').val(ids);
	var id = $('#preId').val();
	if(rows[0].faccpted=="2"){
		$.messager.alert("提示","数据已终止，请重新选择！", "error");
		return ;
	}
	$("#preStoreName").jeasycombo("setvalue","");
	$("#preStockName").jeasycombo("setvalue","");
	$("#preStoreName").jeasycombo("reload", "favorpolicy/getPreStore.do?id="+id);
	$("#preStoreName").jeasycombo("disabled", false);
	$("#preStockName").jeasycombo("reload", "favorpolicy/getPreStock.do?id="+id+"&p_storeId=");
	$("#preStockName").jeasycombo("disabled", false);
	$("#preview-dialog").dialog("open");
}

//获取单位
function queryUnitID(){
	var unitid="";
	$.ajax({
		type:"post",
		url:"unitstock/queryUnitidsto.do",
		dataType:"json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			unitid=data;
		}
	});
	return unitid;
}

function queryStockID(stockids){
	var stockid="";
	$.ajax({
		type:"post",
		url:"favorpolicy/queryStockID.do?id="+stockids,
		dataType:"json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			stockid=data;
		}
	});
	return stockid;
}
//展示详情
function showDetail(index,row){
	var detail='<tr class="hiddenTR"><td>'
	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 100%"><label class="title">适用店铺：</label><label title="'+row.fstorenames+'" class="value">'+row.fstorenames+'</label></div>'
	+'</div>'
	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 100%"><label class="title">适用商品类别：</label><label title="'+row.fstockclassnames+'" class="value">'+row.fstockclassnames+'</label></div>'
	+'</div>'
	+'<div class="form-inline" style="height:auto!important;">'
	+'<div class="form-group" style="width: 100%"><label class="title">适用品牌：</label><label title="'+row.fmarknames+'" class="value">'+row.fmarknames+'</label></div>'
	+'</div>'
	+'<div class="form-inline" style="height:auto!important;">'
	+'<div class="form-group" style="width: 100%;"><label class="title" >适用商品：</label><label title="'+row.fsubstocknames+'" class="value">'+row.fsubstocknames+'</label></div>'
	+'</div>'
	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 100%"><label class="title" >赠品名称：</label><label title="'+row.fgiftnames+'" class="value">'+row.fgiftnames+'</label></div>'
	+'</div>'
	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 32.3%"><label class="title" >联合满减政策：</label><label title="'+row.flinkpolicyids+'" class="value">'+row.flinkpolicyids+'</label></div>'
//	+'</div>'
//	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 32.3%"><label class="title" >最大满减金额：</label><label title="'+row.fmaxfullcutamount+'" class="value">'+row.fmaxfullcutamount+'</label></div>'
//	+'</div>'
//	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 32.3%"><label class="title" >最大赠送种类：</label><label title="'+row.fgiftmaxquanty+'" class="value">'+row.fgiftmaxquanty+'</label></div>'
	+'</div>'
	+'<div class="form-inline">'
	+'<div class="form-group" style="width: 32.3%"><label class="title" >总部承担：</label><label title="'+row.fcorpfeepayrate+'" class="value">'+row.fcorpfeepayrate+'</label></div>'
	+'<div class="form-group" style="width: 32.3%"><label class="title" >厂家承担：</label><label title="'+row.funitfeepayrate+'" class="value">'+row.funitfeepayrate+'</label></div>'
	+'<div class="form-group" style="width: 32.3%"><label class="title" >商家承担：</label><label title="'+row.fstorefeepayrate+'" class="value">'+row.fstorefeepayrate+'</label></div>'
	+'</div>'
	+'<div class="form-inline borderNone">'
	+'<div class="form-group"><label class="title" >促销说明：</label><label title="'+row.fabstract+'" class="value">'+row.fabstract+'</label></div>'
	+'</div>'
	+'</td></tr>';
	$("#detail_table").empty();
	$("#detail_table").append(detail);
}

function closePreviewdialog(){
	$("#preview-dialog").dialog('close');
}
function closeStoresdialog(){
	$("#stores-dialog").dialog('close');
}