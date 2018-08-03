window.onload = function() {
	showTime();

	function showTime() {
		var mDate = new Date(),
			year = mDate.getFullYear(),
			month = mDate.getMonth() + 1,
			date = mDate.getDate(),
			day = mDate.getDay(),
			hour = mDate.getHours(),
			minutes = mDate.getMinutes(),
			second = mDate.getSeconds();

		if (month < 10) month = '0' + month;
		if (date < 10) date = '0' + date;
		if (hour < 10) hour = '0' + hour;
		if (minutes < 10) minutes = '0' + minutes;
		if (second < 10) second = '0' + second;


		var weekday = new Array(7);
		weekday[0] = '星期天';
		weekday[1] = '星期一';
		weekday[2] = '星期二';
		weekday[3] = '星期三';
		weekday[4] = '星期四';
		weekday[5] = '星期五';
		weekday[6] = '星期六';

		document.getElementById('date').innerHTML = year + '年' + month + '月' + date + '日\t\t' + weekday[day] + '\t\t' + hour + ':' + minutes + ':' + second;

		setInterval(showTime, 1000);
	}

}