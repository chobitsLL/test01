//判断企业管理员权限
function isAllow(ids,rows){
	var unit = $("#ismanager").attr("unit");
	//console.log(unit);
	for ( var i = 0; i < rows.length; i++) {
		var row = rows[i];
		if(row.storetye==3 && unit==true){
			$.messager.alert("提示","您无此权限,请重新选择！","warning");
			return false;
		}
		if(row.fsyncerp > 0){
			$.messager.alert("提示","请在ERP【退货申请查询】屏幕执行本操作","warning");
			return false;
		}
	}
	return true;
}

//单选
function isMore(rows){
	if(rows.length > 1){
		$.messager.alert("提示","请重新选择，目前只支持单一操作！","warning");
		return true;
	}
	return false;
}

function validateamount(obj){
	var value = $(obj).val(); //获取当前文本框的值
	value=value.replace(/[^\d.]/g,'');
	$(obj).val(value);
	
	var ortherVal = 0;
	if($(obj).attr("id")=="fsendamount"){
		ortherVal = $(obj).parent().prev().find("#freturnamount").val();//获取前一个文半框的值
	}else{
		ortherVal = $(obj).parent().next().find("#fsendamount").val();//获取后一个
	}
	if(ortherVal!=""){
		ortherVal=parseFloat(ortherVal);//字符串转换为int
	}else{
		ortherVal=0;
	}
	if(value!=""){
		value=parseFloat(value);
	}else{
		value=0;
	}
	
	$("#ftotalamount").val((ortherVal+value).toFixed(2));
	
}

