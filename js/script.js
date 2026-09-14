// Открытие/закрытие выпадающего меню в шапке сайта
var menuBtn = document.getElementById("menuBtn");
var dropdownMenu = document.getElementById("dropdownMenu");

if (menuBtn) {
	menuBtn.addEventListener("click", function () {
		dropdownMenu.classList.toggle("open");
	});

	document.addEventListener("click", function (event) {
		var clickInsideMenu = dropdownMenu.contains(event.target);
		var clickOnButton = menuBtn.contains(event.target);
		if (!clickInsideMenu && !clickOnButton) {
			dropdownMenu.classList.remove("open");
		}
	});
}

// Переключение вкладок услуг (Steam / PlayStation / Apple)
var serviceTabs = document.querySelectorAll(".service-tabs a");

function openServiceTab(tab) {
	var targetId = tab.getAttribute("data-target");

	serviceTabs.forEach(function (t) {
		t.classList.remove("active");
	});
	tab.classList.add("active");

	document.querySelectorAll(".service-panel").forEach(function (panel) {
		panel.classList.remove("active");
	});
	document.getElementById(targetId).classList.add("active");
}

serviceTabs.forEach(function (tab) {
	tab.addEventListener("click", function () {
		openServiceTab(tab);
	});
});

// Открытие нужной вкладки по ссылке с якорем, например services.html#ps
if (serviceTabs.length) {
	var hash = window.location.hash.replace("#", "");
	if (hash) {
		var matchingTab = document.querySelector('.service-tabs a[data-hash="' + hash + '"]');
		if (matchingTab) {
			openServiceTab(matchingTab);
		}
	}
}

// Переключение стран внутри карточки (Турция / Индия, США / Канада)
// вместе со сменой валюты в кнопках выбора суммы
var countryTabs = document.querySelectorAll(".country-tabs a");
countryTabs.forEach(function (tab) {
	tab.addEventListener("click", function () {
		var group = tab.closest(".country-tabs");
		group.querySelectorAll("a").forEach(function (t) {
			t.classList.remove("active");
		});
		tab.classList.add("active");

		var currency = tab.getAttribute("data-currency");
		var amountsAttr = tab.getAttribute("data-amounts");
		if (currency && amountsAttr) {
			var amounts = amountsAttr.split(",");
			var panel = tab.closest(".service-panel");
			var presetButtons = panel.querySelectorAll(".amount-presets button");

			presetButtons.forEach(function (btn, index) {
				if (amounts[index]) {
					btn.setAttribute("data-amount", amounts[index]);
					btn.textContent = amounts[index] + " " + currency;
					btn.classList.remove("picked");
				}
			});

			var input = panel.querySelector(".amount-input");
			if (input) {
				input.value = "";
			}
		}
	});
});

// Выбор суммы пополнения кнопками
var presetGroups = document.querySelectorAll(".amount-presets");
presetGroups.forEach(function (group) {
	var input = group.parentElement.querySelector(".amount-input");

	group.querySelectorAll("button").forEach(function (btn) {
		btn.addEventListener("click", function () {
			group.querySelectorAll("button").forEach(function (b) {
				b.classList.remove("picked");
			});
			btn.classList.add("picked");
			if (input) {
				input.value = btn.getAttribute("data-amount") || btn.textContent.replace(/\D/g, "");
			}
		});
	});
});

// Кнопка "Купить" — учебный макет, реальной оплаты нет
var buyButtons = document.querySelectorAll(".buy-btn");
buyButtons.forEach(function (btn) {
	btn.addEventListener("click", function (event) {
		event.preventDefault();
		alert("Это учебный проект. Оплата не подключена.");
	});
});
