//奖品编辑手风琴
function jaccordion(parent,width,isDisable){
	if(width==undefined){
		width = 400;//默认宽度
	}
	var accordion = {
		p_group:$('<div class="panel-group" style="margin:0 auto;" id="accordion"></div>'),
		p_add:$('<span style="margin-top:5px;">&nbsp;添加礼品&nbsp;</span>'),
		p_data:new Array,
		p_index:0,
		//初始化
		init:function(){
			//在这里的this就是代表 上面定义的 accordion
			var this_accordion = this;
			var this_group=this.p_group;
			this.p_group.appendTo(parent);
			this.p_group.accordion({
				width : 400,
				onAdd : function(title,index){
					this_accordion.p_index = index;
				}
			});
			
			this.p_add.appendTo(parent);
			this.p_add.linkbutton({
				width	: 400 - 2,
			    iconCls	: 'icon-add',
			    onClick	: function(){
			    	this_accordion.p_data.push(addPanel(this_group,"",this_accordion,isDisable));
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
					this.p_data.push(addPanel(this.p_group,panel,this,isDisable));
				}
				this.p_group.accordion("resize");
			}
		},
		isEmpty:function(){ // 返回true时，至少有一个奖项卡的必填项未填
			// test
			var data = this.getValue();
			for(var i=0;i<data.insertd.length;i++){
            	var fsumquanty = data.insertd[i].fsumquanty;
            	var fquanty = data.insertd[i].fquanty;
            	var fsendtype=data.insertd[i].fsendtype;
            	var fstockid =data.insertd[i].fstockid;
            	if(fstockid==""){
            		$.messager.alert("提示", "礼品不能为空！");
            		return true;
            	}
            	if(fsendtype==2){
	            	var fbegindate=data.insertd[i].fbegindate;
	            	var fenddate =data.insertd[i].fenddate;
	            	if(fbegindate==""){$.messager.alert("提示", "开始日期不能为空！");return true;}
	            	if(fenddate==""){$.messager.alert("提示", "结束不能为空！");return true;}
	            	fbegindate = fbegindate.replace(/-/g,"/");
	            	fenddate = fenddate.replace(/-/g,"/");
	            	var startdate = new Date(fbegindate);//开始时间
	            	var enddate = new Date(fenddate);//结束时间
	            	if(enddate<startdate){
	            		$.messager.alert("提示", "结束日期小于开始日期！");
	            		return true;
	            	}
            	}
            	if(fsendtype!=0){
	            	if(fsumquanty==0){
	            		$.messager.alert("提示", "礼品总数量不能为0！");
	    				return true;
	            	}
	            	if(fquanty==0){
	            		$.messager.alert("提示", "发放数量不能为0！");
				return true;
			}
	    			if(parseInt(fsumquanty)<parseInt(fquanty)){
	    				 $.messager.alert("提示", "发放数量不能大于礼品总数量！");
					return true;
				}
			}
            }
			for(var i=0;i<data.updated.length;i++) {
            	var fsumquanty = data.updated[i].fsumquanty;
            	var fquanty = data.updated[i].fquanty;
            	var fsendtype=data.updated[i].fsendtype;
            	var fstockid =data.updated[i].fstockid;
            	if(fstockid==""){
            		$.messager.alert("提示", "礼品不能为空！");
            		return true;
            	}
            	if(fsendtype==2){
	            	var fbegindate=data.updated[i].fbegindate;
	            	var fenddate =data.updated[i].fenddate;
	            	if(fbegindate==""){$.messager.alert("提示", "开始日期不能为空！");return true;}
	            	if(fenddate==""){$.messager.alert("提示", "结束不能为空！");return true;}
	            	fbegindate = fbegindate.replace(/-/g,"/");
	            	fenddate = fenddate.replace(/-/g,"/");
	            	var startdate = new Date(fbegindate);//开始时间
	            	var enddate = new Date(fenddate);//结束时间
	            	if(enddate<startdate){
	            		$.messager.alert("提示", "结束日期小于开始日期！");
	            		return true;
	            	}
            	}
            	if(fsendtype !=0){
            		if(fsumquanty==0){
	            		$.messager.alert("提示", "礼品总数量不能为0！");
	    				return true;
	            	}
	            	if(fquanty==0){
	            		$.messager.alert("提示", "发放数量不能为0！");
	            		return true;
	            	}
	    			if(parseInt(fsumquanty)<parseInt(fquanty)){
	    				 $.messager.alert("提示", "发放数量不能大于礼品总数量！");
					return true;
				}
			}
            }
			// test
			return false;
		}
	};
	accordion.init();
	return accordion;
}

//创建一个手风琴项
function addPanel(parent,value,acc,isDisable){
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
			if(panel.isdelete == false){
				var fstockidValue =this.FStockID.getValue();
				v.fstockid = fstockidValue.ids;
				v.fstoreid = fstockidValue.codes;
				v.fneedsign =this.FNeedSign.getValue();
				v.fneedvisit =this.FNeedVisit.getValue();
				v.fsendtype=this.FSendType.getValue();
				if(v.fsendtype==2){
					v.fbegindate=this.FBeginDate.getValue();
					v.fenddate=this.FEndDate.getValue();
				}
				if(v.fsendtype!=0){
				 v.fsumquanty=this.FSumQuanty.getValue();
				 v.fquanty=this.FQuanty.getValue();
				 v.fneedsign=1;
				}else{
				 v.fsumquanty="";
				 v.fquanty="";
				}
			}else{
				v.fneedsign =this.FNeedSign.getValue();
				v.fneedvisit =this.FNeedVisit.getValue();
			}
			return v;
		},
		//设置值
		setValue:function(value){
			this.isinsert = false;
			this.isdelete = false;
			this.isupdate = true;
			this.p_fid.val(value["fid"]);
			this.FStockID.setValue(value["fsubstockid"]);
			this.FNeedSign.setValue(value["fneedsign"]);
			this.FNeedVisit.setValue(value["fneedvisit"]);
			this.FSendType.setValue(value["fsendtype"]);
			this.FSumQuanty.setValue(value["fsumquanty"]);
			this.FQuanty.setValue(value["fquanty"]);
			this.FBeginDate.setValue(value["fbegindate"]);
			this.FEndDate.setValue(value["fenddate"]);
			if(value["fsendtype"]==2){
				var a=$("<a style='margin-right:5px;width: 70px; font-size: 12px;font-weight: bold;height: 16px;line-height: 16px; color: black;text-decoration:none;'>数量分配</a>");
				a.attr("href","javascript:window.parent.openGift("+value["fid"]+","+isDisable+")");
				this.p_panel.panel("header").find(".panel-tool").prepend(a);
				this.FQuanty.p_input.numberbox('disable');
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
			this.FStockID=createItemGift("礼品名称：","");
			this.FNeedSign=createItemCheckboxGift("扫码签收：",1);
			this.FNeedVisit=createItemCheckboxGift("回访：","");
			this.FSumQuanty=createItemGiftText("礼品总数量：",1);
			this.FQuanty=createItemGiftText("发放数量：",1);
			this.FBeginDate=createItemDate("兑换开始时间：","");
			this.FEndDate=createItemDate("兑换结束时间：","");
			this.FSendType=createItemGiftRadio("发放类型：",0,this.FSumQuanty,this.FQuanty,this.FNeedSign,this.FNeedVisit,this.FBeginDate,this.FEndDate);
			//将输入项加入到panel中
			this.p_big.append(this.p_fid);
			this.p_big.append(this.FSendType.p_fgroup);
			this.p_big.append(this.FStockID.p_fgroup);
			this.p_big.append(this.FBeginDate.p_fgroup);
			this.p_big.append(this.FEndDate.p_fgroup);
			this.p_big.append(this.FSumQuanty.p_fgroup);
			this.p_big.append(this.FQuanty.p_fgroup);
			this.p_big.append(this.FNeedSign.p_fgroup);
			this.p_big.append(this.FNeedVisit.p_fgroup);
			
			var closable = true;
			if(isDisable==1){
				closable = false;
			}
			//增加一个奖项的组件
			parent.accordion('add', {
				title	: '礼品',
				content	: this.p_big,
				closable: closable,
				onClose	: this.deletePanel,
			});
			this.p_panel = parent.accordion("getPanel",acc.p_index);
			var this_panel = this.p_panel;
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

function createItemGift(title,value){
	var item = {
		p_fgroup:$('<div class="easy-input-line"></div>'),
		p_input:$('<input type="text" style="width: 250px;"/>'),
		init:function(){
				this.p_fgroup.append(this.p_input);
				if(value){
				this.p_input.val(value);
				}
			this.p_input.jeasycombo({
						label : title,
				labelWidth	: 105,
				width : 353,
				type : "list",
				data : GiftName
					});
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
//增加文本框
function createItemGiftText(title,value){
	var item = {
		p_fgroup:$('<div class="easy-input-line"></div>'),
		p_input:$('<input type="text" class="p_disable" style="width: 250px;"/>'),
			init:function(){
					this.p_fgroup.append(this.p_input);
			this.p_input.numberbox({
						label : title,
						labelWidth	: 100,
				width : 350,
				required:true,
				missingMessage:'只能输入数字'
					});
					if(value){
				this.p_input.numberbox("setValue",value);
				}
			},
			getValue:function(){
					return this.p_input.val();
		},
		setValue:function(value){
			return this.p_input.numberbox("setValue",value);
		}
	};
	item.init();
	return item;
}
//增加单选按钮
function createItemGiftRadio(title,value,obj1,obj2,obj3,obj4,obj5,obj6){
	var time = new Date().getTime();
	var item = {
		p_fgroup:$('<div class="easy-input-line"></div>'),
		p_label:$('<label class="textbox-label textbox-label-before" style="height: 25px;line-height: 25px;text-align: right;width: 100px;"></label>'),
		p_input:$('<input type="radio" class="form-radios  p_disable" name="FSendType'+time+'" style="margin-top:10px;margin-left:5px" value="0"/>'),
		p_span:$('<span"></span>'),
		p_input1:$('<input type="radio" class="form-radios p_disable" name="FSendType'+time+'" style="margin-left:20px;" value="1"/>'),
		p_span1:$('<span"></span'),
		p_input2:$('<input type="radio" class="form-radios p_disable" name="FSendType'+time+'" style="margin-left:20px;" value="2"/>'),
		p_span2:$('<span"></span'),
		init:function(){
			this.p_fgroup.append(this.p_label.text(title));
			this.p_fgroup.append(this.p_input);
			this.p_fgroup.append(this.p_span.text("收集发放"));
			this.p_fgroup.append(this.p_input1);
			this.p_fgroup.append(this.p_span1.text("直接发放"));
			this.p_fgroup.append(this.p_input2);
			this.p_fgroup.append(this.p_span2.text("注册发放"));
			this.p_input.click(function(){
				obj1.p_fgroup.hide();
				obj2.p_fgroup.hide();
				obj5.p_fgroup.hide();
				obj6.p_fgroup.hide();
				obj3.p_fgroup.show();
				obj4.p_fgroup.show();
				obj3.p_input.prop("disabled",false);
			});
			this.p_input1.click(function(){
				obj1.p_fgroup.show();
				obj2.p_fgroup.show();
				obj3.p_fgroup.show();
				obj4.p_fgroup.show();
				obj5.p_fgroup.hide();
				obj6.p_fgroup.hide();
				obj3.p_input.prop("checked","checked");
				obj3.p_input.prop("disabled",true);
				obj2.p_input.numberbox('enable');
			});
			this.p_input2.click(function(){
				obj1.p_fgroup.show();
				obj2.p_fgroup.show();
				obj5.p_fgroup.show();
				obj6.p_fgroup.show();
				obj3.p_input.prop("checked","checked");
				obj2.p_input.numberbox('disable');
				obj3.p_input.prop("disabled",true);
				obj2.p_input.val(1);
				obj3.p_fgroup.hide();
				obj4.p_fgroup.hide();
				
			});
			if(value==1){
				obj1.p_fgroup.show();
				obj2.p_fgroup.show();
				obj3.p_fgroup.show();
				obj4.p_fgroup.show();
				obj5.p_fgroup.hide();
				obj6.p_fgroup.hide();
				this.p_input1.prop("checked","checked");
				obj3.p_input.prop("checked",true);
				obj3.p_input.prop("disabled",true);
				obj2.p_input.numberbox('enable');
			}else if(value==0){
				obj1.p_fgroup.hide();
				obj2.p_fgroup.hide();
				obj3.p_fgroup.show();
				obj4.p_fgroup.show();
				obj5.p_fgroup.hide();
				obj6.p_fgroup.hide();
				this.p_input.prop("checked","checked");
				obj3.p_input.prop("disabled",false);
			}else if(value==2){
				obj1.p_fgroup.hide();
				obj1.p_fgroup.show();
				obj2.p_fgroup.show();
				obj5.p_fgroup.show();
				obj6.p_fgroup.show();
				obj3.p_input.prop("checked","checked");
				obj2.p_input.numberbox('disable');
				obj3.p_input.prop("disabled",true);
				obj2.p_input.val(1);
				obj3.p_fgroup.hide();
				obj4.p_fgroup.hide();
				this.p_input2.prop("checked","checked");
			}
		},
		getValue:function(){
			var values=0;
			values = this.p_fgroup.find('input:radio:checked').val();
			return values;
		},
		setValue:function(setvalue){
			if(setvalue==1){
				obj1.p_fgroup.show();
				obj2.p_fgroup.show();
				obj3.p_fgroup.show();
				obj4.p_fgroup.show();
				obj5.p_fgroup.hide();
				obj6.p_fgroup.hide();
				this.p_input1.prop("checked","checked");
				obj3.p_input.prop("checked",true);
				obj3.p_input.prop("disabled",true);
				obj2.p_input.prop("disabled",false);
			}else if(setvalue==0){
				obj1.p_fgroup.hide();
				obj2.p_fgroup.hide();
				obj3.p_fgroup.show();
				obj4.p_fgroup.show();
				obj5.p_fgroup.hide();
				obj6.p_fgroup.hide();
				this.p_input.prop("checked","checked");
				obj3.p_input.prop("disabled",false);
			}else if(setvalue==2){
				obj1.p_fgroup.hide();
				obj1.p_fgroup.show();
				obj2.p_fgroup.show();
				obj5.p_fgroup.show();
				obj6.p_fgroup.show();
				obj3.p_input.prop("checked","checked");
				obj2.p_input.prop("disabled",true);
				obj3.p_input.prop("disabled",true);
				obj3.p_fgroup.hide();
				obj4.p_fgroup.hide();
				this.p_input2.prop("checked","checked");
			}
			return ;
		},
	};
	item.init();
	
	return item;
}
//日期
function createItemDate(title,value){
	var item = {
		p_fgroup:$('<div class="easy-input-line" style="padding:1px;"></div>'),
		p_inputgroup:$('<div class="input-group date form_date p_disable" data-link-field="dtp_input2" style="width: 100px;"></div>'),
		p_input:$('<input  class="input-sm" size="10" type="text"  readonly  style="width: 221px;" />'),
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
				label : title,
				labelWidth	: 104,
				width : 353,
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
function createItemCheckboxGift(title,value){
	var item = {
		p_fgroup:$('<div class="form-group"></div>'),
		p_label:$('<label class="textbox-label textbox-label-before" style="height: 25px;line-height: 25px;text-align: right;width: 100px;"></label>'),
		p_input:$('<input type="checkbox" style="width: 20px;margin-top: 2px;" class="p_disable"/>'),
		init:function(){
			this.p_fgroup.append(this.p_label.text(title));
			this.p_fgroup.append(this.p_input);
			if(value){
				this.p_input.val(value);
			}
		},
		getValue:function(){
			return this.p_input.is(':checked')?1:0;
		},
		setValue:function(values){
			console.log("复选框的值："+values);
			if(values==1){
				this.p_input.attr('checked', 'checked');
			}
		}
	};
	item.init();
	return item;
}