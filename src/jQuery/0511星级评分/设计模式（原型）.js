/**
 * 当封装一个函数时，你是在复用代码；而当使用一个设计模式时，你是在复用他人的经验。
 * 百度百科定义：设计模式是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。
 */
/**咖啡
 * 1.boilWater        把水煮沸
 * 2.brewCoffee       用沸水冲泡咖啡
 * 3.pourInCup        把咖啡倒进杯子
 * 4.addSugarAndMilk  加糖和牛奶
 */
var Coffee = function() {} //构造方法
Coffee.prototype.boilWater = function() {
	console.log('把水煮沸');
}
Coffee.prototype.brewCoffee = function() {
	console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup = function() {
	console.log('把咖啡倒进杯子');
}
Coffee.prototype.addSugarAndMilk = function() {
	console.log('加糖和牛奶');
}
Coffee.prototype.init = function() { //【模板方法】算法骨架，子类按何种顺序执行那些方法
	this.boilWater();
	this.brewCoffee();
	this.pourInCup();
	this.addSugarAndMilk();
}
var coffer = new Coffee();
coffer.init();
/**茶
 * 1.boilWater        把水煮沸
 * 2.steepTea         用沸水浸泡茶叶
 * 3.pourInCup        把茶水倒进杯子
 * 4.addLemon         加柠檬
 */
var Tea = function() {} //构造方法
Tea.prototype.boilWater = function() {
	console.log('把水煮沸');
}
Tea.prototype.steepTea = function() {
	console.log('用沸水浸泡茶叶');
}
Tea.prototype.pourInCup = function() {
	console.log('把茶水倒进杯子');
}
Tea.prototype.addLemon = function() {
	console.log('加柠檬');
}
Tea.prototype.init = function() { //【模板方法】算法骨架，子类按何种顺序执行那些方法
	this.boilWater();
	this.steepTea();
	this.pourInCup();
	this.addLemon();
}
var tea = new Tea();
tea.init();