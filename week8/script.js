const myVideo = document.querySelector("#my-video");
console.log(myVideo);

const playPauseBtn = document.querySelector("#play-pause-btn");
console.log(playPauseBtn);

playPauseBtn.addEventListener("click", togglePlay);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

function togglePlay() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    myvideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

const muteUnmuteBtn = document.querySelector("#mute-unmute-btn");
console.log(muteUnmuteBtn);

muteUnmuteBtn.addEventListener("click", toggleSound);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

function toggleSound() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteUnmuteBtn.style.backgroundColor = "#d5cea3";
    // playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  } else {
    myvideo.muted = true;
    muteUnmuteBtn.style.backgroundColor = "#494737";
    // playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }
}

// thêm progress bar của video
const progressBar = document.querySelector("#progress-bar-fill");
console.log(progressBar);

progressBar.addEventListener("timeupdate", fillProgress);

function fillProgress() {
  const currentTime = myVideo.currentTime;
  console.log("current time", currentTime.toFixed(2));
  const progress = (currentTime / myVideo.duration) * 100;
  console.log("progress", progress.toFixed(2));
  progressBar.style.width = progress + "%";
}

// btn chọn step
// step1
const step1Btn = document.querySelector("#step-1-btn");
console.log(step1Btn);

step1Btn.addEventListener("click", gotoStep1);

function gotoStep1() {
  myVideo.currentTime = 18.4;
}

// step2
const step2Btn = document.querySelector("#step-2-btn");
console.log(step2Btn);

step2Btn.addEventListener("click", gotoStep2);

function gotoStep2() {
  myVideo.currentTime = 45.67;
}
