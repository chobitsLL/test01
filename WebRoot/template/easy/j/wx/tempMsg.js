//设置模板url
function setTempUrl(){
	$.messager.progress({text : "正在处理，请稍候..."});
	var fids=$("#addDialog").attr("fid");
	var furl=$("#furl").val();//url值
	if(!furl||furl==""){
		$.jbootloading("hide");//隐藏加载中 
		$.jbootmsg("请填写模板url！","warning");
		return false;
	}
	$.ajax({
	   url:"testMsgSend/editTempMsg.do",
	   dataType:"json",
	   type:"post",
	   data:{type:4,jsonobj:JSON.stringify({fids:fids,Furl:furl})},
	   success:function(data){
		   $.messager.progress("close");//隐藏加载中
			if(data.result==false){
				 $.messager.alert("提示", "设置失败", "warning");
			}else{
				$('#addDialog').dialog('close')
				$.messager.confirm("提示","设置成功",function(r){if(r){
					search();
				}});
			}
		 },
       error:function(json) { 
    	   $.messager.progress("close");//隐藏加载中
           $.messager.alert("提示", "请求出错", "warning");
        }
	 });    
}

function editinit(){
	$("#wxcommoa1").jeasycombo({
		multiple : false,//是否多选
		type : "list",//弹出的样式
		url: "wUser/queryOAUnitID.do",
		label:'公众号:',
		labelWidth:80,
		width:300,
		dlgwidth:600
	});
	//一级类别
	$("#firstlevel").combobox({
		editable:false,
        url:"testMsgSend/tempTradeLevelQuery.do?level=1&type=1"
	});
	//一级类别
	$("#secondlevel").combobox({
		editable:false,
        url:"testMsgSend/tempTradeLevelQuery.do?level=2&type=1"
	});
}