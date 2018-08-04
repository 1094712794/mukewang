/**
 * ==================== 第一种：设计模式写法：模板方法模式【点击之后，可点击】 ====================
 */
/**
 * e.pageX            星星的一半（中心）距离屏幕左边的距离
 * $().offset().left  整颗星星（左边）距离屏幕左边的距离
 * e.pageX - $().offset().left=半颗星
 * 半颗星的宽度=$().width()/2
 */
/*
var rating = (function() { //自我执行的匿名函数 【闭包】
	// 《点亮整颗》
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

	// 《点亮半颗星星》
	var LightHalf = function(el, options) { //构造函数
		this.$el = $(el);
		this.$item = this.$el.find('.rating-item');
		this.opts = options;
		this.add = 1;
	};
	// 方法都写在原型上，这样保证不管你实例化多少次，内存中都只有一份
	LightHalf.prototype.init = function() {
		this.lightOn(this.opts.num); //初始进来点亮星星数
		if (!this.opts.readOnly) { //当不是只读，才执行绑定事件
			this.bindEvent(); //绑定事件
		}
	};
	LightHalf.prototype.lightOn = function(num) { //点亮星星
		var count = parseInt(num),
			isHalf = count !== num; //传入进来是小数点亮的是半颗，是整数点亮的书整颗

		this.$item.each(function(index) {
			if (count > index) {
				$(this).css('background-position', '0 -33px');
			} else {
				$(this).css('background-position', '0 0');
			}
		});

		if (isHalf) { //true，点亮为半颗
			this.$item.eq(count).css('background-position', '0 -66px');
		}
	};
	LightHalf.prototype.bindEvent = function() { //绑定事件
		var self = this,
			itemLength = self.$item.length;
		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		self.$el.on('mousemove', '.rating-item', function(e) {
			var $this = $(this),
				num = 0;
			if (e.pageX - $this.offset().left < $this.width() / 2) { //半颗星星
				self.add = 0.5;
			} else { //整颗星星
				self.add = 1;
			}

			num = $this.index() + self.add;

			self.lightOn(num);

			// 判断是否为函数，前面函数执行后面的《call改变this指向，指向当前星星》
			(typeof self.opts.select === 'function') && self.opts.select.call(this, num, itemLength);
			// 触发相应事件，触发事件在 $el 绑定事件上
			self.$el.trigger('select', [num, itemLength]);
		}).on('click', '.rating-item', function() {
			self.opts.num = $(this).index() + self.add; //上面 mousemove 中是半颗星星还整颗星星也改变，这里不用再判断

			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
			self.$el.trigger('select', [self.opts.num, itemLength]);
		}).on('mouseout', '.rating-item', function() {
			self.lightOn(self.opts.num);
		});
	};

	// 默认参数
	var defaults = {
		mode: 'LightEntire', //设计模式中的模式（默认是整颗星星）
		num: 0, //默认点亮星星个数
		readOnly: false, //是否只读
		select: function() { //鼠标移上去执行的方法

		},
		chosen: function() { //点击某颗星星(如ajax请求)

		},
	};
	var mode = {
		'LightEntire': LightEntire,
		'LightHalf': LightHalf
	};

	function init(el, options) {
		// 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		// 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		options = $.extend({}, defaults, options);

		if (!mode[options.mode]) { // 当传入进来的模式是错误的情况
			options.mode = 'LightEntire'; //不存在设置一个默认值（整颗）
		}
		new mode[options.mode](el, options).init(); //实例化模式（设计模式）
	}

	return {
		init: init
	}
})();
rating.init('#rating', {
	mode: 'LightHalf', // LightEntire:整颗  LightHalf:半颗
	num: 2.5,
});
*/

/**
 * ==================== 第二种：设计模式写法：模板方法模式（抽象出父类）【点击之后，不可点击】 ====================
 */
/**
 * e.pageX            星星的一半（中心）距离屏幕左边的距离
 * $().offset().left  整颗星星（左边）距离屏幕左边的距离
 * e.pageX - $().offset().left=半颗星
 * 半颗星的宽度=$().width()/2
 */
