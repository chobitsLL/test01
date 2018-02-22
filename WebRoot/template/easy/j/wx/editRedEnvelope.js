$(document).ready(function(){
	  $("#prev").click(function(){
		  $(".game").removeClass("active");
		  $(".tab-div").hide();
		  var state=checkstate(-1);
		  $(".a"+state).show();
		  $("#game-a"+state).addClass("active");
	  });
	  $("#next").click(function(){
		  $(".game").removeClass("active");
		  $(".tab-div").hide();
		  var state=checkstate(1);
		  $(".a"+state).show();
		  $("#game-a"+state).addClass("active");
	  });
	  checkstate(0);
});
function checkstate(n)  {
	 var state =  $("#state").val();
	 if(n>0){
		 state++; 
	 }else if (n<0){
		 state--; 
	 }
	 if(state==1){
		 $("#prev").hide();
		 $("#next").show();
	 }else if(state==2){
		 if(validateSecond()){//
			$("#prev").show();
			$("#next").show();
		 }else{
			return $("#state").val();
		 }
	 }else if(state==3){
		 if(validateTwo()){//
	   		 $("#prev").show();
			 $("#next").show();
   	 }else{
   		 return $("#state").val();
   	 }	
	}else if(state==4){
		 if(validateThree()){//
			 if(addgame()){//添加数据或者修改数据
				 $("#next").hide();
				 $("#prev").hide();
				 $("#update").show();
				 $("#confirm").show();
			 }else{
				 return $("#state").val();
			 }
		}else{
			 return $("#state").val();
		 }
	}
	$("#state").val(state);
	return $("#state").val();//state;
}
function validateSecond(){//第一页验证信息
	var typeid=$("#typeid").val();
	if(fcurrentstate>0){
		$.messager.alert("提示", "摇奖状态下不允许编辑！", "warning");
		return false;
	}
	var fname=$('#FName').val();
	if(fname==""){
		$.messager.alert("提示", "活动名称不能为空！", "warning");
		return false;
	}
	var foaid = $('#FOAID').val();
	if(foaid==""){
		$.messager.alert("提示", "公众号不能为空！", "warning");
		return false;
	}
	var fbegintime=$('#FBeginTime').val();
	if(fbegintime==""){
		$.messager.alert("提示", "开始时间不能为空！", "warning");
		return false;
	}
	var fendtime=$('#FEndTime').val();
	if(fendtime==""){
		$.messager.alert("提示", "结束时间不能为空！", "warning");
		return false;
	}
	//判断结束时间是否大于开始时间
    var time = judgetime(fbegintime,fendtime);
	if(!time){
		return false;
	}
	var fstate = $("#fstate").val();
	if(fstate==1){
		$.messager.alert("提示", "活动进行中新增奖项或修改原有奖项的奖项图标后，请刷新大屏。！活动发布后，如果修改奖项数量为0的奖品，查看页面可能会出现发放数量大于奖品数量的情况。建议不修改。！", "warning");
	}
	return true;
}

function validateTwo(){//第二页验证信息
	var fkeyword = $('#FKeyWord').val();
	if(fkeyword==""){
		$.messager.alert("提示", "关键字不能为空！", "warning");
		return false;
	}
	var fautoreplyurl=$('#FAutoReplyUrl').val();
	if(fautoreplyurl==""){
		$.messager.alert("提示", "自动回复图片不能为空！", "warning");
		return false;
	}
	var fwishing=$('#FWishing').val();
	if(fwishing==""){
		$.messager.alert("提示", "活动祝福语不能为空！", "warning");
		return false;
	}
	return true;
}

