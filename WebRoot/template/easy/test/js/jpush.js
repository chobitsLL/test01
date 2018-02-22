function jpushAjax(url,dat){
	var data;
	$.ajax({
		dataType : 'JSON',
		type : 'post',
		async : false,
		url : 'restful/AppPush/'+url+'.do',
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

function htmStr(str,val,num){
	var htm = '';
	if(num == 0){
		htm = '<span style="float: left;width: 250px;">'+str+':</span><span style="float: left">'+val+'</span>'
	}else if(num == 1){
		htm = '<br><span style="float: left;width: 250px;">'+str+':</span><span style="float: left">'+val+'</span>'
	}
	return htm;
}