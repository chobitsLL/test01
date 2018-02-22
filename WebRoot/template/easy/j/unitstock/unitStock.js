$(function(){
	//-------------------------------未使用-=------------------------
	//导入商品信息
	/*$("#inpuparamexist").jbootupload({
		url:"stock/stockImport_unit.do",
		btn:$("#inpuparamexist"),
		parent:$("#inputstock"),
		//上传后回调函数
		afterupload:function(o,data){
			if(data.error==-1){
				$.messager.alert(data.message,"info");
			}else{
				$.messager.alert(data.message,"error");
			}
			
		}
	})
	//导入商品参数
	$("#inpuparamtexcal").jbootupload({
		url:"stock/stockParamImport_unit.do",
		btn:$("#inpuparamtexcal"),
		parent:$("#inputstock"),
		//上传后回调函数
		afterupload:function(o,data){
			if(data.error==-1){
				$.messager.alert(data.message,"info");
			}else{
				$.messager.alert(data.message,"error");
			}
		}
	})*/
	
//	$("#jumpPage").val(GetQueryString("pageNo"));
	//-----------------------------------设置联营商-弹出框---------------------------
	var setpool='<div style="padding-top:20px;"> '
	  	+'<div style="height: 45px; "><input id="Flinked" class="easyui-combobox"></div>'
	  	+'<div style="height: 45px"><input id="pool" type="text"></div>'
	  	+'<div style="padding-left:200px;">'
	  	+'<a class="easyui-linkbutton" id="unitsave">确定</a>'
	   	+'<a class="easyui-linkbutton" onclick="closeSetpooldialog();">取消</a></div></div>'
	$("#setpool-dialog").append(setpool);
	//加载按钮样式
	$("#setpool-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
	//是否联营
	$('#Flinked').combobox({
		width:300,
		labelWidth:80,
		label:'是否联营:',
		data:[{fid:1,fname:'是'},{fid:0,fname:'否'}],
		onChange:function(){
			$("#pool").jeasycombo('setvalue','');
		}
	})
	//联营商选择组件
	$("#pool").jeasycombo({
		multiple : false,//是否多选
		type : "list",//弹出的样式
		labelWidth:80,
		width:300,
		label:'联营商:',
		url: 'unitstock/selectPool.do?unitid='+unitid+'&type=0'
	});
	//设置联营确定按钮
	$("#unitsave").click(function(){
			
			   //为选中的商品设置联营
			   var flinked=$("#Flinked").combo('getValue');
			   var flinkunitid=$("#pool").jeasycombo("getvalue").ids;
			   if(flinked==''||flinked==undefined){
				   $.messager.alert("提示","是否联营不能为空","error");
				   return false;
			   }
			   if(flinked==1&&flinkunitid==""){
				   $.messager.alert("提示","联营商不能为空","error");
				   return false;
			   }
			   if(flinked==0&&flinkunitid==""){$("#pool").jeasycombo("setvalue","");}
			   $.messager.progress({text : "正在处理，请稍候..."});
			   $.ajax({
					type: 'POST',
					url:'unitstock/setpool.do?flinked='+flinked+'&flinkunitid='+flinkunitid+'&ids='+stockids,
					dataType:'json',
					success:function(data){
						$.messager.progress("close");//隐藏加载
						if(!(data.result===0) && data.result==false){
							$.messager.alert("提示",data.msg,"error");
							return;
						}
						if(data.result == 3){
							$.messager.alert("提示","设置成功","info");
							$("#setpool-dialog").dialog("close");
							$("#easy_table").datagrid("reload");//刷新数据
						}else if(data.result == 4){
							$.messager.alert("提示","设置失败","error");
							return false;
						}else if(data.result == 1){//商品类别不包含
							$.messager.alert("提示","您所选择的商品中包含商品类别不属于该联营商经营类别","info");
							return false;
						}else if(data.result == 2){//品牌不包含
							$.messager.alert("提示","您所选择的商品中包含该商品品牌不属于该联营商经营品牌","info");
							return false;
						}
					}
				});
	});
	//------------------------------------发布框---------------------------------
	var upstock='<div style="padding-top:20px;">'+  
   	'<div style="height: 45px; "><input class="easyui-combobox" id="storeTypeID" ></div>'+
   	'<div style="height: 45px"><input id="storeName" type="text"></div>'+
   	'<div style="height: 20px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是否上架:<input type="checkbox" id="isup"></div>'+
   	'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="upStock();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closeUpstockdialog()" >取消</a></div></div>'
	$("#upstock-dialog").append(upstock);
	$("#upstock-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
	$('#storeTypeID').combobox({
		width:300,
		labelWidth:80,
		label:'店铺类型:',
		data:[{fid:-1,fname:'全部',selected:true},{fid:0,fname:'企业店铺'},{fid:1,fname:'门店店铺'},{fid:2,fname:'员工店铺'},
		      {fid:3,fname:'加盟商店铺'},{fid:4,fname:'自营电子货架'},{fid:5,fname:'加盟商电子货架'},{fid:6,fname:'村级服务站'},{fid:7,fname:'PC企业商城'}],
		onChange:function(newValue,oldValue){
				if(oldValue==''||oldValue==undefined){
					return false;
				}
					selectStoretype(newValue)
			}
	})
	var storeTypeID=$('#storeTypeID').combo('getValue');
	if(storeTypeID==-1){
		storeTypeID="";
	}
	$("#storeName").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		label:'店铺名称:',
		width:300,
		labelWidth:80,
		url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+storeTypeID
	}); 
	//---------------------------下架框--------------------------
	var downStock='<div style="padding-top:20px;"> '
  	+'<div style="height: 45px; "><input id="storeTypeIDdown" class="easyui-combobox"></div>'
  	+'<div style="height: 45px"><input id="storeNamedown" type="text"></div>'
  	+'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="downStock();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closeDownstockdialog();">取消</a></div></div>'
  	$("#downstock-dialog").append(downStock);
	
	$('#storeTypeIDdown').combobox({
		width:300,
		labelWidth:80,
		label:'店铺类型:',
		data:[{fid:-1,fname:'全部',selected:true},{fid:0,fname:'企业店铺'},{fid:1,fname:'门店店铺'},{fid:2,fname:'员工店铺'},
		      {fid:3,fname:'加盟商店铺'},{fid:4,fname:'自营电子货架'},{fid:5,fname:'加盟商电子货架'},{fid:6,fname:'村级服务站'},{fid:7,fname:'PC企业商城'}],
		onChange:function(newValue,oldValue){
			if(oldValue==''||oldValue==undefined){
				return false;
			}
			selectStoretypedown(newValue)
		}
	})
	var storeTypeIDdown=$('#storeTypeIDdown').combo('getValue');
	if(storeTypeIDdown==-1){
		storeTypeIDdown="";
	}
	$("#storeNamedown").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		label:'店铺名称:',
		width:300,
		labelWidth:80,
		url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+storeTypeIDdown
	});
	//初始化按钮样式
	$("#downstock-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
	//---------------------------全部上下架--------------------------
	var downstockAll='<div style="padding-top:20px;">'+  
   	'<div style="height: 45px; "><input class="easyui-combobox" id="storeTypeIDdownAll" ></div>'+
   	'<div style="height: 45px"><input id="storeNamedownAll" type="text"></div>'+
   	'<div style="height: 45px"><input id="stockFsate"/></div>'+
   	'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="downStockAll();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closeDownstockAlldialog()" >取消</a></div></div>'
   	$("#downstockAll-dialog").append(downstockAll);
	$('#storeTypeIDdownAll').combobox({
		width:300,
		labelWidth:80,
		label:'店铺类型:',
		data:[{fid:-1,fname:'全部',selected:true},{fid:0,fname:'企业店铺'},{fid:1,fname:'门店店铺'},{fid:2,fname:'员工店铺'},
		      {fid:3,fname:'加盟商店铺'},{fid:4,fname:'自营电子货架'},{fid:5,fname:'加盟商电子货架'},{fid:6,fname:'村级服务站'},{fid:7,fname:'PC企业商城'}],
		onChange:function(newValue,oldValue){
				if(oldValue==''||oldValue==undefined){
					return false;
				}
					selectStoretypedownAll(newValue)
			}
	})
	$('#stockFsate').combobox({
		width:300,
		labelWidth:80,
		label:'上架状态:',
		data:[{fid:0,fname:''},{fid:2,fname:'上架'},{fid:3,fname:'下架'}]
		      
	})
	var storeTypeIDdownAll=$('#storeTypeIDdownAll').combo('getValue');
	if(storeTypeIDdownAll==-1){
		storeTypeIDdownAll="";
	}
	$("#storeNamedownAll").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		label:'店铺名称:',
		width:300,
		labelWidth:80,
		url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+storeTypeIDdownAll
	}); 
	//----------------------------------商品回收-------------------------------------
	var stockRecover='<div style="padding-top:20px;">'+  
   	'<div style="height: 45px; "><input class="easyui-combobox" id="storeTypeIDRecover" ></div>'+
   	'<div style="height: 45px"><input id="storeNameRecover" type="text"></div>'+
   	'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="RecoverStock();">确定</a>'+
   	'<a class="easyui-linkbutton" onclick="closeStockRecoverdialog()" >取消</a></div></div>'
   	//初始化弹框
	$("#stockRecover-dialog").append(stockRecover);
	$('#storeTypeIDRecover').combobox({
		width:300,
		labelWidth:80,
		label:'店铺类型:',
		data:[{fid:-1,fname:'全部',selected:true},{fid:0,fname:'企业店铺'},{fid:1,fname:'门店店铺'},{fid:2,fname:'员工店铺'},
		      {fid:3,fname:'加盟商店铺'},{fid:4,fname:'自营电子货架'},{fid:5,fname:'加盟商电子货架'},{fid:6,fname:'村级服务站'},{fid:7,fname:'PC企业商城'}],
		onChange:function(newValue,oldValue){
			if(oldValue==''||oldValue==undefined){
				return false;
			}
			selectStoretypeRecover(newValue)
		}
	})
	var storeTypeIDRecover=$('#storeTypeIDRecover').combo('getValue');
	if(storeTypeIDRecover==-1){
		storeTypeIDRecover="";
	}
	$("#storeNameRecover").jeasycombo({
		multiple : true,//是否多选
		type : "list",//弹出的样式
		label:'店铺名称:',
		width:300,
		labelWidth:80,
		url:"select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+storeTypeIDRecover
	});
	//初始化按钮样式
	$("#stockRecover-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='确定'){
			iconCls='icon-save'
		}else{
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
	//----------------------------------设置为新品-------------------------------------
	var stockNew='<div class="form-group" style="margin-left: 15px; margin-top: 10px;" disabled>'
		+'<label for="searchUseType" class=" control-label ">选择方式：</label>'
		+'<div style="width:295px;display: inline-block;" class="t-mask">'
		+'<div class="btn-group " role="group" id="searchUseType">'
		
		+'<input type="radio" name="stockNew" value="1" checked="checked"/>设置为新品</div>'
		+'<input type="radio" name="stockNew" value="0" checked="checked"/>取消新品</div>'
		+'</div>'
		+'<div class="div-mask" style="display: none;" id="divMask"></div>'
		+'</div>'
		+'</div>'
		+'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="stockNew(0);">确定</a>'
		+'<a class="easyui-linkbutton" onclick="closeStockNewdialog()" >取消</a></div></div>';
	$("#stockNew-dialog").append(stockNew);
	$("#stockNew-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='设置为新品'){
			iconCls='icon-ok'
		}else if($(this).html()=='取消新品'){
			iconCls='icon-cancel'
		}else if($(this).html()=='确定'){
			iconCls='icon-save'
		}else if($(this).html()=='取消'){
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
	//----------------------------------设置为尾货-------------------------------------
	var stockPoop='<div class="form-group" style="margin-left: 15px; margin-top: 10px;" disabled>'
		+'<label for="searchUseType" class=" control-label ">选择方式：</label>'
		+'<div style="width:295px;display: inline-block;" class="t-mask">'
		+'<div class="btn-group " role="group" id="searchUseType1">'
		+'<input type="radio" name="stockPoop" value="1" checked="checked"/>设置为尾货</div>'
		+'<input type="radio" name="stockPoop" value="0" checked="checked"/>取消尾货</div>'
		+'</div>'
		+'<div class="div-mask" style="display: none;" id="divMask"></div>'
		+'</div>'
		+'</div>'
		+'<div style="padding-left:200px;"><a class="easyui-linkbutton" onclick="stockNew(1);">确定</a>'
		+'<a class="easyui-linkbutton" onclick="closeStockPoopdialog()" >取消</a></div></div>';
	$("#stockPoop-dialog").append(stockPoop);
	$("#stockPoop-dialog").find('.easyui-linkbutton').each(function(){
		if($(this).html()=='设置为新品'){
			iconCls='icon-ok'
		}else if($(this).html()=='取消新品'){
			iconCls='icon-cancel'
		}else if($(this).html()=='确定'){
			iconCls='icon-save'
		}else if($(this).html()=='取消'){
			iconCls='icon-cancel'
		}
		$(this).linkbutton({
			iconCls: iconCls
		});
	})
	$("#hide-dialog").dialog({
		title:"商品发布/下架提示信息",
		body:'',
		footer:"<button class='btn btn-primary' aria-hidden='true' data-dismiss='modal' onclick='closeHidedialog()'>确定</button>"
	});
	//-------------------------erp下载----------------------------
	var downERP='<div style="padding-top: 40px;"><div style="height: 30px">'+
	 '&nbsp;&nbsp;&nbsp;<input type="radio" name="FSyncERP" value="1" checked="checked"/>允许</div>'+
	 '<div style="height: 45px">'+
	 '&nbsp;&nbsp;&nbsp;<input type="radio" name="FSyncERP" value="0"/>禁止</div></div>'+
	 '<div style="padding-left:200px;">'+
	 '<a class="easyui-linkbutton" onclick="downERP();">确定</a>'+
	  '<a class="easyui-linkbutton" onclick="closeDownERPdialog()" >取消</a></div></div>'
	$("#downERP-dialog").append(downERP);
	//-------------------------预下载设置----------------------------
	var downpre='<div style="padding-top: 40px;"><div style="height: 30px">'+
	 '&nbsp;&nbsp;&nbsp;<input type="radio" name="FIsPre" value="1" checked="checked"/>允许</div>'+
	 '<div style="height: 45px">'+
	 '&nbsp;&nbsp;&nbsp;<input type="radio" name="FIsPre" value="0"/>禁止</div></div>'+
	 '<div style="padding-left:200px;">'+
	 '<a class="easyui-linkbutton" onclick="downpre();">确定</a>'+
	  '<a class="easyui-linkbutton" onclick="closeDownpredialog()" >取消</a></div></div>'
	$("#downpre-dialog").append(downpre);
	//-------------------------二维码详情----------------------------
	var qrimg='<div><img width="200px;" style="margin: auto; display:block;" id="IMG_QR" src=""></div>'
	$("#qrimg").append(qrimg);
	//是否使用erp
//	var iserp=$("#unitID").attr("usecssoft");
//	if(parseInt(iserp)>0){
//		$(".jboot-table-toolbar div").find("a").eq(8).css("display","inline-block");
//		$(".jboot-table-toolbar div").find("a").eq(9).css("display","inline-block");
//	}else{
//		$("#fsyncERP").val(-1);
//		$("#fisPre").val(-1);
//		$(".jboot-table-toolbar div").find("a").eq(8).css("display","none");
//		$(".jboot-table-toolbar div").find("a").eq(9).css("display","none");
//	}
	
//	modal-header
//同步ERP库存
	var synQuanty='<div id="synQuanty" style="width:100%;height:135px;">'+
	     '<div class="progress-title">ERP库存同步中...</div>'+
	     '<div class="progress-panel">'+
	     	'<div class="progress-bar"></div>'+
	 '</div>'
	    +'</div>';
$("#synQuanty-dialog").append(synQuanty);
/*$("#synQuanty").parent().prev().css("display","none");
$("#synQuanty").parent().next().css("display","none");*/
//初始化linkbutton---确定&取消
$('body').find('.easyui-linkbutton').each(function(){
	if($(this).html()=='确定'){
		$(this).linkbutton({
			iconCls: 'icon-save'
		});
			
	}else if($(this).html()=='取消'){
		$(this).linkbutton({
			iconCls: 'icon-cancel'
		});
	}
	
})
});//初始化结束
function queryUnirID(){
	var unitid;
	$.ajax({
		type:"post",
		url:"unitstock/queryUnitidsto.do",
		dataType:"json",
		async : false, // 同步 等待ajax返回值
		success:function(data){
			unitid=data;
		}
	});
	return unitid;
}



