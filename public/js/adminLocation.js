const deliveryLocations = document.getElementById("deliveryLocations");

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
async function makeLocationList() {
	const theseLocations = await locations();
	deliveryLocations.innerHTML = "";
	theseLocations.forEach((element) => {
		deliveryLocations.innerHTML =
			deliveryLocations.innerHTML +
			` <li class='d-flex flex-nowrap flex-row align-items-center gap-2'><i class="bi bi-check-circle"></i>${element.location}<form action="/location/delete/${element._id}" method="post" data-location-delete><button class="btn btn-outline-danger rounded-pill  border border-2 deleteLocation"><i class="bi-trash"></i></button></form>`;
	});
	const deleteLocations = document.querySelectorAll("[data-location-delete]");
	deleteLocations.forEach((element) => {
		element.addEventListener("submit", async (e) => {
			e.preventDefault();
			const formAction = e.target.action;
			const deleteLocationResponse = await fetch(formAction, {
				method: e.target.method,
			});
			const deleteLocationData = await deleteLocationResponse.json();
			if (!deleteLocationData.error) {
				alert(deleteLocationData.data);
			} else {
				alert(deleteLocationData.error);
			}
			makeLocationList();
		});
	});
}
makeLocationList();

var addLocationModal = document.getElementById("addLocationModal");
const addLocationForm = document.getElementById("addLocationForm");
const newLocation = document.getElementById("newLocation");
addLocationForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const addLocationResponse = await fetch(e.target.action, {
		headers: { "Content-Type": "application/json" },
		method: e.target.method,
		body: JSON.stringify({ newLocation: newLocation.value }),
	});
	const addLocationData = await addLocationResponse.json();
	if (!addLocationData.error) {
		await Swal.fire({
			title: "Sweet!",
			html: addLocationData.data,
			icon: "success",
		});
	} else {
		await Swal.fire({
			icon: "error",
			title: "Oops...",
			text: addLocationData.error,
		});
	}
	makeLocationList();
});
