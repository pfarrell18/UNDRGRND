import {requestOptions, token} from "./initialfetch.js"
import {checkRepeatingArtist,checkPopularity, checkIfUserFollows, generateArtistImages} from "./calls.js"
import { myHeaders } from "./initialfetch.js";
var boone;
var artId;

export async function getTopArtist(){
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5&offset=5", requestOptions);
    const asJson = await response.json();
    console.log(asJson)
    const artistids = [asJson.items[0].id, asJson.items[1].id, asJson.items[2].id, asJson.items[3].id, asJson.items[4].id]
    return artistids;
}
    // SEED ARTISTS ARE THE USERS TOP 5 ARTISTS. WE USE THEM TO FIND SIMILIAR ARTISTS.
export async function getSimiliarArtist(seedartists){
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${seedartists[0]}%2C${seedartists[1]}%2C${seedartists[2]}%2C${seedartists[3]}%2C${seedartists[4]}&max_popularity=30&limit=100`, requestOptions)
    const asJson = await response.json();
    //runs both functions,
    checkRepeatingArtist(asJson,seedartists)
    .then(r=> {
        artId = checkIfUserFollows(r);
        // RETURNS AN ITERATED LIST OF UNDRGRND ARTIST THAT THE USER DOES NOT FOLLOW
        console.log(artId)
        return artId;
    })
    
    .then(re=>{
        let item= checkPopularity(re);
        return item;})
        // BOONE IS SET EQUAL TO THE RETURNED ARRAY OF UNDRGRND ARTIST
    .then(res=> {
        boone= res;
        console.log(boone);
        return boone;  // RETURNS THE USERS UNDRGRND
    })
}
