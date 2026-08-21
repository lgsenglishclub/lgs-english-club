// =========================================
// FIREBASE
// =========================================

import { auth, db } from "../../../firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// =========================================
// UNIT 4 VOCABULARY
// =========================================

const vocabulary = [

    {
        word: "Talk face to face",
        type: "phrase",
        meaning: "Yüz yüze konuşmak",
        example: "We usually talk face to face.",
        exampleTr: "Genellikle yüz yüze konuşuruz."
    },

    {
        word: "Make a phone call",
        type: "phrase",
        meaning: "Telefon araması yapmak",
        example: "I need to make a phone call.",
        exampleTr: "Telefon araması yapmam gerekiyor."
    },

    {
        word: "Use messenger birds",
        type: "phrase",
        meaning: "Haberci kuş kullanmak",
        example: "People used to use messenger birds.",
        exampleTr: "İnsanlar eskiden haberci kuş kullanırdı."
    },

    {
        word: "Write a letter",
        type: "phrase",
        meaning: "Mektup yazmak",
        example: "She likes to write a letter to her friends.",
        exampleTr: "Arkadaşlarına mektup yazmayı seviyor."
    },

    {
        word: "Write a postcard",
        type: "phrase",
        meaning: "Posta kartı yazmak",
        example: "He wrote a postcard from London.",
        exampleTr: "Londra'dan bir posta kartı yazdı."
    },

    {
        word: "Text message",
        type: "noun",
        meaning: "Kısa mesaj",
        example: "I sent her a text message.",
        exampleTr: "Ona bir kısa mesaj gönderdim."
    },

    {
        word: "Send an e-mail",
        type: "phrase",
        meaning: "E-posta göndermek",
        example: "Please send me an e-mail.",
        exampleTr: "Lütfen bana bir e-posta gönder."
    },

    {
        word: "Use social networks",
        type: "phrase",
        meaning: "Sosyal ağları kullanmak",
        example: "Teenagers often use social networks.",
        exampleTr: "Gençler sık sık sosyal ağları kullanır."
    },

    {
        word: "Video chats",
        type: "noun",
        meaning: "Görüntülü sohbetler",
        example: "We have video chats every weekend.",
        exampleTr: "Her hafta sonu görüntülü sohbetler yaparız."
    },

    {
        word: "Take a memo",
        type: "phrase",
        meaning: "Not almak",
        example: "Can you take a memo for me?",
        exampleTr: "Benim için not alabilir misin?"
    },

    {
        word: "Leave a message note",
        type: "phrase",
        meaning: "Not bırakmak",
        example: "Please leave a message note.",
        exampleTr: "Lütfen bir not bırak."
    },

    {
        word: "Leave a voice mail",
        type: "phrase",
        meaning: "Sesli mesaj bırakmak",
        example: "I left a voice mail for him.",
        exampleTr: "Onun için sesli mesaj bıraktım."
    },

    {
        word: "Talk on the mobile phone",
        type: "phrase",
        meaning: "Cep telefonu ile konuşmak",
        example: "She is talking on the mobile phone.",
        exampleTr: "Cep telefonuyla konuşuyor."
    },

    {
        word: "Use smoke signals",
        type: "phrase",
        meaning: "Dumanla haberleşmek",
        example: "People used to use smoke signals.",
        exampleTr: "İnsanlar eskiden dumanla haberleşirdi."
    },

    {
        word: "Send a fax",
        type: "phrase",
        meaning: "Faks göndermek",
        example: "I need to send a fax.",
        exampleTr: "Bir faks göndermem gerekiyor."
    },


    // =========================================
    // 📱 ABOUT PHONE CONVERSATIONS
    // =========================================

    {
        word: "Cell phone",
        type: "noun",
        meaning: "Cep telefonu",
        example: "My cell phone is new.",
        exampleTr: "Cep telefonum yeni."
    },

    {
        word: "Mobile phone",
        type: "noun",
        meaning: "Cep telefonu",
        example: "I always carry my mobile phone.",
        exampleTr: "Cep telefonumu her zaman yanımda taşırım."
    },

    {
        word: "Landline",
        type: "noun",
        meaning: "Sabit telefon hattı",
        example: "We still have a landline at home.",
        exampleTr: "Evde hâlâ sabit telefonumuz var."
    },

    {
        word: "Smart phone",
        type: "noun",
        meaning: "Akıllı telefon",
        example: "My smart phone has a good camera.",
        exampleTr: "Akıllı telefonumun iyi bir kamerası var."
    },

    {
        word: "Phone number",
        type: "noun",
        meaning: "Telefon numarası",
        example: "What is your phone number?",
        exampleTr: "Telefon numaran nedir?"
    },

    {
        word: "Wrong number",
        type: "noun",
        meaning: "Yanlış numara",
        example: "Sorry, I think you have the wrong number.",
        exampleTr: "Üzgünüm, sanırım yanlış numarayı aradınız."
    },

    {
        word: "Message",
        type: "noun",
        meaning: "Mesaj",
        example: "I got your message.",
        exampleTr: "Mesajını aldım."
    },

    {
        word: "Memo",
        type: "noun",
        meaning: "Not",
        example: "She left a memo on my desk.",
        exampleTr: "Masamın üzerine bir not bıraktı."
    },

    {
        word: "Connection",
        type: "noun",
        meaning: "Bağlantı",
        example: "The phone connection is bad.",
        exampleTr: "Telefon bağlantısı kötü."
    },

    {
        word: "Conversation",
        type: "noun",
        meaning: "Görüşme, konuşma",
        example: "We had a long conversation.",
        exampleTr: "Uzun bir konuşma yaptık."
    },

    {
        word: "Information",
        type: "noun",
        meaning: "Bilgi",
        example: "I need some information.",
        exampleTr: "Biraz bilgiye ihtiyacım var."
    },

    {
        word: "Burglary",
        type: "noun",
        meaning: "Ev soygunu",
        example: "There was a burglary last night.",
        exampleTr: "Dün gece bir ev soygunu oldu."
    },

    {
        word: "Pros",
        type: "noun",
        meaning: "Avantajlar",
        example: "Let's talk about the pros and cons.",
        exampleTr: "Avantajlar ve dezavantajlar hakkında konuşalım."
    },

    {
        word: "Cons",
        type: "noun",
        meaning: "Dezavantajlar",
        example: "There are some cons to using smartphones.",
        exampleTr: "Akıllı telefon kullanmanın bazı dezavantajları var."
    },

    {
        word: "Useful",
        type: "adjective",
        meaning: "Faydalı",
        example: "This app is very useful.",
        exampleTr: "Bu uygulama çok faydalı."
    },

    {
        word: "Bad line",
        type: "phrase",
        meaning: "Kötü, cızırtılı hat",
        example: "Sorry, we have a bad line.",
        exampleTr: "Üzgünüm, hattımız kötü."
    },

    {
        word: "Busy/Engaged",
        type: "adjective",
        meaning: "Meşgul",
        example: "The line is busy.",
        exampleTr: "Hat meşgul."
    },

    {
        word: "Line",
        type: "noun",
        meaning: "Hat, telefon hattı",
        example: "The line is very clear.",
        exampleTr: "Hat çok net."
    },

    {
        word: "Misunderstanding",
        type: "noun",
        meaning: "Yanlış anlama",
        example: "It was just a misunderstanding.",
        exampleTr: "Bu sadece bir yanlış anlamaydı."
    },

    {
        word: "Clarification",
        type: "noun",
        meaning: "Açıklama",
        example: "I need some clarification.",
        exampleTr: "Biraz açıklamaya ihtiyacım var."
    },

    {
        word: "Appointment",
        type: "noun",
        meaning: "Randevu",
        example: "I have an appointment tomorrow.",
        exampleTr: "Yarın bir randevum var."
    },

    {
        word: "Meeting",
        type: "noun",
        meaning: "Toplantı",
        example: "We have a meeting at ten.",
        exampleTr: "Saat onda bir toplantımız var."
    },

    {
        word: "Order list",
        type: "noun",
        meaning: "Sipariş listesi",
        example: "I checked the order list.",
        exampleTr: "Sipariş listesini kontrol ettim."
    },

    {
        word: "Available",
        type: "adjective",
        meaning: "Müsait",
        example: "Are you available this afternoon?",
        exampleTr: "Bu öğleden sonra müsait misin?"
    },

    {
        word: "Minute",
        type: "noun",
        meaning: "Dakika",
        example: "Wait a minute, please.",
        exampleTr: "Lütfen bir dakika bekle."
    },

    {
        word: "Via",
        type: "preposition",
        meaning: "Yoluyla, aracılığıyla",
        example: "I sent the document via e-mail.",
        exampleTr: "Belgeyi e-posta yoluyla gönderdim."
    },

    {
        word: "Soon",
        type: "adverb",
        meaning: "Yakında",
        example: "I will call you soon.",
        exampleTr: "Seni yakında arayacağım."
    },

    {
        word: "Again",
        type: "adverb",
        meaning: "Tekrar",
        example: "Could you say that again?",
        exampleTr: "Bunu tekrar söyleyebilir misin?"
    },

    {
        word: "Loud",
        type: "adjective",
        meaning: "Sesli",
        example: "Please speak loud enough.",
        exampleTr: "Lütfen yeterince yüksek sesle konuş."
    },

    {
        word: "Slow",
        type: "adjective",
        meaning: "Yavaş",
        example: "Please speak slowly.",
        exampleTr: "Lütfen yavaş konuş."
    },


    // =========================================
    // 🏢 SERVICES & PEOPLE
    // =========================================

    {
        word: "Call center",
        type: "noun",
        meaning: "Çağrı merkezi",
        example: "I called the customer service center.",
        exampleTr: "Müşteri hizmetleri merkezini aradım."
    },

    {
        word: "Customer service",
        type: "noun",
        meaning: "Müşteri hizmetleri",
        example: "Please contact customer service.",
        exampleTr: "Lütfen müşteri hizmetleriyle iletişime geçin."
    },

    {
        word: "Staff",
        type: "noun",
        meaning: "Personel",
        example: "The staff are very helpful.",
        exampleTr: "Personel çok yardımsever."
    },

    {
        word: "Officer",
        type: "noun",
        meaning: "Polis memuru",
        example: "The officer asked some questions.",
        exampleTr: "Polis memuru birkaç soru sordu."
    },

    {
        word: "Neighbour",
        type: "noun",
        meaning: "Komşu",
        example: "Our neighbour is very friendly.",
        exampleTr: "Komşumuz çok arkadaş canlısı."
    },

    {
        word: "Local authority",
        type: "noun",
        meaning: "Yerel yetkili, yerel yönetim",
        example: "The local authority helped the residents.",
        exampleTr: "Yerel yönetim sakinlere yardım etti."
    },

    {
        word: "Municipality",
        type: "noun",
        meaning: "Belediye",
        example: "The municipality built a new park.",
        exampleTr: "Belediye yeni bir park yaptı."
    },

    {
        word: "Security",
        type: "noun",
        meaning: "Güvenlik",
        example: "Security is important in our neighbourhood.",
        exampleTr: "Mahallemizde güvenlik önemlidir."
    },

    {
        word: "Burglar",
        type: "noun",
        meaning: "Ev soyguncusu",
        example: "The burglar broke into the house.",
        exampleTr: "Ev soyguncusu eve zorla girdi."
    },


    // =========================================
    // 🧠 COMMUNICATION VERBS
    // =========================================

    {
        word: "Answer",
        type: "verb",
        meaning: "Cevap vermek",
        example: "Please answer the phone.",
        exampleTr: "Lütfen telefonu cevapla."
    },

    {
        word: "Call",
        type: "verb",
        meaning: "Aramak",
        example: "I will call you later.",
        exampleTr: "Seni daha sonra arayacağım."
    },

    {
        word: "Call back",
        type: "phrasal verb",
        meaning: "Geri aramak",
        example: "I will call you back later.",
        exampleTr: "Seni daha sonra geri arayacağım."
    },

    {
        word: "Dial",
        type: "verb",
        meaning: "Tuşlamak",
        example: "Dial the number carefully.",
        exampleTr: "Numarayı dikkatlice tuşla."
    },

    {
        word: "Pick up",
        type: "phrasal verb",
        meaning: "Telefonu açmak",
        example: "Please pick up the phone.",
        exampleTr: "Lütfen telefonu aç."
    },

    {
        word: "Ring",
        type: "verb",
        meaning: "Çalmak",
        example: "The phone is ringing.",
        exampleTr: "Telefon çalıyor."
    },

    {
        word: "Hang up",
        type: "phrasal verb",
        meaning: "Telefonu kapatmak",
        example: "Don't hang up the phone.",
        exampleTr: "Telefonu kapatma."
    },

    {
        word: "Get back",
        type: "phrasal verb",
        meaning: "Geri dönmek",
        example: "I will get back to you soon.",
        exampleTr: "Sana yakında geri döneceğim."
    },

    {
        word: "Leave a message",
        type: "phrase",
        meaning: "Mesaj bırakmak",
        example: "Can I leave a message?",
        exampleTr: "Mesaj bırakabilir miyim?"
    },

    {
        word: "Take message",
        type: "phrase",
        meaning: "Mesaj almak",
        example: "Can I take a message?",
        exampleTr: "Mesajınızı alabilir miyim?"
    },

    {
        word: "Hear",
        type: "verb",
        meaning: "Duymak",
        example: "I can't hear you clearly.",
        exampleTr: "Seni net duyamıyorum."
    },

    {
        word: "Hang on",
        type: "phrasal verb",
        meaning: "Hatta beklemek",
        example: "Hang on a moment, please.",
        exampleTr: "Lütfen hatta bir dakika bekle."
    },

    {
        word: "Hold on",
        type: "phrasal verb",
        meaning: "Hatta beklemek",
        example: "Hold on, please.",
        exampleTr: "Lütfen hatta bekle."
    },

    {
        word: "Wait",
        type: "verb",
        meaning: "Beklemek",
        example: "Please wait for me.",
        exampleTr: "Lütfen beni bekle."
    },

    {
        word: "Connect",
        type: "verb",
        meaning: "Bağlamak",
        example: "Can you connect me to Mr. Brown?",
        exampleTr: "Beni Bay Brown'a bağlayabilir misiniz?"
    },

    {
        word: "Put somebody through",
        type: "phrase",
        meaning: "Birini telefona bağlamak",
        example: "Could you put me through to the manager?",
        exampleTr: "Beni müdüre bağlayabilir misiniz?"
    },

    {
        word: "Get somebody",
        type: "phrase",
        meaning: "Birini telefona vermek",
        example: "Can I get somebody to help me?",
        exampleTr: "Bana yardım edecek birini telefona verebilir misiniz?"
    },

    {
        word: "Know",
        type: "verb",
        meaning: "Bilmek",
        example: "Do you know his phone number?",
        exampleTr: "Onun telefon numarasını biliyor musun?"
    },

    {
        word: "Repeat",
        type: "verb",
        meaning: "Tekrar etmek",
        example: "Could you repeat that, please?",
        exampleTr: "Bunu tekrar eder misiniz?"
    },

    {
        word: "Try",
        type: "verb",
        meaning: "Denemek",
        example: "Try calling him again.",
        exampleTr: "Onu tekrar aramayı dene."
    },

    {
        word: "Wonder",
        type: "verb",
        meaning: "Merak etmek",
        example: "I wonder where she is.",
        exampleTr: "Onun nerede olduğunu merak ediyorum."
    },

    {
        word: "Ask",
        type: "verb",
        meaning: "Sormak",
        example: "I want to ask you something.",
        exampleTr: "Sana bir şey sormak istiyorum."
    },

    {
        word: "Spell",
        type: "verb",
        meaning: "Hecelemek",
        example: "Could you spell your name?",
        exampleTr: "Adınızı heceler misiniz?"
    },

    {
        word: "Contact with",
        type: "phrase",
        meaning: "İletişim kurmak",
        example: "I need to contact with my teacher.",
        exampleTr: "Öğretmenimle iletişim kurmam gerekiyor."
    },

    {
        word: "Communicate",
        type: "verb",
        meaning: "İletişim kurmak",
        example: "We communicate by e-mail.",
        exampleTr: "E-posta yoluyla iletişim kurarız."
    },

    {
        word: "Keep in touch",
        type: "phrase",
        meaning: "İletişimde kalmak, görüşmek",
        example: "Let's keep in touch.",
        exampleTr: "İletişimde kalalım."
    },

    {
        word: "Say",
        type: "verb",
        meaning: "Söylemek",
        example: "What did she say?",
        exampleTr: "O ne söyledi?"
    },

    {
        word: "Tell",
        type: "verb",
        meaning: "Anlatmak",
        example: "Please tell me the truth.",
        exampleTr: "Lütfen bana gerçeği anlat."
    },

    {
        word: "Speak",
        type: "verb",
        meaning: "Konuşmak",
        example: "Can I speak to Mr. Smith?",
        exampleTr: "Bay Smith ile konuşabilir miyim?"
    },

    {
        word: "Talk",
        type: "verb",
        meaning: "Konuşmak",
        example: "We need to talk.",
        exampleTr: "Konuşmamız gerekiyor."
    },

    {
        word: "Book",
        type: "verb",
        meaning: "Rezervasyon yapmak",
        example: "I want to book a table.",
        exampleTr: "Bir masa ayırtmak istiyorum."
    },

    {
        word: "Reservation",
        type: "noun",
        meaning: "Rezervasyon, yer ayırtma",
        example: "I have a reservation for two.",
        exampleTr: "İki kişilik rezervasyonum var."
    },

    {
        word: "Break into",
        type: "phrasal verb",
        meaning: "Zorla girmek",
        example: "Someone tried to break into our house.",
        exampleTr: "Birisi evimize zorla girmeye çalıştı."
    }

];


