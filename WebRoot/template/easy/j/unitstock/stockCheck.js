//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [{id:"#stockmarkid",name:"markids",type:"combo"},
			  	  {id:"#stockclassid",name:"stockclassids",type:"combo"},
			  	  {id:"#stocknameid",name:"stockname",type:"text"},
			  	  {id:"#ftype",name:"ftype",type:"select",defval:"0"},
			  	  {id:"#fstockcode",name:"stockcode",type:"text"}];
//图片服务器
var path = $("#imgurl").attr("path");
//默认的表格列数据和菜单ID
window.menuid = 422;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[{field:'ck',title:"选择",checkbox:true,align:'center'},
 {field:'fcover',title:"图片",width:90,fmt:"fmt_fcover"},
 {field:'fstockcode',title:"外部编码",width:100,fmt:"fmt_fstockcode"},
 {field:'fsubstockname',title:"商品名称",width:300/*,formatter:function(value,row,index){
	 var data=$("#easy_table").datagrid('getData');
	 return "<a href='elecShelf/getElecStockByID.do?unitid="+data.unitid+"&storeid=0&goodno="+row.fstockid+"&isView=1&stockClassId=0' target='_blank'>"+value+"</a>"
 }*/},
 {field:'ferpstockname',title:"ERP商品名称"},
 {field:'ferpshortcode',title:"ERP商品简码"},
 {field:'ferpstockclass',title:"ERP商品类别"},
 {field:'ferpmark',title:"ERP品牌",width:100},
 ]];
//格式化图片
Util.fmt_fcover=function(value,row,index){
	return '<img src="'+path+value+'" class="Img" style="margin-left: 5px;"/>'
} 
//格式化外部编码
Util.fmt_fstockcode=function(value,row,index){
	return "<input id='fstockcode"+row.fsubstockid+"' onChange='changeFstockcode("+row.fsubstockid+")' value='"+value+"'/>"
} 
 //获取修改了外部编码数据的id
 var ids=new Array();
 function changeFstockcode(fsubstockid){
	 for(var i=0;i<ids.length;i++){
		 if(ids[i]==fsubstockid){
			 return false;
		 }
	 }
	 ids.push(fsubstockid);
 }
$(function(){
	//baseServiceImpl---setResult方法更改
	var userid="${sessionScope.user.FID}";
	//初始化表格
	$("#easy_table").datagrid({
		bodyCls:"easy-grid",
		toolbar:"#easy-tool",
		fit:true,
		nowrap:false,
		rownumbers:true,
		singleSelect : true,
		selectOnCheck : false,
		checkOnSelect : false,
		/*pagination : true,
		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
        pageSize : 20, //每页显示的记录条数，默认为5  
*/	    columns : window.currentColumns,
	    onLoadSuccess:function(data){
	    	if(data.result==2){
//	    		$("#easy_table").datagrid('hideColumn','ferpstockname');
//	    		$("#easy_table").datagrid('hideColumn','ferpshortcode');
//	    		$("#easy_table").datagrid('hideColumn','ferpstockclass');
//	    		$("#easy_table").datagrid('hideColumn','ferpmark');
	    	}
	    	if(!data.result){
	    		$.messager.alert("提示",data.msg,"error")
	    	}
	    }
	});
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		button_role : $("#menu_ffunction").val()+",导出Excel",
		button:  [
				   {text:"保存外部系统编码", iconCls:"icon-save", nocheck:true,onclick:function(ids,rows){
					   saveStockCode();
			       }},
			       {text:"导出Excel", iconCls:"icon-edit", nocheck:true,onclick:function(ids,rows){
					   window.open("stock/stockCheckExport.do");
			       }}
			]
	})
	$("#btnSearch").bind("click", function(){
		//查询前先组织查询条件
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","stock/stockCheck.do");
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	 //品牌名称
	$("#stockmarkid").jeasycombo({
		width:180,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		label: "品牌名称",
		width: 200,
		labelWidth: 80,
		/* data:"${stockMarkName}" */
		url: "select/mark.do"
	});
	//商品类别
	$("#stockclassid").jeasycombo({
		width:180,
		multiple : true,//是否多选
		type:"tree",//弹出的样式
		url : "select/stockClass.do?t=2",
		label: "商品类别",
		width: 200,
		labelWidth: 80
	});
	$("#ftype").combobox({
		data:[{'fid':0,'fname':'全部'},{'fid':1,'fname':'已匹配'},{'fid':2,'fname':'未匹配'}]
	})
	$("#hide-dialog").dialog({
		title:"保存外部编码提示信息",
		footer:"<button class='btn btn-primary' aria-hidden='true' onclick='closeHidedialog()' data-dismiss='modal'>确定</button>"
	});
});
//关闭提示窗口
function closeHidedialog(){
	$("#hide-dialog").dialog('close');
}
//保存外部系统编码
function saveStockCode(){
	if(ids.length==0){
		$.messager.alert("提示","没有数据外部系统编码发生改变，不需要保存！","info");
		return;
	}
	var data=new Array();
	for(var i=0;i<ids.length;i++){
		var fid=ids[i];
		var fstockcode=$("#fstockcode"+ids[i]).val();
		var data1={};
		data1["fid"]=fid;
		data1["fstockcode"]=fstockcode;
		data.push(data1);
	}
	var param={
			jsonobj:JSON.stringify(data)
		}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"stock/editStockCode.do",
		data:param,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载
			//保存修改后，重置修改了得数据的ID集合
			  ids=[];
		//修改商品编码中存在编码被占用，但不是全部
		  if(data.res==1){
			  $("#easy_table").datagrid('reload');
			  var trs = ""
           	  for (var i = 0; i < data.msglist.length; i++) {
   				trs +="<tr><td>"+data.msglist[i].massage+"</td></tr>"
   			  }
           	  var body='<div style="height:300px;"><table><thead><tr><th>提示信息</th></thead<tbody>'
   			     +trs+'</tbody></table></div>';
           	  $("#hide-dialog").dialog("clear");
           	  $("#hide-dialog").append(body);
           	  $("#hide-dialog").dialog("open");
		  }else if(data.result){
			  $("#easy_table").datagrid('reload');
			  $.messager.alert("提示",data.msg,"info");
			  
		  }else{
			  $.messager.alert("提示",data.msg,"error");
		  }
		},
		error:function(){
			$.messager.progress("close");//隐藏加载
			$.messager.alert("提示","系统错误","error");
		}
	})
}