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

const unit1FriendshipTest4 = [

    // =====================================================
    // QUESTION 1
    // =====================================================

    {
        id: "u1_f_test4_q1",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q1.png",

        question:
            "Who refuses the offer by giving an excuse?",

        options: [
            "Fergie",
            "Meggie",
            "Liva",
            "Nina"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 2
    // =====================================================

    {
        id: "u1_f_test4_q2",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q2.png",

        options: [
            "What do you like doing with your friends",
            "Who is coming to the barbeque party at Bob’s place",
            "What would you like to have for dinner",
            "Would you like to join me for a pop concert"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 3
    // =====================================================

    {
        id: "u1_f_test4_q3",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q3.png",

        options: [
            "Yes, I am",
            "No, not at all",
            "I’d love to, but I can’t",
            "Sorry, but I am too busy"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 4
    // =====================================================

    {
        id: "u1_f_test4_q4",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q4.png",

        options: [
            "I will join you of course",
            "I must meet with my mother today",
            "that sounds great",
            "what are you going to buy"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 5
    // =====================================================

    {
        id: "u1_f_test4_q5",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q5.png",

        options: [
            "Shall we have a walk at the park?",
            "Let’s watch a movie on TV.",
            "What about cooking something in the kitchen?",
            "Would you like to rest in your room?"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 6
    // =====================================================

    {
        id: "u1_f_test4_q6",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q6.png",

        options: [
            "jealous",
            "stubborn",
            "aggressive",
            "supportive"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 7
    // =====================================================

    {
        id: "u1_f_test4_q7",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q7.png",

        question:
            "Which of the following is NOT correct according to the dialogue?",

        options: [
            "Gwen asks about the place of the party.",
            "Jack knows everything about the party.",
            "They will meet at Mike’s home first.",
            "Liam has an excuse for not attending."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 8
    // =====================================================

    {
        id: "u1_f_test4_q8",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q8.png",

        question:
            "They will give the party at - - - -.",

        options: [
            "the garage of Liam’s father",
            "Mike’s house",
            "Jack’s house",
            "a cafe"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 9
    // =====================================================

    {
        id: "u1_f_test4_q9",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q9.png",

        question:
            "Which of the following questions does NOT have an answer in the text?",

        options: [
            "Where are they going to have the party?",
            "What are they going to do at the party?",
            "Are there any food and beverages at the party?",
            "What time is the party?"
        ],

        answer: 2,
    },

        // =====================================================
    // QUESTION 10
    // =====================================================

    {
        id: "u1_f_test4_q10",
        unit: "Friendship",
        test: "Unit 1 Test 4",
        difficulty: "medium",

        image: "images/test4/q10.png",

        question:
            "Keeping in mind Carol’s interests, which of the following does NOT complete the conversation above?",

        options: [
            "Shall we go on a picnic?",
            "What about cycling together?",
            "How about watching a movie?",
            "Would you like to go to a concert?"
        ],

        answer: 2,
    }

];

const questions = unit1FriendshipTest4;

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


        testName: "Friendship Test 4",
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