/**
 * ==================== 第一种：jquery写法【点击之后，可点击】 ====================
 */
/*
var rating = (function() { //自我执行的匿名函数 【闭包】
	var lightOn = function($rating, num) {
		$rating.find('.rating-item').each(function(index) {
			if (num > index) {
				$(this).css('background-position', '0 -33px');
			} else {
				$(this).css('background-position', '0 0');
			}
		});
	}

	function init(el, num) {
		var $rating = $(el);
		lightOn($rating, num); //初始化
		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		$rating.on('mouseover', '.rating-item', function() {
			lightOn($rating, $(this).index() + 1);
		}).on('click', '.rating-item', function() {
			num = $(this).index() + 1;
		}).on('mouseout', '.rating-item', function() {
			lightOn($rating, num);
		});
	}

	return {
		init: init
	}; //返回一个对象
})();

rating.init('#rating', 3);
*/

/**
 * ==================== 第二种：jquery插件写法【点击之后，可点击】 ====================
 */
/*
(function() { //自我执行的匿名函数 【闭包】
	var lightOn = function($rating, num) {
		$rating.find('.rating-item').each(function(index) {
			if (num > index) {
				$(this).css('background-position', '0 -33px');
			} else {
				$(this).css('background-position', '0 0');
			}
		});
	}

	function init(el, num) {
		var $rating = $(el);
		lightOn($rating, num); //初始化
		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		$rating.on('mouseover', '.rating-item', function() {
			lightOn($rating, $(this).index() + 1);
		}).on('click', '.rating-item', function() {
			num = $(this).index() + 1;
		}).on('mouseout', '.rating-item', function() {
			lightOn($rating, num);
		});
	}

	$.fn.extend({ //jquery插件
		rating: function(num) {
			return this.each(function() {
				init(this, num);
			});
		}
	});
})();
$('#rating').rating(2);
*/

/**
 * ==================== 第三种：设计模式写法：绑定在对象上（对象调用）【点击之后，可点击】 ====================
 */
/*
var rating = (function() { //自我执行的匿名函数 【闭包】
	// 点亮整颗
	var LightEntire = function(el, options) { //构造函数
		this.$el = $(el);
		this.$item = this.$el.find('.rating-item');
		this.opts = options;
	};
	// 方法都写在原型上，这样保证不管你实例化多少次，内存中都只有一份
	LightEntire.prototype.init = function() {
		this.lightOn(this.opts.num); //初始进来点亮星星数
		this.bindEvent(); //绑定事件
	};
	LightEntire.prototype.lightOn = function(num) { //点亮星星
		num = parseInt(num); //如果传进来是小数，强制转换为小数
		this.$item.each(function(index) {
			if (num > index) {
				$(this).css('background-position', '0 -33px');
			} else {
				$(this).css('background-position', '0 0');
			}
		});
	};
	LightEntire.prototype.bindEvent = function() { //绑定事件
		var self = this,
			itemLength = self.$item.length;
		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		self.$el.on('mouseover', '.rating-item', function() {
			var num = $(this).index() + 1;
			self.lightOn(num);
			// 判断是否为函数，前面函数执行后面的《call改变this指向，指向当前星星》
			(typeof self.opts.select === 'function') && self.opts.select.call(this, num, itemLength);
		}).on('click', '.rating-item', function() {
			self.opts.num = $(this).index() + 1;

			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
		}).on('mouseout', '.rating-item', function() {
			self.lightOn(self.opts.num);
		});
	};

	// 默认参数
	var defaults = {
		num: 0, //默认点亮星星个数
		readOnly: false, //是否只读
		select: function() { //鼠标移上去执行的方法

		},
		chosen: function() { //点击某颗星星(如ajax请求)

		},
	};

	function init(el, options) {
		// 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		// 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		options = $.extend({}, defaults, options);
		new LightEntire(el, options).init();
	}

	return {
		init: init
	}
})();
rating.init('#rating', {
	num: 2,
	select: function(num, total) {
		// console.log(this); //this指向 LightEntire 对象
		console.log(num + '/' + total);
	}
});
*/

/**
 * ==================== 第四种：设计模式写法：绑定在事件上（事件调用）【点击之后，可点击】 ====================
 */
