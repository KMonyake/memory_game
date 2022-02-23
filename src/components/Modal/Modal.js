import "./Modal.css";

export default function Modal() {
    return (
        <div className="modal">
            <ul>
                <li>Select 2 cards which you believe hide the same item to score a point.</li>
                <li>Repeat until all cards are revealed to win.</li>
                <li>Try to complete this task in the least amount of turns.</li>
            </ul>
        </div>
    )
}