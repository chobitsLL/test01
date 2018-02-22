var floatHtml="<div class='floatBody' parentid='";
var storeid = $("#tempMainPage").attr("storeid");
var tagHeight = 0;
var oldHeight = parseInt($("#tempalteBody").css("height").replace("px",""));
window.count = 0;
var fileServer = $("body").attr("files");
window.deleteTags = "";//被删除的广告位 
$(function(){
	$(".templButton").click(function(){
		var obj = $(this);
		var tempType=obj.attr("tempType");
		setTemplate(tempType,obj);
	});
	//拖拽插件-----------开始------------
	$("#tempalteBody").dragsort({ 
		dragSelector: ".borderDotted", 
		dragBetween: false, 
		dragEnd: saveOrder, 
		placeHolderTemplate: "<div><div></div></div>" 
	});
	//拖拽插件-----------结束------------
	
	//查询此模板是否设置广告
	getCustomTempAD();
	
	//btn-reset 按钮绑定事件
	$(".btn-reset").on("click",function(){
		$(this).parents(".floatBody").attr("datatype",2);
		$(this).parents(".jboot-input-group").prevAll(".validatebox-text").val("");
	});
	//btn-select 按钮绑定事件
	$(".btn-select").on("click",function(){
		$(this).parents(".floatBody").attr("datatype",2);
	});
	initUpLoad();
	initResetUpLoad();
});

//拖拽回调函数设置排序
function saveOrder() {
	var arr_a=new Array();
	$(".borderDotted").each(function(n,value){
		var parentid = $(this).attr("class").split(" ")[1];
		var order = $(this).attr("order");
		$(".floatBody[order="+order+"][parentid="+parentid+"]").attr("alltagorder",n+1);
	});
	//重新排序标签
	$.each($(".floatBody[newtag]"),function(n,value){
		arr_a[n]=$(this).clone();
	});
	//从小到大排序
	for(var i=0; i<arr_a.length;i++){
		var max = parseInt($(arr_a[i]).attr("alltagorder"));
        for(var j=i+1;j<arr_a.length;j++){
        	var min = parseInt($(arr_a[j]).attr("alltagorder"));
            if(max > min){
                temp=arr_a[i];
                arr_a[i]=arr_a[j];
                arr_a[j]=temp;
            }
        }
    }
	//替换标签
	$.each($(".floatBody[newtag]"),function(n,value){
		$(this).replaceWith($(arr_a[n]));
	});
	$(".floatBody[newtag]").each(function(n,value){
		if($(this).attr("datatype")!="1"){
			$(this).attr("datatype",2);
		}
	});
};

//轮播广告类型切换
function  bigScroll(obj){
	var showtype = $(obj).attr("showtype");	
	$(obj).parent().siblings().find("input").attr("checked",false);
	if(showtype=="carousel"){
		$(obj).parents(".bigADs").next().find(".smallImg").html('');
	}else{
		$(obj).parents(".bigADs").next().find(".smallImg").html('<input jsonKey="smallIMG" style="display:inline" value="1" type="radio" name="bigsmallIMG'+$(obj).parents(".floatBody").attr("order")+'">小图');
	}
	$(obj).attr("checked",true);
	var val = $(obj).val();
	var order = $(".editing").attr("order");
	//动态设置标签上移与下移
	var phoneHeader = parseInt($("#phoneHeader").css("height").replace("px",""));
	var len = $(".editing").siblings(".bigAD[order="+order+"]").length;
	var bigADIMG = $(".editing .adIMG").eq(0).siblings(".adIMG");
	var bigADSize = $(obj).parents(".floatBody").find(".comImg").length-1;
	var cloneTag = '<img src="cloneTag" class="adIMG" mark="mark" style="width:312px;height:146px;" alt="">';
	if(val=="0"){
		$("#tempalteBody").css("height",$("#tempalteBody").height()-150*bigADSize);
		$("#phoneHeader").css("height",phoneHeader-150*bigADSize);
		$(".editing").siblings(".bigAD[order="+order+"]").addClass("hidden");
		$(".editing").css("height","150px");
	}else{
		$("#tempalteBody").css("height",$("#tempalteBody").height()+150*bigADSize);
		$("#phoneHeader").css("height",phoneHeader+150*bigADSize);
		$("#floatExplain").css("top",top+150*bigADSize);
		$(".editing").siblings(".bigAD[order="+order+"]").removeClass("hidden");
		$(".editing").css("height",(bigADSize+1)*150+"px");
	}
	//重新生成左侧广告列表
	$(".editing .adIMG").remove();
	$(obj).parents(".floatBody").find(".comImg").each(function(n,value){
		if(val=="0"){
			cloneTag = cloneTag.replace("cloneTag",$(this).attr("src"));
			$(".editing").append(cloneTag);
			return false;
		}else{
			cloneTag = cloneTag.replace("cloneTag",$(this).attr("src"));
			$(".editing").append(cloneTag);
			cloneTag = cloneTag.replace($(this).attr("src"),"cloneTag");
		}
	});
	//移动右侧广告详情标签
	var top = $(".editing").position().top;
	$("#floatExplain").css("top",top);
	window.count = val;
	updateType(obj,2);//修改广告
}

//橱窗广告类型切换
function  showType(obj){
	var value = $(obj).val();	
	$(obj).parent().siblings().find("input").attr("checked",false);
	if(value==0){
		$(".editing").removeClass("threeRows");
	}else{
		$(".editing").addClass("threeRows");
	}
	if($(obj).parents(".floatBody").attr("datatype")!="1"){
		$(obj).parents(".floatBody").attr("datatype",2);
	}
}

//新增广告位
function setTemplate(tempType,obj){
	var html = '';
	html = addAllAD(obj);
	$("#tempalteBody").append(html);
	var width = parseInt($("."+obj.attr("id")).css("width").replace("px",""));
	width += $(".editing").offset().left;
	var top = $(".editing").position().top;
	$("#floatExplain").css("left",width+10);
	$("#floatBody").css("left",-100);
	$("#floatExplain").css("top",top);
}

//新增广告位
function addAllAD(obj){
	var html = "";
	var id = obj.attr("id");
	var order = parseInt($(".floatBody[parentid="+id+"]:last").attr("order"))+1;
	var allTagOrder = $(".floatBody[newtag]").size();
	var tagHeight = parseInt(obj.attr("tagHeight"));
	var oldHeight = parseInt($("#tempalteBody").css("height").replace("px",""));
	//复制标签生成新的标签，用于设置广告
	var thisOBJ = $(".floatBody[parentid="+id+"][order='0']").clone().appendTo("#floatBody");
	thisOBJ.attr("order",order);
	thisOBJ.attr("allTagOrder",allTagOrder+1);
	thisOBJ.attr("newTag","1");
	thisOBJ.attr("datatype","1");
	thisOBJ.find("#add"+id).attr("id","add"+id+order);
	$(".floatBody[parentid="+id+"][order='"+order+"']").find("#add"+id+order).find("#comp_linkphoto").attr("id","comp_linkphoto_"+id+"_"+order).attr("onclick","selectUpLoad(this,"+order+")");
	$(".floatBody[parentid="+id+"][order='"+order+"']").find("#add"+id+order).find("#jboot-upload").attr("id","jboot-upload"+id+"_"+order);
	//判断不同的redio
	var radioObj = $(".floatBody[parentid="+id+"][order='"+order+"']").find("input[type='radio']");
	radioObj.each(function(n,val){
		$(this).attr("name",$(this).attr("name")+order);
	});
//	loadUpload(order,id);
	$(".floatBody").css("display","none");
	$("#floatExplain").css("display","block");
	$("#tempalteBody").css("height",tagHeight+oldHeight);
	$("#phoneHeader").css("height",tagHeight+oldHeight);
	$(".floatBody[parentid='"+id+"'][order="+order+"]").css("display","block");
	//增加选中状态
	$(".borderDotted").removeClass("editing");
	return getHtml(id,tagHeight,order);
}

