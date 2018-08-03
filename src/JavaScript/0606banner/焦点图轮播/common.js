window.onload = function() {
	var container = getDom('container'),
		list = getDom('list'),
		prev = getDom('prev'),
		next = getDom('next');
	var index = 1, // 存放当前显示第几张图片/小圆点
		animated = false, // 动画状态(解决:不停的点击造成的电脑的卡屯现象)
		timer = null; //定时器

	var cWidth = container.offsetWidth, //box宽度
		listLen = list.getElementsByTagName('img').length; //图片个数
	list.style.width = (cWidth * listLen) + 'px';
	list.style.height = container.offsetHeight + 'px';

	var btnHtml = ''; //动态创建 button 
	for (var b = 0; b < listLen; b++) {
		if (b == 0) {
			btnHtml += '<span index="' + (b + 1) + '" class="on"></span>';
		} else {
			btnHtml += '<span index="' + (b + 1) + '"></span>';
		}
	}
	getDom('buttons').innerHTML = btnHtml;

	var btn = getDom('buttons').getElementsByTagName('span'); //数组

	next.onclick = function() { //下一张
		if (index == 5) {
			index = 1;
		} else {
			index += 1;
		}
		showBtn();
		if (!animated) {
			prevNext(-cWidth);
		}
	}
	prev.onclick = function() { //上一张
		if (index == 1) {
			index = 5;
		} else {
			index -= 1;
		}
		showBtn();
		if (!animated) {
			prevNext(cWidth);
		}
	}

	function prevNext(offset) {
		animated = true;

		const newLeft = parseInt(list.style.left) + offset,
			newWidth = (cWidth * listLen) - cWidth;

		const time = 800, //位移总时间（调整这里的时间即动画的流畅度）
			interval = 10, //位移间隔时间
			speed = offset / (time / interval); //每一次位移量

		go();

		function go() {
			// speed<0 向左/右移动并且left是否大于目标值【动画】
			if (speed < 0 && parseInt(list.style.left) > newLeft || speed > 0 && parseInt(list.style.left) < newLeft) {
				list.style.left = parseInt(list.style.left) + speed + 'px'; //位移量

				setTimeout(go, interval); //这种形式叫做递归
			} else {
				animated = false;
				list.style.left = newLeft + 'px';
				if (newLeft > 0) {
					list.style.left = -newWidth + 'px';
				}
				if (newLeft < -newWidth) {
					list.style.left = 0 + 'px';
				}
			}
		}
	}

	/**
	 * 小圆点点亮
	 */
	function showBtn() {
		for (var i = 0; i < btn.length; i++) {
			if (btn[i].className == 'on') {
				btn[i].className = ''; // 移除class类
				break;
			}
		}
		btn[index - 1].className = 'on'; // 添加class类
	}

	/**
	 * click/mouseover小圆点
	 */
	for (var m = 0; m < btn.length; m++) {
		btn[m].onclick = function() {
			// 解决:如果第一个是打开的状态，在点第一个按钮还会执行 for 里的函数
			if (this.className == 'on') {
				return;
			}
			var myIndex = parseInt(this.getAttribute('index')), // 获取自定义属性或者DOM自带属性
				offset = -cWidth * (myIndex - index); // 偏移量

			prevNext(offset);

			index = myIndex; // index归位

			showBtn();
		}
	}

	/**
	 * 自动播放
	 */
	function autoPlay() {
		timer = setInterval(function() {
			next.onclick();
		}, 3000);
	}
	/**
	 * 停止播放
	 */
	function autoStop() {
		clearInterval(timer);
	}
	autoPlay();
	container.onmouseover = autoStop;
	container.onmouseout = autoPlay;
}

function getDom(id) {
	return document.getElementById(id);
}