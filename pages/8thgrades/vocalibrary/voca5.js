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
    word: "Addict",
    type: "noun",
    meaning: "Bağımlı",
    example: "He is an internet addict.",
    exampleTr: "O bir internet bağımlısı."
},

{
    word: "Adult",
    type: "noun",
    meaning: "Yetişkin",
    example: "Adults should teach children about internet safety.",
    exampleTr: "Yetişkinler çocuklara internet güvenliği hakkında bilgi vermelidir."
},

{
    word: "Advantage",
    type: "noun",
    meaning: "Avantaj",
    example: "One advantage of the internet is getting information quickly.",
    exampleTr: "İnternetin bir avantajı hızlıca bilgi almaktır."
},

{
    word: "Advise",
    type: "verb",
    meaning: "Tavsiye etmek",
    example: "I advise you to use a strong password.",
    exampleTr: "Güçlü bir şifre kullanmanı tavsiye ederim."
},

{
    word: "Affect",
    type: "verb",
    meaning: "Etkilemek",
    example: "Spending too much time online can affect your health.",
    exampleTr: "Çevrimiçi çok fazla zaman geçirmek sağlığını etkileyebilir."
},

{
    word: "Application",
    type: "noun",
    meaning: "Uygulama",
    example: "I downloaded a new application.",
    exampleTr: "Yeni bir uygulama indirdim."
},

{
    word: "Attachment",
    type: "noun",
    meaning: "Ek dosya",
    example: "I sent the document as an attachment.",
    exampleTr: "Belgeyi ek dosya olarak gönderdim."
},

{
    word: "Authorities",
    type: "noun",
    meaning: "Yetkililer",
    example: "The authorities warned people about the danger.",
    exampleTr: "Yetkililer insanları tehlike hakkında uyardı."
},

{
    word: "Become",
    type: "phrase",
    meaning: "olmak",
    example: "Some teenagers can become internet addicts.",
    exampleTr: "Bazı gençler internet bağımlısı olabilir."
},

{
    word: "Break a relationship",
    type: "phrase",
    meaning: "İlişkiyi bitirmek",
    example: "Too much time online can break relationships.",
    exampleTr: "Nette çok fazla zaman geçirmek ilişkileri bitirebilir."
},

{
    word: "Broken",
    type: "adjective",
    meaning: "Kırık, bozuk",
    example: "My computer is broken.",
    exampleTr: "Bilgisayarım bozuk."
},

{
    word: "Browse",
    type: "verb",
    meaning: "Göz atmak",
    example: "I like to browse websites in my free time.",
    exampleTr: "Boş zamanlarımda web sitelerine göz atmayı severim."
},

{
    word: "Browser",
    type: "noun",
    meaning: "Tarayıcı",
    example: "Which browser do you use?",
    exampleTr: "Hangi tarayıcıyı kullanıyorsun?"
},

{
    word: "Buy",
    type: "verb",
    meaning: "Satın almak",
    example: "I want to buy a new computer.",
    exampleTr: "Yeni bir bilgisayar satın almak istiyorum."
},

{
    word: "By mistake",
    type: "phrase",
    meaning: "Yanlışlıkla",
    example: "I deleted the file by mistake.",
    exampleTr: "Dosyayı yanlışlıkla sildim."
},

{
    word: "Careful",
    type: "adjective",
    meaning: "Dikkatli",
    example: "Be careful when sharing personal information online.",
    exampleTr: "İnternette kişisel bilgilerini paylaşırken dikkatli ol."
},

{
    word: "Cause",
    type: "verb",
    meaning: "Sebep olmak",
    example: "Too much screen time can cause problems.",
    exampleTr: "Çok fazla ekran süresi sorunlara sebep olabilir."
},

{
    word: "Cell phone",
    type: "noun",
    meaning: "Cep telefonu",
    example: "I always keep my cell phone with me.",
    exampleTr: "Cep telefonumu her zaman yanımda tutarım."
},

{
    word: "Change",
    type: "verb",
    meaning: "Değiştirmek",
    example: "You should change your password regularly.",
    exampleTr: "Şifreni düzenli olarak değiştirmelisin."
},

