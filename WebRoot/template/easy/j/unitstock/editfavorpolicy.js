$(function(){
	
	$("#confirm").click(function(){
		add(0);
	});
	
	$('#update').click(function(){
		var fid = $('#fid').val();//主键
		update(fid);
	});
	
	//适用店铺
	$("#addStore").jeasycombo({
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		label:"适用店铺:",
		width:350,
		labelWidth:120,
		btnclass : "btn-success",//按钮样式
		url : "select/stockFstore.do?type=0",
		onChange: function(ids, texts){
			var storeid = $("#addStore").jeasycombo("getvalue").ids;
			var fmarkid = $("#addMark").jeasycombo("getvalue").ids;
			var fstockclassid = $("#addStockClass").jeasycombo("getvalue").ids;
			$("#FStoreID").val(storeid);
			$("#addStock").jeasycombo("reload", "store/selStockDetailPolicy.do?stockClassId="+fstockclassid+"&markId="+fmarkid+"&storeId="+storeid);
			$("#addStock").jeasycombo("disabled", false);
			$("#addGiftNames").jeasycombo("reload", "store/MOselGiftStockPolicy.do?stockClassId="+fstockclassid+"&markId="+fmarkid+"&storeId="+storeid);
//			$("#addGiftNames").jeasycombo("reload", "store/selGiftStockPolicy.do?stockClassId=&markId=&storeId="+storeid);
			$("#addGiftNames").jeasycombo("disabled", false);
		}
	});
//	商品类别
	$("#addStockClass").jeasycombo({
		inputId:'addStockClass',
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		btnclass : "btn-warning",//按钮样式
		detail:false,
		label:"商品类别:",
		width:350,
		labelWidth:120,
		url : "select/stockClass.do?t=2",
		onChange: function(ids, texts){
			var fmarkid = $("#addMark").jeasycombo("getvalue").ids;
			var storeid = $("#FStoreID").val();
			$("#addStock").jeasycombo("reload", "store/selStockDetailPolicy.do?stockClassId="+ids+"&markId="+fmarkid+"&storeId="+storeid);
			$("#addStock").jeasycombo("disabled", false);
//			$("#addGiftNames").jeasycombo("reload", "store/selGiftStockPolicy.do?stockClassId="+ids+"&markId="+fmarkid+"&storeId="+storeid);
			$("#addGiftNames").jeasycombo("disabled", false);
		}
	});

	//适用品牌
	$("#addMark").jeasycombo({
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		btnclass : "btn-success",//按钮样式
		label:"适用品牌:",
		width:350,
		labelWidth:120,
		url: 'select/mark.do',
		onChange: function(ids, texts){
			var fstockclassid = $("#addStockClass").jeasycombo("getvalue").ids;
			var storeid = $("#FStoreID").val();
			$("#addStock").jeasycombo("reload", "store/selStockDetailPolicy.do?stockClassId="+fstockclassid+"&markId="+ids+"&isMuti=false&storeId="+storeid);
			$("#addStock").jeasycombo("disabled", false);
//			$("#addGiftNames").jeasycombo("reload", "store/selGiftStockPolicy.do?stockClassId="+fstockclassid+"&markId="+ids+"&isMuti=false&storeId="+storeid);
			$("#addGiftNames").jeasycombo("disabled", false);
		}
	});
	
	//适用商品
	$("#addStock").jeasycombo({
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:1,
		type : "list",//弹出的样式
		label:"适用商品:",
		width:350,
		labelWidth:120,
		btnclass : "btn-success",//按钮样式
		url: 'store/selStockDetailPolicy.do'	
	});
	//满减方式
	$("#cuttype").combobox({
		data:[{'fid':1,'fname':'累计减','selected':true},{'fid':2,'fname':'每满减'}],
		panelHeight:50,
		onChange:function(){
			cuttypechange();
		}
	})

//	优惠方式
	$("#addMode").combobox({
		data:[{'fid':1,'fname':'满减'},{'fid':2,'fname':'直减','selected':true},{'fid':3,'fname':'打折'},{'fid':4,'fname':'赠品'}/*,{'fid':5,'fname':'积分抵现'}*/],
		panelHeight:100,
		onChange:function(){
			changeMode();
		}
	})	
	//加载赠品
	$("#addGiftNames").jeasycombo({
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:1,
		type : "list",//弹出的样式
		width:350,
		labelWidth:120,
		label:'赠品名称:',
		btnclass : "btn-success",//按钮样式
		url: 'store/MOselGiftStockPolicy.do'	
//		url: 'store/selGiftStockPolicy.do'	
	});
//	是否是独立政策
	$("#isalone").combobox({
		data:[{'fid':1,'fname':'否'},{'fid':2,'fname':'是','selected':true}],
		panelHeight:50,
		onChange:function(){
			alonechange();
		}
	});
	
	//加载联合满减政策
	$("#linkpolicyids").jeasycombo({
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		width:350,
		labelWidth:120,
		label:'联合满减政策:',
		linenum:1,
		type : "list",//弹出的样式
		btnclass : "btn-success",//按钮样式
		url: 'favorpolicy/selStockPolicys.do'	
	});
	//优惠承担方式
	$('#addFeePayable').combobox({
		data:[{'fid':0,'fname':'按比例','selected':true},{'fid':1,'fname':'按金额'}],
		panelHeight:50,
		onChange:function(newValue,oldValue){
			if(newValue==0){
				$(".feePayRate").numberbox({
					min:0,
					max:1,
					precision:2
				})
				$(".feePayRate").each(function(){
					var obj=$(this);
					obj.numberbox('textbox').on('keyup',function(e){
						var opt=obj.numberbox("options");
						if(opt.precision==0){
							obj.textbox('setValue',$(this).val().replace(/\D/g,''))
						}else if(opt.precision==2){
							obj.textbox('setValue', check2($(this).val()));
						}
					})
				})
				
			}else if(newValue==1){
				$(".feePayRate").numberbox({
					min:0,
					max:'',
					precision:0
				})
				$(".feePayRate").each(function(){
					var obj=$(this);
					obj.numberbox('textbox').on('keyup',function(e){
						var opt=obj.numberbox("options");
						if(opt.precision==0){
							obj.textbox('setValue',$(this).val().replace(/\D/g,''))
						}else if(opt.precision==2){
							obj.textbox('setValue', check2($(this).val()));
						}
					})
				})
			}
		}
	})
	changeMode();
});
/*	//	购满金额：失去焦点事件
	$("input",$("#maxfullcutamount").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})
//	最大满减金额：失去焦点事件
	$("input",$("#addTotalAmount").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})
//	优惠金额/折扣率：失去焦点事件
	$("input",$("#addPerAmount").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})
//	厂家承担:失去焦点事件
	$("input",$("#unitFeePayRate").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})
//	商家承担:失去焦点事件
	$("input",$("#storeFeePayRate").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})
//	总部承担:失去焦点事件
	$("input",$("#corpfeePayRate").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})
//	促销说明:失去焦点事件
	$("input",$("#addAbstract").next("span")).blur(function(){
		cleatLastPoint(this)
		
	})*/
	/*$('.combo-text').eq(0).popover({   
		trigger: 'hover', 
	    container: 'body',
	    placement: 'bottom',
	    html: true, 
//	    content:'可多选店铺，也可为空，为空时则是全部店铺适用'
	});
	
	$('.combo-text').eq(1).popover({   
		trigger: 'hover', 
	    container: 'body',
	    placement: 'bottom',
	    html: true, 
//	    content:'可多选商品类别，可为空'
	});

	$('.combo-text').eq(2).popover({   
		trigger: 'hover', 
	    container: 'body',
	    placement: 'bottom',
	    html: true, 
//	    content:'可多选品牌，可为空'
	});
	
	setTimeout(function(){
		$('.combo-text').eq(3).popover({   
			trigger: 'hover', 
			container: 'body',
			placement: 'bottom',
			html: true, 
//			content:'可多选商品，满减可为空，直减、打折、赠品不可为空'
		});

		$('.combo-text').eq(4).popover({   
			trigger: 'hover', 
			container: 'body',
			placement: 'bottom',
			html: true, 
//			content:'可多选，优惠方式为赠品时必填'
		});
	},500);*/



