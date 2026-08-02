import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the comments below.<br><br><b>Emily:</b> Alex always keeps my secrets.<br><b>Jack:</b> He never tells lies.<br><b>Linda:</b> He usually changes his mind at the last minute.<br><b>Tom:</b> We have similar interests.<br><br>Who has a negative opinion about Alex?",
    image: "",
    options: [
        "A) Emily",
        "B) Jack",
        "C) Linda",
        "D) Tom"
    ],
    answer: "C"
},

{
    question: "Look at the information below.<br><br><b>SUMMER COURSES</b><br><br>🎨 Art Course: Painting & Drawing<br>💻 Coding Course: Programming Basics<br>🎸 Music Course: Guitar & Piano<br>⚽ Sports Course: Football & Basketball<br><br>Emma enjoys designing pictures and being creative. Which course should she choose?",
    image: "",
    options: [
        "A) Coding Course",
        "B) Art Course",
        "C) Sports Course",
        "D) Music Course"
    ],
    answer: "B"
},

{
    question: "Read the dialogue.<br><br><b>Lisa:</b> Would you like to join us for a picnic this Sunday?<br><b>Helen:</b> That sounds great, but I'll visit my grandparents.<br><br>Helen ______.",
    image: "",
    options: [
        "A) accepts the invitation",
        "B) refuses the invitation politely",
        "C) changes the date",
        "D) invites Lisa"
    ],
    answer: "B"
},

{
    question: "Look at the chart below.<br><br><b>Favourite Free-time Activities</b><br><br>Watching Films: 40%<br>Playing Sports: 30%<br>Reading Books: 20%<br>Cooking: 10%<br><br>Which sentence is CORRECT?",
    image: "",
    options: [
        "A) Reading books is more popular than sports.",
        "B) Cooking is the most popular activity.",
        "C) Watching films has the highest percentage.",
        "D) Sports is less popular than cooking."
    ],
    answer: "C"
},

{
    question: "Read the recipe below.<br><br>1. Wash the apples.<br>2. Peel them.<br>3. Slice them.<br>4. Bake for 25 minutes.<br><br>Which step comes BEFORE baking?",
    image: "",
    options: [
        "A) Wash the apples.",
        "B) Peel them.",
        "C) Slice them.",
        "D) Add sugar."
    ],
    answer: "C"
},

{
    question: "Read the phone conversation.<br><br><b>Secretary:</b> Good afternoon. City Hospital. How may I help you?<br><b>Mrs. Green:</b> I'd like to make an appointment with Dr. Wilson for Friday.<br><b>Secretary:</b> Certainly. He is available at 2 p.m.<br><br>Why is Mrs. Green calling?",
    image: "",
    options: [
        "A) To cancel an appointment",
        "B) To make an appointment",
        "C) To visit a patient",
        "D) To ask for directions"
    ],
    answer: "B"
},

{
    question: "Read the information below.<br><br>James Carter is a famous inventor. After graduating from MIT, he designed a robot that helps firefighters during rescue operations. Today, he works on different technology projects.<br><br>Which question CANNOT be answered according to the text?",
    image: "",
    options: [
        "A) Where did he graduate from?",
        "B) What did he invent?",
        "C) What does he do now?",
        "D) What is his favourite sport?"
    ],
    answer: "D"
},

{
    question: "Look at the map below.<br><br>📍 You are at the Bus Station.<br>• The Library is north of the Bus Station.<br>• The Museum is west of the Library.<br>• The Café is south of the Museum.<br><br>Where is the Museum?",
    image: "",
    options: [
        "A) East of the Library",
        "B) West of the Library",
        "C) North of the Bus Station",
        "D) South of the Café"
    ],
    answer: "B"
},

{
    question: "Look at the survey below.<br><br><b>Students' Favourite Digital Activities</b><br><br>Watching Videos: 38%<br>Playing Games: 32%<br>Reading Articles: 18%<br>Listening to Podcasts: 12%<br><br>Which of the following is TRUE?",
    image: "",
    options: [
        "A) Reading articles is more popular than playing games.",
        "B) Watching videos is the most popular activity.",
        "C) Podcasts are more popular than articles.",
        "D) Playing games is the least popular activity."
    ],
    answer: "B"
},

{
    question: "Read the text.<br><br>Jessica loves discovering new places. Whenever she travels, she visits museums, historical buildings and local markets. She believes travelling helps her understand different cultures and meet new people.<br><br>Which of the following is TRUE according to the text?",
    image: "",
    options: [
        "A) Jessica only likes relaxing at the beach.",
        "B) Jessica avoids meeting new people.",
        "C) Jessica enjoys learning about different cultures.",
        "D) Jessica never visits museums."
    ],
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