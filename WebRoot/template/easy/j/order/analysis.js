$(function(){
	//var userid = $("#nav-userid").val();
	
	//单位名称
	$("#funitid").jeasycombo({
		width:200,
		label:"单位:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		url:"Analysis/selUnit.do?unitid="+unitid,
		onChange: function(ids,texts){
			if(ids!=""&&ids!=null&&ids!=undefined){
				$("#fstoreid").jeasycombo("reload","Analysis/getUnitStore.do?unitid="+ids);
			}				
		}   
	});
	//店铺名称     默认全部  ，受单位影响
	$("#fstoreid").jeasycombo({
		width:200,
		label:"店铺:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "list",//弹出的样式
		detail:true,
		isinline:false,
		dlgwidth:800,
		linenum:4,
		url : "select/selectStore.do?selecttype=1&unitid=0&userid="+userid+"&storetypes=",
		onChange:function(ids,texts){
			if(ids!=undefined&&ids!=""&&ids!=null){
				$("#fstockid").jeasycombo("reload","Analysis/selStoreStock.do?storeids="+ids);
			}
		} 
	}); 
	//商品名称
	if(unitid!=""&&unitid!=null&&unitid!=undefined){
		$("#fstockid").jeasycombo({
			width:200,
			label:"商品:",
			labelWidth:80,
			multiple : true,//是否多选
			type : "list",//弹出的样式
			detail:true,
			isinline:false,
			dlgwidth:1000,
			linenum:1,
			url:'Analysis/selStock.do?unitid='+unitid,
		});
	}
	 
	//加载品牌
	$("#fmarkid").jeasycombo({
		width:200,
		label:"品牌:",
		labelWidth:80,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:800,
		linenum:4,
		type : "list",//弹出的样式
		url: 'select/mark.do'
	});
	
	//加载类别
	$("#stockFstockclass").jeasycombo({
		width:200,
		label:"类别:",
		labelWidth:80,
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		detail:false,
		url : "select/stockClass.do?t=2"
	});
	
	$("#fastselect").combobox({
		width:200,
		label:"快捷选择:",
		labelWidth:80,
		data:[{"fname":"今日","fid":-1,"selected":true},{"fname":"最近一周","fid":0},{"fname":"最近一月","fid":1},{"fname":"最近一年","fid":2},{"fname":"上一周","fid":3},{"fname":"上一月","fid":4},{"fname":"上一年","fid":5},{"fname":"自定义","fid":6}],
		onChange :function(newValue,oldValue){
			if(newValue != 6){
				$(".dateline").hide();	
		   	}else{
			   	$(".dateline").show();
		   	}
		}
	});
	
	$("#detaildlg").dialog({
		title:"浏览明细查询",
		modal:true,
		closed:true,
		width:1000,
		height:500,
	});
	

	//默认隐藏
	$("#store").hide();
	$("#unit").hide();
});

//查询参数数据
var paramArray = [
{id:"#FValidDateBegin", name:"FValidDateBegin",type:"date"},
{id:"#FValidDateEnd", name:"FValidDateEnd",type:"date"},
{id:"#fquerymode", name:"fquerymode",type:"select",defval:"-1"},
{id:"#funitid", name:"funitid",type:"combo"},
{id:"#fstoreid", name:"fstoreid",type:"combo"},
{id:"#fstockid", name:"fstockid",type:"combo"},
{id:"#fastselect", name:"fastselect",type:"select",defval:"-1"},
{id:"#stockFstockclass", name:"fstockclassid",type:"combo"},
{id:"#fmarkid", name:"fmarkid",type:"combo"}
];

var column904 = [[
   	{field:'ck',title:"选择",checkbox:true,align:'center'},
   	{field:"fbafid",title:"编号",hidden:true},
   	{field:"fname",title:"活动名称",width:150},
   	{field:"fno",title:"订单号",width:150},
   	{field:"fwxnickname",title:"粉丝",width:120},
   	{field:"tbwuwuf",title:"姓名",width:100},
   	{field:"ftelno",title:"手机号",width:120},
   	{field:"fchecked",title:"兑奖状态",width:80,formatter: function(value,row,index){
		return value==0?"未兑换":"已兑换";
	}},
   	{field:"fchecker",title:"兑奖人",width:100},
   	{field:"fchecktime",title:"兑奖日期",width:150}
]];

