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
image:"images/exam5/1.png",

options:[
"Emma is responsible for doing the laundry.",
"Her father takes out the garbage.",
"Her mother washes the dishes and vacuums the floor.",
"Her brother is responsible for setting the table."
],

answer:0
},

{
image:"images/exam5/2.png",

options:[
"She prefers fried chicken with rice.",
"She wants grilled chicken with vegetables.",
"She would like boiled chicken with salad.",
"She wants roasted chicken with potatoes."
],

answer:1
},

{
image:"images/exam5/3.png",

options:[
"Why don't you send text messages?",
"Can I leave a message for your brother?",
"How do you keep in touch with your friends?",
"How often do you check your e-mails?"
],

answer:2
},

{
image:"images/exam5/4.png",

options:[
"A burglary",
"A natural disaster",
"A forest fire",
"A traffic accident"
],

answer:3
},

{
image:"images/exam5/5.png",

options:[
"Why did you choose Germany?",
"Have you ever travelled abroad?",
"Where did you stay during your trip?",
"How long did you stay there?"
],

answer:1
},

{
image:"images/exam5/6.png",

options:[
"Only ten percent of teenagers chat online.",
"Less than half of the teenagers use social networking sites.",
"Most teenagers prefer using social networking sites.",
"More than half of the teenagers play online games."
],

answer:2
},

{
image:"images/exam5/7.png",

options:[
"You should always wear the necessary safety equipment.",
"You don't need any equipment for this activity.",
"You can do extreme sports without any preparation.",
"You should choose the most dangerous activity."
],

answer:0
},

{
image:"images/exam5/8.png",

options:[
"She spent her holiday at home.",
"She didn't enjoy any outdoor activities.",
"She only travelled to another city for shopping.",
"She preferred visiting adventurous places during her holiday."
],

answer:3
},

{
image:"images/exam5/9.png",

options:[
"A pair of diving fins",
"A climbing rope",
"A pair of boxing gloves",
"A tennis racket"
],

answer:1
},

{
image:"images/exam5/10.png",

options:[
"Where did the scientist work?",
"Which invention changed the world most?",
"What about modern scientific studies?",
"What did the scientist discover in the past?"
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

<h3>Mock Exam 5</h3>

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


        testName: "Exam 5",
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