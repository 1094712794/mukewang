/**
 * 第一种：setTimeout 定时器
 */
(function(){
	var loading='<div class="loading-wrapper"><div class="loading"></div></div>';
	$('body').append(loading);//把 loading 添加到 body中
	setTimeout(function(){
		$('.loading-wrapper').fadeOut();//1秒后隐藏
	},1000);
})();

/**
 * 第二种：加载状态事件制作进度条
 */
var loading='<div class="loading-wrapper"><div class="loading"></div></div>';
$('body').append(loading);//把 loading 添加到 body中

document.onreadystatechange=function() {//页面加载状态改变时的事件
	console.log(document.readyState)
	/**返回当前文档的状态
	 * uninitialized:还未开始载入
	 * loading:载入中
	 * interactive:已加载，文档与用户可以开始交互
	 * complete:载入完成
	 */
	if(document.readyState=='complete'){
		$('.loading-wrapper').fadeOut();
	}
}