//组合
function zuhe_ar(ar1,ar2){
	var new_ar = new Array();
	for(var i=0;i<ar1.length;i++){
		for(var j=0;j<ar2.length;j++){
			//可能是白，也可能是[白,x]
			var temp = cloneAr(ar1[i]);
			if(temp.value){
				new_ar.push([temp,ar2[j]]); //白的情况
			}else{
				temp.push(ar2[j]);
				new_ar.push(temp);	
			}			 
			
		}
	}
	
	return new_ar;	
}
//单一
function cloneAr(ar){
	var new_ar=[];
	for(var i in ar){
		new_ar[i]=ar[i];
	}
	return new_ar;
}

var SpecOper={
		specProp:{},
		init:function(pageid){
			var self= this;
			this.syncSpecFromTable(pageid);
			this.bindTableEvent(pageid);
			
			/*$("#spec-input"+pageid+" .spec .cartfoot-checkbox").click(function(){
				//alert(self.randTok);
				$(this).toggleClass("jboot-active");
				$(this).find(".chk").toggleClass("spec-active");//刘一男
				
				
				if($(this).find(".chk").attr("checked")=="checked"){
					$(this).find(".chk").removeAttr("checked");
				}else{
					$(this).find(".chk").attr("checked","checked");
				}
				
//				$("#specs-count"+pageid).val(1);
				
			});*/
			var specData = [{"specid":36,"spec":"配置","setlist":[{"fname":"标配","fid":150},{"fname":"低配","fid":151},{"fname":"高配","fid":152}]},
			                {"specid":37,"spec":"颜色","setlist":[{"fname":"红色","fid":150},{"fname":"白色","fid":151},{"fname":"蓝色","fid":152}]},
			                {"specid":38,"spec":"门数","setlist":[{"fname":"一门","fid":150},{"fname":"二门","fid":151},{"fname":"多门","fid":152}]},
			                {"specid":39,"spec":"能效","setlist":[{"fname":"一级","fid":150},{"fname":"二级","fid":151},{"fname":"三级","fid":152}]},
			                {"specid":40,"spec":"容量","setlist":[{"fname":"两升","fid":150},{"fname":"五升","fid":151},{"fname":"七升","fid":152}]}];

			$("#spec-root"+pageid).jbootspec({
				x:-175,
				y:-85,
				data:subDefJson.subDefJson,
				change:function(specs,specnames){
					self.createSpec(pageid,specs,specnames);
				}
			});
			this.syncSpecItem(pageid);
		},
		
		//createSpec:function(pageid){
		createSpec:function(pageid,specs,specnames){
			//alert("方法2-开始");
			var self = this;
			/*var specUl= $("#spec-input"+pageid+" ul");
			var specs=[];
			var specnames=[];
		//	specs.push([]);
			$.each( specUl,function(i,ul){
				//var chks = $(ul).find(".chk:checked");//刘一男
				var chks = $(ul).find(".spec-active");//刘一男
				if(chks.size()>0){
					var valueAr =self.createSpecFromChk(chks); //根据chk生成的规格值数组
					specs.push(valueAr);
					specnames.push($(ul).attr("specname"));
				}
			});*/
//			$("#specs-count"+pageid).attr("newSpecs",specs.length);
//			debug("商品管理-规格大类勾选："+specs.length);

			if(specs.length>1){
				$(".spec_table"+pageid).show();
				var temp =specs[0];
				for(var i=1;i<specs.length;i++){
					temp = zuhe_ar(temp,specs[i]);
				}
				self.createSpecHead(specnames,pageid);
				self.createSpecBody(temp,pageid);	
				self.bindTableEvent(pageid);
			}else{
				$(".spec_table"+pageid).show();
	 			if(specs.length==1){ 
	 			 	var one  = specs[0];
	 				var temp =new Array();
	 				for( tempi in one){
	 					temp[tempi]=[ one[tempi] ];
	 				}
	 				self.createSpecHead(specnames,pageid);
					self.createSpecBody(temp,pageid);	
	 				self.bindTableEvent(pageid);
				}else{//王凯旋
	 				self.createSpecHead(specnames,pageid);
	 				self.createSpecBody("",pageid);
					self.bindTableEvent(pageid);
				}				
			}	
		},

		bindTableEvent:function(pageid){
			//alert("方法1.5--");
			var self = this;
			$(".ipt").unbind("blur").bind("blur",function(){
				var $this= $(this);
				
				var prop = $this.attr("prop");
				var value = $this.val();
				if( ("price"==prop || "snum"== prop || "guidePrice"==prop) && (!SpecOper.isNum(value)) ){
						$.messager.alert("提示","请输入数字！");
						//$this.select();
						return ;
				}else if(value < 0){
					$.messager.alert("提示","此值不能小于0！");
					//$this.select();
					return ;
				}else{				
					var propid = $this.attr("propid");
					if(!self.specProp[propid]){
						self.specProp[propid] =[];
					}
					
					self.specProp[propid][prop]=value;
				}
			});
			$(".spec_table"+pageid+" .delete").unbind('click').bind('click',function(){
				self.deleteProRow($(this));
//					self.deleteProRow($(this),url);
			});		
		},

		isNum:function(num){
			var reg=/^(-?\d*)\.?\d{1,4}$/;
		    return reg.test(num);
		},
		createSpecHead:function(specnames,pageid){
			
			var thead=$(".spec_table"+pageid+" thead tr").empty();

			for(var i=0;i< specnames.length;i++){
				thead.append("<th style='width: 60px;'>"+specnames[i]+"</th>");
			}
			thead.append("<th style='text-align: center;'>外部系统编码*</th>" +
//					"<th>厂家指导价*</th>"+
					"<th>本商城价*</th>"+ //<th>库存*</th>
					"<th>型号</th><th>操作</th>");
			
//			thead.append("<th style='width: 200px;'>货号*</th>");
//			if(shopType!=1){
//				thead.append("<th style='width: 150px;'>厂家指导价*</th>");
//			}
//			thead.append("<th style='width: 150px;'>本商城价*</th><th style='width: 150px;'>库存*</th><th style='width: 150px;'>型号</th>"+
//					"<th style='width: 80px;'>操作</th>");
		},
		
		/**
		 * 生成货品表格
		 * @param specAr  规格数组
		 * @param lvPriceHtml 会员价格页面
		 */
		createSpecBody:function(specAr,pageid){

			var self = this;
			var body=$(".spec_table"+pageid+" tbody");
			body.empty();
			for(var i=0;i< specAr.length;i++){		
				var childAr=specAr[i]; //这是一行				 
				var tr=$("<tr></tr>");
								
				var propid="";
				var specvids="";
				var specids ="";
				
				//for(j in childAr){ //这是一列
				for(var j=0;j< childAr.length;j++){	
					var spec = childAr[j];
					if(propid!="")propid+="_";
					propid+=spec.valueid;				
					tr.append($("<td class='spectd'>"+spec.value+"</td>"));

					if(j!=0){
						specvids+=",";
						specids+=",";
					}
					specvids+=spec.valueid;
					specids +=spec.specid;
					
				}
				var specProp = self.specProp[propid];
				var price =0;
				var snum =0;
				var sn="";
				var productid="";
				var specification="";
//				var guidePrice=0;
				
				if(specProp){
					sn = specProp["sn"];//货号
//					guidePrice=specProp["guidePrice"];//厂家指导价
					price = specProp["price"];//本商城价
					snum=specProp["snum"];//库存
					specification=specProp["specification"];//型号
					productid=specProp["productid"];

					if(!sn)sn="";
//					if(!guidePrice)guidePrice="0";
					if(!price)price ="0";
					if(!snum)snum ="0";	
					if(!specification)specification="";
					if(!productid)productid="";
					
				}
				
				
				var hidden ='<input type="hidden" value="'+specvids+'" name="specvids" prop="specvids">';
					hidden+='<input type="hidden" value="'+specids+'" name="specids" prop="specids">';
				
				var td ='<td class="stockNum"><input type="text" class="ipt" name="sns" value="'+sn+'" autocomplete="off" propid="'+propid+'" prop="sn">';
				td+='<input type="hidden"  name="productids" value="'+productid+'" class="ipt" propid="'+propid+'" prop="productid"></td>';
//				td+="<td class='stockNum'><input class='ipt price' propid='"+propid+"' prop='guidePrice' size='8'  value='"+guidePrice+"' type='text'  name='guidePrice' />";
				td+="<td class='stockNum'>"+hidden+"<input class='ipt price' propid='"+propid+"' prop='price' size='8'  value='"+price+"' type='text'  name='prices' />";
				
				//td+="<td class='stockNum'><input class='ipt snum' propid=='"+propid+"' prop='snum' size='8' value='"+snum+"' type='text'  name='snum'>";
				
				td+="<td class='stockNum'><input class='ipt specification' propid=='"+propid+"' prop='specification' value='"+specification+"' type='text'  name='specification'>";
				
				td+='<td><a  href="javascript:;"><img class="delete" src="img/data_del.png" productid="0"> </a></td>';
				tr.append($(td));
				
				
				body.append(tr);
			}
		},
		
		/**
		 * 根据checkbox生成规格数组
		 */
		createSpecFromChk:function(chks){
			var ar=[];
			$.each(chks,function(i,c){
				var chk=$(c);
				var spec={};
				spec.valueid=parseInt(chk.val());
				spec.specid=parseInt(chk.attr("specid"));
				spec.value=chk.attr("spec_value");
				ar.push(spec);
				
			});
//			debug("商品管理-选择规格："+JSON.stringify(ar));
			return ar;
		},
		
		/**
		 * 由规格表格同步规格
		 * 1.价格、重量等属性至specProp对象
		 * 2.选中checkbox
		 */
		syncSpecItem:function(pageid){
			var values = {};//new Array();
			var exist = {};//已存在的数据
			$(".spec_table"+pageid+" tbody tr").each(function(i,v){
				var tr=$(this);
				var specids=tr.find("input[prop=specids]").val();//规格  获取时的格式 "36,37,38"
				var specvids=tr.find("input[prop=specvids]").val();//规格项 获取时的格式 "150,151,152"
				
				var lstSpecids = specids.split(",");
				var lstSpecvids = specvids.split(",");
				for (var i = 0; i < lstSpecids.length; i++) {
					var defid = lstSpecids[i];
					var setid = lstSpecvids[i];
					if (exist[setid]==true) {
						continue;
					}
					//规格项名称 三个input按顺序对应上面的ID
					var setname = tr.find(".spectd input").eq(i).val();
					if (values[defid] == undefined) {
						values[defid] = new Array();
					}
					//console.log("defid:"+defid+"   fid:"+setid+"   fanme:"+setname);
					values[defid].push({fid:setid,fname:setname});
					exist[setid]=true;//设置为已存在，防止重复添加
				}
			});
			//console.log("values："+JSON.stringify(values));
			$("#spec-root"+pageid).jbootspec("setvalue",values);
		},
		
		/**
		 * 由规格表格同步规格
		 * 1.价格、重量等属性至specProp对象
		 * 2.选中checkbox
		 */
		syncSpecFromTable:function(pageid){
			var self = this;
			$(".spec_table"+pageid+" tbody tr").each(function(i,v){
				var tr=$(this);
				var inputs=tr.find(".ipt");
				var propid =inputs.attr("propid");
				self.specProp[propid]=[];
				//同步各个属性
				inputs.each(function(){
					$this= $(this);
					var propname= $this.attr("prop");//
					self.specProp[propid][propname]=$this.val();
					 
				});
				//同步规格复选框 
				var propidAr  = propid.split("_");
//				var spec_input = $("#spec-input"+pageid);
				for(var i=0;i< propidAr.length;i++){
					
					$("input[value="+propidAr[i]+"]").each(function(){
						//alert("--"+JSON.stringify(self));
						var input = $(this).attr("class");
						
						if(input!=undefined && input.indexOf("chk")>=0){
							if($(this).parent().attr("class").indexOf("jboot-active")==-1){
								$(this).parent().toggleClass("jboot-active");
							}
							if($(this).attr("class").indexOf("spec-active")==-1){
								$(this).toggleClass("spec-active");
							}
						}
					});
//						if($("input[value="+propidAr[i]+"]").parent().attr("class").indexOf("jboot-active")==-1){
//							$("input[value="+propidAr[i]+"]").parent().toggleClass("jboot-active");
//						}
//						if($("input[value="+propidAr[i]+"]").attr("class").indexOf("spec-active")==-1){
//							$("input[value="+propidAr[i]+"]").toggleClass("spec-active");
//						}
//						$("input[value="+propidAr[i]+"]",spec_input).attr("checked",true);
				}
			});
		},

		/**
		 * 删除一行规格
		 */
		
		deleteProRow:function(link){
			$.messager.confirm("确定","您确定要执行该操作吗？",function(r){
			if(r){
				var productid = link.attr("productid");
				if("0"!=productid && "0"!=productid){
					var url = "stock/delSpec.do?impl_class=stockService";
					$.ajax({
						url: url + "&subid="+productid,
						type : 'post', 
						dataType : 'json', 
						data : "", 
						async : false,
						success:function(json){
							if(json.result==1){
								$.messager.alert("提示",json.msg);
								clear(link);
								link.parents("tr").remove();
								var id = $("#FID").val();;
								$.ajax({
									type:'POST',
								url:'unitstock/getOTSpec.do?stockID='+id,
									dataType:'html',
									async : false,
									success:function(data){
										var div=$("#stock-spec");
										div.empty();
										div.html(data);
										var newpageid = $(".specdiv").attr("pageid");
										SpecOper.specProp={};
										SpecOper.init(newpageid);
									}
								});
								
							}else if(json.result==2){
								$.messager.alert("提示",json.msg);
							}else if(json.result==3){
								$.messager.alert("提示",json.msg);
							}
						},
						error:function(){
							$.messager.alert("提示","系统错误");
						}
					});
				}else{
					clear(link);
					link.parents("tr").remove();
				}
			}
						
			});
		}	
		
		
};

