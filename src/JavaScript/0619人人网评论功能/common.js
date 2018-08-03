window.onload = function() {
	var list = document.getElementById('list'),
		lis = list.children, // 获取list下的所有li
		timer; //定时器

	for (var l = 0; l < lis.length; l++) {
		lis[l].onclick = function(event) { // 事件代理(事件委托)
			event = event || window.event;
			var el = event.srcElement; // 声明变量，用来存放触发元素

			switch (el.className) { // 根据class判断点击了那个元素
				case 'close': //删除
					removeNode(el.parentNode);
					break;
				case 'praise': //点赞
					praiseBox(el.parentNode.parentNode.parentNode, el);
					break;
				case 'btn btn-off': //回复
					clearTimeout(timer);
					break;
				case 'btn': //发表评论
					replayBox(el.parentNode.parentNode.parentNode);
					break;
				case 'comment-praise': //赞回复
					praiseReplay(el);
					break;
				case 'comment-operate': //操作回复
					operateReplay(el);
					break;
			}
		}
		// 输入框
		var textarea = lis[l].getElementsByTagName('textarea')[0];
		textarea.onfocus = function() {
			this.parentNode.className = 'text-box text-box-on'; //添加class
			this.value = (this.value == '评论…') ? '' : this.value;
		}
		textarea.onblur = function() {
			var _this = this;
			if (this.value == '') {
				timer = setTimeout(function() { //400毫秒收起 textarea
					_this.parentNode.className = 'text-box';
					_this.value = '评论…';
				}, 400);
			}
		}
		textarea.onkeyup = function() {
			var len = this.value.length,
				btn = this.parentNode.children[1], //获取button
				word = this.parentNode.children[2]; //字数
			if (len == 0 || len > 140) {
				btn.className = 'btn btn-off';
			} else {
				btn.className = 'btn';
			}
			word.innerHTML = len + '/140';
		}
	}

	/**
	 * 删除
	 */
	function removeNode(node) {
		// removeChild()删除孩子元素，要删除当前元素el,先要使用parentNode找到父节点，然后在使用removeChild(el)删除el元素。
		node.parentNode.removeChild(node);
	}
	/**
	 * 点赞
	 * 参数1:点赞容器(整个li容器)
	 * 参数2:触发元素
	 */
	function praiseBox(box, el) {
		var praiseElement = box.getElementsByClassName('praises-total')[0],
			oldTotal = parseInt(praiseElement.getAttribute('total')), // 没有发生变化之前的点赞总数
			txt = el.innerHTML,
			newTotal; // 计算新的总数

		if (txt == '赞') {
			newTotal = oldTotal + 1;
			praiseElement.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
			el.innerHTML = '取消赞';
		} else {
			newTotal = oldTotal - 1;
			praiseElement.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';
			el.innerHTML = '赞';
		}

		praiseElement.setAttribute('total', newTotal); // 更新点赞数(total)
		praiseElement.style.display = (newTotal == 0) ? 'none' : 'block';
	}
	/**
	 * 发表评论
	 */
	function replayBox(box) {
		var textarea = box.getElementsByTagName('textarea')[0],
			list = box.getElementsByClassName('comment-list')[0],
			li = document.createElement('div');

		li.className = 'comment-box clearfix';
		li.setAttribute('user', 'self');

		var html = '<img class="myhead" src="./my.jpg" alt=""/>' +
			'<div class="comment-content">' +
			'<p class="comment-text"><span class="user">我：</span>' + textarea.value + '</p>' +
			'<p class="comment-time">' +
			getDate() +
			'<a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>' +
			'<a href="javascript:;" class="comment-operate">删除</a>' +
			'</p>' +
			'</div>';

		li.innerHTML = html;
		list.appendChild(li);
		textarea.value = '';
		textarea.onblur();
	}

	function getDate() {
		var d = new Date(),
			year = d.getFullYear(),
			month = d.getMonth() + 1,
			date = d.getDate(),
			hour = d.getHours(),
			minute = d.getMinutes();
		month = (month < 10) ? ('0' + month) : month;
		date = (date < 10) ? ('0' + date) : date;
		hour = (hour < 10) ? ('0' + hour) : hour;
		minute = (minute < 10) ? ('0' + minute) : minute;
		return year + '-' + month + '-' + date + '  ' + hour + ':' + minute;
	}
	/**
	 * 赞回复
	 */
	function praiseReplay(el) {
		var oldTotal = parseInt(el.getAttribute('total')),
			my = parseInt(el.getAttribute('my')),
			newTotal; // 新的总数
		if (my == 0) {
			newTotal = oldTotal + 1;
			el.setAttribute('total', newTotal);
			el.setAttribute('my', 1);
			el.innerHTML = newTotal + ' 取消赞';
		} else {
			newTotal = oldTotal - 1;
			el.setAttribute('total', newTotal);
			el.setAttribute('my', 0);
			el.innerHTML = (newTotal == 0) ? '赞' : (newTotal + '赞');
		}
		el.style.display = (newTotal == 0) ? '' : 'inline-block';
	}
	/**
	 * 操作回复
	 */
	function operateReplay(el) {
		var commentBox = el.parentNode.parentNode.parentNode, //评论容器
			box = commentBox.parentNode.parentNode.parentNode, //分享容器
			textarea = box.getElementsByTagName('textarea')[0],
			user = commentBox.getElementsByClassName('user')[0],
			txt = el.innerHTML;

		if (txt == '回复') {
			textarea.onfocus();
			textarea.value = '回复' + user.innerHTML;
			textarea.onkeyup();
		} else {
			removeNode(commentBox);
		}
	}
}