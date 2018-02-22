//重置中奖状态
var gameid = $("#gameid").val();
function cleanPrize(){
	$.messager.confirm('确认', '清除中奖状态后，已经中奖的用户可以再次参与摇奖。<br/>您确定要执行该操作吗？', function(r){	
		 if (r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'POST',
				url:"game/cleanPrizeState.do?gameid="+gameid,
				dataType : "json",
				async : false, // 同步 等待ajax返回值
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if (data.result) {
						$.messager.alert("提示", data.msg, "warning");
					}else{
						$.messager.alert("提示", data.msg, "warning");
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "执行失败！", "warning");
				}
			});
		 }
	});
}
//遍历数据
function ajaxPageSuccess(prizemap){
	if(!prizemap.rows){
		$.messager.alert("提示", "登录超时，请重新登录后再操作！", "warning");
		return;
	}
	if (prizemap.result == false) {
		return;
	}
	var tbody = $("#jboottable tbody");
	tbody.empty();
	for (var i = 0; i < prizemap.rows.length; i++){
		var tr = $("<tr></tr>");
		var td = "<td></td>";
		var map=prizemap.rows[i];
		tr.append("<td>"+map.fname+"</td>");
		tr.append("<td>"+map.fdescription+"</td>");
		tr.append("<td>"+map.fmaximum+"</td>");
		tr.append("<td>"+map.fremaincount+"</td>");
		tr.append("<td class='cleans' id='td_"+map.fid+"'></td>");
		tr.appendTo(tbody);
	}
};
function judge(sign){
	var ins = 0; 
	if(sign==1){
		ins = 3
	}else if(sign==2){
		ins = 0
	}else if(sign==3){
		ins = 0
	}else if(sign==4){
		ins = 1
	}else if(sign==5){
		ins = 2
	}else if(sign==6){
		ins = 0
	}
	return ins;
}

