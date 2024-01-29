/*
The purpose of this code is to create a simple interactive card drawing game using the Deck of Cards API. The code allows users to interactively draw and display cards from a shuffled deck, providing a simple and visually engaging card-drawing experience. The dynamic styling adds a playful element to the presentation of the drawn cards.*/



$(function () {
  // The base URL for the Deck of Cards API
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // Step 1: Draw and log the details of the first card
  async function part1() {
    // Fetch data for drawing a new card from the API
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    // Extract suit and value of the drawn card
    let { suit, value } = data.cards[0];
    // Log the details of the first card in a friendly way
    console.log(`First card: ${value.toLowerCase()} of ${suit.toLowerCase()}`);
  }

  // Step 2: Draw two cards, log their details, and use the same deck
  async function part2() {
    // Draw the first card to get the deck ID
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCardData.deck_id;
    // Draw the second card using the same deck ID
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    // Log the details of both cards in a friendly way
    [firstCardData, secondCardData].forEach(card => {
      let { suit, value } = card.cards[0];
      console.log(`Next card: ${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  }

  // Step 3: Set up a button to draw and display cards with dynamic styling
  async function setup() {
    // Selecting button and card area elements
    let $btn = $('button');
    let $cardArea = $('#card-area');

    // Shuffle a new deck and get its ID
    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);

    // Show the button and set up a click event to draw and display cards
    $btn.show().on('click', async function() {
      // Draw a card from the shuffled deck
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
      // Get the card image source and add dynamic styling
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      // Append the card image to the card area with dynamic styling
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      // Remove the button if no more cards are remaining
      if (cardData.remaining === 0) $btn.remove();
    });
  }

  // Call the setup function to initialize the card drawing setup
  setup();
});
