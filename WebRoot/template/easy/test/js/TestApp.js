$(function() {
	jqClick();
	//输入框只能输入数字
	$("#badge").textbox('textbox').bind('keyup', function(e){
        $("#badge").textbox('setValue', $(this).val().replace(/[^\d.]/g,''));
	});
	$("#btnReset").bind('click', function() {
		resetParam();
	});
	easyCombobox();
});

function easyCombobox(){
	$("#platForm").combobox({
		multiple : false,//是否多选
		width:230,
		labelWidth:90,
		editable:false,
		label:'系统版本:',
		data:[{"fname":"全部","fid":"All","selected":"selected"},
		      {"fname":"Android","fid":"Android"},
	          {"fname":"IOS","fid":"IOS"}],
	    onSelect: function(param){
	    	
		},
	});
	
	$("#stType").combobox({
		multiple : false,//是否多选
		width:230,
		labelWidth:90,
		editable:false,
		label:'定时消息:',
		data:[{"fname":"无","fid":"0","selected":"selected"},
		      {"fname":"定时任务","fid":"1"},
	          {"fname":"定期任务","fid":"2"}],
	    onSelect: function(param){
	    	if(param.fid==0){
	    		$("#hideDIV").hide();
	    		$("#startDIV").hide();
	    		$("#schNameDIV").hide();
	    	}else if(param.fid==1){
	    		$("#hideDIV").hide();
	    		$("#startDIV").show();
	    		$("#schNameDIV").show();
	    	}else if(param.fid==2){
	    		$("#hideDIV").show();
	    		$("#startDIV").show();
	    		$("#schNameDIV").show();
	    	}
	    	
		},
	});
	$("#timeUnit").combobox({
		multiple : false,//是否多选
		width:230,
		labelWidth:90,
		editable:false,
		label:'时间单位:',
		data:[{"fname":"day","fid":"day","selected":"selected"},
		      {"fname":"week","fid":"week"},
	          {"fname":"month","fid":"month"}],
	    onSelect: function(param){
	    	
		},
	});
	$("#point").combobox({
		multiple : true,//是否多选
		width:230,
		labelWidth:90,
		editable:false,
		label:'列表:',
		data:[{"fname":"无","fid":"0","selected":"selected"}],
	});
	
}

