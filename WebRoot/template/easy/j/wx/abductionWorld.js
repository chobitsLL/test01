

/******************************************验证诱导分享和诱导关注关键字-开始****************************************************/
/**
验证是否包含 非法的关键字
<br/> var testInfo = [{enName:"fname",chName:"活动名称"},{enName:"FHint",chName:"活动说明"},{enName:"fsharetitle",chName:"分享标题"},{enName:"fsharedescription",chName:"分享描述"},{enName:"fkeyword",chName:"关键字"}{enName:"FWishing",chName:"祝福语"},];
<br/> var testData = {FName:"关注",FWishing:"祝您节日愉快，快到朋友圈",FHint:"请您分享先公众号"};
<br/> 如果包含关键字 则返回错误信息  如果不包含关键字则返回 true
**/

function validationAllField(data,info){
	//根据info中的信息 检查data中的值是否包含涉嫌诱导的关键字
	for (var i = 0; i < info.length; i++) {
		var result = validationKeyWords(info[i].chName,data[info[i].enName]);
		if(result!=true){ //data["FWishing"]
			return result;
		}
	}
	return true;
}

/**
验证是否包含 非法的关键字
<br/> 如果包含关键字 则返回错误信息  如果不包含关键字则返回 true
**/
function validationKeyWords(chName,value){
	var keys = ["分享","关注","朋友圈","拆礼盒","拆盒子","拆礼包"];
	for (var i = 0; i < keys.length; i++) {
		if(value.indexOf(keys[i])!=-1){
			return "【"+chName+"】中包含诱导的关键字【"+keys[i]+"】请重新填写！";
		}
	}
	return true;	
}

//测试方法
//var testData = {FWishing:"祝您节日愉快，快到朋友圈",FHint:"请您分享先公众号"};
//var testInfo = [{enName:"FWishing",chName:"祝福语"},{enName:"FHint",chName:"活动说明"}];
//var vResult = validationAllField(testData,testInfo);
//console.log(vResult);

/******************************************验证诱导分享和诱导关注关键字-结束****************************************************/
