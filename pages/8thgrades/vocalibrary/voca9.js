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
    word: "researcher",
    type: "noun",
    meaning: "Araştırmacı",
    example: "The researcher conducted an important experiment.",
    exampleTr: "Araştırmacı önemli bir deney yaptı."
},

{
    word: "laboratory",
    type: "noun",
    meaning: "Laboratuvar",
    example: "Scientists work in a laboratory.",
    exampleTr: "Bilim insanları bir laboratuvarda çalışır."
},

{
    word: "technology",
    type: "noun",
    meaning: "Teknoloji",
    example: "Technology changes our lives.",
    exampleTr: "Teknoloji hayatımızı değiştirir."
},

{
    word: "scientist",
    type: "noun",
    meaning: "Bilim insanı",
    example: "The scientist made an important discovery.",
    exampleTr: "Bilim insanı önemli bir keşif yaptı."
},

{
    word: "invent",
    type: "verb",
    meaning: "İcat etmek",
    example: "Alexander Graham Bell invented the telephone.",
    exampleTr: "Alexander Graham Bell telefonu icat etti."
},

{
    word: "inventor",
    type: "noun",
    meaning: "Mucit",
    example: "The inventor designed a new machine.",
    exampleTr: "Mucit yeni bir makine tasarladı."
},

{
    word: "invention",
    type: "noun",
    meaning: "İcat",
    example: "The invention changed people's lives.",
    exampleTr: "İcat insanların hayatlarını değiştirdi."
},

{
    word: "discovery",
    type: "noun",
    meaning: "Keşif",
    example: "The discovery was very important for science.",
    exampleTr: "Keşif bilim için çok önemliydi."
},

{
    word: "research",
    type: "noun",
    meaning: "Araştırma",
    example: "Scientists do research to find new solutions.",
    exampleTr: "Bilim insanları yeni çözümler bulmak için araştırma yapar."
},

{
    word: "solution",
    type: "noun",
    meaning: "Çözüm",
    example: "Scientists are looking for a solution to the problem.",
    exampleTr: "Bilim insanları soruna bir çözüm arıyor."
},

{
    word: "device",
    type: "noun",
    meaning: "Cihaz",
    example: "This device helps people communicate.",
    exampleTr: "Bu cihaz insanların iletişim kurmasına yardımcı olur."
},

{
    word: "machine",
    type: "noun",
    meaning: "Makine",
    example: "The scientist designed a new machine.",
    exampleTr: "Bilim insanı yeni bir makine tasarladı."
},

{
    word: "laboratory equipment",
    type: "phrase",
    meaning: "Laboratuvar ekipmanı",
    example: "Scientists need special laboratory equipment.",
    exampleTr: "Bilim insanlarının özel laboratuvar ekipmanlarına ihtiyacı vardır."
},

{
    word: "scientific discovery",
    type: "phrase",
    meaning: "Bilimsel keşif",
    example: "It was an important scientific discovery.",
    exampleTr: "Bu önemli bir bilimsel keşifti."
},

{
    word: "make progress",
    type: "phrase",
    meaning: "İlerleme kaydetmek",
    example: "Scientists are making progress in medicine.",
    exampleTr: "Bilim insanları tıp alanında ilerleme kaydediyor."
},

{
    word: "solve a problem",
    type: "phrase",
    meaning: "Bir problemi çözmek",
    example: "Scientists try to solve difficult problems.",
    exampleTr: "Bilim insanları zor problemleri çözmeye çalışır."
},

{
    word: "Chemist",
    type: "noun",
    meaning: "Kimyager",
    example: "The chemist conducted an experiment in the laboratory.",
    exampleTr: "Kimyager laboratuvarda bir deney yaptı."
},

{
    word: "Physicist",
    type: "noun",
    meaning: "Fizikçi",
    example: "The physicist studied the effects of gravity.",
    exampleTr: "Fizikçi yerçekiminin etkilerini inceledi."
},

{
    word: "Scientific developments",
    type: "phrase",
    meaning: "Bilimsel gelişmeler",
    example: "Scientific developments can change our lives.",
    exampleTr: "Bilimsel gelişmeler hayatımızı değiştirebilir."
},

{
    word: "Nobel Prize",
    type: "proper noun",
    meaning: "Nobel Ödülü",
    example: "He won the Nobel Prize for his scientific work.",
    exampleTr: "Bilimsel çalışmaları sayesinde Nobel Ödülü kazandı."
},

{
    word: "Astronomy",
    type: "noun",
    meaning: "Astronomi",
    example: "She is interested in astronomy and space.",
    exampleTr: "Astronomi ve uzayla ilgileniyor."
},

{
    word: "Medicine",
    type: "noun",
    meaning: "Tıp",
    example: "Scientists make new discoveries in medicine.",
    exampleTr: "Bilim insanları tıp alanında yeni keşifler yapıyor."
},

{
    word: "Gravity",
    type: "noun",
    meaning: "Yerçekimi",
    example: "Gravity keeps us on the Earth.",
    exampleTr: "Yerçekimi bizi Dünya üzerinde tutar."
},

