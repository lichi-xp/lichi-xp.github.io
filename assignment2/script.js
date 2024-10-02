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

    // Update the displayed start time (current video time)
    startTime.textContent = formatTime(video.currentTime);
  });

  // Set the video duration once metadata is loaded
  video.addEventListener("loadedmetadata", function () {
    endTime.textContent = formatTime(video.duration);
  });

  // Function to format time from seconds to MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  // Seek video when the user clicks on the progress bar
  progressBarContainer.addEventListener("click", function (e) {
    const rect = progressBarContainer.getBoundingClientRect(); // Get the progress bar's position info
    const clickPositionX = e.clientX - rect.left; // Get the X position of the mouse when clicked relative to the bar's offset
    const adjustedClickPosition = Math.max(
      0,
      Math.min(clickPositionX, rect.width)
    ); // Ensure the click doesn't exceed the bar's width
    const clickTime = (adjustedClickPosition / rect.width) * video.duration; // Calculate the time based on the click position and bar width

    video.currentTime = clickTime; // Seek the video to the calculated time
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
    if (hoverTime >= 41 && hoverTime <= 58) {
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

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("video");
  const progressBar = document.querySelector(".progress-bar .progress");
  const startTime = document.querySelector(".start-time");
  const endTime = document.querySelector(".end-time");
  const progressBarContainer = document.querySelector(
    ".progress-bar-container"
  );

  let isDragging = false; // Flag to indicate whether the user is dragging the progress bar

  // Update the progress bar as the video plays
  video.addEventListener("timeupdate", function () {
    if (!isDragging) {
      // Only update if not dragging
      const percentage = (video.currentTime / video.duration) * 100;
      progressBar.style.width = `${percentage}%`;
      startTime.textContent = formatTime(video.currentTime); // Update the current time display
    }
  });

  // Set the video duration once it's loaded
  video.addEventListener("loadedmetadata", function () {
    endTime.textContent = formatTime(video.duration); // Display the video duration
  });

  // Function to format time in MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${secs}`;
  }

  // Mouse down on the progress bar (start dragging)
  progressBarContainer.addEventListener("mousedown", function (e) {
    isDragging = true;
    updateVideoTime(e); // Update the video time immediately on click
  });

  // Mouse move on the progress bar (while dragging)
  progressBarContainer.addEventListener("mousemove", function (e) {
    if (isDragging) {
      updateVideoTime(e); // Update the video time as the user drags
    }
  });

  // Mouse up (end dragging)
  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
    }
  });

  // Update the video time based on mouse position
  function updateVideoTime(e) {
    const rect = progressBarContainer.getBoundingClientRect(); // Get the progress bar position
    const clickPositionX = e.clientX - rect.left; // Get the X position relative to the progress bar
    const adjustedClickPosition = Math.max(
      0,
      Math.min(clickPositionX, rect.width)
    ); // Ensure the click stays within the progress bar
    const clickTime = (adjustedClickPosition / rect.width) * video.duration; // Calculate the new video time based on the click position

    video.currentTime = clickTime; // Set the video's current time to the calculated value

    // Update the progress bar width and current time display
    const percentage = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percentage}%`;
    startTime.textContent = formatTime(video.currentTime);
  }
});

const lyrics = [
  { time: 0, text: "" },
  { time: 3, text: "Hi, it's me again" },
  { time: 5, text: "I'm back (hey)" },
  { time: 7, text: "Let's talk ASAP" },
  { time: 8, text: "Do you have the time? (Let's talk)" },
  { time: 11, text: "A-S-A-P, baby" },
  { time: 15, text: "Hurry up, don't be lazy" },
  { time: 18, text: "A-S-A-P, baby" },
  { time: 22, text: "Hurry up, don't say maybe" },
  { time: 26, text: "할 얘기 다 한 줄 알고 빨간색 눌러 (ah)" },
  { time: 29, text: "끊고 나니 생각나서 다시 또 울려" },
  { time: 33, text: "There's this one more thing" },
  { time: 35, text: "I'll show you, come with me" },
  { time: 37, text: "So much to do and lots to see" },
  { time: 40, text: "Just for a minute" },
  { time: 41, text: "Tik-tok, tik-tok, tik-tok, tik, tik" },
  { time: 47, text: "Just for a minute" },
  { time: 49, text: "Tik-tok, tik-tok, tik-tok, tik, tik" },
  { time: 53, text: "" },
  { time: 57, text: "A-S-A-P, baby" },
  { time: 61, text: "Hurry up, don't say maybe" },
  { time: 65, text: "A-S-A-P, baby" },
  { time: 68, text: "Hurry up, don't say maybe" },
  { time: 71, text: "Tik-tok, tik-tok, tik-tok, tik, tik" },
  { time: 86, text: "Hi, it's me again" },
  { time: 88, text: "I'm back (hey)" },
  { time: 90, text: "Let's talk ASAP" },
  { time: 91, text: "Do you have the time? (Do you like it?)" },
  { time: 93, text: "(Let's talk)" },
  { time: 94, text: "A-S-A-P, baby" },
  { time: 98, text: "Hurry up, don't be lazy" },
  { time: 101, text: "A-S-A-P, baby" },
  { time: 105, text: "Hurry up, don't say maybe" },
  { time: 109, text: "A-S-A-P, baby" },
  { time: 112, text: "Hurry up, don't say" },
  { time: 117, text: "Just for a minute" },
  { time: 120, text: "Tik-tok, tik-tok, tik-tok, tik, tik" },
  { time: 124, text: "Just for a minute" },
  { time: 127, text: "Tik-tok, tik-tok, tik-tok, tik, tik" },
  { time: 133, text: "" },
];

const subtitleDisplay = document.querySelector(".subtitle-display");
const video = document.getElementById("video");

let subtitlesActive = false; // Flag to check if subtitles are active

// Update subtitles only if activated by the subtitle button
video.addEventListener("timeupdate", function () {
  if (!subtitlesActive) return; // Do nothing if subtitles are not active

  const currentTime = video.currentTime;

  // Find the current lyric that matches the video's time
  const currentLyric = lyrics.find((lyric, index) => {
    const nextLyricTime = lyrics[index + 1]
      ? lyrics[index + 1].time
      : video.duration;
    return currentTime >= lyric.time && currentTime < nextLyricTime;
  });

  // Display the lyric if it's not already displayed
  if (currentLyric) {
    subtitleDisplay.innerText = currentLyric.text;
    subtitleDisplay.style.display = "block";
    subtitleDisplay.style.opacity = "1"; // Make sure it fades in smoothly
  }
});

// Subtitle button click event
document
  .querySelector(".subtitle-button")
  .addEventListener("click", function () {
    const subtitleDisplay = document.querySelector(".subtitle-display");
    const videoControls = document.querySelector(".video-control-section");

    if (subtitlesActive) {
      // Hide subtitle and move video controls back
      subtitleDisplay.style.opacity = "0";
      setTimeout(() => {
        subtitleDisplay.style.display = "none";
      }, 500); // Wait for fade-out effect to complete
      videoControls.style.transform = "translateY(0)"; // Move controls back to original position
      subtitlesActive = false; // Deactivate subtitles
    } else {
      // Show subtitle and move video controls down
      subtitleDisplay.style.display = "block";
      setTimeout(() => {
        subtitleDisplay.style.opacity = "1";
      }, 10); // Ensure smooth fade-in effect

      videoControls.style.transform = "translateY(40px)"; // Adjust the distance as needed
      subtitlesActive = true; // Activate subtitles
    }
  });

// Add scroll event to hide subtitle and video control bar when scrolling up
window.addEventListener("scroll", function () {
  const subtitleDisplay = document.querySelector(".subtitle-display");
  const videoControls = document.querySelector(".video-control-section");

  if (window.scrollY > 70) {
    // Show when scrolling down
    videoControls.style.opacity = 1;

    // Only show subtitle if it's been activated by the button
    if (subtitlesActive) {
      // Check if the subtitle has been activated
      subtitleDisplay.style.opacity = 1;
    }
  } else {
    // Hide when scrolling up (or near the top)
    videoControls.style.opacity = 0;

    // Hide the subtitle regardless of whether it's active or not
    subtitleDisplay.style.opacity = 0;
  }
});
