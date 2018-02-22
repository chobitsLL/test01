			
  
//修改价格
  function editprice(){
	 var editprice=$("#stockcommprice").val();
	 var discountprice=$("#stockdiscount").val();
	 if(discountprice!=""){
		 discountprice = parseFloat(discountprice);
		 if(discountprice>1){
			 $.messager.alert("提示","折扣请输入1的值","error");
			 $("#stockdiscount").val("");
	    	 return ;
		 }
	 }
	 var ids=$("#ids").val();
	 var idarr=ids.split(",");
	 var count=$("#stockcount").val();
	 if(count!=""){
	     $(".newcount").numberbox('setValue',count);
	 } 
	 if(editprice!=""){
		 $(".newprice").numberbox('setValue',editprice); 
	 } else if (discountprice!=""){
	    for(var i=0;i<idarr.length;i++){
	    	var id=idarr[i]; 
	    	var oldprice = $("#price_"+id).text();
	    	if(oldprice=="" || oldprice==undefined){
	    		oldprice = 0;
	    	}
	    	prices=parseFloat(parseFloat(oldprice)*discountprice).toFixed(2);
	    	$("#"+id).numberbox('setValue',prices);
		} 	
	 }
  }
//保存价格
 function saveprice(){
	var ids=$("#ids").val(); 
	var storeTypeLink=$("#storeTypeLink").val();
	var idarr=ids.split(",");
	var array = new Array();
    for(var i=0;i<idarr.length;i++){
    	var id=idarr[i]; 
    	var price=$("#"+id).val();
    	var count=$("#count_"+id).val();
    	var code=$("#code_"+id).val();
    	var substockid=$("#code_"+id).attr("substockid");
     	if(price==null || price==""){
    	   $.messager.alert("提示","价格不允许为空！！！","error");
    	   return false;
    	}else if(count==null||count==""){
    		count=0;
    		 //$.messager.alert("提示","库存不允许为空！！！","error");
      	  // return false;
    	}
     	else{
    	//alert(prices+"---"+price);
    	  var item = {
    		id:id,
    		price:price,
    		count:count,
    		code:code,
    		type:2,
    		substockid:substockid
    	  };
    	  array.push(item);
    	}
    }
    var param = JSON.stringify(array);
    $.messager.progress({text : "正在处理，请稍候..."});
    $.ajax({
		type:"POST",
		url:"unitstock/getstoresubstockprice.do",
		data:{jsonobj:param},
		dataType:"json",
		success:function(data){
			$.messager.progress("close");//隐藏加载
			if(data.fstate==1){
				$.messager.confirm("确定","您所修改的商品中包含正在销售的商品，且所修改的价格为0，确定要修改吗？", function(r){
					if(r){
						$.messager.progress({text : "正在处理，请稍候..."});
						$.ajax({
					   	    type:'post',
					        url: 'unitstock/saveStockNewPrice.do',
					        data:{jsonobj:param,'storeTypeLink':storeTypeLink},
					        success:function(result){
					        	$.messager.progress("close");//隐藏加载
					        	var preHref=document.referrer;
					        	var pageNo = requestParam(preHref,"pageNo");
					        	pageNo=parseInt(pageNo);
						       	 if(result){
						       		if("${storeTypeLink==5}"=="true"){ 
						       		  window.location.href ="unitstock/page.do"; 
						       		}else if("${storeTypeLink==4}"=="true"){
						       		  window.location.href ="unitstock/propstock.do";
						       		}else if("${storeTypeLink==3}"=="true"){
						       		  window.location.href ="unitstock/tradestock.do?storeTypeLink=3";
						       		}else if("${storeTypeLink==0}"=="true"){
						       		  window.location.href="unitstock/enterprisestock.do?storeTypeLink=0";
						       		}else if("${storeTypeLink==6}"=="true"){
						       		  window.location.href ="unitstock/pagelong.do?storeTypeLink=6";
						       		}else if("${storeTypeLink==7}"=="true"){
						       		  window.location.href ="unitstock/pagePCStock.do?storeTypeLink=7";
						       		}
						       		
						       	 }else{
						       		$.messager.alert("提示","保存失败！！！","error"); 
						       	 }
					   	    }
					   	});
					}
					 
				})
			}else{
				$.messager.progress({text : "正在处理，请稍候..."});
			 $.ajax({
			   	    type:'post',
			        url: 'unitstock/saveStockNewPrice.do',
			        data:{jsonobj:param,'storeTypeLink':storeTypeLink},
			        success:function(result){
			        	$.messager.progress("close");//隐藏加载
			        	var preHref=document.referrer;
			        	var pageNo = requestParam(preHref,"pageNo");
			        	pageNo=parseInt(pageNo);
				       	 if(result){
				       		if("${storeTypeLink==5}"=="true"){ 
				       		  window.location.href ="unitstock/page.do"; 
				       		}else if("${storeTypeLink==4}"=="true"){
				       		  window.location.href ="unitstock/propstock.do";
				       		}else if("${storeTypeLink==3}"=="true"){
				       		  window.location.href ="unitstock/tradestock.do?storeTypeLink=3";
				       		}else if("${storeTypeLink==0}"=="true"){
				       		  window.location.href="unitstock/enterprisestock.do?storeTypeLink=0";
				       		}else if("${storeTypeLink==6}"=="true"){
				       		  window.location.href ="unitstock/pagelong.do?storeTypeLink=6";
				       		}else if("${storeTypeLink==7}"=="true"){
				       		  window.location.href ="unitstock/pagePCStock.do?storeTypeLink=7";
				       		}
				       		
				       	 }else{
				       		$.messager.alert("提示","保存失败！！！","error"); 
				       	 }
			   	    }
			   	});
			}
		},error:function(){
			$.messager.progress("close");//隐藏加载
			$.messager.alert("提示","系统错误！","error"); 
		}
    });
}
//统一折扣点击事件
function commprice(){
	var discountprice=$("#stockcommprice").numberbox("getValue");
	var stockdiscount=$("#stockdiscount").numberbox("getValue");
	if(discountprice!=""){
		$("#stockdiscount").numberbox('readonly',true);
		$("input",$("#stockdiscount").next("span")).addClass('disable_input');
	}else{
		$("#stockdiscount").numberbox('readonly',false);
		$("input",$("#stockdiscount").next("span")).removeClass('disable_input');
	}
}
//统一价格点击事件
function discount(){
	var discountprice=$("#stockcommprice").numberbox("getValue");
	var stockdiscount=$("#stockdiscount").numberbox("getValue");
	if(stockdiscount!=""){
		$("#stockcommprice").numberbox('readonly',true);
		$("input",$("#stockcommprice").next("span")).addClass('disable_input');
	}else{
		$("#stockcommprice").numberbox('readonly',false);
		$("input",$("#stockcommprice").next("span")).removeClass('disable_input');
	}
// 	var discountprice=$("#stockcommprice").val();
// 	if(discountprice!=""){
// 		document.getElementById('stockdiscount').disabled = true;
// 	}else{
// 		document.getElementById('stockcommprice').disabled = false;
// 	}
}

   
   /**获取url地址上面的参数**/  
   function requestParam(url,argname){
       var arrStr = url.substring(url.indexOf("?")+1).split("&");
       for(var i =0;i<arrStr.length;i++){
           var loc = arrStr[i].indexOf(argname+"="); 
           if(loc!=-1){
               return arrStr[i].replace(argname+"=","").replace("?","");
               break;
           }           
       }
       return "";
   }
 $(function(){
	 $(".fsyncstock").each(function(){
		  var fsyncstock=$(this).val();
		  var flinked=$(this).attr("flinked");
		  var id=$(this).attr("id");
		  if(fsyncstock==1 && flinked==0){
			  $("#stockcount").numberbox({
					prompt:"已启用库存同步"
				});
			  $("#stockcount").numberbox("readonly",true);
				$("#count_"+id).numberbox("readonly",true);
			}
	  });
	 //统一价格点击，判断统一折扣有没有值，有---禁用
	 $("input",$("#stockcommprice").next("span")).click(function(){
		/* if($(this).attr("readonly")=="readonly"){
			 return;
		 }*/
		 discount();
		 
	 })
	 $("input",$("#stockdiscount").next("span")).click(function(){
		 /*if($(this).attr("readonly")=="readonly"){
			 return;
		 }*/
		 commprice();
	 })
 })