{
    word: "Chat live",
    type: "phrase",
    meaning: "Canlı sohbet etmek",
    example: "We can chat live on this website.",
    exampleTr: "Bu web sitesinde canlı sohbet edebiliriz."
},

{
    word: "Cheap",
    type: "adjective",
    meaning: "Ucuz",
    example: "This is the cheap option.",
    exampleTr: "Bu ucuz bir seçenek."
},

{
    word: "Check",
    type: "phrase",
    meaning: "Kontrol etmek",
    example: "Check the cable if the computer doesn't work.",
    exampleTr: "Bilgisayar çalışmıyorsa kabloyu kontrol et."
},

{
    word: "Comment",
    type: "verb",
    meaning: "Yorum yapmak",
    example: "Many people comment on this post.",
    exampleTr: "Birçok insan bu gönderiye yorum yapıyor."
},

{
    word: "Post",
    type: "noun",
    meaning: "Gönderi",
    example: "I want to comment on your post.",
    exampleTr: "Gönderine yorum yapmak istiyorum."
},

{
    word: "Communicate",
    type: "verb",
    meaning: "İletişim kurmak",
    example: "We use the internet to communicate with others.",
    exampleTr: "Başkalarıyla iletişim kurmak için interneti kullanıyoruz."
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
    example: "I can't connect to the internet.",
    exampleTr: "İnternete bağlanamıyorum."
},

{
    word: "Connection",
    type: "noun",
    meaning: "Bağlantı",
    example: "The internet connection is very slow.",
    exampleTr: "İnternet bağlantısı çok yavaş."
},

{
    word: "Contact",
    type: "verb",
    meaning: "İletişime geçmek",
    example: "You can contact me by e-mail.",
    exampleTr: "Benimle e-posta yoluyla iletişime geçebilirsin."
},

{
    word: "Conversation",
    type: "noun",
    meaning: "Konuşma",
    example: "We had a long conversation online.",
    exampleTr: "İnternette uzun bir konuşma yaptık."
},

{
    word: "Create",
    type: "phrase",
    meaning: "Oluşturmak",
    example: "Many teenagers create content for social media.",
    exampleTr: "Birçok genç sosyal medya için içerik oluşturuyor."
},

{
    word: "Dangerous",
    type: "adjective",
    meaning: "Tehlikeli",
    example: "Sharing personal information online can be dangerous.",
    exampleTr: "İnternette kişisel bilgileri paylaşmak tehlikeli olabilir."
},

{
    word: "Delete",
    type: "verb",
    meaning: "Silmek",
    example: "Don't forget to delete old messages.",
    exampleTr: "Eski mesajları silmeyi unutma."
},

{
    word: "Detail",
    type: "noun",
    meaning: "Detay",
    example: "Please read the details carefully.",
    exampleTr: "Lütfen detayları dikkatlice oku."
},

{
    word: "Develop",
    type: "phrase",
    meaning: "Geliştirmek",
    example: "Meeting people can develop your social skills.",
    exampleTr: "İnsanlarla tanışmak sosyal becerilerini geliştirebilir."
},

{
    word: "Disadvantage",
    type: "noun",
    meaning: "Dezavantaj",
    example: "One disadvantage of the internet is spending too much time online.",
    exampleTr: "İnternetin bir dezavantajı çevrimiçi çok fazla zaman geçirmektir."
},

{
    word: "Do research",
    type: "phrase",
    meaning: "Araştırma yapmak",
    example: "I use the internet to do research for my homework.",
    exampleTr: "Ödevim için araştırma yapmak amacıyla interneti kullanıyorum."
},

{
    word: "Download",
    type: "verb",
    meaning: "İndirmek",
    example: "I downloaded the application yesterday.",
    exampleTr: "Uygulamayı dün indirdim."
},

{
    word: "Easy",
    type: "adjective",
    meaning: "Kolay",
    example: "This is an easy way to connect to the internet.",
    exampleTr: "Bu internete bağlanmanın kolay bir yolu."
},

{
    word: "Feel",
    type: "phrase",
    meaning: "Hissetmek",
    example: "Some people feel isolated.",
    exampleTr: "Bazı insanlar yalnız hisseder."
},

