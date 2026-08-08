import { saveToFirebase } from "../../../js/saveResult.js";

const questions = [

{
type:"Survey Question",
q:`A teacher asked her students about their favourite free time activities.

<table class="survey-table">
<tr><th>Activity</th><th>Number of Students</th></tr>
<tr><td>Reading books</td><td>12</td></tr>
<tr><td>Riding a bike</td><td>8</td></tr>
<tr><td>Going camping</td><td>5</td></tr>
<tr><td>Watching movies</td><td>10</td></tr>
</table>

<b>Which of the following is CORRECT according to the survey?</b>`,
options:[
"Going camping is more popular than reading books.",
"Watching movies is the least popular activity.",
"Reading books is the most popular activity.",
"Eight students enjoy watching movies."
],
answer:2,
explanation:"Reading books has the highest number of students (12).",
difficulty:"Medium"
},

{
type:"Weekly Planner",
q:`<b>Lucy shared her weekdays plan.</b>

<table class="planner-table">
<tr><th>Day</th><th>Activity</th></tr>
<tr><td>Monday</td><td>Play chess</td></tr>
<tr><td>Tuesday</td><td>Ride a bike</td></tr>
<tr><td>Wednesday</td><td>Go hiking</td></tr>
<tr><td>Thursday</td><td>Go camping</td></tr>
<tr><td>Friday</td><td>Watch a comedy movie</td></tr>

</table>

<b>Which question CANNOT be answered according to the planner?</b>`,
options:[
"What kind of movie does Lucy watch?",
"What does Lucy do on weekends?",
"How often does Lucy go camping?",
"What activity does Lucy do on Monday?"
],
answer:1,
explanation:"The planner tells us that she goes camping on Saturday, but it doesn't say how often.",
difficulty:"Hard"
},

{
type:"Matching",
q:`<p>Four friends are talking about the movies they like.<p>

<b>Kevin:</b> I love laughing.
<br>
<b>Emma:</b> I enjoy exciting fights and car chases.
<br>
<b>Linda:</b> I want to learn new things about nature and history.
<br>
<b>Tom:</b> I like scary stories.

<p><b>Which option matches Emma?</b><p>`,
options:[
"Comedy",
"Action",
"Documentary",
"Horror"
],
answer:1,
explanation:"Emma likes exciting fights and car chases, so she prefers action movies.",
difficulty:"Easy"
},

{
type:"Checklist",
q:`<p>Jack is preparing for a camping trip.<p>

✔ Tent
<br>
✔ Sleeping bag
<br>
✔ Compass
<br>
✔ Water bottle

<p>He wants to see clearly at night.<p>

<p><b>Which equipment should he add?</b><p>`,
options:[
"Flashlight",
"Pocketknife",
"Map",
"Backpack"
],
answer:0,
explanation:"A flashlight helps people see in the dark while camping.",
difficulty:"Easy"
},

{
type:"Social Media",
q:`Sophia spent the weekend in the mountains with her cousins.

They slept in a tent, cooked outside and walked for hours.


<p><b>Which activity did Sophia probably do?</b><p>`,
options:[
"Go camping",
"Go shopping",
"Read books",
"Watch a movie"
],
answer:0,
explanation:"Sleeping in a tent and cooking outside are camping activities.",
difficulty:"Medium"
},

{
type:"Survey Question",
q:`The chart below shows four students' favourite free time activities.

<table class="survey-table">
<tr><th>Name</th><th>Favourite Activity</th></tr>
<tr><td>Helen</td><td>Reading books</td></tr>
<tr><td>Jack</td><td>Going camping</td></tr>
<tr><td>Amy</td><td>Watching movies</td></tr>
<tr><td>David</td><td>Riding a bike</td></tr>
</table>

<b>Which of the following is CORRECT?</b>`,
options:[
"Jack enjoys spending time in nature.",
"Helen likes action movies.",
"Amy prefers camping.",
"David enjoys reading books."
],
answer:0,
difficulty:"Easy"
},

{
type:"Weekly Planner",
q:`Tom's weekly planner

<table class="planner-table">
<tr><th>Day</th><th>Activity</th></tr>
<tr><td>Monday</td><td>Read a book</td></tr>
<tr><td>Tuesday</td><td>Play basketball</td></tr>
<tr><td>Wednesday</td><td>Go hiking</td></tr>
<tr><td>Thursday</td><td>Watch a movie</td></tr>
<tr><td>Friday</td><td>Meet friends</td></tr>
</table>

<b>Which question CANNOT be answered?</b>`,
options:[
"What does Tom do on Wednesday?",
"What kind of movie does Tom watch?",
"When does Tom play basketball?",
"What does he do on Friday?"
],
answer:1,
difficulty:"Hard"
},

{
type:"Survey Question",
q:`Twenty students answered this question:

<p><b>"What do you usually do after school?"</b><p>

<table class="survey-table">
<tr><th>Activity</th><th>Students</th></tr>
<tr><td>Ride a bike</td><td>8</td></tr>
<tr><td>Read books</td><td>5</td></tr>
<tr><td>Play football</td><td>4</td></tr>
<tr><td>Watch TV</td><td>3</td></tr>
</table>

<b>Which statement is TRUE?</b>`,
options:[
"Watching TV is the most popular activity.",
"Reading books is less popular than football.",
"Riding a bike is the most popular activity.",
"Only four students read books."
],
answer:2,
difficulty:"Medium"
},

{
type:"Dialogue Completion",
q:`<b>Kevin:</b> I enjoy spending time in nature.
<br><br>
<b>Mark:</b> Really? What do you usually do?
<br><br>
<b>Kevin:</b> I often sleep in a tent and cook outside.
<br><br>
<b>Mark: __________</b>`,
options:[
"You must love camping.",
"You never leave your house.",
"You hate outdoor activities.",
"You enjoy shopping malls."
],
answer:0,
difficulty:"Easy"
},

{
type:"Table Interpretation",
q:`Four students talked about their hobbies.

<table class="survey-table">
<tr><th>Name</th><th>Hobby</th></tr>
<tr><td>Emma</td><td>Reading fantasy books</td></tr>
<tr><td>Liam</td><td>Watching documentaries</td></tr>
<tr><td>Sophia</td><td>Going hiking</td></tr>
<tr><td>Noah</td><td>Listening to jazz</td></tr>
</table>

<b>Who enjoys spending time outdoors?</b>`,
options:[
"Emma",
"Liam",
"Sophia",
"Noah"
],
answer:2,
difficulty:"Easy"
},

{
type:"Bar Chart",
q:`The chart shows teenagers' favourite music genres.

<table class="survey-table">
<tr><th>Genre</th><th>Students</th></tr>
<tr><td>Pop</td><td>14</td></tr>
<tr><td>Rap</td><td>11</td></tr>
<tr><td>Rock</td><td>9</td></tr>
<tr><td>Jazz</td><td>6</td></tr>
</table>

<b>Which statement is FALSE?</b>`,
options:[
"Pop is the most popular genre.",
"Jazz is the least popular genre.",
"Rock is more popular than Rap.",
"Fourteen students prefer pop music."
],
answer:2,
difficulty:"Medium"
},

{
type:"Planner",
q:`<b>Emily's weekend plan</b>

<table class="planner-table">
<tr><th>Time</th><th>Activity</th></tr>
<tr><td>10.00</td><td>Ride a bike</td></tr>
<tr><td>13.00</td><td>Have lunch</td></tr>
<tr><td>15.00</td><td>Watch a movie</td></tr>
<tr><td>19.00</td><td>Read a book</td></tr>
</table>

<b>What does Emily do before lunch?</b>`,
options:[
"Read a book",
"Ride a bike",
"Watch a movie",
"Go shopping"
],
answer:1,
difficulty:"Easy"
},

{
type:"Survey Question",
q:`Students voted for their favourite book genres.

<table class="survey-table">
<tr><th>Genre</th><th>Votes</th></tr>
<tr><td>Fantasy</td><td>10</td></tr>
<tr><td>Adventure</td><td>8</td></tr>
<tr><td>Biography</td><td>5</td></tr>
<tr><td>Poetry</td><td>2</td></tr>
</table>

<b>Which genre is the least popular?</b>`,
options:[
"Biography",
"Adventure",
"Fantasy",
"Poetry"
],
answer:3,
difficulty:"Easy"
},

{
type:"Notes",
q:`Jack wrote these notes to prepare an activity.

<br>• Tent
<br>• Compass
<br>• Sleeping bag
<br>• Water bottle

<p><b>According to the notes which sentence is CORRECT?</b><p>`,
options:[
"Jack is preparing for school.",
"Jack is getting ready for a camping trip.",
"Jack is buying books.",
"Jack is going to the cinema."
],
answer:1,
difficulty:"Easy"
},

{
type:"Reading",
q:`Mary enjoys reading exciting stories about dangerous journeys, forests and mountains.

<p><b>Which type of book does she probably like?</b><p>`,
options:[
"Adventure",
"Biography",
"Detective",
"Comic book"
],
answer:0,
difficulty:"Medium"
},

{
type:"Table Interpretation",
q:`Four friends talked about movies.

<table class="survey-table">
<tr><th>Name</th><th>Favourite Movie</th></tr>
<tr><td>Leo</td><td>Comedy</td></tr>
<tr><td>Alice</td><td>Documentary</td></tr>
<tr><td>Ryan</td><td>Action</td></tr>
<tr><td>Grace</td><td>Animation</td></tr>
</table>

<b>Who probably enjoys learning new things?</b>`,
options:[
"Grace",
"Leo",
"Ryan",
"Alice"
],
answer:3,
difficulty:"Medium"
},

{
type:"Survey Question",
q:`The survey below shows students' favourite weekend activities.

<table class="survey-table">
<tr><th>Activity</th><th>Students</th></tr>
<tr><td>Camping</td><td>6</td></tr>
<tr><td>Cycling</td><td>9</td></tr>
<tr><td>Reading</td><td>4</td></tr>
<tr><td>Fishing</td><td>5</td></tr>
</table>

<b>Which activity is more popular than camping?</b>`,
options:[
"Reading",
"Fishing",
"Cycling",
"None of them"
],
answer:2,
difficulty:"Easy"
},

{
type:"Dialogue Completion",
q:`<b>Bookseller:</b> What kind of book do you want to buy?
<br><br>
<b>Susan:</b> I'm looking for a book with space and future.
<br><br>
<b>Bookseller:</b> Then I will give you <b>.............</b> book for you.
<br><br>`,

options:[
"adventure",
"science-fiction",
"comedy",
"detective"
],
answer:1,
difficulty:"Medium"
},

{
type:"Bar Chart",
q:`The chart below shows the favourite weekend activities of 30 teenagers.

<table class="survey-table">
<tr><th>Activity</th><th>Students</th></tr>
<tr><td>Going camping</td><td>9</td></tr>
<tr><td>Watching movies</td><td>8</td></tr>
<tr><td>Reading books</td><td>7</td></tr>
<tr><td>Riding a bike</td><td>6</td></tr>
</table>

<b>Which of the following is CORRECT according to the chart?</b>`,
options:[
"Watching movies is the most popular activity.",
"Nine teenagers prefer going camping.",
"Reading books is less popular than riding a bike.",
"Only six students watch movies."
],
answer:1,
difficulty:"Medium"
},

{
type:"Survey Question",
q:`A teacher asked her students about their favourite book genres.

<table class="survey-table">
<tr><th>Genre</th><th>Votes</th></tr>
<tr><td>Fantasy</td><td>11</td></tr>
<tr><td>Adventure</td><td>8</td></tr>
<tr><td>Biography</td><td>4</td></tr>
<tr><td>Poetry</td><td>2</td></tr>
</table>

<b>Which of the following is TRUE?</b>`,
options:[
"Adventure is the least popular genre.",
"More students like biographies than adventures.",
"Fantasy is the most preferred genre.",
"Only two students enjoy fantasy books."
],
answer:2,
difficulty:"Easy"
},

{
type:"Bar Chart",
q:`The graph shows four students' favourite music genres.

<table class="survey-table">
<tr><th>Student</th><th>Favourite Genre</th></tr>
<tr><td>Emma</td><td>Pop</td></tr>
<tr><td>Jack</td><td>Jazz</td></tr>
<tr><td>Linda</td><td>Rock</td></tr>
<tr><td>Ryan</td><td>Rap</td></tr>
</table>

<b>Which student probably enjoys energetic songs with rhymes?</b>`,
options:[
"Emma",
"Jack",
"Linda",
"Ryan"
],
answer:3,
difficulty:"Hard"
},

{
type:"Weekly Planner",
q:`Lisa's weekend planner

<table class="planner-table">
<tr><th>Time</th><th>Activity</th></tr>
<tr><td>09.00</td><td>Ride a bike</td></tr>
<tr><td>12.00</td><td>Have lunch</td></tr>
<tr><td>14.00</td><td>Read a fantasy book</td></tr>
<tr><td>18.00</td><td>Watch a comedy movie</td></tr>
</table>

<b>Which question CANNOT be answered according to the planner?</b>`,
options:[
"What does Lisa read?",
"What kind of movie does Lisa watch?",
"What time does Lisa have lunch?",
"Who does Lisa ride a bike with?"
],
answer:3,
difficulty:"Hard"
},

{
type:"Dialogue Completion",
q:`<b>Sam:</b> I'm looking for a book about real people's lives.
<br><br>
<b>Bookseller:</b> I think this section is perfect for you.
<br><br>
<b>Sam: __________</b>`,
options:[
"Great! I enjoy reading biographies.",
"I never watch documentaries.",
"I need a sleeping bag.",
"I prefer camping at weekends."
],
answer:0,
difficulty:"Easy"
},

{
type:"Survey Question",
q:`Thirty students answered the following question:

<b>Which movie genre do you like most?</b>

<table class="survey-table">
<tr><th>Genre</th><th>Students</th></tr>
<tr><td>Comedy</td><td>12</td></tr>
<tr><td>Action</td><td>9</td></tr>
<tr><td>Animation</td><td>5</td></tr>
<tr><td>Documentary</td><td>4</td></tr>
</table>

<b>Which of the following is FALSE?</b>`,
options:[
"Comedy is the most popular genre.",
"Animation is more popular than action.",
"Documentary is the least popular genre.",
"Twelve students prefer comedy."
],
answer:1,
difficulty:"Medium"
},

{
type:"Matching",
q:`Read the information below.

<table class="survey-table">
<tr><th>Person</th><th>Preference</th></tr>
<tr><td>Helen</td><td>loves nature and sleeping in a tent</td></tr>
<tr><td>Tom</td><td>likes funny films</td></tr>
<tr><td>Emma</td><td>enjoys magical stories</td></tr>
<tr><td>Ryan</td><td>likes learning about wildlife</td></tr>
</table>

<b>Who would probably choose a documentary about wild animals?</b>`,
options:[
"Helen",
"Tom",
"Emma",
"Ryan"
],
answer:3,
difficulty:"Medium"
}

]