// =========================================
// ELEMENTS
// =========================================

const vocabularyList =
    document.getElementById("vocabularyList");

const progressText =
    document.getElementById("progressText");

const progressFill =
    document.getElementById("progressFill");

const learnedText =
    document.getElementById("learnedText");

const remainingText =
    document.getElementById("remainingText");

const currentWordText =
    document.getElementById("currentWordText");


// =========================================
// CURRENT STATE
// =========================================

let currentWord = 0;

let learnedWords = [];

let reviewWords = [];

let reviewIndex = 0;

let isReviewMode = false;

let completedFirstRound = false;

let unitCompleted = false;

let currentUser = null;

let xpAwardedWords = [];

let unitXPRewarded = false;


// =========================================
// FIREBASE REFERENCE
// =========================================

function getProgressRef(user) {

    return doc(
        db,
        "users",
        user.uid,
        "vocabulary",
        "unit4"
    );

}

// =========================================
// ⭐ VOCABULARY XP
// =========================================

async function awardVocabularyXP(
    user,
    amount,
    word
) {

    if (!user || !amount || amount <= 0) {
        return false;
    }

    try {

        const userRef =
            doc(db, "users", user.uid);

        // Toplam XP
        await updateDoc(
            userRef,
            {
                xp: increment(amount)
            }
        );

        // XP History
        await addDoc(
            collection(
                db,
                "users",
                user.uid,
                "xpHistory"
            ),
            {
                amount: amount,
                reason: `Learned: ${word}`,
                icon: "📚",
                date: serverTimestamp()
            }
        );

        console.log(
            `⭐ +${amount} XP — Learned: ${word}`
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Vocabulary XP error:",
            error
        );

        return false;
    }
}

