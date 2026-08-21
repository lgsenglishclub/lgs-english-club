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
        image: "images/exam13/1.png",

        question: "Frank has a new telephone. He wants to connect to the Internet.\n\nWhich icon should Frank click?",

        options: [
            "Networks",
            "Sounds",
            "Date and time",
            "Passwords"
        ],

        answer: 0
    },

    {
        image: "images/exam13/2.png",

        question: "According to the conversation above, which of the following are the most appropriate activities for Janet and Sam?",

        options: [
            "Janet: playing volleyball / joining a guitar course — Sam: going to the shopping mall / doing basketball training",
            "Janet: watching a play / going to a concert — Sam: going to the theatre / joining a drawing course",
            "Janet: swimming / playing the piano — Sam: watching a play / visiting an art exhibition",
            "Janet: listening to music / going to the theatre — Sam: cycling / going shopping"
        ],

        answer: 3
    },

    {
        image: "images/exam13/3.png",

        question: "Answer the question using the invitation card above.\n\nWhich of the following does NOT have an answer in the invitation?",

        options: [
            "Who is the party for?",
            "What time are they meeting?",
            "Where is the party going to be?",
            "How can they learn about the details of the event?"
        ],

        answer: 1
    },

    {
        image: "images/exam13/4.png",

        question: "Which of the following IS NOT correct according to the conversation above?",

        options: [
            "Jack does his shopping online.",
            "Julia improves her science knowledge.",
            "Tim uses his smartphone for communication.",
            "Maggy reads magazines and newspapers on the Net."
        ],

        answer: 1
    },

    {
        image: "images/exam13/5.png",

        question: "Which of the following is CORRECT according to the information above?",

        options: [
            "Girls listen to jazz and folk music more than boys do.",
            "More than half of the girls prefer listening to pop music.",
            "Rap music is the most popular kind of music for both groups.",
            "Both boys and girls like classical music at the same rate."
        ],

        answer: 1
    },

    {
        image: "images/exam13/6.png",

        question: "Which of the following is CORRECT according to the text?",

        options: [
            "People have to bring their own rafting equipment.",
            "If you want to try rafting on Çoruh, go there in the winter.",
            "Çoruh is the most popular white-water river in the world.",
            "There are various accommodation options for rafting lovers."
        ],

        answer: 3
    },

    {
        image: "images/exam13/7.png",

        question: "Looking at the information above, who can buy Dean’s computer?",

        options: [
            "Carl",
            "Jack",
            "Bobby",
            "Sam"
        ],

        answer: 3
    },

    {
        image: "images/exam13/8.png",

        question: "Kimberly, Matthew, Laura, and Vincent want to attend a teen camp. They see a brochure at school and try to find a camp matching their interests. The brochure and some information about the students are below:\n\n• Kimberly loves spending time in nature. She enjoys trekking and climbing mountains.\n• Matthew wants to explore other cultures and learn Spanish.\n• Laura likes teaching children and taking part in projects about saving the environment.\n• Vincent likes theatre, music, and dance.\n\nWhich student’s interests do NOT match any of the camps on the brochure?",

        options: [
            "Kimberly",
            "Matthew",
            "Laura",
            "Vincent"
        ],

        answer: 3
    },

    {
        image: "images/exam13/9.png",

        question: "The event will be - - - -.",

        options: [
            "in the afternoon",
            "at the weekend",
            "$25 for 2 students",
            "in the school garden"
        ],

        answer: 1
    },

    {
        image: "images/exam13/10.png",

        question: "Which of the following is CORRECT according to the research results?",

        options: [
            "Korean teens are more interested in sports than English teens are.",
            "Korean teens spend less time studying than English teens do.",
            "English teens’ favourite activity is going online.",
            "English teens prefer artistic activities."
        ],

        answer: 2
    },

    {
        image: "images/exam13/11.png",

        question: "Read Arthur's plans and the conversation. Answer the question.\n\nBlake: We are planning to gather on Monday. Will you come?\n\nArthur: What time?\n\nBlake: At 4 pm.\n\nArthur: - - - -.\n\nWhich of the following completes the conversation?",

        options: [
            "It is awesome, but I will be at John’s party",
            "I’d love to, but I have to leave before six",
            "That sounds great, but I have to train for the tournament",
            "I am sorry, but I am taking care of my brother at that time"
        ],

        answer: 1
    },

    {
        image: "images/exam13/12.png",

        question: "Read the text and complete the sentence.\n\nIf you want to have a safe and amusing safari tour, you should - - - -.",

        options: [
            "wear comfortable clothes",
            "be close to the animals",
            "not stay in the tour car",
            "not take any photos"
        ],

        answer: 0
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