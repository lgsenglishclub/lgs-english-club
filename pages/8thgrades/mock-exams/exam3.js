import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the comments about Jason.<br><br><b>Helen:</b> He always keeps his promises.<br><b>Tom:</b> I can always count on him.<br><b>Lucy:</b> He never listens to my ideas.<br><b>Kevin:</b> We enjoy spending time together.<br><br>Who says something negative about Jason?",
    image: "",
    options: [
        "A) Helen",
        "B) Tom",
        "C) Lucy",
        "D) Kevin"
    ],
    answer: "C"
},

{
    question: "Read the information below.<br><br>Anna wants to join a course. She enjoys drawing pictures and designing posters.<br><br>Which course is the BEST for Anna?",
    image: "",
    options: [
        "A) Art Club",
        "B) Basketball Team",
        "C) Chess Club",
        "D) Music Band"
    ],
    answer: "A"
},

{
    question: "Read the recipe.<br><br>1. Peel the potatoes.<br>2. Slice them carefully.<br>3. Fry them in hot oil.<br>4. Add some salt.<br><br>Which action comes FIRST?",
    image: "",
    options: [
        "A) Fry the potatoes.",
        "B) Slice them.",
        "C) Peel the potatoes.",
        "D) Add salt."
    ],
    answer: "C"
},

{
    question: "Read the dialogue.<br><br><b>Mary:</b> Would you like to come to my birthday party on Saturday?<br><b>Kate:</b> I'd love to, but I'll visit my grandparents that day.<br><br>What does Kate do?",
    image: "",
    options: [
        "A) She accepts the invitation.",
        "B) She refuses the invitation.",
        "C) She changes the date.",
        "D) She invites Mary."
    ],
    answer: "B"
},

{
    question: "Look at the chart below.<br><br><b>Favourite School Subjects</b><br><br>Maths: 35%<br>English: 30%<br>Science: 20%<br>Music: 15%<br><br>Which sentence is CORRECT?",
    image: "",
    options: [
        "A) Music is more popular than Maths.",
        "B) Science is the most popular subject.",
        "C) English is more popular than Science.",
        "D) Maths is less popular than English."
    ],
    answer: "C"
},

{
    question: "Read the information about Professor David White.<br><br>He graduated from Cambridge University. He invented a new water purification system and received an international science award in 2021.<br><br>Which question CANNOT be answered according to the text?",
    image: "",
    options: [
        "A) Where did he study?",
        "B) What did he invent?",
        "C) What award did he receive?",
        "D) How many children does he have?"
    ],
    answer: "D"
},

{
    question: "Read the messages below.<br><br><b>Emily:</b> I usually use the Internet to watch documentaries.<br><b>Jack:</b> I search for information for my homework.<br><b>Linda:</b> I always share my passwords with my friends.<br><b>Tom:</b> I watch educational videos online.<br><br>Who has an unsafe habit on the Internet?",
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
    question: "Read the science club announcement.<br><br><b>Science Project Competition</b><br>📅 18 May<br>📍 School Laboratory<br>🕘 09:30<br><br>Students should prepare an original science project.<br><br>What is the purpose of this announcement?",
    image: "",
    options: [
        "A) To invite students to a science competition",
        "B) To explain laboratory rules",
        "C) To sell science books",
        "D) To announce exam results"
    ],
    answer: "A"
},

{
    question: "Read the phone conversation.<br><br><b>Lisa:</b> Hello. May I speak to Mr. Wilson?<br><b>Secretary:</b> I'm afraid he's out of the office at the moment.<br><b>Lisa:</b> Could you ask him to call me back, please?<br><br>What does Lisa want?",
    image: "",
    options: [
        "A) To leave a message",
        "B) To make an appointment",
        "C) To buy a new phone",
        "D) To cancel a meeting"
    ],
    answer: "A"
},

{
    question: "Read the text below.<br><br>Kevin enjoys spending time in nature. Every weekend, he goes camping with his family. They usually walk in the forest, cook outdoors and sleep in a tent. Kevin says these trips help him relax and learn new skills.<br><br>Which of the following is TRUE according to the text?",
    image: "",
    options: [
        "A) Kevin dislikes outdoor activities.",
        "B) Kevin usually travels alone.",
        "C) Kevin learns different things during camping trips.",
        "D) Kevin only goes camping in summer."
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