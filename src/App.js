import { useState, useEffect } from "react";
import "./App.css";

// components
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import SharpButton from "./components/SharpButton/SharpButton";
import Grid from "./components/Grid/Grid";

// card images array
const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
  //repeated
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]


export default function App() {
  const [cards,setCards] = useState([]);
  const [turns,setTurns] = useState(0);
  const [disabled,setDisabled] = useState(false);
  const [score,setScore] = useState(0);
  const [showModal,setShowModal] = useState(false);

  // match two cards
  const [firstChoice,setFirstChoice] = useState(null);
  const [secondChoice,setSecondChoice] = useState(null);
  
  // shuffle cards
  function shuffleCards() { 
    //reset last game cards
    cardImages.map(card=>{
      card.matched = false;
    })

    for (let i = cardImages.length - 1; i > 0; i--) {
        const j = Math.floor (Math.random() * (i + 1));
        const temp = cardImages [i];
        cardImages[i] = cardImages [j];
        cardImages[j] = temp;
    }

    const shuffledCards = [...cardImages];

    shuffledCards.map(card => {
      card.id = Math.random();
    });
    
    setCards(shuffledCards);
    setTurns(0);
    
    // reset choices for every new game (just in case)
    setFirstChoice(null);
    setSecondChoice(null);
    setScore(0);
  };

  // 
  function handleChoice(selectedCard){
    // if there is no chosen card yet, this card is the first selected card 
    // else this card becomes the second selected card
    if(!firstChoice){
      setFirstChoice(selectedCard);
    }
    else{
      setSecondChoice(selectedCard);
    }
  }

  useEffect(() => {
    // compare cards
    if(firstChoice && secondChoice){
      // disable cards temporarily
      setDisabled(true);
      if(firstChoice.src === secondChoice.src){
        // if match is found
        firstChoice.matched = true;
        secondChoice.matched = true;
        setScore(prevScore => prevScore + 1);
      }
      // reset cards
      // add a delay before flipping back
      setTimeout(()=>{
        setFirstChoice(null);
        setSecondChoice(null);
        setTurns(prevTurns => prevTurns + 1);
        setDisabled(false);
      },1000);
    }
  },[firstChoice,secondChoice]);
  
  // start game automatically
  useEffect(()=>{
    shuffleCards();
  },[])

  // update score
  useEffect(()=>{
    console.log({score});
    if(score === 6){
      alert("You Win");
    }
  },[score])

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <SharpButton title="New Game" clickFunc={shuffleCards} />
      <SharpButton 
        title={showModal ? "Close Game Rules" : "Show Game Rules"} 
        clickFunc={() => setShowModal(!showModal)} 
      />
      {showModal && <Modal/>}
      <Grid>
        {
          cards.map(card =>
            <Card 
              card={card} 
              key={card.id} 
              handleChoice={handleChoice} 
              flipped={card === firstChoice || card === secondChoice || card.matched}
              disabled={disabled}
            />
          )
        }
      </Grid>
      <p>Turns: {turns}</p>
    </div>
  );
}

// Resources used:

//Video series title: Make a Memory Game with React
//Video series owner: The Net Ninja
//URL: https://www.youtube.com/watch?v=ZCKohZwGZMw&list=PL4cUxeGkcC9iQ7g2eoNXHCJBBBz40S_Lm

// Video title: How to shuffle an cardImages in JavaScript
// Video owner: Junior Developer Central
// URL: https://youtu.be/5sNGqsMpW1E