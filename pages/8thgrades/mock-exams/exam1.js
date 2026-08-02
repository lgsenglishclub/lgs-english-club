import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the comments about Emma.<br><br><b>Lisa:</b> She always keeps my secrets.<br><b>Kevin:</b> I can't rely on her because she often changes her mind.<br><b>Helen:</b> She is always there when I need help.<br><b>Jack:</b> We have lots of things in common.<br><br>Who says something negative about Emma?",
    image: "",
    options: [
        "A) Lisa",
        "B) Kevin",
        "C) Helen",
        "D) Jack"
    ],
    answer: "B"
},

{
    question: "You work at a customer service center. A customer calls because his washing machine doesn't work.<br><br>Which of the following should you say FIRST?",
    image: "",
    options: [
        "A) Please tell me what the problem is.",
        "B) Buy a new washing machine.",
        "C) I can't help you today.",
        "D) Call another company."
    ],
    answer: "A"
},

{
    question: "Read the school rules below.<br><br>• Don't eat in the classroom.<br>• Raise your hand before speaking.<br>• Arrive at school on time.<br>• Help your mother prepare dinner.<br><br>Which one is NOT a school rule?",
    image: "",
    options: [
        "A) Don't eat in the classroom.",
        "B) Raise your hand before speaking.",
        "C) Arrive at school on time.",
        "D) Help your mother prepare dinner."
    ],
    answer: "D"
},

{
    question: "Tom: This soup needs some salt.<br>Linda: These lemons are really ______.<br>Jane: I love cakes because they are ______.<br><br>Which word CANNOT complete any sentence?",
    image: "",
    options: [
        "A) sour",
        "B) sweet",
        "C) salty",
        "D) crowded"
    ],
    answer: "D"
},

{
    question: "Read the recipe below.<br><br>1. Wash the vegetables.<br>2. Chop the tomatoes and cucumbers.<br>3. Add olive oil and salt.<br>4. Mix everything well.<br>5. Serve the salad.<br><br>Which step should come BEFORE adding olive oil?",
    image: "",
    options: [
        "A) Serve the salad.",
        "B) Wash the vegetables.",
        "C) Mix everything well.",
        "D) Chop the tomatoes and cucumbers."
    ],
    answer: "D"
},

{
    question: "Read the phone conversation below.<br><br><b>Secretary:</b> Good afternoon. Bright Tech Company. How can I help you?<br><b>Mr. Green:</b> Hello. My printer isn't working properly.<br><b>Secretary:</b> I'm sorry to hear that. Can I have your address, please?<br><b>Mr. Green:</b> 18 Lake Street.<br><b>Secretary:</b> Our technician will visit you this afternoon.<br><br>Why does Mr. Green call the company?",
    image: "",
    options: [
        "A) To buy a new printer",
        "B) To report a problem",
        "C) To change his address",
        "D) To order printer paper"
    ],
    answer: "B"
},

{
    question: "Lucy is organizing a picnic on Saturday. She invites her friends.<br><br>• Amy will visit her grandparents.<br>• Ben loves picnics and he is free.<br>• Kate has a piano lesson.<br>• Mike will study for his Maths exam.<br><br>Who will join Lucy?",
    image: "",
    options: [
        "A) Amy",
        "B) Ben",
        "C) Kate",
        "D) Mike"
    ],
    answer: "B"
},

{
    question: "Tomorrow is Kevin's birthday. Sarah wants to buy him a book.<br><br><b>Tom:</b> Kevin has already finished 'Amazing Space'.<br><b>Linda:</b> His uncle bought him 'World History' yesterday.<br><b>Jack:</b> He wants to read 'Wild Animals'.<br><br>Which book should Sarah buy?",
    image: "",
    options: [
        "A) Amazing Space",
        "B) World History",
        "C) Wild Animals",
        "D) Ancient Cities"
    ],
    answer: "C"
},

{
    question: "Read the announcement below.<br><br><b>SCIENCE FAIR</b><br>📅 June 15<br>🕙 10 a.m. - 4 p.m.<br>📍 Green Hall<br>• Bring your science project.<br>• All students can join.<br><br>Emma calls the school office.<br><br><b>Emma:</b> What should I bring to the event?<br><b>Secretary:</b> ________<br><br>Which of the following completes the conversation?",
    image: "",
    options: [
        "A) Bring your science project.",
        "B) The event starts next month.",
        "C) Only teachers can join.",
        "D) Don't come before 6 p.m."
    ],
    answer: "A"
},

{
    question: "Look at the survey results below.<br><br><b>Students' Favourite Free Time Activities</b><br><br>Playing Sports: 40%<br>Watching Videos: 30%<br>Reading Books: 20%<br>Playing Chess: 10%<br><br>Which of the following is CORRECT?",
    image: "",
    options: [
        "A) Most students enjoy playing chess.",
        "B) Reading books is more popular than watching videos.",
        "C) Playing sports is the most popular activity.",
        "D) Watching videos is the least popular activity."
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