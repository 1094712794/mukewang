window.onload = function() {
	showTime();

	function showTime() {
		var curTime = new Date(), //当前时间
			endTime = new Date('2018,10,1,00:00:00'); //结束时间

		// 1天=24小时   1小时=60分钟   1分钟=60秒   1秒=1000毫秒 
		var time = parseInt((endTime.getTime() - curTime.getTime()) / 1000),
			day = parseInt(time / (24 * 60 * 60)), //天
			hour = parseInt(time / (60 * 60) % 24), //小时
			minutes = parseInt(time / 60 % 60), //分
			second = parseInt(time % 60); //秒

		if (day < 10) day = '0' + day;
		if (hour < 10) hour = '0' + hour;
		if (minutes < 10) minutes = '0' + minutes;
		if (second < 10) second = '0' + second;

		document.getElementById('time').innerHTML = day + '天' + hour + '小时' + minutes + '分' + second + '秒';
		if (time <= 0) {
			document.getElementById('time').innerHTML = '团购结束';
		}

		setTimeout(showTime, 1000);
	}

}