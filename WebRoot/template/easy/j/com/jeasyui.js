// 不区分大小写的筛选 NEW selector
jQuery.expr[':'].Contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};

//创建一个闭包  **********  组件公共方法  ********﻿
(function($) {
	// 定义组件
	$.fn.jeasy={};
	// 定义组件
	$.fn.jeasy.code={};
	
	/* 默认本地语言 */
	$.fn.jeasy.local={
		dialog_title:"窗口",
		dialog_title_list:"选择",
		dialog_title_grid:"选择",
		dialog_title_tree:"选择",
		btn_sure:"确定",
		btn_cancel:"取消",
		btn_checkall:"全选",
		grid_index:"编号",
		grid_name:"名称",
		grid_code:"简码",
		combo_btn:"选择",
		upload_btn_multiple:"批量上传",
		upload_btn_single:"文件上传",
		msg_loading:"正在处理,请稍候...",
		msg_file_loading:"文件正在上传，请稍候..."
	};
	
	$.fn.jeasy.code.dialog_list = function(afterShow,buttons,title,width,height){
		var dialog={
			modal:$('<div aaa="xxx"></div>'),
			search:$('<span class="combo-search"></span>')
		};
		if(!title || title==""){
			title=$.fn.jeasy.local.dialog_title;
		}
		if(!width || width==undefined){
			width=500;
		}
		if(!height || height==undefined){
			height=500;
		}
		dialog.modal.dialog({
		    title: title,
		    width: width,
		    height: height,
		    cache: false,
		    modal: true,
		    closed: true,
		    buttons:buttons,
		    onOpen:afterShow
		});
		dialog.body = dialog.modal.dialog("body");
		dialog.body.after(dialog.search);
		return dialog;
	};
	
	//创建上传显示图标函数
	$.fn.jeasy.code.createTag = function(o,iconCls) {
		var tag = {};
		tag.label=$("<label class='textbox-label textbox-label-before' style='text-align: right; height: 25px; line-height: 25px;'></label>");
		tag.label.html(o.label);
		tag.label.width(o.labelWidth-5);
		if(o.labelWidth == undefined){
			tag.label.hide();
		}
		o.traget.after(tag.label);
		tag.input0=$("<input class='easy-create-input datebox-f combo-f textbox-f' style='display: none;'>");
		tag.label.after(tag.input0);
		tag.span1= $("<span class='textbox combo'></span>");
		if(o.labelWidth == undefined){
			tag.span1.width(o.width-2);
		}else{
			tag.span1.width(o.width-o.labelWidth-2);
		}
		tag.span1.addClass(iconCls);
		tag.input0.after(tag.span1);
		tag.span2=$("<span class='textbox-addon textbox-addon-right' style='right: 0px; top: 0px;'>");
		tag.span2.appendTo(tag.span1);
		tag.btn = $("<a class='combo-arrow textbox-icon' icon-index='0' tabindex='-1' style='width: 18px; height: 23px;'></a>");
		tag.btn.appendTo(tag.span2);
		tag.input1=$("<input  class='textbox-text validatebox-text' readonly='readonly' autocomplete='off' tabindex='' placeholder='' style='margin: 0px 18px 0px 0px; padding-top: 0px; padding-bottom: 0px; height: 23px; line-height: 23px;width:90%;' type='text'>");
		//tag.input1.csswidth("auto");
		tag.input1.appendTo(tag.span1);
		
		o.tag=tag;
		//隐藏原有的文本框
		o.traget.hide();
	};
	
	//定义销毁函数
	//$.fn.jeasyupload.remove=function(o){
	$.fn.jeasy.code.removeTag=function(o){
		o.tag.label.remove();
		//o.tag.span1.addClass("rrrrr");
		o.tag.span1.remove();
		o.tag.input0.remove();
		o.tag.input1.remove();
		o.tag.span2.remove();
		//o.hideDiv.remove();
		//o.traget.remove();
	};
	
	//创建上传显示图标函数
	$.fn.jeasy.code.createImgTag = function(o,iconCls) {
		var tag = {};
		tag.label=$("<label class='textbox-label textbox-label-before' style='text-align: right; height: 25px; line-height: 25px;'></label>");
		tag.label.html(o.label);
		tag.label.width(o.labelWidth-5);
		o.traget.after(tag.label);
		tag.input0=$("<input class='easy-create-input datebox-f combo-f textbox-f' style='display: none;'>");
		tag.label.after(tag.input0);
		tag.span1= $("<span class='textbox combo'></span>");
		tag.span1.width(o.width-o.labelWidth-2);
		tag.span1.addClass(iconCls);
		tag.input0.after(tag.span1);
		tag.span2=$("<span class='textbox-addon textbox-addon-right' style='right: 0px; top: 0px;'>");
		tag.span2.appendTo(tag.span1);
		tag.btn = $("<a class='combo-arrow textbox-icon' icon-index='0' tabindex='-1' style='width: 18px; height: 23px;'></a>");
		tag.btn.appendTo(tag.span2);
		tag.input1=$("<span class='jupload-con'></span>");
		tag.input1.width(o.width-100);
		tag.input1.appendTo(tag.span1);
		
		o.tag=tag;
		//隐藏原有的文本框
		o.traget.hide();
	};
	
	/* 获取远程数据(异步) */
	$.fn.jeasy.code.ajaxasync=function(url,callback){
		$.ajax({  
			url : url, // 后台处理程序
			type : 'post', // 数据发送方式
			dataType : 'json', // 接受数据格式
			success : function(json){
				callback(json);
			},
			error:function(json) {
				debug("获取远程数据失败！");
				callback({total:0,rows:[]});
			}
		});
	};
	
	/* 获取远程数据(同步) */
	$.fn.jeasy.code.ajaxdata=function(url){
		var data={total:0,rows:[]};
		$.ajax({
			url : url, // 后台处理程序
			type : 'post', // 数据发送方式
			async : false, // 同步 等待ajax返回值
			dataType : 'json', // 接受数据格式
			success : function(json){
				data = json;
			},
			error:function(json) {
				debug("获取远程数据失败！");
				data = {total:0,rows:[]};
			}
		});
		return data;
	};
	
	// 私有函数：调试输出
	function debug(info) {
		if (window.console){window.console.log("debug[jeasycode] | " + info);}
	}
	
	// 闭包结束
})(jQuery);
	
