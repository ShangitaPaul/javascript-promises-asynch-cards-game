/* This code defines a favorite number and a base URL for the Numbers API. It then provides three asynchronous functions (part1, part2, and part3) that use jQuery's $.getJSON to make asynchronous requests to the Numbers API and handle the fetched data. The comments break down each part of the code, describing the purpose and functionality of each section.*/

// Define a favorite number and the base URL for the Numbers API
let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1. Async function to fetch and log a fact about the favorite number
async function part1() {
  // Use jQuery's $.getJSON to make an asynchronous request to the Numbers API
  let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
  
  // Log the fetched data to the console
  console.log(data);
}

// Call the first async function to execute the logic
part1();

// 2. Async function to fetch and log facts about an array of favorite numbers
const favNumbers = [7, 11, 22];
async function part2() {
  // Use jQuery's $.getJSON to make an asynchronous request for each favorite number
  let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
  
  // Log the fetched data to the console
  console.log(data);
}

// Call the second async function to execute the logic
part2();

// 3. Async function to fetch and append facts about the favorite number to the body
async function part3() {
  // Use Promise.all to make multiple asynchronous requests concurrently
  let facts = await Promise.all(
    // Create an array of promises by making multiple requests
    Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
  );

  // Iterate over the fetched data and append each fact to the body of the HTML document
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`);
  });
}

// Call the third async function to execute the logic
part3();