// =========================================
// SAVE PROGRESS
// =========================================

async function saveProgress() {

    if (!currentUser) {
        return;
    }

    try {

        await setDoc(
            getProgressRef(currentUser),
            {

                learnedWords:
                    [...learnedWords],

                reviewWords:
                    [...reviewWords],

                xpAwardedWords:
    [...xpAwardedWords],

unitXPRewarded:
    unitXPRewarded,

currentWord:
    currentWord,

                completedFirstRound:
                    completedFirstRound,

                completed:
                    unitCompleted

            },
            {
                merge: true
            }
        );

        console.log("Vocabulary progress saved.");

    } catch (error) {

        console.error(
            "Vocabulary progress save error:",
            error
        );

    }

}


// =========================================
// LOAD PROGRESS
// =========================================

async function loadProgress(user) {

    try {

        const snapshot =
            await getDoc(
                getProgressRef(user)
            );


        if (!snapshot.exists()) {

            console.log(
                "No Unit 4 progress found."
            );

            updateProgress();

            showWord();

            return;

        }


        const data =
            snapshot.data();


        // Learned words
        learnedWords =
            Array.isArray(data.learnedWords)
                ? data.learnedWords
                : [];


        // Review words
        reviewWords =
            Array.isArray(data.reviewWords)
                ? data.reviewWords
                : [];

        xpAwardedWords =
            Array.isArray(data.xpAwardedWords)
                ? data.xpAwardedWords
                : [];

                unitXPRewarded =
        data.unitXPRewarded === true;


        // Current word
        currentWord =
            typeof data.currentWord === "number"
                ? data.currentWord
                : 0;


        // First round
        completedFirstRound =
            data.completedFirstRound === true;


        // Unit completed
        unitCompleted =
            data.completed === true;


        // Safety check
        if (
            currentWord < 0 ||
            currentWord >= vocabulary.length
        ) {

            currentWord = 0;

        }


        console.log(
            "Unit 4 progress loaded:",
            data
        );


        // Unit already completed
        if (unitCompleted) {

            updateProgress();

            completeUnit();

            return;

        }


        // First round finished
        // but review words remain
        if (
            completedFirstRound &&
            reviewWords.length > 0
        ) {

            updateProgress();

            showFirstRoundCompleteScreen();

            return;

        }


        updateProgress();

        showWord();


    } catch (error) {

        console.error(
            "Vocabulary progress load error:",
            error
        );

        updateProgress();

        showWord();

    }

}