/**审核**/
function checkRefund(ids,row){
	$.messager.progress({text : "正在处理，请稍候..."});
	//var ftype = $(".jboot-active").find(".frefundtype").attr("refundtype"); //退换货类型
	//var fid = $(".jboot-active").find("td:first").find("ins:first").attr("id");//退换货订单id
	var ftype = row.refundtype
	var fid = row.fid;
	var favors = "",saleorderinfo = "";
	$.ajax({
		type:'post',
		url:"managerorders/queryRefundFavor.do?refundid="+fid+"&type="+ftype,
	   	dataType : 'json', 
	    data:"",
	    async : false,
		success:function(json){ 
			$.messager.progress("close");
			favors = json.favors;
			saleorderinfo = json.saleorderinfo;
		},error:function(){
			$.messager.progress("close");
		}
	});
	
	var otherSaleStr="";
	var scoreAmount = 0;
	var cardAmount = 0;
	if(saleorderinfo!="" || saleorderinfo!=null){
		if(saleorderinfo.flimitpricedocid>0){//限时抢购id
			otherSaleStr += '<span>参与限时抢购政策</span>';
		}
		if(saleorderinfo.fencashscore>0){//积分
			scoreAmount = parseFloat(saleorderinfo.fscoretoamount);
			otherSaleStr += "<span>使用"+parseFloat(saleorderinfo.fencashscore)+"积分抵现"+scoreAmount+"元</span>";
		}
		if(saleorderinfo.fexchangecodeid>0){//砍价
			otherSaleStr += "<span>参与砍价，砍掉"+parseFloat(saleorderinfo.fmoney)+"</span>";
		}
		if(saleorderinfo.fcardcodemoney>0){//卡券
			cardAmount = parseFloat(saleorderinfo.fcardcodemoney);
			otherSaleStr += "<span>使用卡券优惠"+cardAmount+",卡券不予退回</span>";
		}
	}
	var favorStr= "",modeStr="";
	if(favors.length==0){
		favorStr="<div class='favorpolicyinfo'><span class='policytit'>&#12288;促销信息：<span><span>无</span></div>";
	}else{
		favorStr="<div class='favorpolicyinfo'><span class='policytit'>&#12288;促销信息：</span><span class='infoimg' onclick='openPolicyInfo(this)'>详情<img src='template/red/demo/img/tabbottom.png' style='margin-left: 8px;'/></span></div>";
	}
	for ( var i = 0; i < favors.length; i++) {
		var fmode = favors[i].fmode;
//		console.log("促销方式："+fmode)
		if(fmode==1){
			modeStr+="<div class='favorinfo'>满减：使用促销政策编码："+favors[i].ffavorpolicyid+"，优惠金额："+favors[i].fperamount
				+"<span class='unpolicy'><span class='policytit'>政策说明：</span>"+favors[i].ffavorpolicycontent+"</span>"
				+"<span class='unpolicy'><span class='policytit'>优惠说明：</span>"+favors[i].ffavorcontent+"</span></div>";
		}
		if(fmode==2){
			modeStr+="<div class='favorinfo'>直减：使用促销政策编码："+favors[i].ffavorpolicyid+"，优惠金额："+favors[i].fperamount
				+"<span class='unpolicy'><span class='policytit'>政策说明：</span>"+favors[i].ffavorpolicycontent+"</span>"
				+"<span class='unpolicy'><span class='policytit'>优惠说明：</span>"+favors[i].ffavorcontent+"</span></div>";
		}
		if(fmode==3){
			modeStr+="<div class='favorinfo'>打折：使用促销政策编码："+favors[i].ffavorpolicyid+"，优惠金额："+favors[i].fperamount
				+"<span class='unpolicy'><span class='policytit'>政策说明：</span>"+favors[i].ffavorpolicycontent+"</span>"
				+"<span class='unpolicy'><span class='policytit'>优惠说明：</span>"+favors[i].ffavorcontent+"</span></div>";
		}
		if(fmode==4){
			modeStr+="<div class='favorinfo'>赠品：使用促销政策编码："+favors[i].ffavorpolicyid+"，数量："+favors[i].fquanty
				+"<span class='unpolicy'><span class='policytit'>政策说明：</span>"+favors[i].ffavorpolicycontent+"</span>"
				+"<span class='unpolicy'><span class='policytit'>优惠说明：</span>"+favors[i].ffavorcontent+"</span></div>";
		}
	}
	var refusereason = row.frefusereason;
	var applyreason = row.fapplyreason;
	var freturnquanty = row.freturnquanty;
	var fstockname = row.fstockname;
	var oldshouldamount = row.fshouldamount;
	var shouldamount = row.ftotalamount;
	var saleamount = row.fexchangemoney;
	var refundtype = row.refundtype;
	var fhavequanty = row.fhavequanty;
	var fsendamount = row.fsendamount;
	
	if(shouldamount == ''){
		shouldamount = 0.00;
	}
	if(fsendamount == ''){
		fsendamount = 0.00;
	}
	if(saleamount == ''){
		saleamount = 0.00;
	}
	if(fhavequanty == ''){
		fhavequanty = 0;
	}
	fhavequanty = parseInt(fhavequanty);
	if(fhavequanty>=1){
		fsendamount = 0.00;
	}
	
	saleamount = parseFloat(saleamount)+parseFloat(scoreAmount)+parseFloat(cardAmount);
	var shouldTotalAmount = parseFloat(shouldamount)+parseFloat(fsendamount);
	var refundstate = row.refundstate;//$("#"+ids).parent().nextAll(".frefundstate").attr("refundstate");
	var imgurls = row.fimgurls;//$(".jboot-active").next().find(".fimgurls").attr("imgurls");
	var img = "";
	if(imgurls != ""){
		var imgs=imgurls.split(",");
		for(var i=0;i<imgs.length;i++){
			img=img+"<img style='width: 100px;height: 100px;margin-left: 5px;margin-top: 5px;margin-bottom: 5px;' src='"+$("#fileServerPath").val()+$.trim(imgs[i])+"'/>";
		}
	}

	var body='<div class="" ids="'+ids+'" id="idss">'+
	  			'<div class="test-black panel-header">'+
	  				'<span class="panel-title">申请理由</span>'+
	  			'</div>'+
	  			'<div class="panel-body panel-body-noborder checkedinfo" style="padding:5px;">'+
	  				'<div><span class="policytit">&#12288;商品名称：</span>'+fstockname+'</div>'+
	  				'<div><span class="policytit">&#12288;申请数量：</span>'+freturnquanty+'</div>'+
	  				'<div><span class="policytit">&#12288;申请类型：</span>'+refundtypeArr[refundtype]+'</div>'+
	  				'<div><span class="policytit">&#12288;申请理由：</span>'+applyreason+'</div>'+
	  				'<div><span class="policytit">&#12288;图片信息：</span></div>'+
	  				'<div>'+img+'</div>'+
	  			'</div>'+
	  		'</div>'+
	  		'<div class="">'+
		  		'<div class="test-black panel-header">'+
					'<span class="panel-title">运费信息</span>'+
				'</div>'+
				'<div class="panel-body panel-body-noborder checkedinfo" style="padding:5px;">'+
					'<div><span class="policytit">商品总运费：</span>'+parseFloat(fsendamount).toFixed(2)+'</div>'+
				'</div>'+
	  		'</div>'+
	  		'<div class="">'+
	  			'<div class="test-black panel-header">'+
	  				'<span class="panel-title">优惠金额/优惠政策信息</span>'+
	  			'</div>'+
	  			'<div class="panel-body panel-body-noborder checkedinfo" style="padding:5px;">'+
	  				'<div><span><span class="policytit">&#12288;原单优惠：</span>' + saleamount +'</span>&#12288;&#12288;<span><span class="policytit">&#12288;已退数量：</span>' + fhavequanty +'</span>'+
	  				'</div>';
	if(otherSaleStr!=""){
		body += '<div class="othersaleinfo" style="color: red;">&#12288;' + otherSaleStr +'</div>';
	}
		body+=favorStr;
	if(modeStr!=""){
		body+=modeStr;
	} 				
		body += '</div>'+
			'</div>'+
	  		'<div class="">'+
	  			'<div class="test-black panel-header">'+
	  				'<span class="panel-title">审核理由</span>'+
	  			'</div>'+
	  			'<div class="panel-body panel-body-noborder checkedinfo" style="padding:5px;">';
	  	if(ftype!=3){
			body += '<div>' +
	  					'<label for="fshouldamount">原应退金额：</label><input class="validatebox-text" value=' + oldshouldamount +' id="fshouldamount" name ="fshouldamount" disabled/>'+
	  				'</div>'+
	  				'<div>'+
	  					'<label for="freturnamount">新应退金额：</label><input class="validatebox-text" oldvalue="' + oldshouldamount + '" value="' + shouldamount + '" id="freturnamount" name ="freturnamount" onkeyup="validateamount(this)"/>'+
	  				'</div>'+
	  				'<div>'+
  						'<label for="fsendfee">&#12288;应退运费：</label><input class="validatebox-text" value="' + fsendamount + '" id="fsendamount" name ="fsendamount" onkeyup="validateamount(this)"/>'+
  					'</div>'+
  					'<div>'+
  						'<label for="fsendfee">应退总金额：</label><input class="validatebox-text" value="'+shouldTotalAmount+'" id="ftotalamount" name ="ftotalamount" onkeyup="validateamount(this)" disabled/>'+
  					'</div>';
			auditChech(ids);//审核校验
			if(map.result=="false"&&map.msg=="积分不足，请扣款"){
				body+='<div>'+
  						'<label for="fsendfee" style="color:red" id="fscoreCheck" all="'+map.allStoreScore+'" tmpScore="'+map.tmpScore+'">提示：该用户总积分:'+map.allStoreScore+',退货应扣积分：'+map.tmpScore+'，积分不足，请扣款('+map.FScore+'积分可以抵扣'+map.fscoretoamount+'元)</label>'+
  					'</div>';
//				$.messager.alert("提示","该用户总积分:"+map.allStoreScore+",退货应扣积分："+map.tmpScore+"，积分不足，请扣款","error");
			}else if(map.result=="false"){
				body+='<div>'+
					'<label for="fsendfee" style="color:red">提示：'+map.msg+'</label>'+
				'</div>';
				$.messager.alert("提示",map.msg,"error");
			}
	  	}
  		body += '<div>'+
  					'<label for="resonid">&#12288;审核理由：</label><textarea id="resonid" class="refusereason validatebox-text" rows="3" cols="" style="min-width:80%;max-width:80%;min-height:50px;">'
  						+refusereason+'</textarea>'+
  				'</div>'+
  			'</div>'+
  		'</div>';
  		
	if(refundstate!=1){
		$("#checkrefund").dialog("dialog").find(".dialog-button").hide();
		$("#checkrefund").html(body);
		$(".refusereason").attr("readonly","readonly");
		$("#freturnamount").attr("readonly","readonly");
		$("#checkrefund").dialog("open");
	}else{
		$("#checkrefund").dialog("dialog").find(".dialog-button").show();
		$("#checkrefund").html(body);
		$("#checkrefund").dialog("open");
	}
}

