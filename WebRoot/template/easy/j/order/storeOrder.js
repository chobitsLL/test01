$(function(){
	//查询按钮
	var paramArray = [
				        {id:"#datetype",name:"datetype",type:"select",defval:'1'},
				        {id:"#orderFdateStart",name:"orderFdateStart",type:"date"},
				        {id:"#orderFdateEnd",name:"orderFdateEnd",type:"date"},
				        {id:"#masterno",name:"masterno",type:"text"},
				        {id:"#storestate",name:"storestate",type:"combo"},
				        {id:"#storename",name:"storename",type:"combo"},
				        {id:"#saleno",name:"saleno",type:"text"},
				        {id:"#retailno",name:"retailno",type:"text"},
				        {id:"#receiver",name:"receiver",type:"text"},
				        {id:"#revtel",name:"revtel",type:"text"},
				        {id:"#buyermomo",name:"buyermomo",type:"text"},
				        {id:"#sellermemo",name:"sellermemo",type:"text"},
				        {id:"#retailtype",name:"retailtype",type:"combo"},
				        {id:"#unitname",name:"unitname",type:"combo"},
				        {id:"#orderstate",name:"orderstate",type:"select",defval:'0'},
	 			        {id:"#failedorderstate",name:"failedorderstate",type:"select",defval:'0'},//未达
				        {id:"#paytype",name:"paytype",type:"combo"},
				        {id:"#refundstate",name:"refundstate",type:"select",defval:'0'},
				        {id:"#nickname",name:"nickname",type:"text"},
				        {id:"#orderftelno",name:"orderftelno",type:"text"},
				        {id:"#markname",name:"markname",type:"combo"},
				        {id:"#stockclassname",name:"stockclassname",type:"combo"},
				        {id:"#stockname",name:"stockname",type:"text"},
				        {id:"#auditor",name:"auditor",type:"text"},
				        {id:"#shipper",name:"shipper",type:"text"},
				        {id:"#confirmer",name:"confirmer",type:"text"},
				        {id:"#chamberlain",name:"chamberlain",type:"text"},
				        {id:"#sendunit",name:"sendunit",type:"text"},
				        {id:"#expressNo",name:"expressNo",type:"text"},
				        {id:"#serviceorder",name:"serviceorder",type:"select",defval:'-1'},
				        {id:"#servicestate",name:"servicestate",type:"select",defval:'-1'},
				        {id:"#fname",name:"fname",type:"text"},
				        {id:"#wxnickname",name:"wxnickname",type:"text"},
				        {id:"#hidden-neworders",name:"neworders",type:"text"},
				        {id:"#fhide",name:"fhide",type:"select",defval:'-1'}//隐藏
				        ];
	//查询按钮
	$('#btnSelect').bind('click',function(){
		$("#storeTable").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#storeTable").datagrid("load","managerorders/queryOrders_red.do");
	})
	
	//重置按钮
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	
});

function showwhere() {
	$("#hidewhere").show();
	$("#showwhere").hide();
	document.getElementById("subwhere").style.display = "";
};
function hidewhere() {
	$("#hidewhere").hide();
	$("#showwhere").show();
	document.getElementById("subwhere").style.display = "none";
};

//checkRefund审核
//submitRefund提交
//type=1作废订单，2审核，3发货，4收款，5确认收货
function dealOrder(ids, type, row){
	if (type == 1){
		if(isKong(ids)){
			return;
		}
		if(!isAllow(ids, row)){
			return;
		}
		Camcelled(ids, row);		
	}else if (type == 2){
		if(isKong(ids)){
			return;
		}
		if(!isAllow(ids, row)){
			return;
		}
		Audit(ids);
	}else if (type == 3){
		if(isKong(ids)){
			return;
		}
		if(!isAllow(ids, row)){
			return;
		}
		delivery(ids, row);
	}else if (type == 4){
		if(isKong(ids)){
			return;
		}
		if(!isAllow(ids, row)){
			return;
		}
		receiv(ids, row);
	}else if (type == 5){
		if(isKong(ids)){
			return;
		}
		if(!isAllow(ids, row)){
			return;
		}
		submitRefund(ids, row);
	}
}

//ID是否为空(是否登录)
function isKong(ids){
	if(ids == "" || ids == undefined){
		return true;
	}else{
		return false;
	}
	
}

