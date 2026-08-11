import { auth, db } from "../firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc,
    increment,
    addDoc,
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

import {
    updatePassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";


const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];


const today = days[new Date().getDay()];

const studyContainer = document.getElementById("studyPlan");

if (studyContainer) {

    for (let day in weeklyPlan) {

        let badge = "";

        if (day === today) {
            badge = `<span class="today-badge">📍TODAY</span>`;
        }

        let title = `📆 ${dayNames[day]}`;

        if (day === "Saturday") {
            title = "📆 Saturday";
        }

        if (day === "Sunday") {
            title = "📝 Sunday";
        }

        let html = `
            <div class="day-header">
                <h3>${title}</h3>
                ${badge}
            </div>
        `;

        weeklyPlan[day].forEach(item => {

            html += `
                <label class="plan-item">
                    <span class="plan-time">${item.time}</span>
                    <span class="plan-task">${item.task}</span>
                </label>
            `;

        });

        const dayCard = document.querySelector(
            `.day-card[data-day="${day.toLowerCase()}"]`
        );

        if (dayCard) {
            dayCard.innerHTML = html;
        }
    }

}

const printBtn = document.getElementById("printResultsBtn");

if (printBtn) {
    printBtn.addEventListener("click", () => {
        window.print();
    });
}

const membership =
sessionStorage.getItem("membership");


const membershipStatus =
document.getElementById("membershipStatus");


if(membership === "premium"){

    membershipStatus.innerHTML =
    "👑 PREMIUM MEMBER";

}

else{

    if(membershipStatus){

        membershipStatus.innerHTML =
        "🟢 FREE MEMBER";

    }

}

// ACCOUNT SETTINGS

const saveSettings = document.getElementById("saveSettings");


if(saveSettings){

    saveSettings.addEventListener("click", async()=>{


        const user = auth.currentUser;


        if(!user) return;



        const newName =
        document.getElementById("newUsername").value;


        const newPassword =
        document.getElementById("newPassword").value;



        try{


            // Kullanıcı adı güncelleme

            if(newName){

                await updateDoc(
                    doc(db,"users",user.uid),
                    {
                        name:newName
                    }
                );

            }



            // Şifre güncelleme

            if(newPassword){

                if(newPassword.length < 6){

                    alert("Password must be at least 6 characters");
                    return;

                }


                await updatePassword(
                    user,
                    newPassword
                );

            }



            document.getElementById("settingsMessage").innerHTML =
            "✅ Settings updated";


        }
        catch(error){

            document.getElementById("settingsMessage").innerHTML =
            error.message;

        }


    });

}

const modal = document.getElementById("settingsModal");

const openBtn = document.getElementById("openSettings");

const closeBtn = document.getElementById("closeSettings");



openBtn.onclick = ()=>{

    modal.style.display="flex";

};



closeBtn.onclick = ()=>{

    modal.style.display="none";

};



document.getElementById("saveSettings")
.addEventListener("click", async()=>{


const user = auth.currentUser;


const newName =
document.getElementById("newUsername").value;


const newPassword =
document.getElementById("newPassword").value;



try{


if(newName.trim() !== ""){

    await updateDoc(
        doc(db,"users",user.uid),
        {
            name:newName
        }
    );

}



if(newPassword.trim() !== ""){

    if(newPassword.length < 6){

        alert("Password must be at least 6 characters");
        return;

    }


    await updatePassword(
        user,
        newPassword
    );

}


document.getElementById("settingsMessage").innerHTML =
"✅ Settings updated";


}
catch(error){
    

document.getElementById("settingsMessage").innerHTML =
error.message;

}

});

document.addEventListener("DOMContentLoaded", () => {

    const openBtn = document.getElementById("openSettings");
    const modal = document.getElementById("settingsModal");
    const closeBtn = document.getElementById("closeSettings");


    console.log("Settings kontrol edildi:", openBtn, modal);


    if(openBtn){

        openBtn.addEventListener("click", () => {

            modal.style.display = "flex";

        });

    }


    if(closeBtn){

        closeBtn.addEventListener("click", () => {

            modal.style.display = "none";

        });

    }

});


const savePhoto = document.getElementById("savePhoto");

