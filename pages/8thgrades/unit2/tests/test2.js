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
    // QUESTION 1
    // Accepting / Refusing an invitation
    // =====================================================

    {
        id: "u1_f_test2_q1",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "medium",

        dialogue: [
            "Megan: Would you like to join us for the school picnic on Saturday?",
            "Oliver: I'd love to, but I have to help my grandfather in the garden.",
            "Megan: Oh, that's a pity. Maybe next time.",
            "Oliver: Sure. I hope you have a great time."
        ],

        question:
            "Which of the following completes Oliver's response?",

        options: [
            "That sounds great. I can't wait.",
            "I'd love to, but I have to help my grandfather.",
            "Sure. What time shall we meet?",
            "Yes, why not?"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 2
    // Making an inquiry
    // =====================================================

    {
        id: "u1_f_test2_q2",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "medium",

        dialogue: [
            "Jason: Hi, Emma. Are you free this afternoon?",
            "Emma: Yes. Why do you ask?",
            "Jason: I have two tickets for the new comedy show.",
            "Emma: Really? I'd love to come!"
        ],

        question:
            "Which of the following completes Jason's first question?",

        options: [
            "What do you usually do with your friends?",
            "Would you like to watch a comedy show?",
            "Are you free this afternoon?",
            "Where is the comedy show?"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 3
    // Friendship characteristics
    // =====================================================

    {
        id: "u1_f_test2_q3",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "medium",

        passage:
            "I think an ideal friend should always tell the truth and keep my secrets. " +
            "I also want my friend to support me when I have a problem.",

        question:
            "Which of the following is NOT related to the characteristics mentioned above?",

        options: [
            "Honest",
            "Supportive",
            "Reliable",
            "Adventurous"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 4
    // Invitation / activity
    // =====================================================

    {
        id: "u1_f_test2_q4",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "medium",

        dialogue: [
            "Liam: I'm bored. I don't want to stay at home this afternoon.",
            "Nora: Why don't we do something outside?",
            "Liam: That's a good idea!"
        ],

        question:
            "Which of the following completes Nora's suggestion?",

        options: [
            "How about going cycling in the park?",
            "Would you like to stay at home?",
            "Why don't you watch TV alone?",
            "Do you want to read a book in your room?"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 5
    // Invitation card
    // =====================================================

    {
        id: "u1_f_test2_q5",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q5.png",

        question:
            "According to the invitation card, which of the following is CORRECT?",

        options: [
            "The event will take place on a weekday evening.",
            "Students have to pay for the food separately.",
            "The event will be held at the school garden.",
            "Students should contact the school principal for details."
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 6
    // Dialogue — NOT CORRECT
    // =====================================================

    {
        id: "u1_f_test2_q6",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "hard",

        dialogue: [
            "Mia: We are organizing a surprise party for Lucy on Friday. Would you like to join us?",
            "Ben: I'd love to. What time should I come?",
            "Mia: At 6 p.m. We'll meet at my house first.",
            "Sally: Sorry, I can't come because I have basketball training.",
            "Mia: That's okay. We'll tell Lucy about your best wishes."
        ],

        question:
            "Which of the following is NOT correct according to the dialogue?",

        options: [
            "Ben accepts the invitation.",
            "Sally has an excuse for refusing the invitation.",
            "They will meet at Mia's house first.",
            "Lucy knows about the surprise party."
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 7
    // Dialogue ordering
    // =====================================================

    {
    id: "u1_f_test2_q7",
    unit: "Friendship",
    test: "Mini Deneme 2",
    difficulty: "hard",

    dialogue: [
        "Mia: Would you like to join us for a picnic on Sunday?",
        "Jack: That sounds great. I'd love to come.",
        "Mia: Sure. What time shall we meet?",
        "Jack: At 11 a.m. We can meet in front of the school."
    ],

    question:
        "Put the sentences into the correct order to make a meaningful dialogue.",

    options: [
        "II - IV - I - III",
        "I - II - III - IV",
        "III - I - IV - II",
        "IV - II - I - III"
    ],

    answer: 1,
    },


    // =====================================================
    // QUESTION 8
    // Activity poster
    // =====================================================

    {
        id: "u1_f_test2_q8",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q8.png",

        question:
            "Which of the following does NOT have an answer in the poster?",

        options: [
            "What activities can students do?",
            "When is the event?",
            "Who can students contact for more information?",
            "How much does the activity cost?"
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 9
    // Reading
    // =====================================================

    {
        id: "u1_f_test2_q9",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "hard",

        passage:
            "My best friend is Daniel. We met when we were in primary school. " +
            "He is honest, helpful and funny. He always supports me when I have a problem, " +
            "and he never tells my secrets to other people. We enjoy spending time together. " +
            "At weekends, we usually ride our bikes or watch films at my house. " +
            "Although we have different interests sometimes, we always respect each other's choices.",

        question:
            "Which of the following is CORRECT according to the text?",

        options: [
            "Daniel and the writer met at secondary school.",
            "Daniel never helps the writer with his problems.",
            "They always have exactly the same interests.",
            "They respect each other's preferences."
        ],

        answer: 3,
    },


    // =====================================================
    // QUESTION 10
    // Reading / inference
    // =====================================================

    {
        id: "u1_f_test2_q10",
        unit: "Friendship",
        test: "Mini Deneme 2",
        difficulty: "hard",

        passage:
            "Lucy invited four friends to her birthday party. " +
            "Molly said, 'I'd love to come, but I have to visit my grandparents.' " +
            "Jack said, 'Sure! I can be there.' " +
            "Emma said, 'That sounds great, but I have a piano lesson at that time.' " +
            "Tom replied, 'Thanks for inviting me. I can't come because my family is going on a trip.'",

        question:
            "Who accepts Lucy's invitation?",

        options: [
            "Molly",
            "Jack",
            "Emma",
            "Tom"
        ],

        answer: 1,
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


        testName: "Teen Life Test 2",
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