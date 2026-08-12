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
    word: "Talk face to face",
    type: "phrase",
    meaning: "Yüz yüze konuşmak",
    example: "We prefer to talk face to face.",
    exampleTr: "Yüz yüze konuşmayı tercih ederiz."
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
    example: "People used messenger birds in the past.",
    exampleTr: "İnsanlar geçmişte haberci kuşlar kullanırdı."
},

{
    word: "Write a letter",
    type: "phrase",
    meaning: "Mektup yazmak",
    example: "I like to write a letter to my friends.",
    exampleTr: "Arkadaşlarıma mektup yazmayı severim."
},

{
    word: "Write a postcard",
    type: "phrase",
    meaning: "Posta kartı yazmak",
    example: "I wrote a postcard during my holiday.",
    exampleTr: "Tatilim sırasında bir posta kartı yazdım."
},

{
    word: "Text message",
    type: "noun",
    meaning: "Kısa mesaj",
    example: "I sent her a text message.",
    exampleTr: "Ona kısa bir mesaj gönderdim."
},

{
    word: "Send an e-mail",
    type: "phrase",
    meaning: "E-posta göndermek",
    example: "I need to send an e-mail to my teacher.",
    exampleTr: "Öğretmenime bir e-posta göndermem gerekiyor."
},

{
    word: "Take a memo",
    type: "phrase",
    meaning: "Not almak",
    example: "Please take a memo during the meeting.",
    exampleTr: "Lütfen toplantı sırasında not al."
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
    example: "We have video chats with our friends.",
    exampleTr: "Arkadaşlarımızla görüntülü sohbetler yaparız."
},

{
    word: "Talk on the mobile phone",
    type: "phrase",
    meaning: "Cep telefonu ile konuşmak",
    example: "I often talk on the mobile phone with my friends.",
    exampleTr: "Arkadaşlarımla sık sık cep telefonuyla konuşurum."
},

{
    word: "Leave a message note",
    type: "phrase",
    meaning: "Not bırakmak",
    example: "Please leave a message note for me.",
    exampleTr: "Lütfen benim için bir not bırak."
},

{
    word: "Use smoke signals",
    type: "phrase",
    meaning: "Dumanla haberleşmek",
    example: "People used smoke signals to communicate.",
    exampleTr: "İnsanlar iletişim kurmak için dumanla haberleşirdi."
},

{
    word: "Send a fax",
    type: "phrase",
    meaning: "Faks göndermek",
    example: "I need to send a fax to the office.",
    exampleTr: "Ofise faks göndermem gerekiyor."
},

{
    word: "Leave a voice mail",
    type: "phrase",
    meaning: "Sesli mesaj bırakmak",
    example: "I left a voice mail for my friend.",
    exampleTr: "Arkadaşıma sesli mesaj bıraktım."
},

{
    word: "Addiction",
    type: "noun",
    meaning: "Bağımlılık",
    example: "Phone addiction can be harmful.",
    exampleTr: "Telefon bağımlılığı zararlı olabilir."
},

{
    word: "Again",
    type: "adverb",
    meaning: "Tekrar",
    example: "Could you say that again?",
    exampleTr: "Bunu tekrar söyleyebilir misin?"
},

{
    word: "Angry",
    type: "adjective",
    meaning: "Kızgın, sinirli",
    example: "He was angry about the misunderstanding.",
    exampleTr: "Yanlış anlaşılma konusunda kızgındı."
},

{
    word: "Answer",
    type: "verb",
    meaning: "Cevap vermek",
    example: "Please answer the phone.",
    exampleTr: "Lütfen telefonu aç."
},

{
    word: "Appointment",
    type: "noun",
    meaning: "Randevu",
    example: "I have an appointment with the doctor.",
    exampleTr: "Doktorla randevum var."
},

{
    word: "As soon as possible",
    type: "phrase",
    meaning: "Mümkün olan en kısa sürede",
    example: "Please call me back as soon as possible.",
    exampleTr: "Lütfen beni mümkün olan en kısa sürede geri ara."
},

