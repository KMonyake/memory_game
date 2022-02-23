import "./Card.css";


export default function Card({ card, handleChoice, flipped, disabled }) {
    function handleCardClick(){
        if(!disabled){
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={flipped? "flipped" : ""}>
                <img className="front" src={card.src} alt="card-front" />
                <img onClick={handleCardClick} className="back" src="/img/cover.png" alt="card-cover" />
            </div>
        </div>
    )
}