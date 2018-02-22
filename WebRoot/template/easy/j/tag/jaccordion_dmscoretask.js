//奖品编辑手风琴
function jaccordion(parent,width){
	if(width==undefined){
		width = 400;//默认宽度
	}
	var accordion = {
		p_group:$('<div class="panel-group" style="margin:0 auto;" id="accordion"></div>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;增加DM单积分任务&nbsp;</span>'),
		p_data:new Array,
		p_index:0,
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
				this.p_add.remove();//删除
			}
		},
		isEmpty:function(){ // 返回true时，至少有一个奖项卡的必填项未填
			// test
			var data = this.getValue();
			if(data.insertd.length==0&&data.updated.length==0){
				$.messager.alert("提示","标签项不能为空！");
				return true;
			}else if(data.FMaxScore!=""&&data.FForwardScore!=""){
				if(data.FForwardRule==1){
					if(data.FMaxScore==0 && data.FForwardScore!=0){
						$.messager.alert("提示","最高奖励积分不能为0！");
						return true;
					}
					if(data.FForwardScore!=0){
						var num=(data.FMaxScore)%(data.FForwardScore);
						if(num!=0){
							$.messager.alert("提示","最高奖励积分必须是转发阅读佣金的倍数！");
							return true;
						}
					}
				}
			}	
			for(var i=0;i<data.insertd.length;i++) {
				var prize = data.insertd[i];
				if(prize.FDMInfoID == ""){
					$.messager.alert("提示","DM单未选择！");
					return true;
				}else if(prize.FReadScore == "" && prize.FForwardRead == "" && prize.FForwardScore == ""){
					$.messager.alert("提示","表单信息不完整！");
					return true;
				}else if(prize.FReadScore == "" && (prize.FForwardRead == "" || prize.FForwardScore == "")){
					if(prize.FForwardRead != "" && prize.FForwardScore == ""){
						$.messager.alert("提示","转发阅读积分未填写！");
						return true;
					}
					if(prize.FForwardRead == "" && prize.FForwardScore != ""){
						$.messager.alert("提示","转发阅读量未填写！");
						return true;
					}
				}else if(prize.FMaxScore!=""&&prize.FForwardScore!=""){
					var num=(prize.FMaxScore)%(prize.FForwardScore);
					if(prize.FForwardScore!=0){
						if(num!=0){
							$.messager.alert("提示","最高奖励积分必须是转发阅读积分的倍数！");
							return true;
						}
					}
				}
			}
			return false;
		}
	};
	accordion.init();
	return accordion;
}

