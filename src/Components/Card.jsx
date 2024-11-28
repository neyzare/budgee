import React from "react";
import '../css/Card.css'
import { useNavigate } from "react-router-dom";

function Card({ title, description, navigateTo }) {
  
  const navigate = useNavigate()

  const handleClick = () => {
    if (navigateTo) {
      console.log(`Redirection vers : ${useNavigate}`);
      navigate(navigateTo)
    } else {
      console.log("Pas de redirection définie.");
    }
  };

  return (
    <div
      className="card w-full h-52 bg-white rounded-2xl cursor-pointer flex flex-col overflow-hidden shadow-2xl shadow-gray-500	"
      onClick={handleClick}
    >
      {/* Partie supérieure : titre centré */}
      <div className="title flex-1 flex justify-center items-center text-xl font-bold text-center text-black">
        <h1>{title}</h1>
      </div>

      {/* Partie inférieure : description avec bg-bleu-card */}
      <div className="description bg-bleu-card flex-1 flex justify-center items-center text-white text-center">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;