if (savePhoto) {

    savePhoto.addEventListener("click", () => {

        const file = document.getElementById("photoInput").files[0];

        if (!file) {
            alert("Please select a photo.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {

            const img = new Image();

            img.onload = async function () {

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const size = 200;

                canvas.width = size;
                canvas.height = size;

                ctx.drawImage(img, 0, 0, size, size);

                const base64 = canvas.toDataURL("image/jpeg", 0.8);

                try {

                    const user = auth.currentUser;

                    await updateDoc(
                        doc(db, "users", user.uid),
                        {
                            photoData: base64
                        }
                    );

                    profilePhoto.src = base64;
                    profilePhoto.style.display = "block";
                    profileInitial.style.display = "none";

                    alert("✅ Profile photo updated!");

                } catch (error) {

                    console.error(error);
                    alert(error.message);

                }

            };

            img.src = event.target.result;

        };

        reader.readAsDataURL(file);

    });

}

const avatarBox = document.getElementById("avatarBox");
const photoInput = document.getElementById("photoInput");

if (avatarBox && photoInput) {

    avatarBox.addEventListener("click", () => {
        photoInput.click();
    });

    photoInput.addEventListener("change", () => {
        savePhoto.click();
    });

}

// ===============================
// PROFILE PHOTO & USER INFO
// ===============================

const profilePhoto = document.getElementById("profilePhoto");
const profileInitial = document.getElementById("profileInitial");
const profileName = document.getElementById("profileName");

onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    console.log("PROFILE USER:", user.email);

    loadPersonalStatistics(user);

    loadPersonalBest(user);

    loadStudyStreak(user);

    loadAchievements(user);

    loadDailyChallenge(user);


    try {

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) return;

        const userData = snap.data();

        // 🎮 XP & LEVEL
        renderXPSystem(userData);

        // Recent Test Results
const recentContainer = document.getElementById("recentTests");

if (recentContainer) {

    const testsQuery = query(
        collection(db, "tests"),
        where("userId", "==", user.uid),
        orderBy("date", "desc"),
        limit(10)
    );

    const testsSnapshot = await getDocs(testsQuery);

    const tests = [];

    testsSnapshot.forEach((testDoc) => {
        tests.push(testDoc.data());
    });

    recentContainer.innerHTML = tests.map(test => `

        <div class="test-card">

            <h3>
                <i class="fa-solid fa-file-lines"></i>
                ${test.testName}
            </h3>

            <div class="test-percent">
                ${test.percent}%
            </div>

            <div class="test-detail correct-detail">
                <span>✅ Correct</span>
                <strong>${test.correct}</strong>
            </div>

            <div class="test-detail wrong-detail">
                <span>❌ Wrong</span>
                <strong>${test.wrong}</strong>
            </div>

            <div class="test-detail net-detail">
                <span>🎯 Net</span>
                <strong>${test.net}</strong>
            </div>

            <div class="test-date">
                ${
                    test.date?.toDate
                        ? test.date.toDate().toLocaleDateString("tr-TR")
                        : ""
                }
            </div>

        </div>

    `).join("");
}

console.log("FIREBASE USER:", userData);

// Recent Test Results
const recentTestsContainer = document.getElementById("recentTests");

if (recentTestsContainer) {

    const testsQuery = query(
        collection(db, "tests"),
        where("userId", "==", user.uid),
        orderBy("date", "desc"),
        limit(10)
    );

    const testsSnapshot = await getDocs(testsQuery);

    const tests = [];

    testsSnapshot.forEach((doc) => {
        tests.push(doc.data());
    });

    recentTestsContainer.innerHTML = tests.map(test => `

        <div class="test-card">

            <h3>
                <i class="fa-solid fa-file-lines"></i>
                ${test.testName}
            </h3>

            <div class="test-percent">
                ${test.percent}%
            </div>

            <div class="test-detail correct-detail">
                <span>✅ Correct</span>
                <strong>${test.correct}</strong>
            </div>

            <div class="test-detail wrong-detail">
                <span>❌ Wrong</span>
                <strong>${test.wrong}</strong>
            </div>

            <div class="test-detail net-detail">
                <span>🎯 Net</span>
                <strong>${test.net}</strong>
            </div>

            <div class="test-date">
                ${test.date?.toDate
                    ? test.date.toDate().toLocaleDateString("tr-TR")
                    : ""}
            </div>

        </div>

    `).join("");
}

        const profileCard = document.getElementById("profileCard");


if(userData.membership === "premium"){

    profileCard.classList.add("premium");

}
else if(userData.role === "admin"){

    profileCard.classList.add("admin");

}
else{

    profileCard.classList.add("free");

}

        // Kullanıcı adı
        if (profileName) {
            profileName.textContent = userData.name || "Student";
        }

        // Profil fotoğrafı
        if (userData.photoData) {

            profilePhoto.src = userData.photoData;
            profilePhoto.style.display = "block";
            profileInitial.style.display = "none";

        } else {

            profilePhoto.style.display = "none";
            profileInitial.style.display = "flex";
            profileInitial.textContent =
                (userData.name || user.email).charAt(0).toUpperCase();

        }

    } catch (error) {

        console.error("Profile loading error:", error);

    }

});