/*************************************************************/	
//更新单位所属店铺 id---选中店铺类型
function selectStoretype(id){//公布
	if(id==-1){
		id="";
	}
	$("#storeName").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+id);
}
function selectStoretypedown(id){//下架
	if(id==-1){
		id="";
	}
	$("#storeNamedown").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+id);
}
function selectStoretypedownAll(id){//全部下架
	if(id==-1){
		id="";
	}
	$("#storeNamedownAll").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+id);
}
function selectStoretypeRecover(id){//商品回收
	if(id==-1){
		id="";
	}
	$("#storeNameRecover").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+id);
}
function selectStoretypedownAll(id){//全部上下架
	if(id==-1){
		id="";
	}
	$("#storeNamedownAll").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid="+unitid+"&userid=0&storetypes="+id);
}
//企业店铺商品发布
//发布确定按钮
function upStock(){
	//获取店铺fids(多个)
	var storeIds = $("#storeName").jeasycombo("getvalue").ids;
	var storeTypeId=$('#storeTypeID').combo('getValue');
	if(storeIds==undefined||storeIds==""){
		$.messager.alert("提示","您还没有选择店铺","error");
		return false;
	}
	if(storeTypeId==undefined||storeTypeId==""){
		$.messager.alert("提示","您还没有选择店铺类型","error");
		return false;
	}
	var storeTypeID=$("#storeTypeID").combo('getValue');
	var fstate=1;
	if($("#isup").prop("checked")){
		fstate=2;
	}
	if(fstate==2){
		$.messager.progress({text : "正在处理，请稍候..."});
		 $.ajax({
			 type:"POST",
			 url:"unitstock/queryStoreSubStockPriceBefore.do",
			 data:{'fstorestockID':stockids,'type':2},
			 dataType:"json",
			 async:false,
			 success:function(data){
				 $.messager.progress("close");//隐藏加载
				 if(data>0){
					 $.messager.confirm("确认","您所选择的商品包含价格为0的商品  确定要发布并上架吗？",function(r){
						 if(r){
							 $.messager.progress({text : "正在处理，请稍候..."});
							 $.ajax({
						        type:'post',
						        url: 'unitstock/upStockStore.do',
						        data:{'stockids':stockids,'storeIds':storeIds,'storeTypeID':storeTypeID,'fstate':fstate},
						        success:function(data){
						        	$.messager.progress("close");//隐藏加载
						        	if(data.result==1){
						        		$("#upstock-dialog").dialog("close");
						        		var trs = ""
						               	for (var i = 0; i < data.list.length; i++) {
						       				trs +="<tr><td>"+data.list[i].res+"</td></tr>"
						       			}
						               	var body='<div ><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
						       			     +trs+'</tbody></table></div>';
						               	$('#hide-dialog').dialog('clear')
						               	$("#hide-dialog").append(body);
						               	$("#hide-dialog").dialog("open");
						        	}else if(data.msg==2){
						        		$("#upstock-dialog").dialog("close");
						        		$.messager.alert("提示","发布成功","info");
						        	}else if(data.msg==3){
						        		$("#upstock-dialog").dialog("close");
						        		$.messager.alert("提示","该店铺没有此商品经营权","info");
						        	}else if(data.msg==4){
						        		$("#upstock-dialog").dialog("close");
						        		$.messager.alert("提示","商品包含积分商品,只能发布到企业店铺!","info");
						        	}else{
						        		$.messager.alert("提示",data.msg,"error");
						        	}
						        	
						        }
						      });	
						 }
						 
					 });
				 }else{
					 $.messager.progress({text : "正在处理，请稍候..."});
					 $.ajax({
					        type:'post',
					        url: 'unitstock/upStockStore.do',
					        data:{'stockids':stockids,'storeIds':storeIds,'storeTypeID':storeTypeID,'fstate':fstate},
					        success:function(data){
					        	$.messager.progress("close");//隐藏加载
					        	if(data.result==1){
					        		$("#upstock-dialog").dialog("close");
					        		var trs = ""
					               	for (var i = 0; i < data.list.length; i++) {
					       				trs +="<tr><td>"+data.list[i].res+"</td></tr>"
					       			}
					               	var body='<div style="height:300px;overflow-y: hidden;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
					       			     +trs+'</tbody></table></div>';
					               	$('#hide-dialog').dialog('clear')
					               	$("#hide-dialog").append(body);
					               	$("#hide-dialog").dialog("open");
					        	}else if(data.msg==2){
					        		$("#upstock-dialog").dialog("close");
					        		$.messager.alert("提示","发布成功","info");
					        	}else if(data.msg==3){
					        		$("#upstock-dialog").dialog("close");
					        		$.messager.alert("提示","该店铺没有此商品经营权","error");
					        	}else if(data.msg==4){
					        		$("#upstock-dialog").dialog("close");;
					        		$.messager.alert("提示","商品包含积分商品,只能发布到企业店铺!","error");
					        	}else{
					        		$.messager.alert("提示",data.msg,"error");
					        	}
					        	
					        }
					      });
				 }
				 
			 }
		 });
	}
	//访问发布
	else{
		$.messager.progress({text : "正在处理，请稍候..."});
	 $.ajax({
        type:'post',
        url: 'unitstock/upStockStore.do',
        data:{'stockids':stockids,'storeIds':storeIds,'storeTypeID':storeTypeID,'fstate':fstate},
        success:function(data){
        	$.messager.progress("close");//隐藏加载
        	if(data.result==1){
        		$("#upstock-dialog").dialog("close");
        		var trs = ""
               	for (var i = 0; i < data.list.length; i++) {
       				trs +="<tr><td>"+data.list[i].res+"</td></tr>"
       			}
               	var body='<div style="height:300px;overflow-y: hidden;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
       			     +trs+'</tbody></table></div>';
               	$('#hide-dialog').dialog('clear')
               	$("#hide-dialog").append(body);
               	$("#hide-dialog").dialog("open");
        	}else if(data.msg==2){
        		$("#upstock-dialog").dialog("close");
        		$.messager.alert("提示","发布成功","info");
        	}else if(data.msg==3){
        		$("#upstock-dialog").dialog("close");
        		$.messager.alert("提示","发布失败，该店铺没有此商品经营权","error");
        	}else if(data.msg==4){
        		$("#upstock-dialog").dialog("close");
        		$.messager.alert("提示","商品包含积分商品,只能发布到企业店铺!","error");
        	}else{
        		$.messager.alert("提示",data.msg,"error");
        	}
        	
        }
      });
	 }
 }
 
 //下架确定按钮