{
    word: "Get information",
    type: "phrase",
    meaning: "Bilgi almak",
    example: "We can get information quickly on the internet.",
    exampleTr: "İnternetten hızlıca bilgi alabiliriz."
},

{
    word: "Do harm",
    type: "phrase",
    meaning: "Zarar vermek",
    example: "Spending too much time online can do harm.",
    exampleTr: "İnternette çok fazla zaman geçirmek zarar verebilir."
},

{
    word: "Go online",
    type: "phrase",
    meaning: "Çevrimiçi olmak",
    example: "I go online every evening.",
    exampleTr: "Her akşam çevrimiçi olurum."
},

{
    word: "Harmful",
    type: "adjective",
    meaning: "Zararlı",
    example: "Too much screen time can be harmful.",
    exampleTr: "Çok fazla ekran süresi zararlı olabilir."
},

{
    word: "Hour",
    type: "noun",
    meaning: "Saat",
    example: "I spend one hour online every day.",
    exampleTr: "Her gün internette bir saat geçiririm."
},

{
    word: "Ignore",
    type: "verb",
    meaning: "Görmezden gelmek",
    example: "Don't ignore online safety rules.",
    exampleTr: "İnternet güvenliği kurallarını görmezden gelme."
},

{
    word: "Important",
    type: "adjective",
    meaning: "Önemli",
    example: "Internet safety is very important.",
    exampleTr: "İnternet güvenliği çok önemlidir."
},

{
    word: "Instant messaging",
    type: "noun",
    meaning: "Anlık mesajlaşma",
    example: "Instant messaging is a fast way to communicate.",
    exampleTr: "Anlık mesajlaşma hızlı bir iletişim yoludur."
},

{
    word: "Keep in touch ",
    type: "phrase",
    meaning: "İletişimde kalmak",
    example: "I use social media to keep in touch with my friends.",
    exampleTr: "Arkadaşlarımla iletişimde kalmak için sosyal medya kullanıyorum."
},

{
    word: "Leave",
    type: "verb",
    meaning: "Bırakmak",
    example: "Don't forget to leave a comment.",
    exampleTr: "Yorum bırakmayı unutma."
},

{
    word: "Letter",
    type: "noun",
    meaning: "Mektup",
    example: "I wrote a letter to my friend.",
    exampleTr: "Arkadaşıma bir mektup yazdım."
},

{
    word: "Log in",
    type: "phrasal verb",
    meaning: "Giriş yapmak",
    example: "I need to log in to my account.",
    exampleTr: "Hesabıma giriş yapmam gerekiyor."
},

{
    word: "Log off",
    type: "phrasal verb",
    meaning: "Çıkış yapmak",
    example: "Don't forget to log off your account.",
    exampleTr: "Hesabından çıkış yapmayı unutma."
},

{
    word: "Make life difficult",
    type: "phrase",
    meaning: "Hayatı zorlaştırmak",
    example: "Too much screen time can make life difficult.",
    exampleTr: "Çok fazla ekran süresi hayatı zorlaştırabilir."
},

{
    word: "Make new friends",
    type: "phrase",
    meaning: "Yeni arkadaşlar edinmek",
    example: "Social media can help us make new friends.",
    exampleTr: "Sosyal medya yeni arkadaşlar edinmemize yardımcı olabilir."
},

{
    word: "Mean",
    type: "verb",
    meaning: "Anlamına gelmek",
    example: "What does this word mean?",
    exampleTr: "Bu kelime ne anlama geliyor?"
},

{
    word: "Stranger",
    type: "phrase",
    meaning: "Yabancı",
    example: "You shouldn't meet strangers.",
    exampleTr: "Yabancılarla buluşmamalısın."
},

{
    word: "Member",
    type: "noun",
    meaning: "Üye",
    example: "She is a member of the website.",
    exampleTr: "O, web sitesinin bir üyesidir."
},

{
    word: "Others",
    type: "pronoun",
    meaning: "Diğerleri",
    example: "We should respect others online.",
    exampleTr: "İnternette diğerlerine saygı göstermeliyiz."
},