function validateThree(){//第三页验证信息
	var fgameprobability = $('#FGameProbability').val();
	if(fgameprobability==""){
		$.messager.alert("提示", "整体中奖概率不能为空！", "warning");
		return false;
	}
	if(fgameprobability>100){
		$.messager.alert("提示", "整体中奖概率不能大于100！", "warning");
		return false;
	}
	var fredbags=Util.getValueSwitch("#FRedbags");
	if(fredbags){
		fredbags=1;
	}else{
		fredbags=0;
	}
	if(fredbags==1){
		var factivitytotalamount = parseInt($('#FActivityTotalAmount').val());
		if(factivitytotalamount ==""){
			$.messager.alert("提示", "红包总金额不能为空！", "warning");
			return false;
		}
		var fminmoney = parseInt($('#FMinMoney').val());
		if(fminmoney ==""){
			$.messager.alert("提示", "红包最小金额不能为空！", "warning");
			return false;
		}
		if(fminmoney<1){
			$.messager.alert("提示", "红包最小金额不能小于1元！", "warning");
			return false;
		}
		if(fminmoney>=factivitytotalamount){
			$.messager.alert("提示", "红包最小金额不能大于等于红包总金额！", "warning");
			return false;
		}
		var fmaxmoney = parseInt($('#FMaxMoney').val());
		if(fmaxmoney ==""){
			$.messager.alert("提示", "红包大金额不能为空！", "warning");
			return false;
		}
		if(fmaxmoney>=factivitytotalamount){
			$.messager.alert("提示", "红包最大金额不能大于等于红包总金额！", "warning");
			return false;
		}
		if(fmaxmoney>200){
			$.messager.alert("提示", "红包最大金额不能大于200元！", "warning");
			return false;
		}
		if(fminmoney>=fmaxmoney){
			$.messager.alert("提示", "红包最小金额不能大于等于红包最大金额！", "warning");
			return false;
		}
	}else{
		if(!accordion.isEmpty()){
			
		}else{
			 return false;
		}
	}
	return true;
}
//判断结束时间是否大于开始时间
function judgetime(fbegintime,fendtime){
	fbegintime = fbegintime.replace(/-/g,"/");
	fendtime = fendtime.replace(/-/g,"/");
	var startdate = new Date(fbegintime);//开始时间
	var enddate = new Date(fendtime);//结束时间
	if(enddate<startdate){
		$.messager.alert("提示", "结束日期必须大于开始日期！", "warning");
		$("#FEndTime").datetimebox('setValue',''); 
		return false;
	}
	return true;
}
//点击第三个下一步的时候 添加数据
function addgame(){
	var typeid=$("#typeid").val();//获取当前路径的参数值
	var fname=$('#FName').val();
	var foaid=$('#FOAID').val();
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	var fhint = $('#FHint').val();
	var fkeyword = $('#FKeyWord').val();
	var fpicurl = $('#FPicUrl').val();
	var fadimg = $('#FAdImg').val();
	var fautoreplyurl=$('#FAutoReplyUrl').val();
	var fwishing = $('#FWishing').val();
	var fsharetitle = $("#FShareTitle").val();
	var fshareimgurl = $("#FShareImgUrl").val();
	var fsharedescription = $("#FShareDescription").val();
	var ffollow=Util.getValueSwitch("#FFollow");
	if(ffollow){
		ffollow=1;
	}else{
		ffollow=0;
	}
	var fgameprobability = $('#FGameProbability').val();
	if(fgameprobability>100){
		$.messager.alert("提示", "奖项整体概率不能大于100！", "warning");
		return false;
	}
	//var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
	var fredbags=Util.getValueSwitch("#FRedbags");
	if(fredbags){
		fredbags=1;
	}else{
		fredbags=0;
	}
	var factivitytotalamount = $("#FActivityTotalAmount").val();
	var fmaxmoney = $("#FMaxMoney").val();
	var fminmoney = $("#FMinMoney").val();
	var fprizeid = $("#fprizeid").val();
	var data={};
	data["FName"]=fname;
	data["FOAID"]=foaid;
	data["FPicUrl"]=fpicurl;
	data["FAdImg"]=fadimg;
	data["FBeginTime"]=fbegintime;
	data["FEndTime"]=fendtime;
	data["FHint"]=fhint;
	data["FKeyWord"]=fkeyword;
	data["FAutoReplyUrl"]=fautoreplyurl;
	data["FWishing"]=fwishing;
	data["FShareTitle"]=fsharetitle;
	data["FShareImgUrl"]=fshareimgurl;
	data["FShareDescription"]=fsharedescription;
	data["FFollow"]=ffollow;
	data["FGameProbability"]=fgameprobability;
	
	data["FRedbags"]=fredbags;
	data["FActivityTotalAmount"]=factivitytotalamount;
	data["FMaxMoney"]=fmaxmoney;
	data["FMinMoney"]=fminmoney;
	data["fprizeid"]=fprizeid;
	var data_prize ="";
	if(fredbags==0){
		data_prize = accordion.getValue();
	}
	var dat={
		jsonobj:JSON.stringify(data),
		accordion:JSON.stringify(data_prize)
	};
	var gameid=$("#url").val();//判断新增修改
	var result=false;
	if(gameid.length>0){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"game/updateGame.do?gameid="+gameid+"&typeID="+typeid,
			dataType : "json",
			data:dat,
			async : false, // 同步 等待ajax返回值
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result) {
					result=true;
					$.messager.alert("提示", "修改成功！", "warning");
				}else{
					result=false;
					$.messager.alert("提示", data.msg, "warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress("close");//隐藏加载中
				result=false;
				$.messager.alert("提示", "修改失败！", "warning");
			}
		})
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"game/addGame.do?typeID="+typeid,
			dataType : "json",
			data:dat,
			async:false,
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result) {
					$("#url").val(data.gameid);
					result=true;
					$.messager.alert("提示", "添加成功！", "warning");
					$("#fstate").val(0);
				}else{
					result=false;
					$.messager.alert("提示", "添加失败！", "warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress("close");//隐藏加载中
				result=false;
				$.messager.alert("提示", "添加失败！", "warning");
			}
		})
	}
	return result;
};

//发布按钮
function releaseed(){
	var fstate=$("#fstate").val();
	if(fstate==1){
		$.messager.alert("提示", "数据已发布，点击按钮！", "warning");
		return false;
	}
	var gameid=$("#url").val();
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		 type:"POST",
		 url:"qrmanage/selectQRcode.do?gameid="+gameid+"&gameType=003",
		 dataType:"json",
		 success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.fid!=undefined){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					 type:"POST",
					 url: "game/updateGameByState.do?state=1&FID="+gameid+"&gameType="+typeid,
					 dataType:"json",
					 success:function(data){
						$.messager.progress("close");//隐藏加载中
						if(data){
							$.messager.alert("提示", "发布成功！", "warning");
							$("#fstate").val(0);
						}else{
							$.messager.alert("提示", "发布失败！", "warning");
							$("#fstate").val(1);
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载中
						$.messager.alert("提示", "请求出错！", "warning");
					}
				 });
			}else{
				$.messager.alert("提示", "没有生成二维码不能发布游戏活动！", "warning");
				return false;
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
			$("#fstate").val(0);
		}
	 });
}