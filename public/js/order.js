// let refreshTime = 300000;
let refreshTime = 100000;
const ordersList = document.getElementById("ordersList");
const unreadCount = document.getElementById("unreadCount");
const orderTemplate = document.querySelector("[data-order-template]");

const orderNoOrderTemplate = document.querySelector("[data-order-noorder]");

const newOrdersButton = document.getElementById("newOrdersButton");
const deliveredOrdersButton = document.getElementById("deliveredOrdersButton");
const allOrdersButton = document.getElementById("allOrdersButton");

newOrdersButton.addEventListener("click", doFilter);
deliveredOrdersButton.addEventListener("click", doFilter);
allOrdersButton.addEventListener("click", allVisible);

function doFilter(e) {
	const valueToFilter = e.target.attributes["data-filter-value"].value;
	ordersList.childNodes.forEach((item) => {
		item.classList.toggle("d-none", !item.classList.contains(valueToFilter));
	});
}
function allVisible() {
	ordersList.childNodes.forEach((item) => {
		item.classList.remove("d-none");
	});
}

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

const orders = async () => {
	try {
		const response = await fetchWithTimeout("/order", { method: "GET" }, 10000);

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
const doAction = (e) => {
	const [action, id] = e.target.id;

	console.log(action, id);
};
async function showOrders() {
	const theOrders = await orders();
	if (theOrders.length > 0) {
		ordersList.textContent = "";
		for (let index = 0; index < theOrders.length; index++) {
			const element = theOrders[index];
			const {
				_id,
				product,
				phoneNumber,
				location,
				price,
				delivered,
				personName,
				createdAt,
				updatedAt,
			} = element;

			const orderCard = orderTemplate.content.cloneNode(true).children[0];

			orderCard.classList.toggle("new", !delivered);
			orderCard.classList.toggle("delivered", delivered);

			const cardHeader2 = orderCard.querySelector("[data-order-cardHeader]");

			cardHeader2.classList.toggle("bg-success", delivered);
			cardHeader2.classList.toggle("bg-danger", !delivered);

			const cardPersonName = orderCard.querySelector("[data-order-personName]");

			cardPersonName.textContent = personName;
			const cardRemarkIcon = orderCard.querySelector(
				"[data-order-remark-icon]"
			);
			cardRemarkIcon.classList.toggle("bi-bicycle", delivered);
			cardRemarkIcon.classList.toggle("bi-check-all", !delivered);

			const cardRemark = orderCard.querySelector("[data-order-remark]");
			const theRemark = delivered ? "Delivered" : "New Order";
			cardRemark.textContent = theRemark;

			const cardNumber = orderCard.querySelector("[data-order-phone]");
			cardNumber.textContent = phoneNumber;

			const cardPrice = orderCard.querySelector("[data-order-capacity]");
			cardPrice.textContent = price;

			const cardLocation = orderCard.querySelector("[data-order-location]");
			cardLocation.textContent = location;

			const cardTime = orderCard.querySelector("[data-order-time]");
			cardTime.textContent =
				new Date(createdAt).toLocaleTimeString() +
				" " +
				new Date(createdAt).toDateString();

			const cardDelete = orderCard.querySelector("[data-order-delete]");

			cardDelete.action = `/order/delete/${_id}`;
			const cardMarkAsDelivered = orderCard.querySelector(
				"[data-order-markasdelivered]"
			);
			cardMarkAsDelivered.classList.toggle("d-none", delivered);
			cardMarkAsDelivered.action = `/order/markasdelivered/${_id}`;

			ordersList.append(orderCard);
		}
		monitorSubmission();
	} else {
		const theNoOrderCard =
			orderNoOrderTemplate.content.cloneNode(true).children[0];
		ordersList.append(theNoOrderCard);
	}
}

showOrders();

setInterval(() => {
	showOrders();
}, refreshTime);
function monitorSubmission() {
	const allDeleteForms = document.querySelectorAll("[data-order-delete]");
	const allMarkAsDeliveredForms = document.querySelectorAll(
		"[data-order-markasdelivered]"
	);

	allDeleteForms.forEach(sendReq);
	allMarkAsDeliveredForms.forEach(sendReq);

	function sendReq(element) {
		element.addEventListener("submit", async (e) => {
			e.preventDefault();

			const response = await fetchWithTimeout(
				e.target.action,
				{ method: "POST" },
				10000
			);
			const data = await response.json();

			showOrders();
		});
	}
}
