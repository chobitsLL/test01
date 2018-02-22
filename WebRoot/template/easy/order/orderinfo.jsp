<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>订单详情</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript"
	src="template/easy/j/order/jquery.serializejson.min.js"></script>
<!-- <script type="text/javascript" src="template/easy/j/order/jquery-orders.js"></script> -->
	
<style type="text/css">
	.label{
		display:inline-block;
		text-align: right; 
		width:80px
	}
	.easyinput{
		margin-left: 5px
	}
	.easy-input-line span{
		margin-right: 10px;
	}
	
	.editPrice {
	    color: red!important;
	}
</style>

<script type="text/javascript">



$(function (){
// 	$("#delorder").linkbutton("disable");
// 	$("#delorder").click(function (){
// 		if ($(this).linkbutton('options').disabled == false) {
// 			alert("delorder");
// 		}
// 	});

	var hiddenhidden = $("#hiddenhidden").val();
	if(hiddenhidden.indexOf("订单详情")<0){
		hiddeneidtbtn();
	}
	var fpaytype = $("#checkorder${page_id}").attr("paytype");
// 	var screenHeight = screen.height;
// 	$(".panel-body").css("min-height",screenHeight-350);
	//判断用户是否登录   如果未登录就跳转到登录页面
	var userid="${sessionScope.user.FID}";
    if(userid==""){
		$.messager.alert('温馨提示',"您还未登录，请您先登录后再操作","error");//user/login
	  	window.location.href="	user/login.jsp";		
	}
    var stocksData = ${stocks};
    var orderlogData = ${orderlog};
    $('#stocksTable').datagrid({
    	data: stocksData
    });
    $('#orderlogTable').datagrid({
    	data: orderlogData
    });
	var data = {
		page_id:"${page_id}",
		checkorder:"#checkorder${page_id}",//按钮
		payorder:"#payorder${page_id}",
		sendorder:"#sendorder${page_id}",
		revedorder:"#revedorder${page_id}",
//			returnorder:"#returnorder${page_id}",//退货
		delorder:"#delorder${page_id}",//作废
		uporder:"#uporder${page_id}",//上一单
		downorder:"#downorder${page_id}",//下一单
		orderdetailid:"#orderdetailid${page_id}",
		send:"#send${page_id}",//
		fsendtypeid:"#fsendtypeid${page_id}",//配送方式select
		pay:"#pay${page_id}",//
		fpaytype:"#fpaytype${page_id}",//付款方式
		disclass:".disclass${page_id}",
		disclassprice:".disclassprice${page_id}",
		revaddrtabeid:"#revaddrtabeid${page_id}",//收货信息--省市乡镇div
		//fsyncerp:"#fsyncerp${page_id}",
		
		frevname:"#frevname${page_id}",//收货人
		frevtel:"#frevtel${page_id}",//电话
		revuserinfo:"#revuserinfo${page_id}",//收货信息				
		revprov:"#revprov${page_id}",//省
		revcity:"#revcity${page_id}",//市
		revdist:"#revdist${page_id}",//乡
		revtown:"#revtown${page_id}",//镇			
		faddress:"#faddress${page_id}",//收货地址
		
		orderedit:"#orderedit${page_id}",//收货编辑按钮
		ordersave:"#ordersave${page_id}",//收货保存按钮
		ordercancel:"#ordercancel${page_id}",//收货取消编辑
		sign:"#sign${page_id}",//签收状态value
		fsigned:"#fsigned${page_id}",//签收文本
		fsellermemo:"#fsellermemo${page_id}",//卖家处理
		ordereditSellMemo:"#ordereditSellMemo${page_id}",//卖家处理编辑
		ordersinput:"#ordersinput${page_id}",//卖家处理保存
		ordercancelSellMemo:"#ordercancelSellMemo${page_id}",//卖家取消处理
		checktable:"#checktable${page_id}",//确认订单table
		checkmemo:"#checkmemo${page_id}",//确认订单（审核备注）
		
		ordereditpay:"#ordereditpay${page_id}",//配送方式编辑按钮
		ordersavepay:"#ordersavepay${page_id}",//配送方式保存
		ordercancelpay:"#ordercancelpay${page_id}",//配送方式取消
		senddiv:"#senddiv${page_id}",//选择配送方式
		paydiv:"#paydiv${page_id}",//支付方式div
		jifen:"#jifen${page_id}",//积分抵现
	};

	//按钮的判断$(data.orderdetailid).attr("storetype")==3
	var checkorder = $(data.checkorder).attr("value");
	var payorder = $(data.payorder).attr("value");
	var sendorder = $(data.sendorder).attr("value");
	var revedorder = $(data.revedorder).attr("value");
	var delorder = $(data.delorder).attr("ostate");
	var fusecssoft = $(data.orderdetailid).attr("fusecssoft");
	disbutton(data);
	
	if(delorder.indexOf("已取消") >=0 || delorder.indexOf("已作废") >= 0 || delorder.indexOf("已评价") >= 0 || delorder.indexOf("已完成") >= 0){
		$(".disclass${page_id}").attr("style","display: none");
		$(".disclassprice${page_id}").attr("style","display: none");
		hiddenbtn();
		hiddeneidtbtn();
	}else{
		if(delorder.indexOf("已拒绝") >=0 && checkorder == "3"){
// 			$(data.checkorder).removeAttr("disabled");
			$(data.checkorder).linkbutton({disabled: false});
			$(data.delorder).linkbutton({disabled: false});
			hiddeneidtbtn();
		}else 
		//0=未审核，1=审核通过，2=自动审核，3=拒绝
		if(checkorder == "0" && payorder == "0" && sendorder == "0" && revedorder == "0"){

// 			$(data.checkorder).removeAttr("disabled");
			$(data.checkorder).linkbutton({disabled: false});
		}else if(checkorder == "2" && payorder == "0" && sendorder == "0" && revedorder == "0"){//自动审核--未付款

			$(data.payorder).linkbutton({disabled: false});
		}else if(checkorder == "2" && payorder == "1" && sendorder == "0" && revedorder == "0"){//已付款、未发货

			$(".disclassprice${page_id}").attr("style","display: none");
			$(data.sendorder).linkbutton({disabled: false});
		}else if(checkorder == "2" && payorder == "1" && sendorder == "1" && revedorder == "0"){//已发货、未确认收货

			$(".disclass${page_id}").attr("style","display: none");
			$(".disclassprice${page_id}").attr("style","display: none");
			$(data.revedorder).linkbutton({disabled: false});
// 			$(data.returnorder).attr("disabled",false);
		}else if((checkorder == "1" || checkorder == "2") && payorder == "1" && sendorder == "1" && revedorder != "0"){//已确认收货

			$(".disclass${page_id}").attr("style","display: none");
			$(".disclassprice${page_id}").attr("style","display: none");
// 			$(data.returnorder).attr("disabled",false);
		}else if(checkorder == "1" && payorder == "0" && sendorder == "0" && revedorder == "0"){//已审核-货到付款--未付款、未发货

			$(data.checkorder).linkbutton({disabled: false});
			$(data.sendorder).linkbutton({disabled: false});
			$(data.delorder).linkbutton({disabled: false});
		}else if(checkorder == "1" && payorder == "0" && sendorder == "1" && revedorder == "0"){//已审核-货到付款--未付款、已发货、未确认收货

			$(".disclass${page_id}").attr("style","display: none");
			$(".disclassprice${page_id}").attr("style","display: none");
			$(data.revedorder).linkbutton({disabled: false});
// 			$(data.returnorder).attr("disabled",false);
		}else if(checkorder == "1" && payorder == "0" && sendorder == "1" && revedorder == "1"){//已发货、已确认收货

			$(".disclass${page_id}").attr("style","display: none");
			$(".disclassprice${page_id}").attr("style","display: none");
			$(data.payorder).linkbutton({disabled: false});
		}else if(fpaytype!=99){
// 			$(data.orderdetailid).addClass("disabled");
			$(data.orderdetailid).linkbutton({disabled: true});
		}

	}
	
	//easyui-linkbutton按钮绑定
	$(".buttonClass").click(function(){
		var v = $(this).attr("id");	
		if ($('#'+v).linkbutton('options').disabled == true) {
// 			alert("已被禁用!");
			return;
		}
		if(v == "checkorder${page_id}" ){
			checkOrder(data);//审核--确认订单
		}else if(v == "payorder${page_id}" ){
			payOrder(data);//是否付款	
		}else if(v == "sendorder${page_id}" ){
			sendOrder(data);//是否发货		
		}else if(v == "revedorder${page_id}" ){
			revedOrder(data);//是否收货		
		}else if(v == "returnorder${page_id}" ){
			returnOrder(data);// 退货
		}else if(v == "delorder${page_id}" ){
			cancelOrder(data);// 作废
		}else if(v == "uporder${page_id}" ){
			upOrder(data);// 上一单
		}else if(v == "downorder${page_id}" ){
			downOrder(data);// 下一单
		}else if(v == "print${page_id}"){
			printOrder();
		}
	});
	
	$(".bottomClass").click(function(){
		var v = $(this).attr("id");	
		var f = $(this).attr("class");
		if ($('#'+v).linkbutton('options').disabled == true) {
// 			alert("已被禁用!");
			return;
		}
		if(v == "orderedit${page_id}" ){
			enSellMemoBtn(data);//编辑--订单的特殊处理			
			editRev(data);//修改--收货信息	
			$(".editPrice").attr("onclick","editPriceSel(this)");
			//有优惠--单件不可编辑
			var jifenfee = $("#jifenfee").html();
			if(parseFloat(jifenfee)>0){
				$(".editPrice:first").removeAttr("onclick","editPriceSel(this)");
			}
			var salefee = $("#salefee").html();
			if(parseFloat(salefee)>0){
				$(".editPrice:first").removeAttr("onclick","editPriceSel(this)");
			}
			var cardfee = $("#cardfee").html();
			if(parseFloat(cardfee)>0){
				$(".editPrice:first").removeAttr("onclick","editPriceSel(this)");
			}
		}else if(v == "ordersave${page_id}" ){	
			disRevBtn(data);//禁用
			saveOrder(data);// 保存--订单的特殊处理
		}else if(v == "ordercancel${page_id}" ){
			cancelSellMemo(data);//取消--特殊处理	
			cancelRev(data);// 取消-- 收货信息
			canclePriceSel();
			$(".editPrice").attr("onclick","canclePriceSel(this)");
		}
	});
	
	var unit = ${sessionScope.is_b_a_unit==true};//企业管理员
	var server = ${sessionScope.is_b_server==true};//店小二
	var store = ${sessionScope.is_b_m_store==true};//店长2-门店店长
	var link = ${sessionScope.is_b_a_link==true};//管理员1-联销商--店长
	var custom = ${sessionScope.is_b_a_custom==true};//管理员1-加盟商--店长
	var employee = ${sessionScope.is_b_m_employee==true};//店长2-员工微铺
	var b_m_station = ${sessionScope.is_b_m_station==true}; //店长2-服务站
	var b_station =${sessionScope.is_b_station==true};//站长--服务人员 
	if(unit && $(data.orderdetailid).attr("storetype")==3){//加盟商
		hiddeneidtbtn();
		hiddenbtn();
	}
	if($(data.orderdetailid).attr("returnstate")!=0){//订单在申请退换货
		hiddeneidtbtn();
		hiddenbtn();
	}
	if($(data.orderdetailid).attr("storetype")==2){//员工店铺
		if(!unit){
			hiddenbtn();
			hiddeneidtbtn();
		}
	}
	if(!unit && b_station){
		hiddenbtn();
		hiddeneidtbtn();
	}
	
});
//禁用按钮
function disbutton(data){
	//禁用按钮
	$(data.checkorder).linkbutton({disabled:true});//确认订单审核
	$(data.payorder).linkbutton({disabled:true});//付款
	$(data.sendorder).linkbutton({disabled:true});//发货
	$(data.revedorder).linkbutton({disabled:true});//确认收货
// 	$(data.returnorder).linkbutton({disabled:true});//退货
	$(data.delorder).linkbutton({disabled:true});//作废
	
	$(data.revprov).combobox('readonly', true);
	$(data.revcity).combobox('readonly', true);
	$(data.revdist).combobox('readonly', true);
	$(data.revtown).combobox('readonly', true);
}
//隐藏按钮
function hiddenbtn(){
// 	$("#bottomButton").each(function(){
// 		$(this).addClass("hidden");
// 	});
	$("#bottomButton").hide();
}

