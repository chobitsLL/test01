//初始化市的选项 isFirst=true表示将市的旧值还原到选项上
function initCity(oldProvince,isFirst){
	/*$("#FCity").combobox("clear");*/
	$("#FCity").combobox({
		editable:false,
		valueField: 'fwxcity',    
	    textField: 'fwxcity', 
        url : "select/selectWXArea.do?type=2&key="+oldProvince	
	}); 
}
function checkstate(n) {
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
   		 if(validateThree()){//validateThree()
   			checkimg(state);
	   		 $("#prev").show();
			 $("#next").show();
    	 }else{
    		 return $("#state").val();
    	 }	 
	 }else if(state==4){
		 if(typeid==8||typeid==9||typeid==11){
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
	 }
	 $("#state").val(state);
	 return $("#state").val();//state;
}
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
	//判断结束时间是否大于开始时间
    var time = judgetime(fbegintime,fendtime);
	if(!time){
		return false;
	}
	/*var fcodeendtime=$('#FCodeEndTime').val();
	if(fcodeendtime==""){
		$.messager.alert("提示", "购买截止日期不能为空！", "warning");
		return false;
	}
	if(fcodeendtime<fendtime){
		$.messager.alert("提示", "购买截止日期不能早于结束时间！", "warning");
		return false;
	}*/
	if(typeid<4){
		//如果选中了收集信息则验证
		var fneedcollected=Util.getValueSwitch("#FNeedCollected");
		var fsaleactivityid = $("#FSaleActivityID").val();
		if(fneedcollected){
			if(fsaleactivityid==""){
				$.messager.alert("提示", "请选择信息收集设置！", "warning");
				return false;
			}
		}
	}
	if(fname&&fbegintime&&fendtime){
		return true;
	}
	return true;
}
	

