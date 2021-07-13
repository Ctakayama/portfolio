const youTube = 'AIzaSyB9i1MfmdCiGxwY6K-vddpeENs_GBIHxnk';
const user = 'UCPykmFR4omo3FKxOwaa-e5g';
const subCount = document.getElementById("subCount");

window.onload = setTimeout(() => getSubs(), 0);

let getSubs = () =>{
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${user}&key=${youTube}`)
    .then(response =>{
        return response.json();
    })
    .then(data=>{
        subCount.innerHTML = "Subscribers: "+data["items"][0].statistics.subscriberCount + 
        "<br>Views: "+data["items"][0].statistics.viewCount;
    })
}