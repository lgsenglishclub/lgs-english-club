import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the comments about Olivia.<br><br><b>Emma:</b> She always helps me with my homework.<br><b>Jack:</b> She never tells lies.<br><b>Linda:</b> She often forgets our appointments.<br><b>Tom:</b> We enjoy spending time together.<br><br>Who says something negative about Olivia?",
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
    question: "Read the invitation below.<br><br><b>Spring Picnic</b><br>📅 Saturday, May 20<br>🕛 12.00 p.m.<br>📍 Green Park<br>Please bring your own food and drinks.<br><br>Which question CANNOT be answered according to the invitation?",
    image: "",
    options: [
        "A) Where is the picnic?",
        "B) What should people bring?",
        "C) What time does it start?",
        "D) How much is the entrance fee?"
    ],
    answer: "D"
},

{
    question: "Read the dialogue.<br><br><b>Kate:</b> Shall we go to the cinema tonight?<br><b>Mary:</b> I'd love to, but I have to finish my project.<br><br>Mary ______.",
    image: "",
    options: [
        "A) accepts the invitation",
        "B) refuses the invitation",
        "C) changes the place",
        "D) doesn't understand Kate"
    ],
    answer: "B"
},

{
    question: "Read the recipe.<br><br>1. Crack two eggs into a bowl.<br>2. Add some milk.<br>3. Mix well.<br>4. Cook in a pan.<br><br>What should you do AFTER adding milk?",
    image: "",
    options: [
        "A) Crack the eggs.",
        "B) Cook in a pan.",
        "C) Mix well.",
        "D) Serve the meal."
    ],
    answer: "C"
},

{
    question: "Look at the chart below.<br><br><b>Favourite Weekend Activities</b><br><br>Playing Football: 45%<br>Watching Movies: 25%<br>Reading Books: 20%<br>Cooking: 10%<br><br>Which of the following is TRUE?",
    image: "",
    options: [
        "A) Cooking is more popular than reading.",
        "B) Watching movies is the least popular activity.",
        "C) Playing football is the most popular activity.",
        "D) Reading books is more popular than watching movies."
    ],
    answer: "C"
},

{
    question: "Read the phone conversation.<br><br><b>Secretary:</b> Good afternoon, Green Travel Agency.<br><b>Mr. Smith:</b> Hello. I'd like to book a tour for this weekend.<br><b>Secretary:</b> Certainly. Which destination would you prefer?<br><br>Why does Mr. Smith call the agency?",
    image: "",
    options: [
        "A) To cancel his reservation",
        "B) To make a reservation",
        "C) To complain about a hotel",
        "D) To ask for directions"
    ],
    answer: "B"
},

{
    question: "Read the information below.<br><br>Sarah Brown is a successful scientist. She graduated from London University and invented an eco-friendly recycling machine. Today, she gives seminars to students all around the world.<br><br>Which question CANNOT be answered according to the text?",
    image: "",
    options: [
        "A) Where did she study?",
        "B) What did she invent?",
        "C) What does she do today?",
        "D) How old is she?"
    ],
    answer: "D"
},

{
    question: "Read the announcement.<br><br><b>SCIENCE EXHIBITION</b><br>📅 12 June<br>🕙 10:00 a.m.<br>📍 City Science Museum<br>✔ Free entrance<br><br>Which of the following is CORRECT?",
    image: "",
    options: [
        "A) Visitors must buy a ticket.",
        "B) The exhibition starts in the afternoon.",
        "C) The event takes place at a science museum.",
        "D) Only teachers can attend the exhibition."
    ],
    answer: "C"
},

{
    question: "Look at the map below.<br><br>Library → North<br>Hospital → East<br>Museum → West<br>Park → South<br><br>You are at the library and want to go to the park. Which direction should you follow?",
    image: "",
    options: [
        "A) North",
        "B) East",
        "C) West",
        "D) South"
    ],
    answer: "D"
},

{
    question: "Read the text.<br><br>Emily enjoys travelling with her family. They usually visit historical places during their holidays because they like learning about different cultures. Last summer, they visited three ancient cities and took hundreds of photographs.<br><br>Which of the following is TRUE according to the text?",
    image: "",
    options: [
        "A) Emily dislikes historical places.",
        "B) Emily's family enjoys learning about cultures.",
        "C) They usually stay at home during holidays.",
        "D) They visited only one city last summer."
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