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
		 if(validateSecond()){
			$("#prev").show();
			$("#next").show();
			accordion.p_group.accordion("resize");
		 }else{
			return $("#state").val();
		 }
	 }else if(state==3){
		 if(validateThree()){
			 if(!accordion.isEmpty()){
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
			 }else{
					return $("#state").val();
			 }
		 }
	 $("#state").val(state);
	 return $("#state").val();//state;
}
function validateSecond(){//第一页验证信息
	var typeid=$("#typeid").val();
	if(typeid>4&&typeid!=7&&typeid!=10){
		if(fcurrentstate>0){
			$.messager.alert("提示", "摇奖状态下不允许编辑！", "warning");
			return false;
		}
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
	var fkeyword = $('#FKeyWord').val();
	if(fkeyword==""){
		$.messager.alert("提示", "关键字不能为空！", "warning");
		return false;
	}
	if(typeid==5||typeid==6){
		var fpicurl=$('#FPicUrl').val();
		if(fpicurl==""){
			$.messager.alert("提示", "背景图片不能为空！", "warning");
			return false;
		}
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
	var fcodeendTime=$('#FCodeEndTime').val();
	if(fcodeendTime==""){
		$.messager.alert("提示", "兑换码截止时间不能为空！","warning");
		return false;
	}
	//判断结束时间是否大于开始时间
    var time = judgetime();
	if(!time){
		return false;
	}
	if(typeid==10){
		var fbegincashtime=$('#FBeginCashTime').val();
		if(fbegincashtime==""){
			$.messager.alert("提示", "开始兑奖时间不能为空！", "warning");
			return false;
		}
		var fendcashtime=$('#FEndCashTime').val();
		if(fendcashtime==""){
			$.messager.alert("提示", "截止兑奖时间不能为空！", "warning");
			return false;
		}
		//判断结束时间是否大于开始时间
	    var time = judgetimes(fbegincashtime,fendcashtime);
		if(!time){
			return false;
		}
	}
	if($("#FMultStore").is(":checked")){
		var storeids= $("#FStoreIDs").val();
		if(storeids==""){
			$.messager.alert("提示", "门店不能为空！", "warning");
			return false;
		}
	}
	if(typeid>=4||typeid!=10){
		var fstate = $("#fstate").val();
		if(fstate==1){
			$.messager.alert("提示", "活动进行中新增奖项或修改原有奖项的奖项图标后，请刷新大屏。！活动发布后，如果修改奖项数量为0的奖品，查看页面可能会出现发放数量大于奖品数量的情况。建议不修改。", "warning");
		}
	}
	//王文樟 20170324新增
	if(typeid==7){
		var fattributeuser=Util.getValueSwitch("#FAttributeUser");
		if(fattributeuser){
			var freeCount = $("#FFreeCount").val();
			var needScore = $("#FNeedScore").val();
			if(freeCount==""){
				return false;
			}
			if(needScore==""){
				return false;
			}
		}
	}
	if(fautoreplyurl&&fwishing&&fname&&foaid&&fkeyword&&fbegintime&&fendtime&&fbegincashtime&&fendcashtime){
		return true;
	}
	return true;
}

function validateThree(){//第二页验证信息
	if(typeid==4||typeid==7){
		var fgameprobability = $('#FGameProbability').val();
		if(fgameprobability==""){
			$.messager.alert("提示", "整体中奖概率不能为空！", "warning");
			return false;
		}
		if(fgameprobability>100){
			$.messager.alert("提示", "整体中奖概率不能大于100！", "warning");
			return false;
		}
		var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
		if(fprizeprobabilitybase ==""){
			$.messager.alert("提示", "奖项概率基数不能为空！", "warning");
			return false;
		}
		if(fprizeprobabilitybase&&fgameprobability){
			return true;
		}
	}
	return true;
}
//点击第三个下一步的时候 添加数据
function addgame(){
	var typeid=$("#typeid").val();//获取当前路径的参数值
	var fname=$('#FName').val();
	var foaid=$('#FOAID').val();
	var fismanualrecord;
	if(typeid==4||typeid==6){
		fismanualrecord=Util.getValueSwitch("#FIsManualRecord");
		//现在控制是人工
		if(fismanualrecord){
			fismanualrecord=1;
		}else{
			fismanualrecord=0;
		}
	}else{
		fismanualrecord=0;
	}
	//背景图片
	var fpicurl = $('#FPicUrl').val();
	if(typeid==4){
		var storeids;
		var fstorenames;
		var fmultstore=Util.getValueSwitch("#FMultStore");
		if(fmultstore){
			fmultstore=1;
			storeids= $("#FStoreIDs").val();
			fstorenames=$("#storeName").val();
		}else{
			fmultstore=0;
			storeids= 0;
			fstorenames="";
		}
	}
		var ffollow=Util.getValueSwitch("#FFollow");
	if(typeid==4||typeid==5||typeid==6||typeid==10||typeid==7||typeid==18||typeid==19){
		if(ffollow){
			ffollow=1;
		}else{
			ffollow=0;
		}
	}
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	var fcodeendtime=$('#FCodeEndTime').val();
	var fhint = $('#FHint').val();
	var fkeyword = $('#FKeyWord').val();
	var fgameprobability = $('#FGameProbability').val();
	var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
	var fautoreplyurl = $('#FAutoReplyUrl').val();
	var fwishing = $('#FWishing').val();
	var fsharetitle = $("#FShareTitle").val();
	var fsharelinkurl = $("#FShareLinkUrl").val();
	var fshareimgurl = $("#FShareImgUrl").val();
	var fsharedescription = $("#FShareDescription").val();
	var fsponsor=$('#FSponsor').val();
	var json={}
	json["FSponsor"]=fsponsor;
	if(typeid==10){//微助力
		var fadimg = $('#ADIMG').val();
		var ftotaltitle=$('#FTotalTitle').val();
		var fbegincashtime = $('#FBeginCashTime').val();
		var fendcashtime = $('#FEndCashTime').val();
		var fcashplace = $('#FCashPlace').val();
		var fcashmode = $('#FCashMode').val();
		var fcashtelno = $('#FCashTelno').val();
		var fconsultationtelno = $('#FConsultationTelno').val();
		var fgamedesc = $('#FGameDesc').val();
		json["FTotalTitle"]=ftotaltitle;
		json["FBeginCashTime"]=fbegincashtime;
		json["FEndCashTime"]=fendcashtime;
		json["FCashPlace"]=fcashplace;
		json["FCashMode"]=fcashmode;
		json["FCashTelno"]=fcashtelno;
		json["FConsultationTelno"]=fconsultationtelno;
		json["FAdImg"]=fadimg;
		json["FGameDesc"]=fgamedesc;
	}
	var data={};
	data["FName"]=fname;
	data["FOAID"]=foaid;
	data["FIsManualRecord"]=fismanualrecord;
	data["FPicUrl"]=fpicurl;
	data["FBeginTime"]=fbegintime;
	data["FEndTime"]=fendtime;
	data["FCodeEndTime"]=fcodeendtime;
	if(typeid==4||typeid==5||typeid==6||typeid==10){
		data["FContent"]=JSON.stringify(json);
	}
	if(typeid!=10){
		data["FHint"]=fhint;
	}
	data["FKeyWord"]=fkeyword;
	data["FGameProbability"]=fgameprobability;
	data["FPrizeProbabilityBase"]=fprizeprobabilitybase;
	data["FAutoReplyUrl"]=fautoreplyurl;
	data["FWishing"]=fwishing;
	data["FShareTitle"]=fsharetitle;
	data["FShareLinkUrl"]=fsharelinkurl;
	data["FShareImgUrl"]=fshareimgurl;
	data["FShareDescription"]=fsharedescription;
	//获取收集信息设置信息 新标签设计 刘一男 2016-11-17
	if(typeid==7||typeid==10||typeid==18||typeid==19){
		var fneedcollected=Util.getValueSwitch("#FNeedCollected");
		var fcollecttype=0;
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
	}
	if(typeid==4){
		data["FStoreIDs"]=storeids;
		data["FMultStore"]=fmultstore;
		data["FStoreNames"]=fstorenames;
	}
	if(typeid==4||typeid==5||typeid==6){
		data["FFollow"]=ffollow;
	}
	if(typeid==7||typeid==18||typeid==19){
		//最大参与人数
		data["FMaxPlayers"]=$("#FMaxPlayers").val();
		//活动最大参与次数
		data["FPlayerGameLimit"]=$("#FPlayerGameLimit").val();
		//活动每天参与次数
		data["FPlayerDayLimit"]=$("#FPlayerDayLimit").val();
	}
	data["FFollow"]=ffollow;
	//大转盘新增参数
	if(typeid==7){
		//活动每天参与次数
		data["FAdImg"]=$("#ADIMG").val();
		//是否为积分游戏数据
		var fattributeuser=Util.getValueSwitch("#FAttributeUser");
		if(fattributeuser){
			//是积分游戏
			data["FAttributeUser"] = 1;
			data["FFreeCount"]=$("#FFreeCount").val();
			data["FNeedScore"]=$("#FNeedScore").val();
		}else{
			//是积分游戏
			data["FAttributeUser"] = 0;
			data["FFreeCount"]=0;
			data["FNeedScore"]=0;
		}
		//20170915 spf 新增控制区域
		var fcontrolarea=Util.getValueSwitch("#FControlArea");
		if(fcontrolarea){
			data["FControlArea"] = 1;
			data["FProvince"] = $("#FProvince").val();
			data["FCity"] = $("#FCity").val();
		}
	}
	// 处理演示页面的奖项
	var data_prize = accordion.getValue();
	
	var dat={
		jsonobj:JSON.stringify(data),
		accordion:JSON.stringify(data_prize)
	};
	console.log(JSON.stringify(dat))
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
					$.messager.confirm('确认','添加成功',function(r){ 
						$("#fstate").val(0);
					});
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
			if(data.fid!=undefined){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					 type:"POST",
					 url: "game/updateGameByState.do?state=1&FID="+gameid+"&gameType="+typeid,
					 dataType:"json",
					 success:function(data){
						$.messager.progress("close");//隐藏加载中
						if(data){
							$.messager.confirm('确认','发布成功',function(r){ 
								$("#fstate").val(0);
							});
						}
						else{
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
//是否收集信息点击事件   刘一男 20161117新增
function needCollected(checked){
	if(checked){
		$(".showHiddenTag").css("display","");
		Util.setValueSwitch("#FCollectType",'$gamemap.fcollecttype}');
		//展示活动
		$("#FSaleActivityID").combobox({
			editable:false,
			url : "saleactivity/getSaleActivityByUnitIDs.do?type=0&bargainid=0&real=0"
		});
	}else{
		$(".showHiddenTag").css("display","none");
	}
} 
//是否收集信息初始化   刘一男 20161117新增
/* function initCollected(){
	//如果选中是否收集信息，则查询活动
	if("${gamemap.fneedcollected}"==1){
		var type;
		var messagetype = $("#dispnone").val();
		if(messagetype==1){
			type=1;
		}else {
			type=0;
		}
		var bargainid=$("#url").val();
		//展示活动
		$("#FSaleActivityID").combobox({
			url : "saleactivity/getSaleActivityByUnitIDs.do?type="+type+"&bargainid="+bargainid+"&real=0",
			value : FSaleActivityID
		});
	} 
} */

//判断结束时间是否大于开始时间
function judgetime(){
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	var fcodeendtime=$("#FCodeEndTime").val();
	fbegintime = fbegintime.replace(/-/g,"/");
	fendtime = fendtime.replace(/-/g,"/");
	fcodeendtime = fcodeendtime.replace(/-/g,"/");
	var startdate = new Date(fbegintime);//开始时间
	var enddate = new Date(fendtime);//结束时间
	var codeEndDate = new Date(fcodeendtime);
	if(enddate<startdate){
		$.jbootmsg("结束日期必须大于开始日期！","error");
		$.messager.alert("提示", "结束日期必须大于开始日期！", "warning");
		$('#FEndTime').datetimebox('setValue',''); 
		return false;
	}
	if(codeEndDate<enddate){
		$.messager.alert("提示", "兑换码截止日期不能小于结束日期！", "warning");
		$('#FCodeEndTime').datetimebox('setValue','');
		return false;
	}
	return true;
}

//判断兑奖结束时间是否大于开始时间
function judgetimes(fbegincashtime,fendcashtime){
	fbegincashtime = fbegincashtime.replace(/-/g,"/");
	fendcashtime = fendcashtime.replace(/-/g,"/");
	var startdate = new Date(fbegincashtime);//开始时间
	var enddate = new Date(fendcashtime);//结束时间
	if(enddate<startdate){
		$.messager.alert("提示", "截止兑奖日期必须大于开始兑奖日期", "warning");
		$('#FEndCashTime').datetimebox('setValue',''); 
		return false;
	}
	return true;
}