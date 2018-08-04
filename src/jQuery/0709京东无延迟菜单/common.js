$(document).ready(function() {
	var subMenu = $('#subMenu'),
		activeRow, // 指向当前激活一级菜单的行
		activeMenu,
		timer, //定时器 
		isMenu = false; //当前鼠标是否在子菜单里面

	subMenu.on('mouseenter', function() {
		isMenu = true;
	}).on('onmouseleave', function() {
		isMenu = false;
	})

	var mouseTrack = []; //创建一个数组来跟踪纪录鼠标的位置

	var menuHanlder = function(e) {
		mouseTrack.push({
			x: e.pageX,
			y: e.pageY
		});
		// 由于计算时，只需要当前位置和上一次位置，保存有限的数值信息即可
		if (mouseTrack.length > 3) {
			mouseTrack.shift();
		}
	}

	$('#firstMenu')
		.on('mouseenter', function() {
			subMenu.removeClass('none');
			$(document).bind('mousemove', menuHanlder);
		})
		.on('mouseleave', function() {
			subMenu.addClass('none');
			if (activeRow) {
				activeRow.removeClass('active');
				activeRow = null;
			}
			if (activeMenu) {
				activeMenu.addClass('none');
				activeMenu = null;
			}
			// 鼠标离开菜单时，需要把绑定在 document 上的事件进行一个解绑，以免影响其他的组件
			$(document).unbind('mousemove', menuHanlder);
		})
		.on('mouseenter', 'li', function(e) { // 事件代理
			if (!activeRow) {
				activeRow = $(e.target); //$(e.target)事件目标
				activeRow.addClass('active');
				activeMenu = $('#' + activeRow.data('id'));
				activeMenu.removeClass('none');
				return;
			}

			if (timer) {
				clearTimeout(timer);
			}



			var currMousePos = mouseTrack[mouseTrack.length - 1], // p 点的坐标（鼠标当前坐标）
				leftCorner = mouseTrack[mouseTrack.length - 2]; // a 点坐标（鼠标上一次的坐标）
			// 上下边缘坐标；获得上下边缘，相当于页面左上角坐标
			var delay = needDelay(subMenu, leftCorner, currMousePos);

			if (delay) {
				timer = setTimeout(function() {
					if (isMenu) {
						return;
					}
					activeRow.removeClass('active');
					activeMenu.addClass('none');

					activeRow = $(e.target);
					activeRow.addClass('active');
					activeMenu = $('#' + activeRow.data('id'));
					activeMenu.removeClass('none');

					timer = null;
				}, 300);
			} else {
				var prevActiveRow = activeRow,
					prevActiveMenu = activeMenu;

				activeRow = $(e.target);
				activeMenu = $('#' + activeRow.data('id'));

				prevActiveRow.removeClass('active');
				prevActiveMenu.addClass('none');

				activeRow.addClass('active');
				activeMenu.removeClass('none');
			}

		});
});

/**
 * 向量计算（终点坐标 - 起点坐标）
 */
function vector(a, b) {
	return {
		x: b.x - a.x,
		y: b.y - a.y
	}
}
/**
 * 向量的叉乘公式（可在维基百科和百度百科搜索）
 */
function vectorProduct(v1, v2) {
	return v1.x * v2.y - v2.x * v1.y;
}
/**
 * 叉乘判断方法
 */
function isPointInTrangle(p, a, b, c) {
	var pa = vector(p, a),
		pb = vector(p, b),
		pc = vector(p, c);
	var t1 = vectorProduct(pa, pb),
		t2 = vectorProduct(pb, pc),
		t3 = vectorProduct(pc, pa);
	return sameSign(t1, t2) && sameSign(t2, t3); //判断结果符号相同
}
/**
 * 判断结果符号相同
 * 使用 V 运算技巧判断
 */
function sameSign(a, b) {
	/* 原理：因为二进制的正负表示是在最高位， 1 表示负， 0 表示正，而 ^ 运算是剪刀对应的两位有一位为 1 时才返回 1 ，如果返回的是正(0)，那么这两个数一定都为正或为负，也就是符号相同；如果返回的结果是负(1)，那么就是两个，一个0一个1，或者一个1一个0，那么符号肯定不相同了 */
	return (a ^ b) >= 0; //判定他们符号相同的
}
/**
 * 判断是否需要延迟
 */
function needDelay(elem, leftCorner, currMousePos) {
	var offset = elem.offset();

	var topLeft = {
			x: offset.left,
			y: offset.top
		},
		bottomLeft = {
			x: offset.left,
			y: offset.top + elem.height()
		};
	return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft); // p 点是否在三角形内
}	