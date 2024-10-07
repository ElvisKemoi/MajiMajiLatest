const locationSelect = document.getElementById("locationSelect");

const locations = async () => {
	const locationResponse = await fetch("/location", { method: "GET" });
	const locationData = await locationResponse.json();
	if (locationResponse.ok) {
		if (!locationData.error) {
			return locationData.data;
		} else {
			alert(locationData.error);
		}
	} else {
		alert("Unstable Network");
	}
};

async function makeLocationSelections() {
	const theLocations = await locations();
	theLocations.forEach((element) => {
		locationSelect.innerHTML =
			locationSelect.innerHTML +
			`<option value='${element.location}' >${element.location}</option>`;
	});
}
makeLocationSelections();