//禁用按钮，隐藏编辑
function hiddeneidtbtn(){
// 	$("#easy-tool").each(function(){
// 		$(this).addClass("hidden");
// 	});
	$(".buttonClass").hide();
	
}
//edit-imgbutton按钮绑定---价格编辑  --正在使用
function editPriceSel(obj){
	var imgid = $(obj).attr("id");	
	var subid = $(obj).parent().next().find("input").attr("subid");
	if(imgid == "pricedivValue${page_id}"+subid){
//			var param = priceparams($(obj));
		priceEidtSelf(subid);//价格编辑   //正在使用
	}
	if(imgid == "senddivValue${page_id}"+subid){
		detailSendEditSelf(subid);   //正在使用
	}
	/*else if(imgid == "sendAtEidt${page_id}"){
//			var param = sendparams($(obj));
		sendAtEidtSelf(subid);//运费编辑   
	}*/
};
//取消-- 收货信息   正在使用
function cancelRev(o){
	disRevBtn(o);//禁用
	failOrCancelRev(o);
};
//保存失败或取消--赋值
function failOrCancelRev(o){
	var OldValue = getOldValue(o);
	$(o.frevname).textbox('setValue',OldValue.fname);// 收货人姓名
	$(o.frevtel).textbox('setValue',OldValue.fmobile);// 电话
	$(o.revprov).combobox('setValue',OldValue.fprovince);// 省
	$(o.revcity).combobox('setValue',OldValue.fcity);// 市
	$(o.revdist).combobox('setValue',OldValue.fregion);// 县
	if(OldValue.ftown == "" || OldValue.ftown == "请选择"){
		OldValue.ftown = "";
	}
	$(o.revtown).combobox('setValue',OldValue.ftown);// 乡镇
	$(o.faddress).textbox('setValue',OldValue.faddress);// 详细地址
	$(o.fsellermemo).textbox('setValue',OldValue.fsellermemo);// 详细地址
	
	$(o.fsellermemo).textbox('readonly', true);//编辑框
	$(o.frevname).textbox('readonly', true);
	$(o.frevtel).textbox('readonly', true);
	$(o.faddress).textbox('readonly', true);
	$(o.revprov).combobox('readonly', true);
	$(o.revcity).combobox('readonly', true);
	$(o.revdist).combobox('readonly', true);
	$(o.revtown).combobox('readonly', true);
};
//订单商品价格编辑  --正在使用
function priceEidtSelf(subid){
	$("#pricediv${page_id}"+subid).css("display","none");
	$("input[id*='oprice${page_id}"+subid+"']").css("display","block");
	$("div[id*='hidepricediv${page_id}']").css("display","block");
};
//商品运费编辑 --正在使用
function detailSendEditSelf(subid){
	$("#senddiv${page_id}"+subid).css("display","none");
	$("input[id*='sprice${page_id}"+subid+"']").css("display","block");
	$("div[id*='hidesenddiv${page_id}']").css("display","block");
};

