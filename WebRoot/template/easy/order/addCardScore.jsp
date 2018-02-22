<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>购物积分规则</title>
<%@ include file="../com/import.jsp"%>
<script type="text/javascript" src="${applicationScope.staticPath}order/addCardScore.js"></script>
<script type="text/javascript" src="${applicationScope.staticPath}order/jquery.serializejson.min.js"></script>
</head>
<script type="text/javascript">
$(function() {
	var type = ${type};
	if(type == 1){
		$('#fvaliddatebegin').datebox('setValue', "${data.fvaliddatebegin}");	
		$('#fvaliddateend').datebox('setValue', "${data.fvaliddateend}");	
		$('#fstockclassid').jeasycombo('setvalue',"${data.fstockclassid}");
		$('#fmarkids').jeasycombo('setvalue',"${data.fmarkids}");
		$('#fcardtypeid').jeasycombo('setvalue',"${data.fcardtypeid}");
		$('#fscoretype').combobox('setValue',"${data.fscoretype}");
		$('#fscore').textbox('setValue',"${data.fscore}");
	}
});
</script>
<body>
	<div class="easyui-layout" data-options="fit:true">
		<div style="width: 280px;margin: 0 auto;">
			<form id="formUpdateBtn">
				<div class="easyui-panel"
					data-options="border:false,cls:'easy-input-panel'">
					<div class="easy-input-line">
						<input id="fvaliddatebegin" name="fvaliddatebegin"
							class="easyui-datebox"
							data-options="'editor':'easyui-datebox','height':'','width':'250','label':'开始日期:','labelWidth':90,'multiline':false,'required':'true','missingMessage':'开始日期为必填项!','data':'','id':'fvaliddatebegin'" />
					</div>
					<div class="easy-input-line">
						<input id="fvaliddateend" name="fvaliddateend"
							class="easyui-datebox"
							data-options="'editor':'easyui-datebox','height':'','width':'250','label':'结束日期:','labelWidth':90,'multiline':false,'required':false,'missingMessage':'','data':'','id':'fvaliddateend'" />
					</div>
					<div class="easy-input-line">
						<input id="fstockclassid" name="fstockclassid"/>
					</div>
					<div class="easy-input-line">
						<input id="fmarkids" name="fmarkids"/>
					</div>
					<div class="easy-input-line">
						<input id="fcardtypeid" name="fcardtypeid"/>
					</div>
					<div class="easy-input-line">
						<input id="fscoretype" name="fscoretype" class="easyui-combobox"
							data-options="'editor':'easyui-combobox','height':'','width':'250','label':'计算方式:','labelWidth':90,'multiline':false,'required':'true','missingMessage':'计算方式为必填项!','url':'','id':'fscoretype'" />
					</div>
					<div class="easy-input-line">
						<input id="fscore" name="fscore" class="easyui-textbox"
							data-options="'editor':'easyui-textbox','height':'','width':'250','label':'计算比例:','labelWidth':90,'multiline':false,'required':'true','missingMessage':'计算比例为必填项!','id':'fscore'" />
					</div>
					<div style="text-align: center; padding: 5px 0">
						<c:if test="${type == 0}" var="isbtn">
				         	<span id="saveA" class="easyui-linkbutton"
							onclick="updateBtn(0,0)" data-options="iconCls:'icon-save'">保存</span>
			          	 </c:if>
			          	 <c:if test="${type == 1}" >
			             	<span id="saveE" class="easyui-linkbutton"
							onclick="updateBtn(1,${data.fid})" data-options="iconCls:'icon-save'">保存</span>
					     </c:if>
						
					</div>
				</div>
			</form>
		</div>
	</div>
</body>
</html>