{
    word: "Available",
    type: "adjective",
    meaning: "Müsait",
    example: "Is the manager available now?",
    exampleTr: "Müdür şu anda müsait mi?"
},

{
    word: "Bad line",
    type: "noun",
    meaning: "Kötü, cızırtılı hat",
    example: "Sorry, we have a bad line.",
    exampleTr: "Üzgünüm, hattımız kötü."
},

{
    word: "Book",
    type: "verb",
    meaning: "Rezervasyon yapmak",
    example: "I want to book a table for tonight.",
    exampleTr: "Bu akşam için bir masa ayırtmak istiyorum."
},

{
    word: "Bored",
    type: "adjective",
    meaning: "Sıkılmış",
    example: "I was bored at home.",
    exampleTr: "Evde sıkılmıştım."
},

{
    word: "Break into",
    type: "phrase",
    meaning: "Bir yere zorla girmek",
    example: "Someone tried to break into the house.",
    exampleTr: "Birisi eve zorla girmeye çalıştı."
},

{
    word: "Burglar",
    type: "noun",
    meaning: "Ev soyguncusu",
    example: "The burglar entered the house at night.",
    exampleTr: "Ev soyguncusu gece eve girdi."
},

{
    word: "Burglary",
    type: "noun",
    meaning: "Ev soygunu",
    example: "There was a burglary last night.",
    exampleTr: "Dün gece bir ev soygunu oldu."
},

{
    word: "Busy",
    type: "adjective",
    meaning: "Meşgul",
    example: "I'm busy right now.",
    exampleTr: "Şu anda meşgulüm."
},

{
    word: "Call",
    type: "verb",
    meaning: "Aramak",
    example: "I'll call you later.",
    exampleTr: "Seni daha sonra arayacağım."
},

{
    word: "Call back",
    type: "phrasal verb",
    meaning: "Geri aramak",
    example: "I'll call you back later.",
    exampleTr: "Seni daha sonra geri arayacağım."
},

{
    word: "Call center",
    type: "noun",
    meaning: "Çağrı merkezi",
    example: "I called the customer service call center.",
    exampleTr: "Müşteri hizmetleri çağrı merkezini aradım."
},

{
    word: "Calm down",
    type: "phrasal verb",
    meaning: "Sakin olmak",
    example: "Please calm down and listen to me.",
    exampleTr: "Lütfen sakin ol ve beni dinle."
},

{
    word: "Cell phone",
    type: "noun",
    meaning: "Cep telefonu",
    example: "I always carry my cell phone.",
    exampleTr: "Cep telefonumu her zaman yanımda taşırım."
},

{
    word: "Clarification",
    type: "noun",
    meaning: "Açıklık getirme, açıklama",
    example: "I need some clarification about the message.",
    exampleTr: "Mesaj hakkında biraz açıklamaya ihtiyacım var."
},

{
    word: "Communicate",
    type: "verb",
    meaning: "İletişim kurmak",
    example: "People communicate in different ways.",
    exampleTr: "İnsanlar farklı şekillerde iletişim kurar."
},

{
    word: "Confirm",
    type: "verb",
    meaning: "Onaylamak",
    example: "Please confirm your appointment.",
    exampleTr: "Lütfen randevunuzu onaylayın."
},

{
    word: "Connect",
    type: "verb",
    meaning: "Bağlamak",
    example: "Please connect me to the manager.",
    exampleTr: "Lütfen beni müdüre bağlayın."
},

{
    word: "Contact with",
    type: "phrase",
    meaning: "İletişim kurmak",
    example: "I want to contact with my old friend.",
    exampleTr: "Eski arkadaşımla iletişim kurmak istiyorum."
},

{
    word: "Conversation",
    type: "noun",
    meaning: "Görüşme, konuşma",
    example: "We had a long conversation.",
    exampleTr: "Uzun bir konuşma yaptık."
},

{
    word: "Cool",
    type: "adjective",
    meaning: "Havalı",
    example: "Your new phone looks cool.",
    exampleTr: "Yeni telefonun havalı görünüyor."
},

