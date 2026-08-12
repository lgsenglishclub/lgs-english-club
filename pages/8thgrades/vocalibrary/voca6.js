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
    word: "Absolutely",
    type: "adverb",
    meaning: "Kesinlikle",
    example: "I absolutely love adventure sports.",
    exampleTr: "Macera sporlarını kesinlikle çok seviyorum."
},

{
    word: "Accept an offer",
    type: "phrase",
    meaning: "Teklifi kabul etmek",
    example: "She accepted the offer to join the expedition.",
    exampleTr: "Keşif gezisine katılma teklifini kabul etti."
},

{
    word: "Adventure",
    type: "noun",
    meaning: "Macera",
    example: "I love going on exciting adventures.",
    exampleTr: "Heyecan verici maceralara çıkmayı seviyorum."
},

{
    word: "Afraid of",
    type: "phrase",
    meaning: "-den korkmak",
    example: "I'm afraid of heights.",
    exampleTr: "Yükseklikten korkuyorum."
},

{
    word: "Agree",
    type: "verb",
    meaning: "Katılmak, aynı fikirde olmak",
    example: "I agree with you about extreme sports.",
    exampleTr: "Aşırı sporlar konusunda sana katılıyorum."
},

{
    word: "Air sports",
    type: "noun",
    meaning: "Hava sporları",
    example: "Paragliding is one of the most exciting air sports.",
    exampleTr: "Yamaç paraşütü en heyecan verici hava sporlarından biridir."
},

{
    word: "Amused",
    type: "adjective",
    meaning: "Eğlenmiş",
    example: "We were amused by the funny activity.",
    exampleTr: "Komik etkinlikle eğlendik."
},

{
    word: "Barefoot walking",
    type: "phrase",
    meaning: "Çıplak ayakla yürüme",
    example: "Barefoot walking can be a relaxing activity.",
    exampleTr: "Çıplak ayakla yürümek rahatlatıcı bir aktivite olabilir."
},

{
    word: "Boring",
    type: "adjective",
    meaning: "Sıkıcı",
    example: "I think staying at home all day is boring.",
    exampleTr: "Bence bütün gün evde kalmak sıkıcı."
},

{
    word: "Bungee jumping",
    type: "noun",
    meaning: "Yüksekten esnek bir iple atlama",
    example: "Bungee jumping is an extreme sport.",
    exampleTr: "Bungee jumping bir ekstrem spordur."
},

{
    word: "Canoeing",
    type: "noun",
    meaning: "Kano sporu",
    example: "Canoeing is a popular outdoor activity.",
    exampleTr: "Kano popüler bir açık hava aktivitesidir."
},

{
    word: "Cave",
    type: "noun",
    meaning: "Mağara",
    example: "We explored a dark cave.",
    exampleTr: "Karanlık bir mağarayı keşfettik."
},

{
    word: "Caving",
    type: "noun",
    meaning: "Mağaracılık",
    example: "Caving can be a challenging activity.",
    exampleTr: "Mağaracılık zorlayıcı bir aktivite olabilir."
},

{
    word: "Challenging",
    type: "adjective",
    meaning: "Zorlayıcı",
    example: "Climbing a mountain is challenging.",
    exampleTr: "Dağa tırmanmak zorlayıcıdır."
},

{
    word: "Climb",
    type: "verb",
    meaning: "Tırmanmak",
    example: "They climbed to the top of the mountain.",
    exampleTr: "Dağın zirvesine tırmandılar."
},

{
    word: "Crazy",
    type: "adjective",
    meaning: "Çılgın",
    example: "That sounds like a crazy adventure.",
    exampleTr: "Bu çılgın bir macera gibi görünüyor."
},

{
    word: "Cycling",
    type: "noun",
    meaning: "Bisiklet sürme",
    example: "Cycling is my favorite outdoor activity.",
    exampleTr: "Bisiklet sürmek en sevdiğim açık hava aktivitesidir."
},

{
    word: "Describe",
    type: "verb",
    meaning: "Tanımlamak",
    example: "Can you describe your adventure?",
    exampleTr: "Maceranı tanımlayabilir misin?"
},

{
    word: "Describe an experience",
    type: "phrase",
    meaning: "Bir deneyimi tanımlamak",
    example: "He described his experience in detail.",
    exampleTr: "Deneyimini ayrıntılı bir şekilde anlattı."
},

