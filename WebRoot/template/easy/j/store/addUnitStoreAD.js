var storeid = $("#FStoreID").val();
var ftemplatetype = $("#templateType").val();
var templateId = $("#templateId").val();
var fwxphotoadid= $("#fid_val").val();
var fwxadtypeid= $("#fwxadtypeid_val").val();

$(function() {
	if (fwxphotoadid<=0 || fwxphotoadid==""){
		$("#stockclassh").hide();
		$("#markh").hide();
		$("#stockh").hide();
		$("#urlh").hide();
		$("#imgurlh").hide();
		$("#applytopageh").hide();//适用页面
		$("#rgbh").hide();
		$("#imgcate").hide();
		$("#frgbco").hide();
		$("#floorh").hide();
	}else{
		changeControl(templateId, fwxadtypeid);
	}
	
	$("#FWXADTypeID").jeasycombo({
		label:"广告类型:",
		labelWidth:250,
		width:550,
		dlgwidth:500,
		dlgheight:400,
		multiple : false,//是否多选
		type : "list",//弹出的样式
		url: "store/selectWXADType.do?templateId="+templateId,
		onChange: function(ids, texts){
			//$("#FName").val(texts);
			$("#FName").textbox("setValue",texts);
			changeControl(templateId, ids);
		}
	});
	
	console.log("FOrder" + $("#FOrder").val());
	if($("#FOrder").val() != ""){
		$("#FOrder").combobox("setValue",$("#FOrder").val());
	}
	    
	var fid=$("#userid").val();
	if(fid>0){//判断是否登录
		$("#FStockID").jeasycombo({	
			label:"适用商品:",
			labelWidth:250,
			width:550,	
			dlgwidth:500,
			dlgheight:400,
			multiple : false,//是否多选
			type : "list",//弹出的样式
			url : "store/selectStock.do?stockClassId=&markId=&isMuti=false&storeId="+storeid+"&userId="+fid
		});
		
		$("#FStockClassID").jeasycombo({
			label:"适用商品类别:",
			labelWidth:250,
			width:550,
			dlgwidth:500,
			dlgheight:400,
			multiple : false,//是否多选
			type:"tree",
			url : "select/stockClass.do?t=3&sid="+storeid,
			onChange: function(ids, texts){
				var fmarkid = $("#FMarkID").jeasycombo("getvalue").ids;
				$("#FStockID").jeasycombo("reload", "store/selectStock.do?stockClassId="+ids+"&markId="+fmarkid+"&isMuti=false&storeId="+storeid+"&userId="+fid);
				$("#FStockID").jeasycombo("disabled", false);
			}
		});
		
		$("#FMarkID").jeasycombo({
			label:"适用品牌:",
			labelWidth:250,
			width:550,
			dlgwidth:500,
			dlgheight:400,
			multiple : false,//是否多选
			isinline:false,
			linenum:3,
			type : "list",//弹出的样式
			url : "select/storemark.do?storeid="+storeid,
			onChange: function(ids, texts){
				var fstockclassid = $("#FStockClassID").jeasycombo("getvalue").ids;
				$("#FStockID").jeasycombo("reload", "store/selectStock.do?stockClassId="+fstockclassid+"&markId="+ids+"&isMuti=false&storeId="+storeid+"&userId="+fid);
				$("#FStockID").jeasycombo("disabled", false);
			}
		});
		
		if (templateId==2002||templateId==2000||templateId==2005||templateId==2004){
			$("#FFloor").jeasycombo({
				label:"楼层:",
				labelWidth:250,
				width:550,
				dlgwidth:500,
				dlgheight:400,
				multiple:false,
				type: "list",
				url: "select/storeFloor.do?storeid="+storeid
			});
		}
	}else{
		window.parent.gotoLogin();
	}
		
	var upload_url = "upload_image_ad_multiple_json.do";
	if (ftemplatetype==0){//如果是微铺则限制图片大小
		upload_url = "upload_image_mo_multiple_json.do";
	}
	
	$("#FImgURL").jeasyupload({
		label:"广告图片:",
		labelWidth:250,
		width:550,
		url:upload_url,
		btn1:$("#btnImg"),
		parent1:$("body"),
		fileserverpath:$("#fileServerPath").val(),
		afterCustomerImg:function(i,file,o){
			//o.customImg(i,file,o);
			//var url = file["relativeurl"];
			//$("#FImgURL").val(url);
			//url = $("#fileServerPath").val()+url;
			checkPhoto(url);
		}
	});
	if($("#FImgURL").val() != ""){
		$("#FImgURL").jeasyupload("setValue",$("#FImgURL").val());
	}
	
	if(templateType==1&&templateId==2003){
		//上传大类广告图
		$("#FCateImgUrl").jeasyupload({
			label:"大类广告图:",
			labelWidth:250,
			width:550,
			url:upload_url,
			btn1:$("#btnaddimg"),
			parent1:$("body"),
			fileserverpath:$("#fileServerPath").val(),
			afterCustomerImg:function(i,file,o){
				//var url = file["relativeurl"];
				//$("#FCateImgUrl").val(url);
				//url = $("#fileServerPath").val()+url;
				checkPhoto(url);
			}
		});
		if($("#FCateImgUrl").val() != ""){
			$("#FCateImgUrl").jeasyupload("setValue",$("#FCateImgUrl").val());
		}
	}
	
	//初始化颜色选择框
	$("#colorDialog").dialog({//FF0000
		modal:true,
		closed:true,
		title:"请选择颜色",
		body:"<form class='form-horizontal' role='form'>"
		  	 	+ "<div class='form-group' style='margin:0 auto;width:300px'>"
			  	+ "<input class='inputColor' style='background-color:#df0044' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input class='inputColor' style='background-color:#6ccfff' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input class='inputColor' style='background-color:#9d77ff' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input class='inputColor' style='background-color:#e13894' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input class='inputColor' style='background-color:#8146d6' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input class='inputColor' style='background-color:#a60051' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input class='inputColor' style='background-color:#d76000' readonly onclick='changeStyle(this)'/>"				  	
			  	+ "<input type='hidden' id='colorid' value='${addUnitStoreADMap.frgb}'/>"
		  		+ "</div>"
	  			+ "</form>",
			footer:"<button class='btn btn-primary combo-submit' onclick='confirmColor()'>确定</button>" 
				+ "<button class='btn btn-default' data-dismiss='modal'>取消</button>"
	});
	
	//使用封面
	$("#useCover").click(function(){
		var id=$("#FStockID").jeasycombo("getvalue").ids;//获取商品id
		if(id==""){
			$.messager.alert("提示","请先选择适用商品后，再进行操作");
			return false;
		}
		$.ajax({
			type:'POST',
			url:'store/useCover.do?id='+id,
			dataType:'json',
			success:function(data){
				$.each(data.rows,function(n,value){
					$("#FImgURL").jeasyupload("setValue",value.fcover);
				});
			}
		});
	});
});

