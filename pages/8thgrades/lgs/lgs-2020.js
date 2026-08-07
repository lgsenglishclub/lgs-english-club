import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    image: "../images/lgs2018-2025/lgs2020/lgsq1.png",
    answer: "B"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq2.png",
    answer: "C"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq3.png",
    answer: "B"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq4.png",
    answer: "D"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq5.png",
    answer: "C"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq6.png",
    answer: "A"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq7.png",
    answer: "B"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq8.png",
    answer: "A"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq9.png",
    answer: "D"
},

{
    image: "../images/lgs2018-2025/lgs2020/lgsq10.png",
    answer: "C"
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
"Soru " + (currentQuestion + 1) + " / " + questions.length;

let progress =
((currentQuestion + 1) / questions.length) * 100;


document.getElementById("progressBar").style.width =
progress + "%";

    document.getElementById("questionImage").src = q.image;


    document.getElementById("options").innerHTML = `

<button onclick="checkAnswer('A', this)">
(A)
</button>

<button onclick="checkAnswer('B', this)">
(B)
</button>

<button onclick="checkAnswer('C', this)">
(C)
</button>

<button onclick="checkAnswer('D', this)">
(D)
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

    if(answered){
        return;
    }

    answered = true;

    let q = questions[currentQuestion];


    let buttons = document.querySelectorAll("#options button");


    buttons.forEach(btn => {

    btn.disabled = true;

    if(btn.innerText.startsWith(q.answer)){

        btn.classList.add("correct");

    }

});


    // Seçilen cevap kontrolü

    if(selected == q.answer){

    button.classList.add("correct");

    score++;

    correct++;

    document.getElementById("result").innerHTML =
    "✅ Doğru cevap!";

    questionStatus[currentQuestion] = "correct";

}

    else{

    wrong++;

    button.classList.add("wrong");


    document.getElementById("result").innerHTML =
    "❌ Yanlış cevap!";

    questionStatus[currentQuestion] = "wrong";
}

    document.getElementById("nextButton").disabled = false;

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


function showResult(){

    clearInterval(timer);


    let total = questions.length;

    let empty = total - (correct + wrong);

    let success = Math.round((correct / total) * 100);


    saveTestResult();

    document.getElementById("questionBox").innerHTML = `

<div class="result-card">

<h2>🎉 Tebrikler!</h2>

<h3>2020 LGS Exam</h3>

<div class="result-score">
${score.toFixed(2)}
</div>

<p><strong>⭐ Puan</strong></p>

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


    testName: "2020 LGS Exam",
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