{
    word: "Password",
    type: "noun",
    meaning: "Şifre",
    example: "You should choose a strong password.",
    exampleTr: "Güçlü bir şifre seçmelisin."
},

{
    word: "Percent",
    type: "noun",
    meaning: "Yüzde",
    example: "Ninety percent of the students use the internet.",
    exampleTr: "Öğrencilerin yüzde doksanı internet kullanıyor."
},

{
    word: "Phone call",
    type: "noun",
    meaning: "Telefon görüşmesi",
    example: "I had a phone call with my friend.",
    exampleTr: "Arkadaşımla telefon görüşmesi yaptım."
},

{
    word: "Prefer",
    type: "verb",
    meaning: "Tercih etmek",
    example: "I prefer chatting online to making phone calls.",
    exampleTr: "Telefon görüşmesi yapmaktansa çevrimiçi sohbet etmeyi tercih ederim."
},

{
    word: "Register",
    type: "verb",
    meaning: "Kaydolmak",
    example: "You need to register before using the website.",
    exampleTr: "Web sitesini kullanmadan önce kaydolman gerekiyor."
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
    word: "Reset",
    type: "verb",
    meaning: "Sıfırlamak",
    example: "I forgot my password, so I need to reset it.",
    exampleTr: "Şifremi unuttum, bu yüzden onu sıfırlamam gerekiyor."
},

{
    word: "Follow online courses",
    type: "phrase",
    meaning: "Çevrimiçi kursları takip etmek",
    example: "I follow online courses to improve my English.",
    exampleTr: "İngilizcemi geliştirmek için çevrimiçi kursları takip ediyorum."
},

{
    word: "Safety",
    type: "noun",
    meaning: "Güvenlik",
    example: "Internet safety is important for everyone.",
    exampleTr: "İnternet güvenliği herkes için önemlidir."
},

{
    word: "Screen",
    type: "noun",
    meaning: "Ekran",
    example: "Don't look at the screen for too long.",
    exampleTr: "Ekrana çok uzun süre bakma."
},

{
    word: "Etiquette",
    type: "noun",
    meaning: "Görgü kuralları",
    example: "We should follow Internet etiquette.",
    exampleTr: "İnternet görgü kurallarına uymalıyız."
},

{
    word: "Insert",
    type: "verb",
    meaning: "Eklemek",
    example: "Insert the file into the email.",
    exampleTr: "Dosyayı e-postaya ekle."
},


{
    word: "Search engine",
    type: "noun",
    meaning: "Arama motoru",
    example: "I use a search engine to find information.",
    exampleTr: "Bilgi bulmak için bir arama motoru kullanıyorum."
},

{
    word: "Secret word",
    type: "noun",
    meaning: "Gizli kelime",
    example: "Choose a secret word for your account.",
    exampleTr: "Hesabın için bir gizli kelime seç."
},

{
    word: "Send",
    type: "verb",
    meaning: "Göndermek",
    example: "I will send you the document.",
    exampleTr: "Sana belgeyi göndereceğim."
},

{
    word: "Personal information",
    type: "noun",
    meaning: "Kişisel bilgiler",
    example: "Never share personal information online.",
    exampleTr: "İnternette asla kişisel bilgilerini paylaşma."
},

{
    word: "Sign up",
    type: "phrasal verb",
    meaning: "Kayıt olmak",
    example: "I signed up for a new website.",
    exampleTr: "Yeni bir web sitesine kayıt oldum."
},

{
    word: "Sorry to hear that",
    type: "phrase",
    meaning: "Bunu duyduğuma üzüldüm",
    example: "Sorry to hear that you lost your account.",
    exampleTr: "Hesabını kaybettiğini duyduğuma üzüldüm."
},

{
    word: "Spend time",
    type: "phrase",
    meaning: "Zaman harcamak",
    example: "Don't spend too much time online.",
    exampleTr: "İnternette çok fazla zaman harcama."
},

{
    word: "Worldwide",
    type: "adverb / adjective",
    meaning: "Dünya çapında",
    example: "People use the Internet worldwide.",
    exampleTr: "İnsanlar dünya çapında internet kullanıyor."
},