//判断结束时间是否大于开始时间
function judgetime(){
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	fbegintime = fbegintime.replace(/-/g,"/");
	fendtime = fendtime.replace(/-/g,"/");
	var startdate = new Date(fbegintime);//开始时间
	var enddate = new Date(fendtime);//结束时间
	if(enddate<startdate){
		$.messager.alert("提示","结束日期必须大于开始日期！","error");
		$('#FEndTime').val("");
	}
}

/*$('#addMode').popover({   
	trigger: 'hover', 
    container: 'body',
    placement: 'bottom',
    html: true, 
//    content:'满减：一张订单购物满多少钱即可优惠多少钱，例如：满100减20，那么消费金额大于100即可减20。<br/>'+
//    	'直减：一个商品购物直接减多少钱，例如：直减20，只要消费金额大于20，即可减20。<br/>'+
//    	'打折：一个商品根据折扣率直接打折减钱。<br/>'+
//    	'赠品：一个商品附带赠品，金额为0。'
});*/

/*$('#addTotalAmount').popover({   
	trigger: 'hover', 
    container: 'body',
    placement: 'bottom',
    html: true, 
//    content:'当优惠方式为满减时，不可为空'
});

$('#addGiftMaxQuanty').popover({   
	trigger: 'hover', 
    container: 'body',
    placement: 'bottom',
    html: true, 
//    content:'设置的多个赠品中选择几种，用于多选一，例如设置了三个赠品，如果是三选一时，则设置最大赠送种类为1'
});

$('#addFeePayable').popover({   
	trigger: 'hover', 
    container: 'body',
    placement: 'bottom',
    html: true, 
//    content:'商家承担（红卡），厂家承担（蓝卡），总部承担（绿卡）'
});

$('#addPerAmount').popover({   
	trigger: 'hover', 
    container: 'body',
    placement: 'bottom',
    html: true, 
//    content:'当优惠方式为满减、直减时，优惠金额不可为空！<br/>当优惠方式为打折时，折扣率不可为空！'
});*/