//查询事件
function search(){
	
	var fquerymode=$("#fquerymode").val();
    if(fquerymode==-1){
    	$("#store").hide();
    	$("#unit").hide();
    	$("#stock").show();
//    	$("#lookCount").show();
    } else if(fquerymode==0){
//    	$("#lookCount").hide();
    	$("#unit").hide();
    	$("#stock").hide();
    	$("#store").show();
    } else{
//    	$("#lookCount").hide();
    	$("#stock").hide();
    	$("#store").hide();
    	$("#unit").show();
    } 
	
	//查询前先组织查询条件
	//$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
	//$("#easy_table").datagrid("load","wGameExchange/gameExchange.do");
	//url:"Analysis/selectAnalysis.do?unitid="+unitid, 
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		type : 'post',
		url : "Analysis/selectAnalysis.do?unitid="+unitid,
		data : {
			jsonobj : Util.initParam(paramArray).jsonobj,
			pageNo:0,
			pageSize:-1
		},
		dataType : "json",
		success : function(data) {
			$.messager.progress("close");
			AjaxReturen(data);
		}
	});
}



//查询拼接字符串
function AjaxReturen(data){
	var html =""; 
	$("#tabletbody").empty();
	var fquerymode=$("#fquerymode").val();
	if(fquerymode==-1){ //按商品查询
	   	 $(data.rows).each(function(){			 
			 html= '<tr class="count">'
			 	  +'<td class="listname" style="display:none"></td>'
			 	  +'<td class=""><div class="line">'+this.fstockname+'</div></td>'
				  +'<td name="fstock"><div class="stockname"> '+this.fquanty+'</div></td>'
			 	  +'<td class="" style=""><div class="stockprice">'+this.fprice+'</div></td>'
			 	  +'<td class=""><div class="vicecount">'+this.fssviewcount+'</div></td>'
			 	  +'<td class=""><div class="vicecount"><a onclick="queryDetail(1, '+this.fstockid+',1,15)"><img src="template/red/unitperson/edit.png" style="">浏览明细</a></div></td>'
			 	  +'</tr>';
			 $("#tabletbody").append(html);
	     });		    
	}else if(fquerymode==0){//按店铺查询
	     $(data.rows).each(function(){			 
			 html= '<tr class="count">'
			 	  +'<td class="listname" style="display:none"></td>'
			 	  +'<td class=""><div class="line">'+this.fstorename+'</div></td>'
				  +'<td name="fstock"><div class="stockname"> '+this.fquanty+'</div></td>'
			 	  +'<td class="" style=""><div class="stockprice">'+this.fprice+'</div></td>'
			 	  +'<td class=""><div class="vicecount">'+this.fssviewcount+'</div></td>'
			 	  +'<td class=""><div class="vicecount"><a onclick="queryDetail(2, '+this.fstoreid+',1,15)"><img src="template/red/unitperson/edit.png" style="">浏览明细</a></div></td>'
			 	  +'</tr>';
			 $("#tabletbody").append(html);
	     });		   
	}else{
	 	 $(data.rows).each(function(){ //按单位查询			 
			 html= '<tr class="count">'
			 	  +'<td class="listname" style="display:none"></td>'
			 	  +'<td class=""><div class="line">'+this.funitname+'</div></td>'
				  +'<td name="fstock"><div class="stockname"> '+this.fquanty+'</div></td>'
			 	  +'<td class="" style=""><div class="stockprice">'+this.fprice+'</div></td>'
			 	  +'<td class=""><div class="vicecount">'+this.fssviewcount+'</div></td>'
			 	  +'<td class=""><div class="vicecount"><a onclick="queryDetail(3, '+this.funitid+',1,15)"><img src="template/red/unitperson/edit.png" style="">浏览明细</a></div></td>'
			 	  +'</tr>';
			 $("#tabletbody").append(html);
	 	 });		   
	}

	var fdate = new Array();//日期
	//商品
	if (fquerymode==-1){
		var fstockquanty = new Array();//商品销量
		var fstockprice = new Array();//商品销售额
	// 	var dateArray = new Array();
		var dataLength = data.master.length;
		//王文樟新增遍历销量
		mannageData(data.master,fquerymode,dataLength,data.total);
		for (var i = 0; i < dataLength; i++){
			
			var fstock=data.master[i];
			fstockquanty.push(fstock.fquanty);
			fstockprice.push(fstock.fprice);
// 			console.log("日期："+fstock.fdate);
			fdate.push(fstock.fdate);
		}
	}else if (fquerymode==0){//店铺
		var fstorequanty = new Array();//店铺销量
		var fstoreprice = new Array();//店铺销售额
	// 	var dateArray = new Array();
		//王文樟新增遍历销量
		mannageData(data.master,fquerymode,dataLength,data.total);
		for (var i = 0; i < data.master.length; i++){
			
			var fstore=data.master[i];
			fstorequanty.push(fstore.fquanty);
			fstoreprice.push(fstore.fprice);
			fdate.push(fstore.fdate);
		}
	}else if (fquerymode==1){//企业
		var funitquanty = new Array();//单位销量
		var funitprice = new Array();//单位销售额
	// 	var dateArray = new Array();
		//王文樟新增遍历销量
		mannageData(data.master,fquerymode,dataLength,data.total);
		for (var i = 0; i < data.master.length; i++){
			
			var funit=data.master[i];
			funitquanty.push(funit.fquanty);
			funitprice.push(funit.fprice);
			fdate.push(funit.fdate);
		}
	}
			
 	$(document).ready(function() {
	   	var title = {text: '销售统计'};
	    var subtitle = {};
	    //Y轴
	    //查询项目：商品
	    if (fquerymode==-1){
	    	var yAxis = {
				title:{text: '销售额'},
				plotLines: [{
				         value: 0,
				         width: 1,
				         color: '#FFFFFF'
				      }],
		      	categories: fstockprice,
	   		};
	   }else 
	   //查询项目：店铺
	   if(fquerymode==0){
		    var yAxis = {
				title: {text: '销售额'},
			    categories: fstoreprice,
			};
	   }else
	   //查询项目：企业
	   if(fquerymode==1){
		    var yAxis = {
				title: {text: '销售额'},
			 	categories:funitprice,
			};
	   }
	   
	   var titleDate = "";
	   var fastselect = $("#fastselect").val();

		if (fastselect==-1){titleDate="(按天)";}else
		if (fastselect==0){titleDate="(按天)";}else
		if (fastselect==1){titleDate="(按周)";}else
		if (fastselect==2){titleDate="(按月)";}else
		if (fastselect==3){titleDate="(按天)";}else
		if (fastselect==4){titleDate="(按周)";}else
		if (fastselect==5){titleDate="(按月)";}else
		if (fastselect==6){titleDate="(按天)";}
	    
	   //X轴
	   var xAxis = {
	      	title: {text: '销售日期'+titleDate+"显示"},
	      	plotLines: [{
		        value: 0,
		        width: 1,
		        color: '#FFFFFF'
	      	}],
	      	categories: fdate
	   };   
	   var Tick = {tickColor:'#FFFFFF'};
	   var tooltip = {}
	   var legend = {
	       layout: 'vertical',
	       align: 'right',
	       verticalAlign: 'middle',
	       borderWidth: 1
	   };
	   
	   //查询项目：商品
	   if(fquerymode==-1){
		   var series =  [
		        {name: '销售额',
		         data: fstockprice}, 
		   ];
	   }else
	   //查询项目：店铺
	   if(fquerymode==0){
		   var series =  [
		      	  {name: '销售额',
		      	   data: fstoreprice}, 
		   ];
	   }else
	   //查询项目：企业
	   if(fquerymode==1){
		   var series =  [
				  {name: '销售额',
				   data: funitprice}, 
		   ];
	   }
	   
	   var json = {};
	   json.title = title;
	   json.subtitle = subtitle;
	   json.xAxis = xAxis;
	   json.yAxis = yAxis;
	   json.tooltip = tooltip;
	   json.legend = legend;
	   json.series = series;
	   json.Tick = Tick;
	   $('#container').highcharts(json);
	});
}

