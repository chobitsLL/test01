//查询
function doSearch(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","meeting/queryMeetingSeat.do");

}
//添加弹框
$("#upload_addbtn").dialog({
	closed: true,
	buttons:[{text:'保存后继续增加',handler:function(){
		addMeeting(1,1);
	}},{text:'确定',handler:function(){
		addMeeting(1,0);
	}},{text:'取消',handler:function(){
		$('#upload_addbtn').dialog('close');
	}}
	]
});
//修改弹框
$("#upload_updbtn").dialog({
	closed: true,
	buttons:[{text:'确定',handler:function(){
		addMeeting(2,0);
	}},{text:'取消',handler:function(){
		$('#upload_updbtn').dialog('close');
	}}
	]
});
$("#FMeetingInfoID").jeasycombo({		
	multiple : false,//是否多选
	url : "meeting/selectMeetingName.do",
	label:'议题名称:',
	labelWidth:80,
	width:300,
	dlgwidth:600
});

$("#FMeetingInfoIDs").jeasycombo({		
	multiple : false,//是否多选
	url : "meeting/selectMeetingName.do",
	label:'议题名称:',
	labelWidth:80,
	width:300,
	dlgwidth:600
});

function selectMeeting(value){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"meeting/selectMeetingSeat.do?fid="+value,
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			$.messager.progress('close');
			$("#FIDss").val(data.fid);
			$("#FNamess").textbox('setValue',data.fname);
			$("#FRemarkss").textbox('setValue',data.fremark);
			$("#FMeetingInfoIDs").jeasycombo("setvalue",data.fmeetinginfoid);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress('close');
			$.messager.alert("提示","查询异常！","warning");
		}
	});
}

function addMeeting(value,value2){
	if(value==2){
		var fid=$('#FIDss').val();
		var fname=$('#FNamess').textbox("getValue");
		var fremark = $('#FRemarkss').val();
		var fmeetinginfoid = $('#FMeetingInfoIDs').jeasycombo("getvalue").ids;
		var data={};
		data["FID"]=fid;
		data["FName"]=fname;
		data["FRemark"]=fremark;
		data["FMeetingInfoID"]=fmeetinginfoid;
		var dat={
				jsonobj:JSON.stringify(data),
			};
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"meeting/updateMeetingSeat.do",
			dataType : "json",
			data:dat,
			async : false, // 同步 等待ajax返回值
			success:function(data){
				$.messager.progress('close');
				$('#upload_updbtn').dialog('close');
				if (data.result) {
					$.messager.confirm('提示', '修改成功', function(r){if (r){
						doSearch();
					}});
				}else{
					$.messager.alert("提示","修改失败！","warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress('close');
				$('#upload_updbtn').dialog('close');
				$.messager.alert("提示","修改失败！","warning");
			}
		});
	}else{
		var fname=$('#FNames').textbox("getValue");
		var fremark=$('#FRemarks').val();
		var fmeetinginfoid=$('#FMeetingInfoID').jeasycombo("getvalue").ids;
		var data={};
		data["FName"]=fname;
		data["FRemark"]=fremark;
		data["FMeetingInfoID"]=fmeetinginfoid;
		var dat={
				jsonobj:JSON.stringify(data),
			};
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"meeting/addMeetingSeat.do",
			dataType : "json",
			data:dat,
			async:false,
			success:function(data){
				$.messager.progress('close');
				if (data.result) {
					if(value2==1){
						$.messager.confirm('提示', '添加成功', function(r){if (r){
							$('#FNames').textbox('setValue','');
							$('#FRemarks').textbox('setValue','');
							$('#FMeetingInfoID').jeasycombo("setvalue","");
							doSearch();
						}});
					}else{
						$('#upload_addbtn').dialog('close');
						$.messager.confirm('提示', '添加成功', function(r){if (r){
							doSearch();
						}});
					}
					
				}else{
					$('#upload_addbtn').dialog('close');
					$.messager.alert("提示","添加失败！","warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress('close');
				$('#upload_addbtn').dialog('close');
				$.messager.alert("提示","添加失败！","warning");
			}
		});
	}
};

//点击删除按钮
function deleteMeeting(ids){
	if(ids==""){
		$.messager.alert("提示","请选择一个删除项！","warning");
		return false;
	}else{
		$.messager.progress({text : "正在处理，请稍候..."});
	    $.ajax({
		  type:"POST",
		  url:"meeting/deleteMeetingSeat.do?fids="+ids,
		  dataType:"json",
		  async : false, // 同步 等待ajax返回值
		  success:function(data){
				$.messager.progress('close');
				if (data) {
					  $.messager.confirm('提示', '添加成功', function(r){if (r){
						  doSearch();
					  }});
				}else{
					  $.messager.alert("提示","删除失败！","warning");
				}
		  },error:function(){
				$.messager.progress('close');
				$.messager.alert("提示","删除失败！","warning");
		  }
	  });
	}
}
