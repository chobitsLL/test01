$(function(){
	easyCombobox();
	$("#jeasyupload").jeasyupload({
		url:"upload_base64.do",
		multiple:true,//是否多选
		label:"上传证书:",
		width:"305",
		type:"text",
		labelWidth:"85",
		 customImg:function(i,file,o){
			if(file.error==0){
				$("#fcerturl").empty();
				 $('#fcerturl').textbox('setValue',file['url']); 
				 $.messager.alert('提示','上传成功','info');
				 $("#jeasyupload").jeasyupload('setValue','已上传');
			}else{
				$.messager.alert('提示',file.message,'error');
			}
		},
	}) 
});
function easyCombobox(){
	$("#controllerUrl").combobox({
		multiple : false,//是否多选
		width:300,
		labelWidth:90,
//		editable:false,
		label:'方法名:',
		data:[{"fname":"userOrders","fid":"userOrders"},
		      {"fname":"detailOrder","fid":"detailOrder"},
			  {"fname":"我的收藏","fid":"MOUserFavor"},
			  {"fname":"取消收藏","fid":"MODelFavor"},
			  {"fname":"添加收藏","fid":"MOinsertStockColl"},
			  {"fname":"获取一级筛选项列表","fid":"usableParams"},
		      {"fname":"获取普通二级筛选项列表","fid":"paramOptions"},
		      {"fname":"获取特殊二级筛选项列表","fid":"speParamOptions"},
		      {"fname":"获取筛选列表（一、二级嵌套）","fid":"allUsableParams"},
		      {"fname":"通过筛选条件检索商品","fid":"filterByMulParams"}
			
		],
	    onSelect: function(param){
	    	var html = htmlText(param.fid);
	    	$("#dataex").empty();
	    	$("#dataex").append(html);
		},
	});
	$("#controller").combobox({
		multiple : false,//是否多选
		width:300,
		labelWidth:90,
//		editable:false,
		label:'方法名:',
		data:[
		      {"fname":"AppOrder","fid":"AppOrder","selected":"selected"},
		      {"fname":"AppUser","fid":"AppUser"},
		      {"fname":"elecShelf","fid":"elecShelf"},
		      {"fname":"AppCenter","fid":"AppCenter"},
		      {"fname":"AppGoods","fid":"AppGoods"}
		      
		      
		],
	    onSelect: function(param){
		},
	});
	$("#restful").combobox({
		multiple : false,//是否多选
		width:300,
		labelWidth:90,
//		editable:false,
		label:'方法名:',
		data:[
		      {"fname":"restful","fid":"restful","selected":"selected"}
		],
	});
}
//登录
function loginClick(){
	var telNo = $("#telNo").textbox("getValue");
	var pwd = $("#pwd").textbox("getValue");
//	var dat = "telNo=18600267683&pwd=1&type=1&unitID=15";
//	var dat = "telNo=13241100776&pwd=123456&type=1&unitID=15";
//	var dat = "telNo=18888888888&pwd=1&type=1&unitID=15";
//	var dat = "telNo=18519652467&pwd=1&type=1&unitID=15";
//	var dat = "telNo=15210436828&pwd=123456&type=1&unitID=15";
//	var dat = "telNo=17710135319&pwd=1&type=1&unitID=15";
	var dat = "telNo="+telNo+"&pwd="+pwd+"&type=1&unitID=15";
	var url = "login";
	var data = jpushAjax("restful/AppUser/"+url,dat);
	var result = data.result;
	if(result){
		$("#tokenID").textbox("setValue",data.token);
	}else{
		$.messager.alert('温馨提示',data.msg);
	}
}
//注销
function logout(){
	var token = $("#tokenID").textbox("getValue");
	if(token==''){
		$.messager.alert('温馨提示',"token不能为空！");
		return;
	}
	var dat = "token="+token;
	var url = "logout";
	var data = jpushAjax("restful/AppUser/"+url,dat);
	var result = data.result;
	
	if(result){
		$("#tokenID").textbox("setValue","");
	}else if(!result){
		$.messager.alert('温馨提示',data.msg);
	}
}