//返回不同广告位不同的标签
function getHtml(id,tagHeight,order){
	var html = "<div order="+order+" onclick='editing(this)' class='borderDotted "+id+" editing' style='height:"+tagHeight+"px;;position:relative;'>";
	
	if(id=="bigAD"){//大幅广告
		html += "<img alt='' style='width:312px;height:146px;' class='adIMG' src='img/banner.png'>";
	}else if(id=="LOGOAD"){//logo
		html += "<img alt='' style='width:312px;height:100px;' class='adIMG' src='"+fileServer+"img/index/34424f0c11bffbe306fe6b487663bfb30468de046a0b5fb55bdabf2c1aebd640be93213f.jpg'>";
	}else if(id=="listAD"){//列表广告
		html += "<img alt='' style='width:312px;height:80px;' class='adIMG' src='"+fileServer+"img/index/34424f0c11bffbe306fe6b487663bfb30468de046a0b5fb55bdabf2c1aebd640be93213f.jpg'>";
	}else if(id=="sudokuAD"){//九宫格广告
		html += "<img order='1' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='2' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='3' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='4' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='5' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='6' alt='' class='adIMG' src='img/six.png'>";
	}else if(id=="searchBox"){//搜索框
		html += "<img alt='' style='width:312px;height:35px;' class='adIMG' src='img/searchbox.png'>";
	}else if(id=="customNavi"){//自定义导航
		html += "<img order=1 alt='' style='width:50px;height:46px;margin-top:-0.5px;' class='adIMG' src='img/zdy1.png'>"+
			"<img order=2 alt='' style='width:50px;height:46px;margin-top:-0.5px;' class='adIMG' src='img/zdy2.png'>"+
			"<img order=3 alt='' style='width:50px;height:46px;margin-top:-0.5px;' class='adIMG' src='img/zdy3.png'>"+
			"<img order=4 alt='' style='width:50px;height:46px;margin-top:-0.5px;' class='adIMG' src='img/zdy4.png'>";
	}else if(id=="subline"){//辅助线
		html += '<hr class="custom-line">';
	}else if(id=="subspace"){//辅助空白
		html += "";
	}else if(id=="commonNavi"){//公共导航栏
		html += "<img alt='' style='width:312px;height:50px;' class='adIMG' src='"+fileServer+"img/index/34424f0c11bffbe306fe6b487663bfb30468de046a0b5fb55bdabf2c1aebd640be93213f.jpg'>";
	}else if(id=="shopwindow"){//橱窗广告
		html += '<div class="control-group"><div class="custom-showcase-wrap custom-showcase-wrap-0"><div class="custom-showcase-body custom-showcase-without-space"><ul class="custom-showcase clearfix"><li class="custom-showcase-big"><img src="img/shopwindowbig.png"></li><li class="custom-showcase-small"><img src="img/shopwindowbig_1.png"></li><li class="custom-showcase-small"><img src="img/shopwindowbig_1.png"></li></ul></div></div><div class="component-border"></div></div>';
	}else if(id=="mostFour"){//一排四个广告
		html += "<img order='1' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='2' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='3' alt='' class='adIMG' src='img/six.png'>";
		html += "<img order='4' alt='' class='adIMG' src='img/six.png'>";
	}else if(id=="wxqr"){//微信二维码
		html += "<img order='1' alt='' class='adIMG' style='width:160px;height:160px;margin-left:80px;' src='img/shopwindowbig.png'>";
	}else if(id=="stockDetail"){//带有商品详情的广告
		html += "<div style='height:220px;width:150px;display:inline-block;margin:0 5px 0 3px;'>"
		+"<div><img order='1' alt='' class='adIMG' style='width:150px;height:150px;' src='img/shopwindowbig.png'></div>"
		+"<div>"+"<div class='stockname' style='height:40px;overflow:hidden;'></div>"+"<div class='stockprice' style='color:red;'></div>"
		+"</div>"
		+"</div>";
		html += "<div style='height:220px;width:150px;display:inline-block;'>"
			+"<div><img order='2' alt='' class='adIMG' style='width:150px;height:150px;' src='img/shopwindowbig.png'></div>"
			+"<div>"+"<div class='stockname' style='height:40px;overflow:hidden;'></div>"+"<div class='stockprice' style='color:red;'></div>"
			+"</div>"
			+"</div>";
	}
	html+=//"<a onclick='uploadTempAD(this,\""+id+"\");'>+添加一个广告</a>"+
	"<div class='action'><div style='display:none;' class='actionSon edit'>编辑</div><div style='display:none;' class='actionSon add'>新增</div><div class='actionSon delete' onclick='deleteTag(this,event);'>删除</div></div></div>";
	return html;
}

//获取鼠标位置  ---暂时不用
function getMousePos(event) {
	var e = event || window.event;
	return {'x':e.clientX,'y':clientY};
}

//获取坐标位置  ---暂时不用
function getPosition(ev){  
    ev = ev || window.event;  
    var point = {x:0,y:0};  
    if(ev.pageX || ev.pageY){  
        point.x = ev.pageX;  
        point.y = ev.pageY;  
    } else {//兼容ie  
        point.x = ev.clientX + document.body.scrollLeft - document.body.clientLeft;  
        point.y = ev.clientY + document.documentElement.scrollTop;  
    }  
    return point;  
}
//拖拽功能插件
jQuery.fn.myDrag=function(){
//	$("body").attr("style","opacity:0.1;filter:alpha(opacity=10);-moz-opacity:0.1;-khtml-opacity:0.1;");
	_IsMove = 0;
	_MouseLeft = 0;
	_MouseTop = 0;
	return $(this).bind("mousemove",function(e){
		if(_IsMove==1){
		$(this).offset({top:e.pageY-_MouseLeft,left:e.pageX-_MouseTop});
		}
	}).bind("mousedown",function(e){
		_IsMove=1;
		var offset =$(this).offset();
		_MouseLeft = e.pageX - offset.left;
		_MouseTop = e.pageY - offset.top;
	}).bind("mouseup",function(){
		_IsMove=0;
	}).bind("mouseout",function(){
		_IsMove=0;
	});
};
//点击广告位，展示说明框
function editing(obj){
	console.log("top:"+$(".editing").offset().top);
	$(obj).siblings().removeClass("editing");
	$(obj).addClass("editing");
	var order = parseInt($(obj).attr("order"));
	var width = parseInt($(".editing").css("width").replace("px",""));
	width += $(".editing").offset().left;
	var top = $(".editing").position().top;
	$("#floatExplain").css("left",width+10);
	$("#floatBody").css("left",-100);
	$("#floatExplain").css("top",top);
	//先隐藏掉所有的说明框
	$(".floatBody").css("display","none");
	$(".floatExplain").css("display","block");
	//展示被点击的框框的说明框
	$(".floatBody[parentid='"+$(obj).attr("class").split(" ")[1]+"'][order="+order+"]").css("display","block");
	var bottom = "";
	if($(obj).hasClass("subspace")||$(obj).hasClass("subline")||$(obj).hasClass("searchBox")){
		bottom="10px";
	}else{
		bottom="35px";
	}
	$(".floatBody[parentid='"+$(obj).attr("class").split(" ")[1]+"'][order="+order+"]").parents("#floatBody").css("padding-bottom",bottom);
}

//删除广告位----开始
function deleteTag(obj,event){
	var parent = null;
	if($(obj).hasClass("borderDotted")){
		parent = $(obj);
		//移除
	}else{
		parent = $(obj).parents(".borderDotted");
	}
	var prev = parent.prev();
	var after = parent.next();
	var order = parseInt(parent.attr("order"));
	//判断是否存在前一个标签
	if(prev.attr("class")){
		var prevClass = prev.attr("class").split(" ")[1];
		var width = parseInt($("."+prevClass).css("width").replace("px",""));
		width += prev.offset().left;
		var top = prev.position().top;
		$("#floatExplain").css("left",width+10);
		$("#floatBody").css("left",-100);
		$("#floatExplain").css("top",top);
		//先隐藏掉所有的说明框
		$(".floatBody").css("display","none");
		$("."+prevClass).siblings().removeClass("editing");
		prev.addClass("editing");
		//展示被点击的框框的说明框
		var parentid = $(".editing").attr("class").split(" ")[1];
		var selectOrder = $(".editing").attr("order");
		$(".floatBody[parentid='"+parentid+"'][order="+selectOrder+"]").css("display","block");
	}else if(after.attr("class")&&prev.attr("class")==undefined){
		var afterClass = after.attr("class").split(" ")[1];
		var width = parseInt($("."+afterClass).css("width").replace("px",""));
		width += $("."+afterClass).offset().left;
		var top = $("."+afterClass).position().top;
		$("#floatExplain").css("left",width+10);
		$("#floatBody").css("left",-100);
		$("#floatExplain").css("top",top);
		//先隐藏掉所有的说明框
		$(".floatBody").css("display","none");
		$("."+afterClass).siblings().removeClass("editing");
		after.addClass("editing");
		//展示被点击的框框的说明框
		var parentid = $(".editing").attr("class").split(" ")[1];
		var selectOrder = $(".editing").attr("order");
		$(".floatBody[parentid='"+parentid+"'][order="+selectOrder+"]").css("display","block");
	}else{
		$(".floatBody[parentid="+parent.attr("class").split(" ")[1]+"][order="+order+"]").remove();
		$("#floatExplain").css("display","none");
	}
	//删除数据库中的数据
	var adid = $(obj).attr("adid");
	if(adid!=undefined&&adid!='undefined'){
		window.deleteTags+=$(obj).attr("adid")+",";
	}
	
	var s = $(".bigAD[order="+order+"]").length;
	if(parent.hasClass("bigAD")&&s>1){
		var editorder = parent.attr("editorder");
		//移除左侧广告位对应的右侧广告详情
		$(".floatBody[parentid="+parent.attr("class").split(" ")[1]+"][order="+order+"]").find(".detailDatas[order="+editorder+"]").remove();
	}else{
		//移除左侧广告位对应的右侧广告详情
		$(".floatBody[parentid="+parent.attr("class").split(" ")[1]+"][order="+order+"]").remove();
	}
	var parentHeight = parseInt(parent.css("height").replace("px",""));
	var phoneHeader = parseInt($("#phoneHeader").css("height").replace("px",""));
	parent.remove();
	$("#phoneHeader").css("height",phoneHeader-parentHeight);
	$("#tempalteBody").css("height",phoneHeader-parentHeight);
	$(".floatBody[newtag]").each(function(n,value){
		$(this).attr("alltagorder",n+1);
	});
	//阻止事件冒泡
	event.stopPropagation();
}
//删除广告位----结束

