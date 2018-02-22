//复制链接方法
function copyUrl(){
	var row = $("#easy_table").datagrid("getSelected");
	if(row==null){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return false;
	}
	$("#dialogid").dialog().dialog("open");
	$("#linkUrl").empty();
	var fqrcodeurl=row.fqrcodeurl;
	var url = $("#pathid").val()+"select/qr.do?content="+fqrcodeurl+"&w=140";
	$("#linkUrl").html(url);
}

//预览二维码方法
function selectCodeUrl(){
	var row = $("#easy_table").datagrid("getSelected");
	if(row==null){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return false;
	}
	$("#selectCode").dialog().dialog("open");
	$("#img").attr("src","");
	var fqrcodeurl=row.fqrcodeurl;
	$("#img").attr("src","select/qr.do?content="+fqrcodeurl+"&w=140");
}
//展示自定义广告富文本
function showADEditor(obj){
	//头部广告
	var tagID = "-footer";
	var title = "详情尾部广告";
	if(obj=="FHeaderAD"){
		tagID = "-header";
		title = "详情头部广告";
	}
	$("#addialogid").dialog({
		title:title,
		buttons:[{text:'确定',handler:function(){
			headerorfootorAD(obj,tagID);
		}},{text:'取消',handler:function()
		 {$('#addialogid').dialog('close')}}
		]
	});
	$("#addialogid").dialog().dialog("open");
	var ue = UE.getEditor('editor');
	ue.ready(function(){
		//$("iframe[id*=editor"+(tagID=="-header"?"_0":"_1")+"]").contents().find("body").html($("#"+obj).val());//UE.getEditor('editor'+tagID).setContent($("#"+id).val());
		$("iframe[id*=ueditor]").contents().find("body").html($("#"+obj).val());
	});
	$("#btn-desc").jeasyupload({
		multiple:true,
		url:"upload_richtext_multiple_json.do",
		btn:$("#btn-desc"),
		parent:$("#desc-img"),
		customImg:function(i,file,o){
			var img = "<img class='contentING' style='width:100%;' src='"+file["url"]+"'/>";
			UE.getEditor('editor').setContent(img, true);
		}
	});
}
function headerorfootorAD(id,tagID){
	var content = UE.getEditor('editor').getContent();
	//去除换行及空标签
	content = content.replace(/<p><br\/><\/p>/g,"").replace(/<br\/>/g,"");
	$("#"+id).textbox('setValue',content);
	$('#addialogid').dialog('close');
}
//判断折中价是否低于最低价
function checkCompromisePrice(){
	if($("#FCompromisePrice").val()==0 || $("#FCompromisePrice").val()==""){
		return true;
	}else{
		if($("#FCompromisePrice").val()>=0 && $("#FBuyCondition").val()==1){
			if($("#FCompromisePrice").val()<=$("#FStockLimitPrice").val()){
				$.messager.alert("提示", "折中价价格不应低于或者等于底线价格！", "warning");
				return false;
			}
		}	
	}
	return true;
}
//新增企业团购阶梯价格
function addInputTag(obj){
	var clone = $(obj).parent().clone();
	clone.find(".groupMemberNum").val("");
	clone.find(".groupMoney").val("");
	clone.find(".groupMoneyOrder").html($(".groupMoneyOrder").size()+1);
	clone.find(".groupMoneyOrder").parents(".compatantGroupMoney").attr("order",clone.find(".groupMoneyOrder").html()+1);
	$(obj).parent().after(clone);
	resetOrder();
}
//删除企业团购阶梯价格
function deleteInputTag(obj){
	if($(".compatantGroupMoney").size()>1){
		$(obj).parent().remove();
		resetOrder();
	}else{
		$.messager.alert("提示", "第1阶梯的团购价格不能删除！", "warning");
	}
}
//重新排序
function resetOrder(){
	$(".compatantGroupMoney").each(function(n,value){
		$(this).find(".groupMoneyOrder").html(n+1);
		$(this).attr("order",n+1);
	});
}