function saveSubStock(pageid){
	var btn=$("#goodsinput");
    btn.attr("disabled", "true");
	var arr = [];
	$(".spec_table"+pageid).find("tbody").find("tr").each(function(index){
		var params = {};
		var subRow = {};
		$(this).find(".stockNum").find("input").each(function(){
			subRow[$(this).attr("prop")] = $(this).val();
			params = JSON.stringify(subRow);
		});
		arr.push(params);
	});
	var data = "[" +arr.toString()+ "]";
	var id =  $(".spec_table"+pageid).find("input").eq(0).attr("stockid");
	var name =  $(".spec_table"+pageid).find("input").eq(0).attr("stockName");
	var url = "unitstock/saveSpec.do?";
	var lstSpecs = $("#spec-root"+pageid).jbootspec("getvalue");
	var jsonobj = {
			FStockClassID : $("#stockclassid").val(),
			lstSubStocks : data,
			lstSpecs : lstSpecs
	};
	$.messager.progress({text : "正在处理，请稍候..."});
	$.ajax({
		url : url + "stockid="+id +"&stockname=" + name, 
		type : 'post', 
		dataType : 'json', 
		 async : true,
		data : {jsonobj : JSON.stringify(jsonobj)}, 
		success : function(json) {
			$.messager.progress("close");//隐藏加载
			if (json.result) {
				
				btn.removeAttr("disabled");
				$.messager.alert("提示",json.msg);
				/*
				 * 保存后不刷新页面 刘一男 2016-8-5 20:58:01*/
				/*$.ajax({
					type:'POST',
					url:'unitstock/getOTSpec.do?stockID='+id,
					dataType:'html',
					 async : false,
					 success:function(data){
						 $.messager.progress("close");//隐藏加载
						var div=$("#stock-spec");
						div.empty();
						div.html(data);
						var newpageid = $(".specdiv").attr("pageid");
						SpecOper.specProp={};
						SpecOper.init(newpageid);
					}
				});*/
				
			} else {
				btn.removeAttr("disabled");
				$.messager.alert("提示",json.msg);
			}
		}
	});
};

function clear(obj){
	obj.parents("tr").find(".spectd").each(function(){
		var flag = true;
		var $this = $(this);
		var oldname = $this.find("input").val();
		if(oldname==undefined){
			oldname = $this.text();
		}
		$(".spectd").each(function(){
			if(!($this.is($(this)))){
				var name = $(this).find("input").val();
				if(name==undefined){
					 name = $(this).text();
				}
				if(name==oldname){
					flag = false;
				}else{
					
				}
			}
		});
		//不匹配 --不存在
		if(flag==true){
			$(".cartfoot-checkbox").each(function(){
				var sname = $(this).find("input").attr("spec_value");
				if(sname==oldname){
					$(this).toggleClass("jboot-active");
					$(this).find("input").toggleClass("spec-active");
				}
			});
		}
	});
}