//上传图片
function loadUpload(order,id,show_method){
	$("#add"+id+order).jeasyupload({
		url:"upload_image_mo_multiple_json.do",
		multiple:false,//是否多选
		btn:$("#comp_linkphoto_"+id+"_"+order),
		live:true,
		btnid:"#comp_linkphoto_"+id+"_"+order,
		parent:$("#jboot-upload"+id+"_"+order),
		data:{"imgSize":200},
		customImg:function(i,file,o){
			var order = $(".editing").attr("order");
			updateType("#comp_linkphoto_"+id+"_"+order,2);//修改广告
			var dataOrder = $("#add"+id+order).attr("order");
			if(dataOrder){
				dataOrder=parseInt(dataOrder)+1;
			}else{
				dataOrder=1;
			}
			if(id=="bigAD"){//大幅广告
				//判断广告数量
				if(dataOrder<=6){
					var or = $(".editing").attr("order");
					show_method = $(".floatBody[parentid=bigAD][order="+order+"]").find(":radio:checked").val();
					if(show_method=="0"){
						$(".editing img").attr("src",file["url"]);
					}else if(show_method=="1"){//分开展示
							var phoneHeader = parseInt($("#phoneHeader").css("height").replace("px",""));
							var o = $(".editing img").eq(0).clone().attr("src",file["url"]).attr("mark","mark");
							$(".editing img:not([mark])").remove();
							$(".editing").append(o);
							$(".editing").css("height",$(".editing img").length*150+"px");
							$("#tempalteBody").css("height",$("#tempalteBody").height()+150);
							$("#phoneHeader").css("height",phoneHeader+150);
					}
				}else{
					$.messager.alert("提示","大幅广告最多设置6个广告");
					return;
				}
			}else if(id=="shopwindow"){//橱窗广告
				if(dataOrder==1){
					$(".editing .custom-showcase-big img").attr("src",file["url"]);
				}else if(dataOrder==2){
					$(".editing .custom-showcase-small:first img").attr("src",file["url"]);
				}else if(dataOrder==3){
					$(".editing .custom-showcase-small:last img").attr("src",file["url"]);
				}else{
					$.messager.alert("提示","橱窗广告最多设置3个广告");
					return;
				}
			}else if(id=="customNavi"){//图片导航
				if(dataOrder<=4){
					$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
				}else{
					$.messager.alert("提示","自定义导航最多设置4个广告");
					return;
				}
			}else if(id=="sudokuAD"){
				$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
				var size = $(".editing .adIMG[style!='display: none;']").size();
				if(size==6&&dataOrder>6){
					$.messager.alert("提示","六宫格广告，最多设置六个");
					return;
				}else if(size==9&&dataOrder>9){
					$.messager.alert("提示","九宫格广告，最多设置九个");
					return;
				}
			}else if(id=="mostFour"){
				$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
				var size = $(".editing .adIMG[style!='display: none;']").size();
				if(size==4&&dataOrder>4){
					$.messager.alert("提示","一排最多设置四个广告");
					return;
				}
			}else if(id=="wxqr"){
				$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
				var size = $(".editing .adIMG[style!='display: none;']").size();
				if(size==1&&dataOrder>1){
					$.messager.alert("提示","微信二维码最多上传一张");
					return;
				}
			}
			var html = "";
			if(id!="wxqr"){
				html = "<div jsonKey='adDetail' order="+dataOrder+" class='detailDatas detailDatas_"+id+"' class='"+id+"s'><div class='detailData detailData_"+id+"'>"+
				"<img jsonKey='imgURL' class='comImg' alt='' src='"+file["url"]+"'>"+
				"<a onclick='deleteTempAD(this,\""+id+"\","+order+","+dataOrder+")' style='position: relative; z-index: 2;top:-22px;left: 63px;' class='actionSon'>删除</a>"+
				
				"<div class='btn-success' style='border: 1px solid #dddada; padding: 5px;border-radius:4px;margin-top: -10px;text-align:center;'><a id='comp-linkphoto_"+id+"_"+order+"_"+dataOrder+"' style='color: #ffffff;' onclick='selectResetUpLoad(this,"+dataOrder+")'>重新上传</a></div><div id='jboot_upload_"+id+"_"+order+"_"+dataOrder+"'></div>"+
				"</div><div class='detailData detailData_"+id+"'>"+"<div style='margin-top:-40px;'><label id='url"+order+"'>"+
				
				"<input jsonKey='url' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='url' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>自定义路径</label>"+"<label id='stockClass"+order+"'>"+
				"<input jsonKey='stockClass' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stockClass' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品类别</label><label id='stockMark"+order+"'>"+
				"<input jsonKey='stockMark' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stockMark' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品品牌</label><label id='stock"+order+"'>"+
				"<input jsonKey='stock' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stock' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品</label>"+
				"<a class='btn btn-search btn-sm' onclick='useCover(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' >使用封面</a></div>"+
				"</div><div style='display:none;' id='add"+id+"_"+order+"_"+dataOrder+"'></div></div>";
			}else{
				html = "<div jsonKey='adDetail' order="+dataOrder+" class='detailDatas detailDatas_"+id+"' class='"+id+"s'><div class='detailData detailData_"+id+"'>"+
				"<img jsonKey='imgURL' class='comImg' alt='' src='"+file["url"]+"'>"+
				"<a onclick='deleteTempAD(this,\""+id+"\","+order+","+dataOrder+")' style='position: relative; z-index: 2;top:-22px;left: 63px;' class='actionSon'>删除</a>"+
				
				"<div class='btn-success' style='border: 1px solid #dddada; padding: 5px;border-radius:4px;margin-top: -10px;text-align:center;'><a id='comp-linkphoto_"+id+"_"+order+"_"+dataOrder+"' style='color: #ffffff;' onclick='selectResetUpLoad(this,"+dataOrder+")'>重新上传</a></div><div id='jboot_upload_"+id+"_"+order+"_"+dataOrder+"'></div>"+
				"</div><div style='display:none;' id='add"+id+"_"+order+"_"+dataOrder+"'></div></div>";
			}
			$("#add"+id+order).before(html);
			$("#add"+id+order).attr("order",$("#add"+id+order).siblings(".detailDatas_"+id).length);
			resetUpLoad(order,dataOrder,id);
		}
	});
}

