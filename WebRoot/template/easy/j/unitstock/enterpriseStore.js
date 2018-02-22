//查询参数数据
//{id:"标签的ID",
// name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
// type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
// value:"固定值，当type='value'时取此值"
// ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray = [{id:"#brand_input",name:"markid",type:"combo"},
		  		  {id:"#type_input",name:"stockclassid",type:"combo"},
		  		  {id:"#store_input",name:"store",type:"combo"},
		  		  {id:"#stockName",name:"stock",type:"text"},
		  		  {id:"#stockState",name:"stockState",type:"select",defval:"0"},
		  		  {id:"#fstockcode",name:"stockcode",type:"text"},
		  		  {id:"#storeType",name:"storetype",type:"select",defval:"-1"},
		  		  {id:"#allowSelf",name:"allowSelf",type:"select",defval:"-1"}];
//图片服务器
var path = $("#imgurl").attr("path");
//默认的表格列数据和菜单ID
window.menuid = 403;//菜单ID
window.currentColumns = new Array();
window.defaultColumns = [[
	{field:'ck',title:"选择",checkbox:true,align:'center'},
	{field:'fid',title:"ID",checkbox:true,hidden:true},
	{field:"fstockname",title:"商品名称",width:300},
	{field:"fcover",title:"图片",width:100,fmt:"fmt_fcover"},
	{field:"fstockclassname",title:"商品类别",width:100},
	{field:"fstorename",title:"店铺名称",width:100},
	{field:"fstoretype",title:"店铺类别",width:100,fmt:"fmt_fstoretype"},
	{field:"fmarkname",title:"品牌",width:100}, 
	{field:"fstockprice",title:"价格",width:100}, 
	{field:"fstockcode",title:"外部编码",width:100},    
	{field:"fflowcount",title:"浏览次数",width:100},    
//	{field:"substate",title:"状态",width:100},    
	{field:"fstockstate",title:"状态",width:100,fmt:"fmt_fstockstate"}, 
	{field:"fallowself",title:"是否自提",width:100,fmt:"fmt_fallowself"}
	
]];
//格式化图片
Util.fmt_fcover=function(value,row,index){
		var fcover="<img class='Img' id='state_"+row.fid+"' fstockstate="+row.fstockstate+" src = '"+path+value+"'/>";
		if(row.flimitpurchase){
			fcover+="<img src='img/stock_xg.png' class='stock_xg' />";
		}
	return fcover;
}

//格式化商铺类别
Util.fmt_fstoretype=function(value,row,index){
		var fstoretype;
		if(value==0){
			fstoretype = "企业店铺";
		}else if(value==1){
			fstoretype = "门店店铺";
		}else if(value==2){
			fstoretype = "员工店铺";
		}else if(value==3){
			fstoretype = "加盟商店铺";
		}else if(value==4){
			fstoretype = "自营电子货架";
		}else if(value==5){
			fstoretype = "加盟商电子货架";
		}else if(value==6){
			fstoretype = "村级服务站";
		}else if (value==7){
			fstoretype = "PC企业商城";
		}
		return fstoretype;
}
//格式化状态
Util.fmt_fstockstate=function(value,row,index){
		var fstockstate;
		if(value==1){
			fstockstate = "未上架";
		}else if(value==2){
			fstockstate = "上架";
		}else if(value==3){
			fstockstate = "下架";
		}else if(value==4){
			fstockstate = "停用";
		}
		if(row.fdeleteflag==1 && value==3){
			fstockstate = "已回收";
		}
		return fstockstate;
}
//格式化是否自提
Util.fmt_fallowself=function(value,row,index){
		if(value==0){
			return "否";
		}
		if(value==1){
		return "自提";
	}
		}
