(() => {
	let islaVista = new IslandChainModel({});
	console.log('island chain model:', islaVista);
	const islandView = new IslandChainViewer(islaVista, 'isla-vista');
	islandView.render();

	// TODO encapsulate function
	let waterLineInput = document.getElementById("waterline");
	waterLineInput.value = islaVista.waterLine;

	let islandVal = document.getElementById("island-value");
	islandVal.textContent = islaVista.getNumberOfIslands();

	let elevationVal = document.getElementById("elevation-value");
	elevationVal.textContent = islaVista.waterLine;

	let submergedVal = document.getElementById("submerged-value");
	submergedVal.textContent = islaVista.getSubmergedIslands().length;

	let widthVal = document.getElementById("island-chain-width");
	widthVal.value = islaVista.width;

	let heightVal = document.getElementById("island-chain-height");
	heightVal.value = islaVista.height;

	let elevationMinVal = document.getElementById("island-chain-elevation-min");
	elevationMinVal.value = islaVista.elevationMin;

	let elevationMaxVal = document.getElementById("island-chain-elevation-max");
	elevationMaxVal.value = islaVista.elevationMax;
	// END move to function

	const onWaterLineSubmit = (waterLinevalue) => {
		// update model
		islaVista.updateWaterLine(waterLinevalue);
		// update view
		islandView.update();
		// update everything else on the page
		islandVal.textContent = islaVista.getNumberOfIslands();
		submergedVal.textContent = islaVista.getSubmergedIslands().length;
		elevationVal.textContent = islaVista.waterLine;
	};

	const waterLineForm = document.getElementById('water-line-form');
	const moreOptionsButton = document.getElementById('more-options');
	const regenerateChainForm = document.getElementById('regenerate-chain-form');

	waterLineForm.addEventListener('submit', (e) => {
		e.preventDefault();
		// get form values
		const width = e.target.elements["island-chain-width"].value;
		const height = e.target.elements["island-chain-height"].value;
		const elevationMin = e.target.elements["island-chain-elevation-min"].value;
		const elevationMax = e.target.elements["island-chain-elevation-max"].value;
		const waterLine = e.target.elements["waterline"].value;
		// update model
		islaVista.regenerate({ width, height, elevationMin, elevationMax, waterLine });
		// updated view
		islandView.update();
		// update everything else on the page
		islandVal.textContent = islaVista.getNumberOfIslands();
		submergedVal.textContent = islaVista.getSubmergedIslands().length;
		elevationVal.textContent = islaVista.waterLine;
	});

	moreOptionsButton.addEventListener('click', (e) => {
		e.preventDefault();
		regenerateChainForm.classList.toggle('hidden');
	});

})();
