async function isNewSubscriber(coin) {
  const email = document.getElementById(`${coin}Input`).value;
  // Retrieve the array from sessionStorage
  const storedJsonString = sessionStorage.getItem("Subscribers");
  const SubscriberPairs = storedJsonString ? JSON.parse(storedJsonString) : [];

  // Iterate over the array and access each email and subscriber ID
  SubscriberPairs.forEach((pair) => {
    const storedEmail = pair.email;
    if (email !== storedEmail) {
      updateSubscriberId(email);
    }
  });
}

function getSubscriberId(email) {
  const storedJsonString = sessionStorage.getItem("Subscribers");
  const emailSubscriberPairs = storedJsonString
    ? JSON.parse(storedJsonString)
    : [];

  // Find the pair with the matching email
  const pair = emailSubscriberPairs.find((pair) => pair.email === email);

  // Return the corresponding subscriberId if found, or null otherwise
  return pair ? pair.subscriberId : null;
}

function validateForm(coin) {
  var email = document.getElementById(`${coin}Input`).value;
  var name = document.getElementById(`${coin}Name`).value;
  if (name.trim() === "" || /^\s+$/.test(name)) {
    alert("Please enter your name.");
    return false; // Form is not valid
  } else if (email.trim() === "" || /^\s+$/.test(email)) {
    alert("Please enter your email.");
    return false;
  }
  return true; // Form is valid
}

// Function to handle form submission and trigger Novu
function handleFormSubmit(event, coin, priceClassName) {
  event.preventDefault();
  var overlay = document.getElementById("overlay");
  overlay.style.display = "flex";
  isNewSubscriber(coin);
  const currentprice = document.querySelector(priceClassName).textContent;
  const email = document.getElementById(`${coin}Input`).value;
  const name = document.getElementById(`${coin}Name`).value;
  const subscriberId = getSubscriberId(email);

  const selectElement = document.getElementById(`${coin}Select`);
  let topicKey;

  const selectedValue = selectElement.value;
  if (selectedValue === "NULL") {
    topicKey = null;
  } else if (selectedValue === "2") {
    topicKey = `${coin}-2MIN-NOTIFIER`;
  } else if (selectedValue === "60") {
    topicKey = `${coin}-1HR-NOTIFIER`;
  } else if (selectedValue === "360") {
    topicKey = `${coin}-6HR-NOTIFIER`;
  } else if (selectedValue === "1440") {
    topicKey = `${coin}-24HR-NOTIFIER`;
  }

  const formData = {
    subscriberId,
    email,
    coin,
    price: currentprice,
    firstname: name,
    topicKey,
  };

  // Make an HTTP request to the server endpoint
  fetch("/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful response
        overlay.style.display = "none";
        console.log("Subscription successful");
      } else {
        // Handle error response
        overlay.style.display = "none";
        alert("Subscription failed. Please Try Again!");
      }
    })
    .catch((error) => {
      // Handle request error
      overlay.style.display = "none";
      alert("Request failed", error);
    });
}

function showNotification(pair, name) {
  (function (n, o, t, i, f) {
    n[i] = {};
    var m = ["init", "on"];
    n[i]._c = [];
    m.forEach(
      (me) =>
        (n[i][me] = function () {
          n[i]._c.push([me, arguments]);
        })
    );
    var elt = o.createElement(f);
    elt.type = "text/javascript";
    elt.async = true;
    elt.src = t;
    var before = o.getElementsByTagName(f)[0];
    before.parentNode.insertBefore(elt, before);
  })(
    window,
    document,
    "https://embed.novu.co/embed.umd.min.js",
    "novu",
    "script"
  );

  novu.init("70HzHf7CIXoM", "#notification-bell", {
    subscriberId: pair.subscriberId,
    email: pair.email,
    firstName: name,
  });
}

const ethSubmitButton = document.querySelector(".home-subscribe");
ethSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Ethereum");
  if (isValid) {
    handleFormSubmit(event, "Ethereum", ".home-price");
  }
});

const btcSubmitButton = document.querySelector(".home-buy-details");
btcSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("BitCoin");
  if (isValid) {
    handleFormSubmit(event, "BitCoin", ".home-price02");
  }
});

const dogeSubmitButton = document.querySelector(".home-buy-details1");
dogeSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Doge");
  if (isValid) {
    handleFormSubmit(event, "Doge", ".home-price04");
  }
});

const solanaSubmitButton = document.querySelector(".home-subscribe1");
solanaSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Solana");
  if (isValid) {
    handleFormSubmit(event, "Solana", ".home-price06");
  }
});

const bnbSubmitButton = document.querySelector(".home-buy-details2");
bnbSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Binance");
  if (isValid) {
    handleFormSubmit(event, "Binance", ".home-price08");
  }
});

const aaveSubmitButton = document.querySelector(".home-buy-details3");
aaveSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Aave");
  if (isValid) {
    handleFormSubmit(event, "Aave", ".home-price10");
  }
});

const metaSubmitButton = document.querySelector(".home-subscribe2");
metaSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Meta");
  if (isValid) {
    handleFormSubmit(event, "Meta", ".home-price12");
  }
});

const msftSubmitButton = document.querySelector(".home-subscribe3");
msftSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Microsoft");
  if (isValid) {
    handleFormSubmit(event, "Microsoft", ".home-price14");
  }
});

const googlSubmitButton = document.querySelector(".home-subscribe4");
googlSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Google");
  if (isValid) {
    handleFormSubmit(event, "Google", ".home-price16");
  }
});

const tslaSubmitButton = document.querySelector(".home-subscribe5");
tslaSubmitButton.addEventListener("click", function (event) {
  event.preventDefault();
  var isValid = validateForm("Tesla");
  if (isValid) {
    handleFormSubmit(event, "Tesla", ".home-price18");
  }
});
