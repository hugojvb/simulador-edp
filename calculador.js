// const simples = require("./tarifas/simples");
// const bihorario = require("./tarifas/bihorario");
// const trihorario = require("./tarifas/trihorario");

const optionsDiv = document.querySelector("#options");
const options = document.querySelectorAll("#options .option");
const selectedValue = document.querySelector("#selected_value");
const submitButton = document.querySelector(".submit_button");
const selectViewButton = document.querySelector("#select_view_button");

selectedValue.innerHTML = options[2].children[1].innerHTML;
console.log(options[2].children[1]);

options.forEach((element) => {
	element.addEventListener("click", function (e) {
		selectedValue.innerHTML = element.children[1].innerHTML;
	});
});

window.addEventListener("mouseup", function (e) {
	if (e.target != optionsDiv) {
		selectViewButton.checked = false;
	}
});

// SUBMIT FORM
submitButton.addEventListener("click", function (e) {
	e.preventDefault();
});
