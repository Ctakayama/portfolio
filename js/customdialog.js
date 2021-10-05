
var safe = false;
window.onload = function(){
    let myOutput = document.getElementById("eventOutput");
    let confirm = document.getElementById("confirmDialog");
    let prompt = document.getElementById("promptDialog");
    document.getElementById("customAlert").addEventListener("click", function(){
        console.log("alert pressed");
        myOutput.innerHTML = "";
        setTimeout(() => document.getElementById("alertDialog").showModal(), 0);

    });

    // confirm function
    document.getElementById("customConfirm").addEventListener("click", function(){
        myOutput.innerHTML = "";
        setTimeout(() => confirm.showModal(),0);
        
    });

    // confirm function
    document.getElementById("customPrompt").addEventListener("click", function(){
        myOutput.innerHTML = "";
        setTimeout(function(){prompt.showModal(); safe=false;},0);
    });

    // confirm function
    document.getElementById("customSafePrompt").addEventListener("click", function(){
        myOutput.innerHTML = "";
        setTimeout(function(){prompt.showModal(); safe=true;} ,0);
        
    });

}
function setConfirm(val){
    
    let res = "Confirm result : "
    let confirm = document.getElementById("confirmDialog");
    
    changeOutput(`${res}${val}`);

    confirm.close();
}

function setPrompt(val){
    let res = "Prompt result : "
    let prompt = document.getElementById("promptDialog");
    let name = document.getElementById("promptInput").value;
    if(safe == true){
        name = DOMPurify.sanitize(name);
    }
    if(val == true && name.length > 0){
        changeOutput(`${res}${name}`);
    }else{
        name = "user didn't enter anything";
        changeOutput(`${res}${name}`);
    }
    prompt.close();
    document.getElementById("promptInput").value = "";
}

function changeOutput(msg){
    let myOutput = document.getElementById("eventOutput");
    myOutput.innerHTML = msg;
}
