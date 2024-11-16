/* Global Variables */

const button = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// OpenWeatherApi configuration
const url = "https://api.openweathermap.org/data/2.5/weather"; // Base URL for the OpenWeather API
const APIKey = "3373f68874b2689325fc063a1ed767ad"; // My API key for accessing the OpenWeather API

// Create a new date
let d = new Date();
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

// Fetch weather data from OpenWeather API
const fetchWeather = async () => {
  try {
    const request = await fetch(
      `${url}?zip=${zip.value},us&units=metric&APPID=${APIKey}`
    );
    const result = await request.json();

    const {
      main: { temp },
    } = result;
    return temp; // Return the temperature
  } catch (e) {
    // Handle any errors
    throw e;
  }
};

// Save data to the server using a POST request
const saveData = async (data) => {
  try {
    await fetch("/projectData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (e) {
    throw e;
  }
};

// Fetch data from the server using a GET request
const fetchDataFromServer = async () => {
  try {
    const request = await fetch("/zipData");
    const data = await request.json();
    return data;
  } catch (e) {
    throw e;
  }
};

// Update the UI dynamically with the fetched data
const updateUI = async (data) => {
  date.innerText = `Date: ${data.date}`; // Update the date
  temp.innerText = `Temperature: ${data.temp} deg`; // Update the temperature
  content.innerText = `Feeling: ${data.content}`; // Update the content
};

// Event listener for the button click
button.addEventListener("click", () => {
  // Fetch the weather data using the user-provided zip code
  fetchWeather()
    .then((temp) => {
      // Create a data object with the fetched temperature, current date, and user's feelings
      const data = { date: newDate, temp, content: feelings.value };
      return saveData(data); // Save the data to the server
    })
    .then(() => {
      return fetchDataFromServer();
    })
    .then((data) => {
      updateUI(data);
    })
    .catch((e) => {
      console.error(e);
    });
});
