import { saveToFirebase } from "../../../js/saveResult.js";
import { db } from "../../../firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc,
    increment,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ============================
// 🎮 TEST XP SYSTEM
// ============================

async function addTestXP(percent) {

    console.log("🎮 addTestXP BAŞLADI:", percent);

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


        // ============================
        // ⭐ XP EKLE
        // ============================

        await updateDoc(userRef, {

            xp: increment(totalXP)

        });


        // ============================
        // 📈 XP HISTORY
        // ============================

        await addDoc(
            collection(
                db,
                "users",
                userId,
                "xpHistory"
            ),
            {

                amount: totalXP,

                reason: "Test Completed",

                icon: "📝",

                date: serverTimestamp()

            }
        );


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

        console.log(
            `📈 XP History: +${totalXP} Test Completed`
        );


    } catch (error) {

        console.error(
            "❌ XP eklenirken hata:",
            error
        );

    }

}

const questions = [

{
image:"images/exam13/1.png",

question:"Read the e-mail. Which of the following would be the BEST reply to Jack?",

options:[
"Sure! I would be happy to join you. What time does the match start?",
"Sorry, I don't like watching football, so you should go alone.",
"That's a great idea, but I have already bought the tickets.",
"Thanks, but I prefer playing tennis with my brother."
],

answer:0
},

{
image:"images/exam13/2.png",

question:"Five students are choosing a club for the school festival. The club must include an activity that is suitable for students who enjoy BOTH being outdoors and working in groups. Which club meets these requirements?",

options:[
"The Photography Club – taking pictures alone in the classroom",
"The Drama Club – performing a play together on the school stage",
"The Chess Club – playing board games indoors",
"The Reading Club – reading books silently in the library"
],

answer:1
},

{
image:"images/exam13/3.png",

question:"A recipe has four steps, but one step is missing. Which sentence completes the recipe correctly?",

options:[
"Finally, serve the pancakes with fruit and honey.",
"Then, pour the mixture into a hot pan and cook both sides.",
"First, wash the vegetables and cut them into small pieces.",
"After that, put the pancakes in the refrigerator for an hour."
],

answer:1
},

{
image:"images/exam13/4.png",

question:"You are calling the school to ask about a science project. The person who can answer your question is not available. Which question is the MOST appropriate to ask the receptionist?",

options:[
"Why isn't the teacher in the office?",
"Can you tell me when the teacher will be available?",
"Could you do my science project for me?",
"Can you explain why the project is difficult?"
],

answer:1
},

{
image:"images/exam13/5.png",

question:"Read the online comments about Internet use. Which person has a different opinion from the others?",

options:[
"Emma: I use the Internet to find information for my homework.",
"Leo: I often watch tutorials when I don't understand a topic.",
"Sara: I think the Internet is useful when I need to learn something.",
"Tom: I mainly use the Internet to play games with my friends."
],

answer:3
},

{
image:"images/exam13/6.png",

question:"A group of students is preparing for a mountain-bike trip. They have the equipment shown in the picture. Which item is NOT suitable for the activity?",

options:[
"A helmet",
"A water bottle",
"A pair of cycling gloves",
"Formal leather shoes"
],

answer:3
},

{
image:"images/exam13/7.png",

question:"A tourist has only three hours before leaving the city. She wants to buy a handmade gift, see a historical place and eat a traditional dish. Which plan should she choose?",

options:[
"Visit the museum → have lunch at a traditional restaurant → buy a handmade gift",
"Go to the beach → visit the shopping mall → eat at a fast-food restaurant",
"Visit the sports centre → go to the cinema → buy clothes",
"Go to the business centre → visit a café → return to the hotel"
],

answer:0
},

{
image:"images/exam13/8.png",

question:"The family members have different free times during the week. Which chore would be the MOST suitable for Alex, who is away from home every evening but is free on Saturday mornings?",

options:[
"Walking the dog every evening",
"Setting the table before dinner every day",
"Cleaning the garden on Saturday morning",
"Doing the laundry every night"
],

answer:2
},

{
image:"images/exam13/9.png",

question:"Read the text.\n\nWhen Elif started secondary school, she noticed that many students threw away half-used notebooks at the end of each term. She talked to her science teacher and designed a notebook with removable pages. Students could take out the used pages and replace them with new ones instead of buying a completely new notebook. After testing the idea with her classmates, Elif changed the cover to make it stronger. The school later started using the notebooks in several classes.\n\nWhat makes Elif's invention different from an ordinary notebook?",

options:[
"It allows students to reuse the same notebook by replacing used pages.",
"It helps students finish their homework more quickly.",
"It is designed mainly to make notebooks more colourful.",
"It prevents students from writing too much in their notebooks."
],

answer:0
},

{
image:"images/exam13/10.png",

question:"Read the text.\n\nMina and Zoe became friends even though they have very different interests. Mina loves trying new activities and often makes plans at the last minute. Zoe prefers making detailed plans and feels more comfortable when she knows what will happen. At first, this difference caused some problems. Later, they learned to meet halfway. Mina started telling Zoe about her plans earlier, while Zoe became more open to spontaneous activities. Now they say their differences actually help them understand each other better.\n\nWhat helped Mina and Zoe maintain their friendship?",

options:[
"They stopped doing activities together.",
"They decided to have exactly the same interests.",
"They learned to respect and adapt to each other's differences.",
"They avoided talking about their different personalities."
],

answer:2
}

];


