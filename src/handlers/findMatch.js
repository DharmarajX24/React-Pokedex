import strSimilarity from "string-similarity";

export function findMatch(pokeName) {
  if (localStorage.getItem("pokeNames")) {
    const pokeNamesArray = JSON.parse(localStorage.getItem("pokeNames"));
    if (Array.isArray(pokeNamesArray)) {
      if (pokeNamesArray.includes(String(pokeName).toLowerCase())) {
        return { result: true, data: String(pokeName).toLowerCase() };
      } else {
        const bestMatchObj = strSimilarity.findBestMatch(
          String(pokeName),
          pokeNamesArray
        );
        console.log(bestMatchObj);
        const bestMatchPoke = bestMatchObj.bestMatch.target;
        const bestMatchRating = bestMatchObj.bestMatch.rating;
        return {
          result: false,
          data: `Do you mean ${bestMatchPoke}? \n${
            String(Number(bestMatchRating) * 100).substring(0, 5)
          }% match`,
        };
      }
    } else {
      localStorage.setItem("firstVisit", false);
      return { result: false, data: "error" };
    }
  } else {
    localStorage.setItem("firstVisit", false);
    return { result: false, data: "error" };
  }
}