//展示广告绑定商品类型
function changeStock(obj,id,dataOrder,order){
	var type = $(obj).attr("mytype");
	var myselected = $(obj).attr("myselected");
	//var stockclass = $("#FStockClassID").jeasycombo("getvalue").ids;
	if(type=="url"){
		if($(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").length<=0){
			//$("input[parenttype]").remove();//"<div>URL路径：<input parenttype='"+type+"' type='text'/></div>"
			$(obj).parents(".detailData_"+id).append('<div class="form-group" style="height: 35px;line-height: 35px" id="urlh"><label style="text-align: right; height: 25px; line-height: 25px; width: 35px;" class="textbox-label textbox-label-before">URL</label><input parenttype="'+type+'" class="validatebox-text" id="FURL" name="FURL" type="text" value="" placeholder="链接地址" style="width:170px;"><label class="label label-danger jboot-input-msg" id="FURL_Error"></label></div>');
		}
	}else if(type=="stockClass"){
		var stockClass = '<div class="form-group" style="height: 35px;" id="stockclassh_'+id+'"><label for="inputEmail3" class="col-sm-3 control-label" style="display:none;">类别</label><input parenttype="'+type+'" class="validatebox-text" id="FStockClassID_'+id+"_"+order+"_"+dataOrder+'" name="FStockClassID" type="text" value="" placeholder="适用商品类别"><label class="label label-danger jboot-input-msg" id="FStockClassID_Error"></label><input type="hidden" parenttype="stockClass"></div>';
		if($(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").length<=0){
			$(obj).parents(".detailData_"+id).append(stockClass);
			$("#FStockClassID_"+id+"_"+order+"_"+dataOrder).jeasycombo({
					width:216,
					label:'类别',
					labelWidth:40,
					multiple : true,//是否多选
					type:"tree",
					btnclass:"btn-danger",
					url : "select/stockClass.do?t=2",
					onChange: function(ids, texts){
						var fmarkid = undefinedToEmpty("FMarkID_",id,order,dataOrder);//$("#FMarkID_"+id+"_"+order+"_"+dataOrder).next().find("input").attr("ids");
						$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("reload", "store/selectStock.do?stockClassId="+ids+"&markId="+fmarkid+"&isMuti=false&storeId="+GetQueryString("storeid")+"&userId=");
						$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("disabled", false);
					}
			});
		}
	}else if(type=="stockMark"){
		var stockMark = '<div class="form-group" style="height: 35px;" id="markh_'+id+'"><label for="inputEmail3" class="col-sm-3 control-label" style="display:none;">品牌</label><input parenttype="'+type+'" class="validatebox-text" id="FMarkID_'+id+"_"+order+"_"+dataOrder+'" name="FMarkID" type="text" value="" placeholder="适用品牌"><label class="label label-danger jboot-input-msg" id="FMarkID_Error"></label><input type="hidden" parenttype="stockMark"></div>';
		if($(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").length<=0){
			$(obj).parents(".detailData_"+id).append(stockMark);
			$("#FMarkID_"+id+"_"+order+"_"+dataOrder).jeasycombo({
					width:216,
					label:'品牌',
					labelWidth:40,
					multiple : true,//是否多选
					isinline:false,
					dlgwidth:600,
					linenum:5,
					type : "list",//弹出的样式
					btnclass:"btn-danger",
					url : "select/mark.do",
					onChange: function(ids, texts){
						var fstockclassid = undefinedToEmpty("FStockClassID_",id,order,dataOrder);
						$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("reload", "store/selectStock.do?stockClassId="+fstockclassid+"&markId="+ids+"&isMuti=false&storeId="+GetQueryString("storeid")+"&userId=");
						$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("disabled", false);
					}
			});
		}
	}else if(type=="stock"){
		var stock = '<div class="form-group" style="height: 35px;" id="stockh_'+id+'"> <label for="inputEmail3" class="col-sm-3 control-label" style="display:none;">商品</label><input parenttype="'+type+'" class="validatebox-text" id="FStockID_'+id+"_"+order+"_"+dataOrder+'" name="FStockID" type="text" value="" placeholder="适用商品"><label class="label label-danger jboot-input-msg" id="FStockID_Error"></label><input type="hidden" parenttype="stock"></div>';
		if($(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").length<=0){
			$(obj).parents(".detailData_"+id).append(stock);
			var fstockclassid = undefinedToEmpty("FStockClassID_",id,order,dataOrder);
			var fmarkid = undefinedToEmpty("FMarkID_",id,order,dataOrder);
			$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo({	
				width:216,
				label:'商品',
				labelWidth:40,	
				multiple : false,//是否多选
				type : "list",//弹出的样式
				btnclass:"btn-danger",
				url : "store/selectStock.do?stockClassId="+fstockclassid+"&markId="+fmarkid+"&isMuti=false&storeId="+GetQueryString("storeid")+"&userId="
			});
		}
	}
	if(myselected=="myselected"){
		$(obj).attr("myselected","unmyselected");
		$(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").parent().css("display","none");
		$(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").val("");
		$(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").next().find("input").attr("ids","");
		$(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").next().find("input").attr("oldids","");
		$(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").next().find("input").val("");
	}else{
		$(obj).attr("myselected","myselected");
		$(obj).parents(".detailData_"+id).find("input[parenttype="+type+"]").parent().css("display","block");
	}
	updateType(obj,2);//修改广告
}

//保存自定义模板
function saveTemp(){
	$.messager.progress({text : "正在处理，请稍候..."}); 
	var type = Util.requestParam("type");
	var activityPageID = Util.requestParam("activityPageID");
	if(type!="0"&&type!="1"){
		$.messager.alert("提示","页面路径参数被修改，请重新进入本页面！");
		return;
	}
	var allDatas = new Array();
	$(".floatBody[newTag]").each(function(){
		var parentid=$(this).attr("parentid");
		var data = manageDatas(parentid,$(this),allDatas);
		allDatas.push(data);
	});
	var deleteTags = window.deleteTags;
	$.ajax({
		url:'customTemp/addOrUpdateAD.do',
		type:'POST',
		async: false,
		data:{jsonobj:JSON.stringify(allDatas),'storeid':storeid,'deleteTags':deleteTags,"pageType":type,'activityPageID':activityPageID},
		success:function(data){
			$.messager.progress("close");
			if(data!=null&&(data.result=="true"||data.result==true)){
				var id = data.ids.substring(0,data.ids.lastIndexOf(",")).split(",");
				for (var int = 0; int < id.length; int++) {
					$(".floatBody[newtag][datatype=1]").eq(int).attr("adid",id[int]);
				}
				$.messager.alert("提示","保存成功...");
				$(".floatBody[datatype]").removeAttr("datatype");
				if(type=="1"){
					if(typeof $("#thisActivityPage").find("a")[0]=="undefined"){
						if(activityPageID==""){
							activityPageID = data.activityPageID;
						}
						$("#thisActivityPage").append('<span style="display: block;padding: 5px 0 20px 136px;">'+$("base").attr("href")+"mobile/wx_page/store/"+activityPageID+'.jsp?storeid='+data.storeid+'&unitid='+data.unitid+'</span>');
					}
					$("#activityPage").removeClass("hidden");
					location.href=location.href+"&activityPageID="+activityPageID;
				}
			}else{
				$.messager.alert("提示","生成自定义模板页面失败，请重新生成...");
			}
		}
	});
}
//预览自定义模板
function showTemp(){
	var basepath = $("base").attr("href");
	var unitid = Util.requestParam("unitid");
	var storeid = Util.requestParam("storeid");
	var allDatas = new Array();
	$(".floatBody[newTag]").each(function(){
		var parentid=$(this).attr("parentid");
		var data = manageDatas(parentid,$(this),allDatas);
		allDatas.push(data);
	});
	$.ajax({
		url:'customTemp/previewTemp.do',
		type:'POST',
		async: false,
		data:{jsonobj:JSON.stringify(allDatas),'storeid':storeid},
		success:function(data){
			if(data!=null&&(data.result=="true"||data.result==true)){
				window.open(basepath+"wxStock/wxGetStoreModel.do?storeid="+storeid+"&unitid="+unitid);
			}else{
				$.messager.alert("提示","生成自定义模板页面失败，请重新生成...");
			}
		}
	});
}
//获取广告位广告
function manageDatas(parentid,obj){
	var datas = {};
	var detailData = new Array();
	if(parentid=="bigAD"){
		//图片展示类型  carousel：折叠轮播   split：分开展示
		var typeOBJ = obj.find(".show_method");
		datas[typeOBJ.attr("jsonkey")]=typeOBJ.parent().find("input:radio:checked").attr("value");
		//图片大小 0：大图  1：小图
		var sizeOBJ = obj.find("#imgSize");
		datas[sizeOBJ.attr("jsonkey")]=sizeOBJ.parent().find("input:radio:checked").attr("value");
	}else if(parentid=="LOGOAD"){
		
	}else if(parentid=="listAD"){
		
	}else if(parentid=="sudokuAD"){
		//橱窗标题名
		var titleName = obj.find(".titleName");
		datas[titleName.attr("jsonkey")]=titleName.parent().find("input").val();
		//显示方式  0：9宫格   1：6宫格
		var typeOBJ = obj.find(".show_method");
		datas['show_method']=typeOBJ.parent().find("input:radio:checked").attr("value");
	}else if(parentid=="searchBox"){
		
	}else if(parentid=="customNavi"){
		
	}else if(parentid=="subspace"){
		var height = obj.find(".subspaceHeight").find("input").val();
		var name = obj.find(".subspaceName").find("input").val();
		var color = obj.find(".subspaceBackGroundColor").find("input").val();
		datas['height'] = height;
		datas['name'] = name;
		datas['color'] = color;
	}else if(parentid=="commonNavi"){
		
	}else if(parentid=="shopwindow"){
		//橱窗标题名
		var titleName = obj.find(".titleName");
		datas[titleName.attr("jsonkey")]=titleName.parent().find("input").val();
		//显示方式  0：默认   1：3列
		var typeOBJ = obj.find(".show_method");
		datas[typeOBJ.attr("jsonkey")]=typeOBJ.parent().find("input:radio:checked").attr("value");
		//图片间隙 0：保留  1：清除
		var imgSpace = obj.find("#imgSpace");
		datas[imgSpace.attr("jsonkey")]=imgSpace.parent().find("input:radio:checked").attr("value");
	}else if(parentid=="stockDetail"){
		//显示方式  0：默认   1：3列
		var typeOBJ = obj.find(".show_method");
//		datas[typeOBJ.attr("jsonkey")]=typeOBJ.parent().find("input:radio:checked").attr("value");
		//默认为0
		datas[typeOBJ.attr("jsonkey")]=0;
	}
	getADCon(parentid,datas,obj,detailData);
	//广告类型
	datas['FADType']=parentid;
	datas['adid']=obj.attr("adid");
	datas['datatype']=obj.attr("datatype");
	datas['FOrder']=obj.attr("alltagorder");
	return datas;
}
//获取广告内容
function getADCon(parentid,datas,obj,detailData){
	//广告内容
		obj.find(".detailDatas_"+parentid).each(function(n,value){
			var data = {};
			//图片
			var imgOBJ = obj.find(".detailDatas_"+parentid+"[order="+(n+1)+"]").find("img");
			data[imgOBJ.attr("jsonkey")]=imgOBJ.attr("src");
			//广告
			var contOBJ = $(this);
			contOBJ.find("input:checkbox:checked").each(function(){
				var parenttype = $(this).attr("jsonkey");
				data[parenttype]=contOBJ.find("input[parenttype="+parenttype+"]").next().find("input").attr("ids");
				if(parenttype=="url"){
					data[parenttype]=contOBJ.find("input[parenttype="+parenttype+"]").val();
				}
			});
			data["order"]=$(this).attr("order");
			if(parentid=="stockDetail"){
				data["stockprice"] = imgOBJ.attr("stockprice");
				data["stockname"] = imgOBJ.attr("stockname");
			}
			detailData.push(data);
		});
		datas["FParam"] = detailData;
		return datas;
}
//设置辅助空白高度
function setSubspaceHeight(obj){
	var height = $(obj).val();
	var parentid = $(obj).parents(".floatBody").attr("parentid");
	$(".editing[class~='"+parentid+"']").css("height",height);
	updateType(obj,2);
}
//更改九宫格广告类型
function changeADType(obj){
	var order = $(obj).parents(".floatBody").attr("order");
	var jsonkey = $(obj).attr("jsonkey");
	var parentid = $(obj).parents(".floatBody").attr("parentid");
	if(jsonkey=="six"){
		$("."+parentid+"[order="+order+"]").find(".adIMG").eq(6).css("display","none");
		$("."+parentid+"[order="+order+"]").find(".adIMG").eq(7).css("display","none");
		$("."+parentid+"[order="+order+"]").find(".adIMG").eq(8).css("display","none");
		$(".editing").css("height",205);
		$(obj).parents(".sudokuADs").nextAll(".detailDatas").eq(6).css("display","none");
		$(obj).parents(".sudokuADs").nextAll(".detailDatas").eq(7).css("display","none");
		$(obj).parents(".sudokuADs").nextAll(".detailDatas").eq(8).css("display","none");
	}else{
		$("."+parentid+"[order="+order+"]").find(".adIMG").eq(6).css("display","");
		$("."+parentid+"[order="+order+"]").find(".adIMG").eq(7).css("display","");
		$("."+parentid+"[order="+order+"]").find(".adIMG").eq(8).css("display","");
		$(".editing").css("height",305);
		$(obj).parents(".sudokuADs").nextAll(".detailDatas").eq(6).css("display","");
		$(obj).parents(".sudokuADs").nextAll(".detailDatas").eq(7).css("display","");
		$(obj).parents(".sudokuADs").nextAll(".detailDatas").eq(8).css("display","");
	}
}
function imgSpace(obj){
	var type = $(obj).val();
	if(type==0){//保留间隙
		
	}else if(type==1){//清除间隙
		
	}
}
/**
 * 重新上传图片
 */
function resetUpLoad(order,dataOrder,id){
	
}
/**
 * 重新上传图片
 */
function resetUpLoad1(order,dataOrder,id){
	$("#add"+id+"_"+order+"_"+dataOrder).jeasyupload({
		url:"upload_richtext_multiple_json.do",
		multiple:false,//是否多选
		btn:$("#comp-linkphoto_"+id+"_"+order+"_"+dataOrder),
		live:true,
		btnid:"#comp-linkphoto_"+id+"_"+order+"_"+dataOrder,
		parent:$("#jboot_upload_"+id+"_"+order+"_"+dataOrder),
		customImg:function(i,file,o){
			$("#comp-linkphoto_"+id+"_"+order+"_"+dataOrder).parents(".detailData").find(".comImg").attr("src",file["url"]);
//			$(".editing").find("img[order="+dataOrder+"]").attr("src",file["url"]);
			$(".editing").find("img").eq(dataOrder-1).attr("src",file["url"]);
			updateType("#comp-linkphoto_"+id+"_"+order+"_"+dataOrder,2);//修改广告
		}
	});
}
//删除广告
function deleteTempAD(obj,id,order,dataOrder){
	//删除标识
	if($(obj).parents(".detailDatas").siblings(".detailDatas").length==0){
		var adid = $(obj).parents(".floatBody").attr("adid");
		if(adid!=undefined&&adid!='undefined'){
			window.deleteTags+=adid+",";
		}
	}
	//删除广告后重新排序
	$(obj).parents(".detailDatas").siblings(".detailDatas").each(function(n,value){
		$(this).attr("order",(n+1));
	});
	var show_method = $(obj).parents(".detailDatas").siblings(".bigADs").find(":radio:checked").val();
	if(show_method=="1"&&id=="bigAD"){
		var s = $(obj).parents(".detailDatas").siblings(".detailDatas").length;
		if(s>0){
			//大幅广告，分开展示删除左侧广告
			var order = parseInt($(obj).parents(".detailDatas").attr("order"));//广告位顺序
			$(".editing .adIMG").eq(order-1).remove();
			$(".editing").css("height",(order-1)*150+"px");
			$("#phoneHeader").css("height",($("#phoneHeader").height()-150)+"px");
			$("#tempalteBody").css("height",($("#tempalteBody").height()-150)+"px");
		}else{
			$(".editing .adIMG").removeAttr("mark");
		}
	}else if(id=="sudokuAD"){//六宫格广告
		var od = parseInt($(obj).parents(".detailDatas").attr("order"));
		$(".editing").find("img").eq(od-1).remove();//attr("src","img/shopwindowbig_1.png");
		$(".editing").append('<img src="img/shopwindowbig_1.png" class="adIMG" alt="" order="'+($(".editing").find("img").length+1)+'">');
		$(".editing").find("img").each(function(n,value){
			$(this).attr("order",(n+1));
		});
	}
//	else if(id=="shopwindow"){//橱窗广告
//		var od = parseInt($(obj).parents(".detailDatas").attr("order"));
//		$(".editing").find("img").eq(od-1).attr("src","img/shopwindowbig_1.png");
//	}
	
	//右侧广告数量
	var len = $(obj).parents(".detailDatas").siblings(".detailDatas").length;
	updateType(obj,2);//修改广告
	//移除右侧广告
	$(obj).parents(".detailDatas").remove();
	//移除左侧广告位
	var o = "."+id+"[order="+order+"][editorder="+dataOrder+"]";
	$("#add"+id+order).attr("order",len);//初始化上传按钮order
//	deleteTag(o);
}
/**
 * 获取当前店铺设置的自定义模板广告
 * 王文樟 20160925
 * 用于修改
 */
function getCustomTempAD(){
	var url = "";
	var type = Util.requestParam("type");
	var activityPageID = Util.requestParam("activityPageID");
	var storeid = Util.requestParam("storeid");
	var unitid = Util.requestParam("unitid");
	if(activityPageID!=""){
		$("#thisActivityPage").append('<span style="display: block;padding: 5px 0 20px 136px;">'+$("base").attr("href")+"mobile/wx_page/store/"+activityPageID+'.jsp?unitid='+unitid+'&storeid='+storeid+'</span>');
		$("#activityPage").removeClass("hidden");
	}else{
		$("#activityPage").addClass("hidden");
	}
	if(type=="1"){
		url = "customTemp/getADByFActivityPageID.do";
	}else if(type=="0"){
		url = "customTemp/getCustomTempAD.do";
	}else{
		$.messager.alert("提示","页面路径参数被修改，请重新进入本页面！");
		return;
	}
	$.ajax({
		url:url,
		type:'POST',
		async: false,
		data:{'storeid':storeid,'activityPageID':activityPageID},
		dataType:'json',
		success:function(data){
			if(data.rows.length>0){
				var leftArr = new Array();
				var rightArr = new Array();
				var h = 0;
				$.each(data.rows,function(n,value){
					createLeftAD(value,n+1);
					createRightAD(value,n+1);
					var leftAD = eval('(' + value['fparam'] + ')').FParam;
					var show_method = eval('(' + value['fparam'] + ')').show_method;
					if(show_method=="1"&&value["fadtype"]=="bigAD"){
						h+=(leftAD.length-1)*150;
					}
				});
				$("#tempalteBody").css("height",tagHeight+oldHeight+h);
				$("#phoneHeader").css("height",tagHeight+oldHeight+h);
				$("body").attr("isSet","true");
			}
		}
	});
}
//生成左侧手机屏幕广告---用于查询已设置的广告位
function createLeftAD(data,order){
	var html = "";
	var id = data.fadtype;
//	var order = data.forder;
	var allTagOrder = data.forder;
	var tagHeights = parseInt($("#"+id).attr("tagheight"));
	//增加选中状态
	$(".borderDotted").removeClass("editing");
	html = getHtmlByEdit(data,tagHeights,order);//生成标签
	$("#tempalteBody").append(html);
	var width = parseInt($("."+id).css("width").replace("px",""));
	width += $(".editing").offset().left;
	var top = $(".editing").position().top;
	$("#floatExplain").css("left",width+10);
	$("#floatBody").css("left",-100);
	$("#floatExplain").css("top",top);
}
//生成右侧详情---用于查询已设置的广告位
function createRightAD(data,order){
	var html = "";
	var id = data.fadtype;
//	var order = data.forder;
//	var allTagOrder = data.forder;
	var tagHeights = parseInt($("#"+id).attr("tagheight"));
	//复制标签生成新的标签，用于设置广告
	var thisOBJ = $(".floatBody[parentid="+id+"][order='0']").clone().appendTo("#floatBody");
	thisOBJ.attr("order",order);
	thisOBJ.attr("allTagOrder",order);
	thisOBJ.attr("newTag","1");
	thisOBJ.find("#add"+id).attr("id","add"+id+order);
	$(".floatBody[parentid="+id+"][order='"+order+"']").find("#add"+id+order).find("#comp_linkphoto").attr("id","comp_linkphoto_"+id+"_"+order);
	$(".floatBody[parentid="+id+"][order='"+order+"']").find("#add"+id+order).find("#jboot-upload").attr("id","jboot-upload"+id+"_"+order);
	var paramAD = eval('(' + data.fparam + ')').FParam;
	var show_method = eval('(' + data.fparam + ')').show_method;
	var adid = data.adid;
	//判断不同的redio
	var radioObj = $(".floatBody[parentid="+id+"][order='"+order+"']").find("input[type='radio']");
	radioObj.each(function(n,val){
		$(this).attr("name",$(this).attr("name")+order);
	});
//	loadUpload(order,id);
	$(".floatBody").css("display","none");
	$("#floatExplain").css("display","block");
	$(".floatBody[parentid='"+id+"'][order="+order+"]").css("display","block");
	$(".floatBody[parentid='"+id+"'][order="+order+"]").attr("adid",adid);
	/*
	 * 生成右侧已上传的广告
	 * 
	 */
	if(id=="shopwindow"||id=="bigAD"){
		thisOBJ.find(".titleName").next().val(eval('(' + data.fparam + ')').titleName);
		thisOBJ.find("input[value="+show_method+"]").attr("checked",true);
		if(show_method=="0"&&id=="shopwindow"){
			$(".editing").removeClass("threeRows");
		}else if(id=="shopwindow"&&show_method=="1"){
			$(".editing").addClass("threeRows");
		}
	}else if(id=="subspace"){
		thisOBJ.find(".subspaceHeight input").val(eval('(' + data.fparam + ')').height);
		thisOBJ.find(".subspaceName input").val(eval('(' + data.fparam + ')').name);
		thisOBJ.find(".subspaceBackGroundColor input").val(eval('(' + data.fparam + ')').color);
	}
	$.each(paramAD,function(n,value){
		var dataOrder = n+1;
		var html = "";
		if(id!="wxqr"){
			html = "<div jsonKey='adDetail' order="+dataOrder+" class='detailDatas detailDatas_"+id+"' class='"+id+"s'><div class='detailData detailData_"+id+"'>"+
			"<img jsonKey='imgURL' class='comImg' alt='' src='"+value.imgURL+"' stockname='"+value.stockname+"' stockprice='"+value.stockprice+"'>"+
			"<a onclick='deleteTempAD(this,\""+id+"\","+order+","+dataOrder+")' style='position: relative; z-index: 2;top:-22px;left: 63px;' class='actionSon'>删除</a>"+
			
			"<div class='btn-success' style='border: 1px solid #dddada; padding: 5px;border-radius:4px;margin-top: -10px;text-align:center;'><a id='comp-linkphoto_"+id+"_"+order+"_"+dataOrder+"' style='color: #ffffff;' onclick='selectResetUpLoad(this,"+dataOrder+")'>重新上传</a></div><div id='jboot_upload_"+id+"_"+order+"_"+dataOrder+"'></div>"+
			"</div><div class='detailData detailData_"+id+"'>"+"<div style='margin-top:-40px;'><label id='url"+order+"'>"+
			
			"<input jsonKey='url' "+getCheckBoxState('url',value)+" onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='url' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>自定义路径</label>"+"<label id='stockClass"+order+"'>"+
			"<input jsonKey='stockClass' "+getCheckBoxState('stockClass',value)+" onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stockClass' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品类别</label><label id='stockMark"+order+"'>"+
			"<input jsonKey='stockMark' "+getCheckBoxState('stockMark',value)+" onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stockMark' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品品牌</label><label id='stock"+order+"'>"+
			"<input jsonKey='stock' "+getCheckBoxState('stock',value)+" onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stock' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品</label>"+
			"<a class='btn btn-search btn-sm' onclick='useCover(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' >使用封面</a></div>" +
			""+changeStockByEdit(value,id,dataOrder,order)+
			"</div><div style='display:none;' id='add"+id+"_"+order+"_"+dataOrder+"'></div></div>";
		}else{
			html = "<div jsonKey='adDetail' order="+dataOrder+" class='detailDatas detailDatas_"+id+"' class='"+id+"s'><div class='detailData detailData_"+id+"'>"+
			"<img jsonKey='imgURL' class='comImg' alt='' src='"+value.imgURL+"'>"+
			"<a onclick='deleteTempAD(this,\""+id+"\","+order+","+dataOrder+")' style='position: relative; z-index: 2;top:-22px;left: 63px;' class='actionSon'>删除</a>"+
			
			"<div class='btn-success' style='border: 1px solid #dddada; padding: 5px;border-radius:4px;margin-top: -10px;text-align:center;'><a id='comp-linkphoto_"+id+"_"+order+"_"+dataOrder+"' style='color: #ffffff;' onclick='selectResetUpLoad(this,"+dataOrder+")'>重新上传</a></div><div id='jboot_upload_"+id+"_"+order+"_"+dataOrder+"'></div>"+
			"</div>"+changeStockByEdit(value,id,dataOrder,order)+
			"</div><div style='display:none;' id='add"+id+"_"+order+"_"+dataOrder+"'></div></div>";
		}
		$("#add"+id+order).attr("order",dataOrder);
		$("#add"+id+order).before(html);
		resetUpLoad(order,dataOrder,id);//加载重新上传插件
		initStock(id,order,dataOrder,value.stock,value.stockMark,value.stockClass);
	});
}
//返回不同广告位不同的标签---用于查询已设置的广告位
function getHtmlByEdit(data,height,order){
	tagHeight+=height;
	var leftAD = eval('(' + data['fparam'] + ')').FParam;
	var show_method = eval('(' + data['fparam'] + ')').show_method;
	var id = data.fadtype;
	var adid = data.adid;
//	var order = data.forder;
	var html = "<div order="+order+" onclick='editing(this)' class='borderDotted "+id+" editing' style='height:"+height+"px;position:relative;'><div class='action'><div style='display:none;' class='actionSon edit'>编辑</div><div style='display:none;' class='actionSon add'>新增</div><div class='actionSon delete' adid="+adid+" onclick='deleteTag(this,event);'>删除</div></div>";
//	$.messager.alert("提示",JSON.stringify(leftAD))
	if(leftAD.length>0){
		if(id=="bigAD"){//大幅广告
			var bigADSize = 0;
			if(show_method=="1"){
//			html = html.replace("editing'","' editorder='1'");
				$.each(leftAD,function(n,value){
					html += "<img alt='' style='width:312px;height:146px;' mark='mark' class='adIMG' src='"+leftAD[n].imgURL+"'>";
					bigADSize++;
				});
			}else{
				html += "<img alt='' style='width:312px;height:146px;' mark='mark' class='adIMG' src='"+leftAD[0].imgURL+"'>";
			}
			if(bigADSize>0){
				html=html.replace("height:150px;line-height:150px;","height:"+150*bigADSize+"px;line-height:"+150*bigADSize+"px;");
			}
//		html += "<img alt='' style='width:312px;height:146px;' class='adIMG' src='"+leftAD[0].imgURL+"'>";
		}else if(id=="LOGOAD"){//logo
			html += "<img alt='' style='width:312px;height:100px;' class='adIMG' src='"+leftAD[0].imgURL+"'>";
		}else if(id=="listAD"){//列表广告
			html += "<img alt='' style='width:312px;height:80px;' class='adIMG' src='"+leftAD[0].imgURL+"'>";
		}else if(id=="sudokuAD"){//九宫格广告
			$.each(leftAD,function(n,value){
				html += "<img order='"+(n+1)+"' alt='' class='adIMG' src='"+value.imgURL+"'>";
			});
			for (var int = leftAD.length+1; int <= 6; int++) {
				html += "<img order='"+int+"' alt='' class='adIMG' src='img/six.png'>";
			}
		}else if(id=="searchBox"){//搜索框
			html += "<img alt='' style='width:312px;height:45px;' class='adIMG' src='img/searchbox.png'>";
		}else if(id=="customNavi"){//自定义导航
			$.each(leftAD,function(n,value){
				if(value.imgURL!=undefined){
					html += "<img order="+(n+1)+" alt='' style='width:50px;height:47px;' class='adIMG' src='"+value.imgURL+"'>";
				}else{
					html += "<img order="+(n+1)+" alt='' style='width:50px;height:47px;' class='adIMG' src='img/zdy1.png'>";
				}
			});
			for (var int = leftAD.length+1; int <= 4; int++) {
				html += "<img order="+int+" alt='' style='width:50px;height:47px;' class='adIMG' src='img/zdy1.png'>";
			}
		}else if(id=="subline"){//辅助线
			html += '<hr class="custom-line">';
		}else if(id=="subspace"){//辅助空白
			html += "";
		}else if(id=="commonNavi"){//公共导航栏,暂时没做
			html += "<img alt='' style='width:312px;height:50px;' class='adIMG' src='"+fileServer+"img/index/34424f0c11bffbe306fe6b487663bfb30468de046a0b5fb55bdabf2c1aebd640be93213f.jpg'>";
		}else if(id=="shopwindow"){//橱窗广告
			html += '<div class="control-group"><div class="custom-showcase-wrap custom-showcase-wrap-0"><div class="custom-showcase-body custom-showcase-without-space"><ul class="custom-showcase clearfix">';
			$.each(leftAD,function(n,value){
				if(n==0){
					html += '<li class="custom-showcase-big"><img src="'+value.imgURL+'"></li>';
				}else{
					html += '<li class="custom-showcase-small"><img src="'+value.imgURL+'"></li>';
				}
			});
			//未设置的广告已默认图片补齐
			for (var int = leftAD.length+1; int <= 3; int++) {
				if(int==1){
					html += '<li class="custom-showcase-big"><img src="img/shopwindowbig.png"></li>';
				}else{
					html += '<li class="custom-showcase-small"><img src="img/shopwindowbig.png"></li>';
				}
			}
			html += '</ul></div></div><div class="component-border"></div></div>';
		}else if(id=="mostFour"){//一排四个广告
			$.each(leftAD,function(n,value){
				html += "<img order='"+(n+1)+"' alt='' class='adIMG' src='"+value.imgURL+"'>";
			});
		}else if(id=="wxqr"){//二维码
			$.each(leftAD,function(n,value){
				html += "<img order='"+(n+1)+"' alt='' style='width:160px;height:160px;margin-left:80px;' class='adIMG' src='"+value.imgURL+"'>";
			});
		}else if(id=="stockDetail"){//带有商品详情的广告
			$.each(leftAD,function(n,value){
				var imgURL = value.imgURL;
				var stockname = value.stockname;
				var stockprice = value.stockprice;
				if(imgURL==""){
					imgURL = "img/shopwindowbig.png";
				}
				if(n==0){
					html += "<div style='height:220px;width:150px;display:inline-block;margin:0 5px 0 3px;'>"
						+"<div><img order='1' alt='' class='adIMG' style='width:150px;height:150px;' src='"+imgURL+"'></div>"
						+"<div>"+"<div class='stockname' style='height:40px;overflow:hidden;'>"+stockname+"</div>"+"<div class='stockprice' style='color:red;'>"+stockprice+"</div>"
						+"</div>"
						+"</div>";
				}else{
					html += "<div style='height:220px;width:150px;display:inline-block;'>"
						+"<div><img order='2' alt='' class='adIMG' style='width:150px;height:150px;' src='"+imgURL+"'></div>"
						+"<div>"+"<div class='stockname' style='height:40px;overflow:hidden;'>"+stockname+"</div>"+"<div class='stockprice' style='color:red;'>"+stockprice+"</div>"
						+"</div>"
						+"</div>";
				}
			});
		}
	}
	html+=//"<a onclick='uploadTempAD(this,\""+id+"\");'>+添加一个广告</a>"+
	"</div>";
//	if(id=="bigAD"&&show_method=="1"){
//		$.each(leftAD,function(n,value){
//			if(n>0&&n<leftAD.length-1){
//				html += "<div order="+order+" onclick='editing(this)' editorder='"+(n+1)+"' class='borderDotted "+id+"' style='height:"+height+"px;line-height:"+height+"px;position:relative;'><img alt='' style='width:312px;height:146px;' class='adIMG' src='"+leftAD[n].imgURL+"'>"
//				+"<div class='action'><div style='display:none;' class='actionSon edit'>编辑</div><div style='display:none;' class='actionSon add'>新增</div><div class='actionSon delete' onclick='deleteTag(this,event);'>删除</div></div></div>";;
//			}else if(n==leftAD.length-1){
//				html += "<div order="+order+" onclick='editing(this)' editorder='"+(n+1)+"' class='borderDotted "+id+" editing' style='height:"+height+"px;line-height:"+height+"px;position:relative;'><img alt='' style='width:312px;height:146px;' class='adIMG' src='"+leftAD[n].imgURL+"'>"
//				+"<div class='action'><div style='display:none;' class='actionSon edit'>编辑</div><div style='display:none;' class='actionSon add'>新增</div><div class='actionSon delete' onclick='deleteTag(this,event);'>删除</div></div></div>";;
//			}
//		})
//	}
	return html;
}
//展示广告绑定商品
function changeStockByEdit(data,id,dataOrder,order){
	var url = data.url;
	var stockClass = data.stockClass;
	var stockMark = data.stockMark;
	var stock = data.stock;
	var html = "";
	if(url!=""&&url!=null&&url!=undefined){
		html+='<div class="form-group" style="height: 35px;" id="urlh"><label style="text-align: right; height: 25px; line-height: 25px; width: 35px;" class="textbox-label textbox-label-before">URL</label><input parenttype="url" class="validatebox-text" id="FURL" name="FURL" type="text" value="'+url+'" placeholder="链接地址" style="width:170px;"><label class="label label-danger jboot-input-msg" id="FURL_Error"></label></div>';
	}
	if(stockClass!=""&&stockClass!=null&&stockClass!=undefined){
		html+='<div class="form-group" style="height: 35px;" id="stockclassh_'+id+'"><label for="inputEmail3" class="col-sm-3 control-label" style="display:none;">类别</label><input parenttype="stockClass" class="validatebox-text" id="FStockClassID_'+id+"_"+order+"_"+dataOrder+'" name="FStockClassID" type="text" value="'+stockClass+'" placeholder="适用商品类别"><label class="label label-danger jboot-input-msg" id="FStockClassID_Error"></label><input type="hidden" parenttype="stockClass"></div>';
	}
	if(stockMark!=""&&stockMark!=null&&stockMark!=undefined){
		html += '<div class="form-group" style="height: 35px;" id="markh_'+id+'"><label for="inputEmail3" class="col-sm-3 control-label" style="display:none;">品牌</label><input parenttype="stockMark" class="validatebox-text" id="FMarkID_'+id+"_"+order+"_"+dataOrder+'" name="FMarkID" type="text" value="'+stockMark+'" placeholder="适用品牌"><label class="label label-danger jboot-input-msg" id="FMarkID_Error"></label><input type="hidden" parenttype="stockMark"></div>';
	}
	if(stock!=""&&stock!=null&&stock!=undefined){
		html += '<div class="form-group" style="height: 35px;" id="stockh_'+id+'"> <label for="inputEmail3" class="col-sm-3 control-label" style="display:none;">商品</label><input parenttype="stock" class="validatebox-text" id="FStockID_'+id+"_"+order+"_"+dataOrder+'" name="FStockID" type="text" value="'+stock+'" placeholder="适用商品"><label class="label label-danger jboot-input-msg" id="FStockID_Error"></label><input type="hidden" parenttype="stock"></div>';
	}
	return html;
}
function initStock(id,order,dataOrder,stock,stockMark,stockClass){
	$("#FStockClassID_"+id+"_"+order+"_"+dataOrder).jeasycombo({
		width:216,
		label:'类别',
		labelWidth:40,
		multiple : true,//是否多选
		type:"tree",
		btnclass:"btn-danger",
		url : "select/stockClass.do?t=2",
		onChange: function(ids, texts){
			var fmarkid = $("#FMarkID_"+id+"_"+order+"_"+dataOrder).next().find("input").attr("ids");
			$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("reload", "store/selectStock.do?stockClassId="+ids+"&markId="+fmarkid+"&isMuti=false&storeId="+GetQueryString("storeid")+"&userId=");
			$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("disabled", false);
		}
	});
	$("#FMarkID_"+id+"_"+order+"_"+dataOrder).jeasycombo({
		width:216,
		label:'品牌',
		labelWidth:40,
		multiple : true,//是否多选
		isinline:false,
		dlgwidth:600,
		linenum:5,
		type : "list",//弹出的样式
		btnclass:"btn-danger",
		url : "select/mark.do",
		onChange: function(ids, texts){
			var fstockclassid = $("#FStockClassID_"+id+"_"+order+"_"+dataOrder).next().find("input").attr("ids");
			$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("reload", "store/selectStock.do?stockClassId="+fstockclassid+"&markId="+ids+"&isMuti=false&storeId="+GetQueryString("storeid")+"&userId=");
			$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo("disabled", false);
		}
	});
	typeof stockClass=="undefined"?"":stockClass;
	typeof stockMark=="undefined"?"":stockMark;
	if(typeof stockMark=="undefined"){
		stockMark="";
	}
	if(typeof stockClass=="undefined"){
		stockClass="";
	}
	$("#FStockID_"+id+"_"+order+"_"+dataOrder).jeasycombo({		
		width:216,
		label:'商品',
		labelWidth:40,
		multiple : false,//是否多选
		type : "list",//弹出的样式
		btnclass:"btn-danger",
		url : "store/selectStock.do?stockClassId="+stockClass+"&markId="+stockMark+"&isMuti=false&storeId="+GetQueryString("storeid")+"&userId="
	});
}
function getCheckBoxState(type,data){
	var url = data.url;
	var stockClass = data.stockClass;
	var stockMark = data.stockMark;
	var stock = data.stock;
	var html = "";
	if(url!=""&&url!=null&&url!=undefined&&type=="url"){
		return "checked='checked' myselected='myselected'";
	}
	if(stockClass!=""&&stockClass!=null&&stockClass!=undefined&&type=="stockClass"){
		return "checked='checked' myselected='myselected'";
	}
	if(stockMark!=""&&stockMark!=null&&stockMark!=undefined&&type=="stockMark"){
		return "checked='checked' myselected='myselected'";
	}
	if(stock!=""&&stock!=null&&stock!=undefined&&type=="stock"){
		return "checked='checked' myselected='myselected'";
	}
}
/**
 * 获取当前页参数---王文樟7月21日加
 */
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  decodeURIComponent(r[2]); return null;
}
function undefinedToEmpty(stockConcern,id,order,dataOrder){//FStockClassID_
	var dat = $("#"+stockConcern+id+"_"+order+"_"+dataOrder)[0];
	if(typeof dat==undefined||typeof dat=="undefined"){
		return "";
	}else{
		var ids = $("#"+stockConcern+id+"_"+order+"_"+dataOrder).next().find("input").attr("ids");
		if(ids==""||ids==undefined||ids=="undefined")
			return "";
		else
			return ids;
	}
}
//使用封面
function useCover(obj,id,dataOrder,order){
  var stockid=undefinedToEmpty("FStockID_",id,order,dataOrder);//获取商品id
  var storeid = Util.requestParam("storeid");
  if(stockid==""){
	 $.messager.alert("提示","请先选择适用商品后，再进行操作");
	 return false;
  }
  $.ajax({
	 type:'POST',
	 url:'store/getStoreSubStockByStockID.do?stockid='+stockid+"&storeid="+storeid,
     dataType:'json',
     success:function(data){
    	 var parentOrder = $(obj).parents(".detailDatas").attr("order");
         var furl="";
         var fname="";
         var fprice="";
//         $.each(data.rows,function(n,value){
    	 furl=data.fcover;
    	 fname = data.fname;
    	 fprice = data.fprice.toFixed(2);
//         });  
         $(obj).parents(".detailData").prev().find(".comImg").attr("src",fileServer+furl).attr("stockname",fname).attr("stockprice",fprice);
         if(id=="bigAD"||id=="shopwindow"){
        	 $(".editing").find("img").eq(parentOrder-1).attr("src",fileServer+furl);
         }else if(id=="stockDetail"){
        	 $(".editing").find("img[order="+parentOrder+"]").attr("src",fileServer+furl);
        	 $(".editing").find("img[order="+parentOrder+"]").parent().next().find(".stockname").html(fname);
        	 $(".editing").find("img[order="+parentOrder+"]").parent().next().find(".stockprice").html(fprice);
         }else{
        	 $(".editing").find("img[order="+parentOrder+"]").attr("src",fileServer+furl);
         }
     }
  });
  updateType(obj,2);//修改广告
}

//修改广告位类型：0:未修改；1:新增；2:修改；3:刪除
function updateType(obj,type){
	var adid = $(obj).parents(".floatBody").attr("adid");
	if(adid!=undefined && adid!='undefined'){
		$(obj).parents(".floatBody").attr("datatype",type);
	}
}

//onclick上传图片
function selectUpLoad(btn,dataOrder){
	console.log("#"+$(btn).attr("id"));
	$("#jboot_upload_current").val("#"+$(btn).attr("id"));
	$("#jboot_upload_dataOrder").val(dataOrder);
	$("#upLoad_btn").jeasyupload("select");
	updateType($(btn).attr("id"),2);//修改广告
}

//onclick重新上传
function initUpLoad(){
	$("#upLoad_btn").jeasyupload({
		url:"upload_richtext_multiple_json.do",
		multiple:false,//是否多选
		parent:$("#jboot_upload"),
		customImg:function(i,file,o){
			var id = $("#jboot_upload_current").val();
			var obj = $(id);
			var dataOrder = $("#jboot_upload_dataOrder").val();
			initStockADImg(id,dataOrder,file);
		}
	});
}

//onclick重新上传
function selectResetUpLoad(btn,dataOrder){
	console.log("#"+$(btn).attr("id"));
	$("#jboot_upload_current").val("#"+$(btn).attr("id"));
	$("#jboot_upload_dataOrder").val(dataOrder);
	$("#resetUpLoad_btn").jeasyupload("select");
}

//onclick重新上传
function initResetUpLoad(){
	$("#resetUpLoad_btn").jeasyupload({
		url:"upload_richtext_multiple_json.do",
		multiple:false,//是否多选
		parent:$("#jboot_upload_resetUpLoad"),
		customImg:function(i,file,o){
			var id = $("#jboot_upload_current").val();
			var obj = $(id);
			var dataOrder = $("#jboot_upload_dataOrder").val();
			obj.parents(".detailData").find(".comImg").attr("src",file["url"]);
			$(".editing").find("img").eq(dataOrder-1).attr("src",file["url"]);
			updateType(id,2);//修改广告
		}
	});
}

//上传图片成功后设置广告位图片
function initStockADImg(id,dataOrder,file,show_method){
	id = id.split("_")[2];
	var order = $(".editing").attr("order");
	updateType("#comp_linkphoto_"+id+"_"+order,2);//修改广告
	var dataOrder = $("#add"+id+order).attr("order");
	if(dataOrder){
		dataOrder=parseInt(dataOrder)+1;
	}else{
		dataOrder=1;
	}
	if(id=="bigAD"){//大幅广告
		//判断广告数量
		if(dataOrder<=6){
			var or = $(".editing").attr("order");
			show_method = $(".floatBody[parentid=bigAD][order="+order+"]").find(":radio:checked").val();
			if(show_method=="0"){
				$(".editing img").attr("src",file["url"]);
			}else if(show_method=="1"){//分开展示
				var phoneHeader = parseInt($("#phoneHeader").css("height").replace("px",""));
				var o = $(".editing img").eq(0).clone().attr("src",file["url"]).attr("mark","mark");
				$(".editing img:not([mark])").remove();
				$(".editing").append(o);
				$(".editing").css("height",$(".editing img").length*150+"px");
				$("#tempalteBody").css("height",$("#tempalteBody").height()+150);
				$("#phoneHeader").css("height",phoneHeader+150);
			}
		}else{
			$.messager.alert("提示","大幅广告最多设置6个广告");
			return;
		}
	}else if(id=="shopwindow"){//橱窗广告
		if(dataOrder==1){
			$(".editing .custom-showcase-big img").attr("src",file["url"]);
		}else if(dataOrder==2){
			$(".editing .custom-showcase-small:first img").attr("src",file["url"]);
		}else if(dataOrder==3){
			$(".editing .custom-showcase-small:last img").attr("src",file["url"]);
		}else{
			$.messager.alert("提示","橱窗广告最多设置3个广告");
			return;
		}
	}else if(id=="customNavi"){//图片导航
		if(dataOrder<=4){
			$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
		}else{
			$.messager.alert("提示","自定义导航最多设置4个广告");
			return;
		}
	}else if(id=="sudokuAD"){
		$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
		var size = $(".editing .adIMG[style!='display: none;']").size();
		if(size==6&&dataOrder>6){
			$.messager.alert("提示","六宫格广告，最多设置六个");
			return;
		}else if(size==9&&dataOrder>9){
			$.messager.alert("提示","九宫格广告，最多设置九个");
			return;
		}
	}else if(id=="mostFour"){
		$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
		var size = $(".editing .adIMG[style!='display: none;']").size();
		if(size==4&&dataOrder>4){
			$.messager.alert("提示","一排最多设置四个广告");
			return;
		}
	}else if(id=="wxqr"){
		$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
		var size = $(".editing .adIMG[style!='display: none;']").size();
		if(size==1&&dataOrder>1){
			$.messager.alert("提示","微信二维码最多上传一张");
			return;
		}
	}else if(id=="stockDetail"){
		$(".editing .adIMG[order="+dataOrder+"]").attr("src",file["url"]);
		var size = $(".editing .adIMG[style!='display: none;']").size();
		if(size==1&&dataOrder>3){
			$.messager.alert("提示","商品详情类的广告最多设置三个广告");
			return;
		}
	}
	var html = "";
	if(id!="wxqr"){
		html = "<div jsonKey='adDetail' order="+dataOrder+" class='detailDatas detailDatas_"+id+"' class='"+id+"s'><div class='detailData detailData_"+id+"'>"+
		"<img jsonKey='imgURL' class='comImg' alt='' src='"+file["url"]+"'>"+
		"<a onclick='deleteTempAD(this,\""+id+"\","+order+","+dataOrder+")' style='position: relative; z-index: 2;top:-22px;left: 63px;' class='actionSon'>删除</a>"+
		
		"<div class='btn-success' style='border: 1px solid #dddada; padding: 5px;border-radius:4px;margin-top: -10px;text-align:center;'><a id='comp-linkphoto_"+id+"_"+order+"_"+dataOrder+"' style='color: #ffffff;' onclick='selectResetUpLoad(this,"+dataOrder+")'>重新上传</a></div><div id='jboot_upload_"+id+"_"+order+"_"+dataOrder+"'></div>"+
		"</div><div class='detailData detailData_"+id+"'>"+"<div style='margin-top:-40px;'><label id='url"+order+"'>"+
		
		"<input jsonKey='url' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='url' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>自定义路径</label>"+"<label id='stockClass"+order+"'>"+
		"<input jsonKey='stockClass' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stockClass' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品类别</label><label id='stockMark"+order+"'>"+
		"<input jsonKey='stockMark' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stockMark' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品品牌</label><label id='stock"+order+"'>"+
		"<input jsonKey='stock' onclick='changeStock(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' type='checkbox' myType='stock' name='adBindStock_"+id+"_"+order+"_"+dataOrder+"'>商品</label>"+
		"<a class='btn btn-search btn-sm' onclick='useCover(this,\""+id+"\",\""+dataOrder+"\",\""+order+"\")' >使用封面</a></div>"+
		"</div><div style='display:none;' id='add"+id+"_"+order+"_"+dataOrder+"'></div></div>";
	}else{
		html = "<div jsonKey='adDetail' order="+dataOrder+" class='detailDatas detailDatas_"+id+"' class='"+id+"s'><div class='detailData detailData_"+id+"'>"+
		"<img jsonKey='imgURL' class='comImg' alt='' src='"+file["url"]+"'>"+
		"<a onclick='deleteTempAD(this,\""+id+"\","+order+","+dataOrder+")' style='position: relative; z-index: 2;top:-22px;left: 63px;' class='actionSon'>删除</a>"+
		
		"<div class='btn-success' style='border: 1px solid #dddada; padding: 5px;border-radius:4px;margin-top: -10px;text-align:center;'><a id='comp-linkphoto_"+id+"_"+order+"_"+dataOrder+"' style='color: #ffffff;' onclick='selectResetUpLoad(this,"+dataOrder+")'>重新上传</a></div><div id='jboot_upload_"+id+"_"+order+"_"+dataOrder+"'></div>"+
		"</div><div style='display:none;' id='add"+id+"_"+order+"_"+dataOrder+"'></div></div>";
	}
	$("#add"+id+order).before(html);
	$("#add"+id+order).attr("order",$("#add"+id+order).siblings(".detailDatas_"+id).length);
}