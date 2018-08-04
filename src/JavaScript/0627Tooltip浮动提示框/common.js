// 定义一个变量判断：是否是IE浏览器(用户代理方式，判别是不是IE浏览器)
var isIE = navigator.userAgent.indexOf("MSIE") > -1,
	toolti = getDom('tooltipWrapper');
var addEvent = function(element, type, handler) {
	if (element.addEventListener) { //DOM 二级(非 IE 浏览器) 绑定两个以上的事件均可拿到(alert(1) alert(2)两个均可拿到)
		element.addEventListener(type, handler, false);
	} else if (element.attachEvent) { //低版本浏览器(IE9以下)
		element.attachEvent('on' + type, handler);
	} else { //DOM 零级 绑定两个以上的事件只可拿到最后一个事件(alert(1) alert(2)只拿到alert(2))
		element['on' + type] = handler; //element.onclick === element['onclick']
	}
};

window.onload = function() {
	addEvent(toolti, 'mouseover', function(e) { // 事件冒泡
		var event = e || window.event,
			target = event.target || event.srcElement;
		if (target.className == 'tooltip') {
			var _html,
				_id,
				_width = 200;
			switch (target.id) {
				case "tooltip1":
					_id = "t1";
					_html = "中华人民共和国";
					break;
				case "tooltip2":
					_id = "t2";
					_html = "美国篮球职业联赛";
					break;
				case "tooltip3":
					_id = "t3";
					_html = "<h2>春晓</h2><p>春眠不觉晓，</p><p>处处闻啼鸟。</p><p>夜来风雨声，</p><p>花落知多少。</p>";
					_width = 100;
					break;
				case "tooltip4":
					_id = "t4";
					_html = '<img src="http://gtms01.alicdn.com/tps/i1/T1Lvt3Fv4kXXbA5QAK-195-120.jpg_Q90.jpg" width="500" />';
					_width = 520;
					break;
				case "tooltip5":
					_id = "t5";
					_html = '<div id="mycard"><img src="http://gtms01.alicdn.com/tps/i1/T1qxGLFsVbXXbA5QAK-195-120.jpg_Q90.jpg" alt=""/><p><strong>昵称一定要长</strong></p><p>我的简介我的简介</p></div>';
					_width = 300;
					break;
				case "tooltip6":
					_id = "t6";
					_html = '<iframe src="http://www.imooc.com/" width="480" height="300"></iframe>';
					_width = 500;
					break;
				default:
					return false;
			}
			showToolTip(target, _id, _html, _width);
		}
	});
}


/**
 * obj     ToolTip 超链接元素
 * id      ToolTip 提示框id
 * html    ToolTip 提示框HTML
 * width   ToolTip 提示框宽度(可选)
 */
function showToolTip(obj, id, html, width) {
	if (getDom(id) == null) {
		// 创建(<div class="tooltip-box" id="xx">xxxxxx</div>)
		var toolTipBox = document.createElement('div');
		toolTipBox.className = 'tooltip-box';
		toolTipBox.id = id;
		toolTipBox.innerHTML = html;
		obj.appendChild(toolTipBox);

		// auto:在IE浏览器不支持
		toolTipBox.style.width = width ? width + "px" : "auto";
		if (!width && isIE) {
			toolTipBox.style.width = toolTipBox.offsetWidth;
		}

		toolTipBox.style.cssText = 'position:absolute;display:block;';

		var left = obj.offsetLeft,
			top = obj.offsetTop + 20;

		/* ++ 当缩小浏览器窗口时，浏览的内容超出显示屏情况 ++ */
		if (left + toolTipBox.offsetWidth > document.body.clientWidth) {
			var tooltipWrapper = toolti.offsetLeft;
			left = document.body.clientWidth - toolTipBox.offsetWidth - tooltipWrapper;
			if (left < 0) left = 0;
		}

		toolTipBox.style.left = left + 'px';
		toolTipBox.style.top = top + 'px';

		addEvent(obj, 'mouseleave', function() {
			setTimeout(function() {
				getDom(id).style.display = 'none';
			}, 300);
		});
	} else {
		// 显示
		getDom(id).style.display = 'block';
	}
}

function getDom(id) {
	return document.getElementById(id);
}