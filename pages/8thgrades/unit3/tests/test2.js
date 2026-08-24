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

const unit3InTheKitchenTest2 = [

   {
        id: "u3_k_test2_q11",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q11.png",

        question:
            "According to the information above, which of the following is the most appropriate menu for Tom?",

        options: [
            "Potato Soup - Meatball - Ice Cream",
            "Parsley Soup - Grilled Chicken - Cake",
            "Lentil Soup - Fish - Pudding",
            "Tomato Soup - Steak - Hot Cocoa Rolls"
        ],

        answer: 3,
    },

    {
        id: "u3_k_test2_q12",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "easy",

        image: "images/test2/q12.png",

        question:
            "According to the text, which of the following is CORRECT?",

        options: [
            "Making vegetable soup takes less than an hour.",
            "Adding some milk to the soup makes it tastier.",
            "There is sugar and honey in the soup.",
            "We don't need any onions for the soup."
        ],

        answer: 0,
    },

    {
        id: "u3_k_test2_q13",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "easy",

        image: "images/test2/q13.png",

        question:
            "Which of the following has an answer in the text?",

        options: [
            "Why are they having a party?",
            "When is the party going to be?",
            "Who is preparing the drinks?",
            "Which desserts is Mike making?"
        ],

        answer: 1,
    },

    {
        id: "u3_k_test2_q14",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q14.png",

        question:
            "According to the information above, which of the following should they choose?",

        options: [
            "Course 1",
            "Course 2",
            "Course 3",
            "Course 4"
        ],

        answer: 2,
    },

    {
        id: "u3_k_test2_q15",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q15.png",

        question:
            "According to the information above, which of the following is their order?",

        options: [
            "Tomato soup, chicken, fish, pudding, chocolate cake, fruit juice",
            "Chicken soup, hamburger, pasta, pudding, baked bananas, lemonade",
            "Tomato soup, chicken, steak, ice cream, baked bananas, tea",
            "Lentil soup, meatballs, fish, ice cream, chocolate cake, coffee"
        ],

        answer: 2,
    },

    {
        id: "u3_k_test2_q16",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q16.png",

        question:
            "Which of the following should the restaurant prepare according to the information above?",

        options: [
            "Spicy carrot soup - Steak - Green salad",
            "Tomato soup - Grilled chicken - Brownie",
            "Potato soup - Pasta with tomato sauce - Carrot balls",
            "Chicken soup - Meatballs - Apple pie"
        ],

        answer: 1,
    },

    {
        id: "u3_k_test2_q17",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q17.png",

        question:
            "Which of the following completes the conversation above?",

        options: [
            "Monday and Tuesday",
            "Tuesday and Thursday",
            "Wednesday and Friday",
            "Thursday and Friday"
        ],

        answer: 2,
    },

    {
        id: "u3_k_test2_q18",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q18.png",

        question:
            "According to the information above, which of the following restaurants should Alice choose?",

        options: [
            "Star Restaurant",
            "New Restaurant",
            "Moon Restaurant",
            "Sun Restaurant"
        ],

        answer: 3,
    },

    {
        id: "u3_k_test2_q19",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q19.png",

        question:
            "Which question does NOT Jack ask Carlos?",

        options: [
            "How often do you eat Japanese food?",
            "Why do Japanese people like Sushi?",
            "Who cooks well in your family?",
            "What is your favorite food?"
        ],

        answer: 1,
    },

    {
        id: "u3_k_test2_q20",
        unit: "In The Kitchen",
        test: "Mini Deneme 2",
        difficulty: "easy",

        image: "images/test2/q20.png",

        question:
            "Who does NOT follow one of the suggestions offered by World Health Organization?",

        options: [
            "Oliver",
            "Emily",
            "Daniel",
            "Isabella"
        ],

        answer: 3,
    }

];


const questions = unit3InTheKitchenTest2;

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
    onclick="location.href='../unit3-questions.html'"
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


        testName: "In the Kitchen Test 2",
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