var map="";
function auditChech(fid){//审核校验
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'post',
		url:"managerorders/check_audit.do?returnID="+fid+"&audit="+1,
	   	dataType : 'json', 
	    data:"",
	    async : false,
		success:function(json){ 
			$.messager.progress("close");
			map = json;
		},error:function(){
			$.messager.progress("close");
		}
	});
}

/**【单选】操作**/
function auditRefund(type){
	//var ids=$("#idss").attr("ids");	
	
	//关闭审核界面
	if (type == 2){
//		isNeedScore=0;
		$("#isNeedScore").val(0);
		$("#checkrefund").dialog("close");
		return ;
	}
	
	var returnamount = $("#freturnamount").val();
	var sendamount = $("#fsendamount").val();
	var oldrealmount = $("#freturnamount").attr("oldvalue");
	if (returnamount=="" || returnamount  == undefined ){
		returnamount = 0;
	}
	if (sendamount=="" || sendamount  == undefined ){
		sendamount = 0;
	}
	if (oldrealmount=="" || oldrealmount  == undefined ){
		oldrealmount = 0;
	}
	
	var refusereason = $(".refusereason").val();
	var ftotalamount = $("#ftotalamount").val();
	
	//审核不通过
	if (type == 0){		
		if(refusereason == ""){
			$.messager.alert("提示","请填写审核理由！");
			return;
		}
		sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
	}else {
		if(isNaN(parseFloat(returnamount))){
			$.messager.alert("提示","请输入新应退金额！");
			return;
		}
		var fscoreCheck=$("#fscoreCheck");
		oldrealmount = parseFloat(oldrealmount).toFixed(2);
		var newReturnAmount = parseFloat(parseFloat(returnamount)+parseFloat(sendamount)).toFixed(2);
		
		if(map.result=="false"&&map.msg=="积分不足，请扣款"){//积分不足
			var all=fscoreCheck.attr("all");
			var tmpScore=fscoreCheck.attr("tmpScore");
//			该用户总积分:'+map.allStoreScore+',退货应扣积分：'+map.tmpScore+'，积分不足，请扣款('+map.FScore+'积分可以抵扣'+map.fscoretoamount+'元)
			if( oldrealmount< newReturnAmount){
				$.messager.confirm('提示', "实退金额低于原销售额（不含运费），该用户总积分:"
						+map.allStoreScore+",退货应扣积分："+map.tmpScore +
						"，积分不足，请扣款("+map.FScore+"积分可以抵扣"+map.fscoretoamount
						+"元)，确定要退款吗？", function(r){
					if(f){
						$("#isNeedScore").val(1);
						sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
					}
				});
			}else{
				if(newReturnAmount <= 0){
					$.messager.confirm("提示","实退金额小于等于0，该用户总积分:"+map.allStoreScore+",退货应扣积分："+map.tmpScore +
						"，积分不足，请扣款("+map.FScore+"积分可以抵扣"+map.fscoretoamount+"元)，确定要退款吗？",function(f){
						if(f){
							$("#isNeedScore").val(1);
							sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
						}
					});
				}else{
					$.messager.confirm("提示","该用户总积分:"+map.allStoreScore+",退货应扣积分："+map.tmpScore +
							"，积分不足，请扣款("+map.FScore+"积分可以抵扣"+map.fscoretoamount+"元)，确定要退款吗？",function(f){
						if(f){
							$("#isNeedScore").val(1);
							sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
						}
					});
				}
			}
		}else{//订单没有赠送积分 或积分够退
//			isNeedScore=0;
			$("#isNeedScore").val(0);
			if( oldrealmount< newReturnAmount){
				$.messager.confirm("提示","实退金额低于原销售额（不含运费），确定要退款吗？",function(f){
					if(f){
						sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
					}
				});
			}else{
				if(newReturnAmount <= 0){
					$.messager.confirm("提示","实退金额小于等于0，确定要退款吗？",function(f){
						if(f){
							sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
						}
					});
				}else{
					sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount);
				}
			}
		}
	}
}

