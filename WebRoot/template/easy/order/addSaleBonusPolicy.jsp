<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>编辑销售提成政策</title>
<%@ include file="../com/import.jsp"%>
</head>
<body>
	<div class="easyui-panel" data-options="border:false,cls:'easy-input-panel-center'">
		<div class="easy-input-line">
			<input id="FBeginDate" value="<c:out value="${saleBonusPolicyMap.fbegindate}"></c:out>" 
			 class="easyui-datebox" data-options="editable:false,'editor':'easyui-datebox','height':'','width':'350','label':'开始日期:','labelWidth':'80','multiline':false,'required':'true','missingMessage':'请输入开始日期','multiple':false,'type':'list','id':'Date-start'" />
		</div>
		<div class="easy-input-line">
			<input id="FEndDate" value="<c:out value="${saleBonusPolicyMap.fenddate}"></c:out>" 
			 class="easyui-datebox" data-options="editable:false,'editor':'easyui-datebox','height':'','width':'350','label':'结束日期:','labelWidth':'80','multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'Date-end'" />
		</div>
		<div class="easy-input-line">
			<input id="FBonusTypeID" value="<c:out value="${saleBonusPolicyMap.fbonustype}"></c:out>" />
		</div>
		<div class="easy-input-line">
			<input id="FStoreID"  value="<c:out value="${saleBonusPolicyMap.fstoreid}"></c:out>"/>
		</div>
		<div class="easy-input-line">
			<input id="FStockClassID" value="<c:out value="${saleBonusPolicyMap.fstockclassids}"></c:out>" />
		</div>
		<div class="easy-input-line">
			<input id="FMarkID" value="<c:out value="${saleBonusPolicyMap.fmarkids}"></c:out>" />
		</div>
		<div class="easy-input-line">
			<input id="FStockID" value="<c:out value="${saleBonusPolicyMap.fstockids}"></c:out>" />
		</div>
		<div class="easy-input-line">
			<input id="FLinkUnit" value="<c:out value="${saleBonusPolicyMap.flinkunitid}"></c:out>" />
		</div>
		<div class="easy-input-line">
			<input id="FBonusModeID" value="<c:out value="${saleBonusPolicyMap.fbonusmode}"></c:out>" />
		</div>
		<div class="easy-input-line">
			<input id="FBonusAmount" value="<c:out value="${saleBonusPolicyMap.fbonusamount}"></c:out>" 
			 class="easyui-numberbox" data-options="precision:2,'editor':'easyui-numberbox','height':'','width':'350','label':'提成金额:','labelWidth':'80','multiline':false,'required':'true','missingMessage':'请输入提成金额','multiple':false,'type':'list','data':'','id':'FBonusModeID'" />
		</div>
		<div style="text-align:center;padding:5px 0">
			<span class="easyui-linkbutton" onclick="save()" data-options="iconCls:'icon-save'">保存</span>
		</div>
	</div>
