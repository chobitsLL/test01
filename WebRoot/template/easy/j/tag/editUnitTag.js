var accordion=null;//定于手风琴对象
function confirm(n,type){//n=0是保存后继续添加  1是保存
	var captionName = $('#ftitle').val();
	if(captionName == '' || typeof captionName == undefined){
		//$.jbootmsg('分类名称不能为空',"error");
		$.messager.alert("提示","主题不能为空","warning");
		return ;
	}	
	
	var fcollecttype=Util.getValueSwitch("#searchUseType");
	var data_c = {};//创建了一个json对象
	  if(fcollecttype){
		  data_c["FUseType"]=1;
	  }else{
		  data_c["FUseType"]=0;
	  }
	
	
	var data_tag = accordion.getValue();
	
	if(!accordion.isEmpty()){
		
		data_c['FCaptionID'] = $('#addCaptionID').val();
		data_c['FCaptionName'] = captionName;
		
		var dat={
			jsonobj:JSON.stringify(data_c),
			accordion:JSON.stringify(data_tag)
		};
		if(parseInt(type) == 1){//新增
			$.messager.progress({text : "正在处理，请稍候..."});
			
			$.ajax({
				type:'POST',
				url:"unitTag/addUnitTag.do",
				dataType : "json",
				data:dat,
				async:false,
				success:function(data){
					$.messager.progress('close');
					if (data.result == true) {
						$.messager.alert("提示","添加成功！","warning");
						if(parseInt(n) == 1){
							//editSuccess();
							window.parent.closeDialog();
					    	parent.search();
						}else{//0是
							//保存后继续增加
							//editContinue();
							window.parent.closeDialog1();
					    	parent.search();
						}
					}else{
						$.messager.alert("提示",data.msg,"warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.progress('close');
					$.messager.alert("提示","添加失败！","warning");
				}
			})
		}else{//编辑
			$.messager.progress({text : "正在处理，请稍候..."});
			
			$.ajax({
				type:'POST',
				url:"unitTag/updateUnitTag.do",
				dataType : "json",
				data:dat,
				async:false,
				success:function(data){
					$.messager.progress('close');
					if (data.result == true) {
						$.messager.alert("提示","更新成功！","warning");
						//editSuccess();
						//关闭窗口，添加成功
						window.parent.closeDialog();
				    	parent.search();
				    	
					}else{
						$.messager.alert("提示",data.msg,"warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.progress('close');
					$.messager.alert("提示","更新失败！","warning");
				}
			})
		}
	}
}