/*
var rating = (function() { //自我执行的匿名函数 【闭包】
	// 点亮整颗
	var LightEntire = function(el, options) { //构造函数
		this.$el = $(el);
		this.$item = this.$el.find('.rating-item');
		this.opts = options;
	};
	// 方法都写在原型上，这样保证不管你实例化多少次，内存中都只有一份
	LightEntire.prototype.init = function() {
		this.lightOn(this.opts.num); //初始进来点亮星星数
		if (!this.opts.readOnly) { //当不是只读，才执行绑定事件
			this.bindEvent(); //绑定事件
		}
	};
	LightEntire.prototype.lightOn = function(num) { //点亮星星
		num = parseInt(num); //如果传进来是小数，强制转换为小数
		this.$item.each(function(index) {
			if (num > index) {
				$(this).css('background-position', '0 -33px');
			} else {
				$(this).css('background-position', '0 0');
			}
		});
	};
	LightEntire.prototype.bindEvent = function() { //绑定事件
		var self = this,
			itemLength = self.$item.length;
		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		self.$el.on('mouseover', '.rating-item', function() {
			var num = $(this).index() + 1;

			self.lightOn(num);

			// 判断是否为函数，前面函数执行后面的《call改变this指向，指向当前星星》
			(typeof self.opts.select === 'function') && self.opts.select.call(this, num, itemLength);
			// 触发相应事件，触发事件在 $el 绑定事件上
			self.$el.trigger('select', [num, itemLength]);
		}).on('click', '.rating-item', function() {
			self.opts.num = $(this).index() + 1;

			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
			self.$el.trigger('select', [self.opts.num, itemLength]);
		}).on('mouseout', '.rating-item', function() {
			self.lightOn(self.opts.num);
		});
	};

	// 默认参数
	var defaults = {
		num: 0, //默认点亮星星个数
		readOnly: false, //是否只读
		select: function() { //鼠标移上去执行的方法

		},
		chosen: function() { //点击某颗星星(如ajax请求)

		},
	};

	function init(el, options) {
		// 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		// 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		options = $.extend({}, defaults, options);
		new LightEntire(el, options).init();
	}

	return {
		init: init
	}
})();
rating.init('#rating', {
	num: 2,
});
$('#rating').on('select', function(e, num, total) { //鼠标移上去
	console.log(num + '/' + total);
}).on('chosen', function(e, num, total) { //鼠标点击
	console.log(num + '/' + total);
});
*/

/**
 * ==================== 第五种：策略模式写法：星星颗数不定(自定义)（对象写法）【点击之后，不可点击】 ====================
 */
/*
var rating = (function() { //自我执行的匿名函数【闭包】
	// el:评分的父容器；options:自定义参数
	var Rating = function(el, options) { //构造函数
		// 将参数保存成属性
		this.$el = $(el); //将 el 转换成jquery对象保存下来
		// 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		// 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		this.opts = $.extend({}, Rating.DEFAULTS, options);

		this.itemWidth = 33; //星星默认宽度
		this.displayWidth = this.opts.num * this.itemWidth //展示层默认的宽度(几颗星星 * 星星的宽度)
	};

	Rating.DEFAULTS = { //默认参数
		total: 5, //一共有几颗星星
		num: 2, //默认点亮几颗
		readOnly: false, //只读
		select: function() {}, //鼠标滑过星星执行的函数
		chosen: function() {} //点击选中星星执行的函数
	};

	Rating.prototype.init = function() { //初始化方法
		this.buildHTML();
		this.setCSS();
		if (!this.opts.readOnly) { //判断是否只读，只有在不是只读的时候，才直接绑定
			this.bindEvent();
		}
	};

	Rating.prototype.buildHTML = function() { //动态创建 HTML 标签
		var html = '';
		html += '<div class="rating-display"></div><ul class="rating-mask">';
		for (var i = 0; i < this.opts.total; i++) {
			html += '<li class="rating-item"></li>';
		}
		html += '</ul>';
		this.$el.html(html); //找到父容器把装载的 HTML 放进去
	};

	Rating.prototype.setCSS = function() { //设置 css 样式
		this.$el.width(this.opts.total * this.itemWidth); // 设置父容器的总宽度(几颗星星 * 星星的宽度)
		this.$display = this.$el.find('.rating-display'); //设置展示层的宽度
		this.$display.width(this.displayWidth);
		this.$el.find('.rating-item').width(this.itemWidth); //设置每颗星星的宽度
	};

	Rating.prototype.bindEvent = function() { //绑定事件
		var self = this; // this 指向 Rating 实例化后的对象

		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		this.$el.on('mouseover', '.rating-item', function() {
			var count = $(this).index() + 1; //鼠标滑动到那颗星星，纪录下来

			self.$display.width(count * self.itemWidth); // 设置展示层的宽度(这里的 this 指向星星)

			//鼠标移到星星上执行 select 方法；call:改变 select 函数里的 this 指向，this执行星星
			(typeof self.opts.select === 'function') && self.opts.select.call(this, count, self.opts.total);

			self.$el.trigger('select', [count, self.opts.total]); // 触发事件方式
		}).on('click', '.rating-item', function() {
			var count = $(this).index() + 1; //鼠标滑动到那颗星星，纪录下来

			self.displayWidth = count * self.itemWidth; //改变默认显示层的宽度

			//鼠标点击星星上执行 chosen 方法；call:改变 chosen 函数里的 this 指向，this执行星星
			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, count, self.opts.total);

			self.$el.trigger('chosen', [count, self.opts.total]); // 触发事件方式
		}).on('mouseout', function() {
			self.$display.width(self.displayWidth); //重新设置展示层宽度					
		});

	};

	Rating.prototype.unbindEvent = function() { //解绑定事件
		this.$el.off();
	};

	function init(el, option) { //el:父容器参数；option:自定义参数
		var $el = $(el),
			rating = $el.data('rating'); //一进来就在 data 里面找有没有名字叫 rating 的值

		if (!rating) { //判断如果没有名字叫 rating 的值，表示第一次进来
			$el.data('rating', (rating = new Rating(el, (typeof option === 'object' && option)))); //实例化保存 rating 值
			rating.init();
		}

		if (typeof option === 'string') rating[option](); // 判断如果是字符串，直接将字符串作为方法名来调用
	}

	return {
		init: init
	};
})();

rating.init("#rating", {
	total: 6,
	num: 3,
	readOnly: false, //只读（true:不可再点击选中）
	select: function(count, total) { //滑过每颗星星
		console.log(this);
		console.log(count + '/' + total);
	},
	chosen: function(count, total) { //鼠标点击(变成只读状态)
		rating.init('#rating', 'unbindEvent'); //解绑所有事件
	}
});
*/

