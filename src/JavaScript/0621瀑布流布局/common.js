/**
 * 第一种：JavaScript实现
 */
var imgs = [
	'http://up.enterdesk.com/edpic_source/c6/08/b9/c608b93a685af8e8d3dac2aac7f12b02.jpg',
	'http://pic2.16pic.com/00/04/81/16pic_481228_b.jpg',
	'http://pic13.nipic.com/20110315/5602792_225603691121_2.jpg',
	'http://pic25.nipic.com/20121117/5801365_111107884000_2.jpg',
	'http://pic23.photophoto.cn/20120614/0033034214795411_b.jpg',
	'http://pic38.nipic.com/20140221/5171786_110619908000_2.jpg',
	'http://pic2.16pic.com/00/04/80/16pic_480481_b.jpg',
	'http://pic27.nipic.com/20130315/4113667_111135492000_2.jpg',
	'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/28/cffa590ca64b63ac4294886f823b449c.jpg',
	'http://pic35.photophoto.cn/20150414/0033033949333309_b.jpg',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://pic30.photophoto.cn/20140112/0005018469225014_b.jpg',
	'http://pic2.ooopic.com/10/60/77/67b1OOOPICf2.jpg',
	'http://pic.58pic.com/58pic/11/29/80/40p58PIC5ng.jpg',
	'http://pic.qiantucdn.com/58pic/11/84/05/66c58PICaXn.jpg',
	'http://up.enterdesk.com/edpic_source/c6/08/b9/c608b93a685af8e8d3dac2aac7f12b02.jpg',
	'http://pic2.16pic.com/00/04/81/16pic_481228_b.jpg',
	'http://pic13.nipic.com/20110315/5602792_225603691121_2.jpg',
	'http://pic25.nipic.com/20121117/5801365_111107884000_2.jpg',
	'http://pic23.photophoto.cn/20120614/0033034214795411_b.jpg',
	'http://pic38.nipic.com/20140221/5171786_110619908000_2.jpg',
	'http://pic2.16pic.com/00/04/80/16pic_480481_b.jpg',
	'http://pic27.nipic.com/20130315/4113667_111135492000_2.jpg',
	'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/28/cffa590ca64b63ac4294886f823b449c.jpg',
	'http://pic35.photophoto.cn/20150414/0033033949333309_b.jpg',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://pic30.photophoto.cn/20140112/0005018469225014_b.jpg',
	'http://pic2.ooopic.com/10/60/77/67b1OOOPICf2.jpg',
	'http://pic.58pic.com/58pic/11/29/80/40p58PIC5ng.jpg',
	'http://pic.qiantucdn.com/58pic/11/84/05/66c58PICaXn.jpg',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
];

var html = '';
for (var h = 0; h < imgs.length; h++) {
	html += '<div class="flow-box">' +
		'<div class="flow-pic"><img src="' + imgs[h] + '" /></div>' +
		'</div>';
}
document.getElementById('flow-main').innerHTML = html;

document.onreadystatechange = function() { //页面加载状态改变
	if (document.readyState == 'complete') { //返回当前文档的状态
		waterfall('flow-main', 'flow-box');
		var dataInt = {
			'data': [{
				'src': 'http://pic30.photophoto.cn/20140114/0005018477885911_b.jpg'
			}, {
				'src': 'http://scimg.jb51.net/allimg/160331/14-160331144103T2.jpg'
			}, {
				'src': 'http://pic27.nipic.com/20130315/4113667_111135492000_2.jpg'
			}, {
				'src': 'http://pic30.photophoto.cn/20140226/0020032880214719_b.jpg'
			}, {
				'src': 'http://pic30.photophoto.cn/20140102/0005018428052091_b.jpg'
			}, {
				'src': 'http://down.tutu001.com/d/file/20140828/2689f5c5855071f5b7a7a6f715_560.jpg'
			}, {
				'src': 'http://pic37.nipic.com/20140110/9565044_120157592106_2.jpg'
			}, ]
		};
		window.onscroll = function() {
			if (checkScrollSlide) {
				var oParent = document.getElementById('flow-main'),
					oLen = dataInt.data.length;
				for (var d = 0; d < oLen; d++) {
					// 创建 flow-box 盒子，追加在 flow-main 尾部
					var oBox = document.createElement('div');
					oBox.className = 'flow-box';
					oParent.appendChild(oBox);

					var oPic = document.createElement('div');
					oPic.className = 'flow-pic';
					oBox.appendChild(oPic);

					var oImg = document.createElement('img');
					oImg.src = dataInt.data[d].src;
					oPic.appendChild(oImg);
				}
				waterfall('flow-main', 'flow-box');
			}
		}
	}
}

