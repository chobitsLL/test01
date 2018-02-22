/**获取url地址上面的参数**/  
function requestParam(argname){
    var url = location.href;
    var arrStr = url.substring(url.indexOf("?")+1).split("&");
    for(var i =0;i<arrStr.length;i++){
        var loc = arrStr[i].indexOf(argname+"="); 
        if(loc!=-1){
            return arrStr[i].replace(argname+"=","").replace("?","");
            break;
        }
    }
    return "";
}

//查询行业类别
function getLevel(level,obj){
	$.messager.progress({text : "正在处理，请稍候..."});
	var html="<option value='0'>请选择</option>"
	$.ajax({
 	   url:"testMsgSend/tempTradeLevelQuery.do",
 	   dataType:"json",
 	   data:{level:level,type:1,jsonobj:""},
 	   success:function(data){
 		   	$.messager.progress("close");//隐藏加载中
			if(data.result==false){
				 $.messager.alert("提示", "加载失败！","warning");
			}else{
				$(data.rows).each(function(){
					html+="<option value='"+this.fid+"'>"+this.fname+"</option>";
				});
				$(obj).html(html);
			}
 		 },
       error:function(json) { 
    	   $.messager.progress("close");//隐藏加载中
    	   $.messager.alert("提示", "请求失败！","warning");
        }
 	 });    
}
//当一级类别修改之后二级类别重置为空
$(".firstlevel").change(function(){
	if($(this).val()==0){
		$(this).next(".secondlevel").val(0);
	}
});

//点击确定
function uGroupSave(){
	$.messager.progress({text : "正在处理，请稍候..."});
	var oaid = $("#wxcommoa1").jeasycombo("getvalue").ids;;
	//主营行业
	var firstlevel=$("#maintrade .firstlevel").val();
	var secondlevel=$("#maintrade .secondlevel").val();
	//副营行业
	var firstlevelT=$("#secondtrade .firstlevel").val();
	var secondlevelT=$("#secondtrade .secondlevel").val();
	
	if(!oaid||oaid==""){
		$.messager.progress("close");//隐藏加载中
	    $.messager.alert("提示", "请先选择公众号!","warning");
		return;
	}
	if(firstlevel==0||secondlevel==0){
		$.messager.progress("close");//隐藏加载中
		$.messager.alert("提示", "请选择一个主营行业!","warning");
		return;
	}
	
	if(firstlevelT!=0&&secondlevelT==0){
		$.messager.progress("close");//隐藏加载中
		$.messager.alert("提示", "请将所有的副营行业填写完成!","warning");
		return;
	}
	var secondlevelThtml="";
	if(secondlevelT>0)secondlevelThtml=","+secondlevelT
	var FTradeID=secondlevel+secondlevelThtml;
	// 获取用户填写的参数
	$.ajax({
		type:"POST",
		url:"testMsgSend/addTempTrade.do",
		data:{jsonobj:JSON.stringify({FOAID:oaid,FTradeID:FTradeID})},
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$("#add_btn").dialog('close');
				$.messager.confirm("提示","添加成功",function(r){if(r){
					search();
				}});
			} else {
				 $.messager.alert("提示",data.msg,"warning");
			}
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错!","warning");
    	}
	});
};

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
	$(".firstlevel").combobox({
		editable:false,
        url:"testMsgSend/tempTradeLevelQuery.do?level=1&type=1"
	});
	//一级类别
	$(".secondlevel").combobox({
		editable:false,
        url:"testMsgSend/tempTradeLevelQuery.do?level=2&type=1"
	});
}