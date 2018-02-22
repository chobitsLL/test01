
//审核--确认订单
function checkOrder(o){
	var checkorder = $(o.checkorder).attr("value");
	if(checkorder == "0"){
		 $("#checkorderinfo"+o.page_id).jbootdialog("show");
	}else{	
		 $("#checklogmemo"+o.page_id).attr("disabled","disabled");
		 $("#checkorderinfo"+o.page_id).jbootdialog("gettraget","footer").attr("style","display:none;");
		 $("#checkorderinfo"+o.page_id).jbootdialog("show");
	}	
};	

//审核通过
function passcheck(obj,pageid){
	var subRow = {};
	var url = "managerorders/OTSaveCheckMemo.do?";
	var orderdetailid = $(obj).val();
	var checkmemo = $("#checklogmemo"+pageid).val();
	var fpaytype=$("#checkorder"+pageid).attr("paytype");
	var fsended=$("#sendorder"+pageid).attr("value");
	var fchecked=$("#checkorder"+pageid).attr("value");
	subRow["fpaytype"]=fpaytype; 
	subRow["fsended"]=fsended;
	subRow["fchecked"]=fchecked;
	subRow["checkmemo"] = checkmemo;
	var params = JSON.stringify(subRow);
	var flag = saveSubmit(url,params,orderdetailid);
	$.jbootmsg("您确定要执行该操作吗？","confirm",function(){
	$.jbootloading("show");
	if(flag.result){
		$.jbootloading("hide");
		$.jbootmsg("审核成功，等待发货",'info');
		$("#checkorderinfo"+pageid).jbootdialog("hide");
		window.location.reload();
	}else{
		$.jbootloading("hide");
		$.jbootmsg("审核失败",'error');
	}
	})
}

//审核不通过
function refusecheck(obj,pageid){
	var subRow = {};
	var url = "managerorders/OTSaveCheckRefuseMemo.do?";
	var checkmemo = $("#checklogmemo"+pageid).val();
	var fpaytype=$("#checkorder"+pageid).attr("paytype");
	var fsended=$("#sendorder"+pageid).attr("value");
	var fchecked=$("#checkorder"+pageid).attr("value");
	var orderdetailid = $(obj).val();
	if(checkmemo == ""){
		$.jbootmsg("请填写审核意见");
		return false;
	}
	subRow["fpaytype"]=fpaytype; 
	subRow["fsended"]=fsended;
	subRow["fchecked"]=fchecked;
	subRow["checkmemo"] = checkmemo;
	var params = JSON.stringify(subRow);
	var flag = saveSubmit(url,params,orderdetailid);
	$.jbootmsg("您确定要执行该操作吗？","confirm",function(){
	$.jbootloading("show");
	if(flag.result){
		$.jbootmsg("审核成功，拒绝该订单发货",'info');
		$.jbootloading("hide");
		$("#checkorderinfo"+pageid).jbootdialog("hide");
		window.location.reload();
//		$("#checkorder"+pageid).attr("value","3");
//		$(".edit-imgbutton").each(function(){
//			$(this).addClass("hidden");
//		});
	}else{
		$.jbootloading("hide");
		$.jbootmsg("审核失败",'error');
	}
	})
}

//取消审核
function cancelcheck(pageid){
	$("#checkorderinfo"+pageid).jbootdialog("hide");
}

//是否收款
function payOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.payorder).attr("fno");
	if(fsyncerp>0){
		$.jbootmsg("定单【"+fno+"】请在ERP中执行本操作！");
		return false;
	}
	var fpaytype=$(o.checkorder).attr("paytype");
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	if (fpaytype!=99){
		$(o.orderdetailid).addClass("disabled");
	}
	else if($(o.pay).val() == "99"){
		$.jbootmsg("是否确认收款？","confirm",function(c){
			$.jbootloading("show");
				if(!c){
					return;
				} 
			});
	}
	
	var data = {};
	var url = "managerorders/OTChangePayBtn.do?";
	
	var fsended=$(o.sendorder).attr("value");
	var freved = $(o.revedorder).attr("value");
	var fpaytype=$(o.checkorder).attr("paytype");
	//var params = {"fpayed":"1"};
	data["fpaytype"] = fpaytype;
	data["fsended"] = fsended;
	data["freved"] = freved;
	params = JSON.stringify(data);
	var flag = saveSubmit(url,params,orderdetailid);
	if(flag.result){
		$.jbootloading("hide");
		$.jbootmsg("收款成功！", 'info');
		window.location.reload();
	}else{
		$.jbootloading("hide");
		$.jbootmsg("操作失败！", 'error');
	}
};

