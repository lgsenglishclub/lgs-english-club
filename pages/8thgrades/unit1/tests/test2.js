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

const unit1FriendshipTest2 = [

    // =====================================================
    // QUESTION 11
    // =====================================================

    {
        id: "u1_f_test1_q11",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "medium",

        image: "images/test2/q11.png",

        question:
            "Which of the following does NOT have an answer in the invitation?",

        options: [
            "Who is the party for?",
            "What time are they meeting?",
            "Where is the party going to be?",
            "How can they learn about the details of the event?"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 12
    // =====================================================

    {
        id: "u1_f_test1_q12",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "medium",

        image: "images/test2/q12.png",

        question:
            "According to the conversation above, which of the following is CORRECT?",

        options: [
            "Tina isn’t interested in playing chess.",
            "Sam has to attend a course, so he can’t join the tournament.",
            "Clark needs extra information about the event.",
            "Peter is available all day on Sunday."
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 13
    // =====================================================

    {
        id: "u1_f_test1_q13",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "hard",

        image: "images/test2/q13.png",

        question:
            "According to the information above, which of the following is an appropriate movie for Sarah and Tim?",

        options: [
            "Ridiculous Man",
            "Out of the World",
            "Impressive Life",
            "Last Two Hours"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 14
    // =====================================================

    {
        id: "u1_f_test1_q14",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "hard",

        image: "images/test2/q14.png",

        question:
            "Which of the following does NOT have an answer in the table above?",

        options: [
            "Which activity is at the weekend?",
            "When does Alice want to ride a bike?",
            "Who refuses the offer giving a reason?",
            "How many people accept the invitation?"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 15
    // =====================================================

    {
        id: "u1_f_test1_q15",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "medium",

        image: "images/test2/q15.png",

        question:
            "Which of the following does NOT have an answer in the poster?",

        options: [
            "Which equipment do we need?",
            "Which activities can we do?",
            "Where do we meet?",
            "How long is the camp?"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 16
    // =====================================================

    {
        id: "u1_f_test1_q16",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "hard",

        image: "images/test2/q16.png",

       question:
    "Alice’s best friend, Sally, invites her to an art exhibition on Sunday. Alice really wants to go, but she has to attend her mother’s birthday party on the same day.\n\nWhich of the following CANNOT be Alice’s message?",
        options: [
            "Thanks for the invitation. I’d love to but I can’t make it. I’m busy at the weekend. Have a great time!",
            "Thanks a lot! I cannot refuse your invitation because I love you and I love art. I will text you to learn the details in the evening.",
            "Hey Sally, I was so happy to receive your invitation. I always have fun at exhibitions, but on that day, I have to be at a birthday party.",
            "Dear Sally, that's very kind of you! I really want to come, but I am afraid I cannot. I must join another special event on that day."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 17
    // =====================================================

    {
        id: "u1_f_test1_q17",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "easy",

        image: "images/test2/q17.png",

        question:
            "Which of the following is CORRECT according to the poster above?",

        options: [
            "You have to bring your own food.",
            "For more information, you can call Dean.",
            "If you want to attend the event, you must pay $50.",
            "To join, you should be at Shine Café in the morning."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 18
    // =====================================================

    {
        id: "u1_f_test1_q18",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "hard",

        image: "images/test2/q18.png",

        question:
            "Which sentence(s) in the conversation does NOT match the personal characteristics in Table 1?",

        options: [
            "Only I",
            "I and IV",
            "II and III",
            "Only IV"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 19
    // =====================================================

    {
        id: "u1_f_test1_q19",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "medium",

        image: "images/test2/q19.png",

        question:
            "Which of the following is NOT correct according to the conversation above?",

        options: [
            "Gary is having a birthday party.",
            "Jenny is going to attend the event.",
            "Amy refuses the invitation without making an excuse.",
            "Joe will be with a guest on Sunday."
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 20
    // =====================================================

    {
        id: "u1_f_test1_q20",
        unit: "Friendship",
        test: "Unit 1 Test 2",
        difficulty: "medium",

        image: "images/test2/q20.png",

        question:
            "According to the conversation above, who likes the same type of movies?",

        options: [
            "Dean and Sam",
            "Dean and Charlie",
            "Sam and Lily",
            "Lily and Charlie"
        ],

        answer: 2,

    }

];


const questions = unit1FriendshipTest2;

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


        testName: "Friendship Test 2",
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