function isAllow(ids, row){
	var unit = $("#ismanager").attr("unit");
	console.log("unit")
	var str = ids.split(",");
	for (var i = 0; i < row.length; i++) {
		temid = row[i].fid;
		var storetype = row[i].fstoretype;
		if(storetype==3 && unit==true){
			$.messager.alert('温馨提示',"您无此权限,请重新选择！");
			return false;
		}
	}
	return true;
}

/******************取消订单按钮***********************/
function Camcelled(ids, row){
	 var editid=ids.split(",");
	 var fpayed = new Array();
	 var fdelete = new Array();
	 var fcancel = new Array();
	 for(var i = 0;i<row.length;i++){
		 if(row[i].fpayed.toString()!=''){
			 fpayed[i] = row[i].fpayed.toString();
		 }
		 if(row[i].fdelete.toString()!=''){
			 fdelete[i] = row[i].fdelete.toString();
		 }
		 if(row[i].fcancel.toString()!=''){
			 fcancel[i] = row[i].fcancel.toString();
		 }
		 
	 }
	 var data={};
	 data["editid"]=editid;
	 data["fpayed"]=fpayed;
	 data["fdelete"]=fdelete;
	 data["fcancel"]=fcancel;
	 var dat={
				jsonobj:JSON.stringify(data)
		};
	$.messager.confirm('温馨提示',"你确认要执行该操作吗？",function(r) {
		if (r) {
			$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
				type:'POST',
				url:"managerorders/OTCancelOrderBtn.do?editid="+editid,
				dataType:'JSON',
				data:dat,
				success:function(data){
					$.messager.progress('close');
			   		if (data.result) {
			   			$.messager.alert('温馨提示',"操作成功！","info");
			   			$("#storeTable").datagrid('reload');
			   		}else{
			   			$.messager.alert('温馨提示',data.msg,"error");
			   		}
		   		 },error:function(){
		   			$.messager.progress('close');
		   			$.messager.alert('温馨提示',"请求出错!","error");
		   		 }
		   	 })
		}
	})
}

