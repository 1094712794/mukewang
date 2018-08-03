window.onload = function() { //页面加载完毕后触发
	var zoomImage = getDom('zoomImage'),
		maxWidth = zoomImage.offsetWidth * 2, //放大宽度的极限值
		minWidth = zoomImage.offsetWidth * 0.3; //缩小宽度极限值

	/**跨浏览器事件处理
	 * 参数1:元素id
	 * 参数2:绑定类型事件(click keyUp keyDown)
	 * 参数3:响应的回调函数
	 */
	var addEvent = function(id, type, handler) {
		var element = getDom(id) || document;
		if (element.addEventListener) { //DOM 二级(非 IE 浏览器) 绑定两个以上的事件均可拿到(alert(1) alert(2)两个均可拿到)
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) { //低版本浏览器(IE9以下)
			element.attachEvent('on' + type, handler);
		} else { //DOM 零级 绑定两个以上的事件只可拿到最后一个事件(alert(1) alert(2)只拿到alert(2))
			element['on' + type] = handler; //element.onclick === element['onclick']
		}
	};

	addEvent('enlarge', 'click', function() { //放大
		var endWidth = zoomImage.offsetWidth * 1.3; //每次点击后的宽度

		var maxTimer = setInterval(function() {
			if (zoomImage.offsetWidth < endWidth) {
				if (zoomImage.offsetWidth < maxWidth) {
					zoomImage.style.width = zoomImage.offsetWidth * 1.05 + 'px';
					zoomImage.style.height = zoomImage.offsetHeight * 1.05 + 'px';
				} else {
					alert('已经是最大值了');
					clearInterval(maxTimer);
				}
			} else {
				clearInterval(maxTimer)
			}
		}, 20)
	});

	addEvent('narrow', 'click', function() { //缩小
		var endWidth = zoomImage.offsetWidth * 0.7;

		var minTimer = setInterval(function() {
			if (zoomImage.offsetWidth > endWidth) {
				if (zoomImage.offsetWidth > minWidth) {
					zoomImage.style.width = zoomImage.offsetWidth * 0.95 + 'px';
					zoomImage.style.height = zoomImage.offsetHeight * 0.95 + 'px';
				} else {
					alert('已经是最小值了！')
					clearInterval(minTimer);
				}
			} else {
				clearInterval(minTimer);
			}
		}, 20);
	});

	function getDom(id) {
		return document.getElementById(id);
	}
}