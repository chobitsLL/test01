(function($){  
	$.fn.emName={1:"微笑",2:"撇嘴",3:"色",4:"发呆",5:"得意",6:"流泪",7:"害羞",8:"闭嘴",9:"睡",10:"大哭",
				 11:"尴尬",12:"发怒",13:"调皮",14:"呲牙",15:"惊讶",16:"难过",17:"酷",18:"冷汗",19:"抓狂",20:"吐",
				 21:"偷笑",22:"可爱",23:"白眼",24:"傲慢",25:"饥饿",26:"困",27:"惊恐",28:"流汗",29:"憨笑",30:"大兵",
				 31:"奋斗",32:"咒骂",33:"疑问",34:"嘘",35:"晕",36:"折磨",37:"衰",38:"骷髅",39:"敲打",40:"再见",
				 41:"擦汗",42:"抠鼻",43:"鼓掌",44:"糗大了",45:"坏笑",46:"左哼哼",47:"右哼哼",48:"哈欠",49:"鄙视",50:"委屈",
				 51:"快哭了",52:"阴险",53:"亲亲",54:"吓",55:"可怜",56:"菜刀",57:"西瓜",58:"啤酒",59:"篮球",60:"乒乓",
				 61:"咖啡",62:"饭",63:"猪头",64:"玫瑰",65:"凋谢",66:"示爱",67:"爱心",68:"心碎",69:"蛋糕",70:"闪电",
				 71:"炸弹",72:"刀",73:"足球",74:"瓢虫",75:"便便",76:"月亮",77:"太阳",78:"礼物",79:"拥抱",80:"强",
				 81:"弱",82:"握手",83:"胜利",84:"抱拳",85:"勾引",86:"拳头",87:"差劲",88:"爱你",89:"NO",90:"OK",
				 91:"爱情",92:"飞吻",93:"跳跳",94:"发抖",95:"怄火",96:"转圈",97:"磕头",98:"回头",99:"跳绳",100:"回首",
				 101:"激动",102:"街舞",103:"献吻",104:"左太极",105:"右太极"};
	
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'img/face/',
			assign : 'content',
			tip : 'em_'
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		
		if(assign.length<=0){
			alert('');
			return false;
		}
		
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+id).length<=0){
				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=1; i<=105; i++){
					labFace = '['+$.fn.emName[i]+']';
					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % 15 == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$(this).parent().append(strFace);
			var offset = $(this).position();
			var top = offset.top + $(this).outerHeight();
			$('#'+id).css('top',top);
			$('#'+id).css('left',offset.left);
			$('#'+id).show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+id).hide();
			$('#'+id).remove();
		});
	};

})(jQuery);

jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
		//if(!$.browser.msie) return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var textObj = $(this).get(0); 
		if(document.all && textObj.createTextRange && textObj.caretPos){ 
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue; 
		} else if(textObj.setSelectionRange){ 
			var rangeStart=textObj.selectionStart; 
			var rangeEnd=textObj.selectionEnd; 
			var tempStr1=textObj.value.substring(0,rangeStart); 
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
			textObj.focus(); 
			var len=textFeildValue.length; 
			textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
			textObj.blur(); 
		}else{ 
			textObj.value+=textFeildValue; 
		} 
	} 
});