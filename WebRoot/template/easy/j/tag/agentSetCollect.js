
function getFAuditType(){
		
	$.ajax({
		async: false,
		type:"POST",
		url:"agentSet/getSaleActivityInfo.do",
		dataType:"json",
		success:function(data){
			$("#FAuditTypeFID").val(data.fid);
			saveCheck("FAuditType",data.faudittype);
			saveCheck("FCanModify",data.fcanmodify);
			saveCheck("FModifyAuditType",data.fmodifyaudittype);
		},
		error:function(){
  			$.messager.alert('提示','系统错误','warning');
  		}
	});
}
function saveFAuditType(){
	var fid=$("#FAuditTypeFID").val();
	var faudittype=checkedVal("FAuditType");
	var fcanmodify=checkedVal("FCanModify");
	var fmodifyaudittype=checkedVal("FModifyAuditType");
	var json={};
	json["fid"]=fid;
	json["faudittype"]=faudittype;
	json["fcanmodify"]=fcanmodify;
	json["fmodifyaudittype"]=fmodifyaudittype;
	var param={
	   jsonobj:JSON.stringify(json)
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		async: false,
		type:"POST",
		url:"agentSet/editSaleActivityInfo.do",
		data:param,
		dataType:"json",
		success:function(data){
			$.messager.progress('close');
			if(data.result){
				$.messager.alert('提示',data.msg,'warning');
				getFAuditType();
			}else{
				$.messager.progress('close');
				$.messager.alert('提示',data.msg,'warning');
			}
		},
		error:function(){
			$.messager.progress('close');
  			$.messager.alert('提示','"系统错误"','warning');
  		}
	});
}
function getSaleActivityInfo(){
	$.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
		 async: false,
		 type:"POST",
		 url:"saleactivity/getSaleActivityInfoThree.do",
		 dataType:"json",
		 success:function(data){
			 $("#agentSetCollect").empty();
			 if(data.saleactivityinfo.length>0||data.saleactivityinfotag.length>0){
				 var str='';
		           $(data.saleactivityinfo).each(function () {
		        	   var fmusthave='<input  onclick="fmusthave1(this)" type="checkbox"  checked="checked" style="width: 20px;" name="fmusthave"/>';
		        	   if(this.fmusthave!=1&&this.ffixcolumn>2){
		        		   fmusthave='<input  onclick="fmusthave1(this)" type="checkbox" style="width: 20px;" name="fmusthave"/>';
		        	   }
		        	   if(this.ffixcolumn<=2){
		        		   fmusthave='<input  onclick="fmusthave1(this)" type="checkbox" disabled checked="checked" style="width: 20px;" name="fmusthave"/>';
		        	   }
		        	   var fneedshow='<input  type="checkbox"  checked="checked" style="width: 20px;" name="fneedshow"/>'
	        		   if(this.fneedshow!=1&&this.ffixcolumn>2){
	        			   fneedshow='<input  type="checkbox" style="width: 20px;" name="fneedshow"/>';
		        	   }
		        	   if(this.ffixcolumn<=2||this.fmusthave==1){
		        		   fneedshow='<input  type="checkbox" disabled checked="checked" style="width: 20px;" name="fneedshow"/>'
		        	   }
		        	   var forder='';
				       if(this.ffixcolumn>2){
					       forder='<input style="margin-left: 30px;" onchange="Check(this)" name="forder" value="'+this.forder+'" class="form-control text" placeholder="&#12288;请输入序号" type="text"/>';
				       }else{
				    	   forder='<input style="margin-left: 30px;" onchange="Check(this)" name="forder" value="" class="form-control text" placeholder="&#12288;请输入序号" type="hidden"/>';
				       }
		        	   var fname=ffname(this.ffixcolumn);
		        	   str +='<tr class="saleactivityinfo1"><td style="width: 150px;text-align: right;">'+
			           '<label >'+fname+'：</label></td><input type="hidden" name="ffixcolumn" fid="'+this.fid+'" ffixcolumn="'+this.ffixcolumn+'">'+
			           '<td style="width: 100px;">'+fmusthave+
			           '<label >必输</label>'+
			           '</td>'+
			           '<td style="width: 80px;">'+fneedshow+
			           '<label >显示</label>'+
			           '</td>'+
			           '<td align="left">'+
			           '<input class="form-control text" onchange="CheckDec(this)" value="'+this.fscore+'" placeholder="&#12288;请输入收集奖励" type="text" name="fscore"  />'+
			           forder+
			           '</td></tr>';
		           });
		             $(data.saleactivityinfotag).each(function () {
		        	   var fmusthave='<input onclick="fmusthave1(this)" type="checkbox" style="width: 20px;" name="fmusthave"/>';
		        	   if(this.fmusthave==1){
		        		   fmusthave='<input  onclick="fmusthave1(this)" type="checkbox" checked="checked" style="width: 20px;" name="fmusthave"/>';
		        	   }
		        	   var fneedshow='<input  type="checkbox" style="width: 20px;" name="fneedshow"/>'
		        	   if(this.fneedshow==1){  
		        	       fneedshow='<input  checked="checked" type="checkbox" style="width: 20px;" name="fneedshow"/>'
		        	   }
		        	   if(this.fmusthave==1){
		        		   fneedshow='<input checked="checked" disabled type="checkbox" style="width: 20px;" name="fneedshow"/>'
		        	   }
		        	   var forder='<input style="margin-left: 30px;" onchange="Check(this)" name="forder" value="'+this.forder+'" class="form-control text" placeholder="&#12288;请输入序号" type="text"/>';
		        	   str +='<tr class="saleactivityinfotag1"><td style="width: 150px;text-align: right;">'+
			           '<label >'+this.fname+'：</label></td><input type="hidden" name="ftagcaptionid" fid="'+this.fid+'" ftagcaptionid="'+this.ftagcaptionid+'">'+
			           '<td style="width: 100px;">'+fmusthave+
			           '<label >必输</label>'+
			           '</td>'+
			           '<td style="width: 80px;">'+fneedshow+
			           '<label >显示</label>'+
			           '</td>'+
			           '<td align="left">'+
			           '<input class="text" onchange="CheckDec(this)" value="'+this.fscore+'" placeholder="&#12288;请输入收集奖励" type="text" name="fscore"  />'+
			           forder+
			           '</td></tr>';
		           }); 
		            $(data.unittagcaption).each(function () {
	            	   var fmusthave='<input  onclick="fmusthave1(this)" type="checkbox" style="width: 20px;" name="fmusthave"/>';
		        	   if(this.fmusthave==1){
		        		   fmusthave='<input  onclick="fmusthave1(this)" type="checkbox" checked="checked" style="width: 20px;" name="fmusthave"/>';
		        	   }
		        	   var fneedshow='<input  check" type="checkbox" style="width: 20px;" name="fneedshow"/>'
		        	   if(this.fneedshow==1){  
		        	       fneedshow='<input  checked="checked" type="checkbox" style="width: 20px;" name="fneedshow"/>'
		        	   }
		        	   if(this.fmusthave==1){
		        		   fneedshow='<input  checked="checked" disabled type="checkbox" style="width: 20px;" name="fneedshow"/>'
		        	   }
		        	   var forder='<input style="margin-left: 30px;" onchange="Check(this)" name="forder" value="'+this.forder+'" class="form-control text" placeholder="&#12288;请输入序号" type="text"/>';
		        	   str +='<tr class="unittagcaption1"><td style="width: 150px;text-align: right;">'+
			           '<label >'+this.fname+'：</label></td><input type="hidden" name="ftagcaptionid" fid="'+this.infoid+'" ftagcaptionid="'+this.fid+'">'+
			           '<td style="width: 100px;">'+fmusthave+
			           '<label >必输</label>'+
			           '</td>'+
			           '<td style="width: 80px;">'+fneedshow+
			           '<label >显示</label>'+
			           '</td>'+
			           '<td align="left">'+
			           '<input  onchange="CheckDec(this)" class="text" value="'+this.fscore+'" placeholder="&#12288;请输入收集奖励" type="text" name="fscore"  />'+
			           forder+
			           '</td></tr>';
			          }); 
		           $("#agentSetCollect").append(str);
		           $.messager.progress('close');
			 }
		 }
	 });
	 //$.messager.progress('close');
}
function saveAgentSetCollect(){
	 var data=new Array();
	 var data2=new Array();
	 var data3=new Array();
	 
	 
	 $(".saleactivityinfo1").each(function(){
		  var fmusthave =0;
		  if(typeof $(this).find("input[name=fmusthave]:checked")[0]=="object"){
			  fmusthave=1
		  }
		  var fneedshow=0;
		  if(typeof $(this).find("input[name=fneedshow]:checked")[0]=="object"){
			  fneedshow=1
		  }
		  var fscore = $(this).find("input[name=fscore]").val();
		  //var fprizescore = $(this).find("input[name=fprizescore]").val();
		  var forder = $(this).find("input[name=forder]").val();
		  var ffixcolumn=$(this).find("input[name=ffixcolumn]").attr("ffixcolumn");
		  var fid=$(this).find("input[name=ffixcolumn]").attr("fid");
		  var data1={};
		  data1["fid"]=fid;
		  data1["ffixcolumn"]=ffixcolumn;
		  data1["fneedshow"]=fneedshow;
		  data1["fmusthave"]=fmusthave;
		  data1["fscore"]=fscore;
		  data1["forder"]=forder;
		  data.push(data1);
		  console.log(fmusthave+"-fneedshow-"+fneedshow+"-fscore-"+fscore+"-forder-"+forder+"-ffixcolumn-"+ffixcolumn+"-fid-"+fid);
		});
	 $(".saleactivityinfotag1").each(function(){
		  var fmusthave =0;
		  if(typeof $(this).find("input[name=fmusthave]:checked")[0]=="object"){
			  fmusthave=1
		  }
		  var fneedshow=0;
		  if(typeof $(this).find("input[name=fneedshow]:checked")[0]=="object"){
			  fneedshow=1
		  }
		  var fscore = $(this).find("input[name=fscore]").val();
		  //var fprizescore = $(this).find("input[name=fprizescore]").val();
		  var forder = $(this).find("input[name=forder]").val();
		  var ftagcaptionid=$(this).find("input[name=ftagcaptionid]").attr("ftagcaptionid");
		  var fid=$(this).find("input[name=ftagcaptionid]").attr("fid");
		  var data1={};
		  data1["fid"]=fid;
		  data1["ftagcaptionid"]=ftagcaptionid;
		  data1["fneedshow"]=fneedshow;
		  data1["fmusthave"]=fmusthave;
		  data1["fscore"]=fscore;
		  data1["forder"]=forder;
		  //data1["fprizescore"]=fprizescore;
		  data2.push(data1);
		  console.log(fmusthave+"-fneedshow-"+fneedshow+"-fscore-"+fscore+"-forder-"+forder+"-ftagcaptionid-"+ftagcaptionid+"-fid-"+fid);
		});
	 $(".unittagcaption1").each(function(){
		  var fmusthave =0;
		  if(typeof $(this).find("input[name=fmusthave]:checked")[0]=="object"){
			  fmusthave=1
		  }
		  var fneedshow=0;
		  if(typeof $(this).find("input[name=fneedshow]:checked")[0]=="object"){
			  fneedshow=1
		  }
		  var fscore = $(this).find("input[name=fscore]").val();
		 // var fprizescore = $(this).find("input[name=fprizescore]").val();
		  var forder = $(this).find("input[name=forder]").val();
		  var ftagcaptionid=$(this).find("input[name=ftagcaptionid]").attr("ftagcaptionid");
		  var fid=$(this).find("input[name=ftagcaptionid]").attr("fid");
		  var data1={};
		  data1["fid"]=fid;
		  data1["ftagcaptionid"]=ftagcaptionid;
		  data1["fneedshow"]=fneedshow;
		  data1["fmusthave"]=fmusthave;
		  data1["fscore"]=fscore;
		  data1["forder"]=forder;
		  //data1["fprizescore"]=fprizescore;
		  data3.push(data1);
		  console.log(fmusthave+"-fneedshow-"+fneedshow+"-fscore-"+fscore+"-forder-"+forder+"-ftagcaptionid-"+ftagcaptionid+"-fid-"+fid);
		});
	      var fcardupgrade=checkedVal("fcardupgrade");
	      var json={};
	      json["saleactivityinfo"]=data;
	      json["saleactivityinfotag"]=data2;
	      json["unittagcaption"]=data3;
	      json["fcardupgrade"]=fcardupgrade;
	      var param={
	  			jsonobj:JSON.stringify(json)
	  		}
	    $.messager.progress({text : "正在处理，请稍候..."});
	  	$.ajax({
	  		async: false,
	  		type:"POST",
	  		url:"saleactivity/saveTagCaptionSaleActivityInfoThree.do",
	  		data:param,
	  		dataType:"json",
	  		success:function(data){
	  			getSaleActivityInfo();
	  			$.messager.progress('close');
	  			if(data.result){
	  				$.messager.alert('提示',data.msg,'warning');
	  			}else{
	  				$.jbootmsg(data.msg,"error");
	  			}
	  		},
	  		error:function(){
	  			$.messager.progress('close');
	  			$.messager.alert('提示','系统错误','warning');
	  		}
	  	});
	     $.messager.progress('close');
}
function saveCheck(name,aValue){
	var chkObjs = document.getElementsByName(name)//传入一个对象
	for(var i=0;i<chkObjs.length;i++) {//循环
        if(chkObjs[i].value==aValue){  //比较值
        	chkObjs[i].checked=true; //修改选中状态
            break; //停止循环
        }
	}
}

