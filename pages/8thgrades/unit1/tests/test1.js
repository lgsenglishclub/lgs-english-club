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

const unit1FriendshipTest1 = [

    // =====================================================
    // QUESTION 1 — FRIENDSHIP DAY
    // =====================================================

    {
        id: "u1_f_test1_q1",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q1.png",

        question:
            "According to the information above, which of the following is TRUE?",

        options: [
            "Lily is honest but she doesn't enjoy spending time with her friends.",
            "Lily keeps her friends' secrets and enjoys watching films with them.",
            "Lily prefers outdoor activities to watching films.",
            "Lily often shares her friends' secrets with other students."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 2 — INVITATION
    // =====================================================

    {
        id: "u1_f_test1_q2",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        dialogue: [
            "Mia: Are you free tomorrow afternoon, Daniel?",
            "Daniel: Yes. Why?",
            "Mia: A few of us are going to the new sports centre. Would you like to join us?",
            "Daniel: I'd love to, but I promised my brother that I'd help him with his project.",
            "Mia: That's okay. Maybe you can come with us next weekend."
        ],

        question:
            "Why can't Daniel join Mia and her friends?",

        options: [
            "He doesn't enjoy spending time with his friends.",
            "He has promised to help a family member.",
            "He has already planned an activity with Mia.",
            "He doesn't like going to the sports centre."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 3 — FRIENDSHIP PREFERENCES
    // =====================================================

    {
        id: "u1_f_test1_q3",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "Alex loves trying exciting things with his friends. He doesn't like staying at home at weekends.\n\nBella prefers quiet activities. She usually reads books or watches films with a few close friends.\n\nChris enjoys meeting new people and doesn't mind crowded places.\n\nDaisy feels happier when she spends time with only a few close friends. She also loves being outdoors.",

        question:
            "Which activity is the most suitable for Daisy?",

        options: [
            "A large music festival",
            "A cinema event with fifty students",
            "A small picnic with three close friends",
            "A crowded adventure camp"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 4 — ACTIVITY SCHEDULE
    // =====================================================

    {
        id: "u1_f_test1_q4",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q4.png",

        question:
            "Emma has two hours free on Saturday morning. She doesn't want to pay for an activity and prefers spending time outdoors with a small group of friends. Which activity is the most suitable for her?",

        options: [
            "Cycling",
            "Hiking",
            "Bowling",
            "Movie Club"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 5 — INVITATION
    // =====================================================

    {
        id: "u1_f_test1_q5",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        dialogue: [
            "Ryan: Hi, Jack. Would you like to come to the basketball match with us tomorrow?",
            "Jack: Thanks for inviting me, but I can't.",
            "Ryan: Why not?",
            "Jack: I have to look after my little sister because my parents will be out.",
            "Ryan: I see. That's a pity. Maybe you can join us next time."
        ],

        question:
            "Which of the following is TRUE according to the conversation?",

        options: [
            "Jack refuses the invitation because he dislikes basketball.",
            "Jack has another plan with his friends.",
            "Jack cannot join because he has a family responsibility.",
            "Ryan doesn't want Jack to join the match."
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 6 — BIRTHDAY INVITATION
    // =====================================================

    {
        id: "u1_f_test1_q6",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q6.png",

        question:
            "Look at Emma's invitation and her friends' responses. Who is definitely going to attend the party?",

        options: [
            "Liam",
            "Sophie",
            "Noah",
            "Olivia"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 7 — FRIENDSHIP CLUB
    // =====================================================

    {
        id: "u1_f_test1_q7",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "Mia likes meeting new people and joining exciting activities.\n\nLeo is quite calm. He enjoys reading books and watching films with a few close friends.\n\nNora always helps her friends when they need her. They can tell her their secrets because she never shares them with others.\n\nSam loves making jokes and making people laugh. He also enjoys outdoor activities.",

        question:
            "The Friendship Club needs a student who can welcome new members and organize exciting weekend activities. Who is the most suitable student?",

        options: [
            "Mia",
            "Leo",
            "Nora",
            "Sam"
        ],

        answer: 0,
    },


    // =====================================================
    // QUESTION 8 — FRIENDSHIP DAY
    // =====================================================

    {
        id: "u1_f_test1_q8",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q8.png",

        question:
            "Look at the Friendship Day notice and the students' comments. Who can take part in the whole event without breaking any of the instructions?",

        options: [
            "Kate",
            "Ben",
            "Lucy",
            "Kate and Ben"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 9 — READING
    // =====================================================

    {
        id: "u1_f_test1_q9",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "Maya and Olivia met at the beginning of the school year. They were quite different at first. Maya enjoyed reading and preferred quiet weekends, while Olivia loved outdoor activities and meeting new people.\n\nTheir teacher asked them to prepare a presentation together. During the project, they discovered that they both enjoyed taking photos and listening to music. Maya was good at organizing their work, while Olivia was good at speaking in front of the class.\n\nAfter finishing the project, they started spending more time together. They still have different interests, but they respect each other's choices and help each other when necessary.",

        question:
            "Which of the following can be inferred from the text?",

        options: [
            "Maya and Olivia became friends because they had exactly the same personality.",
            "Their different interests prevented them from working successfully together.",
            "Working together helped Maya and Olivia discover common interests.",
            "Olivia did most of the work because Maya disliked the project."
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 10 — SAME READING
    // =====================================================

    {
        id: "u1_f_test1_q10",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "Maya and Olivia met at the beginning of the school year. They were quite different at first. Maya enjoyed reading and preferred quiet weekends, while Olivia loved outdoor activities and meeting new people.\n\nTheir teacher asked them to prepare a presentation together. During the project, they discovered that they both enjoyed taking photos and listening to music. Maya was good at organizing their work, while Olivia was good at speaking in front of the class.\n\nAfter finishing the project, they started spending more time together. They still have different interests, but they respect each other's choices and help each other when necessary.",

        question:
            "Which of the following is NOT mentioned in the text?",

        options: [
            "Maya's favourite type of weekend",
            "Olivia's personality",
            "The reason they started working together",
            "The activities they discovered they both enjoyed"
        ],

        answer: 1,
    }

];

const questions = unit1FriendshipTest1;

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


        testName: "Friendship Test 1",
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