function waterfall(parent, box) {
	var oParent = document.getElementById(parent),
		oBoxs = getClassObj(oParent, box),
		oBoxW = oBoxs[0].offsetWidth,
		cols = Math.floor(document.documentElement.clientWidth / oBoxW); //计算整个页面显示的列数
	oParent.style.width = oBoxW * cols + 'px';

	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if (i < cols) {
			hArr.push(oBoxs[i].offsetHeight);
		} else {
			// Math.min只能求一组数组中最小值，不能是数组；借助apply:改变函数中this指向
			var minH = Math.min.apply(null, hArr),
				index = getMinhIndex(hArr, minH); //获取数组 hArr 数组中的最小值索引
			console.log(hArr)
			oBoxs[i].style.cssText = 'position:absolute;top:' + minH + 'px;left:' + oBoxs[index].offsetLeft + 'px;';
			hArr[index] += oBoxs[i].offsetHeight;
		}
	}
	console.log(hArr)
}
/**
 * 将所有class为 flow-box 的元素取出来
 */
function getClassObj(parent, clsName) {
	var boxArr = [],
		oElemnts = parent.getElementsByTagName('*');
	for (var f = 0; f < oElemnts.length; f++) {
		if (oElemnts[f].className == clsName) {
			boxArr.push(oElemnts[f]);
		}
	}
	return boxArr;
}
/**
 * 获取数组 hArr 数组中的最小值索引
 */
function getMinhIndex(arr, minH) {
	for (var i in arr) {
		if (arr[i] == minH) {
			return i;
		}
	}
}
/**
 * 检测是否具备了滚动条加载数据块的条件
 */
function checkScrollSlide() {
	var oParent = document.getElementById('flow-main'),
		oBoxs = getClassObj(oParent, 'flow-box'),
		lastH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2),
		scrollTop = document.body.scrollTop || document.documentElement.scrollTop, // 混着模式与标准模式(兼容性)
		height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastH < scrollTop + height) ? true : false;
}

/**
 * 第二种：jquery实现
 */
var imgs = [
	'http://up.enterdesk.com/edpic_source/c6/08/b9/c608b93a685af8e8d3dac2aac7f12b02.jpg',
	'http://pic2.16pic.com/00/04/81/16pic_481228_b.jpg',
	'http://pic13.nipic.com/20110315/5602792_225603691121_2.jpg',
	'http://pic25.nipic.com/20121117/5801365_111107884000_2.jpg',
	'http://pic23.photophoto.cn/20120614/0033034214795411_b.jpg',
	'http://pic38.nipic.com/20140221/5171786_110619908000_2.jpg',
	'http://pic2.16pic.com/00/04/80/16pic_480481_b.jpg',
	'http://pic27.nipic.com/20130315/4113667_111135492000_2.jpg',
	'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/28/cffa590ca64b63ac4294886f823b449c.jpg',
	'http://pic35.photophoto.cn/20150414/0033033949333309_b.jpg',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://pic30.photophoto.cn/20140112/0005018469225014_b.jpg',
	'http://pic2.ooopic.com/10/60/77/67b1OOOPICf2.jpg',
	'http://pic.58pic.com/58pic/11/29/80/40p58PIC5ng.jpg',
	'http://pic.qiantucdn.com/58pic/11/84/05/66c58PICaXn.jpg',
	'http://up.enterdesk.com/edpic_source/c6/08/b9/c608b93a685af8e8d3dac2aac7f12b02.jpg',
	'http://pic2.16pic.com/00/04/81/16pic_481228_b.jpg',
	'http://pic13.nipic.com/20110315/5602792_225603691121_2.jpg',
	'http://pic25.nipic.com/20121117/5801365_111107884000_2.jpg',
	'http://pic23.photophoto.cn/20120614/0033034214795411_b.jpg',
	'http://pic38.nipic.com/20140221/5171786_110619908000_2.jpg',
	'http://pic2.16pic.com/00/04/80/16pic_480481_b.jpg',
	'http://pic27.nipic.com/20130315/4113667_111135492000_2.jpg',
	'http://pic.90sjimg.com/back_pic/qk/back_origin_pic/00/04/28/cffa590ca64b63ac4294886f823b449c.jpg',
	'http://pic35.photophoto.cn/20150414/0033033949333309_b.jpg',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://pic30.photophoto.cn/20140112/0005018469225014_b.jpg',
	'http://pic2.ooopic.com/10/60/77/67b1OOOPICf2.jpg',
	'http://pic.58pic.com/58pic/11/29/80/40p58PIC5ng.jpg',
	'http://pic.qiantucdn.com/58pic/11/84/05/66c58PICaXn.jpg',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
	'http://s16.sinaimg.cn/mw690/0030R7h9zy73tGZ3W35df&690',
];