let questionStatus = [];

let currentQuestion = 0;

let score = 0;

let timeLeft = 900;

let timer;

let answered = false;

let correct = 0;

let wrong = 0;

function showQuestion(){

    answered = false;

    document.getElementById("result").innerHTML = "";

    document.getElementById("nextButton").disabled = true;

    let q = questions[currentQuestion];

    questionStatus[currentQuestion] = "current";

    updateStatus();

    document.getElementById("questionNumber").innerHTML =
    "Question " + (currentQuestion + 1) + " / " + questions.length;

    let progress =
    ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";


     // SORU METNİ

  const questionText =
    document.getElementById("questionText");

questionText.textContent =
    q.question || "";

    // RESİM VARSA GÖSTER
    if(q.image && q.image !== ""){

        document.getElementById("questionImage").style.display = "block";
        document.getElementById("questionImage").src = q.image;

    }else{

        document.getElementById("questionImage").style.display = "none";

    }
  

    // RESİM VARSA GÖSTER
    if(q.image && q.image !== ""){

        document.getElementById("questionImage").style.display = "block";
        document.getElementById("questionImage").src = q.image;

    }else{

        document.getElementById("questionImage").style.display = "none";

    }


    // ŞIKLAR
    document.getElementById("options").innerHTML = `

<button onclick="checkAnswer(0, this)">
A) ${q.options[0]}
</button>

<button onclick="checkAnswer(1, this)">
B) ${q.options[1]}
</button>

<button onclick="checkAnswer(2, this)">
C) ${q.options[2]}
</button>

<button onclick="checkAnswer(3, this)">
D) ${q.options[3]}
</button>

`;

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= questions.length){

        showResult();
        return;

    }

    showQuestion();

}

window.onload = function(){

    for(let i = 0; i < questions.length; i++){

    questionStatus.push("empty");

}

    currentQuestion = 0;

};

function checkAnswer(selected, button){

    if(answered) return;

    answered = true;

    let q = questions[currentQuestion];

    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn=>btn.disabled=true);

    if(selected === q.answer){

        button.classList.add("correct");

        score++;
        correct++;

        questionStatus[currentQuestion]="correct";

    }else{

        button.classList.add("wrong");

        buttons[q.answer].classList.add("correct");

        wrong++;

        questionStatus[currentQuestion]="wrong";

    }

    updateStatus();

    document.getElementById("nextButton").disabled=false;

}