//创建一个闭包  **********  弹出选择组件  ********﻿
(function($) {
	// 插件的定义
	$.fn.jeasycombo = function(options,param) {
		if (typeof options == "string") {
			var method = $.fn.jeasycombo.methods[options];
			if (method) {
				return method(this, param);
			} else {
				$.error('方法 ' + options + ' 不存在');
				return undefined;
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "jeasycombo");
			// 修改此处，使能加载多个单据页
			if (state) {
				$.extend(state.options, options);
			}else{
				$.data(this, "jeasycombo", {
					options : $.extend({}, $.fn.jeasycombo.defaults, options)
				});
				var o = $.data(this, "jeasycombo").options;
				o.traget = $(this);
				o.init(o);//初始化
			}
		});
	};

	// 插件的defaults
	$.fn.jeasycombo.defaults = {
		traget:undefined,//对象
		width:163,//自定义宽度
		dlgwidth:undefined,//自定义弹出框的宽度
		dlgheight:undefined,//自定义弹出框的高度
		url:undefined,//url
		data:{total:0,rows:[]},//data
		isselectfirst:false,//是否选中第一个
		multiple:false,//是否多选
		detail:false,//是否明细选择(树形)
		index:true,//是否有序号列
		onlybtn:false,//是否仅保留按钮不显示文本框
		isinline:true,//是否每行一个选项
		linenum:3,//当每行多个选项时，每一行选项的个数
		btn:undefined,//按钮
		btnclass:"btn-default",//按钮的样式、颜色
		type:"list",//显示样式
		idfield:"fid",//ID字段
		textfield:"fname",//名称字段
		codefield:"ftreecode",//编码/简码字段
		parentid:"fparentid",//父节点字段
		parentselect:true,//只返回父节点的值//当多选并且子节点全部选中时
		halfnodeselect:false,//只返回半选中的父节点的值//当多选并且有子节点选中时
		exceptroot:undefined,//排除的根节点 字符类型 格式["所有","全部"]
		checkclass:"combo-active",//选中时的样式
		comboclass:"combo-dialog",//弹出选择特有样式
		checked:new Array(),
		value:undefined,//默认值
		animatetime:200,//动画时间
		init:function(o){$.fn.jeasycombo.init(o);},
		disabled:function(o,v){$.fn.jeasycombo.disabled(o,v);},
		disable:false,
		onChange:function(ids,texts,codes){},//值改变事件
		beforeShow:function(){return true;},//弹出前事件
		submit:function(o){
			var values=o.body.getvalues();
			o.input.val(values.texts);
			o.input.attr("ids",values.ids);
			o.traget.val(values.ids);
			o.dialog.modal.dialog("close");
			o.onChange(values.ids,values.texts,values.codes);
		}
	};

	// 插件的methods
	$.fn.jeasycombo.methods = {
		// 返回属性对象
		options : function(jq) {
			return $.fn.jeasycombo.getOption(jq);
		},
		// 取值
		getvalue : function(jq) {
			var o = $.fn.jeasycombo.getOption(jq);
			//启用异步加载  当数据还未加载完成时先取文本框内的值
			if(o.body){
				return o.body.getvalues();	
			}else{
				return {ids:o.traget.val(),tests:""};
			}
		},
		// 设置值
		setvalue : function(jq,value) {
			var o = $.fn.jeasycombo.getOption(jq);
			//启用异步加载  当数据还未加载完成时先将值放入文本框内
			if(o.body){
				o.body.setvalues(value);
			}
			o.traget.val(value);
		},
		// 重新加载数据
		reload : function(jq,value) {
			var o = $.fn.jeasycombo.getOption(jq);
			if(o.tag){
				$.fn.jeasy.code.removeTag(o);}
			o.data=null;
			o.dialog=null;
			o.body=null;
			o.url = value;
			o.init(o);
		},
		// 重新加载数据(固定数据)
		reload_data : function(jq,value) {
			var o = $.fn.jeasycombo.getOption(jq);
			if(o.tag){
				$.fn.jeasy.code.removeTag(o);
			}
			o.dialog=null;
			o.body=null;
			o.url = null;
			o.data=value;
			o.init(o);
		},
		// 选中第一条
		selectfirst : function(jq,value) {
			var o = $.fn.jeasycombo.getOption(jq);
			o.isselectfirst=true;
			if(o.data && o.data.rows.length>0){
				var v = o.data.rows[0][o.idfield];
				if(o.body){
					o.body.setvalues(v+"");	
				}
			}
		},
		// 启用/禁用组件
		disabled : function(jq,value) {
			var o = $.fn.jeasycombo.getOption(jq);
			o.disabled(o,value);
		},
		destroy :  function(jq){
			var o = $.fn.jeasycombo.getOption(jq);
			$.fn.jeasy.code.removeTag(o);
		},
		show : function(jq){
			var o = $.fn.jeasycombo.getOption(jq);
			$.fn.jeasycombo.show(o);
		}
	};
	
	// 启用/禁用按钮
	$.fn.jeasycombo.disabled = function(o,value) {
		/*if(value){
			o.disable=true;
			o.input.attr("disabled","disabled");
			o.btn.attr("disabled","disabled");
			o.reset.attr("disabled","disabled");
		}else{
			o.disable=false;
			o.input.removeAttr("disabled");
			o.btn.removeAttr("disabled");
			o.reset.removeAttr("disabled");
		}*/
		o.disable=value;
		
	};
	
	//弹出选择框
	$.fn.jeasycombo.show = function(o){
		if(o.beforeShow()){
			var values=o.body.getvalues();
			o.input.attr("oldids",values.ids);
			//debug("初始oldids:" + o.input.attr("oldids"));
			o.dialog.modal.dialog("open");
		}
	};
	
	// 获取 Option 的方法
	$.fn.jeasycombo.getOption = function(jq) {
		var data = $.data(jq[0], "jeasycombo");
		if (data) {
			return data.options;
		} else {
			debug("属性未找到--jeasycombo--ID:" + jq.attr("id"));
			return undefined;
		}
	};

	// 定义初始化函数
	$.fn.jeasycombo.init = function(o) {
		//测试数据量较多的时候  目前1000条还可以 -- 刘一男
		//var begintime = new Date().getTime();
		
		//判断是否是只有一个按钮没有文本框的方式
		if (o.onlybtn) {
			//使用原来的按钮作为组件的触发器
			o.btn = o.traget;
			o.input = $('<input type="hidden" />');
		}else{
			//创建新的文本框
			$.fn.jeasy.code.createTag(o,"jeasybox");
			o.btn = o.tag.btn;
			o.input = o.tag.input1;//页面显示的文本框
			o.traget.hide();
			//绑定清除按钮事件
			/*o.reset.click(function(){
				o.body.setvalues("");
				o.onChange("","");
			});*/
		}
		
		//创建功能按钮
		var buttons = [{
			text:$.fn.jeasy.local.btn_sure,//确认按钮
			iconCls:"icon-ok",
			handler:function(){
				var values=o.body.getvalues();
				o.input.val(values.texts);
				o.input.attr("ids",values.ids);
				o.traget.val(values.ids);
				o.dialog.modal.dialog("close");
				o.onChange(values.ids,values.texts,values.codes);
			}
		},{
			text:$.fn.jeasy.local.btn_cancel,//取消按钮
			iconCls:"icon-cancel",
			handler:function(){
				var oldids = o.input.attr("oldids");
				o.body.setvalues(oldids);	
				var values=o.body.getvalues();
				o.input.val(values.texts);
				o.input.attr("ids",values.ids);
				o.traget.val(values.ids);
				o.dialog.modal.dialog("close");
			}
		}];
		
		var afterShow = function(){
			//添加检索功能
			if (o.type=="list" && !o.dialog.body.next().hasClass("hasSerach")) {
				var search = $("<input class='form-control input-sm jboot-combo-search' type='text' placeholder='检索-按回车键检索'/>");
				//o.dialog.footer.attr("ggg","hhh");
				o.dialog.body.next().prepend(search);
				search.change(function(){
					var s = search.val();
					debug(s);
					//$(“li:contains(‘” + index + “‘)”).prependTo(parent).addClass(‘on’);
					o.body.filter(s);
				});
				o.dialog.body.next().addClass("hasSerach");
			}
			
			//添加全选按钮
			if(o.multiple && o.type=="list" && !o.dialog.body.next().hasClass("hasCheckAll")){
				var btn_checkall = $('<span class="checkbox conbo-checkall"><ins></ins><span></span></span>');
				btn_checkall.find("span").text($.fn.jeasy.local.btn_checkall);
				//btn_checkall.appendTo(o.dialog.header);
				//o.dialog.footer.prepend(btn_checkall);
				o.dialog.body.next().prepend(btn_checkall);
				
				btn_checkall.click(function(){
					//debug("全选");
					var ico = btn_checkall.find("ins");
					if(!ico.hasClass("checked")){
						ico.addClass("checked");
						btn_checkall.addClass(o.checkclass);
						o.body.checkall();
					}else{
						ico.removeClass("checked");
						btn_checkall.removeClass(o.checkclass);
						o.body.uncheckall();
					}
				});
				o.dialog.body.next().addClass("hasCheckAll");
			}
		}
		
		//回调函数-在数据加载完成后执行
		var callback = function(json){
			if(json){
				o.data=json;
			}
			//创建弹出框
			o.dialog = $.fn.jeasy.code.dialog_list(afterShow,buttons,$.fn.jeasy.local.dialog_title_list,o.dlgwidth,o.dlgheight);
			//创建选项
			if (o.type=="list") {
				o.body = $.fn.jeasycombo.init_list(o);
			}else if (o.type=="grid") {
				o.body = $.fn.jeasycombo.init_grid(o);
			}else if (o.type=="tree") {
				o.body = $.fn.jeasycombo.init_tree(o);
			}else if(o.type=="tree-lazy"){
				o.body = $.fn.jeasycombo.init_tree_lazy(o);
			}
			//装载选项
			o.dialog.body.append(o.body.panel);
			//绑定弹出按钮事件
			o.btn.click(function(){
				if(o.disable){
					return false;
				}
				$.fn.jeasycombo.show(o);
			});
			
			//绑定窗口关闭事件
			o.dialog.modal.dialog({
				onClose : function(){
					/*var oldids = o.input.attr("ids");
					o.body.setvalues(oldids);	
					var values=o.body.getvalues();
					o.input.val(values.texts);
					o.input.attr("ids",values.ids);
					o.traget.val(values.ids);*/
				}
			});
			
			//初始化值
			if(o.isselectfirst){//选中第一个选项
				if(o.data.rows.length>0){
					var v = o.data.rows[0][o.idfield];
					if(o.body){
						o.body.setvalues(v+"");	
					}
				}
			}else{//选中指定的选项
				var value = o.traget.val();
				//debug("默认值是："+value);
				if(value && value.length>0){
					o.body.setvalues(value);
				}
			}
		};
		
		//判断url
		if(o.url && o.type!="tree-lazy"){
			$.fn.jeasy.code.ajaxasync(o.url,callback);
		}else{
			callback(o.data);
		}
		
		//var endtime = new Date().getTime();
		//debug("弹出组件总共用时："+(endtime-begintime)+"(毫秒)"+"  数据量："+o.data.rows.length);
	};
	
	// 定义表格初始化函数
	$.fn.jeasycombo.init_grid = function(o){
		var table = {
			panel:$('<div class="dayo-combo-panel"></div>'),
			table:$('<table class="table table-bordered table-hover table-condensed">'),
			thead:$('<thead></thead>'),
			tbody:$('<tbody></tbody>'),
			tr:'<tr></tr>',
			th:'<th></th>',
			td:'<td></td>',
			hide:'<td class="dayo-hide"></td>',
			getvalues:function(){
				
			}
		};
		//组装基本表格
		table.table.append(table.thead);
		table.table.append(table.tbody);
		table.table.appendTo(table.panel);
		//组装表头
		var htr=$(table.tr);
		//是否多选
		if(o.multiple){
			var hcheckbox=$('<th class="dayo-grid-check"><input type="checkbox"></th>');
			htr.append(hcheckbox);
		}
		//是否有序号列
		if(o.index){
			var hindex=$('<th class="dayo-grid-index"></th>').text($.fn.jboot.local.grid_index);
			htr.append(hindex);
		}
		//ID列
		htr.append($(table.th).css({"display":"none"}));
		//名称列
		htr.append($(table.th).text($.fn.jboot.local.grid_name));
		//简码列
		htr.append($(table.th).text($.fn.jboot.local.grid_code));
		htr.appendTo(table.tbody);
		
		//组装表内容
		var list=o.data.rows;
		for (var i = 0; i < list.length; i++) {
			var row = list[i];
			var btr=$(table.tr);
			//是否多选
			if(o.multiple){
				var bcheckbox=$('<td class="dayo-grid-check"><input type="checkbox"></td>');
				btr.append(bcheckbox);
			}
			//是否有序号列
			if(o.index){
				var bindex=$('<td class="dayo-grid-index"></td>').text(i+1);
				btr.append(bindex);
			}
			btr.append($(table.hide).text(row[o.idfield]));
			btr.append($(table.td).text(row[o.textfield]));
			btr.append($(table.td).text(row[o.codefield]));
			btr.appendTo(table.tbody);
		}
		return table;
	};
	
	// 定义列表初始化函数
	$.fn.jeasycombo.init_list = function(o){
		var l = {
			panel:$('<div class="dayo-combo-panel"></div>'),
			item:'<div class="radio-c j-item" name="combo" value="[@id]" code="[@code]"><ins></ins><span>[@text]</span></div>',
			checkbox:'<div class="checkbox-c j-item" name="combo" value="[@id]" code="[@code]"><ins></ins><span>[@text]</span></div>',
			btntype:".radio-c",//选项样式
			_checked:o.checkclass,//选中项样式
			_checked_ico:"checked",//选中项图标样式
			_hover:"btn-info",//选项鼠标悬浮样式
			_hover_ico:"hover",//选项图标鼠标悬浮样式
			checkall:function(){//全选
				var items = this.panel.find(this.btntype);
				items.find("ins").addClass(this._checked_ico);
				items.addClass(this._checked);
			},
			uncheckall:function(){//全不选
				var items = this.panel.find(this.btntype);
				items.find("ins").removeClass(this._checked_ico);
				items.removeClass(this._checked);
			},
			filter:function(key){//过滤选项
				key = $.trim(key);
				var items = this.panel.find(this.btntype);
				if(key==""){
					items.show();
					return;
				}
				items.hide();
				var f_items = this.panel.find(this.btntype+":Contains('" + key + "')");
				f_items.show();
			},
			getvalues:function(){//获取值
				//var begintime = new Date().getTime();
				var ids=new Array();
				var texts=new Array();
				var codes=new Array();
				this.panel.find("div."+this._checked).each(function(){
					ids.push($(this).attr("value"));
					texts.push($(this).find("span").text());
					codes.push($(this).attr("code"));
				});
				var values={ids:ids.join(","),texts:texts.join(","),codes:codes.join(",")};
				//var endtime = new Date().getTime();
				//debug("获取选中项的值总共用时："+(endtime-begintime)+"(毫秒)");
				return values;
			},
			setvalues:function(value){//设置值
				//数据量(value)为 10000时 约2-10毫秒 
				//var begintime = new Date().getTime();
				value = value+"";
				var ids=value.split(",");
				//将所有选项设置为非选中状态
				var items = this.panel.find(this.btntype);
				items.find("ins").removeClass(this._checked_ico);
				items.removeClass(this._checked);
				var _checked_ico=this._checked_ico;
				var _checked=this._checked;
				
				var texts=new Array();
				//循环选项 将传进来的值设置为选中状态
				items.each(function(){
					var $this = $(this);
					var id = $this.attr("value");
					for (var i = 0; i < ids.length; i++) {
						if(id==ids[i]){
							$this.find("ins").addClass(_checked_ico);
							$this.addClass(_checked);
							texts.push($this.find("span").text());
							break;
						}
					}
				});
				o.input.val(texts.join(","));
				o.input.attr("ids",ids.join(","));
				//var endtime = new Date().getTime();
				//debug("设置组件的值总共用时："+(endtime-begintime)+"(毫秒)");
			}
		};
		//是否多选
		if(o.multiple){
			l.item = l.checkbox;
			l.btntype=".checkbox-c";
		}
		
		//组装内容
		var linediv = {};
		if(!o.isinline){//一行显示多个选项时
			var line_width = (100/o.linenum);
			line_width = line_width+"%";
			for ( var i = 0; i < o.linenum; i++) {
				var col = $("<div class='jboot-combo-col'> </div>").appendTo(l.panel);
				col.css("width",line_width);
				linediv[i] = col;
			}
		}
		for (var i = 0; i < o.data.rows.length; i++) {
			var row = o.data.rows[i];
			var itemrow = l.item.replace("[@id]",row[o.idfield]);
			itemrow = itemrow.replace("[@text]",row[o.textfield]);
			itemrow = itemrow.replace("[@code]",row[o.codefield]);
			itemrow=$(itemrow);
			if(!o.isinline){//一行显示多个选项
				itemrow.addClass("notinline");
				var n = i%o.linenum;
				linediv[n].append(itemrow);
			}else{
				l.panel.append(itemrow);
			}
		}
		
		l.panel.append("<div class='clearfix'></div>");
		//绑定选项的单击事件
		l.panel.find(l.btntype).click(function(){
			var $this = $(this);
			var ico = $this.find("ins");
			var row = {
				id:$this.attr("value"),
				text:$this.text()
			};
			if(o.multiple){//多选效果
				if(!ico.hasClass(l._checked_ico)){
					ico.addClass(l._checked_ico);
					$this.addClass(l._checked);
				}else{
					ico.removeClass(l._checked_ico);
					$this.add(l._hover);
					$this.removeClass(l._checked);
				}
			}else{//单选效果
				var items = l.panel.find(l.btntype);
				items.find("ins").removeClass(l._checked_ico);
				items.removeClass(l._checked);
				ico.addClass(l._checked_ico);
				$this.removeClass(l._hover);
				$this.addClass(l._checked);
			}
		}).dblclick(function(){
			//双击事件-只在单选时生效
			if(!o.multiple){
				o.submit(o);
			}
		});
		return l;
	};
	
	// 定义树形初始化函数（一次性加载数据）
	$.fn.jeasycombo.init_tree = function(o){
		var t = {
			panel:$('<div class="dayo-combo-panel"></div>'),
			ul:'<ul></ul>',
			_item:"div.tree-item",//选项样式
			_checked:"tree-active",//选中项样式
			_checked_ico:"checked",//选中项图标样式
			_hover:"btn-info",//选项鼠标悬浮样式
			_hover_ico:"hover",//选项图标鼠标悬浮样式
			_checkbox0:"tree-checkbox0",
			_checkbox1:"tree-checkbox1",
			_checkbox2:"tree-checkbox2",
			_checkPass:"checkPass",//忽略选择，只在返回父节点值时生效
			checkall:function(){//全选
			},
			uncheckall:function(){//全不选
			},
			getcodes:function(){//获取编码
				return this.panel.find("div."+this._checked).map(function(){
					return $(this).attr("code");
				}).get().join(",");
			},
			getvalues:function(){//获取值
				//var begintime = new Date().getTime();
				
				var ids=new Array();
				var texts=new Array();
				var codes=new Array();
				
				if(o.multiple){
					var _checkPass=this._checkPass;
					var _checkbox1=this._checkbox1;
					var checklist;
					if(o.halfnodeselect){
						checklist = this.panel.find("i."+this._checkbox1+",i."+this._checkbox2);
					}else{
						checklist = this.panel.find("i."+this._checkbox1);
					}
					checklist.removeClass(this._checkPass);
					checklist.each(function(){
						if(o.exceptroot!=undefined){
							for(var i=0;i<exceptroot.length;i++){
								if($(this).attr("name")==exceptroot[i]){
									return;
								}
							}
						}
						
						//判断是否只返回父节点的值
						if(o.parentselect){
							if($(this).hasClass(_checkPass)){
								return;
							}
							var parentbox = $(this).parent().parent().parent().prev().find("i.check");
							if(parentbox.hasClass(_checkbox1)){
								$(this).parent().parent().parent().parent().find("i.check").addClass(_checkPass);
								return;
							}
						}
						ids.push($(this).parent().attr("value"));
						texts.push($(this).parent().find("itxt").text());
						codes.push($(this).parent().attr("code"));
					});
				}else{
					this.panel.find("div."+this._checked).each(function(){
						ids.push($(this).attr("value"));
						texts.push($(this).find("itxt").text());
						codes.push($(this).attr("code"));
					});
				}
				var values={ids:ids.join(","),texts:texts.join(","),codes:codes.join(",")};
				
				//var endtime = new Date().getTime();
				//debug("获取选中项的值总共用时："+(endtime-begintime)+"(毫秒)");
				return values;
			},
			setvalues:function(value){//设置值
				//未测试具体消耗时间
				//var begintime = new Date().getTime();
				value = value+"";
				var ids=value.split(",");
				//将所有选项设置为非选中状态
				var items = this.panel.find(this._item).removeClass(this._checked);
				this.panel.find("i.check").removeClass(this._checkbox1)
				.removeClass(this._checkbox2).addClass(this._checkbox0);
				
				var _checked=this._checked;
				var _checkbox0=this._checkbox0;
				var _checkbox1=this._checkbox1;
				var texts=new Array();
				
				//递归展开节点
				var tree_expanded = function(item){
					var pul = item.parent().parent().parent().parent();
					var pitem = pul.find(_checked).eq(0);
					//var pitem = item.closest("ul.jboot-tree").prev();
					//var pul = pitem.closest("ul.jboot-tree");
					var i = pitem.find("i").eq(0);
					if(i.hasClass("tree-collapsed")){
						i.click();
					}
					if(!pul.hasClass("jboot-tree")){
						tree_expanded(pitem);
					}
				};
				
				//循环选项 将传进来的值设置为选中状态
				items.each(function(){
					var $this = $(this);
					var id = $this.attr("value");
					for (var i = 0; i < ids.length; i++) {
						if(id==ids[i]){
							if(!o.multiple){
								$this.addClass(_checked);
							}
							var checkbox = $this.find("i.check");
							//判断是否只返回父节点的值
							if(o.parentselect){
								checkbox = $this.parent().find("i.check");
							}
							checkbox.toggleClass(_checkbox0);
							checkbox.toggleClass(_checkbox1);
							texts.push($this.find("itxt").text());
							break;
						}
					}
				});
				o.input.val(texts.join(","));
				o.input.attr("ids",ids.join(","));
				//var endtime = new Date().getTime();
				//debug("设置组件的值总共用时："+(endtime-begintime)+"(毫秒)");
			}
		};
		
		//第二种方案   tree-check-[n] n是父节点的ID
		
		//判断是否选择 给父节点的复选框修改样式
		t.changeCheckType = function(root){
			var ul = root.find("ul").eq(0);
			var li = ul.find(" > li");
			
			var allCheck = true;
			var hasCheck = false;
			li.each(function(){
				var check =$(this).find("div.tree-item i.check").eq(0);
				var tx =$(this).find("div.tree-item itxt");
				
				var check_state = t.changeCheckType(li);
				if(check_state.allCheck){//如果全选
					check.removeClass(t._checkbox0);
					check.removeClass(t._checkbox2);
					check.addClass(t._checkbox1);
				}else{
					if(check_state.hasCheck){//至少有一个选项
						check.removeClass(t._checkbox0);
						check.removeClass(t._checkbox1);
						check.addClass(t._checkbox2);
					}else{
					}
				}
				
				if(check.hasClass(t._checkbox1)){
					hasCheck=true;
				}else{
					allCheck=false;
				}
			});
			return {allCheck:allCheck,hasCheck:hasCheck};
		};
		
		//添加一项li
		var addTreeItem = function(data,item,o,u){
			var l = {
				get_ul:function(){
					return u;
				},
				check_state:function(){//判断选中状态
					var state = t._checkbox1;
					if(this.child){
						//如果有子节点 则判断所有子节点的状态后再返回值
						state = this.child.isAllCheck();
						this.check_box.removeClass(t._checkbox0);
						this.check_box.removeClass(t._checkbox1);
						this.check_box.removeClass(t._checkbox2);
						this.check_box.addClass(state);
					}
					//判断当前节点处于什么状态
					if(this.check_box.hasClass(t._checkbox1)){
						return t._checkbox1;//选中
					}else if(this.check_box.hasClass(t._checkbox2)){
						return t._checkbox2;//半选中
					}else{
						return t._checkbox0;//未选中
					}
				}
			};
			
			l.li = $("<li class='tree-item'></li>");
			l.div = $("<div class='tree-item'></div>");
			l.div.attr("value",item[o.idfield]);//值
			l.div.attr("code",item[o.codefield]);//编码
			l.a_ico = $("<i></i>").appendTo(l.div);//箭头图标
			l.f_ico = $("<i class='tree-file tree-ico'></i>").appendTo(l.div);//文件图标
			if(o.multiple){
				l.check_box = $("<i class='check "+t._checkbox0+"' name='"+item[o.textfield]+"'></i>");
				l.div.append(l.check_box);//复选框
				//brother.push(check_box);
			}
			$("<itxt>"+item[o.textfield]+"</itxt>").appendTo(l.div);//文字
			l.div.appendTo(l.li);
			//绑定选中事件
			l.div.click(function(){
				var $this = $(this);
				//var ico = $this.find("i.tree-ico").eq(0);
				if(o.detail){// 明细节点选择
					if(l.f_ico.hasClass("tree-folder") || l.f_ico.hasClass("tree-folder-open")){
						return;
					}
				}
				t.panel.find("div.tree-item").removeClass(t._checked);
				$this.addClass(t._checked);
				if(o.multiple){
					//var checkbox = $this.find("i.check");
					l.check_box.toggleClass(t._checkbox0);
					l.check_box.toggleClass(t._checkbox1);
					if(l.check_box.hasClass(t._checkbox1)){
						$this.parent().find("i.check").removeClass(t._checkbox0).removeClass(t._checkbox2).addClass(t._checkbox1);
					}else{
						$this.parent().find("i.check").removeClass(t._checkbox1).removeClass(t._checkbox2).addClass(t._checkbox0);
					}
					t.allNode.isAllCheck();
				}
			}).dblclick(function(){
				//双击事件-只在单选时生效
				if(!o.multiple){
					o.submit(o);
				}
			});
			
			u.ul.append(l.li);
			//递归生成树
			l.child = addToTree(data,item[o.idfield],l);
			return l;
		};
		
		//生成 ul
		var addToTree = function(data,id,parent){
			var u = {
				parentid:id,
				get_li:function(){return id==0?null:parent;},
				isAllCheck:function(){
					//判断当前ul下的节点是否全部被选中
					var allCheck = true;
					var hasCheck = false;
					for ( var i = 0; i < this.brother.length; i++) {
						var state = this.brother[i].check_state();
						if(state==t._checkbox1){//选中
							hasCheck = true;
						}else if(state==t._checkbox2){//半选中
							hasCheck = true;
							allCheck = false;
						}else if(state==t._checkbox0){//未选中
							allCheck = false;
						}
					}
					//判断最终的状态
					if(allCheck){
						return t._checkbox1;
					}else if(hasCheck && allCheck==false){
						return t._checkbox2;
					}else if(hasCheck==false){
						return t._checkbox0;
					}
				} 
			};
			u.ul = $("<ul class='jboot-tree'></ul>");
			var flag = false;
			if(!data){
				return null;
			}
			u.brother = new Array();
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
				//debug("ID："+item[o.idfield]+"  Name:"+item[o.textfield]);
				if(item[o.parentid]==id){
					var l = addTreeItem(data,item,o,u);
					u.brother.push(l);
					flag = true;
				}
			}
			if(flag){
				if(id!=0){
					//除了根节点的情况 全部收起并添加事件
					//--暂时展开第一级节点-刘一男2015-11-5 22:46:28
					if(u.get_li() && u.get_li().get_ul().parentid!=0){
						u.ul.css({"display":"none"});
						parent.a_ico.addClass("tree-collapsed");//收起状态
					}else{
						parent.a_ico.addClass("tree-expanded");//展开状态
					}
					//将有子节点的修改为文件夹图标
					parent.f_ico.removeClass("tree-file").addClass("tree-folder");
					if(o.detail){
						//如果是明细选择去掉非叶子节点的复选框
						if(parent.check_box!=undefined){
							parent.check_box.remove();
						}
						parent.div.unbind();
					}
					
					//给有子节点的项的箭头图标添加事件
					parent.a_ico.click(function(event){
						var $this = $(this);
						var child = $this.parent().parent().find("ul").eq(0);
						if($this.hasClass("tree-collapsed")){
							child.show(o.animatetime);//展开节点
						}else{
							child.hide(o.animatetime);//关闭节点
						}
						$this.toggleClass('tree-collapsed');
						$this.toggleClass('tree-expanded');
						parent.f_ico.toggleClass('tree-folder');
						parent.f_ico.toggleClass('tree-folder-open');
						event.stopPropagation();
					});
					u.ul.appendTo(parent.li);
				}else{
					u.ul.appendTo(parent);
				}
				return u;
			}
			return null;
		};
		
		t.allNode = addToTree(o.data.rows,0,t.panel);
		return t;
	};
	
	// 定义树形初始化函数（展开时加载数据，不支持多选）
	$.fn.jeasycombo.init_tree_lazy = function(o){
		var t = {
			panel:$('<div class="dayo-combo-panel"></div>'),
			ul:'<ul></ul>',
			_item:"div.tree-item",//选项样式
			_checked:"tree-active",//选中项样式
			_checked_ico:"checked",//选中项图标样式
			_hover:"btn-info",//选项鼠标悬浮样式
			_hover_ico:"hover",//选项图标鼠标悬浮样式
			checkall:function(){//全选
			},
			uncheckall:function(){//全不选
			},
			getvalues:function(){//获取值
				//var begintime = new Date().getTime();
				
				var ids=new Array();
				var texts=new Array();
				this.panel.find("div."+this._checked).each(function(){
					ids.push($(this).attr("value"));
					texts.push($(this).find("itxt").text());
				});
				var values={ids:ids.join(","),texts:texts.join(",")};
				
				//var endtime = new Date().getTime();
				//debug("获取选中项的值总共用时："+(endtime-begintime)+"(毫秒)");
				return values;
			},
			setvalues:function(value){//设置值
				//未测试具体消耗时间
				//var begintime = new Date().getTime();
				
				var ids=value.split(",");
				//将所有选项设置为非选中状态
				var items = this.panel.find(this._item);
				items.removeClass(this._checked);
				var _checked=this._checked;
				var texts=new Array();
				
				//递归展开节点
				var tree_expanded = function(item){
					var pul = item.parent().parent().parent();
					var pitem = pul.find(_checked).eq(0);
					var i = pitem.find("i").eq(0);
					if(i.hasClass("tree-collapsed")){
						i.click();
					}
					if(!pul.hasClass("jboot-tree")){
						tree_expanded(pitem);
					}
				};
				
				//循环选项 将传进来的值设置为选中状态
				items.each(function(){
					var $this = $(this);
					var id = $this.attr("value");
					for (var i = 0; i < ids.length; i++) {
						if(id==ids[i]){
							$this.addClass(_checked);
							texts.push($this.find("itxt").text());
							break;
						}
					}
				});
				o.input.val(texts.join(","));
				
				//var endtime = new Date().getTime();
				//debug("设置组件的值总共用时："+(endtime-begintime)+"(毫秒)");
			}
		};
		
		//创建树节点
		var createTreeNode = function(item){
			var li = $("<li class='tree-item'></li>");
			var titem = $("<div class='tree-item'></div>");
			titem.attr("value",item[o.idfield]);//值
			titem.append("<i></i>");//箭头图标
			titem.append("<i class='tree-file'></i>");//文件图标
			titem.append("<itxt>"+item[o.textfield]+"</itxt>");//文字
			titem.appendTo(li);
			//绑定选中事件
			titem.click(function(){
				t.panel.find("div.tree-item").removeClass(t._checked);
				$(this).addClass(t._checked);
			}).dblclick(function(){
				//双击事件-只在单选时生效
				if(!o.multiple){
					o.submit(o);
				}
			});
			if(item.state=="closed"){
				//将有子节点的修改为文件夹图标
				var ico = titem.find("i.tree-file").eq(0).removeClass("tree-file").addClass("tree-folder");
				//给有子节点的项的箭头图标添加事件
				titem.find("i").eq(0).addClass("tree-collapsed").click(function(event){
					var $this = $(this);
					//判断是否已加载了数据
					if($this.hasClass("load")){
						var child = $this.parent().parent().find("ul").eq(0);
						if($this.hasClass("tree-collapsed")){
							child.show(o.animatetime);//展开节点
						}else{
							child.hide(o.animatetime);//关闭节点
						}
					}else{
						$this.addClass("load");
						loadData(item[o.idfield],li);
					}
					$this.toggleClass('tree-collapsed');
					$this.toggleClass('tree-expanded');
					ico.toggleClass('tree-folder');
					ico.toggleClass('tree-folder-open');
					event.stopPropagation();
				});
			}
			return li;
		};
		
		//循环创建
		var loadData = function(id,parent){
			var url = "";
			var data = {total:0,rows:[]};
			if(o.initdata && id==0){
				data = o.initdata;
			}else{
				url = o.url.replace("[@id]",id);
				debug(url);
				data = $.fn.jeasy.code.ajaxdata(url);//同步获取数据
			}
			var pul = $("<ul class='jboot-tree'></ul>");
			for ( var i = 0; i < data.rows.length; i++) {
				var item = data.rows[i];
				//debug("ID："+item[o.idfield]+"  Name:"+item[o.textfield]);
				pul.append(createTreeNode(item));
			}
			pul.hide();//隐藏节点
			pul.appendTo(parent);
			pul.show(o.animatetime);//展开节点
		};
		
		loadData(0,t.panel);
		return t;
	};
	
	// 私有函数：调试输出
	function debug(info) {
		if (window.console){window.console.log("debug[jeasycombo] | " + info);}
	}
	
	// 闭包结束
})(jQuery);