function queryDetail(type, id,pageNum,pageSize){
	$.messager.progress({text : "正在处理，请稍候..."});
	var fastSelect = $("#fastselect").val();
	var validDateBegin = $("#FValidDateBegin").val();
	var validDateEnd = $("#FValidDateEnd").val();
	$("#storeData").attr("datatype",type);
	$("#storeData").attr("dataid",id);
	
	$.ajax({
		type : 'post',
		url : 'Analysis/queryAnalysisDetail.do',
		data : {
			type: type,
			id: id,
			fastselect: fastSelect,
			FValidDateBegin: validDateBegin,
			FValidDateEnd: validDateEnd,
			pageNum: pageNum,
			pageSize: pageSize
		},
		dataType : "json",
		success : function(data) {
			$(".pageNum").html(pageNum+"/"+Math.ceil(data.total/pageSize));
			$.messager.progress("close");//隐藏加载中
			if (data!='') {
				scorehistory(data);
			}
		},
		error : function() {
			$.messager.progress("close");
			$.messager.alert("提示","操作失败！", "error");
		}
	});
}
 
//积分历史
function scorehistory(data){
	if (data.rows.length>0){	
		  var tbody = $("#detailTable").find("tbody");
		  tbody.html("");
	         for(var i=0;i<data.rows.length;i++){
		       	 var tr = $("<tr></tr>");
		       	 var row=data.rows[i];
		       	 tr.append("<td class='t160'>"+row["fdate"]+"</td>");
		       	 tr.append("<td class='t150'>"+row["fnickname"]+"</td>");
		       	 tr.append("<td class='t180'>"+row["fbrowsingip"]+"</td>");
		       	 tr.append("<td class='t80'>"+row["fwxnickname"]+"</td>");
		       	 tr.append("<td class='t60'>"+row["fwxsexname"]+"</td>");
		       	 tr.append("<td class='t60'>"+row["fwxcountry"]+"</td>");
		       	 tr.append("<td class='t60'>"+row["fwxprovince"]+"</td>");
		       	 tr.append("<td class='t60'>"+row["fwxcity"]+"</td>");
		       	 tr.append("<td class='t60'>"+row["ftypename"]+"</td>");
		       	 tr.appendTo(tbody);
	         }
	      	 $("#detaildlg").dialog("open");
	}else{
		$.messager.alert("提示","无历史数据！","error");
	}		
}
 
