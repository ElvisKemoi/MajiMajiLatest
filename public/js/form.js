// http://localhost:3000/message/save
const contactForm = document.getElementById("contactForm");
const personName = document.getElementById("personName");
const personEmail = document.getElementById("personEmail");
const theSubject = document.getElementById("theSubject");
const theMessage = document.getElementById("theMessage");
const sendMessageSpinner = document.getElementById("sendMessageSpinner");
const sendMessageButton = document.getElementById("sendMessageButton");

contactForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	sendMessageButton.classList.add("d-none");
	sendMessageSpinner.classList.remove("d-none");
	// No need to create FormData if you're sending JSON
	const formData = {
		personName: personName.value,
		email: personEmail.value,
		subject: theSubject.value,
		message: theMessage.value,
	};

	const response = await fetch("/message/save", {
		method: "POST",
		body: JSON.stringify(formData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	// Check if the response is OK
	if (response.ok) {
		const data = await response.json(); // assuming the response is JSON
		if (!data.error) {
			resetForm();

			await Swal.fire({
				title: "Sweet!",
				html: `Message Sent Successfully!`,
				icon: "success",
			});
		} else {
			await Swal.fire({
				icon: "error",
				title: "Oops...",
				text: data.error,
			});
		}
	} else {
		await Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Message Not Sent! Please try again",
		});
	}
});

function resetForm() {
	document.getElementById("contactForm").reset();
	sendMessageButton.classList.remove("d-none");
	sendMessageSpinner.classList.add("d-none");
}
