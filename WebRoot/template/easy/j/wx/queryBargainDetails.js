//变换活动类型
function gameType(gametype){
	$(".keyword").show();
	if(gametype==10000||gametype==17){//砍价
		$(".FChecked").show();
		$(".FPayed").show();
		$("#column_filter").jeasycolumn("change","827_1");
	}else if(gametype==10001){//合体红包
		$("#column_filter").jeasycolumn("change","827_3");
	}else if(gametype==10){//微助力
		$("#column_filter").jeasycolumn("change","827_4");
	}else if(gametype==8 || gametype==9 || gametype==11){
		//除合体红包之外的红包
		$("#column_filter").jeasycolumn("change","827_5");
	}else if(gametype==10002){
		$("#column_filter").jeasycolumn("change","827_7");//团购
	}else if(gametype==0){//卡券
		$(".keyword").hide();
		$(".FChecked").show();
		$(".FPayed").hide();
		$("#column_filter").jeasycolumn("change","827_6");
	}else{
		$(".FChecked").hide();
		$(".FPayed").hide();
		$("#column_filter").jeasycolumn("change","827_2");
	}
	Util.resetParam(paramArray,"gameType");
}

//显示详情
function showDetail(row){
	var html="";
	var gametype = $("#FGameType").val();
	if(gametype==10000 || gametype==17){//砍价
		html='<div class="detail-inline" >'
			+'<div class="detail-group"><label class="title">是否核销：</label><label class="value fno">'+row.fchecked+'</label></div>'
			+'<div class="detail-group"><label class="title">核销人：</label><label class="value">'+row.fchecker+'</label></div>'
			+'<div class="detail-group"><label class="title">核销时间：</label><label class="value">'+row.fchecktime+'</label></div>'
			+'</div>';
	}else if(gametype==0){//卡券
		html='<div class="detail-inline" >'
			+'<div class="detail-group"><label class="title">核销单据号：</label><label class="value fno">'+row.fconsumebillno+'</label></div>'
			+'<div class="detail-group"><label class="title">核销时间：</label><label class="value">'+row.consumetime+'</label></div>'
			+'<div class="detail-group"><label class="title">核销人：</label><label class="value">'+row.consumeperson+'</label></div>'
			+'</div>'                                                            
			+'<div class="detail-inline" >'   
			+'<div class="detail-group"><label class="title">核销门店：</label><label class="value">'+row.consumestorename+'</label></div>'
			+'<div class="detail-group"><label class="title">处理类型：</label><label class="value">'+row.fdealtype+'</label></div>'
			+'</div>';
	}else if(gametype==10002){//团购
		if(row.fgroupbuyingtype==0){
			html='<div class="detail-inline" >'
				+'<div class="detail-group"><label class="title">成团人数：</label><label class="value fno">'+row.fcreatemembernum+'</label></div>'
				+'<div class="detail-group"><label class="title">是否成团：</label><label class="value">'+row.fisteam+'</label></div>'
				+'<div class="detail-group"><label class="title">是否是团长：</label><label class="value">'+row.fjoinmembertype+'</label></div>'
				+'<div class="detail-group"><label class="title">退款金额：</label><label class="value">'+row.freturnmoney+'</label></div>'
				+'<div class="detail-group"><label class="title">退款状态：</label><label class="value">'+row.statefile+'</label></div>'
				+'<div class="detail-group"><label class="title">退款类型：</label><label class="value">'+row.freturntype+'</label></div>'
				+'</div>';                                                          
		}else{
			html='<div class="detail-inline" >'
				+'<div class="detail-group"><label class="title">退款金额：</label><label class="value">'+row.freturnmoney+'</label></div>'
				+'<div class="detail-group"><label class="title">退款状态：</label><label class="value">'+row.statefile+'</label></div>'
				+'<div class="detail-group"><label class="title">退款类型：</label><label class="value">'+row.freturntype+'</label></div>'
				+'</div>';
		}
	}
	$("#detail").html(html);
}