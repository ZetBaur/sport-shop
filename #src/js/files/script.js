// ===============Catalog-filter===================================================================================

const elem = document.querySelector('.grid');
const iso = new Isotope(elem, {
	// options
	itemSelector: '.grid-item',
	filter: '.sportsart'
});


// =============Catalog-filter active class to current element=========================================

let filterBtns = document.getElementsByClassName("catalog-filter__button");

for (let i = 0; i < filterBtns.length; i++) {
	filterBtns[i].addEventListener("click", function () {

		let current = document.getElementsByClassName("active");

		current[0].className = current[0].className.replace(" active", "");

		this.className += " active";

		const filterName = filterBtns[i].getAttribute('data-filter');

		iso.arrange({
			filter: `.${filterName}`
		});
	});
}



// ======================================================================================================================

let catalogBurger = document.querySelector('.catalog-section__burger');
let catalogBody = document.querySelector('.catalog-section__list');

catalogBurger.addEventListener('click', function () {
	catalogBurger.classList.toggle('_active');
	_slideToggle(catalogBody);
});

//=================Menu=========================================================================================================
let burger = document.querySelector(".burger");
let menu = document.querySelector(".header__nav-row");
let menuClose = document.querySelector(".menu-close");
let delay = 500;

if (menu != null) {
	burger.addEventListener("click", function (e) {
		body_lock(delay);
		menu.classList.add("open");
	});
};
menuClose.addEventListener("click", function (e) {
	menu.classList.remove("open");
});


// ==============================ibg=============================================================================================

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}

let unlock = true;



//==============Tabs==================================================================================================================
// let tabs = document.querySelectorAll("._tabs");
// for (let index = 0; index < tabs.length; index++) {
// 	let tab = tabs[index];
// 	let tabs_items = tab.querySelectorAll("._tabs-item");
// 	let tabs_blocks = tab.querySelectorAll("._tabs-block");
// 	for (let index = 0; index < tabs_items.length; index++) {
// 		let tabs_item = tabs_items[index];
// 		tabs_item.addEventListener("click", function (e) {
// 			for (let index = 0; index < tabs_items.length; index++) {
// 				let tabs_item = tabs_items[index];
// 				tabs_item.classList.remove('_active');
// 				tabs_blocks[index].classList.remove('_active');
// 			}
// 			tabs_item.classList.add('_active');
// 			tabs_blocks[index].classList.add('_active');
// 			e.preventDefault();
// 		});
// 	}
// }
//==================Spollers==================================================================================================================
let spollers = document.querySelectorAll("._spoller");
let spollersGo = true;
if (spollers.length > 0) {
	for (let index = 0; index < spollers.length; index++) {
		const spoller = spollers[index];
		spoller.addEventListener("click", function (e) {
			if (spollersGo) {
				spollersGo = false;
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				_slideToggle(spoller.nextElementSibling);

				setTimeout(function () {
					spollersGo = true;
				}, 500);
			}
		});
	}
}



//==============Popups===============================================================================================================
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});