{
    word: "Desert",
    type: "noun",
    meaning: "Çöl",
    example: "We went on an adventure in the desert.",
    exampleTr: "Çölde bir maceraya çıktık."
},

{
    word: "Device",
    type: "noun",
    meaning: "Cihaz",
    example: "You need a special device for this activity.",
    exampleTr: "Bu aktivite için özel bir cihaza ihtiyacın var."
},

{
    word: "Disagree",
    type: "verb",
    meaning: "Katılmamak",
    example: "I disagree with you about this activity.",
    exampleTr: "Bu aktivite konusunda sana katılmıyorum."
},

{
    word: "Disappointing",
    type: "adjective",
    meaning: "Hayal kırıklığına uğratan",
    example: "The trip was disappointing.",
    exampleTr: "Gezi hayal kırıklığına uğrattı."
},

{
    word: "Diving suit",
    type: "noun",
    meaning: "Dalış kıyafeti",
    example: "You need a diving suit for scuba diving.",
    exampleTr: "Tüplü dalış için dalış kıyafetine ihtiyacın var."
},

{
    word: "Enjoyable",
    type: "adjective",
    meaning: "Keyifli",
    example: "The trip was very enjoyable.",
    exampleTr: "Gezi çok keyifliydi."
},

{
    word: "Entertain",
    type: "verb",
    meaning: "Eğlendirmek",
    example: "Outdoor activities can entertain people.",
    exampleTr: "Açık hava aktiviteleri insanları eğlendirebilir."
},

{
    word: "Entertaining",
    type: "adjective",
    meaning: "Eğlenceli",
    example: "The activity was entertaining.",
    exampleTr: "Aktivite eğlenceliydi."
},

{
    word: "Equipment",
    type: "noun",
    meaning: "Ekipman",
    example: "We need special equipment for climbing.",
    exampleTr: "Tırmanış için özel ekipmana ihtiyacımız var."
},

{
    word: "Excitement",
    type: "noun",
    meaning: "Heyecan",
    example: "I felt great excitement before the jump.",
    exampleTr: "Atlayıştan önce büyük bir heyecan hissettim."
},

{
    word: "Exciting",
    type: "adjective",
    meaning: "Heyecan verici",
    example: "Paragliding is an exciting activity.",
    exampleTr: "Yamaç paraşütü heyecan verici bir aktivitedir."
},

{
    word: "Experience",
    type: "noun / verb",
    meaning: "Deneyim, deneyimlemek",
    example: "It was an unforgettable experience.",
    exampleTr: "Unutulmaz bir deneyimdi."
},

{
    word: "Explore",
    type: "verb",
    meaning: "Keşfetmek",
    example: "We want to explore new places.",
    exampleTr: "Yeni yerler keşfetmek istiyoruz."
},

{
    word: "Explore underwater",
    type: "phrase",
    meaning: "Su altını keşfetmek",
    example: "Scuba diving lets us explore underwater.",
    exampleTr: "Tüplü dalış su altını keşfetmemizi sağlar."
},

{
    word: "Extreme sports",
    type: "noun",
    meaning: "Ekstrem sporlar",
    example: "Extreme sports can be dangerous.",
    exampleTr: "Ekstrem sporlar tehlikeli olabilir."
},

{
    word: "Fall down",
    type: "phrasal verb",
    meaning: "Düşmek",
    example: "Be careful not to fall down.",
    exampleTr: "Düşmemeye dikkat et."
},

{
    word: "Famous",
    type: "adjective",
    meaning: "Ünlü",
    example: "This place is famous for its beautiful scenery.",
    exampleTr: "Bu yer güzel manzarasıyla ünlüdür."
},

{
    word: "Famous places",
    type: "phrase",
    meaning: "Ünlü yerler",
    example: "We visited many famous places.",
    exampleTr: "Birçok ünlü yeri ziyaret ettik."
},

{
    word: "Feel the wind",
    type: "phrase",
    meaning: "Rüzgarı hissetmek",
    example: "I love cycling and feeling the wind.",
    exampleTr: "Bisiklet sürmeyi ve rüzgarı hissetmeyi seviyorum."
},

{
    word: "Fight with waves",
    type: "phrase",
    meaning: "Dalgalarla mücadele etmek",
    example: "Surfers fight with waves.",
    exampleTr: "Sörfçüler dalgalarla mücadele eder."
},

{
    word: "Float in the air",
    type: "phrase",
    meaning: "Havada süzülmek",
    example: "Paragliders float in the air.",
    exampleTr: "Yamaç paraşütü yapanlar havada süzülür."
},