//创建一个闭包  **********  文件上传组件  ********
(function($) {
	// 插件的定义
	$.fn.jeasyupload = function(options,param) {
		if (typeof options == "string") {
			var method = $.fn.jeasyupload.methods[options];
			if (method) {
				return method(this, param);
			} else {
				$.error('方法 ' + options + ' 不存在');
				return undefined;
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "jeasyupload");
			if (state) {
				$.extend(state.options, options);
			}else{
				$.data(this, "jeasyupload", {
					options : $.extend({}, $.fn.jeasyupload.defaults, options)
				});
				var o = $.data(this, "jeasyupload").options;
				o.traget = $(this);
				o.init(o);//初始化
			}
		});
	};

	// 插件的defaults
	$.fn.jeasyupload.defaults = {
		tag:{},
		fileserverpath:undefined,
		traget:undefined,//对象
		btn:undefined,
		url : undefined,//url
		data : undefined,//data
		multiple:false,//是否多选
		imgurl:false,//是否显示连接
		stockimg:false,//砍价商品图片专用
		adimg:false,//砍价广告图片专用
		adurl:undefined,
		id:undefined,
		label:"默认标题",
		labelWidth:80,
		width:150,
		maximg:999,
		type:"image",// image:显示图片,text:显示路径 
		placeholder:"广告",
		init:function(o){
			$.fn.jeasyupload.init(o);
		},
		//设置值
		setValues:function(o,data){
			$.fn.jeasyupload.setValues(o,data);
		},
		//上传后回调函数
		afterupload:function(o,data){
			$.fn.jeasyupload.afterupload(o,data);
		},
		//自定义文件后处理事件
		afterCustomerImg:function(i,file,o){
			
		},
		//自定义文件处理
		customImg:function(i,file,o){
			if(o.type=="text"){
				o.traget.val(file.relativeurl);
				o.tag.input1.val(file.relativeurl);
			}else{
				if(!o.multiple){
					o.tag.input1.empty();
				}
				var imgs = o.tag.input1.find(".jupload-img");
				if(imgs.length>=o.maximg){
					$.messager.alert("提示", "图片数量不能超过"+o.maximg+"张", "warning");
					return ;
				}
				var pnl = $("<span class='jupload-pnl'></span>");
				var del = $("<span class='jupload-del' title='删除'></span>");
				var img = $("<img  class='jupload-img'/>");
				var div = $("<div class='easy-input-line'></div>");
				var input = $("<input class='dayo-input-link-ad linkdiv' placeholder='"+o.placeholder+"链接（左起第"+parseInt(imgs.length+1)+"个"+o.placeholder+"图片）'/>");
				img.attr("src",file.url);
				img.attr("relativeurl",file.relativeurl);
				img.appendTo(pnl);
				del.appendTo(pnl);
				o.tag.input1.append(pnl);
				if(o.stockimg){
					//添加到模板页面
					var mobdiv=$("<div class='swiper-slide'></div>");
					var mobimg=$("<img src='"+file.url+"' style='width: 255px;height: 250px;' title='商品图片' act='商品图片'/>");
					mobimg.appendTo(mobdiv);
					swiper.appendSlide(mobdiv); //加到Swiper的最后
				}
				if(o.adimg){
					//添加到模板页面
					var mobdiv=$("<div class='swiper-slide'></div>");
					var mobimg=$("<img src='"+file.url+"' style='width: 255px;height: 250px;' title='商品图片' act='商品图片'/>");
					mobimg.appendTo(mobdiv);
					swiper2.appendSlide(mobdiv); //加到Swiper的最后
				}
				del.click(function(){
					pnl.remove();
					if(o.stockimg){
						mobdiv.remove();
					}
					if(o.adimg){
						mobdiv.remove();
					}
					//如果删除链接重新计算
					if(o.imgurl){
						div.remove();
						$(".linkdiv").each(function(i){
							$(this).attr("placeholder",""+o.placeholder+"链接（左起第"+(i+1)+"个"+o.placeholder+"图片）");
							if(i+1==1){
								$(".ffollow").attr("style","position: relative;top:255px;display: block;");
							}else if(i+1==2){
								$(".ffollow").attr("style","position: relative;top:295px;display: block;");
							}else if(i+1==3){
								$(".ffollow").attr("style","position: relative;top:335px;display: block;");
							}
						});
						if($(".linkdiv").length==0){
							$(".ffollow").attr("style","position: relative;top:213px;display: block;");
						}
					}
					$.fn.jeasyupload.getValue(o);
				});
				$.fn.jeasyupload.getValue(o);
				//显示连接
				if(o.imgurl){
					div.append(input);
					$(o.adurl).append(div);
					if(parseInt(imgs.length+1)==1){
						$(".ffollow").attr("style","position: relative;top:255px;display: block;");
					}else if(parseInt(imgs.length+1)==2){
						$(".ffollow").attr("style","position: relative;top:295px;display: block;");
					}else if(parseInt(imgs.length+1)==3){
						$(".ffollow").attr("style","position: relative;top:335px;display: block;");
					}
				}
			}
		}
	};

	// 插件的methods
	$.fn.jeasyupload.methods = {
		// 返回属性对象
		options : function(jq) {
			return $.fn.jeasyupload.getOption(jq);
		},
		select : function(jq) {
			var o = $.fn.jeasyupload.getOption(jq);
			o.select();
		},
		destroy :  function(jq){
			var o = $.fn.jeasyupload.getOption(jq);
			$.fn.jeasy.code.removeTag(o);
		},
		setValue : function(jq,value){
			var o = $.fn.jeasyupload.getOption(jq);
			$.fn.jeasyupload.setValue(o,value);
		},
		setValueAd : function(jq,value){
			var o = $.fn.jeasyupload.getOption(jq);
			$.fn.jeasyupload.setValueAd(o,value);
		}
	};
	//上传框设置值
	$.fn.jeasyupload.setValue=function(o,value){
		o.traget.val(value);
		if(o.type=="text"){
			o.tag.input1.val(value);
		}else{
			o.tag.input1.empty();
			if(value&&value!=""){
				var pnl = $("<span class='jupload-pnl'></span>");
				var del = $("<span class='jupload-del' title='删除'></span>");
				var img = $("<img  class='jupload-img'/>");
				//console.log(file.url);
				img.attr("src",o.fileserverpath+value);
				img.attr("relativeurl",value);
				img.appendTo(pnl);
				del.appendTo(pnl);
				o.tag.input1.append(pnl);
				del.click(function(){
					pnl.remove();
					$.fn.jeasyupload.getValue(o);
				});
				$.fn.jeasyupload.getValue(o);
			}
		}
	};
	//上传框设置值(广告图片专用)
	$.fn.jeasyupload.setValueAd=function(o,value){
		var setValue = function(i,imgurl,adurl){
			o.traget.val(imgurl);
			var imgs = o.tag.input1.find(".jupload-img");
			var pnl = $("<span class='jupload-pnl'></span>");
			var del = $("<span class='jupload-del' title='删除'></span>");
			var img = $("<img  class='jupload-img'/>");
			var div = $("<div class='easy-input-line'></div>");
			var input = $("<input class='dayo-input-link-ad linkdiv' placeholder='广告链接（左起第"+parseInt(i+1)+"个广告图片）' value='"+(adurl==undefined?"":adurl)+"'/>");
			img.attr("src",o.fileserverpath+imgurl);
			img.attr("relativeurl",imgurl);
			img.appendTo(pnl);
			del.appendTo(pnl);
			o.tag.input1.append(pnl);
			if(o.stockimg){
				//添加到模板页面
				var mobdiv=$("<div class='swiper-slide'></div>");
				var mobimg=$("<img src='"+o.fileserverpath+fadimgs[i]+"' style='width: 255px;height: 250px;' title='商品图片' act='商品图片'/>");
				mobimg.appendTo(mobdiv);
				swiper.appendSlide(mobdiv); //加到Swiper的最后
			}
			if(o.adimg){
				//添加到模板页面
				var mobdiv=$("<div class='swiper-slide'></div>");
				var mobimg=$("<img src='"+o.fileserverpath+fadimgs[i]+"' style='width: 255px;height: 250px;' title='商品图片' act='商品图片'/>");
				mobimg.appendTo(mobdiv);
				swiper2.appendSlide(mobdiv); //加到Swiper的最后
			}
			del.click(function(){
				pnl.remove();
				//如果删除链接重新计算
				div.remove();
				if(o.stockimg){
					mobdiv.remove();
				}
				if(o.adimg){
					mobdiv.remove();
				}
				$(".linkdiv").each(function(i){
					$(this).attr("placeholder",""+o.placeholder+"链接（左起第"+(i+1)+"个"+o.placeholder+"图片）");
					if(i+1==1){
						$(".ffollow").attr("style","position: relative;top:255px;display: block;");
					}else if(i+1==2){
						$(".ffollow").attr("style","position: relative;top:295px;display: block;");
					}else if(i+1==3){
						$(".ffollow").attr("style","position: relative;top:335px;display: block;");
					}
				});
				if($(".linkdiv").length==0){
					$(".ffollow").attr("style","position: relative;top:213px;display: block;");
				}
				$.fn.jeasyupload.getValue(o);
			});
			$.fn.jeasyupload.getValue(o);
			//显示连接
			if(o.imgurl){
				div.append(input);
				$(o.adurl).append(div);
				if(parseInt(imgs.length+1)==1){
					$(".ffollow").attr("style","position: relative;top:255px;display: block;");
				}else if(parseInt(imgs.length+1)==2){
					$(".ffollow").attr("style","position: relative;top:295px;display: block;");
				}else if(parseInt(imgs.length+1)==3){
					$(".ffollow").attr("style","position: relative;top:335px;display: block;");
				}
			}
		}
		var fadimgs = value.fadimg.split("@@@");
		var fadurls = value.fadurl.split("@@@");
		for(var i=0;i<fadimgs.length;i++){
			setValue(i,fadimgs[i],fadurls[i]);
		}
	}
	//上传框设置值
	$.fn.jeasyupload.getValue=function(o){
		var imgarrt =o.tag.input1.find(".jupload-img");
		var imgs = "";
		for(var i=0;i<imgarrt.length;i++){
			imgs+="@@@"+$(imgarrt[i]).attr("relativeurl");
		}
		imgs = imgs.substring(3);
		o.traget.val(imgs);
		return imgs;
	}
	// 获取 Option 的方法
	$.fn.jeasyupload.getOption = function(jq) {
		var data = $.data(jq[0], "jeasyupload");
		if (data) {
			return data.options;
		} else {
			debug("属性未找到--jeasyupload--ID:" + jq.attr("id"));
			return undefined;
		}
	};
	// 定义初始化函数
	$.fn.jeasyupload.init = function(o) {
		//var begintime = new Date().getTime();
		/***********************************/
		
		var ran = Math.round(Math.random() * 99999);
		var panelid = "multipleFile" + ran;
		var iframeid = "multipleFile" + ran;
		
		if(!o.btn){
			//如果没有外部按钮则创建按钮
			//o.btn=$("<a class='combo-arrow textbox-icon' icon-index='0' tabindex='-1' style='width: 18px; height: 23.5px;'></a>");
			//创建自定义文本框
			if(o.type=="text"){
				$.fn.jeasy.code.createTag(o,"jeasyimgbox");
			}else{
				$.fn.jeasy.code.createImgTag(o,"jeasyimgbox");
			}
			o.btn = o.tag.btn;
		}else{
			
		}
				
		//创建iframe和iframe的容器
		hideDiv = $("<div style='display:none;'></div>");
		hideDiv.attr("id",panelid);
		o.hideDiv=hideDiv;
		var iframe = $("<iframe></iframe>");
		iframe.attr("name",iframeid);
		iframe.attr("id",iframeid);
		var form = $("<form method='post' enctype='multipart/form-data' ></form>");
		form.attr("target",iframeid);
		if(o.url){
			var urlTemp = o.url;
			//判断URL中是否有问号-
			if (urlTemp.indexOf("?") >= 0 ) {
				urlTemp += "&panel="+panelid;
			}else{
				urlTemp += "?panel="+panelid;
			}
			form.attr("action",urlTemp);
		}
		
		//判断是否可多选
		var file;
		if(o.multiple){
			file = $("<input name='imgFile' type='file' multiple='multiple' />");
			o.btntext = $.fn.jeasy.local.upload_btn_multiple;
		}else{
			file = $("<input name='imgFile' type='file' />");
			o.btntext = $.fn.jeasy.local.upload_btn_single;
		}
	
		hideDiv.appendTo('body');
		iframe.appendTo(hideDiv);
		form.appendTo(iframe);
		file.appendTo(form);	
			
		
		var domdiv = hideDiv[0];
		domdiv.callback = o.afterupload;
		var dom_iframe = iframe[0];
		dom_iframe.onload = iframe.onreadystatechange = function() {
		     if (this.readyState && this.readyState != 'complete') {
		    	 debug(this.readyState);
		    	 return; 
		     }else {
		    	 // 隐藏进度条
		    	 $.messager.progress("close");//隐藏加载
		    	 var if_dom = dom_iframe.contentWindow.document; 
		    	 //if (if_dom==undefined){if_dom = dom_iframe.document;}
		    	 var if_body = $(if_dom.getElementsByTagName("body"));
		    	 var data = if_body.text();
		    	 //debug("取值结果为:" + data);
		    	 if(data.indexOf("(function()")>0){
		    		 //手机UC浏览器后面会跟一些其他代码
		    		 var length = data.indexOf("(function()");
		    		 data = data.substring(0,length);
		    	 }
		    	 if(data && data.indexOf("data")>0){//判断是否含有data
		    		 data = eval("(" + data + ")");
		    		 //执行回调函数
		    		 //debug("判断是否含有data");
		    		 o.afterupload(o,data);
		    	 }
		     }
		};
		
		file.change(function(){
			if(file[0].value=='undefined' || file[0].value==""){
				return;
			}
			form.submit();
			// 显示进度条
			$.messager.progress({text : "正在上传，请稍候..."});
			/*$.jbootloading("show",$.fn.jboot.local.msg_file_loading);*/
			
		});
		o.btn.click(function(){
			file.click();
		});
		
		//触发事件选择事件
		o.select = function(){
			file.click();
		};
		
		/***********************************/
		//var endtime = new Date().getTime();
		//debug("上传组件初始化用时："+(endtime-begintime)+"(毫秒)");
	};
	
	// 设置值函数
	$.fn.jeasyupload.setValues = function(o,data) {
		var url="";
		for (var i = 0; i < data.length; i++) {
			var file = data[i];
//			if(file.error==0){
//				var urlTemp=file.relativeurl;
//				if(file.relativeurl==undefined || file.relativeurl==''){
//					urlTemp=file.url;
//				}
//				if(i<data.length-1){
//					url+=urlTemp+',';
//				}else{
//					url+=urlTemp;
//				}
//			}
			//自定义显示样式 
			if(o.customImg){//2015.7.16  传入 i 方便知道 是第几个
				o.customImg(i,file,o);
			}
		}
		//$.fn.jeasy.setValue(o,url);
	};
	
	// 上传后回调函数
	$.fn.jeasyupload.afterupload = function(o,data) {
		
		// 隐藏进度条
		if (data.error==0) {
			o.setValues(o,data.filelist);
		}else if(data.error === -1){
			//提示信息
			$.messager.alert('提示',data.message,'info');
		}else {
//			$.jbootmsg(data.message, 'error');
			$.messager.alert('提示',data.message,'error');
		}
	};
	
	// 私有函数：调试输出
	function debug(info) {
		if (window.console) {
			window.console.log("debug[jeasyupload] | " + info);
		}
	}

	// 闭包结束
})(jQuery);

