//查询
function getPageViewByWUID(wuid,pageNum,pageSize){
	console.log("---"+wuid);
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type: 'post',
		url: 'wUser/getPageViewByWUID.do',
		data: {
			wuid: wuid,
			pageNo: pageNum,
			pageSize: pageSize
		},
		success:function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.total>0){
				$("#dialogid").dialog().dialog("open");
				$(".pageNum").html(pageNum+"/"+Math.ceil(data.total/pageSize));
				var viewdata = data.rows;
				var tbody = $("#detailTable").find("tbody");
				tbody.html("");
		        for(var i=0;i<viewdata.length;i++){
			       	var tr = $("<tr></tr>");
			        tr.append("<td class='t160'>"+viewdata[i].fstockname+"</td>");
			        tr.append("<td class='t100'>"+viewdata[i].fcount+"</td>");
			        tr.appendTo(tbody);
		        }
		        $("#detailview").attr("wuid",wuid);
			}else{
				$.messager.alert("提示", "无历史数据！", "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求失败，请稍后重试！", "warning");
		}
	});
}
//上一页
function prePage(obj){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	var totalPageNum = parseInt(page[1]);
	var pageSize = 15;
	if(nowPageNum==1){
		$.messager.alert("提示", "已是第一页咯!", "warning");
		return;
	}else{
		nowPageNum--;
	}
	var wuid = $("#detailview").attr("wuid");
	getPageViewByWUID(wuid,nowPageNum,pageSize);
}
//下一页
function nextPage(obj){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	var totalPageNum = parseInt(page[1]);
	var pageSize = 15;
	if(nowPageNum==totalPageNum){
		$.messager.alert("提示", "已是最后一页咯!", "warning");
		return;
	}else{
		nowPageNum++;
	}
	var wuid = $("#detailview").attr("wuid");
	getPageViewByWUID(wuid,nowPageNum,pageSize);
}
//添加到分组
function addGroup(){
	var unitwxusids=$("#addgroupIds").val();
//	unitwxusids = unitwxusids.substring(1,unitwxusids.length);
	var groupid=$("#addgroups").val();
	$.messager.progress({text : "正在处理，请稍候..."});
    $.ajax({
	 	type: 'post',
	 	url: 'wUser/addgroup.do',
	 	data: {wxunitUserfid:unitwxusids,groupids:groupid},
	 	success:function(result){
	 		$.messager.progress("close");//隐藏加载中
			if(result){
				$.messager.alert("提示", "添加分组成功！", "warning")
			    window.location.href=window.location.href;	
			}else{
				$.messager.alert("提示", "添加分组失败,或已添加到该分组！", "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
   }); 
}
//移出分组
function outtogroup(ids){
  var groupid=$("#groupid").val();
  if(ids<=0){
	 $.messager.alert("提示", "请至少选中一行数据！", "warning");
  }else{
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		type: 'post',
		url: 'wUser/outgroup.do',
		data: {unitfids:ids,wxgroupid:groupid},
		success:function(result){
			$.messager.progress("close");//隐藏加载中
			if(result){
				$.messager.alert("提示", "移出分组成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","wUser/queryWechatUser.do");
			}else{
			   $.messager.alert("提示", "移出分组失败！", "warning");
			};
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
  }
}
//修改备注
function upNamemark(funitwufid){
  //var newpage = $("#newpage").val();
  var namemark=$("#nameMark").val();
  $.messager.progress({text : "正在处理，请稍候..."});
  $.ajax({
		type: 'post',
		url: 'wUser/upWechatUserName.do',
		data: {wxunitUserfid:funitwufid,nameMark:namemark},
		success:function(result){
			$.messager.progress("close");//隐藏加载中
			if(result){
				$('#textarea').dialog('close');
			    $.messager.alert("提示", "修改备注成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","wUser/queryWechatUser.do")
			 }else{
				$.messager.alert("提示", "修改备注失败！", "warning");
			};
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}