/***************审核按钮********************/
function Audit(ids){
	$('#audit').dialog({
		title:"审核订单",
		closed:false,
		buttons:[{
			text:'通过',
			width:60,
			handler:function(){
				var editid=ids.split(",");
		    	var deallogmemo = $("#deallogmemo").val();
		    	var data={};
		    	data["checkmemo"]=deallogmemo;
		    	data["editid"]=editid;
		    	var dat={
		    		jsonobj:JSON.stringify(data)
				};
		    	$.messager.progress({text : "正在处理，请稍候..."});
		    	$.ajax({
		    		type:"POST",
		    		url:"managerorders/OTSaveCheckMemo.do?editid="+editid,
		    		dataTyp:"JSON",
		    		data:dat,
		    		success:function(data){
		    			$.messager.progress('close');
		    			if (data.result==true||data.result=="true") {
		    			 	$('#audit').dialog({
	    						closed:true,
	    					});
							$.messager.alert('温馨提示',"审核成功，等待发货！","info");
							$("#storeTable").datagrid('reload');
		 				}else if(data.result=="login"){
		 					window.location.href=$("base").attr("href")+"user/getLoginAD.do";
		 				}else{
							$.messager.alert('温馨提示',data.msg,"error");
						}
		    		},error:function(){
		    			$.messager.progress('close');
		 				$.messager.alert('温馨提示',"请求出错!","error");
		 			}
		    	 })
			}
		},{
			text:'不通过',
			width:60,
			handler:function(){
				var editid=ids.split(",");
		    	var deallogmemo = $("#deallogmemo").val();
		    	if(deallogmemo == ""){
		    		$.messager.alert('温馨提示',"请填写审核意见！");
	    			return ;
	    		}
		    	var data={};
		    	data["checkmemo"]=deallogmemo;
		    	data["editid"]=editid;
		    	var dat={
					jsonobj:JSON.stringify(data)
				};
		    	$.messager.progress({text : "正在处理，请稍候..."});
		    	$.ajax({
		    		 type:'POST',
		    		 url:"managerorders/OTSaveCheckRefuseMemo.do?editid="+editid,
		    		 dataType:'JSON',
		    		 data:dat,
		    		 success:function(data){
		    			 $.messager.progress('close');
		    			 if (data.result) {
	    				 	$('#audit').dialog({
	    						closed:true,
	    					});
	    		    	 	$("#deallogmemo").val("");
	    		    	 	$.messager.alert('温馨提示',"操作成功！","info");
	    		    	 	$("#storeTable").datagrid('reload');
		 				}else{
							$.messager.alert('温馨提示',data.msg,"error");
						}
		    		 },error:function(){
		    			 $.messager.progress('close');
		    			 $.messager.alert('温馨提示',"请求出错!","error");
		 			}
		    	 });
			}
		},{
			text:'取消',
			width:60,
			handler:function(){
				$('#audit').dialog({
					closed:true,
				});
			}
		}]
	});
}
/************发货按钮*************/
function delivery(ids, row){
	var editid=ids.split(",");
	for(var i = 0;i<row.length;i++){
		if(row[i].fsyncerp>0){
			$.messager.alert('温馨提示',"定单【"+row[i].fno+"】请在ERP中执行本操作！");
			return false;
		}
	}
	var data={};
	data["editid"]=editid;
	var dat={
		jsonobj:JSON.stringify(data)
	};
	$.messager.confirm('温馨提示',"你确认要执行该操作吗？",function(r) {
		if (r) {
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
		  		type:'POST',
		  		url:"managerorders/OTChangeSendBtn.do?editid="+editid,
		  		dataType:'JSON',
		  		data:dat,
		  		success:function(data){
		  			$.messager.progress('close');
//		  			$.jbootloading("hide");
		  			 if (data.result) {
							$.messager.alert('温馨提示',"发货成功!","info");
							$("#storeTable").datagrid('reload');
						}else{
							$.messager.alert('温馨提示',data.msg,"error");
						}
		  		},error:function(){
		  			$.messager.progress('close');
//		  			 	$.jbootloading("hide");
		  			$.messager.alert('温馨提示',"请求出错!","error");
				}
		  	 });
		}
	});
}
/***************确认收货按钮************************/
function submitRefund(ids, row) {
	var editid = ids.split(",");
	for (var i = 0; i < row.length; i++) {
		if (row[i].fsyncerp > 0) {
			$.messager.alert('温馨提示', "定单【" + row[i].fno + "】请在ERP中执行本操作！");
			return false;
		}
	}
	var data = {};
	data["editid"] = editid;
	var dat = {
		jsonobj : JSON.stringify(data)
	};
	$.messager.confirm('温馨提示', "你确认要执行该操作吗？", function(r) {
		if (r) {
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type : 'POST',
				url : "managerorders/OTChangeRevedBtn.do?editid=" + editid,
				dataType : 'JSON',
				data : dat,
				success : function(data) {
					$.messager.progress('close');
					if (data.result) {
						$.messager.alert('温馨提示',"收货成功！", "info");
						$("#storeTable").datagrid('reload');
					} else {
						$.messager.alert('温馨提示',data.msg, "error");
					}
				},
				error : function() {
					$.messager.progress('close');
					$.messager.alert('温馨提示',"请求出错!", "error");
				}
			});
		}
	});
}
/** *************收款按钮******************** */
function receiv(ids, row) {
	var editid = ids.split(",");
	for (var i = 0; i < row.length; i++) {
		if (row[i].fsyncerp > 0) {
			$.messager.alert('温馨提示', "定单【" + row[i].fno + "】请在ERP中执行本操作！");
			return false;
		}
	}
	var data = {};
	data["editid"] = editid;
	var dat = {
		jsonobj : JSON.stringify(data)
	};
	$.messager.confirm('温馨提示', "你确认要执行该操作吗？", function(r) {
		if (r) {
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type : 'POST',
				url : "managerorders/OTChangePayBtn.do?editid=" + editid,
				dataType : 'JSON',
				data : dat,
				success : function(data) {
					$.messager.progress('close');
					if (data.result) {
						$.messager.alert('温馨提示',"收款成功！", "info");
						$("#storeTable").datagrid('reload');
					} else {
						$.messager.alert('温馨提示',data.msg, "error");
					}
				},
				error : function() {
					$.messager.progress('close');
					$.messager.alert('温馨提示',"请求出错!", "error");
				}
			})
		}
	});
}
/** *************隐藏按钮******************** */
function updateHide(ids){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"managerorders/updateHide.do",
	    data:{"ids":ids},
	    dataType:"json",
	    success:function(data){
	    	$.messager.progress('close');
	    	$.messager.alert('温馨提示',data.msg,"info");
	    	$("#storeTable").datagrid('reload');
	    }
	});
}
/************导出Excel按钮***************/
function exportExcel_Order(jsonobj, total){
	//获取参数
	var params = {};
	/*
	var arrParams = new Array();
	var urlParams = new Array();
	var urlmerges = new Array();
	for ( var i = 0; i < o.params.length; i++) {
		var param = o.params[i];
		var v = ""; 
		switch (param.type) {
		case "text"://文本
		case "date"://时间
		case "select": v = $(param.id).val(); break;//下拉选择
		case "combo": v = $(param.id).jbootcombo("getvalue").ids; break;//弹出选择
		case "value": v = param.value;//固定值
		default:  break;
		}
		
		// 对双引号进行转义
		var mv = v.replace(new RegExp(/(")/g),'\\\"');
		if(param.ismerge){
			urlmerges.push(param.name+':"'+mv+'"');//合并参数
		}else{
			urlParams.push(param.name+"="+v);//url参数
		}
		arrParams.push(param.name+':"'+mv+'"');//ajax post参数
	}
	
	params.jsonobj="{"+arrParams.join(",")+"}";
	params.total = o.pageTotal;
	*/
	params.jsonobj=jsonobj;
	params.total = total;
	params.title = "订单信息";
	params.headers= "{'fstorename':'店铺','fno':'订单号','fmaketime':'下单时间','fstockname':'商品','fquanty':'数量','fprice':'单价','fstockamount':'销售','ftotalamount':'实付',"+
			"'fstate':'状态','fnickname':'会员昵称','ftelno':'会员手机','frevtel':'收货人手机','fmno':'主订单号','flinkunitname':'联营商','fpaytype':'付款方式',"+
			"'fpayed':'付款状态','fchecker':'审核人','fchecked':'审核状态','fchecktime':'审核时间','fcheckmemo':'审核备注','fsender':'发货人','fsended':'发货状态',"+
			"'fsendtime':'发货时间','fdeleteflag':'是否删除','freceiver':'收货人','frever':'确认收货人','fsiger':'签收人','fsigned':'签收状态','fsigntime':'签收时间',"+
			"'freved':'确认状态','frevtime':'确认时间','fsalesauth':'三包范围','finvoicetitle':'发票单位','fsendamount':'运费金额','fcancel':'取消状态','fwlcompany':'物流公司',"+
			"'fsellermemo':'卖家备注','frevaddress':'收货地址','fbuyermomo':'买家备注','fstoretype':'店铺类型'};"
	params.fileName = "订单信息";
	
	var exportForm = document.createElement("form");
	document.body.appendChild(exportForm);
	exportForm.method = 'post';
	exportForm.action = 'managerorders/exportExcel_orders.do';
	exportForm.target = '_blank';
    //创建隐藏表单
    var newElement1 = document.createElement("input");
    newElement1.setAttribute("name","jsonobj");
    newElement1.setAttribute("type","hidden");
    newElement1.setAttribute("value",params.jsonobj);
    exportForm.appendChild(newElement1);

    var newElement2 = document.createElement("input");
    newElement2.setAttribute("name","total");
    newElement2.setAttribute("type","hidden");
    newElement2.setAttribute("value",params.total);
    exportForm.appendChild(newElement2);
    
    var newElement3 = document.createElement("input");
    newElement3.setAttribute("name","title");
    newElement3.setAttribute("type","hidden");
    newElement3.setAttribute("value",params.title);
    exportForm.appendChild(newElement3);
    
    var newElement4 = document.createElement("input");
    newElement4.setAttribute("name","headers");
    newElement4.setAttribute("type","hidden");
    newElement4.setAttribute("value",params.headers);
    exportForm.appendChild(newElement4);
    
    var newElement5 = document.createElement("input");
    newElement5.setAttribute("name","fileName");
    newElement5.setAttribute("type","hidden");
    newElement5.setAttribute("value",params.fileName);
    exportForm.appendChild(newElement5);
 
    exportForm.submit();
    
    document.body.removeChild(exportForm) ; 
	
}
// 查询方法
function queryRefundOrder(){
	var json = getQueryCondition();
//	var storestate =$('#storestate').combobox('getValue')
//	alert(json);
    $('#storeTable').datagrid({
//		技能列表	
		queryParams:{
//			jsonobj:'{datetype:"1",orderFdateStart:"2017-05-01",orderFdateEnd:"",masterno:"",storestate:"",storename:"",saleno:"",retailno:"",receiver:"",revtel:"",buyermomo:"",sellermemo:"",retailtype:"",unitname:"",orderstate:"0",failedorderstate:"0",paytype:"",refundstate:"0",nickname:"",orderftelno:"",markname:"",stockclassname:"",stockname:"",auditor:"",shipper:"",confirmer:"",chamberlain:"",sendunit:"",expressNo:"",serviceorder:"-1",servicestate:"-1",fname:"",wxnickname:"",neworders:"",fhide:""}'
			jsonobj:json
					
		},
		url:'managerorders/queryOrders_red.do'
	});
}