//创建一个闭包  **********  自定义表头组件  ********﻿
(function($) {
	// 插件的定义
	$.fn.jeasycolumn = function(options,param) {
		if (typeof options == "string") {
			var method = $.fn.jeasycolumn.methods[options];
			if (method) {
				return method(this, param);
			} else {
				$.error('方法 ' + options + ' 不存在');
				return undefined;
			}
		}
		options = options || {};
		return this.each(function() {
			var state = $.data(this, "jeasycolumn");
			// 修改此处，使能加载多个单据页
			if (state) {
				$.extend(state.options, options);
			}else{
				$.data(this, "jeasycolumn", {
					options : $.extend({}, $.fn.jeasycolumn.defaults, options)
				});
				var o = $.data(this, "jeasycolumn").options;
				o.traget = $(this);
				o.init(o);//初始化
			}
		});
	};

	// 插件的defaults
	$.fn.jeasycolumn.defaults = {
		traget:undefined,//对象
		width:700,//自定义宽度
		data:undefined,//data
		datagrid:undefined,//表格组件
		button : undefined,//按钮组 text onclick btnclass
		button_role : undefined,//功能权限字符串  "新增,编辑,删除"
		showFilter:true,//显示自定义表头设置按钮
		menuid:undefined,
		init : function(o){
			$.fn.jeasycolumn.init(o);
		},
		hasck:true,//是否有选择列
		ck:{field:'ck',checkbox:true,align:'center'},
		getids:function(o){
			return $.fn.jeasycolumn.getids(o);
		},
	};

	// 插件的methods
	$.fn.jeasycolumn.methods = {
		change:function(jq,value){
			var o = $.fn.jeasycolumn.getOption(jq);
			window.menuid = value;
			o.defaultColumns = o["column"+window.menuid];
			// 获取自定义表头数据
			if(window.columnconfig != undefined && window.columnconfig["column"+window.menuid] != undefined){
				o.data = window.columnconfig["column"+window.menuid];
			}else{
				o.data = o["column"+window.menuid];
			}
			//加载格式化方法
			if(o.data != undefined){
				var colarr;
				if(o.data.length==1){
					colarr = o.data[0];
				}else{
					colarr = o.data[1];
				}
				for (var i = 0; i < colarr.length; i++) {
					var col = colarr[i];
					if(col.fmt != undefined){
						col.formatter = Util[col.fmt];
					}
				}
			}
			//移除配置文件中的指定菜单，并刷新页面
			//o.data = o.defaultColumns;
//			o.defaultColumns = o["column"+window.menuid];
			o.table.empty();
			loadData(o);
			//清除数据并加载新的表头
			$(o.datagrid).datagrid({
				url:"",
				columns:o.data,
				data:{total:0,rows:[]}
			});
		}
	};
	
	// 获取 Option 的方法
	$.fn.jeasycolumn.getOption = function(jq) {
		var data = $.data(jq[0], "jeasycolumn");
		if (data) {
			return data.options;
		} else {
			debug("属性未找到--jeasycolumn--ID:" + jq.attr("id"));
			return undefined;
		}
	};

	// 定义初始化函数
	$.fn.jeasycolumn.init = function(o) {
		if(o.menuid==undefined){
			o.menuid=window.menuid;
		}
		// 获取自定义表头数据
		if(window.columnconfig != undefined && window.columnconfig["column"+o.menuid] != undefined){
			window.currentColumns = window.columnconfig["column"+o.menuid];
		}else{
			if(window.defaultColumns != undefined){
				var tempdata = JSON.stringify(o.defaultColumns); //序列化对象
				window.currentColumns = JSON.parse(tempdata); //还原
			}
		}
		//加载格式化方法
		if(window.currentColumns != undefined){
			var colarr;
			if(window.currentColumns.length==1){
				colarr = window.currentColumns[0];
			}else{
				colarr = window.currentColumns[1];
			}
			for (var i = 0; i < colarr.length; i++) {
				var col = colarr[i];
				if(col.fmt != undefined){
					col.formatter = Util[col.fmt];
				}
			}
		}
		$(o.datagrid).datagrid({columns:window.currentColumns});
		//初始化弹窗
		o.traget.dialog({    
		    title: "自定义表格设置",    
		    width: o.width,
		    modal: true,
		    closed: true,
		    toolbar:[{
				text:'添加分组',
				iconCls:'icon-add',
				handler:function(){
					creatGroupSingle("分组",o.table);
				}},{
				text:'保存自定义设置',
				iconCls:'icon-save',
				handler:function(){
					//var options = $(o.datagrid).datagrid("getColumnFields");
					//debug("列数据:"+JSON.stringify(option));
					var gridArray = new Array();
					var groupArray = new Array();
					var columnArray = new Array();
					var groups = o.traget.find(".easy-group");
					if (groups.length>1) {
						var group_index = 0;
						var checkpass = true;
						groups.each(function(){
							var group = {};
							group.title = $(this).find(".easy-column-name input").val();
							group.colspan = $(this).find(".easy-column").length;
							if(group.title == undefined || group.title == ""){
								$.messager.alert('警告','分组名称不能为空');
								return;
							}
							//判断组内的列数量大于0
							if (group.colspan>0) {
								if (group_index==0 && o.hasck==true) {
									group.colspan += 1;//第一组自动增加选择咧
									group_index = 1;
								}
								groupArray.push(group);
							}
						});
						if(checkpass == false){
							return;
						}
						if(groupArray.length>1){
							gridArray.push(groupArray);
						}
					}
					
					//如果有选择列则增加选择列
					if (o.hasck==true) {
						columnArray.push(o.ck);
					}
					var columns = o.traget.find(".easy-column");
					columns.each(function(){
						var column = $(this).data("column");
						var newColumn = {};
						newColumn.field = column.field;
						newColumn.title = column.title;
						newColumn.width = $(this).find("input.easy-column-width").val();
						newColumn.hidden = !$(this).find("input.easy-column-hide").is(":checked");
						newColumn.align = $(this).find("select.easy-column-align").val();
						newColumn.fmt = column.fmt;
						newColumn.formatter = column.formatter;
						//alert(column.title+" : "+column.formatter);
						columnArray.push(newColumn);
						//console.log(newColumn.title+"_"+newColumn.width+"_"+newColumn.hidden+"_"+newColumn.align+"_"+newColumn.fmt);
					});
					gridArray.push(columnArray);
					var data={};
					data["menuid"]=o.menuid;
					data["newcolumns"]=gridArray;
					$.messager.progress({text : "正在保存中，请稍候..."});
					$.ajax({
						type:"post",
						url:"user/updateCustomerColumns.do",
						data:{jsonobj:JSON.stringify(data)},
						success:function(data){
							$.messager.progress("close");//隐藏加载
							if(data.result){
								$.messager.alert("提示", data.msg,"info");
								$(o.datagrid).datagrid({columns:gridArray});
							}else{
								$.messager.alert("提示", data.msg,"error");
							}
						},error:function(){
							$.messager.alert("提示", "保存失败！", "warning");
						}
					});
			}},{
			text:'恢复默认值',
			iconCls:'icon-reload',
			handler:function(){
				//移除配置文件中的指定菜单，并刷新页面
				//o.data = o.defaultColumns;
				var tempdata = JSON.stringify(o.defaultColumns); //序列化对象
				o.data = JSON.parse(tempdata); //还原
				o.table.empty();
				loadData(o);
				//加载格式化方法
				if(o.data != undefined){
					var colarr;
					if(o.data.length==1){
						colarr = o.data[0];
					}else{
						colarr = o.data[1];
					}
					for (var i = 0; i < colarr.length; i++) {
						var col = colarr[i];
						if(col.fmt != undefined){
							col.formatter = Util[col.fmt];
						}
					}
				}
				$(o.datagrid).datagrid({columns:o.data});
			}}],
			resizable:true
		});
		o.table = $("<div class='easy-column-dlg'></div>").appendTo(o.traget);
		o.option = $(o.datagrid).datagrid("options");
		o.data = o.option.columns;
		
		//自定义按钮组
		//o.tool_form_group = $('<div class="form-group r-white"></div>').appendTo(o.option.toolbar);
		//o.tool_btn_group = $('<div class="btn-group1 jboot-tool"></div>').appendTo(o.tool_form_group);
		//创建按钮组
		if(o.button){
			for (var i = 0; i < o.button.length; i++) {
				$.fn.jeasycolumn.createBtn(o,o.button[i],o.option.toolbar);
			} 
		}
		if(o.showFilter){
			//创建按钮并绑定事件
			var btn = $("<span class='easyui-linkbutton btn-right'>设置</span>").appendTo(o.option.toolbar);
			btn.linkbutton({iconCls:"icon-filter",plain:true});
			btn.bind("click", function(){
				o.traget.dialog("open");
			});
		}
		if(helpMenu[window.menuid]!=undefined && helpMenu[window.menuid]!=""){
			var helpbtn = $("<span class='easyui-linkbutton btn-right'>帮助</span>").appendTo(o.option.toolbar);
			helpbtn.linkbutton({iconCls:"icon-help",plain:true});
			helpbtn.bind("click", function(){
				window.open(helpMenu[window.menuid]);
		    });
		}
		//清除浮动 解决工具条无按钮时的背景色问题
		$("<div style='clear:both;'></div>").appendTo(o.option.toolbar);
		
		loadData(o);//加载数据
		o.traget.dialog("vcenter");
	};
	//根据button-role页面加载按钮
	$.fn.jeasycolumn.createBtn=function(o,button,toolbar){
		//debug("role："+o.button_role+"  btn.text:"+button.text);
	    if(o.button_role==undefined || o.button_role.indexOf(button.text)==-1){
			return;
		}
		var jbtn = $("<span class='easyui-linkbutton btn-left'></span>");

		//if(button.iconCls==undefined || button.iconCls==""){
		//	button.iconCls = "icon-view";
		//}
		//统一按钮的图标
		button.iconCls = ButtonIcon[button.text];
		
		jbtn.linkbutton({
			plain	: true,
			text 	: button.text,
		    iconCls	: button.iconCls,
		    onClick	: function(){
		    	//新增不需要id
				if(button.nocheck || button.text=="新增"){
					button.onclick("",[]);
					return;
				}
				var userid=$("#nav-userid").val();
		        if(userid==""){
					$.messager.alert("提示","您还未登陆，或登录超时，请您先登陆后再操作","info");
					return;
				}
		        var ids = [];
				var rows = $(o.datagrid).datagrid("getChecked");
				// 如果没有多选则添加选中的行
				if (rows.length == 0) {
					var row = $(o.datagrid).datagrid('getSelected');
					if (row) {
						rows.push(row);
					}
				}
				//修改只能选一条
				if(button.text=="修改" || button.text=="编辑"){
					if(rows.length>1){
						$.messager.alert("提示","不能批量修改","warning");
			    		return;
					}
				}
				//判断既没有勾选也没有选中
				if(rows.length == 0){
					$.messager.alert("提示","您还没有选择数据","warning");
		    		return;
				}
				var idfield='fid';
				if(button.idfield!=undefined && button.idfield!=''){
					idfield=button.idfield;
				}
//				var idfield=(button.idfield==undefined?'fid':button.idfield);
				for ( var i = 0; i < rows.length; i++) {
					ids.push(rows[i][idfield]);
				}
				ids = ids.join(",");
				console.log("已选中的ID集合:"+ids);
				button.onclick(ids,rows);
			}
		});
		jbtn.appendTo(toolbar);
	};
	//获取选中行的id
	$.fn.jeasycolumn.getids=function(o){
		var idArr=[];
		var id=o.id;
		var rows=$(o.datagrid).datagrid('getChecked');
		for(var i=0;i<rows.length;i++){
			idArr.push(rows[i][id]);
		}
		return idArr.join(",");		
	};	
	//加载数据
	function loadData(o){
		//目前仅支持双行表头
		if (o.data.length==1) {
			creatGroup(o.data[0],o.table);
		}else if(o.data.length==2) {
			var c = 0;
			var groups = o.data[0];//分组
			var columns = o.data[1];//列
			for (var i = 0; i < groups.length; i++) {
				var group = groups[i];//分组
				var droppable = creatGroupSingle(group.title,o.table);//仅创建一个组
				var colspan = group.colspan;
				for (var j = 0; j < colspan; j++) {
					creatColumn(columns[j+c],droppable);
				}
				c += colspan;
			}
		}
	}
	
	//创建一个列的编辑项
	function creatColumn(column,droppable){
		if (column.field == "ck") {
			return;
		}
		var draggable = $("<div class='easy-column'></div>").appendTo(droppable);
		var title = $("<span class='easy-column-title'></span>").appendTo(draggable).text(column.title);
		var width = $("<input class='easy-column-width' type='text' onkeyup='jonlynum(this)'/>").appendTo(draggable).val(column.width);
		var check = $("<input class='easy-column-hide' type='checkbox' />").appendTo(draggable);
		var align = $("<select class='easy-column-align'><option value='left' selected='selected'>居左</option><option value='center'>居中</option><option value='right'>居右</option></select>").appendTo(draggable);
		var drop  = $("<span class='easy-column-drop'>拖拽排序</span>").appendTo(draggable);
		align.val(column.align==undefined?'left':column.align);
		if(column.hidden==undefined || column.hidden==false){
			check.attr("checked","true"); 
		}
		//alert(column.title+" : "+column.formatter);
		draggable.data("column",column);//给元素附加数据
		
		//初始化拖拽功能
		draggable.draggable({
			handle:drop,
			revert:true,
			deltaX:0,
			deltaY:0
		}).droppable({
			onDragOver:function(e,source){
				$(this).addClass("easy-column-over");
			},
			onDragLeave:function(e,source){
				$(this).removeClass("easy-column-over");
			},
			onDrop:function(e,source){
				$(this).removeClass("easy-column-over");
				$(source).insertAfter(this);
			}
		});
	};
	
	//仅创建一个空的组
	function creatGroupSingle(title,parent){
		var droppable = $("<div class='easy-group'></div>").appendTo(parent);
		var header = $("<div class='easy-group-header'>" +
				"<div class='easy-column-name'><input value='"+title+"' /><span class='easy-group-close'>删除分组</span></div>" +
				"<span class='easy-column-title'>名称</span>" +
				"<span class='easy-column-width'>宽度</span>" +
				"<span class='easy-column-hide'>显示</span>" +
				"<span class='easy-column-align'>对齐方式</span>" +
				"<span class='easy-column-drop'>排序</span></div>").appendTo(droppable);
		
		droppable.find(".easy-group-close").click(function(){
			var columns = droppable.find(".easy-column");
			if($(".easy-group").length==1){
				$.messager.alert('警告','最少需要有一个分组');
				return;
			}
			if(droppable.prev().hasClass("easy-group")){
				columns.appendTo(droppable.prev());
				droppable.remove();
			}else if(droppable.next().hasClass("easy-group")){
				columns.insertAfter(droppable.next().find(".easy-group-header"));
				droppable.remove();
			}
		});
		
		//初始化拖拽功能
		header.droppable({
			onDragOver:function(e,source){
				$(this).addClass("easy-column-over");
			},
			onDragLeave:function(e,source){
				$(this).removeClass("easy-column-over");
			},
			onDrop:function(e,source){
				$(this).removeClass("easy-column-over");
				$(source).insertAfter(this);
			}
		});
		return droppable;
	};
	
	//创建一个组并添加数据
	function creatGroup(group,parent){
		var droppable = creatGroupSingle("默认分组",parent);
		for (var i = 0; i < group.length; i++) {
			creatColumn(group[i],droppable);
		}
	};
	
	// 私有函数：调试输出
	function debug(info) {
		if (window.console){window.console.log("debug[jeasycolumn] | " + info);}
	}

	// 闭包结束
})(jQuery);
$.extend({
	/** 弹出消息 info error confirm */
	jmsg : function(msg,type) {
		if(type==undefined){
			type="info";
		}
		if(type="info"){
			$.messager.show({
				title:'消息',
				msg:msg,
				timeout:2500,
				showType:'slide',
				style:{
					right:'',
					top:document.body.scrollTop+document.documentElement.scrollTop+20,
					bottom:''
				}
			});
		}else{
			$.messager.alert("提示",msg,type);
		}
	}
});