{
    word: "Fond of",
    type: "phrase",
    meaning: "Düşkün olmak",
    example: "I'm fond of outdoor activities.",
    exampleTr: "Açık hava aktivitelerine düşkünüm."
},

{
    word: "Go on an expedition",
    type: "phrase",
    meaning: "Keşif gezisine çıkmak",
    example: "They went on an expedition to the mountains.",
    exampleTr: "Dağlara bir keşif gezisine çıktılar."
},

{
    word: "Goggles",
    type: "noun",
    meaning: "Koruyucu gözlükler",
    example: "You should wear goggles while diving.",
    exampleTr: "Dalış yaparken koruyucu gözlük takmalısın."
},

{
    word: "Guess",
    type: "verb",
    meaning: "Tahmin etmek",
    example: "Can you guess what my favorite sport is?",
    exampleTr: "En sevdiğim sporun ne olduğunu tahmin edebilir misin?"
},

{
    word: "Hang around",
    type: "phrasal verb",
    meaning: "Takılmak, vakit geçirmek",
    example: "We usually hang around at the park.",
    exampleTr: "Genellikle parkta takılırız."
},

{
    word: "Hang gliding",
    type: "noun",
    meaning: "Delta kanat uçuşu",
    example: "Hang gliding is an exciting air sport.",
    exampleTr: "Delta kanat uçuşu heyecan verici bir hava sporudur."
},

{
    word: "Have something in common",
    type: "phrase",
    meaning: "Ortak bir şeye sahip olmak",
    example: "We have many things in common.",
    exampleTr: "Birçok ortak yönümüz var."
},

{
    word: "Height",
    type: "noun",
    meaning: "Yükseklik",
    example: "I'm afraid of great heights.",
    exampleTr: "Büyük yüksekliklerden korkuyorum."
},

{
    word: "Helmet",
    type: "noun",
    meaning: "Kask",
    example: "You must wear a helmet while cycling.",
    exampleTr: "Bisiklet sürerken kask takmalısın."
},

{
    word: "High",
    type: "adjective / adverb",
    meaning: "Yüksek",
    example: "The mountain is very high.",
    exampleTr: "Dağ çok yüksek."
},

{
    word: "Hiking",
    type: "noun",
    meaning: "Doğa yürüyüşü",
    example: "We go hiking at weekends.",
    exampleTr: "Hafta sonları doğa yürüyüşüne çıkarız."
},

{
    word: "Historical site",
    type: "noun",
    meaning: "Tarihi alan",
    example: "We visited a famous historical site.",
    exampleTr: "Ünlü bir tarihi alanı ziyaret ettik."
},

{
    word: "Hot air balloon",
    type: "noun",
    meaning: "Sıcak hava balonu",
    example: "We watched the scenery from a hot air balloon.",
    exampleTr: "Manzarayı sıcak hava balonundan izledik."
},

{
    word: "Ice climbing",
    type: "noun",
    meaning: "Buz tırmanışı",
    example: "Ice climbing is a challenging winter sport.",
    exampleTr: "Buz tırmanışı zorlayıcı bir kış sporudur."
},

{
    word: "Impressive",
    type: "adjective",
    meaning: "Etkileyici",
    example: "The scenery was really impressive.",
    exampleTr: "Manzara gerçekten etkileyiciydi."
},

{
    word: "Incredible",
    type: "adjective",
    meaning: "İnanılmaz",
    example: "It was an incredible experience.",
    exampleTr: "İnanılmaz bir deneyimdi."
},

{
    word: "Involve",
    type: "verb",
    meaning: "İçermek",
    example: "Extreme sports involve some risks.",
    exampleTr: "Ekstrem sporlar bazı riskler içerir."
},

{
    word: "Kayaking",
    type: "noun",
    meaning: "Kano yapma",
    example: "Kayaking is a fun water sport.",
    exampleTr: "Kano yapmak eğlenceli bir su sporudur."
},

{
    word: "Knee pad",
    type: "noun",
    meaning: "Dizlik",
    example: "Wear knee pads when you go skateboarding.",
    exampleTr: "Kaykay yaparken dizlik tak."
},

{
    word: "Land sports",
    type: "noun",
    meaning: "Kara sporları",
    example: "Cycling and skateboarding are land sports.",
    exampleTr: "Bisiklet ve kaykay kara sporlarıdır."
},