/**
 * ==================== 第六种：策略模式写法：星星颗数不定(自定义)（jQuery插件）【点击之后，不可点击】 ====================
 */
(function() { //自我执行的匿名函数【闭包】
	/*el:评分的父容器；options:自定义参数*/
	var Rating = function(el, options) { //构造函数
		/*将参数保存成属性*/
		this.$el = $(el); //将 el 转换成jquery对象保存下来
		/**
		 * 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		 * 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		 */
		this.opts = $.extend({}, Rating.DEFAULTS, options);

		this.itemWidth = 33; //星星默认宽度
		this.displayWidth = this.opts.num * this.itemWidth //展示层默认的宽度(几颗星星 * 星星的宽度)
	};

	Rating.DEFAULTS = { //默认参数
		total: 5, //一共有几颗星星
		num: 2, //默认点亮几颗
		readOnly: false, //只读
		select: function() {}, //鼠标滑过星星执行的函数
		chosen: function() {} //点击选中星星执行的函数
	};

	Rating.prototype.init = function() { //初始化方法
		this.buildHTML();
		this.setCSS();
		if (!this.opts.readOnly) { //判断是否只读，只有在不是只读的时候，才直接绑定
			this.bindEvent();
		}
	};

	Rating.prototype.buildHTML = function() { //动态创建 HTML 标签
		var html = '';
		html += '<div class="rating-display"></div><ul class="rating-mask">';
		for (var i = 0; i < this.opts.total; i++) {
			html += '<li class="rating-item"></li>';
		}
		html += '</ul>';
		this.$el.html(html); //找到父容器把装载的 HTML 放进去
	};

	Rating.prototype.setCSS = function() { //设置 css 样式
		this.$el.width(this.opts.total * this.itemWidth); // 设置父容器的总宽度(几颗星星 * 星星的宽度)
		this.$display = this.$el.find('.rating-display'); //设置展示层的宽度
		this.$display.width(this.displayWidth);
		this.$el.find('.rating-item').width(this.itemWidth); //设置每颗星星的宽度
	};

	Rating.prototype.bindEvent = function() { //绑定事件
		var self = this; // this 指向 Rating 实例化后的对象

		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		this.$el.on('mouseover', '.rating-item', function() {
			var count = $(this).index() + 1; //鼠标滑动到那颗星星，纪录下来

			self.$display.width(count * self.itemWidth); // 设置展示层的宽度(这里的 this 指向星星)

			//鼠标移到星星上执行 select 方法；call:改变 select 函数里的 this 指向，this执行星星
			(typeof self.opts.select === 'function') && self.opts.select.call(this, count, self.opts.total);

			self.$el.trigger('select', [count, self.opts.total]); // 触发事件方式
		}).on('click', '.rating-item', function() {
			var count = $(this).index() + 1; //鼠标滑动到那颗星星，纪录下来

			self.displayWidth = count * self.itemWidth; //改变默认显示层的宽度

			//鼠标点击星星上执行 chosen 方法；call:改变 chosen 函数里的 this 指向，this执行星星
			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, count, self.opts.total);

			self.$el.trigger('chosen', [count, self.opts.total]); // 触发事件方式
		}).on('mouseout', function() {
			self.$display.width(self.displayWidth); //重新设置展示层宽度					
		});

	};

	Rating.prototype.unbindEvent = function() { //解绑定事件
		this.$el.off();
	};

	function init(el, option) { //el:父容器参数；option:自定义参数
		var $el = $(el),
			rating = $el.data('rating'); //一进来就在 data 里面找有没有名字叫 rating 的值

		if (!rating) { //判断如果没有名字叫 rating 的值，表示第一次进来
			$el.data('rating', (rating = new Rating(el, (typeof option === 'object' && option)))); //实例化保存 rating 值
			rating.init();
		}

		if (typeof option === 'string') rating[option](); // 判断如果是字符串，直接将字符串作为方法名来调用
	}

	// jQuery插件
	$.fn.extend({
		rating: function(option) {
			return this.each(function() {
				init(this, option);
			});
		}
	});
})();

$('#rating').rating({
	total: 5,
	num: 2,
	readOnly: false, //只读（true:不可再点击选中）
	select: function(count, total) { //滑过每颗星星
		console.log(this);
		console.log(count + '/' + total);
	},
	chosen: function(count, total) { //鼠标点击(变成只读状态)
		$('#rating').rating('unbindEvent'); //解绑所有事件
	}
});