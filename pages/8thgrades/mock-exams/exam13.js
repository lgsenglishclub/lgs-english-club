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
    image:"images/exam13/1.png",

    question:`
Look at the invitation card and answer the question.

Which of the following questions DOES NOT have an answer
in the invitation card?
`,

    options:[
        "How much is the entrance fee for the event?",
        "Where will the event take place?",
        "When should the participants register?",
        "Who can you contact for more information?"
    ],

    answer:2
},


{
    question:`
Read the text and answer the question.

Ryan went to an adventure camp last month.

It was an amazing experience for me. On the first day,
I tried bungee jumping. It was exciting and I loved it.

On the second day, I went rock climbing. It was a little
difficult, but I enjoyed it.

Later, we wanted to try paragliding, but we couldn't
because it was too windy.

On the last day, we did rafting on the river.
It was great!

Next summer, I want to try skydiving.


Which of the following questions DOES NOT have an answer
in the paragraph?
`,

    options:[
        "What did Ryan think about rafting?",
        "Which sport did he try on the second day?",
        "What equipment did he need for kayaking?",
        "Why couldn't he try paragliding?"
    ],

    answer:2
},


{
    image:"images/exam13/3.png",

    question:`
Mert is a new student at school. He wants to make a friend
who is reliable, honest and supportive.

The table shows the characteristics of some of his classmates.


Who is the most appropriate friend for him?
`,

    options:[
        "Jason",
        "Kevin",
        "Oliver",
        "Lucas"
    ],

    answer:1
},


{
    image:"images/exam13/4.png",

    question:`
Look at the table and answer the question.

According to the information in the table,
Aziz Sancar - - - -.
`,

    options:[
        "was born in Turkey in 1946",
        "has never received an important award",
        "worked only as a university teacher",
        "received the Nobel Prize in Chemistry"
    ],

    answer:3
},


{
    image:"images/exam13/4.png",

    question:`
Look at the table and answer the question.

There is NO information about Aziz Sancar's - - - -
in the table.
`,

    options:[
        "education",
        "profession",
        "awards",
        "date of birth"
    ],

    answer:0
},


{
    image:"images/exam13/6.png",

    question:`
Read the information and look at the to-do list.

Sarah is a mother of four children. She wants them to share
the responsibilities at home, so she prepares a to-do list.

After breakfast, she wants to do the grocery shopping,
but she cannot find any clean clothes to wear.


Who hasn't done his/her chore?
`,

    options:[
        "Daniel",
        "Lucy",
        "Michael",
        "Emma"
    ],

    answer:1
},


{
    question:`
Read the dialogue and answer the question.

Ella: What would you like to have?
I will have grilled chicken and a salad.

Ryan: I am not very hungry, so I just want a piece of
cheesecake. I have a sweet tooth.

Ella: - - - -

Ryan: I mean I love sweet food, especially desserts.


Which of the following completes the conversation?
`,

    options:[
        "What does that mean?",
        "How does cheesecake taste?",
        "Why don't you want a salad?",
        "Would you like some grilled chicken?"
    ],

    answer:0
},


{
    question:`
Look at the dialogue and answer the question.

Mia: - - - -?

Noah: Well, I would rather go scuba diving.

Mia: - - - -?

Noah: Because I enjoy discovering the underwater world.

Mia: I prefer going rafting.
I think it is really exciting.


Which of the following DOES NOT complete the dialogue?
`,

    options:[
        "How dangerous is scuba diving?",
        "Why do you prefer it?",
        "What extreme sport do you prefer doing?",
        "What about you?"
    ],

    answer:0
},


{
    question:`
Look at the dialogue and answer the question.

Alex: Hi, Ben! I returned from my holiday.

Alex: (1) - - - -?

Ben: It was fantastic! I really had a great time.

Alex: (2) - - - -?

Ben: I stayed at a small hotel near the beach.

Alex: (3) - - - -?

Ben: I visited ancient ruins, swam in the sea
and tried local food.

Alex: (4) - - - -?

Ben: Yes, I bought some magnets and a handmade
necklace for my sister.


Which of the following matches is CORRECT?
`,

    options:[
        "(1) How was your holiday? (2) What was your accommodation choice? (3) What did you do there? (4) Did you buy any souvenirs?",

        "(1) What did you do there? (2) How was your holiday? (3) Did you buy any souvenirs? (4) What was your accommodation choice?",

        "(1) Did you buy any souvenirs? (2) What was your accommodation choice? (3) How was your holiday? (4) What did you do there?",

        "(1) What was your accommodation choice? (2) Did you buy any souvenirs? (3) What did you do there? (4) How was your holiday?"
    ],

    answer:0
},


{
    image:"images/exam13/10.png",

    question:`
Read the text messages and answer the question.

Which of the following DOES NOT match with
one of the messages above?
`,

    options:[
        "You can leave a message when the person you are calling is unavailable.",

        "You can press a number to get information about a service.",

        "The caller can expect the person to call back later.",

        "You should visit the office because the person cannot take phone calls."
    ],

    answer:3
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

<h3>Mock Exam 13</h3>

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


        testName: "Exam 13",
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