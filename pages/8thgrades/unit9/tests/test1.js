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
        difficulty: "medium",

        image: "images/test1/q1.png",

        question:
            "According to the information above, which of the following is TRUE?",

        options: [
            "Students can only take part in individual activities.",
            "The activities give students opportunities to spend time together.",
            "Students should bring their school books to the event.",
            "The event is organized for students who do not like meeting others."
        ],

        answer: 1,

    },


    // =====================================================
    // QUESTION 2 — DIALOGUE
    // =====================================================

    {
        id: "u1_f_test1_q2",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        dialogue: [
            "Jason: Hi, Kevin. Are you free on Saturday afternoon?",
            "Kevin: I think so. Why?",
            "Jason: I'm having a small birthday party at my house. Would you like to come?",
            "Kevin: I'd love to, but ______________________.",
            "Jason: That's a pity. Maybe you can come to my next party."
        ],

        question:
            "Which of the following completes the dialogue?",

        options: [
            "I have already made plans for that day.",
            "I really enjoy birthday parties.",
            "I want to invite you to the cinema.",
            "I always spend my weekends with my friends."
        ],

        answer: 0,

    },


    // =====================================================
    // QUESTION 3 — INFORMATION MATCHING
    // =====================================================

    {
        id: "u1_f_test1_q3",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        passage:
            "Mia always tells the truth and never shares her friends' secrets. Tom enjoys making people laugh and loves outdoor activities. Lucy likes helping her friends and sharing what she has with them. Jack is quiet and prefers spending his free time at home.",

        question:
            "The Friendship Club wants a student who can make new members feel happy during outdoor activities. Who is the most suitable student?",

        options: [
            "Mia",
            "Tom",
            "Lucy",
            "Jack"
        ],

        answer: 1,

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
            "Emma is free only on Saturday afternoon. She doesn't enjoy indoor activities and wants to join an activity with fewer than ten students. Which activity should she choose?",

        options: [
            "Cycling",
            "Bowling",
            "Hiking",
            "Movie Night"
        ],

        answer: 0,

    },


    // =====================================================
    // QUESTION 5 — DIALOGUE
    // =====================================================

    {
        id: "u1_f_test1_q5",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        dialogue: [
            "Sophie: Hi, Emily. Are you free this Sunday?",
            "Emily: Yes. Why?",
            "Sophie: I'm organizing a picnic with some of our classmates. Would you like to join us?",
            "Emily: Sure. I'd love to. Should I bring anything?",
            "Sophie: Yes. We are going to share our food, so please bring something to eat.",
            "Emily: No problem. What time are we meeting?",
            "Sophie: At 11 a.m. near the school gate."
        ],

        question:
            "Which of the following is NOT mentioned in the dialogue?",

        options: [
            "The activity they are going to do",
            "The meeting time",
            "The meeting place",
            "The number of students joining the activity"
        ],

        answer: 3,

    },


    // =====================================================
    // QUESTION 6 — BIRTHDAY INVITATION
    // =====================================================

    {
        id: "u1_f_test1_q6",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q6.png",

        post: {
            title: "YOU ARE INVITED!",
            date: "Sunday, May 10",
            time: "2:00 - 5:00 p.m.",
            place: "Green Café",

            activities: [
                "Playing games",
                "Listening to music",
                "Having birthday cake"
            ],

            note:
                "Please call Emma by Friday if you can come."
        },

        comments: [
            "Anna: I'd love to come, Emma. I'll call you tomorrow.",
            "Ben: Thanks for inviting me. Unfortunately, I can't come because I have to visit my grandparents.",
            "Lisa: Great! I'll be there on Sunday afternoon.",
            "Tom: I'd love to join you, but I have an important exam on Monday."
        ],

        question:
            "Who cannot be at Emma's party according to the information?",

        options: [
            "Anna",
            "Ben",
            "Lisa",
            "Tom"
        ],

        answer: 1,

    },


    // =====================================================
    // QUESTION 7 — INFORMATION MATCHING
    // =====================================================

    {
        id: "u1_f_test1_q7",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        passage:
            "Sarah enjoys spending time outdoors, but she doesn't like crowded places. She prefers doing activities with a few close friends. David loves meeting lots of people and enjoys listening to music. Lisa doesn't like outdoor activities and prefers watching movies. Jack enjoys team sports and doesn't mind crowded places.",

        question:
            "Which activity is suitable for Sarah?",

        options: [
            "A small picnic in the forest",
            "A music festival",
            "A movie night at school",
            "A basketball tournament"
        ],

        answer: 0,

    },


    // =====================================================
    // QUESTION 8 — FRIENDSHIP CLUB WEEKEND
    // =====================================================

    {
        id: "u1_f_test1_q8",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "medium",

        image: "images/test1/q8.png",

        post: {
            title: "Friendship Club Weekend",
            date: "Saturday",
            time: "9:30 a.m. - 1:00 p.m.",
            place: "School Garden and Nearby Park",

            activities: [
                "Having breakfast together",
                "Cycling",
                "Playing outdoor games",
                "Having lunch together"
            ],

            note:
                "Students will return to school after lunch."
        },

        comments: [
            "Mia: I love cycling, so I'm going to join that activity.",
            "Tom: I prefer team activities, so I'll play outdoor games.",
            "Lisa: I hurt my leg recently. I'll stay in the park and take photos."
        ],

        question:
            "Which of the following is TRUE according to the information?",

        options: [
            "Lisa will join the cycling activity.",
            "Tom prefers cycling to team activities.",
            "The students will have breakfast before their activities.",
            "The students will go home before having lunch."
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
            "A Special Friendship\n\nLily and Kate met when they started secondary school. At first, they didn't talk much because they had different interests. Lily enjoyed reading books and spending quiet afternoons at home, while Kate loved outdoor activities and meeting new people.\n\nOne day, their teacher asked them to work together on a school project. They discovered that they both enjoyed taking photos and listening to music. While working on the project, they started spending more time together. They also learned that they could help each other in different ways. Lily was good at organizing their work, and Kate was good at communicating with other students.\n\nToday, they are close friends. They still have different interests, but they respect each other's preferences.",

        question:
            "Which of the following can we understand from the text?",

        options: [
            "Lily and Kate became friends because they had exactly the same interests.",
            "Lily helped Kate communicate with other students.",
            "Working together helped Lily and Kate discover things they both enjoyed.",
            "Kate didn't want to work with Lily at the beginning of the project."
        ],

        answer: 2,

    },


    // =====================================================
    // QUESTION 10 — READING / INFERENCE
    // =====================================================

    {
        id: "u1_f_test1_q10",
        unit: "Friendship",
        test: "Mini Deneme 1",
        difficulty: "hard",

        passage:
            "Friendship Club Weekend\n\nOur school Friendship Club is organizing a special weekend for its members. The students will meet at the school gate at 9:30 on Saturday morning. First, they will walk to the nearby park and have breakfast together. After breakfast, they will choose one of two activities: cycling or playing outdoor games.\n\nMia wants to go cycling because she loves riding a bike. Tom prefers outdoor games because he enjoys team activities. Lisa, however, doesn't want to join either activity. She has recently hurt her leg, so she plans to sit in the park, talk to her friends and take some photos.\n\nAt 1:00 p.m., all the students will have lunch together. After lunch, they will return to school. The club president says the aim of the event is not to win competitions but to spend enjoyable time together and strengthen friendships.",

        question:
            "Which of the following is NOT correct according to the text?",

        options: [
            "The students will have breakfast before their activities.",
            "Lisa will take part in one of the two activities.",
            "Mia prefers cycling to playing outdoor games.",
            "The students will have lunch together after their activities."
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

                ${q.dialogue.map(line => `
                    <p>${line}</p>
                `).join("")}

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