//创建一个手风琴项
function addPanel(parent,value,acc){
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
			v.FDMInfoID=this.FDMInfoID.getValue();
			v.FReadScore =this.FReadScore.getValue();
			v.FForwardRule =this.FForwardRule.getValue();//勾选
			v.FForwardRead =this.FForwardRead.getValue();
			v.FForwardScore =this.FForwardScore.getValue();
			v.FExcType =this.FExcType.getValue();//是否排除
			v.FMaxScore=this.FMaxScore.getValue();//最高奖励积分
			v.FCalcType=this.FCalcType.getValue();
			v.FReadExcType=this.FReadExcType.getValue();
			return v;
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.FDMInfoID.setValue(value["fdminfoid"]);
			this.FReadScore.setValue(value["freadscore"]);
			this.FForwardRule.setValue(value["fforwardrule"]);
			this.FForwardRead.setValue(value["fforwardread"]);
			this.FForwardScore.setValue(value["fforwardscore"]);
			this.FExcType.setValue(value["fexctype"]);
			this.FMaxScore.setValue(value["fmaxscore"]);
			this.FCalcType.setValue(value["fcalctype"]);
			this.FReadExcType.setValue(value["freadexctype"]);
			if(value["fforwardrule"]==1){
				this.FMaxScore.p_inputs.numberbox('enable');
			}else{
				this.FMaxScore.p_inputs.numberbox('disable');
			}
		},
		isEmpty:function(){
			return true;
		},
		//删除panel
		deletePanel:function(){
			panel.isinsert = false;
			panel.isupdate = false;
			panel.isdelete = true;
			//panel.p_big.remove();//删除
		},
		init:function(){
			this.isdelete = false;
			this.isupdate = false;
			this.isinsert = true;
			
			//创建输入项
			this.FDMInfoID=createDMCombo("DM单:","","");
			this.FReadScore=createInput("阅读积分:","",true);
			this.FForwardRule=createCheckBox("按倍数增加阅读积分","","");
			this.FForwardRead=createInput("转发阅读量:","",true);
			this.FForwardScore=createInput("转发阅读积分:","",true);
			this.FMaxScore=createInput("最高奖励积分:","",false);
			this.FExcType=createTwoCheckBox("员工转发不计算积分","经纪人转发不计算积分","","");
			this.FCalcType=createTwoRadio("普通阅读","有效阅读",0,"");
			this.FReadExcType=createTwoCheckBox("排除员工阅读","排除经纪人阅读","","");
			
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FDMInfoID.p_fgroup);
			this.p_big.append(this.FReadScore.p_fgroup);
			this.p_big.append(this.FForwardRule.p_fgroup);
			this.p_big.append(this.FForwardRead.p_fgroup);
			this.p_big.append(this.FForwardScore.p_fgroup);
			this.p_big.append(this.FMaxScore.p_fgroup);
			this.p_big.append(this.FExcType.p_fgroup);
			this.p_big.append(this.FCalcType.p_fgroup);
			this.p_big.append(this.FReadExcType.p_fgroup);
			
			var closable = true;
			var selected = false;
			if(value["fid"]>0){
				closable = false;
				selected = true;
			}
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: '积分任务编辑',
				content	: this.p_big,
				selected: selected,
				closable: closable,
				onClose	: this.deletePanel,
			});
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
			if(value["fid"]==undefined){
				$(".input").numberbox('disable');
			}
			//重新设置高度
			parent.accordion("resize");
		}
	};
	
	panel.init();
	if(value!=""){
		panel.setValue(value);
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

//创建一个输入框
function createInput(title,value,whether){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input type="text" style="width: 300px;" />'),
		p_inputs:$('<input class="input" type="text" style="width: 300px;" />'),
		init:function(){
			if(whether){
				this.p_fgroup.append(this.p_input);
				this.p_input.numberbox({
					label : title,
					labelWidth	: 100,
					width : 350
					
				});
				this.p_input.numberbox('textbox').attr('maxlength', 5);
				if(value){
					this.p_input.numberbox("setValue",value);
				}
			}else{
				this.p_fgroup.append(this.p_inputs);
				this.p_inputs.numberbox({
					label : title,
					labelWidth	: 100,
					width : 350
				});
				this.p_inputs.numberbox('textbox').attr('maxlength', 5);
				if(value){
					this.p_inputs.numberbox("setValue",value);
				}
			}
		},
		getValue:function(){
			if(whether){
				return this.p_input.val();
			}else{
				return this.p_inputs.val();
			}
		},
		setValue:function(value){
			if(whether){
				return this.p_input.numberbox("setValue",value);
			}else{
				return this.p_inputs.numberbox("setValue",value);
			}
		}
	};
	item.init();
	return item;
}

