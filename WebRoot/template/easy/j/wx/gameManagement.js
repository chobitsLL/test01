//点击新增按钮
function wxAddGame(){
	if(typeid==8){
		$.messager.progress({text : "正在处理，请稍候..."});
	    $.ajax({
		  type:"POST",
		  url:"game/getOANameByAppID.do?typeID="+typeid,
		  dataType:"json",
		  async : false, // 同步 等待ajax返回值
		  success:function(data){
			  $.messager.progress({text : "正在处理，请稍候..."});
			  if (data.result) {
				  window.location.href=basePath+"game/addGamePage.do?typeID="+typeid;
			  }else{
				  $.messager.alert("提示", data.msg, "warning");
			  }
		  },error:function(){
			  $.messager.progress({text : "正在处理，请稍候..."});
			  $.messager.alert("提示", "请求出错！", "warning");
		  }
	  });
	}else{
		 window.location.href=basePath+"game/addGamePage.do?typeID="+typeid;
	}
	
}
//编辑按钮
function edit(id,fstate,state,type,fcurrentstate){
	if(type>=5){
		if(fcurrentstate>0){
			$.messager.alert("提示", "摇奖状态下不允许编辑！", "warning");
			return false;
		}
	}
	if(type<4||typeid==13||typeid==11){//||typeid==7
		if(fstate==1){
			$.messager.alert("提示", "选择了已发布数据,请重新选择！", "warning");
			return false;
		}
	}
	if(fstate==2){
		$.messager.alert("提示", "数据已终止数据,请重新选择！", "warning");
		return false;
	}
	window.location.href=basePath+"game/selectGameMap.do?gameid="+id+"&typeID="+typeid+"&state="+state+"&fstate="+fstate;
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
	  url:"game/deleteGame.do?gameIDs="+ids,
	  dataType:"json",
	  async : false, // 同步 等待ajax返回值
	  success:function(data){
		  $.messager.progress("close");//隐藏加载中
		  if (data) {
			  $.messager.confirm('确认','删除成功',function(r){ 
			   	  if(r){
			   		  $("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
					  $("#easy_table").datagrid("load","game/queryGame.do");
			   	  }
		  	  });
		  }else{
			  $.messager.alert("提示", "删除失败！", "warning");
		  }
	  },error:function(){
		  $.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
	  }
  });
}
//发布按钮
function release(ids,rows){
	 var row = rows[0];
	 if (row.fstate==1||row.fstate==2) {
		$.messager.alert("提示", "该活动已发布或已终止！", "warning");
		return false;
	 }
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"qrmanage/selectQRcode.do?gameid="+row.fid+"&gameType=003",
		 dataType:"json",
		 success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.fid!=undefined){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					 type:"POST",
					 url:"game/updateGameByState.do?state=1&FID="+row.fid+"&gameType="+typeid,
					 dataType:"json",
					 success:function(data){
						$.messager.progress("close");//隐藏加载中
						if(data){
							$.messager.confirm('确认','发布成功',function(r){ 
								if(r){
									$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
									$("#easy_table").datagrid("load","game/queryGame.do");
								}
							});
						}
						else{
							$.messager.alert("提示", "发布失败！", "warning");
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
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"game/updateGameByState.do?state=2&FID="+id+"&FStopReason="+fstopreason+"&gameType="+typeid,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			$('#dialogid').dialog('close');
			if (data) {
				$.messager.confirm('确认','终止成功！',function(r){ 
					if(r){
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","game/queryGame.do");
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
//生成url - 公众号选择combo
function createUrlBtns(){
	var rows = $("#easy_table").datagrid("getSelected");
	var shareImg = rows.fshareimgurl;
	if(rows.fstate==0){
		$.messager.alert("提示", "未发布的活动不能获取链接。", "warning");
		return false;
	}
	if(rows.fstate==2){
		$.messager.alert("提示", "已终止的活动不能获取链接。", "warning");
		return false;
	}
	var ids = $("#FOAIDurl").val();
	if(ids==""){
		$.messager.alert("提示", "请选择公众号 。", "warning");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'GET',
		data:{"oaIds":ids,"gameId":rows.fid,"typeid":typeid},
		url:'game/makeUrl.do',
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
				if(rows.fattributeuser==1){
					url = temp.user_url;
				}else{
					url = temp.url;
				}
				content+='<span>'+temp.oaname+'</span><br/>';
				content+='<textarea rows="2" style="width: 508px;height: 154px;" readonly="readonly">'+url+'</textarea><br/>';
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
function upload(){
	 var row = $("#easy_table").datagrid("getSelected");
	 $("#gameid").val(row.fid);
	 $("#foaid").val(row.foaid);
	 if(row.fstate==1||row.fstate==2){
		$.messager.alert("提示", "活动已发布或已终止后,不能生成二维码！", "warning");
		return false;
	 }
	 $.messager.progress({text : "正在处理，请稍候..."});
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
	var gameid=$("#gameid").val();
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"qrmanage/getGenerateQRcode.do?&oaid="+oaid+"&gameType=003&gameid="+gameid,//gemaType=003表示游戏类
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			/*if(data.result){   //verh*/ 
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
}//添加二维码
function addQRcode(){
	var foaid = $("#FOAID").val();//公众号id
	var codeurl = $("#codeurl").val();
	var codeticket = $("#codeticket").val();
	var gameid = $("#gameid").val();
	var sign = $("#sign").val();
	var signs = $("#signs").val();
	if(sign==1){
		if(signs==1){
			$('#oadialogid').dialog('close');
		}
		$('#oadialogids').dialog('close');
	}else{
		var data={};
		data["FOAID"]=foaid;
		data["FOut_url"]=codeurl;
		data["FOut_ticket"]=codeticket;
		data["FSourceID"]=gameid;
		var dat={
				jsonobj:JSON.stringify(data),
			};
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:"POST",
			url:"qrmanage/addGenerateQRcode.do?gameType=003",
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
//显示二维码弹框
function showQRcode(fqrcode){
	$('#show-qrcode').dialog('close');
	$("#fqrcode").textbox("setValue",fqrcode);
}
//二维码是否已存在
function isupload(fid){
	var is=1;
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"qrmanage/selectQRcode.do?gameid="+fid+"&gameType=003",
		async:false,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(!jQuery.isEmptyObject(data)){
				is=0;
			}
		}
	})
	return is;
}
//复制游戏
function copyGame(ids,rows){
	 var row = rows[0];
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"game/copyGame.do?gameid="+row.fid,
		 dataType:"json",
		 success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result) {
				result=true;
				$.messager.confirm('确认','添加成功！',function(r){ 
					if(r){
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","game/queryGame.do");
					}
				});
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
function upload_publishAnswer(rows){
	var row = rows[0];
	$.messager.progress({text : "正在处理，请稍候..."});
    $.ajax({
	  type:"POST",
	  url:"game/selectGuessType.do?gameid="+row.fid,
	  dataType:"json",
	  async : false, // 同步 等待ajax返回值
	  success:function(data){
		  $.messager.progress("close");//隐藏加载中
		  $("#upload_publishAnswer").dialog().dialog("open");
		  $("#table_upload").empty();
		  for(var i=0;i<data.length;i++){
			  var tr = $('<tr style="padding: 10px;"></tr>');
			  var td = '<td style="width: 100px;"></td>';
			  var tds = '<td style="width: 200px;"></td>';
			  var json = data[i];
			  if(json.fpublished==0){
				  $(td).html(json.fname).appendTo(tr);
				  $(tds).html(json.fbegintime).appendTo(tr);
				  $(tds).html(json.fendtime).appendTo(tr);
				  $(td).html('<span class="btn btn-success btn-sm" onclick="update_publishAnswer('+json.fid+','+row.fid+')" style="height: 30px;border-radius:2px; padding: 3px 10px;">公布</span>').appendTo(tr);
				  tr.appendTo($("#table_upload"));
			  }
		  }
	  },error:function(){
		  $.messager.progress("close");//隐藏加载中
		  $.messager.alert("提示", "请求出错！", "warning");
		}
    });
}
function update_publishAnswer(fid,gameid){
	$.messager.progress({text : "正在处理，请稍候..."});
    $.ajax({
	  type:"POST",
	  url:"game/publishAnswer.do?gameID="+gameid+"&guessTypeID="+fid,
	  dataType:"json",
	  async : false, // 同步 等待ajax返回值
	  success:function(data){
		  $.messager.progress("close");//隐藏加载中
		  if(data.result){
			  $.messager.alert("提示", "公布成功！", "warning");
			  $('#upload_publishAnswer').dialog('close')
		  }else{
			  $.messager.alert("提示", data.msg, "warning");
		  }
	  },error:function(){
		  $.messager.progress("close");//隐藏加载中
		  $.messager.alert("提示", "请求出错！", "warning");
	  }
    });
}
//登记票据
function receipt(gameid,fstate,fwxappid,fname){
	if(fstate==0){
		$.messager.alert("提示", "活动未发布,不能登记票据！", "warning");
		return false;
	}
	if(fstate==2){
		$.messager.alert("提示", "活动已终止,不能登记票据！", "warning");
		return false;
	}
	window.location.href=basePath+"game/receiptRecord.do?gameid="+gameid+"&fwxappid="+fwxappid+"&fname="+fname;
}
//活动大屏
function screen(fid,fstate,fmultstore,fstoreids){
	if(fstate==2){
		$.messager.alert("提示", "活动已终止,不能进入大屏！", "warning");
		return false;
	}
	if(fmultstore==0){
		window.location.href=basePath+"gamePage/"+fid+"/shopPrizeScreen.do";
	}else{
		//$(".screenStore").each(function(){
		$("#dialogStock").dialog().dialog("open");
		$("#storedia").combobox({
			multiple : false,//是否多选
			url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes=1&storeids="+fstoreids,
			onChange:function(ids,texts){
				window.location.href=basePath+"gamePage/"+fid+"/shopPrizeScreen.do?storeIDs="+ids;
			}
		});
			
		//});
	}
}
//控制摇奖
function control(typeid,fstate){
	if(fstate==0){
		$.messager.alert("提示", "活动未发布,不能进入大！", "warning");
		return false;
	}
	if(fstate==2){
		$.messager.alert("提示", "活动已终止,不能进入大屏！", "warning");
		return false;
	}     
	window.location.href=basePath+"game/selectgameperizemap.do?gameid="+json.fid+"&typeID="+typeid+"&state=1&sign=2";
}