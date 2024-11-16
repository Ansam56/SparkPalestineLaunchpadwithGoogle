import "./styles/header.scss";
import "./styles/form.scss";
import "./styles/footer.scss";

// Importing necessary functions from the app.js file
import {
  getFromGeonamesAPI,
  getFromWeatherbit,
  getFromPixabayAPI,
  tripInfo,
} from "./js/app.js";

document.getElementById("myform").addEventListener("submit", async (event) => {
  event.preventDefault();

  // Retrieve user input values
  const destinationInput = document.getElementById("location").value;
  const tripStartDate = document.getElementById("start-date").value;
  const tripEndDate = document.getElementById("return-date").value;

  try {
    // Fetch coordinates from GeoNames API
    const locationCoordinates = await getFromGeonamesAPI(destinationInput);

    // Fetch weather data using the coordinates from Weatherbit API
    const locationWeather = await getFromWeatherbit(
      locationCoordinates.lat,
      locationCoordinates.lng
    );

    // Fetch an image of the destination from Pixabay API
    const locationImage = await getFromPixabayAPI(destinationInput);

    // Render the trip details on the webpage
    tripInfo(
      locationCoordinates,
      locationWeather,
      locationImage,
      tripStartDate,
      tripEndDate
    );
  } catch (error) {
    console.error("An error occurred while fetching trip data:", error);
    alert(
      "Failed to retrieve trip details. Please check your input and try again later."
    );
  }
});
