// SES ÖZELLİĞİ

function speak(word){

    let speech = new SpeechSynthesisUtterance();

    speech.text = word;

    speech.lang = "en-US";

    speech.rate = 0.8;

    window.speechSynthesis.speak(speech);

}



// PUAN SİSTEMİ

let score = sessionStorage.getItem("score") || 0;



function updateScoreDisplay(){

    let scoreElement = document.getElementById("score");

    if(scoreElement){

        scoreElement.innerHTML = score;

    }


    let profileScore = document.getElementById("profileScore");

    if(profileScore){

        profileScore.innerHTML = score;

    }

}

// XP

let xp = Number(sessionStorage.getItem("score")) || 0;

let games =
Number(sessionStorage.getItem("gamesPlayed")) || 0;


let gameStats = document.getElementById("gameStats");

if(gameStats){

    gameStats.innerHTML = games;

}


// QUIZ KONTROLÜ

function checkAnswer(correct){


    let result = document.getElementById("result");


    if(correct){


        score = Number(score) + 10;


        sessionStorage.setItem("score", score);



        if(document.getElementById("score")){

            document.getElementById("score").innerHTML = score;

        }



        result.innerHTML = "🎉 Correct! +10 Points";


        result.style.color = "green";


    }


    else{


        result.innerHTML = "❌ Try Again";


        result.style.color = "red";


    }

}



function gameAnswer(correct){


let result = document.getElementById("gameResult");


if(correct){


result.innerHTML="🎉 Correct! +5 XP";


let score = Number(sessionStorage.getItem("score")) || 0;


score = score + 5;


sessionStorage.setItem("score", score);


}

else{


result.innerHTML="❌ Try Again";


}


}

document.addEventListener("DOMContentLoaded", function(){

    updateScoreDisplay();

});


// DAILY LGS VOCABULARY


window.addEventListener("DOMContentLoaded", function(){

});

// LGS COUNTDOWN

let examDate = new Date("2027-06-01");


let today = new Date();


let timeLeft = examDate - today;


let daysLeft = Math.ceil(
timeLeft / (1000 * 60 * 60 * 24)
);


let lgsDays =
document.getElementById("lgsDays");


if(lgsDays){

    lgsDays.innerHTML = daysLeft;

}