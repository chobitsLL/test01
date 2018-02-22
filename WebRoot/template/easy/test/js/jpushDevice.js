$(function(){
	easyCombobox();
});

function easyCombobox(){
	$("#controllerUrl").combobox({
		multiple : false,//是否多选
		width:230,
		labelWidth:90,
//		editable:false,
		label:'方法名:',
		data:[{"fname":"getTagAlias","fid":"getTagAlias"},
		      {"fname":"updateTagAlias","fid":"updateTagAlias"}],
	    onSelect: function(param){
		},
	});
}

function sendPush(){
	var dat = "";
	dat+=$("#textID").val().replace("\n", "");
	if($("#appKey").textbox("getValue")!=0){
		dat+="&appKey="+$("#appKey").textbox("getValue");
	}
	if($("#masterSecret").textbox("getValue")!=0){
		dat+="&masterSecret="+$("#masterSecret").textbox("getValue");
	}
	if($("#regID").textbox("getValue")!=0){
		dat+="&regIds="+$("#regID").textbox("getValue");
	}
	
	var url = $("#controllerUrl").combobox("getValue");
	if(url == ""){
		$.messager.alert('温馨提示',"方法名不能为空！");
		return;
	}
	var data = jpushAjax(url,dat);
	if(data.result){
		var htm = '';
		htm+=htmStr('data.result',data.result,0);
		htm+=htmStr('data.results',data.results,1);
		$("#divData").empty();
		$("#divData").append(htm);
	}
}