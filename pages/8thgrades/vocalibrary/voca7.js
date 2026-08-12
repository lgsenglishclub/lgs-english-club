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
    word: "Accommodation",
    type: "noun",
    meaning: "Konaklama",
    example: "We need to find good accommodation.",
    exampleTr: "İyi bir konaklama yeri bulmamız gerekiyor."
},

{
    word: "All inclusive",
    type: "phrase",
    meaning: "Her şey dahil",
    example: "We stayed at an all-inclusive hotel.",
    exampleTr: "Her şey dahil bir otelde kaldık."
},

{
    word: "Amphitheatre",
    type: "noun",
    meaning: "Amfitiyatro",
    example: "We visited an ancient amphitheatre.",
    exampleTr: "Antik bir amfitiyatroyu ziyaret ettik."
},

{
    word: "Ancient",
    type: "adjective",
    meaning: "Antik",
    example: "This is an ancient city.",
    exampleTr: "Burası antik bir şehirdir."
},

{
    word: "Attractive",
    type: "adjective",
    meaning: "Çekici",
    example: "The city has many attractive places.",
    exampleTr: "Şehrin birçok çekici yeri vardır."
},

{
    word: "Bed and breakfast",
    type: "phrase",
    meaning: "Oda ve kahvaltı",
    example: "We stayed at a small bed and breakfast.",
    exampleTr: "Küçük bir oda ve kahvaltı yerinde kaldık."
},

{
    word: "Book a room",
    type: "phrase",
    meaning: "Oda ayırtmak",
    example: "I want to book a room for two nights.",
    exampleTr: "İki gecelik bir oda ayırtmak istiyorum."
},

{
    word: "Street",
    type: "noun",
    meaning: "Cadde",
    example: "There are many shops on this busy street.",
    exampleTr: "Bu kalabalık caddede birçok mağaza var."
},

{
    word: "Countryside",
    type: "noun",
    meaning: "Kırsal bölge",
    example: "We spent the weekend in the countryside.",
    exampleTr: "Hafta sonunu kırsal bölgede geçirdik."
},

{
    word: "Crowded",
    type: "adjective",
    meaning: "Kalabalık",
    example: "The city center is very crowded.",
    exampleTr: "Şehir merkezi çok kalabalık."
},

{
    word: "Cruise",
    type: "noun",
    meaning: "Gemi seyahati",
    example: "We went on a cruise last summer.",
    exampleTr: "Geçen yaz gemi seyahatine çıktık."
},

{
    word: "Destination",
    type: "noun",
    meaning: "Varış yeri",
    example: "Paris is a popular tourist destination.",
    exampleTr: "Paris popüler bir turistik varış yeridir."
},

{
    word: "Enjoyable",
    type: "adjective",
    meaning: "Keyifli",
    example: "It was an enjoyable trip.",
    exampleTr: "Keyifli bir geziydi."
},

{
    word: "Entertainment",
    type: "noun",
    meaning: "Eğlence",
    example: "The hotel offers lots of entertainment.",
    exampleTr: "Otel birçok eğlence imkanı sunuyor."
},

{
    word: "Famous",
    type: "adjective",
    meaning: "Ünlü",
    example: "We visited a famous square in the city.",
    exampleTr: "Şehirde ünlü bir meydanı ziyaret ettik."
},

{
    word: "Fountain",
    type: "noun",
    meaning: "Çeşme",
    example: "There is a beautiful fountain in the square.",
    exampleTr: "Meydanda güzel bir çeşme var."
},

{
    word: "Golden beaches",
    type: "noun",
    meaning: "Altın kumsallar",
    example: "The island is famous for its golden beaches.",
    exampleTr: "Ada altın kumsallarıyla ünlüdür."
},

{
    word: "Gorgeous",
    type: "adjective",
    meaning: "Muhteşem",
    example: "The view from the hotel was gorgeous.",
    exampleTr: "Otelden manzara muhteşemdi."
},

