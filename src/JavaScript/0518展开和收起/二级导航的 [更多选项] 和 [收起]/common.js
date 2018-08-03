function showPenel() {
	document.getElementById('panel').style.display = 'block';
	document.getElementById('option').innerHTML = '收起';
	document.getElementById('option').href = "javascript:hidePenel()";
}

function hidePenel() {
	document.getElementById('panel').style.display = 'none';
	document.getElementById('option').innerHTML = '更多选项';
	document.getElementById('option').href = "javascript:showPenel()";
}