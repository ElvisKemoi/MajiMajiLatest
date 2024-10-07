let messagesContainer = document.getElementById("messagesContainer");
const messageTemplate = document.querySelector("[data-message-template]");

const fetchWithTimeout = async (url, options, timeout = 10000) => {
	const controller = new AbortController();
	const signal = controller.signal;

	const fetchPromise = fetch(url, { ...options, signal });

	const timeoutPromise = new Promise((_, reject) =>
		setTimeout(() => {
			controller.abort();
			reject(new Error("Request timed out"));
		}, timeout)
	);

	return Promise.race([fetchPromise, timeoutPromise]);
};

const messages = async () => {
	try {
		const response = await fetchWithTimeout(
			"/message",
			{ method: "GET" },
			10000
		);

		if (response.ok) {
			const data = await response.json();
			if (!data.error) {
				return data;
			} else {
				throw new Error(data.error);
			}
		} else {
			throw new Error("Error Fetching Messages");
		}
	} catch (error) {
		return { error: error.message };
	}
};
let messagesArray = [];
async function showMessages() {
	messagesContainer.innerHTML = "";
	const theMessages = await messages();

	messagesArray = theMessages.map((msg, index) => {
		const theTemplate = messageTemplate.content.cloneNode(true).children[0];
		const messageName = theTemplate.querySelector("[data-message-personName]");
		const messageEmail = theTemplate.querySelector("[data-message-email]");
		const messageSubject = theTemplate.querySelector("[data-message-subject]");
		const messageMessage = theTemplate.querySelector("[data-message-message]");
		const messageDate = theTemplate.querySelector("[data-message-date]");
		const messageTarget = theTemplate.querySelector("[data-message-target]");
		const messageId = theTemplate.querySelector("[data-message-id]");

		messageName.textContent = msg.personName;
		messageEmail.textContent = msg.email;
		messageSubject.textContent = msg.subject;
		messageDate.textContent = msg.message;
		messageTarget.attributes["data-bs-target"] = `#faq-list-${index}`;
		messageId.attributes["id"] = `faq-list-${index}`;

		messagesContainer.append(theTemplate);
	});
}
// showMessages();

const accordionExample = document.getElementById("accordionExample");
const dataMessageTemplate2 = document.getElementById("data-message-template2");

async function showMessages2() {
	const theMessages2 = await messages();
	accordionExample.textContent = "";

	for (let index = 0; index < theMessages2.length; index++) {
		const element = theMessages2[index];
		const {
			_id,
			personName,
			email,
			subject,
			message,
			read,
			createdAt,
			updatedAt,
		} = element;

		const card = dataMessageTemplate2.content.cloneNode(true).children[0];

		const cardHeader = card.querySelector("[data-accordion-header]");
		cardHeader.setAttribute("id", _id);

		const cardButton = card.querySelector("[data-accordion-button]");
		cardButton.setAttribute("data-bs-target", `#collapse${_id}`);
		cardButton.setAttribute("aria-controls", `collapse${_id}`);

		const cardIcon = card.querySelector("[data-message-read-icon]");

		if (read) {
			cardIcon.classList.add("text-success", "bi-check-circle-fill");
			cardButton.classList.add("btn-success");
			cardIcon.textContent = "Read";
		} else {
			cardIcon.classList.add("text-danger", "bi-x-circle-fill");

			cardButton.classList.add("btn-danger");
			cardIcon.textContent = "Not Read";
		}
		const cardName = card.querySelector("[data-message-personName]");
		cardName.textContent = personName;
		const cardEmail = card.querySelector("[data-message-email]");
		cardEmail.textContent = email;
		const cardSubject = card.querySelector("[data-message-subject]");
		cardSubject.textContent = subject;
		const cardDate = card.querySelector("[data-message-date]");
		cardDate.textContent = new Date(createdAt).toLocaleDateString();

		const cardCollapse = card.querySelector("[data-message-collapse]");
		cardCollapse.setAttribute("id", `collapse${_id}`);
		cardCollapse.setAttribute("aria-labelledby", _id);
		const cardMessage = card.querySelector("[data-message-message]");
		cardMessage.textContent = message;

		const cardMarkRead = card.querySelector("[data-message-markread]");
		cardMarkRead.classList.toggle("d-none", read);
		cardMarkRead.id = `markasread ${_id}`;

		const cardDeleteMessage = card.querySelector("[data-message-delete]");
		cardDeleteMessage.id = `delete ${_id}`;

		const theReplyMessage = card.querySelector("[data-message-replying]");
		theReplyMessage.setAttribute("href", `mailto:${email}`);

		accordionExample.append(card);
	}
	const theMarkAsReadForms = document.querySelectorAll(
		"[data-message-markread]"
	);
	const theDeleteMessages = document.querySelectorAll("[data-message-delete");

	theDeleteMessages.forEach(clickListen);

	theMarkAsReadForms.forEach(clickListen);
}

showMessages2();

async function clickListen(fo) {
	fo.addEventListener("click", async (e) => {
		const [objective, theId] = e.target.id.split(" ");
		const changed = await sendRequest(objective, theId);
		if (!changed.error) {
			await Swal.fire({
				title: "Sweet!",
				html: `Message Updated Successfully!`,
				icon: "success",
			});

			showMessages2();
		} else {
			await Swal.fire({
				icon: "error",
				title: "Oops...",
				text: data.error,
			});
		}
	});
}

async function sendRequest(objective, id) {
	try {
		const response = await fetch(`/message/${objective}/${id}`, {
			method: "POST",
		});
		if (response.ok) {
			const data = await response.json();

			if (!data.error) {
				return data;
			} else {
				throw new Error(data.error);
			}
		} else {
			throw new Error("Error Updating Message!");
		}
	} catch (error) {
		return { error: error.message };
	}
}