$(function(){
	//---------------------------查询框--------------------------------
	//类别
	$('#type_input').jeasycombo({
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		url : "select/stockClass.do?t=2",
		label:"商品类别:",
		labelWidth:90,
		width:200,
		dlgwidth:350
	}) 
	//品牌
		$('#brand_input').jeasycombo({
			multiple : true,//是否多选
			type : "list",//弹出的样式
			iconCls:"btn-success",//自定义按钮样式
			url : "select/mark.do",
			label:"商品品牌:",
			labelWidth:90,
			width:200,
			isinline:false,//是否每行一个选项
			linenum:4,//当每行多个选项时，每一行选项的个数
		})
	//店铺类型
	$('#storeType').combobox({
		data:[{fid:-1,fname:'全部',selected:true},{fid:0,fname:'企业店铺'},{fid:1,fname:'门店店铺'},{fid:2,fname:'员工店铺'},
		      {fid:3,fname:'加盟商店铺'},{fid:4,fname:'自营电子货架'},{fid:5,fname:'加盟商电子货架'},{fid:6,fname:'村级服务站'},{fid:7,fname:'PC企业商城'}],
		onChange:function(newValue,oldValue){
			if(oldValue==''||oldValue==undefined){
				return false;
			}
			if(newValue==-1){
				newValue='';
			}
			$("#store_input").jeasycombo("reload", "select/selectStore.do?selecttype=3&unitid=0&userid="+$("#userId").val()+"&storetypes="+newValue);
		}
	})
	//店铺名称
		$('#store_input').jeasycombo({
			multiple : true,//是否多选
			type : "list",//弹出的样式
			iconCls:"btn-success",//自定义按钮样式
			url : "select/stockFstore.do?type=0",
			label:"店铺:",
			labelWidth:90,
			width:200,
			isinline:false,//是否每行一个选项
			linenum:4,//当每行多个选项时，每一行选项的个数
		})
	//商品状态
	$("#stockState").combobox({
		data:[{fid:0,fname:'全部',selected:true},{fid:1,fname:'未上架'},
		      {fid:2,fname:'上架'},{fid:3,fname:'下架'},
		      {fid:4,fname:'已回收'}]
	})
	//是否自提
	$("#allowSelf").combobox({
		data:[{fid:-1,fname:'全部',selected:true},{fid:1,fname:'自提'},
		      {fid:0,fname:'非自提'}]
	})
	//初始化表格
	$("#easy_table").datagrid({
		bodyCls:"easy-grid",
		toolbar:"#easy-tool",
		fit:true,
		nowrap:false,
		rownumbers:true,
		singleSelect : true,
		selectOnCheck : false,
		checkOnSelect : false,
		pagination : true,
		pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
        pageSize : 20, //每页显示的记录条数，默认为5  
	    columns : window.currentColumns
	});
	//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		//注释的c标签也会起作用  请不要删掉
	 	button_role : $("#menu_ffunction").val(),
		button:[
		    		   
		  			 {text: "编辑",iconCls:"icon-edit", nocheck:true, onclick:function(ids,rows){
						var rows=$('#easy_table').datagrid('getChecked');
						if(rows.length==0){
							row=$('#easy_table').datagrid('getSelected');
							if(row!=null){
							rows.push(row);
								
							}
						}
						var idArr=[];
						for(var i=0;i<rows.length;i++){
							idArr.push(rows[i].fstoresubstockid)	
						}
						var ids=idArr.join(",");
		  				if(ids==''||ids==undefined){
							$.messager.alert('提示',"您还没有选择数据","error");
							return false;
		  				}
						editStock(ids,rows);
		  			}}, 
		  			{text:"上架",iconCls:"icon-edit", idfield:"fstoresubstockid", onclick:function(ids,rows){			
		  				//upStockType();
		  				upstock(ids,rows);
		  			}},
		  			{text:"下架",iconCls:"icon-edit", idfield:"fstoresubstockid", onclick:function(ids,rows){			
		  				//downStockType();idfield
		  				downstock(ids,rows);
		  			}},
		  			{text:"设置自提",iconCls:"icon-filter", idfield:"fstoresubstockid",onclick:function(ids,rows){
		  				$("#self-dialog").dialog("open");
		  			}
		  			/* {text:"保存",btnclass:"btn btn-info btn-sm",onclick:function(id,ids){			
		  				saveAllPrice();
		  			} */} 
		  	    ]
	});
	var self='<form class="form-horizontal" role="form">'
 	 	+'<div class="form-group" style="padding:30px">'
 	   	+'<label class="col-sm-2 control-label">自提</label>'
 	    +'&nbsp;&nbsp;&nbsp;&nbsp;<label style="padding-top:6px;"><input type="radio" name="FAllowSelf" value="0" checked="checked"/>不允许</label>'
		+'&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="FAllowSelf" value="1"/>允许自提(支持自提和配送)</label>'
		+'&nbsp;&nbsp;&nbsp;&nbsp;<label><input type="radio" name="FAllowSelf" value="2"/>只自提(不支持配送)</label>'
 	    +'</div>'
 	    +'<div style="padding-left:450px">'
 	  	+'<a class="easyui-linkbutton" onclick="saveSelf();">确定</a>'
	   	+'<a class="easyui-linkbutton" onclick="closeSelfdialog();">取消</a></div></div>'
 	  	+'</div>'
	   	+'</form>';
	 $("#self-dialog").append(self);
	 	//加载按钮样式
		$("#self-dialog").find('.easyui-linkbutton').each(function(){
			if($(this).html()=='确定'){
				iconCls='icon-save'
			}else{
				iconCls='icon-cancel'
			}
			$(this).linkbutton({
				iconCls: iconCls
			});
		})
	     $("#hide-dialog").dialog({
	 		title:"设置自提提示信息",
	 		width:600,
	 		body:'',
	 		footer:"<button class='btn btn-primary' aria-hidden='true' onClick='closeHidedialog()' data-dismiss='modal'>确定</button>"
	 	});
	$("#btnSearch").bind("click", function(){
		//查询前先组织查询条件
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","unitstock/queryStoreStock.do");
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
});

