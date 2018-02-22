function queryUnirID(){
	var unitid;
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
//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [
      			{id:"#fname",name:"stockname",type:"text"},
    			{id:"#fstockcode",name:"stockcode",type:"text"},
    			{id:"#fmarkID",name:"markids",type:"combo"},
    			{id:"#stockFstockclass",name:"stockclassids",type:"combo"},
    			{id:"#stockclasscode",name:"stockclasstree",type:"text"},
    			];
//图片服务器
var path = $("#imgurl").attr("path");
//默认的表格列数据和菜单ID
window.menuid = 408;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:'fid',title:"ID",checkbox:true,hidden:true},
	{field:"fstockname",title:"商品名称",width:200},
	{field:"fcover",title:"图片",width:100,fmt:"fmt_fcover"},
	{field:"compareprice",title:"比价",width:150,fmt:"fmt_compareprice"}, 
	{field:"fprice",title:"销售价",width:100,fmt:"fmt_fprice"},
	{field:"fmarketprice",title:"市场价",width:100,fmt:"fmt_fmarketprice"},
	{field:"flimitprice",title:"最低限价",width:100,fmt:"fmt_flimitprice"}, 
	{field:"fstockcode",title:"外部编码",width:100,fmt:"fmt_fstockcode"}
]];
//格式化图片
Util.fmt_fcover=function(value,row,index){
		var fcover="<img class='Img' id='state_"+row.fid+"' fstockstate="+row.fstockstate+" src = '"+path+value+"'/>";
		if(row.flimitpurchase){
			fcover+="<img src='img/stock_xg.png' class='Img' />";
		}
		return fcover
}	
//格式化比价
Util.fmt_compareprice=function(value,row,index){
		return"<div style='max-width:440px;display:none; height:30px; padding-left:10px;overflow: hidden; text-overflow: ellipsis;white-space: nowrap;' id='fname"+row.fid+"'>"+row.fsubstockname+"</div>"+ 
		"<span class='s-tag sc-jd'><i class='s-jd' title='京东价：'></i><span id='jd"+row.fid+"'>京东价：</span></span>"+
	 	 "<br/><span class='s-tag sc-sn'><i class='s-sn' title='苏宁价：'></i><span id='sn"+row.fid+"'>苏宁价：</span></span>"+
	 	 "<br/><span class='s-tag sc-gm'><i class='s-gm' title='国美价：'></i><span id='gm"+row.fid+"'>国美价：</span></span>"+
	 	 "<img src='jboot-ui/css/img/loading.gif' style='display: none;'>"+
	 	 "<br/>&nbsp;&nbsp;<span class='primary' style='padding: 2px 3px; cursor: pointer;' fid='"+row.fid+"' fname='"+row.fstockname+"' onclick='getWebPrice("+row.fid+",\""+row.fstockname+"\", this)'><img style='width:45px;height:20px;' src='jboot-ui/css/img/BJ.png'/></span>"+
	 	 "</div>"
}	
//格式化销售价
Util.fmt_fprice=function(value,row,index){
	return "￥"+setZero(value)+"<br/><input type='text' id='price"+row.fid+"' value='"+setZero(value)+"' onchange='priceChange("+row.fid+")' onkeyup=\"value=value.replace(/[^\\d.]/g,'')\"/>";
}	
//格式化外部编码
Util.fmt_fmarketprice=function(value,row,index){
		return "￥"+setZero(value)+"<br/><input type='text' id='market"+row.fid+"' value='"+setZero(value)+"' onchange='priceChange("+row.fid+")' onkeyup=\"value=value.replace(/[^\\d.]/g,'')\"/>"
}	
//格式化最低限价
Util.fmt_flimitprice=function(value,row,index){
		return "￥"+setZero(value)+"<br/><input type='text' id='limit"+row.fid+"' value='"+setZero(value)+"' onchange='priceChange("+row.fid+")' onkeyup=\"value=value.replace(/[^\\d.]/g,'')\"/>"
}	
//格式化最低限价
Util.fmt_fstockcode=function(value,row,index){
		return "&nbsp;<br/><input type='text' id='stockcode"+row.fid+"' value='"+value+"' onchange='priceChange("+row.fid+")'/>";
}	

	
	function setZero(value){
		if(value==''||value==undefined){
			value=0;
		}
		return value;
	}
	