{
    word: "Wireless",
    type: "adjective",
    meaning: "Kablosuz",
    example: "I use a wireless connection at home.",
    exampleTr: "Evde kablosuz bağlantı kullanıyorum."
},

{
    word: "Store",
    type: "verb",
    meaning: "Depolamak",
    example: "The website stores your information.",
    exampleTr: "Web sitesi bilgilerini depolar."
},

{
    word: "Surf the internet",
    type: "phrase",
    meaning: "İnternette gezinmek",
    example: "I like to surf the internet in my free time.",
    exampleTr: "Boş zamanlarımda internette gezinmeyi severim."
},

{
    word: "Take precaution",
    type: "phrase",
    meaning: "Önlem almak",
    example: "We should take precautions when using the internet.",
    exampleTr: "İnterneti kullanırken önlem almalıyız."
},

{
    word: "Teen",
    type: "noun",
    meaning: "Ergen, genç",
    example: "Many teens use social media every day.",
    exampleTr: "Birçok ergen her gün sosyal medya kullanıyor."
},

{
    word: "Teenager",
    type: "noun",
    meaning: "Genç, ergen",
    example: "Every teenager should know about internet safety.",
    exampleTr: "Her genç internet güvenliği hakkında bilgi sahibi olmalıdır."
},

{
    word: "Tell",
    type: "verb",
    meaning: "Söylemek",
    example: "Never tell anyone your password.",
    exampleTr: "Şifreni asla kimseye söyleme."
},

{
    word: "Text",
    type: "verb / noun",
    meaning: "Mesaj yazmak, metin",
    example: "I usually text my friends after school.",
    exampleTr: "Okuldan sonra genellikle arkadaşlarıma mesaj atarım."
},

{
    word: "Text message",
    type: "noun",
    meaning: "Kısa mesaj",
    example: "I sent him a text message.",
    exampleTr: "Ona kısa bir mesaj gönderdim."
},

{
    word: "Upload",
    type: "verb",
    meaning: "Yüklemek",
    example: "I uploaded the photos to the website.",
    exampleTr: "Fotoğrafları web sitesine yükledim."
},

{
    word: "Useful",
    type: "adjective",
    meaning: "Faydalı",
    example: "The internet is useful for doing research.",
    exampleTr: "İnternet araştırma yapmak için faydalıdır."
},

{
    word: "Purpose",
    type: "noun",
    meaning: "Amaç",
    example: "We should use technology for a useful purpose.",
    exampleTr: "Teknolojiyi faydalı bir amaç için kullanmalıyız."
},

{
    word: "Username",
    type: "noun",
    meaning: "Kullanıcı adı",
    example: "Enter your username and password.",
    exampleTr: "Kullanıcı adını ve şifreni gir."
},

{
    word: "Via",
    type: "preposition",
    meaning: "Aracılığıyla, yoluyla",
    example: "I sent the file via e-mail.",
    exampleTr: "Dosyayı e-posta aracılığıyla gönderdim."
},

{
    word: "Want",
    type: "verb",
    meaning: "İstemek",
    example: "I want to create a new account.",
    exampleTr: "Yeni bir hesap oluşturmak istiyorum."
},

{
    word: "Way",
    type: "noun",
    meaning: "Yol",
    example: "The internet is a useful way to communicate.",
    exampleTr: "İnternet iletişim kurmanın faydalı bir yoludur."
},

{
    word: "Ways of communication",
    type: "phrase",
    meaning: "İletişim yolları",
    example: "There are many ways of communication today.",
    exampleTr: "Günümüzde birçok iletişim yolu vardır."
},

{
    word: "Attach a file",
    type: "phrase",
    meaning: "Dosya eklemek",
    example: "Don't forget to attach the file.",
    exampleTr: "Dosyayı eklemeyi unutma."
},

{
    word: "Click",
    type: "verb",
    meaning: "Tıklamak",
    example: "Click the button to continue.",
    exampleTr: "Devam etmek için butona tıkla."
},

{
    word: "Double-click",
    type: "verb",
    meaning: "Çift tıklamak",
    example: "Double-click the file to open it.",
    exampleTr: "Dosyayı açmak için çift tıkla."
},

