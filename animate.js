// 一个原生 js 编写的动画插件
// 并已针对 ie 完成兼容性处理
// 
// 使用方法:
// 1. 获取需要作动画处理的对象
// 2. 调用封装函数
//
// 六个参数分别为:
// <处理对象> <处理属性> <期望值>
// <回调函数(可选)> <初始化动画间隔时间(可选)> <初始化动画速率(可选)>
			
// animateJS 动画插件
function animateJS(obj, attr, end, func, animateTime, animateSpeed) {
	// 初始化动画间隔时间 / 初始化动画速率
	var animateTime		= animateTime	|| 10,
		animateSpeed	= animateSpeed	|| 10;
	
	// 动画执行中,每个属性存在一个私有定时器
	clearInterval(obj['timer' + attr]);
	obj['timer' + attr] = setInterval(animate, animateTime);
	
	function animate() {
		// 判断处理属性是否为 opacity
		if (attr == 'opacity') {
			// 解决 opacity 初始值为小数会出现的常见浮点错误
			var start = Math.round(getStyle(obj, attr) * 100)
		} else {
			var start = parseInt(getStyle(obj, attr))
		}
		
		// 根据不同的正负值取得不同的正负 speed
		speed = (end - start) / animateSpeed;
		// 当speed小于1时主动floor or ceil取整,来保证变化的数值为整数
		speed > 0 ? speed = Math.ceil(speed) : speed = Math.floor(speed);
		
		if (end != start) {
			if (attr == 'opacity') {
				start += speed;
				obj.style['opacity']	= start / 100;
				obj.style['filter']		= 'alpha(opcity=' + start + ')';
			} else {
				obj.style[attr]			= start + speed + 'px';
			}
		} else {
			clearInterval(obj['timer' + attr]);
			if (func) {
				// call 改变 this 指向
				func.call(obj)
			}
		}
	}
	
	// getComputedStyle 获取的是最终应用在元素上的所有CSS属性对象
	// currentStyle		获取的是元素当前应用的最终CSS属性值
	// element.style	获取的是元素style属性中的CSS样式
	// dom 标准方法为 getComputedStyle(obj, false)[attr]
	// ie 兼容方法为 obj.currentStyle[attr]
	function getStyle(obj, attr) {
		var result;
		window.getComputedStyle ? result = getComputedStyle(obj, false)[attr] : result = obj.currentStyle[attr];
		return result;
	}
}