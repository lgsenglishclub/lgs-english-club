import { saveToFirebase } from "../../../js/saveResult.js";
import { db } from "../../../firebase-config.js";

import {
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

// ============================
// 🎮 TEST XP SYSTEM
// ============================

async function addTestXP(percent) {

    const userId =
        sessionStorage.getItem("userId");

    if (!userId) {

        console.warn(
            "⚠️ User ID bulunamadı. XP verilmedi."
        );

        return;

    }

    let baseXP = 20;
    let bonusXP = 0;

    // ============================
    // 🏆 SUCCESS BONUS
    // ============================

    if (percent >= 100) {

        bonusXP = 25;

    }
    else if (percent >= 90) {

        bonusXP = 15;

    }
    else if (percent >= 80) {

        bonusXP = 10;

    }


    const totalXP =
        baseXP + bonusXP;


    try {

        const userRef =
            doc(db, "users", userId);

        await updateDoc(userRef, {

            xp: increment(totalXP)

        });


        console.log(
            `🎮 +${baseXP} XP test`
        );


        if (bonusXP > 0) {

            console.log(
                `🏆 +${bonusXP} XP başarı bonusu`
            );

        }


        console.log(
            `⭐ Toplam +${totalXP} XP`
        );


    } catch (error) {

        console.error(
            "❌ XP eklenirken hata:",
            error
        );

    }

}

const questions = [

{
type:"Dialogue Completion",
q:`<b>Emma:</b> Hi Jack. We are organizing a friendship day at school next Friday.
<br><br>
<b>Jack:</b> That sounds great. What activities are you planning?
<br><br>
<b>Emma:</b> We will play team games and have a picnic together.
<br><br>
<b>Jack: __________</b>`,
options:[
"Sorry, I don't like spending time with my friends.",
"Great! I'd love to join the event.",
"I can't understand your invitation.",
"I usually study alone after school."
],
answer:1,
explanation:"Jack likes the idea and wants to participate in the friendship day event.",
difficulty:"Medium"
},

{
type:"Dialogue Completion",
q:`<b>Lisa:</b> Would you like to come to my birthday party on Saturday?
<br><br>
<b>Mia:</b> I'd love to, but I can't.
<br><br>
<b>Lisa:</b> Why not?
<br><br>
<b>Mia: __________</b>`,
options:[
"I have another plan with my family.",
"That is a wonderful idea.",
"I always enjoy birthday parties.",
"Your friends are very kind."
],
answer:0,
explanation:"Mia refuses the invitation because she has another plan.",
difficulty:"Medium"
},

{
type:"Dialogue Completion",
q:`<b>Tom:</b> I think a good friend should always tell the truth.
<br><br>
<b>Alex:</b> I agree with you. A friend should also support others.
<br><br>
<b>Tom:</b> Yes, honesty and kindness are important.
<br><br>
<b>Which sentence completes the dialogue best?</b>`,
options:[
"Friendship requires trust and respect.",
"I never spend time with my friends.",
"I dislike helping people.",
"Competition is more important than friendship."
],
answer:0,
explanation:"The dialogue is about the qualities of a good friend.",
difficulty:"Medium"
},

{
type:"Dialogue Completion",
q:`<b>Sarah:</b> Hi Kate. Are you free this evening?
<br><br>
<b>Kate:</b> I'm afraid I can't. I have to finish my science project.
<br><br>
<b>Sarah:</b> No problem. We can meet another day.
<br><br>
<b>What does Kate mean?</b>`,
options:[
"She doesn't want to meet Sarah.",
"She has another responsibility.",
"She has lost her project.",
"She wants to cancel the project."
],
answer:1,
explanation:"Kate cannot meet because she has to complete her science project.",
difficulty:"Easy"
},

{
type:"Dialogue Completion",
q:`<b>David:</b> Our new classmate doesn't talk much. I think he feels shy.
<br><br>
<b>Mike:</b> Maybe we should invite him to our activities.
<br><br>
<b>David:</b> That's a good idea. It can help him make friends.
<br><br>
<b>What are David and Mike planning to do?</b>`,
options:[
"Help a new student feel included.",
"Organize a sports competition.",
"Study for an exam together.",
"Change their class schedule."
],
answer:0,
explanation:"They want to include the new student and help him make friends.",
difficulty:"Hard"
},

{
type:"Invitation / Response",
q:`Emily is organizing a friendship activity at school.

<br><br>

<b>Friendship Picnic</b><br>
📅 Saturday, May 18<br>
⏰ 12:00 p.m.<br>
📍 School Garden<br>
✓ Bring your own food<br>
✓ Play team games<br>
✓ Meet new friends

<br><br>

<b>Which student can join this activity according to the information above?</b>`,
options:[
"Jack: I have a football match on Saturday afternoon.",
"Susan: I want to meet new people and spend time outdoors.",
"Tom: I don't enjoy group activities.",
"Anna: I prefer staying at home on weekends."
],
answer:1,
explanation:"The activity is for students who enjoy meeting people and joining group activities.",
difficulty:"Hard"
},

{
type:"Invitation / Response",
q:`<b>Mark:</b> Hi Kevin. We are having a movie night at my house on Friday. Would you like to join us?
<br><br>
<b>Kevin:</b> I'd love to, but I can't.
<br><br>
<b>Mark:</b> Why not?
<br><br>
<b>Kevin: __________</b>`,
options:[
"I have to visit my grandparents that evening.",
"That sounds like a great idea.",
"I really enjoy watching movies.",
"I will invite my friends too."
],
answer:0,
explanation:"Kevin refuses because he has another plan at the same time.",
difficulty:"Medium"
},

{
type:"Invitation / Response",
q:`Read the messages.

<br><br>

<b>Lucy:</b> Hi Sarah. Our friendship club is organizing a charity event next week. Would you like to help us?

<br><br>

<b>Sarah:</b> That sounds interesting, but I have an exam on Monday. Can I join another activity later?

<br><br>

<b>What can we understand about Sarah?</b>`,
options:[
"She doesn't like helping people.",
"She wants to participate but she has another responsibility.",
"She thinks charity events are boring.",
"She never joins school activities."
],
answer:1,
explanation:"Sarah is interested in the event, but she cannot join because of her exam.",
difficulty:"Hard"
},

{
type:"Invitation / Response",
q:`<b>Friendship Club Meeting</b>

<br><br>

Date: Wednesday<br>
Time: 4:30 p.m.<br>
Place: School Library

Activities:
✓ Discuss friendship problems
✓ Share ideas
✓ Plan weekend activities

<br><br>

<b>Which sentence is TRUE according to the invitation?</b>`,
options:[
"The meeting is about solving friendship-related issues.",
"Students will only watch a movie at the meeting.",
"The activity is at the weekend.",
"The meeting takes place in a cafe."
],
answer:0,
explanation:"The activities include discussing friendship problems and sharing ideas.",
difficulty:"Medium"
},

{
type:"Chat / SMS",
q:`<b>Emma:</b> Hi Lily. Are you coming to the friendship club activity tomorrow?

<br><br>

<b>Lily:</b> I want to join, but I have to finish my science project first.

<br><br>

<b>Emma:</b> No problem. We can meet after you finish it.

<br><br>

<b>What can we understand about Lily?</b>`,
options:[
"She dislikes spending time with her friends.",
"She has another task to complete.",
"She doesn't know about the activity.",
"She wants to leave the friendship club."
],
answer:1,
explanation:"Lily cannot join because she needs to finish her science project.",
difficulty:"Medium"
},

{
type:"Chat / SMS",
q:`<b>Jack:</b> Hi Tom. I heard that you had a problem with your best friend.

<br><br>

<b>Tom:</b> Yes. We had an argument yesterday, but we talked about it and solved the problem.

<br><br>

<b>Jack:</b> That's good. True friends can understand each other.

<br><br>

<b>What is the main idea of the conversation?</b>`,
options:[
"Good friends can solve their problems by talking.",
"Friends should never share their feelings.",
"Arguments always end friendships.",
"People should avoid making new friends."
],
answer:0,
explanation:"The conversation shows that communication helps friends solve problems.",
difficulty:"Hard"
},

{
type:"Chat / SMS",
q:`<b>Sophie:</b> Hi Anna. We are preparing a surprise party for Mia. Would you like to help us?

<br><br>

<b>Anna:</b> Sure! I can prepare the invitation cards. I am good at designing things.

<br><br>

<b>Sophie:</b> Great! Your help will be very useful.

<br><br>

<b>Which adjective best describes Anna?</b>`,
options:[
"Helpful",
"Unfriendly",
"Careless",
"Impatient"
],
answer:0,
explanation:"Anna offers help and takes responsibility for part of the activity.",
difficulty:"Medium"
},

{
type:"Poster",
q:`<b>FRIENDSHIP WEEK</b>

<br><br>

📅 10-14 March  
📍 Green Valley School

<br><br>

<b>Activities:</b>

<br>
🎨 Monday: Friendship Posters  
<br>
🎲 Wednesday: Team Games  
<br>
🎬 Friday: Movie Afternoon  

<br><br>

<b>Rules:</b>
<br>
✓ Respect other students  
✓ Work in groups  
✓ Bring your own materials  

<br><br>

<b>Which student is following the rules of the event?</b>`,
options:[
"Jack comes alone and refuses to work with others.",
"Sally brings her materials and joins a group activity.",
"Tom leaves the activities because he dislikes teamwork.",
"Mary doesn't want to communicate with other students."
],
answer:1,
explanation:"Sally follows the rules by bringing materials and joining a group activity.",
difficulty:"Hard"
},

{
type:"Brochure",
q:`<b>NEW FRIENDS CLUB</b>

<br><br>

Are you new at school?

Do you want to meet new people?

Join our club!

<br><br>

<b>We offer:</b>

✓ Conversation activities  
✓ Fun games  
✓ Weekend events  
✓ Support for new students  

<br><br>

<b>Who would be interested in this club?</b>`,
options:[
"A student who wants to make new friends at school.",
"A student who prefers studying alone all the time.",
"A student who dislikes meeting people.",
"A student who only wants to join sports competitions."
],
answer:0,
explanation:"The club helps new students meet people and feel comfortable.",
difficulty:"Medium"
},

{
type:"Invitation Card",
q:`<b>Dear Friends,</b>

<br><br>

I am organizing a small party to celebrate my birthday.

<br><br>

📅 Sunday, June 9  
⏰ 3:00 p.m.  
📍 Blue House Cafe  

<br><br>

Please let me know before Friday.

<br><br>

<b>Which sentence is TRUE according to the card?</b>`,
options:[
"The party is on a weekday.",
"Guests should reply before Friday.",
"The event starts in the morning.",
"The party takes place at school."
],
answer:1,
explanation:"The invitation asks guests to reply before Friday.",
difficulty:"Easy-Medium"
},

{
type:"Table / Schedule",
q:`<b>Friendship Club Weekly Schedule</b>

<br><br>

<div class="table-box">

<table class="question-table">

<tr>
<th>Day</th>
<th>Activity</th>
<th>Time</th>
</tr>

<tr>
<td>Monday</td>
<td>Movie Club</td>
<td>4:00 p.m.</td>
</tr>

<tr>
<td>Wednesday</td>
<td>Team Games</td>
<td>3:30 p.m.</td>
</tr>

<tr>
<td>Friday</td>
<td>Picnic</td>
<td>2:00 p.m.</td>
</tr>

</table>

<br>

Sarah is free after 3:00 p.m. on weekdays except Friday.

<b>Which activity can Sarah join?</b>`,
options:[
"Movie Club",
"Team Games",
"Picnic",
"She cannot join any activity."
],
answer:1,
explanation:"Sarah is free after 3:00 p.m. on weekdays except Friday, so she can join Wednesday's Team Games.",
difficulty:"Hard"
},

{
type:"Table / Schedule",
q:`<b>Students' Weekend Plans</b>

<br><br>

<div class="table-box">

<table class="question-table">

<tr>
<th>Student</th>
<th>Plan</th>
<th>Reason</th>
</tr>

<tr>
<td>Emily</td>
<td>Visit friends</td>
<td>Spend time together</td>
</tr>

<tr>
<td>Jack</td>
<td>Study</td>
<td>Prepare for exam</td>
</tr>

<tr>
<td>Liam</td>
<td>Stay at home</td>
<td>Feel tired</td>
</tr>

</table>

<br>

<b>Who has a plan related to friendship?</b>`,
options:[
"Emily",
"Jack",
"Liam",
"All of them"
],
answer:0,
explanation:"Emily plans to visit friends and spend time together.",
difficulty:"Medium"
},

{
type:"Table / Comparison",
q:`<b>Friendship Survey Results</b>

<br><br>

<div class="table-box">

<table class="question-table">

<tr>
<th>Activity</th>
<th>Number of Students</th>
</tr>

<tr>
<td>Playing games</td>
<td>18</td>
</tr>

<tr>
<td>Watching movies</td>
<td>12</td>
</tr>

<tr>
<td>Sharing hobbies</td>
<td>15</td>
</tr>

<tr>
<td>Going on picnics</td>
<td>20</td>
</tr>

</table>

<br>

<b>According to the survey, which sentence is TRUE?</b>`,
options:[
"Watching movies is the most popular activity.",
"Students prefer picnics more than other activities.",
"Sharing hobbies is more popular than picnics.",
"Only a few students like playing games."
],
answer:1,
explanation:"Picnics have the highest number of students (20).",
difficulty:"Medium-Hard"
},

{
type:"Reading",
q:`<b>Read the text and answer the question.</b>

<br><br>

Emma moved to a new school last year. At first, she felt lonely because she didn't know anyone. Her classmates invited her to join the friendship club. She joined different activities, shared her hobbies and met new people. After a few months, she had many friends and felt much happier at school.

<br><br>

<b>What is the main idea of the text?</b>`,
options:[
"Making new friends can help people feel better in a new environment.",
"Students should never join school activities.",
"Moving to a new school is always a bad experience.",
"Friendship clubs are only for popular students."
],
answer:0,
explanation:"The text explains how joining activities helped Emma make friends and adapt to her new school.",
difficulty:"Hard"
},


{
type:"Reading",
q:`<b>Read the text and answer the question.</b>

<br><br>

Tom and his friends believe that a good friendship needs effort. They usually spend time together, but they also respect each other's personal space. Tom says that honest communication is the most important part of friendship because friends can solve their problems by talking.

<br><br>

<b>According to the text, which statement is TRUE?</b>`,
options:[
"Tom thinks friends should always agree with each other.",
"Tom believes communication helps friends solve problems.",
"Tom and his friends never spend time together.",
"Tom doesn't care about his friendships."
],
answer:1,
explanation:"The text says Tom thinks honest communication helps friends solve problems.",
difficulty:"Hard"
},

{
type:"Reading",
q:`Jane is preparing a birthday party. She wants to invite only close friends who enjoy music and dancing.

<br><br>

<b>Which invitation card is the MOST suitable?</b>`,
options:[
"Come and study together for the Maths exam on Saturday.",
"Let's celebrate my birthday with music, games and lots of fun!",
"Join our science project meeting after school.",
"Would you like to visit the history museum this weekend?"
],
answer:1,
explanation:"Jane is organizing a birthday party with music and dancing."
},

{
type:"Reading",
q:`Tom: Would you like to come to my barbecue party on Sunday?

<br><br>

Lisa: I'd love to, but I have to visit my grandparents.

<br><br>

<b>What does Lisa mean?</b>`,
options:[
"She accepts the invitation happily.",
"She refuses the invitation because she has another plan.",
"She doesn't like barbecue parties.",
"She wants Tom to change the date."
],
answer:1,
explanation:"Lisa politely refuses because she already has another plan."
},

{
type:"Reading",
q:`<b>Which sentence shows that Mike is a true friend?</b>`,
options:[
"He only calls me when he needs help.",
"He always keeps my secrets and supports me.",
"He never listens to my problems.",
"He often tells lies to make people laugh."
],
answer:1,
explanation:"Keeping secrets and being supportive are qualities of a true friend."
},

{
type:"Reading",
q:`Emma wants to organize a movie night. She wants to know who can come.

<br><br>

<b>Which question should she ask?</b>`,
options:[
"What kind of books do you read?",
"Would you like to join my movie night on Friday?",
"How often do you clean your room?",
"Why don't you like action films?"
],
answer:1,
explanation:"Emma is inviting her friends and asking if they can attend."
},

{
type:"Reading",
q:`Look at the chart below.

<br><br>

Four friends voted for the activities they want to do together this weekend.

<br><br>

• Bowling: 8 votes<br>
• Cinema: 12 votes<br>
• Picnic: 5 votes<br>
• Cycling: 10 votes

<br><br>

<b>Which of the following is CORRECT?</b>`,
options:[
"Most students want to go on a picnic.",
"Bowling is more popular than cycling.",
"Going to the cinema is the most popular activity.",
"Cycling got fewer votes than bowling."
],
answer:2,
explanation:"Cinema received the highest number of votes (12)."
},

{
type:"Reading",
q:`<b>Read the conversation.</b>

<br><br>

Mary: Hi Kate! I'm having a slumber party on Saturday evening.<br>
Kate: Sounds great! What time does it start?<br>
Mary: At 7 p.m.<br>
Kate: ________. See you then!

<br><br>

<b>Which option completes the dialogue?</b>`,
options:[
"I'm sorry but I have another plan.",
"I'd love to come.",
"I don't enjoy parties.",
"Maybe next month."
],
answer:1,
explanation:"Kate accepts the invitation and says 'See you then!'."
},

{
type:"Reading",
q:`<b>Read the text.</b>

<br><br>

Lucy is honest, helpful and cheerful. She never tells lies and always supports her friends.

<br><br>

<b>Which adjective DOES NOT describe Lucy?</b>`,
options:[
"Reliable",
"Supportive",
"Dishonest",
"Friendly"
],
answer:2,
explanation:"Lucy is honest, so 'dishonest' cannot describe her."
},

{
type:"Reading",
q:`<b>Read the invitation.</b>

<br><br>

-------------------------<br>
GAME NIGHT<br><br>

Date: Friday<br>
Time: 7.30 p.m.<br>
Place: Jack's House<br><br>

Bring your favourite board game!<br>
-------------------------

<br><br>

<b>Which question CANNOT be answered according to the invitation?</b>`,
options:[
"Where is the event?",
"When does it start?",
"What should the guests bring?",
"How many people will attend?"
],
answer:3,
explanation:"The invitation gives no information about the number of guests."
},

{
type:"Reading",
q:`<b>Read the conversation.</b>

<br><br>

Helen: Hi, Jack! We're planning a picnic this Sunday. Would you like to join us?<br>
Jack: I'd love to, but I have a football match in the afternoon.<br>
Helen: No problem. Maybe next time.

<br><br>

<b>Why does Jack refuse the invitation?</b>`,
options:[
"He doesn't enjoy picnics.",
"He is going to visit his relatives.",
"He already has another plan.",
"He doesn't like Helen."
],
answer:2,
explanation:"Jack politely refuses because he has a football match."
},

{
type:"Reading",
q:`<b>Read the information.</b>

<br><br>

Lisa<br>
• honest<br>
• supportive<br>
• keeps secrets<br>
• never tells lies

<br><br>

<b>Which sentence is TRUE about Lisa?</b>`,
options:[
"She shares her friends' secrets.",
"She is a reliable friend.",
"She often tells lies.",
"She never helps others."
],
answer:1,
explanation:"Lisa has all the qualities of a reliable friend."
},

{
type:"Reading",
q:`<b>Read the text.</b>

<br><br>

Kevin enjoys spending time with his friends. He usually invites them to outdoor activities because he loves nature and fresh air.

<br><br>

<b>Which activity would Kevin MOST probably choose?</b>`,
options:[
"Watching a film at home.",
"Playing computer games.",
"Having a picnic in the park.",
"Studying in the library."
],
answer:2,
explanation:"Kevin prefers outdoor activities."
},

{
type:"Reading",
q:`<b>Look at the table.</b>

<br><br>

Activities &nbsp;&nbsp;&nbsp; Number of Students<br>
Cinema &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9<br>
Bowling &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 14<br>
Picnic &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6<br>
Camping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11

<br><br>

<b>Which statement is CORRECT?</b>`,
options:[
"Camping is the least popular activity.",
"Bowling is more popular than camping.",
"Cinema is more popular than bowling.",
"Picnic is more popular than cinema."
],
answer:1,
explanation:"Bowling has the highest number of students (14), so it is more popular than camping."
},

{
type:"Reading",
q:`<b>Read the message.</b>

<br><br>

Hi Tina,

<br><br>

I'm organizing a surprise birthday party for Emma on Saturday at 6 p.m. at my house. Please don't tell her about it! Bring some snacks if you can.

<br><br>

See you!<br>
Amy

<br><br>

<b>Which of the following is NOT mentioned in the message?</b>`,
options:[
"The place of the party.",
"The time of the party.",
"The reason for the party.",
"The number of guests."
],
answer:3,
explanation:"The message does not mention how many people will attend."
},

{
type:"Reading",
q:`<b>Read the text.</b>

<br><br>

Jack enjoys spending time with people who are honest and cheerful. He dislikes friends who tell lies or break their promises.

<br><br>

<b>Which person would Jack MOST probably like to be friends with?</b>`,
options:[
"Tom, who often forgets his promises and tells lies.",
"Lucy, who is cheerful, honest and always keeps her promises.",
"Mike, who never shares anything with his friends.",
"Ben, who enjoys making fun of his classmates."
],
answer:1,
explanation:"Lucy has all the qualities Jack is looking for in a friend."
},

{
type:"Reading",
q:`<b>Complete the dialogue.</b>

<br><br>

Kevin: Would you like to come to my birthday party on Friday?<br>
Anna: _________. What time does it start?

<br><br>

<b>Which option completes the dialogue?</b>`,
options:[
"I'm afraid I can't. I have another plan.",
"That sounds great! I'd love to come.",
"I'm not interested in birthday parties.",
"Sorry, I don't know."
],
answer:1,
explanation:"Anna asks about the starting time, so she accepts the invitation."
},

{
type:"Reading",
q:`<b>Read the information.</b>

<br><br>

★ Sarah always listens to her friends carefully.<br>
★ She helps them when they have problems.<br>
★ She never shares their secrets.<br>
★ Everyone enjoys spending time with her.

<br><br>

<b>Which of the following BEST describes Sarah?</b>`,
options:[
"Selfish",
"Reliable",
"Lazy",
"Impolite"
],
answer:1,
explanation:"Sarah is supportive, trustworthy and dependable, so she is a reliable friend."
},

];

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

    wrongQuestions.push({

        question:q.q,

        correct:q.options[q.answer],

        explanation:q.explanation

    });

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


        testName: "Unıt 1 Questions",
        correct: score,
        wrong: wrong,
        net: (score - wrong/3).toFixed(2),
        percent: Math.round(score/questions.length*100),
        date: new Date().toLocaleDateString("en-GB"),
        challenge: sessionStorage.getItem("activeChallenge") || null
    };

    await saveToFirebase(result);
    
        await addTestXP(result.percent);

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