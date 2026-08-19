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
    word: "Account",
    type: "noun",
    meaning: "Hesap",
    example: "I created a new social media account.",
    exampleTr: "Yeni bir sosyal medya hesabı oluşturdum."
},

{
    word: "Application",
    type: "noun",
    meaning: "Uygulama",
    example: "I use this application every day.",
    exampleTr: "Bu uygulamayı her gün kullanırım."
},

{
    word: "Attachment",
    type: "noun",
    meaning: "Ek dosya",
    example: "I sent the attachment with my e-mail.",
    exampleTr: "Ek dosyayı e-postamla gönderdim."
},

{
    word: "Username",
    type: "noun",
    meaning: "Kullanıcı adı",
    example: "Enter your username to log in.",
    exampleTr: "Giriş yapmak için kullanıcı adını gir."
},

{
    word: "Password",
    type: "noun",
    meaning: "Şifre",
    example: "You should keep your password secret.",
    exampleTr: "Şifreni gizli tutmalısın."
},

{
    word: "Search engine",
    type: "noun",
    meaning: "Arama motoru",
    example: "I used a search engine to find the information.",
    exampleTr: "Bilgiyi bulmak için bir arama motoru kullandım."
},

{
    word: "Wireless",
    type: "adjective",
    meaning: "Kablosuz ağ",
    example: "We have a wireless internet connection at home.",
    exampleTr: "Evimizde kablosuz internet bağlantısı var."
},

{
    word: "Connection",
    type: "noun",
    meaning: "Bağlantı",
    example: "The internet connection is very slow today.",
    exampleTr: "İnternet bağlantısı bugün çok yavaş."
},

{
    word: "Website",
    type: "noun",
    meaning: "Web sitesi",
    example: "I visited the school website.",
    exampleTr: "Okulun web sitesini ziyaret ettim."
},

{
    word: "Browser",
    type: "noun",
    meaning: "Tarayıcı",
    example: "Open the website in your browser.",
    exampleTr: "Web sitesini tarayıcında aç."
},

{
    word: "File",
    type: "noun",
    meaning: "Dosya",
    example: "I saved the file on my computer.",
    exampleTr: "Dosyayı bilgisayarıma kaydettim."
},

{
    word: "Social network",
    type: "noun",
    meaning: "Sosyal ağ",
    example: "Many teenagers use social networks.",
    exampleTr: "Birçok genç sosyal ağları kullanıyor."
},

{
    word: "Computer",
    type: "noun",
    meaning: "Bilgisayar",
    example: "I do my homework on my computer.",
    exampleTr: "Ödevimi bilgisayarımda yaparım."
},

{
    word: "Smart phone",
    type: "noun",
    meaning: "Akıllı telefon",
    example: "My smart phone has a good camera.",
    exampleTr: "Akıllı telefonumun iyi bir kamerası var."
},

{
    word: "Online",
    type: "adjective",
    meaning: "Çevrimiçi",
    example: "I am online now.",
    exampleTr: "Şu anda çevrimiçiyim."
},

{
    word: "Offline",
    type: "adjective",
    meaning: "Çevrimdışı",
    example: "He is offline at the moment.",
    exampleTr: "O şu anda çevrimdışı."
},

{
    word: "Post",
    type: "noun",
    meaning: "Gönderi",
    example: "She shared a new post on social media.",
    exampleTr: "Sosyal medyada yeni bir gönderi paylaştı."
},

{
    word: "Register",
    type: "verb",
    meaning: "Kaydolmak",
    example: "You need to register before using the website.",
    exampleTr: "Web sitesini kullanmadan önce kaydolmalısın."
},

{
    word: "Sign up",
    type: "verb",
    meaning: "Kayıt olmak",
    example: "I signed up for a new website.",
    exampleTr: "Yeni bir web sitesine kayıt oldum."
},

{
    word: "Log in",
    type: "verb",
    meaning: "Giriş yapmak",
    example: "Please log in to your account.",
    exampleTr: "Lütfen hesabına giriş yap."
},

{
    word: "Log off",
    type: "verb",
    meaning: "Çıkış yapmak",
    example: "Don't forget to log off after using the computer.",
    exampleTr: "Bilgisayarı kullandıktan sonra çıkış yapmayı unutma."
},

