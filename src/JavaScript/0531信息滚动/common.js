/**
 * 【无缝滚动】
 */
window.onload = function() {
	window.box = getDom('box');
	window.con1 = getDom('con1');
	window.con2 = getDom('con2');
	var speed = 50;

	box.scrollTop = 0;
	con2.innerHTML = con1.innerHTML; // 让 con1=con2 （克隆）

	var myScroll = setInterval("scrollUp()", speed);

	box.onmouseover = function() {
		clearInterval(myScroll);
	}
	box.onmouseout = function() {
		myScroll = setInterval("scrollUp()", speed); // 参数1：算数表达式/函数；参数2：时间间隔
	}
}

function scrollUp() {
	if (box.scrollTop >= con1.scrollHeight) { //当box滚动的高度 >= con1的高度
		box.scrollTop = 0; //则box回到初始位置
	} else {
		box.scrollTop++;
	}
}

function getDom(id) {
	return document.getElementById(id);
}

/**
 * 【间隙滚动】
 */
window.onload = function() {
	window.box = getDom('box');
	window.aHeight = 36; //滚动高度,item(a)的高度

	box.innerHTML += box.innerHTML; // 克隆一份
	box.scrollTop = 0;

	window.speed = 50;
	window.delay = 1000;

	window.timer = null;
	window.t = null;

	setTimeout('startMove()', delay); //在执行时，在载入后延迟指定时间后，去执行一次表达式，仅执行一次

	box.onmouseover = function() {
		clearInterval(timer);
		clearTimeout(t);
	};
	box.onmouseout = function() {
		clearInterval(timer);
		t = setTimeout('startMove()', delay);
	};
}

function startMove() {
	box.scrollTop++;
	timer = setInterval('scrollUp()', speed); //在执行时，它从载入后，每隔指定的时间就执行一次
}

function scrollUp() {
	if (box.scrollTop % aHeight == 0) {
		clearInterval(timer);
		t = setTimeout('startMove()', delay);
	} else {
		box.scrollTop++;
		if (box.scrollTop >= box.scrollHeight / 2) {
			box.scrollTop = 0; //则box回到初始位置
		}
	}
}

function getDom(id) {
	return document.getElementById(id);
}