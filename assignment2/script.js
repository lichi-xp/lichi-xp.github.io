window.addEventListener("scroll", function () {
  const newJeansText = document.querySelector(".newjeans-text");
  const mediaPlayer = document.querySelector(".media-player");
  const progressBar = document.querySelector(".progress-container");
  let scrollValue = window.scrollY;

  // Set a threshold for when the transformation starts
  const scrollThreshold = 100;

  // Get the initial position (from margin-top or starting position)
  const initialMarginTop = 110; // This matches the margin-top from your CSS

  // Move the media-player and 'NewJeans' text downward as the user scrolls
  if (scrollValue > scrollThreshold) {
    let translateYValue = (scrollValue - scrollThreshold) * 1.5; // Increase multiplier for faster scroll movement

    // Limit the maximum position for 'NewJeans' and media-player to stop near the bottom
    const newJeansMaxPosition = 300; // You can adjust this based on how far down you want the media player to move
    if (translateYValue > newJeansMaxPosition) {
      translateYValue = newJeansMaxPosition;
    }

    // Adjust the position, starting from the initial margin-top value
    const finalTranslateY = translateYValue + initialMarginTop;

    // Move 'NewJeans' text down
    newJeansText.style.transform = `translateY(${translateYValue}px)`;

    // Calculate the scaling value (0.002 is the scaling speed multiplier)
    let scaleValue = 1 + (scrollValue - scrollThreshold) * 0.002; // Dynamically increase size as user scrolls

    // Ensure the scale value only grows and never shrinks
    if (scaleValue < 1) {
      scaleValue = 1;
    }

    // Limit the scale value to a maximum (e.g., max 1.8 times the original size)
    if (scaleValue > 1.8) {
      scaleValue = 1.8;
    }

    // Apply both movement and scaling to the media-player (containing the video and blurred ellipse)
    mediaPlayer.style.transform = `translateY(${translateYValue}px) scale(${scaleValue})`;

    progressBar.style.opacity = 1; // Show the progress bar when scrolling past 200px
  } else {
    // Keep the media player in its initial position before the scrollThreshold
    mediaPlayer.style.transform = `translateY(${initialMarginTop}px) scale(1)`;

    // Reset the 'NewJeans' text and progress bar
    newJeansText.style.transform = `translateY(0)`; // Keep the text in place before 200px scroll
    progressBar.style.opacity = 0; // Hide the progress bar
  }
});
