// JavaScript code to handle the popup
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const popup = document.getElementById("popup");
  const popupoverlay = document.getElementById("popup-overlay");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");

  function openPopup() {
    body.classList.add("popup-active");
    popup.style.display = "flex";
    setTimeout(function () {
      nameInput.focus();
      emailInput.focus();
    }, 0);
  }

  function closePopup() {
    body.classList.remove("popup-active");
    popup.style.display = "none";
    popupoverlay.style.display = "none";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if (name !== "" && email !== "") {
      document.getElementById("user").textContent = `Hello, ${name}!`;
      await generateSubscriberId();
      const storedJsonString = sessionStorage.getItem("Subscribers");
      const emailSubscriberPairs = storedJsonString
        ? JSON.parse(storedJsonString)
        : [];
      const pair = emailSubscriberPairs.find((pair) => pair.email === email);

      // Call showNotification after generateSubscriberId is completed
      showNotification(pair, name);
      closePopup();
    } else {
      alert("Please enter valid values.");
    }
  }

  openPopup();

  document.getElementById("popupForm").addEventListener("submit", handleSubmit);
});

// Generate and store the subscriberId in sessionStorage
function generateSubscriberId() {
  const storedJsonString = sessionStorage.getItem("emailSubscribers");
  const emailSubscriberPairs = storedJsonString
    ? JSON.parse(storedJsonString)
    : [];
  const email = emailInput.value.trim();
  if (!existingSubscriber(email, emailSubscriberPairs)) {
    const subscriberId = Math.random().toString(36).substring(2, 15);
    // Create a new pair object
    const pair = { email, subscriberId };

    // Insert the new pair into the array
    emailSubscriberPairs.push(pair);

    // Convert the updated array to a JSON string
    const jsonString = JSON.stringify(emailSubscriberPairs);

    // Store the JSON string in sessionStorage
    sessionStorage.setItem("Subscribers", jsonString);
  }
}

// Update and store the subscriberId in sessionStorage
function updateSubscriberId(email) {
  const storedJsonString = sessionStorage.getItem("Subscribers");
  const emailSubscriberPairs = storedJsonString
    ? JSON.parse(storedJsonString)
    : [];

  // Check if subscriberId exists for the given email
  if (!existingSubscriber(email, emailSubscriberPairs)) {
    const subscriberId = Math.random().toString(36).substring(2, 15);
    // Create a new pair object
    const pair = { email, subscriberId };

    // Insert the new pair into the array
    emailSubscriberPairs.push(pair);

    // Convert the updated array to a JSON string
    const jsonString = JSON.stringify(emailSubscriberPairs);

    // Store the JSON string in sessionStorage
    sessionStorage.setItem("Subscribers", jsonString);
  }
}

//Check existing Subscriber
function existingSubscriber(email, emailSubscriberPairs) {
  return emailSubscriberPairs.some((pair) => pair.email === email);
}

// Clear the subscriberId from sessionStorage
function clearSubscribers() {
  sessionStorage.removeItem("Subscribers");
}

// Event handler for beforeunload event
window.addEventListener("beforeunload", clearSubscribers);
