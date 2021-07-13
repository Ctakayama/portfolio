window.onload = function(){
    document.getElementById("addBlog").addEventListener("click", function(){
        console.log("addblog pressed");
        if(checkLoggedIn()){
            setTimeout(() => document.getElementById("blogEntry").showModal(), 0)
        }else{
            setTimeout(() => document.getElementById("loginErrorDialog").showModal(), 0);
        }
    });
}

