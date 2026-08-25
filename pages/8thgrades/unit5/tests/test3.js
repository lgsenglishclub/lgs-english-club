import { saveToFirebase } from "../../../../js/saveResult.js";
import { db } from "../../../../firebase-config.js";

import {
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// ============================
// 🎮 TEST XP SYSTEM
// ============================

async function addTestXP(percent) {

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

        await updateDoc(userRef, {

            xp: increment(totalXP)

        });


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


    } catch (error) {

        console.error(
            "❌ XP eklenirken hata:",
            error
        );

    }

}

const unit5TheInternetTest3 = [

    {
        id: "u1_f_test3_q1",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q1.png",

        question:
            "Which of the following is NOT correct according to the text?",

        options: [
            "The person accepts the invitation.",
            "The person is happy for the invitation.",
            "The event will be tonight.",
            "The sender of the message also wants to talk to the receiver face to face."
        ],

        answer: 2,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q2.png",

        question:
            "Find the sentences in the messages that shows Bill refuses the offer.",

        options: [
            "Nothing much.",
            "I'm sorry, but I can't.",
            "It doesn't work.",
            "I think so."
        ],

        answer: 1,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q3.png",

        question:
            "Which question does NOT have an answer in the text?",

        options: [
            "When does he go to the technology store?",
            "Why does he go to the technology store?",
            "What are the prices of the tools?",
            "What does he do at the technology store?"
        ],

        answer: 2,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q4.png",

        question:
            "What can we say about the dialogue?",

        options: [
            "Eddie has the Internet connection problem.",
            "Sally couldn't understand Eddie first.",
            "Sally is good at using computers.",
            "Sally helps Eddie to solve his problem."
        ],

        answer: 1,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q5.png",

        question:
            "Which one is TRUE according to the dialogue?",

        options: [
            "Gary hates using social networking sites.",
            "Gary's computer doesn't work during the day.",
            "Gary is an Internet addict.",
            "Gary will have a healthy life."
        ],

        answer: 3,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q6.png",

        question:
            "Put the sentences in the correct order.",

        options: [
            "I-III-V-IV-II",
            "IV-I-V-III-II",
            "IV-I-II-V-III",
            "I-IV-V-III-II"
        ],

        answer: 1,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q7.png",

        question:
            "What can we say about the new app?",

        options: [
            "It is about daily news and magazines.",
            "You can download it only for your mobile phone.",
            "You can download it for your mobile phone and tablet.",
            "Less than 12.000 users have downloaded it."
        ],

        answer: 2,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q7.png",

        question:
            "The News Company ----.",

        options: [
            "prepares only tablet programmes.",
            "wants to learn user's ideas.",
            "reads the news at home.",
            "uploads the new app to the computer."
        ],

        answer: 1,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q9.png",

        question:
            "Martha is worried about Jenson because ----. ",

        options: [
            "he is connected to the internet all the time.",
            "he prefers being offline after school.",
            "his computer crashed last week.",
            "he doesn't come home from school."
        ],

        answer: 0,
    },

    {
        id: "u1_f_test3_q2",
        unit: "The Internet",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q9.png",

        question:
            "What does Jenson mostly use the internet for?",

        options: [
            "Following match scores",
            "Plaaqying online games",
            "Chatting with his friends",
            "Listening to music"
        ],

        answer: 2,
    }

];

const questions = unit5TheInternetTest3;

let timer;
let timeLeft = 90;

let current = 0;
let score = 0;
let selected = null;
let wrongQuestions = [];