//是否发货
function sendOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.checkorder).attr("fno");
	if(fsyncerp>0){
		$.jbootmsg("定单【"+fno+"】请在ERP中执行本操作！");
		return false;
	}
	var data = {};
	var url = "managerorders/OTChangeSendBtn.do?";
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var fpaytype = $(o.checkorder).attr("paytype");
	var fchecked = $(o.checkorder).attr("value");
	var fpayed = $(o.payorder).attr("value");
	var freved = $(o.revedorder).attr("value");
	var fsended = $(o.sendorder).attr("value");
	data["fpaytype"]=fpaytype;
	data["fchecked"]=fchecked;
	data["fpayed"]=fpayed;
	data["freved"]=freved;
	data["fsended"]=fsended;
	var params = JSON.stringify(data);
	var flag = saveSubmit(url,params,orderdetailid);
	$.jbootmsg("您确定要执行该操作吗？","confirm",function(){
	$.jbootloading("show");
	if(flag.result){
		$.jbootloading("hide");
		$.jbootmsg("发货成功！", 'info');
		window.location.reload();
		
	}else{
		$.jbootloading("hide");
		$.jbootmsg(flag.msg, 'error');
	}
	})
};

//是否收货
function revedOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.checkorder).attr("fno");
	if(fsyncerp>0){
		$.jbootmsg("定单【"+fno+"】请在ERP中执行本操作！");
		return false;
	}
	var data = {};
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var url = "managerorders/OTChangeRevedBtn.do?";
	var fsended = $(o.sendorder).attr("value");
	var freved = $(o.revedorder).attr("value");
	data["fsended"]=fsended;
	data["freved"]=freved;
	params = JSON.stringify(data);
	$.jbootmsg("您确定要执行该操作吗？","confirm",function(){
		var flag = saveSubmit(url,params,orderdetailid);
		$.jbootloading("show");
		if(flag.result){
			$.jbootloading("hide");
			$.jbootmsg("该订单确认收货成功！", 'info');
			window.location.reload();
		}else{
			$.jbootloading("hide");
			$.jbootmsg("操作失败！", 'error');
		}
	})
};

//是否退货
function returnOrder(o){
	var page_id = o.page_id;
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID	
	var returndiv = $("<div id='returnOrder"+page_id+"'></div>");
	var table = $("<table id='returntable"+page_id+"' style='margin: 50px 50px;' cellspacing='8'></table>");
	var tr1 = $("<tr><td>退换货审核：</td></tr>");
	var tr2 = $("<tr><td>审核备注：</td></tr>");
	var select = $("<select id='select"+page_id+"' class='easyui-combobox' data-options='width: 300'>");
	var option = $("<option value='0' selected='selected'>未审核</option><option value='1' >审核通过</option><option value='2' >审核未通过</option>");
	var textarea = $("<textarea id='textarea"+page_id+"' cols='20' rows='2' class='easyui-validatebox' data-options='required: true'></textarea>");
	table.appendTo(returndiv);
	tr1.appendTo(table);
	tr2.appendTo(table);
	textarea.appendTo(tr2);
	select.appendTo(tr1);
	option.appendTo(select);
	returndiv.dialog({
		width : 450,
		height : 300,
		resizable:true,
		title : "退换货审核",
		buttons : [{				
			text:'确定',
			handler:function(){
				var returncheck = $("#select"+page_id).find("option:selected").text();
				var returnemmo = $("#textarea"+page_id).val();
				onclick = orderRerurnSubmit(returndiv,orderdetailid,returncheck,returnemmo);
			}
		},{					
			text : '取消',
			handler : function() {
				onclick = returndiv.dialog("close");
			}
		} ],

		closed : false,
		cache : false,
		modal : true
	});
	returndiv.dialog('open');

};

