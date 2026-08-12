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
    word: "Absence",
    type: "noun",
    meaning: "Yokluk",
    example: "His absence was noticed by everyone.",
    exampleTr: "Onun yokluğu herkes tarafından fark edildi."
},
{
    word: "Acre",
    type: "noun",
    meaning: "Dönüm",
    example: "They own an acre of land.",
    exampleTr: "Bir dönüm arazileri var."
},
{
    word: "Aftershock",
    type: "noun",
    meaning: "Artçı sarsıntı",
    example: "Several aftershocks followed the earthquake.",
    exampleTr: "Depremden sonra birkaç artçı sarsıntı meydana geldi."
},
{
    word: "Agriculture",
    type: "noun",
    meaning: "Tarım",
    example: "Agriculture is important for the country's economy.",
    exampleTr: "Tarım ülkenin ekonomisi için önemlidir."
},
{
    word: "Air pollution",
    type: "noun",
    meaning: "Hava kirliliği",
    example: "Air pollution is a serious environmental problem.",
    exampleTr: "Hava kirliliği ciddi bir çevre sorunudur."
},
{
    word: "Animal species",
    type: "noun",
    meaning: "Hayvan türleri",
    example: "Many animal species are in danger.",
    exampleTr: "Birçok hayvan türü tehlike altındadır."
},
{
    word: "Ash",
    type: "noun",
    meaning: "Kül",
    example: "Ash covered the streets after the volcanic eruption.",
    exampleTr: "Volkanik patlamadan sonra sokakları kül kapladı."
},
{
    word: "Authorities",
    type: "noun",
    meaning: "Yetkililer",
    example: "The authorities warned people about the storm.",
    exampleTr: "Yetkililer insanları fırtına hakkında uyardı."
},
{
    word: "Avalanche",
    type: "noun",
    meaning: "Çığ",
    example: "The avalanche blocked the mountain road.",
    exampleTr: "Çığ dağ yolunu kapattı."
},
{
    word: "Blow",
    type: "verb",
    meaning: "Esmek",
    example: "The wind is blowing strongly today.",
    exampleTr: "Bugün rüzgar güçlü esiyor."
},
{
    word: "Blow off",
    type: "phrasal verb",
    meaning: "Uçurmak",
    example: "The strong wind blew off the roof.",
    exampleTr: "Güçlü rüzgar çatıyı uçurdu."
},
{
    word: "Cause",
    type: "verb",
    meaning: "Sebep olmak",
    example: "Heavy rain can cause floods.",
    exampleTr: "Şiddetli yağmur sellere sebep olabilir."
},
{
    word: "Climate",
    type: "noun",
    meaning: "İklim",
    example: "The climate is changing around the world.",
    exampleTr: "Dünyanın her yerinde iklim değişiyor."
},
{
    word: "Climate change",
    type: "noun",
    meaning: "İklim değişikliği",
    example: "Climate change affects all living things.",
    exampleTr: "İklim değişikliği tüm canlıları etkiler."
},
{
    word: "Collapse",
    type: "verb",
    meaning: "Çökmek, yıkılmak",
    example: "The building collapsed after the earthquake.",
    exampleTr: "Bina depremden sonra çöktü."
},
{
    word: "Crops",
    type: "noun",
    meaning: "Mahsuller, ekinler",
    example: "The drought destroyed the crops.",
    exampleTr: "Kuraklık mahsulleri yok etti."
},
{
    word: "Damage",
    type: "verb",
    meaning: "Zarar vermek",
    example: "The storm damaged many houses.",
    exampleTr: "Fırtına birçok eve zarar verdi."
},
{
    word: "Damaged",
    type: "adjective",
    meaning: "Hasar görmüş",
    example: "The damaged buildings were unsafe.",
    exampleTr: "Hasar görmüş binalar güvenli değildi."
},
{
    word: "Drought",
    type: "noun",
    meaning: "Kuraklık",
    example: "The drought caused a water shortage.",
    exampleTr: "Kuraklık su kıtlığına neden oldu."
},
{
    word: "Deforestation",
    type: "noun",
    meaning: "Ormansızlaşma",
    example: "Deforestation harms the environment.",
    exampleTr: "Ormansızlaşma çevreye zarar verir."
},
{
    word: "Destroy",
    type: "verb",
    meaning: "Yok etmek",
    example: "The earthquake destroyed many buildings.",
    exampleTr: "Deprem birçok binayı yok etti."
},
{
    word: "Environment",
    type: "noun",
    meaning: "Çevre",
    example: "We must protect the environment.",
    exampleTr: "Çevreyi korumalıyız."
},
{
    word: "Flood",
    type: "noun",
    meaning: "Sel",
    example: "The flood damaged many houses.",
    exampleTr: "Sel birçok eve zarar verdi."
},
{
    word: "Global warming",
    type: "noun",
    meaning: "Küresel ısınma",
    example: "Global warming is a major environmental problem.",
    exampleTr: "Küresel ısınma önemli bir çevre sorunudur."
},
{
    word: "Greenhouse gases",
    type: "noun",
    meaning: "Sera gazları",
    example: "Greenhouse gases contribute to global warming.",
    exampleTr: "Sera gazları küresel ısınmaya katkıda bulunur."
},
{
    word: "Hurricane",
    type: "noun",
    meaning: "Kasırga",
    example: "The hurricane hit the city last night.",
    exampleTr: "Kasırga dün gece şehri vurdu."
},
{
    word: "Landslide",
    type: "noun",
    meaning: "Toprak kayması",
    example: "The heavy rain caused a landslide.",
    exampleTr: "Şiddetli yağmur bir toprak kaymasına neden oldu."
},
{
    word: "Lightning",
    type: "noun",
    meaning: "Yıldırım",
    example: "The lightning frightened the children.",
    exampleTr: "Yıldırım çocukları korkuttu."
},
{
    word: "Natural disasters",
    type: "noun",
    meaning: "Doğal afetler",
    example: "Earthquakes and floods are natural disasters.",
    exampleTr: "Depremler ve seller doğal afetlerdir."
},
{
    word: "Volcanic eruption",
    type: "noun",
    meaning: "Volkanik patlama",
    example: "The volcanic eruption covered the area with ash.",
    exampleTr: "Volkanik patlama bölgeyi külle kapladı."
},

