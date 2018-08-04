window.onload = function() {
	var regInputName = getDom('regInputName'),
		regNameHint = getDom('regNameHint'),
		regNumber = getDom('regNumber'),
		regInputPass = getDom('regInputPass'),
		regPassHint = getDom('regPassHint'),
		pGrade1 = getDom('passwordGrade').getElementsByClassName('grade')[1],
		pGrade2 = getDom('passwordGrade').getElementsByClassName('grade')[2],
		regInputPassword = getDom('regInputPassword'),
		regPasswordHint = getDom('regPasswordHint');
	var nameLen = 0; //会员名长度

	/**用户名正则表达式
	 * 数字、字母(不区分大小写)【\w(a-zA-Z0-9)】、汉字【\u4e00-\u9fa5】、下划线
	 * 5~25字符，推荐使用中文会员名
	 */
	regInputName.onfocus = function() { //得到焦点
		regNameHint.innerHTML = '5~25个字符，一个汉字为两个字符，推荐使用中文会员名';
	}
	regInputName.onkeyup = function() { //键盘输入
		nameLen = getStrLen(this.value);
		regNumber.innerHTML = nameLen + '个字符';
		if (nameLen == 0) {
			regNumber.innerHTML = '';
		}
	}
	regInputName.onblur = function() { // 失去焦点
		var reName = /[^\w\u4e00-\u9fa5]/g;
		if (reName.test(this.value)) { //含有非法字符；test：测试正则表达式的匹配，返回布尔值
			regNameHint.innerHTML = '含有非法字符！';
			regNameFn(this);
		} else if (this.value == '') { //不能为空
			regNameHint.innerHTML = '不能为空！';
			regNameFn(this);
		} else if (nameLen < 5) { //小于5个字符
			regNameHint.innerHTML = '小于5个字符！';
			regNameFn(this);
		} else if (nameLen > 25) { //大于25个字符
			regNameHint.innerHTML = '大于25个字符！';
			regNameFn(this);
		} else { //OK
			regNameHint.innerHTML = 'OK！';
			this.className = '';
			regNameHint.className = 'register-hint';
		}
	}
	function regNameFn(t) {
		t.className = 'promptBorder';
		regNameHint.className += ' promptColor';
	}

	/**
	 * 密码 
	 */
	regInputPass.onfocus = function() {
		regPassHint.innerHTML = '6~16个字符，请使用字母加数字或符号的组合密码，不能单独使用字母、数字或符号';
	}
	regInputPass.onkeyup = function() {
		var len = this.value.length
		if (len > 5) {
			pGrade1.className += ' current';
			regInputPassword.removeAttribute('disabled');
			regInputPassword.className = '';
			regPasswordHint.innerHTML = '请再输入一次';
		} else {
			pGrade1.className = 'grade';
			regInputPassword.setAttribute('disabled', 'true');
			regInputPassword.className = 'regInputPassword';
			regPasswordHint.innerHTML = '';
		}

		if (len > 10) {
			pGrade2.className += ' current';
		} else {
			pGrade2.className = 'grade';
		}
	}
	regInputPass.onblur = function() {
		var val = this.value,
			m = findStr(val, val[0]),
			reNum = /[^\d]/g, //全不为数字
			reText = /[^a-zA-Z]/g; //全不为字母

		if (val.length == 0) { // 不能为空
			regPassHint.innerHTML = '不能为空！';
			regPassFn(this);
		} else if (m == val.length) { // 不能用相同字符
			regPassHint.innerHTML = '不能用相同字符！';
			regPassFn(this);
		} else if (val.length < 6) { // 长度应为6~16个字符
			regPassHint.innerHTML = '长度应为6个字符！';
			regPassFn(this);
		} else if (val.length > 16) {
			regPassHint.innerHTML = '长度应为16个字符！';
			regPassFn(this);
		} else if (!reNum.test(val)) { // 不能全为数字
			regPassHint.innerHTML = '不能全为数字！';
			regPassFn(this);
		} else if (!reText.test(val)) { // 不能全为字母
			regPassHint.innerHTML = '不能全为字母！';
			regPassFn(this);
		} else { // OK
			regPassHint.innerHTML = 'OK！';
			this.className = '';
			regPassHint.className = 'register-hint';
		}
	}
	function regPassFn(t) {
		t.className = 'promptBorder';
		regPassHint.className += ' promptColor';
	}

	/**
	 * 确认密码
	 */
	regInputPassword.onblur = function() {
		if (this.value != regInputPass.value) {
			regPasswordHint.innerHTML = '两次输入的密码不一致！';
			this.className = 'promptBorder';
			regPasswordHint.className += ' promptColor';
		} else {
			regPasswordHint.innerHTML = 'OK！';
			this.className = '';
			regPasswordHint.className = 'register-hint';
		}
	}

	/**
	 * 字节长度（一个英文字母或数字为1一个字符，一个汉字2个字符）
	 */
	function getStrLen(str) {
		// replace(/[^\x00-xff]/g,'xx')  \x00-xff:单字节
		return str.replace(/[^\x00-xff]/g, 'xx').length;
	}
	/**不能用相同字符
	 * 参数1：输入的字符串
	 * 参数2：对比的字符
	 */
	function findStr(str, n) {
		var tmp = 0;
		for (var i = 0; i < str.length; i++) {
			if (str.charAt(i) == n) {
				tmp++;
			}
		}
		return tmp;
	}
}

function getDom(id) {
	return document.getElementById(id);
}