import { auth, db } from "../firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  increment,
  addDoc,
  collection
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


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


sessionStorage.setItem("userId", user.uid);
sessionStorage.setItem("username", name);
sessionStorage.setItem("email", email);

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,

            role: "user",
            membership: "free",
            
            score: 0,
            xp: 0,
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

await setPersistence(auth, browserSessionPersistence);

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

// ============================
// 🔥 STUDY DAY - LOGIN
// ============================

const studyToday =
    new Date().toISOString().split("T")[0];

const studyDayRef =
    doc(
        db,
        "studyDays",
        `${user.uid}_${studyToday}`
    );

const studyDaySnap =
    await getDoc(studyDayRef);

if (!studyDaySnap.exists()) {

    await setDoc(studyDayRef, {

        userId: user.uid,

        date: studyToday,

        createdAt: serverTimestamp()

    });

    console.log(
        "🔥 Study Day tamamlandı:",
        studyToday
    );

}

// ============================
// 🎁 DAILY LOGIN STREAK REWARD
// ============================

const today =
    new Date().toISOString().split("T")[0];

const lastRewardDate =
    data.dailyLoginRewardDate || null;

let loginStreak =
    Number(data.dailyLoginStreak) || 0;

let rewardXP = 0;

if (lastRewardDate !== today) {

    // ============================
    // 📅 YARDIMCI TARİH FONKSİYONU
    // ============================

    const todayDate =
        new Date(today + "T00:00:00");

    const yesterdayDate =
        new Date(todayDate);

    yesterdayDate.setDate(
        yesterdayDate.getDate() - 1
    );

    const yesterday =
        yesterdayDate
            .toISOString()
            .split("T")[0];


    // ============================
    // 🔥 STREAK KONTROLÜ
    // ============================

    if (lastRewardDate === yesterday) {

        loginStreak++;

    } else {

        loginStreak = 1;

    }


    // ============================
    // 🎁 ÖDÜL TABLOSU
    // ============================

    const rewards = {

        1: 10,
        2: 15,
        3: 20,
        4: 25,
        5: 30,
        6: 40,
        7: 75

    };


    rewardXP =
        rewards[loginStreak] || 10;


    // ============================
    // ☁️ FIREBASE
    // ============================

    await updateDoc(userRef, {

    xp: increment(rewardXP),

    dailyLoginRewardDate: today,

    dailyLoginStreak: loginStreak

});


// ============================
// ⭐ XP HISTORY
// ============================

await addDoc(
    collection(db, "users", user.uid, "xpHistory"),
    {

        amount: rewardXP,

        reason: "Daily Login",

        icon: "🎁",

        date: serverTimestamp()

    }
);

console.log(
    `⭐ XP History: +${rewardXP} Daily Login`
);


    console.log(
        `🔥 Login Streak: ${loginStreak} gün`
    );

    console.log(
        `🎁 Daily Reward: +${rewardXP} XP`
    );


    if (loginStreak === 7) {

        console.log(
            "🏆 7 DAY LOGIN STREAK!"
        );

    }

}
else {

    console.log(
        "ℹ️ Daily Login Reward bugün zaten alındı."
    );

}

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

sessionStorage.setItem("role", data.role || "user");
sessionStorage.setItem("membership", data.membership);
sessionStorage.setItem("studentName", data.name);
sessionStorage.setItem("loggedIn", "true");
sessionStorage.setItem("userId", user.uid);
sessionStorage.setItem("email", user.email);
sessionStorage.setItem("username", data.username || data.name);


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

        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("studentName");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("membership");

        // 🎯 Daily Challenge temizliği
        sessionStorage.removeItem("activeChallenge");
        sessionStorage.removeItem("challengeTarget");
        sessionStorage.removeItem("challengeReward");
        sessionStorage.removeItem("challengeCompleted");
        sessionStorage.removeItem("challengeCompletedDate");
        sessionStorage.removeItem("challengeXP");

        window.location.href = "/pages/login.html";

    } catch (error) {

        console.error(error);

    }

}

document.addEventListener("DOMContentLoaded", function () {

    let userArea = document.getElementById("userArea");

    if (userArea) {

        let loggedIn = sessionStorage.getItem("loggedIn");
        let name = sessionStorage.getItem("studentName");

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

        let logged = sessionStorage.getItem("loggedIn");
        let name = sessionStorage.getItem("studentName");


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

if (adminBtn && sessionStorage.getItem("role") === "admin") {
     adminBtn.style.display = "inline-flex";
}

const contactBtn = document.getElementById("contactBtn");

if (contactBtn && sessionStorage.getItem("role") === "admin") {
    contactBtn.style.display = "none";
}

});

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return;

    const data = userSnap.data();

    // 🎮 XP sistemi
if (typeof data.xp !== "number") {

    await updateDoc(userRef, {
        xp: 0
    });

    data.xp = 0;

}

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
        "Limited";

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
    sessionStorage.setItem("studentName", data.name);

    const profileName = document.getElementById("profileName");

    if (profileName) {
        profileName.textContent = data.name;
    }

    const avatar = document.getElementById("profileAvatar");

    if (avatar) {
        avatar.textContent = data.name.charAt(0).toUpperCase();
    }

});