/**确定执行**/
function sureAuditRefund(type,refusereason,returnamount,ftotalamount,sendamount){
	var param = {};
	var ids=$("#idss").attr("ids");
	var isNeedScore=$("#isNeedScore").val();
	param["ids"] = ids;
	param["type"] = 1;
	param["audittype"] = type;
	param["refusereason"] = refusereason;
	param["returnamount"] = returnamount;
	param["ftotalamount"] = ftotalamount;
	param["fsendamount"] = sendamount;
	param["isNeedScore"]=isNeedScore;
	var params = JSON.stringify(param);
	var url = "managerorders/commonDeal.do";
	execAjax(1, url,params);
}

/********************************************************************************/

/**审核=1、收货=2、付款=3、发货=4、确认收货=5、取消=6**/
function commonDeal(ids,rows,type){
	//alert("ids---"+ids+"----type"+type)
	if (type == 1){
		if (isMore(rows)){//是否多选
			return;
		}
		if (!isAllow(ids,rows)){//判断管理员权限
			return;
		}
		checkRefund(ids,rows[0]);
	}else if (type == 2){
		if (!isAllow(ids,rows)){//判断管理员权限
			return;
		}
		submitRefund(ids,rows,2);
	}else if (type == 3){
		if (isMore(rows)){//是否多选
			return;
		}
		if (!isAllow(ids,rows)){//判断管理员权限
			return;
		}
		submitRefund(ids,rows,3);
	}else if (type == 4){
		if (!isAllow(ids,rows)){//判断管理员权限
			return;
		}
		submitRefund(ids,rows,4);
	}else if (type == 5){
		if (!isAllow(ids,rows)){//判断管理员权限
			return;
		}
		submitRefund(ids,rows,5);
	}else if (type == 6){
		if (!isAllow(ids,rows)){//判断管理员权限
			return;
		}
		submitRefund(ids,rows,6);
	}
}

