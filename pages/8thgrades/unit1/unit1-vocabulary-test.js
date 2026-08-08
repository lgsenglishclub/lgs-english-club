import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
question:"Lisa always tells the truth. She never lies to her friends. Which adjective describes Lisa?",
answers:["Funny","Honest","Lazy","Selfish"],
correct:1
},

{
question:"A good friend always ______ you when you have problems.",
answers:["supports","argues","forgets","lies"],
correct:0
},

{
question:"Mary never tells other people's secrets. She is ______.",
answers:["Unreliable","Selfish","Reliable","Rude"],
correct:2
},

{
question:"Which one is NOT a characteristic of a true friend?",
answers:["Keeping secrets","Helping each other","Supporting friends","Telling lies"],
correct:3
},

{
question:"Linda always helps her friends. She is ______.",
answers:["Helpful","Rude","Lazy","Dishonest"],
correct:0
},

{
question:"A person who makes people laugh is ______.",
answers:["Lazy","Selfish","Funny","Unfriendly"],
correct:2
},

{
question:"A good friend should respect your ______.",
answers:["Problems","Feelings","Lies","Arguments"],
correct:1
},

{
question:"Tom never breaks promises. He is ______.",
answers:["Rude","Funny","Shy","Reliable"],
correct:3
},

{
question:"Friends who have similar interests ______.",
answers:["get on well","tell lies","argue always","ignore each other"],
correct:0
},

{
question:"Which adjective means 'arkadaş canlısı'?",
answers:["Honest","Friendly","Generous","Lazy"],
correct:1
},

{
question:"Sarah shares her things with others. She is ______.",
answers:["Selfish","Unhappy","Generous","Rude"],
correct:2
},

{
question:"A true friend always keeps your ______.",
answers:["Arguments","Problems","Mistakes","Secrets"],
correct:3
},

{
question:"Which one is a good friendship rule?",
answers:["Helping each other","Breaking promises","Telling lies","Ignoring friends"],
correct:0
},

{
question:"Jack enjoys meeting new people. He is ______.",
answers:["Lazy","Rude","Dishonest","Outgoing"],
correct:3
},

{
question:"A person who only thinks about himself is ______.",
answers:["Helpful","Selfish","Friendly","Reliable"],
correct:1
},

{
question:"Good friends usually ______ each other.",
answers:["Forget","Support","Avoid","Hurt"],
correct:1
},

{
question:"Which sentence is TRUE?",
answers:[
"A true friend tells lies.",
"A true friend never helps.",
"A true friend keeps secrets.",
"A true friend argues."
],
correct:2
},

{
question:"Emma always tells the truth and helps others. She is ______.",
answers:[
"Lazy and rude",
"Selfish",
"Honest and helpful",
"Unfriendly"
],
correct:2
},

{
question:"Friends should talk and share their ______.",
answers:[
"Lies",
"Feelings",
"Anger",
"Problems"
],
correct:1
},

{
question:"Which phrase means 'iyi geçinmek'?",
answers:[
"tell the truth",
"keep secrets",
"share interests",
"get on well with"
],
correct:3
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


        testName: "Unit 1 Vocabulary Questions",
        correct: score,
        wrong: wrong,
        net: (score - wrong/3).toFixed(2),
        percent: Math.round(score/questions.length*100),
        date: new Date().toLocaleDateString("en-GB"),
        challenge: sessionStorage.getItem("activeChallenge") || null
    };

    await saveToFirebase(result);

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