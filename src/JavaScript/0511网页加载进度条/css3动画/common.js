document.onreadystatechange = function() { //页面加载状态改变时的事件
	console.log(document.readyState)
	/**返回当前文档的状态
	 * uninitialized:还未开始载入
	 * loading:载入中
	 * interactive:已加载，文档与用户可以开始交互
	 * complete:载入完成
	 */
	if (document.readyState == 'complete') {
		$('.loading-wrapper').fadeOut();
	}
}