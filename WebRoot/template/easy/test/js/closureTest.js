$(function(){

	var myDate = new Date();
	$("#cdate").textbox("setValue",GUnit.getGdate(myDate));
	$("#sendPush").click(function (){
		$("#ctext").test();
	})
	
});

function sendPush(){
	result(); // 999
	nAdd();
	result(); // 1000
}


	
	
	