//保存订单信息   --正在使用
function saveOrder(o) {
	$(o.frevname).textbox('readonly', true);
	$(o.frevtel).textbox('readonly', true);
	$(o.faddress).textbox('readonly', true);
	$(o.revprov).combobox('readonly', true);
	$(o.revcity).combobox('readonly', true);
	$(o.revdist).combobox('readonly', true);
	$(o.revtown).combobox('readonly', true);
	
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var OldValue = getOldValue(o);//收货
	var subRow = {};
	var frevname = $(o.frevname).val();
	var ftel = $(o.frevtel).val();
	var faddress = $(o.faddress).val();
	var fprovince = $("#revprov"+o.page_id).combobox('getText');
	var fcity = $("#revcity"+o.page_id).combobox('getText');
	var fregion = $("#revdist"+o.page_id).combobox('getText');
	var ftown = $("#revtown"+o.page_id).combobox('getText');
	if(!isTelNum(ftel)){
		$.messager.alert('温馨提示',"请输入正确的手机号");
		return;
	}
	if(frevname == "" || ftel == "" || fprovince == "请选择" || fcity == "请选择" 
		|| fregion == "请选择" || faddress == ""){
		$.messager.alert('温馨提示',"收货人信息不完整！", 'warning');
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
	var params = JSON.stringify(subRow);
	var url = "managerorders/OTSaveRev.do?";  //保存收货人信息
	var flag = true;
	
	$.messager.progress({text : "正在处理，请稍候..."});

	flag = saveSubmit(url,params,orderdetailid);
	$(".editPrice").attr("onclick","canclePriceSel(this)");
	getPrices(o);
	console.log("1------------"+JSON.stringify(subRow));
	
	if(flag){
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
// 		$("#selectpro"+o.page_id+" option:contains('"+fprovince+"')").attr("selected",true);
// 		$("#selectcity"+o.page_id+" option:contains('"+fcity+"')").attr("selected",true); 
// 		$("#selectreg"+o.page_id+" option:contains('"+fregion+"')").attr("selected",true); 
// 		$("#selectown"+o.page_id+" option:contains('"+ftown+"')").attr("selected",true);  					
		$(o.frevname).attr("readonly",true);
		$(o.frevtel).attr("readonly",true);
		$(o.revaddrtabeid).find("input").each(function() {
			$(this).css("display","");
		});
		$(o.revaddrtabeid).find("select").each(function() {
			$(this).css("display","none");
		});
		disRevBtn(o);//禁用
// 		$.jbootloading("hide");
		var subRow = {};
		var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
		var value = $(o.fsellermemo).val();
		subRow["sellmemo"] = value;
		var params = JSON.stringify(subRow);
		var url = "managerorders/OTSaveSellMemo.do?";
		var flag = false;
		flag = saveSubmit(url,params,orderdetailid);
		$.messager.progress('close');

		if (flag) {
			$(o.fsellermemo).attr("oldvalue",value);
// 			disSellMemoBtn(o);//禁用
			$.messager.alert('温馨提示',"保存成功！", 'info');
			location.href=location.href;
		} else {
// 			cancelSellMemo(o);
			$.messager.alert('温馨提示',"保存失败！", 'error');
		}
	}else{
		cancelRev(o);
		$.messager.progress('close');

		$.messager.alert('温馨提示',"保存失败！", 'error');
	}
}
//修改--收货信息
function editRev(o) {
	enRevBtn(o);//启用
// 	var oldvalue = getOldValue(o);
	
	var url = "managerorders/OTGetArea.do";
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : url, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data :"", 
		success : function(json) {
			$.messager.progress('close');
			if (json.result) {
				var areas = json.areas;
				$(o.revprov).combobox({
					data:areas,
			        valueField:'fid',
			        textField:'fname',
			        readonly:false,
			        onSelect: function(param){
			        	getRevcity(param.fid,1);
			    	},
					onLoadSuccess: function(param){
						var r = $(this).combobox('getValue'); 
						var pid = '';
						for(var i=0;i<param.length;i++){
							if(param[i].fname == r){
								getRevcity(param[i].fid,0);
								break;
							}
						}
			    	}
			     });
			}
		}
	});
	
	$(o.frevname).textbox('readonly', false);
	$(o.frevtel).textbox('readonly', false);
	$(o.faddress).textbox('readonly', false);
	$(o.revprov).combobox('readonly', false);
	$(o.revcity).combobox('readonly', false);
	$(o.revdist).combobox('readonly', false);
	$(o.revtown).combobox('readonly', false);
}

