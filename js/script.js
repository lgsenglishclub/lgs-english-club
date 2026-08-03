const button = document.getElementById("startButton");

if(button){

button.addEventListener("click", function(){

    alert("Welcome to English School!");

});

}

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCounter,20);

        }else{

            counter.innerText = target;

        }

    };

    updateCounter();

});

// DAILY CHALLENGE

function completeChallenge(){

    let challengeResult = document.getElementById("challengeResult");

    let today = new Date().toDateString();

    let completed = localStorage.getItem("challengeCompleted");


    if(completed === today){

        challengeResult.innerHTML = "✅ You already completed today's challenge!";

        challengeResult.style.color = "orange";

        return;

    }


    let currentUser =
localStorage.getItem("currentUser");


let users =
JSON.parse(localStorage.getItem("users")) || {};


if(users[currentUser]){

    users[currentUser].score =
    Number(users[currentUser].score || 0) + 10;


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


    localStorage.setItem("challengeCompleted", today);


    challengeResult.innerHTML = "🎉 Challenge Completed! +10 XP";


    challengeResult.style.color = "lime";


    updateScoreDisplay();


}

// WORD QUESTION

function wordAnswer(correct){

    let result = document.getElementById("wordResult");


    if(correct){

        result.innerHTML = "🎉 Correct! Apple is a fruit.";

        result.style.color = "green";


    }

    else{

        result.innerHTML = "❌ Try again!";

        result.style.color = "red";

    }

}

let success =
Number(localStorage.getItem("successRate")) || 0;


const certificateSuccess = document.getElementById("certificateSuccess");

if(certificateSuccess){

    certificateSuccess.innerHTML = success + "%";

}

// DAILY QUESTION SYSTEM

let todayQuestions =
Number(localStorage.getItem("todayQuestions")) || 0;


let dailyGoal = 20;


const todayQuestionsElement = document.getElementById("todayQuestions");

if(todayQuestionsElement){

    todayQuestionsElement.innerHTML = todayQuestions;

}


const dailyGoalElement = document.getElementById("dailyGoal");

if(dailyGoalElement){

    dailyGoalElement.innerHTML = dailyGoal;

}

document.addEventListener("DOMContentLoaded", () => {

    const membership = localStorage.getItem("membership");

    if (membership === "premium") {

        document.querySelector(".plan-badge").innerHTML =
        "👑 PREMIUM MEMBER";

        document.querySelector(".plan-badge").classList.remove("free");

        document.querySelector(".plan-badge").style.background = "#FFD54F";

        document.querySelector(".plan-badge").style.color = "#7a4f00";

        document.querySelector(".membership-text").innerHTML =
        "Thank you for supporting LGS English Club ❤️";

        document.querySelector(".premium-btn").style.display = "none";
    }

});