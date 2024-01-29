/*
This code interacts with the Deck of Cards API to draw and display playing cards outlined in the steps below. Overall, the code provides a visual representation of card drawing from a deck, including random card transformations on button clicks.*/

// When the document is ready
$(function() {
  // Base URL for the Deck of Cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // Step 1: Draw and display the first card
  $.getJSON(`${baseURL}/new/draw/`, function(data) {
    // Extract suit and value from the first card in the response
    let { suit, value } = data.cards[0];
    // Log the formatted card information to the console
    console.log(`Step 1: ${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });

  // Step 2: Draw and display the first two cards from the same deck
  $.getJSON(`${baseURL}/new/draw/`, function(data) {
    // Store information about the first card and the deck ID
    let firstCard = data.cards[0];
    let deckId = data.deck_id;
    
    // Draw the second card from the same deck
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      let secondCard = data.cards[0];
      
      // Log the formatted information for both cards to the console
      [firstCard, secondCard].forEach(function(card) {
        console.log(`Step 2: ${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
      });
    });
  });

  // Step 3: Shuffle a deck, display cards on button click, and apply random transformations
  let deckId = null; // Store the deck ID
  let $btn = $('button'); // Select the button element
  let $cardArea = $('#card-area'); // Select the card area element

  // Shuffle a new deck and show the button when the document is ready
  $.getJSON(`${baseURL}/new/shuffle/`, function(data) {
    deckId = data.deck_id; // Store the deck ID for future draws
    $btn.show(); // Show the button
  });

  // Handle button click event
  $btn.on('click', function() {
    // Draw a card from the deck
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
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
      if (data.remaining === 0) $btn.remove();
    });
  });
});
