function checkGrade() {
  const a1 = document.querySelector("#answer1");
  console.log(a1.value);
  const a2 = document.querySelector("#answer2");
  console.log(a2.value);
  let a1value = parseFloat(a1.value);
  let a2value = parseFloat(a2.value);
  let total = calculateTotal(a1value, a2value);
  //   let total = parseFloat(a1.value) + parseFloat(a2.value);
  console.log(total);
  giveReport(total);
}

function calculateTotal(a, b) {
  let sum = a + b;
  return sum;
}

function giveReport(score) {
  const report = document.querySelector("#report");
  if (score > 30) {
    console.log("you got HD");
    report.textContent = "you got HD";
  } else if (score > 20 && score <= 30) {
    console.log("you got DI");
    report.textContent = "you got DI";
  }
}

const myLoopy = document.querySelector("#loopy-meme");
console.log(myLoopy);

function toggleMe() {
  myLoopy.classList.add("round");
}

const header = document.querySelector("header");
console.log(header.innerHTML);
let personality = "boring";
let doubt = "questions";
header.innerHTML += `<p class="red-heading"> is ${personality}! </p>
<p class="blue-heading"> do you have any ${doubt}? </p>
`;

// const ques1 = document.querySelector("#question1");
// console.log(ques1.textContent);
// ques1.textContent = "What is your all score?";
// ques1.classList.add("red-heading");

// const ques2 = document.querySelector("#question2");
// console.log(ques2.textContent);
// ques2.textContent = "What is your asm2 score?";

// // const allPara = document.querySelectorAll("p");
// // console.log(allPara);

// const heading = document.querySelector("h1");
// console.log(heading.textContent);

// heading.textContent = "new heading";
// heading.classList.add("red-heading");
// heading.classList.add("blue-heading");
// heading.classList.remove("blue-heading");