{
    word: "Reset",
    type: "verb",
    meaning: "Sıfırlamak",
    example: "I forgot my password, so I need to reset it.",
    exampleTr: "Şifremi unuttum, bu yüzden onu sıfırlamam gerekiyor."
},

{
    word: "Remember",
    type: "verb",
    meaning: "Hatırlamak",
    example: "Remember your username and password.",
    exampleTr: "Kullanıcı adını ve şifreni hatırla."
},

{
    word: "Reply",
    type: "verb",
    meaning: "Yanıt vermek",
    example: "Please reply to my message.",
    exampleTr: "Lütfen mesajıma yanıt ver."
},

{
    word: "Send",
    type: "verb",
    meaning: "Göndermek",
    example: "I will send you the file.",
    exampleTr: "Sana dosyayı göndereceğim."
},

{
    word: "Search",
    type: "verb",
    meaning: "Araştırmak",
    example: "I searched for information on the Internet.",
    exampleTr: "İnternette bilgi araştırdım."
},

{
    word: "Save",
    type: "verb",
    meaning: "Kaydetmek",
    example: "Don't forget to save the document.",
    exampleTr: "Belgeyi kaydetmeyi unutma."
},

{
    word: "Change",
    type: "verb",
    meaning: "Değiştirmek",
    example: "You should change your password regularly.",
    exampleTr: "Şifreni düzenli olarak değiştirmelisin."
},

{
    word: "Check",
    type: "verb",
    meaning: "Kontrol etmek",
    example: "Check your e-mail before you leave.",
    exampleTr: "Gitmeden önce e-postanı kontrol et."
},

{
    word: "Confirm",
    type: "verb",
    meaning: "Onaylamak",
    example: "Please confirm your e-mail address.",
    exampleTr: "Lütfen e-posta adresini onayla."
},

{
    word: "Connect",
    type: "verb",
    meaning: "Bağlanmak",
    example: "I can't connect to the Internet.",
    exampleTr: "İnternete bağlanamıyorum."
},

{
    word: "Create",
    type: "verb",
    meaning: "Oluşturmak",
    example: "She created a new account.",
    exampleTr: "Yeni bir hesap oluşturdu."
},

{
    word: "Develop",
    type: "verb",
    meaning: "Geliştirmek",
    example: "They developed a new application.",
    exampleTr: "Yeni bir uygulama geliştirdiler."
},

{
    word: "Communicate",
    type: "verb",
    meaning: "İletişim kurmak",
    example: "We communicate with our friends online.",
    exampleTr: "Arkadaşlarımızla çevrimiçi iletişim kurarız."
},

{
    word: "Contact",
    type: "verb",
    meaning: "İletişime geçmek",
    example: "You can contact me by e-mail.",
    exampleTr: "Benimle e-posta yoluyla iletişime geçebilirsin."
},

{
    word: "Attach a file",
    type: "verb",
    meaning: "Dosya eklemek",
    example: "Don't forget to attach the file.",
    exampleTr: "Dosyayı eklemeyi unutma."
},

{
    word: "Insert",
    type: "verb",
    meaning: "Eklemek",
    example: "Insert the picture into the document.",
    exampleTr: "Resmi belgeye ekle."
},

{
    word: "Download",
    type: "verb",
    meaning: "İndirmek",
    example: "I downloaded a new game.",
    exampleTr: "Yeni bir oyun indirdim."
},

{
    word: "Upload",
    type: "verb",
    meaning: "Yüklemek",
    example: "She uploaded a photo to her account.",
    exampleTr: "Hesabına bir fotoğraf yükledi."
},

{
    word: "Delete",
    type: "verb",
    meaning: "Silmek",
    example: "I deleted the old messages.",
    exampleTr: "Eski mesajları sildim."
},

{
    word: "Comment",
    type: "verb",
    meaning: "Yorum yapmak",
    example: "She commented on my post.",
    exampleTr: "Gönderime yorum yaptı."
},

{
    word: "Click",
    type: "verb",
    meaning: "Tıklamak",
    example: "Click the button to continue.",
    exampleTr: "Devam etmek için düğmeye tıkla."
},

