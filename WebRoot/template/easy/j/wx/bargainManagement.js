//新增按钮
function wxAddGame(){
	window.location.href=basePath+"bargain/addBargainPage.do?typeid="+typeid;
}
//编辑按钮
function edit(id,fstate,state){
	if(fstate==2){
		$.messager.alert("提示", "数据已终止数据,请重新选择！", "warning");
		return false;
	}
	var unitid = $("#unitid").val();
	window.location.href=basePath+"bargain/selectBargainMap.do?bargainid="+id+"&state="+state+"&unitID="+unitid+"&typeid="+typeid;
}
//点击删除按钮
function wxDeleteGame(ids,rows){
	for(var i=0;i<rows.length;i++){
		if(rows[i].fstate==1){
			$.messager.alert("提示","您选中的活动包含已发布的数据,不能删除，请重新选择！", "warning");
			return false;
		}
	}
	$.messager.progress({text : "正在处理，请稍候..."});
    $.ajax({
	  type:"POST",
	  url:"bargain/deleteBargain.do?bargainIDs="+ids,
	  dataType:"json",
	  async : false, // 同步 等待ajax返回值
	  success:function(data){
		  $.messager.progress("close");//隐藏加载中
		  if (data) {
			  $.messager.alert("提示", "删除成功！", "warning");
			  var fname=$("#fname").val();
			  var data={};
			  data["fname"]=fname;
			  var	jsonobj=JSON.stringify(data);	
			  //查询前先组织查询条件
			  $("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
			  $("#easy_table").datagrid("load","bargain/queryBargain.do");
		  }
		  else{
			  $.messager.alert("提示", "删除失败！", "warning");
		  }
	  },error:function(){
		  	$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
  });

}
//发布按钮
function release(id,rows){
	 var row = rows[0];
	 if (row.fstate==1||row.fstate==2) {
		$.messager.alert("提示", "该活动已发布或已终止！", "warning");
		return false;
	 } 
	 var gameType = "004";
	 if(typeid==17||typeid==10002){
		 gameType = "006";
	 }
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"qrmanage/selectQRcode.do?gameid="+id+"&gameType="+gameType,
		 dataType:"json",
		 success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.fid!=undefined){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					 type:"POST",
					 url:"bargain/queryStockQuanty.do?fid="+id,
					 dataType:"json",
					 success:function(data){
					 if(data.result){
						 $.ajax({
							 type:"POST",
					 url:"bargain/updateBargainByState.do?state=1&FID="+id,
					 dataType:"json",
					 success:function(data){
						$.messager.progress("close");//隐藏加载中
						if(data){
							$.messager.alert("提示", "发布成功！", "warning");
							$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
							$("#easy_table").datagrid("load","bargain/queryBargain.do");
						}
						else{
							$.messager.progress("close");//隐藏加载中
							$.messager.alert("提示", "发布失败！", "warning");
						}
					},error:function(){
						$.messager.progress("close");//隐藏加载中
						$.messager.alert("提示", "请求出错！", "warning");
					}
				 });
			}else{
				$.messager.progress("close");//隐藏加载中
						 $.messager.alert("提示", data.msg, "warning");
					 }
				 },error:function(){
					 $.messager.progress("close");//隐藏加载中
					 $.messager.alert("提示", "请求出错！", "warning");
				 }
				 });
			}else{
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "没有生成二维码不能发布游戏活动！", "warning");
				return false;
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
}
//终止按钮
function terminations(ids,rows){
	 var row = rows[0];
	 if (row.fstate==0) {
		$.messager.alert("提示", "该活动未发不能终止！", "warning");
		return false;
	 } 	
	 if (row.fstate==2) {
		$.messager.alert("提示", "该活动已终止！", "warning");
		return false;
	 } 	 
	 $.messager.confirm('确认','你确认要终止选择的记录吗？',function(r){ 
		if(r){
			$("#dialogid").dialog().dialog("open");
			$("#reason").val(row.fid);
		}
	 });
}
//终止-确认事件绑定
function stop_confirm(){
	var id = $("#reason").val();
	var fstopreason = $("#FStopReason").val();
	var typeid = $("#typeID").val();
	$.messager.progress({text : "正在处理，请稍候..."});//显示加载中;
	$.ajax({
		type:"POST",
		url:"bargain/updateBargainByState.do?state=2&FID="+id+"&FStopReason="+fstopreason,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data) {
				$('#dialogid').dialog('close');
				$.messager.confirm('确认','终止成功！',function(r){ 
					if(r){
						//查询前先组织查询条件
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","bargain/queryBargain.do");
					}
				});
			}
			else{
				$.messager.alert("提示", "终止失败！", "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
}
function administration(fid,state){
	if(state!=0){
		window.location.href=basePath+"bargain/selectbargainperizemap.do?bargainid="+fid+"&state="+state+"&unitID="+unitid+"&typeid="+typeid;
	}else{
		$.messager.alert("提示", "选择了未发布数据,请重新选择！", "warning");
	}
}

//生成url - 公众号选择combo
function createUrlBtns(){
	var rows = $("#easy_table").datagrid("getSelected");
	var shareImg = rows.fshareimgurl;
	if(rows.fstate==0){
		$.messager.alert("提示", "未发布的砍价活动不能获取链接。", "warning");
		return false;
	}
	if(rows.fstate==2){
		$.messager.alert("提示", "已终止的砍价活动不能获取链接。", "warning");
		return false;
	}
	if(rows.fstate==3){
		$.messager.alert("提示", "已结束的砍价活动不能获取链接。", "warning");
		return false;
	}
	var ids = $("#FOAIDurl").val();
	if(ids==""){
		$.messager.alert("提示", "请选择公众号 。", "warning");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});//显示加载中;
	$.ajax({
		type:'GET',
		data:{"oaIds":ids,"bargainId":rows.fid,"typeid":typeid},
		url:'bargain/makeUrl.do',
		success:function(data) {
			$.messager.progress("close");//隐藏加载中
			if (data.error) {
				return;
			}
			$("#urlContent").empty();
			var array = data.urls;
			var content = "";
			for (var i=0;i<array.length;i++) {
				var temp = array[i];
				var url = "";
				//会员游戏
				if($("ins[id="+rows.fid+"]").attr("fattributeuser")=='1'){
					url = temp.user_url;
				}else{
					url = temp.url;
				}
				content+='<span>'+temp.oaname+'</span><br/>';
				content+='<textarea rows="2" style="width: 508px;height: 140px;" readonly="readonly">'+url+'</textarea><br/>';
				content+='<form>';
				content+='<div id="qrs'+i+'" style="margin: 20px;">';
				content+='<img src="select/qrGameImage.do?url='+shareImg+'&content='+url+'" border="1px solid red" style="width:200px;height:200px;"/></div>';
				content+='</form>';
			}
			$("#urlContent").append(content);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "服务器内部错误。", "warning");
		}
	});
}

//复制游戏
function copyBargain(fid){
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"bargain/copyBargain.do?bargainid="+fid,
		 dataType:"json",
		 success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result) {
				result=true;
				$.messager.alert("提示", "添加成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","bargain/queryBargain.do");
			}else{
				result=false;
				$.messager.alert("提示", "添加失败！", "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
}
//查询该活动的订单情况
function groupBuyingOrder(id,groupBuyingType){
	var url = basePath+"bargain/groupBuyingOrder.do?sign=" + (id==undefined?"":id)+"&groupBuyingType="+(groupBuyingType==undefined?"":groupBuyingType);
	window.open(url);
}
//查询该活动的订单退款情况
function groupBuyingReturn(id,groupBuyingType){
	var url = basePath+"bargain/groupBuyingReturn.do?sign=" + (id==undefined?"":id)+"&groupBuyingType="+(groupBuyingType==undefined?"":groupBuyingType);
	window.open(url);
}

//单门店库存管理
function editQuanty(factid,fisalonestore){
	if(fisalonestore==1){
		var url = basePath+"bargain/singleStorePage.do?factid="+factid;
		window.open(url);
	}else{
		$.messager.alert("提示", "该活动没有启动单门店库存", "warning");
	}

}
//生成二维码
function QRcode(id){
	var oaid = $("#code").val();
	if(id==1){
		oaid=$("#FOAID").val();
		if(oaid==""){
			$.messager.alert("提示", "未选择公众号，不能生成二维码！", "warning");
			return false;
		}
	}
	var bargainid=$("#bargainid").val();
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"qrmanage/getGenerateQRcode.do?&oaid="+oaid+"&gameType=004&gameid="+bargainid,//gemaType=003表示游戏类
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.url!=undefined||data.url!=""){
				if(id==1){
					$("#qr").html("");
					$("#qr").append("<img src='select/qr.do?content="+data.url+"&w=140' border='1px solid red' style='width:200px;height:200px;'/>");
				}else{
					$("#qrs").html("");
					$("#qrs").append("<img src='select/qr.do?content="+data.url+"&w=140' border='1px solid red' style='width:200px;height:200px;'/>");
				}
				var fqrcode = basePath+"select/qr.do?content="+data.url+"&w=140";
				showQRcode(fqrcode);
				$("#codeurl").val(data.url);
				$("#codeticket").val(data.ticket);
			}else{
				$('#oadialogid').dialog('close');
				$('#oadialogids').dialog('close');
				$.messager.alert("提示", data.msg, "warning");
				$("#sign").val(1);
				$("#signs").val(id);//标记多个公共号的时候
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}
//显示二维码弹框
function showQRcode(fqrcode){
	$('#show-qrcode').dialog('close');
	$("#fqrcode").textbox("setValue",fqrcode);
}
function upload(){
	 var row = $("#easy_table").datagrid("getSelected");
	 $("#bargainid").val(row.fid);
	 $("#foaid").val(row.foaid);
	 var gameType="004";
	 if(typeid==17){
		 gameType = "006";
	 }else{
		 if(row.fstate==1||row.fstate==2){
			 $.messager.alert("提示", "活动已发布或已终止后,不能生成二维码！", "warning");
			 return false;
		 }
	 }
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"qrmanage/selectQRcode.do?gameid="+row.fid+"&gameType="+gameType,
		 dataType:"json",
		 success:function(data){
			 $.ajax({
				 type:"POST",
				 url:"game/queryOfficialAccount.do",
				 dataType:"json",
				 success:function(data){
					 $.messager.progress("close");//隐藏加载中
					 if(data>1){
						 $("#qr").html("");
						 $("#oadialogid").dialog().dialog("open");
					 }else{
						 $("#qrs").html("");
						 $("#oadialogids").dialog().dialog("open");
						 $.messager.progress({text : "正在处理，请稍候..."});
						 $.ajax({
							 type:"POST",
							 url:"game/queryOfficialid.do",
							 dataType:"json",
							 success:function(data){
								 $.messager.progress("close");//隐藏加载中
								 $("#code").val(data);
								 QRcode(0);
							 },error:function(){
								 $.messager.progress("close");//隐藏加载中
								 $.messager.alert("提示", "请求出错！", "warning");
							 }
						 });
					 }
				 },error:function(){
					 $.messager.progress("close");//隐藏加载中
					 $.messager.alert("提示", "请求出错！！", "warning");
				 }
			 });
			 }
		 });
}
function addQRcode(){
	var code =$("#FOAID").val();//公众号id
	var codeurl = $("#codeurl").val();
	var codeticket = $("#codeticket").val();
	var bargainid = $("#bargainid").val();
	var sign = $("#sign").val();
	var signs = $("#signs").val();
	if(sign==1){
		if(signs==1){
			$('#oadialogid').dialog('close');
		}
		$('#oadialogids').dialog('close');
	}else{
		var data={};
		data["FOAID"]=code;
		data["FOut_url"]=codeurl;
		data["FOut_ticket"]=codeticket;
		data["FSourceID"]=bargainid;
		var dat={
				jsonobj:JSON.stringify(data),
			};
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:"POST",
			url:"qrmanage/addGenerateQRcode.do?gameType=004",
			dataType:"json",
			data:dat,
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if (data.result) {
					$.messager.alert("提示", "二维码已成功添加！", "warning");
				}else{
					$.messager.alert("提示", data.msg, "warning");
				}
				$('#oadialogid').dialog('close');
				$('#oadialogids').dialog('close');
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
			}
		});
	}
}