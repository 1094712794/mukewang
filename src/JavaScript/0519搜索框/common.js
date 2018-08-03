/**
 * 第一种：JavaScript实现
 */
window.onload = function() {
	var searchForm = document.getElementById('searchForm'),
		searchText = document.getElementById('searchText'),
		suggest = document.getElementById('suggest');

	/**跨浏览器事件处理
	 * 参数1:元素id
	 * 参数2:绑定类型事件(click keyUp keyDown)
	 * 参数3:响应的回调函数
	 */
	var addEvent = function(id, type, handler) {
		var element = document.getElementById(id) || document;
		if (element.addEventListener) { //DOM 二级(非 IE 浏览器) 绑定两个以上的事件均可拿到(alert(1) alert(2)两个均可拿到)
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) { //低版本浏览器(IE9以下)
			element.attachEvent('on' + type, handler);
		} else { //DOM 零级 绑定两个以上的事件只可拿到最后一个事件(alert(1) alert(2)只拿到alert(2))
			element['on' + type] = handler; //element.onclick === element['onclick']
		}
	};

	addEvent('searchText', 'keyup', function() { //keyup当输入的时候请求数据进行展示
		var searchVal = searchText.value;

		/* ---------- 课程中的的方法(这样会出现跨域请求问题) ---------- */
		ajaxGet("http://api.bing.com/qsonhs.aspx?q=" + searchVal, function(res) {
			console.log(res)
			var data = res.AS.Results[0].Suggests;
			var html = '';

			for (var i = 0; i < data.length; i++) {
				html += '<li class="suggest-item">' + data[i].Txt + '</li>';
			}
			suggest.innerHTML = html;

			suggest.style.top = getElementTop(searchForm) + 42 + 'px'; //42:输入框的height
			suggest.style.left = getElementLeft(searchForm) + 'px';
			suggest.style.position = 'absolute';
			suggest.style.display = 'block';
		});

		/* ++++++++++ jsonp实现跨域(原理：动态创建script标签) ++++++++++ */
		var url = "http://api.bing.com/qsonhs.aspx?type=cb&cb=jsonpcallback&q=" + searchVal;
	 		var script = document.createElement('script');
	        script.setAttribute('src', url);
	        // 把script标签加入body，此时调用开始
	        document.getElementsByTagName('body')[0].appendChild(script);

	        suggest.style.top=getElementTop(searchForm)+42+'px';//42:输入框的height
	 		suggest.style.left=getElementLeft(searchForm)+'px';
	 		suggest.style.position='absolute';
	 		suggest.style.display='block';
	});

	function jsonpcallback(data) {
		var data = data.AS.Results[0].Suggests;
		var html = "";
		console.log(data);
		var html = "";
		for (var i = 0; i < data.length; i++) {
			html += "<li class='suggest-item'>" + data[i].Txt + "</li>"
		}
		suggest.innerHTML = html;
	};


	function getElementLeft(element) { //元素距离浏览器左边的距离
		var actualLeft = element.offsetLeft, //offsetLeft:获得距离父元素(浏览器/容器)左边的距离 
			current = element.offsetParent;
		while (current !== null) {
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}
		return actualLeft;
	}

	function getElementTop(element) { //元素距离浏览器上边的距离
		var autulTop = element.offsetTop,
			current = element.offsetParent;
		while (current !== null) {
			autulTop += current.offsetTop;
			current = current.offsetParent;
		}
		return autulTop;
	}

	function ajaxGet(url, callback) { //ajax请求
		var _xhr = null;
		if (window.XMLHttpRequest) {
			_xhr = new window.XMLHttpRequest(); //非 IE 浏览器使用 XMLHttpRequest()
		} else if (window.ActiveXObject) {
			//在 IE 浏览器使用 ActiveXObject()
			try {
				_xhr = new ActiveXObject("Msxml2.XMLHTTP"); //Msxml2.XMLHTTP:是高版本,受msxml3.dll+支持
			} catch (e) {
				try {
					_xhr = new ActiveXObject("Microsoft.XMLHTTP"); //Microsoft.XMLHTTP:是低本,一般是msxml2.6以下版本使用
				}
			}
		}
		_xhr.onreadystatechange = function() { //服务器状态发生改变触发
			// 当 readyState==4 并且 status==200 时，表示服务器正确响应并返回信息
			if (_xhr.readyState == 4 && _xhr.status == 200) {
				// 返回结果存放在 responseText 属性(可能是字符串)里， JSON.parse():把一个字符串转换成一个js可识别的对象
				callback(JSON.parse(_xhr.responseText));
			}
		}
		// 打开与服务器之间的链接；参数3(async参数):必须设置为true，使用异步方式(ajax技术)从服务器获取数据
		_xhr.open('get', url, true);
		_xhr.send(null); //发送数据

	}
}

/**
 * 第二种：jquery实现
 */
$(document).ready(function() {
	var searchText = $('#searchText'),
		searchForm = $('#searchForm'),
		suggest = $('#suggest');

	/**事件绑定
	 * 参数1:传入的事件名(click、keyup等)
	 * 参数2:事件响应的方法
	 */
	searchText.bind('keyup', function() { //keyup当输入的时候请求数据进行展示
		var searchVal = searchText.val();

		/**ajax原理
		 * 向服务器交互数据的异步化：当和服务器进行通信的过程，用户没有任何感知；
		 * 同时数据通讯的过程不会影响用户对网页上其他元素操作。
		 * 注意(同源策略)： Ajax 发送请求的 url 地址与服务器地址必须是统一域名下。 
		 */
		$.ajax({
			type: 'get',
			async: true, //异步请求
			url: "http://api.bing.com/qsonhs.aspx?type=cb&q=" + searchVal,
			dataType: "jsonp", //注意JSONP只支持GET请求，不支持POST请求。
			jsonp: 'cb',
			//cache:true,//结果可以被缓存（在请求中多了一个 & _=658971235879）
			jsonpCallBack: "callback",
			success: function(res) {
				console.log(res);
				var data = res.AS.Results[0].Suggests;
				var html = '';

				for (var i = 0; i < data.length; i++) {
					html += '<li class="suggest-item">' + data[i].Txt + '</li>';
				}
				suggest.html(html);

				// offset:取元素的位置(top、bottom、left、right)
				suggest.show().css({
					position: 'absolute',
					top: searchForm.offset().top + searchForm.height(),
					left: searchForm.offset().left,
				});
			},
			error: function(err) {
				console.log(err);
			}
		});

	});

	$(document).bind('click', function() { //点击页面其他部分隐藏 suggest 列表
		suggest.hide();
	});

	/**事件代理
	 * 事件注册在绑定元素的父元素上，针对多个元素做事件绑定的时候，且多个元素并不是我们直接用HTML写在页面当中，
	 * 而是通过JavaScript动态生成的HTML结构。
	 * 参数1:绑定的事件元素(class、li等)
	 * 参数2:响应的用户事件(click、keyup等)
	 * 参数3:事件响应的方法
	 */
	$(document).delegate('.suggest-item', 'click', function() {
		var keyword = $(this).text();
		location.href = 'http://cn.bing.com/search?q=' + keyword;
	});
});