{
    word: "Double-click",
    type: "verb",
    meaning: "Çift tıklamak",
    example: "Double-click the file to open it.",
    exampleTr: "Dosyayı açmak için çift tıkla."
},

{
    word: "Go online",
    type: "verb",
    meaning: "Çevrimiçi olmak",
    example: "I usually go online after dinner.",
    exampleTr: "Genellikle akşam yemeğinden sonra çevrimiçi olurum."
},

{
    word: "Browse",
    type: "verb",
    meaning: "Göz atmak",
    example: "I like browsing websites in my free time.",
    exampleTr: "Boş zamanlarımda web sitelerine göz atmayı severim."
},

{
    word: "Store",
    type: "verb",
    meaning: "Depolamak",
    example: "We store our photos online.",
    exampleTr: "Fotoğraflarımızı çevrimiçi depolarız."
},

{
    word: "Ignore",
    type: "verb",
    meaning: "Görmezden gelmek",
    example: "You should ignore messages from strangers.",
    exampleTr: "Yabancılardan gelen mesajları görmezden gelmelisin."
},

{
    word: "Do research",
    type: "verb",
    meaning: "Araştırma yapmak",
    example: "I use the Internet to do research.",
    exampleTr: "Araştırma yapmak için interneti kullanırım."
},

{
    word: "Do homework",
    type: "verb",
    meaning: "Ödev yapmak",
    example: "I do my homework online sometimes.",
    exampleTr: "Bazen ödevimi çevrimiçi yaparım."
},

{
    word: "Do online shopping",
    type: "verb",
    meaning: "Çevrimiçi alışveriş yapmak",
    example: "My mother likes doing online shopping.",
    exampleTr: "Annem çevrimiçi alışveriş yapmayı sever."
},

{
    word: "Send emails",
    type: "verb",
    meaning: "E-posta göndermek",
    example: "I send emails to my teachers.",
    exampleTr: "Öğretmenlerime e-posta gönderirim."
},

{
    word: "Chat live",
    type: "verb",
    meaning: "Canlı sohbet etmek",
    example: "We can chat live on the website.",
    exampleTr: "Web sitesinde canlı sohbet edebiliriz."
},

{
    word: "Make new friends",
    type: "verb",
    meaning: "Yeni arkadaşlar edinmek",
    example: "Social networks help people make new friends.",
    exampleTr: "Sosyal ağlar insanların yeni arkadaşlar edinmesine yardımcı olur."
},

{
    word: "Download music",
    type: "verb",
    meaning: "Müzik indirmek",
    example: "He likes downloading music from the Internet.",
    exampleTr: "İnternetten müzik indirmeyi sever."
},

{
    word: "Upload photo",
    type: "verb",
    meaning: "Fotoğraf yüklemek",
    example: "She uploaded a photo yesterday.",
    exampleTr: "Dün bir fotoğraf yükledi."
},

{
    word: "Surf the internet",
    type: "verb",
    meaning: "İnternette gezinmek",
    example: "I surf the Internet in the evening.",
    exampleTr: "Akşamları internette gezinirim."
},

{
    word: "Pay the bill",
    type: "verb",
    meaning: "Fatura ödemek",
    example: "My father pays the bills online.",
    exampleTr: "Babam faturaları çevrimiçi öder."
},

{
    word: "Play online games",
    type: "verb",
    meaning: "Çevrimiçi oyun oynamak",
    example: "My brother plays online games with his friends.",
    exampleTr: "Kardeşim arkadaşlarıyla çevrimiçi oyun oynar."
},

{
    word: "Watch a movie or video",
    type: "verb",
    meaning: "Film veya video izlemek",
    example: "We watch movies and videos online.",
    exampleTr: "İnternette film ve videolar izleriz."
},

{
    word: "Spend time",
    type: "verb",
    meaning: "Zaman harcamak",
    example: "I spend a lot of time on social media.",
    exampleTr: "Sosyal medyada çok zaman harcıyorum."
},

{
    word: "Get information",
    type: "verb",
    meaning: "Bilgi almak",
    example: "People use the Internet to get information.",
    exampleTr: "İnsanlar bilgi almak için interneti kullanır."
},