//退换货审核提交
function orderRerurnSubmit(returndiv,orderid,returncheck,returnemmo){
	var subRow = {};
	subRow["returncheck"] = returncheck;
	subRow["returnemmo"] = returnemmo;
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTReturnOrderBtn.do?";	
	$.jbootloading("show");
	$.ajax({
		url : url+"&editid="+orderid, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data : {
			jsonobj : params
		}, 
		success : function(json) {
			$.jbootloading("hide");
			if(json.result){
				$.jbootmsg("审核成功！", 'info');
				returndiv.dialog("close");
			}else{
				$.jbootmsg("审核失败！", 'error');
			}
		}
	});
};

//是否作废
function cancelOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.checkorder).attr("fno");
	if(fsyncerp>0){
		$.jbootmsg("定单【"+fno+"】请在ERP中执行本操作！");
		return false;
	}
	var pay = $(o.pay).val();
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var sendorder = $(o.sendorder).attr("value");
	if(pay == 99 && sendorder == 0){
		var url = "managerorders/OTCancelOrderBtn.do?";
		$.jbootmsg("您确定要执行该操作吗？","confirm",function(){
			 $.jbootloading("show");
				var flag = saveSubmit(url,"",orderdetailid);
				if(flag.result){
					$(o.delorder).addClass("disabled");
					$(o.delorder).attr("value","已作废");
					$.jbootloading("hide");
					$.jbootmsg("操作成功！", 'info');
				}else{
					$.jbootloading("hide");
					$.jbootmsg("操作失败，该订单未被删除！", 'error');
				}
		});
	}else if(pay == 99 && sendorder == 1){
		$.jbootmsg("此订单已发货，不可作废！", 'info');
	}else{
		$.jbootmsg("此订单不可作废！", 'info');
	}
	
	
};

//上一个订单
function upOrder(o){
	var uporder = $(o.uporder).attr("preid");
	var preno = $(o.uporder).attr("preno");
	if(uporder == "kong" || preno == "kong"){
		$.jbootmsg("此订单已是此页面第一条数据！");
		return;
	}
	var eidtid = $(o.orderdetailid).val();//当前id
	
	window.location.href = "managerorders/OTLookOrder.do?editid="+eidtid+"&preid="+uporder+"&nextid=0&storetype=";

};

//下一个订单
function downOrder(o){
	var eidtid = $(o.orderdetailid).val();//当前id
	var downorder = $(o.downorder).attr("nextid");
	var nextno = $(o.downorder).attr("nextno");
	if(downorder == "kong" || nextno == "kong"){
		$.jbootmsg("此订单是次此页面最后一条数据！");
		return;
	}
	window.location.href = "managerorders/OTLookOrder.do?editid="+eidtid+"&nextid="+downorder+"&preid=0&storetype=";

};

//订单商品价格编辑
function priceEidt(o,title){
	$("#"+o.pricediv).attr("style","display: none");
	$("#"+o.hidepricediv).attr("style","display: block");
};

//订单商品价格保存
function priceSave(o){
	var subRow = {};
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var newprice = $("#"+o.oprice).val();//价格new
	if(!isNum(newprice)){
		$.jbootmsg("请输入数字");
		return;
	}
	if(newprice == ""){
		$.jbootmsg("价格不可为空");	
		return;
	}
	
	var oldprice = $("#"+o.pricedivValue).html();
	var quanty = $("#"+o.oquanty).html();
	var onamesub = $("#"+o.onamesub).html();//商品名称+规格
	var diffprice = (newprice - parseFloat(oldprice))*parseFloat(quanty);//差额
	var oldStockAt = $("#"+o.ostockamount).html();
	var oldStockTtAt = $("#"+o.ototalamount).html();
	var oldOrderStockAt = $(o.orderamounto).html();
	var oldrderTtAt = $(o.totalordero).html();
	
	var newStockAt = (parseFloat(oldStockAt) + diffprice).toFixed(2);//商品总额=数量*价格
	var newStockTtAt = (parseFloat(oldStockTtAt) + diffprice).toFixed(2);//合计（商品+运费）
	var newOrderStockAt = (parseFloat(oldOrderStockAt) + diffprice).toFixed(2);//订单商品总额（商品总额的累加）
	var newOrderTtAt = (parseFloat(oldrderTtAt) + diffprice).toFixed(2);//订单总额（合计的累加）
	var subid = $("#"+o.oprice).attr("subid");
	subRow["substockid"] = subid;
	subRow["newprice"] = newprice;
	subRow["newStockAt"] = newStockAt;
	subRow["newStockTtAt"] = newStockTtAt;
	subRow["newOrderStockAt"] = newOrderStockAt;
	subRow["newOrderTtAt"] = newOrderTtAt;
	subRow["oldprice"] = oldprice;
	subRow["onamesub"] = onamesub;
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTSaveOrderPrice.do?";
	var flag = saveSubmit(url,params,orderdetailid);
	if(flag.result){
		$("#"+o.pricedivValue).html(parseFloat(newprice).toFixed(2));//价格div--old
		$("#"+o.ostockamount).html(newStockAt);//商品总额 new
		$("#"+o.ototalamount).html(newStockTtAt);//合计（商品+运费）new
		$(o.orderamounto).html(newOrderStockAt);//订单商品总额 new
		$(o.totalordero).html(newOrderTtAt);//订单总额 new
		
		$("#"+o.pricediv).attr("style","display: block");
		$("#"+o.hidepricediv).attr("style","display: none");
	}else{
		priceCancel(o);
	}
};