//显示颜色选择弹窗
function showDialog(){
	$("#colorDialog").dialog("open");
}

//选中颜色时更改样式
function changeStyle(obj){
	$(obj).siblings().removeClass("checkedColor");
	$(obj).addClass("checkedColor");
}

//确定操作
function confirmColor(){
	//记录色值
	var colorVal = $("#colorid").prevAll(":input[class='inputColor checkedColor']").css("background-color");
	$("#colorid").val(colorVal.replace("rgb(","").replace(")",""));
	$("#FRGB").attr("placeholder", "").css("background-color", colorVal);
	$("#colorDialog").dialog("close");
}

//点叉号清空颜色
function clearColor(){
	$("#colorid").val("");
	$("#FRGB").attr("placeholder", "请选择背景色").css("background-color", "");
}
	
//点击保存
function save(){		
	//var ftemplatetype = decodeURI(requestParam("templateType"));
	var frgb = "";
	var ffloorid = "";
	//var templateId = ${templateId};
	var fstockclassid = $("#FStockClassID").jeasycombo("getvalue").ids;
	var fmarkid = $("#FMarkID").jeasycombo("getvalue").ids;
	var fstockid = $("#FStockID").jeasycombo("getvalue").ids;
	var fwxadtypeid = $('#FWXADTypeID').jeasycombo("getvalue").ids;
	var fname = $('#FName').val();
	var furl = $('#FURL').val();
	var fimgurl = $('#FImgURL').val();
	var forder = $('#FOrder').val();
	//var fwxphotoadid="${addUnitStoreADMap.fid}";
	var fstoreid= $('#FStoreID').val();	
	var fmark = $('#applytopage').val();	
	var fcateimgurl= $('#FCateImgUrl').val();  //大类广告
	var frgbcolor= $('#colorid').val();
    var flogo = "";
    
	if (templateId==2002||templateId==2000||templateId==2004||templateId==2005){
		ffloorid=$("#FFloor").jeasycombo("getvalue").ids;
	}
	console.log(templateId+"__"+ffloorid);
	
	if (fwxadtypeid<=0||fwxadtypeid==""||fwxadtypeid==undefined) {
		$.messager.alert("提示","【广告类型】不能为空！", "info");
		return false;
	}
	console.log("[fname]:["+fname+"]");
	if (fname==0||fname==""||fname==undefined) {
		$.messager.alert("提示","【广告名称】不能为空！", "info");
		return false;
	}	

	if (fwxadtypeid==6){
		if ( (fstockclassid==0 || fstockclassid=="" || fstockclassid==undefined ) && fstockid=="" && fmarkid=="" ) {
			$.messager.alert("提示","【商品类别】不能为空！", "info");
			return false;
		}
	}
	if (fwxadtypeid==6){
		if ((fmarkid==0||fmarkid==""||fmarkid==undefined)&&fstockid==""&&fstockclassid=="") {
			$.messager.alert("提示","【商品品牌】不能为空！", "info");
			return false;
		}
	}
	
	if (fwxadtypeid==7){
		if (fstockid==0||fstockid==""||fstockid==undefined) {
		$.messager.alert("提示","【适用商品】不能为空！", "info");
			return false;
		}
	}	
	
	if (templateId==2002&fwxadtypeid!=19&fwxadtypeid!=20){
		if (fimgurl==""){
			$.messager.alert("提示","【广告图片】不能为空！", "info");
			return false;
		}
	}
	
	if ((templateId!=2002&ftemplatetype==1&fwxadtypeid!=9)||(ftemplatetype==0&&ftemplatetype!=6&&fwxadtypeid!=9)){ //电子货架选择类别广告时不需要广告图片
		if (fimgurl==""){
			$.messager.alert("提示","【广告图片】不能为空！", "info");
			return false;
		}
	}
	
	if (templateId==2002&fwxadtypeid==19){
		if (fstockclassid==""&fmarkid==""&fstockid==""){
			$.messager.alert("提示","【广告类型】为“热搜词六个”时，商品类别、品牌、商品必须选择一项！", "info");
			return false;
		}
	}
	
	if (templateId==2002&fwxadtypeid==20){
		if ((fstockclassid==""||fstockclassid==0||fstockclassid==undefined)&
				(fmarkid==""||fmarkid==0||fmarkid==undefined)&
				(fstockid==""||fstockid==0||fstockid==undefined)){
			$.messager.alert("提示","【广告类型】为“导航栏八个”时，商品类别、品牌、商品必须选择一项！", "info");
			return false;
		}
	}
	
	if (fwxadtypeid==15){
		if (fmarkid==""||fmarkid==0||fmarkid==undefined){
			$.messager.alert("提示","【广告类型】为“品牌广告十张”时，品牌不能为空！", "info");
			return false;
		}
	}
	
	if (fwxadtypeid==9&(fstockclassid==""||fstockclassid==0||fstockclassid==undefined)){
		$.messager.alert("提示","【广告类型】为“类别广告”时，商品类别不能为空！", "info");
		return false;	
	}
	
	if (fwxadtypeid==16||fwxadtypeid==17||fwxadtypeid==18||fwxadtypeid==31||fwxadtypeid==32||fwxadtypeid==33||fwxadtypeid==34||fwxadtypeid==35||fwxadtypeid==36){
		if (ffloorid==""||ffloorid==0||ffloorid==undefined){
			$.messager.alert("提示","【广告类型】为“楼层广告”时，楼层不能为空！", "info");
			return false;
		} 
	}
	
	//var v_forder = bindvalidate("#FOrder","number",true,"排序");
	if (forder==""||forder==0||forder==undefined){
		$.messager.alert("提示","【排序】不能为空！", "info");
		return false;
	}
	
	if (templateId!=2002&(ftemplatetype==1 || ftemplatetype==8)&fwxadtypeid==1){ //电子货架大屏广告
		frgb = $('#colorid').val(); 
		if (frgb==""){
			$.messager.alert("提示","【页面背景色RGB】未选择！", "info");
			return false;
		}
	}
	
	//电子货架增加LOGO
	if (templateId==2001&fwxadtypeid==12){
		flogo = $('#FImgURL').val();
		if (flogo==""){
			$.messager.alert("提示","【LOGO图片】不能为空！", "info");
			return false;
		}
	}
	
	var data={};
	/* data["fbegindate"]=fbegindate;
	data["fenddate"]=fenddate; */
	data["fstockclassid"]=fstockclassid;
	data["fmarkid"]=fmarkid;
	data["fstockid"]=fstockid;
	data["fwxadtypeid"]=fwxadtypeid;
	data["fname"]=fname;
	data["furl"]=furl;
	data["fimgurl"]=fimgurl;
	data["forder"]=forder;
	data["fstoreid"]=fstoreid;
	data["fwxphotoadid"]=fwxphotoadid; 
	data["frgb"]=frgb;
	data["ffloorid"]=ffloorid;
	data["ftemplateid"]=templateId;
	data["fmark"]=fmark;
	data["fcateimgurl"]=fcateimgurl;
	/* if(ftemplatetype=="7"&&fwxadtypeid=="1"){
		data["frgb"]=frgbcolor;
	} */
	//新模板需求，大屏广告、类别广告都要设置背景色
	data["frgb"]=frgbcolor;
    data["flogo"]=flogo;

	var jsonData={
		jsonobj:JSON.stringify(data)
	};
	//console.log(JSON.stringify(data));
	//return;
	//添加
	$.messager.progress({text : "正在处理，请稍候..."});
	if (fwxphotoadid==0 || fwxphotoadid=="") {
		$.ajax({
			type:'POST',
			url: "store/insertUnitStoreAD.do",
			dataType: "json",
			data: jsonData,
			success: function(data){
				$.messager.progress("close");
				if (data.result) {
					$.messager.alert("提示","添加成功", "info",function(){
						window.parent.search();
					});
				}else{
					$.messager.alert("提示",data.msg, "error");
				}
			}
		});
	}
	//修改
	else{
		$.ajax({
			type:'POST',
			url:"store/updateUnitStoreAD.do",
			dataType : "json",
			data: jsonData,
			success:function(data){
				$.messager.progress("close");
				if (data.result) {
					$.messager.alert("提示","编辑成功", "info",function(){
						window.parent.search();
					});
				} else {
					$.messager.alert("提示",data.msg, "error");
				}
				
			}
		});
	}
}
	