{
    word: "Follow fashion",
    type: "verb",
    meaning: "Modayı takip etmek",
    example: "Some teenagers follow fashion on social media.",
    exampleTr: "Bazı gençler sosyal medyada modayı takip eder."
},

{
    word: "Attend online courses",
    type: "verb",
    meaning: "Çevrimiçi kurslara katılmak",
    example: "I attend online courses at weekends.",
    exampleTr: "Hafta sonları çevrimiçi kurslara katılırım."
},

{
    word: "Read newspapers",
    type: "verb",
    meaning: "Gazete okumak",
    example: "My grandfather reads newspapers online.",
    exampleTr: "Dedem gazeteleri çevrimiçi okur."
},

{
    word: "Read online magazines",
    type: "verb",
    meaning: "Çevrimiçi dergiler okumak",
    example: "She reads online magazines in her free time.",
    exampleTr: "Boş zamanlarında çevrimiçi dergiler okur."
},

{
    word: "Safety",
    type: "noun",
    meaning: "Güvenlik",
    example: "Online safety is very important.",
    exampleTr: "Çevrimiçi güvenlik çok önemlidir."
},

{
    word: "Privacy",
    type: "noun",
    meaning: "Gizlilik",
    example: "You should protect your privacy online.",
    exampleTr: "Çevrimiçi gizliliğini korumalısın."
},

{
    word: "Private",
    type: "adjective",
    meaning: "Özel, gizli",
    example: "Keep your personal information private.",
    exampleTr: "Kişisel bilgilerini gizli tut."
},

{
    word: "Public",
    type: "adjective",
    meaning: "Herkese açık",
    example: "Don't share private information in public.",
    exampleTr: "Özel bilgilerini herkese açık şekilde paylaşma."
},

{
    word: "Personal information",
    type: "noun",
    meaning: "Kişisel bilgiler",
    example: "Never share your personal information with strangers.",
    exampleTr: "Kişisel bilgilerini asla yabancılarla paylaşma."
},

{
    word: "Secret word",
    type: "noun",
    meaning: "Gizli kelime",
    example: "Choose a secret word for your account.",
    exampleTr: "Hesabın için bir gizli kelime seç."
},

{
    word: "Precaution",
    type: "noun",
    meaning: "Önlem",
    example: "We should take precautions when using the Internet.",
    exampleTr: "İnterneti kullanırken önlemler almalıyız."
},

{
    word: "Questionnaire",
    type: "noun",
    meaning: "Anket",
    example: "I completed an online questionnaire.",
    exampleTr: "Çevrimiçi bir anket doldurdum."
},

{
    word: "Authorities",
    type: "noun",
    meaning: "Yetkililer",
    example: "You should contact the authorities if you have a problem.",
    exampleTr: "Bir sorun yaşarsan yetkililerle iletişime geçmelisin."
},

{
    word: "Purpose",
    type: "noun",
    meaning: "Amaç",
    example: "What is the purpose of this website?",
    exampleTr: "Bu web sitesinin amacı nedir?"
},

{
    word: "Way",
    type: "noun",
    meaning: "Yol",
    example: "The Internet is a useful way to communicate.",
    exampleTr: "İnternet iletişim kurmak için faydalı bir yoldur."
},

{
    word: "Adult",
    type: "noun",
    meaning: "Yetişkin",
    example: "Adults should help children stay safe online.",
    exampleTr: "Yetişkinler çocukların çevrimiçi güvende kalmasına yardımcı olmalıdır."
},

{
    word: "Percent",
    type: "noun",
    meaning: "Yüzde",
    example: "Eighty percent of the students use the Internet every day.",
    exampleTr: "Öğrencilerin yüzde sekseni her gün internet kullanıyor."
},

{
    word: "Mistake",
    type: "noun",
    meaning: "Yanlışlık",
    example: "Everyone can make a mistake online.",
    exampleTr: "Herkes internette bir hata yapabilir."
},

{
    word: "Addict",
    type: "noun",
    meaning: "Bağımlı",
    example: "He is an Internet addict.",
    exampleTr: "O bir internet bağımlısı."
},

