var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});



//=============================================================================================================================
//ActionsOnHash
if (location.hash) {
	const hsh = location.hash.replace('#', '');
	if (document.querySelector('.popup_' + hsh)) {
		popup_open(hsh);
	} else if (document.querySelector('div.' + hsh)) {
		_goto(document.querySelector('.' + hsh), 500, '');
	}
}

//===================BodyLock=======================================================================================================
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//====================================================================================================================================

// LettersAnimation
// let title = document.querySelectorAll('._letter-animation');
// if (title) {
// 	for (let index = 0; index < title.length; index++) {
// 		let el = title[index];
// 		let txt = el.innerHTML;
// 		let txt_words = txt.replace('  ', ' ').split(' ');
// 		let new_title = '';
// 		for (let index = 0; index < txt_words.length; index++) {
// 			let txt_word = txt_words[index];
// 			let len = txt_word.length;
// 			new_title = new_title + '<p>';
// 			for (let index = 0; index < len; index++) {
// 				let it = txt_word.substr(index, 1);
// 				if (it == ' ') {
// 					it = '&nbsp;';
// 				}
// 				new_title = new_title + '<span>' + it + '</span>';
// 			}
// 			el.innerHTML = new_title;
// 			new_title = new_title + '&nbsp;</p>';
// 		}
// 	}
// }


//=====================SearchInList=====================================================================================================
// function search_in_list(input) {
// 	let ul = input.parentNode.querySelector('ul')
// 	let li = ul.querySelectorAll('li');
// 	let filter = input.value.toUpperCase();

// 	for (i = 0; i < li.length; i++) {
// 		let el = li[i];
// 		let item = el;
// 		txtValue = item.textContent || item.innerText;
// 		if (txtValue.toUpperCase().indexOf(filter) > -1) {
// 			el.style.display = "";
// 		} else {
// 			el.style.display = "none";
// 		}
// 	}
// }
//=============DigiFormat===========================================================================================================
// function digi(str) {
// 	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
// 	return r;
// }
//==============DiGiAnimate======================================================================================================
// function digi_animate(digi_animate) {
// 	if (digi_animate.length > 0) {
// 		for (let index = 0; index < digi_animate.length; index++) {
// 			const el = digi_animate[index];
// 			const el_to = parseInt(el.innerHTML.replace(' ', ''));
// 			if (!el.classList.contains('_done')) {
// 				digi_animate_value(el, 0, el_to, 1500);
// 			}
// 		}
// 	}
// }
// function digi_animate_value(el, start, end, duration) {
// 	var obj = el;
// 	var range = end - start;
// 	// no timer shorter than 50ms (not really visible any way)
// 	var minTimer = 50;
// 	// calc step time to show all interediate values
// 	var stepTime = Math.abs(Math.floor(duration / range));

// 	// never go below minTimer
// 	stepTime = Math.max(stepTime, minTimer);

// 	// get current time and calculate desired end time
// 	var startTime = new Date().getTime();
// 	var endTime = startTime + duration;
// 	var timer;

// 	function run() {
// 		var now = new Date().getTime();
// 		var remaining = Math.max((endTime - now) / duration, 0);
// 		var value = Math.round(end - (remaining * range));
// 		obj.innerHTML = digi(value);
// 		if (value == end) {
// 			clearInterval(timer);
// 		}
// 	}

// 	timer = setInterval(run, stepTime);
// 	run();

// 	el.classList.add('_done');
// }

//================SlideToggle=======================================================================================================
let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//=============Wrap===========================
// function _wrap(el, wrapper) {
// 	el.parentNode.insertBefore(wrapper, el);
// 	wrapper.appendChild(el);
// }
//==================RemoveClasses======================
// function _removeClasses(el, class_name) {
// 	for (var i = 0; i < el.length; i++) {
// 		el[i].classList.remove(class_name);
// 	}
// }
//===========IsHidden=============================
// function _is_hidden(el) {
// 	return (el.offsetParent === null)
// }
//==============Animate==========================
// function animate({ timing, draw, duration }) {
// 	let start = performance.now();
// 	requestAnimationFrame(function animate(time) {
// 		// timeFraction изменяется от 0 до 1
// 		let timeFraction = (time - start) / duration;
// 		if (timeFraction > 1) timeFraction = 1;

// 		// вычисление текущего состояния анимации
// 		let progress = timing(timeFraction);

// 		draw(progress); // отрисовать её

// 		if (timeFraction < 1) {
// 			requestAnimationFrame(animate);
// 		}

// 	});
// }
// function makeEaseOut(timing) {
// 	return function (timeFraction) {
// 		return 1 - timing(1 - timeFraction);
// 	}
// }
// function makeEaseInOut(timing) {
// 	return function (timeFraction) {
// 		if (timeFraction < .5)
// 			return timing(2 * timeFraction) / 2;
// 		else
// 			return (2 - timing(2 * (1 - timeFraction))) / 2;
// 	}
// }
// function quad(timeFraction) {
// 	return Math.pow(timeFraction, 2)
// }
// function circ(timeFraction) {
// 	return 1 - Math.sin(Math.acos(timeFraction));
// }
/*
animate({
	duration: 1000,
	timing: makeEaseOut(quad),
	draw(progress) {
		window.scroll(0, start_position + 400 * progress);
	}
});*/

//Полифилы
// (function () {
// 	// проверяем поддержку
// 	if (!Element.prototype.closest) {
// 		// реализуем
// 		Element.prototype.closest = function (css) {
// 			var node = this;
// 			while (node) {
// 				if (node.matches(css)) return node;
// 				else node = node.parentElement;
// 			}
// 			return null;
// 		};
// 	}
// })();
// (function () {
// 	// проверяем поддержку
// 	if (!Element.prototype.matches) {
// 		// определяем свойство
// 		Element.prototype.matches = Element.prototype.matchesSelector ||
// 			Element.prototype.webkitMatchesSelector ||
// 			Element.prototype.mozMatchesSelector ||
// 			Element.prototype.msMatchesSelector;
// 	}
// })();

