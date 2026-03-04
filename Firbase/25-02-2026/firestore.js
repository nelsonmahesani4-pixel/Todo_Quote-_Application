


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyDgAn2TSlzeE_1LU6ohWg0Zan6y0JE7gpM",
    authDomain: "my-first-project-1242d.firebaseapp.com",
    projectId: "my-first-project-1242d",
    storageBucket: "my-first-project-1242d.firebasestorage.app",
    messagingSenderId: "995236133636",
    appId: "1:995236133636:web:0758573991e69527df2e51"
};

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addBtn = document.getElementById("addBtn");
const quoteInput = document.getElementById("quoteInput");
const quoteList = document.getElementById("quoteList");

addBtn.addEventListener("click", addQuote);

quoteInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addQuote();
    }
});
const quoteCollection = collection(db, "quotes");

// // ✅ ADD
async function addQuote() {
    const text = quoteInput.value.trim();
    
    if (text === "") {
        alert("Please enter a quote.");
        return;
    }
    
    await addDoc(quoteCollection, {
        quote: text,
        time: serverTimestamp(),
    });
    
    quoteInput.value = "";
    loadQuotes();
}

// ✅ LOAD
async function loadQuotes() {

  quoteList.innerHTML = "";

  const querySnapshot = await getDocs(quoteCollection);

  querySnapshot.forEach((docSnap) => {

    const li = document.createElement("li");
    li.textContent = docSnap.data().quote + " ";

    // ✏ EDIT BUTTON
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "20px";
    editBtn.style.backgroundColor = "#4CAF50";
    editBtn.style.color = "white";
    editBtn.style.border = "none";
    editBtn.style.padding = "5px 10px";
    editBtn.style.cursor = "pointer";

    editBtn.addEventListener("click", async () => {
      const newText = prompt("Edit your quote:", docSnap.data().quote);

      if (newText !== null && newText.trim() !== "") {
        await updateDoc(doc(db, "quotes", docSnap.id), {
          quote: newText.trim()
        });
        loadQuotes();
      }
    });

//     // delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.backgroundColor = "#f44336";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "quotes", docSnap.id));
      loadQuotes();
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    quoteList.appendChild(li);
  });
}

// Initial load
loadQuotes();


async function addData() {
    await setDoc(doc(db, "karachi", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});
}
addData();