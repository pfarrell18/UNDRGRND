import {requestOptions} from "./initialfetch.js"
import {checkRepeatingArtist,checkPopularity, checkIfUserFollows, generateArtistImages} from "./calls.js"

var artistId;

let genre = "country"
export async function genreSearch(seedartists){
    const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${genre}`, requestOptions)
    const asJson = await response.json();
    

    all_artists = []
    for (var i=0; i< asJson.tracks.length; i++){
        all_artists.push(asJson.tracks[i].artists[0].id)
    }
    // const norepeat = await checkRepeatingArtist(asJson,seedartists)
    // checknew = await checkIfUserFollows(all_artists)
    // checkpop = await checkPopularity(checknew)
    // generateArtistImages(checkpop)
    checkRepeatingArtist(asJson,seedartists)
    .then(checkIfUserFollows)
    .then(checkPopularity)
    .then(generateArtistImages)
    .then(rsp=>{
        for (var i=0; i<allprofiles.length; i++){
            allprofiles[i].addEventListener("click", showGoal)
        }
    })
    
}

export async function runGenre(){
const seedartists = await getTopArtist()
const GenreArtist = await genreSearch(seedartists);

}

runGenre()