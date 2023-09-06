let priceSlider = document.getElementById('priceRange');
let thcSlider = document.getElementById('thcRange');
let cbdSlider = document.getElementById('cbdRange');

noUiSlider.create(priceSlider, {
	start: [0, 2340],
	step: 1,
	connect: true,
	tooltips: true,
	format: {
		from: function (value) {
			return parseInt(value);
		},
		to: function (value) {
			return parseInt(value);
		}
	},
	range: {
		'min': 0,
		'max': 9999
	}
});

noUiSlider.create(thcSlider, {
	start: 65,
	step: 1,
	connect: [true, false],
	tooltips: true,
	format: {
		from: function (value) {
			return parseInt(value);
		},
		to: function (value) {
			return parseInt(value);
		}
	},
	range: {
		'min': 0,
		'max': 100
	}
});
noUiSlider.create(cbdSlider, {
	start: 65,
	step: 1,
	connect: [true, false],
	tooltips: true,
	format: {
		from: function (value) {
			return parseInt(value);
		},
		to: function (value) {
			return parseInt(value);
		}
	},
	range: {
		'min': 0,
		'max': 100
	}
});

let minPrice = priceSlider.querySelector('.noUi-handle-lower');
let minPriceText = document.getElementById('priceMin');
let maxPrice = priceSlider.querySelector('.noUi-handle-upper');
let maxPriceText = document.getElementById('priceMax');

let maxThc = thcSlider.querySelector('.noUi-handle-lower');
let maxThcText = document.getElementById('thcMax');

let maxCbd = cbdSlider.querySelector('.noUi-handle-lower');
let maxCbdText = document.getElementById('cbdMax');

minPriceText.innerHTML = minPrice.getAttribute('aria-valuetext') + ' $';
maxPriceText.innerHTML = maxPrice.getAttribute('aria-valuetext') + ' $';
maxThcText.innerHTML = maxThc.getAttribute('aria-valuetext') + ' %';
maxCbdText.innerHTML = maxCbd.getAttribute('aria-valuetext') + ' %';

priceSlider.noUiSlider.on('update', function () {
	minPriceText.innerHTML = minPrice.getAttribute('aria-valuetext') + ' $';
	maxPriceText.innerHTML = maxPrice.getAttribute('aria-valuetext') + ' $';
})

thcSlider.noUiSlider.on('update', function () {
	maxThcText.innerHTML = maxThc.getAttribute('aria-valuetext') + ' %';
})

cbdSlider.noUiSlider.on('update', function () {
	maxCbdText.innerHTML = maxCbd.getAttribute('aria-valuetext') + ' %';
})

// filters
let filtersGroup = document.querySelectorAll('.filters__group');
filtersGroup.forEach(function (group) {
	let groupHead = group.querySelector('.filters__name');

	groupHead.addEventListener('click', function () {
		group.classList.toggle('active');
		let groupList = group.querySelector('.filters__list');
		if (groupList.style.maxHeight) {
			groupList.style.maxHeight = null;
		} else {
			groupList.style.maxHeight = groupList.scrollHeight + 'px';
		}
	})

	groupHead.click();
})

let filtersInputs = document.getElementsByClassName('filters__input');

for (let i = 0; i < filtersInputs.length; i++) {
	filtersInputs[i].addEventListener('change', function () {
		if (filtersInputs[i].hasAttribute('checked')) {
			filtersInputs[i].removeAttribute('checked')
		} else {
			filtersInputs[i].setAttribute('checked', 'checked')
		}

		let title = filtersInputs[i].value;
		if (filtersInputs[i].hasAttribute('checked')) {
			addFilter(title);
		} else {
			removeFilter(title);
		}
		let setList = document.querySelectorAll('.search-setting__name');
		if (setList.length > 0) {
			setList.forEach(item => {
				item.parentNode.addEventListener('click', function () {
					removeFilterBtn(item.innerText)
				})
			})
		}
	})
}

function addFilter(name) {
	let settingList = document.querySelector('.search-setting__list');
	let li = document.createElement('li');
	let p = document.createElement('p');
	let close = document.createElement('div');

	li.classList.add('search-setting__item');
	p.classList.add('search-setting__name');
	close.classList.add('search-setting__btn');

	p.innerText = name;

	li.append(p);
	li.append(close);
	settingList.append(li);
}

function removeFilter(name) {
	let settingList = document.querySelector('.search-setting__list');
	let filtersName = settingList.getElementsByClassName('search-setting__name');
	for (let i = 0; i < filtersName.length; i++) {
		if (name == filtersName[i].innerText) {
			filtersName[i].parentNode.remove();
		}
	}
}

function removeFilterBtn(name) {
	let checkFilters = document.querySelectorAll('input[checked="checked"]');

	checkFilters.forEach(checkbox => {
		if (name == checkbox.value) {
			checkbox.removeAttribute('checked');
			removeFilter(name);
		}
	})
}

let sortBtn = document.querySelector('.sort-set__btn');
let sortBody = document.querySelector('.sort-set__body');
sortBtn.addEventListener('click', function () {
	sortBody.classList.toggle('active')
})