//订单商品价格编辑取消
function priceCancel(o){
	var old = $("#"+o.pricediv).html();
	$("#"+o.oprice).val(old);
	$("#"+o.pricediv).attr("style","display: block");
	$("#"+o.hidepricediv).attr("style","display: none");
};

//订单商品运费编辑
function sendAtEidt(o){
	$("#"+o.sendatdiv).attr("style","display: none");
	$("#"+o.hidesendatdiv).attr("style","display: block");
};

//订单商品运费保存
function sendAtSave(o){
	var subRow = {};
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var newsend = $("#"+o.osendamount).val();//运费new
	if(!isNum(newsend)){
		$.jbootmsg("请输入数字");	
		return;
	}
	
	var oldsend = $("#"+o.senddivValue).html().replace(" ")==""?"0.00":$("#"+o.senddivValue).html();//old
	var diffsend = parseFloat(newsend) - parseFloat(oldsend);//差额
	var oldStockTtAt = $("#"+o.ototalamount).html();
//	var oldOrderStockAt = $(o.orderamounto).html();
	var oldOrderSendAt = $(o.sendordero).html();
	var oldrderTtAt = $(o.totalordero).html();
	
	var newStockTtAt = (parseFloat(oldStockTtAt) + diffsend).toFixed(2);//合计（商品+运费）
//	var newOrderStockAt = (parseFloat(oldOrderStockAt) + diffsend).toFixed(2);//订单商品总额
	var newOrderSendAt = (parseFloat(oldOrderSendAt) + diffsend).toFixed(2);//订单运费总额
	var newOrderTtAt = (parseFloat(oldrderTtAt) + diffsend).toFixed(2);//订单总额（合计的累加）
	var onamesub = $("#"+o.onamesub).html();//商品名称+规格
	var subid = $("#"+o.osendamount).attr("subid");
	subRow["substockid"] = subid;
	subRow["newsend"] = newsend;
	subRow["newStockTtAt"] = newStockTtAt;
	subRow["newOrderSendAt"] = newOrderSendAt;
	subRow["newOrderTtAt"] = newOrderTtAt;
	subRow["oldsend"] = oldsend;
	subRow["onamesub"] = onamesub;
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTSaveOrderSend.do?";
	var flag = saveSubmit(url,params,orderdetailid);
	if(flag.result){
		$("#"+o.senddivValue).html(parseFloat(newsend).toFixed(2));//价格div--old
		$("#"+o.ototalamount).html(newStockTtAt);//合计（商品+运费）new
		$(o.orderamounto).html(newStockTtAt);//订单商品总和
		$(o.sendordero).html(newOrderSendAt);//订单运费总额 new
		$(o.totalordero).html(newOrderTtAt);//订单总额 new
		
		$("#"+o.sendatdiv).attr("style","display: block");
		$("#"+o.hidesendatdiv).attr("style","display: none");
		
	}else{
		sendAtCancel(o);
	}
};

//订单商品运费编辑取消
function sendAtCancel(o){
	var old = $("#"+o.senddivValue).html();
	$("#"+o.osendamount).val(old);
	$("#"+o.sendatdiv).attr("style","display: block");
	$("#"+o.hidesendatdiv).attr("style","display: none");
};


//编辑----卖家备注
function editSellMemo(o){
	enSellMemoBtn(o);//启用
};
		
