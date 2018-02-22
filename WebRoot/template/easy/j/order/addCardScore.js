$(function(){
	//输入框只能输入数字
	$("#fscore").textbox('textbox').bind('keyup', function(e){
        $("#fscore").textbox('setValue', $(this).val().replace(/[^\d.]/g,''));
	});
	//日期字段只读
	$(".datebox :text").attr("readonly","readonly");
	//初始化计算方式下拉框
	$('#fscoretype').combobox({
	    valueField:'fid',
	    textField:'fname',
	    editable:false,
	    data:[{"fname":"每消费一元可积分","fid":1},{"fname":"每积一分需要消费金额","fid":2},
              {"fname":"每消费满一元可积分","fid":3},{"fname":"每积一分需要满足消费金额","fid":4}]
	});
	
	$("#fstockclassid").jeasycombo({
		width:250,
		dlgwidth:350,
		dlgheight:400,
		labelWidth:90,
		label:'适用类别:',
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		url : "select/stockClass.do?t=2"
	});
	$("#fmarkids").jeasycombo({
		width:250,
		dlgwidth:350,
		dlgheight:400,
		labelWidth:90,
		label:'适用品牌:',
		multiple : true,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		url : "select/mark.do"
	});
	$("#fcardtypeid").jeasycombo({
		width:250,
		dlgwidth:350,
		dlgheight:400,
		labelWidth:90,
		label:'适用会员等级:',
		multiple : false,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-success",//自定义按钮样式
		url : "cardScore/getCardTypeByUnitID.do"
	});
	
});

//获取修改或新增数据 方法
function getUpdateBtn(){
	var jsonobj = $("#formUpdateBtn").serializeJSON();
	return jsonobj;
}

//修改或新增(type=0新增，type=1修改)
function updateBtn(type,ids){
	var fid = 0;
	if(type == 1){
//		var row = $('#cardTable').datagrid('getChecked');
		fid = ids;
	}
	var json = getUpdateBtn();
//	alert(JSON.stringify(json));
	
//	多选下拉框数据需要重新获取，且需要转换为字符串（serializeJSON方法无法获取多选的内容）
	json["fmarknames"] = $('#fmarkids').jeasycombo('getvalue').texts;
	json["ftype"] = type;
	json["fids"] = fid;
	
	//校验
	if(isNull(json.fvaliddatebegin)){
		$.messager.alert('温馨提示',"请填写开始日期！");
		return;
	}
	if(isNull(json.fstockclassid)){
		$.messager.alert('温馨提示',"请填写适用类别！");
		return;
	}
	if(isNull(json.fmarkids)){
		$.messager.alert('温馨提示',"请填写适用品牌！");
		return;
	}
	if(isNull(json.fscoretype)){
		$.messager.alert('温馨提示',"请填写计算方式！");
		return;
	}
	if(isNull(json.fscore)){
		$.messager.alert('温馨提示',"请填写计算比例！");
		return;
	}
	if(json.fscore<=0){
		$.messager.alert('温馨提示',"计算比例不能小于等于0！");
		return;
	}
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		dataType:'JSON',
		type : 'post',
		url : 'cardScore/updateCardScore.do',
		data:{
			params:JSON.stringify(json)
		},
		dataType : "json",
		success : function(data){
			if (data.result) {
				$.messager.progress('close');
				$.messager.alert('温馨提示',"操作成功！");
				
				//获取cardTable的行数
				var tabLength = parent.getTableRows();
				if(tabLength!=0){
					//重新查询table数据
					parent.funSearch();
				}
				//关闭弹窗
				parent.closeDialog();
			}else{
				var msg = "操作失败!";
				if (data.msg != ""){
					msg = data.msg;
				}
				$.messager.alert('提示',msg);
			}		
		 },error:function(){
			 $.messager.progress('close');
			 $.messager.alert('提示',"保存失败","error");
		 }
		});
	
}


function isNull(val){
	if(val == null || val == ''){
		return true;
	}else{
		return false;
	}
}

$.extend($.fn.validatebox.defaults.rules, {  
    //验证汉字  
    CHS: {  
        validator: function (value) {  
            return /^[\u0391-\uFFE5]+$/.test(value);  
        },  
        message: 'The input Chinese characters only.'  
    },  
    //移动手机号码验证  
    Mobile: {//value值为文本框中的值  
        validator: function (value) {  
            var reg = /^1[3|4|5|8|9]\d{9}$/;  
            return reg.test(value);  
        },  
        message: 'Please enter your mobile phone number correct.'  
    },  
    //国内邮编验证  
    ZipCode: {  
        validator: function (value) {  
            var reg = /^[0-9]\d{5}$/;  
            return reg.test(value);  
        },  
        message: 'The zip code must be 6 digits and 0 began.'  
    },  
  //数字  
    Number: {  
        validator: function (value) {  
            var reg =/^[0-9]*$/;  
            return reg.test(value);  
        },  
        message: 'Please input number.'  
    },  
}) 



