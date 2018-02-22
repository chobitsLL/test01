//删除
function removeAutomated(){
	var rows = $("#easy_table").datagrid("getChecked");//多选
	var fid = new Array();
	for (var i = 0; i < rows.length; i++) {
		fid[i] = rows[i].fid;
		if(rows[i].fstate==1){
			$.messager.alert("提示", "包含已开启的数据,请先关闭后在删除！", "warning");
			return false;
		}
		if(rows[i].fruletype==0){
			if(rows.fisprotected!=0){
				$.messager.alert("提示","包含内置的受保护数据,不能删除！", "warning");
				return false;
			}
		}
	}
	if(fid == null || fid.length == 0){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return;
	}
	var ids = fid.join(",");//数组转化成字符串
	$.messager.confirm('确认','你确认要删除选择的记录吗？',function(r){
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:"POST",
				url:"rs/deleteautomatedResponse.do?ids="+ids,
				dataType:"json",
	        		data:{id:ids},
				success: function(data){
					$.messager.progress("close");//隐藏加载中
	   				if(data.result){
	   					$.messager.alert("提示", "删除成功！", "warning");
	   					$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	   					$("#easy_table").datagrid("load","rs/selectautomatedResponse.do");
	   				}else if(data.msg){
	   					$.messager.alert("提示", data.msg, "warning");
					}else{
						$.messager.alert("提示", data.info, "warning");
	   				}
	   			},error:function(){
	   				$.messager.progress("close");//隐藏加载中
	   				$.messager.alert("提示", "请求出错！", "warning");
	   			}
			});
		}
	});
}
//开启
function open(ids,rows){
	if(rows.length > 1 ){
		$.messager.alert("提示", "请选择一行数据！", "warning");
		return;
	}
	var row=rows[0];
	if(row.fstate==1){
		$.messager.alert("提示", "包含已开启的数据,请先关闭后在删除！", "warning");
		return false;
	}
	if(row.freplytype!=0 && row.freplytype!=5){//内容类型????当规则类型是关键字自动回复时？
		$.messager.alert("提示", "有未支持的内容类型，不能开启！", "warning");
		return;
	}
	if(row.freplytype!=2){//规则类型
 		$.messager.confirm('确认','将关闭该公众号的其他同类回复规则，是否仍继续该操作？',function(r){
			if(r){
				com_open(row);
			}
 		});
	}else{
		com_open(row);
	} 
}
function com_open(row){
	var fid=row.fid;
	var foaid=row.foaid;
	var fruletype=row.fruletype;
	var date={};
	date["fid"]=fid;
	date["foaid"]=foaid;
	date["fruletype"]=fruletype;
	var dat={
			jsonobj:JSON.stringify(date)
		};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"rs/updateeffective.do",
		dataType:"json",
		data:dat,
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", "开启成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","rs/selectautomatedResponse.do");
			}else if(data.msg){
				$.messager.alert("提示", data.msg, "warning");
			}else{
				$.messager.alert("提示", data.info, "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}
//关闭
function close(ids,rows){
	 var fid = new Array();
	 for (var i = 0; i < rows.length; i++) {
		 fid[i] = rows[i].fid;
		 if(rows[i].fstate==0){
			 $.messager.alert("提示", "包含处于关闭状态，无法重复关闭！", "warning");
			 return false;
		 }
	 }
	 if(fid == null || fid.length == 0){
		 $.messager.alert("提示", "请选择一行数据！", "warning");
		 return;
	 }
	 $.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		type:"POST",
		url:"rs/updatefstop.do",
		dataType:"json",
		data:{ids:ids},
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", "关闭成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","rs/selectautomatedResponse.do");
			}else if(data.msg){
				$.messager.alert("提示", data.msg, "warning");
			}else{
				$.messager.alert("提示", data.info, "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
   	 });
}
//关键字输入查看
function searchKey(){
	$(".mysize").val("");
	keywordSearch(1);
}
//下一页
function heartnext(ftype){
	var pagenow = $("#pagenow").html();
	var pageall = $("#pageall").html();
	var pageno = parseInt(pagenow)+1;
	if(pagenow==pageall){
		$.messager.alert("提示", "已经是最后一页！", "warning");
		return;
	}else{
		 keywordSearch(pageno);
	}
}
//上一页
function heartone(ftype){
	var pagenow = $("#pagenow").html();
	var pageall = $("#pageall").html();
	var pageno = parseInt(pagenow)-1;
	if(pagenow==1){
		$.messager.alert("提示", "已经是第一页了！", "warning");
		return;
	}else{
		 keywordSearch(pageno);
	}
}
//跳转
function jsumbtn(){
	var  jumpye = parseInt($(".mysize").val());
	var pageno = parseInt($("#pageall").html());
	if(jumpye>pageno){
		$.messager.alert("提示", "请输入正确的页码！", "warning");
		return;
	}else{
		if(jumpye==0 || isNaN(jumpye)){
			jumpye=1;
		}
		 keywordSearch(jumpye);
	}
}
function keywordSearch(pageno){
	var oaid=$("#oaid").val();
	if(oaid==""){
		$.messager.alert("提示", "请选择公众号！", "warning");
		return false;
	}
	$("#hidden-word").dialog().dialog("open");
	var pagesize = 10;
	var date={};
	date["oaID"]=oaid;
	date["pageNo"]=pageno;
	date["pageSize"]=pagesize;
	var dat={json:JSON.stringify(date)};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"rs/keyWordSearch.do",
		dataType:"json",
		data:dat,
		success: function(datass){
			$.messager.progress("close");//隐藏加载中
			var tbody = $("#keywordtable");
			tbody.empty();
			var tr="";
			for(var i=0;i<datass.resultmap.rows.length;i++){
			  var map = datass.resultmap.rows[i];
			   tr+='<tr><td style="width: 150px;max-width:150px; overflow: hidden;white-space: nowrap;">'+map.foaname+'</td>'
				  +'<td style="width: 150px;max-width:150px; overflow: hidden;white-space: nowrap;">'+map.fdate+'</td>'
				  +'<td style="width: 150px;max-width:150px; overflow: hidden;white-space: nowrap;">'+map.fwuname+'</td>'  
				  +'<td style="width: 250px;max-width:250px; overflow: hidden;white-space: nowrap;">'+map.fmessage+'</td></tr>'
			}
			tbody.append(tr);
			$("#pagenow").html(datass.pageNo);
			$("#pageall").html(datass.pageCount);
		},
		error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}
//按系统内置自动回复模板更正公众号内置自动回复规则
function repairReplyRules(){
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"rs/repair.do",
		dataType:"json",
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			if(data.result){
				$.messager.alert("提示", data.msg, "warning");
			}else{
				$.messager.alert("提示", data.msg, "warning");
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载中
			$.messager.alert("提示", "请求出错！", "warning");
		}
	});
}