<script>
$(function(){
	$("#FBonusModeID").combobox({
		width:350,
		label:"提成模式:",
		labelWidth:80,
		required:true,
		missingMessage:"请选择提成模式",
		data:[{"fname":"固定金额","fid":1},{"fname":"销售额比例","fid":2}],
		onChange:function(newValue,oldValue){
			changeMode(newValue);
		}
	});
	//门店
	//var storeurl = "";
	//if("${saleBonusPolicyMap.fbonustype}"!=""){
	//	storeurl = "select/selectStore.do?selecttype=3&unitid=0&userid=${sessionScope.user.FID}&storetypes=&bonusType=${saleBonusPolicyMap.fbonustype}";
	//}
	
	var type = "${type}";
	if(type=="0"){//新增
		$("#FStoreID").jeasycombo({
			width:350,
			label:"适用店铺:",
			labelWidth:80,
			multiple : false,//是否多选
			type : "list",//弹出的样式
			detail:true,
			isinline:false,
			dlgwidth:600,
			linenum:3,
			url : "select/selectStore.do?selecttype=3&unitid=0&userid=${sessionScope.user.FID}&storetypes=100"  //storetypes初始100，让他查询不出来
		});
		
		$("#FStockID").jeasycombo({
			width:350,
			label:"适用商品:",
			labelWidth:80,
			dlgwidth:700,
			multiple : true,//是否多选
			type : "list",//弹出的样式
		});
		
		$("#FStockID").jeasycombo("disabled", true);
	}else if(type=="1"){//编辑
		var FBonusType = "${saleBonusPolicyMap.fbonustype}";
		$("#FStoreID").jeasycombo({
			width:350,
			label:"适用店铺:",
			labelWidth:80,
			multiple : false,//是否多选
			type : "list",//弹出的样式
			detail:true,
			isinline:false,
			dlgwidth:600,
			linenum:3,
			url : "select/selectStore.do?selecttype=3&unitid=0&userid=${sessionScope.user.FID}&storetypes=&bonusType="+FBonusType
		});
		
		$("#FStockID").jeasycombo({
			width:350,
			label:"适用商品:",
			labelWidth:80,
			dlgwidth:700,
			multiple : true,//是否多选
			type : "list",//弹出的样式
			btnclass:"btn-danger",
			url : "store/selectStockDetailed.do?stockClassId=${saleBonusPolicyMap.fstockclassids}&markId=${saleBonusPolicyMap.fmarkids}&isMuti=true&storeId=${saleBonusPolicyMap.fstoreid}&userId=${sessionScope.user.FID}"
		});
	}
	
	$("#FBonusTypeID").combobox({
		width:350,
		label:"提成类型:",
		labelWidth:80,
		required:true,
		missingMessage:"请选择提成类型",
		data:[{"fname":"员工店铺提成","fid":1},{"fname":"村级服务站提成","fid":2},{"fname":"加盟商提成","fid":4},{"fname":"企业店铺提成","fid":5},{"fname":"门店店铺提成","fid":6}], //{"fname":"转发提成","fid":0},{"fname":"联销商结算","fid":3},
		onChange: function(ids, texts){
    	    if(ids==undefined || ids ==""){
				$("#FStoreID").jeasycombo("setvalue","");
			} else{
				//$("#FStoreID").jeasycombo("disabled",false);
				$("#FStoreID").jeasycombo("reload","select/selectStore.do?selecttype=3&unitid=0&userid=${sessionScope.user.FID}&storetypes=&bonusType="+ids);
            }
        }
	});
	
	$("#FStockClassID").jeasycombo({
		width:350,
		label:"适用类别:",
		labelWidth:80,
		multiple : true,//是否多选
		type:"tree",
		url : "select/stockClass.do?t=2",
		onChange: function(ids, texts){
			var fmarkids = $("#FMarkID").jeasycombo("getvalue").ids;
			var FStoreID = $("#FStoreID").jeasycombo("getvalue").ids;
			$("#FStockID").jeasycombo("reload", "store/selectStockDetailed.do?stockClassId="+ids+"&markId="+fmarkids+"&isMuti=true&storeId="+FStoreID+"&userId=${sessionScope.user.FID}");
			$("#FStockID").jeasycombo("disabled", false);
		}
	});
	
	$("#FMarkID").jeasycombo({
		width:350,
		label:"适用品牌:",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:600,
		linenum:3,
		type : "list",//弹出的样式
		//url : "priceDoc/selectGrid.do?table=tblMark a",
		url : "select/mark.do",
		onChange: function(ids, texts){
			var fstockclassids = $("#FStockClassID").jeasycombo("getvalue").ids;
			var FStoreID = $("#FStoreID").jeasycombo("getvalue").ids;
			$("#FStockID").jeasycombo("reload", "store/selectStockDetailed.do?stockClassId="+fstockclassids+"&markId="+ids+"&isMuti=true&storeId="+FStoreID+"&userId=${sessionScope.user.FID}");
			$("#FStockID").jeasycombo("disabled", false);
		}
	});
	
	
	
	$("#FLinkUnit").jeasycombo({
		width:350,
		label:"联销商:",
		labelWidth:80,
		multiple: false,
		type: "list",
		url: "saleBonus/selectLinkUnit.do?userId=${sessionScope.user.FID}"
	});
	
});
//变更提成模式
function changeMode(m){
	if(m==1){
		$("#FBonusAmount").textbox({
			label:"提成金额:",
			missingMessage:"请输入提成金额"
		});
	}else if(m==2){
		$("#FBonusAmount").textbox({
			label:"提成比例:",
			missingMessage:"请输入提成比例"
		});
	}
}

