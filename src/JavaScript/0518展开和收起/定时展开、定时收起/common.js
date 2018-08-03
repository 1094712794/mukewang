window.onload = function() {
	addHeight();
	setTimeout('subHeight()', 5000);
}

var h = 0;

function addHeight() {
	if (h < 300) { // 300：广告的高度
		h += 5;
		document.getElementById('panel').style.height = h + 'px';
	} else {
		return;
	}
	setTimeout('addHeight()', 30);
}

function subHeight() {
	if (h > 0) { // 300：广告的高度
		h -= 5;
		document.getElementById('panel').style.height = h + 'px';
	} else {
		document.getElementById('panel').style.display = 'none';
		return;
	}
	setTimeout('subHeight()', 30);
}