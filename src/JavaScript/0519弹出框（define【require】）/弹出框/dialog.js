/**
 * define：模块
 * 参数1：模块标识，可以省略
 * 参数2：模块的实现，或者一个JavaScript对象
 */
define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {
	function Dialog() { //构造方法
		this.cfg = {
			width: 500,
			height: 300,
			title: '系统消息',
			content: '',
			hasClose: false, //X关闭
			hasMask: true, //遮罩层
			isDraggable: true, //拖动弹框
			dragHandler: null, //把手(控制拖动区域,如:拖动header区域)
			skinClassName: null, //dialog皮肤
			dialogOK: '确定',
			handlerOK: null, //OK函数
			handlerClose: null, //关闭函数

			confirmOK:'确定',
			cancelText:'取消',
			handlerConfirmOK:null,
			handlerCancel:null,

			promptOK:'确定',
			isPromptInputPws:false, //设置 input 是否为 password 类型
			defaultValuePrompt:'', //设置 input 默认值
			maxLengthPromptInput:10,
			handlerPrompt:null
		};
	}
	/**
	 * 继承 widget(父类) 的方法
	 * $.extend:将一个或多个对象的内容合并到目标对象
	 */
	Dialog.prototype = $.extend({}, new widget.Widget(), {
		renderUI: function() { //添加 DOM 节点
			var footerContent='';
			switch (this.cfg.winType) {
				case 'dialog'://(alert)
					footerContent='<input type="button" value="'+this.cfg.dialogOK+'" class="dialog-OK"/>'
					break;
				case 'confirm':
					footerContent='<input type="button" value="'+this.cfg.confirmOK+'" class="confirm-OK"/>'+
								'<input type="button" value="'+this.cfg.cancelText+'" class="cpcancel-btn"/>';
					break;
				case 'prompt':
					this.cfg.content +='<div class="dialog-wrapper">'+
											'<input class="prompt-input" type="'+
											(this.cfg.isPromptInputPws?'password':'text')+'" value="'+
											this.cfg.defaultValuePrompt+'" maxlength="'+
											this.cfg.maxLengthPromptInput+'"/>'+
										'</div>';
					footerContent='<input type="button" value="'+this.cfg.promptOK+'" class="prompt-OK"/>'+
								'<input type="button" value="'+this.cfg.cancelText+'" class="cpcancel-btn"/>';
					break;
			}
			// 创建 dialog 弹框
			this.dialogBox = $('<div class="dialog-box">'+
								'<div class="dialog-content">'+this.cfg.content+'</div>'+
							'</div>');
			if (this.cfg.winType != 'common') {
				this.dialogBox.prepend('<div class="dialog-header">' + this.cfg.title + '</div>');
				this.dialogBox.append('<div class="dialog-footer">' + footerContent + '</div>');
			}
			// 遮罩层
			if (this.cfg.hasMask) {
				this._mask = $('<div class="window-mask"></div>');
				this._mask.appendTo('body');
			}
			// 关闭
			if (this.cfg.hasClose) {
				this.dialogBox.append('<div class="dialog-close">X</div>')
			}
			this.dialogBox.appendTo(document.body);
			this._promptInput=this.dialogBox.find('.prompt-input');
		},
		bindUI: function() { //监听事件
			var that = this;
			that.dialogBox.delegate('.dialog-OK', 'click', function() { //OK
				that.fire('dialog');
				that.destroy();
			}).delegate('.dialog-close', 'click', function() { //关闭“X”
				that.fire('close');
				that.destroy();
			}).delegate('.confirm-OK', 'click', function() {
				that.fire('confirm');
				that.destroy();
			}).delegate('.cpcancel-btn', 'click', function() {
				that.fire('cancel');
				that.destroy();
			}).delegate('.prompt-OK', 'click', function() {
				that.fire('prompt',that._promptInput.val());
				that.destroy();
			});
			// alert
			if (that.cfg.handlerOK) {
				that.on('dialog', that.cfg.handlerOK);
			}
			if (that.cfg.handlerClose) {
				that.on('close', that.cfg.handlerClose);
			}
			// confirm
			if (that.cfg.handlerConfirmOK) {
				that.on('confirm', that.cfg.handlerConfirmOK);
			}
			if (that.cfg.handlerCancel) {
				that.on('cancel', that.cfg.handlerCancel);
			}
			// prompt
			if (that.cfg.handlerPrompt) {
				that.on('prompt', that.cfg.handlerPrompt);
			}
		},
		syncUI: function() { //初始化组件属性
			this.dialogBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
			});
			// 添加类
			if (this.cfg.skinClassName) {
				this.dialogBox.addClass(this.cfg.skinClassName);
			}
			// 拖动弹框
			if (this.cfg.isDraggable) {
				if (this.cfg.dragHandler) {
					this.dialogBox.draggable({
						handle: this.cfg.dragHandler,
						containment: "window" //禁止拖出边界
					});
				} else {
					this.dialogBox.draggable(); // draggable:jquery-ui.js
				}
			}
		},
		destructor: function() { //销毁前的处理函数
			this._mask && this._mask.remove();
		},
		alert: function(cfg) {
			$.extend(this.cfg, cfg, {winType:'dialog'});
			this.render();
			return this; //连缀语法
		},
		confirm: function(cfg) {
			$.extend(this.cfg, cfg, {winType:'confirm'});
			this.render();
			return this; 
		},
		prompt: function(cfg) {
			$.extend(this.cfg, cfg, {winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this; 
		},
		common:function(cfg){
			$.extend(this.cfg, cfg, {winType:'common'});
			this.render();
			return this; 
		}
	})

	return {
		Dialog: Dialog
	}
})