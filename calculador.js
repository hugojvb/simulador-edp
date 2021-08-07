// const simples = require("./tarifas/simples");
// const bihorario = require("./tarifas/bihorario");
// const trihorario = require("./tarifas/trihorario");

let options = document.querySelectorAll("#options .option");
let selectedValue = document.querySelector("#selected_value");

options.forEach((element) => {
	if (element.children[0].checked) {
		console.log(element);
	}
	console.log(element.children[0].checked);
});
