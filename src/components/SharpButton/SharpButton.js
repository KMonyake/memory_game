import "./SharpButton.css";


export default function SharpButton({ title, clickFunc }) {
    return (
        <button className="button" onClick={clickFunc}>{title}</button>
    )
}