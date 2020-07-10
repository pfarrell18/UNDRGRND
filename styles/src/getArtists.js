import {requestOptions,checkRepeatingArtist,checkPopularity} from "./calls.js"
var artistId;

let genre ="pop"

export async function generateArtistImages(checkpop){
//creates a div where everything will be pushed
    const div = document.getElementsByClassName("container")
//creates a div with an error message if no artists are returned 
    if (checkpop.length===0){
        const errormsg = document.createElement ("div")
        errormsg.innerHTML = "We are having a bit of trouble processing your data. Please use our manual search bar instead!"
        div[0].append(errormsg)
    }
    //creates a header with "your artists are"
    let header = document.getElementsByClassName("header")
    const headertext = document.createElement("h2")
    headertext.innerHTML = "Your UNDR GRND artists are:"
    header[0].append(headertext)
//iterates through all artists that meet criteria and creates a div with their info
//it does this by calling the artist data api and uses their id number from check pop.
//if you'd like to have like 5 people instead of 20, simply change checkpop.length. It might error out if there are too few artists.
    for (var i=0; i<checkpop.length; i++){
    const profile = document.createElement("div")
    profile.classList.add("profile")
    artistId = checkpop[i]
    const response1 = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, requestOptions)
    const asJson1 = await response1.json();
    
    let image = "no image loaded"
    if (asJson1.images.length ===0){
        const profpic = document.createElement("img")
        profpic.setAttribute("src", "./images/underground.png")
        image = profpic
    }
    
    if (asJson1.images.length >1){
        const picUrl = asJson1.images[0].url
        const profpic = document.createElement("img")
        profpic.setAttribute("src", picUrl)
        profpic.classList.add("underground") 
        image = profpic
    }
    
    const name = document.createElement("div")
    name.innerText =`${asJson1.name}`
    profile.append(image, name)
    div[0].append(profile)
}}
    
export default async function getSimiliarArtist(seedartists){
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${seedartists[0]}%2C${seedartists[1]}%2C${seedartists[2]}%2C${seedartists[3]}%2C${seedartists[4]}&max_popularity=30&limit=100`, requestOptions)
    const asJson = await response.json();
    
    
    //runs both functions,
    const norepeat = await checkRepeatingArtist(asJson,seedartists)
    const checkpop = await checkPopularity(norepeat)
    generateArtistImages(checkpop)

    return asJson.tracks[0].artists[0].name;
}
