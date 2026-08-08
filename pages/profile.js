import { auth, db } from "../firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs
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

    loadDailyChallenge();


    try {

        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);

        if (!snap.exists()) return;

        const userData = snap.data();

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

        const testsQuery = query(
            collection(db, "tests"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(testsQuery);

        const dates = [];

        snapshot.forEach(testDoc => {

            const test = testDoc.data();

            if (!test.date) return;

            const date = test.date.toDate
                ? test.date.toDate()
                : new Date(test.date);

            // Sadece gün bilgisini al
            const day = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );

            dates.push(day.getTime());

        });

        // Aynı gün yapılan birden fazla testi tek gün say
        const uniqueDates = [...new Set(dates)]
            .sort((a, b) => a - b);

        const currentStreakElement =
            document.getElementById("currentStreak");

        const longestStreakElement =
            document.getElementById("longestStreak");

        if (!currentStreakElement ||
           !longestStreakElement) {
           return;
        }

        /*
         * Hiç test yoksa
         */

        if (uniqueDates.length === 0) {

            currentStreakElement.textContent = "0";
            longestStreakElement.textContent = "0";

            return;
        }

        /*
         * CURRENT STREAK
         */

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const todayTime = today.getTime();

        const yesterday = new Date(today);

        yesterday.setDate(
            yesterday.getDate() - 1
        );

        const yesterdayTime =
            yesterday.getTime();

        let currentStreak = 0;

        /*
         * Streak bugün veya dün başladıysa
         */

        if (
            uniqueDates.includes(todayTime) ||
            uniqueDates.includes(yesterdayTime)
        ) {

            let checkDate =
                uniqueDates.includes(todayTime)
                    ? todayTime
                    : yesterdayTime;

            currentStreak = 1;

            for (let i = uniqueDates.length - 1; i >= 0; i--) {

                const date = uniqueDates[i];

                if (date >= checkDate) continue;

                const previousDate =
                    new Date(checkDate);

                previousDate.setDate(
                    previousDate.getDate() - 1
                );

                const previousTime =
                    previousDate.getTime();

                if (date === previousTime) {

                    currentStreak++;

                    checkDate = previousTime;

                } else if (date < previousTime) {

                    break;

                }

            }

        }

        /*
         * LONGEST STREAK
         */

        let longestStreak = 1;
        let streak = 1;

        for (let i = 1; i < uniqueDates.length; i++) {

            const previous =
                new Date(uniqueDates[i - 1]);

            const current =
                new Date(uniqueDates[i]);

            const difference =
                (current - previous) /
                (1000 * 60 * 60 * 24);

            if (difference === 1) {

                streak++;

                if (streak > longestStreak) {
                    longestStreak = streak;
                }

            } else {

                streak = 1;

            }

        }

        /*
         * TESTS THIS WEEK
         */

        const weekStart = new Date(today);

        const dayOfWeek =
            weekStart.getDay();

        const mondayOffset =
            dayOfWeek === 0
                ? 6
                : dayOfWeek - 1;

        weekStart.setDate(
            weekStart.getDate() - mondayOffset
        );

        weekStart.setHours(0, 0, 0, 0);

        const weekStartTime =
            weekStart.getTime();

        const tomorrow = new Date(today);

        tomorrow.setDate(
            tomorrow.getDate() + 1
        );

        const tomorrowTime =
            tomorrow.getTime();

        const weeklyTests =
            dates.filter(date =>
                date >= weekStartTime &&
                date < tomorrowTime
            ).length;


        /*
         * EKRANA YAZ
         */

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

        const uniqueDates = new Set();

        tests.forEach(test => {

            if (!test.date) return;

            const date = test.date.toDate
                ? test.date.toDate()
                : new Date(test.date);

            const day = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

            uniqueDates.add(day);

        });

        const testCount = tests.length;

        const hasPerfectScore =
            tests.some(test => test.percent >= 100);

        const hasHighScore =
            tests.some(test => test.percent >= 90);

        /*
         * En uzun streak
         */

        const dates = [];

        tests.forEach(test => {

            if (!test.date) return;

            const date = test.date.toDate
                ? test.date.toDate()
                : new Date(test.date);

            const day = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            );

            dates.push(day.getTime());

        });

        const sortedDates = [...new Set(dates)]
            .sort((a, b) => a - b);

        let longestStreak = 0;
        let currentStreak = 0;

        if (sortedDates.length > 0) {

            currentStreak = 1;
            longestStreak = 1;

            for (let i = 1; i < sortedDates.length; i++) {

                const difference =
                    (sortedDates[i] - sortedDates[i - 1]) /
                    (1000 * 60 * 60 * 24);

                if (difference === 1) {

                    currentStreak++;

                    if (currentStreak > longestStreak) {
                        longestStreak = currentStreak;
                    }

                } else {

                    currentStreak = 1;

                }

            }

        }

        const achievements = [

            {
                icon: "🥉",
                title: "First Step",
                text: "Complete your first test.",
                unlocked: testCount >= 1
            },

             {
                icon: "🚀",
                title: "Getting Better",
                text: "Complete 10 tests.",
                unlocked: testCount >= 10
            },

            {
                icon: "📝",
                title: "Finisher",
                text: "Complete 25 tests.",
                unlocked: testCount >= 25
            },

            {
                icon: "📝",
                title: "Test Professor",
                text: "Complete 50 tests.",
                unlocked: testCount >= 50
            },

            {
                icon: "📝",
                title: "Test Master",
                text: "Complete 100 tests.",
                unlocked: testCount >= 100
            },

            {
                icon: "🏆",
                title: "High Achiever",
                text: "Score 90% or higher.",
                unlocked: hasHighScore
            },

            {
                icon: "🎯",
                title: "Perfect Score",
                text: "Get a 100% score.",
                unlocked: hasPerfectScore
            },

            {
                icon: "🔥",
                title: "10 Days Streak",
                text: "Study for 10 days.",
                unlocked: longestStreak >= 10
            }

           
        ];

        const container =
            document.getElementById("achievementsGrid");

        if (!container) return;

        container.innerHTML =
            achievements.map(achievement => `

                <div class="
                    achievement
                    ${achievement.unlocked
                        ? "unlocked"
                        : "locked"}
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

                    </div>

                </div>

            `).join("");

    } catch (error) {

        console.error(
            "Achievements loading error:",
            error
        );

    }

}

function loadDailyChallenge() {

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
    // COMPLETED KONTROLÜ
    // ============================

    const todayKey =
        new Date().toISOString().split("T")[0];

    const completedDate =
        sessionStorage.getItem(
            "challengeCompletedDate"
        );

    const completed =
        sessionStorage.getItem(
            "challengeCompleted"
        ) === "true"
        &&
        completedDate
        &&
        completedDate.startsWith(todayKey);


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