{
    word: "Heritage",
    type: "noun",
    meaning: "Miras",
    example: "The city has a rich cultural heritage.",
    exampleTr: "Şehrin zengin bir kültürel mirası vardır."
},

{
    word: "Historic site",
    type: "noun",
    meaning: "Tarihi alan",
    example: "We visited an important historic site.",
    exampleTr: "Önemli bir tarihi alanı ziyaret ettik."
},

{
    word: "Hospitable",
    type: "adjective",
    meaning: "Misafirperver",
    example: "The local people were very hospitable.",
    exampleTr: "Yerel halk çok misafirperverdi."
},

{
    word: "Island",
    type: "noun",
    meaning: "Ada",
    example: "We spent our holiday on a beautiful island.",
    exampleTr: "Tatilimizi güzel bir adada geçirdik."
},

{
    word: "Location",
    type: "noun",
    meaning: "Konum",
    example: "The hotel has a great location.",
    exampleTr: "Otelin harika bir konumu var."
},

{
    word: "Make a wish",
    type: "phrase",
    meaning: "Dilek tutmak",
    example: "She made a wish at the fountain.",
    exampleTr: "Çeşmenin yanında dilek tuttu."
},

{
    word: "Mysterious",
    type: "adjective",
    meaning: "Gizemli",
    example: "The ancient city has a mysterious history.",
    exampleTr: "Antik şehrin gizemli bir tarihi var."
},

{
    word: "Palace",
    type: "noun",
    meaning: "Saray",
    example: "The tourists visited the old palace.",
    exampleTr: "Turistler eski sarayı ziyaret etti."
},

{
    word: "Port city",
    type: "noun",
    meaning: "Liman şehri",
    example: "Istanbul is a famous port city.",
    exampleTr: "İstanbul ünlü bir liman şehridir."
},

{
    word: "Resort",
    type: "noun",
    meaning: "Tatil köyü",
    example: "We stayed at a beautiful resort.",
    exampleTr: "Güzel bir tatil köyünde kaldık."
},

{
    word: "Sightseeing tour",
    type: "noun",
    meaning: "Gezi turu",
    example: "We joined a sightseeing tour.",
    exampleTr: "Bir gezi turuna katıldık."
},

{
    word: "Souvenir",
    type: "noun",
    meaning: "Hediyelik eşya",
    example: "I bought a souvenir for my friend.",
    exampleTr: "Arkadaşım için bir hediyelik eşya aldım."
},

{
    word: "Square",
    type: "noun",
    meaning: "Meydan",
    example: "The square is full of tourists.",
    exampleTr: "Meydan turistlerle dolu."
},

{
    word: "Sunbathe",
    type: "verb",
    meaning: "Güneşlenmek",
    example: "We like to sunbathe on the beach.",
    exampleTr: "Sahilde güneşlenmeyi severiz."
},

{
    word: "local dishes",
    type: "noun",
    meaning: "Yerel yemekler",
    example: "Tourists love to taste local dishes.",
    exampleTr: "Turistler yerel yemekleri tatmayı sever."
},

{
    word: "Traditional dish",
    type: "noun",
    meaning: "Geleneksel yemek",
    example: "We tried a traditional dish.",
    exampleTr: "Geleneksel bir yemek denedik."
},

{
    word: "Transportation",
    type: "noun",
    meaning: "Ulaşım",
    example: "Public transportation is cheap and easy.",
    exampleTr: "Toplu taşıma ucuz ve kolaydır."
},

{
    word: "Trip",
    type: "noun",
    meaning: "Gezi",
    example: "Our school trip was amazing.",
    exampleTr: "Okul gezimiz harikaydı."
},

{
    word: "Wildlife",
    type: "noun",
    meaning: "Vahşi yaşam",
    example: "The island has rich wildlife.",
    exampleTr: "Adada zengin bir vahşi yaşam vardır."
},

