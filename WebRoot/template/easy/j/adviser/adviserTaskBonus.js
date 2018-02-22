var columns=[
				{field:'ck',title:"选择",checkbox:true,align:'center'},
				{field:"fid",title:"员工Id",hidden:true},
			    {field:'fadvisername',title:'员工姓名',width:100},	
			    {field:'fjobno',title:'员工工号',width:100},
			    {field:'rankname',title:'岗位',width:100},
			    {field:'storename',title:'门店'},
			    {field:'developbonus',title:'开发奖励',width:100,fmt:"fmt_isEmpty"},
			    {field:'saveoldcustomerbonus',title:'维护老客户 ',width:100,fmt:"fmt_isEmpty"},
			    {field:'activeoldcustomerbonus',title:'激活老会员',width:100,fmt:"fmt_isEmpty"},
			    {field:'clearbonus',title:'清洗奖励',width:100,fmt:"fmt_isEmpty"},
			    {field:'totalbonus',title:'奖励合计',width:100,fmt:"fmt_isEmpty"}
         ]
Util.fmt_isEmpty=function(value,row,index){
			    	return isEmpty(value);
}
//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray =  [{id:"#bonus_Begintime",name:"bonus_Begintime",type:"date"},
					  {id:"#bonus_Endtime",name:"bonus_Endtime",type:"date"},
			          {id:"#fstoreId",name:"fstoreId",type:"combo"}, 
			          {id:"#frankID",name:"frankID",type:"select",defval:"-1"},
			          {id:"#fname",name:"fname",type:"text"},
			          {id:"#fjobNo",name:"fjobNo",type:"text"},
			          {id:"#fbonusType",name:"fbonusType",type:"select",defval:"-1"}
			          ];
//默认的表格列数据和菜单ID
window.menuid = 1207;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [columns];

	$(function(){
		
	    //门店
	    $("#fstoreId").jeasycombo({
			multiple : true,//是否多选
			isinline:false,
			dlgwidth:800,
			label:'门店:',
			labelWidth:80,
			width:198,
			linenum:4,
			type : "list",//弹出的样式
			btnclass : "btn-success",//按钮样式
			url : "select/selectStore.do?selecttype=3&unitid=0&userid=0&storetypes=0,1"
	});
	    
		//岗位
	     $("#frankID").combobox({
	    	 data:frankArr
		});
	     /* <select class="form-control input-sm" id="fbonusType">
			<option value="-1" selected>全部</option>
		    <option value="1">激活老顾客维护</option>
		    <option value="2">客户流失维护</option>
		    <option value="3">服务任务</option>
		    <option value="4">开发会员</option>
     </select> */
     $("#fbonusType").combobox({
    	 data:[{"fid":-1,"fname":'全部',"selected":true},{"fid":1,"fname":'激活老顾客维护'},
    	       {"fid":2,"fname":'客户流失维护'},{"fid":3,"fname":'服务任务'},{"fid":4,"fname":'开发会员'}]
     })
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
		columns:window.currentColumns,
		onClickRow:function(index,row){
	    	showDetail(index,row);
	    }
		})
		//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns
	})
	$("#btnSearch").bind("click", function(){
		//查询前先组织查询条件
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","adviserApp/queryAdviserTaskBonus.do");
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
});
	
//展示奖励详细信息
function showDetail(index,row){
	var detail="";
	$(row.detailList).each(function(){
		 detail+='<div class="form-inline">'
			+'<div class="form-group" style="width: 25%"><label class="title">任务日期：</label><label title="'+this.fbonusdate+'" class="value">'+this.fbonusdate+'</label></div>'
			+'<div class="form-group" style="width: 17%"><label class="title">任务类型：</label><label title="'+this.fbonustypename+'" class="value">'+this.fbonustypename+'</label></div>'
			+'<div class="form-group" style="width: 17%"><label class="title">会员姓名：</label><label title="'+this.funitusername+'" class="value">'+this.funitusername+'</label></div>'
			+'<div class="form-group" style="width: 18%"><label class="title">会员手机号：</label><label title="'+this.funitusertelno+'" class="value">'+this.funitusertelno+'</label></div>'
			+'<div class="form-group" style="width: 17%"><label class="title">奖励金额：</label><label title="'+this.fbonus+'" class="value">'+isEmpty(this.fbonus)+'</label></div>'
			+'</div>'
			
	});
	 var detaillist='<tr class="hiddenTR"><td>'+detail+'</td></tr>';
	 $("#detail_table").empty();
	 $("#detail_table").append(detaillist);
}
//判断是否为空
function isEmpty(param){
	if(param==undefined || param==""){
		return 0;
	}
	return param;
}