function copy_size(flag){
	//document.getElementById('FTexts').value=flag?getRangeById('FText'):getRangeById('Ftext');
	linkParams.FTexts=flag?getRangeById('FText'):getRangeById('Ftext');
	//document.getElementById('FTexts2').value=flag?'FText':'Ftext';
	linkParams.FTexts2=flag?'FText':'Ftext';
}


//qq表情
$(function(){
	$('.emotionAdd').qqFace({
		assign:'FText', //给那个控件赋值
		path:'img/face/'	//表情存放的路径
	});
 	$('.emotionEdit').qqFace({
		assign:'Ftext',
		path:'img/face/'	//表情存放的路径
	}); 
});
//替换表情
function replace_em(str){
	str = str.replace(/\</g,'&lt;');
	str = str.replace(/\>/g,'&gt;');
	str = str.replace(/\n/g,'<br/>');
	str = str.replace(/\[em_([0-9]*)\]/g,'<img src="img/face/$1.gif" border="0" />');
	return str;
}
function linkurl(){
	$("#hidden-link").dialog().dialog("open");
	document.getElementById("link_a").value="";
}

//判断是否是关键词自动回复（添加）
function whether(){
	var type = $("#FRuleType").val();
	if(type==0){
		document.getElementById('keywords').style.display = "none";
		document.getElementById('styb').style = "";
		document.getElementById('styb').style = "position:absolute; top:241px;";
		document.getElementById('styc').style = "";
		document.getElementById('styc').style = "margin-left: 4px;position:absolute; top:217px;";
		document.getElementById('textarea').style = "";
		document.getElementById('textarea').style = "padding-left: 45px; width: 95px; height: 26px; line-height: 26px;position: absolute;top:118px;";
		document.getElementById('dialogid').style = "";
		document.getElementById('dialogid').style = "display: block;left: 283px;width:786px;height: 430px;z-index: 9009;";
	}
	if(type==1){
		document.getElementById('keywords').style.display = "none";
		document.getElementById('styb').style = "";
		document.getElementById('styb').style = "position:absolute; top:241px;";
		document.getElementById('styc').style = "";
		document.getElementById('styc').style = "margin-left: 4px;position:absolute; top:217px;";
		document.getElementById('textarea').style = "";
		document.getElementById('textarea').style = "padding-left: 45px; width: 95px; height: 26px; line-height: 26px;position: absolute;top:118px;";
		document.getElementById('dialogid').style = "";
		document.getElementById('dialogid').style = "display: block;left: 283px;width:786px;height: 430px;";
	}
	if(type==2){
		document.getElementById('keywords').style.display = "";
		document.getElementById('styb').style = "";
		document.getElementById('styb').style = "position:absolute; top:277px;";
		document.getElementById('styc').style = "";
		document.getElementById('styc').style = "margin-left: 4px;position:absolute; top:253px;";
		document.getElementById('textarea').style = "";
		document.getElementById('textarea').style = "padding-left: 45px; width: 95px; height: 26px; line-height: 26px;position: absolute;top:155px;";
		document.getElementById('dialogid').style = "";
		document.getElementById('dialogid').style = "display: block;left: 283px;width:786px;height: 480px;";
	}
}
//判断是否是关键词自动回复（修改）
function upwhether(){
	var type = $("#FruleType").val();
	if(type==0){
		document.getElementById('upkeywords').style.display = "none";
		document.getElementById('upstyb').style = "";
		document.getElementById('upstyb').style = "position:absolute; top:241px;";
		document.getElementById('upstyc').style = "";
		document.getElementById('upstyc').style = "margin-left: 4px;position:absolute; top:217px;";
		document.getElementById('uptextarea').style = "";
		document.getElementById('uptextarea').style = "padding-left: 45px; width: 95px; height: 26px; line-height: 26px;position: absolute;top:118px;";
		document.getElementById('updialogid').style = "";
		document.getElementById('updialogid').style = "display: block;left: 283px;width:786px;height: 430px;z-index: 9009;";
	}
	if(type==1){
		document.getElementById('upkeywords').style.display = "none";
		document.getElementById('upstyb').style = "";
		document.getElementById('upstyb').style = "position:absolute; top:241px;";
		document.getElementById('upstyc').style = "";
		document.getElementById('upstyc').style = "margin-left: 4px;position:absolute; top:217px;";
		document.getElementById('uptextarea').style = "";
		document.getElementById('uptextarea').style = "padding-left: 45px; width: 95px; height: 26px; line-height: 26px;position: absolute;top:118px;";
		document.getElementById('updialogid').style = "";
		document.getElementById('updialogid').style = "display: block;left: 283px;width:786px;height: 430px;";
	}
	if(type==2){
		document.getElementById('upkeywords').style.display = "";
		document.getElementById('upstyb').style = "";
		document.getElementById('upstyb').style = "position:absolute; top:277px;";
		document.getElementById('upstyc').style = "";
		document.getElementById('upstyc').style = "margin-left: 4px;position:absolute; top:253px;";
		document.getElementById('uptextarea').style = "";
		document.getElementById('uptextarea').style = "padding-left: 45px; width: 95px; height: 26px; line-height: 26px;position: absolute;top:155px;";
		document.getElementById('updialogid').style = "";
		document.getElementById('updialogid').style = "display: block;left: 283px;width:786px;height: 480px;";
	}
}
var linkParams = {
		a:0,
		b:0,
		FTexts:'',
		FTexts2:''
	};
