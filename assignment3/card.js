class Card {
  constructor(pos, img, id) {
    this.pos = createVector(0, 0, -height + id); // Current position in 3D space
    this.opos = createVector(pos.x, pos.y, 0); // Original position for reset
    this.tpos = createVector(pos.x, pos.y, 0); // Target position for animations
    this.oopos = createVector(pos.x, pos.y, 0); // Permanent original position
    this.img = img; // Image used for the back of the card
    this.oang = random(-QUARTER_PI / 3, QUARTER_PI / 3); // Random initial rotation angle
    this.ang = PI; // Starting rotation angle
    this.id = id; // Unique identifier for each card
  }

  show() {
    push(); // Start a new transformation state
    translate(this.pos); // Move to card's position
    rotateY(this.ang); // Rotate the card around the Y-axis
    specularMaterial(40); // Set material properties for lighting
    shininess(20); // Set shininess level for light reflections
    noStroke(); // Remove border around the card
    texture(this.img); // Apply image as the card texture

    if (this == selected) scale(1 / scaler); // Scale up the selected card
    plane(this.img.width, this.img.height); // Render the card as a 2D plane

    // Display card back if card is rotated more than halfway
    if (this.ang > HALF_PI) {
      translate(0, 0, -0.01); // Slight offset to avoid Z-fighting
      texture(back); // Apply back image texture
      plane(this.img.width, this.img.height); // Render the back plane
    }
    pop(); // Restore the previous transformation state
  }

  contains(x, y) {
    // Check if given x, y coordinates are within card boundaries
    return (
      x > this.pos.x - this.img.width / 2 &&
      x < this.pos.x + this.img.width / 2 &&
      y > this.pos.y - this.img.height / 2 &&
      y < this.pos.y + this.img.height / 2
    );
  }
}
