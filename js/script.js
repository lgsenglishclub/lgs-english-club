import { auth } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

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

    let completed = sessionStorage.getItem("challengeCompleted");


    if(completed === today){

        challengeResult.innerHTML = "✅ You already completed today's challenge!";

        challengeResult.style.color = "orange";

        return;

    }


    let currentUser =
sessionStorage.getItem("currentUser");


let users =
JSON.parse(sessionStorage.getItem("users")) || {};


if(users[currentUser]){

    users[currentUser].score =
    Number(users[currentUser].score || 0) + 10;


    sessionStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}


    sessionStorage.setItem("challengeCompleted", today);


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
Number(sessionStorage.getItem("successRate")) || 0;


const certificateSuccess = document.getElementById("certificateSuccess");

if(certificateSuccess){

    certificateSuccess.innerHTML = success + "%";

}

// DAILY QUESTION SYSTEM

let todayQuestions =
Number(sessionStorage.getItem("todayQuestions")) || 0;


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

    const membership = sessionStorage.getItem("membership");

    if (membership === "premium") {

    const planBadge = document.querySelector(".plan-badge");
    const membershipText = document.querySelector(".membership-text");
    const premiumBtn = document.querySelector(".premium-btn");

    if (planBadge) {
        planBadge.innerHTML = "👑 PREMIUM MEMBER";
        planBadge.classList.remove("free");
        planBadge.style.background = "#FFD54F";
        planBadge.style.color = "#7a4f00";
    }

    if (membershipText) {
        membershipText.innerHTML =
        "Thank you for supporting❤️";
    }

    if (premiumBtn) {
        premiumBtn.style.display = "none";
    }

}

});

const premiumBtn = document.getElementById("premiumBtn");

if (premiumBtn) {
    premiumBtn.addEventListener("click", () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = "pages/premium.html";
            } else {
                alert("Please Log in first to upgrade to Premium.");
            }
        }, { once: true });
    });
}