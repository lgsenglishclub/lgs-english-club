import { saveToFirebase } from "../../../js/saveResult.js";
import { db } from "../../../firebase-config.js";

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

const questions = [

{
question:"What is the Turkish meaning of 'Go camping'?",
answers:["Kampa gitmek","Balık tutmak","Bisiklete binmek","Yüzmek"],
correct:0
},

{
question:"What is the Turkish meaning of 'Do puzzles'?",
answers:["Fotoğraf çekmek","Bulmaca çözmek","Alışveriş yapmak","Koşmak"],
correct:1
},

{
question:"What is the Turkish meaning of 'Ride a bike'?",
answers:["Kitap okumak","Yürüyüş yapmak","Bisiklete binmek","Müzik dinlemek"],
correct:2
},

{
question:"What is the Turkish meaning of 'Go hiking'?",
answers:["Doğa yürüyüşüne çıkmak","Yüzmeye gitmek","Kamp yapmak","Paten kaymak"],
correct:0
},

{
question:"What is the Turkish meaning of 'Watch movies'?",
answers:["Kitap okumak","Film izlemek","Televizyon izlemek","Resim çizmek"],
correct:1
},

{
question:"What is the Turkish meaning of 'Listen to music'?",
answers:["Şarkı söylemek","Müzik dinlemek","Dans etmek","Piyano çalmak"],
correct:1
},

{
question:"What is the Turkish meaning of 'Take photos'?",
answers:["Fotoğraf çekmek","Resim yapmak","Video çekmek","Paylaşım yapmak"],
correct:0
},

{
question:"What is the Turkish meaning of 'Play chess'?",
answers:["Futbol oynamak","Satranç oynamak","Basketbol oynamak","Bilgisayar oyunu oynamak"],
correct:1
},

{
question:"What is the Turkish meaning of 'Meet friends'?",
answers:["Arkadaş edinmek","Arkadaşlarla buluşmak","Arkadaş aramak","Arkadaşlara yardım etmek"],
correct:1
},

{
question:"What is the Turkish meaning of 'Have a picnic'?",
answers:["Piknik yapmak","Kampa gitmek","Yürüyüş yapmak","Balık tutmak"],
correct:0
},

{
question:"What is the Turkish meaning of 'Have breakfast'?",
answers:["Kahvaltı yapmak","Öğle yemeği yemek","Akşam yemeği yemek","Diş fırçalamak"],
correct:0
},

{
question:"What is the Turkish meaning of 'Brush teeth'?",
answers:["Yüzünü yıkamak","Diş fırçalamak","Saçını taramak","Duş almak"],
correct:1
},

{
question:"What is the Turkish meaning of 'Get dressed'?",
answers:["Uyanmak","Giyinmek","Okula gitmek","Ellerini yıkamak"],
correct:1
},

{
question:"What is the Turkish meaning of 'Go to bed'?",
answers:["Uyanmak","Yatağa gitmek","Evden çıkmak","Ders çalışmak"],
correct:1
},

{
question:"Which word means 'Çadır'?",
answers:["Compass","Backpack","Tent","Flashlight"],
correct:2
},

{
question:"Which word means 'Pusula'?",
answers:["Map","Compass","Rope","Sleeping bag"],
correct:1
},

{
question:"Which word means 'Uyku tulumu'?",
answers:["Sleeping bag","Water bottle","First aid kit","Tent"],
correct:0
},

{
question:"Which word means 'El feneri'?",
answers:["Compass","Backpack","Flashlight","Map"],
correct:2
},

{
question:"Which word means 'İlk yardım çantası'?",
answers:["Water bottle","First aid kit","Sleeping bag","Rope"],
correct:1
},

{
question:"Which word means 'Pocketknife'?",
answers:["Map","Tent","Cep çakısı","Compass"],
correct:2
},

{
question:"Which word means 'Bilim kurgu'?",
answers:["Adventure","Science fiction","Biography","Poetry"],
correct:1
},

{
question:"Which word means 'Çizgi roman'?",
answers:["Fairy tale","Mystery","Fantasy","Comic book"],
correct:3
},

{
question:"Which word means 'Macera'?",
answers:["Horror","Biography","Adventure","Poetry"],
correct:2
},

{
question:"Which word means 'Komedi'?",
answers:["Comedy","Action","Documentary","Animation"],
correct:0
},

{
question:"Which word means 'Belgesel'?",
answers:["Thriller","Documentary","Romance","Fantasy"],
correct:1
}

];

let currentQuestion = 0;
let score = 0;


function loadQuestion(){

let q = questions[currentQuestion];


document.getElementById("quiz").innerHTML = `

<div class="question-card">

<p class="question-number">
Question ${currentQuestion+1} / ${questions.length}
</p>


<h3>
${q.question}
</h3>


${q.answers.map((answer,index)=>

`
<button onclick="checkAnswer(${index},this)">
${answer}
</button>

`

).join("")}


</div>

`;

}



function checkAnswer(answer,button){


let buttons =
document.querySelectorAll(".question-card button");


buttons.forEach(btn=>btn.disabled=true);



if(answer === questions[currentQuestion].correct){

button.classList.add("correct");

score++;

console.log("Score:", score);

}

else{

button.classList.add("wrong");

buttons[
questions[currentQuestion].correct
].classList.add("correct");

}



setTimeout(async ()=>{


currentQuestion++;


if(currentQuestion < questions.length){

loadQuestion();

}

else{

 await saveTestResult();

document.getElementById("quiz").innerHTML=

`

<div class="result-box">

<h2>
🎉 Test Completed
</h2>

<h3>
Your Score: ${score} / ${questions.length}
</h3>

</div>

`;

}


},1200);


}

async function saveTestResult(){

    const history = JSON.parse(sessionStorage.getItem("recentTests")) || [];

    const wrong = questions.length - score;

    const result = {

    userId: sessionStorage.getItem("userId"),

    username: sessionStorage.getItem("username"),

    email: sessionStorage.getItem("email"),


        testName: "Unit 2 Vocabulary Questions",
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

window.checkAnswer = checkAnswer;
window.loadQuestion = loadQuestion;
window.saveTestResult = saveTestResult;

loadQuestion();