// 保存---卖家备注
function saveSellMemo(o) {

	var subRow = {};
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var value = $(o.fsellermemo).val();
	subRow["sellmemo"] = value;
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTSaveSellMemo.do?";
	var flag = false;
	flag = saveSubmit(url,params,orderdetailid);
	$.jbootloading("show");
	if (flag.result) {
		$(o.fsellermemo).attr("oldvalue",value);
		disSellMemoBtn(o);//禁用
		$.jbootloading("hide");
		$.jbootmsg("保存成功！", 'info');
	} else {
		cancelSellMemo(o);
		$.jbootloading("hide");
		$.jbootmsg("保存失败！", 'error');
	}		
};

//取消--卖家备注    --正在使用
function cancelSellMemo(o){

	var oldvalue = getOldValue(o);
	$(o.fsellermemo).val(oldvalue.fsellermemo);
	disSellMemoBtn(o);//禁用
};	

//修改--收货信息
function editRev(o) {
	enRevBtn(o);//启用
	var oldvalue = getOldValue(o);
	$(o.frevname).removeAttr("readonly");
	$(o.frevtel).removeAttr("readonly");
//	$(o.revaddrtabeid).attr("style","display: none");//隐藏省市乡镇
	$(o.revaddrtabeid).find("input").each(function() {
		$(this).css("display","none");
	});
	$(o.faddress).removeAttr("readonly");

	var len = $(o.revaddrtabeid).find("select").length;
	if(len > 0){
		$("#selectpro"+o.page_id).get(0).selectedIndex=0;
		$("#selectpro"+o.page_id+" option").not(":first").remove();
		setFirstSelect(o.page_id);
		$(o.revaddrtabeid).find("select").each(function() {
			$(this).attr("style","width: 150px;margin-right: 10px;");
		});
		initArea(o.page_id,oldvalue);// 初始区域
		$(o.faddress).val(oldvalue.faddress);
	}else{
		var option = "<option value='0'>请选择</option>";
		var selectpro = "<select id='selectpro"+o.page_id+"' style='width: 150px;margin-right: 10px;' onchange='getArea(\"#selectpro"+o.page_id+"\",\"#selectcity"+o.page_id+"\","+o.page_id+")' >"+option+"</select>";
		var selectcity = "<select id='selectcity"+o.page_id+"' style='width: 150px;margin-right: 10px;' onchange='getAreaByPid(\"#selectcity"+o.page_id+"\",\"#selectreg"+o.page_id+"\","+o.page_id+")' >"+option+"</select>";
		var selectreg = "<select id='selectreg"+o.page_id+"' style='width: 150px;margin-right: 10px;' onchange='getAreaByPid(\"#selectreg"+o.page_id+"\",\"#selectown"+o.page_id+"\","+o.page_id+")' >"+option+"</select>";
		var selectown = "<select id='selectown"+o.page_id+"' style='width: 150px;margin-right: 10px;' onchange='changeAddress(\"#faddress"+o.page_id+"\")' >"+option+"</select>";
		
		$(o.revaddrtabeid).append($(selectpro))
						  .append($(selectcity))
						  .append($(selectreg))
						  .append($(selectown));
		initArea(o.page_id,oldvalue);// 初始区域
	}
};	

		
// 保存--收货信息
function saveRev(o) {
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var OldValue = getOldValue(o);
	var subRow = {};
	var frevname = $(o.frevname).val();
	var ftel = $(o.frevtel).val();
	var faddress = $(o.faddress).val();
	var fprovince = $("#selectpro"+o.page_id).find("option:selected").text();
	var fcity = $("#selectcity"+o.page_id).find("option:selected").text();
	var fregion = $("#selectreg"+o.page_id).find("option:selected").text();
	var ftown = $("#selectown"+o.page_id).find("option:selected").text();
	if(!isTelNum(ftel)){
		$.jbootmsg("请输入正确的手机号");	
		return;
	}
	if(frevname == "" || ftel == "" || fprovince == "请选择" || fcity == "请选择" 
		|| fregion == "请选择" || faddress == ""){
		$.jbootmsg("收货人信息不完整！", 'warning');
		return ;
	}
	if(ftown == "请选择" || ftown == undefined){
		ftown = "";
	}
	if(frevname != OldValue.fname){
		subRow["fname"] = frevname;
//		subRow["old-name"] = OldValue.fname;
	}
	if(ftel != OldValue.fmobile){
		subRow["fmobile"] = ftel; 
//		subRow["old-mobile"] = OldValue.fmobile; 
	}
	if(fprovince != OldValue.fprovince){
		subRow["fprovince"] = fprovince;
//		subRow["old-province"] = OldValue.fprovince; 
	}
	if(fcity != OldValue.fcity){
		subRow["fcity"] = fcity;
//		subRow["old-city"] = OldValue.fcity; 
	}
	
	if(fregion != OldValue.fregion){
		subRow["fregion"] = fregion;
//		subRow["old-region"] = OldValue.fregion; 
	}
	if(ftown != OldValue.ftown){
		subRow["ftown"] = ftown;
//		subRow["old-town"] = OldValue.ftown; 
	}
	if(faddress != OldValue.faddress){
		subRow["faddress"] = faddress;
//		subRow["old-address"] = OldValue.faddress; 
	}
	$.jbootloading("show");
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTSaveRev.do?";
	var flag = saveSubmit(url,params,orderdetailid);
	if(flag.result){
		$(o.frevname).val(frevname);
		$(o.frevtel).val(ftel);
		$(o.revprov).val(fprovince);
		$(o.revcity).val(fcity);
		$(o.revdist).val(fregion);
		$(o.revtown).val(ftown);
		$(o.revuserinfo).attr("revname",frevname);
		$(o.revuserinfo).attr("revtel",ftel);
		$(o.revuserinfo).attr("pro",fprovince);
		$(o.revuserinfo).attr("city",fcity);
		$(o.revuserinfo).attr("district",fregion);
		$(o.revuserinfo).attr("town",ftown);
		$(o.revuserinfo).attr("address",faddress);
		$(o.faddress).val(faddress);
		$("#selectpro"+o.page_id+" option:contains('"+fprovince+"')").attr("selected",true);
		$("#selectcity"+o.page_id+" option:contains('"+fcity+"')").attr("selected",true); 
		$("#selectreg"+o.page_id+" option:contains('"+fregion+"')").attr("selected",true); 
		$("#selectown"+o.page_id+" option:contains('"+ftown+"')").attr("selected",true);  					
		$(o.frevname).attr("readonly",true);
		$(o.frevtel).attr("readonly",true);
		$(o.revaddrtabeid).find("input").each(function() {
			$(this).attr("style","");
		});
		$(o.revaddrtabeid).find("select").each(function() {
			$(this).attr("style","display: none");
		});
		disRevBtn(o);//禁用
		$.jbootloading("hide");
		$.jbootmsg("保存成功！", 'info');
	}else{
		cancelRev(o);
		$.jbootloading("hide");
		$.jbootmsg("保存失败！", 'error');
	}
};	
	
