const locationSelect = document.getElementById("locationSelect");
const locationList = document.getElementById("OurLocations");

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

async function makeLocationList() {
	const theLocations = await locations();
	theLocations.forEach((element) => {
		locationList.innerHTML =
			locationList.innerHTML +
			` <li><i class="bi bi-check-circle"></i>${element.location}</li>`;
	});
}

makeLocationList();
makeLocationSelections();
