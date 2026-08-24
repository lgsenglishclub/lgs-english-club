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

const unit2TeenLifeTest3 = [

    {
        id: "u2_tl_test3_q21",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "medium",

        image: "images/test3/q21.png",

        question:
            "Look at Alice's weekly plan. Which of the following does NOT have an answer in her weekly plan?",

        options: [
            "When is Alice going to be in the hospital?",
            "Where is Alice going to see her friends?",
            "Who is going to take Alice after training?",
            "What is Alice going to do on Thursday?"
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test3_q22",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q22.png",

        question:
            "Which of the following CANNOT be the list of activities for this weekend?",

        options: [
            "Saturday: Cleaning up the forest / Sunday: Camping",
            "Saturday: Climbing a mountain / Sunday: Riding a horse",
            "Saturday: Having a picnic / Sunday: Attending a concert",
            "Saturday: Cycling / Sunday: Trekking"
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test3_q23",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "medium",

        image: "images/test3/q23.png",

        question:
            "Which of the following is CORRECT according to the information above?",

        options: [
            "April would rather wear fashionable clothes.",
            "Gail thinks casual clothes are better than formal clothes.",
            "Jane prefers fashionable clothes to casual clothes.",
            "Nina says wearing trendy clothes is really important for her."
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test3_q24",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "easy",

        image: "images/test3/q24.png",

        question:
            "Choose the best option to fill in the blanks.",

        options: [
            "I don't think so.",
            "I am not sure about that.",
            "I am crazy about it too.",
            "I'm afraid I disagree."
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test3_q25",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q25.png",

        question:
            "Which of the following is NOT appropriate for the blanks in the conversation?",

        options: [
            "Do you have any plans for the weekend?",
            "When are we going to meet there?",
            "How often do you go skiing?",
            "Do you want to come with us?"
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test3_q26",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "medium",

        image: "images/test3/q26.png",

        question:
            "Look at the table. Tim never - - - -.",

        options: [
            "takes yoga classes",
            "listens to jazz music",
            "goes to swimming pool",
            "goes to shopping malls"
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test3_q27",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "medium",

        image: "images/test3/q27.png",

        question:
            "Look at the table. Roger - - - -.",

        options: [
            "always takes yoga classes",
            "often spends time at a shopping mall",
            "never takes yoga lessons",
            "seldom goes swimming in the pool"
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test3_q28",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "medium",

        image: "images/test3/q28.png",

        question:
            "Look at the table. Meg and Celine - - - -.",

        options: [
            "prefer swimming in the pool to spending time at a shopping mall",
            "sometimes listen to jazz music",
            "rarely take yoga lessons",
            "sometimes spend time at a shopping mall"
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test3_q29",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "easy",

        image: "images/test3/q29.png",

        question:
            "Which of the following is CORRECT according to the text?",

        options: [
            "He gets up at eight o'clock every day.",
            "Tom goes to school by bus because it is far away.",
            "He is a lazy student and never does his homework.",
            "Tom doesn't have his lunch at home."
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test3_q30",
        unit: "Teen Life",
        test: "Mini Deneme 3",
        difficulty: "easy",

        image: "images/test3/q30.png",

        question:
            "What does Tom usually do before doing his homework?",

        options: [
            "He takes a rest before he does his homework.",
            "He always hangs out after school.",
            "He reads some books before doing his homework.",
            "He helps his mother to prepare the dinner."
        ],

        answer: 0,
    }

];


const questions = unit2TeenLifeTest3;

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
    onclick="location.href='../unit2-questions.html'"
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


        testName: "Teen Life Test 3",
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