import { auth, db } from "../firebase.js";

import { 
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


import {
updatePassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


const recentTests =
JSON.parse(localStorage.getItem("recentTests")) || [

];

const weeklyPlan = {

    Monday: [
    {
        time: "14:30 - 15:30",
        task: "Türkçe"
    },
    {
        time: "15:30 - 15:45",
        task: "Mola"
    },
    {
        time: "15:45 - 16:45",
        task: "Fen Bİlimleri"
    },
    {
        time: "16:45 - 17:00",
        task: "Mola"
    },
    {
        time: "17:00 - 18:00",
        task: "İngilizce"
    },
    {
        time: "18:00 - 19:15",
        task: "Akşam Yemeği"
    },
    {
        time: "19:15 - 20:15",
        task: "Soru Çözümü"
    },
    {
        time: "20:30 - 21:00",
        task: "Kitap Okuma"
    }
],

    Tuesday: [
    {
        time: "14:30 - 15:30",
        task: "Matematik"
    },
    {
        time: "15:30 - 15:45",
        task: "Mola"
    },
    {
        time: "15:45 - 16:45",
        task: "Sosyal Bilgiler"
    },
    {
        time: "16:45 - 17:00",
        task: "Mola"
    },
    {
        time: "17:00 - 18:00",
        task: "Din Kültürü"
    },
    {
        time: "18:00 - 19:15",
        task: "Akşam Yemeği"
    },
    {
        time: "19:15 - 20:15",
        task: "Soru Çözümü"
    },
    {
        time: "20:30 - 21:00",
        task: "Kitap Okuma"
    }
],

    Wednesday: [
    {
        time: "14:30 - 15:30",
        task: "Fen Bİlimleri"
    },
    {
        time: "15:30 - 15:45",
        task: "Mola"
    },
    {
        time: "15:45 - 16:45",
        task: "Türkçe"
    },
    {
        time: "16:45 - 17:00",
        task: "Mola"
    },
    {
        time: "17:00 - 18:00",
        task: "İngilizce"
    },
    {
        time: "18:00 - 19:15",
        task: "Akşam Yemeği"
    },
    {
        time: "19:15 - 20:15",
        task: "Soru Çözümü"
    },
    {
        time: "20:30 - 21:00",
        task: "Kitap Okuma"
    }
],

    Thursday: [
    {
        time: "14:30 - 15:30",
        task: "Sosyal Bilgiler"
    },
    {
        time: "15:30 - 15:45",
        task: "Mola"
    },
    {
        time: "15:45 - 16:45",
        task: "Matematik"
    },
    {
        time: "16:45 - 17:00",
        task: "Mola"
    },
    {
        time: "17:00 - 18:00",
        task: "Din Kültürü"
    },
    {
        time: "18:00 - 19:15",
        task: "Akşam Yemeği"
    },
    {
        time: "19:15 - 20:15",
        task: "Soru Çözümü"
    },
    {
        time: "20:30 - 21:00",
        task: "Kitap Okuma"
    }
],

    Friday: [
    {
        time: "14:30 - 15:30",
        task: "Türkçe"
    },
    {
        time: "15:30 - 15:45",
        task: "Mola"
    },
    {
        time: "15:45 - 16:45",
        task: "Fen Bİlimleri"
    },
    {
        time: "16:45 - 17:00",
        task: "Mola"
    },
    {
        time: "17:00 - 18:00",
        task: "İngilizce"
    },
    {
        time: "18:00 - 19:15",
        task: "Akşam Yemeği"
    },
    {
        time: "19:15 - 20:15",
        task: "Soru Çözümü"
    },
    {
        time: "20:30 - 21:00",
        task: "Kitap Okuma"
    }
],

    Saturday: [
    {
        time: "13:00 - 14:00",
        task: "Matematik"
    },
    {
        time: "14:00 - 14:30",
        task: "Mola"
    },
    {
        time: "14:30 - 15:30",
        task: "Sosyal Bilimler"
    },
    {
        time: "15:30 - 16:00",
        task: "Mola"
    },
    {
        time: "16:00 - 17:00",
        task: "Din Kültürü"
    },
    {
        time: "17:00 - 19:00",
        task: "Akşam Yemeği"
    },
    {
        time: "19:00 - 20:00",
        task: "Soru Çözümü"
    },
    {
        time: "20:15 - 20:45",
        task: "Kitap Okuma"
    }
    
],

    Sunday: [
    {
        time: "13:00 - 14:15",
        task: "Sözel Bölüm"
    },
    {
        time: "14:40 - 16:00",
        task: "Sayısal Bölüm"
    },
    {
        time: "16:00 - 17:00",
        task: "Deneme kontrolü"
    },
    {
        time: "17:00 - 19:00",
        task: "Akşam Yemeği"
    },
    {
        time: "19:00 - 20:00",
        task: "Genel tekrar"
    },
    {
        time: "20:15 - 20:45",
        task: "Kitap Okuma"
    }
    
],

};

const dayNames = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday"
};

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const today = days[new Date().getDay()];

const recentContainer = document.getElementById("recentTests");

if (recentContainer) {
    recentContainer.innerHTML = recentTests.map(test => `
        <div class="test-card">

            <h3>
                <i class="fa-solid fa-file-lines"></i>
                ${test.testName}
            </h3>

            <div class="test-percent">
                ${test.percent}%
            </div>

            <div class="test-detail correct-detail">
                <span>✅ Correct</span>
                <strong>${test.correct}</strong>
            </div>

            <div class="test-detail wrong-detail">
                <span>❌ Wrong</span>
                <strong>${test.wrong}</strong>
            </div>

            <div class="test-detail net-detail">
                <span>🎯 Net</span>
                <strong>${test.net}</strong>
            </div>

            <div class="test-date">
                ${test.date}
            </div>

        </div>
    `).join("");
}

const studyContainer = document.getElementById("studyPlan");

if (studyContainer) {

    for (let day in weeklyPlan) {

        let badge = "";

        if (day === today) {
            badge = `<span class="today-badge">📍TODAY</span>`;
        }

        let cardClass = "day-card weekday";
        let title = `📆 ${dayNames[day]}`;

        if (day === "Saturday") {
            cardClass = "day-card review-day";
            title = "📆 Saturday";
        }

        if (day === "Sunday") {
            cardClass = "day-card exam-day";
            title = "📝 Sunday";
        }

        let html = `
<div class="${cardClass}">
    <div class="day-header">
        <h3>${title}</h3>
        ${badge}
    </div>
`;

        weeklyPlan[day].forEach(item => {
            html += `
<label class="plan-item">
    <span class="plan-time">${item.time}</span>
    <span class="plan-task">${item.task}</span>
</label>
`;
        });

        html += "</div>";

        studyContainer.innerHTML += html;
    }
}

const printBtn = document.getElementById("printResultsBtn");

if (printBtn) {
    printBtn.addEventListener("click", () => {
        window.print();
    });
}

const membership =
localStorage.getItem("membership");


const membershipStatus =
document.getElementById("membershipStatus");


if(membership === "premium"){

    membershipStatus.innerHTML =
    "👑 PREMIUM MEMBER";

}

else{

    if(membershipStatus){

        membershipStatus.innerHTML =
        "🟢 FREE MEMBER";

    }

}

// ACCOUNT SETTINGS

const saveSettings = document.getElementById("saveSettings");


if(saveSettings){

    saveSettings.addEventListener("click", async()=>{


        const user = auth.currentUser;


        if(!user) return;



        const newName =
        document.getElementById("newUsername").value;


        const newPassword =
        document.getElementById("newPassword").value;



        try{


            // Kullanıcı adı güncelleme

            if(newName){

                await updateDoc(
                    doc(db,"users",user.uid),
                    {
                        name:newName
                    }
                );

            }



            // Şifre güncelleme

            if(newPassword){

                if(newPassword.length < 6){

                    alert("Password must be at least 6 characters");
                    return;

                }


                await updatePassword(
                    user,
                    newPassword
                );

            }



            document.getElementById("settingsMessage").innerHTML =
            "✅ Settings updated";


        }
        catch(error){

            document.getElementById("settingsMessage").innerHTML =
            error.message;

        }


    });

}

const modal = document.getElementById("settingsModal");

const openBtn = document.getElementById("openSettings");

const closeBtn = document.getElementById("closeSettings");



openBtn.onclick = ()=>{

    modal.style.display="flex";

};



closeBtn.onclick = ()=>{

    modal.style.display="none";

};



document.getElementById("saveSettings")
.addEventListener("click", async()=>{


const user = auth.currentUser;


const newName =
document.getElementById("newUsername").value;


const newPassword =
document.getElementById("newPassword").value;



try{


if(newName.trim() !== ""){

    await updateDoc(
        doc(db,"users",user.uid),
        {
            name:newName
        }
    );

}



if(newPassword.trim() !== ""){

    if(newPassword.length < 6){

        alert("Password must be at least 6 characters");
        return;

    }


    await updatePassword(
        user,
        newPassword
    );

}


document.getElementById("settingsMessage").innerHTML =
"✅ Settings updated";


}
catch(error){

document.getElementById("settingsMessage").innerHTML =
error.message;

}

});

document.addEventListener("DOMContentLoaded", () => {

    const openBtn = document.getElementById("openSettings");
    const modal = document.getElementById("settingsModal");
    const closeBtn = document.getElementById("closeSettings");


    console.log("Settings kontrol edildi:", openBtn, modal);


    if(openBtn){

        openBtn.addEventListener("click", () => {

            modal.style.display = "flex";

        });

    }


    if(closeBtn){

        closeBtn.addEventListener("click", () => {

            modal.style.display = "none";

        });

    }

});