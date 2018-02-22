$(function(){
	//输入框只能输入数字
	$("#fquanty").textbox('textbox').bind('keyup', function(e){
        $("#fquanty").textbox('setValue', $(this).val().replace(/[^0-9]/g,''));
	});
	

	//活动名称
	$("#activitynames").jeasycombo({
		multiple : false,//是否多选
		type : "list",//弹出的样式
		width:200,
		isinline:false,
//	 	dlgwidth:300,
		dlgheight:400,
		btnclass:"btn-success",//自定义按钮样式
		url:"visitorGift/getSaleActivity.do?type=1",
		onChange:function(ids,texts,codes){
			querygifttype();
			querysendtype();
			$("#substockids").jeasycombo({isselectfirst:true});
		}
	});
	//礼品
	$("#substockids").jeasycombo({
		multiple : false,//是否多选
		type : "list",//弹出的样式
		width:200,
		
//	 	dlgwidth:300,
		dlgheight:400,
		btnclass:"btn-success",//自定义按钮样式
	});

	$("#funituser").jeasycombo({
		onlybtn:true,
		multiple : false,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		onChange:function(ids,texts,codes){
			$("#unitusernamess").textbox('setValue',texts);
		}
	});
	$("#fvisitor").jeasycombo({
//	 	onlybtn:true,
		multiple : false,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		onChange:function(ids,texts,codes){
			$("#visitornamess").textbox('setValue',texts);
		}
	});

	//游客查询
	$("#visitornames").click(function(){
		var visitornames=$("#visitornamess").textbox('getValue');
		if(visitornames==""){
			$.messager.alert('温馨提示',"请先输入游客手机号后点击查询！","warning");//
			return false;
		}else if(visitornames.length<4){
			$.messager.alert('温馨提示',"请输入手机号至少后四位数字","warning");//
			return false;
		}
		$.ajax({
			type:"POST",
			url:"visitorGift/getVisitor.do?type=1&ftelno="+$("#visitornamess").textbox('getValue'),
			dataType:"json",
			success:function(data){
				$("#fvisitor").jeasycombo("reload_data", data);
				$("#fvisitor").jeasycombo("show");
			}
		});

	});
	//会员查询
	$("#unitusernames").click(function(){
		var visitornames=$("#unitusernamess").textbox('getValue');
		if(visitornames==""){
			$.messager.alert('温馨提示',"请先输入游客手机号后点击查询！","warning");//
			return false;
		}else if(visitornames.length<4){
			$.messager.alert('温馨提示',"请输入手机号至少后四位数字","warning");//
			return false;
		}
		$.ajax({
			type:"POST",
			url:"visitorGift/getVisitor.do?type=2&ftelno="+$("#unitusernamess").textbox('getValue'),
			dataType:"json",
			success:function(data){
				$("#funituser").jeasycombo("reload_data", data);
				$("#funituser").jeasycombo("show");
			}
		});
	});
});


