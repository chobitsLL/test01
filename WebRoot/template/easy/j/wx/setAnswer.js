var gameid=$("#gameid").val();
function doSearch(){
	 var guessTypeID=$("#itemtype").val();
	 if(guessTypeID<=0){
		 $.messager.alert("提示", "没有要设置答案的问题！", "warning");
		 return false
	 };
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		type:'post',
		url:"game/getUnPublishGuessQuestion.do",
		data:{gameID:gameid,guessTypeID:guessTypeID},
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			 var html = "";
			 for(var i=0;i<data.length;i++){
				 var span = '<span>------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span></div>';
				 var problem = '<div><label style="font-size: 14px; margin-left: 414px;">&#12288;&#12288;问题：</label>';
				 var answerOption = '<label style="font-size: 14px; margin-left: 414px;">答案选项：</label>';
				 var correctAnswer = '<label style="font-size: 14px; margin-left: 414px;">正确答案：</label>';
				 var btn = '';
				 if(data[i].fpublished==0){
					 btn = '<span style="margin-left: 68%;" class="btn btn-search btn-sm" onclick="setAnswer('+data[i].fid+')">设置</span><br/>';
				 }
				 problem+='<span>'+data[i].fname+'</span><br/>';
				 var anwserlist = data[i].fanwserlist.replace(/=/g,"、");
				     anwserlist = anwserlist.replace(/,/g,'&#12288;&#12288;');
				 answerOption+='<span>'+anwserlist+'</span><br/>';
				 if(data[i].ftype==0){
					 correctAnswer+='<input id="answer'+data[i].fid+'" value="'+data[i].fanwser+'" style="margin-top: 10px;width:300px;border:none;border-bottom:1px solid #333;" type="text"  onkeyup="javascript:CheckInputIntFloat(this);" ><br/>'+btn+span;
				 }else{
				 correctAnswer+='<input id="answer'+data[i].fid+'" value="'+data[i].fanwser+'" style="margin-top: 10px;width:300px;border:none;border-bottom:1px solid #333;" type="text"><br/>'+btn+span;
				 }
				 
				 html+=problem+answerOption+correctAnswer;
			 }
			 $("#anwserList").html(html);
			 var anwser_height=$("#anwserList").outerWidth();
			 $("#anwserList").height(anwser_height)
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "获取失败！", "warning");
		}
	 });
}

//问题组
function mugroupque(){
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		type:'post',
		url:"game/getUnPublishGuessType.do",
		data:{gameid:gameid},
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			var prizehtml='<label for="fname" style="font-size: 16px;">&#12288;问题类目：</label><select class="form-control input-sm" ques" id="itemtype" style="width: 300px;">'
			for(var i=0;i<data.length;i++){
				prizehtml+='<option value="'+data[i].fid+'">'+data[i].fname+'</option>'
			}
	  	    prizehtml+='</select>&#12288;<span class="btn btn-searchs btn-sm" onclick="doSearch()">查询</span>'
	  	    $("#searesult").html(prizehtml);
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
} 

//设置问题
function setAnswer(questionid){
	var answer = $("#answer"+questionid).val();
	var guessTypeID=$("#itemtype").val();
	$.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		type:'post',
		url:"game/setUnPublishGuessQuestion.do",
		data:{gameID:gameid,guessTypeID:guessTypeID,answer:answer,questionID:questionid},
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data){
				$.messager.alert("提示", "设置成功！", "warning");
			}else{
				$.messager.alert("提示", "设置失败！", "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	 });
}

function CheckInputIntFloat(oInput) { 
	if (oInput.value.length == 1) {
		oInput.value = oInput.value.replace(/[^1-9]/g, '');
	} else {
		oInput.value = oInput.value.replace(/\D/g, '');
	}
}