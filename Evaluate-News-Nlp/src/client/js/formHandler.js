import axios from "axios";
import { isValidURL } from "./URLChecker";

const getElement = (selector) => document.querySelector(selector);

const displayMessage = (selector, message, isVisible) => {
  const element = getElement(selector);
  element.innerHTML = message ? `<p>${message}</p>` : "";
  element.style.display = isVisible ? "block" : "none";
};

const toggleVisibility = (selector, isVisible) => {
  const element = getElement(selector);
  element.style.visibility = isVisible ? "visible" : "hidden";
};

const handleURLValidation = (url) => {
  const feedback = getElement(".msgDisplay");
  const isValid = isValidURL(url);

  if (!isValid) {
    displayMessage(".msgDisplay", "Enter a valid URL", true);
    return false;
  }

  return true;
};

const renderResponse = (data) => {
  const results = getElement("#results");

  if (!data) {
    displayMessage(".alert", "Internal error", true);
    return;
  }

  if (data.error) {
    displayMessage(".alert", data.error, true);
    return;
  }

  results.innerHTML = `
    <p class="resultData">Score: ${data.score_tag}</p>
    <p class="resultData">Agreement: ${data.agreement}</p>
    <p class="resultData">Subjectivity: ${data.subjectivity}</p>
    <p class="resultData">Confidence: ${data.confidence}</p>
    <p class="resultData">Irony: ${data.irony}</p>
  `;
};

const processSubmission = async (event) => {
  event.preventDefault();

  const input = getElement("#myform input");
  displayMessage(".msgDisplay", "", false);
  displayMessage(".alert", "", false);

  if (!handleURLValidation(input.value)) return;

  toggleVisibility(".loader", true);
  try {
    const response = await axios.post("http://localhost:8000/", {
      url: input.value,
    });
    renderResponse(response.data);
    displayMessage(".msgDisplay", "Success :)", true);
  } catch (error) {
    console.error(error);
    displayMessage(
      ".alert",
      "Failed to analyze the URL. Please try again later.",
      true
    );
  } finally {
    toggleVisibility(".loader", false);
  }
};

// Export the processSubmission function
export { processSubmission };
