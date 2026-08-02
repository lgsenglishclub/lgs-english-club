import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the comments about Daniel.<br><br><b>Emma:</b> He always supports me when I have a problem.<br><b>Jack:</b> I can trust him because he never breaks his promises.<br><b>Linda:</b> He usually forgets our meetings.<br><b>Tom:</b> We share the same hobbies.<br><br>Who has a negative opinion about Daniel?",
    image: "",
    options: [
        "A) Emma",
        "B) Jack",
        "C) Linda",
        "D) Tom"
    ],
    answer: "C"
},

{
    question: "Look at the course advertisements below.<br><br>🎨 Art Club: Drawing & Painting<br>🤖 Robotics Club: Coding & Robots<br>🎭 Drama Club: Acting & Theatre<br>🏀 Sports Club: Basketball & Volleyball<br><br>Kevin wants to learn programming and build robots. Which club should he choose?",
    image: "",
    options: [
        "A) Art Club",
        "B) Robotics Club",
        "C) Drama Club",
        "D) Sports Club"
    ],
    answer: "B"
},

{
    question: "Read the dialogue.<br><br><b>Lucy:</b> Would you like to come to my birthday party on Friday?<br><b>Helen:</b> I'd love to, but I have a dentist appointment.<br><br>Helen ______.",
    image: "",
    options: [
        "A) accepts the invitation",
        "B) refuses the invitation politely",
        "C) changes the time",
        "D) invites Lucy"
    ],
    answer: "B"
},

{
    question: "Look at the chart below.<br><br><b>Favourite Weekend Activities</b><br><br>Cycling: 35%<br>Watching Films: 30%<br>Playing Football: 20%<br>Reading: 15%<br><br>Which sentence is CORRECT?",
    image: "",
    options: [
        "A) Reading is the most popular activity.",
        "B) Watching films is less popular than football.",
        "C) Cycling is the most preferred activity.",
        "D) Football is more popular than cycling."
    ],
    answer: "C"
},

{
    question: "Read the recipe below.<br><br>1. Wash the tomatoes.<br>2. Chop the tomatoes.<br>3. Put them into a bowl.<br>4. Add olive oil.<br>5. Mix well.<br><br>Which step comes immediately before mixing?",
    image: "",
    options: [
        "A) Wash the tomatoes.",
        "B) Chop the tomatoes.",
        "C) Put them into a bowl.",
        "D) Add olive oil."
    ],
    answer: "D"
},

{
    question: "Read the phone conversation.<br><br><b>Receptionist:</b> Good morning. Sunshine Hotel. How may I help you?<br><b>Mrs. Taylor:</b> Hello. I'd like to book a double room for three nights.<br><b>Receptionist:</b> Certainly. May I have your name, please?<br><br>Why is Mrs. Taylor calling?",
    image: "",
    options: [
        "A) To cancel a reservation",
        "B) To make a reservation",
        "C) To complain about a room",
        "D) To ask for directions"
    ],
    answer: "B"
},

{
    question: "Read the information below.<br><br>Mark Wilson is a young scientist. After graduating from Stanford University, he invented a smart recycling bin that separates plastic, paper and glass automatically. Today, many schools use his invention.<br><br>Which question CANNOT be answered according to the text?",
    image: "",
    options: [
        "A) Where did he graduate from?",
        "B) What did he invent?",
        "C) Who uses his invention?",
        "D) How old is he?"
    ],
    answer: "D"
},

{
    question: "Look at the map below.<br><br>📍 You are at the Library.<br>• The Hospital is east of the Library.<br>• The Museum is north of the Hospital.<br>• The Cinema is west of the Museum.<br><br>Where is the Museum?",
    image: "",
    options: [
        "A) East of the Hospital",
        "B) North of the Hospital",
        "C) South of the Cinema",
        "D) West of the Library"
    ],
    answer: "B"
},

{
    question: "Look at the survey below.<br><br><b>Students' Favourite School Events</b><br><br>Science Fair: 40%<br>Sports Day: 30%<br>Book Fair: 20%<br>Music Festival: 10%<br><br>Which of the following is TRUE?",
    image: "",
    options: [
        "A) Sports Day is the most popular event.",
        "B) Book Fair is less popular than Music Festival.",
        "C) Science Fair has the highest percentage.",
        "D) Music Festival is more popular than Book Fair."
    ],
    answer: "C"
},

{
    question: "Read the text.<br><br>Sophia enjoys spending time outdoors. Every month, she joins a hiking group and visits different national parks. She believes these trips help her stay healthy and learn about nature.<br><br>Which of the following is TRUE according to the text?",
    image: "",
    options: [
        "A) Sophia dislikes outdoor activities.",
        "B) Sophia joins hiking trips regularly.",
        "C) Sophia never visits national parks.",
        "D) Sophia prefers staying at home."
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