{
    word: "Black hole",
    type: "noun",
    meaning: "Kara delik",
    example: "Scientists study black holes in space.",
    exampleTr: "Bilim insanları uzaydaki kara delikleri inceler."
},

{
    word: "Stem cells",
    type: "noun",
    meaning: "Kök hücreler",
    example: "Scientists are researching stem cells.",
    exampleTr: "Bilim insanları kök hücreler üzerinde araştırma yapıyor."
},

{
    word: "Equation",
    type: "noun",
    meaning: "Denklem",
    example: "The physicist solved a difficult equation.",
    exampleTr: "Fizikçi zor bir denklemi çözdü."
},

{
    word: "Artificial",
    type: "adjective",
    meaning: "Yapay",
    example: "Scientists developed an artificial heart.",
    exampleTr: "Bilim insanları yapay bir kalp geliştirdi."
},

{
    word: "Virtual",
    type: "adjective",
    meaning: "Sanal",
    example: "Virtual technology is becoming more common.",
    exampleTr: "Sanal teknoloji giderek daha yaygın hale geliyor."
},

{
    word: "Endeavor",
    type: "noun",
    meaning: "Çaba, gayret",
    example: "His scientific endeavor changed the world.",
    exampleTr: "Onun bilimsel çabası dünyayı değiştirdi."
},

{
    word: "Accomplishment",
    type: "noun",
    meaning: "Başarı",
    example: "Winning the prize was a great accomplishment.",
    exampleTr: "Ödülü kazanmak büyük bir başarıydı."
},

{
    word: "Contribution",
    type: "noun",
    meaning: "Katkı",
    example: "Her contribution to science was important.",
    exampleTr: "Onun bilime katkısı önemliydi."
},

{
    word: "Durable",
    type: "adjective",
    meaning: "Dayanıklı, uzun ömürlü",
    example: "The new material is strong and durable.",
    exampleTr: "Yeni malzeme güçlü ve dayanıklıdır."
},

{
    word: "Academician",
    type: "noun",
    meaning: "Akademisyen",
    example: "The academician conducted important scientific research.",
    exampleTr: "Akademisyen önemli bir bilimsel araştırma yaptı."
},

{
    word: "Aim",
    type: "noun",
    meaning: "Amaç, hedef",
    example: "The aim of the experiment is to find a solution.",
    exampleTr: "Deneyin amacı bir çözüm bulmaktır."
},

{
    word: "Achievement",
    type: "noun",
    meaning: "Başarı",
    example: "His achievement changed the world of science.",
    exampleTr: "Onun başarısı bilim dünyasını değiştirdi."
},

{
    word: "Award",
    type: "noun",
    meaning: "Ödül",
    example: "She received an award for her invention.",
    exampleTr: "İcadı için bir ödül aldı."
},

{
    word: "Battery",
    type: "noun",
    meaning: "Pil, batarya",
    example: "This device has a rechargeable battery.",
    exampleTr: "Bu cihazın şarj edilebilir bir bataryası var."
},

{
    word: "Cell",
    type: "noun",
    meaning: "Hücre",
    example: "Scientists study human cells.",
    exampleTr: "Bilim insanları insan hücrelerini inceler."
},

{
    word: "Chemical",
    type: "noun",
    meaning: "Kimyasal madde",
    example: "The scientist used a chemical in the experiment.",
    exampleTr: "Bilim insanı deneyde bir kimyasal kullandı."
},

{
    word: "Competition",
    type: "noun",
    meaning: "Yarışma, rekabet",
    example: "He won a science competition.",
    exampleTr: "Bir bilim yarışmasını kazandı."
},

{
    word: "Competitor",
    type: "noun",
    meaning: "Yarışmacı, rakip",
    example: "Each competitor presented an invention.",
    exampleTr: "Her yarışmacı bir icat sundu."
},

{
    word: "Ethical",
    type: "adjective",
    meaning: "Etik, ahlaki",
    example: "Scientists should consider ethical problems.",
    exampleTr: "Bilim insanları etik sorunları göz önünde bulundurmalıdır."
},

{
    word: "Ground-breaking",
    type: "adjective",
    meaning: "Çığır açan",
    example: "It was a ground-breaking scientific discovery.",
    exampleTr: "Bu çığır açan bir bilimsel keşifti."
},

{
    word: "Patent",
    type: "noun",
    meaning: "Patent, buluş hakkı",
    example: "The inventor applied for a patent.",
    exampleTr: "Mucit patent başvurusunda bulundu."
},

{
    word: "Prevent",
    type: "verb",
    meaning: "Önlemek, engellemek",
    example: "Vaccines can prevent some diseases.",
    exampleTr: "Aşılar bazı hastalıkları önleyebilir."
},

{
    word: "Recognize",
    type: "verb",
    meaning: "Fark etmek, tanımak",
    example: "The scientist was recognized for his work.",
    exampleTr: "Bilim insanı çalışmaları nedeniyle takdir edildi."
},

