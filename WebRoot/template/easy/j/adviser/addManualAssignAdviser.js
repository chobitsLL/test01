$(function(){
	$("#distributionDesc").jeasycombo({
		width:650,
		label:'分配原因:',
		labelWidth:200,
		multiple: false,//是否多选
		dlgwidth: 500,
		dlgheight: 400,
		type : "list",//弹出的样式
		url : "adviserApp/queryAdviserReason.do?type=1"
	});
	
	var accordion=jaccordion($("#game-award"),400);
	
});

window.checkboxOrder = 0;
window.checkboxOrder1 = 0;
//奖品编辑手风琴
function jaccordion(parent,width){
	var accordion = {
		p_group:$('<div class="panel-group" id="accordion" style="margin:0 auto;text-align: center;"></div>'),
		//p_add:$('<a id="addPrize" class="btn btn-default" style="width: 500px;background-color: #f5f5f5;margin-top:10px;font-weight:700">&#43;&nbsp;添加分配人员</a>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;添加分配人员&nbsp;</span>'),
		p_data:new Array,
		//初始化
		init:function(){
			//在这里的this就是代表 上面定义的 accordion
			var this_accordion = this;
			var this_group=this.p_group;
			this.p_group.appendTo(parent);
			this.p_group.accordion({
				width : width,
				onAdd : function(title,index){
					this_accordion.p_index = index;
				}
			});
			
			this.p_add.appendTo(parent);
			this.p_add.linkbutton({
				width	: width - 2,
			    iconCls	: 'icon-add',
			    onClick	: function(){
			    	this_accordion.p_data.push(addPanel(this_group,"",this_accordion));
			    }
			});
			
			$("body").append("<style>.panel-group .accordion-collapse{display:none;}</style>");
		},
		//取值
		getValue:function(){
			var data = {
				insertd:new Array(),//水桶
				updated:new Array(),//奶茶桶
				deleted:new Array()//咖啡桶
			};
			//var array = new Array();
			for (var i = 0; i < this.p_data.length; i++) {
				var panel = this.p_data[i];//取对象 取一个奖项的（拿杯子）
				var value = panel.getValue();//取值 取一个奖项中所有的属性(宁盖)
				//array.push(value);//存值（喝水）
				if(panel.isinsert){
					data.insertd.push(value);
				}else if(panel.isupdate){
					data.updated.push(value);
				}else if(panel.isdelete){
					if(value.fid==""||value.fid==null){
						continue;
					}else{
						data.deleted.push(value);
					}
				}
			}
			return data;
		},
		//设置值
		setValue:function(g_data){
			if(g_data==undefined||g_data==""||g_data.length==0){
				
			}else{
				for(var i = 0; i < g_data.length; i++){
					var panel = g_data[i];
					this.p_data.push(addPanel(this.p_group,panel,this));
				}
				this.p_group.accordion("resize");
			}
		},
		isEmpty:function(){ // 返回true时，至少有一个奖项卡的必填项未填
			
		}
	};
	accordion.init();
	return accordion;
}