{
    word: "Stranger",
    type: "noun",
    meaning: "Yabancı",
    example: "Never meet a stranger you know only from the Internet.",
    exampleTr: "Sadece internetten tanıdığın bir yabancıyla asla buluşma."
},

{
    word: "Member",
    type: "noun",
    meaning: "Üye",
    example: "She is a member of a social network.",
    exampleTr: "O bir sosyal ağın üyesidir."
},

{
    word: "Others",
    type: "pronoun",
    meaning: "Diğerleri",
    example: "Some people share information, while others keep it private.",
    exampleTr: "Bazı insanlar bilgi paylaşırken diğerleri onu gizli tutar."
},

{
    word: "Teen",
    type: "noun",
    meaning: "Ergen, genç",
    example: "The teen spends a lot of time online.",
    exampleTr: "Genç internette çok zaman geçiriyor."
},

{
    word: "Detail",
    type: "noun",
    meaning: "Detay",
    example: "Don't share every detail of your private life online.",
    exampleTr: "Özel hayatının her detayını internette paylaşma."
},

{
    word: "Via",
    type: "preposition",
    meaning: "Aracılığıyla",
    example: "We communicate via social media.",
    exampleTr: "Sosyal medya aracılığıyla iletişim kurarız."
},

{
    word: "Advantage",
    type: "noun",
    meaning: "Avantaj",
    example: "One advantage of the Internet is easy communication.",
    exampleTr: "İnternetin bir avantajı kolay iletişim kurmaktır."
},

{
    word: "Disadvantage",
    type: "noun",
    meaning: "Dezavantaj",
    example: "One disadvantage of social media is wasting time.",
    exampleTr: "Sosyal medyanın bir dezavantajı zaman kaybetmektir."
},

{
    word: "Easy",
    type: "adjective",
    meaning: "Kolay",
    example: "It is easy to communicate online.",
    exampleTr: "Çevrimiçi iletişim kurmak kolaydır."
},

{
    word: "Worldwide",
    type: "adjective",
    meaning: "Dünya çapında",
    example: "The Internet is used worldwide.",
    exampleTr: "İnternet dünya çapında kullanılıyor."
},

{
    word: "Widespread",
    type: "adjective",
    meaning: "Yaygın",
    example: "Social media is widespread among teenagers.",
    exampleTr: "Sosyal medya gençler arasında yaygındır."
},

{
    word: "Safe",
    type: "adjective",
    meaning: "Güvenli",
    example: "Use safe websites when shopping online.",
    exampleTr: "Çevrimiçi alışveriş yaparken güvenli web sitelerini kullan."
},

{
    word: "Risky",
    type: "adjective",
    meaning: "Riskli",
    example: "Sharing your password is risky.",
    exampleTr: "Şifreni paylaşmak risklidir."
},

{
    word: "Careful",
    type: "adjective",
    meaning: "Dikkatli",
    example: "Be careful when talking to strangers online.",
    exampleTr: "İnternette yabancılarla konuşurken dikkatli ol."
},

{
    word: "Dangerous",
    type: "adjective",
    meaning: "Tehlikeli",
    example: "Sharing personal information with strangers can be dangerous.",
    exampleTr: "Kişisel bilgileri yabancılarla paylaşmak tehlikeli olabilir."
},

{
    word: "Harmful",
    type: "adjective",
    meaning: "Zararlı",
    example: "Spending too much time online can be harmful.",
    exampleTr: "İnternette çok fazla zaman geçirmek zararlı olabilir."
},

{
    word: "Useful",
    type: "adjective",
    meaning: "Faydalı",
    example: "The Internet is very useful for students.",
    exampleTr: "İnternet öğrenciler için çok faydalıdır."
},

{
    word: "Broken",
    type: "adjective",
    meaning: "Kırık, bozuk",
    example: "My computer is broken.",
    exampleTr: "Bilgisayarım bozuk."
},

{
    word: "Important",
    type: "adjective",
    meaning: "Önemli",
    example: "Online safety is important for everyone.",
    exampleTr: "Çevrimiçi güvenlik herkes için önemlidir."
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
        "unit5"
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
                "No Unit 5 progress found."
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
            "Unit 5 progress loaded:",
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
                    `Unit 5 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 5 completed: +${totalXP} XP`
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
                    Unit 5 Complete
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