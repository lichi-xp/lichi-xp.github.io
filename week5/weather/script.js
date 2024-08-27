// function checkWeather() {
//   let temp = document.querySelector("#temp");
//   let body = document.querySelector("body");
//   let outer = document.querySelector(".outer");
//   console.log(temp.value);
//   if (temp.value >= 40) {
//     body.style.backgroundcolor = "red";
//     outer.style.backgroundcolor = "blue";
//     console.log("it is burning hot");
//   } else if (temp.value < 40 && temp.value >= 30) {
//     body.style.backgroundColor = "limegreen";
//     outer.style.backgroundcolor = "peach";
//     console.log("it is sunny and warm");
//   } else if (temp.value < 30 && temp.value >= 15) {
//     body.style.backgroundColor = "aqua";
//     outer.style.backgroundcolor = "purple";
//     console.log("it is pleasant weather");
//   } else {
//     body.style.backgroundColor = "grey";
//     outer.style.backgroundcolor = "coral";
//     console.log("it is freezing");
//   }
// }

// console.log("Hello Sarah");
// console.log("Hello Peter");
// console.log("Hello Alice");
// console.log("Hello Robert");
// console.log("Hello Jenny");

// function randomInteger (min, max) {
//     return Math.floor(min + ((max-min) * Math.random()))
//   }
  
//   function pick (inputArray) {
//     return inputArray[randomInteger(0,inputArray.length)]
// }  

// const names = ["Sarah", "Peter", "Alice", "Jenny", "Rohit", "Frank"];
// console.log(names.length);
// for (let i = 0, i < names.length; i++) {
//     console.log("hello", names[i]);
// }

let shoppingCart = [
    {name: "T-shirt", price: 20},
    {name: "Jeans", price: 50},
    {name: "Sneakers", price: 80},
    {name: "Backpack", price: 30},
];

let total =
    shoppingCart[0].price +
    shoppingCart[1].price +
    shoppingCart[2].price +
    shoppingCart[3].price;

console.log(total);
let sum=0;
for (let i = 0, i < 4, i++) {
    sum = sum +shoppingCart[i].price;
    console.log("intermediate sum", sum)
}

console.log(sum)