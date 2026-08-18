import { saveToFirebase } from "../../../js/saveResult.js";
import { db } from "../../../firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc,
    increment,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ============================
// 🎮 TEST XP SYSTEM
// ============================

async function addTestXP(percent) {

    console.log("🎮 addTestXP BAŞLADI:", percent);

    const userId =
        sessionStorage.getItem("userId");

    if (!userId) {

        console.warn(
            "⚠️ User ID bulunamadı. XP verilmedi."
        );

        return;

    }

    let baseXP = 20;
    let bonusXP = 0;

    // ============================
    // 🏆 SUCCESS BONUS
    // ============================

    if (percent >= 100) {

        bonusXP = 25;

    }
    else if (percent >= 90) {

        bonusXP = 15;

    }
    else if (percent >= 80) {

        bonusXP = 10;

    }

    const totalXP =
        baseXP + bonusXP;

    try {

        const userRef =
            doc(db, "users", userId);


        // ============================
        // ⭐ XP EKLE
        // ============================

        await updateDoc(userRef, {

            xp: increment(totalXP)

        });


        // ============================
        // 📈 XP HISTORY
        // ============================

        await addDoc(
            collection(
                db,
                "users",
                userId,
                "xpHistory"
            ),
            {

                amount: totalXP,

                reason: "Test Completed",

                icon: "📝",

                date: serverTimestamp()

            }
        );


        console.log(
            `🎮 +${baseXP} XP test`
        );


        if (bonusXP > 0) {

            console.log(
                `🏆 +${bonusXP} XP başarı bonusu`
            );

        }


        console.log(
            `⭐ Toplam +${totalXP} XP`
        );

        console.log(
            `📈 XP History: +${totalXP} Test Completed`
        );


    } catch (error) {

        console.error(
            "❌ XP eklenirken hata:",
            error
        );

    }

}

const questions = [

{
image:"images/exam1/1.png",

question:"Which of the following is TRUE according to Linda's profile?",

options:[
"Linda prefers spending time with friends who have different interests.",
"Linda thinks being honest is less important than being funny.",
"Linda values friends who are honest and supportive.",
"Linda doesn't care whether her friends keep their promises."
],

answer:2
},

{
image:"images/exam1/2.png",

question:"Which of the following is CORRECT according to the schedule below?",

options:[
"She usually spends her free time doing outdoor activities.",
"She never meets her friends after school.",
"She prefers studying alone to doing any other activity.",
"She spends most of her time playing computer games."
],

answer:0
},

{
image:"images/exam1/3.png",

question:"Which of the following should you do as the final step of the recipe?",

options:[
"Put the vegetables into the oven.",
"Serve the chicken with some fresh salad.",
"Mix the ingredients with the sauce.",
"Add some grated cheese before serving."
],

answer:3
},

{
image:"images/exam1/4.png",

question:"Which of the following completes the phone conversation?",

options:[
"Would you like to leave a message?",
"Sure. I'll tell him to call you back.",
"Could you speak a little louder, please?",
"Can I speak to Daniel, please?"
],

answer:1
},

{
image:"images/exam1/5.png",

question:"Which of the following is TRUE according to the Internet usage chart?",

options:[
"Most teenagers use the Internet mainly for educational purposes.",
"Playing online games is less popular than practising English.",
"Social networking is the most common Internet activity.",
"Only a small number of teenagers use the Internet for communication."
],

answer:2
},

{
image:"images/exam1/6.png",

question:"Which of the following is the best advice for someone who wants to try an extreme sport?",

options:[
"You should wear the necessary safety equipment before starting.",
"You don't need to take any precautions during the activity.",
"You should choose the most difficult activity to feel excited.",
"You can try the activity without learning the basic rules."
],

answer:0
},

{
image:"images/exam1/7.png",

question:"Which of the following is CORRECT according to the travel information?",

options:[
"She is going to travel by train and stay in a hotel.",
"She will visit Ankara before going to Cappadocia.",
"She has planned a beach holiday with her family.",
"She is interested in visiting historical and natural attractions."
],

answer:3
},

{
image:"images/exam1/8.png",

question:"Which of the following is TRUE according to the chores chart?",

options:[
"Her father is responsible for doing all the housework.",
"Everyone in the family has at least one responsibility.",
"She never helps with the chores during the week.",
"Her brother does the laundry and washes all the dishes."
],

answer:1
},

{
image:"images/exam1/9.png",

question:"Which of the following is TRUE according to the text?",

options:[
"The scientist stopped working on new projects after his first invention.",
"The scientist believes scientific studies can make people's lives easier.",
"The scientist thinks technology has caused more problems than solutions.",
"The scientist only studies inventions that were developed in the past."
],

answer:1
},

{
image:"images/exam1/10.png",

question:"What does Emma think about being a good friend?",

options:[
"Being a good friend means spending all your free time together.",
"Good friends should always have the same interests and hobbies.",
"Being honest and supporting each other are important in a friendship.",
"Good friends should avoid talking about their personal problems."
],

answer:2
}

];


