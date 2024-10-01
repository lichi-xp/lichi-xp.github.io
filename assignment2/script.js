window.addEventListener("scroll", function () {
  const video = document.getElementById("video");
  const newJeansText = document.querySelector(".newjeans-text");
  const mediaPlayer = document.querySelector(".media-player");
  const progressBar = document.querySelector(".video-control-section");
  const viewportHeight = window.innerHeight;
  let scrollValue = window.scrollY;

  // Set a threshold for when the transformation starts
  const scrollThreshold = 70; // When the media player should start moving

  // Max position for the video (media player)
  const videoMaxPosition = viewportHeight / 2 - mediaPlayer.offsetHeight / 2; // Center the video
  const textMaxGap = 150; // Extra gap for 'NewJeans' text after video reaches max position

  if (scrollValue > scrollThreshold) {
    // Move video downward as the user scrolls until it reaches center of the viewport
    let translateYValue = (scrollValue - scrollThreshold) * 1.5;
    if (translateYValue > videoMaxPosition) {
      translateYValue = videoMaxPosition; // Stop video at center of the page
    }

    // Apply translate and scale to the video
    let scaleValue = 1 + (scrollValue - scrollThreshold) * 0.002;
    if (scaleValue > 1.8) {
      scaleValue = 1.8; // Limit the video scale
    }
    mediaPlayer.style.transform = `translateY(${translateYValue}px) scale(${scaleValue})`;

    // Move 'NewJeans' text down and increase the gap after the video stops
    let newJeansTranslate = (scrollValue - scrollThreshold) * 2; // Move faster than video
    if (newJeansTranslate > videoMaxPosition + textMaxGap) {
      newJeansTranslate = videoMaxPosition + textMaxGap; // Limit how far the text moves
    }
    newJeansText.style.transform = `translateY(${newJeansTranslate}px)`;

    // Show progress bar when scrolling past the threshold
    progressBar.style.opacity = 1;
  } else {
    // Reset the positions and scale before scrolling past the threshold
    mediaPlayer.style.transform = `translateY(0) scale(1)`;
    newJeansText.style.transform = `translateY(0)`;
    progressBar.style.opacity = 0;
  }
});

document
  .querySelector(".play-pause-button")
  .addEventListener("click", function () {
    const video = document.querySelector("video"); // Assuming you have a <video> tag
    if (video.paused) {
      video.play();
      this.querySelector("img").src = "pause-icon.png"; // Change to pause icon
    } else {
      video.pause();
      this.querySelector("img").src = "play-icon.png"; // Change to play icon
    }
  });

document.querySelector(".volume-button").addEventListener("click", function () {
  const video = document.querySelector("video");
  if (video.muted) {
    video.muted = false;
    this.querySelector("img").src = "volume-on-icon.png"; // Change to volume on icon
  } else {
    video.muted = true;
    this.querySelector("img").src = "volume-off-icon.png"; // Change to volume off icon
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const progressBar = document.querySelector(".progress-bar .progress");
  const startTime = document.querySelector(".start-time");
  const endTime = document.querySelector(".end-time");
  const progressBarContainer = document.querySelector(
    ".progress-bar-container"
  );

  // Update the progress bar as the video plays
  video.addEventListener("timeupdate", function () {
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;

    // Update the displayed start time (current time)
    startTime.textContent = formatTime(video.currentTime);
  });

  // Set the video duration once it's loaded
  video.addEventListener("loadedmetadata", function () {
    endTime.textContent = formatTime(video.duration);
  });

  // Format time in MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  // Seek video by clicking on the progress bar
  progressBarContainer.addEventListener("click", function (e) {
    const progressBarWidth = progressBarContainer.offsetWidth;
    const clickPositionX = e.offsetX; // Get the X position where the click occurred
    const clickTime = (clickPositionX / progressBarWidth) * video.duration; // Calculate the corresponding time

    video.currentTime = clickTime; // Seek the video to the clicked time
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const progressBar = document.querySelector(".progress-bar");
  const mostPlayedButton = document.querySelector(".most-played-button");

  // When hovering over the progress bar, show the "Most played" button
  progressBar.addEventListener("mousemove", function (e) {
    const progressBarWidth = progressBar.offsetWidth;
    const mouseX = e.offsetX;
    const percentage = mouseX / progressBarWidth;
    const hoverTime = percentage * video.duration;

    // Show "Most played" only between 0:00 and 0:07
    if (hoverTime >= 0 && hoverTime <= 7) {
      mostPlayedButton.style.display = "block";

      // Position the "Most played" button at the current mouse position, but outside the progress bar
      const buttonLeft = mouseX - mostPlayedButton.offsetWidth / 2;
      mostPlayedButton.style.left = `${buttonLeft}px`;

      // Position the button below the progress bar (outside of it)
      mostPlayedButton.style.top = `${progressBar.offsetHeight + 10}px`; // 10px gap below the progress bar
    } else {
      mostPlayedButton.style.display = "none";
    }
  });

  // Hide the "Most played" button when leaving the progress bar
  progressBar.addEventListener("mouseleave", function () {
    mostPlayedButton.style.display = "none";
  });
});
