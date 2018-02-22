<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<c:if test="${scorePolicy==null}" var="isbtn">
	<title>添加积分行为规则</title>
</c:if>
<c:if test="${!isbtn}" >
	<title>修改积分行为规则</title>
</c:if>
<%@ include file="../com/import.jsp"%>
</head>
<body>
<div class="easyui-panel" data-options="border:false,cls:'easy-input-panel-center'">
	<div class="easy-input-line">
		<input id="FBeginDate" value="${scorePolicy.fbegindate}" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'25','width':'400','label':'开始时间','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FBeginDate'" />
	</div>
	<div class="easy-input-line">
		<input id="FEndDate" value="${scorePolicy.fenddate}" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'25','width':'400','label':'结束时间','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FEndDate'" />
	</div>
	<div class="easy-input-line">
		<input id="FActionType" value="${scorePolicy.factiontype}" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'25','width':'400','label':'行为类型','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FActionType'" />
	</div>
	<div class="easy-input-line">
		<input id="FPeriodType" value="${scorePolicy.fperiodtype}" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'25','width':'400','label':'周期','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FPeriodType'" />
	</div>
	<div class="easy-input-line">
		<input id="Ftime" value="${scorePolicy.ftime}" class="easyui-numberbox" data-options="'editor':'easyui-numberbox','height':'25','width':'400','label':'次数','labelWidth':80,'multiline':false,'required':true,'missingMessage':'请输入次数','multiple':false,'type':'list','id':'Ftime'" />
	</div>
	<div class="easy-input-line">
		<input id="FShopAmount" value="${scorePolicy.fshopamount}" class="easyui-numberbox" data-options="'editor':'easyui-numberbox','height':'25','width':'400','label':'最小消费金额','labelWidth':80,'multiline':false,'required':true,'missingMessage':'请输入最小消费金额','multiple':false,'type':'list','id':'FShopAmount'" />
	</div>
	<div class="easy-input-line">
		<input id="Fscore" value="${scorePolicy.fscore}" class="easyui-numberbox" data-options="'editor':'easyui-numberbox','height':'25','width':'400','label':'积分','labelWidth':80,'multiline':false,'required':true,'missingMessage':'请输入积分','multiple':false,'type':'list','id':'Fscore'" />
	</div>
	<div class="easy-input-line">
		<input id="Fabstract" value="${scorePolicy.fabstract}" class="easyui-textbox" data-options="'editor':'easyui-textbox','height':'25','width':'400','label':'说明','labelWidth':80,'multiline':false,'required':true,'missingMessage':'请输入说明','multiple':false,'type':'list','id':'Fabstract'" />
	</div>
	<div style="text-align:center;padding:5px 0">
		<span class="easyui-linkbutton" onclick="submit()" data-options="iconCls:'icon-save'">保存</span>
	</div>
</div>

