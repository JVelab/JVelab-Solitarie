import "bootstrap";
import "./style.css";


import "./assets/img/4geeks.ico";

const maze = []
const newCardMaze = []
const playZones = []
const mazeZone = document.querySelector("#maze")
const finishZones = []

function newGame() {
  const newGameButton = document.querySelector("#new-game-button")
  const mazeZone = document.querySelector("#maze")

  newGameButton.addEventListener("click", newGame)
  mazeZone.addEventListener("click", getNewCard)

  resetGame()
  createMaze()
  shuffleMaze()
  console.log(maze)
  dealTheCards()
  console.log(playZones)
  placeCards()
  placeMaze()
  console.log(maze)
  finalZones()
}

window.onload = newGame()

function createMaze() {
  const suits = ["Treboles", "Diamantes", "Corazones", "Picas"]
  const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]

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
  finishZones.length = 0

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

  // Limpiar zonas finales
  for (let i = 0; i < 4; i++) {
     const zone = document.querySelector(`#finish-zone-${i}`)
     if (zone) zone.innerHTML = ""
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

function crateCardHTML(card, sourceColIndex = null, cardIndex = null, isTop = true) {
  const cardHTML = document.createElement("div")
  const cardImg = document.createElement("img")
  cardHTML.classList.add("absolute-card")
  cardHTML.dataset.number = card.number
  cardHTML.dataset.suit = card.suits
  cardHTML.dataset.color = card.color
  cardHTML.setAttribute("draggable", false)
  cardHTML.dataset.sourceColIndex = sourceColIndex
  cardHTML.dataset.cardIndex = cardIndex

  const draggable = !card.flipped
    cardHTML.setAttribute("draggable", draggable)

    if (draggable) {
      cardHTML.addEventListener("dragstart", e => {
        const fromMaze = sourceColIndex === "maze"

        const stack = fromMaze
          ? [card]
          : playZones[sourceColIndex].slice(cardIndex)

        e.dataTransfer.setData(
          "text/plain",
          JSON.stringify({
            cards: stack,
            card,
            sourceColIndex,
            cardIndex
          })
        )

        setTimeout(() => (cardHTML.style.visibility = "hidden"), 0)
      })

      cardHTML.addEventListener("dragend", () => {
        cardHTML.style.visibility = "visible"
      })
    }

  cardImg.src = card.flipped
    ? "../assets/img/cards/back.png"
    : `../assets/img/cards/${card.image}.png`
  cardImg.setAttribute("draggable", false)
  cardHTML.appendChild(cardImg)

  return cardHTML
}

function placeCards() {
  for (let i = 0; i < playZones.length; i++) {
    const col = document.querySelector(`#play-zone-${i}`)
    makeZoneDroppable(col, i)
    for (let j = 0; j < playZones[i].length; j++) {
      const card = playZones[i][j]
      const isTop = j === playZones[i].length - 1
      if (isTop) card.flipped = false
      const cardHTML = crateCardHTML(card, i, j)
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

  if (newCardZone.children.length === 0 && maze.length > 0) {
    const newCard = maze[0]
    newCard.flipped = false
    const newCardHTML = crateCardHTML(newCard, "maze", 0)
    mazeZone.removeChild(mazeZone.firstChild)
    newCardZone.appendChild(newCardHTML)
    newCardMaze.push(maze.shift())
  }
}

function repaintColumn(colIdx) {
  const colElm = document.querySelector(`#play-zone-${colIdx}`)
  colElm.innerHTML = ""
  const stack = playZones[colIdx]
  for (let i = 0; i < stack.length; i++) {
    const c = stack[i]
    const isTop = i === stack.length - 1
    if (isTop) c.flipped = false
    const el = crateCardHTML(c, colIdx, i, isTop)
    el.style.top = `${i * 30 + 2}px`
    colElm.appendChild(el)
  }
}

function makeZoneDroppable(zoneElement, dropColIndex) {
  zoneElement.addEventListener("dragover", (e) => {
    e.preventDefault()
    zoneElement.classList.add("highlight-drop")
  })

  zoneElement.addEventListener("dragleave", () => {
    zoneElement.classList.remove("highlight-drop")
  })

  zoneElement.addEventListener("drop", (e) => {
    e.preventDefault()
    zoneElement.classList.remove("highlight-drop")

   const parsed = JSON.parse(e.dataTransfer.getData("text/plain"))

    const { cards, card, sourceColIndex, cardIndex } = parsed

    let movingCards = []
    let movingTopCard = null

    const fromMaze = sourceColIndex === "maze"

    if (fromMaze) {
      movingTopCard = card
      movingCards = [card]
    } else {
      movingCards = cards
      movingTopCard = cards[0]
    }

    const destStack = playZones[dropColIndex]
    const destTopCard = destStack[destStack.length - 1]

    // Evitar soltar en la misma columna
    if (!fromMaze && sourceColIndex === dropColIndex) return

    // Validar movimiento
    let legalMove = false
    if (destTopCard) {
      legalMove =
        movingTopCard.number === destTopCard.number - 1 &&
        movingTopCard.color !== destTopCard.color
    } else {
      legalMove = movingTopCard.number === 13
    }

    if (!legalMove) {
      console.log("Movimiento ilegal")
      return
    }

    // Movimiento válido, ahora aplicarlo
    if (fromMaze) {
      // Limpiar mazo visual
      document.querySelector("#new-card").innerHTML = ""
      newCardMaze.pop()
    } else {
      // Quitar desde la columna de origen
      playZones[sourceColIndex].splice(cardIndex)
      repaintColumn(sourceColIndex)
    }

    // Añadir a columna de destino
    playZones[dropColIndex].push(...movingCards)
    repaintColumn(dropColIndex)
  })
}

function makeFinalZonesDroppable(zoneElement, finishIndex) {
  zoneElement.addEventListener("dragover", (e) => {
    e.preventDefault()
    zoneElement.classList.add("highlight-drop")
  })

  zoneElement.addEventListener("dragleave", () => {
    zoneElement.classList.remove("highlight-drop")
  })

  zoneElement.addEventListener("drop", (e) => {
    e.preventDefault()
    zoneElement.classList.remove("highlight-drop")

    const parsed = JSON.parse(e.dataTransfer.getData("text/plain"))

    const { card, sourceColIndex, cardIndex } = parsed

    const fromMaze = sourceColIndex === "maze"

    if (finishZones[finishIndex].length === 0 && card.number === 1) {
      if (fromMaze) {
        finishZones[finishIndex].push(card)
        zoneElement.appendChild(crateCardHTML(card))
        document.querySelector("#new-card").innerHTML = ""
        newCardMaze.pop()
      }
      else {
        finishZones[finishIndex].push(card)
        console.log(finishZones)
        zoneElement.appendChild(crateCardHTML(card))
        playZones[sourceColIndex].pop()
        repaintColumn(sourceColIndex)
      }
    }
    else if (card.number - 1 === finishZones[finishIndex][finishZones[finishIndex].length - 1].number && card.suit === finishZones[finishIndex][0].suit) {
      if (fromMaze) {
        finishZones[finishIndex].push(card)
        zoneElement.appendChild(crateCardHTML(card))
        document.querySelector("#new-card").innerHTML = ""
        newCardMaze.pop()
      }
      else {
        finishZones[finishIndex].push(card)
        console.log(finishZones)
        zoneElement.appendChild(crateCardHTML(card))
        playZones[sourceColIndex].pop()
        repaintColumn(sourceColIndex)
      }
    }
    })
}

function finalZones() {
  for (let i = 0; i < 4; i++) {
    const zone = document.querySelector(`#finish-zone-${i}`)
    finishZones.push([])
    makeFinalZonesDroppable(zone, i)
  }
}