function jqClick(){
	$("#sendPush").bind('click', function() {
		var dat = "";
		var badge = $("#badge").textbox("getValue")==""?"-1":$("#badge").textbox("getValue");
		var content = $("#content").val().replace("\n", "");
		var contents = $("#content").val();
		var ss = "aaasssdfgddgfg".replace(/d/g, "----");
//		return;
		dat+="title="+$("#title").textbox("getValue");
		dat+="&btype="+$("#btype").textbox("getValue");
		dat+="&platForm="+$("#platForm").combobox("getValue");
		dat+="&badge="+badge;
		dat+="&content="+content;
		if($("#tags").textbox("getValue")!=0){
			dat+="&tags="+$("#tags").textbox("getValue");
		}
		if($("#alias").textbox("getValue")!=0){
			dat+="&alias="+$("#alias").textbox("getValue");
		}
		if($("#appKey").textbox("getValue")!=0){
			dat+="&appKey="+$("#appKey").textbox("getValue");
		}
		if($("#masterSecret").textbox("getValue")!=0){
			dat+="&masterSecret="+$("#masterSecret").textbox("getValue");
		}
		if($("#regID").textbox("getValue")!=0){
			dat+="&regIds="+$("#regID").textbox("getValue");
		}
		
		var obj = {};
		var stType = $("#stType").combobox("getValue");
		
		if(stType == '0'){
			obj["stType"] = stType; 
		}else if(stType == '1'){
			var t1 = $("#startTime").datetimebox("getValue")
			if(t1.length!=19){
				$.messager.alert('温馨提示',"时间格式不正确！");
				return;
			}
			t1 = t1.substr(0,t1.length-2)+'00'
			obj["stType"] = stType; 
			obj["start"] = t1;
			obj["name"] = $("#schName").textbox("getValue");
		}else if(stType == '2'){
			var t1 = $("#startTime").datetimebox("getValue")
			var t2 = $("#endTime").datetimebox("getValue")
			if(t1.length!=19){
				$.messager.alert('温馨提示',"时间格式不正确！");
				return;
			}
			if(t2.length!=19){
				$.messager.alert('温馨提示',"时间格式不正确！");
				return;
			}
			t1 = t1.substr(0,t1.length-2)+'00'
			t2 = t2.substr(0,t2.length-2)+'00'
			obj["stType"] = stType; 
			obj["start"] = t1;
			obj["end"] = t2;
			obj["name"] = $("#schName").textbox("getValue");
			obj["time"] = getSchTime();
			obj["frequency"] = $("#frequency").textbox("getValue");
			obj["timeUnit"] = $("#timeUnit").combobox("getValue");
			obj["point"] = $("#point").combobox("getValues");
			
		}
		obj["platForm"] = $("#platForm").combobox("getValue");
		
		dat+="&jsonobj="+JSON.stringify(obj);
		$.ajax({
			dataType : 'JSON',
			type : 'post',
			url : 'restful/AppPush/sendPush.do',
			data : dat,
			dataType : "json",
			success : function(data) {
				var htm = '';
				if(data.result){
					var results = data.results;
					var payload = data.payload;
					htm+='<span style="float: left;width: 250px;">resultOK:</span><span style="float: left;">'+results.resultOK+'</span>';
					htm+='<br><span style="float: left;width: 250px;">msg_id 消息ID可被覆盖:</span><span style="float: left;">'+results.msg_id+'</span>';
					htm+='<br><span style="float: left;width: 250px;">sendno推送序号:</span><span style="float: left;">'+results.sendno+'</span>';
					htm+='<br><span style="float: left;width: 250px;">statusCode:</span><span style="float: left;">'+results.statusCode+'</span>';
					htm+='<br><span style="float: left;width: 250px;">payload:</span><span style="float: left;">'+payload+'</span>';
					$("#divData").empty();
					$("#divData").append(htm);
				}else{
					htm+='<span style="float: left;width: 250px;">result:</span><span style="float: left;">'+data.result+'</span>';
					htm+='<br><span style="float: left;width: 250px;">http Status:</span><span style="float: left;">'+data.httpstatus+'</span>';
					htm+='<br><span style="float: left;width: 250px;">error Code:</span><span style="float: left;">'+data.errorcode+'</span>';
					htm+='<br><span style="float: left;width: 250px;">error Message:</span><span style="float: left;">'+data.errormessage+'</span>';
					htm+='<br><span style="float: left;width: 250px;">msgid:</span><span style="float: left;">'+data.msgid+'</span>';
					$("#divData").empty();
					$("#divData").append(htm);
				}
// 				$.messager.alert('温馨提示',data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				 var htm = '';
					htm+='<span style="float: left;width: 250px;">XMLHttpRequest.status:</span><span style="float: left;">'+XMLHttpRequest.status+'</span>';
					htm+='<br><span style="float: left;width: 250px;">XMLHttpRequest.readyState:</span><span style="float: left;">'+XMLHttpRequest.readyState+'</span>';
					htm+='<br><span style="float: left;width: 250px;">statusCode:</span><span style="float: left;">'+textStatus+'</span>';
					$("#divData").empty();
					$("#divData").append(htm);
			}
		});
	});
}
//重置
function resetParam(){
	$("#easyuiForm").form('clear');
// 	$('#state').combobox('setValues','-1');
}
function sendTest(){
	var stType = $("#stType").combobox("getValue");
	var timeUnit = $("#timeUnit").combobox("getValue");
	var point = $("#point").combobox("getValue");
	var schTime = getSchTime();
	var startTime = $("#startTime").datetimebox("getValue");
	var endTime = $("#endTime").datetimebox("getValue");
	var schName = $("#schName").textbox("getValue");
	var frequency = $("#frequency").textbox("getValue");
	alert(stType);
}

function getSchTime(){
	var h = $("#schTime").timespinner("getHours")+"";
	var m = $("#schTime").timespinner("getMinutes")+"";
	var s = $("#schTime").timespinner("getSeconds")+"";
	if(h.length<2){
		h = "0" + h;
	}
	if(m.length<2){
		m = "0" + m;
	}
	if(s.length<2){
		s = "0" + s;
	}
	return h + ":" + m + ":" + s;
	
}