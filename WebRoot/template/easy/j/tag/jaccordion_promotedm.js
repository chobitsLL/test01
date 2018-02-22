//新版easyUI活动管理	宣传设置	DM单设置
var count = 0;
function jaccordiondm(parent,faccepted,width){   
	if(width==undefined){
		width = 400;//默认宽度
	}
	//border-width:0px;
	var accordion = {
		p_group:$('<div class="" style="margin:0 auto;" id="accordion"></div>'),
		//p_add:$('<span id="addPrize" style="background-color: #f5f5f5;margin-top:10px;padding-top: 8px;font-size:14px;color:#333; padding-bottom: 8px;font-weight:700" class="btn  btn-default btn-block">+ 增加奖项&nbsp;</span>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;添加DM单&nbsp;</span>'),
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
			    	this_accordion.p_data.push(addPaneldm(this_group,"",this_accordion));
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
			g_data=eval('('+g_data+')')
			if(g_data==undefined||g_data==""||g_data.length==0){
				
			}else{
				for(var i = 0; i < g_data.length; i++){
					var panel = g_data[i];
					this.p_data.push(addPaneldm(this.p_group,panel,this));
				}
				if(faccepted==1){
					releaseState();
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
function addPaneldm(parent,value,acc){
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
			v.fid=this.p_fid.val();
			if(panel.isdelete == false){
				var fsourceValue =this.FSourceID.getValue();
				v.fsourceid = fsourceValue.ids;
			}
			
			return v;
			
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.FSourceID.setValue(value["fsourceid"]);
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
			/*if(value != "" && value["fapplyed"] == 1){
				this.FName=createUneditable("标签:","",false,"");
				this.FDescription=createUneditable("标签描述:","",false,"");
				//this.FIndex=createUneditable("序号:","",true,"");
			}else{
				this.FName=createItem("标签：","",false,"");
				this.FDescription=createItem("标签描述：","",false,"");
				//this.FIndex=createItem("序号：","",true,"");
				//this.FIndex=createItemNum("序号：","",true,"");
			}
			
			this.FIndex=createItemUneditableNum("序号:","",true,"");
			this.aa=createSelect("下拉:","",false,"");
			this.bb=createSelect1("弹出:","",false,"");*/
			//createJeasyCombobox
			
			this.FSourceID=createJeasyComboboxdm("DM单:","",false,"");
			//标签，标签描述，序号
			
			//将输入项加入到panel中
			this.p_big.append(this.FSourceID.p_fgroup);
			/*this.p_big.append(this.FDescription.p_fgroup);
			this.p_big.append(this.FIndex.p_fgroup);
			this.p_big.append(this.aa.p_fgroup);
			this.p_big.append(this.bb.p_fgroup);*/
			
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: 'DM单',
				content	: this.p_big,
				selected: false,
				closable: true,
				onClose	: this.deletePanel,
			});
			
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
			
			/*var input_FName = this.FName.p_input;
			input_FName.textbox({
				onChange : function(newValue, oldValue){
					this_panel.panel("setTitle",newValue);
				}
			});*/
			
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


//创建一个弹出选择
function createJeasyComboboxdm(title,value,parent){
	var item = {
		p_fgroup:$('<div class="form-group" style="padding:1px;"></div>'),
		p_input:$('<input class="p_disablet" style="width: 300px;" />'),
		init:function(){
			this.p_fgroup.append(this.p_input);
			var this_item = this;
			this.p_input.jeasycombo({
				label : title,
				labelWidth	: 100,
				width : 350,
				//type : "list",
				data : DMSingle,
				onChange : function(newValue,oldValue){
					this_item.change(newValue,oldValue);
				}
			});
			if(value){
				this.p_input.jeasycombo("setvalue",value);
			}
		},
		getValue:function(){
			return this.p_input.jeasycombo("getvalue");
		},
		setValue:function(value){
			return this.p_input.jeasycombo("setvalue",value);
		}
	};
	item.init();
	return item;
}