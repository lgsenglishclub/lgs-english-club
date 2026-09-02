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

const CURRENT_CHAT_KEY =
    "lexiCurrentConversationId";

const CHAT_PAGE_SESSION_KEY =
    "lexiChatPageSession";


// ===============================
// SEND LOCK
// ===============================

// Aynı anda iki API isteğinin
// gönderilmesini engeller.

let isSending = false;


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


    conversations =
        conversations.slice(
            0,
            MAX_CHATS
        );


    currentConversationId =
        conversation.id;


    // ===============================
    // SAVE ACTIVE CHAT
    // ===============================

    sessionStorage.setItem(
        CURRENT_CHAT_KEY,
        conversation.id
    );


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


    title =
        title.replace(
            /[.!?]+$/,
            ""
        );


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

        const item =
            document.createElement("div");

        item.className =
            "chat-history-item";


        if (
            conversation.id ===
            currentConversationId
        ) {

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


                document
                    .querySelectorAll(
                        ".chat-history-dropdown"
                    )
                    .forEach(menu => {

                        if (menu !== dropdown) {

                            menu.classList.remove(
                                "show"
                            );

                            menu.style.top = "";
                            menu.style.left = "";

                        }

                    });


                const isOpen =
                    dropdown.classList.contains(
                        "show"
                    );


                if (isOpen) {

                    dropdown.classList.remove(
                        "show"
                    );

                    dropdown.style.top = "";
                    dropdown.style.left = "";

                    return;

                }


                dropdown.classList.add(
                    "show"
                );


                // Mobil menü konumu

                if (
                    window.innerWidth <= 600
                ) {

                    const rect =
                        menuBtn.getBoundingClientRect();

                    const menuWidth = 125;

                    let left =
                        rect.right -
                        menuWidth;

                    let top =
                        rect.bottom + 5;


                    if (
                        left + menuWidth >
                        window.innerWidth - 8
                    ) {

                        left =
                            window.innerWidth -
                            menuWidth -
                            8;

                    }


                    if (left < 8) {

                        left = 8;

                    }


                    const estimatedHeight =
                        80;


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


                    dropdown.classList.remove(
                        "show"
                    );


                    const titleText =
                        item.querySelector(
                            ".chat-history-title-text"
                        );


                    if (!titleText) return;


                    const oldTitle =
                        conversation.title;


                    const input =
                        document.createElement(
                            "input"
                        );


                    input.type = "text";

                    input.value =
                        oldTitle;

                    input.className =
                        "chat-history-rename-input";


                    titleText.replaceWith(
                        input
                    );


                    input.focus();

                    input.select();


                    function saveRename() {

                        const newTitle =
                            input.value.trim();


                        conversation.title =
                            newTitle ||
                            oldTitle;


                        conversation.updatedAt =
                            Date.now();


                        saveConversations();

                        renderChatHistory();

                    }


                    input.addEventListener(
                        "keydown",
                        event => {

                            if (
                                event.key ===
                                "Enter"
                            ) {

                                event.preventDefault();

                                saveRename();

                            }


                            if (
                                event.key ===
                                "Escape"
                            ) {

                                event.preventDefault();

                                renderChatHistory();

                            }

                        }
                    );


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
        text ?? "";

    return div.innerHTML;

}


// ===============================
// SAVE MESSAGE
// ===============================

function saveMessage(
    sender,
    text
) {

    let conversation =
        getCurrentConversation();


    if (!conversation) {

        createNewConversation();

        conversation =
            getCurrentConversation();

    }


    if (!conversation) return;


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


    conversations =
        conversations.filter(
            item =>
                item.id !==
                conversation.id
        );


    conversations.unshift(
        conversation
    );


    conversations =
        conversations.slice(
            0,
            MAX_CHATS
        );


    saveConversations();

    renderChatHistory();

}


// ===============================
// IS WELCOME MESSAGE?
// ===============================

function isWelcomeMessage(text) {

    if (!text) return false;


    const clean =
        String(text)
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();


    return (
        clean.startsWith(
            "hi there! 👋 welcome to lgs english club"
        ) ||
        clean.startsWith(
            "hi! i'm lexi"
        )
    );

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

        sessionStorage.setItem(
    CURRENT_CHAT_KEY,
    conversation.id
);


    clearChatScreen();


    conversation.messages.forEach(
        message => {

            // Eski sistemde kaydedilmiş
            // hoş geldin mesajlarını gösterme

            if (
                message.sender ===
                "teacher" &&
                isWelcomeMessage(
                    message.text
                )
            ) {

                return;

            }


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
// START NEW CHAT
// ===============================

function startNewChat() {

    currentConversationId = null;

    sessionStorage.removeItem(
        CURRENT_CHAT_KEY
    );

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
            doc(
                db,
                "users",
                user.uid
            );


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

    if (
        !text ||
        !text.trim()
    ) {

        return;

    }


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
// FORMAT LEXI MESSAGE
// ===============================

function formatLexiMessage(text) {

    if (!text) return "";


    let html =
        escapeHTML(
            String(text)
        );


    // ===============================
    // BOLD
    // **text**
    // ===============================

    html =
        html.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    // ===============================
    // ITALIC
    // *text*
    // ===============================

    html =
        html.replace(
            /(^|[^*])\*([^*\n]+)\*(?!\*)/g,
            "$1<em>$2</em>"
        );


    // ===============================
    // HEADINGS
    // ===============================

    html =
        html.replace(
            /^### (.+)$/gm,
            "<h4>$1</h4>"
        );


    html =
        html.replace(
            /^## (.+)$/gm,
            "<h3>$1</h3>"
        );


    html =
        html.replace(
            /^# (.+)$/gm,
            "<h3>$1</h3>"
        );


    // ===============================
    // BULLET LIST
    // ===============================

    html =
        html.replace(
            /(?:^|\n)((?:[-*] .+(?:\n|$))+)/g,
            function (match, list) {

                const items =
                    list
                        .trim()
                        .split("\n")
                        .map(item => {

                            return `
                                <li>
                                    ${item
                                        .replace(
                                            /^[-*]\s+/,
                                            ""
                                        )
                                        .trim()}
                                </li>
                            `;

                        })
                        .join("");


                return `
                    <ul class="lexi-list">
                        ${items}
                    </ul>
                `;

            }
        );


    // ===============================
    // NUMBERED LIST
    // ===============================

    html =
        html.replace(
            /(?:^|\n)((?:\d+\.\s+.+(?:\n|$))+)/g,
            function (match, list) {

                const items =
                    list
                        .trim()
                        .split("\n")
                        .map(item => {

                            return `
                                <li>
                                    ${item
                                        .replace(
                                            /^\d+\.\s+/,
                                            ""
                                        )
                                        .trim()}
                                </li>
                            `;

                        })
                        .join("");


                return `
                    <ol class="lexi-list">
                        ${items}
                    </ol>
                `;

            }
        );


    // ===============================
    // NEW LINES
    // ===============================

    html =
        html.replace(
            /\n/g,
            "<br>"
        );


    // ===============================
    // CLEAN UP
    // ===============================

    html =
        html.replace(
            /<br>\s*<(ul|ol)/g,
            "<$1"
        );


    html =
        html.replace(
            /<\/(ul|ol)>\s*<br>/g,
            "</$1>"
        );


    return html;

}


// ===============================
// ADD LEXI MESSAGE
// ===============================

function addTeacherMessage(
    text,
    save = true
) {

    if (!text) return;


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

                ${formatLexiMessage(text)}

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

    if (!chatContainer) return;


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

async function sendMessage(text) {

    // ===============================
    // EMPTY MESSAGE
    // ===============================

    if (
        !text ||
        !text.trim()
    ) {

        return;

    }


    // ===============================
    // PREVENT DOUBLE REQUEST
    // ===============================

    if (isSending) {

        return;

    }


    isSending = true;


    const cleanText =
        text.trim();


    // ===============================
    // DISABLE SEND UI
    // ===============================

    if (sendBtn) {

        sendBtn.disabled = true;

    }


    if (chatInput) {

        chatInput.disabled = true;

    }


    try {

        // ===============================
        // CREATE CHAT
        // ===============================

        if (!currentConversationId) {

            createNewConversation();

        }


        // ===============================
        // GET OLD MESSAGES
        // ===============================

        const conversation =
            getCurrentConversation();


        const previousMessages = conversation
    ? conversation.messages
        .filter(message => {
            if (!message) return false;

            if (typeof message.text !== "string") return false;

            if (!message.text.trim()) return false;

            if (message.sender !== "user" && message.sender !== "teacher") {
                return false;
            }

            // Lexi'nin otomatik hoş geldin mesajlarını geçmişe gönderme
            if (
                message.sender === "teacher" &&
                isWelcomeMessage(message.text)
            ) {
                return false;
            }

            return true;
        })
        .slice(-10)
        .map(message => ({
            sender:
                message.sender === "teacher"
                    ? "model"
                    : "user",
            text: message.text.trim()
        }))
    : [];


        // ===============================
        // SHOW USER MESSAGE
        // ===============================

        addUserMessage(
            cleanText
        );


        if (chatInput) {

            chatInput.value = "";

        }


        // ===============================
        // THINKING
        // ===============================

        const thinkingRow =
            document.createElement("div");


        thinkingRow.className =
            "message-row teacher-message lexi-thinking";


        thinkingRow.innerHTML = `

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

                    <span class="lexi-thinking-dots">
                        Lexi is thinking<span>.</span><span>.</span><span>.</span>
                    </span>

                </div>

            </div>

        `;


        chatContainer.appendChild(
            thinkingRow
        );


        scrollToBottom();


        // ===============================
        // FIREBASE FUNCTION
        // ===============================
console.time("Lexi API");
        const response =
            await fetch(
                "https://lexichat-yjr5iecahq-uc.a.run.app",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        message:
                            cleanText,

                        conversation:
                            previousMessages

                    })

                }
            );
            
console.timeEnd("Lexi API");

// ===============================
// READ STREAMING RESPONSE
// ===============================
if (!response.ok) {

    console.error(
        "Lexi API Error:",
        response.status
    );

    let errorMessage =
        "Lexi is temporarily unavailable.";

    try {

        const errorData =
            await response.json();

        if (errorData?.error) {
            errorMessage =
                errorData.error;
        }

    } catch (error) {

        console.error(
            "Error response could not be parsed:",
            error
        );

    }

    if (thinkingRow) {
        thinkingRow.remove();
    }

    addTeacherMessage(
        "Sorry! 😔 " + errorMessage
    );

    return;
}

const reader = response.body.getReader();
const decoder = new TextDecoder("utf-8");

let fullReply = "";

const thinkingBubble =
    thinkingRow.querySelector(".chat-bubble");

if (thinkingBubble) {
    thinkingBubble.innerHTML = "";
}

while (true) {

    const { value, done } =
        await reader.read();

    if (done) {
        break;
    }

    const chunk =
        decoder.decode(value, {
            stream: true
        });

    fullReply += chunk;

    if (thinkingBubble) {

        thinkingBubble.innerHTML =
            formatLexiMessage(fullReply);

    }

    scrollToBottom();
}


        // ===============================
        // REMOVE THINKING
        // ===============================

        if (
            thinkingRow &&
            thinkingRow.parentNode
        ) {

            thinkingRow.remove();

        }


        // ===============================
// API ERROR
// ===============================

if (!response.ok) {

    console.error("================================");
    console.error("LEXI API ERROR");
    console.error("HTTP STATUS:", response.status);
    console.error("ERROR DATA:", data);
    console.error("ERROR MESSAGE:", data?.error);
    console.error(
        "ERROR JSON:",
        JSON.stringify(data, null, 2)
    );
    console.error("================================");


    addTeacherMessage(
        "Sorry! 😔 I couldn't connect right now. Please try again."
    );

    return;
}

        // ===============================
        // SUCCESS
        // ===============================

       if (fullReply.trim()) {

    // Thinking mesajını kaldır
    if (thinkingRow) {
        thinkingRow.remove();
    }

    // Lexi'nin cevabını normal mesaj olarak ekle
    addTeacherMessage(
        fullReply
    );

    // Sesli oku
    speakLexi(
        fullReply
    );

} else {

    console.error(
        "Lexi returned an empty response."
    );

    if (thinkingRow) {
        thinkingRow.remove();
    }

    addTeacherMessage(
        "Sorry! 😔 Lexi couldn't generate a response."
    );
    
    }

    }

    catch (error) {

        console.error(
            "Lexi connection error:",
            error
        );


        const thinkingMessages =
            chatContainer.querySelectorAll(
                ".lexi-thinking"
            );


        thinkingMessages.forEach(
            message => {

                message.remove();

            }
        );


        addTeacherMessage(
            "Sorry! 😔 I couldn't connect to Lexi right now."
        );

    }

    finally {

        // ===============================
        // UNLOCK SEND
        // ===============================

        isSending = false;


        if (sendBtn) {

            sendBtn.disabled = false;

        }


        if (chatInput) {

            chatInput.disabled = false;

            chatInput.focus();

        }

    }

}


// ===============================
// SEND BUTTON
// ===============================

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();


            if (isSending) return;


            sendMessage(
                chatInput
                    ? chatInput.value
                    : ""
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


                if (isSending) return;


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

                if (isSending) return;


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
// LEXI VOICE CHAT
// ===============================

const voiceBtn =
    document.getElementById("voiceBtn");

const voiceLanguageSelect =
    document.getElementById("voiceLanguage");


let voiceRecognition = null;

let isListening = false;

let isLexiSpeaking = false;

let voiceLanguage =
    voiceLanguageSelect
        ? voiceLanguageSelect.value
        : "tr-TR";


if (voiceLanguageSelect) {

    voiceLanguageSelect.addEventListener(
        "change",
        () => {

            voiceLanguage =
                voiceLanguageSelect.value;

        }
    );

}


// ===============================
// SPEECH RECOGNITION
// ===============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


// ===============================
// VOICE STATUS
// ===============================

function setVoiceStatus(status) {

    if (!voiceBtn) return;


    if (status === "listening") {

        voiceBtn.classList.add(
            "voice-listening"
        );

        voiceBtn.innerHTML =
            '<i class="fa-solid fa-stop"></i>';

        voiceBtn.title =
            "Stop listening";

        return;

    }


    voiceBtn.classList.remove(
        "voice-listening"
    );


    voiceBtn.innerHTML =
        '<i class="fa-solid fa-microphone"></i>';

    voiceBtn.title =
        "Talk to Lexi";

}


// ===============================
// START LISTENING
// ===============================

function startListening() {

    if (!SpeechRecognition) {

        addTeacherMessage(
            "Sorry! 😔 Voice input is not supported in this browser. Please use Google Chrome or Microsoft Edge."
        );

        return;

    }


    // ========================================
    // STOP LEXI SPEECH
    // ========================================

    if (isLexiSpeaking) {

        window.speechSynthesis.cancel();

        isLexiSpeaking = false;

    }


    // ========================================
    // ALREADY LISTENING
    // ========================================

    if (isListening) {

        stopListening();

        return;

    }


    // ========================================
    // CREATE RECOGNITION
    // ========================================

    voiceRecognition =
        new SpeechRecognition();


    // ========================================
    // LANGUAGE
    // ========================================

    voiceRecognition.lang =
        voiceLanguage;


    // ========================================
    // IMPORTANT SETTINGS
    // ========================================

    voiceRecognition.continuous =
        true;

    voiceRecognition.interimResults =
        true;

    voiceRecognition.maxAlternatives =
        1;


    // ========================================
    // FULL TRANSCRIPT
    // ========================================

    let finalTranscript = "";

    let interimTranscript = "";


    // ========================================
    // RESULT
    // ========================================

    voiceRecognition.onresult =
        event => {

            interimTranscript = "";


            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {

                const transcript =
                    event.results[i][0]
                        .transcript;


                if (
                    event.results[i].isFinal
                ) {

                    finalTranscript +=
                        transcript + " ";

                }

                else {

                    interimTranscript +=
                        transcript;

                }

            }


            const currentTranscript =
                (
                    finalTranscript +
                    interimTranscript
                )
                    .replace(/\s+/g, " ")
                    .trim();


            console.log(
                "Lexi live transcript:",
                currentTranscript
            );


            if (chatInput) {

                chatInput.value =
                    currentTranscript;

            }


            // ========================================
            // CHECK FINAL RESULT
            // ========================================

            const lastResult =
                event.results[
                    event.results.length - 1
                ];


            if (
                lastResult &&
                lastResult.isFinal
            ) {

                const message =
                    finalTranscript
                        .replace(/\s+/g, " ")
                        .trim();


                console.log(
                    "Lexi final transcript:",
                    message
                );


                if (!message) {

                    return;

                }


                // ========================================
                // STOP RECOGNITION
                // ========================================

                isListening =
                    false;


                setVoiceStatus(
                    "idle"
                );


                try {

                    voiceRecognition.stop();

                }

                catch (error) {

                    console.log(
                        "Recognition already stopped."
                    );

                }


                // ========================================
                // SEND ONLY ONCE
                // ========================================

                sendMessage(
                    message
                );

            }

        };


    // ========================================
    // START
    // ========================================

    voiceRecognition.onstart =
        () => {

            console.log(
                "Lexi microphone started."
            );


            isListening =
                true;


            setVoiceStatus(
                "listening"
            );

        };


    // ========================================
    // END
    // ========================================

    voiceRecognition.onend =
        () => {

            console.log(
                "Lexi microphone ended."
            );


            isListening =
                false;


            setVoiceStatus(
                "idle"
            );

        };


    // ========================================
    // ERROR
    // ========================================

    voiceRecognition.onerror =
        event => {

            console.error(
                "Lexi speech recognition error:",
                event.error
            );


            isListening =
                false;


            setVoiceStatus(
                "idle"
            );


            if (
                event.error ===
                "not-allowed"
            ) {

                addTeacherMessage(
                    "🎤 Mikrofon izni verilmedi. Tarayıcıdan mikrofon erişimine izin ver."
                );

            }


            else if (
                event.error ===
                "no-speech"
            ) {

                console.log(
                    "Lexi: No speech detected."
                );

            }


            else if (
                event.error ===
                "audio-capture"
            ) {

                addTeacherMessage(
                    "🎤 Mikrofon bulunamadı veya kullanılamıyor."
                );

            }


            else if (
                event.error ===
                "network"
            ) {

                addTeacherMessage(
                    "🌐 Ses tanıma bağlantısında bir sorun oluştu."
                );

            }

        };


    // ========================================
    // START RECOGNITION
    // ========================================

    try {

        voiceRecognition.start();

    }

    catch (error) {

        console.error(
            "Lexi voice start error:",
            error
        );


        isListening =
            false;


        setVoiceStatus(
            "idle"
        );

    }

}


// ===============================
// STOP LISTENING
// ===============================

function stopListening() {

    if (
        voiceRecognition
    ) {

        try {

            voiceRecognition.stop();

        }

        catch (error) {

            console.log(
                "Recognition already stopped."
            );

        }

    }


    isListening = false;


    setVoiceStatus(
        "idle"
    );

}


// ===============================
// LEXI SPEAK
// ===============================

function speakLexi(
    text
) {

    if (
        !text ||
        !window.speechSynthesis
    ) {

        return;

    }


    // Önceki konuşmayı durdur

    window.speechSynthesis.cancel();


    const cleanText =
    String(text)

        // HTML etiketleri
        .replace(/<[^>]*>/g, " ")

        // Markdown bold / italic
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/__(.*?)__/g, "$1")
        .replace(/_(.*?)_/g, "$1")

        // Başlık işaretleri
        .replace(/^#{1,6}\s*/gm, "")

        // Bullet işaretleri
        .replace(/^\s*[-*•]\s+/gm, "")

        // Numaralı liste işaretleri
        .replace(/^\s*\d+\.\s+/gm, "")

        // Emoji
        .replace(
            /[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]/gu,
            ""
        )

        // Gereksiz semboller
        .replace(/[🎯💡❌✅⚠️⭐✨🔥👍👎❤️😊😄😔]/gu, "")

        // Birden fazla boşluğu düzelt
        .replace(/\s+/g, " ")

        .trim();


    const utterance =
        new SpeechSynthesisUtterance(
            cleanText
        );


   // ===============================
// DETECT LANGUAGE
// ===============================

const turkishChars =
    /[çğıöşüÇĞİÖŞÜ]/;

const englishWords =
    /\b(the|is|are|am|you|your|what|how|why|where|when|do|does|did|can|could|would|should|hello|hi|thanks|thank|please)\b/i;


// Türkçe karakter veya Türkçe ağırlıklı
// kelime varsa Türkçe kabul et

const isTurkish =
    turkishChars.test(cleanText) ||
    !englishWords.test(cleanText);


// ===============================
// SET SPEECH LANGUAGE
// ===============================

if (isTurkish) {

    utterance.lang =
        "tr-TR";

}
else {

    utterance.lang =
        "en-GB";

}


// ===============================
// VOICE SETTINGS
// ===============================

utterance.rate =
    0.92;

utterance.pitch =
    1.08;

utterance.volume =
    1;


    // ===============================
    // FIND ENGLISH VOICE
    // ===============================

    const voices =
        window.speechSynthesis
            .getVoices();

            console.table(
    voices.map(voice => ({
        name: voice.name,
        lang: voice.lang
    }))
);


    // ===============================
// FIND VOICE BY LANGUAGE
// ===============================

// ===============================
// FIND BEST LEXI VOICE
// ===============================

let selectedVoice = null;


// ========================================
// TURKISH VOICE
// ========================================

if (isTurkish) {

    selectedVoice =
        voices.find(
            voice =>
                voice.name
                    .toLowerCase()
                    .includes("tolga") &&
                voice.lang
                    .toLowerCase()
                    .startsWith("tr")
        );

}


// ========================================
// ENGLISH FEMALE VOICE
// ========================================

else {

    selectedVoice =
        voices.find(
            voice =>
                voice.name ===
                "Google UK English Female"
        );

}


// ========================================
// FALLBACK — GOOGLE US ENGLISH
// ========================================

if (!selectedVoice && !isTurkish) {

    selectedVoice =
        voices.find(
            voice =>
                voice.name ===
                "Google US English"
        );

}


// ========================================
// FINAL FALLBACK
// ========================================

if (!selectedVoice) {

    selectedVoice =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith(
                        isTurkish
                            ? "tr"
                            : "en"
                    )
        );

}


// ========================================
// APPLY VOICE
// ========================================

if (selectedVoice) {

    utterance.voice =
        selectedVoice;

    console.log(
        "Lexi voice:",
        selectedVoice.name,
        selectedVoice.lang
    );

}


    isLexiSpeaking =
        true;


    // Mikrofonu Lexi konuşurken
    // kullanmayalım

    setVoiceStatus(
        "idle"
    );


    utterance.onend =
        () => {

            isLexiSpeaking =
                false;

        };


    utterance.onerror =
        () => {

            isLexiSpeaking =
                false;

        };


    window.speechSynthesis.speak(
        utterance
    );

}


// ===============================
// VOICE BUTTON
// ===============================

if (voiceBtn) {

    voiceBtn.addEventListener(
        "click",
        () => {

            if (isLexiSpeaking) {

                window.speechSynthesis.cancel();

                isLexiSpeaking =
                    false;

                return;

            }


            if (isListening) {

                stopListening();

            }

            else {

                startListening();

            }

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

            if (isSending) return;


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

            if (isSending) return;


            if (!currentConversationId) {

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
// PAGE SESSION
// ===============================

const navigationEntry =
    performance.getEntriesByType("navigation")[0];


// F5 / Ctrl+R mi?

const isReload =
    navigationEntry &&
    navigationEntry.type === "reload";


// Daha önce Lexi sayfası açık mıydı?

const hasActiveChatPageSession =
    sessionStorage.getItem(
        CHAT_PAGE_SESSION_KEY
    );


// ===============================
// DETERMINE PAGE ENTRY
// ===============================
//
// F5 durumunda browser aynı sayfayı
// tekrar yükler.
//
// Ana sayfadan Lexi'ye tekrar gelindiğinde
// referrer index.html olur.
//
// Böylece ikisini ayırıyoruz.

const cameFromSamePage =
    document.referrer ===
    window.location.href;


// ===============================
// NEW VISIT TO LEXI
// ===============================
//
// F5 değilse ve:
// - daha önce aktif session yoksa
// VEYA
// - başka bir sayfadan geldiyse
//
// yeni sohbet açılır.

if (
    !isReload &&
    (
        !hasActiveChatPageSession ||
        !cameFromSamePage
    )
) {

    sessionStorage.removeItem(
        CURRENT_CHAT_KEY
    );

}


// Lexi sayfasının aktif olduğunu kaydet

sessionStorage.setItem(
    CHAT_PAGE_SESSION_KEY,
    "active"
);

// ===============================
// LEAVE LEXI PAGE
// ===============================

const backButton =
    document.querySelector(".ai-back-btn");


if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            sessionStorage.removeItem(
                CHAT_PAGE_SESSION_KEY
            );

            sessionStorage.removeItem(
                CURRENT_CHAT_KEY
            );

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


        await loadUserAvatar(
            user
        );


        renderChatHistory();


        // ===============================
        // RESTORE CURRENT CHAT
        // ===============================

        const savedConversationId =
            sessionStorage.getItem(
                CURRENT_CHAT_KEY
            );


        // ===============================
        // SAVED CHAT EXISTS
        // ===============================

        if (savedConversationId) {

            const savedConversation =
                conversations.find(
                    conversation =>
                        conversation.id ===
                        savedConversationId
                );


            // Sohbet gerçekten varsa aç

            if (savedConversation) {

                loadConversation(
                    savedConversationId
                );

            }

            // ID var ama sohbet bulunamıyorsa

            else {

                sessionStorage.removeItem(
                    CURRENT_CHAT_KEY
                );


                currentConversationId =
                    null;


                clearChatScreen();

                renderChatHistory();

            }

        }


        // ===============================
        // NO SAVED CHAT
        // ===============================

        else {

            currentConversationId =
                null;


            clearChatScreen();

            renderChatHistory();

        }

    }
);

// ========================================
// LOAD SPEECH SYNTHESIS VOICES
// ========================================

if (window.speechSynthesis) {

    window.speechSynthesis.onvoiceschanged = () => {

        window.speechSynthesis.getVoices();

    };

}