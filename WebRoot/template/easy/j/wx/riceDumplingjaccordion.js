//奖品编辑手风琴
var count=0;
function jaccordion(parent,width){
	if(width==undefined){
		width = 400;//默认宽度
	}
	var accordion = {
		p_group:$('<div class="panel-group" style="margin:0 auto;width:395px;" id="accordion"></div>'),
		p_add:$('<span style="margin-top:5px;margin-left: 210px;">&nbsp;增加奖项&nbsp;</span>'),
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
					$.messager.alert("提示",prize.fname+"的奖品价值不能为空！");
					return true;
				}
				var fredbags=Util.getValueSwitch("#FRedbags");
				if(fredbags){
					if(!prize.fmaxmoney){
						$.messager.alert("提示",prize.fname+"的奖品价值上限不能为空！");
						return true;
					}
					if(prize.fmoney>200){
						$.messager.alert("提示",prize.fname+"的奖品价值不能大于200！");
						return true;
					}
					if(prize.fmaxmoney>200){
						$.messager.alert("提示",prize.fname+"的奖品价值上限不能大于200！");
						return true;
					}
				}
				if(!prize.ffinishtaskcount){
					$.messager.alert("提示",prize.fname+"的要求完成任务数不能为空！");
					return true;
				}
				if(typeid==15){
					if(prize.ffinishtaskcount>6||prize.ffinishtaskcount<1){
						$.messager.alert("提示",prize.fname+"的要求完成任务数最大为6，最小为1！");
						return true;
					}
				}else{
					if(prize.ffinishtaskcount>5||prize.ffinishtaskcount<1){
						$.messager.alert("提示",prize.fname+"的要求完成任务数最大为5，最小为1！");
						return true;
					}
				}
				
				var ftaskcount = $('#FTaskCount').val();
				if(prize.ffinishtaskcount>ftaskcount){
					$.messager.alert("提示",prize.fname+"的要求完成任务数不能大于活动设置的任务总数！设置的任务总数为："+ftaskcount);
					return true;
				}
				if(fredbags){
					if(parseInt(prize.fmaxmoney)<parseInt(prize.fmoney)){
						$.messager.alert("提示","奖品价值上限不能小于奖品价值！");
						return true;
					}
				}
				var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
				var babilitybase = $('.babilitybase');
				var count = 0;
				for(var j=0;j<babilitybase.length;j++){
					count += parseInt($(babilitybase[j]).val());
				}
				if(fprizeprobabilitybase!=count){
					$.messager.alert("提示","奖项概率之和应该等于奖项概率基数！");
					return true;
				}
				if(!prize.fprobability){
					$.messager.alert("提示",prize.fname+"的中奖概率不能为空！");
					return true;
				}
				if(!prize.fmaximum){
					$.messager.alert("提示",prize.fname+"的奖品数量不能为空！");
					return true;
				}
				if(prize.fmaximum<=0){
					$.messager.alert("提示",prize.fname+"的奖品数量不能小于0！");
					return true;
				}
				if(!prize.ficon&&(typeid==15)){
					$.messager.alert("提示",prize.fname+"的奖项图标不能为空！");
					return true;
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
					$.messager.alert("提示",prize.fname+"的奖品价值不能为空！");
					return true;
				}
				
				var fredbags=Util.getValueSwitch("#FRedbags");
				if(fredbags){
					if(!prize.fmaxmoney){
						$.messager.alert("提示",prize.fname+"的奖品价值上限不能为空！");
						return true;
					}
					if(prize.fmoney>200){
						$.messager.alert("提示",prize.fname+"的奖品价值不能大于200！");
						return true;
					}
					if(prize.fmaxmoney>200){
						$.messager.alert("提示",prize.fname+"的奖品价值上限不能大于200！");
						return true;
					}
					if(parseInt(prize.fmaxmoney)<parseInt(prize.fmoney)){
						$.messager.alert("提示","奖品价值上限不能小于奖品价值！");
						return true;
					}
				}
				var ftaskcount = $('#FTaskCount').val();
				if(!prize.ffinishtaskcount){
					$.messager.alert("提示",prize.fname+"的要求完成任务数不能为空！");
					return true;
				}
				if(typeid==15){
					if(prize.ffinishtaskcount>6||prize.ffinishtaskcount<1){
						$.messager.alert("提示",prize.fname+"的要求完成任务数最大为6，最小为1！");
						return true;
					}
				}else{
					if(prize.ffinishtaskcount>5||prize.ffinishtaskcount<1){
						$.messager.alert("提示",prize.fname+"的要求完成任务数最大为5，最小为1！");
						return true;
					}
				}
				if(prize.ffinishtaskcount>ftaskcount){
					$.messager.alert("提示",prize.fname+"的要求完成任务数不能大于活动设置的任务总数！设置的任务总数为："+ftaskcount);
					return true;
				}
				var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
				var babilitybase = $('.babilitybase');
				var count = 0;
				for(var j=0;j<babilitybase.length;j++){
					count +=  parseInt($(babilitybase[j]).val());
				}
				if(fprizeprobabilitybase!=count){
					$.messager.alert("提示","奖项概率之和应该等于奖项概率基数！");
					return true;
				}
				if(!prize.fprobability){
					$.messager.alert("提示",prize.fname+"的中奖概率不能为空！");
					return true;
				}
				if(!prize.fmaximum){
					$.messager.alert("提示",prize.fname+"的奖品数量不能为空！");
					return true;
				}
				if(prize.fmaximum<=0){
					$.messager.alert("提示",prize.fname+"的奖品数量不能小于0！");
					return true;
				}
				if(!prize.ficon&&(typeid==15)){
					$.messager.alert("提示",prize.fname+"的奖项图标不能为空！");
					return true;
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
			v.fmaxmoney =this.FMaxMoney.getValue();
			v.ffinishtaskcount =this.FFinishTaskCount.getValue();
			v.fmaximum =this.FMaximum.getValue();
			v.fprobability =this.FProbability.getValue();
			v.findex =this.FIndex.getValue();
			v.ficon =this.FIcon.getValue();
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
			this.FMaxMoney.setValue(value["fmaxmoney"]);
			this.FFinishTaskCount.setValue(value["ffinishtaskcount"]);
			this.FMaximum.setValue(value["fmaximum"]);
			this.FProbability.setValue(value["fprobability"]);
			this.FIcon.setValue(value["ficon"]);
			this.FIndex.setValue(value["findex"]);
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
				$.messager.alert("提示","奖品价值不能为空！");
				return false;
			}
			if(v.fmoney==0){
				$.messager.alert("提示","奖品价值不能小于0！");
				return false;
			}
			v.fmaximum =this.FMaximum.getValue();
			if(v.fmaximum==""){
				$.messager.alert("提示","奖品数量不能为空！");
				return false;
			}
			if(v.fmaximum<=0){
				$.messager.alert("提示",prize.fname+"的奖品数量不能小于0！");
				return true;
			}
			v.fprobability =this.FProbability.getValue();
			if(v.fprobability==""){
				$.messager.alert("提示","中奖概率不能为空！");
				return false;
			}
			var fprizeprobabilitybase = $('#FPrizeProbabilityBase').val();
			var babilitybase = $('.babilitybase');
			var count = 0;
			for(var i=0;i<babilitybase.length;i++){
				count +=  parseInt($(babilitybase[i]).val());
			}
			if(fprizeprobabilitybase!=count){
				$.messager.alert("提示","奖项概率之和应该等于奖项概率基数！");
				return false;
			}
			v.ficon =this.FIcon.getValue();
			if(v.ficon==""){
				$.messager.alert("提示","奖品图标不能为空！");
				return false;
			}
			if(fname&&fmoney&&fmaximum&&fprobability&&ficon&&fprizeprobabilitybase!=count){
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
			var number = 0;
			$(".indexs").each(function(){
				if($(this).parents().parents().parents().attr("style").indexOf("display: none")<0){
					var index = $(this).find('.textbox').find('.textbox-text');
					index.val(++number);
				}
			})
			count = number;
		},
		init:function(){
			this.isdelete = false;
			this.isupdate = false;
			this.isinsert = true;
			
			//创建输入项
			this.FName=createItem("奖项名称:","新的奖项",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*设置的奖项名称。例如：特等奖、一等奖等。</font>",false);
			this.FDescription=createItem("奖品描述:","",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*奖品名称。例如：电视机、购物券、现金50元等。</font>",false);
			this.FMoney=createItem("奖品价值:","",true,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*奖品的实际成本,如选择的是【积分】则为实际积分值。</font>",false);
			
			this.FMaximum=createItem("奖品数量:","",true,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*该奖项商品的数量。</font>",false);
			this.FMaxMoney=createMaxMoney("奖品价值上限:","");
			this.FFinishTaskCount=createItem("要求完成任务数:","",true,"",false);
			this.FProbability=createItem("奖项概率:","",true,"<font color='red' style='position: absolute;left: 100%;display: inline-block;width: 80%; text-align:left;'>*该奖项在奖项概率基数中的占比。</font>",true);
			this.FIndex=createUneditable("序号:");
			this.FIcon=createImg("奖项图标:","",false);
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.FDescription.p_fgroup);
			this.p_big.append(this.FMoney.p_fgroup);
			this.p_big.append(this.FMaxMoney.p_fgroup);
			this.p_big.append(this.FFinishTaskCount.p_fgroup);
			this.p_big.append(this.FMaximum.p_fgroup);
			this.p_big.append(this.FProbability.p_fgroup);
			this.p_big.append(this.FIndex.p_fgroup);
			this.p_big.append(this.FIcon.p_fgroup);
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
function createItem(title,value,whether,explain,base){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input type="text" class="col-sm-9 form-control" style="width: 300px;" />'),
		p_inputs:$('<input type="text" class="col-sm-9 form-control babilitybase" style="width: 300px;"  onblur="isDouble(this);" />'),
		init:function(){
			if(whether){
				if(base){
					this.p_fgroup.append(this.p_inputs);
					this.p_inputs.numberbox({
						label : title,
						labelWidth	: 100,
						width : 350
					});
					if(value){
						this.p_inputs.numberbox("setValue",value);
					}
				}else{
					this.p_fgroup.append(this.p_input);
					this.p_input.numberbox({
						label : title,
						labelWidth	: 100,
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
					labelWidth	: 100,
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
					return this.p_inputs.numberbox("getValue");
				}else{
					return this.p_input.numberbox("getValue");
				}
			}else{
				return this.p_input.textbox("getValue");
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
//创建一个输入框和标题
function createMaxMoney(title,explain){
	var fredbags=Util.getValueSwitch("#FRedbags");
	var item = { 
			p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
			p_input:$('<input type="text" class="col-sm-9 form-control MaxMoney" style="width: 300px;"/>'),
			init:function(){
				this.p_fgroup.append(this.p_input);
				this.p_input.numberbox({
					label : title,
					labelWidth	: 100,
					width : 350
				});
				if(fredbags){
					this.p_input.combobox("enable");
				}else{
					this.p_input.combobox("disable");
				}
			},
			getValue:function(){
				return this.p_input.numberbox("getValue");
			},
			setValue:function(value){
				return this.p_input.numberbox("setValue",value);
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
//上传图片
function createImg(title,desc){
	var item = {
		p_fgroup:$('<div style="padding:1px;"></div>'),
		p_input:$('<input type="text" style="width: 300px;" />'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			this.p_input.jeasyupload({
				label : title,
				url:"upload_image_wx_multiple_json.do",
				fileserverpath : gameurl,
				labelWidth	: 100,
				width : 350,
				multiple:false
			});
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.jeasyupload("setValue",value);
		}
	};
	item.init();
	return item;
}
//创建一个不可编辑输入框和标题
function createUneditable(title){
	var item = {
		p_fgroup:$('<div class="indexs"></div>'),
		p_input:$('<input type="text" class="indexs" style="width: 250px;" disabled="true"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			this.p_input.textbox({
				label : title,
				labelWidth	: 100,
				width : 350
			});
			this.p_input.textbox('setValue',count);
		},
		getValue:function(){
			return this.p_input.textbox("getValue");
		},
		setValue:function(value){
			return this.p_input.textbox("setValue",count);
		}
	};
	count = count+1;
	item.init();
	return item;
}
//创建一个复选框type:0,显示type：1隐藏
function createcheckbox(title,value,explain,type){
	var hide = "";
	if(type==1){
		hide = "display:none;"
	}
	var item = {
		p_fgroup:$('<div class="form-group" style="margin-left: 9px;'+hide+'"></div>'),
		p_label:$('<label class="" style="text-align: right; width: 125px; height: 30px;line-height:30px;padding-right:5px;">'+title+'</label>'),
		p_input:$('<input class="easyui-switchbutton"/>'),
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