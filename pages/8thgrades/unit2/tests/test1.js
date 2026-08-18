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
    // QUESTION 1 — INVITATION CARD
    // Skill: Multiple-condition reasoning
    // =====================================================

    {
        id: "u1_f_test1_q1",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q1.png",

        question:
            "Look at the invitation card. Which of the following students can attend the whole event?",

        options: [
            "A student who has to leave at 3 p.m.",
            "A student who dislikes outdoor activities.",
            "A student who can stay from 1 p.m. to 5 p.m. and enjoys team games.",
            "A student who cannot come to the park."
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 2 — TEXT MESSAGES
    // Skill: Inference
    // =====================================================

    {
        id: "u1_f_test1_q2",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        dialogue: [
            "Mia: Are you coming to the Friendship Club meeting after school?",
            "Leo: I wanted to, but I have to finish a project with my partner.",
            "Mia: Can't you finish it before the meeting?",
            "Leo: We have already planned to meet at the library at four.",
            "Mia: I see. Maybe you can join us next time.",
            "Leo: Yes. Please tell me what you decide about the weekend activity."
        ],

        question:
            "Which of the following can we understand from the conversation?",

        options: [
            "Leo doesn't want to join the Friendship Club anymore.",
            "Leo has another responsibility at the same time as the meeting.",
            "Leo has already joined the weekend activity.",
            "Mia refuses to help Leo with his project."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 3 — PREFERENCE TABLE
    // Skill: Comparing information
    // =====================================================

    {
        id: "u1_f_test1_q3",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q3.png",

        question:
            "According to the table, which activity would be suitable for ALL the students who want to spend time together?",

        options: [
            "A crowded music festival",
            "A quiet movie night at home",
            "A small picnic in the park",
            "An indoor basketball tournament"
        ],

        answer: 2,
    },


    // =====================================================
    // QUESTION 4 — ACTIVITY POSTER
    // Skill: Evaluating conditions
    // =====================================================

    {
        id: "u1_f_test1_q4",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q4.png",

        question:
            "A group of friends wants to join an activity that is free, outdoors and suitable for a small group. Which activity meets ALL of their requirements?",

        options: [
            "Movie Club",
            "Park Picnic",
            "Bowling Night",
            "School Concert"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 5 — E-MAIL
    // Skill: Understanding purpose
    // =====================================================

    {
        id: "u1_f_test1_q5",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "Hi Emma,\n\n" +
            "I'm having a small birthday party at my house this Saturday. " +
            "I'm inviting only a few close friends because I don't really like crowded parties. " +
            "We're going to watch a movie, play some board games and have pizza together. " +
            "I hope you can come!\n\n" +
            "See you,\n" +
            "Sophie",

        question:
            "Why does Sophie mention that she is inviting only a few friends?",

        options: [
            "She doesn't know many students at school.",
            "She prefers spending time with a small group.",
            "She wants to save money on food.",
            "She doesn't want to celebrate her birthday."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 6 — WEEKEND SCHEDULE
    // Skill: Matching information
    // =====================================================

    {
        id: "u1_f_test1_q6",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q6.png",

        question:
            "Tom is free on Saturday afternoon. He wants to do an outdoor activity with his friends, but he doesn't want to spend any money. Which activity can he join?",

        options: [
            "Watching a movie",
            "Playing basketball in the park",
            "Going bowling",
            "Joining the school concert"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 7 — DIALOGUE
    // Skill: Communication function
    // =====================================================

    {
        id: "u1_f_test1_q7",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        dialogue: [
            "Sarah: Would you like to come to the cinema with us tonight?",
            "Jack: Thanks, but I can't.",
            "Sarah: Is everything okay?",
            "Jack: Yes. My little brother isn't feeling well, so I need to stay at home with him.",
            "Sarah: I understand. I hope he feels better soon.",
            "Jack: Thanks. Have fun!"
        ],

        question:
            "What is the main reason for Jack's refusal?",

        options: [
            "He doesn't like watching films.",
            "He has to take care of a family member.",
            "He has already watched the film.",
            "He wants to spend the evening with his friends."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 8 — FRIENDSHIP CLUB NOTICE
    // Skill: Choosing according to several conditions
    // =====================================================

    {
        id: "u1_f_test1_q8",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q8.png",

        question:
            "A student wants to join an activity where they can meet new people, work in a group and spend time outdoors. Which activity is the best choice?",

        options: [
            "Reading Circle",
            "Outdoor Team Challenge",
            "Movie Afternoon",
            "Board Game Club"
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 9 — READING
    // Skill: Inference
    // =====================================================

    {
        id: "u1_f_test1_q9",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "When Maya and Olivia first met, they didn't have many common interests. " +
            "Maya enjoyed reading and drawing, while Olivia loved outdoor activities and meeting new people. " +
            "Their teacher asked them to prepare a project together. " +
            "During the project, Maya helped Olivia organize their ideas, and Olivia encouraged Maya to present them in front of the class. " +
            "They discovered that they both enjoyed taking photos. " +
            "After the project, they started spending more time together. " +
            "Although they still have different interests, they respect each other's choices and support each other.",

        question:
            "Which of the following can be inferred from the text?",

        options: [
            "Maya and Olivia became friends because they had exactly the same hobbies.",
            "Working together helped Maya and Olivia discover something they both enjoyed.",
            "Olivia stopped meeting new people after becoming friends with Maya.",
            "Maya refused to help Olivia during the project."
        ],

        answer: 1,
    },


    // =====================================================
    // QUESTION 10 — EVENT NOTICE
    // Skill: Detailed interpretation
    // =====================================================

    {
        id: "u1_f_test1_q10",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        image: "images/test1/q10.png",

        question:
            "Which of the following is NOT suitable for a student who wants to follow ALL the rules of the event?",

        options: [
            "Joining the outdoor activity with a friend",
            "Bringing food from home",
            "Arriving before the event starts",
            "Bringing more than the allowed number of friends"
        ],

        answer: 3,
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