const weeklyPlans = {

    monday: {
        color: "#3b82f6",
        title: "Monday",
        tasks: [
            "📚 TURKISH",
            "📚 ENGLISH",
            "📝 TEST (50+30)",
            "📖 Reading Book"
        ]
    },

    tuesday: {
        color: "#22c55e",
        title: "Tuesday",
        tasks: [
            "📚 MATH",
            "📚 SOCIAL",
            "📝 TEST (50+30)",
            "📖 Reading Book"
        ]
    },

    wednesday: {
        color: "#a855f7",
        title: "Wednesday",
        tasks: [
            "📚 SCIENCE",
            "📚 REL.& MORAL",
            "📝 TEST (50+30)",
            "📖 Reading Book"
        ]
    },

    thursday: {
        color: "#f97316",
        title: "Thursday",
        tasks: [
            "📚 TURKISH",
            "📚 ENGLISH",
            "📝 TEST (50+30)",
            "📖 Reading Book"
        ]
    },

    friday: {
        color: "#ef4444",
        title: "Friday",
        tasks: [
            "📚 MATH",
            "📚 SOCIAL",
            "📝 TEST (50+30)",
            "📖 Reading Book"
        ]
    },

    saturday: {
        color: "#eab308",
        title: "Saturday",
        tasks: [
            "📚 SCIENCE",
            "📚 REL.& MORAL",
            "📝 TEST (50+30)",
            "📖 Reading Book"
        ]
    },

    sunday: {
        color: "#6b7280",
        title: "Sunday",
        tasks: [
            "📝 VERBAL EXAM",
            "🧮 NUM. EXAM",
            "🎯 Correct Mistakes",
            "📖 Reading Book"
        ]
    }

};

function createDesktopCard(plan){

    return `
        <div class="desktop-card-header"
             style="--card-color:${plan.color};">

            <h3>${plan.title}</h3>

        </div>

        <div class="desktop-task-list">

            ${plan.tasks.map(task => `
                <div class="desktop-task">
                    ${task}
                </div>
            `).join("")}

        </div>

    `;

}

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".day-card");

    function renderCards() {

        cards.forEach(card => {

            const day = card.dataset.day;
            const plan = weeklyPlans[day];

            // Masaüstü ve mobil aynı kart
            card.innerHTML = createDesktopCard(plan);

        });

    }

    renderCards();

    let isMobile = window.matchMedia("(max-width:768px)").matches;

    window.addEventListener("resize", () => {

        const mobileNow = window.matchMedia("(max-width:768px)").matches;

        if (mobileNow !== isMobile) {

            isMobile = mobileNow;
            renderCards();

        }

    });

});

// ===============================
// 🎮 XP & LEVEL SYSTEM
// ===============================

const XP_LEVELS = [
    0,      // Level 1
    100,    // Level 2
    250,    // Level 3
    450,    // Level 4
    700,    // Level 5
    1000,   // Level 6
    1350,   // Level 7
    1750,   // Level 8
    2200,   // Level 9
    2700,   // Level 10
    3300,   // Level 11
    4000,   // Level 12
    4800,   // Level 13
    5700,   // Level 14
    6700,   // Level 15
    7800,   // Level 16
    9000,   // Level 17
    10300,  // Level 18
    11700,  // Level 19
    13200   // Level 20
];


// XP'den level hesapla
function calculateLevel(xp) {

    let level = 1;

    for (let i = 0; i < XP_LEVELS.length; i++) {

        if (xp >= XP_LEVELS[i]) {
            level = i + 1;
        } else {
            break;
        }

    }

    return level;
}


// Bir sonraki level için gereken XP
function getNextLevelXP(level) {

    if (level >= XP_LEVELS.length) {
        return XP_LEVELS[XP_LEVELS.length - 1];
    }

    return XP_LEVELS[level];

}


// ============================
// ⭐ ADD XP
// ============================

