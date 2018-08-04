/**
 * 定义一系列算法，一个个封装起来，并且可以相互替换
 */
var strategies = {
	S: function(salary) {
		return salary * 4;
	},
	A: function(salary) {
		return salary * 3;
	},
	B: function(salary) {
		return salary * 2;
	},
};

function calculateBonus(level, salary) {
	return strategies[level](salary);
}
calculateBonus('S', 2000);