{
    word: "Natural phenomena",
    type: "noun",
    meaning: "Doğal olaylar",
    example: "Earthquakes and storms are natural phenomena.",
    exampleTr: "Depremler ve fırtınalar doğal olaylardır."
},
{
    word: "Disaster",
    type: "noun",
    meaning: "Afet, felaket",
    example: "Natural disasters can cause serious damage.",
    exampleTr: "Doğal afetler ciddi hasara neden olabilir."
},
{
    word: "Main quake",
    type: "noun",
    meaning: "Ana deprem",
    example: "The main quake caused the most damage.",
    exampleTr: "Ana deprem en fazla hasara neden oldu."
},
{
    word: "Tsunami",
    type: "noun",
    meaning: "Tsunami",
    example: "The earthquake caused a tsunami.",
    exampleTr: "Deprem bir tsunamiyi tetikledi."
},
{
    word: "Fault lines",
    type: "noun",
    meaning: "Fay hatları",
    example: "Many earthquakes happen along fault lines.",
    exampleTr: "Birçok deprem fay hatları boyunca meydana gelir."
},
{
    word: "Rainfall",
    type: "noun",
    meaning: "Yağış, yağış miktarı",
    example: "Heavy rainfall caused flooding.",
    exampleTr: "Şiddetli yağış sel baskınına neden oldu."
},
{
    word: "Water sources",
    type: "noun",
    meaning: "Su kaynakları",
    example: "We must protect our water sources.",
    exampleTr: "Su kaynaklarımızı korumalıyız."
},
{
    word: "Energy shortage",
    type: "noun",
    meaning: "Enerji sıkıntısı, enerji kıtlığı",
    example: "The country is facing an energy shortage.",
    exampleTr: "Ülke enerji sıkıntısıyla karşı karşıya."
},
{
    word: "Soil contamination",
    type: "noun",
    meaning: "Toprak kirliliği",
    example: "Soil contamination can harm plants.",
    exampleTr: "Toprak kirliliği bitkilere zarar verebilir."
},
{
    word: "Water pollution",
    type: "noun",
    meaning: "Su kirliliği",
    example: "Water pollution harms sea animals.",
    exampleTr: "Su kirliliği deniz hayvanlarına zarar verir."
},
{
    word: "Land pollution",
    type: "noun",
    meaning: "Kara çevre kirliliği",
    example: "Land pollution is a serious environmental problem.",
    exampleTr: "Kara kirliliği ciddi bir çevre sorunudur."
},
{
    word: "Overpopulation",
    type: "noun",
    meaning: "Aşırı nüfuslanma",
    example: "Overpopulation can cause environmental problems.",
    exampleTr: "Aşırı nüfuslanma çevresel sorunlara neden olabilir."
},
{
    word: "Ecosystem destruction",
    type: "noun",
    meaning: "Ekosistem yıkımı",
    example: "Ecosystem destruction threatens many species.",
    exampleTr: "Ekosistem yıkımı birçok türü tehdit eder."
},
{
    word: "Wildlife conservation",
    type: "noun",
    meaning: "Vahşi yaşamı koruma",
    example: "Wildlife conservation is important for future generations.",
    exampleTr: "Vahşi yaşamı korumak gelecek nesiller için önemlidir."
},
{
    word: "Fossil fuel depletion",
    type: "noun",
    meaning: "Fosil yakıtların tükenmesi",
    example: "Fossil fuel depletion is a global concern.",
    exampleTr: "Fosil yakıtların tükenmesi küresel bir endişedir."
},
{
    word: "Toxic waste",
    type: "noun",
    meaning: "Zehirli atık",
    example: "Toxic waste can pollute rivers.",
    exampleTr: "Zehirli atıklar nehirleri kirletebilir."
},
{
    word: "Environmental issues",
    type: "noun",
    meaning: "Çevresel sorunlar",
    example: "We should talk about environmental issues.",
    exampleTr: "Çevresel sorunlar hakkında konuşmalıyız."
},
{
    word: "Magnitude",
    type: "noun",
    meaning: "Büyüklük",
    example: "The earthquake had a magnitude of six.",
    exampleTr: "Depremin büyüklüğü altıydı."
},
{
    word: "Pressure",
    type: "noun",
    meaning: "Basınç",
    example: "Air pressure changes before a storm.",
    exampleTr: "Fırtınadan önce hava basıncı değişir."
},
{
    word: "Depth",
    type: "noun",
    meaning: "Derinlik",
    example: "The depth of the lake is unknown.",
    exampleTr: "Gölün derinliği bilinmiyor."
},
{
    word: "Altitude",
    type: "noun",
    meaning: "Rakım, yükseklik",
    example: "The village is at a high altitude.",
    exampleTr: "Köy yüksek bir rakımdadır."
},
{
    word: "Severity",
    type: "noun",
    meaning: "Şiddet",
    example: "The severity of the storm surprised everyone.",
    exampleTr: "Fırtınanın şiddeti herkesi şaşırttı."
},
{
    word: "Prediction",
    type: "noun",
    meaning: "Tahmin",
    example: "The weather prediction says it will rain.",
    exampleTr: "Hava tahmini yağmur yağacağını söylüyor."
},
{
    word: "Precaution",
    type: "noun",
    meaning: "Önlem, tedbir",
    example: "We should take precautions against earthquakes.",
    exampleTr: "Depremlere karşı önlem almalıyız."
},
{
    word: "Protect",
    type: "verb",
    meaning: "Korumak",
    example: "We must protect the environment.",
    exampleTr: "Çevreyi korumalıyız."
},
{
    word: "Preserve",
    type: "verb",
    meaning: "Korumak",
    example: "We should preserve natural resources.",
    exampleTr: "Doğal kaynakları korumalıyız."
},
{
    word: "Take the necessary measures",
    type: "verb phrase",
    meaning: "Gerekli önlemleri almak",
    example: "We must take the necessary measures before a disaster.",
    exampleTr: "Bir afetten önce gerekli önlemleri almalıyız."
},
{
    word: "Consist of",
    type: "phrasal verb",
    meaning: "Oluşmak, meydana gelmek",
    example: "The Earth consists of several layers.",
    exampleTr: "Dünya birkaç katmandan oluşur."
},
{
    word: "Pollute",
    type: "verb",
    meaning: "Kirletmek",
    example: "Factories can pollute the air.",
    exampleTr: "Fabrikalar havayı kirletebilir."
},
{
    word: "Use the water efficiently",
    type: "verb phrase",
    meaning: "Suyu etkili kullanmak",
    example: "We should use the water efficiently.",
    exampleTr: "Suyu etkili kullanmalıyız."
},
{
    word: "Injure",
    type: "verb",
    meaning: "Yaralamak",
    example: "The accident injured several people.",
    exampleTr: "Kaza birkaç kişiyi yaraladı."
},
{
    word: "Lose",
    type: "verb",
    meaning: "Kaybetmek",
    example: "Many farmers lose their crops during droughts.",
    exampleTr: "Birçok çiftçi kuraklık sırasında mahsullerini kaybeder."
},
{
    word: "Reflect",
    type: "verb",
    meaning: "Yansıtmak",
    example: "Snow reflects sunlight.",
    exampleTr: "Kar güneş ışığını yansıtır."
},
{
    word: "Build up",
    type: "phrasal verb",
    meaning: "Büyümek, güçlenmek",
    example: "Pressure can build up under the Earth's surface.",
    exampleTr: "Dünya yüzeyinin altında basınç birikebilir."
},
{
    word: "Strike",
    type: "verb",
    meaning: "Vurmak, çarpmak",
    example: "Lightning can strike buildings.",
    exampleTr: "Yıldırım binalara çarpabilir."
},
{
    word: "Stay calm",
    type: "verb phrase",
    meaning: "Sakin kalmak",
    example: "Stay calm during an earthquake.",
    exampleTr: "Deprem sırasında sakin kal."
},
{
    word: "Take place",
    type: "verb phrase",
    meaning: "Meydana gelmek, gerçekleşmek",
    example: "Earthquakes can take place at any time.",
    exampleTr: "Depremler herhangi bir zamanda meydana gelebilir."
},
{
    word: "Reach up",
    type: "phrasal verb",
    meaning: "Ulaşmak, erişmek",
    example: "The flames reached up to the roof.",
    exampleTr: "Alevler çatıya kadar ulaştı."
},
{
    word: "Extend",
    type: "verb",
    meaning: "Genişletmek, yaymak",
    example: "The fire extended across the forest.",
    exampleTr: "Yangın orman boyunca yayıldı."
},
{
    word: "Eject",
    type: "verb",
    meaning: "Çıkarmak, dışarı atmak",
    example: "Volcanoes can eject ash and gases.",
    exampleTr: "Volkanlar kül ve gaz çıkarabilir."
},
{
    word: "Stick",
    type: "verb",
    meaning: "Yapışmak",
    example: "Mud can stick to your shoes.",
    exampleTr: "Çamur ayakkabılarına yapışabilir."
},
{
    word: "Worth",
    type: "adjective",
    meaning: "Değer, değmek",
    example: "This natural wonder is worth seeing.",
    exampleTr: "Bu doğa harikası görülmeye değer."
},