function getFRecruitType(){//招募条件里点击的时候用到
	 var fcardupgrade=checkedVal("FRecruitType");
	 if(fcardupgrade==1){
		 $("#FRecruitType").hide();
		 $("#agent").show();
	 }else{
		 $("#FRecruitType").show();
		 $("#agent").hide();
	 }
}

//获取单选按钮的值
function checkedVal(name){
	var chkObjs = document.getElementsByName(name);
	var value="";
    for(var i=0;i<chkObjs.length;i++){
        if(chkObjs[i].checked){
        	value = chkObjs[i].value;
        }
    }
    return value;
}
function ffname(ffixcolumn){
	var fname=""; 
	if(ffixcolumn==1){fname="姓名";}
	if(ffixcolumn==2){fname="电话";}
	if(ffixcolumn==3){fname="性别";}
	if(ffixcolumn==4){fname="地址";}
	if(ffixcolumn==5){fname="出生年月";}
	if(ffixcolumn==6){fname="职务";}
	if(ffixcolumn==7){fname="影响力";}
	if(ffixcolumn==8){fname="个人背景";}
	if(ffixcolumn==9){fname="学历";}
	if(ffixcolumn==10){fname="民族";}
	if(ffixcolumn==11){fname="兴趣爱好";}
	if(ffixcolumn==12){fname="关心的品牌";}
	if(ffixcolumn==13){fname="关心的类别";}
	if(ffixcolumn==14){fname="倾向的活动类别";}
	if(ffixcolumn==15){fname="商品使用情况";}
	if(ffixcolumn==16){fname="购买的地方";}
	if(ffixcolumn==17){fname="门店";}
	return fname;
}
//验证只能输入数字
function Check(obj){
	if (obj.value.length == 1) {
		obj.value = obj.value.replace(/[^0-9]/g, '');
	} else {
		obj.value = obj.value.replace(/[^0-9]{1}[^0-9]*/g,'');
	}
}
//验证只能输入数字和小数
function CheckDec(obj){
	if (obj.value.length == 1) {
		obj.value = obj.value.replace(/[^0-9]/g, '');
	} else {
		obj.value = obj.value.replace(/[^0-9.]{1}[^0-9.]*/g,'');
		//obj.value = obj.value.replace(/[^0-9.]/, '');
	}
}
function fmusthave1(obj){
	 if($(obj).is(":checked")){
		 $(obj).parent().parent().find("input[name=fneedshow]").prop("checked",true);
		 $(obj).parent().parent().find("input[name=fneedshow]").prop("disabled",true);
		 console.log("选中");
	 }else{
		 $(obj).parent().parent().find("input[name=fneedshow]").prop("disabled",false);
		 console.log("未选中");
	 }
}
