/**
 * [paths description] zhangyuhong 2018/8/1
 * @type {Object}
 */
require.config({
	paths: {
		jquery: 'jquery-2.1.0',
		// jqueryUI:'jquery-ui',
		jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
	}
});

require(['jquery', 'dialog'], function($, w) {
	$('#alertShow').click(function() {
		new w.Dialog().alert({
			title: '提示',
			content: 'hello',
			width: 300,
			height: 150,
			hasClose: true, //X关闭(是否显示)
			dialogOK: 'OK',
			dragHandler: '.dialog-header', //把手(控制拖动区域,如:拖动header区域)
			handlerOK: function() { //OK函数
				alert('OK hello word');
			},
			handlerClose: function() { //关闭函数
				alert('close');
			},
			skinClassName: 'dialog-box2', //dialog皮肤
			hasMask: true, //遮罩层
		}).on('dialog', function() {
			alert('【OK】the second alert handler');
		}).on('close', function() {
			alert('【close】the second alert handler');
		});
	});

	$('#confirmShow').click(function() {
		new w.Dialog().confirm({
			title: '提示',
			content: '确定删除这个文件吗？',
			width: 300,
			height: 150,
			confirmOK: '是',
			cancelText: '否',
			dragHandler: '.dialog-header',
		}).on('confirm', function() {
			alert('确定');
		}).on('cancel', function() {
			alert('取消');
		});
	});

	$('#promptShow').click(function() {
		new w.Dialog().prompt({
			title: '请输入你的名字',
			content: '我们将为你保密你输入的信息',
			width: 300,
			height: 150,
			promptOK: '输入',
			cancelText: '取消',
			defaultValuePrompt: '张三',
			dragHandler: '.dialog-header',
			handlerPrompt: function(val) {
				alert('value为：' + val)
			},
			handlerCancel: function() {
				alert('取消')
			}
		});
	});

	$('#dialogShow').click(function() {
		new w.Dialog().common({
			content: '内容',
			width: 300,
			height: 150,
			hasClose:true,
			dragHandler: '.dialog-header',
		})
	});

});