/**提交ajax**/
function execAjax(type, url, params){	
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'post',
		url:url,
	   	dataType : 'json', 
	   	async : false,
	    data:{
	    	params : params,
	    },
		success:function(json){ 
			$.messager.progress("close");
			if(json.result == "true"){
				$.messager.alert("提示","操作成功！");
				$("#checkrefund").dialog("close");
				search();
			}else if(json.result == "login"){
				$.messager.alert("提示","您还未登录，请先登录！");
				if (type == 1){
					$("#checkrefund").dialog("close");
				}
				window.location.href = "user/getLoginAD.do";
			}else{
				if (json.msg != ""){
					$.messager.alert("提示",json.msg);
				}else{
					$.messager.alert("提示","操作失败！");
				}	
			}
		}
	});	
}


/**提交**/
function submitRefund(ids,rows,type){
	var tmpstate = rows[0].refundstate;
	for ( var i = 0; i < rows.length; i++) {

		var row = rows[i];
		//未处理=1,已拒绝=2,已同意=3,已完成=4,卖家等待收货=5,已取消=6,待退款=7,
		//待发货=8,等待买家收货--订单未完成=9,等待买家收货--订单完成=10
		var refundstate = row.refundstate;
		//线上付款=0,网银支付=1,支付宝=2,微信支付=3,财付通=4,手机支付宝=6,手机银联=7,货到付款=99
		var paytype = row.fpaytype;
		if(refundstate != tmpstate){
			$.messager.alert("提示","审核状态不一致，请重新选择！");
			return;
		}
		if(refundstate == 4){
			$.messager.alert("提示","存在已完成记录，请重新选择！");
			return;
		}
		if(refundstate == 6){
			$.messager.alert("提示","存在已取消记录，请重新选择！");
			return;
		}
		
		if ((type == 2) && (!(refundstate ==5 || (paytype ==99 && refundstate ==3)))){
			$.messager.alert("提示","只有处于等待收货的记录才能执行本操作，请重新选择！");
			return;
		}
		if ((type == 3) && (refundstate !=7)){
			$.messager.alert("提示","只有处于等待退款的记录才能执行本操作，请重新选择！");
			return;
		}
		if ((type == 4) && (refundstate !=8)){
			$.messager.alert("提示","只有处于等待发货的记录才能执行本操作，请重新选择！");
			return;
		}
		if ((type == 5) && (!(refundstate ==9||refundstate ==10))){
			$.messager.alert("提示","只有处于等待买家收货的记录才能执行本操作，请重新选择！");
			return;
		}
		if ((type == 6) && (!(refundstate == 5|| refundstate ==7|| refundstate == 8))){
			$.messager.alert("提示","只有处于等待卖家收货、待退款、待发货的记录才能执行本操作，请重新选择！");
			return;
		}
		//审核=1、收货=2、付款=3、发货=4、确认收货=5、取消=6
	}
	
	var param = {};
	param["ids"] = ids;
	param["type"] = type;
	var isNeedScore1=$("#isNeedScore1").val();
	if(type == 3){//退款
		param["isNeedScore1"] =isNeedScore1;
	}
	var params = JSON.stringify(param);	
	var url = "";
	if (type == 1){
		url = "managerorders/commonDeal_audit.do";
	}
	else if (type == 2){
		url = "managerorders/commonDeal_sign.do";
	}
	else if (type == 3){
		url = "managerorders/commonDeal_pay.do";
	}
	else if (type == 4){
		url = "managerorders/commonDeal_send.do";
	}
	else if (type == 5){
		url = "managerorders/commonDeal_rev.do";
	}
	else if (type == 6){
		url = "managerorders/commonDeal_cancel.do";
	}
	
	execAjax(type, url,params);
}