//获取文本框光标选中的值
function getRangeById(id){ 
	var word=''; 
    if (document.selection){
    	o=document.selection.createRange();
    	if(o.text.length>0) word=o.text;
    }else{ 
    	o=document.getElementById(id); 
    	p1=o.selectionStart;
    	p2=o.selectionEnd; 
    	linkParams.a = p1; 
    	linkParams.b=p2;
    	if (p1||p1=='0'){
    		if(p1!=p2)word=o.value.substring(p1,p2);
    	}
    } 
    return word;  
} 
//超链接
function card_confirs(){
	var tc = document.getElementById(linkParams.FTexts2);
	var text = tc.value;
	var url = $("#link_a").val();
	var link = "<a href='"+url+"'>"+linkParams.FTexts+"</a>";
	tc.value=text.substring(0,linkParams.a)+link+text.substring(linkParams.b);
	$('#hidden-link').dialog('close');
	//checkTextLength(tc);
}
//判断字节长度
function checkTextLength(obj){
	var text = obj.value;
	var inputNum = text.replace(/[^\x00-\xff]/g, "**").length;
	if(inputNum>600){
		if(!checkToken){
			checkToken = true;
			$.messager.alert("提示", "回复内容字数超长！", "warning");
		}
		obj.value = text.substring(0,text.length-1);
		checkTextLength(obj);
	}else{
		if(checkToken){
			checkToken = false;
			$.messager.alert("提示", "回复内容字数超过300字，文本已截断", "warning");
		}
	}
}
function fenyuar(){
	$(".heartyou").attr("style","border:1px solid #d7231f;");
}
function yheyuar(){
	$(".heartyou").attr("style","border:1px solid #e7e8eb;");
}
function chunyuar(){
	$(".featyou").attr("style","border:1px solid #d7231f;");
}
function ckuuyuar(){
	$(".featyou").attr("style","border:1px solid #e7e8eb;");
}
function jumpyuar(){
	$(".jump").attr("style","border:1px solid #d7231f;");
}
function jumphov(){
	$(".jump").attr("style","border:1px solid #e7e8eb;");
}
function addAutomated(){
	//点击确认按钮，对话框隐藏
	var foaid=$("#FOAID").val();
	if(foaid.length==0){
		 $.messager.alert("提示", "公众号,不能为空！", "warning");
		 return false;
	}
	var fname=$("#FName").val();
	if(fname.length==0){
		 $.messager.alert("提示", "规则名称,不能为空！", "warning");
		 return false;
	}
	var fruletype=$("#FRuleType").val();
	if(fruletype==2){
		 var fkeyword=$("#FKeyWord").val();
		 var fmatchmode=$("#FMatchMode").val();
		 if(fkeyword.length==0){
			 $.messager.alert("提示", "关键字，不能为空！", "warning");
			 return false;
		 }
	}
	var freplytype=$("#FReplyType").val();
	if(freplytype.length==0){
		 $.messager.alert("提示", "公众号,不能为空！", "warning");
		 return false;
	}
	var fdeleteflag=$("#FDeleteFlag").val();
	
	var ftext=$("#FText").val();
	if(ftext.length==0){
		 $.messager.alert("提示", "回复内容,不能为空！", "warning");
		 return false;
	}
	var fstate=$("#FState").val();
	var fisprotected=$("#FIsProtected").val();
	var date={};
	date["foaid"]=foaid;
	date["fname"]=fname;
	date["fruletype"]=fruletype;
	if(fruletype==2){
		 date["fkeyword"]=fkeyword;
		 date["fmatchmode"]=fmatchmode;
	}
	date["freplytype"]=freplytype;
	date["fdeleteflag"]=fdeleteflag;
	date["ftext"]=ftext;
	date["fstate"]=fstate;
	date["fisprotected"]=fisprotected;
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
			type:"POST",
			url:"rs/insertautomatedResponse.do",
			dataType:"json",
			data: {jsonobj:JSON.stringify(date)},
			success: function(data){
				$.messager.progress("close");//隐藏加载中
				$('#dialogid').dialog('close');
				if(data.result){
					//查询前先组织查询条件
					$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
					$("#easy_table").datagrid("load","rs/selectautomatedResponse.do");
					$.messager.alert("提示", "添加成功", "warning");
				}else if(data.msg){
					$.messager.alert("提示", data.msg, "warning");
				}else{
					$.messager.alert("提示", data.info, "warning");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载中
				$.messager.alert("提示", "请求出错！", "warning");
	   	}
	}); 
}
function upAutomated(ids,rows){
	var row=rows[0];
	$("#updialogid").dialog().dialog("open");
	$("#Fid").val(row.fid); 
	$("#Foaid").combobox('setValue',row.foaid); 
	$("#Fname").textbox('setValue',row.fname); 
	$("#FruleType").combobox('setValue',row.fruletype); 
	$("#FreplyType").combobox('setValue',row.freplytype); 
	if(row.fruletype==2){
		document.getElementById('upkeywords').style.display = "";
	}else{
		document.getElementById('upkeywords').style.display = "none";
	}
	$("#FkeyWord").textbox('setValue',row.fkeyword);
	$("#FmatchMode").combobox('setValue',row.fmatchmode);
	$("#Ftext").val(row.ftext);
}

