<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>销量与浏览量统计</title>
<%@ include file="../com/import.jsp"%>
<link rel="stylesheet" type="text/css" href="${applicationScope.staticPath}order/analysis.css"></link>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="easyui-layout " data-options="fit:true">
			<div title="查询" class="easy-param" data-options="region:'west',border:false,headerCls:'easy-param-header'">
				<div class="easy-input-line" data-options="查询项目">
					<input id="fquerymode" class="easyui-combobox" data-options="'editor':'easyui-combobox','height':'','width':'200','label':'查询项目:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','data':[{'fname':'商品','fid':-1,'selected':true},{'fname':'店铺','fid':0},{'fname':'单位','fid':1}],'id':'fquerymode'" />
				</div>
				<div class="easy-input-line" data-options="单位">
					<input id="funitid" />
				</div>
				<div class="easy-input-line" data-options="店铺">
					<input id="fstoreid" />
				</div>
				<div class="easy-input-line" data-options="商品">
					<input id="fstockid" />
				</div>
				<div class="easy-input-line" data-options="快速查询">
					<input id="fastselect" />
				</div>
				<div class="easy-input-line dateline" data-options="开始时间" style="display: none;">
					<input id="FValidDateBegin" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'开始日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FValidDateBegin'" />
				</div>
				<div class="easy-input-line dateline" data-options="结束时间" style="display: none;">
					<input id="FValidDateEnd" class="easyui-datebox" data-options="'editor':'easyui-datebox','height':'','width':'200','label':'结束日期:','labelWidth':80,'multiline':false,'required':false,'missingMessage':'','multiple':false,'type':'list','id':'FValidDateEnd'" />
				</div>
				<div class="easy-input-line" data-options="品牌">
					<input id="fmarkid" />
				</div>
				<div class="easy-input-line" data-options="类别">
					<input id="stockFstockclass" />
				</div>
				<div class="easy-searchbtn">
					<span class="easyui-linkbutton" id="btnSearch" data-options="iconCls:'icon-search'" onclick="search()">查询</span>
					<span class="easyui-linkbutton" id="btnReset"  data-options="iconCls:'icon-clear'"  onclick="Util.resetParam(paramArray)">重置</span>
				</div>
			</div>
			<div data-options="region:'center',border:true,iconCls:'icon-ok'">
				<div id="allSaleAnalysis" class="hidden" style="width: 90%;margin: 30px auto;">
					<!------------------------------ 文字版统计信息开始 ------------------------------>
					<div class="saleAnalysis_title">
						<strong>今年销量统计</strong>
						<font style="font-size: 12px;color: #d21e20;">（注：未展示的时间节点，销量为零）</font>
						<span style="float: right;overflow: hidden;"><span class="totalPrice totalSaleAnalysis"></span><span class="totalSaleCount totalSaleAnalysis"></span><span class="totalSeeCount totalSaleAnalysis"></span></span>
					</div>
					<div id="saleAnalysis_data" style="clear: both;">
						<div class="saleAnalysis_data hidden">
							<div class="saleAnalysis">
								<ul>
									<li><div>销售额</div><div class="fprice"></div></li>
									<li><span>销售量</span><span class="fquanty"></span></li>
									<li><span>浏览量</span><span class="fssviewcount"></span></li>
								</ul>
							</div>
							<span class='dataTime'></span>
						</div>
					</div>
					<!------------------------------ 文字版统计信息结束 ------------------------------>
					<!------------------------------ 图表版统计信息开始 ------------------------------>
					<div id="saleAnalysis_charts">
						<div id="container" class="font" ></div>
					</div>
					<!------------------------------ 图表版统计信息结束 ------------------------------>
					<!------------------------------ 统计信息详情开始 ------------------------------>
					<div id="saleAnalysis_dataDetail" class="curved_box" style="width: 100%;">
						<table class="table_dataDetail">
					      <thead>				    
					        <tr class="trr">
				              <th class="t550"  id="unit">单位名称</th>
				              <th class="t550"  id="store">店铺名称</th>			          
					          <th class="t550"  id="stock">商品名称</th>			         
					          <th class="t100">销量</th>
					          <th class="t110">销售额</th>
					          <th class="t100" id="lookCount">浏览量</th>
					          <th class="t100">明细</th>
					         </tr>
					      </thead>
					      <tbody id ="tabletbody"></tbody>
					   </table>
					<!------------------------------ 统计信息详情结束 ------------------------------>
					</div>
      			</div>
			</div>
		</div>
	</div>