/**显示详情**/
function showDetail(row){
    var fstoretype = row.storetype;
    var storetype ="";
	if(fstoretype==0){
		storetype = "企业店铺";
	}else if(fstoretype==1){
		storetype = "门店店铺";
	}else if(fstoretype==2){
		storetype = "员工店铺";
	}else if(fstoretype==3){
		storetype = "加盟商店铺";
	}else if(fstoretype==6){
		storetype = "村级服务站";
	}else{
		storetype = "";
	}
	
	var frefundstate = row.refundstate;
	var refundstate = "";
	
	if(frefundstate == 1){
		refundstate = "未处理";
	}else if(frefundstate == 2){
		refundstate = "已拒绝";
	}else if(frefundstate == 3){
		refundstate = "已同意";
	}
    else if(frefundstate == 4){
    	refundstate = "已完成";
	}
    else if(frefundstate == 5){
		refundstate = "卖家等待收货";
	}
    else if(frefundstate == 6){
		refundstate = "已取消";
	}
    else if(frefundstate == 7){
		refundstate = "待退款";
	}
    else if(frefundstate == 8){
		refundstate = "待发货";
	}
    else if(frefundstate == 9){
		refundstate = "等待买家收货";
	}
    else if(frefundstate == 10){
		refundstate = "等待买家收货";
	}
	
	var auditstate = "";
	if(frefundstate == 1){
		auditstate = "未处理";
	}else if(frefundstate == 2){
		auditstate = "已拒绝";
	}else if(frefundstate >= 3){
		auditstate = "已同意";
	}
   
	
		//0=线上付款，1-网银支付，2=支付宝，3=微信支付， 4=财付通，5= ,6= 手机支付定 , 7=手机银联,99-货到付款
	var fpaytype = row.fpaytype;
	var paytype ="";
	if (fpaytype == 0){
		paytype = "线上付款";
	}
	else if (fpaytype == 1){
		paytype = "网银支付";
	}
	else if (fpaytype == 2){
		paytype = "支付宝";
	}
	else if (fpaytype == 3){
		paytype = "微信支付";
	}
	else if (fpaytype == 4){
		paytype = "财付通";
	}
	else if (fpaytype == 5){
		paytype = "";
	}
	else if (fpaytype == 6){
		paytype = "手机支付宝";
	}
	else if (fpaytype == 7){
		paytype = "手机银联";
	}
	else if (fpaytype == 99){
		paytype = "货到付款";
	}
	
	var frefundtype = row.refundtype;
	var refundtype ="";
	if (frefundtype == 1){
		refundtype = "未发货退货";
	}
	else if (frefundtype == 2){
		refundtype = "已发货退货";
	}
	else if (frefundtype == 3){
		refundtype = "已发货换货";
	}
	
	var fpayed = row.fpayed;
	var payed ="";
	if (fpayed == 1){
		payed = "已付款";
	}
	else {
		payed = "未付款";
	}
	
	var fsigned = row.fsigned;
	var signed ="";
	if (fsigned == 1){
		signed = "已收货";
	}
	else {
		signed = "未收货";
	}
	
	var fsended = row.fsended;
	var sended ="";
	if (fsended == 1){
		sended = "已发货";
	}
	else {
		sended = "未发货";
	}
	
	var freved = row.freved;
	var reved ="";
	if (freved == 1){
		reved = "已收货";
	}
	else {
		reved = "未收货";
	}
	
	var fcancel = row.fcancel;
	var cancel ="";
	if (fcancel == 1){
		cancel = "已取消";
	}	
	else {
		cancel = "无";
	}
	var imgurlStr = "";
	if(row.fimgurls!=""){
		imgurlStr = "<a href='javascript:;' onclick='lookimg(this)'>查看图片</a>";
	}
	
	html='<div class="detail-inline" >'
	+'<div class="detail-group col2"><label class="title">原订单号：</label><label class="value fno">'+row.fno+'</label></div>'
	+'<div class="detail-group"><label class="title">会员昵称：</label><label class="value">'+row.fnickname+'</label></div>'
	+'<div class="detail-group"><label class="title">会员名称：</label><label class="value">'+row.fusername+'</label></div>'
	+'<div class="detail-group"><label class="title">会员手机：</label><label class="value ftelno">'+row.ftelno+'</label></div>'
	+'</div>'                                                            
	+'<div class="detail-inline" >'   
	+'<div class="detail-group col3"><label class="title">商品名称：</label><label class="value">'+row.fstockname+'</label></div>'
	+'<div class="detail-group"><label class="title">已退数量：</label><label class="value fhavequanty" fhavequanty='+row.fhavequanty+'>'+row.fhavequanty+'</label></div>'
	+'<div class="detail-group"><label class="title">销售日期：</label><label class="value fdate">'+row.fdate+'</label></div>'

	+'</div>'
	+'<div class="detail-inline">'
	+'<div class="detail-group"><label class="title">申请时间：</label><label class="value fbegintime " date='+row.fdate+'>'+row.fbegintime+'</label></div>'
	+'<div class="detail-group col2"><label class="title">申请理由：</label><label class="value fapplyreason">'+row.fapplyreason+'</label></div>'
	+'<div class="detail-group"><label class="title">申请数量：</label><label class="value fprice " price = ' + row.fprice +'>'+row.freturnquanty+'</label></div>'
//			+'<div class="detail-group"><label class="title">&#12288&#12288单价：</label><label class="value">'+row.fprice+'</label></div>'
	+'<div class="detail-group"><label class="title">应退金额：</label><label class="value fshouldamount " shouldamount = ' + row.fshouldamount +'>'+row.freturnquanty+'*'+row.fprice+'='+row.fshouldamount+'</label></div>'
	+'</div>'
	+'<div class="detail-inline">'
	+'<div class="detail-group"><label class="title">物流公司：</label><label class="value">'+row.fexpresscomp+'</label></div>'
	+'<div class="detail-group"><label class="title">物流单号：</label><label class="value">'+row.fexpressno+'</label></div>'
	+'<div class="detail-group"><label class="title">退货状态：</label><label class="value" >'+refundstate+'</label></div>'
	+'<div class="detail-group"><label class="title">店铺类型：</label><label class="value fstoretype ">'+storetype+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;联营商：</label><label class="value">'+row.flinkunitname+'</label></div>'
	+'</div>'
	+'<div class="detail-inline">'
	+'<div class="detail-group"><label class="title">审核状态：</label><label class = "value fauditstate" auditstate = '+frefundtype+'>'+auditstate+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;审核人：</label><label class="value">'+row.fauditperson+'</label></div>'
	+'<div class="detail-group"><label class="title">审核时间：</label><label class="value fapprovaltime">'+row.fapprovaltime+'</label></div>'
	+'<div class="detail-group"><label class="title">审核意见：</label><label class="value frefusereason ">'+row.frefusereason+'</label></div>'
	+'</div>'
	
	+'<div class="detail-inline">'                                          
	+'<div class="detail-group"><label class="title">收货状态：</label><label class="value fsigned" signed = '+fsigned+'>'+signed+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;收货人：</label><label class="value">'+row.fsiger+'</label></div>'
	+'<div class="detail-group"><label class="title">收货时间：</label><label class="value">'+row.fsigntime+'</label></div>'
	+'<div class="detail-group"><label class="title">收货电话：</label><label class="value">'+row.frevtel+'</label></div>'
	+'<div class="detail-group"><label class="title">支付方式：</label><label class="value">'+paytype+'</label></div>'
	+'</div>'
	+'<div class="detail-inline">'                                  
	+'<div class="detail-group"><label class="title">付款状态：</label><label class="value fpayed" payed = '+fpayed+'>'+payed+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;付款人：</label><label class="value">'+row.fpayer+'</label></div>'
	+'<div class="detail-group"><label class="title">付款时间：</label><label class="value">'+row.fpaytime+'</label></div>'
	+'<div class="detail-group"><label class="title">实退金额：</label><label class="value ftotalamount" ftotalamount='+row.ftotalamount+'>'+row.ftotalamount+'</label></div>'
	+'<div class="detail-group"><label class="title">原订单优惠：</label><label class="value saleamount" saleamount='+row.fexchangemoney+'>'+row.fexchangemoney+'</label></div>'
	+'</div>'
	+'<div class="detail-inline">'                                            
	+'<div class="detail-group"><label class="title">发货状态：</label><label class="value fsended" sended = '+fsended+'>'+sended+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;发货人：</label><label class="value">'+row.fsendperson+'</label></div>'
	+'<div class="detail-group"><label class="title">发货时间：</label><label class="value">'+row.fsendtime+'</label></div>'
	+'<div class="detail-group col2"><label class="title">发货地址：</label><label class="value">'+row.frevprov+" "+row.frevcity+" "+row.frevdistrict+ " " + row.frevtown+ " "+row.frevaddress+'</label></div>'
	+'</div>'
	+'<div class="detail-inline">'                                          
	+'<div class="detail-group"><label class="title">取消状态：</label><label class="value fcancel" cancel = '+fcancel+'>'+cancel+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;取消人：</label><label class="value">'+row.fcancelperson+'</label></div>'
	+'<div class="detail-group"><label class="title">取消时间：</label><label class="value">'+row.fcanceltime+'</label></div>'
	+'<div class="detail-group"><label class="title">图片链接：</label><label class="value fimgurls" imgurls="'+row.fimgurls+'">'+imgurlStr+'</label></div>'
	+'</div>'
	+'<div class="detail-inline borderNone">'                                             
	+'<div class="detail-group"><label class="title">确认状态：</label><label class="value freved" reved = '+freved+'>'+reved+'</label></div>'
	+'<div class="detail-group"><label class="title">&#12288;确认人：</label><label class="value">'+row.frever+'</label></div>'
	+'<div class="detail-group"><label class="title">确认时间：</label><label class="value">'+row.frevtime+'</label></div>'
	+'<div class="detail-group"><label class="title">应退运费：</label><label class="value">'+row.fsendamount+'</label></div>'
	+'<div class="detail-group"><label class="title">实退运费：</label><label class="value">'+row.fbacksendamount+'</label></div>'
	+'</div>';

	$("#detail").html(html);
}