function startTimer(){

    timer = setInterval(function(){

        timeLeft--;


        let minutes = Math.floor(timeLeft / 60);
let seconds = timeLeft % 60;

document.getElementById("timer").innerHTML =
"⏱️ Süre: " + 
minutes + ":" + 
(seconds < 10 ? "0" : "") + seconds;



        if(timeLeft <= 0){


            clearInterval(timer);


            showResult();


        }


    },1000);

}


async function showResult(){

    clearInterval(timer);


    let total = questions.length;

    let empty = total - (correct + wrong);

    let success = Math.round((correct / total) * 100);


    await saveTestResult();

    document.getElementById("questionBox").innerHTML = `

<div class="result-card">

<h2>🎉 Tebrikler!</h2>

<h3>Mock Exam 13</h3>

<div class="result-score">
${(score - wrong/3).toFixed(2)}
</div>


<p><strong>📊 Net</strong></p>

<hr>

<p>✅ Doğru: <b>${correct}</b></p>

<p>❌ Yanlış: <b>${wrong}</b></p>

<p>📊 Başarı: <b>%${success}</b></p>

<p>⏱ Süre Tamamlandı</p>

<button class="restart-btn"
onclick="location.reload()">

🔄 Tekrar Çöz

</button>

<button class="menu-btn"
onclick="window.location.href='unit1-questions.html'"

🏠 Testler Sayfasına Dön

</button>

</div>

`;

}

function updateStatus(){

    let html = "";

    questionStatus.forEach((status,index)=>{


        let className = "status-item";


        if(status=="current"){

            className += " status-current";

        }


        if(status=="correct"){

            className += " status-correct";

        }


        if(status=="wrong"){

            className += " status-wrong";

        }


        html += `

        <div class="${className}">
        ${index+1}
        </div>

        `;


    });


    document.getElementById("questionStatus").innerHTML = html;

}

function startTest(){

    document.getElementById("startScreen").style.display="none";

    document.getElementById("questionBox").style.display="block";


    currentQuestion = 0;

    showQuestion();
    startTimer();

}

async function saveTestResult(){

    const history = JSON.parse(sessionStorage.getItem("recentTests")) || [];

    const wrong = questions.length - score;

    const result = {

    userId: sessionStorage.getItem("userId"),

    username: sessionStorage.getItem("username"),

    email: sessionStorage.getItem("email"),


        testName: "Exam 13",
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
    // 🎯 DAILY CHALLENGE COMPLETION
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
    
            const today =
                new Date().toISOString().split("T")[0];
    
            const userId =
                sessionStorage.getItem("userId");
    
            if (userId) {
    
                const userRef =
                    doc(db, "users", userId);
    
                const userSnap =
                    await getDoc(userRef);
    
                const userData =
                    userSnap.exists()
                        ? userSnap.data()
                        : {};
    
                const alreadyCompleted =
                    userData.dailyChallengeCompletedDate === today;
    
                // Bugün daha önce tamamlanmadıysa
                if (!alreadyCompleted) {
    
                    // XP + tamamlanma tarihi
                    await updateDoc(userRef, {
    
                        xp: increment(reward),
    
                        dailyChallengeCompletedDate:
                            today
    
                    });
    
                    // XP History
                    await addDoc(
                        collection(
                            db,
                            "users",
                            userId,
                            "xpHistory"
                        ),
                        {
    
                            amount: reward,
    
                            reason:
                                "Daily Challenge",
    
                            icon: "🎯",
    
                            date:
                                serverTimestamp()
    
                        }
                    );
    
                    console.log(
                        "🎯 DAILY CHALLENGE COMPLETED!"
                    );
    
                    console.log(
                        `🏆 +${reward} XP`
                    );
    
                } else {
    
                    console.log(
                        "ℹ️ Daily Challenge bugün zaten tamamlandı."
                    );
    
                }
    
            }
    
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

window.startTest = startTest;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;