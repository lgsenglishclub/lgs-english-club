import { auth, db } from "../firebase-config.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    getDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    updateDoc,
    deleteDoc,
    deleteField,
    serverTimestamp
}

from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

let allUsers = [];

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        window.location.href = "../index.html";
        return;
    }

    const data = userSnap.data();

    if (data.role !== "admin") {

        alert("You are not authorized!");

        window.location.href = "../index.html";

        return;

    }

    console.log("✅ Admin giriş yaptı:", data.name);

loadUsers();

loadTodayLogins();

loadPremiumUsers();

loadFreeUsers();

loadMessages();

}); 



// BURADAN SONRA YENİ KODLAR GELECEK


async function loadUsers(){

    const usersQuery = query(
    collection(db,"users"),
    orderBy("createdAt","desc"),
    limit(10)
);


    const usersSnapshot =
    await getDocs(usersQuery);


    animateCounter(
    document.getElementById("totalUsers"),
    usersSnapshot.size
);

    const table =
    document.getElementById("usersTable");


    table.innerHTML="";


    usersSnapshot.forEach((doc)=>{

    const user = doc.data();

    allUsers.push({

    id: doc.id,

    ...user
    
});


    table.innerHTML += `

    <tr>

    <td>${user.name || "-"}</td>


    <td>${user.email || "-"}</td>


   <td>

${
user.role === "admin"

?

`<span class="badge badge-admin">
👑 Admin
</span>`

:

`<span class="badge badge-user">
🟢 User
</span>`

}

</td>


    <td>

<div class="membership-area">

<span class="${
user.membership === "premium"
?
"badge badge-premium"
:
"badge badge-free"
}">

${
user.membership === "premium"
?
"👑 Premium"
:
"🟢 Free"
}

</span>



</div>

</td>

    </td>


    <td>

    ${
    user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString()
    : "-"
    }

    </td>

    <td>

<button 
class="view-user-btn"
onclick="viewUser('${doc.id}')">

👤 View

</button>

</td>

    </tr>

    `;

});


}

async function loadTodayLogins(){

    const usersSnapshot =
    await getDocs(collection(db,"users"));


    let count = 0;


    const today = new Date();

    today.setHours(0,0,0,0);



    usersSnapshot.forEach((doc)=>{

        const user = doc.data();


        if(user.lastLogin){

            const loginDate =
            user.lastLogin.toDate();


            if(loginDate >= today){

                count++;

            }

        }


    });



    animateCounter(
    document.getElementById("todayLogins"),
    count
);


}

window.makePremium = async function(uid){


    const userRef = doc(db,"users",uid);


    await updateDoc(userRef,{

        membership:"premium",

    premiumSince: serverTimestamp()

    });


    alert("👑 User upgraded to Premium");


    location.reload();

}

window.removePremium = async function(uid){


    const userRef = doc(db,"users",uid);


    await updateDoc(userRef,{

    membership:"free",

    premiumStart: deleteField(),

    premiumEnd: deleteField(),

    premiumSince: deleteField()
    

});


    alert("🟢 Premium removed");


    location.reload();


}

async function loadPremiumUsers(){


    const usersSnapshot =
    await getDocs(collection(db,"users"));


    let count = 0;


    usersSnapshot.forEach((doc)=>{


        const user = doc.data();


        if(user.membership === "premium"){

            count++;

        }


    });


    animateCounter(
    document.getElementById("premiumUsers"),
    count
);


}

async function loadFreeUsers(){


    const usersSnapshot =
    await getDocs(collection(db,"users"));


    let count = 0;


    usersSnapshot.forEach((doc)=>{


        const user = doc.data();


        if(user.membership !== "premium" && user.role !== "admin"){

            count++;

        }


    });


    animateCounter(
    document.getElementById("freeUsers"),
    count
);


}

document
.getElementById("userSearch")
.addEventListener("input",(e)=>{


const search =
e.target.value.toLowerCase();


const filteredUsers =
allUsers.filter(user => {


return (

user.name?.toLowerCase().includes(search)

||

user.email?.toLowerCase().includes(search)

);


});


const table =
document.getElementById("usersTable");


table.innerHTML="";


filteredUsers.forEach(user=>{


table.innerHTML += `

<tr>

<td>${user.name || "-"}</td>

<td>${user.email || "-"}</td>

<td>

${user.role || "user"}

<td>

${
user.membership === "premium"
?
"👑 Premium"
:
"🟢 Free"
}

</td>

<td>

<button 
class="view-user-btn"
onclick="viewUser('${user.id}')">

👤 View

</button>

</td>

<td>

${
user.createdAt
?
new Date(user.createdAt).toLocaleDateString()
:
"-"
}

</td>

</tr>

`;

});


});

window.viewUser = function(uid){

    window.location.href =
    `admin-user.html?id=${uid}`;

}

window.viewMessage = function(id){

    window.location.href =
    `admin-message.html?id=${id}`;

}


async function loadMessages() {

    const snapshot = await getDocs(
        query(
            collection(db, "messages"),
            orderBy("createdAt", "desc")
        )
    );

    const container = document.getElementById("messageList");
    const preview = document.getElementById("messagePreview");

    container.innerHTML = "";

    animateCounter(document.getElementById("totalMessages"), snapshot.size);

    document.getElementById("messageCount").textContent =
        `${snapshot.size} Messages`;

    if (snapshot.empty) {

        container.innerHTML = "<p>No messages yet.</p>";

        return;

    }


    
    snapshot.forEach((docSnap) => {

        const message = docSnap.data();

        const card = document.createElement("div");
        card.className = "message-card";

        card.innerHTML = `

    <div class="message-header">

        <div class="message-user">

            <div class="message-avatar">
                ${(message.name || "?").charAt(0).toUpperCase()}
            </div>

            <div>

                <h3>${message.name || "-"}</h3>

                <small>${message.email || "-"}</small>

            </div>

        </div>


        <span class="message-status">
            ${
                message.status === "replied"
                ? "✅ Replied"
                : "🟢 New"
            }
        </span>


    </div>


    <div class="message-details">

        <p class="message-subject">
            ${message.subject || "No Subject"}
        </p>


        <small class="message-date">

            ${
                message.createdAt
                ? message.createdAt.toDate().toLocaleString()
                : "-"
            }

        </small>

    </div>

`;

    card.addEventListener("click", () => {

    window.location.href = `admin-message.html?id=${docSnap.id}`;

});

   
   container.appendChild(card);

   });

   }

document
.getElementById("searchMessages")
.addEventListener("input", function(){

    const searchValue = this.value.toLowerCase();


    document
    .querySelectorAll(".message-card")
    .forEach(card => {


        const cardText = card.innerText.toLowerCase();


        if(cardText.includes(searchValue)){

            card.style.display = "block";

        }
        else{

            card.style.display = "none";

        }


    });


});


// =======================================
// COUNTER ANIMATION
// =======================================

function animateCounter(element, target) {

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min(
            (currentTime - startTime) / duration,
            1
        );

        element.textContent = Math.floor(progress * target);

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent = target;

        }

    }

    requestAnimationFrame(update);

}