/**审核时，查看促销说明信息**/
function openPolicyInfo(obj){
	var $this = $(obj).parent().siblings().find(".unpolicy");
	if($this.hasClass("policyinfo")){
		$this.removeClass("policyinfo");
		$(obj).find("img").removeClass("img180");
	}else{
		$this.addClass("policyinfo");
		$(obj).find("img").addClass("img180");
	}
}

/**查看图片**/
function lookimg(obj){
	var imgurls = $(obj).parent().attr("imgurls");
	var img = "";
	if(imgurls != ""){
		var imgs=imgurls.split(",");
		for(var i=0;i<imgs.length;i++){
			img=img+"<img style='width: 32%; border: 1px solid;margin-left: 5px;margin-top: 5px;margin-bottom: 5px;' src='"+$("#fileServerPath").val()+$.trim(imgs[i])+"'/>";
		}
	}
	$("#imgdlg").html(img);
	$("#imgdlg").dialog("open");
}

/************导出Excel按钮***************/
function exportExcel_refund(){
	Util.exportExcel({
		url:"managerorders/exportExcel_refund.do",
		jsonParam:Util.initParam(paramArray).jsonobj,
		sheetTitle:"退换货订单",
		fileName:"退换货订单",
		headers:{'fstorename':'店铺','freturnno':'退货单号','fbegintime':'申请时间','frefundtype':'退货类型','fstockname':'商品','freturnquanty':'数量','fshouldamount':'金额',
		'frefundstate':'状态','fno':'原订单号','fnickname':'会员昵称','fusername':'会员名称','ftelno':'会员手机','fstockname':'商品名称','fhavequanty':'已退数量','fdate':'销售日期',
		'fapplyreason':'申请理由','freturnquanty':'申请数量','fshouldamount':'应退金额','fexpresscomp':'物流公司','fexpressno':'物流单号','frefundstate':'退货状态','fstoretype':'店铺类型','flinkunitname':'联营商','fauditstate':'审核状态',
		'fauditperson':'审核人','fapprovaltime':'审核时间','frefusereason':'审核意见','fsigned':'收货状态','fsiger':'收货人','fsigntime':'收货时间','frevtel':'收货电话','fpayed':'付款状态',
		'fpayer':'付款人','fpaytime':'付款时间','ftotalamount':'实退金额','fpaytype':'支付方式','fsended':'发货状态','fsendperson':'发货人','fsendtime':'发货时间','frevaddress':'发货地址',
		'fcancel':'取消状态','fcancelperson':'取消人','fcanceltime':'取消时间','fimgurls':'图片链接','freved':'确认状态','frever':'确认人','frevtime':'确认时间'}
	});
}