{
    word: "Crazy",
    type: "adjective",
    meaning: "Çılgın",
    example: "That was a crazy idea.",
    exampleTr: "Bu çılgınca bir fikirdi."
},

{
    word: "Customer service",
    type: "noun",
    meaning: "Müşteri hizmetleri",
    example: "I called customer service about my order.",
    exampleTr: "Siparişim hakkında müşteri hizmetlerini aradım."
},

{
    word: "Dial",
    type: "verb",
    meaning: "Numarayı tuşlamak, çevirmek",
    example: "Dial the phone number carefully.",
    exampleTr: "Telefon numarasını dikkatlice tuşla."
},

{
    word: "Doorbell",
    type: "noun",
    meaning: "Kapı zili",
    example: "Someone rang the doorbell.",
    exampleTr: "Birisi kapı zilini çaldı."
},

{
    word: "Easy",
    type: "adjective",
    meaning: "Kolay",
    example: "This phone is easy to use.",
    exampleTr: "Bu telefonun kullanımı kolay."
},

{
    word: "Embarrassed",
    type: "adjective",
    meaning: "Utanmış",
    example: "I felt embarrassed after the mistake.",
    exampleTr: "Hatadan sonra utanmış hissettim."
},

{
    word: "Engaged",
    type: "adjective",
    meaning: "Meşgul",
    example: "The line is engaged.",
    exampleTr: "Hat meşgul."
},

{
    word: "Evolve",
    type: "verb",
    meaning: "Gelişmek, evrilmek",
    example: "Communication methods continue to evolve.",
    exampleTr: "İletişim yöntemleri gelişmeye devam ediyor."
},

{
    word: "Extension",
    type: "noun",
    meaning: "Dahili hat, iç hat",
    example: "What is your extension number?",
    exampleTr: "Dahili numaranız nedir?"
},

{
    word: "Faculty of Medicine",
    type: "noun",
    meaning: "Tıp fakültesi",
    example: "She studies at the Faculty of Medicine.",
    exampleTr: "Tıp fakültesinde okuyor."
},

{
    word: "Feel",
    type: "verb",
    meaning: "Hissetmek",
    example: "I feel happy when I talk to my friends.",
    exampleTr: "Arkadaşlarımla konuştuğumda mutlu hissederim."
},

{
    word: "Get back",
    type: "phrasal verb",
    meaning: "Geri dönmek, geri aramak",
    example: "I'll get back to you soon.",
    exampleTr: "Sana yakında geri döneceğim."
},

{
    word: "Get somebody",
    type: "phrase",
    meaning: "Birini telefona vermek",
    example: "Can I get somebody to help me?",
    exampleTr: "Bana yardım edecek birini telefona verebilir misiniz?"
},

{
    word: "Hang on",
    type: "phrasal verb",
    meaning: "Hatta beklemek",
    example: "Hang on, I'll connect you to the manager.",
    exampleTr: "Hatta bekleyin, sizi müdüre bağlayacağım."
},

{
    word: "Hang up",
    type: "phrasal verb",
    meaning: "Telefonu kapatmak",
    example: "Don't hang up, please.",
    exampleTr: "Lütfen telefonu kapatma."
},

{
    word: "Happy",
    type: "adjective",
    meaning: "Mutlu",
    example: "I'm happy to hear from you.",
    exampleTr: "Senden haber aldığım için mutluyum."
},

{
    word: "Harmful",
    type: "adjective",
    meaning: "Zararlı",
    example: "Too much phone use can be harmful.",
    exampleTr: "Telefonu çok fazla kullanmak zararlı olabilir."
},

{
    word: "Hear",
    type: "verb",
    meaning: "Duymak",
    example: "I can't hear you clearly.",
    exampleTr: "Seni net bir şekilde duyamıyorum."
},

{
    word: "Hold on",
    type: "phrasal verb",
    meaning: "Hatta beklemek",
    example: "Hold on a moment, please.",
    exampleTr: "Lütfen bir dakika hatta bekleyin."
},

{
    word: "Incident",
    type: "noun",
    meaning: "Olay",
    example: "The police investigated the incident.",
    exampleTr: "Polis olayı araştırdı."
},