Highcharts.setOptions({
	colors: ['#4bbf98']
});

 //处理数据----王文樟20160924
function mannageData(datas,type,dataSize,stockNum){
	 if(datas.length==0){
		 if(typeof $(".nonenone")[0]=="undefined"){
			 $("#allSaleAnalysis").addClass("hidden");
			 $("#allSaleAnalysis").after("<h2 class='nonenone' style='text-align:center;padding: 100px;'>^_^空空如也^_^</h2>");
		 }
		 return;
	 }else{
		 $(".nonenone").remove();
	 }
	 $(".saleAnalysis_data[remove=true]").remove();
	 var index;
	 $("#allSaleAnalysis").removeClass("hidden").css("height",parseInt(stockNum)*80+200+"px");
	 $("#saleAnalysis_dataDetail").css("height",stockNum*80+230+"px");
	 var dataType = $("#fastselect").val();
	 if(dataType=="0"||dataType=="3"){
		 dataSize = 7;
	 }else if(dataType=="1"||dataType=="4"){
		 dataSize = 4;
	 }else if(dataType=="2"||dataType=="5"){
		 dataSize = 6;
	 }
	 //数据居中展示
	 var padding = 1200-((1200/dataSize)*(datas.length));
	 if(padding>0){
		 $("#saleAnalysis_data").css("padding","0 "+padding/2+"px");
	 }else{
		 $("#saleAnalysis_data").css("padding","0 0");
	 }
	 //总金额
	 var totalPrice = 0;
	 //总销售量
	 var totalSaleCount = 0;
	 //总浏览量
	 var totalSeeCount = 0;
	 for (var i = 0; i < datas.length; i++) {
		 index = datas[i].fdate;
		 var data = datas[i];
		 var saleAnalysis_data = $(".saleAnalysis_data[class*=hidden]").clone().removeClass("hidden").attr("remove","true");
		 //-1：今天；0：最近一周；1：最近一个月；2：最近一年；3：上一周；4：上个月；5：上一年；6：自定义时间
		 if(dataType=="0"||dataType=="3"||dataType=="6"){
// 			 if(index==7){
			 saleAnalysis_data.find(".dataTime").html(index).css({
				 'width':"70px",
				 "left":"-10px",
				 "font-size":"10px"
			 });
// 			 }else{
// 				 saleAnalysis_data.find(".dataTime").html("周"+index);
// 			 }
		 }else if(dataType=="1"||dataType=="4"){
			 saleAnalysis_data.find(".dataTime").html(index+"周");
		 }else if(dataType=="2"||dataType=="5"){
			 saleAnalysis_data.find(".dataTime").html(index+"月");
		 }
		 //var dataWidth = saleAnalysis_data.css("width",Math.floor(1200/dataSize-20)+"px");
		 //销售额
		 var fprice = data.fprice;
		 //销售量
		 var fquanty = data.fquanty;
		 //浏览量
		 var fssviewcount = data.fssviewcount;
		 
		 totalPrice+=fprice;
		 totalSaleCount+=fquanty;
		 totalSeeCount+=fssviewcount;
		 
		 saleAnalysis_data.find(".saleAnalysis").find(".fprice").html(fprice);
		 saleAnalysis_data.find(".saleAnalysis").find(".fquanty").html(fquanty);
		 saleAnalysis_data.find(".saleAnalysis").find(".fssviewcount").html(fssviewcount);
		 $("#saleAnalysis_data").append(saleAnalysis_data.clone());
	}
	 $(".totalPrice").html("总销售额：<font style='color:#d21e20;font-size:24px;'>"+totalPrice.toFixed(2)+"元</font>");
	 $(".totalSaleCount").html("总销售量：<font style='color:#d21e20;font-size:24px;'>"+totalSaleCount+"件</font>");
	 $(".totalSeeCount").html("总浏览量：<font style='color:#d21e20;font-size:24px;'>"+totalSeeCount+"次</font>");
}
 //处理销售额数据
 function hadleData(num){
	 alert(num.length)
 }