//获取查询筛选条件 方法
function getQueryCondition(){
	var jsonobj = $("#formSearch").serializeJSON();
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

$.extend($.fn.validatebox.defaults.rules, {  
    //验证汉字  
    CHS: {  
        validator: function (value) {  
            return /^[\u0391-\uFFE5]+$/.test(value);  
        },  
        message: 'The input Chinese characters only.'  
    },  
    //移动手机号码验证  
    Mobile: {//value值为文本框中的值  
        validator: function (value) {  
            var reg = /^1[3|4|5|8|9]\d{9}$/;  
            return reg.test(value);  
        },  
        message: 'Please enter your mobile phone number correct.'  
    },  
    //国内邮编验证  
    ZipCode: {  
        validator: function (value) {  
            var reg = /^[0-9]\d{5}$/;  
            return reg.test(value);  
        },  
        message: 'The zip code must be 6 digits and 0 began.'  
    },  
  //数字  
    Number: {  
        validator: function (value) {  
            var reg =/^[0-9]*$/;  
            return reg.test(value);  
        },  
        message: 'Please input number.'  
    },  
}) 

//清空form表单
function updateReset(){
	$("#formUpdateBtn").form('clear');
}

//重置
function resetParam(){
	$("#formSearch").form('clear');
	$('#orderstate').combobox('setValues','0');
	$('#failedorderstate').combobox('setValues','0');
	$('#datetype').combobox('setValues','1');
	$('#refundstate').combobox('setValues','0');
	$('#serviceorder').combobox('setValues','0');
	$('#servicestate').combobox('setValues','0');
	$('#fhide').combobox('setValues','');
	var curr_time = new Date();     
	$("#orderFdateStart").datebox("setValue",myformatter(curr_time));  
	
}

function isAllowFid(){
	var ids=getFids();
	if(ids == ""){
		$.messager.alert('温馨提示',"您还没有选择数据！","info");
		return "false";
	}else{
		return "true";
	}
}


//时间框默认时间本月1日
function myformatter(date){  
    var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = 1;  
//    var d = date.getDate();  
    return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);  
} 


function getFids(){
	var ids = '';
	$("input[name='fid']:checked").each(function(){
		ids=ids+$(this).val()+",";
	});
	ids=ids.substring(0,ids.length-1);
	return ids;
}

function ajaxFileUpload() {
	$("#fileImage").click();
	$("#fileImage").change(function(){
		var upFileName = $("input[name='fileImage']").val();
		$.ajaxFileUpload({
			type: 'post',
			url: "upload_image.do", //用于文件上传的服务器端请求地址  
			secureuri: false, //一般设置为false  
			fileElementId: 'fileImage', //文件上传控件的id属性  
			dataType: 'text',   
			success: function(data, status){ //服务器成功响应处理函数 
				if(data == 'false' || status != "success"){
					$('#file').filebox('clear');
					$.messager.alert('温馨提示','上传失败！','error');
				}else if(data == 'size_limit' || status != "success"){
					$('#file').filebox('clear');
					$.messager.alert('警告','请上传小于512KB的图片！','warning');
				}else if(status == "success") {
					$.messager.alert('温馨提示','图片上传成功！');
					$('#amttLogo').show();
					$('#file').filebox('clear');
					$('#imgId').attr("src", data);
				}
			}
		});
	});
}