let questionStatus = [];

let currentQuestion = 0;

let score = 0;

let timeLeft = 900;

let timer;

let answered = false;

let correct = 0;

let wrong = 0;

function showQuestion(){

    answered = false;

    document.getElementById("result").innerHTML = "";

    document.getElementById("nextButton").disabled = true;

    let q = questions[currentQuestion];

    questionStatus[currentQuestion] = "current";

    updateStatus();

    document.getElementById("questionNumber").innerHTML =
    "Question " + (currentQuestion + 1) + " / " + questions.length;

    let progress =
    ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";


    // SORU METNİ

  const questionText =
    document.getElementById("questionText");

questionText.textContent =
    q.question || "";

    // RESİM VARSA GÖSTER
    if(q.image && q.image !== ""){

        document.getElementById("questionImage").style.display = "block";
        document.getElementById("questionImage").src = q.image;

    }else{

        document.getElementById("questionImage").style.display = "none";

    }


    // ŞIKLAR
    document.getElementById("options").innerHTML = `

<button onclick="checkAnswer(0, this)">
A) ${q.options[0]}
</button>

<button onclick="checkAnswer(1, this)">
B) ${q.options[1]}
</button>

<button onclick="checkAnswer(2, this)">
C) ${q.options[2]}
</button>

<button onclick="checkAnswer(3, this)">
D) ${q.options[3]}
</button>

`;

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= questions.length){

        showResult();
        return;

    }

    showQuestion();

}

window.onload = function(){

    for(let i = 0; i < questions.length; i++){

    questionStatus.push("empty");

}

    currentQuestion = 0;

};

function checkAnswer(selected, button){

    if(answered) return;

    answered = true;

    let q = questions[currentQuestion];

    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn=>btn.disabled=true);

    if(selected === q.answer){

        button.classList.add("correct");

        score++;
        correct++;

        questionStatus[currentQuestion]="correct";

    }else{

        button.classList.add("wrong");

        buttons[q.answer].classList.add("correct");

        wrong++;

        questionStatus[currentQuestion]="wrong";

    }

    updateStatus();

    document.getElementById("nextButton").disabled=false;

}

function startTimer(){

    timer = setInterval(function(){

        timeLeft--;


        let minutes = Math.floor(timeLeft / 60);
let seconds = timeLeft % 60;

document.getElementById("timer").innerHTML =
"⏱️ Süre: " + 
minutes + ":" + 
(seconds < 10 ? "0" : "") + seconds;



        if(timeLeft <= 0){


            clearInterval(timer);


            showResult();


        }


    },1000);

}


