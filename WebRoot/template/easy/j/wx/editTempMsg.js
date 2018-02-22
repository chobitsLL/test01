function getLevel(){
	$("#wxcommoa1").jeasycombo({
		multiple : false,//是否多选
		type : "list",//弹出的样式
		url: "wUser/queryOAUnitID.do",
		label:'公众号:',
		labelWidth:80,
		width:300,
		dlgwidth:600,
		onChange:function(ids,texts){
			if(ids&&ids!=""){//一级类别
				var oaid =$("#wxcommoa1").jeasycombo("getvalue").ids;
				$("#firstlevel").combobox({
					editable:false,
			        url:"testMsgSend/tempTradeLevelQuery.do?level=1&type=2&jsonobj="+JSON.stringify({FOAID:oaid,FparentID:0}),
			        onChange:function(){
			        	if($(this).val()==0){
			        		$("#secondlevel").val(0);
			        		$("#temptype").val(0);
			        	}else{
			        		var firstlevel=$("#firstlevel").combobox("getValue");
			        		$("#secondlevel").combobox({
			        			editable:false,
			        	        url:"testMsgSend/tempTradeLevelQuery.do?level=2&type=2&jsonobj="+JSON.stringify({FOAID:oaid,FparentID:firstlevel})
			        		});
			        	}
			        }
				});
			}
		}
	});
	$("#temptype").combobox({
		editable:false,
        url:"testMsgSend/tempMsgAllQuery.do"
	});
	$("#wxcommoa1").jeasycombo("setvalue","");
	$("#firstlevel").combobox('setValue',"");
	$("#secondlevel").combobox('setValue',"");
	$("#temptype").combobox('setValue',"");
	var type=$("#add_btn").attr("type");
	if(type==2){
		var oaid =$("#easy_table").datagrid("getSelected").foaid;
		var fparentid =$("#easy_table").datagrid("getSelected").fparentid;
		var ftradeid =$("#easy_table").datagrid("getSelected").tradeid;
		var ftempmsgid =$("#easy_table").datagrid("getSelected").ftempmsgid;
		$("#firstlevel").combobox({
			editable:false,
	        url:"testMsgSend/tempTradeLevelQuery.do?level=1&type=2&jsonobj="+JSON.stringify({FOAID:oaid,FparentID:0}),
		});
		$("#secondlevel").combobox({
			editable:false,
	        url:"testMsgSend/tempTradeLevelQuery.do?level=2&type=2&jsonobj="+JSON.stringify({FOAID:oaid,FparentID:fparentid})
		});
		$("#wxcommoa1").jeasycombo("setvalue",""+oaid+"");
		$("#firstlevel").combobox('setValue',fparentid);
		$("#secondlevel").combobox('setValue',ftradeid);
		$("#temptype").combobox('setValue',ftempmsgid);
	}
}

//点击确定
function uGroupSave(){
	$.messager.progress({text : "正在处理，请稍候..."});
	var type =$("#add_btn").attr("type");
	var oaid =$("#wxcommoa1").jeasycombo("getvalue").ids;
	//一级行业
	var firstlevel=$("#firstlevel").combobox("getValue");
	//二级行业
	var secondlevel=$("#secondlevel").combobox("getValue");
	//模板
	var tempType=$("#temptype").combobox("getValue");
	var fids=0;
	if(type==2){
		fids=$("#easy_table").datagrid("getSelected").fid;
	}
	if(!oaid||oaid==""){
		$.messager.progress("close");//隐藏加载中
		$.messager.alert("提示", "请先选择公众号!","warning");
		return;
	}
	if(firstlevel==0){
		$.messager.progress("close");//隐藏加载中
		$.messager.alert("提示", "请选择一级行业!","warning");
		return;
	}
	
	if(secondlevel==0){
		$.messager.progress("close");//隐藏加载中
		$.messager.alert("提示", "请选择二级行业!","warning");
		return;
	}
	
	if(tempType==0){
		$.messager.progress("close");//隐藏加载中
		$.messager.alert("提示", "请选择模板!","warning");
		return;
	}
	// 获取用户填写的参数
	$.ajax({
		type:"POST",
		url:"testMsgSend/addTempMsg.do",
		data:{jsonobj:JSON.stringify({FOAID:oaid,FtradeID:secondlevel,FtempMsgId:tempType,type:type,fids:fids})},
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$("#add_btn").dialog('close');
				$.messager.confirm("提示",type==1?"添加成功":"修改成功",function(r){if(r){
					search();
				}});
			} else {
				if(data.error){
					 $.messager.alert("提示", data.info,"warning");
				}else{
					 $.messager.alert("提示", data.msg,"warning");
				}
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错", "warning");
    	}
	});
}
    