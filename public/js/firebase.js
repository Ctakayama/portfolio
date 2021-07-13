// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDG3SwJjyIgixz0c5FHA60E20myj9zCK5Q",
    authDomain: "cse134bhw5-572b2.firebaseapp.com",
    databaseURL: "https://cse134bhw5-572b2-default-rtdb.firebaseio.com",
    projectId: "cse134bhw5-572b2",
    storageBucket: "cse134bhw5-572b2.appspot.com",
    messagingSenderId: "364123087580",
    appId: "1:364123087580:web:0455438f4ba39907ba4a19"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function showLogin(){
    if(!checkLoggedIn()){
        setTimeout(() => document.getElementById("loginDialog").showModal(), 0);
        document.getElementById("loginEmail").value="";
        document.getElementById("loginPassword").value="";
    }else{
        setTimeout(() => document.getElementById("loginErrorDialog").showModal(), 0);
    }

}

function signin(){
    
    var email = document.getElementById("loginEmail").value;
    var pass = document.getElementById("loginPassword").value;

    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((userCredential) => {
        console.log("log in success");
        localStorage.setItem('isLoggedIn', true);
        // Signed in
        user = userCredential.user;
        // replaceLogin();
        // setWelcome();
    })
    .catch((error) => {
        console.log("error logging in");
        var errorCode = error.code;
        var errorMessage = error.message;
        setTimeout(() => document.getElementById("loginFailDialog").showModal(), 0);
    });
}

function replaceLogin(){
    console.log("replacing login...");
    document.getElementById('loginDialog').close();
    logBtn = document.getElementById("login");
    signOutBtn = document.getElementById("signOut");
    addBtn = document.getElementById("addBlog");
    if(logBtn.style.display == "inline"){
        logBtn.style.display = "none";
        signOutBtn.style.display = "inline";
        addBtn.style.display = "inline";
    }else{
        logBtn.style.display = "inline";
        signOutBtn.style.display = "none";
        addBtn.style.display = "none";
    }

    
    var act = document.getElementsByClassName("admin-actions");
    console.log(act)
    for (let i = 0; i < act.length; i++) {
        if(act[i].style.display == "none"){
            act[i].style.display = "inherit"; 
            // document.querySelectorAll("td:nth-of-type(5)").forEach(el=>{
            //     el.style.display = "table-cell";
            // });
        }else if(checkLoggedIn() != true){
            act[i].style.display = "none"; 
            // document.querySelectorAll("td:nth-of-type(5)").forEach(el=>{
            //     el.style.display = "none";
            // });
        }
    }

    var welcome = document.getElementById("welcomeLogin");

    welcome.innerHTML = "&#8203;";


}


function signOut(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("successful signout")
        localStorage.setItem('isLoggedIn', false);
        replaceLogin();
      }).catch((error) => {
        // An error happened.
      });
      
}

function getUser(){
    try{
        var u = firebase.auth().currentUser["email"];
        return u;
    }catch(e){
        console.log("could not recover current user", e);
        return "";
    }

}


function checkLoggedIn(){
    var user = firebase.auth().currentUser;
    if (user) {
        // User is signed in.
        return true;
    } else {
        // No user is signed in.
        return false
    }
}

function setWelcome(){
    console.log("setting Welcome")
    var welcome = document.getElementById("welcomeLogin");

    welcome.innerHTML = "Logged In as: " + getUser();

}
