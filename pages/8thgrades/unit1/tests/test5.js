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

const unit1FriendshipTest5 = [

    // =====================================================
    // QUESTION 1
    // =====================================================

    {
        id: "u1_f_test5_q1",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q1.png",

        options: [
            "Yes, sure",
            "I’d love some",
            "No, thanks",
            "Yes, I would"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 2
    // =====================================================

    {
        id: "u1_f_test5_q2",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q2.png",

        options: [
            "What would you like",
            "What do you usually have for lunch",
            "Would you like to sit here",
            "Do you often have your meal here"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 3
    // =====================================================

    {
        id: "u1_f_test5_q3",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q3.png",

        options: [
            "I’d love to, but I can’t",
            "Thanks for inviting me",
            "I’m too busy",
            "I’m sorry"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 4
    // =====================================================

     {
        id: "u1_f_test5_q4",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q4.png",

        question:
            "According to the information above, which of the following can be Laura’s message to Mary?",

        options: [
            "Why do you hate concerts?",
            "Where is the event?",
            "Do you know a nice cafe nearby?",
            "Are you busy tonight?"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 5
    // =====================================================

    {
        id: "u1_f_test5_q5",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q5.png",

        options: [
            "Yes, of course.",
            "It sounds great, I can’t wait.",
            "Yeah, good idea.",
            "It sounds awesome, but I don’t like meat."
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 6
    // =====================================================

    {
        id: "u1_f_test5_q7",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q7.png",

        question:
            "Which of the following is CORRECT?",

        options: [
            "Bruce refuses the invitation.",
            "The event is fishing.",
            "Jason accepts the invitation.",
            "Bruce won’t go fishing."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 7
    // =====================================================

    {
        id: "u1_f_test5_q8",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q8.png",

        question:
            "Put the following dialogue into a correct order.",

        options: [
            "IV - III - II - I",
            "I - II - III - IV",
            "II - IV - I - III",
            "II - III - I - IV"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 8
    // =====================================================

    {
        id: "u1_f_test5_q9",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q9.png",

         question:
            "What do you say to invite?",

        options: [
            "Shall we go to the cinema?",
            "What do you like watching?",
            "How about watching a documentary on TV?",
            "Would you like to join me for another cup of coffee?"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 9
    // =====================================================

    {
        id: "u1_f_test5_q10",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q10.png",

        question:
            "Michael’s parents bought Lexie because - - - - .",

        options: [
            "they had money",
            "it was a gift for their son’s birthday",
            "Michael’s father had birthday",
            "they hate pets"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 10
    // =====================================================

    {
        id: "u1_f_test5_q11",
        unit: "Friendship",
        test: "Unit 1 Test 5",
        difficulty: "medium",

        image: "images/test5/q11.png",

        question:
            "What did Lexie teach Michael?",

        options: [
            "The basic commands.",
            "To go to the bathroom.",
            "To be bored.",
            "To be responsible."
        ],

        answer: 3,
    }

];


const questions = unit1FriendshipTest5;

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
    onclick="location.href='../unit1-questions.html'"
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


        testName: "Friendship Test 5",
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