var inputList = [];
inputList.push(bindvalidate("#FTitle","none",true,"页面标题"));
inputList.push(bindvalidate("#FCreateTime","none",true,"创建时间"));

function save(){
	var FTitle=$("#FTitle").val();
	if(FTitle==""){
		$.messager.alert("提示", "标题不能为空！", "warning");
		return false;
	}
	var flag = true;
	for (var i = 0; i < inputList.length; i++) {
		var o = inputList[i];
		if(!o.chaeckValue(o)){
			flag = false;
		}
	}
	if(flag){
	   var ftitle=$("#FTitle").val();
	   var fabstract=$("#FAbstract").val();
	   var fsharetitle=$("#FShareTitle").val();
	   var fsharelinkurl="";//$("#FShareLinkUrl").val();
	   var fshareimgurl=$("#FShareImgUrl").val();
	   var fsharedescription=$("#FShareDescription").val();
	   var fid=$("#FID").val();
	   var fsigned=Util.getValueSwitch("#fsigned");
	   if(fsigned){
		   fsigned=1;
	   }else{
		   fsigned=0;
	   }
	   var fneedwatch=Util.getValueSwitch("#FNeedWatch");
	   if(fneedwatch){
		   fneedwatch=1;
	   }else{
		   fneedwatch=0;
	   }
	   var fdmsigntitle=$("#FDMSignTitle").val();
	   var fshowaddress=Util.getValueSwitch("#FShowAddress");
	   if(fshowaddress){
		   fshowaddress=1;
	   }else{
		   fshowaddress=0;
	   }
	   var fshowmind=Util.getValueSwitch("#FShowMind");
	   if(fshowmind){
		   fshowmind=1;
	   }else{
		   fshowmind=0;
	   }
	   var fshowabstract=Util.getValueSwitch("#FShowAbstract");
	   if(fshowabstract){
		   fshowabstract=1;
	   }else{
		   fshowabstract=0;
	   }
	   var fneedpayed=Util.getValueSwitch("#paymentpay");
	   if(fneedpayed){
		   fneedpayed=1;
	   }else{
		   fneedpayed=0;
	   }
	   var famount=$("#FAmount").val();
	   var FRealFlowCount=$("#FRealFlowCount").val();
	   var fshowitem1=Util.getValueSwitch("#FShowItem1");
	   if(fshowitem1){
		   fshowitem1=1;
	   }else{
		   fshowitem1=0;
	   }
	   var fitem1title=$("#FItem1Title").val();
	   var fshowitem2=Util.getValueSwitch("#FShowItem2");
	   if(fshowitem2){
		   fshowitem2=1;
	   }else{
		   fshowitem2=0;
	   }
	   var fitem2title=$("#FItem2Title").val();
	   var fshowitem3=Util.getValueSwitch("#FShowItem3");
	   if(fshowitem3){
		   fshowitem3=1;
	   }else{
		   fshowitem3=0;
	   }
	   var fitem3title=$("#FItem3Title").val();
	   var fshowitem4=Util.getValueSwitch("#FShowItem4");
	   if(fshowitem4){
		   fshowitem4=1;
	   }else{
		   fshowitem4=0;
	   }
	   var fitem4title=$("#FItem4Title").val();
	   var userid=$("#user").val();//"${sessionScope.user.FID}";
	   if(userid==""){
			$.messager.alert("提示", "您还未登录，请您先登录后再操作！", "warning");
			return false;
		}
	   var fenddate = $("#FEndDate").val();
	   var data={};
		data["ftitle"]=ftitle;
		data["fabstract"]=fabstract;
		data["fsharetitle"]=fsharetitle;
		data["fsharelinkurl"]=fsharelinkurl;
		data["fshareimgurl"]=fshareimgurl;
		data["fsharedescription"]=fsharedescription;
		data["fid"]=fid;
		data["fsigned"]=fsigned;
		data["fneedwatch"]=fneedwatch;
		data["fdmsigntitle"]=fdmsigntitle;
		data["fshowaddress"]=fshowaddress;
		data["fshowmind"]=fshowmind;
		data["fshowabstract"]=fshowabstract;
		data["fneedpayed"]=fneedpayed;
		data["famount"]=famount;
		data["frealflowcount"]=FRealFlowCount;
		data["fenddate"]=fenddate;
		
		data["fshowitem1"]=fshowitem1;
		data["fitem1title"]=fitem1title;
		data["fshowitem2"]=fshowitem2;
		data["fitem2title"]=fitem2title;
		data["fshowitem3"]=fshowitem3;
		data["fitem3title"]=fitem3title;
		data["fshowitem4"]=fshowitem4;
		data["fitem4title"]=fitem4title;
		var dat={
			jsonobj:JSON.stringify(data)
		};
		$.messager.progress({text : "正在处理，请稍候..."});
		var contextPath = $("#contextPath").val();
		var fstate=$("#fstate").val();
		var FID=$("#FID").val();
		$.ajax({
			type:"POST",
			url:contextPath+"/dm/updateDMTitle.do",
			dataType:"json",
			data:dat,
			success:function(data){
				$.messager.progress("close");//隐藏加载中
				if(data.result&&fstate=="1"){
					//判断如果活动是已发布状态   重新生成dm单
					$.messager.progress({text : "正在处理，请稍候..."});
					$.ajax({
						url: "dm/releaseDm.do?ids="+FID,
						dataType: "json",
						success:function(data){
							$.messager.progress("close");//隐藏加载中
							if(data.result==false){
								$.messager.alert("提示", data.msg, "warning");
							}
							else{
								$.messager.confirm('确认','保存成功,是否返回到列表页',function(r){ 
									if(r){
										window.location.href=contextPath+"/dm/page.do";
									}
								});
							}
						},error:function(){
							$.messager.progress("close");//隐藏加载中
							$.messager.alert("提示", "请求出错！", "warning");
						}
					});
				}else if(data.result&&fstate=="0"){
					$.messager.alert("提示", "保存成功！", "warning");
				}else{
					$.messager.alert("提示", "保存失败！", "warning");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
			}
		});
	 }
}