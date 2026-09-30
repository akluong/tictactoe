import { useState } from "react"

export default function Player({initialName, symbol, isActive, handleNameChange}){

  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName)

  function handleChange(event){
    setPlayerName(event.target.value);
  }
  
  function handleClick(){
    setIsEditing(isEditing => !isEditing);
    
    if (isEditing){
      handleNameChange(symbol, playerName);
    }
  }

  return(
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {isEditing ? 
          <input type="text" required value={playerName} onChange={handleChange}/> : 
          <span className="player-name">{playerName} </span>
        }
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}