function getRevcity(pid, on){
	var pid = pid;
	var url = "managerorders/OTGetAreaByPid.do?";
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : url+"pid="+pid, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data :"", 
		success : function(json) {
			$.messager.progress('close');
			if (json.result) {
				var areas = json.areas;
				$("#"+"revcity${page_id}").combobox({
					data:areas,
			        valueField:'fid',
			        textField:'fname',
			        readonly:false,
			        onSelect: function(param){
			        	getRevdist(param.fid,1);
			    	},
			    	onLoadSuccess: function(param){
			    		if(param.length==0){
			    			return;
			    		}
			    		var r = $(this).combobox('getValue'); 
			    		if(on==1){
			    			$(this).combobox('select',param[0].fid); 
			    		}else{
			    			for(var i=0;i<param.length;i++){
								if(param[i].fname == r){
// 									$(this).combobox('select',param[i].fid); 
									pid = param[i].fid;
									getRevdist(pid,0);
									break;
								}
							}
			    		}
			    	}
			     });
			}
		}
	});
	return pid;
}
function getRevdist(pid, on){
	var pid = pid;
	var url = "managerorders/OTGetAreaByPid.do?";
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : url+"&pid="+pid, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data :"", 
		success : function(json) {
			$.messager.progress('close');
			if (json.result) {
				var areas = json.areas;
				$("#"+"revdist${page_id}").combobox({
					data:areas,
			        valueField:'fid',
			        textField:'fname',
			        readonly:false,
			        onSelect: function(param){
			        	getRevtown(param.fid,1)
			    	},
			    	onLoadSuccess: function(param){
			    		if(param.length==0){
			    			return;
			    		}
			    		var r = $(this).combobox('getValue'); 
			    		if(on==1){
			    			$(this).combobox('select',param[0].fid); 
			    		}else{
							for(var i=0;i<param.length;i++){
								if(param[i].fname == r){
// 									$(this).combobox('select',param[i].fid); 
									pid = param[i].fid;
									getRevtown(pid,0);
									break;
								}
							}
			    		}
			    	}
			     });
			}
		}
	});
	return pid;
}
function getRevtown(pid, on){
	var pid = pid;
	var url = "managerorders/OTGetAreaByPid.do?";
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : url+"&pid="+pid, 
		type : 'post', 
		dataType : 'json', 
		async : false,
		data :"", 
		success : function(json) {
			$.messager.progress('close');
			if (json.result) {
				var areas = json.areas;
				$("#"+"revtown${page_id}").combobox({
					data:areas,
			        valueField:'fid',
			        textField:'fname',
			        readonly:false,
			    	onLoadSuccess: function(param){
			    		if(param.length==0){
			    			return;
			    		}
			    		var r = $(this).combobox('getValue');
			    		if(on==1){
			    			$(this).combobox('select',param[0].fid); 
			    		}else{
			    			for(var i=0;i<param.length;i++){
								if(param[i].fname == r){
									$(this).combobox('select',param[i].fid); 
									pid = param[i].fid;
								}
							}
			    		}
			    	}
			     });
			}
		}
	});
	
	return pid;
}
//获取所有可编辑的商品单价及运费金额
function getPrices(o){
	//商品价格修改
//		var diffsend = 0;
	var subRow = {};
	var sendPrice = 0.00;
//		var newOrderTtAt = 0.00;
	$("input[id*='oprice${page_id}']").each(function(n,value){
		var subid = $(this).attr("subid");
		var oldprice = parseFloat($(this).parent().prev().find("a").attr("oldprice"));
		var newprice = parseFloat($(this).val());
		var oldsendprice = parseFloat($(this).parents("td").next().find("div").find('a').attr('oldSend'));
		var newsendprice = parseFloat($(this).parents("td").next().find("div").find('input').val());
		var onamesub = $(this).parents("td").prev().prev().find("div").text();
		subRow["substockid"] = subid;
		subRow["newprice"] = newprice;
		subRow["oldprice"] = oldprice;
		subRow["newsend"] = newsendprice;
		subRow["onamesub"] = onamesub;
		subRow["oldsend"] = oldsendprice;
		var params = JSON.stringify(subRow);
		var url = "managerorders/OTSaveStockOrderPrice.do?";
		var flag = true;
		flag = saveSubmit(url,params,'${orderdetailid }');
		if(!flag){
			priceCancel(o);
		}
	})
}
//审核备注或特殊处理、收货信息 的提交   --正在使用
function saveSubmit(url,params,orderid){
	var flag = "";	
	var data="";
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
			if(flag == "login"){
				window.location.href="user/login.jsp";
			}
		}
	});
	return data;
};
//订单商品价格编辑取消
function priceCancel(o){
	var old = $("#"+o.pricediv).html();
	$("#"+o.oprice).val(old);
	$("#"+o.pricediv).attr("style","display: block");
	$("#"+o.hidepricediv).attr("style","display: none");
};
//特殊处理按钮启用		
function enSellMemoBtn(o){
	$(o.ordereditSellMemo).linkbutton("disable");
	$(o.ordersinput).linkbutton({disabled: false});//保存
	$(o.ordercancelSellMemo).linkbutton({disabled: false});//取消
	$(o.fsellermemo).textbox('readonly', false);//编辑框
};
//收货信息按钮启用
function enRevBtn(o){
	$(o.orderedit).linkbutton({disabled: true});
	$(o.ordersave).linkbutton({disabled: false});
	$(o.ordercancel).linkbutton({disabled: false});
};
//收货信息按钮禁用	
function disRevBtn(o){
	$(o.orderedit).linkbutton({disabled: false});
	$(o.ordersave).linkbutton({disabled: true});
	$(o.ordercancel).linkbutton({disabled: true});
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
//取消--卖家备注    --正在使用
function cancelSellMemo(o){

	var oldvalue = getOldValue(o);
	$(o.fsellermemo).val(oldvalue.fsellermemo);
	$(o.fsellermemo).textbox('readonly', true);//编辑框
};	
//取消价格编辑  --正在使用
function canclePriceSel(){
	$("input[id*='oprice${page_id}']").css("display","none");
	$("div[id*='pricediv${page_id}']").css("display","block");
	$("input[id*='sprice${page_id}']").css("display","none");
	$("div[id*='senddiv${page_id}']").css("display","block");
	/* $("input[id*='osendprice${page_id}']").css("display","none");
	$("div[id*='sendpricediv${page_id}']").css("display","block"); */
	$("input[id*='oprice${page_id}']").each(function(){
		var oldPrice = $(this).parent().prev().find("a").attr("oldPrice");
		$(this).val(oldPrice);
	})
	$("input[id*='sprice${page_id}']").each(function(){
		var oldPrice = $(this).parent().prev().find("a").attr("oldSend");
		$(this).val(oldPrice);
	})
	/* var oldPrice = $("input[id*='osendprice${page_id}']").parent().prev().find("a").attr("oldPrice");
	$("input[id*='osendprice${page_id}']").val(oldPrice); */
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
//编辑表单数据/////////////////////////////////////////////////////////////////////////////////////////
function formatStockname(val,row){
	var name = '';
	if(row.fwebretaildetailid>0){
		name = val + '<span style="color: red;">(赠品)</span>';
	}else if(row.fwebretaildetailid==0){
		name = val;
	}
	return name;
}
function formatStockprice(val,row){
	if(val!=""&&val!=undefined){
		val = val.toFixed(2)
	}
	return val;
}
function formatPrice(fprice,row){
	var stoppedname = '';
	var thm = "";
	thm+= "<div id='pricediv${page_id}"+ row.fsubstockid +"'>";
	thm+= "<a class='editPrice' href='javascript:;' id='pricedivValue"+${page_id} + row.fsubstockid +"'";
	thm+= "style='float: center;' oldPrice='"+ row.fprice +"'>"+fprice.toFixed(2)+"</a></div>";
	thm+= "<div style='display: block' id='hidepricediv"+${page_id} + row.fsubstockid+"'>";
	thm+= "<input type='text' style='float: left; width: 75px;display: none;text-align: center' subid='"+row.fsubstockid +"' "; 
	thm+= "value='"+fprice+"' id='oprice"+${page_id} + row.fsubstockid +"'>";
	thm+= "</div>";
	return thm;
}
function formatSendamount(fsendamount,row){
	var htm = "";
	htm+= "<div id='senddiv${page_id}"+row.fsubstockid  +"'>";
	htm+= "<a class='editPrice' href='javascript:;' id='senddivValue${page_id}"+row.fsubstockid +"' ";
	htm+= "style='float: center;' oldSend='"+row.fsendamount +"'>"+fsendamount.toFixed(2) +"</a></div>";
	htm+= "<div style='display: block' id='hidesenddiv${page_id}"+row.fsubstockid +"'>";
	htm+= "<input type='text' style='float: left; width: 75px;display: none;text-align: center' subid='"+row.fsubstockid +"' value='"+fsendamount.toFixed(2) +"' id='sprice${page_id}"+row.fsubstockid +"'> ";
	htm+= "</div>";
	return htm;
}
function formatQuanty(val,row){
	return val.toFixed(2);
}
function formatEncashscore(val,row){
	return val.toFixed(2);
}
function formatScoretoamount(val,row){
	return "-"+val.toFixed(2);
}
function formatStockamount(val,row){
	return "￥"+val.toFixed(2);
}


</script>


</head>
<body>
	<input type="hidden" id="hiddenhidden" value='${sessionScope.role501.ffunction}'>
	<input type="hidden" value="${orderdetailid }" id="orderdetailid${page_id}" 
		storetype="${storetype }"  fusecssoft = "${fusecssoft}" returnstate="${orderInfo.freturnstate }" checkmemo="${orderInfo.fcheckmemo }">
	<input type="hidden" id="revuserinfo${page_id}" revname="${userRev.freceiver }" revtel="${userRev.frevtel }" pro="${userRev.frevprov }" 
		city="${userRev.frevcity }" district="${userRev.frevdistrict }" town="${userRev.frevtown }" address="${userRev.frevaddress }">
	<input id="statevalue" type="hidden" check="${orderInfo.fchecked }" payed="${orderInfo.fpayed }" send="${orderInfo.fsended } " 
		reved="${orderInfo.freved }" state="${orderInfo.fstate }" preid="${preid }" preno="${preno }" nextid="${nextid }" nextno="${nextno }" />
					
	<!-- 内容  -->
	<div class="easyui-layout" data-options="fit:true">
		<div style="overflow:auto; width: auto; height: auto;">
			<div data-options="region:'center',border:false,iconCls:'icon-ok'" 
				style="height: 30px;background: #f4f4f4 none repeat scroll 0 0;">
				<div id="easy-tool" >
					<span class="easyui-linkbutton buttonClass" id="delorder${page_id}"  
						ostate="${orderInfo.fstate }" fno="${orderInfo.fno}" 
						data-options="iconCls:'icon-add',plain:true">取消订单</span> 
					<span class="easyui-linkbutton buttonClass" id="checkorder${page_id}"
						value="${orderInfo.fchecked }" paytype ="${orderInfo.fpaytype }" fno="${orderInfo.fno}"
						data-options="iconCls:'icon-edit',plain:true">审核</span> 
					<span class="easyui-linkbutton buttonClass" id="sendorder${page_id}" 
						value="${orderInfo.fsended }" fno="${orderInfo.fno}"
						data-options="iconCls:'icon-edit',plain:true">发货</span> 
					<span class="easyui-linkbutton buttonClass" id="revedorder${page_id}" 
						value="${orderInfo.freved }" fno="${orderInfo.fno}"
						data-options="iconCls:'icon-edit',plain:true">确认收货</span> 
					<span class="easyui-linkbutton buttonClass" id="payorder${page_id}" 
						value="${orderInfo.fpayed }" fpaytype ="${orderInfo.fpaytype }" fno="${orderInfo.fno}"
						data-options="iconCls:'icon-undo',plain:true">收款</span> 
					<span class="easyui-linkbutton buttonClass" id="print${page_id}" 
						data-options="iconCls:'icon-remove',plain:true">打印订单</span> 
				</div>
			</div>
			<div style="">
				<div class="easyui-tabs" style="width: 1087px; height: 435px; margin: 0 -1px;">
					<div title="基本信息" style="padding:10px">
						<div class="r-title r-white" style="margin: 15px!important;">
							<font class="r-title-ch" style="font-size: 14px!important;">收货人信息</font>
						</div>
						<div style="border-bottom: 1px solid #95b8e7;padding-left: 80px!important;">
							
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">姓名：</label>
								<input  class="easyui-textbox" width=230px data-options="readonly:true" value="${userRev.freceiver }" id="frevname${page_id}"/>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">电话：</label>
								<input  class="easyui-textbox" width=230px data-options="readonly:true" value="${userRev.frevtel }" name="FURL" id="frevtel${page_id}"/>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">收货地区：</label>
								<input class="easyui-combobox" width=230px data-options="" id="revprov${page_id}" value="${userRev.frevprov }"/>
								<input class="easyui-combobox easyinput" width=230px data-options="" id="revcity${page_id}" value="${userRev.frevcity }"/>
								<input class="easyui-combobox easyinput" width=230px data-options="" id="revdist${page_id}" value="${userRev.frevdistrict }"/>
								<input class="easyui-combobox easyinput" width=230px data-options="" id="revtown${page_id}" value="${userRev.frevtown }"/>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">收货地址：</label>
								<input  class="easyui-textbox" width=230px data-options="readonly:true" value="${userRev.frevaddress }" name="FURL" id="faddress${page_id}"/>
							</div>
						</div>
						<div class="r-title r-white" style="margin: 15px!important;">
							<font class="r-title-ch" style="font-size: 14px!important;">订单信息</font>
						</div>
						<div style="border-bottom: 1px solid #95b8e7;padding-left: 80px!important;">
							
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">订单编号：</label>
								<label style="">${orderInfo.fno}</label>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">订单状态：</label>
								<label style="">${orderInfo.fstate}</label>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">配送方式：</label>
								<label style="">
									<c:if test="${orderInfo.fservicetype==0}">商城快递</c:if>
									<c:if test="${orderInfo.fservicetype==1}">顾客自提</c:if>
								</label>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">支付方式：</label>
								<label style="">
									<c:if test="${orderInfo.fpaytype==0}">线上付款</c:if>
									<c:if test="${orderInfo.fpaytype==1}">银联PC端支付</c:if>
									<c:if test="${orderInfo.fpaytype==2}">支付宝PC端支付</c:if>
									<c:if test="${orderInfo.fpaytype==3}">微信支付</c:if>
									<c:if test="${orderInfo.fpaytype==6}">支付宝手机端支付</c:if>
									<c:if test="${orderInfo.fpaytype==7}">银联手机端支付</c:if>
									<c:if test="${orderInfo.fpaytype==99}">货到付款</c:if>
								</label>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">发票抬头：</label>
								<label style="">${orderInfo.finvoicetitle}</label>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">发票内容：</label>
								<label style="">${orderInfo.finvoicecont}</label>
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">买家留言：</label>
								<input class="easyui-textbox" style="width:720px" data-options="readonly:true" value="${orderInfo.fbuyermomo}" id="buymemo${page_id}" />
							</div>
							<div class="easy-input-line" style="margin-bottom: 15px;">
								<label class="label" style="">卖家留言：</label>
								<input class="easyui-textbox" style="width:720px" data-options="readonly:true" oldvalue="${orderInfo.fsellermemo}" value="${orderInfo.fsellermemo}" id="fsellermemo${page_id}" />
							</div>
						</div>
						<div class="r-title r-white" style="margin: 15px!important;">
								<font class="r-title-ch" style="font-size: 14px!important;">商品信息</font>
						</div>
						<div style="border-bottom: 1px solid #95b8e7;padding-left: 80px!important;">
							<div style="margin-bottom: 15px;">
								<table id="stocksTable" class="easyui-datagrid" style="width:900px;min-height:100px"
										data-options="singleSelect:true,collapsible:true,fitColumns:true,nowrap: false">
									<thead>
										<tr>
											<th data-options="field:'fstockcode',width: 100 ,align:'center'">货号</th>
											<th data-options="field:'fstockname',width: 450 ,align:'center',formatter: formatStockname">订单商品</th>
											<th data-options="field:'fstockprice',width: 60 ,align:'center',formatter: formatStockprice">原价</th>
											<th data-options="field:'fprice',width: 60 ,align:'center',formatter: formatPrice">单价</th>
											<th data-options="field:'fsendamount',width: 60 ,align:'center',formatter: formatSendamount">运费</th>
											<th data-options="field:'fquanty',width: 60 ,align:'center',formatter: formatQuanty">购买数</th>
											<th data-options="field:'fencashscore',width: 60 ,align:'center',formatter: formatEncashscore">使用积分</th>
											<th data-options="field:'fscoretoamount',width: 60 ,align:'center',formatter: formatScoretoamount">积分抵扣</th>
											<th data-options="field:'fstockamount',width: 80 ,align:'center',formatter: formatStockamount">金额小计</th>
										</tr>
									</thead>
								</table>
								<div style="text-align: right;padding: 10px 70px 10px 0;font-size: 12px;"><!-- <订单金额信息> -->
								<div id="sendordero${page_id}" style="height: 30px; line-height: 30px;">
								<div style="height: 30px; line-height: 30px; width: 140px; float: right;">
								<span style="float: left;">运费金额：</span>+&yen;<span>${orderInfo.fsendamount}</span></div></div>
								<div id="jifen${page_id}" style="height: 30px; line-height: 30px;">
								<div style="height: 30px; line-height: 30px; width: 140px; float: right;">
								<span style="float: left;">积分抵扣：</span>-&yen;<span id="jifenfee" class="jifen" price='${orderInfo.fscoretoamount}'>${orderInfo.fscoretoamount}</span></div></div>
								<div id="saleordero${page_id}" style="height: 30px; line-height: 30px;">
								<div style="height: 30px; line-height: 30px; width: 140px; float: right;">
								<span style="float: left;">优惠金额：</span>-&yen;<span id="salefee">${orderInfo.fexchangemoney}</span></div></div>
								<div id="cardordero${page_id}" style="height: 30px; line-height: 30px;">
								<div style="height: 30px; line-height: 30px; width: 140px; float: right;">
								<span style="float: left;">卡券优惠：</span>-&yen;<span id="cardfee">${orderInfo.fcardcodemoney}</span></div></div>	
								<div id="totalordero${page_id}" style="height: 30px; line-height: 30px;">
								<div style="height: 30px; line-height: 30px; width: 140px; float: right;">
								<span style="float: left;">应付款总计：</span>&yen;<span oldValue='${orderInfo.ftotalamount}'>${orderInfo.ftotalamount}</span></div></div>
							</div>
							</div>
							
						</div>
						<div id="bottomButton" style="padding-top:20px;text-align: right;padding-right: 60px;margin-bottom: 10px;">
							<a href="#" id="orderedit${page_id}" class="easyui-linkbutton bottomClass" data-options="width:60">编辑</a>
							<span style="margin: 5px"></span>
							<a href="#" id="ordersave${page_id}" class="easyui-linkbutton bottomClass" data-options="width:60,disabled: true">保存</a>
							<span style="margin: 5px"></span>
							<a href="#" id="ordercancel${page_id}" class="easyui-linkbutton bottomClass" data-options="width:60,disabled: true">取消</a>
							
						</div>
					</div>
					<div title="订单日志" style="padding:10px">
						<div style="margin-bottom: 15px;">
							<table id="orderlogTable" class="easyui-datagrid" style="width:auto;min-height:100px"
									data-options="singleSelect:true,collapsible:true,fitColumns:true,nowrap: false">
								<thead>
									<tr>
										<th data-options="field:'orderlogid',width:1,align:'center'">序号</th>
										<th data-options="field:'opertime',width:2,align:'center'">时间</th>
										<th data-options="field:'opername',width:1,align:'center'">操作人</th>
										<th data-options="field:'opercont',width:10,align:'center'">操作内容</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
			</div>
			
		</div>
		<%-- 审核弹窗 --%>
		<div id="audit" class="easyui-dialog" data-options="modal:true, closed:true"
			style="width: 300px; min-height: 34px;">
			<div class="messager-body panel-body panel-body-noborder"
				title="" style="">
				<div class="messager-icon messager-question"></div>
				<div>审核意见</div>
				<br>
				<div style="clear: both;"></div>
				<div>
					<input class="messager-input" id="deallogmemo" type="text">
				</div>
			</div>
		</div>
	</div>
<script type="text/javascript">
//是否作废
function cancelOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.checkorder).attr("fno");
	if(fsyncerp>0){
		$.messager.alert('温馨提示',"定单【"+fno+"】请在ERP中执行本操作！");
		return false;
	}
	var pay = $(o.pay).val();
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	var sendorder = $(o.sendorder).attr("value");
	if(pay == 99 && sendorder == 0){
		var url = "managerorders/OTCancelOrderBtn.do?";
		$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r) {
			if (r) {
// 				$.jbootloading("show");
				var flag = saveSubmit(url,"",orderdetailid);
				if(flag.result){
					$(o.delorder).addClass("disabled");
					$(o.delorder).attr("value","已作废");
// 					$.jbootloading("hide");
					$.messager.alert('温馨提示',"操作成功！", 'info');
				}else{
// 					$.jbootloading("hide");
					$.messager.alert('温馨提示',"操作失败，该订单未被删除！", 'error');
				}
			}
				
		});
	}else if(pay == 99 && sendorder == 1){
		$.messager.alert('温馨提示',"此订单已发货，不可作废！", 'info');
	}else{
		$.messager.alert('温馨提示',"此订单不可作废！", 'info');
	}
	
	
};
//审核--确认订单
function checkOrder(o){
	var checkorder = $(o.checkorder).attr("value");
	if(checkorder != "0"){
		$("#deallogmemo").attr("disabled","disabled");
		
		$('#audit').dialog({
			title:"审核订单",
			closed:false,
		});
		return;
	}
	var obj = o.orderdetailid;
	var pageid = o.page_id;
	$('#audit').dialog({
		title:"审核订单",
		closed:false,
		buttons:[{
			text:'通过',
			width:60,
			handler:function(){
				var subRow = {};
				var orderdetailid = $(obj).val();
				var deallogmemo = $("#deallogmemo").val();
				var fpaytype=$("#checkorder"+pageid).attr("paytype");
				var fsended=$("#sendorder"+pageid).attr("value");
				var fchecked=$("#checkorder"+pageid).attr("value");
				subRow["fpaytype"]=fpaytype; 
				subRow["fsended"]=fsended;
				subRow["fchecked"]=fchecked;
				subRow["checkmemo"] = deallogmemo;
				var params={
		    		jsonobj:JSON.stringify(subRow)
				};
				$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r) {
					if (r) {
						$.messager.progress({text : "正在处理，请稍候..."});
		    	$.ajax({
		    		type:"POST",
		    		url:"managerorders/OTSaveCheckMemo.do?editid="+orderdetailid,
		    		dataTyp:"JSON",
		    		data: params,
		    		success:function(data){
		    			$.messager.progress('close');
		    			if (data.result==true||data.result=="true") {
		    			 	$('#audit').dialog({
	    						closed:true,
	    					});
							$.messager.alert('温馨提示',"审核成功，等待发货！","info");
							window.location.reload();
		 				}else if(data.result=="login"){
		 					window.location.href=$("base").attr("href")+"user/getLoginAD.do";
		 				}else{
							$.messager.alert('温馨提示',data.msg,"error");
						}
		    		},error:function(){
		 				$.messager.alert('温馨提示',"请求出错!","error");
		 			}
		    	 })
					}});
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
				
		    	var subRow = {};
		    	var fpaytype=$("#checkorder"+pageid).attr("paytype");
		    	var fsended=$("#sendorder"+pageid).attr("value");
		    	var fchecked=$("#checkorder"+pageid).attr("value");
		    	var orderdetailid = $(obj).val();
		    	subRow["fpaytype"]=fpaytype; 
		    	subRow["fsended"]=fsended;
		    	subRow["fchecked"]=fchecked;
		    	subRow["checkmemo"] = deallogmemo;
		    	var params={
		    		jsonobj:JSON.stringify(subRow)
				};
		    	$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r) {
					if (r) {
						$.messager.progress({text : "正在处理，请稍候..."});		
		    	$.ajax({
		    		 type:'POST',
		    		 url:"managerorders/OTSaveCheckRefuseMemo.do?editid="+orderdetailid,
		    		 dataType:'JSON',
		    		 data:dat,
		    		 success:function(data){
		    			 $.messager.progress('close');
		    			 //alert(JSON.stringify(data))
		    			 if (data.result) {
	    				 	$('#audit').dialog({
	    						closed:true,
	    					});
	    		    	 	$("#deallogmemo").val("");
	    		    	 	$.messager.alert('温馨提示',"操作成功！","info");
	    		    	 	window.location.reload();
		 				}else{
							$.messager.alert('温馨提示',data.msg,"error");
						}
		    		 },error:function(){
		    			 $.messager.alert('温馨提示',"请求出错!","error");
		 			}
		    	 });
			}});
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
	
	
// 	var checkorder = $(o.checkorder).attr("value");
// 	if(checkorder == "0"){
// 		 $("#checkorderinfo"+o.page_id).jbootdialog("show");
// 	}else{	
// 		 $("#checklogmemo"+o.page_id).attr("disabled","disabled");
// 		 $("#checkorderinfo"+o.page_id).jbootdialog("gettraget","footer").attr("style","display:none;");
// 		 $("#checkorderinfo"+o.page_id).jbootdialog("show");
// 	}	
};	
//是否收款
function payOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.payorder).attr("fno");
	if(fsyncerp>0){
		$.messager.alert('温馨提示',"定单【"+fno+"】请在ERP中执行本操作！");
		return false;
	}
	var fpaytype=$(o.checkorder).attr("paytype");
	var orderdetailid = $(o.orderdetailid).val();// 订单明细ID
	if (fpaytype!=99){
		$(o.orderdetailid).addClass("disabled");
	}
	else if($(o.pay).val() == "99"){
		$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r){
			if(!r){
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
		$.messager.alert('温馨提示',"收款成功！", 'info');
		window.location.reload();
	}else{
		$.messager.alert('温馨提示',"操作失败！", 'error');
	}
};
//是否发货
function sendOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.checkorder).attr("fno");
	if(fsyncerp>0){
		$.messager.alert('温馨提示',"定单【"+fno+"】请在ERP中执行本操作！");
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
	
	$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r){
		if(r){
// 			$.messager.progress({ 
// 			       title: '提示', 
// 			       msg: '文件上传中，请稍候……', 
// 			       text: '' 
// 			    });
			var flag = saveSubmit(url,params,orderdetailid);
// 			$.messager.progress('close');
			if(flag.result){
// 				$.jbootloading("hide");
				$.messager.alert('温馨提示',"发货成功！", 'info');
				window.location.reload();
				
			}else{
// 				$.jbootloading("hide");
				$.messager.alert('温馨提示',flag.msg, 'error');
			}
		}
	})
};
//是否收货
function revedOrder(o){
	var fsyncerp = $("#displayerp").attr("fsyncerp");
	var fno = $(o.checkorder).attr("fno");
	if(fsyncerp>0){
		$.messager.alert('温馨提示',"定单【"+fno+"】请在ERP中执行本操作！");
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
	$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r){
		if(r){
			var flag = saveSubmit(url,params,orderdetailid);
			if(flag.result){
				$.messager.alert('温馨提示',"该订单确认收货成功！", 'info');
				window.location.reload();
			}else{
				$.messager.alert('温馨提示',"操作失败！", 'error');
			}
		}
	})
};
//打印
function printOrder(){
	var ids = $('#orderdetailid${page_id}').val();
	var storetype = $('#orderdetailid${page_id}').attr('storetype');
	var fusecssoft = $('#orderdetailid${page_id}').attr('fusecssoft');
	window.open("managerorders/OTLookOrder_red.do?&pageid=500&editid="+ids+"&preid=-1&nextid=-2&storetype="+storetype+
			"&fusecssoft="+fusecssoft+"&print=1"); 
}

//弹出加载层
function load() {  
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");  
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在执行，请稍候。。。").appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
}
//取消加载层  
function disLoad() {  
    $(".datagrid-mask").remove();  
    $(".datagrid-mask-msg").remove();  
}
</script>
</body>

</html>
