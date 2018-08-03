/**
 * 第一种：全部展开
 */
function showPanel(obj) {
	var abstr = obj.parentNode, //摘要；parentNode:
		con = abstr.nextSibling; //正文；nextSibling:返回每个元素之后紧跟的元素（处于同一树层级）

	if (con.nodeType != 1) { //为了兼容选择 数值常量 nodeType 的返回值，判断节点类型
		con = con.nextSibling;
	}

	abstr.style.display = 'none';
	con.style.display = "block";
}

function hidePanel(obj) {
	var con = obj.parentNode.parentNode, //正文
		abstr = con.previousSibling; //摘要；previousSibling:返回每个节点之前紧跟的节点（处于同一树层级）

	if (abstr.nodeType != 1) { //为了兼容选择 数值常量 nodeType 的返回值，判断节点类型
		abstr = abstr.previousSibling;
	}

	abstr.style.display = 'block';
	con.style.display = 'none';
}


/**
 * 第二种：当前展开其他收起
 */
function showPanel(obj) {
	init();

	var abstr = obj.parentNode, //摘要；parentNode:
		con = nextSiblingNode(abstr.nextSibling); //正文；nextSibling:返回每个元素之后紧跟的元素（处于同一树层级）

	abstr.style.display = 'none';
	con.style.display = "block";
}

function hidePanel(obj) {
	var con = obj.parentNode.parentNode, //正文
		abstr = previousSiblingNode(con.previousSibling); //摘要；previousSibling:返回每个节点之前紧跟的节点（处于同一树层级）

	abstr.style.display = 'block';
	con.style.display = 'none';
}

function init() {
	var contentList = document.querySelectorAll(".content");

	for (var i = 0; i < contentList.length; i++) {
		contentList[i].style.display = 'none'; //隐藏所有文章的内容
		previousSiblingNode(contentList[i].previousSibling).style.display = 'block' //显示 全文按钮
	}
}

function previousSiblingNode(obj) {
	while (obj.nodeType != 1) { //为了兼容选择 数值常量 nodeType 的返回值，判断节点类型
		obj = obj.previousSibling;
	}
	return obj;
}

function nextSiblingNode(obj) {
	while (obj.nodeType != 1) { //为了兼容选择 数值常量 nodeType 的返回值，判断节点类型
		obj = obj.nextSibling;
	}
	return obj;
}