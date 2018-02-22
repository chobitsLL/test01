//兑换功能
function doExchange(codeids) {
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : 'wGameExchange/batchExchangePrize.do',// ?telnos='+telnos,
		type : "POST",
		data : {
			"codeids" : codeids
		},
		success : function(data) {
			$.messager.progress("close");
			if (data.result) {
				$.messager.confirm('提示', '兑换成功', function(r){
					if (r){ search(); }//刷新
				});
			} else {
				$.messager.alert("提示",data.msg,"error");
			}
		},
		error : function(data) {
			$.messager.progress("close");
			$.messager.alert("提示",JSON.stringify(data), "error");
		}
	});
}

//刷新红包领取记录
function doRefresh() {
	var FGameID = $("#FGameID").jeasycombo("getvalue").ids;
	if (FGameID == undefined || FGameID == "") {
		$.messager.alert("提示","请在查询条件中选择活动名称！", "error");
		return false;
	}
	$.messager.progress({text : "正在拉取红包信息，请您耐心等待..."});
	$.ajax({
		url : 'wGameExchange/getCashBagInfo.do?gameid=' + FGameID,
		type : "GET",
		success : function(data) {
			$.messager.progress("close");
			if (data.result) {
				$.messager.alert("提示",data.msg, "info");
			} else {
				$.messager.alert("提示",data.msg, "error");
			}
		},
		error : function(data) {
			$.messager.progress("close");
			$.messager.alert("提示","网络连接失败", "error");
		}
	});
}

//发送现金红包
function doSendRedbags(ids,rows) {
	if (rows.length>1) {
		$.messager.alert("提示","只能选择一条数据", "info");
		return false;
	}
	var row = rows[0];
	var statename = getStateName("",row,0);
	if ( statename!= "未兑奖") {
		$.messager.alert("提示","请选择未兑奖的数据", "info");
		return false;
	}
	var money = row.tbwgameexchangecodefmoney;
	var nickname = row.fwxnickname;
	
	$.messager.confirm('提示', '您确定要对【'+nickname+'】发送现金红包【'+money+'】吗？', function(r){
		if(f){
			$.messager.progress({text : "正在发送，请您耐心等待..."});
			$.ajax({
				url : "wGameExchange/redBagsExchang.do?exchangeCodeID="+ ids,
				dataType : "json",
				success : function(data) {
					$.messager.progress("close");
					if (data.result) {
						$.messager.alert("提示","操作已成功", "info");
					} else {
						$.messager.alert("提示",data.msg, "error");
					}
				},
				error : function(data) {
					$.messager.progress("close");
					$.messager.alert("提示","网络连接失败", "error");
				}
			});
		}
	});
}

//获取兑换状态
function getStateName(value,row,index){
	var type=parseInt($("#FGameType").val());
	var code = "";
	if(row.ffinished==0 && (row.fplayertelno!="" && row.freleased==1)){
		code = "未兑奖";
	}else if(row.ffinished==1){
		code = "已兑奖";
	}else if(row.ffinished==0 && row.fplayertelno=="" && row.freleased==1){
		code = "放弃兑奖";
	}else if((type==9||type==11) && row.fisactive){
		code = row.fisactive==1?"已兑奖":"未兑奖";
	}
	return code;
}

//根据兑换码兑换
function doExchangeByCode() {
	 var gametype = $("#FGameType").val();
	if (gametype == 10000 || gametype == 17) {
		$.messager.alert("提示","该活动类型不支持兑换！");
		return;
	}
	
	var exchangecode = $("#exchangecode").val();
	if (exchangecode.length == 0) {
		$.messager.alert("提示","兑换码不能为空！");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : 'wGameExchange/exchangePrize_new.do',// ?telnos='+telnos,
		type : "GET",
		data : {
			"FExchangeCode" : exchangecode
		},
		success : function(data) {
			$.messager.progress("close");
			if (data.result) {
				$.messager.alert("提示","兑换成功");
			} else {
				$.messager.alert("提示",data.msg);
			}
		},
		error : function(data) {
			$.messager.progress("close");
			$.messager.alert("提示",JSON.stringify(data), "error");
		}
	});
}

//变换活动类型
function gameType(gametype){
	//var gametype = $("#FGameType").val();
	if(gametype==10000||gametype==17||gametype==10002){
		$(".Dochange").hide();
		$(".prizeID").hide();
		$(".FStateID").hide();
		$(".FNo").show();
		$(".FExstateID").show();
		$("#column_filter").jeasycolumn("change","817_1");
	}else{
		$(".prizeID").show();
		$(".FNo").hide();
		$(".Dochange").show();
		$(".FStateID").show();
		if(gametype==9||gametype==11||gametype==10001){
			$(".FExstateID").hide();
			if(gametype==10001){
				$(".prizeID").hide();
			}
		}else{
		 	$(".FExstateID").show();
		}
		$("#column_filter").jeasycolumn("change","817_2");
	}
	//Util.resetParam(paramArray);
}