function downStock(){
	//获取店铺fids(多个)
	var storeIds = $("#storeNamedown").jeasycombo("getvalue").ids;
	if(storeIds==undefined||storeIds==""||stockids==undefined||stockids==""){
		$.messager.alert("提示","您还没有选择店铺","error");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	//访问发布
	$.ajax({
		type:'post',
		url: 'unitstock/downStockStore.do',
		data:{storeIds:storeIds,stockids:stockids},
		success:function(data){
			$.messager.progress("close");//隐藏加载
			if(data.result==1){
				$("#downstock-dialog").dialog("close");
				var trs = ""
	        	for (var i = 0; i < data.list.length; i++) {
					trs +="<tr><td>"+data.list[i].res+"</td></tr>"
				}
	        	var body='<div style="height:300px;overflow-y: hidden;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
				     +trs+'</tbody></table></div>';
	        	$('#hide-dialog').dialog('clear')
               	$("#hide-dialog").append(body);
               	$("#hide-dialog").dialog("open");
			}else if(data.msg==2){
				$("#downstock-dialog").dialog("close");
				$.messager.alert("提示","下架成功","info");
			}else{
				$.messager.alert("提示",data.msg,"error");
			}
		}
	});	
}
//下架确定按钮
function downStockAll(){
    //商品ids
	//获取店铺fids(多个)
	var storeIds = $("#storeNamedownAll").jeasycombo("getvalue").ids;
	if(storeIds==undefined||storeIds==""){
		$.messager.alert("提示","您还没有选择店铺","error");
		return false;
	}
	var fsate=$("#stockFsate").combobox('getValue');
	var mssage="";
	if(fsate==0){
		$.messager.alert("提示","请选择状态","error");
		return false;
	}else if(fsate==2){
		mssage="上架";
	}else if(fsate==3){
		mssage="下架";
	}
	$.messager.confirm("确定 ","您所选的店铺所有商品都将"+mssage+",确定要执行该操作吗？",function(r){
	//访问发布
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				type:'post',
				url: 'unitstock/editStoreStockFState.do',
				data:{ids:storeIds,fsate:fsate},
				success:function(data){
					$.messager.progress("close");//隐藏加载
					if(data.result){
					    $.messager.alert("提示",data.msg,"info");
					}else{
						$.messager.alert("提示",data.msg,"error");
					}
				}
			});
		}
		
  });
}
//下架所有
function down_stock(){
	$("#downstockAll-dialog").dialog("open");
}
//商品回收确定按钮
function RecoverStock(){
	//获取店铺fids(多个)
	var storeIds = $("#storeNameRecover").jeasycombo("getvalue").ids;
	if(storeIds==undefined||storeIds==""||stockids==undefined||stockids==""){
		$.messager.alert("提示","您还没有选择店铺或商品","error");
		return false;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	//访问商品回收
	$.ajax({
		type:'post',
		url: 'unitstock/recoverStockStore.do',
		data:{storeIds:storeIds,stockids:stockids},
		success:function(data){
			$.messager.progress("close");//隐藏加载
			if(data.result==1){
				$("#stockRecover-dialog").dialog("close");
				var trs = ""
	        	for (var i = 0; i < data.list.length; i++) {
					trs +="<tr><td>"+data.list[i].res+"</td></tr>"
				}
	        	var body='<div style="height:300px;overflow-y: hidden;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
				     +trs+'</tbody></table></div>';
	        	$('#hide-dialog').dialog('clear')
               	$("#hide-dialog").append(body);
               	$("#hide-dialog").dialog("open");
			}else if(data.msg==2){
				$("#stockRecover-dialog").dialog("close");
				$.messager.alert("提示","回收成功","info");
			}else{
				$.messager.alert("提示",data.msg,"error");
			}
		}
	});	
}

/**
 * 设置为新品/尾货（金鑫）
 * @returns 
 */
function stockNew(type){
	
	
	var callback = function(data){
		if(data.result == false){
			$.messager.alert("提示","有商品未发布到采销平台，请先发布到采销平台","error");
			$("#stockNew-dialog").dialog("close");
			$("#stockPoop-dialog").dialog("close");
			return false;
		}
		var fstate = "2";
		var FStockType="0";
		if(type ==0){
			 $('#searchUseType').find('input').each(function(){
				 if($(this).checked){
					 FStockType=$(this).value;
				 }
			 })
		}else{
			 $('#searchUseType').find('input').each(function(){
				 if($(this).checked){
					 FStockType= $(this).value;
				 }
			 })
		}
		
		$.messager.progress({text : "正在处理，请稍候..."});
		//访问发布
		$.ajax({
			type:'post',
			url: 'unitstock/stockNew.do',
			data:{stockids:stockids,FStockType:FStockType,type:type,fstate:fstate},
			success:function(data){
				$.messager.progress("close");//隐藏加载
				$("#stockNew-dialog").dialog("close");
				$("#stockPoop-dialog").dialog("close");
				if(data.result==true){
					$.messager.alert("提示",data.msg,"info");
				}else{
					$.messager.alert("提示",data.msg,"error");
				}
			},error:function(){
				$.messager.progress("close");//隐藏加载
				$("#stockNew-dialog").dialog("close");
				$("#stockPoop-dialog").dialog("close");
				$.messager.alert("提示","系统异常!","info");
			}
		});	
	}
	
	isPublish2TC(stockids,callback);
}

//判断商品是否已经发不到采销平台
function isPublish2TC(ids,callback){
	$.messager.progress({text : "正在处理，请稍候..."});
	//访问发布
	$.ajax({
		type:'post',
		url: 'unitstock/isPublish2TC.do',
		data:{ids:ids},
		async:false,
		success:function(data){
			$.messager.progress("close");//隐藏加载
			//console.log(data.result)
			callback(data);
		},error:function(){
			$.messager.progress("close");//隐藏加载
			return false;
		}
	});	
}


/*//是否联营change事件
function ispool(){
	var flinked=$("#Flinked").val();
	if(flinked==0){$("#pool").jbootcombo("setvalue","");}
}*/
/**
 * 获取当前页参数---王文樟7月21日加
 */
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURIComponent(r[2]); return null;
}
// 设置ERP
function downERP(){
	 var chk=0;
	 var chkObjs = document.getElementsByName("FSyncERP");
     for(var i=0;i<chkObjs.length;i++){
         if(chkObjs[i].checked){
             chk = chkObjs[i].value;
             break;
         }
     }
     $.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"unitstock/downERP.do?stockids="+stockids+"&fsyncERP="+chk,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载
 	  		  if(data.result){
 	  			  $.messager.alert("提示","设置成功！","info",function(){
 	  				$("#downERP-dialog").dialog("close");
 	  				$("#easy_table").datagrid("reload");//刷新数据
 	  			  });
 	  		  }else{
 	  			  $.messager.alert("提示",data.msg,"error");	  
		   }
 	  		 },error:function(data){
 	  			$.messager.progress("close");//隐藏加载
  	  				$.messager.alert("提示","系统错误！","error");
		}
		
