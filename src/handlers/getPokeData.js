import Firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCWx0_YmqNyKNpvcyCSi7IKOFy9EsaQbCk",
  authDomain: "react-pokedex-4e168.firebaseapp.com",
  databaseURL: "https://react-pokedex-4e168.firebaseio.com",
  projectId: "react-pokedex-4e168",
  storageBucket: "react-pokedex-4e168.appspot.com",
  messagingSenderId: "210469561215",
  appId: "1:210469561215:web:5086fcedf9aee50a72704a",
  measurementId: "G-J4CYZEEQXN",
};
// Initialize Firebase
Firebase.initializeApp(firebaseConfig);

const firestore = Firebase.firestore();

export async function getPokeData() {
  const pokeData = [
    firestore.collection("data").doc("pokemons").get(),
    firestore.collection("data").doc("pokemonNames").get(),
  ];
  // const pokeDataRef = firestore.collection("data").doc("pokemons");
  return Promise.all(pokeData)
    .then((pokeDataFetched) => {
      const pokeArray = pokeDataFetched[0].data().pokemons;
      const pokeNamesArray = pokeDataFetched[1].data().pokemons
      return { result: true, data: [pokeArray, pokeNamesArray] };
    })
    .catch((errGettingPokeData) => {
      console.log(errGettingPokeData);
      return { result: false, data: [] };
    });
}
