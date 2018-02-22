$(function(){
	//设置时间  
//	var times = new Date();
//	$("#searchFdateStart").datebox("setValue",myformatter(times));  
	//日期字段只读
	$(".datebox :text").attr("readonly","readonly");
	
	//经营类型
	 $('#searchStockClass').jeasycombo({
			multiple : true,//是否多选
			type : "tree",//弹出的样式
			label : "商品类别:",
			btnclass:"btn-success",//自定义按钮样式
			url : "select/stockClass.do?t=2",
			width:200,
			labelWidth:60
		});
	//品牌
	$('#searchMark').jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		label : "商品品牌:",
		btnclass:"btn-success",//自定义按钮样式
		url : "select/mark.do",
		width:200,
		labelWidth:60,
		isinline:false,//是否每行一个选项
		linenum:4//当每行多个选项时，每一行选项的个数
	});
	
	var paramArray = [{id:"#searchFdateStart",name:"beginTime",type:"date"},
			          {id:"#searchFdateEnd",name:"endTime",type:"date"},
			          {id:"#searchRealNo",name:"realno",type:"text"},
			          {id:"#searchMark",name:"markname",type:"combo"},
			          {id:"#searchStockClass",name:"stockclassname",type:"combo"},
			          {id:"#searchStockName",name:"stockname",type:"text"},
			          {id:"#searchReceiver",name:"receiver",type:"text"},
			          {id:"#searchTel",name:"telno",type:"text"},
			          {id:"#searchMode",name:"mode",type:"select",defval:'0'},
			          {id:"#searchPolicyID",name:"policyid",type:"text"},
			          {id:"#searchPayRate",name:"payrate",type:"select",defval:'0'}
			          ];
	//查询按钮
	$('#btnSelect').bind('click',function(){
		$("#easyuiTable").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easyuiTable").datagrid("load","managerorders/queryFavorOrders.do");
	})

	//重置按钮
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
});

//重置
function resetParam(){
	$("#formSum").form('clear');
	
	$('.easyui-combobox').combobox('setValues','0');
//	$('#state').combobox('setValues','-1');
}
//时间框默认时间本月1日
function myformatter(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = 1;  
//    var d = date.getDate();  
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);  
} 