function updateAutomated(){
	var fid=$("#Fid").val();
	var foaid=$("#Foaid").val();
	var fname=$("#Fname").val();
	var fruletype=$("#FruleType").val();
	if(fruletype==2){
		var fkeyword=$("#FkeyWord").val();
    	var fmatchmode=$("#FmatchMode").val();
    	if(fkeyword.length==0){
    		 $.messager.alert("提示", "关键字，不能为空！", "warning");
    		return false;
    	}
	}
	var freplytype=$("#FreplyType").val();
	var fisprotected=$("#FIsProtected").val();
	var ftext=$("#Ftext").val();
	var date={};
	date["fid"]=fid;
	date["foaid"]=foaid;
	date["fname"]=fname;
	date["fruletype"]=fruletype;
	if(fruletype==2){
		date["fmatchmode"]=fmatchmode;
		date["fkeyword"]=fkeyword;
	}
	date["freplytype"]=freplytype;
	date["ftext"]=ftext;
	date["fisprotected"]=fisprotected;
	var dat={
		jsonobj:JSON.stringify(date)
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"rs/updateautomatedResponse.do",
		dataType:"json",
		data:dat,
		success: function(data){
			$.messager.progress("close");//隐藏加载中
			$('#updialogid').dialog('close');
			if (data.result) {
				$.messager.alert("提示", "修改成功！", "warning");
				$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
				$("#easy_table").datagrid("load","rs/selectautomatedResponse.do");
			}else if(data.msg){
				$.messager.alert("提示", data.msg, "warning");
			}else{
				$.messager.alert("提示", data.info, "warning");
			}
		},error:function(){
			 $.messager.progress("close");//隐藏加载中
			 $.messager.alert("提示", "请求出错！", "warning");
    	}
	});
}