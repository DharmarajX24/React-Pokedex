export function formatMoves (movesArray) {
  let strMoves = ""
  movesArray.forEach((eachMove) => {
    strMoves = strMoves + eachMove.move.name + ', ' 
  })
  return strMoves
}