{
    word: "Make a change",
    type: "phrase",
    meaning: "Bir değişiklik yapmak",
    example: "I want to make a change in my life.",
    exampleTr: "Hayatımda bir değişiklik yapmak istiyorum."
},

{
    word: "Meet sea creatures",
    type: "phrase",
    meaning: "Deniz canlılarıyla karşılaşmak",
    example: "You can meet sea creatures while scuba diving.",
    exampleTr: "Tüplü dalış yaparken deniz canlılarıyla karşılaşabilirsin."
},

{
    word: "Motor racing",
    type: "noun",
    meaning: "Motor yarışı",
    example: "Motor racing is a high-speed sport.",
    exampleTr: "Motor yarışı yüksek hızlı bir spordur."
},

{
    word: "Nature",
    type: "noun",
    meaning: "Doğa",
    example: "I love spending time in nature.",
    exampleTr: "Doğada vakit geçirmeyi seviyorum."
},

{
    word: "Offer",
    type: "noun / verb",
    meaning: "Teklif, teklif etmek",
    example: "He offered me a chance to go hiking.",
    exampleTr: "Bana doğa yürüyüşüne çıkma fırsatı teklif etti."
},

{
    word: "On my own",
    type: "phrase",
    meaning: "Kendi başıma",
    example: "I prefer travelling on my own.",
    exampleTr: "Kendi başıma seyahat etmeyi tercih ederim."
},

{
    word: "Outdoor activities",
    type: "noun",
    meaning: "Açık hava aktiviteleri",
    example: "I enjoy outdoor activities.",
    exampleTr: "Açık hava aktivitelerinden hoşlanırım."
},

{
    word: "Over",
    type: "preposition",
    meaning: "Üzerinde, üstünde",
    example: "The bird flew over the mountain.",
    exampleTr: "Kuş dağın üzerinden uçtu."
},

{
    word: "Paragliding",
    type: "noun",
    meaning: "Yamaç paraşütü",
    example: "Paragliding is an exciting sport.",
    exampleTr: "Yamaç paraşütü heyecan verici bir spordur."
},

{
    word: "Parasailing",
    type: "noun",
    meaning: "Deniz paraşütü",
    example: "We tried parasailing on our holiday.",
    exampleTr: "Tatilimizde deniz paraşütünü denedik."
},

{
    word: "Parkour",
    type: "noun",
    meaning: "Parkur sporu",
    example: "Parkour requires strength and balance.",
    exampleTr: "Parkur sporu güç ve denge gerektirir."
},

{
    word: "Push limits",
    type: "phrase",
    meaning: "Sınırları zorlamak",
    example: "Extreme sports help people push their limits.",
    exampleTr: "Ekstrem sporlar insanların sınırlarını zorlamalarına yardımcı olur."
},

{
    word: "Rare",
    type: "adjective",
    meaning: "Nadir",
    example: "It is rare to see this animal here.",
    exampleTr: "Bu hayvanı burada görmek nadirdir."
},

{
    word: "Reason",
    type: "noun",
    meaning: "Sebep",
    example: "What's the reason for choosing this activity?",
    exampleTr: "Bu aktiviteyi seçmenin sebebi nedir?"
},

{
    word: "Rubber boat",
    type: "noun",
    meaning: "Şişme bot",
    example: "We went down the river in a rubber boat.",
    exampleTr: "Nehirde şişme botla ilerledik."
},

{
    word: "Rocky surface",
    type: "noun",
    meaning: "Kayalık yüzey",
    example: "Be careful on the rocky surface.",
    exampleTr: "Kayalık yüzeyde dikkatli ol."
},

{
    word: "Rough water",
    type: "noun",
    meaning: "Dalgalı su",
    example: "Canoeing can be dangerous in rough water.",
    exampleTr: "Dalgalı suda kano yapmak tehlikeli olabilir."
},

{
    word: "Row",
    type: "verb",
    meaning: "Kürek çekmek",
    example: "We rowed across the lake.",
    exampleTr: "Gölün karşısına kürek çekerek geçtik."
},

{
    word: "Sailing",
    type: "noun",
    meaning: "Yelken sporu",
    example: "Sailing is my favorite water sport.",
    exampleTr: "Yelken sporu en sevdiğim su sporudur."
},

{
    word: "Sand kiting",
    type: "noun",
    meaning: "Kum sörfü",
    example: "Sand kiting is an exciting outdoor activity.",
    exampleTr: "Kum sörfü heyecan verici bir açık hava aktivitesidir."
},

