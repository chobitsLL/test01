//date参数是要进行加减的日期，格式YYYY-MM-DD，days参数是要加减的天数，如果往前算就传入负数，往后算就传入正数
function addDate(date,days){ 
	var d=new Date(date); 
	d.setDate(d.getDate()+days); 
	var month=d.getMonth()+1; 
	var day = d.getDate(); 
	if(month<10){ 
		month = "0"+month; 
	} 
	if(day<10){ 
		day = "0"+day; 
	} 
	var val = d.getFullYear()+"-"+month+"-"+day; 
	return val;
}

//审核订单评论
function checkOrderComment(row,path){
	$("#checkComment").dialog("setTitle","审核订单评论");
	$("#idval").val(row.commid);
	$("#check_stockname").text(row.fstockname);
	$("#check_commmemo").text(row.commmemo);
	$("#check_fstockgrade").text(row.fstockgrade+' / '+row.fflowgrade+' / '+row.fservergrade);
	$("#check_commmaketime").text(row.commmaketime);
	$("#panel_comme").panel("open");
	
	var img = "暂无";
	if(!(row.fsingleimg == undefined || row.fsingleimg == "")){
		img = "";
		var imgs = row.fsingleimg.split(",");
		for(var i=0;i<imgs.length;i++){
			img=img+"<img class='shareimg' src='"+path+$.trim(imgs[i])+"'/>";
		};
	}
	$("#panel_share").html(img);
	
	if(row.fstate != "未审核"){
		$("#check_fstate").text(row.fstate);
		$("#check_fauditperosn").text(row.fauditperosn);
		$("#check_faudittime").text(row.faudittime);
		$("#panel_audit").panel("open");
		$("#checkComment").dialog("dialog").find(".dialog-button").hide();
	}else{
		$("#panel_audit").panel("close");
		$("#checkComment").dialog("dialog").find(".dialog-button").show();
	}
	$("#checkComment").dialog("open");
}

//查看晒单
function shareComment(row,path){
	$("#checkComment").dialog("setTitle","查看晒单");
	var img = "暂无";
	if(!(row.fsingleimg == undefined || row.fsingleimg == "")){
		img = "";
		var imgs = row.fsingleimg.split(",");
		for(var i=0;i<imgs.length;i++){
			img=img+"<img class='shareimg' src='"+path+$.trim(imgs[i])+"'/>";
		};
	}
	$("#panel_share").html(img);
	$("#panel_comme").panel("close");
	$("#panel_audit").panel("close");
	$("#checkComment").dialog("dialog").find(".dialog-button").hide();
	$("#checkComment").dialog("open");
}

//提交评论审核
function auditComment(type){
	var ids = $("#idval").val();
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : "managerorders/auditOrderComment.do", 
		type : 'post', 
		dataType : 'json', 
		data :{
			ids : ids,
			type : type
		},
		success : function(datas) {
			$.messager.progress("close");
			if(datas.result == "login"){
				$.messager.alert("提示","您还未登录，请先登录！","warning");
				window.location.href = "user/getLoginAD.do";
			}else if(datas.result == true){
				$("#checkComment").dialog("close");
				$.messager.alert("提示","提交成功","info");
				search();
			}else{
				$.messager.alert("提示","提交失败","error");
			}
		},error:function(){
			$.messager.progress("close");
			$.jbootmsg("您的网络有问题，请刷新");
		}
	});
}

//回复订单评论--审核通过的 
function replyOrderComment(row,path){
	if(row.fsval == 2){//审核未通过
		$.messager.alert("提示","该评论未通过审核,请重新选择","warning");
		return false;
	}else if(row.fsval == 0){//未审核
		$.messager.alert("提示","该评论还未审核,请重新选择","warning");
		return false;
	}
	
	$("#reply_idval").val(row.commid);
	$("#reply_stockname").text(row.fstockname);
	$("#reply_commmemo").text(row.commmemo);
	$("#reply_fstockgrade").text(row.fstockgrade+' / '+row.fflowgrade+' / '+row.fservergrade);
	$("#reply_commmaketime").text(row.commmaketime);
	
	var img = "暂无";
	if(!(row.fsingleimg == undefined || row.fsingleimg == "")){
		img = "";
		var imgs = row.fsingleimg.split(",");
		for(var i=0;i<imgs.length;i++){
			img=img+"<img class='shareimg' src='"+path+$.trim(imgs[i])+"'/>";
		};
	}
	$("#reply_share").html(img);
	$("#reply_fstate").text(row.fstate);
	$("#reply_fauditperosn").text(row.fauditperosn);
	$("#reply_faudittime").text(row.faudittime);
		
	if(row.fcommenttype == 1 || row.fcommenttype == "1"){//回复
		$("#reply_replymemo").textbox("setValue",row.replymemo);
		$("#reply_replymemo").textbox("readonly",true);
		$("#reply_replyname").text(row.replyname);
		$("#reply_replymaketime").text(row.replymaketime);
		$("#reply_replyname").parent().show();
		$("#reply_replymaketime").parent().show();
		$("#replyComment").dialog("dialog").find(".dialog-button").hide();
	}else{
		$("#reply_replymemo").textbox("readonly",false);
		$("#reply_replymemo").textbox("clear");
		$("#reply_replyname").parent().hide();
		$("#reply_replymaketime").parent().hide();
		$("#replyComment").dialog("dialog").find(".dialog-button").show();
	}
	$("#replyComment").dialog("open");
}

//提交评论回复
function replyComment(type){
	var ids = $("#reply_idval").val();
	var replymemo = $("#reply_replymemo").textbox("getValue");
	if(replymemo == undefined || replymemo==""){
		$.messager.alert("提示","回复内容不可为空!","warning");
		return ;
	}
	$.ajax({
		url : "managerorders/replyOrderComment.do", 
		type : 'post', 
		dataType : 'json', 
		data :{
			ids : ids,
			replymemo : replymemo
		},
		success : function(datas) {
			if(datas.result == "login"){
				$.jbootmsg("您还未登录，请先登录！");
				window.location.href = "user/getLoginAD.do";
			}else if(datas.result == true){
				$("#replyComment").dialog("close");
				$.messager.alert("提示","提交成功!","info");
				search();
			}else{
				$.messager.alert("提示","提交失败!","error");
			}
		},error:function(){
			$.messager.alert("提示","您的网络有问题，请刷新!","error");
		}
	});
};
