import React, { useState } from 'react';
import Player from "./components/Player"
import Gameboard from "./components/Gameboard"
import Log from './components/Log';
import Gameover from './components/Gameover.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js'

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveGameboard(gameTurns){
  let gameboard = [...initialGameboard.map(array => [...array])];

  for (const turn of gameTurns){
    const { square, player } = turn;
    const { row, column } = square;
    
    gameboard[row][column] = player;
  }
  return gameboard
}

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';  
  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer;
}

function deriveWinner(gameboard, players){
  let winner = null;
  
  for (const combination of WINNING_COMBINATIONS){
    const first = gameboard[combination[0].row][combination[0].column];
    const second = gameboard[combination[1].row][combination[1].column];
    const third = gameboard[combination[2].row][combination[2].column];

    if(first && first === second && second === third){
      winner = players[first];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([]);
  
  function handleSelect(rowIndex, columnIndex){
    setGameTurns(prevTurns => {
      deriveActivePlayer(prevTurns)
      
      const updatedTurns = [
        {square: {row: rowIndex, column: columnIndex}, player: currentPlayer }, 
        ...prevTurns
      ];
      return updatedTurns;
    })
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handleNameChange(symbol, name){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: name
      }
    })
  }
  
  const currentPlayer = deriveActivePlayer(gameTurns);
  const gameboard = deriveGameboard(gameTurns)
  const hasDraw = gameTurns.length === 9 && !winner;
  const winner = deriveWinner(gameboard, players);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol='X' isActive={currentPlayer === 'X'} handleNameChange={handleNameChange}/>
          <Player initialName={PLAYERS.O} symbol='O' isActive={currentPlayer === 'O'} handleNameChange={handleNameChange}/>
        </ol>
        {(winner || hasDraw) && <Gameover winner={winner} handleRematch={handleRematch}/>}
        <Gameboard onSelectSquare={handleSelect} board={gameboard} activePlayer={currentPlayer}/>
      </div>
      <Log gameTurns={gameTurns}/>
    </main>
  )
}

export default App
