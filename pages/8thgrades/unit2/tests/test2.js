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

const unit2TeenLifeTest2 = [

    {
        id: "u2_tl_test2_q11",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q11.png",

        question:
            "According to his plans, Tim - - - -.",

        options: [
            "spends time only with his mum",
            "listens to music only once a week",
            "studies two different languages",
            "does art at the weekend"
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test2_q12",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "easy",

        image: "images/test2/q12.png",

        question:
            "Look at the poster. The poster does NOT have any information about the - - - - of the tournament.",

        options: [
            "date",
            "place",
            "reward",
            "time"
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test2_q13",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q13.png",

        question:
            "Which of the following is NOT one of the books Gloria discusses?",

        options: [
            "The Challenging Life of a Woman",
            "A Trip out of the World",
            "Tasty Recipes",
            "Dangerous Animals"
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test2_q14",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q14.png",

        question:
            "Which of the following are the most appropriate activities for Janet and Sam?",

        options: [
            "Janet: playing volleyball and joining a guitar course / Sam: going to the shopping mall and doing basketball training",
            "Janet: watching a play and going to a concert / Sam: going to the theatre and joining a drawing course",
            "Janet: swimming and playing the piano / Sam: watching a play and visiting an art exhibition",
            "Janet: listening to music and going to the theatre / Sam: cycling and going shopping"
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test2_q15",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "medium",

        image: "images/test2/q15.png",

        question:
            "A survey shows the music preferences of 100 boys and 100 girls. Which of the following is CORRECT according to the information?",

        options: [
            "Girls listen to jazz and folk music more than boys do.",
            "More than half of the girls prefer listening to pop music.",
            "Rap music is the most popular kind of music for both groups.",
            "Both boys and girls like classical music at the same rate."
        ],

        answer: 1,
    },

    {
        id: "u2_tl_test2_q16",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "easy",

        image: "images/test2/q16.png",

        question:
            "The table shows what Dean and his friends prefer doing at weekends. Which of the following is CORRECT?",

        options: [
            "Sarah and Hannah enjoy attending parties.",
            "Sam and Dean love watching films.",
            "Dean and Sarah are interested in music.",
            "Hannah and Sam like spending time at home."
        ],

        answer: 2,
    },

    {
        id: "u2_tl_test2_q17",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q17.png",

        question:
            "Success High School teachers prepare a form to find out their students' interests. According to the information, which of the following is NOT correct?",

        options: [
            "Students can try extreme sports on Tuesday.",
            "There will be environmental activities on Thursday.",
            "Activities on Saturday are related to science.",
            "Students can take part in cultural activities on Sunday."
        ],

        answer: 0,
    },

    {
        id: "u2_tl_test2_q18",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q18.png",

        question:
            "John's notes show which classmates have certain interests. According to the information, which of the following is CORRECT?",

        options: [
            "Four people enjoy doing outdoor activities.",
            "Both Patricia and Larry like listening to music.",
            "Carl and Alan never get on well with their friends.",
            "Only one person prefers vegetables to hamburgers."
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test2_q19",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q19.png",

        question:
            "According to the chart, which of the following completes the conversation correctly?",

        options: [
            "for breakfast",
            "to have dinner after 7 pm",
            "at about twelve o'clock",
            "between 1 and 3 pm"
        ],

        answer: 3,
    },

    {
        id: "u2_tl_test2_q20",
        unit: "Teen Life",
        test: "Mini Deneme 2",
        difficulty: "hard",

        image: "images/test2/q20.png",

        question:
            "Which student's interests do NOT match any of the camps on the brochure?",

        options: [
            "Kimberly",
            "Matthew",
            "Laura",
            "Vincent"
        ],

        answer: 3,
    }

];


const questions = unit2TeenLifeTest2;

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