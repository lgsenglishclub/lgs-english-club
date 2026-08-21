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
// UNIT 5 VOCABULARY
// =========================================

const vocabulary = [

    {
        word: "Account",
        type: "noun",
        meaning: "Hesap",
        example: "I created a new account to use the website.",
        exampleTr: "Web sitesini kullanmak için yeni bir hesap oluşturdum."
    },

    {
        word: "Application",
        type: "noun",
        meaning: "Uygulama",
        example: "I use a music application on my smartphone.",
        exampleTr: "Akıllı telefonumda bir müzik uygulaması kullanıyorum."
    },

    {
        word: "Attachment",
        type: "noun",
        meaning: "Ek dosya",
        example: "I sent the photos as an attachment.",
        exampleTr: "Fotoğrafları ek dosya olarak gönderdim."
    },

    {
        word: "Username",
        type: "noun",
        meaning: "Kullanıcı adı",
        example: "You need to enter your username to log in.",
        exampleTr: "Giriş yapmak için kullanıcı adını girmen gerekiyor."
    },

    {
        word: "Password",
        type: "noun",
        meaning: "Şifre",
        example: "Never share your password with strangers.",
        exampleTr: "Şifreni asla yabancılarla paylaşma."
    },

    {
        word: "Search engine",
        type: "noun",
        meaning: "Arama motoru",
        example: "I used a search engine to find information about the project.",
        exampleTr: "Proje hakkında bilgi bulmak için bir arama motoru kullandım."
    },

    {
        word: "Wireless",
        type: "adjective",
        meaning: "Kablosuz",
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
        example: "You can find more information on our website.",
        exampleTr: "Web sitemizde daha fazla bilgi bulabilirsin."
    },

    {
        word: "Browser",
        type: "noun",
        meaning: "Tarayıcı",
        example: "Open your browser and search for the website.",
        exampleTr: "Tarayıcını aç ve web sitesini ara."
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
        example: "Many teenagers use social networks every day.",
        exampleTr: "Birçok genç her gün sosyal ağları kullanıyor."
    },

    {
        word: "Computer",
        type: "noun",
        meaning: "Bilgisayar",
        example: "I do my homework on my computer.",
        exampleTr: "Ödevimi bilgisayarımda yapıyorum."
    },

    {
        word: "Smart phone",
        type: "noun",
        meaning: "Akıllı telefon",
        example: "My smart phone helps me stay in touch with my friends.",
        exampleTr: "Akıllı telefonum arkadaşlarımla iletişimde kalmama yardımcı oluyor."
    },

    {
        word: "Online",
        type: "adjective",
        meaning: "Çevrimiçi",
        example: "I usually attend online classes in the evening.",
        exampleTr: "Genellikle akşamları çevrimiçi derslere katılırım."
    },

    {
        word: "Offline",
        type: "adjective",
        meaning: "Çevrimdışı",
        example: "I can't send messages when I am offline.",
        exampleTr: "Çevrimdışıyken mesaj gönderemem."
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
        exampleTr: "Web sitesini kullanmadan önce kaydolman gerekiyor."
    },

    {
        word: "Sign up",
        type: "phrasal verb",
        meaning: "Kayıt olmak",
        example: "I signed up for an online English course.",
        exampleTr: "Çevrimiçi bir İngilizce kursuna kayıt oldum."
    },

    {
        word: "Log in",
        type: "phrasal verb",
        meaning: "Giriş yapmak",
        example: "Please log in with your username and password.",
        exampleTr: "Lütfen kullanıcı adın ve şifrenle giriş yap."
    },

    {
        word: "Log off",
        type: "phrasal verb",
        meaning: "Çıkış yapmak",
        example: "Don't forget to log off when you finish your work.",
        exampleTr: "İşini bitirdiğinde çıkış yapmayı unutma."
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
        example: "Please remember your new password.",
        exampleTr: "Lütfen yeni şifreni hatırla."
    },

    {
        word: "Reply",
        type: "verb",
        meaning: "Yanıt vermek",
        example: "I will reply to your message later.",
        exampleTr: "Mesajına daha sonra yanıt vereceğim."
    },

    {
        word: "Send",
        type: "verb",
        meaning: "Göndermek",
        example: "Can you send me the homework by email?",
        exampleTr: "Bana ödevi e-posta ile gönderebilir misin?"
    },

    {
        word: "Search",
        type: "verb",
        meaning: "Araştırmak",
        example: "I searched the internet for information about the topic.",
        exampleTr: "Konu hakkında bilgi edinmek için internette araştırma yaptım."
    },

    {
        word: "Save",
        type: "verb",
        meaning: "Kaydetmek",
        example: "Don't forget to save your work before closing the file.",
        exampleTr: "Dosyayı kapatmadan önce çalışmanı kaydetmeyi unutma."
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
        example: "Check your email before you leave.",
        exampleTr: "Gitmeden önce e-postanı kontrol et."
    },

    {
        word: "Confirm",
        type: "verb",
        meaning: "Onaylamak",
        example: "Please confirm your email address.",
        exampleTr: "Lütfen e-posta adresini onayla."
    },

    {
        word: "Connect",
        type: "verb",
        meaning: "Bağlanmak",
        example: "I can't connect to the internet.",
        exampleTr: "İnternete bağlanamıyorum."
    },

    {
        word: "Create",
        type: "verb",
        meaning: "Oluşturmak",
        example: "I created a new account yesterday.",
        exampleTr: "Dün yeni bir hesap oluşturdum."
    },

    {
        word: "Develop",
        type: "verb",
        meaning: "Geliştirmek",
        example: "They developed a new application for students.",
        exampleTr: "Öğrenciler için yeni bir uygulama geliştirdiler."
    },

    {
        word: "Communicate",
        type: "verb",
        meaning: "İletişim kurmak",
        example: "The internet helps us communicate with people around the world.",
        exampleTr: "İnternet dünyanın her yerindeki insanlarla iletişim kurmamıza yardımcı olur."
    },

    {
        word: "Contact",
        type: "verb",
        meaning: "İletişime geçmek",
        example: "You can contact me by email.",
        exampleTr: "Benimle e-posta yoluyla iletişime geçebilirsin."
    },

    {
        word: "Attach a file",
        type: "verb phrase",
        meaning: "Dosya eklemek",
        example: "Please attach the file to your email.",
        exampleTr: "Lütfen dosyayı e-postana ekle."
    },

    {
        word: "Insert",
        type: "verb",
        meaning: "Eklemek",
        example: "You can insert a photo into the document.",
        exampleTr: "Belgeye bir fotoğraf ekleyebilirsin."
    },

    {
        word: "Download",
        type: "verb",
        meaning: "İndirmek",
        example: "I downloaded the document from the website.",
        exampleTr: "Belgeyi web sitesinden indirdim."
    },

    {
        word: "Upload",
        type: "verb",
        meaning: "Yüklemek",
        example: "She uploaded her project to the website.",
        exampleTr: "Projesini web sitesine yükledi."
    },

    {
        word: "Delete",
        type: "verb",
        meaning: "Silmek",
        example: "I deleted the old messages from my phone.",
        exampleTr: "Eski mesajları telefonumdan sildim."
    },

    {
        word: "Comment",
        type: "verb",
        meaning: "Yorum yapmak",
        example: "Many people commented on her post.",
        exampleTr: "Birçok kişi onun gönderisine yorum yaptı."
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
        type: "verb phrase",
        meaning: "Çevrimiçi olmak",
        example: "I usually go online after I finish my homework.",
        exampleTr: "Genellikle ödevimi bitirdikten sonra çevrimiçi olurum."
    },

    {
        word: "Browse",
        type: "verb",
        meaning: "Göz atmak",
        example: "I like to browse websites in my free time.",
        exampleTr: "Boş zamanlarımda web sitelerine göz atmayı severim."
    },

    {
        word: "Store",
        type: "verb",
        meaning: "Depolamak",
        example: "You can store your photos online.",
        exampleTr: "Fotoğraflarını çevrimiçi olarak depolayabilirsin."
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
        type: "verb phrase",
        meaning: "Araştırma yapmak",
        example: "I use the internet to do research for my projects.",
        exampleTr: "Projelerim için araştırma yapmak amacıyla interneti kullanıyorum."
    },

    {
        word: "Do homework",
        type: "verb phrase",
        meaning: "Ödev yapmak",
        example: "I usually do my homework after dinner.",
        exampleTr: "Genellikle akşam yemeğinden sonra ödevimi yaparım."
    },

    {
        word: "Do online shopping",
        type: "verb phrase",
        meaning: "Çevrimiçi alışveriş yapmak",
        example: "My mother often does online shopping.",
        exampleTr: "Annem sık sık çevrimiçi alışveriş yapar."
    },

    {
        word: "Send emails",
        type: "verb phrase",
        meaning: "E-posta göndermek",
        example: "I send emails to my teachers when I have questions.",
        exampleTr: "Sorularım olduğunda öğretmenlerime e-posta gönderirim."
    },

    {
        word: "Chat live",
        type: "verb phrase",
        meaning: "Canlı sohbet etmek",
        example: "We chat live with our friends on the website.",
        exampleTr: "Web sitesinde arkadaşlarımızla canlı sohbet ediyoruz."
    },

    {
        word: "Make new friends",
        type: "verb phrase",
        meaning: "Yeni arkadaşlar edinmek",
        example: "Social networks can help teenagers make new friends.",
        exampleTr: "Sosyal ağlar gençlerin yeni arkadaşlar edinmesine yardımcı olabilir."
    },

    {
        word: "Download music",
        type: "verb phrase",
        meaning: "Müzik indirmek",
        example: "I sometimes download music to listen to offline.",
        exampleTr: "Bazen çevrimdışı dinlemek için müzik indiririm."
    },

    {
        word: "Upload photo",
        type: "verb phrase",
        meaning: "Fotoğraf yüklemek",
        example: "She uploaded a photo from her holiday.",
        exampleTr: "Tatilinden bir fotoğraf yükledi."
    },

    {
        word: "Surf the internet",
        type: "verb phrase",
        meaning: "İnternette gezinmek",
        example: "I like to surf the internet in my free time.",
        exampleTr: "Boş zamanlarımda internette gezinmeyi severim."
    },

    {
        word: "Pay the bill",
        type: "verb phrase",
        meaning: "Fatura ödemek",
        example: "My father pays the bills online.",
        exampleTr: "Babam faturaları internetten öder."
    },

    {
        word: "Play online games",
        type: "verb phrase",
        meaning: "Çevrimiçi oyun oynamak",
        example: "My brother plays online games with his friends.",
        exampleTr: "Kardeşim arkadaşlarıyla çevrimiçi oyunlar oynar."
    },

    {
        word: "Watch a movie or video",
        type: "verb phrase",
        meaning: "Film veya video izlemek",
        example: "We watch a movie or video when we have free time.",
        exampleTr: "Boş zamanımız olduğunda film veya video izleriz."
    },

    {
        word: "Spend time",
        type: "verb phrase",
        meaning: "Zaman harcamak",
        example: "I don't want to spend too much time online.",
        exampleTr: "İnternette çok fazla zaman harcamak istemiyorum."
    },

    {
        word: "Get information",
        type: "verb phrase",
        meaning: "Bilgi almak",
        example: "I use the internet to get information about different countries.",
        exampleTr: "Farklı ülkeler hakkında bilgi almak için interneti kullanıyorum."
    },

    {
        word: "Follow fashion",
        type: "verb phrase",
        meaning: "Modayı takip etmek",
        example: "Some teenagers use social media to follow fashion.",
        exampleTr: "Bazı gençler modayı takip etmek için sosyal medyayı kullanıyor."
    },

    {
        word: "Attend online courses",
        type: "verb phrase",
        meaning: "Çevrimiçi kurslara katılmak",
        example: "I attend online courses to improve my English.",
        exampleTr: "İngilizcemi geliştirmek için çevrimiçi kurslara katılıyorum."
    },

    {
        word: "Read newspapers",
        type: "verb phrase",
        meaning: "Gazete okumak",
        example: "My grandfather reads newspapers online every morning.",
        exampleTr: "Dedem her sabah internetten gazete okur."
    },

    {
        word: "Read online magazines",
        type: "verb phrase",
        meaning: "Çevrimiçi dergiler okumak",
        example: "She likes to read online magazines about fashion.",
        exampleTr: "Moda hakkında çevrimiçi dergiler okumayı seviyor."
    },

    {
        word: "Safety",
        type: "noun",
        meaning: "Güvenlik",
        example: "Online safety is important for everyone.",
        exampleTr: "Çevrimiçi güvenlik herkes için önemlidir."
    },

    {
        word: "Privacy",
        type: "noun",
        meaning: "Gizlilik",
        example: "You should protect your privacy on social media.",
        exampleTr: "Sosyal medyada gizliliğini korumalısın."
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
        example: "Don't share your address in a public post.",
        exampleTr: "Adresini herkese açık bir gönderide paylaşma."
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
        example: "Choose a secret word that is difficult to guess.",
        exampleTr: "Tahmin edilmesi zor bir gizli kelime seç."
    },

    {
        word: "Precaution",
        type: "noun",
        meaning: "Önlem",
        example: "We should take precautions to stay safe online.",
        exampleTr: "İnternette güvende kalmak için önlemler almalıyız."
    },

    {
        word: "Questionnaire",
        type: "noun",
        meaning: "Anket",
        example: "We completed an online questionnaire about internet habits.",
        exampleTr: "İnternet alışkanlıkları hakkında çevrimiçi bir anket doldurduk."
    },

    {
        word: "Authorities",
        type: "noun",
        meaning: "Yetkililer",
        example: "You should contact the authorities if someone threatens you online.",
        exampleTr: "Biri seni internette tehdit ederse yetkililerle iletişime geçmelisin."
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
        meaning: "Yol, yöntem",
        example: "The internet is a useful way to find information.",
        exampleTr: "İnternet bilgi bulmak için faydalı bir yoldur."
    },

    {
        word: "Adult",
        type: "noun",
        meaning: "Yetişkin",
        example: "Children should ask an adult for help when they feel unsafe online.",
        exampleTr: "Çocuklar internette kendilerini güvende hissetmediklerinde bir yetişkinden yardım istemelidir."
    },

    {
        word: "Percent",
        type: "noun",
        meaning: "Yüzde",
        example: "Seventy percent of the students use the internet every day.",
        exampleTr: "Öğrencilerin yüzde yetmişi her gün internet kullanıyor."
    },

    {
        word: "Mistake",
        type: "noun",
        meaning: "Yanlışlık, hata",
        example: "Everyone can make a mistake when using technology.",
        exampleTr: "Teknoloji kullanırken herkes hata yapabilir."
    },

    {
        word: "Addict",
        type: "noun",
        meaning: "Bağımlı",
        example: "He is an internet addict and spends too much time online.",
        exampleTr: "O bir internet bağımlısı ve internette çok fazla zaman harcıyor."
    },

    {
        word: "Stranger",
        type: "noun",
        meaning: "Yabancı",
        example: "Never meet a stranger you only know from the internet.",
        exampleTr: "Sadece internetten tanıdığın bir yabancıyla asla buluşma."
    },

    {
        word: "Member",
        type: "noun",
        meaning: "Üye",
        example: "You must be a member to use some features of the website.",
        exampleTr: "Web sitesinin bazı özelliklerini kullanmak için üye olmalısın."
    },

    {
        word: "Others",
        type: "pronoun",
        meaning: "Diğerleri",
        example: "Some people use social media for fun, while others use it for work.",
        exampleTr: "Bazı insanlar sosyal medyayı eğlence için kullanırken diğerleri iş için kullanır."
    },

    {
        word: "Teen",
        type: "noun",
        meaning: "Ergen, genç",
        example: "Many teens spend several hours online every day.",
        exampleTr: "Birçok genç her gün birkaç saatini internette geçiriyor."
    },

    {
        word: "Detail",
        type: "noun",
        meaning: "Detay",
        example: "Read all the details before you join the website.",
        exampleTr: "Web sitesine katılmadan önce tüm detayları oku."
    },

    {
        word: "Via",
        type: "preposition",
        meaning: "Aracılığıyla",
        example: "I sent the document via email.",
        exampleTr: "Belgeyi e-posta aracılığıyla gönderdim."
    },

    {
        word: "Advantage",
        type: "noun",
        meaning: "Avantaj",
        example: "One advantage of the internet is easy access to information.",
        exampleTr: "İnternetin bir avantajı bilgiye kolay erişimdir."
    },

    {
        word: "Disadvantage",
        type: "noun",
        meaning: "Dezavantaj",
        example: "Spending too much time online is a disadvantage.",
        exampleTr: "İnternette çok fazla zaman geçirmek bir dezavantajdır."
    },

    {
        word: "Easy",
        type: "adjective",
        meaning: "Kolay",
        example: "Online shopping makes it easy to buy things from home.",
        exampleTr: "Çevrimiçi alışveriş evden bir şeyler satın almayı kolaylaştırır."
    },

    {
        word: "Worldwide",
        type: "adjective",
        meaning: "Dünya çapında",
        example: "People worldwide use the internet for different purposes.",
        exampleTr: "Dünya çapında insanlar interneti farklı amaçlarla kullanıyor."
    },

    {
        word: "Widespread",
        type: "adjective",
        meaning: "Yaygın",
        example: "Social media use is widespread among teenagers.",
        exampleTr: "Sosyal medya kullanımı gençler arasında yaygındır."
    },

    {
        word: "Safe",
        type: "adjective",
        meaning: "Güvenli",
        example: "You should use safe websites when you shop online.",
        exampleTr: "Çevrimiçi alışveriş yaparken güvenli web sitelerini kullanmalısın."
    },

    {
        word: "Risky",
        type: "adjective",
        meaning: "Riskli",
        example: "Sharing your password with others is risky.",
        exampleTr: "Şifreni başkalarıyla paylaşmak risklidir."
    },

    {
        word: "Careful",
        type: "adjective",
        meaning: "Dikkatli",
        example: "Be careful when you talk to people online.",
        exampleTr: "İnternette insanlarla konuşurken dikkatli ol."
    },

    {
        word: "Dangerous",
        type: "adjective",
        meaning: "Tehlikeli",
        example: "Meeting online strangers can be dangerous.",
        exampleTr: "İnternetten tanıştığın yabancılarla buluşmak tehlikeli olabilir."
    },

    {
        word: "Harmful",
        type: "adjective",
        meaning: "Zararlı",
        example: "Spending too much time on social media can be harmful.",
        exampleTr: "Sosyal medyada çok fazla zaman geçirmek zararlı olabilir."
    },

    {
        word: "Useful",
        type: "adjective",
        meaning: "Faydalı",
        example: "The internet is a useful tool for students.",
        exampleTr: "İnternet öğrenciler için faydalı bir araçtır."
    },

    {
        word: "Broken",
        type: "adjective",
        meaning: "Kırık, bozuk",
        example: "I can't connect to the internet because my router is broken.",
        exampleTr: "Yönlendiricim bozuk olduğu için internete bağlanamıyorum."
    },

    {
        word: "Important",
        type: "adjective",
        meaning: "Önemli",
        example: "It is important to protect your personal information online.",
        exampleTr: "Kişisel bilgilerini internette korumak önemlidir."
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