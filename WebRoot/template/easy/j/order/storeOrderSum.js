$(function(){
	
	//日期字段只读
	$(".datebox :text").attr("readonly","readonly");
	
//	sumDatagrid('','');
	
	var paramArray = [{id:"#begindate",   name:"begindate",     type:"date"},
				  		 {id:"#fenddate",     name:"fenddate",  type:"date"},
				  		 {id:"#storeid",     name:"storeid",       type:"combo"},
				  		 {id:"#selecttype1", name:"selecttype1",   type:"select",defval:'0'},
				  		 {id:"#selecttype2", name:"selecttype2",   type:"select",defval:'0'},
				  		 {id:"#stockclass",  name:"stockclassids", type:"combo"},
				  		 {id:"#mark",        name:"markids",       type:"combo"},
				  		 {id:"#stock",       name:"stock",         type:"text"},
				  		 {id:"#state1",      name:"state1",        type:"select",defval:'1'},
				  		 {id:"#state2",      name:"state2",        type:"select",defval:'0'}];
	//查询按钮
	$('#btnSelect').bind('click',function(){
		var selecttype1 = $("#selecttype1").combobox('getText');
		var selecttype2 = $("#selecttype2").combobox('getText');
		//初始化表头
		sumDatagrid(selecttype1,selecttype2);
		
		$("#easyuiTable").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easyuiTable").datagrid("load","managerorders/queryOrderSum.do");
	})

	
	//重置按钮
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
});


//查询方法
function funSearch(){
	var json = getQueryCondition();
//	alert(json);
  $('#cardTable').datagrid({
//		技能列表	
		queryParams:{
			jsonobj:json
		},
		url:'cardScore/queryCardScore.do'
	});
}

function sumDatagrid(selecttype1,selecttype2){
	if(selecttype1 == '' || selecttype2  == ''){
		selecttype1 = '一级汇总';
		selecttype2 = '二级汇总';
	}
	var hid = false;
	if(selecttype1 == selecttype2){
		hid = true;
	}
	var defaultColumns = [[   
		//{field:'fid',checkbox:true},
		{field:'fitem1',width:80,title:selecttype1},
		{field:'fitem2',width:80,title:selecttype2,hidden:hid},
		{field:'fquanty',width:80,align:'center',title:'销售数量'},
		{field:'fstockamount',width:80,align:'center',title:'销售金额'},
		{field:'ftotalamount',title:'实付金额'},
		{field:'fname',width:150,align:'center',title:'销售单位'}
		]];
	//数据网络参数设置
	$("#easyuiTable").datagrid({
		bodyCls:"easy-grid",
		fit:true,
		rownumbers:true,
		singleSelect : true,
		selectOnCheck : false,
		checkOnSelect : false,
		pagination : true,
		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
        pageSize : 20, //每页显示的记录条数，默认为5  
	    columns : defaultColumns
//	formatter:formatStop,
	});
}
