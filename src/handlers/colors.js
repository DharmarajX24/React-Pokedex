const bgColors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5',
  dark: '#cecece'
};

export function typeToBgColor(pokeType) {
  return bgColors[pokeType]
}

export function typeToBadgeColor(pokeType) {
  return bgColors[pokeType]
}

export function statToProgressVar (stat) {
  if (stat <= 24) {
    return 'danger'
  } else if (stat >= 25 && stat <= 49) {
    return 'warning'
  } else if (stat >= 50 && stat <= 74) {
    return 'info'
  } else {
    return 'success'
  }
}