{
    word: "Tourism",
    type: "noun",
    meaning: "Turizm",
    example: "Tourism is important for the country's economy.",
    exampleTr: "Turizm ülkenin ekonomisi için önemlidir."
},

{
    word: "Tourist attractions",
    type: "noun",
    meaning: "Turistik yerler",
    example: "There are many tourist attractions in this city.",
    exampleTr: "Bu şehirde birçok turistik yer var."
},

{
    word: "Vacation",
    type: "noun",
    meaning: "Tatil",
    example: "We are going on vacation next week.",
    exampleTr: "Gelecek hafta tatile gidiyoruz."
},

{
    word: "Brochure",
    type: "noun",
    meaning: "Broşürü",
    example: "I found some useful information in the travel brochure.",
    exampleTr: "Gezi broşüründe bazı faydalı bilgiler buldum."
},

{
    word: "Advertisement",
    type: "noun",
    meaning: "Reklam",
    example: "I saw an advertisement for a beautiful hotel.",
    exampleTr: "Güzel bir otel için bir reklam gördüm."
},

{
    word: "Abroad",
    type: "noun",
    meaning: "Yurt dışı",
    example: "My family wants to travel abroad.",
    exampleTr: "Ailem yurt dışına seyahat etmek istiyor."
},

{
    word: "Visit",
    type: "verb",
    meaning: "Ziyaret etmek",
    example: "We visited many historical places.",
    exampleTr: "Birçok tarihi yeri ziyaret ettik."
},

{
    word: "Spectator",
    type: "noun",
    meaning: "İzleyici, seyirci",
    example: "Thousands of spectators watched the game.",
    exampleTr: "Binlerce seyirci maçı izledi."
},

{
    word: "Architecture",
    type: "noun",
    meaning: "Mimari",
    example: "The city is famous for its historical architecture.",
    exampleTr: "Şehir tarihi mimarisiyle ünlüdür."
},

{
    word: "Modern buildings",
    type: "noun",
    meaning: "Modern yapılar",
    example: "The city has many modern buildings.",
    exampleTr: "Şehirde birçok modern yapı vardır."
},

{
    word: "Natural ports",
    type: "noun",
    meaning: "Doğal limanlar",
    example: "The country has several natural ports.",
    exampleTr: "Ülkede birkaç doğal liman vardır."
},

{
    word: "Must-see places",
    type: "noun",
    meaning: "Görülmesi gereken yerler",
    example: "This museum is one of the city's must-see places.",
    exampleTr: "Bu müze şehrin görülmesi gereken yerlerinden biridir."
},

{
    word: "Traditions",
    type: "noun",
    meaning: "Gelenekler",
    example: "We should respect different traditions.",
    exampleTr: "Farklı geleneklere saygı göstermeliyiz."
},

{
    word: "Traditional handcrafts",
    type: "noun",
    meaning: "Geleneksel el sanatları",
    example: "Tourists can buy traditional handicrafts.",
    exampleTr: "Turistler geleneksel el sanatları satın alabilir."
},

{
    word: "Cultural diversity",
    type: "noun",
    meaning: "Kültürel çeşitlilik",
    example: "Turkey has great cultural diversity.",
    exampleTr: "Türkiye büyük bir kültürel çeşitliliğe sahiptir."
},

{
    word: "Construction",
    type: "noun",
    meaning: "İnşaat, yapı",
    example: "The construction of the building took two years.",
    exampleTr: "Binanın inşaatı iki yıl sürdü."
},

{
    word: "Structure",
    type: "noun",
    meaning: "Yapı",
    example: "This ancient structure is very impressive.",
    exampleTr: "Bu antik yapı çok etkileyici."
},

{
    word: "Trade route",
    type: "noun",
    meaning: "Ticaret yolu",
    example: "The city was an important trade route.",
    exampleTr: "Şehir önemli bir ticaret yoluydu."
},

