const popButton = document.querySelector("#pop-button");
console.log(popButton);
const popSound = document.querySelector("#pop-sound");
console.log(popSound);
const playButton = document.querySelector("#play-button");
console.log(playButton);
const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);
const notify = document.querySelector("#notify");
console.log(notify);
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

playVideo.addEventListener("click", playVideo);
function playVideo() {
  myVideo.play();
}

pauseVideo.addEventListener("click", pauseVideo);
function pauseVideo() {
  notify.pause();
}

popButton.addEventListener("click", playPopSound);
function playPopSound() {
  popSound.play();
}
