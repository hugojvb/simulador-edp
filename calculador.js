// const simples = require("./tarifas/simples");
// const bihorario = require("./tarifas/bihorario");
// const trihorario = require("./tarifas/trihorario");

const options = document.querySelectorAll("#options .option");
const selectedValue = document.querySelector("#selected_value");
const submit_button = document.querySelector(".submit_button");

options.forEach((element) => {
	if (element.children[0].checked) selectedValue.innerHTML = element.innerText;
	element.addEventListener("click", function (e) {
		console.log(element.children[0].value);
	});
});

// SUBMIT FORM
submit_button.addEventListener("click", function (e) {
	e.preventDefault();
});
