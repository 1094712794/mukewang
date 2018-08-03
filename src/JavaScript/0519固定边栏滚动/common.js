/**
 * 第一种：JavaScript实现
 */
window.onload = function() {
	var rFixedScoll = document.getElementById('rightFixedScroll');

	/**跨浏览器事件处理
	 * 参数1:元素对象名字
	 * 参数2:绑定事件
	 * 参数3:触发的回调函数
	 */
	var addEvent = function(element, type, handler) {
		if (element.addEventListener) { //DOM 二级(非 IE 浏览器) 绑定两个以上的事件均可拿到(alert(1) alert(2)两个均可拿到)
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) { //低版本浏览器(IE9以下)
			element.attachEvent('on' + type, handler);
		} else { //DOM 零级 绑定两个以上的事件只可拿到最后一个事件(alert(1) alert(2)只拿到alert(2))
			element['on' + type] = handler; //element.onclick === element['onclick']
		}
	};

	addEvent(window, 'scroll', function() {
		scrollEvent();
	});

	addEvent(window, 'resize', function() { //缩放浏览器窗口
		scrollEvent();
	});

	function scrollEvent() {
		var sideHeight = rFixedScoll.offsetHeight, // 获取边栏高度
			screenHeight = document.documentElement.clientHeight || document.body.clientHeight, // 屏幕可见高度
			scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; // 滚动高度

		if ((scrollHeight + screenHeight) > sideHeight) { // 设置 fixed 判断条件：滚动高度 + 屏幕高度 > 边栏高度
			// cssText:为css设置多个样式值; top = 获取边栏高度 - 屏幕可见高度
			rFixedScoll.style.cssText = 'position:fixed;right:0px;top:' + (-(sideHeight - screenHeight)) + 'px';
		} else {
			rFixedScoll.style.position = 'static';
		}
	}
}

/**
 * 第二种：jquery实现
 */
var jWindow = $(window);
jWindow.scroll(function() {
	var scrollHeight = jWindow.scrollTop(), // 窗口滚动的距离(高度)
		screenHeight = jWindow.height(), // 屏幕可见区域高度
		sideHeight = $('#rightFixedScroll').height(); // 右侧边栏高度

	if ((scrollHeight + screenHeight) > sideHeight) { // 设置 fixed 判断条件：滚动高度 + 屏幕高度 > 边栏高度
		$('#rightFixedScroll').css({
			'position': 'fixed',
			'top': -(sideHeight - screenHeight),
			'right': 0,
		});
	} else {
		$('#rightFixedScroll').css({
			'position': 'static'
		});
	}
});

$(document).ready(function() {
	jWindow.trigger('scroll'); //缩放浏览器窗口
});

jWindow.resize(function() {
	jWindow.trigger('scroll'); //缩放浏览器窗口
});