// 取消-- 收货信息   正在使用
function cancelRev(o){
	disRevBtn(o);//禁用
	failOrCancelRev(o);
	$(o.frevname).attr("readonly",true);
	$(o.frevtel).attr("readonly",true);
	$(o.revaddrtabeid).find("input").each(function() {
		$(this).css("display","");
	});
	$(o.revaddrtabeid).find("select").each(function() {
		$(this).css("display","none");
	});
};	

// 初始化
function initArea(page_id,OldValue){
	var url = "managerorders/OTGetArea.do?";
		$.ajax({
			url : url, 
			type : 'post', 
			dataType : 'json', 
			async : false,
			data :"", 
			success : function(json) {
				if (json.result) {
					var areas = json.areas;
					 $.each(areas,function(n,value) {
						 var selectpro = "#selectpro"+page_id;
						 $(selectpro).append("<option value='"+value.fid+"' >"+value.fname+"</option>");
			    	});
					
					$("#selectpro"+page_id+" option:contains('"+OldValue.fprovince+"')").attr("selected",true);
					getAreaByPid("#selectpro"+ page_id,"#selectcity"+ page_id, OldValue.fcity);
					getAreaByPid("#selectcity"+ page_id,"#selectreg"+ page_id, OldValue.fregion);
					getAreaByPid("#selectreg"+ page_id,"#selectown"+ page_id, OldValue.ftown);

				} else {
					$.jbootmsg(json.msg, 'error');
				}
			}
		});
};		
		
// 省--变化onchange事件
function getArea(pvalue,childvalue,page_id){			
	setFirstSelect(page_id);
	getAreaByPid(pvalue,childvalue,"");
};		
		