//仅允许输入数字
function jonlynum(obj){
	if(obj.value.length==1){
		obj.value=obj.value.replace(/[^1-9]/g,'');
	}else{
		obj.value=obj.value.replace(/\D/g,'');
	}
}

var ButtonIcon = {
	"查询" : "icon-search",
	"修改" : "icon-edit",
	"设置LOGO" : "icon-edit",
	"设置头像" : "icon-edit",
	"修改备注" : "icon-edit",
	"修改密码" : "icon-edit",
	"新增" : "icon-add",
	"删除" : "icon-cancelo",
	"有效" : "icon-accept",
	"审核" : "icon-accept",
	"指定村级服务站" : "icon-fcun",
	"终止" : "icon-stop",
	"设为默认" : "icon-fmoo",
	"禁用" : "icon-stop",
	"编辑" : "icon-edit",
	"设置默认类型" : "icon-fmoo",
	"查看" : "icon-search",
	"生成单元测试活动" : "icon-fce",
	"查询活动单元测试链接" : "icon-search",
	"开店" : "icon-fdian",
	"确认" : "icon-accept",
	"分配权限" : "icon-back",
	"保存" : "icon-save",
	"设置模板" : "icon-fmo",
	"设置广告" : "icon-fguang",
	"进入店铺看看吧" : "icon-forward",
	"设置类别品牌" : "icon-flei",
	"第四套模版页面生成" : "icon-fmo",
	"设置推广天数" : "icon-ftian",
	"同步电子保单信息" : "icon-fbao",
	"发布" : "icon-ffa",
	"下架" : "icon-fxia",
	"设置联营商" : "icon-flian",
	"商品发布明细" : "icon-ffa",
	"中央商品库" : "icon-fzhong",
	"导入商品信息" : "icon-excel",
	"导入商品参数" : "icon-excel",
	"ERP下载设置" : "icon-fxia",
	"预定设置" : "icon-fyu",
	"商品回收" : "icon-fhui",
	"发布到采销平台" : "icon-ffa",
	"采销商品下架" : "icon-fxia",
	"设置为新品" : "icon-fxin",
	"设置为尾货" : "icon-fwei",
	"同步ERP库存" : "icon-fku",
	"上架" : "icon-fshang",
	"设置自提" : "icon-fzi",
	"保存并推送价格给店铺" : "icon-ftui",
	"全部比价" : "icon-fbi",
	"全选" : "icon-accept",
	"全不选" : "icon-stop",
	"反选" : "icon-view",
	"下载" : "icon-fxia",
	"设置打印字体" : "icon-fziti",
	"设置格式" : "icon-fge",
	"显示" : "icon-fshow",
	"隐藏" : "icon-fhide",
	"预览" : "icon-fyu",
	"政策预览" : "icon-fyu",
	"适用店铺" : "icon-fdian",
	"查看未制定价格商品" : "icon-search",
	"制定价格政策" : "icon-fzheng",
	"编辑模板明细" : "icon-edit",
	"显示在条件中" : "icon-fshow",
	"不显示在条件中" : "icon-fhide",
	"保存外部系统编码" : "icon-save",
	"订单详情" : "icon-fxiang",
	"取消订单" : "icon-fqu",
	"发货" : "icon-ffa",
	"确认收货" : "icon-accept",
	"收款" : "icon-money",
	"收货" : "icon-fshou",
	"退款" : "icon-money",
	"取消" : "icon-fqu",
	"回复" : "icon-fhui",
	"查看晒单" : "icon-search",
	"添加" : "icon-add",
	"重算" : "icon-fsuan",
	"快速设置" : "icon-cog",
	"付款" : "icon-money",
	"接收任务" : "icon-fjie",
	"安排进度" : "icon-fan",
	"完成" : "icon-accept",
	"授权" : "icon-accept",
	"分组" : "icon-fzu",
	"类别" : "icon-flei",
	"同步门店粉丝" : "icon-ftong",
	"排序" : "icon-order",
	"开启" : "icon-accept",
	"关闭" : "icon-cancelo",
	"关键字输入查看" : "icon-search",
	"修复自动回复规则" : "icon-fxiu",
	"发布/终止" : "icon-ffa",
	"管理" : "icon-fguan",
	"兑换" : "icon-fdui",
	"发送现金红包" : "icon-ffa",
	"批量兑换" : "icon-fdui",
	"登记票据" : "icon-fdeng",
	"活动大屏" : "icon-view",
	"展示大屏" : "icon-view",
	"复制" : "icon-copy",
	"生成链接" : "icon-link",
	"摇奖控制" : "icon-mouse",
	"生成二维码" : "icon-qrcode",
	"显示二维码" : "icon-qrcode",
	"更改二维码" : "icon-qrcode",
	"查看当前页面二维码" : "icon-qrcode",
	"加送金币" : "icon-add",
	"设置答案" : "icon-cog",
	"公布答案" : "icon-page",
	"留言审核" : "icon-accept",
	"查  看" : "icon-search",
	"签  到" : "icon-accept",
	"签到" : "icon-accept",
	"显示粉丝变动曲线" : "icon-chart-curve",
	"显示销售信息" : "icon-chart-bar",
	"显示费用信息" : "icon-chart-bar",
	"显示综合占比" : "icon-chart-pie",
	"代报名" : "icon-fbaoming",
	"查看帮砍明细" : "icon-search",
	"获取微信图文消息" : "icon-picture",
	"发送图文消息" : "icon-forward",
	"+添加图文消息" : "icon-add",
	"置为员工" : "icon-fyuan",
	"置为粉丝" : "icon-ffensi",
	"权限" : "icon-fquan",
	"绑定店铺" : "icon-fbang",
	"置为专属顾问" : "icon-fgu",
	"取消设置" : "icon-stop",
	"取消签到" : "icon-stop",
	"设置岗位" : "icon-fgang",
	"设置行业" : "icon-fhang",
	"模板URL设置" : "icon-fmo",
	"历史积分" : "icon-ffen",
	"积分清零" : "icon-fqing",
	"解除绑定" : "icon-stop",
	"绑定门店" : "icon-fbang",
	"总粉量倒序" : "icon-chart-bar",
	"今日增粉倒序" : "icon-chart-bar",
	"今日掉粉倒序" : "icon-chart-bar",
	"7日增粉倒序" : "icon-chart-bar",
	"7日掉粉倒序" : "icon-chart-bar",
	"申请" : "icon-add",
	"停用" : "icon-stop",
	"加入公共标签" : "icon-add",
	"宣传设置" : "icon-cog",
	"信息采集设置" : "icon-cog",
	"自动完善资料设置" : "icon-cog",
	"消息群发" : "icon-ffa",
	"安排员工" : "icon-fyuan",
	"游客合并" : "icon-join",
	"转为会员" : "icon-turn",
	"显示详情" : "icon-search",
	"发放" : "icon-ffa",
	"回访" : "icon-fhui",
	"发送消息" : "icon-ffa",
	"发送信息" : "icon-ffa",
	"发送消息(选择)" : "icon-ffa",
	"发送消息(全部)" : "icon-ffa",
	"修改实结" : "icon-edit",
	"结算" : "icon-money",
	"支付宝" : "icon-falipay",
	"微信" : "icon-fwx",
	"不结算" : "icon-stop",
	"增加" : "icon-add",
	"专属顾问分配" : "icon-ffen",
	"分配" : "icon-ffen",
	"分类" : "icon-ffen",
	"更改经纪人分类" : "icon-ffen",
	"所有活动页面" : "icon-fhuo",
	"浏览历史" : "icon-search",
	"购物历史" : "icon-search",
	"服务历史" : "icon-search",
	"设置楼层" : "icon-cog",
	"Excel导入模板" : "icon-excel",
	"导入EXCEL" : "icon-excel",
	"导入Excel" : "icon-excel",
	"导入Execl" : "icon-excel",
	"导出Execl" : "icon-excel",
	"导出Excel" : "icon-excel",
	"Excel验证" : "icon-excel",
	"Excel导入岗位" : "icon-excel",
	"下载模板" : "icon-excel",
	"导出领用信息" : "icon-excel",
	"导入代报名Excel" : "icon-excel",
	"同步ERP价格(已选)" : "icon-ftong",
	"同步ERP价格(全部)" : "icon-ftong",
	"全部下架/上架" : "icon-fshang",
};
var helpMenu = {
	"1":"",
	"100":"",
	"101":"http://1img.caishen.cn/help/company/unitInformation.html",
	"102":"http://1img.caishen.cn/help/company/myupdatepas.html",
	"103":"http://1img.caishen.cn/help/company/unitRegistration.html",
	"104":"http://1img.caishen.cn/help/company/unitStation.html",
	"105":"http://1img.caishen.cn/help/company/unitFranchisee.html",
	"106":"http://1img.caishen.cn/help/company/unitWareHouse.html",
	"107":"http://1img.caishen.cn/help/company/unitSendArea.html",
	"108":"http://1img.caishen.cn/help/company/payCfg.html",
	"110":"http://1img.caishen.cn/help/company/unitSysSet.html",
	"111":"http://1img.caishen.cn/help/company/unitSendFee.html",
	"112":"",
	"113":"",
	"114":"",
	"115":"",
	"200":"",
	"201":"http://1img.caishen.cn/help/unitperson/unitPerson.html",
	"202":"http://1img.caishen.cn/help/unitperson/comp_store.html",
	"203":"http://1img.caishen.cn/help/unitperson/comp_xiaoer.html",
	"204":"http://1img.caishen.cn/help/unitperson/comp_interlock.html",
	"205":"http://1img.caishen.cn/help/unitperson/comp_franchisee.html",
	"206":"",
	"207":"http://1img.caishen.cn/help/unitperson/copyStoreInfo.html",
	"208":"http://1img.caishen.cn/help/unitperson/userRole.html",
	"209":"http://1img.caishen.cn/help/unitperson/compstoreset.html",
	"300":"",
	"301":"http://1img.caishen.cn/help/store/unitStoreManage.html",
	"302":"http://1img.caishen.cn/help/store/customerStoreManage.html",
	"303":"http://1img.caishen.cn/help/store/electronicShelfStore.html",
	"304":"http://1img.caishen.cn/help/store/customerElectronicShelfStore.html",
	"305":"http://1img.caishen.cn/help/store/villageServiceStore.html",
	"306":"http://1img.caishen.cn/help/store/enterpriseStore.html",
	"307":"",
	"400":"",
	"401":"http://1img.caishen.cn/help/unitstock/unitStock.html",
	"402":"http://1img.caishen.cn/help/unitstock/togetherStock.html",
	"403":"http://1img.caishen.cn/help/unitstock/enterpriseStore.html",
	"404":"",
	"405":"",
	"406":"",
	"407":"",
	"408":"http://1img.caishen.cn/help/unitstock/unitStockPrice.html",
	"409":"http://1img.caishen.cn/help/unitstock/storeSubStockPrice.html",
	"410":"http://1img.caishen.cn/help/unitstock/stdStockView.html",
	"411":"",
	"412":"http://1img.caishen.cn/help/unitstock/storeStockPrint.html",
	"413":"http://1img.caishen.cn/help/unitstock/unitstockclassSet.html",
	"414":"http://1img.caishen.cn/help/unitstock/flashsalespolicy.html",
	"415":"http://1img.caishen.cn/help/unitstock/favorpolicy.html",
	"416":"",
	"417":"",
	"418":"http://1img.caishen.cn/help/unitstock/unitStockviewed.html",
	"419":"",
	"420":"http://1img.caishen.cn/help/unitstock/stdStockView.html",
	"421":"",
	"422":"",
	"423":"",
	"424":"",
	"425":"",
	"500":"",
	"501":"http://1img.caishen.cn/help/order/storeOrder.html",
	"502":"http://1img.caishen.cn/help/order/order_refund.html",
	"503":"http://1img.caishen.cn/help/order/consultManager.html",
	"504":"http://1img.caishen.cn/help/order/business_comment.html",
	"505":"http://1img.caishen.cn/help/order/cardScore.html",
	"506":"http://1img.caishen.cn/help/order/scorePolicy.html",
	"507":"",
	"509":"http://1img.caishen.cn/help/order/saleBonusPolicy.html",
	"511":"http://1img.caishen.cn/help/order/calcSaleBonus.html",
	"512":"",
	"513":"",
	"514":"",
	"515":"",
	"516":"",
	"517":"",
	"600":"",
	"601":"http://1img.caishen.cn/help/toservice/toServiceTask.html",
	"602":"",
	"603":"",
	"604":"",
	"605":"",
	"606":"",
	"607":"",
	"608":"",
	"609":"http://1img.caishen.cn/help/tag/agentset.html",
	"800":"",
	"802":"http://1img.caishen.cn/help/wx/OfficialAccount.html",
	"803":"http://1img.caishen.cn/help/wx/OfficialAccountAuthorize.html",
	"804":"http://1img.caishen.cn/help/wx/FansManagement.html",
	"805":"http://1img.caishen.cn/help/wx/GroupAdministration.html",
	"806":"http://1img.caishen.cn/help/wx/OfficialAccountMenu.html",
	"807":"",
	"808":"http://1img.caishen.cn/help/wx/DMManagement.html",
	"809":"http://1img.caishen.cn/help/wx/AutomaticReplySettings.html",
	"810":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"811":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"812":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"813":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"814":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"816":"http://1img.caishen.cn/help/wx/LiveDrawExchange.html",
	"817":"http://1img.caishen.cn/help/wx/GameExchange.html",
	"818":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"819":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"820":"http://1img.caishen.cn/help/wx/wxMarket.html",
	"821":"http://1img.caishen.cn/help/wx/CodeManagement.html",
	"822":"http://1img.caishen.cn/help/wx/actFee.html",
	"823":"http://1img.caishen.cn/help/statistics/wechatUserStatistic.html",
	"824":"http://1img.caishen.cn/help/statistics/activityStat.html",
	"826":"http://1img.caishen.cn/help/statistics/dmStat.html",
	"827":"http://1img.caishen.cn/help/wx/BargainActivityStatistic.html",
	"828":"",
	"830":"http://1img.caishen.cn/help/wx/DMSign.html",
	"831":"",
	"832":"",
	"833":"",
	"834":"",
	"835":"",
	"836":"",
	"837":"",
	"838":"",
	"900":"",
	"901":"http://1img.caishen.cn/help/statistics/preAmountManage.html",
	"902":"http://1img.caishen.cn/help/statistics/memberInfo.html",
	"903":"http://1img.caishen.cn/help/statistics/saleBonusQry.html",
	"904":"http://1img.caishen.cn/help/statistics/analysis.html",
	"905":"http://1img.caishen.cn/help/statistics/dmForwardRecord.html",
	"906":"http://1img.caishen.cn/help/statistics/activityStat.html",
	"907":"http://1img.caishen.cn/help/statistics/wechatUserStatistic.html",
	"908":"",
	"909":"http://1img.caishen.cn/help/statistics/dmStat.html",
	"910":"",
	"911":"",
	"912":"",
	"1000":"",
	"1001":"http://1img.caishen.cn/help/tag/publicTag.html",
	"1002":"http://dayo.oss-cn-hangzhou.aliyuncs.com/help/tag/queryTags.html",
	"1003":"http://1img.caishen.cn/help/tag/unitTag.html",
	"1004":"http://1img.caishen.cn/help/tag/customTagCheck.html",
	"1005":"http://1img.caishen.cn/help/tag/saleActivity.html",
	"1007":"http://1img.caishen.cn/help/tag/workerAudited.html",
	"1013":"http://1img.caishen.cn/help/tag/visitormanage.html",
	"1014":"http://1img.caishen.cn/help/tag/staffBonus.html",
	"1015":"http://1img.caishen.cn/help/tag/visitorGift.html",
	"1016":"http://1img.caishen.cn/help/tag/sendHistory.html",
	"1017":"http://1img.caishen.cn/help/tag/dmBouns.html",
	"1018":"http://1img.caishen.cn/help/tag/bonusSettle2.html",
	"1019":"http://1img.caishen.cn/help/tag/bonusSettle.html",
	"1020":"http://1img.caishen.cn/help/tag/agentBonus.html",
	"1021":"http://1img.caishen.cn/help/tag/scoreTaskSet.html",
	"1022":"http://1img.caishen.cn/help/tag/saveSaleActivityInfo.html",
	"1023":"http://1img.caishen.cn/help/tag/memberggrowth.html",
	"1024":"http://1img.caishen.cn/help/tag/automatic.html",
	"1025":"http://1img.caishen.cn/help/tag/agentset.html",
	"1026":"http://1img.caishen.cn/help/tag/sendMessageByWXUser.html",
	"1027":"http://1img.caishen.cn/help/tag/scoreTaskSet.html",
	"1028":"http://1img.caishen.cn/help/tag/bonusSettle.html",
	"1029":"http://1img.caishen.cn/help/tag/visitorGift.html",
	"1100":"",
	"1101":"",
	"1200":"",
	"1201":"",
	"1202":"",
	"1203":"",
	"1204":"",
	"1205":"",
	"1206":"",
	"1207":"",
	"1208":""
};



