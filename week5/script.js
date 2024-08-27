console.log("welcome to the class");
let myName = "alice";
const myCity02 = "melbourne";
console.log(myName, "lives in", myCity02);
console.log(`${myName} lives in ${myCity02}`);

let count = 10;
console.log(count);

let isItMorningClass = true;
let isItAfternoonClass = false;

let myStudentRecord = {
  name: "XPhuc",
  id: 1234,
  class: "OART1013",
  isItScience: false,
  isItDesign: true,
};

console.log("Hello everyone, my name is", myStudentRecord.name);
console.log("my id is", myStudentRecord.id);
console.log("my class is", myStudentRecord.class);
console.log("are you science student?", myStudentRecord.isItScience);

const numberArray = [2, 4, 6, 8, 10];
console.log(numberArray[2]);
myStudentRecord.isItScience = true;
if (myStudentRecord.isItScience) {
  console.log("Sorry you are in wrong class");
} else {
  console.log("Welcoe to OART1013");
}

let myScore = 30;
if (myScore >= 90) {
  console.log("You scored a HD");
} else if (myScore < 90 && myScore >= 70) {
  console.log("You scored a DI");
} else if (myScore < 70 && myScore >= 50) {
  console.log("You scored a CR");
} else {
  console.log("You scored NN");
}
