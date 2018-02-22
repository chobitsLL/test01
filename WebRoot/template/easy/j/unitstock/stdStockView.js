//查询参数数据
//{id:"标签的ID",
//name:"作为参数的参数名  【例如： &stockMarkID=1,2】 ",
//type:"组件类型 【text:纯文本; chack:复选框  select:下拉选择; date:日期; combo:弹出选择; value:固定值(需要增加value:"值")】"
//value:"固定值，当type='value'时取此值"
//ismerge:"是否将参数合并至一个map中"  只在跳转页面方式中生效}
var paramArray =[{id:"#fname",name:"name",type:"text"},
			  	   {id:"#fmarkID",name:"markIDs",type:"combo"},
			  	   {id:"#stockFstockclass",name:"stockClassIDs",type:"combo"}];
//默认的表格列数据和菜单ID
window.menuid = 420;//菜单ID
$(function(){
	var width = window.innerWidth;//窗口宽度 1600
	var bodyWidth = width-100-17;//减去两边边距宽度减滚动条 1600-115=1485
	var itemWidth = 210;//图片宽度
	var itemCount = parseInt(bodyWidth / itemWidth);//一行最多显示几个图片 1485/180=8.25
	var itemSumWidth = bodyWidth / itemCount; //item带间距1485/8=185
	var margin = (itemSumWidth - itemWidth) / 2; //185-18=5
	var itemHeight = itemWidth + 80;//90是名称和价格的高度
	
	if (itemWidth==""||itemHeight==""){
		itemWidth = 120;
		itemHeight = 260;
		margin = 10;
	}
	var css = "<style>.goodsitem{width:"+itemWidth+"px; height:"+itemHeight+"px; float: left; margin: 0px "+margin+"px; margin-top: 5px; border: 2px solid #eee;}</style>";
	$("html").append(css); 
	//---------------------------查询框--------------------------------
	//类别
	$('#stockFstockclass').jeasycombo({
		multiple : true,//是否多选
		type : "tree",//弹出的样式
		url : "select/stockClass.do?t=2",
		label:"类别:",
		labelWidth:80,
		width:200,
		dlgwidth:350
	}) 
	//品牌
		$('#fmarkID').jeasycombo({
			multiple : true,//是否多选
			type : "list",//弹出的样式
			iconCls:"btn-success",//自定义按钮样式
			url : "select/mark.do",
			label:"品牌:",
			labelWidth:80,
			width:200,
			isinline:false,//是否每行一个选项
			linenum:4,//当每行多个选项时，每一行选项的个数
		})
		//初始化表格
		$("#easy_table").datagrid({
			bodyCls:"easy-grid",
			toolbar:"#easy-tool",
			fit:true,
			singleSelect : true,
			selectOnCheck : false,
			checkOnSelect : false,
			pagination : true,
			pageList : [10,20,50,100,200], //可以设置每页记录条数的列表
	        pageSize : 50, //每页显示的记录条数，默认为5,
	        onLoadSuccess:function(data){
	        	
	        	ajaxPageSuccess(data);
	        }
		});
	//初始化列编辑组件
	$("#column_filter").jeasycolumn({
		datagrid : "#easy_table",
		defaultColumns : window.defaultColumns,
		 button_role : $("#menu_ffunction").val(),
		 button:[
			//<c:if test="${sessionScope.is_b_a_unit==true}"> 
			//此处有用，不能删除    
		    {text:"全选",iconCls:"icon-ok", nocheck:true, onclick:function(ids,rows){
				$("[type='checkbox']").prop('checked',true);
			}},{text:"全不选",iconCls:"icon-clear", nocheck:true, onclick:function(ids,rows){
				$("[type='checkbox']").prop('checked',false);
			}},{text:"反选",iconCls:"icon-edit", nocheck:true, onclick:function(id,ids){
				$("[type='checkbox']").each(function(){
					if($(this).prop('checked')){
						$(this).prop('checked',false);
					}else{
						$(this).prop('checked',true);
					}
				})		
			}},{text:"下载",iconCls:"icon-tip", nocheck:true, onclick:function(id,ids){			
				upstock();				
			}}				
			//</c:if>
	    ]
	})
	$("#hide-dialog").dialog({
		footer:"<button class='btn btn-primary' aria-hidden='true' data-dismiss='modal' onclick='closeHidedialog()'>确定</button>"
	});
	$("#btnSearch").bind("click", function(){
		var markids = $("#fmarkID").jeasycombo("getvalue").ids;
		var stockclassids = $("#stockFstockclass").jeasycombo("getvalue").ids;
		if (markids==""&&stockclassids=="") {
			$.messager.alert("提示","由于中央商品库的商品较多，所以“品牌和商品类别”必须选择一项！","info");
			return false;
		}
		//查询前先组织查询条件
		$("#easy_table").datagrid("options").queryParams = Util.initParam(paramArray);
		$("#easy_table").datagrid("load","unitstock/queryStdStockNew.do");
    });
	$("#btnReset").bind("click",function(){
		Util.resetParam(paramArray);
	});
	function ajaxPageSuccess(data){
// 		console.log(data);
// 		if(!data.result){
// 			//alert("登录超时，请重新登录后再操作！");
// 			window.location.href = "user/getLoginAD.do";
// 			return false;
// 		}
		$(".datagrid-body").empty();
		var html = "";
		var img = $(".s-cover").attr("path");
		 $(data.rows).each(function(){
			 var str="";
			 if(this.unitname!=""){
				 str="<div style='width:150px;display: inline-flex;margin-left:5px;'>"+
				 "【<span style='color:red;overflow:hidden;white-space:nowrap;width:90px; display:block;' title='"+this.unitname+"'>"+
				 this.unitname+"</span>】提供</div>";
			 }else{
				 str="<div style='width:150px;display: inline-flex;margin-left:5px;'>"+
				 "【<span style='color:red;overflow:hidden;white-space:nowrap;width:90px; display:block;' title='大有时代'>大有时代</span>】提供</div>";
			 }
			 
			 
			 html="<div class='goodsitem'>"+
				  "<div class='goodsimg checkbox-std' style='cursor: pointer;'>"+
				  "<input type='checkbox' fid="+this.fid+" style='vertical-align:top'/>"+
				  "<img class='dayo-img-middle' src='"+img+this.fcover+"'>"+
				  "</div>"+
				  "<div class='goodsname'>"+
				  "<a href='elecShelf/getStdStockByID.do?stockid="+this.fid+"&optscom=false' target='_Blank'>"+
				  "<span>"+this.fname+"</span></a>"+
				  "<span></span>"+
				  "</div>"+str+
			 	  "</div>"; 
			 $(".datagrid-body").append(html);
		 })
		/*  $(".checkbox-std").click(function(){
			 $(this).toggleClass("jboot-active");
		}); */
	}
})
function closeHidedialog(){
	$("#hide-dialog").dialog('close');
}
function upstock(){
		var ids = $("[type='checkbox']:checked").map(function(){
			return $(this).attr("fid");
		}).get().join(",");
		
		if(ids==""||ids==undefined){
			$.messager.alert("提示","请选择下载项","info");
			return false;
		}
		$.messager.confirm("确定","您确定要下载选中的商品吗？",function(r){
			if(r){
				$.messager.progress({text : "正在处理，请稍候..."});
				$.ajax({
					  type:"POST",
					  url:"unitstock/downloadStdStock.do?ids="+ids,
				      dataType:"json",
				      success:function(data){
				    	  $.messager.progress('close');
				    	  if(data.msg==2){
				    		  var trs = ""
				                	for (var i = 0; i < data.reslist.length; i++) {
				        				trs +="<tr><td>"+data.reslist[i].res+"</td></tr>"
				        			}
				                	var body='<table class="table jboot-table"><thead><tr><th>以下商品已经下载过,不提供重复下载功能</th></thead<tbody>'
				        			     +trs+'</tbody></table>';
				        			     $('#hide-dialog').dialog('clear')
							             $("#hide-dialog").append(body);
							             $("#hide-dialog").dialog("open");
				                }
				    	  else if(data.result==1){
				    		  
				    		  $.messager.alert("提示","下载成功","info");
				    		  $('#easy_table').datagrid('reload');
				    	  }
				    	  else{
				    		  
				    		  $.messager.alert(data.msg,"error");
				    		  return false;
				    	  }
				      },error:function(){
							 }
						
				   }); 
			}
			   	  
		 }); 
	} 