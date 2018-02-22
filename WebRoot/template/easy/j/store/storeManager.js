//编辑
function edit(ids,rows,type){
	console.log(ids+" - "+rows.length);
	if(rows.length > 1){
		$.messager.alert("提示", "只能选择一行数据！", "warning");
		return;
	}
	Util.dialog("编辑店铺信息","store/editStoreInfo.do?type="+type+"&storeid="+ids,900,600);
}

//预览
function templateName(ids,rows){
	if(rows.length > 1){
		$.messager.alert("提示", "只能选择一行数据！", "warning");
		return;
	}
	var row = rows[0];
	if(row.ftemplatename == ""){
		$.messager.alert("提示", "进入店铺之前需要设置模板哦！","warning"); 
		return false;
	}
	var unitid=queryUnirID();
	var fstoreid = row.fstoreid;
	var domain = window.location.host;//要不要前缀有demo域名    区别一下
	if(domain.indexOf("demo.caishen.cn")!=-1 || domain.indexOf("me.caishen.cn")!=-1 || domain.indexOf("120.26.99.17")!=-1){//demo和me的测试环境
		window.open("wxStock/wxGetStoreModel.do?unitid="+unitid+"&type=0&storeid="+fstoreid);  								
	}else if(domain.indexOf("caishen.cn")!=-1 ||domain.indexOf("121.40.126.170")!=-1){//正式环境
		window.open("http://preview.caishen.cn/wxStock/wxGetStoreModel.do?unitid="+unitid+"&type=0&storeid="+fstoreid);  
	}else{//本地
		window.open("wxStock/wxGetStoreModel.do?unitid="+unitid+"&type=0&storeid="+fstoreid);  
	}
}

//设置推广天数
function setDay(ids, rows){
	if(rows.length > 1){
		$.messager.alert("提示", "只能选择一行数据！", "warning");
		return;
	}
	var row = rows[0];
	$("#promotedays").textbox("clear");
	$("#storeids").val(row.fstoreid);
	//优化一下  从表格中直接判断店铺类型
	var type = row.ftypename;
	if(type == "员工店铺"){
		$('#setday').dialog('open');
	}else{
		$.messager.alert("提示","只有员工店铺才可以设置推广天数哦！", "warning");
	} 
}

//所有活动页面
function getAllActivityPage(ids){
	var jsonobj = {ids:ids};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"post",
		url:"customTemp/getAllActivityPage.do",
		dataType:"json",
		data:{jsonobj:JSON.stringify(jsonobj)},
		success:function(data){
			var bodyHtml = "<div>";
			$.each(data.rows,function(n,value){
				bodyHtml += "<h3 storeid="+value.fid+">"+value.fname+"</h3>";
				bodyHtml += "<ul>";
				if(value.activity!=undefined&&value.activity.length>0){
					$.each(value.activity,function(i,val){
						bodyHtml += "<li><span style='display:inline-block;padding:3px 0;'>"+$("base").attr("href")+"mobile/wx_page/store/"+val.factivitypageid+".jsp?storeid="+value.fid+"&unitid="+data.unitid+"</span>&nbsp;" +
								"<a href='javascript:editActivityPage(this,\""+val.factivitypageid+"\","+value.fid+","+data.unitid+")' class='showAD'>编辑</a>&nbsp;" +
								"<a href='javascript:goActivityPage(this,\""+val.factivitypageid+"\","+value.fid+","+data.unitid+")' class='showAD'>预览广告</a></li>";
					});
				}
				bodyHtml += "</ul>";
			});
			bodyHtml += "</div>";
			$("#allActivity").html(bodyHtml);
			$.messager.progress("close");
			$("#allActivity").dialog("open");
		},
		error : function() {
			$.messager.progress("close");
			$.messager.alert("提示", "请求出错", "warning");
		}
	});
}

//编辑活动页面
function editActivityPage(obj,editActivityPage,storeid,unitid){
	var url = $("base").attr("href")+"customTemp/goSetTemp.do?storeid="+storeid+"&default=1999&type=1&activityPageID="+editActivityPage+"&unitid="+unitid;
	window.open(url);
}
//预览活动页面
function goActivityPage(obj,editActivityPage,storeid,unitid){
	var url = $("base").attr("href")+"mobile/wx_page/store/"+editActivityPage+".jsp?storeid="+storeid+"&unitid="+unitid;
	window.open(url);
}