async function showResult(){

    clearInterval(timer);


    let total = questions.length;

    let empty = total - (correct + wrong);

    let success = Math.round((correct / total) * 100);


    await saveTestResult();

    document.getElementById("questionBox").innerHTML = `

<div class="result-card">

<h2>🎉 Tebrikler!</h2>

<h3>Mock Exam 1</h3>

<div class="result-score">
${(score - wrong/3).toFixed(2)}
</div>


<p><strong>📊 Net</strong></p>

<hr>

<p>✅ Doğru: <b>${correct}</b></p>

<p>❌ Yanlış: <b>${wrong}</b></p>

<p>📊 Başarı: <b>%${success}</b></p>

<p>⏱ Süre Tamamlandı</p>

<button class="restart-btn"
onclick="location.reload()">

🔄 Tekrar Çöz

</button>

<button class="menu-btn"
onclick="window.location.href='mock-exams.html'"

🏠 Mock Exams

</button>

</div>

`;

}

function updateStatus(){

    let html = "";

    questionStatus.forEach((status,index)=>{


        let className = "status-item";


        if(status=="current"){

            className += " status-current";

        }


        if(status=="correct"){

            className += " status-correct";

        }


        if(status=="wrong"){

            className += " status-wrong";

        }


        html += `

        <div class="${className}">
        ${index+1}
        </div>

        `;


    });


    document.getElementById("questionStatus").innerHTML = html;

}

function startTest(){

    document.getElementById("startScreen").style.display="none";

    document.getElementById("questionBox").style.display="block";


    currentQuestion = 0;

    showQuestion();
    startTimer();

}

async function saveTestResult(){

    const history = JSON.parse(sessionStorage.getItem("recentTests")) || [];

    const wrong = questions.length - score;

    const result = {

    userId: sessionStorage.getItem("userId"),

    username: sessionStorage.getItem("username"),

    email: sessionStorage.getItem("email"),


        testName: "Exam 1",
        correct: score,
        wrong: wrong,
        net: (score - wrong/3).toFixed(2),
        percent: Math.round(score/questions.length*100),
        date: new Date().toLocaleDateString("en-GB"),
        challenge: sessionStorage.getItem("activeChallenge") || null
    };

    await saveToFirebase(result);

    await addTestXP(result.percent);

  // ============================
// 🎯 DAILY CHALLENGE COMPLETION
// ============================

const activeChallenge =
    sessionStorage.getItem("activeChallenge");

if (activeChallenge === "daily") {

    const target =
        Number(
            sessionStorage.getItem("challengeTarget")
        ) || 10;

    const reward =
        Number(
            sessionStorage.getItem("challengeReward")
        ) || 50;

    if (questions.length >= target) {

        const today =
            new Date().toISOString().split("T")[0];

        const userId =
            sessionStorage.getItem("userId");

        if (userId) {

            const userRef =
                doc(db, "users", userId);

            const userSnap =
                await getDoc(userRef);

            const userData =
                userSnap.exists()
                    ? userSnap.data()
                    : {};

            const alreadyCompleted =
                userData.dailyChallengeCompletedDate === today;

            // Bugün daha önce tamamlanmadıysa
            if (!alreadyCompleted) {

                // XP + tamamlanma tarihi
                await updateDoc(userRef, {

                    xp: increment(reward),

                    dailyChallengeCompletedDate:
                        today

                });

                // XP History
                await addDoc(
                    collection(
                        db,
                        "users",
                        userId,
                        "xpHistory"
                    ),
                    {

                        amount: reward,

                        reason:
                            "Daily Challenge",

                        icon: "🎯",

                        date:
                            serverTimestamp()

                    }
                );

                console.log(
                    "🎯 DAILY CHALLENGE COMPLETED!"
                );

                console.log(
                    `🏆 +${reward} XP`
                );

            } else {

                console.log(
                    "ℹ️ Daily Challenge bugün zaten tamamlandı."
                );

            }

        }

    }

}

history.unshift(result);

if(history.length > 10){
    history.pop();
}

sessionStorage.setItem(
    "recentTests",
    JSON.stringify(history)
);


}

window.startTest = startTest;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;