{
    word: "Information",
    type: "noun",
    meaning: "Bilgi",
    example: "Can you give me more information?",
    exampleTr: "Bana daha fazla bilgi verebilir misin?"
},

{
    word: "Keep in touch",
    type: "phrase",
    meaning: "İletişimde kalmak, görüşmek",
    example: "Let's keep in touch after the holiday.",
    exampleTr: "Tatilden sonra iletişimde kalalım."
},

{
    word: "Know",
    type: "verb",
    meaning: "Bilmek",
    example: "Do you know his phone number?",
    exampleTr: "Onun telefon numarasını biliyor musun?"
},

{
    word: "Landline",
    type: "noun",
    meaning: "Sabit telefon hattı",
    example: "We still have a landline at home.",
    exampleTr: "Evimizde hâlâ sabit telefon var."
},

{
    word: "Leave",
    type: "verb",
    meaning: "Bırakmak",
    example: "Please leave the room quietly.",
    exampleTr: "Lütfen odadan sessizce ayrıl."
},

{
    word: "Leave message",
    type: "phrase",
    meaning: "Mesaj bırakmak",
    example: "Please leave a message after the beep.",
    exampleTr: "Lütfen sinyal sesinden sonra mesaj bırakın."
},

{
    word: "Line",
    type: "noun",
    meaning: "Hat, telefon hattı",
    example: "The phone line is busy.",
    exampleTr: "Telefon hattı meşgul."
},

{
    word: "Local authority",
    type: "noun",
    meaning: "Yerel yetkili, yerel yönetim",
    example: "The local authority gave us some information.",
    exampleTr: "Yerel yönetim bize bazı bilgiler verdi."
},

{
    word: "Loud",
    type: "adjective",
    meaning: "Yüksek sesli",
    example: "The music is too loud.",
    exampleTr: "Müzik çok yüksek sesli."
},

{
    word: "Meet up",
    type: "phrasal verb",
    meaning: "Buluşmak",
    example: "Let's meet up after school.",
    exampleTr: "Okuldan sonra buluşalım."
},

{
    word: "Meeting",
    type: "noun",
    meaning: "Toplantı",
    example: "We have a meeting at ten o'clock.",
    exampleTr: "Saat onda bir toplantımız var."
},

{
    word: "Memo",
    type: "noun",
    meaning: "Not",
    example: "I wrote a memo for my manager.",
    exampleTr: "Müdürüm için bir not yazdım."
},

{
    word: "Message",
    type: "noun",
    meaning: "Mesaj",
    example: "I received your message.",
    exampleTr: "Mesajını aldım."
},

{
    word: "Minute",
    type: "noun",
    meaning: "Dakika",
    example: "Please wait a minute.",
    exampleTr: "Lütfen bir dakika bekle."
},

{
    word: "Misunderstanding",
    type: "noun",
    meaning: "Yanlış anlama",
    example: "There was a misunderstanding between us.",
    exampleTr: "Aramızda bir yanlış anlama oldu."
},

{
    word: "Could you repeat that?",
    type: "phrase",
    meaning: "Bunu tekrar eder misiniz?",
    example: "Sorry, could you repeat that?",
    exampleTr: "Üzgünüm, bunu tekrar eder misiniz?"
},

{
    word: "Can I speak to...?",
    type: "phrase",
    meaning: "... ile konuşabilir miyim?",
    example: "Can I speak to Mr. Brown?",
    exampleTr: "Bay Brown ile konuşabilir miyim?"
},

{
    word: "May I speak to...?",
    type: "phrase",
    meaning: "... ile konuşabilir miyim?",
    example: "May I speak to the manager?",
    exampleTr: "Müdürle konuşabilir miyim?"
},

{
    word: "Who is calling?",
    type: "phrase",
    meaning: "Kim arıyor?",
    example: "Hello. Who is calling, please?",
    exampleTr: "Merhaba. Kim arıyor, lütfen?"
},

{
    word: "Hold the line",
    type: "phrase",
    meaning: "Hatta beklemek",
    example: "Please hold the line.",
    exampleTr: "Lütfen hatta bekleyin."
},

