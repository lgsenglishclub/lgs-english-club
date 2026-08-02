import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
    question: "Read the opinions about four friends.<br><br><b>Emma:</b> Jack always tells the truth.<br><b>Linda:</b> Lucy never supports me when I have a problem.<br><b>Kevin:</b> Tom always remembers my birthday.<br><b>Susan:</b> Kate and I enjoy doing the same activities.<br><br>Who says something negative about his/her friend?",
    image: "",
    options: [
        "A) Emma",
        "B) Linda",
        "C) Kevin",
        "D) Susan"
    ],
    answer: "B"
},

{
    question: "Mike wants to buy a book for his sister. She is interested in wild animals.<br><br>Which book should Mike buy?",
    image: "",
    options: [
        "A) Healthy Recipes",
        "B) Amazing Wildlife",
        "C) Modern Buildings",
        "D) Space Technology"
    ],
    answer: "B"
},

{
    question: "Read the school rules below.<br><br>• Be quiet during the lessons.<br>• Keep your classroom clean.<br>• Return library books on time.<br>• Water the flowers in your garden.<br><br>Which one is NOT a school rule?",
    image: "",
    options: [
        "A) Be quiet during the lessons.",
        "B) Keep your classroom clean.",
        "C) Return library books on time.",
        "D) Water the flowers in your garden."
    ],
    answer: "D"
},

{
    question: "The teacher asks her students to put the words into two groups.<br><br><b>Cooking Methods:</b> bake, fry, boil<br><b>Kitchen Tools:</b> spoon, oven, pan<br><br>Which word is in the wrong group?",
    image: "",
    options: [
        "A) Bake",
        "B) Fry",
        "C) Oven",
        "D) Boil"
    ],
    answer: "C"
},

{
    question: "Read the phone conversation.<br><br><b>Secretary:</b> Good morning. Blue Company.<br><b>John:</b> May I speak to Mr. Brown, please?<br><b>Secretary:</b> I'm sorry. He is having a meeting now. Can I take a message?<br><br>According to the conversation, Mr. Brown is ______.",
    image: "",
    options: [
        "A) available",
        "B) on holiday",
        "C) busy",
        "D) calling back"
    ],
    answer: "C"
},


{
    question: "Read the information about Dr. Helen Moore.<br><br>She was born in London in 1980. She studied medicine at Oxford University. She has written many books about healthy living and received several international awards.<br><br>Which heading does NOT match the text?",
    image: "",
    options: [
        "A) Personal Life",
        "B) Education",
        "C) Achievements",
        "D) Favourite TV Programmes"
    ],
    answer: "D"
},

{
    question: "Susan received four messages from her friends.<br><br><b>Anna:</b> We are having a barbecue on Sunday. Would you like to join us?<br><b>Tom:</b> I bought a new bicycle yesterday.<br><b>Mike:</b> Let's watch the football match together tonight!<br><b>Lucy:</b> We are planning a picnic on Saturday. Come with us!<br><br>Who did NOT invite Susan to an event?",
    image: "",
    options: [
        "A) Anna",
        "B) Tom",
        "C) Mike",
        "D) Lucy"
    ],
    answer: "B"
},

{
    question: "Read the comments about a new book on extreme sports.<br><br><b>Paul:</b> It has lots of useful information.<br><b>Jane:</b> I learned many interesting facts from it.<br><b>Kevin:</b> It isn't detailed enough. I expected much more.<br><b>Sally:</b> Everyone interested in extreme sports should read it.<br><br>Who has a negative opinion about the book?",
    image: "",
    options: [
        "A) Paul",
        "B) Jane",
        "C) Kevin",
        "D) Sally"
    ],
    answer: "C"
},

{
    question: "Read the information below.<br><br>• Cappadocia is famous for its fairy chimneys.<br>• You can visit Ephesus to see ancient ruins.<br>• Pamukkale is popular for its white travertines.<br>• Mount Uludağ is a great place for skiing.<br><br>Which question can be answered by ALL of the texts?",
    image: "",
    options: [
        "A) Who built it?",
        "B) Where is it?",
        "C) What is it famous for?",
        "D) How much does it cost?"
    ],
    answer: "C"
},

{
    question: "Look at the map below.<br><br><b>Nature Walk Camp</b><br><br>Day 1: 12 km<br>Day 2: 15 km<br>Day 3: 18 km<br>Day 4: 10 km<br><br>Which of the following is TRUE?",
    image: "",
    options: [
        "A) Participants walk exactly 50 km in total.",
        "B) The second day is the shortest route.",
        "C) The third day has the longest distance.",
        "D) Day 4 is longer than Day 2."
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