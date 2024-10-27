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
    for (let i = 0; i < 13; i++) {
      let x = (i * img.width) / 13;
      let y = (j * img.height) / 6;
      let cimg = img.get(x, y, img.width / 13, img.height / 6);
      let posx = (i - 6) * cimg.width * 1.1;
      let posy = (j - 2.5) * cimg.height * 1.02;
      let card = new Card(createVector(posx, posy, -2 * height), cimg, id);
      deck.push(card);
      id++;
    }
  }
}

let defaultmessage =
  "<u>Click any card to see its meaning!</u> <br> <br>" +
  "Press SPACE to hide or show card info <br>" +
  "Press S to shuffle or sort deck <br>" +
  "Press F to flip all cards over <br>" +
  "Press ENTER to stack or unstack deck <br>";

function instruction() {
  cardinfo = createP(defaultmessage); // Create paragraph with instructions
  cardinfo.position(width / 2 - (scaler * img.width) / 2, height / 2); // Position instructions on screen
  cardinfo.style("width", scaler * img.width + "px"); // Set width based on card scale

  // Instruction text
  cardinfo.style("font-family", "monospace"); // Monospace font
  cardinfo.style("color", "rgba(255,255,255,0.8)"); // White text
  cardinfo.style("text-align", "center"); // Center-align text
  cardinfo.style("fontSize", height / 40 + "px"); // Responsive font size

  // Instruction box
  cardinfo.style("background-color", "rgba(2,42,59,0.6)"); // Dark blue background
  cardinfo.style("borderRadius", height / 60 + "px"); // Rounded corners
  cardinfo.style("border-color", "white"); // White border
  cardinfo.style("border-style", "dotted"); // Dotted border
  cardinfo.style("border-width", height / 200 + "px"); // Responsive border width
  cardinfo.style("padding", height / 60 + "px"); // Responsive padding
  cardinfo.style("opacity", 0); // Initially hidden
}

function draw() {
  lv = min(100, frameCount / 2);
  lv = 100;
  background(0, 0.1 * lv, 0.3 * lv);
  ambientLight(lv);
  lx = lerp(lx, map(mouseX, 0, width, -height, height), 0.1);
  pointLight(2 * lv, 2 * lv, 2 * lv, lx, -height, 3 * height);
  pointLight(2 * lv, 2 * lv, 2 * lv, 0, height, -3 * height);
  scale(scaler);
  for (let card of deck) {
    card.show();
    if (card == selected)
      card.pos.lerp(
        createVector(0, -img.height / (scaler * 12), img.height / 3),
        0.1
      );
    //	else if (frameCount > 30)
    else if (card != selected && frameCount > 30 + card.id * 2) {
      card.pos.lerp(card.tpos, 0.1);
      card.ang = lerp(card.ang, card.oang, 0.1);
    }
  }
  if (selected)
    selected.ang = lerp(selected.ang, 2 * TAU + sin(frameCount / 10) / 8, 0.1);
  if (frameCount > 120) copacity = lerp(copacity, tcopacity, 0.1);
  cardinfo.style("opacity", copacity);
  if (newval && newval == defaultmessage) cardinfo.html(newval);
  else if (newval && tcopacity == 1) {
    counter += 1;
    counter = constrain(counter, 0, newval.length - 1);
    cardinfo.html(newval.substring(0, counter));
  }
}

function mouseClicked() {
  selected = null;
  for (let card of deck) {
    if (
      card.contains(
        (mouseX - width / 2) / scaler,
        (mouseY - height / 2) / scaler
      )
    ) {
      selected = card;
      if (card.id < 22)
        newval =
          "<u>" +
          table.getString(selected.id, 0) +
          "<br>" +
          table.getString(selected.id, 3) +
          "</u><br><br>";
      else
        newval =
          "<u>" +
          table.getString(selected.id, 3) +
          " of " +
          table.getString(selected.id, 0) +
          "</u><br><br>";
      for (let i = 0; i < 9; i++) {
        let item = table.getString(selected.id, 4).split("|")[i];
        if (
          item &&
          item[item.length - 1] != "?" &&
          item[item.length - 1] != "."
        )
          newval += item + ".<br>";
        else if (item) newval += item + "<br>";
      }
    }
  }
  if (selected == null) newval = defaultmessage;
  counter = 0;
}

function keyPressed() {
  if (keyCode == 32) tcopacity = 1 - tcopacity;
  if (keyCode == 70) flipCards();
  if (keyCode == 83) {
    shuffled = !shuffled;
    if (shuffled) shuffleCards();
    else sortCards();
  }
  if (keyCode == 13) stackCards();
}

function flipCards() {
  if (stacked) return;
  flipper = PI - flipper;
  for (let card of deck) {
    let newang = flipper + random(-QUARTER_PI / 3, QUARTER_PI / 3);
    card.oang = newang;
  }
}

function shuffleCards() {
  if (stacked) return;
  for (var i = deck.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [deck[i].tpos.x, deck[j].tpos.x] = [deck[j].tpos.x, deck[i].tpos.x];
    [deck[i].tpos.y, deck[j].tpos.y] = [deck[j].tpos.y, deck[i].tpos.y];
    [deck[i].opos.x, deck[j].opos.x] = [deck[j].opos.x, deck[i].opos.x];
    [deck[i].opos.y, deck[j].opos.y] = [deck[j].opos.y, deck[i].opos.y];
  }
}

function sortCards() {
  for (let card of deck) {
    card.tpos.x = card.oopos.x;
    card.tpos.y = card.oopos.y;
    card.opos.x = card.oopos.x;
    card.opos.y = card.oopos.y;
  }
}

function stackCards() {
  frameCount = 30;
  stacked = !stacked;
  if (stacked) {
    selected = null;
    newval = defaultmessage;
    tcopacity = 0;
    for (let card of deck) {
      card.oang = PI;
      card.tpos = createVector(0, 0, -height + card.id);
    }
  } else {
    tcopacity = 1;
    for (let card of deck) {
      card.oang = random(-QUARTER_PI / 3, QUARTER_PI / 3);
      card.tpos = card.oopos;
    }
  }
}