{
    word: "The line is busy",
    type: "phrase",
    meaning: "Hat meşgul",
    example: "Sorry, the line is busy.",
    exampleTr: "Üzgünüm, hat meşgul."
},

{
    word: "Wrong number",
    type: "phrase",
    meaning: "Yanlış numara",
    example: "Sorry, I think you have the wrong number.",
    exampleTr: "Üzgünüm, sanırım yanlış numarayı aradınız."
},

{
    word: "Leave a message",
    type: "phrase",
    meaning: "Mesaj bırakmak",
    example: "Can I leave a message?",
    exampleTr: "Mesaj bırakabilir miyim?"
},

{
    word: "I'll call back later",
    type: "phrase",
    meaning: "Daha sonra geri arayacağım",
    example: "I'm busy now. I'll call back later.",
    exampleTr: "Şu anda meşgulüm. Daha sonra geri arayacağım."
},

{
    word: "Sorry, I can't hear you",
    type: "phrase",
    meaning: "Üzgünüm, sizi duyamıyorum",
    example: "Sorry, I can't hear you clearly.",
    exampleTr: "Üzgünüm, sizi net bir şekilde duyamıyorum."
},

{
    word: "Mobile phone",
    type: "noun",
    meaning: "Cep telefonu",
    example: "My mobile phone is on the table.",
    exampleTr: "Cep telefonum masanın üzerinde."
},

{
    word: "Municipality",
    type: "noun",
    meaning: "Belediye",
    example: "The municipality organized the event.",
    exampleTr: "Belediye etkinliği düzenledi."
},

{
    word: "Neighbour",
    type: "noun",
    meaning: "Komşu",
    example: "Our neighbour is very friendly.",
    exampleTr: "Komşumuz çok arkadaş canlısı."
},

{
    word: "Officer",
    type: "noun",
    meaning: "Polis memuru",
    example: "The police officer asked me some questions.",
    exampleTr: "Polis memuru bana bazı sorular sordu."
},

{
    word: "Order list",
    type: "noun",
    meaning: "Sipariş listesi",
    example: "I checked the order list.",
    exampleTr: "Sipariş listesini kontrol ettim."
},

{
    word: "Phone",
    type: "noun / verb",
    meaning: "Telefon, aramak",
    example: "I'll phone you tonight.",
    exampleTr: "Seni bu akşam arayacağım."
},

{
    word: "Phone number",
    type: "noun",
    meaning: "Telefon numarası",
    example: "Can I have your phone number?",
    exampleTr: "Telefon numaranı alabilir miyim?"
},

{
    word: "Pick up",
    type: "phrasal verb",
    meaning: "Telefonu açmak",
    example: "Please pick up the phone.",
    exampleTr: "Lütfen telefonu aç."
},

{
    word: "Pros",
    type: "noun",
    meaning: "Artılar, avantajlar",
    example: "Let's discuss the pros and cons.",
    exampleTr: "Artıları ve eksileri tartışalım."
},

{
    word: "Put somebody through",
    type: "phrase",
    meaning: "Birini telefona bağlamak",
    example: "I'll put you through to the manager.",
    exampleTr: "Sizi müdüre bağlayacağım."
},

{
    word: "Repeat",
    type: "verb",
    meaning: "Tekrar etmek",
    example: "Could you repeat the phone number?",
    exampleTr: "Telefon numarasını tekrar edebilir misin?"
},

{
    word: "Reservation",
    type: "noun",
    meaning: "Rezervasyon, yer ayırtma",
    example: "I made a reservation at the restaurant.",
    exampleTr: "Restoranda rezervasyon yaptım."
},

{
    word: "Ring",
    type: "verb",
    meaning: "Çalmak",
    example: "The phone is ringing.",
    exampleTr: "Telefon çalıyor."
},

{
    word: "Cons",
    type: "noun",
    meaning: "Eksiler, dezavantajlar",
    example: "Let's discuss the pros and cons.",
    exampleTr: "Artıları ve eksileri tartışalım."
},

