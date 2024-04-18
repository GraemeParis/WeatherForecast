const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");
const cityBtn = document.getElementById("cityBtn");
const rootRef = document.getElementById("root");
const apiKey = "17008d601c39ec0f04c6342bb46adcae";

// Event Listener
cityBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const forecastData = await getForecastData(city);
      displayForecastInfo(forecastData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a valid city");
  }
  getForecastData(city);
});

// Function for retrieving weather based on city input
async function getForecastData(city) {
  {
    const result = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const forecastResponse = await fetch(result);
    console.log(forecastResponse);
  }
  if (!forecastResponse.ok) {
    throw new Error("Unable to retrieve weather information");
  }
  return await forecastResponse.json();
}

// Function for collating weather and displaying
function displayForecastInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, icon }],
    dt,
  } = data;
  console.log(data);
}

// Function for errors
function displayError(errorMessage) {
  console.log(errorMessage);
  rootRef.innerHTML = `Unable to retrieve weather`;
}
