/*This code interacts with the PokeAPI to retrieve information about Pokémon; it provides different interactions with the PokeAPI like logging basic information to creating and displaying Pokémon cards based on user interaction.*/


// When the document is ready
$(function() {
  // Base URL for the PokeAPI
  let baseURL = "https://pokeapi.co/api/v2";

  // Step 1: Retrieve and log information about the first 1000 Pokémon
  $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
    console.log("Step 1:", data);
  });

  // Step 2: Retrieve and log information about three random Pokémon
  $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
    let randomPokemonUrls = [];
    // Select three random Pokémon from the list
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    // Retrieve and log information for each random Pokémon
    randomPokemonUrls.forEach(function(url) {
      $.getJSON(url, function(data) {
        console.log("Step 2:", data);
      });
    });
  });

  // Step 3: Retrieve and log information about three random Pokémon with descriptions
  $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
    let randomPokemonUrls = [];
    // Select three random Pokémon from the list
    for (let i = 0; i < 3; i++) {
      let randomIdx = Math.floor(Math.random() * data.results.length);
      let url = data.results.splice(randomIdx, 1)[0].url;
      randomPokemonUrls.push(url);
    }
    // Retrieve and log information, including name and description, for each random Pokémon
    randomPokemonUrls.forEach(function(url) {
      $.getJSON(url, function(data) {
        let name = data.name;
        // Retrieve species information for additional details
        $.getJSON(data.species.url, function(data) {
          // Find English flavor text for the Pokémon's description
          let descriptionObj = data.flavor_text_entries.find(
            entry => entry.language.name === "en"
          );
          // Extract and log the name and description
          let description = descriptionObj
            ? descriptionObj.flavor_text
            : "No description available.";
          console.log(`Step 3: ${name}: ${description}`);
        });
      });
    });
  });

  // Step 4: Display three random Pokémon cards on button click
  let $btn = $("button");
  let $pokeArea = $("#pokemon-area");

  $btn.on("click", function() {
    // Clear existing Pokémon cards from the display area
    $pokeArea.empty();
    $.getJSON(`${baseURL}/pokemon/?limit=1000`, function(data) {
      let randomPokemonUrls = [];
      // Select three random Pokémon from the list
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      // Retrieve and display information, including name, image, and description, for each random Pokémon
      randomPokemonUrls.forEach(function(url, i) {
        $.getJSON(url, function(data) {
          let name = data.name;
          let imgSrc = data.sprites.front_default;
          // Retrieve species information for additional details
          $.getJSON(data.species.url, function(data) {
            // Find English flavor text for the Pokémon's description
            let descriptionObj = data.flavor_text_entries.find(
              entry => entry.language.name === "en"
            );
            // Extract and append the name, image, and description to the display area
            let description = descriptionObj
              ? descriptionObj.flavor_text
              : "No description available.";
            $pokeArea.append(makePokeCard(name, imgSrc, description));
          });
        });
      });
    });
  });

  // Function to create a Pokémon card HTML
  function makePokeCard(name, imgSrc, description) {
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
  }
});
