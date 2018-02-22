function addAjax(){
	
		$.ajax({
				type : 'post',
				
				url:'getAlls.do',
				dataType : 'json',
				success :function(data){
					alert(data);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                }
				
			});
	}