let timer;
let timeLeft = 90;

let current = 0;
let score = 0;
let selected = null;
let wrongQuestions = [];


function loadQuestion(){

    clearInterval(timer);
timeLeft = 90;

    selected = null;

    const q = questions[current];

    let parts = q.q.split("?");
let questionPart = parts.pop();

let contentPart = parts.join("?") + "?";

    const quiz = document.getElementById("quiz");

    quiz.innerHTML = `
    
    <div class="question-card">

        <div class="question-title">
    ⭐ Question ${current + 1} / ${questions.length}
</div>

<div class="timer">
    ⏱️ Time Left: <span id="time" class="timer-number">90</span>
</div>

<div class="question-type">
    ${q.type}
</div>

        <div class="question-text">
    ${q.q}
</div>

        
        <div class="answers">

            ${q.options.map((option,index)=>`

                <div class="answer"
                onclick="selectOption(${index}, this)">
                
                <span>
                ${String.fromCharCode(65+index)}
                </span>

                ${option}

                </div>

            `).join("")}

        </div>

        


        <div class="explanation" id="explanation">
        ${q.explanation}
        </div>

        <button id="nextBtn" onclick="nextQuestion()">
Next Question
</button>

    </div>

    `;

timer = setInterval(() => {

    timeLeft--;

    document.getElementById("time").innerText = timeLeft;

    if(timeLeft <= 0){

        clearInterval(timer);

        selected = -1;

        nextQuestion();

    }

}, 1000);

}

