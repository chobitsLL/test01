//查询
function doSearch(){
	$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	$("#easy_table").datagrid("load","meeting/queryMeetingAgendaSet.do");
}

$(function(){
	//添加弹框
	$("#upload_addbtn").dialog({
		closed: true,
		buttons:[{text:'确定',handler:function(){
			addMeeting(1);
		}},{text:'取消',handler:function(){
			$('#upload_addbtn').dialog('close');
		}}
		]
	});
	//修改弹框
	$("#upload_updbtn").dialog({
		closed: true,
		buttons:[{text:'确定',handler:function(){
			addMeeting(2);
		}},{text:'取消',handler:function(){
			$('#upload_updbtn').dialog('close');
		}}
		]
	});
});
//根据id查询数据
function selectMeeting(value){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:"meeting/selectMeetingAgendaSet.do?fid="+value,
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			$.messager.progress('close');
			$("#FIDss").val(data.fid);
			$("#FNamess").textbox('setValue',data.fname);
			$("#FBeginDates").datebox('setValue',data.fbegindate);
			$("#FEndDates").datebox('setValue',data.fenddate);
			$("#FNeedSeats").combobox('setValue',data.fneedseat);
			$("#maxgoodcounts").numberbox('setValue',data.fmaxgoodcount);
			if(data.fpcbgimgurl!=""){
				$('#PCIMGs').jeasyupload('setValue',data.fpcbgimgurl);;
			}
			if(data.fmobilebgimgurl!=""){
				$('#MobileIMGs').jeasyupload('setValue',data.fmobilebgimgurl);;
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress('close');
			$.messager.alert("提示","查询异常！","warning");
		}
	});
}
//1新增 2修改
function addMeeting(value){
	if(value==2){
		var fid=$('#FIDss').val();
		var fname=$('#FNamess').textbox("getValue");
		var fbegindate=$('#FBeginDates').val();
		var fenddate = $('#FEndDates').val();
		var fneedseat = $('#FNeedSeats').combobox("getValue");
		var maxgoodcount = $('#maxgoodcounts').numberbox("getValue");
		var PCIMG = $('#PCIMGs').val();
		var MobileIMG = $('#MobileIMGs').val();
		var data={};
		data["FID"]=fid;
		data["FName"]=fname;
		data["FBeginDate"]=fbegindate;
		data["FEndDate"]=fenddate;
		data["FNeedSeat"]=fneedseat;
		data["fmaxgoodcount"]=maxgoodcount;
		data["PCIMG"]=PCIMG;
		data["MobileIMG"]=MobileIMG;
		var dat={
				jsonobj:JSON.stringify(data),
			};
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"meeting/updateMeetingAgendaSet.do",
			dataType : "json",
			data:dat,
			async : false, // 同步 等待ajax返回值
			success:function(data){
				$.messager.progress('close');
				$("#upload_updbtn").dialog('close');
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
				$("#upload_updbtn").dialog('close');
				$.messager.alert("提示","修改失败！","warning");
			}
		});
	}else{
		var fnames=$('#FNames').textbox("getValue");
		var fbegindate=$('#FBeginDate').val();
		var fenddate=$('#FEndDate').val();
		var fneedseat = $('#FNeedSeat').combobox("getValue");
		var maxgoodcount = $('#maxgoodcount').numberbox("getValue");
		var PCIMG = $('#PCIMG').val();
		var MobileIMG = $('#MobileIMG').val();
		var data={};
		data["FName"]=fnames;
		data["FBeginDate"]=fbegindate;
		data["FEndDate"]=fenddate;
		data["FNeedSeat"]=fneedseat;
		data["fmaxgoodcount"]=maxgoodcount;
		data["PCIMG"]=PCIMG;
		data["MobileIMG"]=MobileIMG;
		var dat={
				jsonobj:JSON.stringify(data),
			};
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'POST',
			url:"meeting/addMeetingAgendaSet.do",
			dataType : "json",
			data:dat,
			async:false,
			success:function(data){
				$.messager.progress('close');
				$("#upload_addbtn").dialog('close');
				if (data.result) {
					$.messager.confirm('提示', '添加成功', function(r){if (r){
						doSearch();
					}});
				}else{
					$.messager.alert("提示","添加失败！","warning");
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.progress('close');
				$("#upload_addbtn").dialog('close');
				$.messager.alert("提示","添加失败！","warning");
			}
		});
	}
};

//type=有效、禁用、删除
function operatedmanager(ids,state){
	var url = "meeting/deleteMeetingAgendaSet.do";
	$.messager.confirm('提示', '您确定要执行该操作吗？', function(r){if (r){
		$.messager.progress({text : "正在处理，请稍候..."});
		$.ajax({
			type:'post',
			url:url,
		   	dataType : 'json', 
		    data : { ids : ids },
			success:function(datas){ 
				$.messager.progress('close');
				if(datas.result){
					$.messager.alert("提示",datas.msg,"info");
					doSearch();
				}else{
					$.messager.alert("提示",datas.msg,"warning");
				}
			},error:function(){
				$.messager.progress('close');
				$.messager.alert("提示","操作失败","warning");
			}
		 });
	}});
}
