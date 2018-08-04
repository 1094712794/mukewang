/**
 * 第一种：对象写法
 */
(function() { //自我执行的匿名函数【闭包】
	var imgs = [
		'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
		'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
		'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
		'http://i2.hoopchina.com.cn/user/308/15960308/13383588090.jpg',
		'http://img.article.pchome.net/00/44/23/20/pic_lib/wm/2.jpg',
		'http://lcd.yesky.com/imagelist/2009/044/404q4y8g4m0p.jpg',
		'http://lcd.yesky.com/imagelist/2009/044/cgro54wt2t2x.jpg'
	];

	var index = 0, //当前第几张图片
		len = imgs.length,
		count = 0,
		$progress = $('.progress');

	$.each(imgs, function(i, src) { //遍历 image
		var imgObj = new Image();

		$(imgObj).on('load error', function() { //加载图片
			$progress.html(Math.round((count + 1) / len * 100) + '%'); //加载完占总共的百分比；每加载一张需要做的
			if (count >= len - 1) { // 加载完成
				$('.loading').hide();
			}
			count++;
		});

		imgObj.src = src; // 将src赋值到给图片对象src属性
	});

	$('.btn').on('click', function() {
		if ($(this).data('control') === 'prev') { //上一张
			index = Math.max(0, --index); //当index比0大返回index本身；如果比0小，把0返回给index
		} else { //下一张
			index = Math.min((len - 1), ++index); //当++index的值比(len-1)大返回(len-1)；如果比(len-1)小返回index本身
		}
		$("#image").attr('src', imgs[index]);
	});
})();

/**
 * 第二种：jQuery插件
 */
(function() { //自我执行的匿名函数【闭包】
	/**
	 * 《构造函数》
	 */
	function PerLoad(imgs, options) { //imgs:图片数组；options:参数
		this.imgs = (typeof imgs === 'string' ? [imgs] : imgs); //判断传递进来的是string，自己包成数组，否则将数组返回
		/**
		 * 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		 * 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		 */
		this.opts = $.extend({}, PerLoad.DEFAULTS, options);

		this._unoredered(); //无序加载方法；_:只在这里内部调用，不提供外部调用
	}

	PerLoad.DEFAULTS = { //默认参数
		each: null, //每一张图片加载完毕后执行
		all: null, //所有图片加载完毕后执行
	};

	PerLoad.prototype._unoredered = function() { //无序加载
		var imgs = this.imgs,
			opts = this.opts,
			count = 0,
			len = imgs.length;

		$.each(imgs, function(i, src) { //遍历 image
			if (typeof src != 'string') return; //如果不是字符串，直接返回

			var imgObj = new Image();

			$(imgObj).on('load error', function() { //加载图片
				opts.each && opts.each(count); //判断 each 存不存在

				if (count >= len - 1) { // 加载完成
					opts.all && opts.all();
				}
				count++;
			});

			imgObj.src = src; // 将src赋值到给图片对象src属性
		});
	};

	/**
	 * 《jQuery插件》
	 * $.fn.extend ---> $('#image').preload();// 第一种jQuery插件写法【选择元素方式】
	 * $.extend ---> $.preload();// 第二种jQuery插件写法【工具方法】
	 */
	$.extend({
		preload: function(imgs, opts) {
			new PerLoad(imgs, opts);
		}
	});
})(jQuery);

var imgs = [
	'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
	'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
	'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
	'http://i2.hoopchina.com.cn/user/308/15960308/13383588090.jpg',
	'http://img.article.pchome.net/00/44/23/20/pic_lib/wm/2.jpg',
	'http://lcd.yesky.com/imagelist/2009/044/404q4y8g4m0p.jpg',
	'http://lcd.yesky.com/imagelist/2009/044/cgro54wt2t2x.jpg'
];

var index = 0, //当前第几张图片
	len = imgs.length,
	$progress = $('.progress');

$.preload(imgs, {
	each: function(count) { //每一张图片加载完毕后执行
		$progress.html(Math.round((count + 1) / len * 100) + '%'); //加载完占总共的百分比；每加载一张需要做的
	},
	all: function() { //所有图片加载完毕后执行
		$('.loading').hide();
	}
});

$('.btn').on('click', function() {
	if ($(this).data('control') === 'prev') { //上一张
		index = Math.max(0, --index); //当index比0大返回index本身；如果比0小，把0返回给index
	} else { //下一张
		index = Math.min((len - 1), ++index); //当++index的值比(len-1)大返回(len-1)；如果比(len-1)小返回index本身
	}
	$("#image").attr('src', imgs[index]);
});