{
    word: "Guesthouse",
    type: "noun",
    meaning: "Misafir evi",
    example: "We stayed in a small guesthouse.",
    exampleTr: "Küçük bir misafir evinde kaldık."
},

{
    word: "Seaside",
    type: "noun",
    meaning: "Deniz kenarı",
    example: "We spent the afternoon at the seaside.",
    exampleTr: "Öğleden sonrayı deniz kenarında geçirdik."
},

{
    word: "Highland",
    type: "noun",
    meaning: "Dağlık arazi",
    example: "The highland has beautiful scenery.",
    exampleTr: "Dağlık arazinin güzel bir manzarası var."
},

{
    word: "City sightseeing",
    type: "phrase",
    meaning: "Şehir turu",
    example: "We went city sightseeing in the morning.",
    exampleTr: "Sabah şehir turuna çıktık."
},

{
    word: "Recreational activities",
    type: "noun",
    meaning: "Eğlence etkinlikleri",
    example: "The resort offers many recreational activities.",
    exampleTr: "Tatil köyü birçok eğlence etkinliği sunuyor."
},

{
    word: "Mansion",
    type: "noun",
    meaning: "Köşk, konak",
    example: "They visited an old mansion.",
    exampleTr: "Eski bir konağı ziyaret ettiler."
},

{
    word: "Mosque",
    type: "noun",
    meaning: "Cami",
    example: "The mosque is an important historical building.",
    exampleTr: "Cami önemli bir tarihi yapıdır."
},

{
    word: "Bullfighting",
    type: "noun",
    meaning: "Boğa güreşi",
    example: "Bullfighting is a traditional activity in some countries.",
    exampleTr: "Boğa güreşi bazı ülkelerde geleneksel bir etkinliktir."
},

{
    word: "Abandon",
    type: "verb",
    meaning: "Terk etmek, bırakmak",
    example: "People had to abandon the city after the disaster.",
    exampleTr: "İnsanlar felaketten sonra şehri terk etmek zorunda kaldı."
},

{
    word: "Rediscover",
    type: "verb",
    meaning: "Yeniden keşfetmek",
    example: "Tourists can rediscover the history of the city.",
    exampleTr: "Turistler şehrin tarihini yeniden keşfedebilir."
},

{
    word: "Contain",
    type: "verb",
    meaning: "İçermek",
    example: "The museum contains many ancient objects.",
    exampleTr: "Müze birçok antik eşya içeriyor."
},

{
    word: "Conquer",
    type: "verb",
    meaning: "Fethetmek",
    example: "The emperor wanted to conquer the city.",
    exampleTr: "İmparator şehri fethetmek istedi."
},

{
    word: "Emperor",
    type: "noun",
    meaning: "İmparator",
    example: "The emperor built many impressive structures.",
    exampleTr: "İmparator birçok etkileyici yapı inşa etti."
},

{
    word: "Population",
    type: "noun",
    meaning: "Nüfus",
    example: "The city has a large population.",
    exampleTr: "Şehrin büyük bir nüfusu var."
},

{
    word: "Climate",
    type: "noun",
    meaning: "İklim",
    example: "The climate is warm and sunny.",
    exampleTr: "İklim sıcak ve güneşlidir."
},

{
    word: "Delicious meals",
    type: "noun",
    meaning: "Lezzetli yemekler",
    example: "The hotel serves delicious meals.",
    exampleTr: "Otel lezzetli yemekler servis ediyor."
},

{
    word: "Enormous",
    type: "adjective",
    meaning: "Devasa, çok büyük",
    example: "The palace is enormous.",
    exampleTr: "Saray devasa."
},

{
    word: "Magnificent",
    type: "adjective",
    meaning: "Muhteşem, şahane",
    example: "The palace has a magnificent view.",
    exampleTr: "Sarayın muhteşem bir manzarası var."
},

