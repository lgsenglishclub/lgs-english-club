import { auth, db } from "../../firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ===============================
// ELEMENTS
// ===============================

const chatContainer =
    document.getElementById("chatContainer");

const chatInput =
    document.getElementById("chatInput");

const sendBtn =
    document.getElementById("sendBtn");

const quickActions =
    document.querySelectorAll(".quick-action");


// ===============================
// USER AVATAR
// ===============================

let currentUserAvatar = null;

let currentUserInitial = "👤";


// ===============================
// CHAT MEMORY
// ===============================

const CHAT_STORAGE_KEY =
    "lexiChatHistory";

let chatHistory =
    JSON.parse(
        sessionStorage.getItem(CHAT_STORAGE_KEY)
    ) || [];


// ===============================
// LOAD USER AVATAR
// ===============================

async function loadUserAvatar(user) {

    try {

        const userRef =
            doc(db, "users", user.uid);

        const snap =
            await getDoc(userRef);

        if (!snap.exists()) return;

        const userData =
            snap.data();


        // PROFILE PHOTO
        if (userData.photoData) {

            currentUserAvatar =
                userData.photoData;

        }


        // INITIAL
        else {

            currentUserInitial =
                (
                    userData.name ||
                    user.email ||
                    "Student"
                )
                .charAt(0)
                .toUpperCase();

        }

    }

    catch (error) {

        console.error(
            "Lexi avatar loading error:",
            error
        );

    }

}


// ===============================
// USER AVATAR HTML
// ===============================

function getUserAvatarHTML() {

    if (currentUserAvatar) {

        return `
            <img
                src="${currentUserAvatar}"
                alt="Your profile"
            >
        `;

    }

    return `
        <span class="user-avatar-initial">
            ${currentUserInitial}
        </span>
    `;

}


// ===============================
// ADD USER MESSAGE
// ===============================

function addUserMessage(
    text,
    save = true
) {

    if (!text || !text.trim()) return;


    const row =
        document.createElement("div");

    row.className =
        "message-row user-message";


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

            ${getUserAvatarHTML()}

        </div>

    `;


    chatContainer.appendChild(row);


    // SAVE
    if (save) {

        chatHistory.push({

            sender: "user",

            text: text

        });

        sessionStorage.setItem(

            CHAT_STORAGE_KEY,

            JSON.stringify(chatHistory)

        );

    }


    scrollToBottom();

}


// ===============================
// ADD LEXI MESSAGE
// ===============================

function addTeacherMessage(
    text,
    save = true
) {

    const row =
        document.createElement("div");

    row.className =
        "message-row teacher-message";


    row.innerHTML = `

        <div class="message-avatar">

            <img
                src="images/lexi1.png"
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


    // SAVE
    if (save) {

        chatHistory.push({

            sender: "teacher",

            text: text

        });

        sessionStorage.setItem(

            CHAT_STORAGE_KEY,

            JSON.stringify(chatHistory)

        );

    }


    scrollToBottom();

}


// ===============================
// LOAD CHAT HISTORY
// ===============================

function loadChatHistory() {

    if (!chatHistory.length) return;


    chatHistory.forEach(message => {

        if (
            message.sender === "user"
        ) {

            addUserMessage(
                message.text,
                false
            );

        }


        else if (
            message.sender === "teacher"
        ) {

            addTeacherMessage(
                message.text,
                false
            );

        }

    });


    setTimeout(() => {

        scrollToBottom();

    }, 100);

}


// ===============================
// SCROLL TO BOTTOM
// ===============================

function scrollToBottom() {

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            chatContainer.scrollTop =
                chatContainer.scrollHeight;

        });

    });

}


// ===============================
// SEND MESSAGE
// ===============================

function sendMessage(text) {

    if (!text || !text.trim()) return;


    addUserMessage(text);

    chatInput.value = "";


    scrollToBottom();


    setTimeout(() => {

        addTeacherMessage(

            "Nice! 😊 Tell me more about that."

        );

        scrollToBottom();

    }, 700);

}


// ===============================
// SEND BUTTON
// ===============================

sendBtn.addEventListener(

    "click",

    () => {

        sendMessage(
            chatInput.value
        );

    }

);


// ===============================
// ENTER
// ===============================

chatInput.addEventListener(

    "keydown",

    event => {

        if (
            event.key === "Enter"
        ) {

            sendMessage(
                chatInput.value
            );

        }

    }

);


// ===============================
// QUICK ACTIONS
// ===============================

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


// ===============================
// VOICE
// ===============================

document
    .getElementById("voiceBtn")
    .addEventListener(

        "click",

        () => {

            addTeacherMessage(

                "🎤 Voice practice will be available soon!"

            );

        }

    );


// ===============================
// AUTH
// ===============================

onAuthStateChanged(

    auth,

    async (user) => {

        if (!user) {

            console.log(
                "Lexi: User not logged in."
            );

            return;

        }


        console.log(
            "Lexi user:",
            user.email
        );


        // Önce profil avatarını yükle
        await loadUserAvatar(user);


        // Sonra eski konuşmaları yükle
        loadChatHistory();

    }

);

// ===============================
// CLEAR CHAT
// ===============================

const clearChatBtn =
    document.getElementById("clearChatBtn");

if (clearChatBtn) {

    clearChatBtn.addEventListener(
        "click",
        () => {

            // Session'daki konuşmayı sil
            sessionStorage.removeItem(
                CHAT_STORAGE_KEY
            );

            // JavaScript hafızasını temizle
            chatHistory = [];

            // İlk Lexi mesajı hariç
            // bütün konuşmaları sil
            const messages =
                chatContainer.querySelectorAll(
                    ".message-row"
                );

            messages.forEach(message => {

                if (
                    message.id !==
                    "lexiWelcomeMessage"
                ) {

                    message.remove();

                }

            });

            // En üste dön
            chatContainer.scrollTop = 0;

        }
    );

}