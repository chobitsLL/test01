
$(function(){
	
	queryBuyInfo();
	
});
function queryBuyInfo(){
	$.messager.progress({text : "正在处理，请稍候..."});
	
	$.ajax({
		async: false,
		type:"POST",
		url:"agentSet/queryBuyInfoSet.do",
		dataType:"json",
		success:function(data){
			//FID,FUnitID,FCaption,FTagType,FNeedShow,FMustHave
			$.messager.progress('close');
			$(".saleactivityinfo2").each(function(){
				var ftagtype = $(this).attr("ftagtype");
				$(this).find("input[name=fneedshow]").prop("checked",false);
				$(this).find("input[name=fmusthave]").prop("checked",false);
				$(this).attr("fid","");
				$(this).find("input[name=FCaption]").val("");
				if(ftagtype==1||ftagtype==2||ftagtype==3||ftagtype==4||ftagtype==6||ftagtype==7){
					$(this).find("input[name=fneedshow]").prop("checked",true);
					$(this).find("input[name=fmusthave]").prop("checked",true);
					$(this).find("input[name=fneedshow]").prop("disabled",true);
					$(this).find("input[name=fmusthave]").prop("disabled",true);
				}
				for(var i=0;i<data.length;i++){
					if(ftagtype==data[i].ftagtype){
						$(this).attr("fid",data[i].fid);
						if(ftagtype==1||ftagtype==2||ftagtype==3||ftagtype==4||ftagtype==6||ftagtype==7){}
						else{
						if(data[i].fneedshow==1){
							$(this).find("input[name=fneedshow]").prop("checked",true);
							$(this).find("input[name=fneedshow]").prop("disabled",false);
						}else{
							$(this).find("input[name=fneedshow]").prop("checked",false);
							$(this).find("input[name=fneedshow]").prop("disabled",false);
						}
						if(data[i].fmusthave==1){
							$(this).find("input[name=fneedshow]").prop("checked",true);
							$(this).find("input[name=fmusthave]").prop("checked",true);
							$(this).find("input[name=fneedshow]").prop("disabled",true);
						}else{
							$(this).find("input[name=fmusthave]").prop("checked",false);
							$(this).find("input[name=fneedshow]").prop("disabled",false);
						}
						}
						if(ftagtype>=9){
							$(this).find("input[name=FCaption]").val(data[i].fcaption);
						}
					}
				}
			});
		},error:function(){
			$.messager.progress('close');
  			$.messager.alert('提示','系统错误','warning');
		}
	});
}
function saveBuyInfo(){
	var data=new Array();
	var ss=0;
	$(".saleactivityinfo2").each(function(){
		  var fmusthave =0;
		  if(typeof $(this).find("input[name=fmusthave]:checked")[0]=="object"){
			  fmusthave=1
		  }
		  var fneedshow=0;
		  if(typeof $(this).find("input[name=fneedshow]:checked")[0]=="object"){
			  fneedshow=1
		  }
		  var ftagtype = $(this).attr("ftagtype");
		  var fid = $(this).attr("fid");
		  var fcaption=$(this).find("label[name=FCaption]").html();
		  if(ftagtype>=9){
			  fcaption=$(this).find("input[name=FCaption]").val();
			  if(fneedshow==1&&fcaption==""){
				  ss=1;
			  }
		  }
		  var data1={};
		  data1["fid"]=fid;
		  data1["fcaption"]=fcaption;
		  data1["ftagtype"]=ftagtype;
		  data1["fneedshow"]=fneedshow;
		  data1["fmusthave"]=fmusthave;
		  data.push(data1);
		  console.log("-"+fmusthave+"-fneedshow-"+fneedshow+"-ftagtype-"+ftagtype+"-fid-"+fid+"-fcaption-"+fcaption);
	});
	if(ss==1){
		  $.messager.alert('提示','显示自定义项时，自定义标题不能为空','warning');
		  return false;
	  }
	var json={};
    json["data"]=data;
	var param={
  			jsonobj:JSON.stringify(json)
  		}
	
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		async: false,
		type:"POST",
		url:"agentSet/saveBuyInfoSet.do",
		data:param,
		dataType:"json",
		success:function(data){
			$.messager.progress('close');
			queryBuyInfo();
			if(data.result){
  				$.messager.alert('提示',data.msg,'warning');
  			}else{
  				$.messager.alert('提示',data.msg,'warning');
  			}
			
		},error:function(){
			$.messager.progress('close');
  			$.messager.alert('提示','系统错误','warning');
		}
	})
	
}