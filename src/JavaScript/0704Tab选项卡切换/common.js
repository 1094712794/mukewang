/**
 * 功能一：鼠标滑过切换 + 点击切换
 */
window.onload = function() {
	var tabNav = getDom('tab-nav').getElementsByTagName('li'),
		tabCon = getDom('tab-content').getElementsByTagName('li');

	if (tabNav.length != tabCon.length) return;

	for (var n = 0; n < tabNav.length; n++) {
		tabNav[n].id = n;
		// ++++++++++++++++ onclick ++++++++++++++++ 
		tabNav[n].onmouseover = function() {
			for (var t = 0; t < tabNav.length; t++) {//清除所有 li 上的 class
				tabNav[t].className='';
				tabCon[t].style.display='none';
			}
			this.className='tab-nav-active';//添加当前高亮显示
			tabCon[this.id].style.display='block';
		}
	}
}
function getDom(id) {
	return document.getElementById(id);
}

/**
 * 功能二：延迟切换
 */
window.onload = function() {
	var timer=null;
	var tabNav = getDom('tab-nav').getElementsByTagName('li'),
		tabCon = getDom('tab-content').getElementsByTagName('li');

	if (tabNav.length != tabCon.length) return;

	for (var n = 0; n < tabNav.length; n++) {
		tabNav[n].id = n;
		tabNav[n].onmouseover = function() {
			var that=this;
			if(timer){
				clearTimeout(timer);
				timer=null;
			}
			timer=setTimeout(function(){
				for (var t = 0; t < tabNav.length; t++) { //清除所有 li 上的 class
					tabNav[t].className = '';
					tabCon[t].style.display = 'none';
				}
				tabNav[that.id].className = 'tab-nav-active'; //添加当前高亮显示
				tabCon[that.id].style.display = 'block';
			}, 500);
		}
	}
}
function getDom(id) {
	return document.getElementById(id);
}

/**
 * 功能三：自动切换
 */
window.onload = function() {
	var tabNav = getDom('tab-nav').getElementsByTagName('li'),
		tabCon = getDom('tab-content').getElementsByTagName('li');
	var timer=null,
		index=0;

	if (tabNav.length != tabCon.length) return;

	for(var n=0;n<tabNav.length;n++){
		tabNav[n].id=n;
		tabNav[n].onmouseover=function(){
			clearInterval(timer);
			changTab(this.id);
		}
		tabNav[n].onmouseout=function(){
			timer=setInterval(autoPlay, 2000);
		}
	}

	if(timer){//解决频繁切换出现卡顿或者多次执行的 bug
		clearInterval(timer);
		timer=null;
	}

	timer=setInterval(autoPlay, 2000);

	/**
	 * 启动切换
	 */
	function autoPlay(){
		index++;
		if(index>=tabNav.length){
			index=0;
		}
		changTab(index);
	}
	/**
	 * 设置高亮
	 */
	function changTab(curIndex){
		for(var t=0;t<tabNav.length;t++){//清除所有 li 上的 class
			tabNav[t].className='';
			tabCon[t].style.display='none';
		}
		tabNav[curIndex].className='tab-nav-active';//添加当前高亮显示
		tabCon[curIndex].style.display='block';

		index=curIndex;//解决自动切换到对应 index ，鼠标移上去在移开继续切换的bug 
	}
}
function getDom(id) {
	return document.getElementById(id);
}