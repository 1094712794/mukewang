window.onload = function() {
	var curTime = new Date(), //当前时间
		endTime = new Date('2018,10,1'); //结束时间

	// 1天=24小时   1小时=60分钟   1分钟=60秒   1秒=1000毫秒 
	document.getElementById('diff').innerHTML = Math.ceil((endTime.getTime() - curTime.getTime()) / (24 * 60 * 60 * 1000));
}