$(function(){
	var unitid=queryUnirID();
	$("#hide-dialog").dialog({
		title:"推送价格给店铺提示框",
		body:'',
		footer:"<button class='btn btn-primary' aria-hidden='true' data-dismiss='modal' onclick='closeHidedialog()'>确定</button>"
	});
	//商品类别
	$('#stockFstockclass').jeasycombo({
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		url : "select/stockClass.do?t=2",
		label:"商品类别:",
		labelWidth:80,
		width:200,
		onChange:function(){
			var fstockclasstree=$("#stockFstockclass").jeasycombo("getvalue").codes;
			//console.log(fstockclasstree);
			$("#stockclasscode").val(fstockclasstree);
		}
	}) 
	//商品品牌
		$('#fmarkID').jeasycombo({
			multiple : true,//是否多选
			type : "list",//弹出的样式
			iconCls:"btn-success",//自定义按钮样式
			url : "select/mark.do",
			label:"商品品牌:",
			labelWidth:80,
			width:200,
			isinline:false,
			linenum:4,
			dlgwidth:800,
		})
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
		pagination : true,
		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
        pageSize : 20, //每页显示的记录条数，默认为5  
	    columns : window.currentColumns
	});
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		//注释的c标签也会起作用  请不要删掉
		button_role : $("#menu_ffunction").val(),
		button: [{text:"保存", iconCls:"icon-save", nocheck:true,onclick:function(ids,rows){
					$.messager.confirm("确认","您确认要修改吗？", function(r){
						if(r){
						save();
						}
					});
				}},
				{text:"保存并推送价格给店铺", iconCls:"icon-save", nocheck:true,onclick:function(ids,rows){
						$("#upstock-dialog").dialog("open");
				}},
				{text:"全部比价", iconCls:"icon-filter", nocheck:true,onclick:function(ids,rows){
						getAllWebPrice();
				}}]
	});
	$("#btnSearch").bind("click", function(){
		//查询前先组织查询条件
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","unitstock/queryUnitStockPriceNew.do");
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
	//保存并推送价格给商铺
	var upstock='<div style="padding-top:20px;">'+  
   	'<div style="height: 45px; "><input class="easyui-combobox" id="storeTypeID" ></div>'+
   	'<div style="height: 45px"><input id="storeName" type="text"></div>'+
   	'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="upStock();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closeStockRecoverdialog()" >取消</a></div></div>'
   	//初始化弹框
	$("#upstock-dialog").append(upstock);
	$('#storeTypeID').combobox({
		width:300,
		labelWidth:80,
		label:'店铺类型:',
		data:[{fid:-1,fname:'全部',selected:true},{fid:0,fname:'企业店铺'},{fid:1,fname:'门店店铺'},{fid:2,fname:'员工店铺'},
		      {fid:3,fname:'加盟商店铺'},{fid:4,fname:'自营电子货架'},{fid:5,fname:'加盟商电子货架'},{fid:6,fname:'村级服务站'},{fid:7,fname:'PC企业商城'}],
		onChange:function(newValue,oldValue){
			if(oldValue==''||oldValue==undefined){
				return false;
			}
			if(newValue==-1){
				newValue="";
			}
			$("#storeName").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+newValue);
		}
	})
	var storetype=$("#storeTypeID").combo('getValue');
	if(storetype==-1){
		storetype='';
	}
	$("#storeName").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		label:'店铺名称:',
		width:300,
		labelWidth:80,
		url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+storetype
	});
	//初始化按钮样式
	$("#upstock-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
});
function getAllWebPrice(){
	$(".primary").each(function(){
		var fid=$(this).attr("fid");
		var fname=$(this).attr("fname");
		getWebPrice(fid,fname,this);
	});
}
//比较
function getWebPrice(id, stockname, btn){
	$(btn).hide();	
	$(btn).prev().show();
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"unitstock/getWebPrice.do",
		dataType : "json",
		data: {stockname: stockname},
		success: function(data){
			$.messager.progress("close");//隐藏加载
			$(btn).prev().hide();
			if (data.result) {
				$("#jd"+id).text("京东价："+data.fjdprice);
				$("#sn"+id).text("苏宁价："+data.fsnprice);
				$("#gm"+id).text("国美价："+data.fgmprice);
			} else {
				$.messager.alert("提示",data.msg, "error");
				$(btn).show();
			}
		}
	})
};
//表格中数据发生改变,记录数据改变行的index
var idArr=new Array();
function priceChange(id){
	for(var i=0;i<idArr.length;i++){
		if(idArr[i]==id){
			return false;
		}
	}
	idArr.push(id);
} 
//保存
function save(){
	var data= {};
	var data1=new Array();
	var id;
	var fid = "";
	var price = "";
	var marketprice = "";
	var limitprice = "";
	var stockcode = "";
	for(var i=0;i<idArr.length;i++){
		id=idArr[i];
		fid=id;
		price=$("#price"+id).val();
		market=$("#market"+id).val();
		limit=$("#limit"+id).val();
		stockcode=$("#stockcode"+id).val();
		data={"fid":fid,"price":price,"market":market,"limit":limit,"stockcode":stockcode};
		data1.push(data);
	}
	var param={
		jsonobj:JSON.stringify(data1)
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type: "POST",
		url: "unitstock/updateWebPrice.do",
		dataType: "json",
		data: param,
		success: function(data){
			$.messager.progress("close");//隐藏加载
			if (data.result){
		  $.messager.alert("提示","商品信息保存成功！","info",function(){
			  $("#easy_table").datagrid('reload');
		  });
			}else{
				$.messager.alert("提示",data.msg, "error");
				return false;
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载
		}
	
	
	});
}
/* $("#hide-dialog").dialog({
	title:"保存发布信息",
	body:'',
	footer:"<button class='btn btn-primary' aria-hidden='true' data-dismiss='modal' onclick='closeHidedialog()'>确定</button>"
}); */
//保存并发布
function upStock(){
	//保存
	save();
	var ids=[];
	//商品ids
	rows=$("#easy_table").datagrid('getChecked');
	for(var i=0;i<rows.length;i++){
		ids.push(rows[i].fid);
	}
	var stockids=ids.join(",");
	if(stockids==undefined||stockids==""){
		$("#upstock-dialog").dialog("close");
		$.messager.alert("提示","您还没有选择数据,无法推送价格给店铺！","error");
		return false;
	}
	//获取店铺fids(多个)
	var storeIds = $("#storeName").jeasycombo("getvalue").ids;
	if(storeIds==undefined||storeIds==""){
		$.messager.alert("提示","请选择店铺","error");
		return false;
	}
	var storeTypeID=$("#storeTypeID").combobox('getValue');
	var  arr=stockids.split(","); 
	var data= new Array();
	var fid="";
	var price="";
	var fname="";
	for (var i = 0; i < arr.length; i++) {
	    fid=+arr[i];
        var data1={};
		price = $("#price"+fid).val();
		marketprice = $("#market"+fid).val();
		fname=$("#fname"+fid).text();
		data1["fid"]=fid;
		data1["price"]=price;
		data1["fname"]=fname;
		data1["marketprice"]=marketprice;
		data.push(data1);
		//alert(fname+"--"+price+"--"+fid);
	}
	var param={
			jsonobj:JSON.stringify(data)
		}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
        type:'post',
        url: 'unitstock/saveUp.do?storeIds='+storeIds,
        data:param,
        success:function(data){
        	$.messager.progress("close");//隐藏加载
        	if(data.res==1){
        		$("#upstock-dialog").dialog("close");
        		var trs = ""
               	for (var i = 0; i < data.list.length; i++) {
       				trs +="<tr><td>"+data.list[i].res+"</td></tr>"
       			}
               	var body='<div style="height:300px;overflow-y: scroll;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
       			     +trs+'</tbody></table></div>';
               	$("#hide-dialog").dialog("clear");
               	$("#hide-dialog").append(body);
               	$("#hide-dialog").dialog("open");
               	
               	$('#hide-dialog').dialog('clear')
               	$("#hide-dialog").append(body);
               	$("#hide-dialog").dialog("open");
        	}else if(data.msg==1){
        		$("#upstock-dialog").dialog("close");
        		$.messager.alert("提示","推送成功","info");
        	}else{
        		$.messager.alert("提示","推送失败","error");
        	}
        }
	});
 }
//关闭弹出框
function closeHidedialog(){//提示框
	$('#hide-dialog').dialog('close');
}
function closeStockRecoverdialog(){
	$('#upstock-dialog').dialog('close');
}
