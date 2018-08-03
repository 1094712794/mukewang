$('.yzm-text').on('click', function() {
	var mthis = $(this);
	if(mthis.hasClass('daojishi')) {

	} else {
		var mhtml = mthis.html(); 
		mthis.addClass('daojishi').html(59 + '秒后重试');
		var t = 59;
		var mSetInterval = setInterval(function() {
			t--;
			mthis.html(t + '秒后重试'); 
			if(t == 0) {
				clearInterval(mSetInterval); 
				mthis.html(mhtml).removeClass('daojishi').html(mhtml);
			}
		}, 1000);
	}
});