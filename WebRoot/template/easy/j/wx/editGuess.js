//初始化市的选项 isFirst=true表示将市的旧值还原到选项上
function initCity(oldProvince,isFirst){
	$("#FCity").combobox("clear");
	$("#FCity").combobox({
		editable:false,
		valueField: 'fwxcity',    
	    textField: 'fwxcity', 
        url : "select/selectWXArea.do?type=2&key="+oldProvince	
	}); 
}

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

function checkimg(state){
	if(state==1){
		$("#img1").css("display","");
		$("#img2").css("display","none");
		$("#img3").css("display","none");
		$("#img4").css("display","none");
		$("#img5").css("display","none");
	}else if(state==2){
		$("#img1").css("display","none");
		$("#img2").css("display","");
		$("#img3").css("display","none");
		$("#img4").css("display","none");
		$("#img5").css("display","none");
	}else if(state==3){
		$("#img1").css("display","none");
		$("#img2").css("display","none");
		$("#img3").show();
		$("#img4").css("display","none");
		$("#img5").css("display","none");
	}else if(state==4){
		$("#img1").css("display","none");
		$("#img2").css("display","none");
		$("#img3").css("display","none");
		$("#img4").css("display","");
		$("#img5").css("display","none");
	}else if(state==5){
		$("#img1").css("display","none");
		$("#img2").css("display","none");
		$("#img3").css("display","none");
		$("#img4").css("display","none");
		$("#img5").css("display","");
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
		 if(validateSecond()){//validateSecond()
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
			group.p_group.accordion("resize");
	   	 }else{
	   		 return $("#state").val();
	   	 }	
	 }else if(state==4){
		 if(!group.isEmpty()){//
  			if(group.checkDate()){//
  			checkimg(state);
	   		$("#prev").show();
			$("#next").show();
	   	 }else{
	   		 return $("#state").val();
	   	 }	
   	 }else{
   		 return $("#state").val();
   	 }	
	 }else if(state==5){
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
function validateSecond(){//第一页验证信息
	var fname=$('#FName').val();
	if(fname==""){
		$.messager.alert("提示", "活动名称不能为空！", "warning");
		return false;
	}
	var foaid=$('#FOAID').val();
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
	if(fname&&fbegintime&&fendtime&&foaid){
		return true;
	}
	return true;
}

function validateThree(){//第二页验证信息
	var finitquanty = $('#FInitQuanty').val();
	if(finitquanty==""){
		$.messager.alert("提示", "参与人初始金币不能为空！", "warning");
		return false;
	}
	var fgivequanty = $('#FGiveQuanty').val();
	if(fgivequanty==""){
		$.messager.alert("提示", "每次赠送最大金币数不能为空！", "warning");
		return false;
	}
	var fgivecount = $('#FGiveCount').val();
	if(fgivecount==""){
		$.messager.alert("提示", "金币赠送次数不能为空！", "warning");
		return false;
	}
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
	var fadimg = $('#FAdImg').val();
	if(fadimg.length==""){
		$.messager.alert("提示", "广告图片不能为空！", "warning");
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
	if(fkeyword&&fmaxplayers&&fautoreplyurl){
		return true;;
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
//点击第三个下一步的时候 添加数据
function addgame(){
	var typeid = $("#typeid").val();
	var fname=$('#FName').val();
	var foaid=$('#FOAID').val();
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	var fhint = $('#FHint').val();//split("\n").join("<br />")
	var fexchangeinfo = $('#FExchangeInfo').val();
	var finitquanty = $('#FInitQuanty').val();
	var fgivequanty = $('#FGiveQuanty').val();
	var fgivecount = $('#FGiveCount').val();
	var fkeyword = $('#FKeyWord').val();
	var fmaxplayers = $('#FMaxPlayers').val();
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
	//显示排名
	var fshowtop=Util.getValueSwitch("#FShowTop");
	if(fshowtop){
		fshowtop=1;
	}else{
		fshowtop=0;
	}
	var fcanmessage=Util.getValueSwitch("#FCanMessage");
	if(fcanmessage){
		fcanmessage=1;
	}else{
		fcanmessage=0;
	}
	//是否显示留言
	var fshowmessage=Util.getValueSwitch("#FShowMessage");
	if(fshowmessage){
		fshowmessage=1;
	}else{
		fshowmessage=0;
	}
	var fautoreplyurl = $("#FAutoReplyUrl").val();
	var fwishing = $('#FWishing').val();
	var fadimg = $('#FAdImg').val();
	var fadurl1 = $('.dayo-input-link-ad');
	var fadurl = "";
	for(var i=0;i<fadurl1.length;i++){
		fadurl+="@@@"+$(fadurl1[i]).val();
	}
	fadurl = fadurl.substring(3);
	var fsharetitle = $("#FShareTitle").val();
	var fsharelinkurl = $("#FShareLinkUrl").val();
	var fshareimgurl = $("#FShareImgUrl").val();
	var fsharedescription = $("#FShareDescription").val();
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
	var data={};
	data["FName"]=fname;
	data["FOAID"]=foaid;
	data["FBeginTime"]=fbegintime;
	data["FEndTime"]=fendtime;
	data["FHint"]=fhint;
	data["FExchangeInfo"]=fexchangeinfo;
	data["FInitQuanty"]=finitquanty;
	data["FGiveQuanty"]=fgivequanty;
	data["FGiveCount"]=fgivecount;
	data["FKeyWord"]=fkeyword;
	data["FMaxPlayers"]=fmaxplayers;
	data["FShowPrize"]=fshowprize;
	data["FShowWinner"]=fshowwinner;
	data["FShowTop"]=fshowtop;
	data["FCanMessage"]=fcanmessage;
	data["FShowMessage"]=fshowmessage;
	data["FAutoReplyUrl"]=fautoreplyurl;
	data["FWishing"]=fwishing;
	data["FAdImgURL"]=fadimg;
	data["FAdLinkURL"]=fadurl;
	data["FShareTitle"]=fsharetitle;
	data["FShareLinkUrl"]=fsharelinkurl;
	data["FShareImgUrl"]=fshareimgurl;
	data["FShareDescription"]=fsharedescription;
	data["FControlArea"]=fcontrolarea;
	data["FProvince"]=fprovince;
	data["FCity"]=fcity;
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
	
	if(typeid==14){
		// 处理演示页面的奖项
		var data_prize = accordion.getValue();
		//initPrizeInfo(data_prize);
		var data_group = group.getValue();
		
		//王文樟新增主题风格
		var fthemetype = $("#FThemeType").val();
		data["FThemeType"]=fthemetype;
		if(fthemetype>0){
			data["FThemeImgURL"]="img/topthis"+fthemetype+".jpg;img/botthis"+fthemetype+".jpg";
		}else{
			data["FThemeImgURL"]="img/topthis.jpg;img/botthis.jpg";
		}
		var dat={
				jsonobj:JSON.stringify(data),
				accordion:JSON.stringify(data_prize),
				group:JSON.stringify(data_group)
			};
		var isnotBeginAndEnd = 0;
		$.each(data_group.updated,function(n,value){
			var begin = returnDate(fbegintime);
			var end = returnDate(fendtime);
			var begintime = returnDate(value.fbegintime);
			var endtime = returnDate(value.fendtime);
			if(begin.length<14){
				begin+='00';
			}
			if(end.length<14){
				end+='00';
			}
			if(begintime.length<14){
				begintime+='00';
			}
			if(endtime.length<14){
				endtime+='00';
			}
			if(!(begintime>=begin && begintime<=end && endtime<=end && endtime>=begin)){
				isnotBeginAndEnd++;
				return;
			}
		})
		if(isnotBeginAndEnd>0){
			$.messager.alert("提示", "问题组时间不在活动开始及结束时间之内，请核实后再提交！", "warning");
			return;
		}
	}else if(typeid!=8&&typeid!=9&&typeid!=11){
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
						$.messager.alert("提示", "修改成功！", "info");
					}else{
						result=false;
						$.messager.alert("提示", data.msg, "warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					result=false;
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "修改失败！", "warning")
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
						$.messager.alert("提示", "添加成功！", "info")
						$("#releaseedstate").val(0);
						
					}else{
						result=false;
						$.messager.alert("提示", "添加失败！", "warning")
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					result=false;
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "添加失败！", "warning")
				}
			});
		}
	return result;
};

//发布按钮
function releaseed(){
	var fstate=$("#releaseedstate").val();
	if(fstate==1){
		$.messager.alert("提示", "数据已发布，点击按钮！", "warning")
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
							$.messager.alert("提示", "发布成功！", "info")
							$("#releaseedstate").val(0);
						}
						else{
							$.messager.alert("提示", "发布失败！", "warning")
							$("#releaseedstate").val(1);
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载中
						$.messager.alert("提示", "请求出错！", "warning")
					}
				 });
			}else{
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "没有生成二维码不能发布游戏活动！", "warning")
				return false;
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning")
			$("#releaseedstate").val(0);
		}
	 });
}
function returnDate(time){
	return time.replace(" ","").replace("-","").replace("-","").replace(":","").replace(":","")
}