async function addXP(
    user,
    amount,
    reason = "XP Earned",
    icon = "⭐"
) {

    if (
        !user ||
        !amount ||
        amount <= 0
    ) {
        return;
    }

    try {

        const userRef =
            doc(db, "users", user.uid);

        // Kullanıcının toplam XP'sini artır
        await updateDoc(
            userRef,
            {
                xp: increment(amount)
            }
        );

        // XP geçmişine kaydet
        await addDoc(
            collection(
                db,
                "users",
                user.uid,
                "xpHistory"
            ),
            {
                amount: amount,
                reason: reason,
                icon: icon,
                date: serverTimestamp()
            }
        );

        console.log(
            `⭐ +${amount} XP — ${reason}`
        );

    } catch (error) {

        console.error(
            "❌ XP ekleme hatası:",
            error
        );

    }

}

export { addXP };


// Profile XP bilgilerini göster
function renderXPSystem(userData) {

    const xp = Number(userData.xp) || 0;

    const level = calculateLevel(xp);

    checkLevelUp(level);

    const currentLevelXP =
        XP_LEVELS[level - 1] || 0;

    const nextLevelXP =
        level >= XP_LEVELS.length
            ? currentLevelXP
            : XP_LEVELS[level];

    const levelElement =
        document.getElementById("profileLevel");

    const xpElement =
        document.getElementById("profileXP");

    const xpProgress =
        document.getElementById("xpProgress");

    const xpRemaining =
        document.getElementById("xpRemaining");


    // LEVEL
    if (levelElement) {

        levelElement.textContent =
            `LEVEL ${level}`;

    }


    // XP
    if (xpElement) {

        xpElement.textContent =
            `${xp} XP`;

    }


    // MAX LEVEL
    if (level >= XP_LEVELS.length) {

        if (xpProgress) {

            xpProgress.style.width =
                "100%";

        }

        if (xpRemaining) {

            xpRemaining.textContent =
                "🏆 MAX LEVEL";

        }

        return;

    }


    // XP progress
    const xpInLevel =
        xp - currentLevelXP;

    const xpNeeded =
        nextLevelXP - currentLevelXP;

    const percentage =
        (xpInLevel / xpNeeded) * 100;


    if (xpProgress) {

        xpProgress.style.width =
            `${Math.max(0, Math.min(100, percentage))}%`;

    }


    // Kalan XP
    if (xpRemaining) {

        const remaining =
            nextLevelXP - xp;

        xpRemaining.textContent =
            `${remaining} XP until Level ${level + 1}`;

    }

}

function showLevelUp(level) {

    const popup =
        document.createElement("div");

    popup.className =
        "level-up-popup";

    popup.innerHTML = `

        <div class="level-up-icon">
            🎉
        </div>

        <div class="level-up-title">
            LEVEL UP!
        </div>

        <div class="level-up-level">
            You reached Level ${level}!
        </div>

    `;

    document.body.appendChild(popup);


    setTimeout(() => {

        popup.classList.add("show");

    }, 50);


    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {

            popup.remove();

        }, 400);

    }, 3000);

}

function checkLevelUp(level) {

    const previousLevel =
        Number(
            sessionStorage.getItem("lastKnownLevel")
        ) || 1;


    if (level > previousLevel) {

        showLevelUp(level);

    }


    sessionStorage.setItem(
        "lastKnownLevel",
        level
    );

}