//直减：验证金额是否高于商品价格
function pcompare(){
	var stock = $('#addStock').jeasycombo("getvalue").ids;
	var price = $('#addPerAmount').val();
	var storeids = $("#addStore").jeasycombo("getvalue").ids;
	var flag="";
	var usjson = {
			substockid : stock,
			price : price,
			storeids : storeids
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
//		url : 'favorpolicy/pcompare.do',S
		url : "favorpolicy/compareAmountByLapse.do",
		data:{
			jsonobj:JSON.stringify(usjson)
		},
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success : function(data){
			$.messager.progress("close");//隐藏加载
			flag = data.stocksname;
		}
	});
	return flag;
}

//验证
function validInput(){
	var mode = $('#addMode').combobox('getValue');//优惠方式
	var stock = $('#addStock').jeasycombo("getvalue").ids;//商品
	var gift = $('#addGiftNames').jeasycombo("getvalue").ids;//赠品名称 
	
	var fbegintime = $('#FBeginTime').val();//开始时间
//	var fid = $('#fid').val();
	var ftotalamount = $('#addTotalAmount').val();//购买金额:
	var perAmount = $('#addPerAmount').val();//优惠金额
	var giftMaxQuanty = $('#addGiftMaxQuanty').val();//最大赠送种类:
//	var ffeepayrate = $('#addFeePayRate').val();
	var fmaxfullcutamount =  $("#maxfullcutamount").val();//最大满减金额
	var addFeePayable = $("#addFeePayable").combobox('getValue');//承担方式：0=按比例，1=按金额
	var cuttype = $("#cuttype").combobox('getValue');//满减方式:
	
	if(fbegintime == ''){
		$.messager.alert("提示","请选择开始日期","error");
		return false;
	}
	
	if(stock=='' && !(mode==1)){
		$.messager.alert("提示","当优惠方式为直减、打折、赠品、积分抵现时，适用商品不可为空！","error");
		return false;
	}
	if(mode==4 && gift==''){
		$.messager.alert("提示","当优惠方式为赠品时，赠品名称不可为空！","error");
		return false;
	}
//	if(mode==4 && giftMaxQuanty==''){
//		$.messager.alert("提示","当优惠方式为赠品时，最大赠送种类不可为空！","error");
//		return false;
//	}
	if((mode == 1) && ftotalamount == ''){
		$.messager.alert("提示","当优惠方式为满减时，购满金额不可为空！","error");
		return false;
	}
	if((mode == 1 || mode ==2) && perAmount == ''){
		$.messager.alert("提示","当优惠方式为满减、直减时，优惠金额不可为空！","error");
		return false;
	}
	if((mode == 3) && perAmount == ''){
		$.messager.alert("提示","当优惠方式为打折时，折扣率不可为空！","error");
		return false;
	}
	if(gift == ''){
		if(giftMaxQuanty != ''){
			$.messager.alert("提示","最大赠送种类不能超过赠品种类数量！","error");
			return false;
		}
	}else{
		var gifts = gift.split(',');
		if(parseInt(giftMaxQuanty) > gifts.length){
			$.messager.alert("提示","最大赠送种类不能超过赠品种类数量！","error"); 
			return false;
		}
	}
	if(mode == 1 && (parseInt(perAmount) > parseInt(ftotalamount))){
		$.messager.alert("提示","当优惠方式为满减时，优惠金额不能大于购满金额！","error"); 
		return false;
	}
	if(mode == 3 && perAmount >=1){
		$.messager.alert("提示","当优惠方式为打折时，折扣率不能大于1！","error"); 
		return false;
	}
//	if(ffeepayrate >=1){
//		$.messager.alert("提示","优惠承担比例不能大于1！","error");
//		return false;
//	}
	if(mode==1 && fmaxfullcutamount=="" && cuttype==2){
		$.messager.alert("提示","最大满减金额不可为空！","error"); 
		return false;
	}
	if(mode == 2){
		var flag = pcompare();
		if(flag != ""){
			$.messager.alert("提示","当优惠方式为直减时，优惠金额不能大于商品价格！","error");
			return false;
		}
	}
	if(mode==5 && fscore==""){
		$.messager.alert("提示","消耗积分不可为空！","error"); 
		return false;
	}
	if(mode==5 && fscoretoamountrate==""){
		$.messager.alert("提示","积分抵现使用比率不可为空！","error"); 
		return false;
	}
	if(mode==5 && parseInt(fscoretoamountrate)>1||mode==5 && parseInt(fscoretoamountrate)<0){
		$.messager.alert("提示","积分抵现使用比率只能输入0-1之间的小数！","error"); 
		return false;
	}
	var funitfeepayrate=$("#unitFeePayRate").val();//厂家承担
	var fstoreFeePayRate=$("#storeFeePayRate").val();//商家承担
	var fcorpfeepayrate=$("#corpfeePayRate").val();//总部承担
	if(funitfeepayrate==undefined || funitfeepayrate==""){
		funitfeepayrate=0;
	}
	if(fstoreFeePayRate==undefined || fstoreFeePayRate==""){
		fstoreFeePayRate=0;
	}
	if(fcorpfeepayrate==undefined || fcorpfeepayrate==""){
		fcorpfeepayrate=0;
	}
	var total = parseFloat(funitfeepayrate)+parseFloat(fstoreFeePayRate)+parseFloat(fcorpfeepayrate);
	if(addFeePayable==0){//按比例
		if(parseFloat(total)!=1){
			$.messager.alert("提示","当承担方式为按比例时，厂家、商家和总部承担比例之和为1","error");
			return false;
		}
	}else{//按金额
		if(mode==1 || mode==2){
		if(parseFloat(total)!=parseFloat(perAmount)){
			$.messager.alert("提示","当承担方式为按金额时，厂家、商家和总部承担金额之和为优惠金额","error");
			return false;
		}
	}
		if(mode==5){
			if(parseFloat(total)!=parseFloat(perAmount)){
				$.jbootmsg("当承担方式为按金额时，厂家、商家和总部承担金额之和为抵现金额","error");
				return false;
			}
		}
	}
	var fabstract = $("#addAbstract").val();
	var isalone= $("#isalone").val();//是否是独立政策
	if(mode==1 && fabstract == "" && isalone==1){//满减--不是独立政策
		$.messager.alert("提示","政策说明不可为空！","error");
		return false;
	}
	return true;
}

