function totalRegister(){
	var ftotalamount=$("#FTotalAmount").val();
	if(ftotalamount==""){
		$.messager.alert("提示", "本轮投放金额不能为空！", "warning");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"game/updateActivitytotalamount.do?fgameid="+gameid+"&ftotalamount="+ftotalamount,
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result) {
				$.messager.alert("提示", data.msg, "warning");
			}else{
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "投放失败！", "warning");
		}
	});
}

//开始/结束摇奖
function updateState(gameid,sign){
	$.ajax({
		type:'POST',
		url:"game/updateCurrentState.do?gameid="+gameid+"&sign="+sign+"&fgameprizeid=0&fmaximum=0&typeid=0",
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			if (data.result) {
				if(sign==7){
					$.messager.alert("提示", "活动开启成功！", "warning");
				}else if(sign==9){
					$.messager.alert("提示", "data.msg！", "warning");
				}
			}else{
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.alert("提示", "执行失败！", "warning");
		}
	});
}

//重置中奖状态
function cleanPrize(){
	$.messager.confirm('确认','清除中奖状态后，已经中奖的用户可以再次参与摇奖。<br/>您确定要执行该操作吗？',function(r){ 
		if(r){
			$.ajax({
				type:'POST',
				url:"game/cleanPrizeState.do?gameid="+gameid,
				dataType : "json",
				async : false, // 同步 等待ajax返回值
				success:function(data){
					if (data.result) {
						$.messager.alert("提示", data.msg, "warning");
					}else{
						$.messager.alert("提示", data.msg, "warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.alert("提示", "执行失败！", "warning");
				}
			});
		}
	});
}

function selectSinged(){
	$.ajax({
		 type:"POST",
		 url:"game/selectSinged.do",
		 dataType:"json",
		 success:function(data){
			$("#FSinged").val(data);
		},error:function(){
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}