/*
var rating = (function() { //自我执行的匿名函数 【闭包】
	// 继承
	var extend = function(subClass, superClass) { // 一条一条的原型链
		var F = function() {};
		F.prototype = superClass.prototype;
		subClass.prototype = new F();
		subClass.prototype.construtor = subClass;
	};
	// 《点亮》
	var Light = function(el, options) { //构造函数
		this.$el = $(el);
		this.$item = this.$el.find('.rating-item');
		this.opts = options;
		this.add = 1;
		this.selectEvent = 'mouseover';
	};
	// 方法都写在原型上，这样保证不管你实例化多少次，内存中都只有一份
	Light.prototype.init = function() {
		this.lightOn(this.opts.num); //初始进来点亮星星数
		if (!this.opts.readOnly) { //当不是只读，才执行绑定事件
			this.bindEvent(); //绑定事件
		}
	};
	Light.prototype.lightOn = function(num) { //点亮星星
		num = parseInt(num); //如果传进来是小数，强制转换为小数
		this.$item.each(function(index) {
			if (num > index) {
				$(this).css('background-position', '0 -33px');
			} else {
				$(this).css('background-position', '0 0');
			}
		});
	};
	Light.prototype.bindEvent = function() { //绑定事件
		var self = this,
			itemLength = self.$item.length;
		// 鼠标移入/点击/移出 ---> 事件委托(使用事件冒泡原理)
		self.$el.on(self.selectEvent, '.rating-item', function(e) {
			var $this = $(this),
				num = 0;

			self.select(e, $this);

			num = $(this).index() + self.add;

			self.lightOn(num);

			// 判断是否为函数，前面函数执行后面的《call改变this指向，指向当前星星》
			(typeof self.opts.select === 'function') && self.opts.select.call(this, num, itemLength);
			// 触发相应事件，触发事件在 $el 绑定事件上
			self.$el.trigger('select', [num, itemLength]);
		}).on('click', '.rating-item', function() {
			self.opts.num = $(this).index() + self.add;

			(typeof self.opts.chosen === 'function') && self.opts.chosen.call(this, self.opts.num, itemLength);
			self.$el.trigger('select', [self.opts.num, itemLength]);
		}).on('mouseout', '.rating-item', function() {
			self.lightOn(self.opts.num);
		});
	};
	Light.prototype.select = function() {
		throw new Error('子类必须重写此方法');
	};
	Light.prototype.unbindEvent = function() {
		this.$el.off(); //解绑所有
	};


	// 《点亮整颗》
	var LightEntire = function(el, options) { //构造函数
		Light.call(this, el, options); //继承父类的构造函数
		this.selectEvent = 'mouseover';
	};

	extend(LightEntire, Light); //继承子类方法的原型

	LightEntire.prototype.lightOn = function(num) { //点亮星星
		Light.prototype.lightOn.call(this, num); //call改变this指向，指向当前星星
	};
	LightEntire.prototype.select = function() {
		self.add = 1;
	};

	// 《点亮半颗星星》
	var LightHalf = function(el, options) { //构造函数
		Light.call(this, el, options); //继承父类的构造函数
		this.selectEvent = 'mousemove';
	};

	extend(LightHalf, Light); //继承子类方法的原型

	LightHalf.prototype.lightOn = function(num) { //点亮星星
		var count = parseInt(num),
			isHalf = count !== num; //传入进来是小数点亮的是半颗，是整数点亮的书整颗

		Light.prototype.lightOn.call(this, count); //call改变this指向，指向当前星星

		if (isHalf) { //true，点亮为半颗
			this.$item.eq(count).css('background-position', '0 -66px');
		}
	};
	LightHalf.prototype.select = function(e, $this) {
		if (e.pageX - $this.offset().left < $this.width() / 2) { //半颗星星
			this.add = 0.5;
		} else { //整颗星星
			this.add = 1;
		}
	};

	// 默认参数
	var defaults = {
		mode: 'LightEntire', //设计模式中的模式（默认是整颗星星）
		num: 0, //默认点亮星星个数
		readOnly: false, //是否只读
		select: function() { //鼠标移上去执行的方法

		},
		chosen: function() { //点击某颗星星(如ajax请求)

		},
	};
	var mode = {
		'LightEntire': LightEntire,
		'LightHalf': LightHalf
	};

	function init(el, option) {
		// 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		// 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		var $el = $(el),
			rating = $el.data('rating'), //存不存在 rating
			options = $.extend({}, defaults, typeof option === 'object' && option); //判断是否为对象，否则忽略掉

		if (!mode[options.mode]) { // 当传入进来的模式是错误的情况
			options.mode = 'LightEntire'; //不存在设置一个默认值（整颗）
		}

		if (!rating) { //当 rating 不存在
			$el.data('rating', (rating = new mode[options.mode](el, options))); //实例化模式保存起来，名字叫 rating 
			rating.init(); //实例化模式（设计模式）
		}
		if (typeof option === 'string') { //如果为字符串
			rating[option](); //方法
		}
	}

	return {
		init: init
	}
})();
rating.init('#rating', {
	mode: 'LightHalf', // LightEntire:整颗  LightHalf:半颗
	num: 2.5,
	chosen: function() { //选中
		rating.init('#rating', 'unbindEvent'); //传 unbindEvent 字符串，解绑
	}
});
*/

/**
 * ==================== 第三种：策略模式写法：策略模式（jQuery插件）【点击之后，不可点击】 ====================
 */
(function() { //自我执行的匿名函数【闭包】
	/*策略模式*/
	var strategies = {
		entire: function() { //点亮整颗
			return 1;
		},
		half: function() { //点亮半颗
			return 2;
		},
	};

	/*el:评分的父容器；options:自定义参数*/
	var Rating = function(el, options) { //构造函数
		/*将参数保存成属性*/
		this.$el = $(el); //将 el 转换成jquery对象保存下来
		/**
		 * 当用户传递的时候使用用户传递的，当用户没有传递使用默认的。
		 * 用 options 内容覆盖 defaults 的内容，将生成的内容放在 {} 空对象中，并且把 {} 空对象返回出来，再将生成的内容返回 options 保存
		 */
		this.opts = $.extend({}, Rating.DEFAULTS, options);

		/**
		 * 《半颗星星》
		 */
		if (!strategies[this.opts.mode]) { //判断没在 entire(整颗) 、 half(半颗) 两种策略模式情况
			this.opts.mode = 'entire';
		}
		this.ratio = strategies[this.opts.mode]();

		this.opts.total *= this.ratio;
		this.opts.num *= this.ratio;

		this.itemWidth = 33 / this.ratio; //星星默认宽度
		this.displayWidth = this.opts.num * this.itemWidth //展示层默认的宽度(几颗星星 * 星星的宽度)
	};

	Rating.DEFAULTS = { //默认参数
		mode: 'entire', //策略模式选择(整颗、半颗)
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
	mode: 'half', //entire(整颗) 、 half(半颗)
	total: 5,
	num: 2,
	readOnly: false, //只读（true:不可再点击选中）
	select: function(count, total) { //滑过每颗星星
		// console.log(this);
		console.log(count + '/' + total);
	},
	chosen: function(count, total) { //鼠标点击(变成只读状态)
		$('#rating').rating('unbindEvent'); //解绑所有事件
	}
});