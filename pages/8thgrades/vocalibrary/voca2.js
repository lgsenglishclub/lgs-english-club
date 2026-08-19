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
        word: "Teen",
        type: "noun",
        meaning: "Genç",
        example: "The teen is going to school.",
        exampleTr: "Genç okula gidiyor."
    },

    {
        word: "Teenager",
        type: "noun",
        meaning: "Genç",
        example: "The teenager likes listening to music.",
        exampleTr: "Genç müzik dinlemeyi seviyor."
    },

    {
        word: "Adult",
        type: "noun",
        meaning: "Yetişkin",
        example: "The adult is reading a book.",
        exampleTr: "Yetişkin kitap okuyor."
    },

    {
        word: "Boy",
        type: "noun",
        meaning: "Erkek çocuk",
        example: "The boy is playing computer games.",
        exampleTr: "Erkek çocuk bilgisayar oyunu oynuyor."
    },

    {
        word: "Girl",
        type: "noun",
        meaning: "Kız çocuk",
        example: "The girl is doing her homework.",
        exampleTr: "Kız çocuk ödevini yapıyor."
    },

    {
        word: "Man",
        type: "noun",
        meaning: "Adam",
        example: "The man is going shopping.",
        exampleTr: "Adam alışverişe gidiyor."
    },

    {
        word: "Woman",
        type: "noun",
        meaning: "Kadın",
        example: "The woman is cooking dinner.",
        exampleTr: "Kadın akşam yemeği pişiriyor."
    },

    {
        word: "Children",
        type: "noun",
        meaning: "Çocuklar",
        example: "The children are playing outside.",
        exampleTr: "Çocuklar dışarıda oynuyor."
    },

    {
        word: "Student",
        type: "noun",
        meaning: "Öğrenci",
        example: "The student studies every day.",
        exampleTr: "Öğrenci her gün ders çalışır."
    },


    {
        word: "Wake up",
        type: "phrasal verb",
        meaning: "Uyanmak",
        example: "I wake up at seven every morning.",
        exampleTr: "Her sabah yedide uyanırım."
    },

    {
        word: "Get up",
        type: "phrasal verb",
        meaning: "Kalkmak",
        example: "I get up early on weekdays.",
        exampleTr: "Hafta içi erken kalkarım."
    },

    {
        word: "Wash my hands and face",
        type: "phrase",
        meaning: "Ellerini ve yüzünü yıkamak",
        example: "I wash my hands and face after I get up.",
        exampleTr: "Kalktıktan sonra ellerimi ve yüzümü yıkarım."
    },

    {
        word: "Have breakfast",
        type: "phrase",
        meaning: "Kahvaltı yapmak",
        example: "I have breakfast before going to school.",
        exampleTr: "Okula gitmeden önce kahvaltı yaparım."
    },

    {
        word: "Brush teeth",
        type: "phrase",
        meaning: "Diş fırçalamak",
        example: "I brush my teeth every morning.",
        exampleTr: "Her sabah dişlerimi fırçalarım."
    },

    {
        word: "Get dressed",
        type: "phrasal verb",
        meaning: "Giyinmek",
        example: "I get dressed before breakfast.",
        exampleTr: "Kahvaltıdan önce giyinirim."
    },

    {
        word: "Leave home",
        type: "phrase",
        meaning: "Evden ayrılmak",
        example: "I leave home at eight o'clock.",
        exampleTr: "Saat sekizde evden ayrılırım."
    },

    {
        word: "Go to school",
        type: "phrase",
        meaning: "Okula gitmek",
        example: "I go to school by bus.",
        exampleTr: "Okula otobüsle giderim."
    },

    {
        word: "Arrive at school",
        type: "phrase",
        meaning: "Okula varmak",
        example: "I arrive at school at half past eight.",
        exampleTr: "Okula saat sekiz buçukta varırım."
    },

    {
        word: "Attend classes",
        type: "phrase",
        meaning: "Derslere katılmak",
        example: "Students attend classes every weekday.",
        exampleTr: "Öğrenciler her hafta içi derslere katılır."
    },

    {
        word: "Have lunch",
        type: "phrase",
        meaning: "Öğle yemeği yemek",
        example: "We have lunch at school.",
        exampleTr: "Okulda öğle yemeği yeriz."
    },

    {
        word: "Come back home",
        type: "phrase",
        meaning: "Eve dönmek",
        example: "I come back home at four.",
        exampleTr: "Saat dörtte eve dönerim."
    },

    {
        word: "Have a rest",
        type: "phrase",
        meaning: "Dinlenmek",
        example: "I have a rest after school.",
        exampleTr: "Okuldan sonra dinlenirim."
    },

    {
        word: "Do homework",
        type: "phrase",
        meaning: "Ödev yapmak",
        example: "I do my homework in the evening.",
        exampleTr: "Akşamları ödevimi yaparım."
    },

    {
        word: "Study",
        type: "verb",
        meaning: "Ders çalışmak",
        example: "I study English every day.",
        exampleTr: "Her gün İngilizce çalışırım."
    },

    {
        word: "Take a shower",
        type: "phrase",
        meaning: "Duş almak",
        example: "I take a shower before dinner.",
        exampleTr: "Akşam yemeğinden önce duş alırım."
    },

    {
        word: "Have dinner",
        type: "phrase",
        meaning: "Akşam yemeği yemek",
        example: "My family has dinner together.",
        exampleTr: "Ailem akşam yemeğini birlikte yer."
    },

    {
        word: "Go to bed",
        type: "phrase",
        meaning: "Yatağa gitmek",
        example: "I go to bed at ten.",
        exampleTr: "Saat onda yatağa giderim."
    },

    {
        word: "Sleep",
        type: "verb",
        meaning: "Uyumak",
        example: "I sleep for eight hours every night.",
        exampleTr: "Her gece sekiz saat uyurum."
    },


    {
        word: "Hang out",
        type: "phrasal verb",
        meaning: "Takılmak",
        example: "I hang out with my friends at weekends.",
        exampleTr: "Hafta sonları arkadaşlarımla takılırım."
    },

    {
        word: "Meet friends",
        type: "phrase",
        meaning: "Arkadaşlarla buluşmak",
        example: "I meet friends after school.",
        exampleTr: "Okuldan sonra arkadaşlarımla buluşurum."
    },

    {
        word: "Watch TV",
        type: "phrase",
        meaning: "Televizyon izlemek",
        example: "I watch TV in my free time.",
        exampleTr: "Boş zamanlarımda televizyon izlerim."
    },

    {
        word: "Listen to music",
        type: "phrase",
        meaning: "Müzik dinlemek",
        example: "I listen to music in the evening.",
        exampleTr: "Akşamları müzik dinlerim."
    },

    {
        word: "Play computer games",
        type: "phrase",
        meaning: "Bilgisayar oyunu oynamak",
        example: "My brother likes to play computer games.",
        exampleTr: "Erkek kardeşim bilgisayar oyunu oynamayı sever."
    },

    {
        word: "Surf the Internet",
        type: "phrase",
        meaning: "İnternette gezinmek",
        example: "I surf the Internet in my free time.",
        exampleTr: "Boş zamanlarımda internette gezinirim."
    },

    {
        word: "Read a book",
        type: "phrase",
        meaning: "Kitap okumak",
        example: "I read a book before going to bed.",
        exampleTr: "Yatmadan önce kitap okurum."
    },

    {
        word: "Go shopping",
        type: "phrase",
        meaning: "Alışverişe gitmek",
        example: "I go shopping with my mother.",
        exampleTr: "Annemle alışverişe giderim."
    },

    {
        word: "Ride a bike",
        type: "phrase",
        meaning: "Bisiklete binmek",
        example: "I ride a bike in the park.",
        exampleTr: "Parkta bisiklete binerim."
    },

    {
        word: "Chat online",
        type: "phrase",
        meaning: "Çevrimiçi sohbet etmek",
        example: "I chat online with my friends.",
        exampleTr: "Arkadaşlarımla çevrimiçi sohbet ederim."
    },

    {
        word: "Watch movies",
        type: "phrase",
        meaning: "Film izlemek",
        example: "We watch movies at weekends.",
        exampleTr: "Hafta sonları film izleriz."
    },

    {
        word: "Go for a walk",
        type: "phrase",
        meaning: "Yürüyüşe çıkmak",
        example: "I go for a walk in the evening.",
        exampleTr: "Akşamları yürüyüşe çıkarım."
    },

    {
        word: "Go swimming",
        type: "phrase",
        meaning: "Yüzmeye gitmek",
        example: "We go swimming on Sundays.",
        exampleTr: "Pazar günleri yüzmeye gideriz."
    },

    {
        word: "Go jogging",
        type: "phrase",
        meaning: "Koşuya çıkmak",
        example: "My father goes jogging every morning.",
        exampleTr: "Babam her sabah koşuya çıkar."
    },

    {
        word: "Go fishing",
        type: "phrase",
        meaning: "Balık tutmaya gitmek",
        example: "We go fishing at the weekend.",
        exampleTr: "Hafta sonu balık tutmaya gideriz."
    },

    {
        word: "Go skating",
        type: "phrase",
        meaning: "Paten kaymaya gitmek",
        example: "I go skating with my friends.",
        exampleTr: "Arkadaşlarımla paten kaymaya giderim."
    },

    {
        word: "Draw pictures",
        type: "phrase",
        meaning: "Resim çizmek",
        example: "She likes drawing pictures.",
        exampleTr: "O, resim çizmeyi sever."
    },

    {
        word: "Cook",
        type: "verb",
        meaning: "Yemek pişirmek",
        example: "I like cooking with my mother.",
        exampleTr: "Annemle yemek pişirmeyi severim."
    },

    {
        word: "Spend time with friends",
        type: "phrase",
        meaning: "Arkadaşlarla vakit geçirmek",
        example: "I spend time with friends after school.",
        exampleTr: "Okuldan sonra arkadaşlarımla vakit geçiririm."
    },

    {
        word: "Visit relatives",
        type: "phrase",
        meaning: "Akrabaları ziyaret etmek",
        example: "We visit relatives during holidays.",
        exampleTr: "Tatillerde akrabalarımızı ziyaret ederiz."
    },

    {
        word: "Play board games",
        type: "phrase",
        meaning: "Kutu oyunları oynamak",
        example: "We play board games with our family.",
        exampleTr: "Ailemizle kutu oyunları oynarız."
    },

    {
        word: "Do puzzles",
        type: "phrase",
        meaning: "Yapboz çözmek",
        example: "I do puzzles in my free time.",
        exampleTr: "Boş zamanlarımda yapboz çözerim."
    },

    {
        word: "Meet new people",
        type: "phrase",
        meaning: "Yeni insanlarla tanışmak",
        example: "I like meeting new people.",
        exampleTr: "Yeni insanlarla tanışmayı severim."
    },

    {
        word: "Attend a course",
        type: "phrase",
        meaning: "Kursa katılmak",
        example: "I attend a music course on Saturdays.",
        exampleTr: "Cumartesi günleri bir müzik kursuna katılırım."
    },

    {
        word: "Play an instrument",
        type: "phrase",
        meaning: "Enstrüman çalmak",
        example: "I play an instrument in my free time.",
        exampleTr: "Boş zamanlarımda enstrüman çalarım."
    },

    {
        word: "Take photos",
        type: "phrase",
        meaning: "Fotoğraf çekmek",
        example: "I take photos when I travel.",
        exampleTr: "Seyahat ettiğimde fotoğraf çekerim."
    },

    {
        word: "Do sports",
        type: "phrase",
        meaning: "Spor yapmak",
        example: "I do sports three times a week.",
        exampleTr: "Haftada üç kez spor yaparım."
    },

    {
        word: "Dance",
        type: "verb",
        meaning: "Dans etmek",
        example: "She loves dancing with her friends.",
        exampleTr: "Arkadaşlarıyla dans etmeyi çok sever."
    },

    {
        word: "Sing songs",
        type: "phrase",
        meaning: "Şarkı söylemek",
        example: "We sing songs together.",
        exampleTr: "Birlikte şarkı söyleriz."
    },

    {
        word: "Go camping",
        type: "phrase",
        meaning: "Kamp yapmak",
        example: "We go camping every summer.",
        exampleTr: "Her yaz kamp yaparız."
    },


    {
        word: "Tent",
        type: "noun",
        meaning: "Çadır",
        example: "We need a tent for camping.",
        exampleTr: "Kamp yapmak için bir çadıra ihtiyacımız var."
    },

    {
        word: "Pocketknife",
        type: "noun",
        meaning: "Cep bıçağı",
        example: "He has a pocketknife in his backpack.",
        exampleTr: "Sırt çantasında bir cep bıçağı var."
    },

    {
        word: "Sleeping bag",
        type: "noun",
        meaning: "Uyku tulumu",
        example: "I need a sleeping bag for the night.",
        exampleTr: "Gece için bir uyku tulumuna ihtiyacım var."
    },

    {
        word: "Backpack",
        type: "noun",
        meaning: "Sırt çantası",
        example: "My backpack is full of camping equipment.",
        exampleTr: "Sırt çantam kamp malzemeleriyle dolu."
    },

    {
        word: "Flashlight",
        type: "noun",
        meaning: "El feneri",
        example: "Take a flashlight because it will be dark.",
        exampleTr: "Hava karanlık olacağı için bir el feneri al."
    },

    {
        word: "Compass",
        type: "noun",
        meaning: "Pusula",
        example: "We use a compass to find the right direction.",
        exampleTr: "Doğru yönü bulmak için pusula kullanırız."
    },

    {
        word: "Map",
        type: "noun",
        meaning: "Harita",
        example: "Look at the map before you start walking.",
        exampleTr: "Yürümeye başlamadan önce haritaya bak."
    },

    {
        word: "Rope",
        type: "noun",
        meaning: "İp",
        example: "We need a rope for the camping trip.",
        exampleTr: "Kamp gezisi için bir ipe ihtiyacımız var."
    },

    {
        word: "First aid kit",
        type: "noun",
        meaning: "İlk yardım çantası",
        example: "Don't forget to take the first aid kit.",
        exampleTr: "İlk yardım çantasını almayı unutma."
    },

    {
        word: "Match",
        type: "noun",
        meaning: "Kibrit",
        example: "We need matches to make a fire.",
        exampleTr: "Ateş yakmak için kibrite ihtiyacımız var."
    },


    {
        word: "Adventure",
        type: "noun",
        meaning: "Macera",
        example: "I love reading adventure books.",
        exampleTr: "Macera kitapları okumayı severim."
    },

    {
        word: "Biography",
        type: "noun",
        meaning: "Biyografi",
        example: "She is reading a biography of a famous person.",
        exampleTr: "Ünlü bir kişinin biyografisini okuyor."
    },

    {
        word: "Detective",
        type: "noun",
        meaning: "Polisiye",
        example: "My brother likes detective books.",
        exampleTr: "Erkek kardeşim polisiye kitapları sever."
    },

    {
        word: "Comic book",
        type: "noun",
        meaning: "Çizgi roman",
        example: "I enjoy reading comic books.",
        exampleTr: "Çizgi roman okumaktan hoşlanırım."
    },

    {
        word: "Fantasy",
        type: "noun",
        meaning: "Fantastik",
        example: "Fantasy books are very popular.",
        exampleTr: "Fantastik kitaplar çok popülerdir."
    },

    {
        word: "Science fiction",
        type: "noun",
        meaning: "Bilim kurgu",
        example: "He enjoys science fiction stories.",
        exampleTr: "Bilim kurgu hikâyelerinden hoşlanır."
    },

    {
        word: "Horror",
        type: "noun",
        meaning: "Korku",
        example: "I don't like horror books.",
        exampleTr: "Korku kitaplarını sevmem."
    },

    {
        word: "Mystery",
        type: "noun",
        meaning: "Gizem",
        example: "She likes mystery novels.",
        exampleTr: "Gizem romanlarını sever."
    },

    {
        word: "Poetry",
        type: "noun",
        meaning: "Şiir",
        example: "My sister enjoys reading poetry.",
        exampleTr: "Kız kardeşim şiir okumaktan hoşlanır."
    },

    {
        word: "Fairy tale",
        type: "noun",
        meaning: "Masal",
        example: "Children love reading fairy tales.",
        exampleTr: "Çocuklar masal okumayı sever."
    },


    {
        word: "Pop",
        type: "noun",
        meaning: "Pop müzik",
        example: "I usually listen to pop music.",
        exampleTr: "Genellikle pop müzik dinlerim."
    },

    {
        word: "Rock",
        type: "noun",
        meaning: "Rock müzik",
        example: "My brother listens to rock music.",
        exampleTr: "Erkek kardeşim rock müzik dinler."
    },

    {
        word: "Rap",
        type: "noun",
        meaning: "Rap müzik",
        example: "She likes listening to rap music.",
        exampleTr: "Rap müzik dinlemeyi sever."
    },

    {
        word: "Hip hop",
        type: "noun",
        meaning: "Hip hop",
        example: "Hip hop is popular among teenagers.",
        exampleTr: "Hip hop gençler arasında popülerdir."
    },

    {
        word: "Jazz",
        type: "noun",
        meaning: "Caz müziği",
        example: "My father enjoys listening to jazz.",
        exampleTr: "Babam caz müziği dinlemekten hoşlanır."
    },

    {
        word: "Classical",
        type: "noun",
        meaning: "Klasik müzik",
        example: "She often listens to classical music.",
        exampleTr: "O, sık sık klasik müzik dinler."
    },

    {
        word: "Folk",
        type: "noun",
        meaning: "Halk müziği",
        example: "My grandparents enjoy folk music.",
        exampleTr: "Büyükanne ve büyükbabam halk müziğinden hoşlanır."
    },

    {
        word: "Heavy metal",
        type: "noun",
        meaning: "Ağır metal",
        example: "He listens to heavy metal music.",
        exampleTr: "O, heavy metal müzik dinler."
    },


    {
        word: "Action",
        type: "noun",
        meaning: "Aksiyon",
        example: "I like watching action movies.",
        exampleTr: "Aksiyon filmleri izlemeyi severim."
    },

    {
        word: "Comedy",
        type: "noun",
        meaning: "Komedi",
        example: "We watched a comedy last night.",
        exampleTr: "Dün gece bir komedi filmi izledik."
    },

    {
        word: "Horror",
        type: "noun",
        meaning: "Korku",
        example: "My sister doesn't watch horror movies.",
        exampleTr: "Kız kardeşim korku filmleri izlemez."
    },

    {
        word: "Animation",
        type: "noun",
        meaning: "Animasyon",
        example: "Children usually enjoy animation movies.",
        exampleTr: "Çocuklar genellikle animasyon filmlerinden hoşlanır."
    },

    {
        word: "Documentary",
        type: "noun",
        meaning: "Belgesel",
        example: "I watched a documentary about animals.",
        exampleTr: "Hayvanlarla ilgili bir belgesel izledim."
    },

    {
        word: "Cartoon",
        type: "noun",
        meaning: "Çizgi film",
        example: "The children are watching a cartoon.",
        exampleTr: "Çocuklar çizgi film izliyor."
    },

    {
        word: "Thriller",
        type: "noun",
        meaning: "Gerilim",
        example: "He enjoys watching thriller movies.",
        exampleTr: "Gerilim filmleri izlemekten hoşlanır."
    },

    {
        word: "Adventure",
        type: "noun",
        meaning: "Macera",
        example: "Adventure movies are exciting.",
        exampleTr: "Macera filmleri heyecan vericidir."
    },

    {
        word: "Romance",
        type: "noun",
        meaning: "Romantik",
        example: "My sister loves romance movies.",
        exampleTr: "Kız kardeşim romantik filmleri çok sever."
    },

    {
        word: "Science fiction",
        type: "noun",
        meaning: "Bilim kurgu",
        example: "Science fiction movies are my favorite.",
        exampleTr: "Bilim kurgu filmleri benim favorimdir."
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
        "unit2"
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
                "No Unit 2 progress found."
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
            "Unit 2 progress loaded:",
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
                    `Unit 2 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 2 completed: +${totalXP} XP`
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
                    Unit 2 Complete
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