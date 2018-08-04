/**
 * 第一种：对象写法
 */
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
	count = 0; //加载到第几张图片

/**
 * 有序预加载
 * 当第一张图片加载完成后再加载第二张，以此类推，知道加载完所有图片
 * 编写一个函数，在函数内部判断，如果没有加载完所有图片就会调用函数自身，在加载下一张 
 */
function _loadPreload() {
	var imgObj = new Image(); //第一步实例化 Image 对象

	$(imgObj).on('load error', function() { //第二步绑定事件；当图片加载完成之后或者图片加载出现错误
		if (count >= len) { //所有图片已经加载完毕

		} else {
			_loadPreload(); //调用自身下一次加载
		}
		count++;
	});

	imgObj.src = imgs[count]; //第三步将图片路径赋值给 图片(Image)对象的 src 属性开始预加载
}

_loadPreload();

$('.btn').on('click', function() {
	if ($(this).data('control') === 'prev') { //上一张
		index = Math.max(0, --index); //当index比0大返回index本身；如果比0小，把0返回给index
	} else { //下一张
		index = Math.min((len - 1), ++index); //当++index的值比(len-1)大返回(len-1)；如果比(len-1)小返回index本身
	}
	$("#image").attr('src', imgs[index]);
});


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

		if (this.opts.order === 'ordered') {
			this._odered(); //有序预加载方法；_:只在这里内部调用，不提供外部调用
		} else {
			this._unoredered(); //无序预加载方法；_:只在这里内部调用，不提供外部调用
		}
	}

	PerLoad.DEFAULTS = { //默认参数
		order: 'unoredered', //默认为 《无序预加载》
		each: null, //每一张图片加载完毕后执行
		all: null, //所有图片加载完毕后执行
	};

	PerLoad.prototype._odered = function() { //有序预加载
		var opts = this.opts,
			imgs = this.imgs,
			len = imgs.length,
			count = 0; //当前加载到第几张图片

		/**
		 * 有序预加载
		 * 当第一张图片加载完成后再加载第二张，以此类推，知道加载完所有图片
		 * 编写一个函数，在函数内部判断，如果没有加载完所有图片就会调用函数自身，在加载下一张 
		 */
		function _loadPreload() {
			var imgObj = new Image(); //第一步实例化 Image 对象

			$(imgObj).on('load error', function() { //第二步绑定事件；当图片加载完成之后或者图片加载出现错误
				opts.each && opts.each(count); //判断 each 存不存在

				if (count >= len) { //所有图片已经加载完毕
					opts.all && opts.all(); //判断 all 存不存在
				} else {
					_loadPreload(); //调用自身下一次加载
				}
				count++;
			});

			imgObj.src = imgs[count]; //第三步将图片路径赋值给 图片(Image)对象的 src 属性开始预加载
		}

		_loadPreload();
	};

	PerLoad.prototype._unoredered = function() { //无序预加载
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
	len = imgs.length;

$.preload(imgs, {
	order: 'ordered', //有序预加载
});

$('.btn').on('click', function() {
	if ($(this).data('control') === 'prev') { //上一张
		index = Math.max(0, --index); //当index比0大返回index本身；如果比0小，把0返回给index
	} else { //下一张
		index = Math.min((len - 1), ++index); //当++index的值比(len-1)大返回(len-1)；如果比(len-1)小返回index本身
	}
	$("#image").attr('src', imgs[index]);
});