import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
image:"images/exam1/1.png",

options:[
"Watching TV is the most preferred activity.",
"Reading books is more popular than doing sports.",
"Playing computer games is the most preferred activity.",
"Doing sports is less popular than reading books."
],

answer:2
},

{
image:"images/exam1/2.png",

options:[
"Watching TV is the least preferred activity.",
"Playing computer games is the most preferred activity.",
"Reading books is more popular than playing computer games.",
"Doing sports is more popular than reading books."
],

answer:1
},

{
image:"images/exam1/3.png",

options:[
"Going camping is the most popular activity.",
"Riding a bike is less popular than playing tennis.",
"Doing sport is more popular than going camping.",
"Playing tennis is the most preferred activity."
],

answer:0
},

{
image:"images/exam1/4.png",

options:[
"Skiing is the most preferred sport.",
"Ice-skating is more popular than diving.",
"Diving is the most preferred activity.",
"Bungee jumping is less popular than skiing."
],

answer:2
},

{
image:"images/exam1/5.png",

options:[
"Girls prefer camping more than boys.",
"Boys enjoy playing tennis more than girls.",
"Boys' favourite activity is going camping.",
"Girls like riding a bike the most."
],

answer:2
},

{
image:"images/exam1/6.png",

options:[
"Adults go camping more than teenagers.",
"Teenagers watch TV more than adults.",
"Teenagers and adults read books at the same rate.",
"Adults go to the cinema less than teenagers."
],

answer:2
},

{
image:"images/exam1/7.png",

options:[
"Internet usage was highest in 2024.",
"Internet usage decreased every year.",
"The lowest internet usage was in 2023.",
"Internet usage in 2026 was higher than in 2024."
],

answer:0
},

{
image:"images/exam1/8.png",

options:[
"Adults go camping more than teenagers.",
"Teenagers watch TV more than adults.",
"Teenagers and adults read books at the same rate.",
"Adults go to the cinema less than teenagers."
],

answer:2
},

{
image:"images/exam1/9.png",

options:[
"Adults go camping more than teenagers.",
"Teenagers watch TV more than adults.",
"Teenagers and adults read books at the same rate.",
"Adults go to the cinema less than teenagers."
],

answer:2
},

{
image:"images/exam1/10.png",

options:[
"Adults go camping more than teenagers.",
"Teenagers watch TV more than adults.",
"Teenagers and adults read books at the same rate.",
"Adults go to the cinema less than teenagers."
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

<h3>Mock Exam 16</h3>

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


    testName: "Mock Exam 16",
        correct: score,
        wrong: wrong,
        net: (score - wrong/3).toFixed(2),
        percent: Math.round(score/questions.length*100),
        date: new Date().toLocaleDateString("en-GB")

    };

    await saveToFirebase(result);
    
    history.unshift(result);

    if(history.length > 10){
        history.pop();
    }

    sessionStorage.setItem("recentTests", JSON.stringify(history));

}

window.startTest = startTest;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;