async function loadPersonalStatistics(user) {

    try {

        const testsQuery = query(
            collection(db, "tests"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(testsQuery);

        let totalTests = 0;
        let totalCorrect = 0;
        let totalNet = 0;
        let totalScore = 0;

        snapshot.forEach(testDoc => {

            const test = testDoc.data();

            totalTests++;

            totalCorrect += Number(test.correct) || 0;
            totalNet += Number(test.net) || 0;
            totalScore += Number(test.percent) || 0;

        });

        const averageNet =
            totalTests > 0
                ? (totalNet / totalTests).toFixed(2)
                : "0";

        const averageScore =
            totalTests > 0
                ? Math.round(totalScore / totalTests)
                : 0;

        const totalTestsElement =
            document.getElementById("totalTests");

        const totalCorrectElement =
            document.getElementById("totalCorrect");

        const averageNetElement =
            document.getElementById("averageNet");

        const averageScoreElement =
            document.getElementById("averageScore");


        if (totalTestsElement)
            totalTestsElement.textContent = totalTests;

        if (totalCorrectElement)
            totalCorrectElement.textContent = totalCorrect;

        if (averageNetElement)
            averageNetElement.textContent = averageNet;

        if (averageScoreElement)
            averageScoreElement.textContent =
                `${averageScore}%`;

    } catch (error) {

        console.error(
            "Personal statistics loading error:",
            error
        );

    }

}

async function loadPersonalBest(user) {

    try {

        const testsQuery = query(
            collection(db, "tests"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(testsQuery);

        let bestScore = 0;
        let bestNet = 0;
        let lastTest = null;
        let lastDate = 0;

        snapshot.forEach(testDoc => {

            const test = testDoc.data();

            const score = Number(test.percent) || 0;
            const net = Number(test.net) || 0;

            if (score > bestScore) {
                bestScore = score;
            }

            if (net > bestNet) {
                bestNet = net;
            }

            if (test.date) {

                const date =
                    test.date.toDate
                        ? test.date.toDate()
                        : new Date(test.date);

                if (date.getTime() > lastDate) {

                    lastDate = date.getTime();
                    lastTest = test;

                }

            }

        });

        const bestScoreElement =
            document.getElementById("bestScore");

        const bestNetElement =
            document.getElementById("bestNet");

        const lastTestElement =
            document.getElementById("lastTest");


        if (bestScoreElement) {
            bestScoreElement.textContent =
                `${bestScore}%`;
        }

        if (bestNetElement) {
            bestNetElement.textContent =
                bestNet;
        }

        if (lastTestElement) {

            lastTestElement.textContent =
                lastTest
                    ? lastTest.testName
                    : "-";

        }

    } catch (error) {

        console.error(
            "Personal best loading error:",
            error
        );

    }

}

async function loadStudyStreak(user) {

    try {

        // ============================
        // 🔥 LOGIN DAYS
        // ============================

        const studyDaysQuery = query(
            collection(db, "studyDays"),
            where("userId", "==", user.uid)
        );

        const snapshot =
            await getDocs(studyDaysQuery);

        const uniqueDates = [];

        snapshot.forEach(studyDoc => {

            const data =
                studyDoc.data();

            if (!data.date) return;

            const date =
                new Date(data.date);

            date.setHours(0, 0, 0, 0);

            uniqueDates.push(
                date.getTime()
            );

        });


        // Aynı günü tek kayıt say
        const dates =
            [...new Set(uniqueDates)]
                .sort((a, b) => a - b);


        const currentStreakElement =
            document.getElementById(
                "currentStreak"
            );

        const longestStreakElement =
            document.getElementById(
                "longestStreak"
            );


        if (
            !currentStreakElement ||
            !longestStreakElement
        ) {
            return;
        }


        // ============================
        // 📅 BUGÜN
        // ============================

        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const todayTime =
            today.getTime();


        // ============================
        // 🔥 CURRENT STREAK
        // ============================

        let currentStreak = 0;


        const yesterday =
            new Date(today);

        yesterday.setDate(
            yesterday.getDate() - 1
        );

        const yesterdayTime =
            yesterday.getTime();


        if (
            dates.includes(todayTime) ||
            dates.includes(yesterdayTime)
        ) {

            let checkDate =
                dates.includes(todayTime)
                    ? todayTime
                    : yesterdayTime;


            currentStreak = 1;


            for (
                let i = dates.length - 1;
                i >= 0;
                i--
            ) {

                const date =
                    dates[i];


                if (
                    date >= checkDate
                ) {
                    continue;
                }


                const previousDate =
                    new Date(checkDate);


                previousDate.setDate(
                    previousDate.getDate() - 1
                );


                const previousTime =
                    previousDate.getTime();


                if (
                    date === previousTime
                ) {

                    currentStreak++;

                    checkDate =
                        previousTime;

                }
                else if (
                    date < previousTime
                ) {

                    break;

                }

            }

        }


        // ============================
        // 🏆 LONGEST STREAK
        // ============================

        let longestStreak =
            dates.length > 0
                ? 1
                : 0;

        let streak =
            dates.length > 0
                ? 1
                : 0;


        for (
            let i = 1;
            i < dates.length;
            i++
        ) {

            const previous =
                new Date(
                    dates[i - 1]
                );

            const current =
                new Date(
                    dates[i]
                );


            const difference =
                (
                    current - previous
                ) /
                (1000 * 60 * 60 * 24);


            if (
                difference === 1
            ) {

                streak++;

                if (
                    streak > longestStreak
                ) {

                    longestStreak =
                        streak;

                }

            }
            else {

                streak = 1;

            }

        }


        // ============================
        // 📊 EKRANA YAZ
        // ============================

        currentStreakElement.textContent =
            currentStreak;

        longestStreakElement.textContent =
            longestStreak;


    } catch (error) {

        console.error(
            "Study streak loading error:",
            error
        );

    }

}

async function loadAchievements(user) {

    try {

        const testsQuery = query(
            collection(db, "tests"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(testsQuery);

        const tests = [];

        snapshot.forEach(testDoc => {

            const test = testDoc.data();

            tests.push({
                percent: Number(test.percent) || 0,
                net: Number(test.net) || 0,
                date: test.date
            });

        });


        const testCount = tests.length;

        const hasPerfectScore =
            tests.some(test => test.percent >= 100);

        const hasHighScore =
            tests.some(test => test.percent >= 90);


        // ============================
        // 🔥 LOGIN STREAK
        // ============================

const studyDaysQuery = query(
    collection(db, "studyDays"),
    where("userId", "==", user.uid)
);

const studyDaysSnapshot =
    await getDocs(studyDaysQuery);

const dates = [];

studyDaysSnapshot.forEach(studyDoc => {

    const studyDay =
        studyDoc.data();

    if (!studyDay.date) return;

    const date =
        new Date(studyDay.date);

    date.setHours(0, 0, 0, 0);

    dates.push(
        date.getTime()
    );

});

const sortedDates =
    [...new Set(dates)]
        .sort((a, b) => a - b);


        let longestStreak = 0;
        let currentStreak = 0;


        if (sortedDates.length > 0) {

            currentStreak = 1;
            longestStreak = 1;

            for (
                let i = 1;
                i < sortedDates.length;
                i++
            ) {

                const difference =
                    (
                        sortedDates[i] -
                        sortedDates[i - 1]
                    ) /
                    (1000 * 60 * 60 * 24);


                if (difference === 1) {

                    currentStreak++;

                    if (
                        currentStreak >
                        longestStreak
                    ) {

                        longestStreak =
                            currentStreak;

                    }

                } else {

                    currentStreak = 1;

                }

            }

        }


        // ============================
        // 🏆 ACHIEVEMENTS
        // ============================

        const achievements = [

            {
                id: "firstStep",
                icon: "🥉",
                title: "First Step",
                text: "Complete your first test.",
                xp: 20,
                unlocked: testCount >= 1
            },

            {
                id: "gettingBetter",
                icon: "🚀",
                title: "Getting Better",
                text: "Complete 10 tests.",
                xp: 40,
                unlocked: testCount >= 10
            },

            {
                id: "finisher",
                icon: "📝",
                title: "Finisher",
                text: "Complete 25 tests.",
                xp: 60,
                unlocked: testCount >= 25
            },

            {
                id: "testProfessor",
                icon: "📝",
                title: "Test Professor",
                text: "Complete 50 tests.",
                xp: 100,
                unlocked: testCount >= 50
            },

            {
                id: "testMaster",
                icon: "📝",
                title: "Test Master",
                text: "Complete 100 tests.",
                xp: 200,
                unlocked: testCount >= 100
            },

            {
                id: "highAchiever",
                icon: "🏆",
                title: "High Achiever",
                text: "Score 90% or higher.",
                xp: 75,
                unlocked: hasHighScore
            },

            {
                id: "perfectScore",
                icon: "🎯",
                title: "Perfect Score",
                text: "Get a 100% score.",
                xp: 150,
                unlocked: hasPerfectScore
            },

            {
                id: "tenDaysStreak",
                icon: "🔥",
                title: "10 Days Streak",
                text: "Study for 10 days.",
                xp: 100,
                unlocked: longestStreak >= 10
            }

        ];


        // ============================
        // ⭐ ACHIEVEMENT XP
        // ============================

        const userRef =
            doc(db, "users", user.uid);

        const userSnap =
            await getDoc(userRef);

        if (userSnap.exists()) {

            const userData =
                userSnap.data();

            const unlockedAchievements =
                userData.achievements || {};


            for (
                const achievement
                of achievements
            ) {

                if (
                    achievement.unlocked &&
                    !unlockedAchievements[
                        achievement.id
                    ]
                ) {

                    // XP ver
                    await updateDoc(
                        userRef,
                        {

                            xp: increment(
                                achievement.xp
                            ),

                            [`achievements.${achievement.id}`]:
                                true

                        }
                    );

                    await addDoc(
    collection(
        db,
        "users",
        user.uid,
        "xpHistory"
    ),
    {
        amount: achievement.xp,

        reason:
            `Achievement: ${achievement.title}`,

        icon:
            achievement.icon,

        date:
            serverTimestamp()
    }
);

                    console.log(
                        `🏆 ${achievement.title} → +${achievement.xp} XP`
                    );

                }

            }

        }


        // ============================
        // 🎨 ACHIEVEMENTS UI
        // ============================

        const container =
            document.getElementById(
                "achievementsGrid"
            );

        if (!container) return;


        container.innerHTML =
            achievements.map(
                achievement => `

                <div class="
                    achievement
                    ${
                        achievement.unlocked
                            ? "unlocked"
                            : "locked"
                    }
                ">

                    <div class="achievement-icon">
                        ${achievement.icon}
                    </div>

                    <div class="achievement-info">

                        <h3>
                            ${achievement.title}
                        </h3>

                        <p>
                            ${achievement.text}
                        </p>

                        <span class="achievement-xp">
                            ⭐ +${achievement.xp} XP
                        </span>

                    </div>

                </div>

                `
            ).join("");


    } catch (error) {

        console.error(
            "Achievements loading error:",
            error
        );

    }

}

async function loadDailyChallenge(user) {

    console.log("🔥 loadDailyChallenge çalıştı");

    const title =
        document.getElementById("challengeTitle");

    const description =
        document.getElementById("challengeDescription");

    const progressText =
        document.getElementById("challengeProgressText");

    const progressFill =
        document.getElementById("challengeProgressFill");

    const reward =
        document.getElementById("challengeReward");

    const button =
        document.getElementById("startChallengeBtn");

console.log("Challenge elements:", {
    title,
    description,
    progressText,
    progressFill,
    reward,
    button
});

    if (
        !title ||
        !description ||
        !progressText ||
        !progressFill ||
        !reward ||
        !button
    ) {

        console.log(
            "❌ Challenge elementlerinden biri eksik"
        );

        return;
    }


    // ============================
    // DAILY CHALLENGE
    // ============================

    const challenge = {

        title: "🎯 Daily Test Challenge",

        description:
            "Complete today's 10-question test.",

        target: 10,

        reward: 50

    };


    title.textContent =
        challenge.title;

    description.textContent =
        challenge.description;

    reward.textContent =
        `🏆 +${challenge.reward} XP`;


    // ============================
// USER-SPECIFIC COMPLETION
// ============================

const todayKey =
    new Date().toISOString().split("T")[0];

let completed = false;

try {

    const userRef =
        doc(db, "users", user.uid);

    const userSnap =
        await getDoc(userRef);

    if (userSnap.exists()) {

        const userData =
            userSnap.data();

        const completedDate =
    userData.dailyChallengeCompletedDate;

if (completedDate) {

    let completedDateKey;

    if (
        typeof completedDate === "string"
    ) {

        completedDateKey =
            completedDate.split("T")[0];

    }
    else if (
        completedDate.toDate
    ) {

        completedDateKey =
            completedDate
                .toDate()
                .toISOString()
                .split("T")[0];

    }

    completed =
        completedDateKey === todayKey;

}

    }

} catch (error) {

    console.error(
        "❌ Daily Challenge kontrol hatası:",
        error
    );

}

    const progress =
        completed
            ? challenge.target
            : 0;


    progressText.textContent =
        `${progress} / ${challenge.target}`;


    progressFill.style.width =
        `${(progress / challenge.target) * 100}%`;


    // ============================
    // TAMAMLANDI
    // ============================

    if (completed) {

        button.textContent =
            "🎉 COMPLETED";

        button.classList.add(
            "completed"
        );

        button.disabled = true;

        description.textContent =
            "Amazing! You completed today's challenge!";

        reward.textContent =
            `🏆 +${challenge.reward} XP EARNED`;

        return;
    }

    // ============================
    // START CHALLENGE
    // ============================

    console.log(
        "✅ Click listener bağlanıyor..."
    );


    button.addEventListener(
        "click",
        function () {

            console.log(
                "🔥 BUTONA BASILDI!"
            );


            sessionStorage.setItem(
                "activeChallenge",
                "daily"
            );


            sessionStorage.setItem(
                "challengeTarget",
                String(
                    challenge.target
                )
            );


            sessionStorage.setItem(
                "challengeReward",
                String(
                    challenge.reward
                )
            );


            console.log(
                "Challenge bilgileri kaydedildi"
            );


            /*
             * Test sayfasına git
             */

            window.location.href =
                "8thgrades/mock-exams.html";

        }
    );

}

document.addEventListener("DOMContentLoaded", () => {

    const tabs =
        document.querySelectorAll(".week-tab");

    const cards =
        document.querySelectorAll(".day-card");


    if (!tabs.length || !cards.length) {
        return;
    }


    function showDay(day) {

        /* Kartları değiştir */

        cards.forEach(card => {

            card.classList.toggle(
                "active-day",
                card.dataset.day === day
            );

        });


        /* Sekmeleri değiştir */

        tabs.forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.target === day
            );

        });

    }


    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const day =
                tab.dataset.target;

            showDay(day);

        });

    });


    /* =========================
       BUGÜNÜ OTOMATİK SEÇ
    ========================= */

    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];


    const today =
        days[new Date().getDay()];


    showDay(today);

});