function save(){
	var fbegindate=$('#FBeginDate').val();
	var fenddate=$('#FEndDate').val();
	
	var fbonustypeid = $("#FBonusTypeID").val();
	var fbonusmodeid = $("#FBonusModeID").val();
	
	var fstoreid = $("#FStoreID").jeasycombo("getvalue").ids;
	
	var fstockclassids = $("#FStockClassID").jeasycombo("getvalue").ids;
	var fstockclassnames = $("#FStockClassID").jeasycombo("getvalue").texts;
	
	var fmarkids = $("#FMarkID").jeasycombo("getvalue").ids;
	var fmarknames = $("#FMarkID").jeasycombo("getvalue").texts;
	
	var fstockids = $("#FStockID").jeasycombo("getvalue").ids;
	var fstocknames = $("#FStockID").jeasycombo("getvalue").texts;
	
	var fbonusamount = $('#FBonusAmount').val();	
	var userid="${sessionScope.user.FID}";
	var fsalebonuspolicyid="${saleBonusPolicyMap.fid}";
	
	var flinkunit = $("#FLinkUnit").jeasycombo("getvalue").ids;
	
	if(fbegindate==""){ 
		  $.messager.alert("提示","【开始日期】不能为空！", "info");
          return false;
    }
	
	if(fenddate!=""){					
		var beginDate = new Date(fbegindate);
	    var endDate = new Date(fenddate);
	    if(beginDate-endDate>0){
	        $.messager.alert("提示","【开始日期】要在【结束日期】之前！", "info");
	        return false;
	    }	
	}
	
	if (fbonusamount<=0) {
		$.messager.alert("提示","【提成金额】不能小于或者等于0！", "info");
		return false;
	}
	
	if ((fbonusmodeid==2||fbonusmodeid=="2")&&fbonusamount>1){
		$.messager.alert("提示","【提成模式】为“销售额比例”时，【提成比例】不能大于1！", "info");
		return false;
	}
	
	if(userid==""){
		$.messager.alert("提示","您可能长时间未登录，请您先登录后再操作！", "info");
		return false;
	}
	
	if (fbonustypeid==""||fbonustypeid<0||fbonustypeid==undefined){
		$.messager.alert("提示","【提成类型】不能为空！", "info");
		return false;
	}
	
	if (fbonusmodeid==""||fbonustypeid<0||fbonustypeid==undefined){
		$.messager.alert("提示","【提成模式】不能为空！", "info");
		return false;
	}
	
	if ((fbonustypeid==3||fbonustypeid=="3")&&(flinkunit==""||flinkunit==0||flinkunit==undefined)){
		$.messager.alert("提示","【提成类型】为联销商结算时，【联销商】不能为空！", "info");
		return false;
	}
	
	var data={};
	data["fbegindate"]=fbegindate;
	data["fenddate"]=fenddate;
	data["fbonustypeid"]=fbonustypeid;
	data["fbonusmodeid"]=fbonusmodeid;				
	data["userid"]=userid;
	data["fstoreid"]=fstoreid;
	data["funitclassid"]=""; // funitclassid;
	data["funitid"]=""; //funitid;				
	data["fstockclassids"]=fstockclassids;
	data["fstockclassnames"]=fstockclassnames;
	data["fmarkids"]=fmarkids;
	data["fmarknames"]=fmarknames;
	data["fstockids"]=fstockids;
	data["fstocknames"]=fstocknames;
	data["fbonusamount"]=fbonusamount;
	data["fsalebonuspolicyid"]=fsalebonuspolicyid;
	data["flinkunit"]=flinkunit;
	
	var jsonData={
		jsonobj:JSON.stringify(data)
	};
	
	var url = "";
	if (fsalebonuspolicyid.length==0) {
		url = "saleBonus/insertSaleBonusPolicy.do";//添加
	}else{
		url = "saleBonus/updateSaleBonusPolicy.do";//修改
	}
	
	//console.log(jsonData.jsonobj);
	//return;
	
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type:'POST',
		url:url,
		dataType: "json",
		data: jsonData,
		success: function(data){
			$.messager.progress("close");
			if (data.result) {
				//window.location.href="saleBonus/goSaleBonusPolicy_red.do?UserId=${sessionScope.user.FID}&pageNo=1&pageSize=20";
				window.parent.search();
			} else {
				$.messager.alert("提示",data.msg, "error");
			}
		}
	})
	
}
</script>
</body>
</html>
<!-- 保留数据 勿删 -->
<!-- {title:"编辑销售提成政策",width:549,iscenter:true,inputs:
[{"editor":"easyui-datebox","height":"","width":"350","label":"开始日期:","labelWidth":"80","multiline":false,"required":"true","missingMessage":"请输入开始日期","multiple":false,"type":"list","id":"FBeginDate"},
{"editor":"easyui-datebox","height":"","width":"350","label":"结束日期:","labelWidth":"80","multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FEndDate"},
{"editor":"easyui-combobox","height":"","width":"350","label":"提成类型:","labelWidth":"80","multiline":false,"required":"true","missingMessage":"请选择提成类型","multiple":false,"type":"list","data":[{"fname":"员工店铺提成","fid":1},{"fname":"村级服务站提成","fid":2},{"fname":"加盟商提成","fid":4},{"fname":"企业店铺提成","fid":5},{"fname":"门店店铺提成","fid":6}],"id":"FBonusTypeID"},
{"editor":"jeasycombo","height":"","width":"350","label":"适用店铺:","labelWidth":"80","multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FStoreID"},
{"editor":"jeasycombo","height":"","width":"350","label":"适用类别:","labelWidth":"80","multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FStockClassID"},
{"editor":"jeasycombo","height":"","width":"350","label":"适用品牌:","labelWidth":"80","multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FMarkID"},
{"editor":"jeasycombo","height":"","width":"350","label":"适用商品:","labelWidth":"80","multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FStockID"},
{"editor":"jeasycombo","height":"","width":"350","label":"联销商:","labelWidth":"80","multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FLinkUnit"},
{"editor":"easyui-combobox","height":"","width":"350","label":"提成模式:","labelWidth":"80","multiline":false,"required":"true","missingMessage":"请选择提成模式","multiple":false,"type":"list","data":[{"fname":"固定金额","fid":1},{"fname":"销售额比例","fid":2}],"id":"FBonusModeID"},
{"editor":"easyui-numberbox","height":"","width":"350","label":"提成金额:","labelWidth":"80","multiline":false,"required":"true","missingMessage":"请输入提成金额","multiple":false,"type":"list","data":"","id":"FBonusModeID"},
]} -->