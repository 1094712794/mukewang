(function() { //立即执行的匿名函数【闭包】
	var Menubar = function() { // 菜单项构造函数
		this.el = document.querySelector('#slidebar ul');
		this.state = 'allClosed';
		this.el.addEventListener('click', function(e) {
			e.stopPropagation();
		});
		var self = this; //使用闭包保存变量(this指向)
		this.currentOpendMenuContent = null;

		this.menuList = document.querySelectorAll('#slidebar ul > li');
		for (var i = 0; i < this.menuList.length; i++) {
			this.menuList[i].addEventListener('click', function(e) { //获得每一个(li)菜单项的元素
				var menuContentEl = document.getElementById(e.currentTarget.id + '-content'); //内容主题ID
				if (self.state === 'allClosed') {
					console.log('打开' + menuContentEl.id);
					menuContentEl.style.display = 'block';
					menuContentEl.style.top = '0';
					menuContentEl.style.left = '-70px';
					menuContentEl.className = 'slidebar-content';
					menuContentEl.classList.add('menuContent-move-right'); //向内容中添加 class
					//保存状态
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				} else {
					console.log('关闭' + self.currentOpendMenuContent.id);
					self.currentOpendMenuContent.style.display = 'none';
					self.currentOpendMenuContent.style.top = '0';
					self.currentOpendMenuContent.style.left = '50px';
					self.currentOpendMenuContent.classList.add('menuContent-move-left');

					console.log('打开' + menuContentEl.id);
					menuContentEl.style.display = 'block';
					menuContentEl.style.top = '250px';
					menuContentEl.style.left = '50px';
					menuContentEl.className = 'slidebar-content';
					menuContentEl.classList.add('menuContent-move-up');
					//保存状态
					self.state = 'hasOpened';
					self.currentOpendMenuContent = menuContentEl;
				}
			});
		};

		this.menuContentList = document.querySelectorAll('.slidebar-content .slidebar-content-close');
		for (var i = 0; i < this.menuContentList.length; i++) {
			this.menuContentList[i].addEventListener('click', function(e) { //获得 content 下的每一个“<”关闭按钮
				var menuContent = e.currentTarget.parentNode.parentNode;
				menuContent.style.display = 'none';
				self.state = 'allClosed';
			});
		}
	};
	Menubar.prototype.close = function() { //关闭全部 content
		this.currentOpendMenuContent.style.display = 'none';
		this.state = 'allClosed';
	};


	var Slidebar = function(eId, closeBarId) { // 构造函数
		this.state = 'opened';
		this.el = document.getElementById(eId || 'slidebar');
		this.closeBarEl = document.getElementById(closeBarId || 'slidebar-close');

		var self = this;
		this.el.addEventListener('click', function(event) { //获取到点击的 “ X ”
			if (event.target !== self.el) {
				self.triggerSwich();
			}
		});
	};

	Slidebar.prototype.close = function() {
		console.log('关闭slidebar')
		menubar.currentOpendMenuContent && menubar.close();

		this.el.style.left = '0';
		this.el.className = 'slidebar slidebar-move-left';
		this.closeBarEl.style.left = '0';
		this.closeBarEl.className = 'slidebar-close slidebar-close-right';
		this.state = 'closed';
	};
	Slidebar.prototype.open = function() {
		console.log('打开slidebar')
		this.el.style.left = '-120px';
		this.el.className = 'slidebar slidebar-move-right';
		this.closeBarEl.style.left = '160px';
		this.closeBarEl.className = 'slidebar-close slidebar-close-left';
		this.state = 'opened';
	};
	Slidebar.prototype.triggerSwich = function() {
		if (this.state === 'opened') {
			this.close();
		} else {
			this.open();
		}
	};
	var menubar = new Menubar(),
		slidebar = new Slidebar();
})();