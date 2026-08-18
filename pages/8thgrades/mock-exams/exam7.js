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
image:"images/exam7/1.png",

question:"According to Mia's social media post, which activity would she most probably enjoy doing with her friends?",

options:[
"Spending a quiet evening at home",
"Trying a new activity together",
"Studying for an exam all day",
"Playing computer games alone"
],

answer:1
},

{
image:"images/exam7/2.png",

question:"Four students are talking about their free-time preferences. Who prefers an activity that is completely different from the others?",

options:[
"Emma",
"Lucas",
"Oliver",
"Sophie"
],

answer:3
},

{
image:"images/exam7/3.png",

question:"Tom wants to invite Ben to an activity, but Ben doesn't like crowded places. Which suggestion would be the most suitable for Ben?",

options:[
"Let's go to the shopping mall.",
"How about joining the school festival?",
"Why don't we have a picnic in the park?",
"Would you like to go to a busy concert?"
],

answer:2
},

{
image:"images/exam7/4.png",

question:"Why does Anna call her friend?",

options:[
"To cancel their weekend plan",
"To ask for help with her homework",
"To invite her friend to a birthday party",
"To learn about her friend's new hobby"
],

answer:0
},

{
image:"images/exam7/5.png",

question:"Look at the students' preferences. Which statement shows a correct comparison?",

options:[
"Jack enjoys reading more than playing sports.",
"Kate likes shopping less than watching movies.",
"Tom enjoys listening to music more than Jack does.",
"Lucy and Kate have exactly the same preferences."
],

answer:1
},

{
image:"images/exam7/6.png",

question:"Your friend tells you that she has a problem with her best friend. She says they had an argument yesterday. What would be the best response?",

options:[
"You should ignore your friend until she apologizes.",
"You should talk to her calmly and try to understand each other.",
"You should tell everyone about the argument.",
"You should end the friendship immediately."
],

answer:1
},

{
image:"images/exam7/7.png",

question:"Sarah receives an invitation to a picnic, but she cannot attend because she has to visit her grandparents. Which reply is appropriate?",

options:[
"That sounds great. I'll definitely be there.",
"Thanks for inviting me, but I can't come because I have another plan.",
"I don't like picnics, so I don't want to come.",
"Why don't you invite somebody else instead?"
],

answer:1
},

{
image:"images/exam7/8.png",

question:"Jack likes doing outdoor activities and meeting his friends. Emily prefers quiet activities at home. Which activity would be suitable for BOTH of them?",

options:[
"Going to a crowded concert",
"Playing a computer game separately",
"Reading a book in a quiet park",
"Going to a noisy shopping centre"
],

answer:2
},

{
image:"images/exam7/9.png",

question:"What is the main idea of the text?",

options:[
"Having the same hobbies is necessary for a strong friendship.",
"Good friendships depend on understanding, respect and trust.",
"Teenagers should spend all their free time with their friends.",
"People usually become friends because they have the same interests."
],

answer:1
},

{
image:"images/exam7/10.png",

question:"Which conclusion can be drawn from the text about Daniel?",

options:[
"He prefers spending time alone to being with other people.",
"He is interested in trying different activities with his friends.",
"He doesn't enjoy outdoor activities because they are tiring.",
"He only spends his weekends doing activities with his family."
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

<h3>Mock Exam 7</h3>

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


        testName: "Exam 7",
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