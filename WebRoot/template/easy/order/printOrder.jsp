<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">


<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>订单打印</title>
<%@ include file="../com/import.jsp"%>
<style type="text/css">
* {
	margin: 0;
	padding: 0;
	font-size: 18px;
}

body {
	font: 12px/1.5 "\5b8b\4f53";
	color: #333
}

.w {
	width: 990px;
	margin: 0 auto;
}

table {
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
}

.m {
	margin-bottom: 20px;
}

.al {
	text-align: left;
}

.ar {
	text-align: right;
	width:8%;
}

.clr {
	clear: both;
}

em {
	font-style: normal;
}

.m1 {
	padding: 0 20px 20px;
	border-style: solid;
	border-width: 2px 1px 1px;
	border-color: #aaa #eee #eee;
}

.m1 .tb1 td {
	height: 1.1cm;
	line-height: 1.1cm;
	border-bottom: 1px solid #f5f5f5;
}

.tb1 .t1 {
	width: 50%;
}

.tb1 .t2 {
	width: 50%;
	text-align: right;
}

.tb2 td {
	height: 0.8cm;
	line-height: 0.8cm;
}

.tb2 .t1 {
	width: 3cm;
}

.m2 {
	border: 1px solid #eee;
}

.tb4 th {
	background: #f9f9f9;
	height: 1.1cm;
	line-height: 1.1cm;
	font-weight: normal;
}

.tb4 td {
	height: 1.8cm;
	line-height: 1.8cm;
	border-bottom: 1px solid #f5f5f5;
	text-align: center
}

.tb4 td.al {
	text-align: left
}

.tb4 td.ar {
	text-align: right
}

.tb4 .gap {
	width: 20px;;
}

.tb4 td.gap {
	border-color: #fff;
}

.tb4 .t4{
	width: 50%;
}

.tb4 .t5,.tb4 .t7,.tb4 .t8,.tb4 .t9{
	width: 7%;
}

.tb4 .p-name {
	text-align: left
}

.tb4 .num {
	font-family: verdana
}
/*.tb4{border-collapse:collapse;border:1px solid #000}*/
/*.tb4 th, .tb4 td,.d1{border:1px solid #000}*/
.info {
	position: relative;
	top: -1px;
	padding: 20px 0;
	border-top: 1px solid #eee;
}

.info .statistic {
	float: right;
	margin-right: 20px;
}

.info .list {
	line-height: 25px;
}

.info .list .label, .info .list .price {
	display: inline-block;
	*display: inline;
	*zoom: 1;
	vertical-align: middle;
}

.info .list .label {
	width: 4cm;
	text-align: left;
}

.info .list .price {
	width: 5cm;
	text-align: right;
	font-family: verdana;
	font-style: normal;
}

.info .list em {
	font-size: 18px;
	font-weight: bold;
}

.d1 {
	padding: 10px
}

.d2 {
	text-align: right;
	padding: 10px 0;
	font-size: 14px
}

.logo {
	padding: 10px
}

.footer { /*position:absolute;bottom:0;left:0;*/
	width: 100%;
	height: 50px;
	line-height: 50px;
	border-top: 1px solid #ededed;
	text-align: center;
}

.v-h {
	margin: 10px 0;
	border-top: 2px solid #ededed;
	text-align: right
}

.print-btn {
	display: inline-block;
	*display: inline;
	*zoom: 1;
	width: 96px;
	height: 50px;
	line-height: 50px;
	background: #e54346;
	color: #fff;
	font-family: 'Microsoft YaHei';
	font-size: 18px;
	font-weight: bold;
	border: 0;
}

.m2 {
	padding-left: 1px
}
</style>
<style type="text/css" media="print">
.v-h {
	display: none;
}
</style>

</head>
<body>
	<form name="form1">

		<div class="w">
			<div class="logo"></div>
			<div class="m m1">
				<table class="tb1">
					<tr>
						<td class="t1">订单编号：${orderInfo.fno}</td>
						<!-- <td class="t2">订购时间：2016-03-13 00:30:31</td> -->
					</tr>
				</table>
				<table class="tb2">
					<colgroup>
						<col class="t1"></col>
						<col class="t2"></col>

					</colgroup>
					<tr>
						<td>客户姓名：</td>
						<td>${userRev.freceiver}</td>
					</tr>
					<tr>
						<td>联系方式：</td>
						<td>${userRev.frevtel}</td>
					</tr>
					<tr>
						<td>客户地址：</td>
						<td>${userRev.frevprov }${userRev.frevcity }${userRev.frevdistrict }${userRev.frevtown }${userRev.frevaddress }</td>
					</tr>
				</table>
			</div>
			<div class="m m2">
				<table class="tb4">
					<colgroup>
						<col class="gap"></col>
						<col class="t3"></col>
						<col class="t4"></col>
						<col class="t5"></col>
						<col class="t7"></col>
						<col class="t7"></col>
						<col class="t8"></col>
						<col class="t9"></col>
						<col class="gap"></col>
					</colgroup>
					<tr>
						<th class="gap"></th>
						<th class="al">商品编号</th>
						<th>订单商品</th>
						<th>原价</th>
						<th>单价</th>
						<th>运费</th>
						<th>数量</th>
						<th class="ar">商品金额</th>
						<th class="gap"></th>
					</tr>
					<c:forEach items="${stocks}" var="stock">
						<tr>
							<th class="gap"></th>
							<th class="al">${stock.fstockcode }</th>
							<th>${stock.fstockname }</th>
							<th>${stock.fstockprice }</th>
							<th>${stock.fprice }</th>
							<th>${stock.fsendamount}</th>
							<th>${stock.fquanty}</th>
							<th class="ar">&yen;${stock.fstockamount}</th>
							<th class="gap"></th>
						</tr>
					</c:forEach>
				</table>
				<div class="info">
					<div class="statistic">
						<div class="list">
							<span class="label">运费金额：</span> <span class="price">&yen;${orderInfo.fsendamount}</span>
						</div>
						<div class="list">
							<span class="label">积分抵扣：</span> <span class="price">-&yen;${orderInfo.fscoretoamount}</span>
						</div>
						<%-- <div class="list">
							<span class="label">促销状态：</span> <span class="price">-&yen;${orderInfo.fsendamount}</span>
						</div> --%>
						<div class="list">
							<span class="label">应付款总计：</span> <span class="price"><em>&yen;${orderInfo.ftotalamount}</em></span>
						</div>
					</div>
					<div class="clr"></div>
				</div>
			</div>
		</div>
		<div class="v-h">
			<div class="w">
				<span class="easyui-linkbutton bottomClass" 
					onclick="javascript:window.print();" data-options="width:70,size:'large'">
					<font size="18">打印</font></span>
				<span style="margin: 5px"></span>
				<span class="easyui-linkbutton bottomClass" 
					onclick="javascript:window.opener=null;window.close();" data-options="width:70,size:'large'">
					<font size="18">关闭</font></span>
							
			</div>
		</div>
	</form>
<script type="text/javascript">
// 	$('.l-btn-text').css('font-size','18px');
</script>
</body>
</html>