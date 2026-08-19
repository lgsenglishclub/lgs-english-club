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
    // QUESTION 1
    // Invitation - best option
    // =====================================================

    {
        id: "u1_f_test3_q1",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "medium",

        dialogue: [
            "Emma: I’m going to the new book fair with some friends on Saturday.",
            "Jack: That sounds interesting.",
            "Emma: - - - -?",
            "Jack: Sure. I enjoy looking at new books."
        ],

        question:
            "Which of the following completes Emma's question?",

        options: [
            "Would you like to join us",
            "What do you usually read",
            "Why don't you like books",
            "Are you at home now"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 2
    // Simple inquiry
    // =====================================================

    {
        id: "u1_f_test3_q2",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "medium",

        dialogue: [
            "Mia: I have two tickets for the school concert tonight.",
            "Leo: Really? - - - -?",
            "Mia: It starts at 7 p.m. at the school hall."
        ],

        question:
            "Which of the following completes Leo's question?",

        options: [
            "Who is your best friend",
            "What time does it start",
            "Why do you hate concerts",
            "What do you usually do at weekends"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 3
    // Refusing + reason
    // =====================================================

    {
        id: "u1_f_test3_q3",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "medium",

        dialogue: [
            "Daniel: How about joining us for a bike ride tomorrow morning?",
            "Sophie: I’d love to, but - - - -.",
            "Daniel: No problem. Maybe next weekend."
        ],

        question:
            "Which of the following completes Sophie's response?",

        options: [
            "I have to study for my exam",
            "that sounds great",
            "I’d be happy to come",
            "what time shall we meet"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 4
    // Friendship characteristics
    // =====================================================

    {
        id: "u1_f_test3_q4",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "medium",

        question:
            "In my opinion, an ideal friend should be - - - - because I can tell my secrets to him/her without worrying.",

        options: [
            "honest",
            "jealous",
            "selfish",
            "stubborn"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 5
    // Friendship event card
    // =====================================================

    {
        id: "u1_f_test3_q5",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q5.png",

        question:
            "According to the invitation card, which of the following is CORRECT?",

        options: [
            "The event will take place on a weekday morning.",
            "Students can learn more information by contacting Amy.",
            "The activity will be held at the city sports centre.",
            "Students have to bring food because there will be no snacks."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 6
    // Who refuses by giving an excuse?
    // =====================================================

    {
        id: "u1_f_test3_q6",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "hard",

        dialogue: [
            "Ryan: We are going to the amusement park on Sunday. Would you like to come?",
            "Molly: Yes, definitely. I love amusement parks.",
            "Chris: Thanks, but I have a swimming competition that day.",
            "Lucy: Great idea! What time are we meeting?",
            "Ben: I’d love to come. It sounds fun."
        ],

        question:
            "Who refuses the invitation by giving an excuse?",

        options: [
            "Molly",
            "Chris",
            "Lucy",
            "Ben"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 7
    // Table + conversation
    // =====================================================

    {
        id: "u1_f_test3_q7",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q7.png",

        question:
            "According to the information in the table, which activity can both students enjoy together?",

        options: [
            "Going shopping",
            "Playing basketball",
            "Taking photos",
            "Watching films"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 8
    // Dialogue - NOT CORRECT
    // =====================================================

    {
        id: "u1_f_test3_q8",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "hard",

        dialogue: [
            "Anna: I'm organizing a movie night at my house on Friday.",
            "Tom: That sounds great. I'd love to join you.",
            "Sarah: Sorry, I can't come because I have a doctor's appointment.",
            "Anna: That's okay. What about you, Jack?",
            "Jack: Sure. What time should I come?",
            "Anna: At 6 p.m. We can order some pizza together."
        ],

        question:
            "Which of the following is NOT correct according to the dialogue?",

        options: [
            "Tom accepts Anna's invitation.",
            "Sarah gives a reason for refusing the invitation.",
            "Jack asks for more information about the event.",
            "Anna is going to organize the event at a cafe."
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 9
    // Friendship characteristics + matching
    // =====================================================

    {
        id: "u1_f_test3_q9",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "hard",

        image: "images/test3/q9.png",

        question:
            "Which student has the characteristics that are mentioned in the text?",

        options: [
            "A student who never tells the truth but always makes jokes.",
            "A student who keeps secrets and supports friends when they need help.",
            "A student who dislikes spending time with other people.",
            "A student who gets angry when friends have different opinions."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 10
    // Reading
    // =====================================================

    {
        id: "u1_f_test3_q10",
        unit: "Friendship",
        test: "Mini Deneme 3",
        difficulty: "hard",

        passage:
            "Emma and Lily have been best friends for many years. " +
            "They usually spend their free time together, but they don't always have the same interests. " +
            "Emma loves outdoor activities, while Lily prefers watching films and reading books. " +
            "However, they respect each other's choices. " +
            "When Emma has a problem, Lily always listens to her and tries to help. " +
            "Emma does the same for Lily.",

        question:
            "Which of the following is NOT correct according to the text?",

        options: [
            "Emma and Lily have been friends for a long time.",
            "They have exactly the same hobbies.",
            "Lily supports Emma when she has a problem.",
            "They respect each other's preferences."
        ],

        answer: 1,
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


            <div class="question-type">

                ${q.skill || q.type || ""}

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


            <div
                class="explanation"
                id="explanation"
            >
                ${q.explanation || ""}
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


        testName: "In the Kitchen Test 3",
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