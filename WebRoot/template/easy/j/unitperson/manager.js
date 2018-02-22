//拼字符串
function getStr(marks){
	var str = "";
	for ( var i = 0; i < marks.length; i++) {
		str += marks[i]["fid"] +",";
	}
	str = str.substr(0,str.length-1);
	return str;
}
/**获取url地址上面的参数**/  
function requestParam(argname){
    var url = location.href;
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
//开店
function openstore(type,id){
	if(id==""|| id==undefined){
		$.jbootmsg("请选择一项！","error");
		return false;
	}
	var flag = isManager(type);
	if(id.indexOf(",")>=0){
		$.jbootmsg("请重新选择，目前只支持单一操作！","error");
		return false;
	}
	if(id!=""){
		var accpeted = $("#"+id).parent().nextAll(".accpeted").attr("fstate");
		if(accpeted!=1){
			$.jbootmsg("当前数据无效,不允许开店！","error");
			return false;
		}
	}
	
	if(flag=="true"){
		window.location.href ="compManagerController/queryCompManager.do?&pageid=200&unituserid="+id+"&type="+type; 
	}
}

//添加
function addcom(type){
	var flag = isManager(type);
	if(flag=="true"){
		if(type==1){//管理员
			window.open("compManagerController/addManager.do?pageid=200&type="+type);
		}else if(type==2){//店长
			window.open("compManagerController/addxiaoer.do?pageid=200&type="+type);
		}else if(type==3){//店小二
			window.open("compManagerController/addxiaoer.do?pageid=200&type="+type);
		}else if(type==5){//联营商
			window.open("compManagerController/addxiaoer.do?pageid=200&type="+type);
		}else if(type==6){//加盟商
			window.open("compManagerController/addxiaoer.do?pageid=200&type="+type);
		}
	}
}




//有效、禁用、删除
//type=1	企业管理员
function operatedmanager(ids,rows,state,type){//第1层
	for (var i = 0; i < rows.length; i++) {
		var accpeted = rows[i].fstate;// {0:"无效",1:"有效",2:"禁用",3:"删除"};
		if(state=="有效"){
			if(accpeted == "3"){
				$.messager.alert('提示','您选择的数据中包含已删除的数据','warning');
				return false;
			}
			if(accpeted =="1"){//有效
				$.messager.alert('提示','您选择的数据中包含已有效的数据','warning');
				return false;
			}
		}else if(state=="禁用"){
			if(accpeted =="2"){//禁用	0//无效
				$.messager.alert('提示','您选择的数据中包含已禁用的数据','warning');
				return false;
			}
			if(accpeted == "0" || accpeted=="3"){
				$.messager.alert('提示','您选择的数据中包含未有效的数据','warning');
				return false;
			}
		}else if(state=="删除"){
			if(accpeted ==3){//删除
				$.messager.alert('提示','您选择的数据中包含已删除的数据','warning');
				return false;
			}
			if(accpeted == "1" || accpeted == "2"){
				$.messager.alert('提示','只能删除无效的数据','warning');
				return false;
			}
		}
	}
	var flag = isManager(type);
	var url = "";
	if(state=="有效"){
		url="compManagerController/operatedmanager.do?pagetype="+type;
	}else if(state=="删除"){
		url="compManagerController/deletemanager.do?pagetype="+type;
	}else if(state=="禁用"){
		url="compManagerController/downManager.do?pagetype="+type;
	}
	if(flag=="true"){//第2层
			$.messager.confirm('温馨提示',"您确定要执行该操作吗？",function(r) {//第4层
				if (r) {//第5层
				$.messager.progress({text : "正在处理，请稍候..."});
					
				$.ajax({//第6层
					type:'post',
					url:url,
				   	dataType : 'json', 
				   	async : false,
				    data : {
				    	ids : ids,
				    	type : state
				    },
					success:function(datas){//第7层 
						$.messager.progress('close');
						var flag = datas.result;
						if(flag==false){
							$.messager.alert('温馨提示',"您没有权限！");
						}else if(flag == "2"){//第8层
							$.messager.alert('温馨提示',"操作成功！");
							//funSearch(type);//第8层
							search();//第8层
							
						}else if(flag == "1"){
							$.messager.alert('温馨提示',"操作失败！");
						}else if(flag == "0"){
							$.messager.alert('温馨提示',"该单位已存在企业店铺，请重新选择");
						}else if(flag == "3"){
							$.messager.alert('温馨提示',"您还未登录，请重新登录！");
							window.location.href = "user/getLoginAD.do";
						}else if(flag == "4"){
							$.messager.alert('温馨提示',"该人员已在其他单位就职，不能有效！");
						}else if(flag == "5"){
							$.messager.alert('温馨提示',"该人员已是会员，暂不支持【员工成为会员】！");
						}
						//第7层下
					},
				    error:function(){
						$.messager.progress('close');
						$.messager.alert('温馨提示','操作失败','warning');
					}
				 });//第6层 
				}//第5层
			 });//第4层
	}//第2层
}//第1层

function isManager(type){
//	$ {sessionScope.is_b_a_unit==true} - 管理员-企业 -false
//	$ {sessionScope.is_b_a_link==true} - 管理员-联销商 -false
//	$ {sessionScope.is_b_a_custom==true} - 管理员-加盟商 -false
//	$ {sessionScope.is_b_m_boss==true} - 店长-企业店 -false
	var flag = false;
	var unit = $("#allow").attr("unit");
	var link = $("#allow").attr("link");
	var custom = $("#allow").attr("custom");
	if(type==5 || type =="5"){
		if(unit == "true" || link == "true"){
			flag = "true";
		}
	}else if(type==6 || type =="6"){
		if(unit == "true" || custom == "true"){
			flag = "true";
		}else{
			flag = "true";
		}
	}else{
		flag = unit;
	}
	if(flag == "true"){
		return "true";
	}else{
		$.messager.alert('温馨提示',"您无此权限！");
		closewindow();
	}
}