// =========================================
// UPDATE PROGRESS
// =========================================

function updateProgress() {

    const learned =
        learnedWords.length;

    const total =
        vocabulary.length;

    const remaining =
        total - learned;

    const percentage =
        (learned / total) * 100;


    // Hidden element
    if (progressText) {

        progressText.textContent =
            `${learned} / ${total}`;

    }


    if (progressFill) {

        progressFill.style.width =
            `${percentage}%`;

    }


    if (learnedText) {

        learnedText.textContent =
            `${learned} Words Learned`;

    }


    if (remainingText) {

    if (
        isReviewMode ||
        completedFirstRound
    ) {

        remainingText.textContent =
            `${reviewWords.length} Words to Review`;

    } else {

        remainingText.textContent =
            `${remaining} Words Remaining`;

    }

}

}


// =========================================
// SHOW WORD
// =========================================

async function showWord() {

    const item =
        vocabulary[currentWord];

            // Review listesi bittiyse Review modundan çık
    if (
        isReviewMode &&
        reviewWords.length === 0
    ) {

        isReviewMode = false;

        completedFirstRound = true;

        unitCompleted = true;

        learnedWords =
            vocabulary.map(
                (_, index) => index
            );

        updateProgress();

        await awardUnitXP();

        await saveProgress();

        completeUnit();

        return;
    }


    if (!item) {
        return;
    }


    // Current word counter

    if (currentWordText) {

        if (isReviewMode) {

            currentWordText.textContent =
                `Review Word ${reviewIndex + 1} / ${reviewWords.length}`;

        } else {

            currentWordText.textContent =
                `${currentWord + 1} / ${vocabulary.length}`;

        }

    }


vocabularyList.innerHTML = `

    <div class="word-card">

        <h3>
            ${item.word}
        </h3>

        <span class="word-type">
            ${item.type}
        </span>


        <!-- TÜRKÇE ANLAM + TÜRKÇE ÖRNEK GİZLİ -->
        <div
            id="meaningSection"
            style="display: none;"
        >

            <p class="meaning">
                ${item.meaning}
            </p>

        </div>


        <!-- AUDIO -->
        <button
            class="audio-btn"
            id="audioButton"
            title="Listen">

            🔊

        </button>


        <!-- ÖRNEK CÜMLE HER ZAMAN GÖRÜNÜR -->
        <div class="example-box">

            <div class="example-label">
                Example Sentence
            </div>

            <p class="example">
                ${item.example}
            </p>

            <!-- TÜRKÇE ÖRNEK GİZLİ -->
            <p
                class="example-tr"
                id="exampleTr"
                style="display: none;"
            >
                ${item.exampleTr}
            </p>

        </div>


        <!-- SHOW MEANING -->
        <button
            class="show-meaning-btn"
            id="showMeaningBtn">

            👁 Show Meaning

        </button>


        <!-- KNOW / REVIEW -->
        <div
            class="word-actions"
            id="wordActions"
            style="display: none;"
        >

            <button
                class="know-word"
                id="knowWord">

                ⭐ I Know This Word

            </button>

            <button
                class="review-word"
                id="reviewWord">

                🔄 Review Again

            </button>

        </div>

    </div>

`;

// =========================================
// 👁 SHOW MEANING
// =========================================

const showMeaningBtn =
    document.getElementById("showMeaningBtn");

const meaningSection =
    document.getElementById("meaningSection");

const exampleTr =
    document.getElementById("exampleTr");

const wordActions =
    document.getElementById("wordActions");


if (
    showMeaningBtn &&
    meaningSection &&
    exampleTr &&
    wordActions
) {

    showMeaningBtn.addEventListener(
        "click",
        () => {

            // 🇹🇷 Kelime anlamını göster
            meaningSection.style.display =
                "block";

            // 🇹🇷 Türkçe örnek cümleyi göster
            exampleTr.style.display =
                "block";

            // Show Meaning butonunu gizle
            showMeaningBtn.style.display =
                "none";

            // Know / Review butonlarını göster
            wordActions.style.display =
                "flex";

        }
    );

}


    // =========================================
    // AUDIO
    // =========================================

    const audioButton =
        document.getElementById("audioButton");


    if (audioButton) {

        audioButton.addEventListener(
            "click",
            speakWord
        );

    }


    // =========================================
    // KNOW BUTTON
    // =========================================

    const knowButton =
        document.getElementById("knowWord");


    // =========================================
    // REVIEW BUTTON
    // =========================================

    const reviewButton =
        document.getElementById("reviewWord");


    // =========================================
    // I KNOW THIS WORD
    // =========================================

    if (knowButton) {

        knowButton.addEventListener(
            "click",
            async () => {

    // =================================
// ⭐ MARK WORD AS LEARNED
// =================================

if (!xpAwardedWords.includes(currentWord)) {

    xpAwardedWords.push(currentWord);

}

// =================================
// REVIEW MODE
// =================================

if (isReviewMode) {

    // Kelimeyi öğrenildi olarak işaretle
    if (!learnedWords.includes(currentWord)) {

        learnedWords.push(currentWord);

    }


    // ŞU ANKİ KELİMEYİ REVIEW LİSTESİNDEN ÇIKAR
    reviewWords =
        reviewWords.filter(
            index =>
                index !== currentWord
        );


    // =================================
    // TÜM REVIEW KELİMELERİ BİTTİ
    // =================================

    if (reviewWords.length === 0) {

        isReviewMode = false;

        completedFirstRound = true;

        unitCompleted = true;


        learnedWords =
            vocabulary.map(
                (_, index) => index
            );


        updateProgress();


        // ⭐ 13 kelime × 5 + 50 bonus
        await awardUnitXP();


        await saveProgress();


        // 🎉 SONUÇ EKRANI
        completeUnit();

        return;
    }


    // =================================
    // SONRAKİ REVIEW KELİMESİ
    // =================================

    reviewIndex = 0;

    currentWord =
        reviewWords[reviewIndex];


    updateProgress();

    await saveProgress();

    showWord();

    return;
}


                // =================================
                // FIRST ROUND
                // =================================

                if (
                    !learnedWords.includes(
                        currentWord
                    )
                ) {

                    learnedWords.push(
                        currentWord
                    );

                }


                // If it was previously
                // in review, remove it

                reviewWords =
                    reviewWords.filter(
                        index =>
                            index !== currentWord
                    );


                updateProgress();

                await saveProgress();


                setTimeout(
                    async () => {

                        if (
                            currentWord <
                            vocabulary.length - 1
                        ) {

                            currentWord++;

                            await saveProgress();

                            showWord();

                        } else {

                            completeFirstRound();

                        }

                    },
                    250
                );

            }
        );

    }


    // =========================================
    // REVIEW AGAIN
    // =========================================

    if (reviewButton) {

        reviewButton.addEventListener(
            "click",
            async () => {


                // =================================
                // REVIEW MODE
                // =================================

                if (isReviewMode) {

                    const word =
                        reviewWords[reviewIndex];


                    // Move current word
                    // to the end of the queue

                    reviewWords.splice(
                        reviewIndex,
                        1
                    );

                    reviewWords.push(
                        word
                    );


                    // Show next review word

                    if (
                        reviewIndex >=
                        reviewWords.length
                    ) {

                        reviewIndex =
                            reviewWords.length - 1;

                    }


                    if (
                        reviewWords.length > 0
                    ) {

                        currentWord =
                            reviewWords[
                                reviewIndex
                            ];

                        updateProgress();

                        await saveProgress();

                        showWord();

                    }

                    return;

                }


                // =================================
                // FIRST ROUND
                // =================================

                if (
                    !reviewWords.includes(
                        currentWord
                    )
                ) {

                    reviewWords.push(
                        currentWord
                    );

                }


                // Make sure it is not learned

                learnedWords =
                    learnedWords.filter(
                        index =>
                            index !== currentWord
                    );


                updateProgress();

                await saveProgress();


                // Next word

                if (
                    currentWord <
                    vocabulary.length - 1
                ) {

                    currentWord++;

                    await saveProgress();

                    showWord();

                } else {

                    completeFirstRound();

                }

            }
        );

    }

}


