function checkimg(state){
	if(state==1){
		$("#img1").css("display","");
		$("#img2").css("display","none");
		$("#img3").css("display","none");
		$("#img4").css("display","none");
	}else if(state==2){
		$("#img1").css("display","none");
		$("#img2").css("display","");
		$("#img3").css("display","none");
		$("#img4").css("display","none");
	}else if(state==3){
		$("#img1").css("display","none");
		$("#img2").css("display","none");
		$("#img3").css("display","");
		$("#img4").css("display","none");
	}else if(state==4){
		$("#img1").css("display","none");
		$("#img2").css("display","none");
		$("#img3").css("display","none");
		$("#img4").css("display","");
	}
}

function checkstate(n)  {
	 var state =  $("#state").val();
	 if(n>0){
		 state++; 
	 }else if (n<0){
		 state--; 
	 }
	 if(state==1){
		 checkimg(state);
		 $("#prev").hide();
		 $("#next").show();
	 }else if(state==2){
		 if(validateSecond()){
			 checkimg(state);
			$("#prev").show();
			$("#next").show();
		 }else{
			return $("#state").val();
		 }
	 }else if(state==3){
   		 if(validateThree()){
   			checkimg(state);
	   		 $("#prev").show();
			 $("#next").show();
    	 }else{
    		 return $("#state").val();
    	 }	
	 }else if(state==4){
		 if(!accordion.isEmpty()){
			if(addgame()){//添加数据或者修改数据
				 checkimg(state);
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
//是否收集信息点击事件   刘一男 20161117新增
function needCollected(checked){
	if(checked){
		$(".showHiddenTag").css("display","");
		//Util.setValueSwitch("#FCollectType",'${gamemap.fcollecttype}');
		//展示活动
		$("#FSaleActivityID").combobox({
			url : "saleactivity/getSaleActivityByUnitIDs.do?type=0&bargainid=0&real=0"
		});
	}else{
		$(".showHiddenTag").css("display","none");
	}
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
function validateSecond(){//第一页验证信息
	var fname=$('#FName').val();
	if(fname==""){
		$.messager.alert("提示", "活动名称不能为空！", "warning");
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
	//控制设置收集信息没有设置 收集内容
	var FSaleActivityID=$("#FSaleActivityID").val();
	if(Util.getValueSwitch("#FNeedCollected")==true&&(FSaleActivityID==""||FSaleActivityID==0)){
		$.messager.alert("提示", "设置活动信息必须要填写收集设置！", "warning");
		return false;
	}
	if(fname&&fbegintime&&fendtime){
		return true;
	}
	return true;
}
	

function validateThree(){//第二页验证信息
	var fkeyword = $('#FKeyWord').val();
	if(fkeyword==""){
		$.messager.alert("提示", "关键字不能为空！", "warning");
		return false;
	}
	if(typeid==12){
		var ftaskforwardcount = $('#FTaskForwardCount').val();
		if(ftaskforwardcount==""){
			$.messager.alert("提示", "每个月饼助力人数不能为空！", "warning");
			return false;
		}
	}
	if(typeid==13){
		var ftaskforwardcount = $('#FTaskForwardCount').val();
		if(ftaskforwardcount==""){
			$.messager.alert("提示", "每个粽子助力人数不能为空！", "warning");
			return false;
		}
	}
	if(typeid==15){
		var ftaskcount = $("#FTaskCount").val();
		if(ftaskcount==""){
			$.messager.alert("提示", "礼盒数量不能为空！", "warning");
			return false;
		}
		if(ftaskcount>6||ftaskcount<=0){
			$.messager.alert("提示", "礼盒数量最少设置1个,最多设置6个！", "warning");
			return false;
		}
		var ftaskforwardcount = $('#FTaskForwardCount').val();
		if(ftaskforwardcount==""){
			$.messager.alert("提示", "每个礼盒助力人数不能为空！", "warning");
			return false;
		}
	}
	var fmaxplayers = $('#FMaxPlayers').val();
	if(fmaxplayers==""){
		$.messager.alert("提示", "参与人数上限不能为空！", "warning");
		return false;
	}
	var ftotalnum = $('#FTotalNum').val();
	if(ftotalnum==""){
		$.messager.alert("提示", "最大送金币次数不能为空！", "warning");
		return false;
	}
	var fautoreplyurl = $('#FAutoReplyUrl').val();
	if(fautoreplyurl==""){
		$.messager.alert("提示", "自动回复图片不能为空！", "warning");
		return false;
	}
	var fwishing = $('#FWishing').val();
	if(fwishing==""){
		$.messager.alert("提示", "活动祝福语不能为空！", "warning");
		return false;
	}
	if(fkeyword&&fmaxplayers&&fautoreplyurl&&fwishing){
		return true;;
	}
	return true;
}
//点击第三个下一步的时候 添加数据
function addgame(){
	var fname=$('#FName').val();
	var foaid=$('#FOAID').val();
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	var fcontent = $('#FContent').val();//split("\n").join("<br />")
	if(typeid==12){
		var fexchangeinfo = $('#FExchangeInfo').val();//split("\n").join("<br />")
	}
	var fkeyword = $('#FKeyWord').val();
	var ftaskcount = $('#FTaskCount').val();
	var fisinitrice=0;
	if(typeid==13){
		fisinitrice=Util.getValueSwitch("#FIsInitRice");
		if(fisinitrice){
			fisinitrice=1;
		}else{
			fisinitrice=0;
		}
	}
	var fmaxplayers = $('#FMaxPlayers').val();
	var ftaskforwardcount = $('#FTaskForwardCount').val();
	var fsharetitle = $("#FShareTitle").val();
	var fsharelinkurl = $("#FShareLinkUrl").val();
	var fshareimgurl = $("#FShareImgUrl").val();
	var fsharedescription = $("#FShareDescription").val();
	var ffollow = Util.getValueSwitch("#FFollow");
	if(ffollow){
		ffollow=1;
	}else{
		ffollow=0;
	}
	var fshowprize = "";
	if(typeid!=15){
		fshowprize=Util.getValueSwitch("#FShowPrize")
	}
	if(fshowprize){
		fshowprize=1;
	}else{
		fshowprize=0;
	}
	var fshowwinner = Util.getValueSwitch("#FShowWinner");
	if(fshowwinner){
		fshowwinner=1;
	}else{
		fshowwinner=0;
	}
	var fautoreplyurl = $("#FAutoReplyUrl").val();
	
	var fadimg = $("#FAdImg").val();
	var fwishing = $('#FWishing').val();
	
	var fgameprobability = $('#FGameProbability').val();
	if(fgameprobability>100){
		$.messager.alert("提示", "奖项整体概率不能大于100！", "warning");
		return false;
	}
	var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
	//以上都是属于geme表数据
	var fredsendtype = $('#FRedSendType').val();
	var fredbags = Util.getValueSwitch("#FRedbags");
	if(fredbags){
		fredbags=1;
		if(!fredsendtype||fredsendtype==0||fredsendtype==""){
			$.messager.alert("提示", "请选择红包发送类型！", "warning");
			return false;
		}
	}else{
		fredbags=0;
	}
	var data={};
	data["FName"]=fname;
	data["FOAID"]=foaid;
	data["FBeginTime"]=fbegintime;
	data["FEndTime"]=fendtime;
	data["FContent"]=fcontent;
	if(typeid==12){
		data["FExchangeInfo"]=fexchangeinfo;
	}
	if(typeid==13){
		data["FIsInitRice"]=fisinitrice;
	}
	var ftotalnum = $("#FTotalNum").val();
	data["FTotalNum"]=ftotalnum;
	data["FKeyWord"]=fkeyword;
	data["FTaskCount"]=ftaskcount;
	data["FTaskForwardCount"]=ftaskforwardcount;
	data["FMaxPlayers"]=fmaxplayers;
	data["FShowPrize"]=fshowprize;
	data["FShowWinner"]=fshowwinner;
	data["FAutoReplyUrl"]=fautoreplyurl;
	data["FAdImg"]=fadimg;
	data["FWishing"]=fwishing;
	data["FGameProbability"]=fgameprobability;
	data["FPrizeProbabilityBase"]=fprizeprobabilitybase;
	data["FShareTitle"]=fsharetitle;
	data["FShareLinkUrl"]=fsharelinkurl;
	data["FShareImgUrl"]=fshareimgurl;
	data["FShareDescription"]=fsharedescription;
	data["FFollow"]=ffollow;
	//获取收集信息设置信息 新标签设计 刘一男 2016-11-17
	var fneedcollected=Util.getValueSwitch("#FNeedCollected");
	if(fneedcollected){
		data["FNeedCollected"]=1;
		data["FCollectType"]=0;
		var fid = $("#FSaleActivityID").val();
		data["FActivityID"]=fid;
	}else{
		data["FNeedCollected"]=0;
		data["FCollectType"]=0;
		data["FActivityID"]=0;
	}
	// 处理演示页面的奖项
	var data_prize = accordion.getValue();
	data_prize["fredsendtype"]=fredsendtype;
	data_prize["fredbags"]=fredbags;
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
			url:"game/updateRiceDumpling.do?gameid="+gameid+"&typeID="+typeid,
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
				$.messager.alert("提示", "修改成功！", "warning");
			}
		});
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"game/addRiceDumpling.do?typeID="+typeid,
			dataType : "json",
			data:dat,
			async:false,
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result) {
					$("#url").val(data.gameid);
					result=true;
					$.messager.alert("提示", "添加成功！", "warning");
					$("#releaseedstate").val(0);
				}else{
					result=false;
					$.messager.alert("提示", "添加失败！", "warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress("close");//隐藏加载中
				result=false;
				$.messager.alert("提示", "修改成功！", "warning");
			}
		});
	}
	return result;
};

//发布按钮
function releaseed(){
	var fstate=$("#releaseedstate").val();
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
							$("#releaseedstate").val(0);
						}
						else{
							$.messager.alert("提示", "发布失败！", "warning");
							$("#releaseedstate").val(1);
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
			$("#releaseedstate").val(0);
		}
	 });
}