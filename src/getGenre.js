import {requestOptions} from "./initialfetch.js"
import {checkRepeatingArtist,checkPopularity, checkIfUserFollows, generateArtistImages} from "./calls.js"

let listofgenres = ["acoustic", "afrobeat", "alt-rock", "alternative","ambient","anime","black-metal","bluegrass","blues","bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical","club","comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco","disney","drum-and-bass","dub","dubstep","edm","electro","electronic","emo","folk","forro","french","funk","garage","german","gospel","goth","grindcore","groove","grunge","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal","hip-hop","holidays","honky-tonk","house","idm","indian","indie","indie-pop","industrial","iranian","j-dance","j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc","metalcore","minimal-techno","movies","mpb","new-age","new-release","opera","pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop","progressive-house","psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly","romance","sad","salsa","samba","sertanejo","show-tunes","singer-songwriter","ska","sleep","songwriter","soul","soundtracks","spanish","study","summer","swedish","synth-pop","tango","techno","trance","trip-hop","turkish","work-out","world-music"]
let genrebar = document.getElementById("genre")

for (var i=0; i<listofgenres.length; i++){
    let genrediv = document.createElement("option")
    genrediv.setAttribute("value", listofgenres[i])
    genrediv.innerHTML = listofgenres[i]
    genrebar.append(genrediv)

}


// let genre = "country"
// export async function genreSearch(seedartists){
//     const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=50&market=US&seed_genres=${genre}`, requestOptions)
//     const asJson = await response.json();
    

//     all_artists = []
//     for (var i=0; i< asJson.tracks.length; i++){
//         all_artists.push(asJson.tracks[i].artists[0].id)
//     }
//     // const norepeat = await checkRepeatingArtist(asJson,seedartists)
//     // checknew = await checkIfUserFollows(all_artists)
//     // checkpop = await checkPopularity(checknew)
//     // generateArtistImages(checkpop)
//     checkRepeatingArtist(asJson,seedartists)
//     .then(checkIfUserFollows)
//     .then(checkPopularity)
//     .then(generateArtistImages)
//     .then(rsp=>{
//         for (var i=0; i<allprofiles.length; i++){
//             allprofiles[i].addEventListener("click", showGoal)
//         }
//     })
    
// }

// export async function runGenre(){
// const seedartists = await getTopArtist()
// const GenreArtist = await genreSearch(seedartists);

// }

// // runGenre()

// let allprofiles = document.getElementsByClassName('profile')
// // console.log(allprofiles[0])


// export function showGoal(){
// this.children[0].classList.toggle("hidden")
// this.children[1].classList.toggle("hidden")
// }
