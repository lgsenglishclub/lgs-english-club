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
        example: "My best friend always helps me.",
        exampleTr: "En iyi arkadaşım bana her zaman yardım eder."
    },

    {
        word: "Close friend",
        type: "noun",
        meaning: "Yakın arkadaş",
        example: "She is a close friend of mine.",
        exampleTr: "O benim yakın bir arkadaşım."
    },

    {
        word: "Buddy",
        type: "noun",
        meaning: "Dost, kanka",
        example: "My buddy and I play football together.",
        exampleTr: "Kankam ve ben birlikte futbol oynarız."
    },

    {
        word: "Classmate",
        type: "noun",
        meaning: "Sınıf arkadaşı",
        example: "My classmate sits next to me.",
        exampleTr: "Sınıf arkadaşım yanımda oturuyor."
    },

    {
        word: "Communication",
        type: "noun",
        meaning: "İletişim",
        example: "Good communication is important in friendship.",
        exampleTr: "İyi iletişim arkadaşlıkta önemlidir."
    },

    {
        word: "Trust",
        type: "noun",
        meaning: "Güven",
        example: "Trust is important in a friendship.",
        exampleTr: "Güven bir arkadaşlıkta önemlidir."
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
        example: "They have a good relationship.",
        exampleTr: "Onların iyi bir ilişkisi var."
    },

    {
        word: "Invitation",
        type: "noun",
        meaning: "Davet",
        example: "I sent an invitation to my friend.",
        exampleTr: "Arkadaşıma bir davet gönderdim."
    },

    {
        word: "Honest",
        type: "adjective",
        meaning: "Dürüst",
        example: "My best friend is always honest with me.",
        exampleTr: "En iyi arkadaşım bana karşı her zaman dürüsttür."
    },

    {
        word: "Dishonest/Liar",
        type: "adjective / noun",
        meaning: "Yalancı",
        example: "He is dishonest and often tells lies.",
        exampleTr: "O dürüst değildir ve sık sık yalan söyler."
    },

    {
        word: "Generous",
        type: "adjective",
        meaning: "Cömert",
        example: "She is generous and likes helping others.",
        exampleTr: "O cömerttir ve başkalarına yardım etmeyi sever."
    },

    {
        word: "Stingy/Mean",
        type: "adjective",
        meaning: "Cimri",
        example: "He is stingy and never shares his things.",
        exampleTr: "O cimridir ve eşyalarını asla paylaşmaz."
    },

    {
        word: "Helpful",
        type: "adjective",
        meaning: "Yardımsever",
        example: "My friend is very helpful when I need help.",
        exampleTr: "Yardıma ihtiyacım olduğunda arkadaşım çok yardımseverdir."
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
        example: "She is polite and kind to everyone.",
        exampleTr: "O herkese karşı kibar ve naziktir."
    },

    {
        word: "Rude",
        type: "adjective",
        meaning: "Kaba",
        example: "It is rude to interrupt people.",
        exampleTr: "İnsanların sözünü kesmek kabalıktır."
    },

    {
        word: "Funny",
        type: "adjective",
        meaning: "Komik, eğlenceli",
        example: "My friend is very funny.",
        exampleTr: "Arkadaşım çok komiktir."
    },

    {
        word: "Boring",
        type: "adjective",
        meaning: "Sıkıcı",
        example: "The movie was boring.",
        exampleTr: "Film sıkıcıydı."
    },

    {
        word: "Friendly",
        type: "adjective",
        meaning: "Arkadaş canlısı",
        example: "Our new classmate is very friendly.",
        exampleTr: "Yeni sınıf arkadaşımız çok arkadaş canlısıdır."
    },

    {
        word: "Cheerful",
        type: "adjective",
        meaning: "Neşeli",
        example: "She is always cheerful and happy.",
        exampleTr: "O her zaman neşeli ve mutludur."
    },

    {
        word: "Aggressive",
        type: "adjective",
        meaning: "Agresif",
        example: "He can be aggressive when he is angry.",
        exampleTr: "Kızdığında agresif olabilir."
    },

    {
        word: "Jealous",
        type: "adjective",
        meaning: "Kıskanç",
        example: "She is jealous of her friend's success.",
        exampleTr: "Arkadaşının başarısını kıskanıyor."
    },

    {
        word: "Calm",
        type: "adjective",
        meaning: "Sakin",
        example: "My friend is calm in difficult situations.",
        exampleTr: "Arkadaşım zor durumlarda sakindir."
    },

    {
        word: "Outgoing",
        type: "adjective",
        meaning: "Sosyal/Girişken",
        example: "She is outgoing and makes friends easily.",
        exampleTr: "O sosyal ve kolayca arkadaş edinir."
    },

    {
        word: "Easygoing",
        type: "adjective",
        meaning: "Uysal",
        example: "He is easygoing and gets along with everyone.",
        exampleTr: "O uysaldır ve herkesle iyi anlaşır."
    },

    {
        word: "Punctual",
        type: "adjective",
        meaning: "Dakik",
        example: "My friend is always punctual.",
        exampleTr: "Arkadaşım her zaman dakiktir."
    },

    {
        word: "Laid-back",
        type: "adjective",
        meaning: "Rahat/Umursamaz",
        example: "He is laid-back and never gets stressed.",
        exampleTr: "O rahattır ve asla strese girmez."
    },

    {
        word: "Supportive",
        type: "adjective",
        meaning: "Destekleyici",
        example: "A good friend is always supportive.",
        exampleTr: "İyi bir arkadaş her zaman destekleyicidir."
    },

    {
        word: "Reliable",
        type: "adjective",
        meaning: "Güvenilir",
        example: "She is reliable and keeps her promises.",
        exampleTr: "O güvenilirdir ve sözlerini tutar."
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
        example: "She is tactful when talking to her friends.",
        exampleTr: "Arkadaşlarıyla konuşurken ince düşüncelidir."
    },

    {
        word: "Sneaky",
        type: "adjective",
        meaning: "Sinsi",
        example: "The sneaky boy took his friend's book.",
        exampleTr: "Sinsi çocuk arkadaşının kitabını aldı."
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
        example: "It is unfair to blame your friend.",
        exampleTr: "Arkadaşını suçlamak adaletsizdir."
    },

    {
        word: "Loyal",
        type: "adjective",
        meaning: "Sadık",
        example: "A loyal friend always stands by you.",
        exampleTr: "Sadık bir arkadaş her zaman senin yanında olur."
    },

    {
        word: "Caring",
        type: "adjective",
        meaning: "İlgili",
        example: "She is caring and always listens to me.",
        exampleTr: "O ilgili biridir ve beni her zaman dinler."
    },

    {
        word: "Arrogant",
        type: "adjective",
        meaning: "Kibirli",
        example: "He is arrogant and thinks he is better than others.",
        exampleTr: "O kibirlidir ve kendisinin diğerlerinden daha iyi olduğunu düşünür."
    },

    {
        word: "Understanding",
        type: "adjective",
        meaning: "Anlayışlı",
        example: "My friend is understanding when I have problems.",
        exampleTr: "Sorunlarım olduğunda arkadaşım anlayışlıdır."
    },

    {
        word: "Respectful",
        type: "adjective",
        meaning: "Saygılı",
        example: "She is respectful to her teachers and friends.",
        exampleTr: "O öğretmenlerine ve arkadaşlarına karşı saygılıdır."
    },

    {
        word: "Cool",
        type: "adjective",
        meaning: "Havalı",
        example: "My new friend is really cool.",
        exampleTr: "Yeni arkadaşım gerçekten havalı."
    },

    {
        word: "Bad-tempered",
        type: "adjective",
        meaning: "Kötü huylu",
        example: "He is bad-tempered when he is tired.",
        exampleTr: "Yorgun olduğunda kötü huylu olur."
    },

    {
        word: "Good-tempered",
        type: "adjective",
        meaning: "İyi huylu",
        example: "She is good-tempered and rarely gets angry.",
        exampleTr: "O iyi huyludur ve nadiren sinirlenir."
    },

    {
        word: "Invite",
        type: "verb",
        meaning: "Davet etmek",
        example: "I want to invite my friend to my birthday party.",
        exampleTr: "Arkadaşımı doğum günü partime davet etmek istiyorum."
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
        example: "He refused my invitation.",
        exampleTr: "Davetimi reddetti."
    },

    {
        word: "Apologize",
        type: "verb",
        meaning: "Özür dilemek",
        example: "I apologized to my friend.",
        exampleTr: "Arkadaşımdan özür diledim."
    },

    {
        word: "Forgive",
        type: "verb",
        meaning: "Affetmek",
        example: "I forgave my friend after the argument.",
        exampleTr: "Tartışmadan sonra arkadaşımı affettim."
    },

    {
        word: "Share",
        type: "verb",
        meaning: "Paylaşmak",
        example: "Good friends share their things.",
        exampleTr: "İyi arkadaşlar eşyalarını paylaşır."
    },

    {
        word: "Join/Attend",
        type: "verb",
        meaning: "Katılmak",
        example: "I will join the party with my friends.",
        exampleTr: "Arkadaşlarımla partiye katılacağım."
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
        example: "We keep in touch during the summer.",
        exampleTr: "Yaz boyunca iletişimde kalırız."
    },

    {
        word: "Get on well with",
        type: "phrase",
        meaning: "İyi anlaşmak",
        example: "I get on well with my classmates.",
        exampleTr: "Sınıf arkadaşlarımla iyi anlaşırım."
    },

    {
        word: "Come over",
        type: "phrasal verb",
        meaning: "Uğramak",
        example: "Why don't you come over after school?",
        exampleTr: "Okuldan sonra neden bize uğramıyorsun?"
    },

    {
        word: "Ask",
        type: "verb",
        meaning: "Sormak",
        example: "I asked my friend a question.",
        exampleTr: "Arkadaşıma bir soru sordum."
    },

    {
        word: "Communicate",
        type: "verb",
        meaning: "İletişim kurmak",
        example: "Good friends communicate with each other.",
        exampleTr: "İyi arkadaşlar birbirleriyle iletişim kurarlar."
    },

    {
        word: "Keep secret",
        type: "phrase",
        meaning: "Sır tutmak",
        example: "I can keep your secret.",
        exampleTr: "Sırrını saklayabilirim."
    },

    {
        word: "Support/Back up",
        type: "verb",
        meaning: "Desteklemek",
        example: "My friends always support me.",
        exampleTr: "Arkadaşlarım beni her zaman destekler."
    },

    {
        word: "Trust/Count on",
        type: "verb",
        meaning: "Güvenmek",
        example: "I can always trust my best friend.",
        exampleTr: "En iyi arkadaşıma her zaman güvenebilirim."
    },

    {
        word: "Believe in",
        type: "phrase",
        meaning: "İnanmak",
        example: "My parents believe in me.",
        exampleTr: "Ailem bana inanıyor."
    },

    {
        word: "Make an excuse",
        type: "phrase",
        meaning: "Bahane bulmak",
        example: "He always makes an excuse when he is late.",
        exampleTr: "Geç kaldığında her zaman bahane bulur."
    },

    {
        word: "Argue",
        type: "verb",
        meaning: "Tartışmak",
        example: "Good friends do not argue about small things.",
        exampleTr: "İyi arkadaşlar küçük şeyler hakkında tartışmaz."
    },

    {
        word: "Send",
        type: "verb",
        meaning: "Göndermek",
        example: "I sent an invitation to my friend.",
        exampleTr: "Arkadaşıma bir davet gönderdim."
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

            <p class="meaning">
                ${item.meaning}
            </p>

            <button
                class="audio-btn"
                id="audioButton"
                title="Listen">

                🔊

            </button>

           <div class="example-box">

    <div class="example-label">
        Example Sentence
    </div>

    <p class="example">
        ${item.example}
    </p>

    <p class="example-tr">
        ${item.exampleTr}
    </p>

</div>
            <div class="word-actions">

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