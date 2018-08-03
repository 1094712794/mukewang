/**
 * Widget 抽象类
 */
define(function() {
	function Widget() {
		this.dialogBox = null; //最外层容器(属性)
	}

	Widget.prototype = {
		/**
		 * 经典的观察者模式(on fire)
		 */
		on: function(type, handler) { //相当于 document.addEventListener 事件绑定
			if (typeof this.handlers[type] == "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);

			return this; //连缀语法A
		},
		fire: function(type, data) { //事件触发
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i = 0; i < handlers.length; i++) {
					handlers[i](data);
				}
			}
		},
		render: function(container) { //渲染组件(方法)
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.dialogBox);
		},
		destroy: function() { //销毁组件(方法)
			this.destructor();
			this.dialogBox.off();
			this.dialogBox.remove();
		},
		renderUI: function() { //添加 DOM 节点(接口)

		},
		bindUI: function() { //监听事件(接口)

		},
		syncUI: function() { //初始化组件属性(接口)

		},
		destructor: function() { //销毁前的处理函数(接口)

		}
	}

	return {
		Widget: Widget
	}
})