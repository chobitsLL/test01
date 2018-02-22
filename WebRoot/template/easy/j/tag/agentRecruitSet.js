$(function(){
	initAgen();
	initSet();
	
	function initAgen(){
		$.ajax({
			async:false,
			type:"POST",
			url:"agentSet/getAgentSet.do",
			dataType:"json",
			success:function(data){
				$("#AgentSetID").val(data.fid);
				var fcardupgrade=data.frecruittype;
				saveCheck("FRecruitType",fcardupgrade);
				getFRecruitType();
			},
			error:function(){
				 $.messager.alert("警告","系统错误","warning");
			}
		});
	}
	
	
});
function initSet(){
	  $.messager.progress({text : "正在处理，请稍候..."});
	  $.ajax({
//		  async:false,
		  async:true,
		  type:"POST",
		  url:"agentSet/getAgentRecruitSet.do",
		  dataType:"json",
		  success:function(data){
			  $.messager.progress("close");
			  $("#tagcption").empty();
				 if(data.saleactivityinfo.length>0||data.saleactivityinfotag.length>0){
					 var str='';
			           $(data.saleactivityinfo).each(function () {
			        	   var fname=ffname(this.ffixcolumn);
			        	   var td= '<td align="left" style="width: 300px;"><label class="lable label2" style="margin-right:20px;">包含</label>'+
				                   '<input class="form-control text"  type="text" name="FValue" value="'+this.fvalue+'" ></td>';
			        	   if(this.ffixcolumn==3){
			        		   td= '<td align="left" style="width: 300px;"><input style="margin-left: 20px;" type="radio" name="FValue">不限'+
			        			   '<input style="margin-left:10px;" type="radio" name="FValue">男'+
			        		       '<input style="margin-left:10px;" type="radio" name="FValue">女</td>';
			        		   if(this.fvalue==0){
			        			   td= '<td align="left" style="width: 300px;"><input style="margin-left: 20px;" checked="checked" type="radio" name="FValue" value="0">不限'+
			        			   '<input style="margin-left:10px;" type="radio" name="FValue" value="1">男'+
			        		       '<input style="margin-left:10px;" type="radio" name="FValue" value="2">女</td>';
			        		   }else if(this.fvalue==1){
			        			   td= '<td align="left" style="width: 300px;"><input style="margin-left: 20px;" type="radio" name="FValue" value="0">不限'+
			        			   '<input style="margin-left:10px;" checked="checked" type="radio" name="FValue" value="1">男'+
			        		       '<input style="margin-left:10px;" type="radio" name="FValue" value="2">女</td>';
			        		   }else if(this.fvalue==2){
			        			   td= '<td align="left" style="width: 300px;"><input style="margin-left: 20px;" type="radio" name="FValue" value="0">不限'+
			        			   '<input style="margin-left:10px;" type="radio" name="FValue" value="1">男'+
			        		       '<input style="margin-left:10px;" checked="checked" type="radio" name="FValue" value="2">女</td>';
			        		   }
			        	   }
			        	   if(this.ffixcolumn==5){
			        		   td= '<td align="left" style="width: 400px;"><input style="margin-left: 20px;" type="radio" name="FOperateType" value="2">大于'+
			        			   '<input style="margin-left:10px;" type="radio" name="FOperateType" value="3">等于'+
			        		       '<input style="margin-left:10px;" type="radio" name="FOperateType" value="4">小于'+
			        			   '<input class="form-control text" type="text" style="width: 203px; margin-left: 5px;" name="FValue" value="'+this.fvalue+'"></td>';
			        		   if(this.foperatetype==2){
			        			   td= '<td align="left" style="width: 400px;"><input style="margin-left: 20px;" checked="checked" type="radio" name="FOperateType" value="2">大于'+
			        			   '<input style="margin-left:10px;" type="radio" name="FOperateType" value="3">等于'+
			        		       '<input style="margin-left:10px;" type="radio" name="FOperateType" value="4">小于'+
			        			   '<input class="form-control text" type="text" style="width: 203px; margin-left: 5px;" name="FValue" value="'+this.fvalue+'"></td>';
			        		   }else if(this.foperatetype==3){
			        			   td= '<td align="left" style="width: 400px;"><input style="margin-left: 20px;"  type="radio" name="FOperateType" value="2">大于'+
			        			   '<input style="margin-left:10px;" checked="checked" type="radio" name="FOperateType" value="3">等于'+
			        		       '<input style="margin-left:10px;" type="radio" name="FOperateType" value="4">小于'+
			        			   '<input class="form-control text" style="width: 203px; margin-left: 5px;" type="text" name="FValue" value="'+this.fvalue+'"></td>';
			        		   }else if(this.foperatetype==4){
			        			   td= '<td align="left" style="width: 400px;"><input style="margin-left: 20px;"  type="radio" name="FOperateType" value="2">大于'+
			        			   '<input style="margin-left:10px;" type="radio" name="FOperateType" value="3">等于'+
			        		       '<input style="margin-left:10px;" checked="checked" type="radio" name="FOperateType" value="4">小于'+
			        			   '<input class="form-control text" style="width: 203px; margin-left: 5px;" type="text" name="FValue" value="'+this.fvalue+'"></td>';
			        		   }
			        	   }
			        	   str +='<tr class="saleactivityinfo"><td style="width: 150px;text-align: right;">'+
				           '<label class="lable">'+fname+'：</label></td><input type="hidden" name="ffixcolumn" fid="'+this.fid+'" ffixcolumn="'+this.ffixcolumn+'">'+
				           td+'</tr>';
			           });
			             $(data.saleactivityinfotag).each(function () {
			            	 var lable='';
			            	 var fusetype=this.fusetype;
			            	 if(fusetype!=1){
			            		 lable +='<label class="label1 label2"><input class=" check" type="radio" style="width: 20px;" name="fid'+this.tagcaptionid+'"  />不限</label>';
			            	 }
			            	 $(this.tagInfo).each(function () {
			            		 if(fusetype==1){
				            		 if(this.fneeded==1){
				            			 lable +='<label class="label1 label2"><input class="saleactivityinfotag check" type="checkbox" checked="checked" style="width: 20px;" name="fid'+this.fid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }else{
				            			 lable +='<label class="label1 label2"><input class="saleactivityinfotag check" type="checkbox" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }
			            		 }else{
			            			    // lable +='<label class="label1 label2"><input class="check" type="radio" style="width: 20px;" name="fid'+this.fheaderid+'" />'+不限+'</label>';
			            			 if(this.fneeded==1){
				            			 lable +='<label class="label1 label2"><input class="saleactivityinfotag check" type="radio" checked="checked" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }else{
				            			 lable +='<label class="label1 label2"><input class="saleactivityinfotag check" type="radio" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }
			            		 }
			            		
			            	 })
			            	 if(this.tagInfo.length>0){
			            		 str +='<tr><td style="width: 150px;text-align: right;"><label>主题：</label>'+
			            		 '<td align="left"><label style="margin-left: 20px;">'+this.fname+'</label></td>'+
			            	     '<tr><td style="width: 150px;text-align: right;"><label>标签：</label></td>'+
			            		 '<td align="left">'+lable+'</td><tr>'
			            	 }
			            	 
			           }); 
			            $(data.unittagcaption).each(function () {
			            	 var lable='';
			            	 var fusetype=this.fusetype;
			            	 if(fusetype!=1){
			            		 lable +='<label class="label1 label2"><input class=" check" type="radio" style="width: 20px;" name="fid'+this.fid+'"  />不限</label>';
			            	 }
			            	 $(this.unitTagInfo).each(function () {
			            		 if(fusetype==1){
				            		 if(this.fneeded==1){
				            			 lable +='<label class="label1 label2"><input class="unittagcaption check" type="checkbox" checked="checked" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }else{
				            			 lable +='<label class="label1 label2"><input class="unittagcaption check" type="checkbox" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }
			            		 }else{
			            			 if(this.fneeded==1){
				            			 lable +='<label class="label1 label2"><input class="unittagcaption check" type="radio" checked="checked" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }else{
				            			 lable +='<label class="label1 label2"><input class="unittagcaption check" type="radio" style="width: 20px;" name="fid'+this.fheaderid+'" sfid="'+this.sfid+'" value="'+this.fid+'" fheaderid="'+this.fheaderid+'"/>'+this.fname+'</label>';
				            		 }
			            		 }
			            	 })
			            	 if(this.unitTagInfo.length>0){
			            		 str +='<tr><td style="width: 150px;text-align: right;"><label>主题：</label>'+
			            		 '<td align="left"><label style="margin-left: 20px;">'+this.fname+'</label></td>'+
			            	     '<tr ><td style="width: 150px;text-align: right;"><label>标签：</label></td>'+
			            		 '<td align="left">'+lable+'</td><tr>'
			            	 }
			            	 
				          }); 
			           $("#tagcption").append(str);
			           $.messager.progress('close');
				 }
		  },
		  error:function(){
			  $.messager.progress('close');
			  $.messager.alert("提示","系统错误","warning");
		  }
	  })
	}
function saveAgent(){
	 var data=new Array();
	 var data2=new Array();
	 var data3=new Array();
	 $(".saleactivityinfo").each(function(){
		 var ffixcolumn=$(this).find("input[name=ffixcolumn]").attr("ffixcolumn");
		 var fid=$(this).find("input[name=ffixcolumn]").attr("fid");
		 var fvalue=$(this).find("input[name=FValue]").val();
		 var foperatetype=1;
		 var fvaluetype=2;
		 var ftype=1;
		 if(ffixcolumn==3){
			 fvalue=$(this).find("input[name=FValue]:checked").val();
			 foperatetype=5;
			 fvaluetype=1;
		 }if(ffixcolumn==5){
			 foperatetype= $(this).find("input[name=FOperateType]:checked").val();
		 }
		 if(foperatetype==""||foperatetype==undefined||foperatetype=="undefined"){foperatetype=0;}
         var ftagtype=null;
         var ftagcaptionid=null;
         var ftagid=null;
         var fneeded=null;
	     var data1={};
	     data1["fid"]=fid;
	     data1["ffixcolumn"]=ffixcolumn;
	     data1["fvalue"]=fvalue;
	     data1["foperatetype"]=foperatetype;
	     data1["fvaluetype"]=fvaluetype;
	     data1["ftype"]=ftype;
	     data1["ftagtype"]=ftagtype;
	     data1["ftagcaptionid"]=ftagcaptionid;
	     data1["ftagid"]=ftagid;
	     data1["fneeded"]=fneeded;
	     //data1["fprizescore"]=fprizescore;
	     data.push(data1);
	     //console.log("1"+fvalue+"-fvalue-"+foperatetype+"-foperatetype-"+fvaluetype+"-fvaluetype-"+ftype+"-ftype-|-ffixcolumn-"+ffixcolumn+"-fid-"+fid);
	 });
	 $(".saleactivityinfotag").each(function(){
		 var check = $(this);
		 var ftagid=check.val();
		 var fid=check.attr("sfid");
		 var ftagcaptionid=check.attr("fheaderid");
		 var fneeded=0;
		 /*if(typeof $(this).find("input[name=fid]:checked")[0]=="object"){
			 fneeded=1
		 }*/
		 if(check.is(":checked")){
			 fneeded=1
		 }
		 
		 var ftype=2;
		 var ftagtype=0;
		 var ffixcolumn=null;
		 var fvalue=null;
		 var foperatetype=null;
		 var fvaluetype=null;
	     var data1={};
	     data1["fid"]=fid;
	     data1["ffixcolumn"]=ffixcolumn;
	     data1["fvalue"]=fvalue;
	     data1["foperatetype"]=foperatetype;
	     data1["fvaluetype"]=fvaluetype;
	     data1["ftype"]=ftype;
	     data1["ftagtype"]=ftagtype;
	     data1["ftagcaptionid"]=ftagcaptionid;
	     data1["ftagid"]=ftagid;
	     data1["fneeded"]=fneeded;
	     //data1["fprizescore"]=fprizescore;
	     data2.push(data1);
	     //console.log("2"+fvalue+"-fvalue-"+foperatetype+"-foperatetype-"+fvaluetype+"-fvaluetype-"+ftype+"-ftype-|-ffixcolumn-"+ffixcolumn+"-fid-"+fid);
		});
	 $(".unittagcaption").each(function(){
		 var check = $(this);
		 var ftagid=check.val();
		 var fid=check.attr("sfid");
		 var ftagcaptionid=check.attr("fheaderid");
		 var fneeded=0;
		 if(check.is(":checked")){
			 fneeded=1
		 }
		 var ftype=2;
		 var ftagtype=1;
		 var ffixcolumn=null;
		 var fvalue=null;
		 var foperatetype=null;
		 var fvaluetype=null;
	     var data1={};
	     data1["fid"]=fid;
	     data1["ffixcolumn"]=ffixcolumn;
	     data1["fvalue"]=fvalue;
	     data1["foperatetype"]=foperatetype;
	     data1["fvaluetype"]=fvaluetype;
	     data1["ftype"]=ftype;
	     data1["ftagtype"]=ftagtype;
	     data1["ftagcaptionid"]=ftagcaptionid;
	     data1["ftagid"]=ftagid;
	     data1["fneeded"]=fneeded;
	     //data1["fprizescore"]=fprizescore;
	     data3.push(data1);
	     //console.log("3"+fvalue+"-fvalue-"+foperatetype+"-foperatetype-"+fvaluetype+"-fvaluetype-"+ftype+"-ftype-|-ffixcolumn-"+ffixcolumn+"-fid-"+fid);
		});
	    /* $.jbootloading("hide");
	     console.log("睡觉奥大事记"+JSON.stringify(data3))
	     return false;*/
	      var json={};
	      var agentsetid=$("#AgentSetID").val();
	      var frecruittype=checkedVal("FRecruitType");
	      json["saleactivityinfo"]=data;
	      json["saleactivityinfotag"]=data2;
	      json["unittagcaption"]=data3;
	      json["agentsetid"]=agentsetid;
	      json["frecruittype"]=frecruittype;
	      var param={
	  			jsonobj:JSON.stringify(json)
	  		}
	    $.messager.progress();
	  	$.ajax({
	  		
	  		type:"POST",
	  		url:"agentSet/saveAgentRecruitSet.do",
	  		data:param,
	  		dataType:"json",
	  		success:function(data){
	  			initSet();
	  			$.messager.progress('close');
	  			if(data.result){
	  				$.messager.alert("提示",data.msg,"warning");
	  			}else{
	  				$.messager.alert("提示",data.msg,"warning");
	  			}
	  		},
	  		error:function(){
	  			$.messager.progress('close');
	  			$.messager.alert("提示","系统错误","warning");
	  		}
	  	});
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
function getFRecruitType(){
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
	if(ffixcolumn==15){fname="家电使用情况";}
	if(ffixcolumn==16){fname="购买的地方";}
	if(ffixcolumn==17){fname="门店";}
	return fname;
}
