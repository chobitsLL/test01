<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>商家中心</title>
<link rel="stylesheet" href="http://1img.caishen.cn/j/jquery-mobile/css/swiper.min.css" />
<style type="text/css">
	a{
	 	text-decoration:none;
	 }
	.steps{
		float: left;
		width: 221px;
		text-align: center;
		margin-right: 18px;
		color: #666666;
		font-weight: 600;
		cursor: pointer;	
		height: 125px;
	}
	.step{
		width: 718px;
		margin-left: auto;
		margin-right: auto;
		height: 125px;
	}
	#third{
		margin-top: 27px;
		margin-bottom: 17px;
	}
	.steps:HOVER {
		color: #333333;
	}
	p{
		width: 170px;
		margin-left: auto;
		margin-right: auto;
		text-align: left;
		font-size: 16px;
		margin-bottom: 0;
	}
	#openStoreStep{
		margin-left: 100px;
		width: 1000px;
		margin-top: -70px;
	}
	.steps a{
		top: 10px;
		left: 75px;
		position: relative;
		z-index: 2;
		color: #e8771e!important;
	}
	.tan{
	    background-image: url('img/tan_long2.png');
	    width:458px;
	    height:2300px;
	    margin-left: auto;
	    margin-right: auto;
	    background-size:100% 100%;
	}
	.closebtn{
	    width:449px;
	    height:30px;
	    margin-left: auto;
	    margin-right: auto;
	}
	.color{
	  	color: rgb(253,96,27);
	  	font-weight: bold;
	}
	.open{
		 /* background-image: url('img/tan_open.png') !important;  */
		 width: 298px;
		 height: 86px;
		 margin-left: auto;
		 margin-right: auto;
		 background-size:100% 100%;
		 cursor:pointer;
	}
</style>
<%@ include file="../com/import.jsp"%>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<!-- 公共菜单  -->
	<%@ include file="../com/menu.jsp"%>
	<div data-options="region:'center'">
		<div class="swiper-container bigScreen">
			<div class="swiper-wrapper">
				<c:forEach items="${bigBanner.rows}" var="banner" varStatus="index">
			    <c:if test="${index.index==0}">
			       <div class="swiper-slide">
			         <a href="javascript:;"><img style="width:100%;height:${banner.fheight}px;" src="${applicationScope.fileServerPath}${banner.fimgurl}" alt="First slide"></a>
			       </div>
			    </c:if>
			    <c:if test="${index.index>0}">
			       <div class="swiper-slide">
			         <a href="javascript:;"><img style="width:100%;height:${banner.fheight}px;" src="${applicationScope.fileServerPath}${banner.fimgurl}" alt="First slide"></a>
			       </div>
			    </c:if>
			    </c:forEach>
			</div>
			<div class="swiper-pagination bigScreen-pagination" ></div>
			<div style="position:absolute ;z-index: 2;right: 22px;top: 32px;background-image: url('img/indexTag.png');width: 109px;height: 112px;font-family: '宋体'">
				<div style="margin-top: 25px;margin-left: 22px;color: white!important;text-align: right;padding-right: 20px;">
					<font style="font-weight: 600;font-size: 14px;">${quanty}</font><font style="font-weight: 600;font-size: 16px;position: relative; z-index: 5;top: 3px;"></font><font style="">单</font>
				</div>
				<div style="margin-top: 5px;margin-left: 22px;color: white!important;text-align: right;padding-right: 20px;">
					<font style="font-weight: 600;font-size: 16px;">${totalamount}</font><font style="font-weight: 600;font-size: 16px;position: relative; z-index: 5;top: 3px;"></font><font>元</font>
				</div>
			</div>
		</div>	
		<div id="datas" style="padding-bottom: 27px;background-image: url('img/backgroundmoney.png');">
			<div id='orderUnTreated' style="position: relative;top: 10px;text-align: center;width:132px;height:36px;line-height: 36px;background-color:#bd1111;left: 88.5%;"><a href = "managerorders/goOrderManager.do?pageNo=1&pageSize=20&pageid=500&searchtype=1"><label style = "color:white; font-family:Microsoft YaHei Regular;">未处理订单：<span>0</span>单</label></a></div> 
			<div  id='todaySale' style="position: relative;top: 20px;text-align: center;width:130px;height:36px;line-height: 36px;border:1px solid #bd1111;left: 88.5%;"><label style = "color:#bd1111; font-family:Microsoft YaHei Regular;">今日浏览量：<a>${screennum}</a>次</label></div>
			<div style="position: relative;"><a target="_blank" href="http://1img.caishen.cn/help/com/index.html"><img src="img/xinshouzhinan.png" style="position: absolute;right: 20px;top: 55px;"/></a></div>
			<div id="imgTitle" style="margin-top: -50px;text-align: center;">
				<img src="img/font.png" style="margin-left: -21px;"/>
			</div>
			<div id='openStoreStep'>
				<img style="z-index: 2;top: 40px;left: 75px;width: 207px;height: 73px;position:relative;" alt="" src="img/ktlogo.png">
				<div id="third" class='step'>
					<div class='steps' style="background-image: url('img/1.png');margin-top: -4px;">
						<p>您可以与财小神官方联</p>
						<p>系开通管理员账户</p>
					</div>
					<div class='steps' style="background-image: url('img/2.png');">
						<p>入驻成功之后，招人来</p>
						<p>帮助您管理店铺吧！</p>
						<a href="compManagerController/selCompManagerInfo.do?type=1&pageid=200" >查看</a>
					</div>
					<div class='steps' style="background-image: url('img/3.png');">
						<p>人员就位，您就可以开</p>
						<p>启店铺啦！</p>
						<a href="compManagerController/selCompManagerInfo.do?pageid=200&type=1" >查看</a>
					</div>
				</div>
				<div id='sixth' class='step'>
					<div class='steps' style="background-image: url('img/4.png');">
						<p>您已经拥有店铺，快给</p>
						<p>店铺装修吧！</p>
						<a href="store/unitstore.do?pageid=300" >查看</a>
					</div>
					<div class='steps' style="background-image: url('img/5.png');">
						<p>发布商品，还可以从中</p>
						<p>央商品库中下载哟！</p>
						<a href="unitstock/queryunit.do?pageid=400" >查看</a>
					</div>
					<div class='steps' style="background-image: url('img/6.png');">
						<p>店铺没有流量，快去推</p>
						<p>广吧！</p>
						<a href="weixin/oaAuthorize.do?pageid=800" >查看</a>
					</div>
				</div>
				<div class="open" id="open">
					<img alt="" src="img/tan_open.png">
					<!-- 20170525程序更新公告 -->
				   	<div style="text-align: center;color: white;position: relative;top:-55px;">20170525平台更新公告</div>
				</div>
			</div>
		</div>
		<div id="dialogid" class="easyui-dialog" title="平台更新公告" style="width:350px;height:425px;" data-options="">   
		   	<div class="easyui-panel" data-options="border:false,cls:'easy-input-panel'">
				<div class="capable">1、<span class="color">服务申请：</span>报装报修支持企业自定义设置输入项。 </div>
                <div>&#12288;&#12288;</div>
               	<div class="capable">2、<span class="color">会员注册：</span>会员注册内容支持企业自定义设置输入项。 </div>
                <div>&#12288;&#12288;</div>
               	<div class="capable">3、<span class="color">营销活动：</span>新版本砍价。 </div>
			</div>   
			<input id= "sign" type = "hidden" value=''>
          	<input id= "orderlist" type = "hidden" value=''>
		</div>
	</div>