{
    word: "Remarkable",
    type: "adjective",
    meaning: "Dikkate değer, dikkat çekici",
    example: "The city has a remarkable history.",
    exampleTr: "Şehrin dikkat çekici bir tarihi var."
},

{
    word: "Natural heritage",
    type: "noun",
    meaning: "Doğal miras",
    example: "We should protect our natural heritage.",
    exampleTr: "Doğal mirasımızı korumalıyız."
},

{
    word: "Culture",
    type: "noun",
    meaning: "Kültür",
    example: "Traveling helps us learn about different cultures.",
    exampleTr: "Seyahat etmek farklı kültürleri öğrenmemize yardımcı olur."
},

{
    word: "Custom",
    type: "noun",
    meaning: "Gelenek, adet",
    example: "Every country has its own customs.",
    exampleTr: "Her ülkenin kendine özgü gelenekleri vardır."
},

{
    word: "Explore",
    type: "verb",
    meaning: "Keşfetmek",
    example: "We want to explore the ancient city.",
    exampleTr: "Antik şehri keşfetmek istiyoruz."
},

{
    word: "Discover",
    type: "verb",
    meaning: "Keşfetmek",
    example: "Tourists can discover many interesting places.",
    exampleTr: "Turistler birçok ilginç yer keşfedebilir."
},

{
    word: "Local",
    type: "adjective",
    meaning: "Yerel",
    example: "We talked to some local people.",
    exampleTr: "Bazı yerel insanlarla konuştuk."
},

{
    word: "Historical",
    type: "adjective",
    meaning: "Tarihi",
    example: "The city has many historical monuments.",
    exampleTr: "Şehirde birçok tarihi anıt var."
},

{
    word: "Ruins",
    type: "noun",
    meaning: "Harabeler, kalıntılar",
    example: "We visited the ruins of an ancient city.",
    exampleTr: "Antik bir şehrin kalıntılarını ziyaret ettik."
},

{
    word: "Museum",
    type: "noun",
    meaning: "Müze",
    example: "We visited a famous museum.",
    exampleTr: "Ünlü bir müzeyi ziyaret ettik."
},

{
    word: "Souvenir shop",
    type: "noun",
    meaning: "Hediyelik eşya dükkanı",
    example: "We bought a gift from a souvenir shop.",
    exampleTr: "Bir hediyelik eşya dükkanından hediye aldık."
},

{
    word: "Authentic",
    type: "adjective",
    meaning: "Otantik, özgün",
    example: "You can try authentic local dishes here.",
    exampleTr: "Burada otantik yerel yemekleri deneyebilirsin."
},

{
    word: "Attend",
    type: "verb",
    meaning: "Katılmak",
    example: "We attended a traditional ceremony.",
    exampleTr: "Geleneksel bir törene katıldık."
},

{
    word: "Capital",
    type: "noun",
    meaning: "Başkent",
    example: "Ankara is the capital of Türkiye.",
    exampleTr: "Ankara Türkiye'nin başkentidir."
},

{
    word: "Castle",
    type: "noun",
    meaning: "Kale",
    example: "We visited an ancient castle.",
    exampleTr: "Antik bir kaleyi ziyaret ettik."
},

{
    word: "Ceremony",
    type: "noun",
    meaning: "Tören",
    example: "They attended a traditional ceremony.",
    exampleTr: "Geleneksel bir törene katıldılar."
},

{
    word: "Cuisine",
    type: "noun",
    meaning: "Mutfak, yemek kültürü",
    example: "Turkish cuisine is famous around the world.",
    exampleTr: "Türk mutfağı dünya çapında ünlüdür."
},

{
    word: "Discover",
    type: "verb",
    meaning: "Keşfetmek",
    example: "Tourists can discover many historical places.",
    exampleTr: "Turistler birçok tarihi yeri keşfedebilir."
},

{
    word: "Folk dances",
    type: "noun",
    meaning: "Halk dansları",
    example: "We watched traditional folk dances.",
    exampleTr: "Geleneksel halk danslarını izledik."
},

