// import authenticate from "./auth.js";

export var myHeaders = new Headers();
export let token = localStorage.getItem('access_token')

myHeaders.append("Authorization", `Bearer ${token}`)

export var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
export default async function getTopArtist(){
    const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5&offset=5", requestOptions);
    const asJson = await response.json();
    console.log(asJson)
    const artistids = [asJson.items[0].id, asJson.items[1].id, asJson.items[2].id, asJson.items[3].id, asJson.items[4].id]
    console.log(artistids)
    return artistids;
}
export async function checkRepeatingArtist(json,seedartists){
    let nonrepeats = []
    for (var i=0; i<json.tracks.length; i++){
        //repeat sees if any of your suggested artists are actually one of your top 5 artists already
        //the complicated "tracks"/"artists" thing is how i accessed a certain element due to the organization of spotify's array
    const repeat = seedartists.includes(json.tracks[i].artists[0].id)
        //double sees if our array of non-repeated artists (non repeats) already contains your artist.
    const double = nonrepeats.includes(json.tracks[i].artists[0].id)
        // if it meets both of these criteria, it appends it.
        if (repeat == false&& double ==false){
            nonrepeats.push(json.tracks[i].artists[0].id)
        }
    }
    return nonrepeats
}
export async function checkPopularity(norepeat){
    let unpop = []
    for (var i =0; i<norepeat.length; i++){
        //this loads the spotify artist api and looks up the artist with that id.
        const response1 = await fetch(`https://api.spotify.com/v1/artists/${norepeat[i]}`, requestOptions)
        // console.log(response1)
        const asJson1 = await response1.json();
        //this is number of followers for that artist.
        const followers =  asJson1.followers.total
        // console.log(followers)
        //if the followers are lower than 250k (can be changed), we push it to the unpop array which is returned
        if (followers <250000){
        unpop.push(asJson1.id)
        }
    }
    return unpop 
}

// genre = “pop”
// async function genreSearch(){
//     const response = await fetch(`https://api.spotify.com/v1/recommendations?limit=100&market=US&seed_genres=${genre}`, requestOptions)
//     const asJson = await response.json();
//     all_artists = []
//     for (var i=0; i< asJson.tracks.length; i++){
//     all_artists.push(asJson.tracks[i].artists[0].id)
//     }
//     checkpop = await checkPopularity(all_artists)
//     generateArtistImages(checkpop)
// }

// export async function (){
//     const response = await fetch("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5&offset=5", requestOptions);
//     const asJson = await response.json();
//     console.log(asJson)
//     const artistids = [asJson.items[0].id, asJson.items[1].id, asJson.items[2].id, asJson.items[3].id, asJson.items[4].id]
//     console.log(artistids)
//     return artistids;
// }