/**创建一个手风琴项  **/
function addPanel(parent,value,acc){
	if($("#nameOrTelNo").attr("storeid")==undefined ){//|| $("#nameOrTelNo").attr("storeid")=="0"
		$.messager.alert("提示","未找到有效的可分配专属顾问，请核实！","error");
		return false;
	}
	var r = new Date().getTime();
	var panel = {
		isinsert:false,//是否添加(水)
		isupdate:false,//是否修改（奶茶）
		isdelete:false,//是否删除（咖啡）
		p_big:$('<div style="padding:10px 0;"></div>'),
		p_fid:$('<input type="hidden" />'),
		
		//取值
		getValue:function(){
			var v={};
			v.fid=this.p_fid.val();
			v.fcount =this.fcount.getValue();
			return v;
		},
		//设置值s
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.fcount.setValue(value["fcount"]);
		},
		isEmpty:function(){
			var v={};
			return true;
		},
		//删除panel
		deletePanel:function(){
			panel.isinsert = false;
			panel.isupdate = false;
			panel.isdelete = true;
			panel.p_big.remove();//删除
			var index = $(".indexs");
			for(var i=0;i<index.length;i++){
				$(index[i]).val(i+1);
			}
			count = index.length;
		},
		//初始化
		init:function(){
			this.isdelete = false;
			this.isupdate = false;
			this.isinsert = true;
			
			//创建输入项
			//this.p_fid.appendTo(this.p_form);
			this.FName=createstock("分配姓名：","","<font color='red' style='position: absolute;left: 100%;display: inline-block;width: 80%; text-align:left;'></font>");
			this.fcount=createItems("分配人数：","",false,"<font color='red' style='position: absolute;left: 100%;display: inline-block;width: 80%; text-align:left;'></font>");
			
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.fcount.p_fgroup);
			
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: '分配人员',
				content	: this.p_big,
				selected: false,
				closable: true,
				onClose	: this.deletePanel,
			});
			
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
			
			var storeid = $("#nameOrTelNo").attr("storeid");
			var unitUserId=$("#nameOrTelNo").attr("setid");
			
			this.FName.p_input.combobox({
				width : 256,
				url : "adviserApp/getUnitUserByStroreID.do?storeid="+(storeid==undefined?0:storeid)+"&unitUserId="+unitUserId,//
			});
			
			//重新设置高度
			parent.accordion("resize");
		}
	};
	panel.init();
	if(value!=""){
		panel.setValue(value);
		panel.FPrizeType.p_input.change();
	}
	return panel;
}


// 判断奖品价值为合法的正数
function isDouble(obj){
	if (!(/^\d{1,9}(\.\d{1,2})?$/.test(obj.value))) {
		obj.value="";
		$.messager.alert("提示","请输入有效的正数。整数部分不超过9位，小数部分不超过2位。");
	}
}

function createItems(title,value,whether,explain){
	var probabilityBase = $("#FPrizeProbabilityBase").val();
	var item = {
		p_fgroup:$('<div class="form-group" style="margin-left: 25px;margin-top: 5px;"></div>'),
		p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input onkeyup="checkOnkeyup(this)" onafterpaste="checkOnafterpaste(this)" type="text" class="validatebox-text" style="width: 250px;" placeholder="请输入正整数"/>'+explain),
//		p_inputs:$('<input type="text" class="col-sm-9 form-control babilitybase" style="width: 250px;" placeholder="奖项概率基数为'+probabilityBase+'"/>'+explain),
		init:function(){
			if(whether){
				this.p_fgroup.append(this.p_label.text(title));
				this.p_fgroup.append(this.p_inputs);
				if(value){
					this.p_input.val(value);
				}
			}else{
				this.p_fgroup.append(this.p_label.text(title));
				this.p_fgroup.append(this.p_input);
				if(value){
					this.p_input.val(value);
				}
			}
		},
		getValue:function(){
			if(whether){
				return this.p_inputs.val();
			}else{
				return this.p_input.val();
			}
		},
		setValue:function(value){
			if(whether){
				return this.p_inputs.val(value);
			}else{
				return this.p_input.val(value);
			}
		}
	};
	item.init();
	return item;
}

//创建一个输入框限制字符
function createstock(title,value,explain){
	var item = {
		p_fgroup:$('<div class="form-group" style="margin-left: 25px;position: relative;"></div>'),
		p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input type="text" class="validatebox-text distributionName" style="width: 250px;" maxlength="5" placeholder="最多输入5个字符"/>'),
		init:function(){
			this.p_fgroup.append(this.p_label.text(title));
			this.p_fgroup.append(this.p_input);
			if(value){
				this.p_input.val(value);
			}
			this.p_input.attr("id","distributionName"+$(".distributionName").length)
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.val(value);
		}
	};
	item.init();
	return item;
}

//删除奖品图片	
function deleteImg(item,btns){
	item = $(item).parent();
	item.empty(); //删除图片
	btns.show();
}

function checkOnkeyup(keyup){
	if(keyup.value.length==1){
		keyup.value=keyup.value.replace(/[^0-9]/g,'');
	}else{
		if(keyup.value.indexOf("0")==0){
			keyup.value=keyup.value.replace("0",'');
		}
		keyup.value=keyup.value.replace(/\D/g,'');
	}
}
function checkOnafterpaste(afterpaste){
	if(afterpaste.value.length==1){
		afterpaste.value=afterpaste.value.replace(/[^0-9]/g,'0')
	}else{
		if(keyup.value.indexOf("0")==0){
			afterpaste.value=afterpaste.value.replace("0",'');
		}
		afterpaste.value=afterpaste.value.replace(/\D/g,'')
	}
}


