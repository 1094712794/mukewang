window.onload = function() {
	if (!document.getElementsByClassName) { // 兼容低版本浏览器(IE)（获取className）
		document.getElementsByClassName = function(cls) {
			var ret = [],
				els = document.getElementsByTagName('*');
			for (var i = 0; i < els.length; i++) {
				// 'aa' 'aa ' 'aa bb' 'aa bb cc'
				if (els[i].className === cls ||
					els[i].className.indexOf(cls + ' ') >= 0 ||
					els[i].className.indexOf(' ' + cls + ' ') >= 0 ||
					els[i].className.indexOf(' ' + cls) >= 0) {
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}

	var cartTable = document.getElementById('cartTable'),
		tr = cartTable.children[1].rows, // rows:表格元素特有的属性存放节点所有tr元素
		checkInputs = document.getElementsByClassName('check'),
		checkAllInputs = document.getElementsByClassName('check-all'),
		selectedTotal = document.getElementById('selectedTotal'),
		priceTotal = document.getElementById('priceTotal');
	selected = document.getElementById('selected'),
		foot = document.getElementById('foot'),
		selectedViewList = document.getElementById('selectedViewList'),
		deleteAll = document.getElementById('deleteAll');

	/**
	 * 全选
	 */
	for (var i = 0; i < checkInputs.length; i++) {
		checkInputs[i].onclick = function() {
			// 全选
			if (this.className === 'check-all check') {
				for (var m = 0; m < checkInputs.length; m++) {
					checkInputs[m].checked = this.checked;
				}
			}
			// 当tr中一个为false，全选为不选中
			if (this.checked == false) {
				for (var n = 0; n < checkAllInputs.length; n++) {
					checkAllInputs[n].checked = false;
				}
			}
			goTotal();
		}
	}
	/**
	 * 也选商品件数
	 */
	selected.onclick = function() {
		if (foot.className === 'foot') {
			if (selectedTotal.innerHTML != 0) {
				foot.className = 'foot show';
			}
		} else {
			foot.className = 'foot';
		}
	}
	/**
	 * 取消选择
	 * 事件代理（ MouseEvent --> srcElement:span ）
	 */
	selectedViewList.onclick = function(e) {
		e = e || window.event;
		var el = e.srcElement;
		if (el.className === 'cancelCom') { //事件代理
			var index = el.getAttribute('index'),
				input = tr[index].getElementsByTagName('input')[0];
			input.checked = false;
			input.onclick();
		}
	}
	/**
	 * 商品数量的加减
	 * 事件代理（ MouseEvent --> srcElement:span ）
	 */
	for (var i = 0; i < tr.length; i++) {
		tr[i].onclick = function(e) {
			e = e || window.event;
			var el = e.srcElement,
				cls = el.className,
				input = this.getElementsByTagName('input')[1],
				val = parseInt(input.value),
				reduce = this.getElementsByClassName('reduce')[0];
			switch (cls) {
				case 'add': //加
					input.value = val + 1;
					reduce.innerHTML = '-';
					getSubTotal(this);
					break;
				case 'reduce': //减
					if (val > 1) {
						input.value = val - 1;
					} else {
						reduce.innerHTML = '';
					}
					getSubTotal(this);
					break;
				case 'delete': //单行删除
					if (confirm('确定删除该商品吗？')) {
						this.parentNode.removeChild(this);
					}
					break;
				default:
					break;
			}
			goTotal();
		}
		// 当使用键盘输入数量计算
		tr[i].getElementsByTagName('input')[1].onkeyup = function() {
			var tr = this.parentNode.parentNode,
				val = parseInt(this.value),
				reduce = tr.getElementsByClassName('reduce')[0];
			if (isNaN(val) || val < 1) {
				val = 1;
			}
			if (val > 1) {
				reduce.innerHTML = '-';
			} else {
				reduce.innerHTML = '';
			}
			this.value = val; //只能为数字

			getSubTotal(tr);
			goTotal();
		}
	}
	/**
	 * 删除已选商品
	 */
	deleteAll.onclick = function() {
		if (selectedTotal.innerHTML != '0') {
			if (confirm('确定删除已选商品吗？')) {
				for (var i = 0; i < tr.length; i++) {
					var input = tr[i].getElementsByTagName('input')[0];
					if (input.checked) {
						tr[i].parentNode.removeChild(tr[i]);
						i--;
					}
				}
			}
		}
	}

	/**
	 * 计算总件数和总价格
	 */
	function goTotal() {
		var selected = 0, // 总数
			price = 0, // 价格
			footHTML = '';
		for (var i = 0; i < tr.length; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) {
				tr[i].className = 'on'; //hover选中状态
				selected += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML); // cells:存放表格每一行下面的所有的单元格，也就是td元素
				footHTML += '<div>' +
					'<img src="' + tr[i].getElementsByTagName('img')[0].src + '" />' +
					'<span class="cancelCom" index="' + i + '">取消选择</span>' +
					'</div>';
			} else {
				tr[i].className = '';
			}
		}
		selectedTotal.innerHTML = selected;
		priceTotal.innerHTML = price.toFixed(2);
		selectedViewList.innerHTML = footHTML; //展示已选商品
		if (selected == 0) { //当已选商品为0时，隐藏展示商品
			foot.className = 'foot';
		}
	}
	/**
	 * 小计价格计算（tr:每一行）
	 */
	function getSubTotal(tr) {
		var tds = tr.cells,
			price = parseFloat(tds[2].innerHTML),
			count = parseInt(tr.getElementsByTagName('input')[1].value),
			subTotal = parseFloat(price * count); // 单价 * 数量
		tds[4].innerHTML = subTotal.toFixed(2);
	}

	/**
	 * 初始进来全部选中
	 */
	// checkAllInputs[0].checked=true;
	// checkAllInputs[0].onclick();

}