{
    word: "Evacuate",
    type: "verb",
    meaning: "Tahliye etmek",
    example: "People had to evacuate the building after the earthquake.",
    exampleTr: "Depremden sonra insanların binayı tahliye etmesi gerekti."
},
{
    word: "Evacuation",
    type: "noun",
    meaning: "Tahliye",
    example: "The authorities ordered the evacuation of the area.",
    exampleTr: "Yetkililer bölgenin tahliye edilmesini emretti."
},
{
    word: "Shelter",
    type: "noun",
    meaning: "Sığınak, barınak",
    example: "The victims stayed in an emergency shelter.",
    exampleTr: "Mağdurlar acil durum barınağında kaldı."
},
{
    word: "Victim",
    type: "noun",
    meaning: "Mağdur, kurban",
    example: "Rescue teams helped the earthquake victims.",
    exampleTr: "Kurtarma ekipleri deprem mağdurlarına yardım etti."
},
{
    word: "Rescue",
    type: "verb",
    meaning: "Kurtarmak",
    example: "Rescue teams saved people trapped under the debris.",
    exampleTr: "Kurtarma ekipleri enkaz altında mahsur kalan insanları kurtardı."
},
{
    word: "Debris",
    type: "noun",
    meaning: "Enkaz, döküntü",
    example: "Several people were trapped under the debris.",
    exampleTr: "Birkaç kişi enkazın altında mahsur kaldı."
},
{
    word: "Survive",
    type: "verb",
    meaning: "Hayatta kalmak",
    example: "Some people survived the disaster.",
    exampleTr: "Bazı insanlar felaketten sağ kurtuldu."
},
{
    word: "Warning",
    type: "noun",
    meaning: "Uyarı",
    example: "The authorities gave a warning about the storm.",
    exampleTr: "Yetkililer fırtına hakkında uyarıda bulundu."
},
{
    word: "Emergency",
    type: "noun",
    meaning: "Acil durum",
    example: "Call for help in an emergency.",
    exampleTr: "Acil durumda yardım çağır."
},
{
    word: "Resources",
    type: "noun",
    meaning: "Kaynaklar",
    example: "We should protect our natural resources.",
    exampleTr: "Doğal kaynaklarımızı korumalıyız."
},
{
    word: "Renewable energy",
    type: "noun",
    meaning: "Yenilenebilir enerji",
    example: "Renewable energy can help protect the environment.",
    exampleTr: "Yenilenebilir enerji çevrenin korunmasına yardımcı olabilir."
},
{
    word: "Recycling",
    type: "noun",
    meaning: "Geri dönüşüm",
    example: "Recycling helps reduce waste.",
    exampleTr: "Geri dönüşüm atıkları azaltmaya yardımcı olur."
},
{
    word: "Reduce waste",
    type: "verb phrase",
    meaning: "Atıkları azaltmak",
    example: "We should reduce waste to protect nature.",
    exampleTr: "Doğayı korumak için atıkları azaltmalıyız."
},
{
    word: "Endangered species",
    type: "noun",
    meaning: "Nesli tükenmekte olan türler",
    example: "We must protect endangered species.",
    exampleTr: "Nesli tükenmekte olan türleri korumalıyız."
},
{
    word: "Carbon footprint",
    type: "noun",
    meaning: "Karbon ayak izi",
    example: "Using public transport can reduce our carbon footprint.",
    exampleTr: "Toplu taşıma kullanmak karbon ayak izimizi azaltabilir."
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
        "unit10"
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
                "No Unit 10 progress found."
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
            "Unit 10 progress loaded:",
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
                    `Unit 10 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 10 completed: +${totalXP} XP`
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
                    Unit 10 Complete
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