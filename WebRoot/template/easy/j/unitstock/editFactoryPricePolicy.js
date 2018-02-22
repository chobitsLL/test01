$(function(){
	//商品
	$("#addStock").jeasycombo({
		multiple : false,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:1,
		type : "list",//弹出的样式
		btnclass : "btn-success",//按钮样式
		url : "facPricePolicy/getPolicyStock.do",
		label:'<font color=red>*</font>商品:',
		width:300,
		labelWidth:100
	});
	
	//区域
	$("#addArea").jeasycombo({
	    multiple : false,//是否多选
	    parentselect : true,
		type:"tree",//弹出的样式
		url:"select/areaNoLazy.do",
		label:'区域:',
		width:300,
		labelWidth:100,
		onChange: function(){
			var area = $("#addArea").jeasycombo("getvalue").codes;
			$("#addCustomer").jeasycombo("reload", "facPricePolicy/getPolicyUnit.do?treeCode="+area);
		}
	 }); 
	
	//客户
	$("#addCustomer").jeasycombo({
		multiple: false,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:1,
		type : "list",//弹出的样式
		btnclass : "btn-success",//按钮样式
		label:'客户:',
		width:300,
		labelWidth:100,
		url : "facPricePolicy/getPolicyUnit.do?treeCode="
	});
	
	$("#confirm").click(function(){
		add();
	});
	
	$('#update').click(function(){
		update();
	});
});

function validInput(){
	var FBeginTime = $('#FBeginTime').datebox('getValue');
	var FEndTime = $('#FEndTime').datebox('getValue');
	var stock = $("#addStock").jeasycombo("getvalue").ids;
	var salePrice = $('#addSalePrice').numberbox('getValue');
	var price = $('#addPrice').numberbox('getValue');
	var uanty = $('#addQuanty').numberbox('getValue');
	
	if(FBeginTime == ''){
		$.messager.alert('提示',"请选择开始日期","error");
		return false;
	}
	
	if(stock == ''){
		$.messager.alert('提示',"请选择商品","error");
		return false;
	}
	
	if(salePrice == ''){
		$.messager.alert('提示',"请输入零售价","error");
		return false;
	}
	
	if(price == ''){
		$.messager.alert('提示',"请输入分销价","error");
		return false;
	}
	
	if((FEndTime != '') && FEndTime < FBeginTime){
		$.messager.alert('提示',"结束日期不能早于开始日期","error");
		return false;
	}
	return true;
}

function getUjson(){
	var usjson={
			FID: $('#fid').val(),
			FBeginDate:$("#FBeginTime").datebox('getValue'),
			FEndDate:$("#FEndTime").datebox('getValue'),
			FSubStockID:$("#addStock").jeasycombo("getvalue").ids,
			FAreaID:$("#addArea").jeasycombo("getvalue").ids,
			FUnitID:$("#addCustomer").jeasycombo("getvalue").ids,
			FSalePrice:$("#addSalePrice").numberbox('getValue'),
			FPrice:$("#addPrice").numberbox('getValue'),
			FQuanty:$("#addQuanty").numberbox('getValue')
	}
	return usjson;
}

//新增
function add(){
	var flag = validInput();
	if(flag){
		var usjson = getUjson();
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type : 'post',
			url : 'facPricePolicy/addPolicy.do',
			data:{
				jsonStr:JSON.stringify(usjson)
			},
			dataType : "json",
			success : function(data){
				$.messager.progress("close");//隐藏加载
				if(data.result==false){
					$.messager.alert('提示',data.msg,"error");
				}else if(data.result == true){
					$.messager.alert('提示',data.msg,"info",function(){
						setTimeout(editSuccess(), 1000);
					});
				}else{
					$.messager.alert('提示',"未知错误！","error");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载
				 $.messager.alert('提示',"请求错误！","error");
			}
		});
	}
}

function update(){
	var flag = validInput();
	if(flag){
		var usjson = getUjson();
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type : 'post',
			url : 'facPricePolicy/updatePolicy.do',
			data:{
				jsonStr:JSON.stringify(usjson)
			},
			dataType : "json",
			success : function(data){
				$.messager.progress("close");//隐藏加载
				if(data.result==false){
					$.messager.alert('提示',data.msg,"error");
				}else if(data.result == true){
					$.messager.alert('提示',data.msg,"info",function(){
						setTimeout(editSuccess(), 1000);
					});
					
				}else{
					$.messager.alert('提示',"未知错误！","error");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载
				 $.messager.alert('提示',"请求错误！","error");
			}
		});
	}
}

/*//只能输入两位的小数或整数
function check(obj){
	obj.value = obj.value.replace(/[^\d.]/g, "").
	        //只允许一个小数点              
	        replace(/^\./g, "").replace(/\.{2,}/g, ".").
	        //只能输入小数点后两位
	        replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
}*/

/*//最后一位是小数点，清除
function cleatLastPoint(obj){
	obj.value = obj.value.replace(/\.$/g, "");
}
*/
function editSuccess(){
	window.opener.search();//调用父窗口的方法（只适用于使用 window.open打开的页面）
	window.close();
}

