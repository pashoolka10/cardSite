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
serviceTabs.forEach(function (tab) {
	tab.addEventListener("click", function () {
		var targetId = tab.getAttribute("data-target");

		serviceTabs.forEach(function (t) {
			t.classList.remove("active");
		});
		tab.classList.add("active");

		document.querySelectorAll(".service-panel").forEach(function (panel) {
			panel.classList.remove("active");
		});
		document.getElementById(targetId).classList.add("active");
	});
});

// Переключение стран внутри карточки (Турция / Индия, США / Канада)
var countryTabs = document.querySelectorAll(".country-tabs a");
countryTabs.forEach(function (tab) {
	tab.addEventListener("click", function () {
		var group = tab.closest(".country-tabs");
		group.querySelectorAll("a").forEach(function (t) {
			t.classList.remove("active");
		});
		tab.classList.add("active");
	});
});

// Выбор суммы пополнения кнопками
var presetGroups = document.querySelectorAll(".amount-presets");
presetGroups.forEach(function (group) {
	var buttons = group.querySelectorAll("button");
	var input = group.parentElement.querySelector(".amount-input");

	buttons.forEach(function (btn) {
		btn.addEventListener("click", function () {
			buttons.forEach(function (b) {
				b.classList.remove("picked");
			});
			btn.classList.add("picked");
			if (input) {
				input.value = btn.textContent.replace(/\D/g, "");
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
