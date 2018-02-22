//奖品编辑手风琴
var counts = 0;
function jaccordion_group(parent,width,isDisable){
	if(width==undefined){
		width = 400;//默认宽度
	}
	var accordion_group = {
		p_group:$('<div class="panel-group" id="problemGroup" style="margin: 0 auto !important;"></div>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;增加问题组&nbsp;</span>'),
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
			    	this_accordion.p_data.push(addPanel_group(this_group,"",this_accordion,0));
			    }
			});
			$("body").append("<style>.panel-group .accordion-collapse{display:none;}</style>");
		},
		checkDate:function(){
			var data = new Array();
			//var array = new Array();
			for (var i = 0; i < this.p_data.length; i++) {
				var panel = this.p_data[i];//取对象 取一个奖项的（拿杯子）
				var value = panel.getValue();//取值 取一个奖项中所有的属性(宁盖)
				data.push(value);
				
				var fbegintime = value.fbegintime.replace(new RegExp("-","gm"),"/");
				fbegintime = (new Date(fbegintime)).getTime(); //开始时间
				var fendtime = value.fendtime.replace(new RegExp("-","gm"),"/");
				fendtime = (new Date(fendtime)).getTime(); //结束时间
				
				for (var j = i+1; j < this.p_data.length; j++) {
					var panel1 = this.p_data[j];//取对象 取一个奖项的（拿杯子）
					var value1 = panel1.getValue();//取值 取一个奖项中所有的属性(宁盖)
					data.push(value1);
					var fbegintime1 = value1.fbegintime.replace(new RegExp("-","gm"),"/");
					fbegintime1 = (new Date(fbegintime1)).getTime(); //开始时间
					var fendtime1 = value1.fendtime.replace(new RegExp("-","gm"),"/");
					fendtime1 = (new Date(fendtime1)).getTime(); //结束时间
					if (fbegintime<fbegintime1 && fbegintime1<fendtime) {
						$.messager.alert("提示",value.fname+"的开始时间结束时间和"+value1.fname+"的开始时间结束时间有交叉请重新设置！");
						//时间有交叉
						return false;
					}
					
					if (fbegintime<fendtime1 && fendtime1<fendtime) {
						$.messager.alert("提示",value.fname+"的开始时间结束时间和"+value1.fname+"的开始时间结束时间有交叉请重新设置！");
						//时间有交叉
						return false;
					}
				}
			}
			
			return true;
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
					this.p_data.push(addPanel_group(this.p_group,panel,this,isDisable));
				}
				this.p_group.accordion("resize");
				//活动发布后  还没开始的问题组可以编辑
				if(isDisable==1){
					releaseState();
				}
			}
		},
		isEmpty:function(){ // 返回true时，至少有一个奖项卡的必填项未填
			// test
			var data = this.getValue();
			for(var i=0;i<this.p_data.length;i++) {
				var groupItem = this.p_data[i];
				if(groupItem.isdelete){
					continue;//已删除的不检查
				}
				var isempty = groupItem.isEmpty();
				if (!isempty) {
					return true;
				}
			}
			return false;
		}
	};
	accordion_group.init();
	return accordion_group;
}

