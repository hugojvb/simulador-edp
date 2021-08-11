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

// SELECT DEFAULT VALUE TO 3.45
selectedValue.innerHTML = options[2].children[1].innerHTML;

// CHANGE SELECT CLICK LISTENERS
options.forEach((element) => {
	element.addEventListener("click", function (e) {
		selectedValue.innerHTML = element.children[1].innerHTML;
	});
});

// CLOSE SELECT MOUSE UP LISTENER
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

	// GET MATCHING POWER PRICE
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

// VALIDATE INPUTS
const validateInputs = () => {
	// RESET INPUTS
	emptyHours.style.border = "1px solid #ddd";
	fullHours.style.border = "1px solid #ddd";
	edgeHours.style.border = "1px solid #ddd";

	// EMPTY INPUTS HIGHLIGHT
	if (emptyHours.value.length === 0) {
		emptyHours.style.border = "1px solid var(--primary-color)";
	}

	if (fullHours.value.length === 0) {
		fullHours.style.border = "1px solid var(--primary-color)";
	}

	if (edgeHours.value.length === 0) {
		edgeHours.style.border = "1px solid var(--primary-color)";
	}

	// CANCEL IF ANY INPUT IS EMPTY
	if (emptyHours.value.length === 0 || fullHours.value.length === 0 || edgeHours.value.length === 0) return false;

	return true;
};

// CALCULATE CONSUMPTION PRICE
const calculatePrices = () => {
	// GET SELECTED POWER
	const power = +selectedValue.innerHTML;

	// DECLARE SUMS
	let simpleSum, bihourlySum, trihourlySum;

	// CALCULATE SUMS
	if (power <= 20.7) {
		simpleSum = (+emptyHours.value + +fullHours.value + +edgeHours.value) * simples[0].energyPrice;
	}

	if (power >= 3.45 && power <= 20.7) {
		bihourlySum = +emptyHours.value * bihorario[0].emptyHours + (+fullHours.value + +edgeHours.value) * bihorario[0].nonEmptyHours;
	}

	if (power >= 27.6) {
		trihourlySum =
			+emptyHours.value * trihorario[8].emptyHours + +fullHours.value * trihorario[8].fullHours + +edgeHours.value * trihorario[8].edgeHours;
	} else if (power >= 3.45) {
		trihourlySum =
			+emptyHours.value * trihorario[0].emptyHours + +fullHours.value * trihorario[0].fullHours + +edgeHours.value * trihorario[0].edgeHours;
	}

	return { simpleSum, bihourlySum, trihourlySum };
};

// CALCULATE CLICK
submitButton.addEventListener("click", function (e) {
	e.preventDefault();

	// FOCUS BUTTON
	e.target.focus();

	// CALCULATE POWER PRICE
	const powerPrice = calculatePowerCost();

	// VALIDATE INPUTS
	if (!validateInputs()) return;

	// CALCULATE PRICES
	const { simpleSum, bihourlySum, trihourlySum } = calculatePrices();

	// PRICES DISPLAY
	simplePrice.innerHTML = simpleSum ? "€" + Math.round((powerPrice + simpleSum) * 100) / 100 : "N/A";
	bihourlyPrice.innerHTML = bihourlySum ? "€" + Math.round((powerPrice + bihourlySum) * 100) / 100 : "N/A";
	trihourlyPrice.innerHTML = trihourlySum ? "€" + Math.round((powerPrice + trihourlySum) * 100) / 100 : "N/A";

	// FILTER VALID PLANS
	let simpleFiltered = Infinity,
		bihourlyFiltered = Infinity,
		trihourlyFiltered = Infinity;

	if (Boolean(+simplePrice?.innerHTML.substr(1))) simpleFiltered = +simplePrice?.innerHTML.substr(1);
	if (Boolean(+bihourlyPrice?.innerHTML.substr(1))) bihourlyFiltered = +bihourlyPrice?.innerHTML.substr(1);
	if (Boolean(+trihourlyPrice?.innerHTML.substr(1))) trihourlyFiltered = +trihourlyPrice?.innerHTML.substr(1);

	// CHEAPEST PRICE
	const bestPrice = Math.min(simpleFiltered, bihourlyFiltered, trihourlyFiltered);

	// CHEAPEST PLAN DISPLAY
	finalResult.innerHTML =
		bestPrice == +simplePrice.innerHTML.substr(1) ? "Simples" : bestPrice == +bihourlyPrice.innerHTML.substr(1) ? "Bi-Horária" : "Tri-Horária";

	// RESULTS DISPLAY
	results.style.display = "flex";
	results.scrollIntoView({ behavior: "smooth" });
});

// RETRY CLICK
retryButton.addEventListener("click", function (e) {
	// INPUTS RESET
	emptyHours.value = "";
	fullHours.value = "";
	edgeHours.value = "";

	// SELECT RESET
	selectedValue.innerHTML = options[2].children[1].innerHTML;
	options[2].children[0].checked = true;

	// SCROLL TO TOP
	window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

	// HIDE RESULTS
	setTimeout(() => {
		// PRICES RESET
		simplePrice.innerHTML = "";
		bihourlyPrice.innerHTML = "";
		trihourlyPrice.innerHTML = "";

		results.style.display = "none";
	}, 750);
});
