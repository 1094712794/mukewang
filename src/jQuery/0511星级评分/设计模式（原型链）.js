// ===================== 原型链（子类重写父类的方法） =====================
/**分离共同点
 * 1.咖啡和茶不同，抽象出 ‘饮料’ Beverage
 * 2.把水煮沸
 * 3.泡的方式不同，抽象成 ‘泡’ brew
 * 4.加的调料不同，抽象成 ‘调料’ addConiments
 */
var Beverage = function() {}
Beverage.prototype.boilWater = function() {
	console.log('把水煮沸');
}
Beverage.prototype.brew = function() {
	throw new Error('子类必须重写该方法')
}
Beverage.prototype.pourInCup = function() {
	throw new Error('子类必须重写该方法')
}
Beverage.prototype.addConiments = function() {
	throw new Error('子类必须重写该方法')
}
Beverage.prototype.curtomerWatersCondiments = function() { //钩子方法（客户需不需要调料）
	return true;
}
Beverage.prototype.init = function() {
	this.boilWater();
	this.brew();
	this.pourInCup();
	if (this.curtomerWatersCondiments()) {
		this.addConiments();
	}
}


// 咖啡
var Coffee = function() {} //构造方法
Coffee.prototype.brew = function() {
	console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function() {
	console.log('把咖啡倒进杯子');
}
Coffee.prototype.addConiments = function() {
	console.log('加糖和牛奶');
}
Coffee.prototype.curtomerWatersCondiments = function() {
	return window.confirm('请问需要加调料吗？');
}

Coffee.prototype = new Beverage();
var coffer = new Coffee();
coffer.init();

// 茶
var Tea = function() {} //构造方法
Tea.prototype.brew = function() {
	console.log('用沸水浸泡茶叶');
}
Tea.prototype.pourInCup = function() {
	console.log('把茶水倒进杯子');
}
Tea.prototype.addConiments = function() {
	console.log('加柠檬');
}
Tea.prototype.curtomerWatersCondiments = function() {
	return window.confirm('请问需要加调料吗？');
}

Tea.prototype = new Beverage();
var tea = new Tea();
tea.init();