function loadQuestion() {

    clearInterval(timer);

    timeLeft = 90;
    selected = null;

    const q = questions[current];

    const quiz =
        document.getElementById("quiz");

    // =========================================
    // QUESTION CONTENT
    // =========================================

    let questionText =
        q.question || q.q || "";

    // =========================================
    // EXTRA CONTENT
    // =========================================

    let extraContent = "";

    // =========================================
    // IMAGE
    // =========================================

    if (q.image) {

        extraContent += `
            <div class="question-image">
                <img
                    src="${q.image}"
                    alt="Question image"
                    onerror="this.style.display='none'"
                >
            </div>
        `;
    }


    // =========================================
    // DIALOGUE
    // =========================================

    if (q.dialogue) {

    extraContent += `
        <div class="dialogue-box">

            ${q.dialogue.map(line => {

                const parts = line.split(":");

                if (parts.length > 1) {

                    const speaker = parts.shift().trim();
                    const text = parts.join(":").trim();

                    return `
                        <p>
                            <strong>${speaker}:</strong>
                            ${text}
                        </p>
                    `;

                }

                return `<p>${line}</p>`;

            }).join("")}

        </div>
    `;
}


    // =========================================
    // READING / PASSAGE
    // =========================================

    if (q.passage) {

        extraContent += `
            <div class="reading-box">

                ${q.passage
                    .split("\n\n")
                    .map(paragraph => `
                        <p>${paragraph}</p>
                    `)
                    .join("")
                }

            </div>
        `;
    }


    // =========================================
    // SOCIAL MEDIA / POST
    // =========================================

    if (q.post) {

        extraContent += `

            <div class="social-post">

                <div class="social-post-header">

                    <strong>
                        ${q.post.title}
                    </strong>

                    <span>
                        ${q.post.date}
                    </span>

                </div>


                <div class="social-post-info">

                    <p>
                        🕑 ${q.post.time}
                    </p>

                    <p>
                        📍 ${q.post.place}
                    </p>

                </div>


                <h4>Activities</h4>

                <ul>

                    ${q.post.activities
                        .map(activity => `
                            <li>${activity}</li>
                        `)
                        .join("")
                    }

                </ul>


                <div class="post-note">

                    💡 ${q.post.note}

                </div>


                ${
                    q.comments
                    ? `

                        <div class="comments">

                            <h4>Comments</h4>

                            ${q.comments
                                .map(comment => `
                                    <p>${comment}</p>
                                `)
                                .join("")
                            }

                        </div>

                    `
                    : ""
                }

            </div>

        `;
    }


    // =========================================
    // QUESTION CARD
    // =========================================

    quiz.innerHTML = `

        <div class="question-card">

            <div class="question-title">

                ⭐ Question
                ${current + 1}
                /
                ${questions.length}

            </div>


            <div class="timer">

                ⏱️ Time Left:

                <span
                    id="time"
                    class="timer-number"
                >
                    90
                </span>

            </div>


            ${extraContent}


            <div class="question-text">

                ${questionText}

            </div>


            <div class="answers">

                ${q.options
                    .map((option, index) => `

                        <div
                            class="answer"
                            onclick="
                                selectOption(
                                    ${index},
                                    this
                                )
                            "
                        >

                            <span>
                                ${String.fromCharCode(
                                    65 + index
                                )}
                            </span>

                            ${option}

                        </div>

                    `)
                    .join("")
                }

            </div>

            <button
                id="nextBtn"
                onclick="nextQuestion()"
            >
                Next Question
            </button>

        </div>

    `;


    // =========================================
    // TIMER
    // =========================================

    timer = setInterval(() => {

        timeLeft--;

        const timeElement =
            document.getElementById("time");

        if (timeElement) {
            timeElement.innerText =
                timeLeft;
        }


        if (timeLeft <= 0) {

            clearInterval(timer);

            selected = -1;

            nextQuestion();

        }

    }, 1000);

}

function nextQuestion(){

    clearInterval(timer);

    if(selected === null){
        alert("Please select an answer.");
        return;
    }


    let q = questions[current];


    let options = document.querySelectorAll(".answer");


    // Doğru cevabı göster
    options[q.answer].classList.add("correct");


    // Yanlış seçildiyse göster
if (selected !== -1 && selected !== q.answer) {

    options[selected].classList.add("wrong");

}


    // Tüm seçenekleri kilitle
    options.forEach(option=>{
        option.style.pointerEvents="none";
    });


    if(selected === q.answer){

    score++;

}else{

    wrongQuestions.push({

        question:q.question,

        correct:q.options[q.answer],

        explanation:q.explanation

    });

}


    // Açıklamayı göster
    let exp=document.getElementById("explanation");

    if(exp){
        exp.style.display="block";
    }


    setTimeout(async ()=>{

    current++;

    selected = null;


        if(current < questions.length){

            loadQuestion();

        }
        else{

           await saveTestResult();

           document.getElementById("quiz").innerHTML=`

<div class="result-card">

    <div class="result-icon">
        🎉
    </div>

    <h2>Test Completed</h2>

    <div class="score-circle">
        <span>${score}</span>
        <small>/${questions.length}</small>
    </div>


    <div class="result-message">
        ${
        score >= 33 
        ? "🌟 Excellent! You are ready for LGS."
        : score >= 25
        ? "👍 Good job! Keep practicing."
        : "📚 Review the topic and try again."
        }
    </div>

    


    <div class="stats">

        <div class="stat-box">
            <b>${score}</b>
            <span>Correct</span>
        </div>


        <div class="stat-box">
            <b>${questions.length-score}</b>
            <span>Wrong</span>
        </div>


        <div class="stat-box">
            <b>${Math.round(score/questions.length*100)}%</b>
            <span>Success</span>
        </div>

    </div>

   
    <button onclick="location.reload()" class="restart-btn">
    🔄 Try Again
</button>

<button
    onclick="location.href='../unit5-questions.html'"
    class="restart-btn">
    ← Questions
</button>


</div>

`;

            document.getElementById("nextBtn").disabled=false;

        }


    },1500);

}

function selectOption(index, element){

    selected = index;

    // Önce tüm şıkların seçimini kaldır
    document.querySelectorAll(".answer")
    .forEach(option=>{
        option.classList.remove("selected");
    });

    // Sadece tıklanan şıkkı seç
    element.classList.add("selected");

}

console.log("Question count:", questions.length);

async function saveTestResult(){

    const history = JSON.parse(sessionStorage.getItem("recentTests")) || [];

    const wrong = questions.length - score;

    const result = {

    userId: sessionStorage.getItem("userId"),

    username: sessionStorage.getItem("username"),

    email: sessionStorage.getItem("email"),


        testName: "The Internet Test 3",
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
// DAILY CHALLENGE COMPLETION
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

        sessionStorage.setItem(
            "challengeCompleted",
            "true"
        );

        sessionStorage.setItem(
            "challengeCompletedDate",
            new Date().toISOString()
        );

        sessionStorage.setItem(
            "challengeXP",
            String(reward)
        );

        console.log("🎉 DAILY CHALLENGE COMPLETED!");

        console.log(
            `🏆 +${reward} XP`
        );

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


window.loadQuestion = loadQuestion;
window.nextQuestion = nextQuestion;
window.selectOption = selectOption;
window.saveTestResult = saveTestResult;

loadQuestion();