// =========================================
// TEXT TO SPEECH
// =========================================

function speakWord() {

    const item =
        vocabulary[currentWord];


    if (!item) {
        return;
    }


    const speech =
        new SpeechSynthesisUtterance(
            item.word
        );


    speech.lang =
        "en-US";

    speech.rate =
        0.85;

    speech.pitch =
        1;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );

}


// =========================================
// FIRST ROUND COMPLETE
// =========================================

async function completeFirstRound() {

    completedFirstRound = true;


    // Hiç review yoksa
    // Unit direkt tamamlandı
    if (reviewWords.length === 0) {

        unitCompleted = true;

        learnedWords =
            vocabulary.map(
                (_, index) => index
            );

        updateProgress();

        await awardUnitXP();

        await saveProgress();

        completeUnit();

        return;
    }


    updateProgress();

    await saveProgress();

    showFirstRoundCompleteScreen();

}


// =========================================
// FIRST ROUND COMPLETE SCREEN
// =========================================

function showFirstRoundCompleteScreen() {

    vocabularyList.innerHTML = `

        <div class="word-card">

            <div class="word-number">
                🎉 FIRST ROUND COMPLETE
            </div>

            <h3>
                Great Job!
            </h3>

            <p class="meaning">
                You completed all
                ${vocabulary.length}
                words.
            </p>

            <div class="example-box">

                <div class="example-label">
                    Your Progress
                </div>

                <p class="example">

                    ${learnedWords.length}
                    words learned

                    <br>

                    ${reviewWords.length}
                    words to review

                </p>

            </div>

            ${
                reviewWords.length > 0
                ? `

                    <div class="word-actions">

                        <button
                            class="review-word"
                            id="startReview">

                            🔄 Review
                            ${reviewWords.length}
                            Words

                        </button>

                    </div>

                `
                : `

                    <div class="word-actions">

                        <button
                            class="know-word"
                            disabled>

                            🎉 Unit Completed!

                        </button>

                    </div>

                `
            }

        </div>

    `;


    const startReview =
        document.getElementById(
            "startReview"
        );


    if (startReview) {

        startReview.addEventListener(
            "click",
            startReviewMode
        );

    }

}

