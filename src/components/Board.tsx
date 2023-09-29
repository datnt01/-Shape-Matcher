import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";
import { CellType, ShapeType, ShapeColorType } from "../types";


const shapeNameArr: ShapeType[] = ["square", "circle", "triangle"];
const shapeColorArr: ShapeColorType[] = ["red", "green", "blue"];
function shuffleArr<T>(arr: T[]): T[] {
  return arr.sort(() => Math.random() - 0.5);
};

const genarateData = () => {
  const gameData: CellType[] = [];
  for (let index = 0; index < 8; index++) {
    //make sure we got all shape and color
    const indexOfName = index % shapeNameArr.length
    const indexOfColor = index % shapeColorArr.length
    // push 2 times to make sure we got a pair
    gameData.push({
      id: index,
      shapeName: shapeNameArr[indexOfName],
      shapeColor: shapeColorArr[indexOfColor],
      isFlipped: false,
    });
    gameData.push({
      id: index + 8,
      shapeName: shapeNameArr[indexOfName],
      shapeColor: shapeColorArr[indexOfColor],
      isFlipped: false,
    });
  }
  return gameData
}

const Board: React.FC = () => {
  // states...
  const [isActive, setIsActive] = useState<CellType[]>([]);
  const [gameData, setGameData] = useState<CellType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [countShapeLeft, setCountShapeLeft] = useState<number>(1)
  const [isReadyClick, setReadyClick] = useState<boolean>(true);



  //useEffect
  // Initialize the game board with random shapes and colors
  useEffect(() => {

    const gameData = genarateData()
    setCountShapeLeft(gameData.length)
    setGameData(shuffleArr(gameData));
  }, []);

  useEffect(() => {
    if (isActive.length < 2) return
    setReadyClick(false);
    if (
      isActive[0].shapeColor === isActive[1].shapeColor &&
      isActive[0].shapeName === isActive[1].shapeName
    ) {

      setCountShapeLeft(prev=>prev - 2 )
      setReadyClick(true);
    } else {
      const newGameData = [...gameData];
      for (const i of isActive) {
        const index = gameData.findIndex((x) => x.id === i.id);
        newGameData[index] = { ...i, isFlipped: false };
      }
      setTimeout(() => {
        setGameData(newGameData);
        setReadyClick(true);
      }, 1000);
    }
    setIsActive([]);

  }, [isActive]);
  useEffect(()=>{
    if(countShapeLeft == 0){
      alert(`you win with ${count} move`)
    }
  },[countShapeLeft])

  // Reveal cell
  const handleCellClickCell = (cellObj: CellType, index: number | string) => {
    const currentObj = { ...cellObj };
    currentObj.isFlipped = !currentObj.isFlipped;
    setCount((prev) => prev + 1);
    if (isActive.length <= 2 && isReadyClick) {
      setIsActive((prev) => [...prev, { ...currentObj }]);
      const newArray: CellType[] = [...gameData];
      newArray[Number(index)] = currentObj;
      setGameData(newArray);
    }
  };


  return (
    <div className="board">
      {/* Render each cell in the board */}
      {gameData.map((item, index) => (
        <Cell
          key={index}
          cellObj={item}
          onClick={() => handleCellClickCell(item, index)}
        />
      ))}
    </div>
  );
};

export default Board;
