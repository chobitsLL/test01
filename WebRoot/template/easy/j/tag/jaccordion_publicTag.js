//新版easyUI标签编辑手风琴	王龙  
function jaccordion(parent,width){   
	if(width==undefined){
		width = 400;//默认宽度
	}
	//border-width:0px;
	var accordion = {
		p_group:$('<div class="" style="margin:0 auto;" id="accordion"></div>'),
		//p_add:$('<span id="addPrize" style="background-color: #f5f5f5;margin-top:10px;padding-top: 8px;font-size:14px;color:#333; padding-bottom: 8px;font-weight:700" class="btn  btn-default btn-block">+ 增加奖项&nbsp;</span>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;增加标签&nbsp;</span>'),
		p_data:new Array,
		p_index:0,
		//初始化
		init:function(){
			//在这里的this就是代表 上面定义的 accordion//json对象
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
				$.messager.alert('提示','标签名称不能为空！','warning');
				return true;
			}
			
			for(var i=0;i<data.insertd.length;i++) {
				var prize = data.insertd[i];
				if(!prize.fname){
					$.messager.alert('提示','标签名称不能为空！','warning');
					return true;
				}
			}
			for(var i=0;i<data.updated.length;i++) {
				var prize = data.updated[i];
				if(!prize.fname){
					$.messager.alert('提示','标签名称不能为空！','warning');
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
		p_fsid:$('<input type="hidden" />'),
		//取值
		getValue:function(){
			var v={};
			v.fsid=this.p_fsid.val();
			v.fid=this.p_fid.val();
			v.fname=this.FName.getValue();
			v.fdescription =this.FDescription.getValue();
			v.findex =this.FIndex.getValue();
			return v;
			
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fsid.val(value["fsid"]);
			this.p_fid.val(value["fid"]);
			this.FName.setValue(value["fname"]);
			this.FDescription.setValue(value["fdescription"]);
			this.FIndex.setValue(value["findex"]);
			this.p_panel.panel("setTitle",value["fname"]);
		},
		isEmpty:function(){
			var data = this.getValue();
			if(data.insertd.length==0&&data.updated.length==0){
				$.jbootmsg("标签项不能为空！");
				return true;
			}
			for(var i=0;i<data.insertd.length;i++) {
				var prize = data.insertd[i];
				if(!prize.fname){
					$.jbootmsg("标签名称不能为空！");
					return true;
				}
			}
			for(var i=0;i<data.updated.length;i++) {
				var prize = data.updated[i];
				if(!prize.fname){
					$.jbootmsg("标签名称不能为空！");
					return true;
				}
			}
			return false;
		},
		//删除panel
		deletePanel:function(){
			panel.isinsert = false;
			panel.isupdate = false;
			panel.isdelete = true;
		},
		init:function(){
			this.isdelete = false;
			this.isupdate = false;
			this.isinsert = true;
			var closable ;
			if(value != "" && value["fapplyed"] == 1){
				this.FName=createUneditable("标签:","",false,"");
				this.FDescription=createUneditable("标签描述:","",false,"");
				this.FIndex=createItemUneditableNum("序号:","",true,"");
				closable = false;
			}else{
				this.FName=createItem("标签：","",false,"");
				this.FDescription=createItem("标签描述：","",false,"");
				this.FIndex=createItemNum("序号:","",true,"");
				closable = true;
			}
			//标签，标签描述，序号
			//将输入项加入到panel中
			this.p_big.append(this.FName.p_fgroup);
			this.p_big.append(this.FDescription.p_fgroup);
			this.p_big.append(this.FIndex.p_fgroup);
			
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: '标签编辑',
				content	: this.p_big,
				selected: false,
				closable: closable,
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

//创建一个可编辑的标签或标签描述
function createItem(title,value,whether,explain){
	var item = {
		p_fgroup:$('<div style="padding:1px;"></div>'),
		//p_label:$('<label class="col-sm-3 control-label"></label>'),
		p_input:$('<input type="text" class="" style="width: 300px;" />'),
		p_inputs:$('<input type="text" style="width: 300px;"  onblur="isDouble(this);" />'),
		init:function(){
			if(whether){
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
				return this.p_inputs.val();
			}else{
				return this.p_input.val();
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

//创建一个序号，全是不可编辑的
function createItemUneditableNum(title,value,whether,explain){
	var item = {
			p_fgroup:$('<div class="indexs" style="padding:1px;"></div>'),
			//p_label:$('<label class="col-sm-3 control-label"></label>'),
			p_input:$('<input type="text" class="" style="width: 300px;" />'),
			p_inputs:$('<input type="text" style="width: 300px;"  onblur="isDouble(this);" disabled="true" />'),
			init:function(){
				if(whether){
					this.p_fgroup.append(this.p_inputs);
					this.p_inputs.numberbox({
						label : title,
						labelWidth	: 100,
						width : 350
					});
					this.p_inputs.numberbox("setValue",value);
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
					return this.p_inputs.val();
				}else{
					return this.p_input.val();
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
//创建一个序号，可编辑的
function createItemNum(title,value,whether,explain){
	var item = {
			p_fgroup:$('<div class="indexs" style="padding:1px;"></div>'),
			//p_label:$('<label class="col-sm-3 control-label"></label>'),
			p_input:$('<input type="text" class="" style="width: 300px;" />'),
			p_inputs:$('<input type="text" style="width: 300px;"  onblur="isDouble(this);"  />'),
			init:function(){
				if(whether){
					this.p_fgroup.append(this.p_inputs);
					this.p_inputs.numberbox({
						label : title,
						labelWidth	: 100,
						width : 350
					});
					this.p_inputs.numberbox("setValue",value);
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
					return this.p_inputs.val();
				}else{
					return this.p_input.val();
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

//创建一个不可编辑的标签或标签描述
function createUneditable(title,value,whether,explain){
	var item = {
			p_fgroup:$('<div  style="padding:1px;"></div>'),
			//p_label:$('<label class="col-sm-3 control-label"></label>'),
			p_input:$('<input type="text" class="" style="width: 300px;" disabled="true"/>'),
			p_inputs:$('<input type="text" style="width: 300px;"  onblur="isDouble(this);" disabled="true"/>'),
			init:function(){
				if(whether){
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
					return this.p_inputs.val();
				}else{
					return this.p_input.val();
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