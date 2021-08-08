// SELECT ALL ELEMENTS
const optionsDiv = document.querySelector(".options");
const options = document.querySelectorAll(".options .option");
const selectedValue = document.querySelector(".selected_value");
const selectViewButton = document.querySelector(".select_view_button");
const emptyHours = document.querySelector("#empty_hours");
const fullHours = document.querySelector("#full_hours");
const edgeHours = document.querySelector("#edge_hours");
const submitButton = document.querySelector(".submit_button");
const results = document.querySelector(".results");
const simplePrice = document.querySelector(".simple_price");
const bihourlyPrice = document.querySelector(".bihourly_price");
const trihourlyPrice = document.querySelector(".trihourly_price");
const finalResult = document.querySelector(".final_result");
const retryButton = document.querySelector(".retry");

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

	let powerPrice = calculatePowerCost();
	let emptyHoursPrice = emptyHours.value;
	let fullHoursPrice = fullHours.value;
	let edgeHoursPrice = edgeHours.value;

	results.style.visibility = "visible";
	results.scrollIntoView({ behavior: "smooth" });
});

retryButton.addEventListener("click", function (e) {
	e.preventDefault();

	results.style.visibility = "hidden";
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
