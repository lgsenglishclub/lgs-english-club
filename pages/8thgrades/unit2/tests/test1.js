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


const unit2TeenLifeTest1 = [

    {
        id: "u2_tl_test1_q1",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q1.png",

        question:
            "Look at the research results. Which of the following is CORRECT according to the information?",

        options: [
            "Korean teens are more interested in sports than English teens are.",
            "Korean teens spend less time studying than English teens do.",
            "English teens' favourite activity is going online.",
            "English teens prefer artistic activities."
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test1_q2",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q2.png",

        question:
            "Professor Barclay asked teenagers questions about their daily routines and habits. Which of the following CANNOT be one of the questions in his questionnaire?",

        options: [
            "What do you do at weekends?",
            "Why do you like going to the movies?",
            "What is your favourite free time activity?",
            "Which activities do you do on the Internet?"
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test1_q3",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q3.png",

        question:
            "The chart shows how Julia and Tony spend their free time. Which of the following is NOT correct according to the information?",

        options: [
            "Both Tony and Julia like physical exercise.",
            "They spend the same amount of time helping with housework.",
            "Julia spends more time with her friends than Tony does.",
            "Tony enjoys spending time online most."
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test1_q4",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q4.png",

        question:
            "Helena and Tracy want to attend a course together. According to their interests, which of the following is appropriate for both of them?",

        options: [
            "Hunt the biggest",
            "Improve musical skills",
            "Learners in the kitchen",
            "Art of camera"
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test1_q5",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "easy",

        image: "images/test1/q5.png",

        question:
            "Four people commented on a rock concert. Whose comment was disappointing for the singer?",

        options: [
            "Sam",
            "John",
            "Jane",
            "Mary"
        ],

        answer: 0,
    },

    {
        id: "u2_tl_test1_q6",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "easy",

        image: "images/test1/q6.png",

        question:
            "The pie chart shows the favorite free time activities of 100 teenagers. Which of the following is CORRECT according to the information?",

        options: [
            "Watching movies is the most favourite activity of the teens.",
            "Doing exercise is very popular among the teens.",
            "The teens usually spend their time on the Net.",
            "The teenagers never listen to music."
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test1_q7",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q7.png",

        question:
            "Brian and Jenny want to do something different this weekend. According to their interests, which of the following is an appropriate place for them to go?",

        options: [
            "Art exhibition",
            "Book fair",
            "Amusement park",
            "Cinema"
        ],

        answer: 0,
    },

    {
        id: "u2_tl_test1_q8",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q8.png",

        question:
            "According to the information, who is NOT planning an activity for the weekend?",

        options: [
            "Mary and Alice",
            "Mary and Tom",
            "David and Tom",
            "David and Alice"
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test1_q9",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q9.png",

        question:
            "Which of the following does NOT have an answer in the text?",

        options: [
            "What kind of games does Frank like playing?",
            "What time does he get up on Tuesdays?",
            "What does he do before breakfast?",
            "Where does he play basketball?"
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test1_q10",
        unit: "Teen Life",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q10.png",

        question:
            "According to the information, which of the following is NOT an appropriate reply to Simon's invitation?",

        options: [
            "Hi, buddy. That's a good idea. I can join you after my football training.",
            "Simon, the activity sounds a bit boring, but I will be there after our family breakfast.",
            "Hello, Simon. That's really awesome but I will go to the cinema with my sister.",
            "Hey, that's cool but in the afternoon I will go and listen to my favourite band."
        ],

        answer: 3,
    }

];

const questions = unit2TeenLifeTest1;

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


        testName: "Teen Life Test 1",
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