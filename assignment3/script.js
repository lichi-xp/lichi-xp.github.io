// Rider Waite Smith Tarot card images are in the public domain.
// https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_Tarot
// Tarot card meanings were imported from a spreadsheet linked in this Reddit post:
// https://www.reddit.com/r/tarot/comments/n8u6rs/link_to_tarot_meaning_spreadsheet_as_requested/

let table; // Stores tarot meanings table
let img, back; // Back images of cards
let deck = []; // Array of card objects
let selected; // Currently selected card
let scaler; // Scale factor for resizing
let lx = 0; // Light position
let lv = 0; // Light brightness
let flipper = 0; // Flip rotation state
let shuffled = false; // Shuffle state
let copacity = 0; // Opacity controls for text
let tcopacity = 1;
let newval; // New value for card text
let counter = 0; // Counter for text reveal animation
let stacked = false; // Stacking state

function preload() {
  table = loadTable("media/meanings3.csv", "csv", "header"); // Load tarot meanings CSV
  img = loadImage("media/tarotdeck2.jpg"); // Load tarot deck image
  back = loadImage("media/tarotback.jpg"); // Load card back image
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  //   WEBGL - Enables 3D rendering and transformations on the canvas.
  //   This enables working with 3D shapes, lighting, and camera functions like `translate`, `rotate`, and `pointLight` for 3D effects.
  scaler = (0.95 * height) / img.height; // Calculate scaling factor
  makeDeck(); // Create the deck of cards
  instruction(); // Display instructions
}

function makeDeck() {
  let id = 0;
  for (let j = 0; j < 6; j++) {
    // Loop to create rows of cards
    for (let i = 0; i < 13; i++) {
      // Loop to create columns of cards
      let x = (i * img.width) / 13; // Calculate card position in deck image
      let y = (j * img.height) / 6;
      let cimg = img.get(x, y, img.width / 13, img.height / 6); // Get card image
      let posx = (i - 6) * cimg.width * 1.1; // Position on canvas
      let posy = (j - 2.5) * cimg.height * 1.02;
      let card = new Card(createVector(posx, posy, -2 * height), cimg, id); // Create card
      deck.push(card); // Add card to deck array
      id++;
    }
  }
}

let defaultmessage =
  "<span style='font-family: Patriot, sans-serif; font-size: 24px;'><strong>--CLICK ANY CARD TO SEE ITS MEANING--</strong></span><br> <br>" +
  "Press <strong>SPACE</strong> to hide or show card information <br>" +
  "Press <strong>S</strong> to shuffle or sort deck <br>" +
  "Press <strong>F</strong> to flip all cards over <br>" +
  "Press <strong>ENTER</strong> to stack or unstack deck <br>";

function instruction() {
  cardinfo = createP(defaultmessage); // Create paragraph with instructions
  cardinfo.position(width / 2 - (scaler * img.width) / 2, height / 2); // Position instructions on screen
  cardinfo.style("width", scaler * img.width + "px"); // Set width based on card scale

  // Instruction text
  cardinfo.style("font-family", "Georgia", "18px"); // Monospace font
  cardinfo.style("color", "rgb(111, 29, 27)"); // White text
  cardinfo.style("text-align", "center"); // Center-align text
  cardinfo.style("fontSize", height / 40 + "px"); // Responsive font size

  // Instruction box
  cardinfo.style("background-color", "rgba(255, 230, 167,0.8)"); // Dark blue background
  cardinfo.style("borderRadius", height / 60 + "px"); // Rounded corners
  cardinfo.style("border-color", "rgb(67, 40, 24)"); // White border
  cardinfo.style("border-style", "dashed"); // Dotted border
  cardinfo.style("border-width", "3px"); // Responsive border width
  cardinfo.style("padding", height / 60 + "px"); // Responsive padding
  cardinfo.style("opacity", 0); // Initially hidden
}

function draw() {
  lv = min(100, frameCount / 2);
  lv = 100; // Adjust lighting over time

  background("#540b0e"); // Set background color

  ambientLight(lv); // Ambient lighting
  lx = lerp(lx, map(mouseX, 0, width, -height, height), 0.1); // Smooth light position
  pointLight(2 * lv, 2 * lv, 2 * lv, lx, -height, 3 * height); // Dynamic lighting
  pointLight(2 * lv, 2 * lv, 2 * lv, 0, height, -3 * height);
  scale(scaler); // Apply scale

  for (let card of deck) {
    card.show(); // Display each card

    // Animate selected card position
    if (card == selected)
      card.pos.lerp(
        createVector(0, -img.height / (scaler * 12), img.height / 3),
        0.1
      );
    // Animate other cards back to position
    else if (card != selected && frameCount > 30 + card.id * 2) {
      card.pos.lerp(card.tpos, 0.1);
      card.ang = lerp(card.ang, card.oang, 0.1); // Smooth rotation
    }
  }

  // Rotate selected card
  if (selected)
    selected.ang = lerp(selected.ang, 2 * TAU + sin(frameCount / 10) / 8, 0.1);

  // Fade-in text
  if (frameCount > 120) copacity = lerp(copacity, tcopacity, 0.1);
  cardinfo.style("opacity", copacity); // Set text opacity

  // Update text
  if (newval && newval == defaultmessage) cardinfo.html(newval);
  else if (newval && tcopacity == 1) {
    counter += 1;
    counter = constrain(counter, 0, newval.length - 1); // Type-out effect
    cardinfo.html(newval.substring(0, counter)); // Display partial text
  }
}