//保存
function add(policyid){
	var flag = getfavorval();
	if(flag=="false"){
		return;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
		url : 'favorpolicy/addpolicy.do',
		data: {
			jsonobj: flag["jsonobj"],
			params: flag["params"],
			policyid: policyid,
		},
		dataType : "json",
		success : function(data){
			$.messager.progress("close");//隐藏加载
			if(data.result==false){
				$.messager.alert("提示",data.msg,"error");
			}else if(data.result == true){
				$.messager.alert("提示",data.msg,"info");
				setTimeout(editSuccess(), 1000);
			}else{
				$.messager.alert("提示","未知错误！","error");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载
			 $.messager.alert("提示","添加失败！","error");
		}
	});
}

//取值
function getfavorval(){
	var flag = validInput();
	if(flag){
		var fmode=$("#addMode").combobox('getValue');//优惠方式(1=满减，2=直减，3=折扣，4=赠品)
		var accessory = {};//辅助参数
		if(fmode==1){
			accessory["ffullcuttype"]=$("#cuttype").combobox('getValue');//满减方式
			var isalone= $("#isalone").combobox('getValue');//是否是独立政策
			accessory["fisalone"]=isalone;
			var linkpolicyids = "";
			if(isalone==1){//不是独立政策
				linkpolicyids= $("#linkpolicyids").jeasycombo("getvalue").ids;//联合满减政策
			}
			accessory["flinkpolicyids"] = linkpolicyids;
			accessory["fmaxfullcutamount"]= $("#maxfullcutamount").val();//最大满减金额
			accessory["ftotalamount"]=$('#addTotalAmount').val();//购满金额
			accessory["fperamount"]=$("#addPerAmount").val();//优惠金额

		}else if(fmode==2 || fmode==3){
			accessory["fperamount"]=$("#addPerAmount").val();//优惠金额/折扣率
		}else if(fmode==4){
			accessory["fgiftids"]=$("#addGiftNames").jeasycombo("getvalue").ids;
			accessory["fgiftnames"]=$("#addGiftNames").jeasycombo("getvalue").texts;
			accessory["fgiftmaxquanty"]=$("#addGiftMaxQuanty").val();//最大赠送种类
		}
		var params = JSON.stringify(accessory);
		var usjson={
				fbegaindate:$("#FBeginTime").val(),
				fenddate:$("#FEndTime").val(),
				fstoreids:$("#addStore").jeasycombo("getvalue").ids,
				fstorenames:$("#addStore").jeasycombo("getvalue").texts,
				fstockclassids:$("#addStockClass").jeasycombo("getvalue").ids,
				fstockclassnames:$("#addStockClass").jeasycombo("getvalue").texts,
				fmarkids:$("#addMark").jeasycombo("getvalue").ids,
				fmarknames:$("#addMark").jeasycombo("getvalue").texts,
				fsubstockids:$("#addStock").jeasycombo("getvalue").ids,
				fsubstocknames:$("#addStock").jeasycombo("getvalue").texts,
				fmode: fmode,//优惠方式
				fabstract:$("#addAbstract").val(),//说明--标题
				
				ffeepayable: $("#addFeePayable").val(),//优惠承担方式：0=按比例，1=按金额
				funitfeepayrate: $("#unitFeePayRate").val(),//厂家承担
				fstorefeepayrate: $("#storeFeePayRate").val(),//商家承担
				fcorpfeepayrate: $("#corpfeePayRate").val(),//总部承担
			 };
		var dataparam = {
				jsonobj:JSON.stringify(usjson),
				params:params
		};
		return dataparam;
	}else{
		return "false";
	}
}