function checkPhoto(imgUrl){
	console.log(imgUrl);
	var image = new Image();
	image.src = imgUrl;
	var width = image.width;
	var b = true;
	console.log(imgUrl+"|"+width);
	//var templateId = ${templateId};
	var fwxadtypeid = $('#FWXADTypeID').jeasycombo("getvalue").ids;
		
	//大幅广告
	if (fwxadtypeid==1){
		if (templateId==1||templateId==2||templateId==3){
			if (width>640){
				b = false;
			}
		}
	}else
	
	//新品上市
	if (fwxadtypeid==2){
		if (templateId==1002||templateId==1003){
			if (width>640){
				b = false;
			}
		}
	}else

	//底部广告
	if (fwxadtypeid==3){
		if (templateId==1001){
			if (width>640){
				b = false;
			}
		}
	}else
	
	//家电推荐
	if (fwxadtypeid==4){
		if (templateId==1002){
			if (width>640){
				b = false;
			}
		}
	}else
		
	//限时抢购
	if (fwxadtypeid==5){
		if (templateId==1002){
			if (width>600){
				b = false;
			}
		}
	}else
		
	//精品推荐
	if (fwxadtypeid==6){
		if (templateId==1001||templateId==1002){
			if (width>600){
				b = false;
			}
		}
	}else
	
	//热销商品
	if (fwxadtypeid==7){
		if (templateId==1001||templateId==1002){
			if (width>640){
				b = false;
			}
		}
	}else
	
	//热销商品
	if (fwxadtypeid==9){
		if (templateId==1001){
			if (width>320){
				b = false;
			}
		}
	}else
		
	//特价商品
	if (fwxadtypeid==10){
		if (templateId==1003){
			if (width>320){
				b = false;
			}
		}
	}else
	
	//LOGO图片
	if (fwxadtypeid==12){
		if (templateId==1001||templateId==1002||templateId==1003||templateId==2002){
			if (width>185){
				b = false;
			}
		}
	}else
		
	//首页版-大屏侧边广告三张
	if (fwxadtypeid==13){
		if (templateId==2002){
			if (width>220){
				b = false;
			}
		}
	}else
		
	//首页版-促销活动广告四张	
	if (fwxadtypeid==14){
		if (templateId==2002){
			if (width>250){
				b = false;
			}
		}
	}else
	
	//首页版-品牌广告十张	
	if (fwxadtypeid==15){
		if (templateId==2002){
			if (width>100){
				b = false;
			}
		}
	}else
		
	//首页版-楼层广告左边一张
	if (fwxadtypeid==16){
		if (templateId==2002){
			if (width>240){
				b = false;
			}
		}
	}else
		
	//首页版-楼层广告中间八张
	if (fwxadtypeid==17){
		if (templateId==2002){
			if (width>200){
				b = false;
			}
		}
	}else
		
	//首页版-楼层广告右边五张
	if (fwxadtypeid==18){
		if (templateId==2002){
			if (width>200){
				b = false;
			}
		}
	}
		
	if (!b){
		$.messager.confirm('提示', "选择的图片宽度超过指定像素，会导致图片变形，是否重新选择？", function(r){
			if(f){
				$("#FImgURL").val("");	
			}
		});
	}
}