function nextQuestion(){

    clearInterval(timer);

    if(selected === null){
        alert("Please select an answer.");
        return;
    }


    let q = questions[current];


    let options = document.querySelectorAll(".answer");


    // Doğru cevabı göster
    options[q.answer].classList.add("correct");


    // Yanlış seçildiyse göster
if (selected !== -1 && selected !== q.answer) {

    options[selected].classList.add("wrong");

}


    // Tüm seçenekleri kilitle
    options.forEach(option=>{
        option.style.pointerEvents="none";
    });


    if(selected === q.answer){

    score++;

}else{


}


    // Açıklamayı göster
       let exp=document.getElementById("explanation");
   
       if(exp){
           exp.style.display="block";
       }
   
   
       setTimeout(async ()=>{
   
       current++;
   
       selected = null;
   
   
           if(current < questions.length){
   
               loadQuestion();
   
           }
           else{
   
              await saveTestResult();
   
              document.getElementById("quiz").innerHTML=`
   
   <div class="result-card">
   
       <div class="result-icon">
           🎉
       </div>
   
       <h2>Test Completed</h2>
   
       <div class="score-circle">
           <span>${score}</span>
           <small>/${questions.length}</small>
       </div>
   
   
       <div class="result-message">
           ${
           score >= 33 
           ? "🌟 Excellent! You are ready for LGS."
           : score >= 25
           ? "👍 Good job! Keep practicing."
           : "📚 Review the topic and try again."
           }
       </div>
   
       <div class="review">
   
   ${
   wrongQuestions.length==0
   
   ?
   
   "<h3>🎉 Perfect! No mistakes.</h3>"
   
   :
   
   wrongQuestions.map((item,index)=>`
   
   <div class="review-card">
   
   <h3>❌ Question ${index+1}</h3>
   
   <p>${item.question}</p>
   
   <b>Correct Answer:</b>
   
   <p>${item.correct}</p>
   
   <b>Explanation:</b>
   
   <p>${item.explanation}</p>
   
   </div>
   
   `).join("")
   
   }
   
   </div>
   
   
       <div class="stats">
   
           <div class="stat-box">
               <b>${score}</b>
               <span>Correct</span>
           </div>
   
   
           <div class="stat-box">
               <b>${questions.length-score}</b>
               <span>Wrong</span>
           </div>
   
   
           <div class="stat-box">
               <b>${Math.round(score/questions.length*100)}%</b>
               <span>Success</span>
           </div>
   
       </div>
   
   
       <button onclick="location.reload()" class="restart-btn">
           🔄 Try Again
       </button>
   
   
   </div>
   
   `;
   
               document.getElementById("nextBtn").disabled=false;
   
           }
   
   
       },1500);
   
   }
   
   function selectOption(index, element){
   
       selected = index;
   
       // Önce tüm şıkların seçimini kaldır
       document.querySelectorAll(".answer")
       .forEach(option=>{
           option.classList.remove("selected");
       });
   
       // Sadece tıklanan şıkkı seç
       element.classList.add("selected");
   
   }
   
   console.log("Question count:", questions.length);
   
   async function saveTestResult(){
   
       const history = JSON.parse(sessionStorage.getItem("recentTests")) || [];
   
       const wrong = questions.length - score;
   
       const result = {
   
       userId: sessionStorage.getItem("userId"),
   
       username: sessionStorage.getItem("username"),
   
       email: sessionStorage.getItem("email"),
   
   
           testName: "Unıt 10 Questions",
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
   
   window.loadQuestion = loadQuestion;
   window.nextQuestion = nextQuestion;
   window.selectOption = selectOption;
   window.saveTestResult = saveTestResult;
   
   loadQuestion();