function sendPush(){
	var dat = "";
	dat+=$("#textID").val().replace(/\n/g, "&");
	
	var url = $("#controllerUrl").combobox("getValue");
	if(url == ""){
		$.messager.alert('温馨提示',"方法名不能为空！");
		return;
	}
	var controller = $("#controller").combobox("getValue");
	if(controller == ""){
		$.messager.alert('温馨提示',"控制器不能为空！");
		return;
	}
	var restful = $("#restful").combobox("getValue");
	restful = restful==""?"":restful+"/";
//	var data = jpushAjax("AppOrder/"+url,dat);
//	var data = jpushAjax("AppUser/"+url,dat);
	var data = jpushAjax(restful+controller+"/"+url,dat);
	var htm = '';
	htm+='<textarea id="textID" rows=5 style="width:1000px" ';
	htm+='class="textarea easyui-validatebox" ';
	htm+='>'+JSON.stringify(data)+'</textarea>';
	
	if(url=='userOrders1'){
		htm+= '';
		var fmno = '';
		var fmostate = '';
		var fcover = '';
		var prefix = data.prefix;
		var orderList = data.orderList;
		for(var i=0;i<orderList.length;i++){
			var templist = orderList[i].templist;
			fcover = eachTemplist(templist,prefix);
			
			if(orderList[i].ismno=='1'){
				fmno = orderList[i].fmno;
			}else{
				fmno = orderList[i].templist[0].orderstocks[0].fmno;
			}
			htm+= '<div class="easy-input-line">'
			htm+= 'fmno:'+fmno+' fmostate:'+fmostate+' fcover:'+fcover;
			htm+= '</div>';
		}
	}
	if(url=='detailOrder'){
		
	}
	$("#divData").empty();
	$("#divData").append(htm);
}
//循环查询订单图片和名称
function eachTemplist(templist,prefix){
	var fcover = '';
	for(var i=0;i<templist.length;i++){
		var orderstocks = templist[i].orderstocks;
		for(var j=0;j<orderstocks.length;j++){
			fcover+= prefix+orderstocks[j].fcover + "----";
		}
	}
	return fcover;
}
function jpushAjax(url,dat){
	var data;
	$.ajax({
		dataType : 'JSON',
		type : 'post',
		async : false,
//		url : 'restful/'+url+'.do',
		url : url+'.do',
		data : dat,
		dataType : "json",
		success : function(json) {
			data = json;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 var htm = '';
				htm+='<span style="float: left;width: 250px;">XMLHttpRequest.status:</span><span style="float: left;">'+XMLHttpRequest.status+'</span>';
				htm+='<br><span style="float: left;width: 250px;">XMLHttpRequest.readyState:</span><span style="float: left;">'+XMLHttpRequest.readyState+'</span>';
				htm+='<br><span style="float: left;width: 250px;">statusCode:</span><span style="float: left;">'+textStatus+'</span>';
				$("#divData").empty();
				$("#divData").append(htm);
		}
	});
	return data;
}

function htmlText(key){
	var html = "";
	if(key == "userOrders"){
		html+="<label>我的订单查询</label><br>";
		html+="page=1&state=7&orderid=3744<br><br>";
		html+="<table>";
		html+="<tr><td>token</td></tr>";
		html+="<tr><td style='width:60px'>page</td><td style='width:60px'>页码</td></tr>";
		html+="<tr><td style='width:60px'>state</td><td style='width:60px'>状态</td><td style='width:300px'>1=待付款，3=待收货(APP暂时不用此状态)，4=待评价，5=退换货中，6=申请退换货(没用)，7=所有，8=已取消，9=待发货，10=待收货</td></tr>";
	}
	return html;
}

function testClick(){
    $("input[type='checkbox']").prop("checked", true);
}
function testClick1(){
	$("input[type='checkbox']").removeAttr("checked"); 
}