/*The purpose of this code is to interact with the PokeAPI (Pokemon API) to fetch and display information about Pokemon in a somewhat interactive way. The code is written in JavaScript and uses jQuery for AJAX requests to the PokeAPI.*/



// The base URL for the PokeAPI
let baseURL = "https://pokeapi.co/api/v2";

// Step 1: Fetch and log data for all Pokemon
async function part1() {
  // Fetch data for all Pokemon with a limit of 1000
  let data = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
  // Log the fetched data to the console
  console.log(data);
}

// Step 2: Fetch and log data for three random Pokemon
async function part2() {
  // Fetch data for all Pokemon with a limit of 1000
  let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
  let randomPokemonUrls = [];
  // Select three random Pokemon URLs
  for (let i = 0; i < 3; i++) {
    let randomIdx = Math.floor(Math.random() * allData.results.length);
    let url = allData.results.splice(randomIdx, 1)[0].url;
    randomPokemonUrls.push(url);
  }
  // Fetch data for the selected random Pokemon URLs
  let pokemonData = await Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
  // Log the fetched Pokemon data to the console
  pokemonData.forEach(p => console.log(p));
}

// Step 3: Fetch and log data for three random Pokemon with their species descriptions
async function part3() {
  // Fetch data for all Pokemon with a limit of 1000
  let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
  let randomPokemonUrls = [];
  // Select three random Pokemon URLs
  for (let i = 0; i < 3; i++) {
    let randomIdx = Math.floor(Math.random() * allData.results.length);
    let url = allData.results.splice(randomIdx, 1)[0].url;
    randomPokemonUrls.push(url);
  }
  // Fetch data for the selected random Pokemon URLs
  let pokemonData = await Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
  // Fetch species data for the fetched Pokemon
  let speciesData = await Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
  // Extract and log species descriptions for each Pokemon
  let descriptions = speciesData.map(d => {
    let descriptionObj = d.flavor_text_entries.find(entry => entry.language.name === "en");
    return descriptionObj ? descriptionObj.flavor_text : "No description available.";
  });
  descriptions.forEach((desc, i) => {
    console.log(`${pokemonData[i].name}: ${desc}`);
  });
}

// Step 4: Set up a button click event to fetch and display information for three random Pokemon
let $btn = $("button");
let $pokeArea = $("#pokemon-area");

$btn.on("click", async function() {
  // Clear the Pokemon area before displaying new Pokemon
  $pokeArea.empty();
  // Fetch data for all Pokemon with a limit of 1000
  let allData = await $.getJSON(`${baseURL}/pokemon/?limit=1000`);
  let randomPokemonUrls = [];
  // Select three random Pokemon URLs
  for (let i = 0; i < 3; i++) {
    let randomIdx = Math.floor(Math.random() * allData.results.length);
    let url = allData.results.splice(randomIdx, 1)[0].url;
    randomPokemonUrls.push(url);
  }
  // Fetch data for the selected random Pokemon URLs
  let pokemonData = await Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
  // Fetch species data for the fetched Pokemon
  let speciesData = await Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
  // Create and append Pokemon cards to the Pokemon area
  speciesData.forEach((d, i) => {
    let descriptionObj = d.flavor_text_entries.find(entry => entry.language.name === "en");
    let description = descriptionObj ? descriptionObj.flavor_text : "";
    let name = pokemonData[i].name;
    let imgSrc = pokemonData[i].sprites.front_default;
    $pokeArea.append(makePokeCard(name, imgSrc, description));
  });
});

// Function to create HTML for a Pokemon card
function makePokeCard(name, imgSrc, description) {
  return `
    <div class="card">
      <h1>${name}</h1>
      <img src=${imgSrc} />
      <p>${description}</p>
    </div>
  `;
}