//		
//		success:function(data){
//		   $.jbootloading("hide");//显示加载中
//		   $("#downERP-dialog").dialog("hide");
//		   if(data.result==1){
//			   $.messager.alert("设置成功");
//			   $("#easy_table").datagrid("reload");//刷新数据
//		   }
//		}
	});
 }

//商品预定设置
function downpre(){
	 var chk=0;
	 //单选框
	 var chkObjs = document.getElementsByName("FIsPre");
     for(var i=0;i<chkObjs.length;i++){
         if(chkObjs[i].checked){
             chk = chkObjs[i].value;
             break;
         }
     }
     $.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:"POST",
		url:"unitstock/downpre.do?stockids="+stockids+"&fIsPre="+chk,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载
 	  		  if(data.result){
 	  			  $.messager.alert("提示","设置成功！","info",function(){
 					$("#downpre-dialog").dialog("close");
 					$("#easy_table").datagrid("reload");//刷新数据
 	  			  });
 	  		  }else{
 	  			  $.messager.alert("提示",data.msg,"error");	  
		   }
 	  		 },error:function(data){
 	  			$.messager.progress("close");//隐藏加载
  	  			$.messager.alert("提示","系统错误！","error");
		}

	});
	
}
//	对选择的商品进行库存同步
function products(ids){
	$.messager.progress({
		title:'Please waiting',
		msg:'ERP库存同步中...'
		});
	$.ajax({
		type:"POST",
		url:"unitstock/syncStockQuanty.do?ids="+ids,
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载
			if(data.result){
				$.messager.alert("提示",data.msg,"info");
				$.messager.progress('close');
			}else{
				$.messager.alert("提示",data.msg,"error");
				$.messager.progress('close');
			}
		},error:function(){
			$.messager.progress('close');
			$.messager.alert("提示","连接超时","error");
		}
	});
}
//下载到ERP的商品进行库存同步
function allProducts(){
	$.messager.progress({
		msg:'ERP库存同步中...'
		});
	$.ajax({
		type:"POST",
		url:"unitstock/syncStockQuantyIsDown.do",
		dataType:"json",
		success:function(data){
			if(data.result){
				$.messager.progress('close');
				$.messager.alert("提示",data.msg,"info");
			}else{
			    $.messager.progress('close');
			    $.messager.alert("提示",data.msg,"error");
			}
		},error:function(){
			$.messager.progress('close');
			$.messager.alert("提示","连接超时","error");
		}
	});
}
//发布到采销平台
function goPurchase(ids,rows){
	$.messager.confirm("确定","确认将所选商品发布到采销平台？",function(r){
		if(r){
			$.messager.progress({text : "正在处理，请稍候..."});
			$.ajax({
				url: "unitstock/stockPublishToCS.do?ids="+ids,
				dataType: "json",
				success:function(data){
//					if(data){
//						$.jbootmsg("发布成功","info");
//						$("#jboottable").jboottable("refresh");//刷新数据
//					}else{
//						$.jbootmsg("发布失败","error");
//					}
					$.messager.progress("close");//隐藏加载
					if(data.result==1){
//			        		$("#upstock-dialog").jbootdialog("hide");
		        		var trs = ""
		               	for (var i = 0; i < data.list.length; i++) {
		       				trs +="<tr><td>"+data.list[i].res+"</td></tr>"
		       			}
		               	var body='<div style="height:300px;overflow-y: hidden;overflow-x:hidden;"><table class="table jboot-table"><thead><tr><th>提示信息</th></thead<tbody>'
		       			     +trs+'</tbody></table></div>';
		               	$('#hide-dialog').dialog('clear')
		               	$("#hide-dialog").append(body);
		               	$("#hide-dialog").dialog("open");
		        	}else if(data.msg==2){
		        		$("#upstock-dialog").dialog("close");
		        		$.messager.alert("提示","发布成功");
		        		$("#easy_table").datagrid("reload");//刷新数据
		        	}else if(data.msg==3){
		        		$("#upstock-dialog").dialog("close");
		        		$.messager.alert("提示","发布失败，该店铺没有此商品经营权");
		        	}else if(data.msg==4){
		        		$("#upstock-dialog").dialog("close");
		        		$.messager.alert("提示","商品包含积分商品,只能发布到企业店铺!");
		        	}else{
		        		$.messager.alert("提示",data.msg,"error");
		        	}
				},error:function(){
					$.messager.progress("close");//隐藏加载
					$.messager.alert("提示","发布失败","error");
				}
			});
		}
		 
	});

}
//点击事件  弹出商品详情二维码
function dialogQr(stockid){
    var unitid=queryUnirID();
	var base=$("base").attr("href");
    var url="select/qr.do?w=140&content="+base+"elecShelf/showMOStockByID.do?unitid="+unitid+"@andstockid="+stockid; 
    $("#IMG_QR").attr("src",url);
	$("#qrimg").dialog("open");
	
}
function privew(stockid){
    var unitid=queryUnirID();//获取企业单位ID
	window.open("elecShelf/showMOStockByID.do?unitid="+unitid+"&stockid="+stockid);
}
//导出Exexl
function exportExcel_stock(){
	var jsonobj=$("#easy_table").datagrid("options").queryParams.jsonobj;
	var pageNo=$("#easy_table").datagrid("options").pageNumber;
	var pageSize=$("#easy_table").datagrid("options").pageSize;
	var str=$('<form id="execlStock" action="unitstock/exportExcel_stock.do" method="post"></form>');
	var obj=$('<input type="hidden" name="jsonobj">');
	var page=$('<input type="hidden" name="pageNo" value="'+pageNo+'">');
	var size=$('<input type="hidden" name="pageSize" value="'+pageSize+'">');
	obj.val(jsonobj);
	obj.appendTo(str);
	page.appendTo(str);
	size.appendTo(str);
	str.appendTo(document.body);
	str.submit();
	document.body.removeChild(str.get(0));
	$(document.body).remove("form:last");
	
	/*$.ajax({
		type:"POST",
		url:"unitstock/exportExcel_stock.do",
		data:$("#jboottable").jboottable("getSearchParam").params,
		dataType:"json",
		success:function(data){
			alert(JSON.stringify(data));
		}
	});*/
}

function centershop(){
	window.open("unitstock/pagequeryStdStockNew.do");
}
//关闭弹出框
function closeHidedialog(){//提示框
	$('#hide-dialog').dialog('close');
}
function closeDownstockdialog(){//下架
	$('#downstock-dialog').dialog('close');
}
function closeUpstockdialog(){//发布
	$('#upstock-dialog').dialog('close');
}
function closeSetpooldialog(){//设置联营商
	$("#setpool-dialog").dialog('close');
}
function closeStockRecoverdialog(){//商品回收
	$("#stockRecover-dialog").dialog('close');
}
function closeDownERPdialog(){//ERP下载
	$("#downERP-dialog").dialog('close');
}
function closeDownpredialog(){//预定设置
	$("#downpre-dialog").dialog('close');
}
function closeStockNewdialog(){//设置新品
	$("#dstockNew-dialog").dialog('close');
}
function closeStockPoopdialog(){//设置尾货
	$("#stockPoop-dialog").dialog('close');
}
function closeDownstockAlldialog(){//全部上下架
	$("#downstockAll-dialog").dialog('close');
}