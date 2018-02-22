/******导出信息******/
function exportExcel(){
	var params = {};
	//params.jsonobj="{"+arrParams.join(",")+"}";
	params.jsonParam=Util.initParam(paramArray).jsonobj;
	params.sheetTitle = "报名信息";
	params.headers= {'ftitle':'DM单标题','fname':'公众号','ftelno':'员工手机号','ffname':'员工姓名','fwxnickname':'员工微信昵称','fdate':'登记日期',
		'flinkman':'联系人','flinkno':'联系电话','faddress':'送货地址','fmind':'认购意向','fabstract':'备注','fdmsigntitle':'报名标题','fpayed':'支付成功','fpayamount':'实付金额','fbillno':'交易号'};
	params.fileName = "报名信息";
	params.url = 'dmSign/exportExcel_dmSign.do';
	Util.exportExcel(params);
	
}