{
    word: "Scenery",
    type: "noun",
    meaning: "Manzara",
    example: "The scenery from the mountain was amazing.",
    exampleTr: "Dağdan görünen manzara harikaydı."
},

{
    word: "Scuba diving",
    type: "noun",
    meaning: "Tüplü dalış",
    example: "Scuba diving lets you explore underwater.",
    exampleTr: "Tüplü dalış su altını keşfetmeni sağlar."
},

{
    word: "Skateboarding",
    type: "noun",
    meaning: "Kaykay",
    example: "My brother enjoys skateboarding.",
    exampleTr: "Erkek kardeşim kaykay yapmaktan hoşlanır."
},

{
    word: "Skiing",
    type: "noun",
    meaning: "Kayak",
    example: "We go skiing every winter.",
    exampleTr: "Her kış kayak yapmaya gideriz."
},

{
    word: "Skyscraper",
    type: "noun",
    meaning: "Gökdelen",
    example: "We climbed to the top of a skyscraper.",
    exampleTr: "Bir gökdelenin zirvesine çıktık."
},

{
    word: "So far",
    type: "phrase",
    meaning: "Şimdiye kadar",
    example: "So far, I have tried three extreme sports.",
    exampleTr: "Şimdiye kadar üç ekstrem spor denedim."
},

{
    word: "Special breathing equipment",
    type: "noun",
    meaning: "Özel solunum ekipmanı",
    example: "Divers use special breathing equipment underwater.",
    exampleTr: "Dalgıçlar su altında özel solunum ekipmanı kullanır."
},

{
    word: "Special track",
    type: "noun",
    meaning: "Özel parkur",
    example: "The race takes place on a special track.",
    exampleTr: "Yarış özel bir parkurda yapılır."
},

{
    word: "Speed",
    type: "noun",
    meaning: "Hız",
    example: "Motor racing requires high speed.",
    exampleTr: "Motor yarışı yüksek hız gerektirir."
},

{
    word: "Spend time",
    type: "phrase",
    meaning: "Vakit geçirmek",
    example: "I like to spend time in nature.",
    exampleTr: "Doğada vakit geçirmeyi severim."
},

{
    word: "Take a risk",
    type: "phrase",
    meaning: "Risk almak",
    example: "Extreme sports can make you take a risk.",
    exampleTr: "Ekstrem sporlar risk almanı gerektirebilir."
},

{
    word: "Tied",
    type: "adjective",
    meaning: "Bağlı",
    example: "The climber was tied to a safety rope.",
    exampleTr: "Tırmanıcı güvenlik ipine bağlıydı."
},

{
    word: "Top of a hill",
    type: "phrase",
    meaning: "Tepenin zirvesi",
    example: "We reached the top of the hill.",
    exampleTr: "Tepenin zirvesine ulaştık."
},

{
    word: "Top of a mountain",
    type: "phrase",
    meaning: "Dağın zirvesi",
    example: "They reached the top of the mountain.",
    exampleTr: "Dağın zirvesine ulaştılar."
},

{
    word: "Travel",
    type: "verb",
    meaning: "Seyahat etmek",
    example: "I love travelling to new places.",
    exampleTr: "Yeni yerlere seyahat etmeyi seviyorum."
},

{
    word: "Trekking",
    type: "noun",
    meaning: "Doğa yürüyüşü",
    example: "Trekking is a great way to enjoy nature.",
    exampleTr: "Doğa yürüyüşü doğanın tadını çıkarmanın harika bir yoludur."
},

{
    word: "Try",
    type: "verb",
    meaning: "Denemek",
    example: "I'd like to try paragliding.",
    exampleTr: "Yamaç paraşütünü denemek isterim."
},

{
    word: "Under",
    type: "preposition",
    meaning: "Altında",
    example: "We explored the area under the bridge.",
    exampleTr: "Köprünün altındaki bölgeyi keşfettik."
},

{
    word: "Unpowered aircraft",
    type: "noun",
    meaning: "Motorsuz hava aracı",
    example: "A hang glider is an unpowered aircraft.",
    exampleTr: "Delta kanat motorsuz bir hava aracıdır."
},

{
    word: "Watch the scenery",
    type: "phrase",
    meaning: "Manzarayı izlemek",
    example: "We stopped to watch the scenery.",
    exampleTr: "Manzarayı izlemek için durduk."
},

