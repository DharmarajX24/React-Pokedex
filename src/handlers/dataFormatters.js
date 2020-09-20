import { statToProgressVar } from './colors'

export function formatMoves(movesArray) {
  let strMoves = "";
  movesArray.forEach((eachMove) => {
    strMoves = strMoves + eachMove.move.name + ", ";
  });
  return strMoves;
}

export function formatStats(statsArray) {
  const formattedStats = [];

  statsArray.forEach((eachStat) => {
    formattedStats.push({ name: eachStat.stat.name, value: eachStat.base_stat, color: statToProgressVar(Number(eachStat.base_stat)) });
  });

  return formattedStats
}

// "stats": [
//   {
//     "base_stat": 35,
//     "effort": 0,
//     "stat": {
//       "name": "hp",
//       "url": "https://pokeapi.co/api/v2/stat/1/"
//     }
//   },
//   {
//     "base_stat": 55,
//     "effort": 0,
//     "stat": {
//       "name": "attack",
//       "url": "https://pokeapi.co/api/v2/stat/2/"
//     }
//   },
//   {
//     "base_stat": 40,
//     "effort": 0,
//     "stat": {
//       "name": "defense",
//       "url": "https://pokeapi.co/api/v2/stat/3/"
//     }
//   },
//   {
//     "base_stat": 50,
//     "effort": 0,
//     "stat": {
//       "name": "special-attack",
//       "url": "https://pokeapi.co/api/v2/stat/4/"
//     }
//   },
//   {
//     "base_stat": 50,
//     "effort": 0,
//     "stat": {
//       "name": "special-defense",
//       "url": "https://pokeapi.co/api/v2/stat/5/"
//     }
//   },
//   {
//     "base_stat": 90,
//     "effort": 2,
//     "stat": {
//       "name": "speed",
//       "url": "https://pokeapi.co/api/v2/stat/6/"
//     }
//   }
// ]
