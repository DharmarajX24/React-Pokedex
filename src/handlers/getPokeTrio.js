import Axios from 'axios'
import { typeToBgColor } from './colors'

export async function getPokemonTrio() {
  const arrayPokemon = []

  while (arrayPokemon.length < 3) {
    const randomPoke = Math.floor(Math.random()*800)
    arrayPokemon.includes(randomPoke) ? console.log('repeat') : arrayPokemon.push(Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPoke}/`))
  }

  return Promise.all(arrayPokemon).then((pokeTrioData) => {
    const generatedTrio = []
    pokeTrioData.forEach((eachPoke) => {
      generatedTrio.push({
        name: eachPoke['data']['name'], 
        img: `https://pokeres.bastionbot.org/images/pokemon/${eachPoke['data']['id']}.png`,
        type: eachPoke['data']['types'],
        bgCol: typeToBgColor(eachPoke['data']['types'][0]['type']['name'])   
      })
      console.log(eachPoke['data']['types'][0])
    })
    console.log(generatedTrio)
    return generatedTrio
  })
}