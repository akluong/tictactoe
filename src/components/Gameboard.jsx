import { useState } from "react";

export default function Gameboard({onSelectSquare, board}){

  return(
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, columnIndex) => (
              <li keyIndex={columnIndex}>
                <button disabled={playerSymbol !== null ? true : false} onClick={() => onSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}