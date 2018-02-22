//当前时间
var time=new Date();
var date=time.toLocaleDateString();
window.defaultColumns=[[
				{field:'ck',title:"选择",checkbox:true,align:'center'},
				{field:" fid",title:"ID",hidden:true},
				{field:"fphoneno",title:"手机号"},
			    {field:'fregkey',title:'验证码',width:100},	
			    {field:'fregtime',title:'发送时间'}
              ]]
//默认的表格列数据和菜单ID
window.menuid = 109;//菜单ID
window.currentColumns = new Array();
//查询参数数据
var paramArray = [
              	{id:"#fbegin_time",name:"fbegin_time",type:"text"},
              	{id:"#fphoneno",name:"fphoneno",type:"text"}]

$(function(){
 // 获取自定义表头数据
	$('#easy_table').datagrid({
		/*url:searchUrl,*/
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
		columns:window.currentColumns
		})
		//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns
	});
	//条件查询
	$('#btnSearch').bind('click',function(){
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","user/querySCRegMobile.do");
	})
	
	$('#btnReset').bind('click',function(){
		Util.resetParam(paramArray);
	})
	$('#fbegin_time').datebox('setValue',date);
//获取searchForm中数据,重新加载主表格数据
})