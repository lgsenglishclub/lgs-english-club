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
// UNIT 2 VOCABULARY
// =========================================

const vocabulary = [

{
    word: "Chores",
    type: "noun",
    meaning: "Ev işleri",
    example: "Everyone should help with the household chores.",
    exampleTr: "Herkes ev işlerine yardım etmelidir."
},

{
    word: "Housework",
    type: "noun",
    meaning: "Ev işi",
    example: "We share the housework at home.",
    exampleTr: "Evde ev işlerini paylaşırız."
},

{
    word: "Do errands",
    type: "phrase",
    meaning: "Ayak işlerini yapmak",
    example: "I have to do some errands today.",
    exampleTr: "Bugün bazı ayak işlerini yapmam gerekiyor."
},

{
    word: "Do the ironing",
    type: "phrase",
    meaning: "Ütü yapmak",
    example: "I usually do the ironing at the weekend.",
    exampleTr: "Genellikle hafta sonu ütü yaparım."
},

{
    word: "Dust the furniture",
    type: "phrase",
    meaning: "Mobilyaların tozunu almak",
    example: "I dust the furniture every Saturday.",
    exampleTr: "Her cumartesi mobilyaların tozunu alırım."
},

{
    word: "Empty the dishwasher",
    type: "phrase",
    meaning: "Bulaşık makinesini boşaltmak",
    example: "Can you empty the dishwasher, please?",
    exampleTr: "Bulaşık makinesini boşaltabilir misin?"
},

{
    word: "Feed the pet",
    type: "phrase",
    meaning: "Evcil hayvanı beslemek",
    example: "I feed the pet every morning.",
    exampleTr: "Her sabah evcil hayvanı beslerim."
},

{
    word: "Have strong ties",
    type: "phrase",
    meaning: "Güçlü bağlara sahip olmak",
    example: "We have strong ties with our family.",
    exampleTr: "Ailemizle güçlü bağlarımız var."
},

{
    word: "In charge of",
    type: "phrase",
    meaning: "Sorumlu olmak",
    example: "I am in charge of cleaning my room.",
    exampleTr: "Odamı temizlemekten ben sorumluyum."
},

{
    word: "Load the dishwasher",
    type: "phrase",
    meaning: "Bulaşık makinesini doldurmak",
    example: "Please load the dishwasher after dinner.",
    exampleTr: "Lütfen akşam yemeğinden sonra bulaşık makinesini doldur."
},

{
    word: "Make the bed",
    type: "phrase",
    meaning: "Yatağı toplamak",
    example: "I make my bed every morning.",
    exampleTr: "Her sabah yatağımı toplarım."
},

{
    word: "Mess",
    type: "noun",
    meaning: "Dağınıklık",
    example: "Your room is a mess.",
    exampleTr: "Odan çok dağınık."
},

{
    word: "Mop the floor",
    type: "phrase",
    meaning: "Yeri paspaslamak",
    example: "I mop the floor once a week.",
    exampleTr: "Haftada bir kez yeri paspaslarım."
},

{
    word: "Rule",
    type: "noun",
    meaning: "Kural",
    example: "Students must obey the classroom rules.",
    exampleTr: "Öğrenciler sınıf kurallarına uymalıdır."
},

{
    word: "Responsibility",
    type: "noun",
    meaning: "Sorumluluk",
    example: "Family members should share responsibilities.",
    exampleTr: "Aile üyeleri sorumlulukları paylaşmalıdır."
},

{
    word: "Take out the garbage",
    type: "phrase",
    meaning: "Çöpü dışarı çıkarmak",
    example: "I take out the garbage every evening.",
    exampleTr: "Her akşam çöpü dışarı çıkarırım."
},

{
    word: "Tidy up the room",
    type: "phrase",
    meaning: "Odayı toparlamak",
    example: "I need to tidy up my room.",
    exampleTr: "Odamı toparlamam gerekiyor."
},

{
    word: "To-do list",
    type: "noun",
    meaning: "Yapılacaklar listesi",
    example: "I wrote everything on my to-do list.",
    exampleTr: "Her şeyi yapılacaklar listeme yazdım."
},

{
    word: "Vacuum the carpet",
    type: "phrase",
    meaning: "Halıyı süpürmek",
    example: "I vacuum the carpet every weekend.",
    exampleTr: "Her hafta sonu halıyı süpürürüm."
},

{
    word: "Walk the dog",
    type: "phrase",
    meaning: "Köpeği gezdirmek",
    example: "I walk the dog after school.",
    exampleTr: "Okuldan sonra köpeği gezdiririm."
},

{
    word: "Separate the laundry",
    type: "phrase",
    meaning: "Çamaşırları ayırmak",
    example: "I separate the laundry before washing it.",
    exampleTr: "Çamaşırları yıkamadan önce ayırırım."
},

{
    word: "Fold the clothes",
    type: "phrase",
    meaning: "Kıyafetleri katlamak",
    example: "I fold the clothes after doing the laundry.",
    exampleTr: "Çamaşırları yıkadıktan sonra kıyafetleri katlarım."
},

{
    word: "Do the grocery shopping",
    type: "phrase",
    meaning: "Market alışverişi yapmak",
    example: "My mother does the grocery shopping every weekend.",
    exampleTr: "Annem her hafta sonu market alışverişi yapar."
},

{
    word: "Vacuum the house",
    type: "phrase",
    meaning: "Evi elektrikli süpürgeyle süpürmek",
    example: "I vacuum the house on Saturdays.",
    exampleTr: "Cumartesileri evi elektrikli süpürgeyle süpürürüm."
},

{
    word: "Clean the windows",
    type: "phrase",
    meaning: "Pencereleri temizlemek",
    example: "We clean the windows once a month.",
    exampleTr: "Ayda bir kez pencereleri temizleriz."
},

{
    word: "Take care of the baby",
    type: "phrase",
    meaning: "Bebekle ilgilenmek",
    example: "She takes care of the baby while her mother is away.",
    exampleTr: "Annesi yokken bebeğe o bakıyor."
},

{
    word: "Mow the lawn",
    type: "phrase",
    meaning: "Çimleri biçmek",
    example: "My father mows the lawn every Sunday.",
    exampleTr: "Babam her pazar çimleri biçer."
},

{
    word: "Wash the car",
    type: "phrase",
    meaning: "Araba yıkamak",
    example: "I wash the car at the weekend.",
    exampleTr: "Hafta sonu arabayı yıkarım."
},

{
    word: "Clean up the garage",
    type: "phrase",
    meaning: "Garajı temizlemek",
    example: "We need to clean up the garage.",
    exampleTr: "Garajı temizlememiz gerekiyor."
},

{
    word: "Keep a diary",
    type: "phrase",
    meaning: "Günlük tutmak",
    example: "I like to keep a diary.",
    exampleTr: "Günlük tutmayı seviyorum."
},

{
    word: "Obey",
    type: "verb",
    meaning: "İtaat etmek, uymak",
    example: "Students must obey the rules.",
    exampleTr: "Öğrenciler kurallara uymalıdır."
},

{
    word: "Make mistakes",
    type: "phrase",
    meaning: "Hata yapmak",
    example: "Everyone can make mistakes.",
    exampleTr: "Herkes hata yapabilir."
},

{
    word: "Annoyed",
    type: "adjective",
    meaning: "Kızgın, rahatsız olmuş",
    example: "She feels annoyed when her brother makes a mess.",
    exampleTr: "Kardeşi dağınıklık yaptığında rahatsız hisseder."
},

{
    word: "Nervous",
    type: "adjective",
    meaning: "Gergin",
    example: "I feel nervous before an exam.",
    exampleTr: "Sınavdan önce gergin hissederim."
},

{
    word: "Fair",
    type: "adjective",
    meaning: "Adil",
    example: "Sharing responsibilities is fair.",
    exampleTr: "Sorumlulukları paylaşmak adildir."
},

{
    word: "Encouraging",
    type: "adjective",
    meaning: "Cesaretlendirici",
    example: "My parents are always encouraging.",
    exampleTr: "Ailem her zaman cesaretlendiricidir."
},

{
    word: "Tidy",
    type: "adjective",
    meaning: "Düzenli",
    example: "I always keep my room tidy.",
    exampleTr: "Odamı her zaman düzenli tutarım."
},

{
    word: "Untidy",
    type: "adjective",
    meaning: "Dağınık",
    example: "His room is always untidy.",
    exampleTr: "Onun odası her zaman dağınıktır."
},

{
    word: "Permission",
    type: "noun",
    meaning: "İzin",
    example: "Children need permission to go out.",
    exampleTr: "Çocukların dışarı çıkmak için izne ihtiyacı vardır."
},

{
    word: "Allow",
    type: "verb",
    meaning: "İzin vermek",
    example: "My parents allow me to play after I finish my chores.",
    exampleTr: "Ailem ev işlerimi bitirdikten sonra oynamama izin verir."
},

{
    word: "Require",
    type: "verb",
    meaning: "Gerektirmek",
    example: "Some chores require more time.",
    exampleTr: "Bazı ev işleri daha fazla zaman gerektirir."
},

{
    word: "Cooperate",
    type: "verb",
    meaning: "İş birliği yapmak",
    example: "Family members should cooperate with each other.",
    exampleTr: "Aile üyeleri birbirleriyle iş birliği yapmalıdır."
},

{
    word: "Share",
    type: "verb",
    meaning: "Paylaşmak",
    example: "We share the household chores.",
    exampleTr: "Ev işlerini paylaşırız."
},

{
    word: "Argue",
    type: "verb",
    meaning: "Tartışmak",
    example: "My brother and I sometimes argue about chores.",
    exampleTr: "Kardeşimle bazen ev işleri hakkında tartışırız."
},

{
    word: "Apologize",
    type: "verb",
    meaning: "Özür dilemek",
    example: "You should apologize when you make a mistake.",
    exampleTr: "Hata yaptığında özür dilemelisin."
},

{
    word: "Punishment",
    type: "noun",
    meaning: "Ceza",
    example: "Breaking the rules may result in punishment.",
    exampleTr: "Kuralları çiğnemek cezaya yol açabilir."
},

{
    word: "Reward",
    type: "noun / verb",
    meaning: "Ödül, ödüllendirmek",
    example: "Parents sometimes give rewards for good behavior.",
    exampleTr: "Ebeveynler bazen iyi davranışlar için ödül verir."
},

{
    word: "Fix",
    type: "verb",
    meaning: "Tamir etmek",
    example: "My father fixes things at home.",
    exampleTr: "Babam evdeki şeyleri tamir eder."
},

{
    word: "Hang out the washing",
    type: "phrase",
    meaning: "Yıkanan çamaşırları asmak",
    example: "I hang out the washing after doing the laundry.",
    exampleTr: "Çamaşırları yıkadıktan sonra onları asarım."
},

{
    word: "Place the dishes",
    type: "phrase",
    meaning: "Tabakları yerleştirmek",
    example: "Please place the dishes in the cupboard.",
    exampleTr: "Lütfen tabakları dolaba yerleştir."
},

{
    word: "Sweep the leaves",
    type: "phrase",
    meaning: "Yaprakları süpürmek",
    example: "I sweep the leaves in the garden.",
    exampleTr: "Bahçedeki yaprakları süpürürüm."
},

{
    word: "Water the plants",
    type: "phrase",
    meaning: "Bitkileri sulamak",
    example: "I water the plants every morning.",
    exampleTr: "Her sabah bitkileri sularım."
},

{
    word: "Share the housework",
    type: "phrase",
    meaning: "Ev işlerini paylaşmak",
    example: "We share the housework at home.",
    exampleTr: "Evde ev işlerini paylaşırız."
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
        "unit8"
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
                "No Unit 8 progress found."
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
            "Unit 8 progress loaded:",
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
                    `Unit 8 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 8 completed: +${totalXP} XP`
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
                    Unit 8 Complete
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