import Axios from 'axios'

export async function getPokemonTrio() {
  const arrayPokemon = []

  while (arrayPokemon.length < 3) {
    const randomPoke = Math.floor(Math.random()*965)
    arrayPokemon.includes(randomPoke) ? console.log('repeat') : arrayPokemon.push(Axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPoke}/`))
  }

  return Promise.all(arrayPokemon).then((pokeTrioData) => {
    const generatedTrio = []
    pokeTrioData.forEach((eachPoke) => {
      generatedTrio.push({
        name: eachPoke['data']['name'], 
        img: `https://pokeres.bastionbot.org/images/pokemon/${eachPoke['data']['id']}.png`,
        type: eachPoke['data']['types']
      })
    })
    console.log(generatedTrio)
    return generatedTrio
  })
}