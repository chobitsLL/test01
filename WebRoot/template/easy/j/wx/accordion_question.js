//奖品编辑手风琴
var countss=0;
function jaccordion_question(parent,width,isDisable){
	var time = new Date().getTime();
	if(width==undefined){
		width = 400;//默认宽度
	}
	var question = {
		acc_group:parent,//问题组对象
		r:time,//随机ID
		p_group:$('<div class="panel-group" id="question'+time+'" style="margin-top:15px;margin-left:49px;"></div>'),
		p_add:$('<span style="margin-top:5px;margin-left:50px;">&nbsp;增加问题&nbsp;</span>'),
		p_data:new Array,
		//初始化
		init:function(){
			//在这里的this就是代表 上面定义的 accordion
			var this_accordion = this;
			var this_group=this.p_group;
			this.p_group.appendTo(this.acc_group.p_big);
			this.p_group.accordion({
				width : 400,
				onAdd : function(title,index){
					this_accordion.p_index = index;
				}
			});
			this.p_add.appendTo(this.acc_group.p_big);
			this.p_add.linkbutton({
				width	: width - 2,
			    iconCls	: 'icon-add',
			    onClick	: function(){
			    	//活动发布后  还没开始的问题组可以编辑
			    	if(isDisable==0){
			    		this_accordion.p_data.push(addPanel_question(question,this_group,"",this_accordion,isDisable));
			    	}
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
			var this_accordion = this;
			if(g_data==undefined||g_data==""||g_data.length==0){
				
			}else{
				for(var i = 0; i < g_data.length; i++){
					var panel = g_data[i];
					this.p_data.push(addPanel_question(this,this.p_group,panel,this_accordion,isDisable));
				}
				this.p_group.accordion("resize");
				//活动发布后  还没开始的问题组可以编辑
				if(isDisable==1){
					releaseStates();
				}
			}
		},
		isEmpty:function(){ // 返回true时，至少有一个奖项卡的必填项未填
			// test
			var data = this.getValue();
			
			if(data.insertd.length==0&&data.updated.length==0){
				$.messager.alert("提示","问题组【"+acc_group.FName.getValue()+"】中还没有题目！");
				return true;
			}
			
			for(var i=0;i<data.insertd.length;i++) {
				var prize = data.insertd[i];
				if(!prize.fname){
					$.messager.alert("提示","问题不能为空！");
					return true;
				}
				if(!prize.ftype){
					$.messager.alert("提示",prize.fname+"的答案类型不能为空！");
					return true;
				}
				if(prize.fismult==2){
				if(!prize.fanwserlist){
					$.messager.alert("提示",prize.fname+"的答案选项不能为空！");
					return true;
				}
				}
			}
			for(var i=0;i<data.updated.length;i++) {
				var prize = data.updated[i];
				if(!prize.fname){
					$.messager.alert("提示","问题不能为空！");
					return true;
				}
				if(!prize.ftype){
					$.messager.alert("提示",prize.fname+"的答案类型不能为空！");
					return true;
				}
				if(prize.fismult==2){
					if(!prize.fanwserlist){
						$.messager.alert("提示",prize.fname+"的答案选项不能为空！");
						return true;
					}
				}
				if(this.acc_group.FType.getValue()==1){
					if(!prize.fneedquanty){
						$.messager.alert("提示",prize.fname+"的竞猜需要金币数不能为空！");
						return true;
					}
					if(!prize.fprizequanty){
						$.messager.alert("提示",prize.fname+"的回答正确奖励金币数不能为空！");
						return true;
					}
				}
			}
			return false;
		}
	};
	question.init();
	return question;
}

//创建一个手风琴项
function addPanel_question(question,parent,value,acc,isDisable){
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
			v.fname=this.FName.getValue();
			v.ftype =this.FType.getValue();
			v.fismult =this.FIsMult.getValue();
			v.fanwserlist =this.FAnwserList.getValue();
			v.fneedquanty =this.FNeedQuanty.getValue();
			v.fprizequanty =this.FPrizeQuanty.getValue();
			return v;
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.FName.setValue(value["fname"]);
			this.FType.setValue(value["ftype"]);
			this.FIsMult.setValue(value["fismult"]);
			this.FAnwserList.setValue(value["fanwserlist"]);
			this.FNeedQuanty.setValue(value["fneedquanty"]);
			this.FPrizeQuanty.setValue(value["fprizequanty"]);
		},
		isEmpty:function(){
			var v={};
			v.fname=this.FName.getValue();
			if(v.fname==""){
				$.messager.alert("提示","问题不能为空！");
				return false;
			}
			v.ftype =this.FType.getValue();
			if(v.ftype==""){
				$.messager.alert("提示","答案类型不能为空！");
				return false;
			}
			v.fanwserlist =this.FAnwserList.getValue();
			v.fismult =this.FIsMult.getValue();
			if(v.fismult==2){
				if(v.fanwserlist==""){
					$.messager.alert("提示","答案选项不能为空！");
					return false;
				}
			}
			if(acc_group.FType.getValue()==1){
				v.fneedquanty =this.FNeedQuanty.getValue();
				if(v.fneedquanty==""){
					$.messager.alert("提示","竞猜需要金币数不能为空！");
					return false;
			}
			v.fprizequanty =this.FNeedQuanty.getValue();
			if(v.fprizequanty==""){
				$.messager.alert("提示","回答正确奖励金币数不能为空不能为空！");
				return false;
			}
			}
			return true;
		},
		//删除panel
		deletePanel:function(){
			panel.isinsert = false;
			panel.isupdate = false;
			panel.isdelete = true;
			var number = 0;
			$(".indexss").each(function(){
				if($(this).parents().parents().parents().attr("style").indexOf("display: none")<0){
					var index = $(this).find('.textbox').find('.textbox-text');
					index.val(++number);
				}
			})
			countss = number;
		},
		init:function(){
			this.isdelete = false;
			this.isupdate = false;
			this.isinsert = true;
			//创建输入项
			this.FIndex=createUneditable_question("序号:",question);
			this.FName=createItem_question("问题:","问题",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*设置的奖项名称。例如：特等奖、一等奖等。</font>",false);
			this.FType=createSelec_question("答案类型:","",this);
			this.FIsMult=createCheck_question("答案多选:","",false);
			this.FAnwserList=addPanel_answer("答案选项:","",false);
			this.FNeedQuanty=createItem_question("竞猜需要金币数:","",true);
			this.FPrizeQuanty=createItem_question("回答正确奖励金币数:","",true);
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FIndex.p_fgroup);
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.FType.p_fgroup);
			this.p_big.append(this.FIsMult.p_fgroup);
			this.p_big.append(this.FAnwserList.p_fgroup);
			this.p_big.append(this.FNeedQuanty.p_fgroup);
			this.p_big.append(this.FPrizeQuanty.p_fgroup);
			var close = false;
			var deletePanel="";
			if(isDisable==0){
				close=true;
				deletePanel=this.deletePanel;
			}
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: '新增问题',
				content	: this.p_big,
				selected: false,
				closable:close,
				onClose	: deletePanel
			});
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
			
			var input_FName = this.FName.p_input;
			input_FName.textbox({
				onChange : function(newValue, oldValue){
					this_panel.panel("setTitle",newValue);
				}
			});
			//获取问题组的设置方式
			var setType = question.acc_group.FType.getValue();
			if(setType==0){
				this.FNeedQuanty.p_fgroup.hide();
				this.FPrizeQuanty.p_fgroup.hide();
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

//创建一个输入框和标题
function createItem_question(title,value,whether,explain,base){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input type="text" class="col-sm-9 form-control p_disable" style="width: 300px;" />'),
		p_inputs:$('<input type="text" class="col-sm-9 form-control p_disable" style="width: 300px;"  onblur="isDouble(this);" />'),
		init:function(){
			if(whether){
				if(base){
					this.p_fgroup.append(this.p_inputs);
					this.p_inputs.numberbox({
						label : title,
						labelWidth	: 120,
						width : 350
					});
					if(value){
						this.p_inputs.numberbox("setValue",value);
					}
				}else{
					this.p_fgroup.append(this.p_input);
					this.p_input.numberbox({
						label : title,
						labelWidth	: 120,
						width : 350
					});
					if(value){
						this.p_input.numberbox("setValue",value);
					}
				}
			}else{
				this.p_fgroup.append(this.p_input);
				this.p_input.textbox({
					label : title,
					labelWidth	: 120,
					width : 350
				});
				if(value){
					this.p_input.textbox("setValue",value);
				}
			}
		},
		getValue:function(){
			if(whether){
				if(base){
					return this.p_inputs.val();
				}else{
					return this.p_input.val();
				}
			}else{
				return this.p_input.val();
			}
		},
		setValue:function(value){
			if(whether){
				if(base){
					return this.p_inputs.numberbox("setValue",value);
				}else{
					return this.p_input.numberbox("setValue",value);
				}
			}else{
				return this.p_input.textbox("setValue",value);
			}
		}
	};
	item.init();
	return item;
}

//创建一个下拉选择
function createSelec_question(title,value,parent){
	var options = [{fid:0,fname:"输入数字",selected:true},{fid:1,fname:"输入文本"},{fid:2,fname:"选项答案"}];
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input type="text" class="col-sm-9 form-control p_disable" style="width: 300px;"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			var this_item = this;
			this.p_input.combobox({
				label : title,
				labelWidth	: 120,
				width : 350,
				data : options,
				editable:false,
				onChange : function(newValue,oldValue){
					//this_item.change(newValue,oldValue);
					if(newValue==0||newValue==1){
						parent.p_big.find(".add_btn").attr("disabled","disabled");
						parent.p_big.find(".del_btn").attr("disabled","disabled");
					}else{
						parent.p_big.find(".add_btn").removeAttr("disabled");
						parent.p_big.find(".del_btn").removeAttr("disabled");
					}
				}
			});
			if(value){
				this.p_input.combobox("setValue",value);
			}
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.combobox("setValue",value);
		}
	};
	item.init();
	return item;
}
//创建一个不可编辑输入框和标题
function createUneditable_question(title,parent){
	var item = {
		p_fgroup:$('<div class="indexss"></div>'),
		p_input:$('<input type="text" style="width: 250px;" disabled="true"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			this.p_input.textbox({
				label : title,
				labelWidth	: 120,
				width : 350
			});
			this.p_input.textbox('setValue',countss);
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.textbox("setValue",countss);
		}
	};
	countss++;
	item.init();
	return item;
}
//创建一个复选框type:0,显示type：1隐藏
function createCheck_question(title,value,explain){
	var item = {
		p_fgroup:$('<div class="form-group" style="margin-left: 65px;"></div>'),
		p_label:$('<label class="" style="text-align: right; width: 125px; height: 30px;line-height:30px;padding-right:5px;">'+title+'</label>'),
		p_input:$('<input class="easyui-switchbutton p_disables"/>'),
		init:function(){
			this.p_fgroup.append(this.p_label);
			this.p_fgroup.append(this.p_input);
			this.p_input.switchbutton({
				onText:'是',
				offText:'否',
	    		checked: false
	    	})
			if(value){
				if(value==1){
					return this.p_input.switchbutton("check");
				}else{
					return this.p_input.switchbutton("uncheck");
				}
			}
		},
		getValue:function(){
			var value = this.p_input.switchbutton("options").checked;
			if(value){
				value=1;
			}else{
				value=0;
			}
			return value;
		},
		setValue:function(value){
			if(value==1){
				return this.p_input.switchbutton("check");
			}else{
				return this.p_input.switchbutton("uncheck");
			}
		}
	};
	item.init();
	return item;
}
//创建一个可增加的框
function addPanel_answer(title,value){
	var item = {
			p_index:0,
			p_list:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
			p_fgroup:$('<div class="form-group" style="margin-left: 65px;"></div>'),
			p_label:$('<label class="col-sm-3 control-label"></label>'),
			p_btn:$('<input type="button" class="col-sm-4 form-control add_btn" disabled="disabled" style="width: 112px;margin-left: 5px;" value="增加" />'),
			p_del:$('<input type="button" class="col-sm-4 form-control del_btn" disabled="disabled" style="width: 112px;margin-left:5px;" value="移除" />'),
			p_input:$('<div class="a_input"></div>'),
			init:function(){
				this.p_fgroup.append(this.p_label.text(title));
				this.p_fgroup.append(this.p_btn);
				this.p_fgroup.append(this.p_del);
				this.p_fgroup.append(this.p_input);
				if(value){
					for (var i = 0; i < value.length; i++) {
						this.addItem(value[i].fname);
					}
				}
				var answer = this;
				this.p_btn.click(function(){
					if(answer.p_index>=24){
						return;
					}
					answer.addItem("");
				});
				this.p_del.click(function(){
					if(answer.p_index<=0){
						return;
					}
					answer.p_input.find(".a_item:last").remove();
					answer.p_index--;
				});
			},
			addItem:function(text){
				var m_panel = $("<div class='form-group a_item'></div>").appendTo(this.p_input);
				var index = this.p_list[this.p_index];
				var m_index = $("<div class='text-right' style='margin-top: 10px;text-align: right;width: 50px;display: inline-block;'></div>").appendTo(m_panel).text(index+":").attr("fid",index);
				var m_input = $("<input style='margin-top: 10px;width:230px;border:none;border-bottom:1px solid #333;margin-left:7px;'/>").appendTo(m_panel).val(text);
				this.p_index++;
			},
			getValue:function(){
				var answers=this.p_input.find(".a_item");
				var val="";
				answers.each(function(){
					var fid = $(this).find("div").attr("fid");
					var fname = $(this).find("input").val();
					val+=fid+"="+fname+",";
				});
				val=val.substring(0,val.length-1);
				return val;
			},
			setValue:function(value){
				var this_answer=this;
				var answers = value.split(",");
				$.each(answers,function(n,v){
					answer = v.split("=");
					if (answer.length==2) {
						var fid =answer[0];
						var fname = answer[1];
						this_answer.addItem(fname);
					}
				});
			}
		};
		item.init();
		return item;
}
//判断是否是已发布状态
function releaseStates(){
	$(".p_disable").textbox("disable");
	$('.p_disables').switchbutton('disable');


}