{
    word: "Succeed",
    type: "verb",
    meaning: "Başarmak",
    example: "Scientists work hard to succeed.",
    exampleTr: "Bilim insanları başarılı olmak için çok çalışır."
},

{
    word: "Successful",
    type: "adjective",
    meaning: "Başarılı",
    example: "The experiment was successful.",
    exampleTr: "Deney başarılı oldu."
},

{
    word: "Technology",
    type: "noun",
    meaning: "Teknoloji",
    example: "Modern technology makes our lives easier.",
    exampleTr: "Modern teknoloji hayatımızı kolaylaştırır."
},

{
    word: "Therefore",
    type: "adverb",
    meaning: "Bu nedenle, dolayısıyla",
    example: "The experiment failed; therefore, they tried again.",
    exampleTr: "Deney başarısız oldu; bu nedenle tekrar denediler."
},

{
    word: "Theory",
    type: "noun",
    meaning: "Teori, kuram",
    example: "Scientists developed a new theory.",
    exampleTr: "Bilim insanları yeni bir teori geliştirdi."
},

{
    word: "Transmit",
    type: "verb",
    meaning: "İletmek, aktarmak",
    example: "Radio waves transmit information.",
    exampleTr: "Radyo dalgaları bilgi iletir."
},

{
    word: "Valuable",
    type: "adjective",
    meaning: "Değerli",
    example: "Her research provided valuable information.",
    exampleTr: "Onun araştırması değerli bilgiler sağladı."
},

{
    word: "Researcher",
    type: "noun",
    meaning: "Araştırmacı",
    example: "The researcher conducted an experiment.",
    exampleTr: "Araştırmacı bir deney yaptı."
},

{
    word: "Technological",
    type: "adjective",
    meaning: "Teknolojik",
    example: "Technological developments change our lives.",
    exampleTr: "Teknolojik gelişmeler hayatımızı değiştirir."
},

{
    word: "Innovation",
    type: "noun",
    meaning: "Yenilik, inovasyon",
    example: "Innovation can improve people's lives.",
    exampleTr: "Yenilik insanların hayatlarını geliştirebilir."
},

{
    word: "Innovative",
    type: "adjective",
    meaning: "Yenilikçi",
    example: "She has an innovative idea.",
    exampleTr: "Onun yenilikçi bir fikri var."
},

{
    word: "Breakthrough",
    type: "noun",
    meaning: "Çığır açan gelişme",
    example: "The scientist made an important breakthrough.",
    exampleTr: "Bilim insanı önemli bir çığır açan gelişme gerçekleştirdi."
},

{
    word: "Research method",
    type: "noun",
    meaning: "Araştırma yöntemi",
    example: "Scientists use different research methods.",
    exampleTr: "Bilim insanları farklı araştırma yöntemleri kullanır."
},

{
    word: "Analyze",
    type: "verb",
    meaning: "Analiz etmek",
    example: "Scientists analyze the results carefully.",
    exampleTr: "Bilim insanları sonuçları dikkatlice analiz eder."
},

{
    word: "Analysis",
    type: "noun",
    meaning: "Analiz",
    example: "The analysis showed an interesting result.",
    exampleTr: "Analiz ilginç bir sonuç gösterdi."
},

{
    word: "Data",
    type: "noun",
    meaning: "Veri",
    example: "Researchers collect data during experiments.",
    exampleTr: "Araştırmacılar deneyler sırasında veri toplar."
},

{
    word: "Evidence",
    type: "noun",
    meaning: "Kanıt",
    example: "The scientist found evidence to support the theory.",
    exampleTr: "Bilim insanı teoriyi destekleyen kanıt buldu."
},

{
    word: "Prove",
    type: "verb",
    meaning: "Kanıtlamak",
    example: "The experiment can prove the theory.",
    exampleTr: "Deney teoriyi kanıtlayabilir."
},

{
    word: "Pioneer",
    type: "noun",
    meaning: "Öncü",
    example: "He was a pioneer in modern science.",
    exampleTr: "O, modern bilimde bir öncüydü."
},

{
    word: "Influence",
    type: "verb",
    meaning: "Etkilemek, etki",
    example: "Technology influences our daily lives.",
    exampleTr: "Teknoloji günlük hayatımızı etkiler."
},

{
    word: "Influential",
    type: "adjective",
    meaning: "Etkili",
    example: "He was an influential scientist.",
    exampleTr: "O, etkili bir bilim insanıydı."
},

{
    word: "Inspire",
    type: "verb",
    meaning: "İlham vermek",
    example: "Great scientists inspire young people.",
    exampleTr: "Büyük bilim insanları gençlere ilham verir."
},

{
    word: "Inspiration",
    type: "noun",
    meaning: "İlham",
    example: "Her teacher was an inspiration to her.",
    exampleTr: "Öğretmeni onun için bir ilham kaynağıydı."
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
        "unit9"
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
                "No Unit 9 progress found."
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
            "Unit 9 progress loaded:",
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
                    `Unit 9 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 9 completed: +${totalXP} XP`
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
                    Unit 9 Complete
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