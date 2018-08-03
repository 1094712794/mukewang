window.onload = function() { //页面加载完毕后执行
	var objBox = getDom('box'),
		objSmall = getDom('small-box'),
		objMark = getDom('mark'), //解决IE低版本浏览器闪烁问题
		objFloat = getDom('float-box'),
		objBig = getDom('big-box'),
		objBigImage = objBig.getElementsByTagName('img')[0];

	objMark.onmouseover = function() {
		objFloat.style.display = 'block';
		objBig.style.display = 'block';
	}
	objMark.onmouseout = function() {
		objFloat.style.display = 'none';
		objBig.style.display = 'none';
	}
	objMark.onmousemove = function(event) {
		var _event = event || window.event; //解决兼容IE低版本浏览器

		var left = _event.clientX - objBox.offsetLeft - objSmall.offsetLeft - (objFloat.offsetWidth / 2),
			top = _event.clientY - objBox.offsetTop - objSmall.offsetTop - (objFloat.offsetHeight / 2);

		if (left < 0) {
			left = 0;
		} else if (left > (objMark.offsetWidth - objFloat.offsetWidth)) {
			left = objMark.offsetWidth - objFloat.offsetWidth;
		}
		if (top < 0) {
			top = 0;
		} else if (top > (objMark.offsetHeight - objFloat.offsetHeight)) {
			top = objMark.offsetHeight - objFloat.offsetHeight;
		}

		objFloat.style.left = left + 'px';
		objFloat.style.top = top + 'px';

		var percentX = left / (objMark.offsetWidth - objFloat.offsetWidth),
			percentY = top / (objMark.offsetHeight - objFloat.offsetHeight);

		// 放大镜和大图片方向相反的
		objBigImage.style.left = -percentX * (objBigImage.offsetWidth - objBig.offsetWidth) + 'px';
		objBigImage.style.top = -percentY * (objBigImage.offsetHeight - objBig.offsetHeight) + 'px';
	}
}

function getDom(id) {
	return document.getElementById(id);
}