// 设置select第一个“请选择”为选中状态
function setFirstSelect(page_id){
	$("#selectcity"+page_id).get(0).selectedIndex=0;
	$("#selectreg"+page_id).get(0).selectedIndex=0;
	$("#selectown"+page_id).get(0).selectedIndex=0;
	$("#selectcity"+page_id+" option").not(":first").remove();
	$("#selectreg"+page_id+" option").not(":first").remove();
	$("#selectown"+page_id+" option").not(":first").remove();
	var faddress = $("#selectown"+page_id).parent().parent().parent().next().find("td").find("input").attr("id");
	$("#"+faddress).val("");
//	$(o.faddress).val("");
};		
		
// 镇发生变化，详细地址为空
function changeAddress(childvalue){
	$(childvalue).val("");
};		
		
// 级联
function getAreaByPid(pvalue,childvalue,text){

	var pid = $(pvalue).val();
	var url = "managerorders/OTGetAreaByPid.do?";
	$.jbootloading("show");
		$.ajax({
			url : url+"&pid="+pid, 
			type : 'post', 
			dataType : 'json', 
			async : false,
			data :"", 
			success : function(json) {
				if (json.result) {
					$.jbootloading("hide");
					var areas = json.areas;
					 $.each(areas,function(n,value) {
			    		$(childvalue).append("<option value='"+value.fid+"' >"+value.fname+"</option>");
			    	});
					
					if(!(text == "") || !(text != undefined)){
						$(childvalue+" option:contains('"+text+"')").attr("selected",true);
					}
				} else {
					$.jbootloading("hide");
					$.jbootmsg(json.msg, 'error');
				}
			}
		});
};	
		
// 保存失败或取消--赋值
function failOrCancelRev(o){
	var OldValue = getOldValue(o);
	$(o.frevname).val(OldValue.fname);// 收货人姓名
	$(o.frevtel).val(OldValue.fmobile);// 电话
	$(o.revprov).val(OldValue.fprovince);// 省
	$(o.revcity).val(OldValue.fcity);// 市
	$(o.revdist).val(OldValue.fregion);// 县
	if(OldValue.ftown == "" || OldValue.ftown == "请选择"){
		OldValue.ftown = "";
	}
	$(o.revtown).val(OldValue.ftown);// 乡镇
	$(o.faddress).val(OldValue.faddress);// 详细地址
};		
		
		
//审核备注或特殊处理、收货信息 的提交   --正在使用
function saveSubmit(url,params,orderid){
	var flag = "";	
	var data="";
	$.jbootloading("show");
	$.ajax({
		url : url+"&editid="+orderid, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data : {
			jsonobj : params
		}, 
		success : function(json) {
			flag = json.result;
			data=json;
			$.jbootloading("hide");
			if(flag == "login"){
				window.location.href="user/login.jsp";
			}
		}
	});
	return data;
};

//审核备注或特殊处理、收货信息 的提交
function saveOrderSubmit(url,params,o){
	var flag = "";		
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID	
	$.jbootloading("show");
	$.ajax({
		url : url+"&editid="+orderdetailid, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data : {
			jsonobj : params
		}, 
		success : function(json) {
			$.jbootloading("hide");
			flag = json;
		}
	});
	return flag;
};

//查找订单
function queryOrderSubmit(url,o){
	var json = {};
	$.ajax({
		url : url, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data : '',
		success : function(data) {
			json = data;
		}
	});
	return json;
};

//编辑----配送方式
function editPay(o){
	enPayBtn(o);//启用
	var OldValue = getOldValue(o);
	$(o.fsendtypeid).find("option").each(function (i) {
        if ($(this).text() == OldValue.oldsenddiv) {
            $(this).removeAttr("selected");
        }
	});
};

//保存---配送方式
function savePay(o) {
	var OldValue = getOldValue(o);
	var subRow = {};
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID	
	var sendvalue = $(o.fsendtypeid).val();
	var sendtext = $(o.fsendtypeid).find("option:selected").text();
	if(OldValue.oldsend == sendvalue){
		cancelPay(o);
		$.jbootmsg("数据没有发生改变");
		return ;
	}
	subRow["fsendtypeid"] = sendvalue;
	subRow["newsend"] = sendtext;
	subRow["oldsend"] = OldValue.oldsenddiv;
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTSaveSend.do?code_table=tblWebRetail";
	
	var flag = saveSubmit(url,params,orderdetailid);
	$.jbootloading("show");
	if (flag.result) {
		$(o.send).val(sendvalue);
		$(o.senddiv).html(sendtext);
		$(o.fsendtypeid+" option:contains('"+sendtext+"')").attr("selected",true);
		disPayBtn(o);//禁用
		$.jbootloading("hide");
		$.jbootmsg("保存成功！", 'info');
	} else {
		cancelPay(o);
		$.jbootloading("hide");
		$.jbootmsg("保存失败！", 'error');
	}		
};

