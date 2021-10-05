var editRow = null;
var mytd = null;
var myData = [];
var db_id = [];
var db  = firebase.firestore();
const dbName = "postData";

window.onload = setTimeout(() => preset(), 0);

//runs on startup
function preset(){
    

    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            console.log("user is signed in");
            replaceLogin();
            setWelcome();
        }else{
            console.log("user signed out");
        }
    });

    //load all posts from database
    db.collection(dbName).get().then((querySnapshot)=>{
        querySnapshot.forEach((post) => {
            var data = post.data();
            var myPost = {};
            myPost["author"] = `${data.author}`;
            myPost["postDate"] = `${data.postDate}`;
            myPost["postSummary"] = `${data.postSummary}`;
            myPost["postTitle"] = `${data.postTitle}`;
            db_id.push(`${data.postId}`)
            loadUp(myPost);
        });
    })
}

function crudSubmit(){
    var data = readDialog();
    if(verify()){
        console.log("valid")
        if(editRow == null){
            //new blog case
            insert(data);
        }else{
            //edit blog case
            update(data);
        }
        document.getElementById('blogEntry').close();
        resetForm();
    }else{
        setTimeout(() => document.getElementById("alertDialog").showModal(), 0);
    }
    

}

//reads the input from dialog into object
function readDialog(){
    var data = {};
    data["postTitle"] = DOMPurify.sanitize(document.getElementById("postTitle").value);
    data["postDate"] = new Date().toLocaleString('en-US');
    data["author"] = getUser();
    data["postSummary"] = DOMPurify.sanitize(document.getElementById("postSummary").value);
    return data;
}

//loads and stores in local storage
function insert(entry){
    loadUp(entry);

    myData.push(entry);
    
    // updateLocalStorage();
    //add to db
    db.collection(dbName).add(entry)
    .then((docRef)=>{
        console.log("doc written with id: ", docRef.id);
        updateDoc(docRef.id);
        db_id.push(docRef.id);
    })
    .catch((error)=>{
        console.error("error adding document: ", error);
    });
}

//loads up but doesn't add to local storage; ran once per blog entry
function loadUp(entry){
    database = document.getElementById("blogList").getElementsByTagName('tbody')[0];
    var row = database.insertRow(database.length);
    cell = row.insertCell(0);
    cell.innerHTML = entry.postTitle;
    cell2 = row.insertCell(1);
    cell2.innerHTML = entry.postDate;
    cell3 = row.insertCell(2);
    cell3.innerHTML = entry.author;
    cell4 = row.insertCell(3);
    cell4.innerHTML = entry.postSummary;
    cell5 = row.insertCell(4);
    if(checkLoggedIn()==true){
        cell5.innerHTML = `<a onClick="edit(this)" class = "edit admin-actions" style = "display: inherit;">Edit</a> 
        <a onClick="deletePrompt(this)" class = "del admin-actions" style = "display: inherit;">Delete</a>`
    }else{
        cell5.innerHTML = `<a onClick="edit(this)" class = "edit admin-actions" style = "display: none;">Edit</a> 
        <a onClick="deletePrompt(this)" class = "del admin-actions" style = "display: none;">Delete</a>`
    }

    // buildBlogArticle(entry.postTitle, entry.postDate, entry.author, entry.postSummary);

}

//fills form with existing item data
function edit(td){
    if(checkLoggedIn()){
        setTimeout(() => document.getElementById("blogEntry").showModal(), 0)
        editRow = td.parentElement.parentElement;
        document.getElementById("postTitle").value = editRow.cells[0].innerHTML;
        // document.getElementById("postDate").value = editRow.cells[1].innerHTML;
        document.getElementById("postSummary").value = editRow.cells[3].innerHTML;
    }else{
        setTimeout(() => document.getElementById("loginErrorDialog").showModal(), 0);
    }


}

function updateDoc(docRef){
    var ref = db.collection(dbName).doc(docRef);

    return ref.update({
        postId: docRef
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
}

//change values for existing entry
function update(entry){
    console.log("Edit this row: " + editRow.rowIndex)
    editRow.cells[0].innerHTML = entry.postTitle;
    editRow.cells[1].innerHTML = entry.postDate;
    editRow.cells[2].innerHTML = entry.author;
    editRow.cells[3].innerHTML = entry.postSummary;

    myData[editRow.rowIndex-1] = entry;
    var id = db_id[editRow.rowIndex-1];
    console.log("Edit this id: " + id);
    // updateLocalStorage();
    console.log(entry);
    var r = db.collection(dbName).doc(id);

    return r.update({
        postTitle: entry.postTitle,
        postDate: entry.postDate,
        author: entry.author,
        postSummary: entry.postSummary
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });

    editRow = null;

}

//clears value when edit is cancelled
function cancel(){
    editRow = null;
}

function deletePrompt(td){
    if(checkLoggedIn()){
        mytd = td;
        setTimeout(() => document.getElementById("blogDelete").showModal(), 0);
    }else{
        setTimeout(() => document.getElementById("loginErrorDialog").showModal(), 0);
    }
}

//clears remove entry from table & localstorage
function deleteEntry(td){
    row = td.parentElement.parentElement;
    console.log(db_id[row.rowIndex-1]);
    myData.splice((row.rowIndex-1),1);
    //updateLocalStorage();
    
    db.collection(dbName).doc(db_id[row.rowIndex-1]).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    db_id.splice((row.rowIndex-1),1);


    document.getElementById("blogList").deleteRow(row.rowIndex);
    
    resetForm();
}

function resetForm(){
    document.getElementById("postTitle").value = "";
    // document.getElementById("postDate").value = "";
    document.getElementById("postSummary").value = "";
}

//check that every field is filled out
function verify(){
    hasTitle = document.getElementById("postTitle").value != "";
    // hasDate = document.getElementById("postDate").value != "";
    hasSummary = document.getElementById("postSummary").value != "";
    return hasTitle && hasSummary;
}

// function updateLocalStorage(){
//     localStorage.setItem('blogs', JSON.stringify(myData))
// }

function buildBlogArticle(t, d, a, s){
    var container = document.getElementById("blogContainer");
    container.innerHTML+=`<div class = "card"><h2><strong>`+t+
                        `</strong><br><h3>by `+a
                        +`</h3></h2>Last Updated: `+ d +
                        `<p>`+s
                        +`</p>`+`</div>`;
}