{
    word: "Wingsuit skydiving",
    type: "noun",
    meaning: "Kanatlı elbiseyle uçma",
    example: "Wingsuit skydiving is an extreme sport.",
    exampleTr: "Kanatlı elbiseyle uçma bir ekstrem spordur."
},

{
    word: "Winter sports",
    type: "noun",
    meaning: "Kış sporları",
    example: "Skiing and ice climbing are winter sports.",
    exampleTr: "Kayak ve buz tırmanışı kış sporlarıdır."
},

{
    word: "Wooden",
    type: "adjective",
    meaning: "Ahşap",
    example: "We crossed a wooden bridge.",
    exampleTr: "Ahşap bir köprüden geçtik."
},

{
    word: "Would rather",
    type: "phrase",
    meaning: "Tercih etmek",
    example: "I'd rather go hiking than stay at home.",
    exampleTr: "Evde kalmaktansa doğa yürüyüşüne çıkmayı tercih ederim."
},

{
    word: "Ziplining",
    type: "noun",
    meaning: "Çelik halatla iniş",
    example: "Ziplining is an exciting outdoor activity.",
    exampleTr: "Çelik halatla iniş heyecan verici bir açık hava aktivitesidir."
},

{
    word: "Rafting",
    type: "noun",
    meaning: "Rafting",
    example: "Rafting is an exciting water sport.",
    exampleTr: "Rafting heyecan verici bir su sporudur."
},

{
    word: "Motorcycle tour",
    type: "noun",
    meaning: "Motosiklet turu",
    example: "They joined a motorcycle tour.",
    exampleTr: "Bir motosiklet turuna katıldılar."
},

{
    word: "Jeep safari",
    type: "noun",
    meaning: "Jeep safarisi",
    example: "We went on a jeep safari in the desert.",
    exampleTr: "Çölde jeep safarisine çıktık."
},

{
    word: "Swimming",
    type: "noun",
    meaning: "Yüzme",
    example: "Swimming is a popular summer activity.",
    exampleTr: "Yüzme popüler bir yaz aktivitesidir."
},

{
    word: "Horse riding",
    type: "noun",
    meaning: "Ata binme",
    example: "I enjoy horse riding in the countryside.",
    exampleTr: "Kırsal bölgede ata binmekten hoşlanırım."
},

{
    word: "Base jumping",
    type: "noun",
    meaning: "Yüksek bir yerden paraşütle atlama",
    example: "Base jumping is a very dangerous extreme sport.",
    exampleTr: "Base jumping çok tehlikeli bir ekstrem spordur."
},

{
    word: "Parachuting",
    type: "noun",
    meaning: "Paraşütle atlama",
    example: "Parachuting requires special equipment.",
    exampleTr: "Paraşütle atlama özel ekipman gerektirir."
},

{
    word: "Skydiving",
    type: "noun",
    meaning: "Uçaktan paraşütle atlama",
    example: "Skydiving is not for everyone.",
    exampleTr: "Uçaktan paraşütle atlamak herkes için değildir."
},

{
    word: "Highlining",
    type: "noun",
    meaning: "İp üzerinde yürüme",
    example: "Highlining requires great balance.",
    exampleTr: "İp üzerinde yürümek büyük bir denge gerektirir."
},

{
    word: "Surfing",
    type: "noun",
    meaning: "Sörf",
    example: "Surfing is popular in many coastal areas.",
    exampleTr: "Sörf birçok kıyı bölgesinde popülerdir."
},

{
    word: "Sea kayaking",
    type: "noun",
    meaning: "Denizde kano yapma",
    example: "Sea kayaking is a great way to explore the coast.",
    exampleTr: "Denizde kano yapmak kıyıyı keşfetmenin harika bir yoludur."
},

{
    word: "Underwater hockey",
    type: "noun",
    meaning: "Su altı hokeyi",
    example: "Underwater hockey is an unusual team sport.",
    exampleTr: "Su altı hokeyi alışılmadık bir takım sporudur."
},

{
    word: "Adventurous",
    type: "adjective",
    meaning: "Maceraperest",
    example: "My brother is very adventurous.",
    exampleTr: "Erkek kardeşim çok maceraperesttir."
},

{
    word: "Safe",
    type: "adjective",
    meaning: "Güvenli",
    example: "This activity is safe with the right equipment.",
    exampleTr: "Bu aktivite doğru ekipmanla güvenlidir."
},

