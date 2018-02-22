  function addTags(obj){
	  var data_prize = accordion.getValue();
	  var title = $("#ftitle").val();
	  if(title==""){
		  $.messager.alert("提示","主题不能为空", "warning");
		  return false;
	  }
	  if(title.length>10){
		  $.messager.alert("提示","主题长度不能大于10字符！","warning");
		  return false;
	  }
	  var fcollecttype=Util.getValueSwitch("#searchUseType");
	  var data={};//创建了一个json对象
	  if(fcollecttype){
			data["select"]=1;
	  }else{
			data["select"]=0;
	  }
	  data["title"]=title;
	  data["FType"]=type.type;
	  if(!accordion.isEmpty()){
	  if(type.type==1){
		  data["tagCID"] = tagCID.tagCaptionID;
	  }
	 
	  var dat={
			 jsonobj:JSON.stringify(data),
			 accordion:JSON.stringify(data_prize)
			};
	  $.messager.progress({text : "正在处理，请稍候..."});
	  $.ajax({
			type:'POST',
			url : 'publictag/addPTags.do',
			dataType : "json",
			data:dat,
			async:false,
			success:function(data){
				$.messager.progress('close');
				if (data.result==true) {
					$.messager.alert("提示","添加成功！","info");
						if(obj==2){//保存后继续添加
							window.parent.addPTag();
					    	parent.search();
					    }else{//保存
							window.parent.closeDialog();
					    	parent.search();
					    }
				}else{
					$.messager.alert("提示",data.msg,"warning");
					
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress('close');
				result=false;
				$.messager.alert("提示","添加失败","warning");
			}
		});
  	 }
  }

	  