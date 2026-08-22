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

const unit1FriendshipTest3 = [

    // =====================================================
    // QUESTION 21
    // =====================================================

    {
        id: "u1_f_test1_q21",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q21.png",

        question:
            "According to the information above, who is Sabrina’s best friend?",

        options: [
            "Mary",
            "Rose",
            "Sally",
            "Jane"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 22
    // =====================================================

    {
        id: "u1_f_test1_q22",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "medium",

        image: "images/test3/q22.png",

        question:
            "Emma thinks that - - - -.",

        options: [
            "only one person supports her when she needs help",
            "Sophie and Claire are helpful and kind",
            "all of her friends are amusing",
            "Ann is both funny and honest"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 23
    // =====================================================

    {
        id: "u1_f_test1_q23",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "medium",

        image: "images/test3/q23.png",

        question:
            "According to the conversation above, which of the following is NOT one of the characteristics of Tim?",

        options: [
            "Amusing",
            "Helpful",
            "Honest",
            "Kind"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 24
    // =====================================================

    {
        id: "u1_f_test1_q24",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q24.png",

        question:
            "Whose notes should NOT be on the learning wall according to the information above?",

        options: [
            "Tom and Betty’s",
            "Sally and Mike’s",
            "Sophie and Sally’s",
            "Mike and Betty’s"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 25
    // =====================================================

    {
        id: "u1_f_test1_q25",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q25.png",

        question:
            "According to the information above, how can William respond to Jack’s invitation?",

        options: [
            "I’m sorry but I can’t come because I have basketball training.",
            "I’d really love to but we are having dinner with my grandparents.",
            "Thanks for the invitation but I have to finish my homework then.",
            "That would be great but I’m going to help my father."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 26
    // =====================================================

    {
        id: "u1_f_test1_q26",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q26.png",

        question:
            "Which of the following completes the conversation according to the information above?",

        options: [
            "Mark",
            "Steve",
            "Tom",
            "Nick"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 27
    // =====================================================

    {
        id: "u1_f_test1_q27",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q27.png",

        question:
            "According to the information above, who is the most appropriate person for the job?",

        options: [
            "Olivia",
            "Harry",
            "George",
            "Amelia"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 28
    // =====================================================

    {
        id: "u1_f_test1_q28",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "medium",

        image: "images/test3/q28.png",

        question:
            "According to the conversation above, how many tickets is Mr. Walker going to buy?",

        options: [
            "5",
            "4",
            "3",
            "2"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 29
    // =====================================================

    {
        id: "u1_f_test1_q29",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q29.png",

        question:
            "Which of the following statements is NOT correct according to the results above?",

        options: [
            "Telling the truth is the key to an ideal friendship.",
            "Helping other people is less popular than making jokes.",
            "Being nice to people is the most important characteristic of a friend.",
            "Sharing things with friends is one of the characteristics of a good friend."
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 30
    // =====================================================

    {
        id: "u1_f_test1_q30",
        unit: "Friendship",
        test: "Unit 1 Test 3",
        difficulty: "hard",

        image: "images/test3/q30.png",

        question:
            "Who refuses the invitation by giving an excuse?",

        options: [
            "Alexis, Sally, and Julia",
            "Julia, Sophia, and Rose",
            "Anna, Sophia, and Alexis",
            "Sally, Anna, and Rose"
        ],

        answer: 3,
    }
    
];


const questions = unit1FriendshipTest3;

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


        testName: "Friendship Test 3",
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