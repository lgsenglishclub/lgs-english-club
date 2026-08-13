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

const chatHistoryList =
    document.getElementById("chatHistoryList");

const newChatBtn =
    document.getElementById("newChatBtn");

const clearChatBtn =
    document.getElementById("clearChatBtn");


// ===============================
// USER AVATAR
// ===============================

let currentUserAvatar = null;

let currentUserInitial = "👤";


// ===============================
// CHAT SYSTEM
// ===============================

const CHAT_STORAGE_KEY =
    "lexiConversations";

const MAX_CHATS = 10;


// Bütün sohbetler

let conversations =
    JSON.parse(
        localStorage.getItem(CHAT_STORAGE_KEY)
    ) || [];


// Şu anda açık olan sohbet

let currentConversationId = null;


// ===============================
// SAVE CONVERSATIONS
// ===============================

function saveConversations() {

    localStorage.setItem(
        CHAT_STORAGE_KEY,
        JSON.stringify(conversations)
    );

}


// ===============================
// CREATE CHAT ID
// ===============================

function createChatId() {

    return (
        Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2, 8)
    );

}


// ===============================
// CREATE NEW CONVERSATION
// ===============================

function createNewConversation() {

    const conversation = {

        id: createChatId(),

        title: "New Conversation",

        createdAt: Date.now(),

        updatedAt: Date.now(),

        messages: []

    };


    conversations.unshift(
        conversation
    );


    // En fazla 10 sohbet

    conversations =
        conversations.slice(0, MAX_CHATS);


    currentConversationId =
        conversation.id;


    saveConversations();

    renderChatHistory();

}


// ===============================
// GET CURRENT CONVERSATION
// ===============================

function getCurrentConversation() {

    return conversations.find(
        conversation =>
            conversation.id ===
            currentConversationId
    );

}


// ===============================
// GENERATE CHAT TITLE
// ===============================

function generateChatTitle(text) {

    if (!text) {
        return "New Conversation";
    }


    let title =
        text
            .replace(/\s+/g, " ")
            .trim();


    // Soru işareti vb. temizle

    title =
        title.replace(
            /[.!?]+$/,
            ""
        );


    // Çok uzunsa kısalt

    if (title.length > 34) {

        title =
            title.substring(0, 34)
                .trim() + "...";

    }


    return title || "New Conversation";

}


// ===============================
// FORMAT DATE
// ===============================

function formatChatDate(timestamp) {

    const date =
        new Date(timestamp);

    const now =
        new Date();


    const isToday =
        date.toDateString() ===
        now.toDateString();


    if (isToday) {

        return (
            "Today · " +
            date.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            )
        );

    }


    const yesterday =
        new Date();

    yesterday.setDate(
        yesterday.getDate() - 1
    );


    if (
        date.toDateString() ===
        yesterday.toDateString()
    ) {

        return "Yesterday";

    }


    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric"
        }
    );

}


// ===============================
// RENDER CHAT HISTORY
// ===============================

