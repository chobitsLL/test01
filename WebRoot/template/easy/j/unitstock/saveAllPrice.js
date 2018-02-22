function saveAllPrice(type){
	var data=new Array();
	var ids = new Array();
	var rows=$("#easy_table").datagrid('getChecked');
	for(var i=0;i<rows.length;i++){
		ids.push(rows[i].fid)
	}
	/*if(ids.length == 0){
		$.messager.alert("请选择一条数据","error");
		return false;
	}*/
	if(ids.length == 0){
		$(".allPrice").each(function(){
			var fid=$(this).attr("fid");
			var price=$(this).val();
			var count=$("#count_"+fid).val();
			var data1={};
			data1["fid"]=fid;
			data1["price"]=price;
			data1["count"]=count;
			data1["type"]=1;
			data.push(data1);
		});
		var param={
				jsonobj:JSON.stringify(data)
			}
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:"POST",
			url:"unitstock/getstoresubstockprice.do",
			data:param,
			dataType:"json",
			success:function(data){
				$.messager.progress("close");//隐藏加载
				if(data.fstate==1){
					$.messager.confirm("提示","您所修改的商品中包含正在销售的商品，且所修改的价格为0，确定要修改吗？", function(r){
						if(r){
							$.messager.progress({text : "正在处理，请稍候..."});
							$.ajax({
								url:"unitstock/saveAllPrice.do",
								type:"POST",
								data:param,
								dataType:"json",
								success:function(data){
									$.messager.progress("close");//隐藏加载
									if (data.isres==1) {
										var trs = ""
							               	for (var i = 0; i < data.list.length; i++) {
							       				trs +="<tr><td>"+data.list[i].msg+"</td></tr>"
							       			}
							               	var body='<div style="height:300px;overflow-y: scroll;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
							       			     +trs+'</tbody></table></div>';
							               	$("#hide-dialog").dialog("clear");
							               	$("#hide-dialog").append(body);
							               	$("#hide-dialog").dialog("open");
							               	$("#easy_table").datagrid('reload');
									}else if(data.res==1){
										$.messager.alert("提示","保存成功","info");
										$("#easy_table").datagrid('reload');
									}else{
										$.messager.alert("提示","保存失败","error");
										$("#easy_table").datagrid('reload');
									}
								}
							});
						}
						
		
					});
				}else{
					$.messager.progress({text : "正在处理，请稍候..."});
					$.ajax({
						url:"unitstock/saveAllPrice.do",
						type:"POST",
						data:param,
						dataType:"json",
						success:function(data){
							$.messager.progress("close");//隐藏加载
							if (data.isres==1) {
								var trs = ""
					               	for (var i = 0; i < data.list.length; i++) {
					       				trs +="<tr><td>"+data.list[i].msg+"</td></tr>"
					       			}
					               	var body='<div style="height:300px;overflow-y: scroll;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
					       			     +trs+'</tbody></table></div>';
					               	$("#hide-dialog").dialog("clear");
					               	$("#hide-dialog").append(body);
					               	$("#hide-dialog").dialog("open");
					               	$("#easy_table").datagrid('reload');
							}else if(data.res==1){
								$.messager.alert("提示","保存成功","info");
								$("#easy_table").datagrid('reload');
							}else{
								$.messager.alert("提示","保存失败","error");
								$("#easy_table").datagrid('reload');
							}
						}
					});
		
				}
			},
			error:function(){
				$.messager.progress("close");//隐藏加载
				$.messager.alert("提示","系统错误","error");
			}
		});
	}else{
		var price = "";
		var count = "";
		for(var i = 0 ; i < ids.length; i++){
			$(".allPrice").each(function(){
				var data1={};
				var fid = ids[i];
				data1["fid"]=fid;
				data.push(data1);
				price = $("#price_"+fid).val();
				count = $("#count_"+fid).val();
				data1["price"]=price;
				data1["count"]=count;
				data1["type"]=1;
				data.push(data1);
			});
		}
		var param={
				jsonobj:JSON.stringify(data)
			}
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			url:"unitstock/saveAllPrice.do",
			type:"POST",
			data:param,
			dataType:"json",
			success:function(data){
				$.messager.progress("close");//隐藏加载
				if (data.isres==1) {
					var trs = ""
		               	for (var i = 0; i < data.list.length; i++) {
		       				trs +="<tr><td>"+data.list[i].msg+"</td></tr>"
		       			}
		               	var body='<div style="height:300px;overflow-y: scroll;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
		       			     +trs+'</tbody></table></div>';
		            	$("#hide-dialog").dialog("clear");
		               	$("#hide-dialog").append(body);
		               	$("#hide-dialog").dialog("open");
		               	$("#easy_table").datagrid('reload');
				}else if(data.res==1){
					$.messager.alert("提示","保存成功","info");
					$("#easy_table").datagrid('reload');
				}else{
					$.messager.alert("提示","保存失败","error");
					$("#easy_table").datagrid('reload');
				}
			}
		});

	}
	
	//alert(JSON.stringify(param));
	//$.messager.alert("您确认要同步勾选商品的价格吗？", "confirm", function(){
	}
function unifiedupdate(){
	var unifiedprice=$("#unifiedprice").val();
	var unifiedcount=$("#unifiedcount").val();
	if(unifiedprice==""&&unifiedcount==""){
		$.messager.alert("提示","统一价格与统一库存不能同时为空！","error");
		return false;
	}
	var rows = $("#easy_table").datagrid('getChecked');
	var idArray=new Array();
	var ids;
	for(var i=0;i<rows.length;i++){
		idArray.push(rows[i].fid)
	}
	ids=idArray.join(",");
	if(idArray.length==0){
		$.messager.alert("提示","请选择商品","error");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"unitstock/unifiedupdate.do?unifiedprice="+unifiedprice+"&unifiedcount="+unifiedcount+"&ids="+ids,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载
			if (data.isres==1) {
				var trs = ""
	               	for (var i = 0; i < data.list.length; i++) {
	       				trs +="<tr><td>"+data.list[i].msg+"</td></tr>"
	       			}
	               	var body='<div style="height:300px;overflow-y: scroll;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
	       			     +trs+'</tbody></table></div>';
	               	$("#hide-dialog").dialog("clear");
	               	$("#hide-dialog").append(body);
	               	$("#hide-dialog").dialog("open");
	               	$("#easy_table").datagrid('reload');
			}else if(data.res==1){
				$.messager.alert("提示","保存成功","info");
				$("#easy_table").datagrid('reload');
			}else{
				$.messager.alert("提示","保存失败","error");
				$("#stocktable").jboottable("search");
			}
		}
	});
}
function checkUseCSSoft(userid){
	$.ajax({
		type:"POST",
		url:"unitstock/checkUseCSSoft.do?userid="+userid,
		dataType:"json",
		success:function(data){
			if (data.fusecssoft==1){
			        $("#FSync").show();
			} else {
					$("#FSync").hide();
			}
		}
	})
}