function mouseClicked() {
  selected = null; // Reset selection

  // Check if a card is clicked
  for (let card of deck) {
    if (
      card.contains(
        (mouseX - width / 2) / scaler,
        (mouseY - height / 2) / scaler
      )
    ) {
      selected = card; // Select the clicked card

      // Set card name with "Patriot" font
      if (card.id < 22) {
        newval =
          "<span style='font-family: Patriot, sans-serif; font-size: 24px;'>" +
          "<strong>" +
          table.getString(selected.id, 0) +
          "<br>" +
          table.getString(selected.id, 3) +
          "</strong></span><br><br>";
      } else {
        newval =
          "<span style='font-family: Patriot, sans-serif; font-size: 24px;'>" +
          "<strong>" +
          table.getString(selected.id, 3) +
          " of " +
          table.getString(selected.id, 0) +
          "</strong></span><br><br>";
      }

      // Set card description with "Garamond" font
      newval += "<span style='font-family: Georgia, serif; font-size: 18px;'>";
      for (let i = 0; i < 9; i++) {
        let item = table.getString(selected.id, 4).split("|")[i];
        if (item) {
          newval +=
            item[item.length - 1] != "?" && item[item.length - 1] != "."
              ? item + ".<br>"
              : item + "<br>";
        }
      }
      newval += "</span>"; // Close Garamond font span
    }
  }
  if (selected == null) newval = defaultmessage; // Reset text if no card selected
  counter = 0; // Reset typing animation
}

function keyPressed() {
  // Toggle text visibility with SPACE
  if (keyCode == 32) tcopacity = 1 - tcopacity;

  // Flip cards with F
  if (keyCode == 70) flipCards();

  // Shuffle or sort deck with S
  if (keyCode == 83) {
    shuffled = !shuffled;
    if (shuffled) shuffleCards();
    else sortCards();
  }

  // Stack or unstack deck with ENTER
  if (keyCode == 13) stackCards();
}

function flipCards() {
  if (stacked) return; // Don't flip if stacked
  flipper = PI - flipper; // Toggle flip angle
  for (let card of deck) {
    let newang = flipper + random(-QUARTER_PI / 3, QUARTER_PI / 3); // Set random rotation angle
    card.oang = newang;
  }
}

function shuffleCards() {
  if (stacked) return; // Don't shuffle if stacked
  for (var i = deck.length - 1; i >= 0; i--) {
    // Fisher-Yates shuffle algorithm, used for randomly shuffling an array
    // var i = deck.length - 1: Start with the last element in deck.
    // i >= 0; i--: Move backward through the array until reaching the start.

    var j = Math.floor(Math.random() * (i + 1));
    [deck[i].tpos.x, deck[j].tpos.x] = [deck[j].tpos.x, deck[i].tpos.x];
    [deck[i].tpos.y, deck[j].tpos.y] = [deck[j].tpos.y, deck[i].tpos.y];
    [deck[i].opos.x, deck[j].opos.x] = [deck[j].opos.x, deck[i].opos.x];
    [deck[i].opos.y, deck[j].opos.y] = [deck[j].opos.y, deck[i].opos.y];
  }
}

function sortCards() {
  for (let card of deck) {
    // Reset cards to original positions
    card.tpos.x = card.oopos.x;
    card.tpos.y = card.oopos.y;
    card.opos.x = card.oopos.x;
    card.opos.y = card.oopos.y;
  }
}

function stackCards() {
  frameCount = 30;
  stacked = !stacked; // Toggle stacked state
  if (stacked) {
    // Arrange cards in stack if stacked
    selected = null;
    newval = defaultmessage;
    tcopacity = 0;
    for (let card of deck) {
      card.oang = PI;
      card.tpos = createVector(0, 0, -height + card.id);
    }
  } else {
    // Restore positions if unstacked
    tcopacity = 1;
    for (let card of deck) {
      card.oang = random(-QUARTER_PI / 3, QUARTER_PI / 3);
      card.tpos = card.oopos;
    }
  }
}
