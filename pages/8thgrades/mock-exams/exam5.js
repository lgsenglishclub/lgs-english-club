import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the comments below.<br><br><b>Anna:</b> Mike always supports me when I need help.<br><b>David:</b> I can trust him because he never tells lies.<br><b>Susan:</b> He often forgets our plans and arrives late.<br><b>Kevin:</b> We enjoy spending time together every weekend.<br><br>Who has a negative opinion about Mike?",
    image: "",
    options: [
        "A) Anna",
        "B) David",
        "C) Susan",
        "D) Kevin"
    ],
    answer: "C"
},

{
    question: "Read the advertisement below.<br><br><b>SUMMER LANGUAGE CAMP</b><br>✔ English Speaking Activities<br>✔ Sports Competitions<br>✔ Nature Walks<br>✔ Drama Workshops<br><br>Who would most probably enjoy this camp?",
    image: "",
    options: [
        "A) Someone who wants to improve English while having fun",
        "B) Someone who dislikes outdoor activities",
        "C) Someone looking for a mathematics course",
        "D) Someone who only wants private lessons"
    ],
    answer: "A"
},

{
    question: "Look at the chart below.<br><br><b>Students' Favourite School Clubs</b><br><br>Science Club: 35%<br>Music Club: 30%<br>Drama Club: 20%<br>Chess Club: 15%<br><br>Which sentence is CORRECT?",
    image: "",
    options: [
        "A) Drama Club is the most popular.",
        "B) Chess Club is more popular than Music Club.",
        "C) Science Club has the highest percentage.",
        "D) Music Club is the least popular."
    ],
    answer: "C"
},

{
    question: "Read the dialogue.<br><br><b>Lisa:</b> Would you like to join us for dinner tonight?<br><b>Emma:</b> I'd love to, but I have an important exam tomorrow.<br><br>Emma ______.",
    image: "",
    options: [
        "A) accepts the invitation",
        "B) refuses the invitation politely",
        "C) changes the meeting place",
        "D) invites Lisa instead"
    ],
    answer: "B"
},

{
    question: "Read the recipe.<br><br>1. Wash the strawberries.<br>2. Cut them into small pieces.<br>3. Put them into a bowl.<br>4. Add some sugar.<br>5. Mix well.<br><br>What should you do BEFORE adding sugar?",
    image: "",
    options: [
        "A) Mix everything well.",
        "B) Wash the strawberries.",
        "C) Put the strawberries into a bowl.",
        "D) Serve the dessert."
    ],
    answer: "C"
},

{
    question: "Read the phone conversation.<br><br><b>Secretary:</b> Good morning. Star Hotel. How may I help you?<br><b>Mr. Brown:</b> I'd like to reserve a room for two nights, please.<br><b>Secretary:</b> Certainly. May I have your name?<br><br>Why is Mr. Brown calling?",
    image: "",
    options: [
        "A) To make a reservation",
        "B) To cancel his holiday",
        "C) To complain about the hotel",
        "D) To ask for directions"
    ],
    answer: "A"
},

{
    question: "Read the information below.<br><br>Emily Johnson is an environmental engineer. She graduated from Boston University and developed a machine that cleans polluted rivers. Today, she gives talks at international environmental conferences.<br><br>Which question CANNOT be answered according to the text?",
    image: "",
    options: [
        "A) What is her job?",
        "B) Where did she graduate from?",
        "C) What did she invent?",
        "D) How many languages does she speak?"
    ],
    answer: "D"
},

{
    question: "Look at the map below.<br><br>📍 You are at the Library.<br>• The Museum is north of the Library.<br>• The Hospital is east of the Museum.<br>• The Park is south of the Hospital.<br><br>Where is the Hospital?",
    image: "",
    options: [
        "A) North of the Museum",
        "B) East of the Museum",
        "C) West of the Library",
        "D) South of the Park"
    ],
    answer: "B"
},

{
    question: "Look at the survey results below.<br><br><b>How do students usually go to school?</b><br><br>Bus: 45%<br>Walking: 30%<br>Bicycle: 15%<br>Car: 10%<br><br>Which of the following is TRUE?",
    image: "",
    options: [
        "A) Most students go to school by bicycle.",
        "B) Walking is less popular than travelling by car.",
        "C) The bus is the most preferred means of transportation.",
        "D) Travelling by car is more popular than walking."
    ],
    answer: "C"
},

{
    question: "Read the text.<br><br>Oliver enjoys visiting different cities during his holidays. He especially likes places with museums, castles and historical buildings. Last summer, he travelled to three different countries and learned about their cultures.<br><br>Which of the following is TRUE according to the text?",
    image: "",
    options: [
        "A) Oliver prefers beach holidays only.",
        "B) Oliver is interested in history and culture.",
        "C) Oliver never travels abroad.",
        "D) Oliver dislikes museums."
    ],
    answer: "B"
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
    document.getElementById("quiz").innerHTML = `
        <div class="question-text">
            ${q.question}
        </div>
    `;


    // RESİM VARSA GÖSTER
    if(q.image && q.image !== ""){

        document.getElementById("questionImage").style.display = "block";
        document.getElementById("questionImage").src = q.image;

    }else{

        document.getElementById("questionImage").style.display = "none";

    }


    // ŞIKLAR
    document.getElementById("options").innerHTML = `

<button onclick="checkAnswer('A', this)">
${q.options[0]}
</button>

<button onclick="checkAnswer('B', this)">
${q.options[1]}
</button>

<button onclick="checkAnswer('C', this)">
${q.options[2]}
</button>

<button onclick="checkAnswer('D', this)">
${q.options[3]}
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

    buttons.forEach(btn => {

        btn.disabled = true;

        if(btn.innerText.startsWith(q.answer)){
            btn.classList.add("correct");
        }

    });

    if(selected === q.answer){

        button.classList.add("correct");

        score++;
        correct++;

        document.getElementById("result").innerHTML =
        "✅ Correct Answer!";

        questionStatus[currentQuestion] = "correct";

    }else{

        wrong++;

        button.classList.add("wrong");

        document.getElementById("result").innerHTML =
        "❌ Wrong Answer!";

        questionStatus[currentQuestion] = "wrong";

    }

    updateStatus();

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


async function showResult(){

    clearInterval(timer);


    let total = questions.length;

    let empty = total - (correct + wrong);

    let success = Math.round((correct / total) * 100);


    await saveTestResult();

    document.getElementById("questionBox").innerHTML = `

<div class="result-card">

<h2>🎉 Tebrikler!</h2>

<h3>Mock Exam 1</h3>

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

    const history = JSON.parse(localStorage.getItem("recentTests")) || [];

    const wrong = questions.length - score;

    const result = {

    userId: localStorage.getItem("userId"),

    username: localStorage.getItem("username"),

    email: localStorage.getItem("email"),


    testName: "Mock Exam 1",
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

    localStorage.setItem("recentTests", JSON.stringify(history));

}

window.startTest = startTest;
window.checkAnswer = checkAnswer;
window.nextQuestion = nextQuestion;