function changeControl(templateid, adtypeid){
	$("#stockclassh").show();
	$("#markh").show();
	$("#stockh").show();
	$("#urlh").show();
	$("#imgurlh").show();
	$("#applytopageh").hide();
	$("#rgbh").hide();
	
	//控制广告图片的尺寸提示
	if(adtypeid == "1"){
		$("#imgSize").empty().text("图片尺寸：950*520");
	}else if(adtypeid == "9"){
		$("#imgSize").empty().text("图片尺寸：270*310");
	}
	//当广告类型为类别广告时，隐藏适用商品选择框
	if(adtypeid == "9"){
		$("#stockh").hide();
	}

	//电子货架-标准版
	if ((templateid==2001||templateid==2006)&adtypeid==1){
		$("#rgbh").show();
	}

	if(templateid==2000&&adtypeid==1){
		$("#rgbh").show();	
	}
	
	if(templateid==2003&&adtypeid==1){
		$("#rgbh").show();	
	}
	
	if((templateid==2004||templateid==2005)&&adtypeid==1){
		$("#rgbh").show();	
	} 
	if(templateid==2003&&adtypeid==9){
		$("#imgcate").show();
		$("#rgbh").show();
		//$("#frgbco").show();	
	}
	//新模板:安卓TV横版、TV竖版,大屏广告类别广告都要设置背景色
	if(templateid == 2007 || templateid == 2008){
		$("#rgbh").show();	
	}
	
	
	//电子货架-首页版
	if (templateid==2002){
		$("#floorh").show();	
	}
	
	//品牌广告时商品类别、商品不显示
	if (adtypeid==27){
		$("#stockh").hide();
		$("#stockclassh").hide();
	}
	
	//二维码时商品类别、品牌、商品不显示
	if (adtypeid==28){
		$("#stockh").hide();
		$("#stockclassh").hide();
		$("#markh").hide();
	}
	
	//背景图片时商品类别、品牌、商品不显示
	if (adtypeid==29){
		$("#stockh").hide();
		$("#stockclassh").hide();
		$("#markh").hide();
	}
	
	if (templateid==1001){ //微铺模板1-经典版
		//页面头部、页面尾部公共广告
		if(adtypeid == 24 || adtypeid == 25){
			$("#applytopageh").show();
		}
	}else if (templateid==1002){ //微铺模板2-精品版
		//页面头部、页面尾部公共广告
		if(adtypeid == 24 || adtypeid == 25){
			$("#applytopageh").show();
		}
	}else if (templateid==1003){ //微铺模板3-珍藏版
		//页面头部、页面尾部公共广告
		if(adtypeid == 24 || adtypeid == 25){
			$("#applytopageh").show();
		}
	}else if(templateid==1005){
		//页面头部、页面尾部公共广告
		if(adtypeid == 24 || adtypeid == 25){
			$("#applytopageh").show();
		}
	}else if (templateid==2001){ //电子货架-标准版
		if (adtypeid==1){
			$("#stockclassh").hide();
			$("#markh").hide();
			$("#stockh").hide();
			$("#urlh").hide();
			$("#lblImgURL").text("广告图片");
		}else if (adtypeid==9){
			$("#markh").hide();
			$("#stockh").hide();
			$("#urlh").hide();
			$("#imgurlh").hide();
			$("#lblImgURL").text("广告图片");
		}else if (adtypeid==12){
			$("#stockclassh").hide();
			$("#markh").hide();
			$("#stockh").hide();
			$("#urlh").hide();
			$("#orderh").hide();
			$("#lblImgURL").text("LOGO图片");
		}
	}else if (templateid==2002){ //电子货架-首页版
		if (adtypeid==1||adtypeid==12||adtypeid==13||adtypeid==14||adtypeid==22){
			$("#floorh").hide();
		}else if (adtypeid==19||adtypeid==20){
			$("#imgurlh").hide();
			$("#floorh").hide();
		}else if (adtypeid==21){
			$("#floorh").hide();
			$("#stockclassh").hide();
			$("#markh").hide();
			$("#stockh").hide();
		}if (adtypeid==15){
			$("#stockclassh").hide();
			$("#stockh").hide();
		}
	}
	//王文樟新增展示楼层
	if((templateid==2002||templateid==2000||templateid==2004||templateid==2005)&&(adtypeid==15||adtypeid==16||adtypeid==17||adtypeid==18||adtypeid==23||adtypeid==31||adtypeid==32||adtypeid==33||adtypeid==34||adtypeid==35||adtypeid==36)){
		$("#floorh").show();
	}else{
		$("#floorh").hide();
	}
}