{
    word: "Name and surname",
    type: "phrase",
    meaning: "Ad ve soyad",
    example: "Please write your name and surname here.",
    exampleTr: "Lütfen adınızı ve soyadınızı buraya yazın."
},

{
    word: "Sad",
    type: "adjective",
    meaning: "Üzgün",
    example: "She felt sad after the conversation.",
    exampleTr: "Konuşmadan sonra üzgün hissetti."
},

{
    word: "Say",
    type: "verb",
    meaning: "Söylemek",
    example: "What did you say?",
    exampleTr: "Ne söyledin?"
},

{
    word: "Scared",
    type: "adjective",
    meaning: "Korkmuş",
    example: "I was scared when I heard the noise.",
    exampleTr: "Sesi duyduğumda korkmuştum."
},

{
    word: "Security",
    type: "noun",
    meaning: "Güvenlik",
    example: "Security is very important in this building.",
    exampleTr: "Bu binada güvenlik çok önemlidir."
},

{
    word: "Sleepy",
    type: "adjective",
    meaning: "Uykulu",
    example: "I'm feeling sleepy.",
    exampleTr: "Uykulu hissediyorum."
},

{
    word: "Smart phone",
    type: "noun",
    meaning: "Akıllı telefon",
    example: "I use my smart phone every day.",
    exampleTr: "Akıllı telefonumu her gün kullanırım."
},

{
    word: "Soon",
    type: "adverb",
    meaning: "Yakında",
    example: "I'll call you soon.",
    exampleTr: "Seni yakında arayacağım."
},

{
    word: "Speak",
    type: "verb",
    meaning: "Konuşmak",
    example: "Can I speak to Mr. Smith?",
    exampleTr: "Bay Smith ile konuşabilir miyim?"
},

{
    word: "Spell",
    type: "verb",
    meaning: "Hecelemek, harf harf söylemek",
    example: "Could you spell your name, please?",
    exampleTr: "Adınızı harf harf söyleyebilir misiniz?"
},

{
    word: "Staff",
    type: "noun",
    meaning: "Personel",
    example: "The hotel staff were very helpful.",
    exampleTr: "Otel personeli çok yardımcı oldu."
},

{
    word: "Surprised",
    type: "adjective",
    meaning: "Şaşırmış",
    example: "I was surprised by the news.",
    exampleTr: "Habere şaşırdım."
},

{
    word: "Take message",
    type: "phrase",
    meaning: "Mesaj almak",
    example: "Can I take a message?",
    exampleTr: "Mesajınızı alabilir miyim?"
},

{
    word: "Talk",
    type: "verb",
    meaning: "Konuşmak",
    example: "I want to talk to you.",
    exampleTr: "Seninle konuşmak istiyorum."
},

{
    word: "Tell",
    type: "verb",
    meaning: "Söylemek",
    example: "Please tell me your name.",
    exampleTr: "Lütfen bana adınızı söyleyin."
},

{
    word: "Try",
    type: "verb",
    meaning: "Denemek",
    example: "I'll try to call you later.",
    exampleTr: "Seni daha sonra aramayı deneyeceğim."
},

{
    word: "Upset",
    type: "adjective",
    meaning: "Üzgün, morali bozuk",
    example: "She was upset about the misunderstanding.",
    exampleTr: "Yanlış anlama yüzünden morali bozuldu."
},

{
    word: "Useful",
    type: "adjective",
    meaning: "Faydalı",
    example: "This app is very useful for communication.",
    exampleTr: "Bu uygulama iletişim için çok faydalı."
},

{
    word: "Via",
    type: "preposition",
    meaning: "Yoluyla, aracılığıyla",
    example: "I sent the message via e-mail.",
    exampleTr: "Mesajı e-posta yoluyla gönderdim."
},

{
    word: "Wait",
    type: "verb",
    meaning: "Beklemek",
    example: "Please wait on the line.",
    exampleTr: "Lütfen hatta bekleyin."
},

{
    word: "Wonder",
    type: "verb",
    meaning: "Merak etmek",
    example: "I wonder why he didn't call.",
    exampleTr: "Neden aramadığını merak ediyorum."
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