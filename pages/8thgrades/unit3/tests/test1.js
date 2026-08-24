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

const unit3InTheKitchenTest1 = [

    {
        id: "u3_k_test1_q1",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q1.png",

        question:
            "What is the step after mixing the ingredients?",

        options: [
            "Mix two eggs with a cup of sugar",
            "Pour the mixture into the cups",
            "Heat the oven at 200 0C",
            "Add some milk, flour, oil, and powder"
        ],

        answer: 1,
    },

    {
        id: "u3_k_test1_q2",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q2.png",

        question:
            "Which tool will NOT Charlotte use while baking the brownie?",

        options: [
            "Spatula",
            "Spoon",
            "Mixer",
            "Cake pan"
        ],

        answer: 0,
    },

    {
        id: "u3_k_test1_q3",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "easy",

        image: "images/test1/q3.png",

        question:
            "You will have a more delicious cake if you - - - -.",

        options: [
            "don't bake it in an oven you heated before",
            "break the eggs into the baking powder",
            "cut it into the slices after it cools",
            "don't use cold eggs"
        ],

        answer: 3,
    },

    {
        id: "u3_k_test1_q4",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q4.png",

        question:
            "Which numbers should they press on the machine to buy a cup that reflects both of their preferences?",

        options: [
            "3 - 7 - 8",
            "2 - 3 - 4",
            "1 - 5 - 7",
            "1 - 4 - 6"
        ],

        answer: 3,
    },

    {
        id: "u3_k_test1_q5",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q5.png",

        question:
            "Keeping in mind how much money and time Jane has, what should she choose?",

        options: [
            "Grilled meatballs",
            "Sandwich",
            "Chicken",
            "Pizza"
        ],

        answer: 1,
    },

    {
        id: "u3_k_test1_q6",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q6.png",

        question:
            "Which of the following cooking methods is suitable for all the family members?",

        options: [
            "roasting",
            "grilling",
            "boiling",
            "frying"
        ],

        answer: 2,
    },

    {
        id: "u3_k_test1_q7",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "easy",

        image: "images/test1/q7.png",

        question:
            "According to the recipe above, in which restaurant does Claire work as a chef?",

        options: [
            "SPAGHETTI HOUSE",
            "CITY OF FISH",
            "TACOS KITCHEN",
            "VEGETABLE WORLD"
        ],

        answer: 3,
    },

    {
        id: "u3_k_test1_q8",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q8.png",

        question:
            "Mary's favourite food is - - - -.",

        options: [
            "fish",
            "lentil soup",
            "potato chips",
            "sausages"
        ],

        answer: 1,
    },

    {
        id: "u3_k_test1_q9",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q9.png",

        question:
            "According to the information above, which of the following is NOT correct?",

        options: [
            "Mary ordered pasta as a main course.",
            "Tom chose salad and meatballs.",
            "Lisa ate a slice of strawberry cake.",
            "John had both grilled chicken and ice cream."
        ],

        answer: 1,
    },

    {
        id: "u3_k_test1_q10",
        unit: "In The Kitchen",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q10.png",
        
        question:
            "Which of the following does NOT complete the conversation?",

        options: [
            "Can you give me a recipe for lentil soup?",
            "How long does it take to cook?",
            "What are the preparation steps?",
            "What are the ingredients?"
        ],

        answer: 1,
    }

];

const questions = unit3InTheKitchenTest1;

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


        testName: "In the Kitchen Test 1",
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