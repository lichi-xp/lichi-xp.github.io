// JavaScript to control the scroll effect for video and 'NewJeans' text
window.addEventListener("scroll", function () {
  const videoWrapper = document.querySelector(".video-wrapper");
  const newJeansText = document.querySelector(".newjeans-text");

  // Adjust video position based on scroll
  let scrollValue = window.scrollY;
  videoWrapper.style.transform = `translateY(${scrollValue * 0.3}px)`;

  // Adjust 'NewJeans' text position based on scroll
  newJeansText.style.transform = `translateY(${scrollValue * 0.5}px)`;
});
