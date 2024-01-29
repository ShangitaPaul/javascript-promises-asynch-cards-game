//The code showcases interactions with the Deck of Cards API, demonstrating how to draw cards, draw multiple cards sequentially, shuffle decks, and dynamically display drawn cards on a webpage


$(function() {
  // Base URL for the Deck of Cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // Step 1: Draw and log information about the first card
  $.getJSON(`${baseURL}/new/draw/`).then(data => {
    // Extract suit and value from the first card in the response
    let { suit, value } = data.cards[0];
    // Log the formatted card information to the console
    console.log(`Step 1: Drawing the first card - ${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  // Step 2: Draw and log information about the first two cards from the same deck
  let firstCard = null;
  $.getJSON(`${baseURL}/new/draw/`)
    .then(data => {
      // Store information about the first card and the deck ID
      firstCard = data.cards[0];
      let deckId = data.deck_id;
      // Draw the second card from the same deck
      return $.getJSON(`${baseURL}/${deckId}/draw/`);
    })
    .then(data => {
      // Log the formatted information for both cards to the console
      let secondCard = data.cards[0];
      console.log(`Step 2: Drawing the first two cards - ${firstCard.value.toLowerCase()} of ${firstCard.suit.toLowerCase()}, ${secondCard.value.toLowerCase()} of ${secondCard.suit.toLowerCase()}`);
    });

  // Step 3: Shuffle a deck, display cards on button click, and apply random transformations
  let deckId = null; // Store the deck ID
  let $btn = $('button'); // Select the button element
  let $cardArea = $('#card-area'); // Select the card area element

  // Shuffle a new deck and show the button when the document is ready
  $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
    deckId = data.deck_id; // Store the deck ID for future draws
    $btn.show(); // Show the button
  });

  // Handle button click event
  $btn.on('click', function() {
    // Draw a card from the deck
    $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
      // Extract card image source and set random position and rotation
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;

      // Append the card image to the card area with random transformations
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );

      // Remove the button if no cards are remaining in the deck
      if (data.remaining === 0) {
        $btn.remove();
        console.log('Step 3: No cards remaining in the deck. Button removed.');
      } else {
        console.log(`Step 3: Drawing a card - ${data.cards[0].value.toLowerCase()} of ${data.cards[0].suit.toLowerCase()}`);
      }
    });
  });
});
