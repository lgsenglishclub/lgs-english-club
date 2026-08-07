import { auth, db } from "../firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/15.26.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  increment
} from "https://www.gstatic.com/firebasejs/15.26.0/firebase-firestore.js";


window.register = async function () {

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        document.getElementById("registerResult").innerHTML =
            "❌ Please fill all fields";
        return;
    }

    try {

        const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
);

const user = userCredential.user;


localStorage.setItem("userId", user.uid);
localStorage.setItem("username", name);
localStorage.setItem("email", email);

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,

            role: "user",
            membership: "free",
            
            score: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            gamesPlayed: 0,
            unit1Complete: false,
            unit2Complete: false,
            unit3Complete: false,

            createdAt: new Date().toISOString()
        });

        document.getElementById("registerResult").innerHTML =
            "✅ Account Created!";

        setTimeout(() => {
            window.location.href = "../pages/login.html";
        }, 1000);

}

    catch(error){

    console.log("ERROR CODE:", error.code);
    console.log("ERROR MESSAGE:", error.message);

     document.getElementById("registerResult").innerHTML =
    "❌ " + error.message;


}

};

window.login = async function () {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {

        document.getElementById("loginResult").innerHTML =
        "❌ Please fill all fields";

        return;
    }

    try {

        const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // Firestore'daki kullanıcı bilgisi
        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);


if (!userSnap.exists()) {

    document.getElementById("loginResult").innerHTML =
    "❌ User data not found";

    return;

}

const data = userSnap.data();

// Premium süre kontrolü

if(data.membership === "premium" && data.premiumEnd){

    const today = new Date();

    const endDate = new Date(data.premiumEnd);


    if(today > endDate){

       await updateDoc(userRef,{

    membership:"free",

    premiumStart:null,

    premiumEnd:null

});


        data.membership = "free";

    }

}

localStorage.setItem("role", data.role || "user");
localStorage.setItem("membership", data.membership);
localStorage.setItem("studentName", data.name);
localStorage.setItem("loggedIn", "true");
localStorage.setItem("userId", user.uid);
localStorage.setItem("email", user.email);
localStorage.setItem("username", data.username || data.name);


await updateDoc(userRef, {
    lastLogin: serverTimestamp(),
    loginCount: increment(1)
});

document.getElementById("loginResult").innerHTML =
"✅ Login Successful";

setTimeout(() => {

    if (data.role === "admin") {

        window.location.href = "../pages/admin.html";

    } else {

        window.location.href = "../index.html";

    }

}, 1000);

    }

    catch(error){

        document.getElementById("loginResult").innerHTML =
        "❌ " + error.message;

    }

}


window.logout = async function () {

    try {

        await signOut(auth);

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("studentName");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("membership");

        window.location.href = "/pages/login.html";

    } catch (error) {

        console.error(error);

    }

}

document.addEventListener("DOMContentLoaded", function () {

    let userArea = document.getElementById("userArea");

    if (userArea) {

        let loggedIn = localStorage.getItem("loggedIn");
        let name = localStorage.getItem("studentName");

        if (loggedIn) {

            userArea.innerHTML = `
                <span class="user-name">
                    👤 ${name}
                </span>

                <button class="logout-btn" id="logoutBtn">
                    🚪 Logout
                </button>
            `;

            document.getElementById("logoutBtn").addEventListener("click", logout);
        }

    }

    const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}

});

document.addEventListener("DOMContentLoaded", function(){

    let userArea = document.getElementById("userArea");

    if(userArea){

        let logged = localStorage.getItem("loggedIn");
        let name = localStorage.getItem("studentName");


        if(logged){

            let profileLink = "profile.html";

            if(window.location.pathname.endsWith("index.html") || 
               window.location.pathname === "/"){

                profileLink = "pages/profile.html";

            }


            userArea.innerHTML = `

            <a href="${profileLink}" class="profile-btn">

                <span class="avatar">
                👨‍🎓
                </span>

                <span>
                ${name}
                </span>

            </a>


            <button class="logout-btn" onclick="logout()">
            🚪 Logout
            </button>

            `;


        } else {


            userArea.innerHTML = `

            <a href="pages/login.html">
                Login
            </a>

            <a href="pages/register.html">
                Register
            </a>

            `;


        }

    }



    const adminBtn = document.getElementById("adminBtn");

if (adminBtn && localStorage.getItem("role") === "admin") {
    adminBtn.style.display = "inline-block";
}

const contactBtn = document.getElementById("contactBtn");

if (contactBtn && localStorage.getItem("role") === "admin") {
    contactBtn.style.display = "none";
}

});

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();

    const floatingMembership =
document.getElementById("floatingMembership");

const floatingDate =
document.getElementById("floatingDate");


if(floatingMembership && floatingDate){

    if(data.membership === "premium"){

    document.querySelector(".floating-membership-card")
.classList.add("premium-active");

        floatingMembership.innerHTML =
        "👑PREMIUM";


        floatingDate.innerHTML =
        data.premiumEnd
        ? new Date(data.premiumEnd).toLocaleDateString()
        : "-";

    }
    else{

        document.querySelector(".floating-membership-card")
    .classList.add("free-active");

        floatingMembership.innerHTML =
        "🟢FREE";

        floatingDate.innerHTML =
        "Limited Profile";

    }

}

    const premiumDate = document.getElementById("premiumDate");

if(premiumDate){

    if(data.membership === "premium" && data.premiumEnd){

        const date = new Date(data.premiumEnd);

        premiumDate.innerHTML =
        "Valid Until: " +
        date.toLocaleDateString("en-US");

    }
    else{

        premiumDate.innerHTML =
        "No active Premium subscription";

    }

}

    // Eski sistem bozulmasın diye şimdilik bırakıyoruz
    localStorage.setItem("studentName", data.name);

    const profileName = document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = data.name;
    }

    const avatar = document.getElementById("profileAvatar");

    if (avatar) {
        avatar.textContent = data.name.charAt(0).toUpperCase();
    }

});