//创建一个手风琴项
function addPanel_group(parent,value,acc,isDisable){
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
			v.forderid =this.FOrderID.getValue();
			//v.findex =this.FIndex.getValue();
			v.fname=this.FName.getValue();
			v.fbegintime =this.FBeginTime.getValue();
			v.fendtime =this.FEndTime.getValue();
			v.fpublishtime =this.FPublishTime.getValue();
			v.ftype =this.FType.getValue();
			v.fneedquanty =this.FNeedQuanty.getValue();
			v.fprizequanty =this.FPrizeQuanty.getValue();
			v.question = this.question.getValue();
			return v;
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.FOrderID.setValue(value["forderid"]);
			//this.FIndex.setValue(value["findex"]);
			this.FName.setValue(value["fname"]);
			this.FBeginTime.setValue(value["fbegintime"]);
			this.FEndTime.setValue(value["fendtime"]);
			this.FPublishTime.setValue(value["fpublishtime"]);
			this.FType.setValue(value["ftype"]);
			this.FNeedQuanty.setValue(value["fneedquanty"]);
			this.FPrizeQuanty.setValue(value["fprizequanty"]);
			this.p_panel.panel("setTitle",value["fname"]);
			this.question.setValue(value["questions"]);//问题列表赋值
		},
		isEmpty:function(){
			var v={};
			v.fname=this.FName.getValue();
			if(v.fname==""){
				$.messager.alert("提示","问题组名称不能为空！");
				return false;
			}
			if(v.fname.length>150){
				$.messager.alert("提示", "问题组名称长度不能超过150个字符！");
				return false;
			}
			v.fbegintime =this.FBeginTime.getValue();
			if(v.fbegintime==""){
				$.messager.alert("提示", "开始时间不能为空！");
				return false;
			}
			v.fendtime =this.FEndTime.getValue();
			if(v.fendtime==""){
				$.messager.alert("提示", "结束时间不能为空！");
				return false;
			}
			v.fpublishtime =this.FPublishTime.getValue();
			if(v.fpublishtime==""){
				$.messager.alert("提示", "答案公布时间不能为空！");
				return false;
			}
			var fbegintime = v.fbegintime.replace(new RegExp("-","gm"),"/");
			fbegintime = (new Date(fbegintime)).getTime(); //开始时间
			var fendtime = v.fendtime.replace(new RegExp("-","gm"),"/");
			fendtime = (new Date(fendtime)).getTime(); //结束时间
			var fpublishtime = v.fpublishtime.replace(new RegExp("-","gm"),"/");
			fpublishtime = (new Date(fpublishtime)).getTime(); //结束时间
			if (fbegintime>fendtime) {
				$.messager.alert("提示", "结束时间不能大于开始时间！");
				return false;
			}
			if (fendtime>fpublishtime) {
				$.messager.alert("提示", "答案公布时间不能早于结束时间！");
				return false;
			}
			v.ftype =this.FType.getValue();
			if(v.ftype==""){
				$.messager.alert("提示", "设置方式不能为空！");
				return false;
			}
			var isempty = this.question.isEmpty();
			if (isempty) {
				return false;
			}
			return true;
		},
		//删除panel
		deletePanel:function(){
			panel.isinsert = false;
			panel.isupdate = false;
			panel.isdelete = true;
			var number = 0;
			$(".indexs").each(function(){
				if($(this).parents().parents().parents().attr("style").indexOf("display: none")<0){
					var index = $(this).find('.textbox').find('.textbox-text');
					index.val(++number);
				}
			})
			counts = number;
		},
		init:function(){
			this.isdelete = false;
			this.isupdate = false;
			this.isinsert = true;
			
			//创建输入项
			//this.FIndex=createUneditable_group("序号:");
			this.FOrderID=createUneditable_group("序号");
			this.FName=createItem_group("问题组名称:","新增问题",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*设置的奖项名称。例如：特等奖、一等奖等。</font>",false);
			this.FBeginTime=cteatDate_group("开始时间:",false,isDisable);
			this.FEndTime=cteatDate_group("结束时间:",false,isDisable);
			this.FPublishTime=cteatDate_group("答案公布时间:",false,isDisable);
			this.FType=createSelec_group("设置方式","",this);
			this.FNeedQuanty=createItem_group("竞猜需要金币数","",true);
			this.FPrizeQuanty=createItem_group("回答正确奖励金币数","",true);
			
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			//this.p_big.append(this.FIndex.p_fgroup);
			this.p_big.append(this.FOrderID.p_fgroup);
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.FBeginTime.p_fgroup);
			this.p_big.append(this.FEndTime.p_fgroup);
			this.p_big.append(this.FPublishTime.p_fgroup);
			this.p_big.append(this.FType.p_fgroup);
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
				title	: '新增加问题组',
				content	: this.p_big,
				selected: false,
				closable: close,
				onClose	: deletePanel,
			});
			
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
			
			var input_FName = this.FName.p_input;
			input_FName.textbox({
				onChange : function(newValue, oldValue){
					this_panel.panel("setTitle",newValue);
				}
			});
			//重新设置高度
			parent.accordion("resize");
			//增加问题
			this.question=jaccordion_question(this,400,isDisable);
			this.FType.init();
		}
	};
	
	panel.init();
	if(value!=""){
		panel.setValue(value);
		panel.FType.p_input.change();
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
function createItem_group(title,value,whether,explain,base){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input class="p_disable" type="text" style="width: 300px;" />'),
		p_inputs:$('<input type="text" class="p_disable" style="width: 300px;"  onblur="isDouble(this);" />'),
		init:function(){
			if(whether){
				if(base){
					this.p_fgroup.append(this.p_inputs);
					this.p_inputs.numberbox({
						label : title,
						labelWidth	: 130,
						width : 460
					});
					if(value){
						this.p_inputs.numberbox("setValue",value);
					}
				}else{
					this.p_fgroup.append(this.p_input);
					this.p_input.numberbox({
						label : title,
						labelWidth	: 130,
						width : 460,
						required:true,
						missingMessage:'只能输入数字'
					});
					if(value){
						this.p_input.numberbox("setValue",value);
					}
				}
			}else{
				this.p_fgroup.append(this.p_input);
				this.p_input.textbox({
					label : title,
					labelWidth	: 130,
					width : 460
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
//创建时间组件
function cteatDate_group(title,value,isDisable){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_inputgroup:$('<div class="input-group date form_date p_disable" data-link-field="dtp_input2" style="width: 100px;"></div>'),
		p_input:$('<input  class="col-sm-9 form-control input-sm" size="10" type="text"  readonly  style="width: 221px;" />'),
		p_remove:$('<span class="input-group-addon"><span class="glyphicon glyphicon-remove"></span></span>'),
		p_calendar:$('<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>'),
		init:function(){
			this.p_fgroup.append(this.p_inputgroup);
			this.p_inputgroup.append(this.p_input);
			this.p_inputgroup.append(this.p_remove);
			this.p_inputgroup.append(this.p_calendar);
			if(value){
				this.p_input.val(value);
			}
			this.p_inputgroup.datetimebox({
				label:title,
				labelWidth	: 130,
				width : 460,
				editable:false
			});
		},
		getValue:function(){
			return this.p_inputgroup.val();
		},
		setValue:function(value){
			return this.p_inputgroup.datetimebox('setValue',value); 
		}
		
	};
	item.init();
	return item;
}
//创建一个下拉选择
function createSelec_group(title,value,parent){
	var options = [{fid:0,fname:"统一设置金币",selected:true},{fid:1,fname:"按问题明细设置"}];
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input type="text" class="col-sm-9 form-control p_disable" style="width: 300px;"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			var this_item = this;
			this.p_input.combobox({
				label : title,
				labelWidth	: 130,
				width : 460,
				data : options,
				editable:false,
				onChange : function(newValue,oldValue){
					this_item.change(newValue,oldValue);
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
		},
		change:function(newValue,oldValue){
			var setAnwser=this.p_input.val();
			if(setAnwser==0){
				parent.FNeedQuanty.p_fgroup.show();
				parent.FPrizeQuanty.p_fgroup.show();
				for (var i = 0; i < parent.question.p_data.length; i++) {
					var panel = parent.question.p_data[i];
					panel.FNeedQuanty.p_fgroup.hide();
					panel.FPrizeQuanty.p_fgroup.hide();
				}
			}else{
				parent.FNeedQuanty.p_fgroup.hide();
				parent.FPrizeQuanty.p_fgroup.hide();
				for (var i = 0; i < parent.question.p_data.length; i++) {
					var panel = parent.question.p_data[i];
					panel.FNeedQuanty.p_fgroup.show();
					panel.FPrizeQuanty.p_fgroup.show();
				}
			}
		}
	};
	//item.init();
	return item;
}
//创建一个不可编辑输入框和标题
function createUneditable_group(title){
	var item = {
		p_fgroup:$('<div class="indexs"></div>'),
		p_input:$('<input type="text" style="width: 250px;" disabled="true"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			this.p_input.textbox({
				label : title,
				labelWidth	: 130,
				width : 460
			});
			this.p_input.textbox('setValue',counts);
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.textbox("setValue",counts);
		}
	};
	counts = counts+1;
	item.init();
	return item;
}
//判断是否是已发布状态
function releaseState(){
	$(".p_disable").textbox("disable");
}