//创建一个dm单选择输入框。
function createDMCombo(title,value,explain){
	var item = {
		p_fgroup:$('<div></div>'),
		p_label:$('<label></label>'),
		p_input:$('<input type="text" style="width: 300px;"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			this.p_input.jeasycombo({
				label : title,
				labelWidth	: 100,
				width : 350,
				linenum:2,
				type : "list",//弹出的样式
				url:"select/allPublishedDM.do",
			});
			if(value){
				this.p_input.numberbox("setValue",value);
			}
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
//创建一个复选框带标题
function createCheckBox(title,value,explain){
	var onclickStr="";
	if(title=="按倍数增加阅读积分"){
		onclickStr = " onchange='multipleAdd(this)' ";
	}
	var item = {
			p_fgroup:$('<div class="checkbox-parent" style="text-align: center;"></div>'),
			p_label:$('<label></label>'),
			p_input:$('<input type="checkbox" '+onclickStr+' style="margin-right:5px"/>'+explain),
			init:function(){
				this.p_fgroup.append(this.p_input);
				this.p_fgroup.append(this.p_label.text(title));
				if(value){
					this.p_input.val(value);
				}
			},
			getValue:function(){
				var status = this.p_input.is(":checked") ? 1 : 0;
				return status;
			},
			setValue:function(value){
				if(value==1){
					this.p_input.attr("checked", "checked");
				}
				return this.p_input.val(value);
				
			}
	};
	item.init();
	return item;
}

//创建俩个个复选框带标题
function createTwoCheckBox(title1,title2,value,explain){
	var item = {
			p_fgroup:$('<div style="text-align: center;"></div>'),
			p_span1:$('<span class="checkbox-parent"></span>'),
			p_span2:$('<span class="checkbox-parent"></span>'),
			p_label1:$('<label style=""></label>'),
			p_label2:$('<label style=""></label>'),
			p_input1:$('<input type="checkbox" style="margin-right:5px"/>'+explain),
			p_input2:$('<input type="checkbox" style="margin-right:5px"/>'+explain),
			init:function(){
				this.p_span1.append(this.p_input1);
				this.p_span1.append(this.p_label1.text(title1));
				this.p_fgroup.append(this.p_span1);
				
				this.p_span2.append(this.p_input2);
				this.p_span2.append(this.p_label2.text(title2));
				this.p_fgroup.append(this.p_span2);
				if(value){
					//员工=1,经纪人=2,员工、经纪人=3
					if(value==1){
						this.p_input1.val(value);
					}else if(value==2){
						this.p_input2.val(value);
					}else if(value==3){
						this.p_input1.val(1);
						this.p_input2.val(2);
					}
				}
			},
			getValue:function(){
				console.log("排除勾选框1："+this.p_input1.val());
				console.log("排除勾选框2："+this.p_input2.val());
				var value1 =this.p_input1.is(":checked") ? 1 : 0;
				var value2 =this.p_input2.is(":checked") ? 2 : 0;
				var status = 0;
				if(value1==1 && value2==2){
					status =3;
				}else if(value2==2){
					status=2;
				}else if(value1==1){
					status=1;
				}
				return status;
			},
			setValue:function(value){
				if(value==1){
					this.p_input1.val(value);
					this.p_input1.attr("checked", "checked");
				}else if(value==2){
					this.p_input2.val(value);
					this.p_input2.attr("checked", "checked");
				}else if(value==3){
					this.p_input1.val(1);
					this.p_input2.val(2);
					this.p_input1.attr("checked", "checked");
					this.p_input2.attr("checked", "checked");
				}
				return value;
			}
	};
	item.init();
	return item;
}
//创建俩个单选按钮带标题
function createTwoRadio(title1,title2,value,explain){
	var item = {
			p_fgroup:$('<div style="display: block;margin-top: 5px;margin-bottom: 5px;"><label style="margin-left:45px;padding-top:0px;">计算类型:</label></div>'),
			p_span1:$('<span class="checkbox-parent"></span>'),
			p_span2:$('<span class="checkbox-parent"></span>'),
			p_label1:$('<label style=""></label>'),
			p_label2:$('<label style=""></label>'),
			p_label:$('<label style=""></label>'),
			p_input1:$('<input type="radio" checked="checked" name="FCalcType" style="margin-right:5px"/>'+explain),
			p_input2:$('<input type="radio" name="FCalcType" style="margin-right:5px"/>'+explain),
			init:function(){
				this.p_span1.append(this.p_input1);
				this.p_span1.append(this.p_label1.text(title1));
				this.p_fgroup.append(this.p_span1);
				
				this.p_span2.append(this.p_input2);
				this.p_span2.append(this.p_label2.text(title2));
				this.p_fgroup.append(this.p_span2);
				if(value){
					//员工=1,经纪人=2,员工、经纪人=3
					if(value==0){
						this.p_input1.val(value);
					}else if(value==1){
						this.p_input2.val(value);
					}
				}
			},
			getValue:function(){
				console.log("单选按钮1："+this.p_input1.val());
				console.log("单选按钮2："+this.p_input2.val());
				var value1 =this.p_input1.is(":checked") ? 0 : 1;
				var value2 =this.p_input2.is(":checked") ? 1 : 0;
				var status = value2;
				console.log("单选按钮1的值："+this.p_input1.is(":checked"));
				console.log("单选按钮2的值："+this.p_input2.is(":checked"));
				console.log("单选按钮的值："+status);
				return status;
			},
			setValue:function(value){
				if(value==0){
					this.p_input1.attr("checked", "checked");
					this.p_input1.val(value);
				}else if(value==1){
					this.p_input2.attr("checked", "checked");
					this.p_input2.val(value);
				}
				return value;
			}
	};
	item.init();
	return item;
}
