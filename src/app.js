import "bootstrap";
import "./style.css";


import "./assets/img/4geeks.ico";

const suits = ["Treboles", "Diamantes", "Corazones", "Picas"]
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]
const maze = []
const newCardMaze = []
const playZones = []
const mazeZone = document.querySelector("#maze")
const newGameButton = document.querySelector("#new-game-button")

newGameButton.addEventListener("click", newGame)
mazeZone.addEventListener("click", getNewCard)

const actualCard = document.querySelector(".card")
const dropZoneClubs = document.getElementById("dropClubs")
const dropZoneSpades = document.getElementById("dropSpades")
const dropZoneDiamond = document.getElementById("dropDiamond")
const dropZoneHearts = document.getElementById("dropHearts")

function newGame() {
  resetGame()
  createMaze()
  shuffleMaze()
  console.log(maze)
  dealTheCards()
  console.log(playZones)
  placeCards()
  placeMaze()
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
          image: `${i + 1}-de-${suits[j]}`,
          flipped: true
        }
        maze.push(card)
      }
      else {
        let card = {
          number: i + 1,
          suits: suits[j],
          color: "negro",
          image: `${i + 1}-de-${suits[j]}`,
          flipped: true
        }
        maze.push(card)
      }
    }
  }
}

function resetGame() {
  // Limpiar arrays
  maze.length = 0
  playZones.length = 0
  newCardMaze.length = 0

  // Limpiar contenido visual del mazo
  mazeZone.innerHTML = ""

  // Limpiar carta actual mostrada
  const newCardZone = document.querySelector("#new-card")
  newCardZone.innerHTML = ""

  // Limpiar zonas de juego
  for (let i = 0; i < 7; i++) {
    const col = document.querySelector(`#play-zone-${i}`)
    if (col) col.innerHTML = ""
  }
}

function shuffleMaze() {
  for (let i = maze.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [maze[i], maze[j]] = [maze[j], maze[i]];
  }
  return maze;
}

function dealTheCards() {
  for(let i = 0; i < 7; i++) {
    playZones.push([])
    for(let j = 0; j < i + 1; j++) {
      playZones[i].push(maze[0])
      maze.shift()
    }
  }
}

function crateCardHTML(card) {
  const cardHTML = document.createElement("div")
  const cardImg = document.createElement("img")
  cardHTML.classList.add("absolute-card")
    if (card.flipped) {
      cardImg.src = "../assets/img/cards/back.png"
    }
    else {
      cardImg.src = `../assets/img/cards/${card.image}.png`
    }
  cardHTML.appendChild(cardImg)
  return cardHTML
}

function placeCards() {
  for (let i = 0; i < playZones.length; i++) {
    const col = document.querySelector(`#play-zone-${i}`)
    for (let j = 0; j < playZones[i].length; j++) {
      const card = playZones[i][j]
      if (j == playZones[i].length - 1) {
      card.flipped = false
    }
      const cardHTML = crateCardHTML(card)
      cardHTML.style.top = `${j * 30 + 2}px`
      
      col.appendChild(cardHTML)
    }
  }
}

function placeMaze() {
  for (let i = 0; i < maze.length; i++) {
    const card = maze[i]
    const cardHTML = crateCardHTML(card)
    mazeZone.appendChild(cardHTML)
  }
}

function getNewCard() {
  const newCardZone = document.querySelector("#new-card")
  if (newCardZone.children.length === 0) {
    const newCard = maze[0]
    const newCardHTML = mazeZone.firstChild
    newCard.flipped = false
    console.log(newCardHTML.src)
    newCardHTML.firstChild.src = `../assets/img/cards/${newCard.image}.png`
    console.log(newCardHTML.src)
    newCardZone.appendChild(newCardHTML)
    newCardMaze.push(maze[0])
    maze.shift()
  }
}

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