<script type="text/javascript">
	$(function() {
		//行为类型
		$("#FActionType").combobox({
	        limitToList:true,
	        data:[{"fname":"无","fid":-1,'selected':true},{"fname":"登录","fid":0},{"fname":"评价","fid":1},{"fname":"晒单","fid":2},{"fname":"签到","fid":3},{"fname":"注册","fid":4}],
	        onChange:function(ids,texts){
				if(ids==0 || ids==3){   //登录消费金额不需要
					$("#FShopAmount").textbox("disable");
				    $("#FShopAmount").textbox("setValue","0");
				    $("#FPeriodType").combobox("enable");
				    $("#Ftime").textbox("enable");
				}else if (ids==4){
					$("#FShopAmount").textbox("disable");
				    $("#FShopAmount").textbox("setValue","0");
				    $("#FPeriodType").combobox("disable");
				    $("#Ftime").textbox("disable");
				    $("#Ftime").textbox("setValue","0");
				}else if (ids=="-1"){
					$("#FShopAmount").textbox("enable");
				    $("#FPeriodType").combobox("enable");
				    $("#Ftime").textbox("enable");
				}else{
					$("#FShopAmount").textbox("enable");
					$("#FShopAmount").textbox("setValue","");
					$("#FPeriodType").combobox("enable");
				    $("#Ftime").textbox("enable");
				}
			}
		});
		//周期
		$("#FPeriodType").combobox({
	        limitToList:true,
	        data:[{"fname":"无","fid":0},{"fname":"天","fid":1},{"fname":"周","fid":2},{"fname":"月","fid":3},{"fname":"年","fid":4}]
		});
		if("${scorePolicy.factiontype}"!=""){
			$("#FActionType").combobox("setValue","${scorePolicy.factiontype}");
			$("#FPeriodType").combobox("setValue","${scorePolicy.fperiodtype}"); 
			$("#FShopAmount").textbox("setValue","${scorePolicy.fshopamount}");
		}
	});
	
	function submit(){
		var userid = "${sessionScope.user.FID}";
		var ofid = "${scorePolicy.fid}";
		var fbegindate = $("#FBeginDate").val();//开始时间
		var fenddate = $("#FEndDate").val();//结束时间
		var factiontypeid = $("#FActionType").combobox("getValue");//行为类型id
		var factiontypename = $("#FActionType").combobox("getText");//行为类型name
		var fperiodtypeid = $("#FPeriodType").combobox("getValue");//周期id
		var fperiodtypename = $("#FPeriodType").combobox("getText");//周期name
		var ftime = $("#Ftime").val();//次数
		var fshopamount = $("#FShopAmount").val();//最小消费金额
		var fscore = $("#Fscore").val();//积分
		var fabstract = $("#Fabstract").val();//说明
		var r =/^[0-9]*[1-9][0-9]*$/;
		var t = /([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/;
		if(fbegindate == ""){
			$.messager.alert("提示", "开始时间不能为空！", "warning");
			return false;
		}
		if(fenddate != "" && fenddate<fbegindate){
			$.messager.alert("提示", "结束时间不能再开始时间之前！", "warning");
			return false;
		}
		if(factiontypeid == "-1"){
			$.messager.alert("提示", "行为类型不能为空！", "warning");
			return false;
		} else if (factiontypeid == 0){
			if (fperiodtypeid == 0){ 
				$.messager.alert("提示", "如果选择积分类型为登录，周期不能为无","warning"); 
				return false;
			}
			if (ftime == 0){ 
				$.messager.alert("提示", "如果选择积分类型为登录时，次数不能为0","warning"); 
				return false;
			}
		} else if (factiontypeid == 3){
			if (fperiodtypeid == 0 || fperiodtypeid == 4){ 
				$.messager.alert("提示", "如果选择积分类型为签到，周期不能为无、年","warning"); 
				return false;
			}
			if ((fperiodtypeid == 1) && (ftime >1)){ 
				$.messager.alert("提示", "如果选择积分类型为签到并且按天时，次数不能大于1","warning"); 
				return false;
			}
			else if ((fperiodtypeid == 2) && (ftime >7)){ 
				$.messager.alert("提示", "如果选择积分类型为签到时并且按周时，次数不能大于7","warning"); 
				return false;
			}
			else if ((fperiodtypeid == 3) && (ftime >31)){ 
				$.messager.alert("提示", "如果选择积分类型为签到时并且按周时，次数不能大于31","warning"); 
				return false;
			}
		}
		
		if(fshopamount == ""){
			fshopamount = 0;
		}
		if(fscore == ""){
			$.messager.alert("提示", "积分不能为空！", "warning");
			return false;
		}
		if(fabstract == ""){
			$.messager.alert("提示", "请输入说明！", "warning");
			return false;
		}
		var data={};
		data["fbegindate"]=fbegindate;
		data["fenddate"]=fenddate;
		data["factiontype"]=factiontypeid;
		data["userid"]="${sessionScope.user.FID}";
		data["fperiodtype"]=fperiodtypeid;
		data["ftime"]=ftime;
		data["fshopamount"]=fshopamount;
		data["fscore"]=fscore;
		data["fabstract"]=fabstract;
		data["fid"]=ofid;
		var dat={
			jsonobj:JSON.stringify(data)
		};
		
		$.messager.progress({text : "正在处理，请稍候..."});
		//添加
		if (ofid.length == 0) {
			$.ajax({
				type:'POST',
				url:"scorePolicyController/addScorePolicy.do",
				dataType:"text",
				data:dat,
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if (data=="ok") {
						$.messager.alert("提示", "添加成功！","info",function(){
							window.parent.search();
						});
					}else if(data=="login"){
						$.messager.alert("提示", "您还未登录，请您先登录后再操作","warning");
						return false;
					}else{
						$.messager.alert("提示", "添加失败","warning");
					}
				},error:function(){
					$.messager.progress("close");
					$.messager.alert("提示", "操作超时","warning");
				}
			});
		}
		//修改
		else {
			$.ajax({
				type:'POST',
				url:"scorePolicyController/updateScorePolicy.do",
				dataType:"text",
				data:dat,
				success:function(data){
					$.messager.progress("close");//隐藏加载中
					if (data=="ok") {
						$.messager.alert("提示", "修改成功！","info",function(){
							window.parent.search();
						});
					}else if(data=="login"){
						$.messager.alert("提示", "您还未登录，请您先登录后再操作","warning");
						return false;
					}else{
						$.messager.alert("提示",  "修改失败","warning");
					}
				},error:function(){
					$.messager.progress("close");
					$.messager.alert("提示", "操作超时","warning");
				}
			});
		}
	}
</script>
</body>
</html>