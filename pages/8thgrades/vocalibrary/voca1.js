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
// UNIT 1 VOCABULARY
// FRIENDSHIP
// =========================================

const vocabulary = [

    {
        word: "Friendship",
        type: "noun",
        meaning: "Arkadaşlık",
        example: "Friendship is very important to me.",
        exampleTr: "Arkadaşlık benim için çok önemlidir."
    },

    {
        word: "Best friend",
        type: "noun",
        meaning: "En iyi arkadaş",
        example: "My best friend always supports me.",
        exampleTr: "En iyi arkadaşım beni her zaman destekler."
    },

    {
        word: "Close friend",
        type: "noun",
        meaning: "Yakın arkadaş",
        example: "She is one of my close friends.",
        exampleTr: "O, yakın arkadaşlarımdan biridir."
    },

    {
        word: "Buddy",
        type: "noun",
        meaning: "Dost, kanka",
        example: "I usually hang out with my buddies after school.",
        exampleTr: "Okuldan sonra genellikle dostlarımla vakit geçiririm."
    },

    {
        word: "Classmate",
        type: "noun",
        meaning: "Sınıf arkadaşı",
        example: "My classmate helped me with my homework.",
        exampleTr: "Sınıf arkadaşım ödevimde bana yardım etti."
    },

    {
        word: "Communication",
        type: "noun",
        meaning: "İletişim",
        example: "Good communication is important in a friendship.",
        exampleTr: "İyi iletişim bir arkadaşlıkta önemlidir."
    },

    {
        word: "Trust",
        type: "noun",
        meaning: "Güven",
        example: "Trust is the most important part of a friendship.",
        exampleTr: "Güven, bir arkadaşlığın en önemli parçasıdır."
    },

    {
        word: "Experience",
        type: "noun",
        meaning: "Deneyim",
        example: "We had a great experience together.",
        exampleTr: "Birlikte harika bir deneyim yaşadık."
    },

    {
        word: "Relationship",
        type: "noun",
        meaning: "İlişki",
        example: "They have a strong relationship.",
        exampleTr: "Onların güçlü bir ilişkisi var."
    },

    {
        word: "Invitation",
        type: "noun",
        meaning: "Davet",
        example: "I received an invitation to Sarah's party.",
        exampleTr: "Sarah'nın partisi için bir davet aldım."
    },

    {
        word: "Honest",
        type: "adjective",
        meaning: "Dürüst",
        example: "A good friend should be honest.",
        exampleTr: "İyi bir arkadaş dürüst olmalıdır."
    },

    {
        word: "Dishonest/Liar",
        type: "adjective/noun",
        meaning: "Yalancı",
        example: "Nobody trusts a dishonest person.",
        exampleTr: "Hiç kimse dürüst olmayan birine güvenmez."
    },

    {
        word: "Generous",
        type: "adjective",
        meaning: "Cömert",
        example: "My friend is very generous and always shares her things.",
        exampleTr: "Arkadaşım çok cömerttir ve eşyalarını her zaman paylaşır."
    },

    {
        word: "Stingy/Mean",
        type: "adjective",
        meaning: "Cimri",
        example: "He is too stingy to share his food.",
        exampleTr: "Yemeğini paylaşamayacak kadar cimridir."
    },

    {
        word: "Helpful",
        type: "adjective",
        meaning: "Yardımsever",
        example: "My classmates are always helpful.",
        exampleTr: "Sınıf arkadaşlarım her zaman yardımseverdir."
    },

    {
        word: "Selfish",
        type: "adjective",
        meaning: "Bencil",
        example: "A selfish person only thinks about himself.",
        exampleTr: "Bencil bir insan sadece kendini düşünür."
    },

    {
        word: "Polite/Kind",
        type: "adjective",
        meaning: "Kibar",
        example: "She is always polite and kind to everyone.",
        exampleTr: "O, herkese karşı her zaman kibar ve naziktir."
    },

    {
        word: "Rude",
        type: "adjective",
        meaning: "Kaba",
        example: "It is rude to interrupt someone.",
        exampleTr: "Birinin sözünü kesmek kabalıktır."
    },

    {
        word: "Funny",
        type: "adjective",
        meaning: "Komik, eğlenceli",
        example: "Tom is funny and makes everyone laugh.",
        exampleTr: "Tom komiktir ve herkesi güldürür."
    },

    {
        word: "Boring",
        type: "adjective",
        meaning: "Sıkıcı",
        example: "The movie was boring, so we left early.",
        exampleTr: "Film sıkıcıydı, bu yüzden erkenden ayrıldık."
    },

    {
        word: "Friendly",
        type: "adjective",
        meaning: "Arkadaş canlısı",
        example: "Our new classmate is very friendly.",
        exampleTr: "Yeni sınıf arkadaşımız çok arkadaş canlısı."
    },

    {
        word: "Cheerful",
        type: "adjective",
        meaning: "Neşeli",
        example: "She is always cheerful and positive.",
        exampleTr: "O her zaman neşeli ve olumludur."
    },

    {
        word: "Aggressive",
        type: "adjective",
        meaning: "Agresif",
        example: "He can be aggressive when he gets angry.",
        exampleTr: "Sinirlendiğinde agresif olabilir."
    },

    {
        word: "Jealous",
        type: "adjective",
        meaning: "Kıskanç",
        example: "She gets jealous when I spend time with other friends.",
        exampleTr: "Başka arkadaşlarımla vakit geçirdiğimde kıskanıyor."
    },

    {
        word: "Calm",
        type: "adjective",
        meaning: "Sakin",
        example: "My best friend is always calm in difficult situations.",
        exampleTr: "En iyi arkadaşım zor durumlarda her zaman sakindir."
    },

    {
        word: "Outgoing",
        type: "adjective",
        meaning: "Sosyal/Girişken",
        example: "Jack is outgoing and loves meeting new people.",
        exampleTr: "Jack sosyal ve girişkendir ve yeni insanlarla tanışmayı sever."
    },

    {
        word: "Easygoing",
        type: "adjective",
        meaning: "Uysal",
        example: "My brother is easygoing and never gets angry easily.",
        exampleTr: "Kardeşim uysaldır ve kolay kolay sinirlenmez."
    },

    {
        word: "Punctual",
        type: "adjective",
        meaning: "Dakik",
        example: "A punctual person always arrives on time.",
        exampleTr: "Dakik bir insan her zaman zamanında gelir."
    },

    {
        word: "Laid-back",
        type: "adjective",
        meaning: "Rahat/Umursamaz",
        example: "He is laid-back and doesn't worry about small problems.",
        exampleTr: "O rahattır ve küçük sorunlar hakkında endişelenmez."
    },

    {
        word: "Supportive",
        type: "adjective",
        meaning: "Destekleyici",
        example: "A supportive friend helps you when you have problems.",
        exampleTr: "Destekleyici bir arkadaş sorun yaşadığında sana yardım eder."
    },

    {
        word: "Reliable",
        type: "adjective",
        meaning: "Güvenilir",
        example: "Sarah is reliable, so I can always count on her.",
        exampleTr: "Sarah güvenilirdir, bu yüzden ona her zaman güvenebilirim."
    },

    {
        word: "Unreliable",
        type: "adjective",
        meaning: "Güvenilmez",
        example: "He is unreliable and often breaks his promises.",
        exampleTr: "O güvenilmezdir ve sık sık sözlerini tutmaz."
    },

    {
        word: "Tactful",
        type: "adjective",
        meaning: "İnce düşünceli",
        example: "She is tactful and never hurts people's feelings.",
        exampleTr: "O ince düşüncelidir ve insanların duygularını asla incitmez."
    },

    {
        word: "Sneaky",
        type: "adjective",
        meaning: "Sinsi",
        example: "Nobody likes his sneaky behavior.",
        exampleTr: "Hiç kimse onun sinsi davranışını sevmez."
    },

    {
        word: "Fair",
        type: "adjective",
        meaning: "Adil",
        example: "A good friend should always be fair.",
        exampleTr: "İyi bir arkadaş her zaman adil olmalıdır."
    },

    {
        word: "Unfair",
        type: "adjective",
        meaning: "Adaletsiz",
        example: "It is unfair to blame your friend for everything.",
        exampleTr: "Her şey için arkadaşını suçlamak adaletsizdir."
    },

    {
        word: "Loyal",
        type: "adjective",
        meaning: "Sadık",
        example: "A loyal friend stays with you in difficult times.",
        exampleTr: "Sadık bir arkadaş zor zamanlarda senin yanında olur."
    },

    {
        word: "Caring",
        type: "adjective",
        meaning: "İlgili",
        example: "My mother is a caring person.",
        exampleTr: "Annem ilgili bir insandır."
    },

    {
        word: "Arrogant",
        type: "adjective",
        meaning: "Kibirli",
        example: "Nobody likes an arrogant person.",
        exampleTr: "Hiç kimse kibirli bir insanı sevmez."
    },

    {
        word: "Understanding",
        type: "adjective",
        meaning: "Anlayışlı",
        example: "My best friend is very understanding.",
        exampleTr: "En iyi arkadaşım çok anlayışlıdır."
    },

    {
        word: "Respectful",
        type: "adjective",
        meaning: "Saygılı",
        example: "Good friends are respectful to each other.",
        exampleTr: "İyi arkadaşlar birbirlerine karşı saygılıdır."
    },

    {
        word: "Cool",
        type: "adjective",
        meaning: "Havalı",
        example: "My new classmate is really cool.",
        exampleTr: "Yeni sınıf arkadaşım gerçekten havalı."
    },

    {
        word: "Bad-tempered",
        type: "adjective",
        meaning: "Kötü huylu",
        example: "He is bad-tempered and gets angry easily.",
        exampleTr: "O kötü huyludur ve kolayca sinirlenir."
    },

    {
        word: "Good-tempered",
        type: "adjective",
        meaning: "İyi huylu",
        example: "She is good-tempered and gets along with everyone.",
        exampleTr: "O iyi huyludur ve herkesle iyi anlaşır."
    },

    {
        word: "Invite",
        type: "verb",
        meaning: "Davet etmek",
        example: "I want to invite my friends to my birthday party.",
        exampleTr: "Arkadaşlarımı doğum günü partime davet etmek istiyorum."
    },

    {
        word: "Accept",
        type: "verb",
        meaning: "Kabul etmek",
        example: "She accepted my invitation.",
        exampleTr: "Davetimi kabul etti."
    },

    {
        word: "Refuse",
        type: "verb",
        meaning: "Reddetmek",
        example: "He refused my invitation because he was busy.",
        exampleTr: "Meşgul olduğu için davetimi reddetti."
    },

    {
        word: "Apologize",
        type: "verb",
        meaning: "Özür dilemek",
        example: "I apologized to my friend for being late.",
        exampleTr: "Geç kaldığım için arkadaşımdan özür diledim."
    },

    {
        word: "Forgive",
        type: "verb",
        meaning: "Affetmek",
        example: "I hope you can forgive me.",
        exampleTr: "Umarım beni affedebilirsin."
    },

    {
        word: "Share",
        type: "verb",
        meaning: "Paylaşmak",
        example: "Good friends share their secrets.",
        exampleTr: "İyi arkadaşlar sırlarını paylaşır."
    },

    {
        word: "Join/Attend",
        type: "verb",
        meaning: "Katılmak",
        example: "Would you like to join our party?",
        exampleTr: "Partimize katılmak ister misin?"
    },

    {
        word: "Hang out",
        type: "phrasal verb",
        meaning: "Birlikte vakit geçirmek",
        example: "We usually hang out after school.",
        exampleTr: "Genellikle okuldan sonra birlikte vakit geçiririz."
    },

    {
        word: "Keep in touch",
        type: "phrase",
        meaning: "İletişimde kalmak",
        example: "Let's keep in touch after we leave school.",
        exampleTr: "Okuldan ayrıldıktan sonra iletişimde kalalım."
    },

    {
        word: "Get on well with",
        type: "phrasal verb",
        meaning: "İyi anlaşmak",
        example: "I get on well with all my classmates.",
        exampleTr: "Tüm sınıf arkadaşlarımla iyi anlaşırım."
    },

    {
        word: "Come over",
        type: "phrasal verb",
        meaning: "Uğramak",
        example: "Why don't you come over this afternoon?",
        exampleTr: "Bu öğleden sonra neden bize uğramıyorsun?"
    },

    {
        word: "Ask",
        type: "verb",
        meaning: "Sormak",
        example: "I want to ask you a question.",
        exampleTr: "Sana bir soru sormak istiyorum."
    },

    {
        word: "Communicate",
        type: "verb",
        meaning: "İletişim kurmak",
        example: "Friends should communicate with each other.",
        exampleTr: "Arkadaşlar birbirleriyle iletişim kurmalıdır."
    },

    {
        word: "Keep secret",
        type: "phrase",
        meaning: "Sır tutmak",
        example: "I know I can trust you to keep my secret.",
        exampleTr: "Sırrımı tutacağına güvenebileceğimi biliyorum."
    },

    {
        word: "Support/Back up",
        type: "verb",
        meaning: "Desteklemek",
        example: "My friends always support me when I need help.",
        exampleTr: "Yardıma ihtiyacım olduğunda arkadaşlarım beni her zaman destekler."
    },

    {
        word: "Trust/Count on",
        type: "verb",
        meaning: "Güvenmek",
        example: "I know I can trust and count on my best friend.",
        exampleTr: "En iyi arkadaşıma güvenebileceğimi ve ona güvenerek hareket edebileceğimi biliyorum."
    },

    {
        word: "Believe in",
        type: "phrasal verb",
        meaning: "İnanmak",
        example: "My friends always believe in me.",
        exampleTr: "Arkadaşlarım bana her zaman inanır."
    },

    {
        word: "Make an excuse",
        type: "phrase",
        meaning: "Bahane bulmak",
        example: "He always makes an excuse when he doesn't want to come.",
        exampleTr: "Gelmek istemediğinde her zaman bir bahane bulur."
    },

    {
        word: "Argue",
        type: "verb",
        meaning: "Tartışmak",
        example: "Good friends sometimes argue, but they forgive each other.",
        exampleTr: "İyi arkadaşlar bazen tartışır ama birbirlerini affederler."
    },

    {
        word: "Send",
        type: "verb",
        meaning: "Göndermek",
        example: "I will send you an invitation tonight.",
        exampleTr: "Bu gece sana bir davet göndereceğim."
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
        "unit1"
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
                "No Unit 1 progress found."
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
            "Unit 1 progress loaded:",
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
                    `Unit 1 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 1 completed: +${totalXP} XP`
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
                    Unit 1 Complete
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