//修改
function update(policyid){
	var flag = getfavorval();
	if(flag=="false"){
		return;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
		url : 'favorpolicy/modifypolicy.do',
		data: {
			jsonobj: flag["jsonobj"],
			params: flag["params"],
			policyid: policyid,
		},
		dataType : "json",
		success : function(data){
			$.messager.progress("close");//隐藏加载
			if(data.result==false){
				$.messager.alert("提示",data.msg,"error");
			}else if(data.result == true){
				$.messager.alert("提示",data.msg,"info");
				setTimeout(editSuccess(), 1000);
			}else{
				$.messager.alert("提示","未知错误！","error");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载
			 $.messager.alert("提示","系统错误！","error");
		}
	});
}

//验证只能是整数
function checkInteger(obj){
	obj.value = obj.value.replace(/[^0-9]/g, '');
}

//只能输入两位的小数或整数
function check(obj){
	obj.value = obj.value.replace(/[^\d.]/g, "").
	        //只允许一个小数点              
	        replace(/^\./g, "").replace(/\.{2,}/g, ".").
	        //只能输入小数点后两位
	        replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
}

//最后一位是小数点，清除
/*function cleatLastPoint(obj){
	obj.value = obj.value.replace(/\.$/g, "");
}*/

//下拉框改变选项事件
function changeMode(){
	var mode = $('#addMode').combobox('getValue');
//	$('#addPerAmount').numberbox('setValue','');
	if(mode == 1){//满减
		//优惠金额/折扣率---更改
		$('#addPerAmount').numberbox({
			label:'优惠金额:',
			min:0,
			max:'',
			precision:2
		})
		$('#addPerAmount').numberbox('textbox').on('keyup',function(e){
			var opt=$('#addPerAmount').numberbox("options");
			if(opt.precision==0){
				$('#addPerAmount').textbox('setValue',$(this).val().replace(/\D/g,''))
			}else if(opt.precision==2){
				$('#addPerAmount').textbox('setValue', check2($(this).val()));
			}
		})
		//优惠金额/折扣率
		$(".ungiftstyle").removeClass("linkstyle");
		//满减方式、是否是独立政策、购满金额
		$(".fulldiv").removeClass("fullstyle");
		//赠品名称\最大赠送种类
		$(".giftdiv").addClass("giftstyle");
		//优惠承担方式
		$("#addFeePayable").combo("readonly",false);
		//消耗积分
		$(".FScore").addClass("fullstyle");
		//积分抵现使用
		$(".FScoreToAmountRate").addClass("fullstyle");
		cuttypechange();
		alonechange();
	}else if(mode == 2){//直减
		$('#addPerAmount').numberbox({
			label:'优惠金额:',
			min:0,
			max:'',
			precision:2
		})
		$('#addPerAmount').numberbox('textbox').on('keyup',function(e){
			var opt=$('#addPerAmount').numberbox("options");
			if(opt.precision==0){
				$('#addPerAmount').textbox('setValue',$(this).val().replace(/\D/g,''))
			}else if(opt.precision==2){
				$('#addPerAmount').textbox('setValue', check2($(this).val()));
			}
		})
		$(".ungiftstyle").removeClass("linkstyle");
		$(".fulldiv").addClass("fullstyle");
		$(".giftdiv").addClass("giftstyle");
		//联合满减政策
		$(".fulllinkdiv").addClass("linkstyle");
		$("#addFeePayable").combo("readonly",false);
		//最大满减金额
		$(".maxfulldiv").addClass("linkstyle");
		$(".fulllinkdiv").addClass("linkstyle");
		
		$(".FScore").addClass("fullstyle");
		$(".FScoreToAmountRate").addClass("fullstyle");
	}else if(mode == 3){//打折
		$('#addPerAmount').numberbox({
			label:'折扣率:',
			min:0,
			max:1,
			precision:2
		})
		$('#addPerAmount').numberbox('textbox').on('keyup',function(e){
			var opt=$('#addPerAmount').numberbox("options");
			if(opt.precision==0){
				$('#addPerAmount').textbox('setValue',$(this).val().replace(/\D/g,''))
			}else if(opt.precision==2){
				$('#addPerAmount').textbox('setValue', check2($(this).val()));
			}
		})
//		$('#addPerAmount').prop("data-options","label:'折扣率'");
		$(".fulldiv").addClass("fullstyle");
		$(".ungiftstyle").removeClass("linkstyle");
		$(".giftdiv").addClass("giftstyle");
		$(".fulllinkdiv").addClass("linkstyle");
		$("#addFeePayable").combo("readonly",false);
		//满减
		$(".maxfulldiv").addClass("linkstyle");
		$(".fulllinkdiv").addClass("linkstyle");
		
		$(".FScore").addClass("fullstyle");
		$(".FScoreToAmountRate").addClass("fullstyle");
	}else if(mode == 4){//4=赠品
		//优惠金额
		$(".ungiftstyle").addClass("linkstyle");
		$(".fulldiv").addClass("fullstyle");
		$(".giftdiv").removeClass("giftstyle");
		$(".fulllinkdiv").addClass("linkstyle");
		$("#addFeePayable").combo("readonly",true);
		$("#addFeePayable").combobox("setValue","1");//按金额
		//满减
		$(".maxfulldiv").addClass("linkstyle");
		$(".fulllinkdiv").addClass("linkstyle");
		
		$(".FScore").addClass("fullstyle");;
		$(".FScoreToAmountRate").addClass("fullstyle");
//		$('#amountChange').html('优惠金额/折扣率：');
	}else{//=5积分抵现
		$('#addPerAmount').numberbox({
			label:'抵现金额:',
			min:0,
			max:'',
			precision:2
		})
		$('#addPerAmount').numberbox('textbox').on('keyup',function(e){
			var opt=$('#addPerAmount').numberbox("options");
			if(opt.precision==0){
				$('#addPerAmount').textbox('setValue',$(this).val().replace(/\D/g,''))
			}else if(opt.precision==2){
				$('#addPerAmount').textbox('setValue', check2($(this).val()));
			}
		})
		$(".FScore").removeClass("fullstyle");
		$(".FScoreToAmountRate").removeClass("fullstyle");
		$(".ungiftstyle").removeClass("linkstyle");
		$(".fulldiv").addClass("fullstyle");
		$(".giftdiv").addClass("giftstyle");
		$(".fulllinkdiv").addClass("linkstyle");
		$("#addFeePayable").combo("readonly",false);
		//满减
		$(".maxfulldiv").addClass("linkstyle");
		$(".fulllinkdiv").addClass("linkstyle");
	}
}

//是否是独立的政策
function alonechange(){
	var isalone=$("#isalone").combobox('getValue');
	if(isalone==1){//不独立
		//联合满减政策
		$(".fulllinkdiv").removeClass("linkstyle");
	}else if(isalone==2){//独立
		$(".fulllinkdiv").addClass("linkstyle");
	}
}

//满减方式--累计、每满减
function cuttypechange(){
	var cuttype=$("#cuttype").combobox('getValue');
	if(cuttype==1){//累计
		$(".maxfulldiv").addClass("linkstyle");
	}else if(cuttype==2){//每满减
		$(".maxfulldiv").removeClass("linkstyle");
	}
}

function editSuccess(){
	window.opener.search();//调用父窗口的方法（只适用于使用 window.open打开的页面）
	window.close();
}
