//校验团购输入的规则
function checkInput(oInput,type){
		//团购人数
	var preorder=$(oInput).parent(".compatantGroupMoney").attr("order");
	var compatantGroupMoney=$(".compatantGroupMoney");
	var prevalue=$(oInput).val();
	if(compatantGroupMoney.length<1||prevalue==""){return false;}
	$(compatantGroupMoney).each(function(n,v){
		var order=$(this).attr("order");
		if(order!=preorder){
			var groupvalue=0;
			if(type){
				groupvalue=$(this).find(".groupMemberNum").val();
				if(order<preorder&&parseFloat(groupvalue-prevalue)>=0){
					$(oInput).val("");
					$.messager.alert("提示", "当前团购人数不能小于等于阶梯"+order+"的团购人数", "warning");
					return false;
				}
				if(order>preorder&&parseFloat(groupvalue-prevalue)<=0){
					$(oInput).val("");
					$.messager.alert("提示", "当前团购人数不能大于等于阶梯"+order+"的团购人数", "warning");
					return false;
				}
			}else{
				groupvalue=$(this).find(".groupMoney").val();
				if(order<preorder&&parseFloat(groupvalue-prevalue)<=0){
					$(oInput).val("");
					$.messager.alert("提示", "当前团购金额不能大于等于阶梯"+order+"的团购金额", "warning");
					return false;
				}
				if(order>preorder&&parseFloat(groupvalue-prevalue)>=0){
					$(oInput).val("");
					$.messager.alert("提示", "当前团购金额不能小于等于阶梯"+order+"的团购金额", "warning");
					return false;
				}
			}
		}
	});
}
//键盘输入事件
function CheckInputIntFloat(oInput,type){ 
	if(type){
		if (oInput.value.length == 1) {
			oInput.value = oInput.value.replace(/[^1-9]/g, '');
		} else {
			oInput.value = oInput.value.replace(/[^0-9]/g, '');
		}
	}else{
		if (oInput.value.length == 1) {
			oInput.value = oInput.value.replace(/[^0-9]/g, '');
		} else {
			//oInput.value = oInput.value.replace(/\D/g, '');
			oInput.value = oInput.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
			oInput.value = oInput.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.
			oInput.value = oInput.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.
			oInput.value = oInput.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			oInput.value=oInput.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数
		}
	}
}
//初始化市的选项 isFirst=true表示将市的旧值还原到选项上
function initCity(oldProvince,isFirst){
//	$("#FCity").combobox("clear");
	$("#FCity").combobox({
		valueField: 'fwxcity',    
	    textField: 'fwxcity', 
        url : "select/selectWXArea.do?type=2&key="+oldProvince	
	}); 
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
//上一页下一页
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
		$("#save").hide();
		$("#update").hide();
		$("#confirm").hide();
	}else if(state==2){
		if(validateSecond()){//
			checkimg(state);
			$("#prev").show();
			$("#next").show();
			$("#save").hide();
			$("#update").hide();
			$("#confirm").hide();
		}else{
			return $("#state").val();
		}
	}else if(state==3){
   		if(validateThree()){//
   			checkimg(state);
	   		$("#prev").show();
			$("#next").show();
			$("#save").hide();
			$("#update").hide();
			$("#confirm").hide();
    	}else{
    		return $("#state").val();
    	}	
	 }else if(state==4){
		if(validateBargain()){//
			checkimg(state);
			$("#next").hide();
			$("#prev").show();
			$("#save").show();
			$("#update").hide();
			$("#confirm").hide();
	 	}else{
			return $("#state").val();
		}
	 }
	 $("#state").val(state);
	 return $("#state").val();//state;
}
/*王文樟 20161108新增*/
function needCollected(checked){
	if(checked){
		$(".showHiddenTag").css("display","");
		Util.setValueSwitch("#FCollectType",'$bargainmap.fcollecttype}');
		//展示活动
		$("#FSaleActivityID").combobox({
			url : "saleactivity/getSaleActivityByUnitIDs.do?type=0&bargainid=0&real=0"
		});
	}else{
		$(".showHiddenTag").css("display","none");
	}
}
//如果选中是否收集信息，则查询活动
if("${bargainmap.fneedcollected}"==1){
	//展示活动
	$("#FSaleActivityID").combobox({
		url : "saleactivity/getSaleActivityByUnitIDs.do?type=0&bargainid=0&real=0"
	});
	setTimeout(function(){
		$("#FSaleActivityID").combobox('setValue',"${bargainmap.factivityid}");
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
function validateSecond(){//第一页验证信息
	var fname=$("#FName").val();
	if(fname==""){
		$.messager.alert("提示", "活动名称不能为空！", "warning");
	return false;
	}
	var fkeyword="";
	if(typeid!=17){
		fkeyword=$("#FKeyword").val();
		if(fkeyword==""){
			$.messager.alert("提示", "活动关键词不能为空！", "warning");
			return false;
		}
	}else{
		fkeyword=$("#gameKeyWords").val();
	if(fkeyword==""){
		$.messager.alert("提示", "活动关键词不能为空！", "warning");
	return false;
	}
		if(fkeyword==2){
			if($("#fkeywords").val()==""){
				$.messager.alert("提示", "自定义活动关键词不能为空！", "warning");
				return false;
			}
		}
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
	var fbuyendtime=$('#FBuyEndTime').val();
	if(fbuyendtime==""){
		$.messager.alert("提示", "购买截止日期不能为空！", "warning");
		return false;
	}
	if(fbuyendtime<fendtime){
		$.messager.alert("提示", "购买截止日期不能早于结束时间！", "warning");
		return false;
	}
	var fcontrolarea=Util.getValueSwitch("#FControlArea");
	if(fcontrolarea){
		var fprovince = $("#FProvince").val();
		if(fprovince==""){
			$.messager.alert("提示", "省不能为空！", "warning");
			return false;
		}
	}
	//团购
	if(typeid==10002){
		var groupBuyingType = $("#FGroupBuyingType").val();
		if(groupBuyingType==""){
			groupBuyingType=0;
		}
		if(groupBuyingType==0){//个人团
			if($("#FCreateMemberNum").val()==""){
				$.messager.alert("提示", "成团人数不能为空！", "warning");
				return false;
			}
		}else if(groupBuyingType==1){//企业团
			$(".compatantGroupMoney").each(function(n,value){
				//团购人数
				var groupMemberNum = $(this).find(".groupMemberNum");
				//团购金额
				var groupMoney = $(this).find(".groupMoney");
				if(groupMemberNum==""){
					$.messager.alert("提示", "第"+(n+1)+"阶梯【团购人数】不能为空！", "warning");
					return false;
				}
				if(groupMoney==""){
					$.messager.alert("提示", "第"+(n+1)+"阶梯【团购金额】不能为空！", "warning");
					return false;
				}
			})
		}
	}
	if(fbegintime&&fendtime){
		return true;
	}
	return true;
}
function validateThree(){//第二页验证信息
	var fstockname = $('#FStockName').val();
	if(fstockname==""){
		$.messager.alert("提示", "商品名称不能为空！", "warning");
		return false;
	}
	var fstockimg=$('#FStockImg').val();
	if(fstockimg.length==0){
		$.messager.alert("提示", "商品图片不能为空！", "warning");
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
	var fstockprice = $('#FStockPrice').val();
	if(fstockprice==""){
		$.messager.alert("提示", "商品原价不能为空！", "warning");
		return false;
	}
	var fstockquanty = $('#FStockQuanty').val();
	if(fstockquanty==""){
		$.messager.alert("提示", "商品数量不能为空！", "warning");
		return false;
	}
	return true;
}
function validateBargain(){//第三页验证信息
	var fstockprice = $('#FStockPrice').val();//商品原价
	var fstocklimitprice = $('#FStockLimitPrice').val();//底线价格
	var limit = "底线价格";
	var helpCount = "帮砍次数";
	if(typeid==10002){
		limit = "团购价格";
		helpCount = "参团次数";
	}
	if(typeid!=10002||($("#FGroupBuyingType").val()==0&&typeid==10002)){
		if(fstocklimitprice==""){
			$.messager.alert("提示", limit+"不能为空！", "warning");
			return false;
		}else if(parseInt(fstocklimitprice)>=parseInt(fstockprice)){
			$.messager.alert("提示", limit+"应小于商品原价！", "warning");
			return false;
		}
	}
	var fsuccesschance = $('#FSuccessChance').val();
	if(typeid!=10002){
		if(fsuccesschance==""){
			$.messager.alert("提示", "砍价成功率不能为空！", "warning");
			return false;
		}else if(fsuccesschance<=0){
			$.messager.alert("提示", "砍价成功率应大于0！", "warning");
			return false;
		}
		var fsuccesslowamount = Number($('#FSuccessLowAmount').val());
		if(fsuccesslowamount.length==0||$('#FSuccessLowAmount').val()==""){
			$.messager.alert("提示", "砍价范围的最小值不能为空", "warning");
			return false;
		}
		
		var fsuccesshighamount = Number($('#FSuccessHighAmount').val());
		if(fsuccesshighamount.length==0||$('#FSuccessHighAmount').val()==""){
			$.jbootmsg("");
			$.messager.alert("提示", "砍价范围的最大值不能为空！", "warning");
			return false;
		}
		if(fsuccesschance==0){
			if(fsuccesslowamount>0){
				$.messager.alert("提示", "成功率等于0时,砍价范围的最小值应等于0！", "warning");
				$('#FSuccessLowAmount').val(0);
				return false;
			}
			if(fsuccesshighamount>0){
				$.messager.alert("提示", "成功率等于0时,砍价范围的最大值应等于0！", "warning");
				$('#FSuccessHighAmount').val(0);
				return false;
			}
		}
		if(fsuccesschance>0){
			if(fsuccesslowamount<=0){
				$.messager.alert("提示", "成功率大于0时,砍价范围的最小值应大于0！", "warning");
				return false;
			}
			if(fsuccesslowamount>fsuccesshighamount){
				$.messager.alert("提示", "砍价范围的最大值不应小于最小值！", "warning");
				return false;
			}
		}
		var ffaillowamount = Number($('#FFailLowAmount').val());
		if(ffaillowamount.length==0||$('#FFailLowAmount').val()==""){
			$.messager.alert("提示", "涨价范围的最小值不能为空！", "warning");
			return false;
		}
		
		var ffailhighamount = Number($('#FFailHighAmount').val());
		if(ffailhighamount.length==0||$('#FFailHighAmount').val()==""){
			$.messager.alert("提示", "涨价范围的最大值不能为空！", "warning");
			return false;
		}
		if(fsuccesschance<100){
			if(ffaillowamount<0){
				$.messager.alert("提示", "成功率小于100时,涨价范围的最小值应大于等于0！", "warning");
				return false;
			}
			if(ffaillowamount>ffailhighamount){
				$.messager.alert("提示", "涨价范围的最大值不应小于最小值！", "warning");
				return false;
			} 
		}
		if(fsuccesschance==100){
			if(ffaillowamount>0){
				$.messager.alert("提示", "成功率等于100时,涨价范围的最小值应等于0！", "warning");
				$('#FFailLowAmount').val(0);
				return false;
			}
			if(ffailhighamount>0){
				$.messager.alert("提示", "成功率等于100时,涨价范围的最大值应等于0", "warning");
				$('#FFailHighAmount').val(0);
				return false;
			}
		}
		if(fsuccesschance==0){
			if(ffaillowamount<=0){
				$.messager.alert("提示", "成功率等于0时,涨价范围的最小值应大于0！", "warning");
				return false;
			}
			if(ffaillowamount>ffailhighamount){
				$.messager.alert("提示", "涨价范围的最大值不应小于最小值！", "warning");
				return false;
			}
		}
		
	}
	if(typeid!=10002||($("#FGroupBuyingType").val()==0&&typeid==10002)){
		var fhelpcount = $('#FHelpCount').val();
		if(fhelpcount==""){
			$.messager.alert("提示", helpCount+"不能为空！", "warning");
			return false;
		}
		var FStockLimitPrice= $("#FStockLimitPrice").val();
		if(FStockLimitPrice==0 || FStockLimitPrice==0.00){
			$.messager.alert("提示",limit+"最低价不能为0！", "warning");
			return false;
		}
	}

	var price = checkCompromisePrice();
	if(!price){
		return false;
	}
	return true;
}
//点击保存按钮
function addbargain(){
	var fname=$('#FName').val();
	var fbegintime=$('#FBeginTime').val();
	var fendtime=$('#FEndTime').val();
	var fbuyendtime=$('#FBuyEndTime').val();
	var fkeyword ="";
	if(typeid==17){
		fkeyword = $('#gameKeyWords').val();
		if(fkeyword==""){
			fkeyword=0;
		}else if(fkeyword==0){
			fkeyword="砍价";
		}else if(fkeyword==1){
			fkeyword="测试砍价";
		}else if(fkeyword==2){
			fkeyword=$("#fkeywords").val();
		}
	}else{
		fkeyword = $('#FKeyword').val();
	}
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
	var fsubstockid=$('#FSubStockID').val();
	var fstockname=$('#FStockName').val();
	var fstockimg=$('#FStockImg').val();
	var stockurl=$('.dayo-input-link-stock');
	var fstockurl = "";
	for(var i=0;i<stockurl.length;i++){
		fstockurl+="@@@"+$(stockurl[i]).val();
	}
	fstockurl = fstockurl.substring(3);
	var fcodeusertype = $("#FCodeUseType").val();
	var fshowlimitprice = $("#FShowLimitPrice").val();
	var fshowlimitprice=Util.getValueSwitch("#FShowLimitPrice");//判断复选框是否被选中
    if(fshowlimitprice){
    	fshowlimitprice=1;
    }else{
    	fshowlimitprice=0;
    }
	var fshowremainquanty=Util.getValueSwitch("#FShowRemainQuanty");
    if(fshowremainquanty){
    	fshowremainquanty=1;
    }else{
    	fshowremainquanty=0;
    }
	var fstockprice = $('#FStockPrice').val();
	var fstockquanty = $('#FStockQuanty').val();
	var fstate = $("#fstate").val();
	if(fstate==1){
		var fstockquantys = $('#fstockquantys').val();//旧的商品数量
		var fremainquanty = $("#fremainquanty").val();//旧的商品剩余数量
		var bargainCount = fstockquantys - fremainquanty;//砍掉的数量
		fremainquanty=fstockquanty-bargainCount;//新的商品剩余数量 
	}
	var fpaytype = $("#FPayType").val();
	if(fpaytype==""){
		fpaytype=0;
	}
	var fstocklimitprice=$('#FStockLimitPrice').val();
	var fsuccesschance=$('#FSuccessChance').val();
	var fsuccesshighamount=$('#FSuccessHighAmount').val();
	var fsuccessLowamount=$('#FSuccessLowAmount').val();
	var ffailhighamount = $('#FFailHighAmount').val();
	var ffaillowamount = $('#FFailLowAmount').val();
	var fhelpcondition=0;
	var fbuycondition = $('#FBuyCondition').val();
	if(fbuycondition==""){
		fbuycondition=0;
	}
	var fdescription = $('#FDescription').val();
	var fautoreplyurl=$('#FAutoReplyUrl').val();
	var fwishing=$('#FWishing').val();
	var fcontrolarea=Util.getValueSwitch("#FControlArea");
    if(fcontrolarea){
    	fcontrolarea=1;
    }else{
    	fcontrolarea=0;
    }
	var fprovince = $("#FProvince").val();
	var fcity = $("#FCity").val();
	var fhelpcount = $("#FHelpCount").val();
	var data={};
	data["FName"]=fname;
	data["FBeginTime"]=fbegintime;
	data["FEndTime"]=fendtime;
	data["FBuyEndTime"]=fbuyendtime;
	data["FKeyword"]=fkeyword;
	data["FAdImg"]=fadimg;
	data["FAdURL"]=fadurl;
	data["FSubStockID"]=fsubstockid;
	data["FStockName"]=fstockname;
	data["FStockImg"]=fstockimg;
	data["FStockURL"]=fstockurl;
	data["FCodeUseType"]=fcodeusertype;
	data["FShowLimitPrice"]=fshowlimitprice;
	data["FShowRemainQuanty"]=fshowremainquanty;
	data["FStockPrice"]=fstockprice;
	data["FStockQuanty"]=fstockquanty;
	if(fstate==1){
		data["FRemainQuanty"]=fremainquanty;
	}else{
		data["FRemainQuanty"]=fstockquanty;
	}
	data["FPayType"]=fpaytype;
	data["FStockLimitPrice"]=fstocklimitprice;
	data["FSuccessChance"]=fsuccesschance;
	data["FSuccessHighAmount"]=fsuccesshighamount;
	data["FSuccessLowAmount"]=fsuccessLowamount;
	data["FFailHighAmount"]=ffailhighamount;
	data["FFailLowAmount"]=ffaillowamount;
	data["FHelpCondition"]=fhelpcondition;
	data["FBuyCondition"]=fbuycondition;
	data["FDescription"]=fdescription;
	data["FStoreID"]=$("#FStoreID").val(); // 记录店铺ID，用于在确认订单时查询兑换码
	data["FAutoReplyUrl"]=fautoreplyurl;
	data["FWishing"]=fwishing;
	data["FShareTitle"]=fsharetitle;
	data["FShareLinkUrl"]=fsharelinkurl;
	data["FShareImgUrl"]=fshareimgurl;
	data["FShareDescription"]=fsharedescription;
	data["FControlArea"]=fcontrolarea;
	data["FProvince"]=fprovince;
	data["FCity"]=fcity;
	data["FHelpCount"]=fhelpcount;
	var stoppaytime = typeof $("#FStopPayTime")[0];
	//旧砍价
	if(stoppaytime=="undefined"||$("#FStopPayTime").hasClass("hidden")){
		data["stoppaytime"]=0;
	}else{//新砍价
		data["stoppaytime"]=$("#FStopPayTime").val();
	}
	if(typeid==17){
		var fisavoidtitle=Util.getValueSwitch("#FIsAvoidTitle");
		if(fisavoidtitle){
			fisavoidtitle=1;
		}else{
			fisavoidtitle=0;
		}
		data["FIsAvoidTitle"]=fisavoidtitle;
		var fisalonestore=Util.getValueSwitch("#FIsAloneStore");
		if(fisalonestore){
			fisalonestore=1;
		}else{
			fisalonestore=0;
		}
		data["FIsAloneStore"]=fisalonestore;
		var fissubmitorder=Util.getValueSwitch("#FIsSubmitOrder");//判断是否不提交订单
	    if(fissubmitorder){
	    	fissubmitorder=1;
	    }else{
	    	fissubmitorder=0;
	    }
	    data["FIsSubmitOrder"]=fissubmitorder;
		data["FLimitPriceScale"]=$("#FLimitPriceScale").val();
	}
	data["oaid"]=$("#FOAID").val();
	//获取收集信息设置信息  新标签设计 刘一男 2016-11-17
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
	console.log("FNeedCollected:"+data["FNeedCollected"]);
	//王文樟新增团购参数设置
	if(typeid==10002){
		var groupBuyingType = $("#FGroupBuyingType").val();
		data["FGroupBuyingType"] = groupBuyingType;
		data["FCreateMemberNum"] = $("#FCreateMemberNum").val();
		//默认为不集赞
		data["FIsAssist"] = 0;
		//个人团且选中集赞
		data["FMaxHelpCount"] = $("#FMaxHelpCount").val();
		data["FHelpAmount"] = $("#FHelpAmount").val();
		data["FPrizeType"] = $("#FPrizeType").val();
		data["FHeaderAD"] = $("#FHeaderAD").val();
		data["FFooterAD"] = $("#FFooterAD").val();
		//团购类型:企业团
		if(groupBuyingType==1){
			var ladderMoney = new Array();
			$(".compatantGroupMoney").each(function(){
				var groupMoney = {};
				groupMoney["memberNum"] = $(this).find(".groupMemberNum").val();
				groupMoney["money"] = $(this).find(".groupMoney").val();
				ladderMoney.push(groupMoney);
			});
			data["FLadderMoney"] = JSON.stringify(ladderMoney);
		}
	}
	if(typeid==17){
		//折中价格
		var fcompromiseprice = $("#FCompromisePrice").val();
		data["FCompromisePrice"]=fcompromiseprice;
		data["FFooterAD"] = $("#FFooterAD").val();
	}
	var dat={
		jsonobj:JSON.stringify(data),
	};
	var bargainid=$("#url").val();//判断新增修改
	var result=false;
 	if(bargainid.length>0){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"bargain/updateBargain.do?bargainid="+bargainid+"&signid=1&typeid="+typeid,
			dataType : "json",
			data:dat,
			async : false, // 同步 等待ajax返回值
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result) {
					result=true;
					$.messager.alert("提示", "修改成功！", "warning");
					$("#update").show();
					$("#prev").hide();
					$("#save").hide();
					$("#confirm").show();
				}else{
					result=false;
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "修改失败！", "warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				result=false;
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "修改异常！", "warning");
			}
		});
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"bargain/addBargain.do?typeid="+typeid,
			dataType : "json",
			data:dat,
			async:false,
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result) {
					$("#url").val(data.bargainid);
					result=true;
					$.messager.alert("提示", "添加成功！", "warning");
					$("#update").show();
					$("#prev").hide();
					$("#save").hide();
					$("#confirm").show();
				}else{
					result=false;
					$.messager.alert("提示", "添加失败！", "warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				result=false;
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "添加失败", "warning");
			}
		});
	} 
	return result;
};
//更新单位所属店铺
function selectStoretype(){
	var typeID=$("#storeTypeID").val();//店铺类型0-企业店铺(默认)，1-门店店铺，2-员工店铺
	//$("#FSubStockID").text(typeID);
	//重新加载店铺名称
	$("#storeName").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+typeID);
}
//更新单位所属商品
function selectStoreName(){
	//获取门店id
	var storeid=$("#FStoreID").val();
	$("#FStockID").jeasycombo("reload", "store/selectStockDetailed.do?stockClassId=&markId=&isMuti=false&storeId="+storeid+"&userId=${sessionScope.user.FID}");
}
function upStock(){
	var  ids= $("#FStockID").val();
	var texts = $("#FStockID").jeasycombo("getvalue").texts;
	var codes = $("#FStockID").jeasycombo("getvalue").codes;
	var rows = $("#FStockID").jeasycombo("options").data.rows;
	var row = null;
	for(var i=0;i<rows.length;i++){
		var row = rows[i];
		if(row.fid==ids&&row.ftreecode==codes) break;
	}
	$("#FSubStockID").val(ids);
	$("#FStockName").textbox('setValue',texts);
	$("#FStockPrice").textbox('setValue',row.price.toFixed(2));
	$("#FStockQuanty").textbox('setValue',"");
	$("#FStockLimitPrice").textbox('setValue',"");
	$('#dialogid').dialog('close');
	if(texts==null||texts.length==0){
		$.messager.alert("提示", "请选择商品名称！", "warning");
	}else{
		var url = window.location.host;
		//http://	企业用户域名	.caishen.cn/stockDeTails/MOstockinfoById.do	?storeid=店铺ID	&FStockID=商品ID
		var url2 = url.substr(0,url.indexOf('.'));
		//if(url2=="o2o"){  //不再提示 刘一男 2016-7-5 15:26:34
		//	$.jbootmsg("您未在企业域名下进行设置，会导致商品参数错误。","error");
		//}
		var storeid = $("#FStoreID").val();
		//var stockid = $("#FStockID").val();
		var name1= basePath+"stockDeTails/MOstockinfoById.do?unitid="+unitid+"&storeid="+storeid+"&FStockID="+codes+"&type="+3+"&virstore="+storeid;
		$.messager.progress({text : "正在处理，请稍候..."});
	 	$.ajax({
			type:'POST',
			url:"bargain/getStoreTemplate.do?storeId="+storeid,
			dataType : "json",
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if(data.fwxurl){
					var name2=basePath+data.fwxurl;
					var name3= basePath+"mobile/red/page/user_center.jsp?unitid="+unitid+"&storeid="+storeid;
					$("#FStockURL1").val(name1);
					$("#FStockURL2").val(name2);
					$("#FStockURL3").val(name3);
				}else{
					$("#FSubStockID").val("");
					$("#FStockName").textbox('setValue',"");
					$.messager.alert("提示", "该商品所属店铺未设置模板，不可用！", "warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "查询失败", "warning");
			}
		}); 
	}
}

//模拟砍价数据
function simulateCutOff(){
	var data = {};
	data["fstockprice"]=$('#FStockPrice').val();
	data["factprice"]=$('#FStockPrice').val();
	data["fstockquanty"]=$('#FStockQuanty').val();
	data["fstocklimitprice"]=$('#FStockLimitPrice').val();
	data["fsuccesschance"]=$('#FSuccessChance').val();
	data["fsuccesshighamount"]=$('#FSuccessHighAmount').val();
	data["fsuccesslowamount"]=$('#FSuccessLowAmount').val();
	data["ffailhighamount"]=$('#FFailHighAmount').val();
	data["ffaillowamount"]=$('#FFailLowAmount').val();
	
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"bargain/simulateCutOff.do",
		dataType : "json",
		data : {jsonobj : JSON.stringify(data)},
		success:function(json){
			$.messager.progress("close");//隐藏加载中
			$("#simulateCutOff").dialog("refresh",json.data);
			$("#simulateCutOff").dialog().dialog("open");
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "参数错误", "warning");
		}
	});
}