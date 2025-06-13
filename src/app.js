import "bootstrap";
import "./style.css";


import "./assets/img/4geeks.ico";

const suits = ["Treboles", "Diamantes", "Corazones", "Picas"]
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]

const maze = []

function newGame() {
  createMaze()
  shuffleMaze()
  console.log(maze)
}

window.onload = newGame()

function createMaze() {
  for(let i = 0; i < numbers.length; i++) {
    for(let j = 0; j < suits.length; j++) {
      if (suits[j] == "Diamantes" || suits[j] == "Corazones") {
        let card = {
          number: i + 1,
          suits: suits[j],
          color: "rojo",
          image: `${i + 1}_de_${suits[j]}`
        }
        maze.push(card)
      }
      else {
        let card = {
          number: i + 1,
          suits: suits[j],
          color: "negro",
          image: `${i + 1}_de_${suits[j]}`
        }
        maze.push(card)
      }
    }
  }
}

function shuffleMaze() {
  for (let i = maze.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [maze[i], maze[j]] = [maze[j], maze[i]];
  }
  return maze;
}

const actualCard = document.querySelector(".card")
const dropZoneClubs = document.getElementById("dropClubs")
const dropZoneSpades = document.getElementById("dropSpades")
const dropZoneDiamond = document.getElementById("dropDiamond")
const dropZoneHearts = document.getElementById("dropHearts")

// actualCard.addEventListener("dragstart", e => {
//   console.log("dragstart")
// })
// actualCard.addEventListener("dragend", e => {
//   console.log("drop")
// })
// actualCard.addEventListener("drag", e => {
//   console.log("drag")
// })

// dropZoneClubs.addEventListener("dragenter", e => {
//   console.log("entro")
// })