var isInitMarkStockClass = false;
//初始化设置类别品牌的选项
function initSetMarkStockClass(type){
	if(!isInitMarkStockClass){
		
		$('#comclass').jeasycombo({
			multiple : true,//是否多选
			label:"经营类别:",
			labelWidth:80,
			width:400,
			dlgwidth:500,
			dlgheight:400,
			type:"tree",
			url : "select/stockClass.do?t=5",
		});
		
		$("#compmark").jeasycombo({
			multiple : true,//是否多选,//是否多选
			label:"经营品牌:",
			labelWidth:80,
			width:400,
			dlgwidth:900,
			dlgheight:400,
			isinline:false,
			linenum:4,
			type : "list",//弹出的样式
			url : "select/mark.do"
		});
		
		$("#compstore").jeasycombo({
			multiple : true,//是否多选,//是否多选
			label:"店铺名称:",
			labelWidth:80,
			width:400,
			dlgwidth:900,
			dlgheight:400,
			isinline:false,
			linenum:4,
			type : "list",//弹出的样式
			url : "store/selStoreN.do?type="+type
		});
		isInitMarkStockClass = true;
	}
	$('#setclass').dialog('open');
}

//设置品牌类别 保存
function submitClass(type){
	var fstockclassids =$('#comclass').jeasycombo('getvalue').ids;
	var fmarkids =$('#compmark').jeasycombo('getvalue').ids;
	var classnames =$('#comclass').jeasycombo('getvalue').texts;
	var marknames =$('#compmark').jeasycombo('getvalue').texts;
	var fstorenameid =$('#compstore').val();
	var data={};
	data["fstockclassids"]=fstockclassids;
	data["fmarkids"]=fmarkids;
	data["classnames"]=classnames;
	data["marknames"]=marknames;
	data["fstorenameid"]=fstorenameid;
	var dat={
			type:type,
			jsonobj:JSON.stringify(data)
	};
	if (fstockclassids == "") {
		$.messager.alert('提示','经营类别不能为空！',"warning");
		return false;
	}
	if (fmarkids == "") {
		$.messager.alert('提示','经营品牌不能为空！',"warning");
		return false;
	}
	if(fstorenameid == "" || fstorenameid == null){
		$.messager.alert('提示','请选择店铺!',"warning");
	}
	
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:'store/editClassMark.do',
		dataType:'json',
		data:dat,
		success:function(data){
			$.messager.progress("close");
			if(data.result){
				$.messager.alert("提示","更改成功","info",function(){
					$('#setclass').dialog('close');
					search();			
				});
			}else{
				$.messager.alert("提示", "更改失败","warning");
			}
		},
		error : function() {
			$.messager.progress("close");
			$.messager.alert("提示", "请求出错", "warning");
		}
	});
}

//推广天数 保存
function submitDay(){
	var storeid = $('#storeids').val();
	var promoteDays = $('#promotedays').val();
	var r =/^[0-9]*[1-9][0-9]*$/;
	if (promoteDays == "") {
		$.messager.alert("提示", "请输入推广天数！", "warning");
		return false;
	}
	if(!r.test(promoteDays)){
		$.messager.alert("提示", "推广天数只能输入正整数！", "warning");
		return false;
	}
	var dataStr = {
		storeid : storeid,
		promoteDays : promoteDays
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : "POST",
		url : "store/setpromotedays.do",
		dataType : "json",
		data : dataStr,
		success : function(data) {
			$.messager.progress("close");
			if (data.result) {
				$.messager.alert("提示", data.msg, "info");
				$('#setday').dialog('close');
			} else {
				$.messager.alert("提示", data.msg, "warning");
			}
		},
		error : function() {
			$.messager.progress("close");
			$.messager.alert("提示", "请求出错", "warning");
		}
	});
}
//获取当前单位id
function queryUnirID(){
	var unitid;
	$.ajax({
		type:"post",
		url:"unitstock/queryUnitidsto.do",
		dataType:"json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			unitid=data;
		}
	});
	return unitid;
}

