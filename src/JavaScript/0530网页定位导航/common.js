/**
 * 第一种：JavaScript实现
 */
window.onload = function() {
	window.onscroll = function() {
		var top = document.documentElement ? document.documentElement.scrollTop : document.body.scrollTop,
			menus = document.getElementById('menu').getElementsByTagName('a'), // 获取menu下的所有的 a 元素
			items = getByClassName(document.getElementById('contect'), 'item');
		var currentId = ''; //当前所在楼层(item)

		for (var i = 0; i < items.length; i++) {
			var _item = items[i],
				_itemTop = _item.offsetTop; //获取每个 item 的 top(实际高度)
			if (top > _itemTop - 200) { //itemTop-100:解决刚好等于锚点用户体验
				currentId = _item.id;
			} else {
				break;
			}
		}

		if (currentId) {
			for (var j = 0; j < menus.length; j++) { //给正确的menu下的a元素class赋值
				var _menu = menus[j],
					_href = _menu.href.split('#');
				if (_href[_href.length - 1] != currentId) {
					removeClass(_menu, 'current');
				} else {
					addClass(_menu, 'current');
				}
			}
		}

	}
}
/**根据class name获取元素
 * 解决 getElementsByClassName 兼容性
 */
function getByClassName(obj, cls) {
	var elements = obj.getElementsByTagName('*'),
		result = [];
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == cls) {
			result.push(elements[i]);
		}
	}
	return result;
}

function hasClass(obj, cls) {
	// 校验正则表达式，判断className里面是否包含传入的class
	return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)"); // 使用正则表达式替换的方法
		obj.className = obj.className.replace(reg, ''); // replace替换，如果包含class替换为空(删除class)
	}
}

function addClass(obj, cls) {
	if (!hasClass(obj, cls)) {
		obj.className += ' ' + cls; // 如果这个元素没有hasclass就添加一个class
	}
}


/**
 * 第二种：jquery实现
 */
$(document).ready(function() {
	$(window).scroll(function() { //滚动条发生滚动时触发
		var top = $(document).scrollTop(),
			menu = $('#menu'),
			items = $('#contect').find('.item'); // 牢记一点：jQuery通过 id 筛选，永远比通过 class 筛选效率要高很多
		var currentId = ''; //当前所在楼层(item)#id

		items.each(function() {
			var _this = $(this),
				itemTop = _this.offset().top; //获取每个 item 的 top(实际高度)
			if (top > itemTop - 200) { //itemTop-100:解决刚好等于锚点用户体验
				currentId = '#' + _this.attr('id');
			} else {
				return false;
			}
		});

		var currentLink = menu.find('.current'); //给相应的楼层 a 设置current，取消其它链接的current

		/**判断(currentLink.attr('href') != currentId)：
		 * href="#item1"链接刚好等于currentId，不用取消其它的链接，因为本身就是它，不需要进行取消和设置操作
		 */
		if (currentId && currentLink.attr('href') != currentId) {
			currentLink.removeClass('current');
			menu.find('[href=' + currentId + ']').addClass('current');
		}
	});
});