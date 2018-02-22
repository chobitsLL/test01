var GUnit = {};

GUnit.getGdate = function (date) {
	var y = date.getFullYear();  
    var m = date.getMonth()+1;  
    var d = date.getDate();  
    var h = date.getHours();  
    var min = date.getMinutes();  
    var sec = date.getSeconds();  
    var str = y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d)+' '+(h<10?('0'+h):h)+':'+(min<10?('0'+min):min)+':'+(sec<10?('0'+sec):sec);  
    return str;
}

$.fn.extend({
	test : function (){
		alert($(this).val());
	}
})


function f1() {

	var n = 999;

	nAdd = function() {
		n += 1
	}

	function f2() {
		alert(n);
	}

	return f2;

}
var result=f1();