</div>
<div id="detaildlg" style="display: none;">
	<table id="detailTable" style="margin-left:0px !important;" class="table table-hover">
		<thead>
			<tr>
				<th>浏览时间</th>
				<th>会员昵称</th>
				<th>浏览地址</th>
				<th>微信昵称</th>
				<th>性别</th>
				<th>国家</th>
				<th>省</th>
				<th>市</th>
				<th>是否员工</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
	<div id="paging" style="margin:0 auto;width: 100%;text-align: center;clear: both;padding:35px 0 10px 0;">
		<a onclick="prePage(this);" style="display: inline-block;padding: 5px;border: 1px solid #eaeaea;margin-right: 15px;">上一页</a>
		<a class="pageNum" style="display: inline-block;padding: 5px 15px;margin-right: 5px;"></a>
		<a onclick="nextPage(this);" style="display: inline-block;padding: 5px;border: 1px solid #eaeaea;margin-right: 15px;margin-left: 10px;">下一页</a>
		<span>
			<input type="text" style="width: 32px;height: 32px;border: 1px solid #eaeaea;box-sizing: border-box;text-align: center;margin-right: 15px;">
			<a onclick="jumpPage(this)" style="display: inline-block;padding: 5px;border: 1px solid #eaeaea;">跳转</a>
		</span>
	</div>
</div>
<input id="storeData" type="hidden" datatype="1" dataid="1">
<script type="text/javascript">
var userid="${sessionScope.user.FID}";
var unitid="${sessionScope.b_unit_id}";
</script>
<script type="text/javascript" src="http://jimg.caishen.cn/j/highcharts/highcharts.js"></script> 
<script type="text/javascript" src="${applicationScope.staticPath}order/analysis.js"></script>
</body>
</html>
<!-- 保留数据 勿删 -->
<!-- {title:"查询条件",width:257,iscenter:false,inputs:
[{"editor":"easyui-combobox","height":"","width":"200","label":"查询项目:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"商品","fid":-1,"selected":true},{"fname":"店铺","fid":0},{"fname":"单位","fid":1}],"id":"fquerymode"},
{"editor":"jeasycombo","height":"","width":"200","label":"单位:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"funitid"},
{"editor":"jeasycombo","height":"","width":"200","label":"店铺:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"fstoreid"},
{"editor":"jeasycombo","height":"","width":"200","label":"商品:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"fstockid"},
{"editor":"easyui-combobox","height":"","width":"200","label":"快捷选择:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","data":[{"fname":"今日","fid":-1,"selected":true},{"fname":"最近一周","fid":0},{"fname":"最近一月","fid":1},{"fname":"最近一年","fid":2},{"fname":"上一周","fid":3},{"fname":"上一月","fid":4},{"fname":"上一年","fid":5},{"fname":"自定义","fid":6}],"id":"fastselect"},
{"editor":"easyui-datebox","height":"","width":"200","label":"开始日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FValidDateBegin"},
{"editor":"easyui-datebox","height":"","width":"200","label":"结束日期:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"FValidDateEnd"},
{"editor":"jeasycombo","height":"","width":"200","label":"品牌:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"fmarkid"},
{"editor":"jeasycombo","height":"","width":"200","label":"类别:","labelWidth":80,"multiline":false,"required":false,"missingMessage":"","multiple":false,"type":"list","id":"stockFstockclass"},
]} -->