function renderChatHistory() {

    if (!chatHistoryList) return;


    chatHistoryList.innerHTML = "";


    if (!conversations.length) {

        const empty =
            document.createElement("div");

        empty.className =
            "chat-history-empty";

        empty.innerHTML = `
            <i class="fa-regular fa-comments"></i>

            <span>
                Your recent chats<br>
                will appear here.
            </span>
        `;

        chatHistoryList.appendChild(
            empty
        );

        return;

    }

    conversations.forEach(conversation => {

    const item = document.createElement("div");

    item.className = "chat-history-item";

    if (conversation.id === currentConversationId) {
        item.classList.add("active");
    }

    item.innerHTML = `

        <div class="chat-history-main">

            <div class="chat-history-title">

                <span class="chat-history-icon">
                    <i class="fa-regular fa-message"></i>
                </span>

                <span class="chat-history-title-text">
                    ${escapeHTML(conversation.title)}
                </span>

            </div>

            <div class="chat-history-date">
                ${formatChatDate(conversation.updatedAt)}
            </div>

        </div>


        <button
            class="chat-history-menu"
            title="More options"
            type="button"
        >
            <i class="fa-solid fa-ellipsis"></i>
        </button>


        <div class="chat-history-dropdown">

            <button
                class="rename-chat-btn"
                type="button"
            >
                <i class="fa-solid fa-pen"></i>
                Rename
            </button>

            <button
                class="delete-chat-btn"
                type="button"
            >
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>

        </div>

    `;


    // ===============================
    // OPEN CHAT
    // ===============================

    item
        .querySelector(".chat-history-main")
        .addEventListener(
            "click",
            () => {

                loadConversation(
                    conversation.id
                );

            }
        );


    // ===============================
    // MENU
    // ===============================

    const menuBtn =
        item.querySelector(
            ".chat-history-menu"
        );

    const dropdown =
        item.querySelector(
            ".chat-history-dropdown"
        );


    menuBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        // Diğer menüleri kapat

        document
            .querySelectorAll(
                ".chat-history-dropdown"
            )
            .forEach(menu => {

                if (menu !== dropdown) {

                    menu.classList.remove("show");

                    menu.style.top = "";
                    menu.style.left = "";
                }

            });


        const isOpen =
            dropdown.classList.contains("show");


        if (isOpen) {

            dropdown.classList.remove("show");

            dropdown.style.top = "";
            dropdown.style.left = "";

            return;

        }


        // Menüyü aç

        dropdown.classList.add("show");


        // Mobilde gerçek ekran konumunu hesapla

        if (window.innerWidth <= 600) {

            const rect =
                menuBtn.getBoundingClientRect();

            const menuWidth = 125;

            let left =
                rect.right - menuWidth;

            let top =
                rect.bottom + 5;


            // Sağdan taşmasını engelle

            if (
                left + menuWidth >
                window.innerWidth - 8
            ) {

                left =
                    window.innerWidth -
                    menuWidth -
                    8;

            }


            // Soldan taşmasını engelle

            if (left < 8) {

                left = 8;

            }


            // Alttan taşarsa yukarı aç

            const estimatedHeight = 80;

            if (
                top + estimatedHeight >
                window.innerHeight - 8
            ) {

                top =
                    rect.top -
                    estimatedHeight -
                    5;

            }


            dropdown.style.top =
                `${top}px`;

            dropdown.style.left =
                `${left}px`;

        }

    }
);


// ===============================
// RENAME
// ===============================

item
    .querySelector(".rename-chat-btn")
    .addEventListener(
        "click",
        event => {

            event.stopPropagation();

            // Menüyü hemen kapat
            const dropdown =
                item.querySelector(
                    ".chat-history-dropdown"
                );

            if (dropdown) {
                dropdown.classList.remove("show");
            }

            const titleText =
                item.querySelector(
                    ".chat-history-title-text"
                );

            if (!titleText) return;

            const oldTitle =
                conversation.title;

            const input =
                document.createElement("input");

            input.type = "text";
            input.value = oldTitle;

            input.className =
                "chat-history-rename-input";

            titleText.replaceWith(input);

            input.focus();
            input.select();


            // ===============================
            // SAVE RENAME
            // ===============================

            function saveRename() {

                const newTitle =
                    input.value.trim();

                conversation.title =
                    newTitle || oldTitle;

                conversation.updatedAt =
                    Date.now();

                saveConversations();

                renderChatHistory();

            }


            // ===============================
            // ENTER / ESCAPE
            // ===============================

            input.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        saveRename();

                    }

                    if (
                        event.key === "Escape"
                    ) {

                        event.preventDefault();

                        renderChatHistory();

                    }

                }
            );


            // ===============================
            // CLICK OUTSIDE
            // ===============================

            input.addEventListener(
                "blur",
                () => {

                    saveRename();

                }
            );

        }
    );


    // ===============================
// DELETE
// ===============================

item
    .querySelector(".delete-chat-btn")
    .addEventListener(
        "click",
        event => {

            event.stopPropagation();

            conversations =
                conversations.filter(
                    chat =>
                        chat.id !==
                        conversation.id
                );

            saveConversations();

            // Eğer aktif sohbet silindiyse
            if (
                currentConversationId ===
                conversation.id
            ) {

                currentConversationId =
                    null;

                clearChatScreen();
            }

            renderChatHistory();

        }
    );


    chatHistoryList.appendChild(
        item
    );

});

}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


// ===============================
// SAVE MESSAGE TO CURRENT CHAT
// ===============================

function saveMessage(
    sender,
    text
) {

    let conversation =
        getCurrentConversation();


    // Eğer henüz sohbet yoksa
    // otomatik oluştur

    if (!conversation) {

        createNewConversation();

        conversation =
            getCurrentConversation();

    }


    conversation.messages.push({

        sender: sender,

        text: text,

        timestamp: Date.now()

    });


    conversation.updatedAt =
        Date.now();


    // İlk kullanıcı mesajı
    // sohbet başlığı olur

    if (
        sender === "user" &&
        (
            !conversation.title ||
            conversation.title ===
            "New Conversation"
        )
    ) {

        conversation.title =
            generateChatTitle(text);

    }


    // Güncel sohbeti en üste taşı

    conversations =
        conversations.filter(
            item =>
                item.id !==
                conversation.id
        );


    conversations.unshift(
        conversation
    );


    // Son 10 sohbet

    conversations =
        conversations.slice(
            0,
            MAX_CHATS
        );


    saveConversations();

    renderChatHistory();

}


