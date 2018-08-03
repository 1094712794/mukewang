window.onload = function() { //页面加载完毕后触发
	var scrollTop = document.getElementById('scrollTop'),
		timer = null, //定时器
		isTop = true, //解决滚动中向下滚动
		clientHeight = document.documentElement.clientHeight; //获取页面可视区域高度

	window.onscroll = function() { //滚动条滚动时触发
		var osTop = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条距离顶部的距离

		if (osTop >= clientHeight) {
			scrollTop.style.display = 'block';
		} else {
			scrollTop.style.display = 'none';
		}

		if (!isTop) {
			clearInterval(timer);
		}
		isTop = false;
	}

	scrollTop.onclick = function() {
		timer = setInterval(function() {
			var osTop = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条距离顶部的距离

			//Math.floor(-osTop/5)：滚动速度，Math.floor小数点向下四舍五入，-osTop解决滚动条滚动的距离(实际滚到顶部不为0)
			document.documentElement.scrollTop = document.body.scrollTop = osTop + Math.floor(-osTop / 5);

			isTop = true;

			if (osTop == 0) {
				clearInterval(timer);
			}
		}, 20);
	}
}