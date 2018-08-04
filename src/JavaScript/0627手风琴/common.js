window.onload = function() {
	var acc = document.getElementById('wrapper-accordion'),
		accLi = acc.getElementsByTagName('li');
	for (var a = 0; a < accLi.length; a++) {
		accLi[a].addEventListener('mouseover', function(e) {
			var target = e.target || e.srcElement;
			for (var i = 0; i < accLi.length; i++) {
				accLi[i].className = ''; // 删除选中状态的class
			}
			while (target.tagName != 'LI' || target.tagName == 'BODY') {
				target = target.parentNode;
			}
			target.className = 'accordion-show';
		}, false);
	}
}