import { auth, db } from "../../firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";

const chatContainer =
    document.getElementById("chatContainer");

const chatInput =
    document.getElementById("chatInput");

const sendBtn =
    document.getElementById("sendBtn");

const quickActions =
    document.querySelectorAll(".quick-action");

    let currentUserAvatar = null;
let currentUserInitial = "👤";


async function loadUserAvatar(user) {

    try {

        const userRef =
            doc(db, "users", user.uid);

        const snap =
            await getDoc(userRef);

        if (!snap.exists()) return;

        const userData =
            snap.data();

        // Profil fotoğrafı varsa
        if (userData.photoData) {

            currentUserAvatar =
                userData.photoData;

        }

        // Fotoğraf yoksa isimden baş harf
        else {

            currentUserInitial =
                (userData.name || user.email || "Student")
                    .charAt(0)
                    .toUpperCase();

        }

    } catch (error) {

        console.error(
            "Lexi avatar loading error:",
            error
        );

    }

}


function addUserMessage(text) {

    const row =
        document.createElement("div");

    row.className =
        "message-row user-message";


    let avatarHTML;


    // Profil fotoğrafı varsa
    if (currentUserAvatar) {

        avatarHTML = `

            <img
                src="${currentUserAvatar}"
                alt="Your profile"
            >

        `;

    }

    // Profil fotoğrafı yoksa baş harf
    else {

        avatarHTML = `

            <span class="user-avatar-initial">
                ${currentUserInitial}
            </span>

        `;

    }


    row.innerHTML = `

        <div>

            <div class="message-name">
                You
            </div>

            <div class="chat-bubble user-bubble">
                ${text}
            </div>

        </div>


        <div class="message-avatar user-avatar">

            ${avatarHTML}

        </div>

    `;


    chatContainer.appendChild(row);

    scrollToBottom();

}


function addTeacherMessage(text) {

    const row =
        document.createElement("div");

    row.className =
        "message-row teacher-message";

    row.innerHTML = `

        <div class="message-avatar">

            <img
                src="images/lexi.png"
                alt="Lexi"
            >

        </div>

        <div>

            <div class="message-name">
                Lexi
            </div>

            <div class="chat-bubble teacher-bubble">
                ${text}
            </div>

        </div>

    `;

    chatContainer.appendChild(row);

    scrollToBottom();
}


function scrollToBottom() {

    chatContainer.scrollTo({

        top: chatContainer.scrollHeight,

        behavior: "smooth"

    });

}


function sendMessage(text) {

    if (!text || !text.trim()) return;

    addUserMessage(text);

    chatInput.value = "";

    setTimeout(() => {

        addTeacherMessage(
            "Nice! 😊 Tell me more about that."
        );

    }, 700);

}


sendBtn.addEventListener(
    "click",
    () => sendMessage(chatInput.value)
);


chatInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            sendMessage(chatInput.value);

        }

    }
);


quickActions.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const message =
                button.dataset.message;

            sendMessage(message);

        }
    );

});


document
    .getElementById("voiceBtn")
    .addEventListener("click", () => {

        addTeacherMessage(
            "🎤 Voice practice will be available soon!"
        );

    });


onAuthStateChanged(auth, async (user) => {

    if (!user) {

        console.log("Lexi: User not logged in.");

        return;

    }

    console.log(
        "Lexi user:",
        user.email
    );

    await loadUserAvatar(user);

});