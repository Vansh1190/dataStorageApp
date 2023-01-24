let copyText = ""
let IdChecked = false;
// importing firebase database and app and components
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

const firebaseConfig = {
	apiKey: "AIzaSyBW1wTydqfPUch1qmbCtj12X7RUKgPGou8",
	authDomain: "secondform-89501.firebaseapp.com",
	databaseURL: "https://secondform-89501-default-rtdb.firebaseio.com",
	projectId: "secondform-89501",
	storageBucket: "secondform-89501.appspot.com",
	messagingSenderId: "264024686367",
	appId: "1:264024686367:web:72cb3c4da11994efd77a2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// imporitng various things for our database
import { getDatabase, get, child, ref, set } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// for storing Data we use this writeUserData funciton.

function writeUserData(name, notes, id) {

	const db = getDatabase();
	// let id = Math.floor(Math.random() * 500);
	set(ref(db, `users/${id}`), {
		username: name,
		notes: notes
	});

	document.getElementById("resp").innerHTML = `
            <small>Details recorder successfully</small>
					
            `

	setTimeout(() => {
		location.reload()
	}, 2000)
}

// setting a triger for writing data => means when user submit we call the writeUserData Func();
document.getElementById("button").addEventListener("click", function(event) {
	if(document.getElementById("name").value != "" &&
	   document.getElementById("notes").value != "" &&
	   document.getElementById("ID").value){
		
	event.preventDefault()
	let name = document.getElementById("name").value
	let notes = document.getElementById("notes").value
	let id = document.getElementById("ID").value
		if(IdChecked == true){
				writeUserData(name, notes, id)
		}
		else{
			alert("choose a valid ID");
		}
}
	else{
		alert("Fields cannot be Empty")
	}

})


// Now its time to getData from our dataBase with id;
let Retrieve = (id) => {

	const dbRef = ref(getDatabase());
	get(child(dbRef, `users/${id}`)).then((snapshot) => {
		if (snapshot.exists()) {
			console.log(snapshot.val());
			copyText = snapshot.val()["notes"];

			document.getElementById("RetrieveInfo").innerHTML = `
			<div class="NoteElement">
					<h2> TITLE   </h2>
		 			<h3> ${snapshot.val()["username"]} <h3>
					<h2> NOTE </h2>
	    	<div id="RetrievedP">
					<p> ${snapshot.val()["notes"]}  </p>
		 			<img id="copy" src="https://cdn-icons-png.flaticon.com/512/1621/1621635.png" style="width: 20px;
					">
		    </div>
			</div>
	`;
			
		
			document.getElementById("RetrieveInfo").style.border = "2px solid black";
			

			//Trigger for copy button.
			document.getElementById("copy").addEventListener("click", function() {
				window.navigator.clipboard.writeText(copyText).then(() => {
					alert("Copied Successfully");
				})
			})

		} 
		else {
			console.log("No data available");
			document.getElementById("RetrieveInfo").innerHTML = `
			<div class="NoteElement">
					<h2> Please Enter Correct ID   </h2>
 			</div>
	`
		}
	}).catch((error) => {
		console.error(error);
	});

}

// Trigger for Retrieve button
document.getElementById("retrieveButton").addEventListener("click", function() {
	event.preventDefault()
	document.getElementById("RetrieveInfo").innerHTML = `
 <img id="loading" src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" width="100px">
 
 `
	let id = document.getElementById("id").value;
	Retrieve(id);
})





//Constant checking if the Id is Valid or not in Inputing Data

const dbRef = ref(getDatabase());
document.getElementById("ID").addEventListener("input", function() {

	get(child(dbRef, `users/`)).then((snapshot) => {
		if (snapshot.exists()) {
			// console.log(snapshot.val());
			let allIds = Object.keys(snapshot.val());
			if (allIds.includes((document.getElementById("ID").value.toString()))) {
				document.getElementById("check").innerHTML = "Invalid ID, Please try different one."
			}
			else {
				IdChecked = true;
				document.getElementById("check").innerHTML = "Valid, Remember the unique ID to acces Your Data."
				
			}
		}
	})

})