</div>
<script type="text/javascript" src="http://1img.caishen.cn/j/jquery-mobile/js/swiper.min.js"></script>
<script type="text/javascript" src="j/notice/js/jquery.notify.js"></script>
<script type="text/javascript">
var orderArr = new Array();
$(function(){
	var bawiper = new Swiper('.bigScreen', {
        pagination: '.bigScreen-pagination',
        slidesPerView: 1,
        initialSlide : 0,
        paginationClickable: true,  
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction : false,
        centeredSlides: true,
        updateFormElements: true,
    });
	$("#dialogid").dialog({
		closed: true
	});
    $("#open").click(function(){
    	$("#dialogid").dialog().dialog("open");
    });
    refreshOrders();
});

//刷新订单
function refreshOrders(){
	var sign = $("#sign").val();
    $.ajax({
      	type: "post",
      	url: "managerorders/getNewOrderList.do",
      	data:{sign:sign},
      	dataType: "json",
      	success: function(msg) {	
    	  	if(sign==""){	
    			$("#sign").val(msg.sign);
	    		$("#orderlist").val(msg.order);
	    		$("#orderUnTreated label span").html(msg.order.length);
	    		$(msg.order).each(function(i,v){
    			orderArr.push(v.fid);
    		  })
    	  	}else {
			    var music=0 ;
    		    if(msg.sign!=$("#sign").val()){
    		  	    $(msg.order).each(function(i,v){
    			    var exists =  $.inArray(v.fid, orderArr);  
    			    console.log(exists);
    			    if(exists==-1){
    				    music = 1;
    				    orderArr.push(v.fid);
    			    }
    			    if(music==1){
    				    $.notifySetup({sound: 'j/notice/audio/notify.mp3'});
    				    $('<a href = "managerorders/goOrderManager.do?pageNo=1&pageSize=20&pageid=500&searchtype=1"><p style ="color:white;">您有新的订单需要处理！</p></a>').notify();
    			    }
    		     })
    		  }
    		  $("#sign").val(msg.sign);
        	  $("#orderUnTreated label span").html(msg.order.length);
    	  }
      }
   });
}
setInterval('refreshOrders()',60000); 
</script>
</body>
</html>