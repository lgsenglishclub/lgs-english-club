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
image:"images/exam16/1.png",

question:"Read the messages. What can we understand about Chloe?",

options:[
"She is looking for a friend who can help her with a school problem.",
"She has decided to cancel the activity because she is too busy.",
"She wants to organize a party without telling her classmates.",
"She prefers working on school projects completely by herself."
],

answer:0
},

{
image:"images/exam16/2.png",

question:"Four teenagers are talking about their plans for Saturday. Who has made a plan that is NOT suitable for their situation?",

options:[
"Alex, who wants to go cycling although the weather forecast says it will rain all day.",
"Emma, who wants to study at the library because she has an exam on Monday.",
"Ryan, who wants to meet his friends at a café after finishing his chores.",
"Sophie, who wants to watch a film at home because she has already finished her homework."
],

answer:0
},

{
image:"images/exam16/3.png",

question:"Read the recipe and the instructions. What should Julia do immediately before putting the mixture into the oven?",

options:[
"Add the flour and mix it with the other ingredients.",
"Leave the mixture in the refrigerator for an hour.",
"Pour the mixture into a greased baking dish.",
"Decorate the cake with pieces of chocolate."
],

answer:2
},

{
image:"images/exam16/4.png",

question:"Read the phone conversation. What is the main reason for Alex's call?",

options:[
"To find out why the school activity was cancelled.",
"To remind his friend about something they have planned.",
"To ask his friend to lend him some money.",
"To invite his friend to a different activity."
],

answer:1
},

{
image:"images/exam16/5.png",

question:"The graph shows how a group of students use the Internet during a typical week. Which conclusion can be drawn from the graph?",

options:[
"Students spend the same amount of time on every online activity.",
"Entertainment is more common than educational use among the students.",
"Communication is the least preferred reason for using the Internet.",
"Students mainly use the Internet for shopping and online games."
],

answer:1
},

{
image:"images/exam16/6.png",

question:"A travel company offers the following activities. Which student can join the activity without breaking any of the rules?",

options:[
"Jack, who is 13 and wants to join the 15+ mountain climbing tour.",
"Lily, who is 15 but doesn't have the required safety equipment.",
"Tom, who is 16, has the required equipment and has parental permission.",
"Anna, who is 17 but refuses to follow the guide's instructions."
],

answer:2
},

{
image:"images/exam16/7.png",

question:"Read the information about four holiday destinations. Which destination would be the BEST choice for someone who wants to experience local life rather than a typical tourist holiday?",

options:[
"A resort with all-inclusive hotels, swimming pools and international restaurants.",
"A small village with local markets, traditional workshops and family-run restaurants.",
"A modern coastal city with large shopping centres and amusement parks.",
"A popular beach town with luxury hotels and crowded night clubs."
],

answer:1
},

{
image:"images/exam16/8.png",

question:"The family has guests coming at 7 p.m. They have four chores to finish. Which plan is the MOST efficient?",

options:[
"Emily sets the table while her brother cleans the living room; their mother prepares the food.",
"Emily watches TV while her brother cooks; their mother waters the plants.",
"Emily goes shopping after dinner while her brother plays computer games.",
"Emily cleans the garden while her brother takes a nap; their mother washes one plate."
],

answer:0
},

{
image:"images/exam16/9.png",

question:"Read the text. What was the most important reason for choosing the new solution?",

options:[
"It was cheaper but required more time.",
"It solved the problem without wasting unnecessary resources.",
"It allowed the students to avoid doing the experiment themselves.",
"It made the project more entertaining for the audience."
],

answer:1
},

{
image:"images/exam16/10.png",

question:"Read the text. Which of the following can we infer about the students' experience?",

options:[
"They understood that changing their plan could help them achieve their goal.",
"They realized that working together was less useful than working alone.",
"They decided that the original problem was impossible to solve.",
"They completed the project successfully without facing any difficulties."
],

answer:0
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

<h3>Mock Exam 16</h3>

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


        testName: "Exam 16",
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