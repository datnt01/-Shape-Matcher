// your types here
type ShapeType = 'square'|'circle'|'triangle'

type ShapeColorType = 'red'|'green'|'blue'
type CellType = {
    id: string | number,
    shapeName : ShapeType,
    shapeColor: ShapeColorType
    isFlipped:boolean
}
export type {ShapeType,ShapeColorType,CellType}
