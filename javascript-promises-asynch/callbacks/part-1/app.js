/* This code makes API requests, andling asynchronous calls, and displaying information retrieved from the Numbers API on a webpage.*/

// Store the favorite number in a variable
let favNumber = 5;

// Define the base URL for the numbers API
let baseURL = "http://numbersapi.com";

// Step 1: Fetch and display a fact about the favorite number
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  // Log the retrieved data to the console for debugging purposes
  console.log("Step 1:", data);
});

// Step 2: Fetch and display facts about an array of favorite numbers
let favNumbers = [7, 11, 22];
$.getJSON(`${baseURL}/${favNumbers}?json`, function(data) {
  // Log the retrieved data to the console for debugging purposes
  console.log("Step 2:", data);
});

// Step 3: Fetch multiple facts about the favorite number and display them on the web page
let facts = [];

// Initial AJAX call to fetch the first fact
$.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
  // Add the first fact to the facts array
  facts.push(data.text);
  
  // Nested AJAX calls to fetch additional facts (repeated four times)
  $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
    facts.push(data.text);
    $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
      facts.push(data.text);
      $.getJSON(`${baseURL}/${favNumber}?json`, function(data) {
        facts.push(data.text);
        
        // Iterate through the facts array and append each fact to the body of the webpage
        facts.forEach(fact => {
          // Append each fact as a paragraph to the body of the webpage
          $("body").append(`<p>${fact}</p>`);
        });
      });
    });
  });
});