//设置广告
function addtemplate(id,rows,type,temp){
	if(rows.length > 1){
		$.messager.alert("提示", "只能选择一行数据！", "warning");
		return;
	}
	var row = rows[0];
	if(row.ftemplatename==""){
		$.messager.alert("提示","设置广告之前需要设置模板哦！", "warning"); 
		return false;
	}
	window.open("store/unitstoread.do?type="+type+"&storeId="+id+"&templateType="+temp);
}

//生成第四套模板
function createTemplate(){
	$.messager.confirm("提示", "您确定要生成第四套模板的页面吗？", function(r){
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:'wxStock/storeStatics.do',
				success:function(data){	
					$.messager.progress("close");
					 if(data == true || data == 'true'){
						 $.messager.alert("提示", "生成成功","info");
					 }else{
						 $.messager.alert("提示", "生成失败，请重新生成页面","warning");
					 }
				}
			});
		}
	});
}

//设置模板
function addtemplatetype(ids,rows,type,temp){
	if(rows.length > 1){
		$.messager.alert("提示", "只能选择一行数据！", "warning");
		return;
	}
	window.open("store/getStoreTemplate.do?type="+type+"&storeId="+ids+"&templateType="+temp);
}

//终止
function doStopStore(ids,rows){
	$.messager.confirm("提示", "您确定要终止选中的店铺吗？", function(r){
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"post",
				url:"store/stopStore.do",
				data:{ids:ids},
				success:function(data){
					$.messager.progress("close");
					$.messager.alert("提示",data.msg);
					search();
				}
			});
		}
	});
}


var isInitQR = false;
//初始化生成二维码的公众号
function initDialogQR(){
	if(!isInitQR){		
		//公众号
		$("#FOAID").jeasycombo({
			label:"公众号:",
			labelWidth:50,
			width:280,
			multiple : false,//是否多选
			type : "list",//弹出的样式
			url: "wUser/queryOAUnitID.do",
			onChange:function(ids,texts){
				$("#code").val(ids);
			}
		});
		isInitQR = true;
	}
	$('#creatQR').dialog('open');
}

//弹出生成二维码
function createQR(ids,rows){
	$('#storeid').val(ids);
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		 type:"POST",
		 url:"qrmanage/selectQRcode.do?gameid="+ids+"&gameType=005",//店铺推广=005
		 dataType:"json",
		 success:function(data){
			if(data.fid==undefined){
				 $.ajax({
					 type:"POST",
					 url:"game/queryOfficialAccount.do",
					 dataType:"json",
					 success:function(data){
						$.messager.progress("close");
						if(data>1){
							$("#qr").html("");
							$("#fqrcode").hide();
							$("#codeurl").val("");
							$("#codeticket").val("");
							//$("#upload_btn").jbootdialog("show");
							initDialogQR();
						}else{
							$("#qrs").html("");
							$("#fqrcode").hide();
							$("#codeurl").val("");
							$("#codeticket").val("");
							//$("#upload_btns").jbootdialog("show");
							initDialogQR();
							$.ajax({
								 type:"POST",
								 url:"game/queryOfficialid.do",
								 dataType:"json",
								 success:function(data){
									$("#code").val(data);
									$.messager.progress("close");
									QRcode(0);
								},error:function(){
									$.messager.progress("close");
									$.messager.alert("提示","请求出错！", "error");
								}
							 });
						}
					},error:function(){
						$.messager.progress("close");
						$.messager.alert("提示","请求出错！", "error");
					}
				 });
			}else{
				$.messager.progress("close");
				$.messager.alert("提示","该店铺二维码已生成，如需要变更公众号，请先终止该二维码！", "error");
			}
		},error:function(){
			$.messager.progress("close");
			$.messager.alert("提示","请求出错！", "error");
		}
	 });
}

