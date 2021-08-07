// SELECT ALL ELEMENTS
const optionsDiv = document.querySelector(".options");
const options = document.querySelectorAll(".options .option");
const selectedValue = document.querySelector(".selected_value");
const submitButton = document.querySelector(".submit_button");
const selectViewButton = document.querySelector(".select_view_button");

// POWER SELECT DEFAULT VALUE TO 3.45
selectedValue.innerHTML = options[2].children[1].innerHTML;

// CLICK LISTENERS TO CHANGE SELECT
options.forEach((element) => {
	element.addEventListener("click", function (e) {
		selectedValue.innerHTML = element.children[1].innerHTML;
	});
});

// MOUSE UP LISTENER TO CLOSE POWER SELECT
window.addEventListener("mouseup", function (e) {
	if (e.target != optionsDiv) {
		selectViewButton.checked = false;
	}
	calculatePowerCost();
});

// CALCULATE THE COST OF THE POWER ALONE
const calculatePowerCost = () => {
	const power = +selectedValue.innerHTML;
	let powerPrice;
	if (power < 3.45) {
		powerPrice = simples.forEach((current) => (power == current.power ? current.powerPrice : 0));
	} else if (power >= 3.45) {
		powerPrice = trihorario.forEach((current) => (power == current.power ? current.powerPrice : 0));
	}

	return 30 * powerPrice;
};

// SUBMIT FORM
submitButton.addEventListener("click", function (e) {
	e.preventDefault();
});