//按钮组
function totalRegister(gameid,sign,typeid){
	 var fstate = $("#fstate").val();
	 if(sign==4){//确认按钮
		 var fmaximum=$("#FMaximum").textbox("getValue");
		 var remainCount = $("remainCount").val();
		 var n=Math.ceil((8.5*fmaximum)/60);
		 var fgameprizeid=$("#FGamePrizeID").val();
		 if(fgameprizeid==""){
			 $.messager.alert("提示", "奖项不能为空，请选择奖项！", "warning");
			 return false;
		 }
		 if(fmaximum==""){
			 $.messager.alert("提示", "摇奖数量不能为空，请输入摇奖数量！", "warning");
			 return false;
		 }
		 if(fmaximum>remainCount){
			 $.messager.alert("提示", "输入摇奖数量不能大于奖品的剩余数量！", "warning");
			 return false;
		 }
		 if(typeid==6){
	 		$.messager.confirm('确认', '本轮奖品全部抽完预计需要'+n+'分钟，要确认吗？', function(r){	
				 if (r){
					 $.messager.progress({text : "正在处理，请稍候..."});
					 $.ajax({
						 type:"POST",
						 url:"game/updateCurrentState.do?gameid="+gameid+"&sign="+sign+"&fgameprizeid="+fgameprizeid+"&fmaximum="+fmaximum+"&typeid="+typeid,
						 dataType:"json",
						 success:function(data){
							 $.messager.progress("close");//隐藏加载中
							 if(data){
								 if(data.currentState){ // 状态错误
									 $.messager.alert("提示", data.msg, "warning");
								 }else if(data.result){ // SQL执行成功
									 if(sign!=3){
										 $.messager.progress({text : "准备中，稍等10秒......"});
										 setTimeout(function () { 
											 $.messager.progress("close");//隐藏加载中
											 $("#fstate").val(judge(sign)); 
											 var ids = $("#ids").val();//当前奖项id
											 var FMaximum=$("#FMaximum").textbox("getValue");
											 $(".cleans").html(0);//全部替换成零
											 $("#td_"+ids).html(FMaximum);
											 $.messager.alert("提示", "操作成功！", "warning");
									     }, 10000);
									 }else{
										 $("#gamehistory").val(judge(sign));
									 }
								 }else{ // SQL执行失败
									 $.messager.alert("提示", data.msg, "warning");
								 }
							 }else{ // 异常
								 $.messager.alert("提示", "请求出错！", "warning");
							 }
						},error:function(){
							$.messager.progress("close");//隐藏加载中
							$.messager.alert("提示", "请求出错！", "warning");
						}
					 });
				 }
		 	});
		 }else{
			 $.messager.progress({text : "正在处理，请稍候..."});
			 $.ajax({
				 type:"POST",
				 url:"game/updateCurrentState.do?gameid="+gameid+"&sign="+sign+"&fgameprizeid="+fgameprizeid+"&fmaximum="+fmaximum+"&typeid="+typeid,
				 dataType:"json",
				 success:function(data){
					 $.messager.progress("close");//隐藏加载中
					 if(data){
						 if(data.currentState){ // 状态错误
							 $.messager.alert("提示", data.msg, "warning");
						 }else if(data.result){ // SQL执行成功
							 if(sign!=3){
								 $.messager.progress({text : "准备中，稍等10秒......"});
								 setTimeout(function () { 
									 $.messager.progress("close");//隐藏加载中
									 $("#fstate").val(judge(sign)); 
									 var ids = $("#ids").val();//当前奖项id
									 var FMaximum=$("#FMaximum").textbox("getValue");
									 $(".cleans").html(0);//全部替换成零
									 $("#td_"+ids).html(FMaximum);
									 $.messager.alert("提示", "操作成功！", "warning");
							     }, 10000);
							 }else{
								 $("#gamehistory").val(judge(sign));
							 }
						 }else{ // SQL执行失败
							 $.messager.alert("提示", data.msg, "warning");
						 }
					 }else{ // 异常
						 $.messager.alert("提示", "请求出错！", "warning");
					 }
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
				}
			 });
		 }
	 }else{
		 if(typeid==6&&sign==6){
			$.messager.confirm('确认', '该功能用于处理大屏异常状态，大屏正常时请勿点击确认。（本轮奖品已全部分配完毕）', function(r){	
				 if (r){
					 $.messager.progress({text : "正在处理，请稍候..."});
					 $.ajax({
						 type:"POST",
						 url:"game/updateCurrentState.do?gameid="+gameid+"&sign="+sign+"&fgameprizeid=0&fmaximum=0&typeid="+typeid,
						 dataType:"json",
						 success:function(data){
							 $.messager.progress("close");//隐藏加载中
							 if(data){
								 if(data.currentState){ // 状态错误
									 $.messager.alert("提示", data.msg, "warning");
								 }else if(data.result){ // SQL执行成功
									 if(sign!=3){
										 $("#fstate").val(judge(sign));
									 }else{
										 $("#gamehistory").val(judge(sign));
									 }
									 $.messager.alert("提示", "操作成功！", "warning");
								 }else{ // SQL执行失败
									 $.messager.alert("提示", data.msg, "warning");
								 }
							 }else{ // 异常
								 $.messager.alert("提示", "请求出错！", "warning");
							 }
						},error:function(){
							$.messager.progress("close");//隐藏加载中
							$.messager.alert("提示", "请求出错！", "warning");
						}
					 });
				 }
			});
		 }else{
			 $.messager.progress({text : "正在处理，请稍候..."});
			 $.ajax({
				 type:"POST",
				 url:"game/updateCurrentState.do?gameid="+gameid+"&sign="+sign+"&fgameprizeid=0&fmaximum=0&typeid="+typeid,
				 dataType:"json",
				 success:function(data){
					 $.messager.progress("close");//隐藏加载中
					 if(data){
						 if(data.currentState){ // 状态错误
							 $.messager.alert("提示", data.msg, "warning");
						 }else if(data.result){ // SQL执行成功
							 if(sign!=3){
								 $("#fstate").val(judge(sign));
							 }else{
								 $("#gamehistory").val(judge(sign));
							 }
							 $("#FMaximum").textbox('setValue','');
							 $.messager.alert("提示", "操作成功！", "warning");
						 }else{ // SQL执行失败
							 $.messager.alert("提示", data.msg, "warning");
						 }
					 }else{ // 异常
						 $.messager.alert("提示", "请求出错！", "warning");
					 }
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
				}
			 });
		 }
	 }
}
//刷新摇奖信息
function refreshLettery(){
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"game/selectRegistrationNumber.do?gameid="+gameid+"&sign="+typeid,
		 dataType:"json",
		 success:function(datas){
			 $.messager.progress("close");//隐藏加载中
			 $("#FRegistrationNumber").empty();
			 $("#FRegistrationNumber").html("已登记人数:"+datas.registrationNumber);
			 $("#registrationNumber").val(datas.registrationNumber);
			 
			 $("#FCurrentState").empty();
			 var currentState = datas.currentState.fcurrentstate;
			 var value="";
			 if(currentState==0){
				 value="等待";
			 }else if(currentState==1){
				 value="准备摇奖";
			 }else if(currentState==2){
				 value="正在摇奖";
			 }else if(currentState==3){
				 value="正在登记";
			 }
			 
			 $("#FCurrentState").html("活动状态:"+value);
			 $("#FCurrentState").val(value);
			 $("#jboottable").attr("wy_id",0);//清空对摇奖数量的存储
			 $("#jboottable").attr("wy_count",0);
			 $(".cleans").each(function(){ //存放本轮摇奖数量，仅支持一个奖项！
				 if(parseInt(this.innerHTML)>0){
					 $("#jboottable").attr("wy_id",$(this).attr("id"));
					 $("#jboottable").attr("wy_count",this.innerHTML);
				 }
			 });
			 $.messager.progress({text : "正在处理，请稍候..."});
			 $.ajax({
				 type:"POST",
				 url:"game/selectPrize.do?gameid="+gameid,
				 dataType:"json",
				 success:function(data){
					 $.messager.progress("close");//隐藏加载中
					 ajaxPageSuccess(data);//重新加载表格
					 var wy_id = $("#jboottable").attr("wy_id");
					 if(wy_id){
						$("#"+wy_id).html($("#jboottable").attr("wy_count")); 
					 }
					 $.messager.alert("提示", "操作成功！", "warning");
				},error:function(){
					$.messager.progress("close");//隐藏加载中
					$.messager.alert("提示", "请求出错！", "warning");
				}
			 });
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
}
//判断数量
function judgeNumber(){
	 var FGamePrizeID=$("#FGamePrizeID").val();
	 if(FGamePrizeID==""){
		 $.messager.alert("提示", "请选择奖项！", "warning");
		 return false;
	 }
	 var prizeid=$("#ids").val();
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 type:"POST",
		 url:"game/queryPrizes.do?fid="+prizeid,
		 dataType:"json",
		 success:function(data){
			 $.messager.progress("close");//隐藏加载中
			 //剩余数量
			 var remainCount=data;
			 var FMaximum = $("#FMaximum").textbox("getValue");
			 if(remainCount-FMaximum<0){
				$.messager.alert("提示", "输入该奖项的奖品数量不能超过剩余数量！", "warning");
				$("#FMaximum").textbox("setValue","");
				return false;
			 }
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
}