//终止二维码
function stopQR(ids,gameTypes){
	$.messager.progress({text : "正在处理，请稍候..."});
	var dat={
			gameid:ids,
			gameType:gameTypes
	};
	$.ajax({
		 type:"POST",
		 url:"qrmanage/stopQRcode.do",
		 dataType:"json",
		 data:dat,
		 success:function(data){
			 $.messager.progress("close");
			 if(data.result){
				 $.ajax({
					 type:"POST",
					 url:"store/clearstoreQR.do",
					 dataType:"json",
					 data:dat,
					 success:function(data){
						 if(data.result){
							 $.messager.alert("提示","二维码终止成功", "info");
						 }else{
							 $.messager.alert("提示",data.msg, "error");
						 }
					 },error:function(){
						 $.messager.progress("close");
						 $.messager.alert("提示","请求出错！", "error");
					 }
				 });
				 
			 }else{ 
				 $.messager.alert("提示",data.msg, "error");
			 }
		 },
		 error:function(){
			 $.messager.progress("close");
			 $.messager.alert("提示","请求出错！", "error");
		 }
	});
}

//生成二维码
function QRcode(id){
	var oaid = $("#code").val();
	var gameid = $("#storeid").val();
	if(id==1){
		var foaid=$("#FOAID").val();
		if(foaid==""){
			$.messager.alert("提示","未选择公众号，不能生成二维码","info");
			return false;
		}
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"qrmanage/getGenerateQRcode.do?&oaid="+oaid+"&gameType=005&gameid="+gameid,//gemaType=005表示店铺推广
		dataType:"json",
		success:function(data){
			$.messager.progress("close");
			if(data.url!=undefined||data.url!=""){
				if(id==1){
					$("#qr").html("");
					$("#qr").append("<img src='select/qrImage.do?content="+data.url+"&oaid="+oaid+"' border='1px solid red' style='width:200px;height:200px;'/>");
				}else{
					$("#qrs").html("");
					$("#qrs").append("<img src='select/qrImage.do?content="+data.url+"&oaid="+oaid+"' border='1px solid red' style='width:200px;height:200px;'/>");
				}
				var fqrcode = "select/qrImage.do?content="+data.url+"&oaid="+oaid;
				$("#codeurl").val(data.url);
				$("#codeticket").val(data.ticket);
				//showQRcode(fqrcode);
				$("#fqrcode").val(fqrcode);//.show();
			}else{
				//$("#upload_btn").jbootdialog("hide");
				//$("#upload_btns").jbootdialog("hide");
				$("#creatQR").dialog("close");
				$.messager.alert("提示",data.msg,"error");
				$("#sign").val(1);
				$("#signs").val(id);//标记多个公共号的时候
			}
		},error:function(){
			$.messager.progress("close");
			$.messager.alert("提示","请求出错！", "error");
		}
	});
}

//保存二维码
function addQRcode(){
	var code = $("#code").val();//公众号id
	var codeurl = $("#codeurl").val();
	var codeticket = $("#codeticket").val();
	var gameid = $("#storeid").val();
	var sign = $("#sign").val();
	var signs = $("#signs").val();
	if(sign==1){
		if(signs==1){
			//$("#upload_btn").jbootdialog("hide");
			$("#creatQR").dialog("close");
		}
		//$("#upload_btns").jbootdialog("hide");
		$("#creatQR").dialog("close");
	}else{
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
			url:"qrmanage/addGenerateQRcode.do?gameType=005",
			dataType:"json",
			data:dat,
			success:function(data){
				$.messager.progress("close");
				if (data.result) {
					$.ajax({
						type:"POST",
						url:"store/addstoreQR.do",
						dataType:"json",
						data:dat,
						success:function(data){
							if(data.result){
								$.messager.alert("提示","二维码已成功添加","info");
								//$("#upload_btn").jbootdialog("hide");
								//$("#upload_btns").jbootdialog("hide");
								$("#creatQR").dialog("close");
							}else{
								$.messager.alert("提示",data.msg, "error");
								//$("#upload_btn").jbootdialog("hide");
								//$("#upload_btns").jbootdialog("hide");
								$("#creatQR").dialog("close");
							}
						},error:function(){
							$.messager.progress("close");
							$.messager.alert("提示","请求出错！", "error");
						}
					});
				}else{
					$.messager.alert("提示",data.msg, "error");
					//$("#upload_btn").jbootdialog("hide");
					//$("#upload_btns").jbootdialog("hide");
					//$("#creatQR").dialog("close");
				}
			},error:function(){
				$.messager.progress("close");
				$.messager.alert("提示","请求出错！", "error");
			}
		});
	}
}