{
    word: "Monument",
    type: "noun",
    meaning: "Anıt",
    example: "The city has many historical monuments.",
    exampleTr: "Şehirde birçok tarihi anıt var."
},

{
    word: "Migration",
    type: "noun",
    meaning: "Göç",
    example: "Migration changed the population of the city.",
    exampleTr: "Göç şehrin nüfusunu değiştirdi."
},

{
    word: "Conquest",
    type: "noun",
    meaning: "Fetih",
    example: "The conquest changed the history of the city.",
    exampleTr: "Fetih şehrin tarihini değiştirdi."
},

{
    word: "Unforgettable",
    type: "adjective",
    meaning: "Unutulmaz",
    example: "It was an unforgettable trip.",
    exampleTr: "Unutulmaz bir geziydi."
},

{
    word: "Preserve",
    type: "verb",
    meaning: "Korumak",
    example: "We should preserve historical places.",
    exampleTr: "Tarihi yerleri korumalıyız."
},

{
    word: "Route",
    type: "noun",
    meaning: "Güzergâh, yol",
    example: "The ancient city was on an important trade route.",
    exampleTr: "Antik şehir önemli bir ticaret yolu üzerindeydi."
},

{
    word: "Shrine",
    type: "noun",
    meaning: "Türbe, kutsal yapı",
    example: "Many visitors come to see the shrine.",
    exampleTr: "Birçok ziyaretçi türbeyi görmek için gelir."
},

{
    word: "Tomb",
    type: "noun",
    meaning: "Mezar, türbe",
    example: "The ancient tomb is an important historical site.",
    exampleTr: "Antik mezar önemli bir tarihi alandır."
},

{
    word: "Tour guide",
    type: "noun",
    meaning: "Tur rehberi",
    example: "Our tour guide told us about the history of the city.",
    exampleTr: "Tur rehberimiz bize şehrin tarihi hakkında bilgi verdi."
},

{
    word: "Province",
    type: "noun",
    meaning: "İl, vilayet",
    example: "The province attracts many tourists every year.",
    exampleTr: "İl her yıl birçok turist çekiyor."
},

{
    word: "Pottery",
    type: "noun",
    meaning: "Çömlekçilik, çömlek",
    example: "Tourists can buy traditional pottery.",
    exampleTr: "Turistler geleneksel çömlekler satın alabilir."
},

{
    word: "Worldwide",
    type: "adverb",
    meaning: "Dünya çapında",
    example: "The city is famous worldwide.",
    exampleTr: "Şehir dünya çapında ünlüdür."
},

{
    word: "Worth seeing",
    type: "phrase",
    meaning: "Görmeye değer",
    example: "This historical site is worth seeing.",
    exampleTr: "Bu tarihi yer görmeye değer."
},

{
    word: "Per person",
    type: "phrase",
    meaning: "Kişi başı",
    example: "The tour costs fifty dollars per person.",
    exampleTr: "Tur kişi başı elli dolara mal oluyor."
},

{
    word: "What type of",
    type: "phrase",
    meaning: "Ne tür",
    example: "What type of accommodation do you prefer?",
    exampleTr: "Ne tür bir konaklamayı tercih edersin?"
},

{
    word: "Travel",
    type: "verb / noun",
    meaning: "Seyahat etmek, seyahat",
    example: "I love to travel to different countries.",
    exampleTr: "Farklı ülkelere seyahat etmeyi seviyorum."
},

{
    word: "Wealth",
    type: "noun",
    meaning: "Zenginlik",
    example: "The country's cultural wealth attracts tourists.",
    exampleTr: "Ülkenin kültürel zenginliği turistleri çekiyor."
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
        "unit7"
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
                "No Unit 7 progress found."
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
            "Unit 7 progress loaded:",
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
                    `Unit 7 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 7 completed: +${totalXP} XP`
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
                    Unit 7 Complete
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