//save user input
function getData() {
  currentCurrency = document
    .getElementsByName("currentCurrency")[0]
    .value.trim();
  newCurrency = document.getElementsByName("newCurrency")[0].value.trim();
  amount = document.getElementsByName("amount")[0].value.trim();
  retrieveData();
}

function retrieveData() {
  //check user input if it in the correct format
  if (newCurrency.match("[A-Z]{3}") && currentCurrency.match("[A-Z]{3}")) {
    const apikey = "494ca715780c53592835f332";
    const endpoint = `https://v6.exchangerate-api.com/v6/${apikey}/pair/${currentCurrency}/${newCurrency}/${amount}`;

    const retrieveData = new XMLHttpRequest();
    retrieveData.open("GET", endpoint);

    retrieveData.onload = function () {
      if (retrieveData.status == 200) {
        creatsBasicElemnts(retrieveData);
      }
    };

    //if un error occur on step of open file
    retrieveData.onerror = function () {
      displayError("An error occred at open JOSN file");
    };

    retrieveData.send();
  } else {
    displayError(
      "Incorrect input !! enter three capital letter on currency type and number large than 1 on amount"
    );
  }
}

function retrieveExtraData() {
  const apikey = "494ca715780c53592835f332";
  const endpoint = `https://v6.exchangerate-api.com/v6/${apikey}/latest/${currentCurrency}`;

  const retrieveData = new XMLHttpRequest();
  retrieveData.open("GET", endpoint);

  retrieveData.onload = function () {
    //insure correct callback
    if (retrieveData.status == 200) {
      createsecondaryElements(retrieveData);
    }
  };

  //if un error occur on step of open file
  retrieveData.onerror = function () {
    displayError("An error occred at open JOSN file");
  };

  retrieveData.send();
}

function creatsBasicElemnts(retrieveData) {
  container = document.getElementById("result");
  container.textContent = "";

  const data = JSON.parse(retrieveData.responseText);

  const LastUpdate = data.time_last_update_utc;
  const conversionRate = data.conversion_rate;
  const conversionResult = data.conversion_result;

  const conversionResultElement = document.createElement("p");
  conversionResultElement.textContent = `Total conversion result: ${conversionResult}`;

  const conversionRateElement = document.createElement("p");
  conversionRateElement.textContent = `Conversion rate: ${conversionRate}`;

  const LastUpdateElement = document.createElement("p");
  LastUpdateElement.textContent = `Last Update: ${LastUpdate}`;

  container.appendChild(conversionResultElement);
  container.appendChild(conversionRateElement);
  container.appendChild(LastUpdateElement);
  container.classList.add("resultMsg");

  retrieveExtraData();
}

function createsecondaryElements(retrieveData) {
  const createSecondaryElement = document.createElement("p");
  createSecondaryElement.textContent = `Conversion rates from ${currentCurrency} to other important currencies: `;
  container.appendChild(createSecondaryElement);

  const data = JSON.parse(retrieveData.responseText);

  if (!currentCurrency.match("KWD") && !newCurrency.match("KWD")) {
    const KWD = data.conversion_rates.KWD;
    const KWDElement = document.createElement("p");
    KWDElement.textContent = `Conversion rates from ${currentCurrency} to KWD : ${KWD}`;
    container.appendChild(KWDElement);
  }

  if (!currentCurrency.match("EUR") && !newCurrency.match("EUR")) {
    const EUR = data.conversion_rates.EUR;
    const EURElement = document.createElement("p");
    EURElement.textContent = `Conversion rates from ${currentCurrency} to EUR : ${EUR}`;
    container.appendChild(EURElement);
  }

  if (!currentCurrency.match("BHD") && !newCurrency.match("BHD")) {
    const BHD = data.conversion_rates.BHD;
    const BHDElement = document.createElement("p");
    BHDElement.textContent = `Conversion rates from ${currentCurrency} to BHD : ${BHD}`;
    container.appendChild(BHDElement);
  }

  if (!currentCurrency.match("USD") && !newCurrency.match("USD")) {
    const USD = data.conversion_rates.USD;
    const USDElement = document.createElement("p");
    USDElement.textContent = `Conversion rates from ${currentCurrency} to USD : ${USD}`;
    container.appendChild(USDElement);
  }

  container.oncopy = function (event) {
    alert("The result has been copied successfully");
  };
}

function displayError(error) {
  const errorElement = document.createElement("p");
  errorElement.textContent = error;

  const container = document.getElementById("result");
  container.textContent = "";
  container.appendChild(errorElement);
  errorElement.classList.add("error");
  document.getElementsByClassName("input")[0].value = "";
  document.getElementsByClassName("input")[1].value = "";
  document.getElementsByClassName("input")[2].value = "1";
}

function focusLabel(x) {
  x.style.background = "gray";
}
