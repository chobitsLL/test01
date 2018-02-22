$(function(){
	
});

function aopTest(){
	var url = "demo/test1";
	var dat = "";
	Unit_AJAX(url,dat);
}

function userClick(){
	var url = "user/getAll";
	var dat = "";
	Unit_AJAX(url,dat);
}



function Unit_AJAX(url,dat){
	var data;
	$.ajax({
		dataType : 'JSON',
		type : 'post',
		async : false,
		url : url+'.do',
		data : dat,
		dataType : "json",
		success : function(json) {
			data = json;
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
	return data;
}