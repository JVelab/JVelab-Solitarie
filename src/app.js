import "bootstrap";
import "./style.css";


import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = generateCard()
  //write your code here
function generateCard() {
  
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
document.getElementById("nuevaCarta").addEventListener("click", generateCard)
setInterval(generateCard, 10000)

document.getElementById("width").addEventListener("input", resizeCard)
document.getElementById("heigth").addEventListener("input", resizeCard)

function resizeCard() {
  const cardStyle = document.querySelector(".card").style
  cardStyle.width = document.getElementById("width").value + "px"
  cardStyle.height = document.getElementById("heigth").value + "px"
}