function change(){
	var probabilityBase = $("#FPrizeProbabilityBase").val();
	$(".babilitybase").attr('placeholder','奖项概率基数为'+probabilityBase);
}

//键盘输入事件---正整数
function CheckInputIntInt(oInput) { 
	if (oInput.value.length == 1) {
		oInput.value = oInput.value.replace(/[^0-9]/g, '');
	} else {
		if(oInput.value.indexOf("0")==0){
			oInput.value = oInput.value.substring(1,oInput.value.length);  //清除“数字”以外的字符
		}else{
			oInput.value = oInput.value.replace(/[^\d]/g,"");  //清除“数字”以外的字符
		}
	}
}
//根据姓名或者手机号查询专属顾问
function getAdviserAllotSetByNameOrTel(){
	var paramString = $("#nameOrTelNo").val();
	if(paramString == ""){
		$.messager.alert("提示","请输入姓名/手机号","error");
		return;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	var fsourceids = $("#fsourceids").val();
	$.ajax({
		type:'POST',
		url:"adviserApp/getAdviserAllotSetByNameOrTel.do",
		data:{"paramString" : paramString,"fsourceids":fsourceids},
		dataType : "json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			$.messager.progress("close");
			if(data.result){
				$("#allotCount").textbox("setValue",data.fallotcount==undefined?'':data.fcount);
				$("#nameOrTelNo").attr("storeid",data.fstoreid>0?data.fstoreid:0);
				$("#nameOrTelNo").attr("setid",data.fid);
			}else{
				if(data.fid>0){
					$.messager.alert("提示","没有可分配的客户，请核实！","error");
					$("#allotCount").textbox("clear");
				}else{
					$.messager.alert("提示","未找到有效的专属客服，请核实！","error");
					$("#allotCount").textbox("clear");
				}
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress("close");
			$.messager.alert("提示","查询异常！【"+textStatus+"】","error");
		}
	});
}

//更新专属顾问手动分配
function updateAdviserAllotSet(){
	if($("#nameOrTelNo").val()==""){
		$.messager.alert("提示","请先输入被分配的会员姓名/手机号！","error");
		return false;
	}
	
	var nameOrTelNo = $("#nameOrTelNo").val();
	var setid = $("#nameOrTelNo").attr("setid");
	var reasonid = $("#distributionDesc").jeasycombo("getvalue");
	var fsourceids=$("#fsourceids").val();
	if(reasonid.ids==""){
		$.messager.alert("提示","请选择分配原因！","error");
		return false;
	}
	var allotCount =$("#allotCount").val();
//	var data_adviser = accordion.getValue();
	var data_adviser = new Array();
	$(".distributionName").each(function(n,value){
		var data = {};
		data["fid"] = $(this).val();
		data["fcount"] = $(this).parent().next().find("input").val();
		data_adviser.push(data);
	});
	var dat={
		nameOrTelNo:nameOrTelNo,
		reasonid:reasonid,
		fid:setid,
		accordion:data_adviser,
		allotCount:allotCount,
		fsourceids:fsourceids
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	//新增
	$.ajax({
		type:'POST',
		url:"adviserApp/addOrUpdateAdviserAS.do",
		data:{"jsonobj" : JSON.stringify(dat)},
		dataType : "json",
		success:function(data){
			$.messager.progress("close");
//			$.messager.alert("提示",data.msg,data.result==true?"info":"error");
			if(data.result){
				$.messager.alert("提示",data.msg);
				$("#nameOrTelNo").textbox("clear");
				$("#allotCount").textbox("clear");
				$("#distributionDesc").jeasycombo("setvalue","");
				location.reload();
			}else{
				$.messager.alert("提示",data.msg,"error");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.progress("close");
			$.messager.alert("提示","分配异常！【"+textStatus+"】","error");
		}
	});
}