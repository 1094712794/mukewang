/**
 * 速度动画 
 */
window.onload = function() {
	// 速度动画
	var an1 = document.getElementsByClassName('animation1')[0],
		timer1 = null;

	an1.onmouseover = function() {
		shareMove(0);
	}
	an1.onmouseout = function() {
		shareMove(-200);
	}

	function shareMove(moveLeft) {
		clearInterval(timer1);
		timer1 = setInterval(function() {
			var speed = 0;
			speed = (an1.offsetLeft > moveLeft) ? (speed = -10) : (speed = 10);

			if (an1.offsetLeft == moveLeft) {
				clearInterval(timer1);
			} else {
				an1.style.left = an1.offsetLeft + speed + 'px';
			}
		}, 30);
	}
}

/**
 * 透明度动画
 */
window.onload = function() {
    var an2 = document.getElementsByClassName('animation2');
	for (var i = 0; i < an2.length; i++) {
		an2[i].timer2 = null;
		an2[i].alpha = 30;
		an2[i].onmouseover = function() {
			opacityMove(this, 100);
		}
		an2[i].onmouseout = function() {
			opacityMove(this, 30);
		}
	}

	function opacityMove(obj, opacityM) {
		clearInterval(obj.timer2);
		obj.timer2 = setInterval(function() {
			var speed = 0;
			speed = (obj.alpha > opacityM) ? (speed = -10) : (speed = 10);

			if (obj.alpha == opacityM) {
				clearInterval(obj.timer2);
			} else {
				obj.alpha += speed;
				obj.style.opacity = obj.alpha / 100;
			}
		}, 50);
	}
}

/**
 * 缓冲动画
 */
window.onload = function() {
	// 缓冲动画
	var an3 = document.getElementsByClassName('animation3')[0],
		timer3 = null;

	an3.onmouseover = function() {
		bufferMove(0);
	}
	an3.onmouseout = function() {
		bufferMove(-200);
	}

	function bufferMove(moveLeft) {
		clearInterval(timer3);
		timer3 = setInterval(function() {
			var speed = (moveLeft - an3.offsetLeft)/20;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);

			if (an3.offsetLeft == moveLeft) {
				clearInterval(timer3);
			} else {
				an3.style.left = an3.offsetLeft + speed + 'px';
			}
		}, 30);
	}
}

/**
 * 多物体运动
 */
window.onload = function() {
	var an4 = document.getElementsByClassName('animation4')[0],
		ali = an4.getElementsByTagName('li');
	for (var i = 0; i < ali.length; i++) {
		ali[i].timer4 = null;
		ali[i].onmouseover = function() {
			// width 或者 opacity
			multiMove(this, 'width', 400);
		}
		ali[i].onmouseout = function() {
			multiMove(this, 'width', 200);
		}
	}

	function multiMove(obj, attr, iTarget) {
		clearInterval(obj.timer4);
		obj.timer4 = setInterval(function() {
			var icur = 0;
			icur=(attr=='opacity')?(Math.round(parseFloat(getStyle(obj,attr))*100)):(parseInt(getStyle(obj, attr)));

			var	speed = (iTarget - icur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (icur == iTarget) { 
				clearInterval(obj.timer4);
			} else {
				obj.style[attr]=(attr=='opacity')?((icur + speed)/100):(icur + speed + 'px');
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
			return getComputedStyle(obj, false)[attr];//火狐谷歌
		}
	}
}

/**
 * 链式运动：先变宽在变高
 */
window.onload = function() {
	var an5 = document.getElementsByClassName('animation5')[0],
		ali = an5.getElementsByTagName('li');
	for (var i = 0; i < ali.length; i++) {
		ali[i].timer5 = null;
		ali[i].onmouseover = function() {
			// width 、 height 或者 opacity
			var _this=this;
			multiMove(_this, 'width', 400,function(){
				multiMove(_this,'height',300,function(){
					multiMove(_this,'opacity',30);
				})
			});
		}
		ali[i].onmouseout = function() {
			var _this=this;
			multiMove(_this, 'opacity', 100,function(){
				multiMove(_this,'height',200,function(){
					multiMove(_this,'width',200);
				})
			});
		}
	}

	function multiMove(obj, attr, iTarget,fn) {
		clearInterval(obj.timer5);
		obj.timer5 = setInterval(function() {
			var icur = 0;
			icur=(attr=='opacity')?(Math.round(parseFloat(getStyle(obj,attr))*100)):(parseInt(getStyle(obj, attr)));

			var	speed = (iTarget - icur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if (icur == iTarget) { //检测停止
				clearInterval(obj.timer5);
				if(fn){
					fn();//回调函数
				}
			} else {
				obj.style[attr]=(attr=='opacity')?((icur + speed)/100):(icur + speed + 'px');
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
			return getComputedStyle(obj, false)[attr];//火狐谷歌
		}
	}
}

/**
 * 同时运动：宽高同时变化
 */
window.onload = function() {
	var an6 = document.getElementsByClassName('animation6')[0],
		ali = an6.getElementsByTagName('li');
	for (var i = 0; i < ali.length; i++) {
		ali[i].timer6 = null;
		ali[i].onmouseover = function() {
			// width 、 height 或者 opacity
			var _this = this;
			multiMove(_this,{width:201,height:300,opacity:100});
			
		}
		ali[i].onmouseout = function() {
			var _this = this;
			multiMove(_this,{width:200,height:200,opacity:30});
		}
	}

	function multiMove(obj, json, fn) {
		/**
		 * 解决当 width:201 时，height:234 opacity:0.54(实际为:width:201,height:300,opacity:100)的问题
		 * 只有 width 达到了目标值，而其他的属性没有达到目标值，整个运动就停止了
		 */
		var flag=true;
		clearInterval(obj.timer6);
		obj.timer6 = setInterval(function() {
			for(var attr in json){
				var icur = 0;
				icur = (attr == 'opacity') ? (Math.round(parseFloat(getStyle(obj, attr)) * 100)) : (parseInt(getStyle(obj, attr)));

				var speed = (json[attr] - icur) / 8;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (icur != json[attr]) { //检测停止
					flag=false;
				} 
				obj.style[attr] = (attr == 'opacity') ? ((icur + speed) / 100) : (icur + speed + 'px');
			}
			if(flag){
				clearInterval(obj.timer6);
				if (fn) {
					fn(); //回调函数
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
}