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

// CHANGE SELECT CLICK LISTENERS
options.forEach((element) => {
	element.addEventListener("click", function (e) {
		selectedValue.innerHTML = element.children[1].innerHTML;
	});
});

// CLOSE POWER SELECT MOUSE UP LISTENER
window.addEventListener("mouseup", function (e) {
	if (e.target != optionsDiv) {
		selectViewButton.checked = false;
	}
});

// COST OF THE POWER CALCULATION
const calculatePowerCost = () => {
	// GET SELECTED POWER
	const power = +selectedValue.innerHTML;

	// INITIATE POWER PRICE
	let powerPrice = 0;

	// GET FITTING POWER PRICE
	if (power < 3.45) {
		simples.forEach((current) => {
			if (power == current.power) powerPrice = current.powerPrice;
		});
	} else if (power >= 3.45) {
		trihorario.forEach((current) => {
			if (power == current.power) powerPrice = current.powerPrice;
		});
	}

	return 30 * powerPrice;
};

// RESULTS CALCULATION
submitButton.addEventListener("click", function (e) {
	e.preventDefault();

	// CALCULATE POWER PRICE
	const powerPrice = calculatePowerCost();

	// GET CONSUMPTION VALUES
	const emptyHoursSpending = +emptyHours.value;
	const fullHoursSpending = +fullHours.value;
	const edgeHoursSpending = +edgeHours.value;

	// VALIDATION
	if (!emptyHoursSpending.value || !fullHoursSpending.value || !edgeHoursSpending.value) return;

	// CALCULATE CONSUMPTION PRICE
	const simpleSum = (emptyHoursSpending + fullHoursSpending + edgeHoursSpending) * simples[0].energyPrice;
	const bihourlySum = emptyHoursSpending * bihorario[0].emptyHours + (fullHoursSpending + edgeHoursSpending) * bihorario[0].nonEmptyHours;
	const trihourlySum =
		emptyHoursSpending * trihorario[0].emptyHours + fullHoursSpending * trihorario[0].fullHours + edgeHoursSpending * trihorario[0].edgeHours;

	// PRICES DISPLAY
	simplePrice.innerHTML = "€" + Math.round((powerPrice + simpleSum) * 100) / 100;
	bihourlyPrice.innerHTML = "€" + Math.round((powerPrice + bihourlySum) * 100) / 100;
	trihourlyPrice.innerHTML = "€" + Math.round((powerPrice + trihourlySum) * 100) / 100;

	// CHEAPEST PRICE
	const bestPrice = Math.min(+simplePrice.innerHTML, +bihourlyPrice.innerHTML, +trihourlyPrice.innerHTML);

	// CHEAPEST PLAN DISPLAY
	finalResult.innerHTML = bestPrice == +simplePrice.innerHTML ? "Simples" : bestPrice == +bihourlyPrice.innerHTML ? "Bi-Horário" : "Tri-Horário";

	// RESULTS DISPLAY
	results.style.display = "flex";
	results.scrollIntoView({ behavior: "smooth" });
});

// RETRY CLICK
retryButton.addEventListener("click", function (e) {
	// SELECT RESET
	selectedValue.innerHTML = options[2].children[1].innerHTML;

	// PRICES RESET
	simplePrice.innerHTML = "";
	bihourlyPrice.innerHTML = "";
	trihourlyPrice.innerHTML = "";

	// INPUTS RESET
	emptyHours.value = "";
	fullHours.value = "";
	edgeHours.value = "";

	// HIDE RESULTS
	results.style.display = "none";
});