// ===============================
// CLEAR CHAT SCREEN
// ===============================

function clearChatScreen() {

    if (!chatContainer) return;


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


    // Quick actions tekrar görünsün

    const quickActionsElement =
        chatContainer.querySelector(
            ".quick-actions"
        );


    if (
        quickActionsElement &&
        !chatContainer.contains(
            quickActionsElement
        )
    ) {

        chatContainer.appendChild(
            quickActionsElement
        );

    }


    chatContainer.scrollTop = 0;

}


// ===============================
// LOAD CONVERSATION
// ===============================

function loadConversation(
    conversationId
) {

    const conversation =
        conversations.find(
            item =>
                item.id ===
                conversationId
        );


    if (!conversation) return;


    currentConversationId =
        conversation.id;


    clearChatScreen();


    conversation.messages.forEach(
        message => {

            if (
                message.sender ===
                "user"
            ) {

                addUserMessage(
                    message.text,
                    false
                );

            }

            else if (
                message.sender ===
                "teacher"
            ) {

                addTeacherMessage(
                    message.text,
                    false
                );

            }

        }
    );


    renderChatHistory();


    setTimeout(() => {

        scrollToBottom();

    }, 100);

}


// ===============================
// START EMPTY CHAT
// ===============================

function startNewChat() {

    currentConversationId = null;


    clearChatScreen();


    renderChatHistory();


    if (chatInput) {

        chatInput.value = "";

        chatInput.focus();

    }

}


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


        if (userData.photoData) {

            currentUserAvatar =
                userData.photoData;

        }

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
            ${escapeHTML(
                currentUserInitial
            )}
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

                ${escapeHTML(text)}

            </div>

        </div>


        <div class="message-avatar user-avatar">

            ${getUserAvatarHTML()}

        </div>

    `;


    chatContainer.appendChild(
        row
    );


    if (save) {

        saveMessage(
            "user",
            text
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


    chatContainer.appendChild(
        row
    );


    if (save) {

        saveMessage(
            "teacher",
            text
        );

    }


    scrollToBottom();

}


// ===============================
// SCROLL
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


    const cleanText =
        text.trim();


    // İlk mesajsa yeni sohbet oluştur

    if (!currentConversationId) {

        createNewConversation();

    }


    addUserMessage(
        cleanText
    );


    chatInput.value = "";


    setTimeout(() => {

        addTeacherMessage(

            "Nice! 😊 Tell me more about that."

        );

    }, 700);

}


// ===============================
// SEND BUTTON
// ===============================

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        () => {

            sendMessage(
                chatInput.value
            );

        }
    );

}


// ===============================
// ENTER
// ===============================

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                sendMessage(
                    chatInput.value
                );

            }

        }
    );

}


// ===============================
// QUICK ACTIONS
// ===============================

quickActions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const message =
                    button.dataset.message;

                sendMessage(
                    message
                );

            }
        );

    }
);


// ===============================
// VOICE
// ===============================

const voiceBtn =
    document.getElementById(
        "voiceBtn"
    );


if (voiceBtn) {

    voiceBtn.addEventListener(
        "click",
        () => {

            if (!currentConversationId) {

                createNewConversation();

            }


            addTeacherMessage(

                "🎤 Voice practice will be available soon!"

            );

        }
    );

}


// ===============================
// NEW CHAT
// ===============================

if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        () => {

            startNewChat();

        }
    );

}


// ===============================
// CLEAR CURRENT CHAT
// ===============================

if (clearChatBtn) {

    clearChatBtn.addEventListener(
        "click",
        () => {

            if (
                !currentConversationId
            ) {

                clearChatScreen();

                return;

            }


            conversations =
                conversations.filter(
                    conversation =>
                        conversation.id !==
                        currentConversationId
                );


            saveConversations();


            currentConversationId =
                null;


            clearChatScreen();


            renderChatHistory();

        }
    );

}


// ===============================
// AUTH
// ===============================

onAuthStateChanged(
    auth,
    async user => {

        if (!user) {

            console.log(
                "Lexi: User not logged in."
            );

            renderChatHistory();

            return;

        }


        console.log(
            "Lexi user:",
            user.email
        );


        await loadUserAvatar(user);


        renderChatHistory();


        // Sayfa açıldığında son sohbeti
        // otomatik olarak aç

        if (
            conversations.length &&
            !currentConversationId
        ) {

            loadConversation(
                conversations[0].id
            );

        }

    }
);