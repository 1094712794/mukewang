window.onload = function() {
	document.getElementById('loginBtn').onclick = function() {
		createDialog();
		/**
		 * 拖拽
		 */
		document.getElementById('loginHeader').onmousedown = function(event) { // 在用户按下任意鼠标按钮(左键/右键)时触发
			loginDialog(event);
		}
	}
}
/**
 * 创建 login(登录框) 并居中
 */
function createDialog() {
	// 获取页面的宽度和高度
	var sWidth = document.documentElement.scrollWidth,
		sHeight = document.documentElement.scrollHeight;

	// 获取可视区域的宽度和高度(如果说页面是一个竖向页面，那么可视区域的宽度和页面宽度是一样的)
	var winWidth = document.documentElement.clientWidth,
		winHeight = document.documentElement.clientHeight;

	var lBox = document.createElement('div'); // 创建遮挡层 loginBox
	lBox.id = 'loginBox';
	lBox.style.width = sWidth + 'px';
	lBox.style.height = sHeight + 'px';
	document.body.appendChild(lBox); // 向文档中插入节点

	var lWrapper = document.createElement('div'); // 创建登录框
	lWrapper.id = 'loginWrapper';
	lWrapper.innerHTML = '<div id="loginHeader">登录[可拖拽登录框]</div>' +
		'<div id="loginClose">X</div>' +
		'<div>内容</div>';
	lBox.appendChild(lWrapper); // 向文档中插入节点

	// 获取元素(loginWrapper)本身的宽度和高度
	var dWidth = lWrapper.offsetWidth,
		dHeight = lWrapper.offsetHeight;

	// 给元素(loginWrapper)的left和top赋值；登录框居中( 宽度=(可视区域宽度-登录框宽度)/2  高度=(可视区域高度-登录框高度)/2 ) 
	lWrapper.style.left = (winWidth - dWidth) / 2 + 'px';
	lWrapper.style.top = (winHeight - dHeight) / 2 + 'px';

	/**
	 * 关闭
	 */
	document.getElementById('loginClose').onclick = function() {
		document.body.removeChild(lBox); //移除创建的节点
	}
}
/**
 * 拖拽 login
 */
function loginDialog(event) {
	event = event || window.event;
	var oWrapper = document.getElementById('loginWrapper');
	/**解决鼠标按下时光标在左上角的bug
	 * 光标按下时光标和面板之间的距离
	 * client:当前窗口(鼠标/光标 坐标)
	 * offset:设置被选元素(box)相对于文档(document)的偏移坐标
	 */
	// 光标按下到盒子(loginWrapper)左边的距离 = 鼠标按下到浏览器(document)左边距离 - 盒子(loginWrapper)到浏览器(document)左边距离
	var disx = event.clientX - oWrapper.offsetLeft;
	// 光标按下到盒子(loginWrapper)上边的距离 = 鼠标按下到浏览器(document)上边距离 - 盒子(loginWrapper)到浏览器(document)上边距离
	var disy = event.clientY - oWrapper.offsetTop;

	document.onmousemove = function(event) { // 当鼠标指针在元素内部移动时重复触发(鼠标每动一下都会触发)
		event = event || window.event;

		// client:当前窗口(鼠标/光标 坐标)
		// 光标在x轴移动距离 = 现在(移动)光标的坐标 - 光标按下到盒子(loginWrapper)左边的距离
		var cliX = event.clientX - disx;
		// 光标在y轴移动距离 = 现在(移动)光标的坐标 - 光标按下到盒子(loginWrapper)上边的距离
		var cliY = event.clientY - disy;
		var winW = document.documentElement.clientWidth || document.body.clientWidth, //获取浏览器窗口宽高
			winH = document.documentElement.clientHeight || document.body.clientHeight;
		// 盒子(loginWrapper)最大宽度(x轴)[盒子可拖动范围] = 浏览器的宽度(x轴) - 盒子(loginWrapper)的宽度
		var maxW = winW - oWrapper.offsetWidth;
		// 盒子(loginWrapper)最大高度(y轴)[盒子可拖动范围] = 浏览器的高度(y轴) - 盒子(loginWrapper)的高度
		var maxH = winH - oWrapper.offsetHeight;

		// 解决盒子(loginWrapper)的x轴和y轴为负数，也就是盒子(loginWrapper)溢出浏览器窗口的bug
		cliX = Math.min(maxW, Math.max(0, cliX));
		cliY = Math.min(maxH, Math.max(0, cliY));

		oWrapper.style.left = cliX + 'px';
		oWrapper.style.top = cliY + 'px';
	}
	document.onmouseup = function() { //当用户释放按钮是触发
		// DOM 零级
		document.onmousemove = null;
		document.onmouseup = null;
	}
}