var html = '';
for (var h = 0; h < imgs.length; h++) {
	html += '<div class="flow-box">' +
		'<div class="flow-pic"><img src="' + imgs[h] + '" /></div>' +
		'</div>';
}
$('#flow-main').html(html);

$(window).on('load', function() {
	waterfall();
	var dataInt = {
		'data': [{
			'src': 'http://pic30.photophoto.cn/20140114/0005018477885911_b.jpg'
		}, {
			'src': 'http://scimg.jb51.net/allimg/160331/14-160331144103T2.jpg'
		}, {
			'src': 'http://pic27.nipic.com/20130315/4113667_111135492000_2.jpg'
		}, {
			'src': 'http://pic30.photophoto.cn/20140226/0020032880214719_b.jpg'
		}, {
			'src': 'http://pic30.photophoto.cn/20140102/0005018428052091_b.jpg'
		}, {
			'src': 'http://down.tutu001.com/d/file/20140828/2689f5c5855071f5b7a7a6f715_560.jpg'
		}, {
			'src': 'http://pic37.nipic.com/20140110/9565044_120157592106_2.jpg'
		}, ]
	};
	$(window).on('scroll', function() {
		if (checkScrollSlide) {
			$.each(dataInt.data, function(index, value) {
				console.log(index)
				var oBox = $('<div>').addClass('flow-box').appendTo($('#flow-main')),
					oPic = $('<div>').addClass('flow-pic').appendTo($(oBox));
				$('<img>').attr('src', $(value).attr('src')).appendTo($(oPic));
			});
			waterfall();
		}
	});
});

function waterfall() {
	var $boxs = $('#flow-main>div'),
		w = $boxs.eq(0).outerWidth(),
		cols = Math.floor($(window).width() / w); //计算整个页面显示的列数
	$('#flow-main').width(w * cols);

	var hArr = [];
	$boxs.each(function(index, el) {
		if (index < cols) {
			hArr[index] = $boxs.eq(index).outerHeight();
		} else {
			// Math.min只能求一组数组中最小值，不能是数组；借助apply:改变函数中this指向
			var minH = Math.min.apply(null, hArr),
				minHIndex = $.inArray(minH, hArr); //判断一个值在数组中出现的索引
			$(el).css({
				'position': 'absolute',
				'top': minH + 'px',
				'left': minHIndex * w + 'px'
			});
			hArr[minHIndex] += $boxs.eq(index).outerHeight();
		}
	});
}
/**
 * 检测是否具备了滚动条加载数据块的条件
 */
function checkScrollSlide() {
	var $lastBox = $('#flow-main>div'),
		lastH = $lastBox.offset().top + Math.floor($lastBox.outerHeight() / 2),
		scrollTop = $(window).scrollTop(),
		height = $(window).height();
	return (lastH < scrollTop + height) ? true : false;
}