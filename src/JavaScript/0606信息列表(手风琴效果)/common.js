/**
 * 第一种：JavaScript实现
 */
function showDL(obj) {
	obj.getElementsByTagName('dl')[0].style.display = 'block';
}

function hideDL(obj) {
	obj.getElementsByTagName('dl')[0].style.display = 'none';
}

/**
 * 第二种：jquery实现
 */
$(document).ready(function() {
	$('.list').on('mouseover', 'li', function() {
		$(this).children('dl').css('display', 'block');
		$(this).children('a').addClass('on');
	});
	$('.list').on('mouseout', 'li', function() {
		$(this).children('dl').css('display', 'none');
		$(this).children('a').removeClass('on');
	});
});