// 1. 数据定义
var data=[
	{img:1,h1:'h1 第一张',h2:'h2 第一张'},
	{img:2,h1:'h1 第二张',h2:'h2 第二张'},
	{img:3,h1:'h1 第三张',h2:'h2 第三张'},
	{img:4,h1:'h1 第四张',h2:'h2 第四张'},
	{img:5,h1:'h1 第五张',h2:'h2 第五张'},
	{img:6,h1:'h1 第六张',h2:'h2 第六张'},
	{img:7,h1:'h1 第七张',h2:'h2 第七张'},
];
window.onload=function(){
	addSliders();
	switchSlider(1);
	setTimeout(function(){
		movePictures();
	}, 100);
}

/**
 * 2. 通过函数
 */
function getDom(id){
	// 通过 ClassName 获取元素
	if(id.substr(0,1)=='.'){
		return document.getElementsByClassName(id.substr(1));
	}
	return document.getElementById(id);
}
/**
 * 3. 添加幻灯片的操作(所有幻灯片&对应的按钮)
 */
function addSliders(){
	// 获取模板。 replace(/^\s*/,'') 去掉前空格  replace(/\s*$/,'') 去掉后空格
	var tplm=getDom('tamlape-main-slider').innerHTML.replace(/^\s*/,'').replace(/\s*$/,''),
		tplc=getDom('ctrl-slider').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
	//定义最终输出 HTML 变量
	var outm=[],
		outc=[];
	for(i in data){//遍历数据，构建最终输出的 HTML
		// replace(/{{index}}/g,data[i].img) 把所有的index替换成img
		var _htmlm=tplm
					.replace(/{{index}}/g,data[i].img)
					.replace(/{{h1}}/g,data[i].h1)
					.replace(/{{h2}}/g,data[i].h2)
					.replace(/{{css}}/g,['','main-item-slider_right'][i%2]);//产生一个随机数(从不同的方向切入)
		var	_htmlc=tplc
					.replace(/{{index}}/g,data[i].img);
		outm.push(_htmlm);
		outc.push(_htmlc);
	}
	// 把 HTML 写到对应的 DOM 里
	getDom('tamlape-main-slider').innerHTML=outm.join('');
	getDom('ctrl-slider').innerHTML=outc.join('');

	// 解决切换时背景有空白的问题；增加 #main_background
	getDom('tamlape-main-slider').innerHTML += tplm
					.replace(/{{index}}/g,'{{index}}')
					.replace(/{{h1}}/g,data[i].h1)
					.replace(/{{h2}}/g,data[i].h2);
	getDom('main-item-slider_{{index}}').id='main_background';
}
/**
 * 4. 幻灯片切换
 */
function switchSlider(n){
	// 获得要展现的幻灯片&控制按钮 DOM
	var main=getDom('main-item-slider_'+n),
		ctrl=getDom('strl-item-slider_'+n);
	// 获得所有的幻灯片以及控制按钮
	var clearm=getDom('.main-item-slider'),
		clearc=getDom('.strl-item-slider');
	for(var i=0;i<clearc.length;i++){//清楚 active 样式
		clearm[i].className=clearm[i].className.replace(' main-item-slider_active','');
		clearc[i].className=clearc[i].className.replace(' strl-item-slider_active','');
	} 
	main.className += ' main-item-slider_active';
	ctrl.className += ' strl-item-slider_active';

	// 切换时，复制上一张幻灯片到 main_background 中
	setTimeout(function(){
		getDom('main_background').innerHTML=main.innerHTML;
	}, 800);
}
/**
 * 6. 动态调整图片的 margin-top 使其垂直居中
 */
function movePictures(){
	var pictures=getDom('.slider-picture');
	for(var i=0;i<pictures.length;i++){
		pictures[i].style.marginTop = (-1*pictures[i].clientHeight/2)+'px';
	}
}