{
    word: "Easy",
    type: "adjective",
    meaning: "Kolay",
    example: "This activity is easy for beginners.",
    exampleTr: "Bu aktivite yeni başlayanlar için kolaydır."
},

{
    word: "Eye-catching",
    type: "adjective",
    meaning: "Göz alıcı, dikkat çekici",
    example: "The scenery was eye-catching.",
    exampleTr: "Manzara göz alıcıydı."
},

{
    word: "Adrenaline seeker",
    type: "noun",
    meaning: "Adrenalin tutkunu",
    example: "Adrenaline seekers enjoy extreme sports.",
    exampleTr: "Adrenalin tutkunları ekstrem sporlardan hoşlanır."
},

{
    word: "Individual sports",
    type: "noun",
    meaning: "Bireysel sporlar",
    example: "Swimming and skiing can be individual sports.",
    exampleTr: "Yüzme ve kayak bireysel sporlar olabilir."
},

{
    word: "Team sports",
    type: "noun",
    meaning: "Takım sporları",
    example: "Football and underwater hockey are team sports.",
    exampleTr: "Futbol ve su altı hokeyi takım sporlarıdır."
},

{
    word: "Mountainous road",
    type: "noun",
    meaning: "Dağlık yol",
    example: "The jeep followed a mountainous road.",
    exampleTr: "Jeep dağlık bir yolu takip etti."
},

{
    word: "Hill",
    type: "noun",
    meaning: "Tepe",
    example: "We walked to the top of the hill.",
    exampleTr: "Tepenin zirvesine yürüdük."
},

{
    word: "Cliff",
    type: "noun",
    meaning: "Uçurum, kayalık",
    example: "Don't go too close to the cliff.",
    exampleTr: "Uçuruma çok yaklaşma."
},

{
    word: "Ocean",
    type: "noun",
    meaning: "Okyanus",
    example: "They sailed across the ocean.",
    exampleTr: "Okyanusta yelken açtılar."
},

{
    word: "Historic places",
    type: "noun",
    meaning: "Tarihi yerler",
    example: "Tourists visit many historic places.",
    exampleTr: "Turistler birçok tarihi yeri ziyaret eder."
},

{
    word: "Historic structures",
    type: "noun",
    meaning: "Tarihi yapılar",
    example: "The city has many historic structures.",
    exampleTr: "Şehirde birçok tarihi yapı vardır."
},

{
    word: "Safety",
    type: "noun",
    meaning: "Güvenlik",
    example: "Safety is very important in extreme sports.",
    exampleTr: "Ekstrem sporlarda güvenlik çok önemlidir."
},

{
    word: "Risky",
    type: "adjective",
    meaning: "Riskli",
    example: "Bungee jumping can be a risky activity.",
    exampleTr: "Bungee jumping riskli bir aktivite olabilir."
},

{
    word: "Destination",
    type: "noun",
    meaning: "Varış yeri, gidilecek yer",
    example: "Paris is a popular tourist destination.",
    exampleTr: "Paris popüler bir turistik destinasyondur."
},

{
    word: "Journey",
    type: "noun",
    meaning: "Yolculuk, gezi",
    example: "The journey took five hours.",
    exampleTr: "Yolculuk beş saat sürdü."
},

{
    word: "Culture",
    type: "noun",
    meaning: "Kültür",
    example: "Traveling helps us learn about different cultures.",
    exampleTr: "Seyahat etmek farklı kültürleri öğrenmemize yardımcı olur."
},

{
    word: "Qualification",
    type: "noun",
    meaning: "Yeterlik, nitelik",
    example: "You need the right qualifications for this activity.",
    exampleTr: "Bu aktivite için gerekli yeterliklere sahip olmalısın."
},

{
    word: "Drown",
    type: "verb",
    meaning: "Suda boğulmak",
    example: "Always wear a life jacket so you don't drown.",
    exampleTr: "Boğulmamak için her zaman can yeleği giy."
},

{
    word: "Attack",
    type: "verb / noun",
    meaning: "Saldırmak, saldırı",
    example: "Some animals may attack when they feel threatened.",
    exampleTr: "Bazı hayvanlar tehdit altında hissettiklerinde saldırabilir."
},

{
    word: "Safe landing",
    type: "phrase",
    meaning: "Güvenli iniş",
    example: "The pilot made a safe landing.",
    exampleTr: "Pilot güvenli bir iniş yaptı."
},

{
    word: "Tournament",
    type: "noun",
    meaning: "Turnuva, yarışma",
    example: "Our team won the tournament.",
    exampleTr: "Takımımız turnuvayı kazandı."
},

