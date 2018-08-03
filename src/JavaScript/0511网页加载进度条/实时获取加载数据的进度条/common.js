var img = $('img'),
	num = 0;

img.each(function(i) {
	var objImg = new Image();

	objImg.onload = function() {
		objImg.onload = null; //加载之前去掉 onload
		num++;
		$('.loading b').html(parseInt(num / $('img').length * 100) + '%');
		if (img.length >= i + 1) {
			$('.loading-wrapper').fadeOut();
		}
	}

	objImg.src = img[i].src;
});