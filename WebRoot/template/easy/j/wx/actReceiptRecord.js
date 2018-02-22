//登记方法
function doSearch(type){
	var display =$('#removecode').css('display');
	if(display!='none'){
		$.messager.alert("提示", "清除二维码后才能继续登记！", "warning");
		return;
	}
	var receiptNo =$("#FReceiptNo").val();
	var chanceCount =$("#FChanceCount").val();
	var remark =$("#FRemark").val();
	var storeIDs = $("#FStoreIDs").val();
	if(multStore==1){
		if(storeIDs==""){
			$.messager.alert("提示", "门店不能为空！", "warning");
			return false;
		}
	}else{
		storeIDs = 0;
	}
	if(receiptNo==""){
		$.messager.alert("提示", "票据号不能为空！", "warning");
		return false;
	}
	if(chanceCount==""){
		$.messager.alert("提示", "抽奖次数不能为空！", "warning");
		return false;
	}
	if(type==1){
		$.messager.confirm('确认','你确认要终止选择的记录吗？',function(r){ 
			if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'post',
				url:'game/actReceiptRecord.do?gameid='+gameid+'&receiptNo='+receiptNo+'&chanceCount='+chanceCount+'&remark='+remark+'&type='+type+'&storeIDs='+storeIDs+"&multStore="+multStore,
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					var request = data.msg;
					if(request==""||request==undefined){
						$("#code").val(data.fid);
						$("#force").hide();
						$("#hides").hide();
						QRcode();
						$.messager.alert("提示", "登记成功！", "warning");
					}else{
						$.messager.alert("提示", data.msg, "warning");
					}
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
				}
			}); 
			}
		 });
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'post',
			url:'game/actReceiptRecord.do?gameid='+gameid+'&receiptNo='+receiptNo+'&chanceCount='+chanceCount+'&remark='+remark+'&type='+type+'&storeIDs='+storeIDs+"&multStore="+multStore,
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				var request = data.msg;
				if(request==""||request==undefined){
					$("#code").val(data.fid);
					$("#force").hide();
					$("#hides").hide();
					QRcode();
					$.messager.alert("提示", "登记成功！", "warning");
				}else{
					$.messager.alert("提示", data.msg, "warning");
				}
				
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
			}
		}); 
	}
} 

//生成二维码
function QRcode(){
	var storeID = $("#FStoreIDs").val();
	if(multStore==0||multStore==undefined){
		storeID=0;
	}
	var receiptNo = $("#code").val();
	var url = $("base").attr("href")+"gamePage/"+storeID+"/"+gameid+"/"+fwxappid+"/shopPrize.do@questionreceipt="+receiptNo;
	$("#qr").append("<img src='select/qr.do?content="+url+"&w=140' border='1px solid red' style='width:200px;height:200px;'/>");
	$("#force").hide()
	$("#removecode").show();
}
//清除二维码
function cleanQRcode(){
	$('#qr').empty();
	$("#removecode").hide();
	$("#force").show();
	$("#hides").show();
	$(".easy-input-line input").val("");
	$("#FChanceCount").textbox('setValue',1); 
}
//终止按钮
function terminations(id,state){
	 if (state==2) {
		$.messager.alert("提示", "该活动已终止！", "warning");
		return false;
	 } 	 
	 $.messager.confirm('确认','你确认要终止选择的记录吗？',function(r){ 
		if(r){
			 //addway(id,state);//终止原因弹框
		}
	 });
 }
