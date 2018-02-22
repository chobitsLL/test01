//奖品编辑手风琴
function jaccordion(parent,width){
	if(width==undefined){
		width = 400;//默认宽度
	}
	//border-width:0px;
	var accordion = {
		p_group:$('<div class="panel-group" style="margin:0 auto;" id="accordion"></div>'),
		//p_add:$('<span id="addPrize" style="background-color: #f5f5f5;margin-top:10px;padding-top: 8px;font-size:14px;color:#333; padding-bottom: 8px;font-weight:700" class="btn  btn-default btn-block">+ 增加奖项&nbsp;</span>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;增加奖项&nbsp;</span>'),
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
			}
		},
		isEmpty:function(){ // 返回true时，至少有一个奖项卡的必填项未填
			// test
			var data = this.getValue();
			
			if(data.insertd.length==0&&data.updated.length==0){
				$.messager.alert("提示","奖项不能为空！");
				return true;
			}
			
			for(var i=0;i<data.insertd.length;i++) {
				var prize = data.insertd[i];
				if(!prize.fname){
					$.messager.alert("提示","奖项名称不能为空！");
					return true;
				}
				if(!prize.fdescription){
					$.messager.alert("提示",prize.fname+"的奖品描述不能为空！");
					return true;
				}
				if(!prize.fmoney){
					$.messager.alert("提示",prize.fname+"的奖品成本不能为空！");
					return true;
				}
				if(!prize.fmoney){
					$.messager.alert("提示",prize.fname+"的奖金不能小于0！");
					return true;
				}
				if(!prize.fmaximum){
					$.messager.alert("提示",prize.fname+"的奖品总数不能为空！");
					return true;
				}
				if(prize.fprizetype==2){
					if(!prize.fcardid){
						$.messager.alert("提示",prize.fname+"卡券不能为空！");
						return true;
					}
				}
			}
			for(var i=0;i<data.updated.length;i++) {
				var prize = data.updated[i];
				if(!prize.fname){
					$.messager.alert("提示","奖项名称不能为空！");
					return true;
				}
				if(!prize.fdescription){
					$.messager.alert("提示",prize.fname+"的奖品描述不能为空！");
					return true;
				}
				if(!prize.fmoney){
					$.messager.alert("提示",prize.fname+"的奖品成本不能为空！");
					return true;
				}
				if(!prize.fmoney){
					$.messager.alert("提示",prize.fname+"的奖金不能小于0！");
					return true;
				}
				if(!prize.fmaximum){
					$.messager.alert("提示",prize.fname+"的奖品总数不能为空！");
					return true;
				}
				if(prize.fprizetype==2){
					if(!prize.fcardid){
						$.messager.alert("提示",prize.fname+"卡券不能为空！");
						return true;
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
	//var r = new Date().getTime();
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
			v.fdescription =this.FDescription.getValue();
			v.fmoney =this.FMoney.getValue();
			v.fmaximum =this.FMaximum.getValue();
			v.fprizetype =this.FPrizeType.getValue();
			v.fcardid =this.FCardID.getValue();
			return v;
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.FName.setValue(value["fname"]);
			this.FDescription.setValue(value["fdescription"]);
			this.FMoney.setValue(value["fmoney"]);
			this.FMaximum.setValue(value["fmaximum"]);
			this.FPrizeType.setValue(value["fprizetype"]);
			this.FCardID.setValue(value["fcardid"]);
			//this.p_h4a.text(value["fname"]);
			this.p_panel.panel("setTitle",value["fname"]);
		},
		isEmpty:function(){
			var v={};
			v.fname=this.FName.getValue();
			if(v.fname==""){
				$.messager.alert("提示","奖项名称不能为空！");
				return false;
			}
			v.fmoney =this.FMoney.getValue();
			if(v.fmoney==""){
				$.messager.alert("提示","奖品成本不能为空！");
				return false;
			}
			if(v.fmoney==0){
				$.messager.alert("提示","奖品成本不能小于0！");
				return false;
			}
			v.fmaximum =this.FMaximum.getValue();
			if(v.fmaximum==""){
				$.messager.alert("提示","奖品数量不能为空！");
				return false;
			}
			v.fprizetype =this.FPrizeType.getValue();
			v.fcardid =this.FCardID.getValue();
			if(v.fprizetype==2){
				if(v.fcardid==""){
					$.messager.alert("提示","卡券不能为空！");
					return false;
				}
			}
			if(fname&&fmoney&&fmaximum){
				return true;
			}
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
			this.FName=createItem("奖项名称","新的奖项",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*设置的奖项名称。例如：特等奖、一等奖等。</font>");
			this.FDescription=createItem("奖品描述","",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*奖品名称。例如：电视机、购物券、现金50元等。</font>");
			this.FMoney=createItem("奖品成本","",true,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*奖品的实际成本,如选择的是【积分】则为实际积分值。</font>");
			this.FMaximum=createItem("奖品总数","",true,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*该奖项商品的数量。</font>");
			this.FPrizeType=createSelect("奖项类型","",this,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*选择奖项的类型。</font>");
			this.FCardID=createItemCard("卡券","","<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*只能选择卡券发放方式为”营销活动奖品“并且处于有效期的卡券。</font>");
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.FDescription.p_fgroup);
			this.p_big.append(this.FMoney.p_fgroup);
			this.p_big.append(this.FMaximum.p_fgroup);
			this.p_big.append(this.FPrizeType.p_fgroup);
			this.p_big.append(this.FCardID.p_fgroup);
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: '新的奖项',
				content	: this.p_big,
				selected: false,
				closable: true,
				onClose	: this.deletePanel,
			});
			
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
			
			var input_FName = this.FName.p_input;
			input_FName.textbox({
				onChange : function(newValue, oldValue){
					this_panel.panel("setTitle",newValue);
				}
			});
			var FPrizeType=this.FPrizeType.p_input.val();
			console.log("当前选中的值："+FPrizeType);
			if(FPrizeType==2){
				this.FCardID.p_fgroup.show();
				showCard();
			}else{
				this.FCardID.p_fgroup.hide();
			}
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

//创建一个输入框和标题
function createItem(title,value,whether,explain){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		//p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input type="text" class="col-sm-9 form-control" style="width: 300px;" />'),
		p_inputs:$('<input type="text" class="col-sm-9 form-control" style="width: 300px;"  onblur="isDouble(this);" />'),
		init:function(){
			if(whether){
				//this.p_fgroup.append(this.p_label.text(title));
				this.p_fgroup.append(this.p_inputs);
				this.p_inputs.numberbox({
					label : title,
					labelWidth	: 100,
					width : 350
				});
				if(value){
					//this.p_input.val(value);
					this.p_inputs.numberbox("setValue",value);
				}
			}else{
				//this.p_fgroup.append(this.p_label.text(title));
				this.p_fgroup.append(this.p_input);
				this.p_input.textbox({
					label : title,
					labelWidth	: 100,
					width : 350
				});
				if(value){
					//this.p_input.val(value);
					this.p_input.textbox("setValue",value);
				}
			}
		},
		getValue:function(){
			if(whether){
				return this.p_inputs.numberbox("getValue");
			}else{
				return this.p_input.textbox("getValue");
			}
		},
		setValue:function(value){
			if(whether){
				return this.p_inputs.numberbox("setValue",value);
			}else{
				return this.p_input.textbox("setValue",value);
			}
		}
	};
	item.init();
	return item;
}
//创建时间组件
function cteatDate(title,value){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_inputgroup:$('<div class="input-group date form_date" data-link-field="dtp_input2" style="width: 100px;"></div>'),
		p_input:$('<input  class="col-sm-9 form-control input-sm" size="10" type="text"  readonly  style="width: 221px;" />'),
		p_remove:$('<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>'),
		p_calendar:$('<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>'),
		init:function(){
			this.p_fgroup.append(this.p_label.text(title));
			//this.p_fgroup.append(this.p_input);
			this.p_fgroup.append(this.p_inputgroup);
			this.p_inputgroup.append(this.p_input);
			this.p_inputgroup.append(this.p_remove);
			this.p_inputgroup.append(this.p_calendar);
			if(value){
				this.p_input.val(value);
			}
			this.p_inputgroup.datetimepicker({
				language:  'zh-CN',
			    weekStart: 1,
			    todayBtn:  1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				minView: 2,
				forceParse: 0,
				format:'yyyy-mm-dd'
			});
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			if(value.length>15){
				value=value.substr(0,11);
			}
			return this.p_input.val(value);
		}
		
	};
	item.init();
	return item;
}
//创建一个下拉选择
function createSelect(title,value,parent){
//	var options = '<option value="0" selected="selected">普通奖项</option>';
//	if(){
//		options += '<option value="1">现金红包</option><option value="2">卡券</option><option value="3">积分</option>';
//	}
	var options = [{fid:0,fname:"普通奖项",selected:true}];
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		//p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input type="text" class="col-sm-9 form-control" style="width: 300px;" />'),
		//p_input:$('<select class="col-sm-9 form-control p_disable" style="width: 300px;">'+options+'</select>'),
		init:function(){
			//this.p_fgroup.append(this.p_label.text(title));
			this.p_fgroup.append(this.p_input);
			var this_item = this;
			this.p_input.combobox({
				label : title,
				labelWidth	: 100,
				width : 350,
				data : options,
				onChange : function(newValue,oldValue){
					this_item.change(newValue,oldValue);
				}
			});
			if(value){
				this.p_input.combobox("setValue",value);
			}
		},
		getValue:function(){
			return this.p_input.combobox("getValue");
		},
		setValue:function(value){
			//console.log("当前选中的值："+value);
			return this.p_input.combobox("setValue",value);
		},
		change:function(newValue,oldValue){
			//var setAnwser=this.p_input.val();
			//console.log("值改变事件:"+setAnwser);
			if(newValue==2){
				//parent.FCardID.p_fgroup.show();
				//showCard();
			}else{
				//parent.FCardID.p_fgroup.hide();
			}
		}
	};
	item.init();
	return item;
}
//创建一个卡券选择输入框。
function createItemCard(title,value,explain){
	var item = {
		p_fgroup:$('<div class="form-group" style="margin-left: 15px;"></div>'),
		p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input type="text" class="col-sm-9 form-control FCardID" style="width: 300px;"/>'+explain),
		init:function(){
			this.p_fgroup.append(this.p_label.text(title));
			this.p_fgroup.append(this.p_input);
			if(value){
				this.p_input.val(value);
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
function showCard(){
	//卡劵
	$(".FCardID").jbootcombo({
		multiple : false,//是否多选
		width: 300,
		type : "list",//弹出的样式
		url: "card/queryCardID.do",
		onChange:function(ids,texts){
		}
	  });
}
