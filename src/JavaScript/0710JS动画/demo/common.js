/**
 * 第一种：JavaScript实现
 */
window.onload = function() {
	var an = document.getElementsByClassName('move')[0],
		ali = an.getElementsByTagName('a');
	for (var i = 0; i < ali.length; i++) {
		ali[i].timer = null;
		ali[i].onmouseover = function() {
			// width 、 height 或者 opacity
			var _this = this.getElementsByTagName('i')[0];
			move(_this,{top:-16,opacity:0},function(){
				_this.style.top=21+'px';
				move(_this,{top:11,opacity:100});
			});
		}
		ali[i].onmouseout = function() {
			var _this = this.getElementsByTagName('i')[0];
			move(_this,{top:11,opacity:100});
		}
	}
}

function move(obj, json, fn) {
	var flag=true;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		for(var attr in json){
			var icur = 0;
			icur = (attr == 'opacity') ? (Math.round(parseFloat(getStyle(obj, attr)) * 100)) : (parseInt(getStyle(obj, attr)));

			var speed = (json[attr] - icur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (icur == json[attr]) { //检测停止
				clearInterval(obj.timer);
				if (fn) {
					fn(); //回调函数
				}
			}else{
				obj.style[attr] = (attr == 'opacity') ? ((icur + speed) / 100) : (icur + speed + 'px');
			}
		}
	}, 30);
}
/**
 * 获取外部样式（解决 border:4px solid #000; 的问题）
 */
function getStyle(obj, attr) {
	if (obj.currentStyle) { // currentStyle:IE浏览器
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr]; //火狐谷歌
	}
}

/**
 * 第二种：jquery实现
 */
// $(function(){
// 	$('.move').on('mouseenter','a',function(){
// 		$(this).find('i').animate({top:'-16px',opacity:'0'},400,function(){
// 			$(this).css({top:'21px'});
// 			$(this).animate({top:'11px',opacity:'1'},300);
// 		});
// 	});
// });