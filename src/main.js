import authenticate from "./auth.js";
// import getTopArtist from "./calls.js";
import {getSimiliarArtist,getTopArtist} from "./getArtists.js"
let root = document.querySelector('#content');

let token = localStorage.getItem('access_token');
let expires_on = localStorage.getItem('expires_on');//expires on is when the token expires as a timestamp

if(!token || token === 'undefined' || expires_on === 'NaN' || Number(expires_on) < new Date().getTime()){
    let loginButton = document.createElement('button');
    loginButton.innerHTML ='Click Here to Login into Spotify';
    loginButton.addEventListener('click', authenticate);
    root.append(loginButton);
} else {

    //Here you can start you app with fetch and all that using the token etc
    fetch(`https://api.spotify.com/v1/me`, {
      headers:{
          'Authorization':`Bearer ${token}`
      }  
    })
    .then(resp=>resp.json())
    .then(json=>console.log(json))
    .catch(error=>console.log(error))

}

async function main(){
    const seedartists = await getTopArtist();
    const similiarArtist = await getSimiliarArtist(seedartists);
}
main()

const form = document.getElementsByClassName("form")
const genreSearch = document.createElement("h3")
genreSearch.innerHTML = "Want more? Use our genre search!"
const genrebutton = document.createElement("button")
const linkgenresearch = document.createElement("a")
linkgenresearch.setAttribute("href", "genre.html")
linkgenresearch.innerHTML = "Genre Search"
genrebutton.append(linkgenresearch)
console.log(genreSearch)
form[0].append(genreSearch, genrebutton)