// =========================================
// ⭐ AWARD UNIT XP
// =========================================

async function awardUnitXP() {

    if (!currentUser) {
        return;
    }

    // Daha önce verildiyse tekrar verme
    if (unitXPRewarded) {
        return;
    }

    try {

        const learnedWordCount =
            xpAwardedWords.length;

        const wordXP =
            learnedWordCount * 5;

        const completionBonus =
            50;

        const totalXP =
            wordXP + completionBonus;


        const userRef =
            doc(
                db,
                "users",
                currentUser.uid
            );


        // Toplam XP
        await updateDoc(
            userRef,
            {
                xp: increment(totalXP)
            }
        );


        // TEK history kaydı
        await addDoc(
            collection(
                db,
                "users",
                currentUser.uid,
                "xpHistory"
            ),
            {
                amount: totalXP,

                reason:
                    `Unit 4 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 4 completed: +${totalXP} XP`
        );


    } catch (error) {

        console.error(
            "❌ Unit XP error:",
            error
        );

    }

}

// =========================================
// START REVIEW MODE
// =========================================

async function startReviewMode() {

    if (
        reviewWords.length === 0
    ) {

        return;

    }


    isReviewMode =
        true;


    reviewIndex =
        0;


    currentWord =
        reviewWords[
            reviewIndex
        ];


    updateProgress();

    await saveProgress();

    showWord();

}


// =========================================
// UNIT COMPLETED
// =========================================

function completeUnit() {

    vocabularyList.innerHTML = `

        <div class="word-card">

            <div class="word-number">
                🎉 VOCABULARY COMPLETE
            </div>

            <h3>
                Excellent!
            </h3>

            <p class="meaning">
                You have mastered all
                ${vocabulary.length}
                words.
            </p>

            <div class="example-box">

                <div class="example-label">
                    Unit 4 Complete
                </div>

                <p class="example">
                    You have mastered all the
                    Friendship vocabulary.
                </p>

            </div>

            <div class="word-actions">

                <button
                    class="know-word"
                    id="unitCompletedButton">

                    ✓ Unit Completed

                </button>

                <button
                    class="review-word"
                    id="practiceAgain">

                    🔄 Practice Again

                </button>

            </div>

        </div>

    `;


    // =========================================
    // UNIT COMPLETED BUTTON
    // =========================================

    const unitCompletedButton =
        document.getElementById(
            "unitCompletedButton"
        );


    if (unitCompletedButton) {

        unitCompletedButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "vocalibrary.html";

            }
        );

    }


    // =========================================
    // PRACTICE AGAIN
    // =========================================

    const practiceAgain =
        document.getElementById(
            "practiceAgain"
        );


    if (practiceAgain) {

        practiceAgain.addEventListener(
            "click",
            restartUnit
        );

    }


    // =========================================
    // CURRENT WORD
    // =========================================

    if (currentWordText) {

        currentWordText.textContent =
            "Completed";

    }

}


// =========================================
// RESTART UNIT
// =========================================

async function restartUnit() {

    // Sadece tamamlanmış Unit
    // yeniden başlatılabilir

    if (!unitCompleted) {

        return;

    }


    // Reset local state

    learnedWords = [];

    reviewWords = [];

    currentWord = 0;

    reviewIndex = 0;

    isReviewMode = false;

    completedFirstRound = false;

    unitCompleted = false;


    // Reset Firebase

    await saveProgress();


    // Update screen

    updateProgress();


    if (currentWordText) {

        currentWordText.textContent =
    `1 / ${vocabulary.length}`;

    }


    // İlk kelimeyi göster

    showWord();

}


// =========================================
// AUTH + START
// =========================================

onAuthStateChanged(
    auth,
    async (user) => {

        if (!user) {

            console.log(
                "No logged-in user."
            );

            // Login yoksa mevcut
            // sıfırdan sistemi çalıştır

            updateProgress();

            showWord();

            return;

        }


        currentUser =
            user;


        console.log(
            "Vocabulary user:",
            user.uid
        );


        await loadProgress(user);

    }
);