//上一页
function prePage(obj){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	var totalPageNum = parseInt(page[1]);
	var pageSize = 15;
	if(nowPageNum==1){
// 		$.messager.alert("提示","已是第一页咯!", "info");
		return;
	}else{
		nowPageNum--;
	}
	var type = $("#storeData").attr("datatype");
	var id = $("#storeData").attr("dataid");
	queryDetail(type, id,nowPageNum,pageSize);
}
//下一页
function nextPage(obj){
	var page = $(".pageNum").html().split("/");
	var nowPageNum = parseInt(page[0]);
	var totalPageNum = parseInt(page[1]);
	var pageSize = 15;
	if(nowPageNum==totalPageNum){
// 		$.messager.alert("提示","已是最后一页咯!", "info");
		return;
	}else{
		nowPageNum++;
	}
	var type = $("#storeData").attr("datatype");
	var id = $("#storeData").attr("dataid");
	queryDetail(type, id,nowPageNum,pageSize);
}
//跳转页面
function jumpPage(obj){
	$(".pageNumError").remove();
	var page = $(".pageNum").html().split("/");
	var totalPageNum = parseInt(page[1]);
	var pageNum = parseInt($(obj).prev().val());
	if(!/^\+?[1-9][0-9]*$/.test(pageNum)){
		$(obj).after("<font class='pageNumError' style='color:#d21e20;font-size:14px;padding-left:15px;'>请输入大于0的数字</font>");
		return;
	}
	var pageSize = 15;
	var type = $("#storeData").attr("datatype");
	var id = $("#storeData").attr("dataid");
	if(pageNum>totalPageNum){
		queryDetail(type, id,pageNum,pageSize);
	}else{
		queryDetail(type, id,pageNum,pageSize);
	}
}