{
    word: "Visitor",
    type: "noun",
    meaning: "Ziyaretçi",
    example: "The museum has many visitors every year.",
    exampleTr: "Müzenin her yıl birçok ziyaretçisi olur."
},

{
    word: "Traditional food and drinks",
    type: "noun",
    meaning: "Geleneksel yiyecek ve içecekler",
    example: "Tourists enjoy trying traditional food and drinks.",
    exampleTr: "Turistler geleneksel yiyecek ve içecekleri denemekten hoşlanır."
},

{
    word: "Pleasure",
    type: "noun",
    meaning: "Zevk, keyif",
    example: "It was a pleasure to visit this beautiful place.",
    exampleTr: "Bu güzel yeri ziyaret etmek bir zevkti."
},

{
    word: "Wind",
    type: "noun",
    meaning: "Rüzgar",
    example: "The wind was very strong.",
    exampleTr: "Rüzgar çok güçlüydü."
},

{
    word: "Blow",
    type: "verb",
    meaning: "Esmek",
    example: "The wind was blowing strongly.",
    exampleTr: "Rüzgar güçlü bir şekilde esiyordu."
},

{
    word: "Frostbite",
    type: "noun",
    meaning: "Soğuk ısırması, donma",
    example: "Wear warm clothes to prevent frostbite.",
    exampleTr: "Soğuk ısırmasını önlemek için sıcak tutan giysiler giy."
},

{
    word: "Freefall",
    type: "noun",
    meaning: "Serbest düşüş",
    example: "Skydivers experience freefall before opening their parachutes.",
    exampleTr: "Paraşütçüler paraşütlerini açmadan önce serbest düşüş yaşarlar."
},

{
    word: "Temple",
    type: "noun",
    meaning: "Tapınak",
    example: "We visited an ancient temple.",
    exampleTr: "Antik bir tapınağı ziyaret ettik."
},

{
    word: "Waterfall",
    type: "noun",
    meaning: "Şelale",
    example: "We hiked to a beautiful waterfall.",
    exampleTr: "Güzel bir şelaleye yürüyüş yaptık."
},

{
    word: "Choice",
    type: "noun",
    meaning: "Seçim, seçenek",
    example: "You have many choices for your adventure.",
    exampleTr: "Maceran için birçok seçeneğin var."
},

{
    word: "Survive",
    type: "verb",
    meaning: "Hayatta kalmak",
    example: "You need special equipment to survive in extreme conditions.",
    exampleTr: "Ekstrem koşullarda hayatta kalmak için özel ekipmana ihtiyacın var."
},

{
    word: "Rope",
    type: "noun",
    meaning: "İp, halat",
    example: "The climber used a strong rope.",
    exampleTr: "Tırmanıcı güçlü bir halat kullandı."
},

{
    word: "Axe",
    type: "noun",
    meaning: "Balta",
    example: "Ice climbers use an ice axe.",
    exampleTr: "Buz tırmanışçıları buz baltası kullanır."
},

{
    word: "Thermal clothes",
    type: "noun",
    meaning: "Termal giysiler",
    example: "You need thermal clothes for ice climbing.",
    exampleTr: "Buz tırmanışı için termal giysilere ihtiyacın var."
},

{
    word: "Flashlight",
    type: "noun",
    meaning: "El feneri",
    example: "Take a flashlight when you go caving.",
    exampleTr: "Mağaracılığa giderken el feneri al."
},

{
    word: "Skill",
    type: "noun",
    meaning: "Beceri",
    example: "You need good skills for this sport.",
    exampleTr: "Bu spor için iyi becerilere ihtiyacın var."
},

{
    word: "Ice screw",
    type: "noun",
    meaning: "Buz vidası",
    example: "Ice climbers use ice screws for safety.",
    exampleTr: "Buz tırmanışçıları güvenlik için buz vidaları kullanır."
},

{
    word: "Take photographs of whales",
    type: "phrase",
    meaning: "Balinaların fotoğraflarını çekmek",
    example: "We went on a boat trip to take photographs of whales.",
    exampleTr: "Balinaların fotoğraflarını çekmek için tekne gezisine çıktık."
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
        "unit6"
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
                "No Unit 6 progress found."
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
            "Unit 6 progress loaded:",
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
                    `Unit 6 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 6 completed: +${totalXP} XP`
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
                    Unit 6 Complete
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