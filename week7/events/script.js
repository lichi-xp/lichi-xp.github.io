const myButton = document.querySelector("#my-button");
console.log(myButton);

const count = document.querySelector("#count");
console.log(count);

let buttonCount = 0;
myButton.addEventListener("click", myFunction);

function myFunction() {
  //   buttonCount = buttonCount + 1;
  buttonCount++;
  console.log("hey did you just click me?");
  count.textContent = buttonCount;
}