//取消--配送方式
function cancelPay(o){
	var oldvalue = getOldValue(o);
	$(o.send).val(oldvalue.oldsend);
	$(o.senddiv).html(oldvalue.oldsenddiv);
	$(o.fsendtypeid+" option:contains('"+oldvalue.oldsenddiv+"')").attr("selected",true);
	disPayBtn(o);//禁用
};	


//获取收货信息--old   --正在使用
function getOldValue(o){
	var OldValue = {};	
	var frevnameOld = $(o.revuserinfo).attr("revname");// 收货人姓名
	var ftelOld = $(o.revuserinfo).attr("revtel");// 电话
	var oldpro = $(o.revuserinfo).attr("pro");
	var oldcity = $(o.revuserinfo).attr("city");
	var olddist = $(o.revuserinfo).attr("district");
	var oldtown = $(o.revuserinfo).attr("town");
	var faddressOld = $(o.revuserinfo).attr("address");// 详细地址
	var fsellermemoOld = $(o.fsellermemo).attr("oldvalue");//订单特殊处理
	var oldsend = $(o.send).val();//支付方式-value
	var oldsenddiv = $(o.senddiv).html();//支付方式-text
	
	OldValue["fname"] = frevnameOld;
	OldValue["fmobile"] = ftelOld; 
	OldValue["fprovince"] = oldpro;
	OldValue["fcity"] = oldcity;
	OldValue["fregion"] = olddist;
	OldValue["ftown"] = oldtown;
	OldValue["faddress"] = faddressOld;
	OldValue["fsellermemo"] = fsellermemoOld;
	OldValue["oldsend"] = oldsend;
	OldValue["oldsenddiv"] = oldsenddiv;
	return OldValue;
};

//收货信息按钮禁用	
function disRevBtn(o){
	$(o.orderedit).removeClass("disabled");
	$(o.ordersave).addClass("disabled");
	$(o.ordercancel).addClass("disabled");
};
//收货信息按钮启用
function enRevBtn(o){
	$(o.orderedit).addClass("disabled");
	$(o.ordersave).removeClass("disabled");
	$(o.ordercancel).removeClass("disabled");
};

//特殊处理按钮禁用	--正在使用
function disSellMemoBtn(o){
	$(o.fsellermemo).attr("readonly","true");
	$(o.ordereditSellMemo).removeClass("disabled");
	$(o.ordersinput).addClass("disabled");
	$(o.ordercancelSellMemo).addClass("disabled");
};
//特殊处理按钮启用		
function enSellMemoBtn(o){
	$(o.ordereditSellMemo).addClass("disabled");
	$(o.ordersinput).removeClass("disabled");//保存
	$(o.ordercancelSellMemo).removeClass("disabled");//取消
	$(o.fsellermemo).removeAttr('readonly');//编辑框
};
//配送方式按钮启用		
function enPayBtn(o){
	$(o.ordereditpay).addClass("disabled");
	$(o.ordersavepay).removeClass("disabled");//保存
	$(o.ordercancelpay).removeClass("disabled");//取消
	$(o.senddiv).attr("style","display: none");
	$(o.fsendtypeid).attr("style","width: 150px;");
};
//配送方式按钮禁用
function disPayBtn(o){
	$(o.ordereditpay).removeClass("disabled");
	$(o.ordersavepay).addClass("disabled");
	$(o.ordercancelpay).addClass("disabled");
	$(o.senddiv).attr("style","display: block");
	$(o.fsendtypeid).attr("style","display:none");
};
//是否是数字
function isNum(num){
	var reg=/^(-?\d*)\.?\d{1,4}$/;
    return reg.test(num);
};
//是否是手机   --正在使用
function isTelNum(num){
	var reg=/^0?1[3|4|5|7|8][0-9]\d{8}$/;
    return reg.test(num);
};		