{
    word: "Questionnaire",
    type: "noun",
    meaning: "Anket",
    example: "Please complete this questionnaire.",
    exampleTr: "Lütfen bu anketi doldur."
},

{
    word: "Regulate",
    type: "verb",
    meaning: "Düzenlemek",
    example: "Authorities regulate Internet services.",
    exampleTr: "Yetkililer internet hizmetlerini düzenler."
},

{
    word: "Widespread",
    type: "adjective",
    meaning: "Yaygın",
    example: "Internet use is widespread around the world.",
    exampleTr: "İnternet kullanımı dünya genelinde yaygındır."
},


{
    word: "Social media",
    type: "noun",
    meaning: "Sosyal medya",
    example: "Social media is popular among teenagers.",
    exampleTr: "Sosyal medya gençler arasında popülerdir."
},

{
    word: "Social network",
    type: "noun",
    meaning: "Sosyal ağ",
    example: "I use social networks to keep in touch with my friends.",
    exampleTr: "Arkadaşlarımla iletişimde kalmak için sosyal ağları kullanıyorum."
},

{
    word: "Privacy",
    type: "noun",
    meaning: "Gizlilik",
    example: "You should protect your privacy online.",
    exampleTr: "İnternette gizliliğini korumalısın."
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
    exampleTr: "Özel bilgilerini herkesin görebileceği şekilde paylaşma."
},

{
    word: "Online",
    type: "adjective / adverb",
    meaning: "Çevrimiçi",
    example: "I spend two hours online every day.",
    exampleTr: "Her gün internette iki saat geçiriyorum."
},

{
    word: "Do online shopping",
    type: "phrase",
    meaning: "Çevrimiçi alışveriş yapmak",
    example: "My mother does online shopping.",
    exampleTr: "Annem çevrimiçi alışveriş yapar."
},

{
    word: "Play online games",
    type: "phrase",
    meaning: "Çevrimiçi oyun oynamak",
    example: "I sometimes play online games with my friends.",
    exampleTr: "Bazen arkadaşlarımla çevrimiçi oyun oynarım."
},

{
    word: "Pay the bill",
    type: "phrase",
    meaning: "Fatura ödemek",
    example: "We can pay the bill online.",
    exampleTr: "Faturayı internetten ödeyebiliriz."
},

{
    word: "Watch a movie or video",
    type: "phrase",
    meaning: "Film veya video izlemek",
    example: "I watch movies and videos online.",
    exampleTr: "İnternette film ve video izlerim."
},

{
    word: "Use social networking sites",
    type: "phrase",
    meaning: "Sosyal medya sitelerini kullanmak",
    example: "Teenagers often use social networking sites.",
    exampleTr: "Gençler sık sık sosyal medya sitelerini kullanır."
},

{
    word: "Social media usage",
    type: "phrase",
    meaning: "Sosyal medya kullanımı",
    example: "Too much social media usage can be harmful.",
    exampleTr: "Çok fazla sosyal medya kullanımı zararlı olabilir."
},

{
    word: "Read newspapers",
    type: "phrase",
    meaning: "Gazete okumak",
    example: "My father reads newspapers online.",
    exampleTr: "Babam gazeteleri internetten okur."
},

{
    word: "Read online magazines",
    type: "phrase",
    meaning: "Çevrimiçi dergiler okumak",
    example: "I like reading online magazines.",
    exampleTr: "Çevrimiçi dergiler okumayı severim."
},

{
    word: "Send emails",
    type: "phrase",
    meaning: "E-posta göndermek",
    example: "I send emails to my teachers.",
    exampleTr: "Öğretmenlerime e-posta gönderirim."
},

{
    word: "Offline",
    type: "adjective / adverb",
    meaning: "Çevrimdışı",
    example: "I usually read books when I am offline.",
    exampleTr: "Çevrimdışıyken genellikle kitap okurum."
},

{
    word: "Website",
    type: "noun",
    meaning: "Web sitesi",
    example: "I found this information on a website.",
    exampleTr: "Bu bilgiyi bir web sitesinde buldum."
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