// Define a favorite number
let favNumber = 5;

/*This code is interacting with the Numbers API to retrieve interesting facts about a favorite number and display them in various ways:*/

// Define the base URL for the Numbers API
let baseURL = "http://numbersapi.com";

// Step 1: Fetch and log a fact about the favorite number
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  // Log the retrieved data to the console
  console.log("Step 1:", data);
});

// Step 2: Fetch and log facts about an array of favorite numbers
let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  // Log the retrieved data to the console
  console.log("Step 2:", data);
});

// Step 3: Fetch multiple facts about the favorite number and display them on the web page
Promise.all(
  // Create an array of promises for fetching facts (four times)
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`);
  })
).then(facts => {
  // Iterate through the retrieved facts and append each to the body of the webpage
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});
