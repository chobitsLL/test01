// 创建一个闭包
(function($) {
	// 插件的定义 - 权限批量修改 该组件只适用在权限分配页面
	$.fn.jeasyrole = function(options,param) {
		if (typeof options == "string") {
			var method = $.fn.jeasyrole.methods[options];
			if (method) {
				return method(this, param);
			} else {
				$.error('方法 ' + options + ' 不存在');
				return undefined;
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "jeasyrole");
			if (state) {
				$.extend(state.options, options);
			}else{
				$.data(this, "jeasyrole", {
					options : $.extend({}, $.fn.jeasyrole.defaults, options)
				});
				var o = $.data(this, "jeasyrole").options;
				o.traget = $(this);
				o.init(o);//初始化
			}
		});
	};

	// 插件的defaults
	$.fn.jeasyrole.defaults = {
		traget:undefined,//对象
		url : undefined,//url
		button : undefined,//按钮组 text onclick btnclass
		rows : new Array(),
		init:function(o){
			$.fn.jeasyrole.init(o);
		},
	};
	//数据 
	//data : {main_menu:[{fid:100,fname:"企业"},{fid:200,fname:"人员"}],
	//	child_menu:[{fid:201,fparentid:200,fname:"企业管理员",ffunction:"新增,修改,删除,有效,开店",fuserconfine:"店铺,品牌,类别"},
	//	            {fid:202,fparentid:200,fname:"店长",ffunction:"修改,删除,有效",fuserconfine:"品牌,类别"},
	//	            {fid:203,fparentid:200,fname:"店小二",ffunction:"新增,修改,有效",fuserconfine:"店铺,类别"},
	//	            {fid:101,fparentid:100,fname:"企业信息",ffunction:"新增,修改",fuserconfine:""},
	//	            {fid:102,fparentid:100,fname:"加盟商管理",ffunction:"新增,有效",fuserconfine:"品牌,类别"}]},

	// 插件的methods
	$.fn.jeasyrole.methods = {
		// 返回属性对象
		options : function(jq) {
			return $.fn.jeasyrole.getOption(jq);
		},
		//取值
		getvalue:function(jq){
			var o = $.fn.jeasyrole.getOption(jq);
			return $.fn.jeasyrole.getvalue(o);
		},
		//赋值
		setvalue:function(jq){
			
		}
	};
	
	// 获取 Option 的方法
	$.fn.jeasyrole.getOption = function(jq) {
		var data = $.data(jq[0], "jeasyrole");
		if (data) {
			return data.options;
		} else {
			debug("属性未找到--jeasyrole--ID:" + jq.attr("id"));
			return undefined;
		}
	};

	// 定义取值函数
	$.fn.jeasyrole.getvalue = function(o){
		var array = new Array();
		for (var i = 0; i < o.rows.length; i++) {
			var row = o.rows[i];
			if(!row.isdelete){
				var v = row.getvalue();
				if (v == "") {
					continue;
				}
				array.push(v);
			}
		}
		array = array.join(",");
		return "["+array+"]";
	};

	// 定义赋值函数
	$.fn.jeasyrole.setvalue = function(o,value){
		o.rows = new Array();//清空数据
		o.tbody.empty();//清空表格内容
		if(value.rows){
			for (var i = 0; i < value.rows.length; i++) {
				var row = $.fn.jeasyrole.addRow(o);
				row.setvalue(value.rows[i]);
				o.rows.push(row);
			}
		}
	};
	
	// 定义初始化函数
	$.fn.jeasyrole.init = function(o) {
		o.isSelectAll = true;//默认添加全部功能权限
		o.table = $("<table class='table-rolemenu'></table>").appendTo(o.traget);
		o.thead = $("<thead></thead>").appendTo(o.table);//表头
		o.tbody = $("<tbody></tbody>").appendTo(o.table);
		o.th = $("<tr></tr>").appendTo(o.thead);//表头
		//$("<th></th>").appendTo(o.th);
		o.first = $("<th class='role-main'>主菜单</th>").appendTo(o.th);
		$("<th class='role-child'>子菜单</th>").appendTo(o.th);
		$("<th class='role-fun'>功能权限</th>").appendTo(o.th);
		$("<th class='role-data'>数据权限</th>").appendTo(o.th);
		//$("<th class='t100'></th>").appendTo(o.th);
		
		//增加单条按钮（下）
		o.addBtn = $("<a href='javascript:void(0)' class='btn btn-sm btn-red'>增加一条</a>").appendTo(o.traget);
		o.addBtn.click(function(){
			o.rows.push($.fn.jeasyrole.addRow(o));
		}).linkbutton({iconCls:"icon-add"});
		//增加单条按钮（上）
		o.addBtn_f = $("<a href='javascript:void(0)' class='btn btn-sm btn-red'>增加一条</a>");
		o.addBtn_f.appendTo(o.toolbar);
		o.addBtn_f.click(function(){
			o.rows.push($.fn.jeasyrole.addRow(o));
		}).linkbutton({iconCls:"icon-add"});
		//增加全部按钮
		o.addBtn_d = $("<a href='javascript:void(0)' class='btn btn-sm btn-red'>添加全部</a>");
		o.addBtn_d.appendTo(o.toolbar);
		o.addBtn_d.click(function(){
			$.messager.progress({text : "正在处理，请稍候..."});
			o.tbody.empty();
			o.rows = new Array();//清空数据
			o.tbody.empty();//清空表格内容
			for (var i = 0; i < o.data.child_menu.length; i++) {
				//var row = $.fn.jeasyrole.addRow(o);
				//row.setvalue(o.data.child_menu[i]);
				o.rows.push($.fn.jeasyrole.addRow(o));
			}
			$.messager.progress("close");
		}).linkbutton({iconCls:"icon-add"});
		//保存按钮
		o.saveBtn = $("<a href='javascript:void(0)' class='btn btn-sm btn-search'>保存</a>");
		o.saveBtn.appendTo(o.toolbar);
		o.saveBtn.click(function(){
			$.messager.progress({text : "正在处理，请稍候..."});
			var value = $.fn.jeasyrole.getvalue(o);
			//debug("提交数据："+value);
			$.ajax({
				url : o.url, // 后台处理程序
				type : 'post', // 数据发送方式
				dataType : 'json', // 接受数据格式
				data : {jsonobj:value},//post参数
				success : function(json){
					$.messager.progress("close");
					if(json.result){
						$.fn.jeasyrole.setvalue(o,json);
						$.messager.alert("提示",json.msg);
					}else{
						$.messager.alert("提示",json.msg,"error");
					}
				},
				error:function(json) {
					$.messager.progress("close");
					$.messager.alert("提示","网络连接失败！","error");
				}
			});
			
		}).linkbutton({iconCls:"icon-save"});
		
		o.check = $("<span class='checkbox-std jboot-active' style='cursor: pointer;margin-left:15px;display:inline-block;margin-top:6px;'><input id='autoadd' type='checkbox' checked='checked' />"
			   +"<label for='autoadd' style='font-size:14px;font-family:微软雅黑;color:#555;'>自动添加功能权限</label></span>").appendTo(o.toolbar);
		o.check_box = o.check.find("input");
		
		//初始化值
		if(o.data.menu.rows && o.data.menu.rows.length>0){
			//debug("数据量："+o.data.menu.length);
			$.fn.jeasyrole.setvalue(o,o.data.menu);
		}
	};
	
	// 添加一行
	$.fn.jeasyrole.addRow = function(o) {
		var r = {
			isinsert:true,//是否新增
			isupdate:false,//是否编辑
			isdelete:false,//是否删除
			getvalue:function(){
				var fid = this.id.val();
				if(fid==""){fid=0;}
				var fmainmenuid = this.main_select.val();
				var fbusinessmenuid = this.child_select.val();
				if(fmainmenuid==0 || fbusinessmenuid==0){
					//如果主菜单或子菜单的ID为0则不保存这条数据
					return "";
				}
				var ffunction = this.ffun_select.jeasycombo("getvalue").ids;
				var fuserconfine = this.fconfine_select.jeasycombo("getvalue").ids;
				var type = "insert";//判断增删改
				if(this.isupdate){type = "update";}
				if(this.isdelete){type = "delete";}
				return "{fid:"+fid+",fmainmenuid:"+fmainmenuid+",fbusinessmenuid:"+fbusinessmenuid+",ffunction:'"
				+ffunction+"',fuserconfine:'"+fuserconfine+"',type:'"+type+"'}";
			},
			setvalue:function(v){
				this.id.val(v.fid);
				this.main_select.val(v.fmainmenuid);
				this.main_change();
				this.child_select.val(v.fbusinessmenuid);
				this.change_child();
				this.ffun_select.jeasycombo("setvalue",v.ffunction);
				this.fconfine_select.jeasycombo("setvalue",v.fuserconfine);
				
				this.isinsert = false;
				this.isupdate = true;
			}
		};
		
		r.tr=$("<tr></tr>").appendTo(o.tbody);
		
		//ID
		//r.tdid=$("<td class='hide'></td>").appendTo(r.tr);
		r.id = $("<input type='hidden' />").appendTo(r.tr);
		
		//主菜单
		r.main=$("<td class='role-main'></td>").appendTo(r.tr);
		
		//主菜单change事件，刷新子菜单的数据
		r.main_change = function(){
			var v = r.main_select.val();
			var cv = r.child_select.val();
			r.child_select.empty();
			r.child_select.append("<option value='0'>--请选择--</option>");
			var exist = "";//取到已经存在的子菜单的ID  拼成字符串 后面加逗号 最后一个也加
			for (var i = 0; i < o.rows.length; i++) {
				var row = o.rows[i];
				var rv = row.child_select.val();
				if(!row.isdelete && rv!=cv){
					exist += (row.child_select.val()+",");
				}
			}
			$(o.data.child_menu).each(function(){
				if(this.fparentid==v && exist.indexOf(this.fid)==-1){
					r.child_select.append("<option value='"+this.fid+"'>"+this.fname+"</option>");
				}
			});
		};
		r.main_select=$("<select class='form-control input-sm role-main'></select>").appendTo(r.main).change(function(){
			r.main_change();
		});
		
		r.main_select.append("<option value='0'>--请选择--</option>");
		$(o.data.main_menu).each(function(){
			if(this.fname=="主页"){
				return;
			}
			r.main_select.append("<option value='"+this.fid+"'>"+this.fname+"</option>");
		});
		
		//子菜单change事件，刷新功能权限和数据权限
		r.change_child = function(){
			var v = r.child_select.val();
			//r.ffun_select.empty();
			//r.fconfine_select.empty();
			
			$(o.data.child_menu).each(function(){
				if(this.fid==v){
					var ffunctions_rows = {};
					if(this.ffunction.length>0){
						ffunctions_rows = new Array();
						var ffunctions = this.ffunction.split(",");
						for (var i = 0; i < ffunctions.length; i++) {
							ffunctions_rows.push({fid:ffunctions[i],fname:ffunctions[i]});
						}
					}
					r.ffun_select.jeasycombo("reload_data",{total:0,rows:ffunctions_rows});
					var fun_value = "";
					//如果默认添加全部功能 被选中则添加全部功能
					if(o.check_box.is(':checked')){
						fun_value=this.ffunction;
					}
					r.ffun_select.jeasycombo("setvalue",fun_value);

					var fuserconfines_rows = new Array();
					if(this.fuserconfine.length>0){
						fuserconfines_rows = new Array();
						var fuserconfines = this.fuserconfine.split(",");
						for (var i = 0; i < fuserconfines.length; i++) {
							fuserconfines_rows.push({fid:fuserconfines[i],fname:fuserconfines[i]});
						}
					}
					r.fconfine_select.jeasycombo("reload_data",{total:0,rows:fuserconfines_rows});
					r.fconfine_select.jeasycombo("setvalue","");
					return;
				}
			});
		};
		
		//子菜单
		r.child=$("<td class='role-child'></td>").appendTo(r.tr);
		r.child_select=$("<select class='form-control input-sm role-child'></select>").appendTo(r.child).change(function(){
			r.change_child();
		});
		r.child_select.append("<option value='0'>--请选择--</option>");
		
		//功能权限
		r.ffun=$("<td class='role-fun'></td>").appendTo(r.tr);
		r.ffun_select=$("<input class='form-control input-sm' type='text' />").appendTo(r.ffun);
		r.ffun_select.jeasycombo({
			multiple:true,//是否多选
			isinline:false,//是否每行一个选项
			width:300,
			dlgwidth:600,//自定义弹出框的宽度
			linenum:2,//当每行多个选项时，每一行选项的个数
			type : "list",//弹出的样式
			data:{"total":0,"rows":[]}
		});
		
		//数据权限
		r.fconfine=$("<td class='role-data'></td>").appendTo(r.tr);
		r.fconfine_select=$("<input class='form-control input-sm' type='text' />").appendTo(r.fconfine);
		r.fconfine_select.jeasycombo({
			multiple:true,//是否多选
			isinline:false,//是否每行一个选项
			width:200,
			dlgwidth:600,//自定义弹出框的宽度
			linenum:5,//当每行多个选项时，每一行选项的个数
			type : "list",//弹出的样式
			data:{"total":0,"rows":[]}
		});
		
		//删除按钮
		r.deltd=$("<td class='t100' style='text-align: right;'></td>").appendTo(r.tr);
		r.delBtn = $("<a href='javascript:void(0)' class='btn btn-sm btn-red'>移除</a>").appendTo(r.deltd);
		r.delBtn.click(function(){
			r.tr.remove();
			r.isdelete=true;
		}).linkbutton({iconCls:"icon-cancelo"});
		//main_change();
		//change_child();
		

		var beforemenu = 0;//前面一个菜单
		//var index_last = o.rows.length;
		for (var s = o.rows.length; s >= 0; s--) {
			var last = o.rows[s];
			if(last==undefined || last.isdelete){
				continue;
			}else{
				beforemenu = last.child_select.val();
				break;
			}
		}
		
		for (var ch = 0; ch < o.data.child_menu.length; ch++) {
			var ch_menu = o.data.child_menu[ch];
			if(ch_menu.fid>beforemenu){
				r.main_select.val(ch_menu.fparentid).change();
				r.child_select.val(ch_menu.fid).change();
				break;
			}
		}
		
		return r;
	};
	
	// 私有函数：调试输出
	function debug(info) {
		if (window.console) {
			window.console.log("debug[jeasyrole] | " + info);
		}
	}

	// 闭包结束
})(jQuery);