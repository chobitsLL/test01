//点击确定添加按钮
function confirm(){
	var ftitle=$('#ftitle').val();
	if(ftitle==""||ftitle==undefined){
		$.messager.alert("提示", "请输入标题！", "warning");
		return false;
	}
	var data={};
	data["ftitle"]=ftitle;
	var dat={
		jsonobj: JSON.stringify(data)
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"dm/addDMTitle.do",
		dataType : "json",
		data:dat,
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result) {
				$('#dialogid').dialog('close');
				$.messager.confirm('确认','操作成功！',function(r){
					if(r){
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","dm/dmSingleInfo.do");
					}
				});
			}else{
				$.messager.alert("提示", "操作失败！", "warning");
			}
		}
	});
};
//编辑
function edit(rows){
	var row = rows[0];
	if(row.fstate == 1){
		$.messager.confirm('确认','选择了已发布数据,您确定要修改吗？！',function(r){ 
			if (r){  
				window.location.href=basePath+"dm/queryDmByID.do?dmid="+row.fid;
			}
		});
		return false;
	}
	if(row.fstate == 2){
		$.messager.alert("提示", "数据已终止数据,请重新选择！", "warning");
		return false;
	}
	window.location.href=basePath+"dm/queryDmByID.do?dmid="+row.fid; 
}

//删除
function deleteDm(ids,rows){
	for (var i = 0; i < rows.length; i++) {
		if(rows[i].fstate==1){
			$.messager.alert("提示","包含已发布数据,请重新选择！", "warning");
		return false;
	}
	}
	$.messager.confirm('确认','你确认要删除选择的记录吗？',function(r){ 
		if (r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				url: "dm/deleteDMTitle.do?ids="+ids,
				dataType: "json",
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if(data.res==false){
						$.messager.alert("提示", "包含发布数据,不能删除", "warning");
					}else if(data.result==false){
						$.messager.alert("提示", "删除失败", "warning");
					}else{
						$.messager.confirm('确认','删除成功！',function(r){
							if(r){
								$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
								$("#easy_table").datagrid("load","dm/dmSingleInfo.do");
							}
						});
					}
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "发生错误！！！", "warning");
				}
			});
		}
	});
}
//发布
function publishDm(ids,rows){
	for (var i = 0; i < rows.length; i++) {
		if(rows[i].fstate==1){
			$.messager.alert("提示","包含已发布数据,请重新选择！", "warning");
		return false;
	}
		if(rows[i].fstate==2){
		$.messager.alert("提示", "包含已发布数据,请重新选择！", "warning");
		return false;
	}
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		 type:"POST",
		 url:"qrmanage/selectQRcode.do?gameid="+ids+"&gameType=002",
		 dataType:"json",
		 success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.fid!=undefined){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					url: "dm/releaseDm.do?ids="+ids,
					dataType: "json",
					success:function(data){
						$.messager.progress("close");//隐藏加载中
						if(data.result==false){
							$.messager.alert("提示", "发布失败！", "warning");
						}
						else{
							$.messager.confirm('确认','发布成功！',function(r){ 
								if(r){
									$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
									$("#easy_table").datagrid("load","dm/dmSingleInfo.do");
								}
							});
						}
					},error:function(){
						$.messager.alert("提示", "请求出错！", "warning");
					}
				});
			}else{
				$.messager.alert("提示", "没有生成二维码不能发布DM单！", "warning");
				return false;
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
			$("#releaseedstate").val(0);
		}
	 });
}
//终止
function stopDm(ids,rows){
	for (var i = 0; i < rows.length; i++) {
		if(rows[i].fstate==0){
			$.messager.alert("提示","包含未发布数据,请重新选择！", "warning");
		return false;
	}
		if(rows[i].fstate==2){
			$.messager.alert("提示","包含已发布数据,请重新选择！", "warning");
		return false;
	}
	}
	$.messager.confirm('确认','你确认要终止选择的记录吗？',function(r){
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				url: "dm/stopDm.do?ids="+ids,
				dataType: "json",
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if(data.result==false){
						$.messager.alert("提示", "终止失败！", "warning");
					}else{
						$.messager.confirm('确认','终止成功！',function(r){ 
							if(r){
								$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
								$("#easy_table").datagrid("load","dm/dmSingleInfo.do");
							}
						});
					}
				},
				error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "发生错误！！！", "warning");
				}
			});
		}
	});
}
//点击确定复制按钮
function copy(){
	var id=$("#easy_table").datagrid("getSelected").fid;
//	var rows = currentRows;
//	var id=rows.fid;
	var ftitle=$('#copytitle').val();
	if(ftitle==""||ftitle==undefined){
		$.messager.alert("提示", "请输入标题！", "warning")
		return false;
	}
	var data={};
	data["ftitle"]=ftitle;
	var dat={
		jsonobj:JSON.stringify(data)
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url: "dm/copyDmTitle.do?ids="+id,
		dataType: "json",
		data:dat,
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if (data.result) {
				$('#copydialogid').dialog('close');
				$.messager.confirm('确认','操作成功！',function(r){
					if(r){
						$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
						$("#easy_table").datagrid("load","dm/dmSingleInfo.do");
					}
				});
			}else{
				$.messager.alert("提示", "操作失败！", "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！！", "warning");
		}
	});
};
function upload(ids,rows){
	 var row = rows[0];
	 $("#gameid").val(row.fid);
	 if(row.fstate==1||row.fstate==2){
		$.messager.alert("提示", "活动已发布或已终止后,不能生成二维码！", "warning");
		return false;
	 }
	 if(row.endtype==2){
		$.messager.alert("提示", "DM单截止日期已过,不能生成二维码！", "warning");
		return false;
	 }
	 if(isupload(row.fid)==0){
		$.messager.alert("提示", "二维码已存在，不能重复添加！", "warning");
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
						$("#code").val(data);
						QRcode(0);
					},error:function(){
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
		url:"qrmanage/getGenerateQRcode.do?&oaid="+oaid+"&gameType=002&gameid="+gameid,//gemaType=003表示游戏类
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载中
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
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！！", "warning");
		}
	});
}//添加二维码
function addQRcode(){
	var code = $("#FOAID").val();//公众号id
	var codeurl = $("#codeurl").val();
	var codeticket = $("#codeticket").val();
	var gameid = $("#gameid").val();
	var data={};
	data["FOAID"]=code;
	data["FOut_url"]=codeurl;
	data["FOut_ticket"]=codeticket;
	data["FSourceID"]=gameid;
	var dat={
			jsonobj:JSON.stringify(data),
		};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"qrmanage/addGenerateQRcode.do?gameType=002",
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
		url:"qrmanage/selectQRcode.do?gameid="+fid+"&gameType=002",
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
//生成url - 公众号选择combo
function createUrlBtns(){
	var row = createUrl;
	if(row.fstate==0){
		$.messager.alert("提示", "未发布的DM单不能获取链接。", "warning");
		return false;
	}
	if(row.fstate==2){
		$.messager.alert("提示", "已终止的DM单不能获取链接。", "warning");
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
		data:{"ids":ids,"dmInfoId":row.fid},
		url:'dm/makeUrl.do',
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
				content+='<textarea rows="2" style="width: 508px;height: 154px;" readonly="readonly">'+temp.url+'</textarea><br/>';
				content+='<form>';
				content+='<div id="qrs'+i+'" style="margin: 20px;">';
				content+='<img src="select/qrGameImage.do?url=&content='+temp.qrurl+'" border="1px solid red" style="width:200px;height:200px;"/></div>';
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