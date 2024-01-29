//The code refers to PokeAPI, fetching and presenting data about Pokémon. It demonstrates random selection, data manipulation, and dynamic content creation to display Pokemon details. 

$(function() {
  // Base URL for the PokeAPI
  let baseURL = "https://pokeapi.co/api/v2";

  // Step 1: Fetch and log information about the first 1000 Pokémon
  $.getJSON(`${baseURL}/pokemon/?limit=1000`).then(data => {
    console.log("Step 1: All Pokémon data", data);
  });

  // Step 2: Fetch and log information about three randomly selected Pokémon
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
      // Select three random Pokémon URLs
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      // Fetch data for each random Pokémon URL
      return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    })
    .then(pokemon => {
      // Log data for the randomly selected Pokémon
      pokemon.forEach(p => console.log("Step 2: Random Pokémon", p));
    });

  // Step 3: Fetch and log names and descriptions of three randomly selected Pokémon
  let names = null;
  $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
      // Select three random Pokémon URLs
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * data.results.length);
        let url = data.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      // Fetch data for each random Pokémon URL
      return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
    })
    .then(data => {
      // Store names of the Pokémon
      names = data.map(d => d.name);
      // Fetch species data for each Pokémon
      return Promise.all(data.map(d => $.getJSON(d.species.url)));
    })
    .then(data => {
      // Extract and log descriptions for each Pokémon
      let descriptions = data.map(d => {
        let descriptionObj = d.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj ? descriptionObj.flavor_text : "No description available.";
      });
      descriptions.forEach((desc, i) => {
        console.log(`Step 3: ${names[i]} - ${desc}`);
      });
    });

  // Step 4: Handle button click to display information about three random Pokémon
  let $btn = $("button");
  let $pokeArea = $("#pokemon-area");

  $btn.on("click", function() {
    // Clear the Pokémon area
    $pokeArea.empty();
    // Array to store names and images of Pokémon
    let namesAndImages = [];
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then(data => {
        // Select three random Pokémon URLs
        let randomPokemonUrls = [];
        for (let i = 0; i < 3; i++) {
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url;
          randomPokemonUrls.push(url);
        }
        // Fetch data for each random Pokémon URL
        return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
      })
      .then(pokemonData => {
        // Store names and images of Pokémon
        namesAndImages = pokemonData.map(p => ({
          name: p.name,
          imgSrc: p.sprites.front_default
        }));
        // Fetch species data for each Pokémon
        return Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
      })
      .then(speciesData => {
        // Display Pokémon cards with names, images, and descriptions
        speciesData.forEach((d, i) => {
          let descriptionObj = d.flavor_text_entries.find(entry => entry.language.name === "en");
          let description = descriptionObj ? descriptionObj.flavor_text : "";
          let { name, imgSrc } = namesAndImages[i];
          $pokeArea.append(makePokeCard(name, imgSrc, description));
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