//获取发送方式
function querygifttype(){
	var gifttype=checkedVal("gifttype");
    if(gifttype==1){
    	var activityid = $("#activitynames").jeasycombo("getvalue").ids;
    	document.getElementById("fscore").readOnly=true;
    	$.ajax({
    		type:"POST",
    		url:"visitorGift/getSaleActivityGift.do?type=5&hearderid="+activityid,
    		dataType:"json",
    		async:false,
    		success:function(data){
	    		$("#fscore").textbox('setValue',"");
	    		$("#fscore").attr("fid","");
	    		if(data.rows.length>0){
		    		$("#fscore").textbox('setValue',data.rows[0].fscore);
		    		$("#fscore").attr("fid",data.rows[0].fid);
	    		}
    		}
    	});
    	$("#score").show();
    	$("#FQuanty").hide();
    	$("#substock").hide();
    	$("#FSendType").hide();
    	$("#visitor").show();
    	$("#unituser").hide();
    	$("#grantDiv").dialog({
    		height: 300,
    	});
    }else{
    	$("#score").hide();
    	$("#substock").show();
    	$("#FSendType").show();
    	querysendtype();
    }
}
//获取发放方式
function querysendtype(){
	var gifttype=checkedVal("gifttype");
	var sendtype=checkedVal("fsendtype");
	var ids= $("#activitynames").jeasycombo("getvalue").ids;
    if(sendtype==0){
    	var h = 350;
    	if(gifttype==1){
    		h = 300;
    	}
    	$("#grantDiv").dialog({
    		height: h,
    	});
    	$("#FQuanty").hide();
    	$("#unituser").hide();
    	$("#visitor").show();
    	$("#fquanty").textbox({disabled:false});
    	$("#substockids").jeasycombo("reload", "visitorGift/getSaleActivityGift.do?type=3&hearderid="+ids);
    }else if(sendtype==1){
    	$("#grantDiv").dialog({
    		height: 400,
    	});
    	$("#FQuanty").show();
    	$("#visitor").hide();
    	$("#unituser").show();
    	$("#fquanty").textbox({disabled:false});
    	$("#substockids").jeasycombo("reload", "visitorGift/getSaleActivityGift.do?type=4&hearderid="+ids);
    }else if(sendtype==2){
    	$("#grantDiv").dialog({
    		height: 400,
    	});
    	$("#FQuanty").show();
    	$("#visitor").hide();
    	$("#unituser").show();
    	$("#fquanty").textbox('setValue','1'),
		$("#fquanty").textbox({disabled:true});
    	$("#substockids").jeasycombo("reload", "visitorGift/getSaleActivityGift.do?type=6&hearderid="+ids);
	}
}
//获取单选按钮的值
function checkedVal(name){
	var chkObjs = document.getElementsByName(name);
	var value="";
    for(var i=0;i<chkObjs.length;i++){
        if(chkObjs[i].checked){
        	value = chkObjs[i].value;
        }
    }
    return value;
}
//发放
function grantOpen(row){
// 	$("input[name='rd']:checked").val();
//	$("input:radio]").attr("checked",false); 
	$("input[name=gifttype]").eq(0).prop('checked', 'checked');
	$("input[name=fsendtype]").eq(0).prop('checked', 'checked');
	$("#visitornamess").textbox('setValue','');
	$("#unitusernamess").textbox('setValue','');
	$("#activitynames").jeasycombo('setvalue','');
	$("#fscore").textbox('setValue','');
	$("#substockids").jeasycombo('setvalue','');
	$("#fquanty").textbox('setValue','');
	
	
	querygifttype();
	querysendtype();
	
	$('#grantDiv').dialog({
		title : "礼品发放",
		closed : false,
		buttons : [ {
			text : '发放',
			width : 60,
			handler : function() {
				savegrant();
// 				$('#grantDiv').dialog({
// 					closed : true,
// 				});
			}
		}, {
			text : '取消',
			width : 60,
			handler : function() {
				$('#grantDiv').dialog({
					closed : true,
				});
			}
		} ]

	});
	
}


//礼品发放
function savegrant(){
	var gifttype=checkedVal("gifttype");
	var activityid = $("#activitynames").jeasycombo("getvalue").ids;
	var data={};
	if(activityid==0){
		$.messager.alert('温馨提示',"活动名称不能为空！","warning");
		return false;
	}
	var fsendtype;//
	var visitornames=0;
	var unitusernames=0;
	if(gifttype==0){
		fsendtype=checkedVal("fsendtype");
		if(fsendtype==0){
		    visitornames=$("#fvisitor").jeasycombo("getvalue").ids;
			if(visitornames==0){
				$.messager.alert('温馨提示',"游客不能为空！","warning");
				return false;
			}
		}else{
			unitusernames=$("#funituser").jeasycombo("getvalue").ids;
			 if(unitusernames==0){
				$.messager.alert('温馨提示',"会员不能为空！","warning");
				return false;
			 }
		}
		var substockid = $("#substockids").jeasycombo("getvalue").ids;
		if(substockid==0){
			$.messager.alert('温馨提示',"礼品不能为空！","warning");
			return false;
		}
		data["substockid"]=substockid;
		var fquanty;
		if(fsendtype!=0){
			fquanty=$("#fquanty").val();
			if(fquanty==""||fquanty==0){
				$.messager.alert('温馨提示',"数量不能为空！","warning");
				return false;
			}
		}
	}else{
		visitornames=$("#fvisitor").jeasycombo("getvalue").ids;
		if(visitornames==0){
			$.messager.alert('温馨提示',"游客不能为空！","warning");
			return false;
		}
		var fscore=$("#fscore").val();
		var saleActivityGiftid=$("#fscore").attr("fid");
		if(fscore==0){
			$.messager.alert('温馨提示',"积分不能为空！","warning");
			return false;
		}
		data["fscore"]=fscore;
		data["saleactivitygiftid"]=saleActivityGiftid;
	}
	
	$.messager.progress({text : "正在处理，请稍候..."});
//	$.jbootloading("show");
	data["visitornames"]=visitornames;
	data["unitusernames"]=unitusernames;
	data["activityid"]=activityid;
	data["gifttype"]=gifttype;
	data["fsendtype"]=fsendtype;
	data["fquanty"]=fquanty;
	var dat={
			jsonobj:JSON.stringify(data),
		};
	$.ajax({
		type:"POST",
		url:"visitorGift/insertVisitorGift.do",
		data:dat,
		dataType:"json",
		success:function(data){
			if(data.result){
				$.messager.progress('close');
				$.messager.alert('温馨提示',data.msg);
			}else{
				$.messager.progress('close');
				$.messager.alert('温馨提示',data.msg,"warning");
			}
		},
		error:function(){
			$.messager.progress('close');
			$.messager.alert('温馨提示',"系统错误","error");
		}
	});
	
}