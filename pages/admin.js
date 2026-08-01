import { auth, db } from "../firebase.js";

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


    document.getElementById("totalUsers").innerHTML =
    usersSnapshot.size;


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


    <td>${user.role || "user"}</td>


    <td>

<div class="membership-area">

<span>
${
user.membership === "premium"
? "👑 Premium"
: "🟢 Free"
}
</span>

${
user.role !== "admin"

?

user.membership === "premium"

?

`
<button class="user-action-btn remove-btn"
onclick="removePremium('${doc.id}')">
❌Remove
</button>
`

:

`
<button class="user-action-btn premium-btn"
onclick="makePremium('${doc.id}')">
👑Upgrade
</button>
`
:

""

}

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



    document.getElementById("todayLogins").innerHTML =
    count;


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


    document.getElementById("premiumUsers").innerHTML =
    count;


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


    document.getElementById("freeUsers").innerHTML =
    count;


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

async function loadMessages(){

    const snapshot =
    await getDocs(
        query(
            collection(db,"messages"),
            orderBy("createdAt","desc")
        )
    );


    const container =
    document.getElementById("messages");


    container.innerHTML="";


    document.getElementById("totalMessages").innerHTML =
    snapshot.size;


    if(snapshot.empty){

        container.innerHTML="No messages yet.";

        return;

    }


    snapshot.forEach((doc)=>{

        const message = doc.data();


        container.innerHTML += `

        <div class="message-card">


            <div class="message-header">

                <h3>
                👤 ${message.name || "-"}
                </h3>


                <span class="message-status">

                ${
                message.status === "replied"
                ?
                "✅ Replied"
                :
                "🟢 New"
                }

                </span>

            </div>



            <p>
            📧 ${message.email || "-"}
            </p>



            <p>
            📝 ${message.subject || "No Subject"}
            </p>



            <small>

            ${
            message.createdAt
            ?
            message.createdAt.toDate().toLocaleString()
            :
            "-"
            }

            </small>



            <div class="message-buttons">


                <button
                class="view-message-btn"
                onclick="viewMessage('${doc.id}')">

                👁 View

                </button>



                <button
                class="delete-message-btn"
                onclick="deleteMessage('${doc.id}')">

                🗑 Delete

                </button>


            </div>


        </div>

        `;


    });

}

window.deleteMessage = async function(id){

    if(!confirm("Delete this message?"))
    return;

    await deleteDoc(doc(db,"messages",id));

    loadMessages();

}