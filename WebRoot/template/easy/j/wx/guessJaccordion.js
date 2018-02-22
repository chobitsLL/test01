//奖品编辑手风琴
var count = 0;
function jaccordion(parent,width){
	if(width==undefined){
		width = 400;//默认宽度
	}
	var accordion = {
		p_group:$('<div class="panel-group" id="accordion" style="margin: 0px auto !important;"></div>'),
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
				if(!prize.ficon){
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
				if(!prize.ficon){
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
			v.fcanexchange=this.FCanExchange.getValue();
			v.ffinishtaskcount=this.FFinishTaskCount.getValue();
			v.fexchangecount=this.FExchangeCount.getValue();
			v.fdescription =this.FDescription.getValue();
			v.fmoney =this.FMoney.getValue();
			v.fmaximum =this.FMaximum.getValue();
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
			this.FCanExchange.setValue(value["fcanexchange"]);
			this.FFinishTaskCount.setValue(value["ffinishtaskcount"]);
			this.FExchangeCount.setValue(value["fexchangecount"]);
			this.FDescription.setValue(value["fdescription"]);
			this.FMoney.setValue(value["fmoney"]);
			this.FMaximum.setValue(value["fmaximum"]);
			this.FIndex.setValue(value["findex"]);
			this.FIcon.setValue(value["ficon"]);
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
			v.ficon =this.FIcon.getValue();
			if(v.ficon==""){
				$.messager.alert("提示","奖项图标不能为空！");
				return false;
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
			this.FCanExchange=createcheckbox("是否允许金币兑换:",0,"",this);
			this.FFinishTaskCount=createItem("兑换需要金币数:","",true);
			this.FExchangeCount=createItem("每人允许兑换次数:","",true);
			this.FDescription=createItem("奖品描述:","",false,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*奖品名称。例如：电视机、购物券、现金50元等。</font>",false);
			this.FMoney=createItem("奖品成本:","",true,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*奖品的实际成本,如选择的是【积分】则为实际积分值。</font>",false);
			this.FMaximum=createItem("奖品总数:","",true,"<font color='red' style='position: absolute;left: 101%;display: inline-block;width: 50%;'>*该奖项商品的数量。</font>",false);
			this.FIndex=createUneditable("序号:");
			this.FIcon=createImg("奖项图标:","",false);
			
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.FCanExchange.p_fgroup);
			this.p_big.append(this.FFinishTaskCount.p_fgroup);
			this.p_big.append(this.FExchangeCount.p_fgroup);
			this.p_big.append(this.FDescription.p_fgroup);
			this.p_big.append(this.FMoney.p_fgroup);
			this.p_big.append(this.FMaximum.p_fgroup);
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
			this.FCanExchange.init();
		}
	};
	
	panel.init();
	if(value!=""){
		panel.setValue(value);
		//panel.FCanExchange.p_input.changes();
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
		//p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input type="text" class="col-sm-9 form-control" style="width: 300px;" />'),
		p_inputs:$('<input type="text" class="col-sm-9 form-control babilitybase" style="width: 300px;"  onblur="isDouble(this);" />'),
		init:function(){
			if(whether){
				if(base){
					this.p_fgroup.append(this.p_inputs);
					this.p_inputs.numberbox({
						label : title,
						labelWidth	: 110,
						width : 350
					});
					if(value){
						this.p_inputs.numberbox("setValue",value);
					}
				}else{
					this.p_fgroup.append(this.p_input);
					this.p_input.numberbox({
						label : title,
						labelWidth	: 110,
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
					labelWidth	: 110,
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
				fileserverpath : gameulr,
				labelWidth	: 110,
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
		p_input:$('<input type="text" style="width: 250px;" disabled="true"/>'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			this.p_input.textbox({
				label : title,
				labelWidth	: 110,
				width : 350
			});
			this.p_input.textbox('setValue',count);
		},
		getValue:function(){
			return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.textbox("setValue",count);
		}
	};
	count = count+1;
	item.init();
	return item;
}
//创建一个复选框
function createcheckbox(title,value,explain,parent){
	var item = {
		p_fgroup:$('<div class="form-group" style="margin-left: 9px;"></div>'),
		p_label:$('<label class="" style="text-align: right; width: 110px; height: 30px;line-height:30px;padding-right:5px;">'+title+'</label>'),
		p_input:$('<input class="easyui-switchbutton"/>'),
		init:function(){
			this.p_fgroup.append(this.p_label);
			this.p_fgroup.append(this.p_input);
			var this_item=this;
			this.p_input.switchbutton({
				onText:'是',
				offText:'否',
	    		checked: false,  
	            onChange: function(checked){  
	            	this_item.changes(checked);
	            }
	    	})
	    	parent.FFinishTaskCount.p_fgroup.hide();
			parent.FExchangeCount.p_fgroup.hide();
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
		},changes:function(checked){
			if(checked){
				parent.FFinishTaskCount.p_fgroup.show();
				parent.FExchangeCount.p_fgroup.show();
			}else{
				parent.FFinishTaskCount.p_fgroup.hide();
				parent.FExchangeCount.p_fgroup.hide();
			}
		}
	};
	//item.init();
	return item;
}
