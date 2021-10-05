export const post_URL = "https://httpbin.org/post"
export const get_URL = "https://httpbin.org/get"
export const del_URL = "https://httpbin.org/delete"
export const put_URL = "https://httpbin.org/put"

export async function postRequest() {

    let response = await fetch(post_URL, {
    method: 'POST',
    body: new FormData(my_form)
    });

    let result = await response.json();
    console.log("sending POST")
    document.getElementById('out').innerHTML=JSON.stringify(result, null, 2);

}

export async function getRequest(){
    let d = new FormData(my_form);
    let fetchURL = get_URL + "?";
    let first = true
    for(var p of d.entries()){
        if(first){
            fetchURL += p[0]+"="+p[1];
            first = false;
        }else{
            fetchURL += "&"+p[0]+"="+p[1];
        }
    }
    let resp  = await fetch(fetchURL, {
        method: 'GET'
    })

    if(resp.ok){
        let json  = await resp.json();
        console.log("Sending GET");
        document.getElementById('out').innerHTML=JSON.stringify(json, null, 2);
    }
    else
    {
        alert("HTTP-Error: " +resp.status)
    }
}

export async function putRequest() {

    let response = await fetch(put_URL, {
    method: 'PUT',
    body: new FormData(my_form)
    });

    let result = await response.json();
    console.log("sending PUT")
    document.getElementById('out').innerHTML=JSON.stringify(result, null, 2);

}


export async function deleteRequest(){
    let d = new FormData(my_form);
    let fetchURL = del_URL + "?";
    let first = true
    for(var p of d.entries()){
        if(first){
            fetchURL += p[0]+"="+p[1];
            first = false;
        }else{
            fetchURL += "&"+p[0]+"="+p[1];
        }
    }
    let response = await fetch(fetchURL, {
        method: 'DELETE' 
    });
    
    let result = await response.json();
    console.log("sending DELETE")
    document.getElementById('out').innerHTML=JSON.stringify(result, null, 2);
}