function editStock(ids,rows){
	/* var substockid="";
	for(var i =0 ;i<rows.length;i++)
	{
	   substockid +=rows[i].fstoresubstockid+",";
	};
	if(substockid.length>0){
		substockid=substockid.substr(0,substockid.length-1);
	}	 */ 
	
		window.location.href ="unitstock/storesubStockByFids.do?pageNo=1&storeTypeLink=0&"+"ids="+ids; 
}

	//商品上架(后添加的)
	function upstock(ids,rows){
		/*  for(var i =0 ;i<rows.length;i++){
			 if(rows[i].fstockstate==2){
			    $.messager.alert("提示","你选择的商品包含已上架的商品，请重新选择！！！","error");
			    return false;
			 };
		 } */
		var type=$("#upStockid").val();
		$.messager.progress({text : "正在处理，请稍候..."});
			 $.ajax({
				 type:"POST",
				 url:"unitstock/queryStoreSubStockPriceBefore.do",
				 data:{'fstorestockID':ids,'type':1},
				 dataType:"json",
				 async:false,
				 success:function(data){
					 if(data>0){
						 $.messager.confirm("确认","您所选择的商品包含价格为0的商品  确定要上架吗？",function(r){
							 if(r){
								 $.messager.progress({text : "正在处理，请稍候..."});
								 $.ajax({
							    	 type:'post',
// 							         url: 'unitstock/upStockStoreType.do',
// 							         data:{'btnType':'上架','storestockfid':ids,'storeTypeLink':0},//btnType':type	
							         url:"unitstock/updateSubStockState.do",
									 data : {
											ids : ids,
											type : 2
									 },
							         success:function(data){
							        	 $.messager.progress("close");//隐藏加载
							     	     if(data.result){
							     	    	$.messager.alert("提示","成功上架","info");
							     	    	$('#easy_table').datagrid('reload');
							     		 	/* $.jbootmsg("成功上架","alert",function(){
							        	 		var myArray = stockid.split(",");
									        	for (var i = 0; i < myArray.length; i++) {
										        	 $("#state_"+myArray[i]).attr("fstockstate",2);
												}
								        	 	$(".jboot-active").find(".info").each(function(){
						 			        		 var html = $(this).html().replace("下架","上架").replace("未上架","上架").replace("停用","上架");
								        		 	 $(this).html(html);
								        	 	})
					 			        	}); */
							     	  	}else{
							     		    $.messager.alert("提示",data.msg,"error");
							     	  	}
							         },error:function(){
							        	 $.messager.progress("close");//隐藏加载
							         	$.messager.alert("提示","系统错误！","error");
								 	 }
							     });									 
							 }
						 })
					 }else{
						 $.messager.confirm("确定","您确定要上架选中商品吗？",function(r){
							 if(r){
								 $.messager.progress({text : "正在处理，请稍候..."});
								 $.ajax({
							    	 type:'post',
// 							         url: 'unitstock/upStockStoreType.do',
// 							         data:{'btnType':'上架','storestockfid':ids,'storeTypeLink':0},//btnType':type			 
							          url:"unitstock/updateSubStockState.do",
							         data : {
										ids : ids,
										type : 2
								 		},	
							         success:function(data){
							        	 $.messager.progress("close");//隐藏加载
							     	     if(data.result){
							     	    	$.messager.alert("提示","成功上架","info");
											$('#easy_table').datagrid('reload');
							     	  	}else{
							     	  		$.messager.alert("提示",data.msg,"error");
							     	  	}
							         },error:function(){
							        	 $.messager.alert("提示","上架失败！","error");
								 	 }
							     }); 
							 }
							  
						});
					 }
				 }
			 });

	}
	
	//商品下架
	function downstock(ids,rows){
		/*  for(var i =0 ;i<rows.length;i++)
		  {
			 if(rows[i].fstockstate==3){
			    $.messager.alert("提示","你选择的商品包含已下架的商品，请重新选择！！！","error");
			    return false;
			 };
		  } */
			 $.messager.confirm("确定","您确定要下架选中商品吗？",function(r){
				if(r){
					$.messager.progress({text : "正在处理，请稍候..."});
					 $.ajax({
				    	 type:'post',
// 				         url: 'unitstock/downStockStoreType.do',
// 				         data:{'btnType':'下架','storestockfid':ids,'storeTypeLink':0},//btnType':type
 						 url:"unitstock/updateSubStockState.do",
						 data : {
								ids : ids,
								type : 3
						 },
				         success:function(data){
				        	 $.messager.progress("close");//隐藏加载
					     	    if(data.result){
					     	    	$.messager.alert("提示","成功下架","info");
					     	    	$("#easy_table").datagrid('reload');
					     	  }else{
					     		  $.messager.alert("提示",data.msg,"error");
					     	  }
				         },error:function(){
				        	 $.messager.progress("close");//隐藏加载
				        	 $.messager.alert("提示","系统错误！","error");
				         }
				     })  
				
				}				 
				
			});
	  }
	function saveSelf(){
		var rows=[];
		rows =$('#easy_table').datagrid('getChecked');
		if(rows.length==0){
			var row=$('#easy_table').datagrid('getSelected');
			rows.push(row);
		}
		var id=[];
		for(var i=0;i<rows.length;i++){
			id.push(rows[i].fid)	
		}
		var ids=id.join(",");
		if(ids==''||ids==undefined){
			$.messager.alert('提示',"您还没有选择数据","error");
			return false;
		}
		 var chk=0;
		 var chkObjs = document.getElementsByName("FAllowSelf");
	     for(var i=0;i<chkObjs.length;i++){
	         if(chkObjs[i].checked){
	             chk = chkObjs[i].value;
	             break;
	         }
	     }
	     $.messager.progress({text : "正在处理，请稍候..."});
	     $.ajax({
	    	 type:"POST",
	    	 url:"unitstock/saveSelf.do",
	    	 data:{"fallowself":chk,"storeStockID":ids},
	    	 dateType:"json",
	    	 success:function(data){
	    		 $.messager.progress("close");//隐藏加载
	    		 $("#self-dialog").dialog("close");
	    		 if(data.res==1){
	    			var trs = ""
	               	for (var i = 0; i < data.list.length; i++) {
	       				trs +="<tr><td>"+data.list[i].res+"</td></tr>"
	       			}
	               	var body='<div style="height:300px;overflow-y: hidden;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
	       			     +trs+'</tbody></table></div>';
	               	$("#hide-dialog").dialog("clear");
	               	$("#hide-dialog").append(body);
	               	$("#hide-dialog").dialog("open");
	    		 }else if(data.result){
	    			 $.messager.alert("提示",data.msg,"info"); 
	    			 $("#easy_table").datagrid('reload');
	    		 }else{
	    			 $.messager.alert("提示",data.msg,"error");
	    		 }
	    	  }
	    	 });
	     
	 }
	function closeSelfdialog(){
		$("#self-dialog").dialog("close");		
	}	
        function closeHidedialog(){
		$("#hide-dialog").dialog("close");
	}