// ============================
// ⭐ XP HISTORY TOGGLE
// ============================

const xpHistoryBtn =
    document.getElementById("xpHistoryBtn");

const xpHistory =
    document.getElementById("xpHistory");

const closeXPHistory =
    document.getElementById("closeXPHistory");


if (xpHistoryBtn && xpHistory) {

    xpHistoryBtn.addEventListener(
        "click",
        async () => {

            const isOpen =
                xpHistory.style.display === "block";


            if (isOpen) {

                xpHistory.style.display = "none";

                xpHistoryBtn.textContent =
                    "⭐ XP HISTORY";

            } else {

                xpHistory.style.display = "block";

                xpHistoryBtn.textContent =
                    "⭐ HIDE XP HISTORY";


                // ⭐ Firebase'den geçmişi getir
                const user = auth.currentUser;

                if (user) {

                    await loadXPHistory(user);

                }

            }

        }
    );

}


if (closeXPHistory && xpHistory) {

    closeXPHistory.addEventListener(
        "click",
        () => {

            xpHistory.style.display = "none";

            if (xpHistoryBtn) {

                xpHistoryBtn.textContent =
                    "⭐ XP HISTORY";

            }

        }
    );



}// ============================
// ⭐ LOAD XP HISTORY
// ============================

async function loadXPHistory(user) {

    const historyList =
        document.getElementById("xpHistoryList");

    const totalElement =
        document.getElementById("xpHistoryTotal");

    if (!historyList) return;

    try {

        // ============================
        // ⭐ GERÇEK KULLANICI XP
        // ============================

        const userRef =
            doc(db, "users", user.uid);

        const userSnap =
            await getDoc(userRef);

        if (userSnap.exists()) {

            const userData =
                userSnap.data();

            const totalXP =
                Number(userData.xp) || 0;

            if (totalElement) {

                totalElement.textContent =
                    `Total Earned: ${totalXP} XP`;

            }

        }


        // ============================
        // 📜 SON 20 XP KAYDI
        // ============================

        const historyQuery = query(
            collection(
                db,
                "users",
                user.uid,
                "xpHistory"
            ),
            orderBy("date", "desc"),
            limit(20)
        );

        const snapshot =
            await getDocs(historyQuery);


        if (snapshot.empty) {

            historyList.innerHTML = `
                <p class="xp-history-empty">
                    No XP history yet.
                </p>
            `;

            return;

        }


        historyList.innerHTML = "";


        snapshot.forEach(historyDoc => {

            const data =
                historyDoc.data();

            const amount =
                Number(data.amount) || 0;

            let dateText = "";


            if (data.date) {

                const date =
                    data.date.toDate
                        ? data.date.toDate()
                        : new Date(data.date);

                dateText =
                    date.toLocaleDateString("en-GB");

            }


            historyList.innerHTML += `

                <div class="xp-history-item">

                    <div class="xp-history-icon">
                        ${data.icon || "⭐"}
                    </div>

                    <div class="xp-history-info">

                        <div class="xp-history-reason">
                            ${data.reason || "XP Earned"}
                        </div>

                        <div class="xp-history-date">
                            ${dateText}
                        </div>

                    </div>

                    <div class="xp-history-amount">
                        +${amount} XP
                    </div>

                </div>

            `;

        });


    } catch (error) {

        console.error(
            "❌ XP History loading error:",
            error
        );

        historyList.innerHTML = `
            <p class="xp-history-empty">
                Unable to load XP history.
            </p>
        `;

    }

}