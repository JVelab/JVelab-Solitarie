import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  //write your code here
const suits = ["♣", "♦", "♥", "♠"]
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]

let randomCardSuit = getRandomNumber(suits)
let randomCardNumber = getRandomNumber(numbers)
console.log(randomCardNumber, randomCardSuit)

let topSuit = document.querySelector("#topSuit")
let bottomSuit = document.querySelector("#bottomSuit")
let cardNumber = document.querySelector("#cardNumber")

if (randomCardSuit == "♦" || randomCardSuit == "♥") {
  topSuit.className += " text-danger"
  bottomSuit.className += " text-danger"
}
topSuit.innerHTML = `<p>${randomCardSuit}</p>`
bottomSuit.innerHTML = `<p>${randomCardSuit}</p>`
cardNumber.innerHTML = `<p>${randomCardNumber}</p>`
};
function getRandomNumber(array) {
  return array[Math.floor(Math.random() * array.length)]
}