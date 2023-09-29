import React, { useState } from 'react';
import './Cell.css';
import {ShapeType,ShapeColorType,CellType} from '../types';

interface CellProps {
  // Your code here
  cellObj:CellType,
  onClick:()=>void
}

const Cell: React.FC<CellProps> = ({cellObj,onClick}: CellProps) => {
  
  return <>
  <div className="flip-card cell" onClick={()=>onClick()}>
  <div className={`flip-card-inner ${cellObj.isFlipped?'flip-card-inner-rotate':''}`} >
    <div className="flip-card-front">
    </div>
    <div className="flip-card-back">
      <div className={`${cellObj.shapeName} ${cellObj.shapeName=='triangle'?`triangle-${cellObj.shapeColor}`: cellObj.shapeColor}`}></div>
      
    </div>
  </div>
</div></>
};

export default Cell;
