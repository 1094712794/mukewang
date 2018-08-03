window.onload = function() {
	document.onselectstart = new Function('event.returnValue=false;'); // 禁止图片被选中

	// 拖动图片 clip 部分
	$("#clipWrapper").draggable({
		containment: 'parent',
		drag: setChoice,
	});

	var uploadBox = getDom('uploadBox'),
		clipWrapper = getDom('clipWrapper'),
		upCenter = getDom('upCenter'),
		rightCenter = getDom('rightCenter'),
		downCenter = getDom('downCenter'),
		leftCenter = getDom('leftCenter'),
		leftUp = getDom('leftUp'),
		rightUp = getDom('rightUp'),
		rightDown = getDom('rightDown'),
		leftDown = getDom('leftDown'),
		isKeyDown = false, //鼠标按下状态
		contact = ''; //表示被按下的触点

	upCenter.onmousedown = function(e) { //鼠标按下
		e.stopPropagation(); //阻止冒泡
		isKeyDown = true;
		contact = 'up';
	}
	rightCenter.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'right';
	}
	downCenter.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'down';
	}
	leftCenter.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'left';
	}
	leftUp.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'leftUp';
	}
	rightUp.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'rightUp';
	}
	rightDown.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'rightDown';
	}
	leftDown.onmousedown = function(e) {
		e.stopPropagation();
		isKeyDown = true;
		contact = 'leftDown';
	}

	window.onmousemove = function(e) { //鼠标移动
		e.stopPropagation();
		if (isKeyDown == true) {
			switch (contact) {
				case 'up':
					upMove(e);
					break;
				case 'right':
					rightMove(e);
					break;
				case 'down':
					downMove(e);
					break;
				case 'left':
					leftMove(e);
					break;
				case 'leftUp':
					leftMove(e);
					upMove(e);
					break;
				case 'rightUp':
					rightMove(e);
					upMove(e);
					break;
				case 'rightDown':
					rightMove(e);
					downMove(e);
					break;
				case 'leftDown':
					leftMove(e);
					downMove(e);
					break;
				default:
					alert("操作错误！");
					break;
			}
		}
		setChoice(); //设置选取区域高亮可见
		setPreview(); //浏览 clip 图片
	}

	window.onmouseup = function(e) { //鼠标松开
		e.stopPropagation();
		isKeyDown = false;
	}

	/*上边移动*/
	function upMove(e) {
		var y = e.clientY; //鼠标距离屏幕的y坐标
		if (y < getPosition(uploadBox).top) {
			y = getPosition(uploadBox).top;
		}
		var heightBefore = clipWrapper.offsetHeight - 2, //选取框变化前(原来)的高度(clip初始高度)
			addHeight = getPosition(clipWrapper).top - y; //鼠标移动后增加的高度

		clipWrapper.style.height = (heightBefore + addHeight) + 'px';
		clipWrapper.style.top = (clipWrapper.offsetTop - addHeight) + 'px';
	}
	/*右边移动*/
	function rightMove(e) {
		var x = e.clientX; //鼠标距离屏幕的x坐标
		if (x > getPosition(uploadBox).left + uploadBox.offsetWidth) {
			x = getPosition(uploadBox).left + uploadBox.offsetWidth;
		}
		var widthBefore = clipWrapper.offsetWidth - 2, //选取框变化前(原来)的宽度(clip初始宽度)
			addWidth = x - getPosition(clipWrapper).left - widthBefore; //鼠标移动后增加的宽度

		clipWrapper.style.width = (addWidth + widthBefore) + 'px'; //选取框变化后(clip实际宽度)
	}
	/*下移动*/
	function downMove(e) {
		var y = e.clientY; //鼠标距离屏幕的y坐标
		if (y > getPosition(uploadBox).top + uploadBox.offsetHeight) {
			y = getPosition(uploadBox).top + uploadBox.offsetHeight;
		}
		var heightBefore = clipWrapper.offsetHeight - 2, //选取框变化前(原来)的高度(clip初始高度)
			addHeight = y - heightBefore - getPosition(clipWrapper).top; //鼠标移动后增加的高度

		clipWrapper.style.height = (addHeight + heightBefore) + 'px';
	}
	/*左边移动*/
	function leftMove(e) {
		var x = e.clientX; //鼠标距离屏幕的x坐标
		if (x < getPosition(uploadBox).left) {
			x = getPosition(uploadBox).left;
		}
		var widthBefore = clipWrapper.offsetWidth - 2, //选取框变化前(原来)的宽度(clip初始宽度)
			addWidth = getPosition(clipWrapper).left - x; //鼠标移动后增加的宽度

		clipWrapper.style.width = (widthBefore + addWidth) + 'px';
		clipWrapper.style.left = (clipWrapper.offsetLeft - addWidth) + 'px';
	}

	/*设置选取区域高亮可见*/
	function setChoice() {
		var top = clipWrapper.offsetTop,
			right = clipWrapper.offsetLeft + clipWrapper.offsetWidth,
			bottom = clipWrapper.offsetTop + clipWrapper.offsetHeight,
			left = clipWrapper.offsetLeft;
		getDom('clip').style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)';
	}

	/*浏览 clip 图片*/
	function setPreview() {
		var top = clipWrapper.offsetTop,
			right = clipWrapper.offsetLeft + clipWrapper.offsetWidth,
			bottom = clipWrapper.offsetTop + clipWrapper.offsetHeight,
			left = clipWrapper.offsetLeft;

		getDom('previewImage').style.top = (-top) + 'px';
		getDom('previewImage').style.left = (-left) + 'px';
		getDom('previewImage').style.clip = 'rect(' + top + 'px,' + right + 'px,' + bottom + 'px,' + left + 'px)';
	}
}

/*获取元素相对于屏幕左/上边距离(offsetLeft/offsetTop) 【1】获取鼠标在屏幕中的横坐标:event.clientX*/
function getPosition(node) {
	// 【2】获取元素 div 相对于父元素的左边距:div.offsetLeft，鼠标的位置获取用 clientX，元素的位置是用 offsetLeft，获取元素的宽度是 offsetWidth。

	var left = node.offsetLeft, // 相对于父元素的左边距离
		top = node.offsetTop, // 相对于父元素的上边距离
		parent = node.offsetParent; // 获取父元素

	while (parent != null) { // 判断父元素是否存在，循环一直获取元素相对于屏幕左边距离
		left += parent.offsetLeft;
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		'left': left,
		'top': top
	};
}

/* flie上传照片 */
function uploadImage(event) {
	var flies = event.target.files[0],
		uploadShow = getDom('uploadShow'),
		previewImage=getDom('previewImage'),
		clip = getDom('clip');

	var reader = new FileReader(); //读取异步文件(base64编码)，结合input:file读取本地文件

	reader.onload = function(e) {
		uploadShow.src = e.target.result; //读取base64编码图片
		uploadShow.style.width = getDom('uploadBox').offsetWidth; //'auto'
		uploadShow.style.height = getDom('uploadBox').offsetHeight; //'auto'

		previewImage.src = e.target.result;
		previewImage.style.width = getDom('uploadBox').offsetWidth; 
		previewImage.style.height = getDom('uploadBox').offsetHeight;

		clip.src = e.target.result;
		clip.style.width = getDom('uploadBox').offsetWidth;
		clip.style.height = getDom('uploadBox').offsetHeight;
	}

	reader.readAsDataURL(flies); //发起异步请求
}

function getDom(id) {
	return document.getElementById(id);
}