function validateThree(){//第二页验证信息
	if(typeid==8||typeid==9||typeid==11){
		var fkeyword = $('#FKeyWord').val();
		if(fkeyword==""){
			$.messager.alert("提示", "关键字不能为空！", "warning");
			return false;
		}
		var factivitytotalamount = $('#FActivityTotalAmount').val();
		if(factivitytotalamount==""){
			$.messager.alert("提示", "活动总金额不能为空！", "warning");
			return false;
		}
		var ftotalamount = $('#FTotalAmount').val();
		if(ftotalamount==""){
			$.messager.alert("提示", "红包金额不能为空！", "warning");
			return false;
		}
		if(typeid==8){
			if(ftotalamount<3||ftotalamount>1000){
				$.messager.alert("提示", "每个红包金额必须大于3元，小于等于1000元！", "warning");
				return false;
			}
		}
		if(typeid==9||typeid==11){
			if(ftotalamount<1||ftotalamount>1000){
				$.messager.alert("提示", "每个红包金额必须大于1元，小于等于1000元！", "warning");
				return false;
			}
		}
		var ftotalnum = $('#FTotalNum').val();
		if(ftotalnum==""){
			$.messager.alert("提示", "分裂次数不能为空！", "warning");
			return false;
		}
		if(ftotalnum<3){
			$.messager.alert("提示", "分裂次数不能小于3！", "warning");
			return false;
		}
		var fautoreplyurl = $('#FAutoReplyUrl').val();
		if(fautoreplyurl==""){
			$.messager.alert("提示", "自动回复图片不能为空！", "warning");
			return false;
		}
		var fwishing = $('#FWishing').val();
		if(fwishing==""){
			$.messager.alert("提示", "红包祝福语不能为空！", "warning");
			return false;
		}
		var fpassword=$('#FPassword').val();
		if (fpassword==""){
			$.messager.alert("提示", "个性口令不能为空！", "warning");
			return false;
		}
		var count = ftotalamount/ftotalnum;
		if(count<1){
			$.messager.alert("提示", "红包金额/分裂次数 必须大于等于1元！", "warning");
			return false;
		}
		var fcontrolarea=Util.getValueSwitch("#FControlArea");
		if(fcontrolarea){
			fcontrolarea=1;
		}else{
			fcontrolarea=0;
		}
		var fprovince = $("#FProvince").val();
		if(fcontrolarea==1){
			if(fprovince==""){
				$.messager.alert("提示", "省不能为空！", "warning");
				return false;
			}
		}
		if(fkeyword&&factivitytotalamount&&ftotalamount&&ftotalnum&&fwishing&&fpassword){
			return true;;
		}
	}else{
		var fkeyword = $('#FKeyWord').val();
		if(fkeyword==""){
			$.messager.alert("提示", "关键字不能为空！", "warning");
			return false;
		}
		var fmaxplayers = $('#FMaxPlayers').val();
		if(fmaxplayers==""){
			$.messager.alert("提示", "参与人数上限不能为空！", "warning");
			return false;
		}
		var fplayergamelimit = $('#FPlayerGameLimit').val();
		if(fplayergamelimit==""){
			$.messager.alert("提示", "每人最大参与次数不能为空！", "warning");
			return false;
		}
		var fplayerdaylimit = $('#FPlayerDayLimit').val();
		if(fplayerdaylimit==""){
			$.messager.alert("提示", "每人每天最大参与次数不能为空！", "warning");
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
		var fpassword=$('#FPassword').val();
		if (fpassword==""){
			$.messager.alert("提示", "个性口令不能为空！", "warning");
			return false;
		}
		var fcontrolarea=Util.getValueSwitch("#FControlArea");
		if(fcontrolarea){
			fcontrolarea=1;
		}else{
			fcontrolarea=0;
		}
		var fprovince = $("#FProvince").val();
		if(fcontrolarea==1){
			if(fprovince==""){
				$.messager.alert("提示", "省不能为空！", "warning");
				return false;
			}
		}
		if(fkeyword&&fmaxplayers&&fplayergamelimit&&fplayerdaylimit&&fautoreplyurl&&fwishing){
			return true;;
		}
	}
	return true;
}
/*王文樟 20161108新增*/
function needCollected(checked){
	if(checked){
		$(".showHiddenTag").css("display","");
		Util.setValueSwitch("#FCollectType",'$gamemap.fcollecttype}');
		//展示活动
		$("#FSaleActivityID").combobox({
			url : "saleactivity/getSaleActivityByUnitIDs.do?type=0&bargainid=0&real=0"
		});
	}else{
		$(".showHiddenTag").css("display","none");
	}
}
//如果选中是否收集信息，则查询活动
if("${gamemap.fneedcollected}"==1){
	//展示活动
	$("#FSaleActivityID").combobox({
		url : "saleactivity/getSaleActivityByUnitIDs.do?type=0&bargainid=0&real=0"
	});
	setTimeout(function(){
		$("#FSaleActivityID").combobox('setValue',"${gamemap.factivityid}");
	},2500);
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
	//var typeid = GetQueryString("typeID");//获取当前路径的参数值
	var fname=$('#FName').val();
	if(typeid==8||typeid==9||typeid==11){
		var foaid=$('#FOAID').val();
		var factivitytotalamount = $('#FActivityTotalAmount').val();
		var ftotalamount = $('#FTotalAmount').val();
		var ftotalnum = $('#FTotalNum').val();
	    var fpersonformation=Util.getValueSwitch("#FPersonFormation");
	    if(fpersonformation){
	    	fpersonformation=1;
	    }else{
	    	fpersonformation=0;
	    }
	}
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	/*var fcodeendtime=$('#FCodeEndTime').val();*/
	var fhint = $('#FHint').val();//split("\n").join("<br />")
	var fkeyword = $('#FKeyWord').val();
	var fpassword=$('#FPassword').val();
	var fwishing = $('#FWishing').val();
	var fautoreplyurl = $("#FAutoReplyUrl").val();
	var fsharetitle = $("#FShareTitle").val();
	var fsharelinkurl = $("#FShareLinkUrl").val();
	var fshareimgurl = $("#FShareImgUrl").val();
	var fsharedescription = $("#FShareDescription").val();
	var fadimg = $('#FAdImg').val();
	var fadurl1 = $('.dayo-input-link-ad');
	var fadurl = "";
	for(var i=0;i<fadurl1.length;i++){
		fadurl+="@@@"+$(fadurl1[i]).val();
	}
	fadurl = fadurl.substring(3);
	var fcontrolarea=Util.getValueSwitch("#FControlArea");
	if(fcontrolarea){
		fcontrolarea=1;
	}else{
		fcontrolarea=0;
	}
	var fprovince = $("#FProvince").val();
	var fcity = $("#FCity").val();
	var ffollow=Util.getValueSwitch("#FFollow");
	if(ffollow){
		ffollow=1;
	}else{
		ffollow=0;
	}
	if(typeid!=8&&typeid!=9&&typeid!=11){
		var fmaxplayers = $('#FMaxPlayers').val();
		var fplayergamelimit = $('#FPlayerGameLimit').val();
		var fplayerdaylimit = $('#FPlayerDayLimit').val();
		var fshowprize=Util.getValueSwitch("#FShowPrize");
		if(fshowprize){
			fshowprize=1;
		}else{
			fshowprize=0;
		}
		var fshowwinner=Util.getValueSwitch("#FShowWinner");
		if(fshowwinner){
			fshowwinner=1;
		}else{
			fshowwinner=0;
		}
	}
	var data={};
	data["FName"]=fname;
	if(typeid==8||typeid==9||typeid==11){
		data["FOAID"]=foaid;
		data["FActivityTotalAmount"]=factivitytotalamount;
		data["FTotalAmount"]=ftotalamount;
		data["FTotalNum"]=ftotalnum;
		data["FPersonFormation"]=fpersonformation;
	}
	data["FControlArea"]=fcontrolarea;
	data["FProvince"]=fprovince;
	data["FCity"]=fcity;
	data["FBeginTime"]=fbegintime;
	data["FEndTime"]=fendtime;
/*	data["FCodeEndTime"]=fcodeendtime;*/
	data["FHint"]=fhint;
	data["FKeyWord"]=fkeyword;
	if(typeid!=8&&typeid!=9&&typeid!=11){
		data["FMaxPlayers"]=fmaxplayers;
		data["FPlayerGameLimit"]=fplayergamelimit;
		data["FPlayerDayLimit"]=fplayerdaylimit;
		data["FShowPrize"]=fshowprize;
		data["FShowWinner"]=fshowwinner;
	}
	data["FGameTypeID"]=typeid;//在修改时暂时分支处理 lzy160313
	data["FPassword"]=fpassword;
	data["FWishing"]=fwishing;
	data["FAutoReplyUrl"]=fautoreplyurl;
	data["FShareTitle"]=fsharetitle;
	data["FShareLinkUrl"]=fsharelinkurl;
	data["FShareImgUrl"]=fshareimgurl;
	data["FShareDescription"]=fsharedescription;
	data["FAdImg"]=fadimg;
	data["FUrl"]=fadurl;
	data["FFollow"]=ffollow;
	//砸金蛋、抢红包、刮刮乐、制月饼、包粽子、猜猜猜
	if(typeid<4||typeid==12||typeid==13||typeid==14||typeid==15){
		var fneedcollected=Util.getValueSwitch("#FNeedCollected");
		var fcollecttype=Util.getValueSwitch("#FCollectType");
		if(fneedcollected){
			data["FNeedCollected"]=1;
			if(fcollecttype){
				data["FCollectType"]=1;
			}else{
				data["FCollectType"]=0;
			}
			var fid = $("#FSaleActivityID").val();
			data["FActivityID"]=fid;
		}else{
			data["FNeedCollected"]=0;
			data["FCollectType"]=0;
			data["FActivityID"]=0;
		}
	}
	if(typeid!=8&&typeid!=9&&typeid!=11){
		// 处理演示页面的奖项
		var data_prize = accordion.getValue();
		//initPrizeInfo(data_prize);
		
		var dat={
				jsonobj:JSON.stringify(data),
				accordion:JSON.stringify(data_prize)
			};
	}else{
		var dat={
				jsonobj:JSON.stringify(data),
			};
	}
	var gameid=$("#url").val();//判断新增修改
	var result=false;
	console.log(JSON.stringify(data))
	if(gameid.length>0){
		if(typeid==8||typeid==9||typeid==11){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:"game/updateRedGame.do?gameid="+gameid+"&typeID="+typeid,
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
						$.messager.alert("提示", "修改失败！", "warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.progress("close");//隐藏加载中
					result=false;
					$.messager.alert("提示", "修改失败！", "warning");
				}
			});
		}else{
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
						$.messager.alert("提示", "修改失败！", "warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.progress("close");//隐藏加载中
					result=false;
					$.messager.alert("提示", "修改失败！", "warning");
				}
			});
		}
	}else{
		if(typeid==8||typeid==9||typeid==11){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:"game/addRedGame.do?typeID="+typeid,
				dataType : "json",
				data:dat,
				async:false,
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if (data.result) {
						$("#url").val(data.gameid);
						result=true;
						$.messager.confirm('确认','添加成功',function(r){ 
							if(r){	
								$("#releaseedstate").val(0);
							}
						});
					}else{
						result=false;
						$.messager.alert("提示", "添加失败！", "warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.progress("close");//隐藏加载中
					result=false;
					$.messager.alert("提示", "添加成功！", "warning");
				}
			});
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
							if(r){
								$("#releaseedstate").val(0);
							}
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
			});
		}
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
								if(r){
									$("#releaseedstate").val(0);
								}
							});
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