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
image:"images/exam2/1.png",

options:[
"Julia spends most of her free time meeting her friends.",
"Julia prefers doing sports to surfing the Internet.",
"Tony spends more time online than doing any other activity.",
"Tony and Julia spend exactly the same amount of time doing sports."
],

answer:2
},

{
image:"images/exam2/2.png",

options:[
"Add the sauce before cutting the vegetables.",
"Put the noodles into cold water after cooking them.",
"Cook the noodles first and then add the vegetables and sauce.",
"Wash the vegetables after serving the noodles."
],

answer:2
},

{
image:"images/exam2/3.png",

options:[
"She never keeps her friends' secrets.",
"She always tells her friends what they want to hear.",
"She is willing to help her friends when they have problems.",
"She prefers spending time alone instead of meeting her friends."
],

answer:2
},

{
image:"images/exam2/4.png",

options:[
"She wants to share her personal information with everyone.",
"She wants to make her online account safer.",
"She wants to spend more time on social media.",
"She wants to buy a new computer."
],

answer:1
},

{
image:"images/exam2/5.png",

options:[
"He is interested in activities that require courage and physical strength.",
"He prefers relaxing activities that he can do at home.",
"He wants to try an activity in the water because he loves swimming.",
"He is looking for an activity that does not require any special equipment."
],

answer:0
},

{
image:"images/exam2/6.png",

options:[
"She is looking for a hotel near the airport.",
"She wants to learn about traditional food in the city.",
"She is searching for information about a historical place.",
"She wants to find a suitable flight for her trip."
],

answer:3
},

{
image:"images/exam2/7.png",

options:[
"Jack takes out the garbage and does the laundry.",
"Jack is responsible for all the household chores.",
"Jack never helps his family with housework.",
"Jack only helps with cleaning the kitchen."
],

answer:0
},

{
image:"images/exam2/8.png",

options:[
"She received the Nobel Prize before starting her scientific career.",
"She worked in science and made important discoveries.",
"She became a scientist because her parents were rich.",
"She stopped working after making her first discovery."
],

answer:1
},

{
image:"images/exam2/9.png",

options:[
"The ground becomes completely dry because there is too much rain.",
"Large amounts of snow suddenly fall in a warm region.",
"A powerful movement of the Earth's surface causes buildings to shake.",
"Strong winds disappear after a long period of sunshine."
],

answer:2
},

{
image:"images/exam2/10.png",

options:[
"Would you like me to call you back later?",
"Could you tell me who is calling, please?",
"Can you leave a message after the tone?",
"Why don't you turn off your phone?"
],

answer:1
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

<h3>Mock Exam 2</h3>

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
onclick="window.location.href='unit1-questions.html'"

🏠 Testler Sayfasına Dön

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


        testName: "Exam 2",
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