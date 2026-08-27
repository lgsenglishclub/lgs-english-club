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

    // ========================================
    // GENERAL EXPRESSIONS
    // ========================================

    {
        word: "Adrenaline lover",
        type: "noun",
        meaning: "Adrenalin sever",
        example: "My brother is an adrenaline lover.",
        exampleTr: "Kardeşim adrenalin sever."
    },
    {
        word: "Adrenaline seeker",
        type: "noun",
        meaning: "Adrenalin tutkunu",
        example: "Adrenaline seekers enjoy extreme sports.",
        exampleTr: "Adrenalin tutkunları ekstrem sporlardan hoşlanır."
    },
    {
        word: "Adventure",
        type: "noun",
        meaning: "Macera",
        example: "We had an amazing adventure last summer.",
        exampleTr: "Geçen yaz harika bir macera yaşadık."
    },
    {
        word: "Air sports",
        type: "noun",
        meaning: "Hava sporları",
        example: "Paragliding is one of the most exciting air sports.",
        exampleTr: "Yamaç paraşütü en heyecan verici hava sporlarından biridir."
    },
    {
        word: "Land sports",
        type: "noun",
        meaning: "Kara sporları",
        example: "Hiking and cycling are popular land sports.",
        exampleTr: "Doğa yürüyüşü ve bisiklet kara sporlarıdır."
    },
    {
        word: "Water sports",
        type: "noun",
        meaning: "Su sporları",
        example: "I enjoy water sports during my summer holiday.",
        exampleTr: "Yaz tatilimde su sporlarından hoşlanırım."
    },
    {
        word: "Extreme sports",
        type: "noun",
        meaning: "Ekstrem sporlar",
        example: "Extreme sports can be very exciting.",
        exampleTr: "Ekstrem sporlar çok heyecan verici olabilir."
    },
    {
        word: "Individual sports",
        type: "noun",
        meaning: "Bireysel sporlar",
        example: "Swimming is an individual sport.",
        exampleTr: "Yüzme bireysel bir spordur."
    },
    {
        word: "Team sports",
        type: "noun",
        meaning: "Takım sporları",
        example: "Basketball and football are team sports.",
        exampleTr: "Basketbol ve futbol takım sporlarıdır."
    },
    {
        word: "Outdoor activities",
        type: "noun",
        meaning: "Açık hava aktiviteleri",
        example: "We love doing outdoor activities at weekends.",
        exampleTr: "Hafta sonları açık hava aktiviteleri yapmayı severiz."
    },
    {
        word: "Adventurous",
        type: "adjective",
        meaning: "Maceraperest",
        example: "Tom is very adventurous and loves exploring new places.",
        exampleTr: "Tom çok maceraperesttir ve yeni yerleri keşfetmeyi sever."
    },
    {
        word: "Experience",
        type: "noun / verb",
        meaning: "Deneyim, deneyimlemek",
        example: "It was an unforgettable experience.",
        exampleTr: "Unutulmaz bir deneyimdi."
    },
    {
        word: "Frostbite",
        type: "noun",
        meaning: "Soğuk ısırması, donma",
        example: "You can get frostbite in extremely cold weather.",
        exampleTr: "Aşırı soğuk havalarda soğuk ısırmasına maruz kalabilirsiniz."
    },
    {
        word: "Qualification",
        type: "noun",
        meaning: "Yeterlik, nitelik",
        example: "You need the right qualification for this job.",
        exampleTr: "Bu iş için uygun yeterliliğe sahip olmalısın."
    },
    {
        word: "Skill",
        type: "noun",
        meaning: "Beceri",
        example: "Climbing requires special skills.",
        exampleTr: "Tırmanış özel beceriler gerektirir."
    },
    {
        word: "Tournament",
        type: "noun",
        meaning: "Turnuva, yarışma",
        example: "Our school is organizing a basketball tournament.",
        exampleTr: "Okulumuz bir basketbol turnuvası düzenliyor."
    },
    {
        word: "Equipment",
        type: "noun",
        meaning: "Ekipman",
        example: "You need special equipment for diving.",
        exampleTr: "Dalış için özel ekipmana ihtiyacın var."
    },
    {
        word: "Device",
        type: "noun",
        meaning: "Cihaz",
        example: "This device helps climbers stay safe.",
        exampleTr: "Bu cihaz tırmanışçıların güvende kalmasına yardımcı olur."
    },
    {
        word: "Journey",
        type: "noun",
        meaning: "Yolculuk, gezi",
        example: "Our journey to the mountains took five hours.",
        exampleTr: "Dağlara yolculuğumuz beş saat sürdü."
    },
    {
        word: "Travel",
        type: "verb",
        meaning: "Seyahat etmek",
        example: "I love to travel and discover new places.",
        exampleTr: "Seyahat etmeyi ve yeni yerler keşfetmeyi severim."
    },
    {
        word: "Destination",
        type: "noun",
        meaning: "Varış yeri, gidilecek yer",
        example: "Cappadocia is a popular tourist destination.",
        exampleTr: "Kapadokya popüler bir turistik destinasyondur."
    },
    {
        word: "Scenery",
        type: "noun",
        meaning: "Manzara",
        example: "The scenery from the mountain was amazing.",
        exampleTr: "Dağdan görünen manzara harikaydı."
    },
    {
        word: "Visitor",
        type: "noun",
        meaning: "Ziyaretçi",
        example: "There are many visitors at the museum.",
        exampleTr: "Müzede birçok ziyaretçi var."
    },
    {
        word: "Trainer",
        type: "noun",
        meaning: "Antrenör",
        example: "The trainer teaches us new techniques.",
        exampleTr: "Antrenör bize yeni teknikler öğretiyor."
    },


    // ========================================
    // LAND SPORTS
    // ========================================

    {
        word: "Hiking",
        type: "noun",
        meaning: "Doğa yürüyüşü",
        example: "We go hiking in the mountains at weekends.",
        exampleTr: "Hafta sonları dağlarda doğa yürüyüşüne çıkarız."
    },
    {
        word: "Trekking",
        type: "noun",
        meaning: "Doğa yürüyüşü",
        example: "Trekking is a great way to explore nature.",
        exampleTr: "Trekking doğayı keşfetmek için harika bir yoldur."
    },
    {
        word: "Cycling",
        type: "noun",
        meaning: "Bisiklet sürme",
        example: "Cycling is my favorite outdoor activity.",
        exampleTr: "Bisiklet sürmek en sevdiğim açık hava aktivitesidir."
    },
    {
        word: "Skateboarding",
        type: "noun",
        meaning: "Kaykay",
        example: "My brother is interested in skateboarding.",
        exampleTr: "Kardeşim kaykayla ilgileniyor."
    },
    {
        word: "Skiing",
        type: "noun",
        meaning: "Kayak",
        example: "We go skiing every winter.",
        exampleTr: "Her kış kayak yapmaya gideriz."
    },
    {
        word: "Caving",
        type: "noun",
        meaning: "Mağaracılık",
        example: "Caving can be a challenging activity.",
        exampleTr: "Mağaracılık zorlayıcı bir aktivite olabilir."
    },
    {
        word: "Parkour running",
        type: "noun",
        meaning: "Parkur koşusu",
        example: "Parkour running requires balance and skill.",
        exampleTr: "Parkur koşusu denge ve beceri gerektirir."
    },
    {
        word: "Horse riding",
        type: "noun",
        meaning: "Ata binme",
        example: "Horse riding is a popular activity in the countryside.",
        exampleTr: "Ata binmek kırsal bölgelerde popüler bir aktivitedir."
    },
    {
        word: "Riding elephant",
        type: "noun",
        meaning: "File binme",
        example: "Riding an elephant can be an unusual experience.",
        exampleTr: "File binmek sıra dışı bir deneyim olabilir."
    },
    {
        word: "Motor racing",
        type: "noun",
        meaning: "Motor yarışı",
        example: "My father enjoys watching motor racing.",
        exampleTr: "Babam motor yarışlarını izlemekten hoşlanır."
    },
    {
        word: "Motorcycle tour",
        type: "noun",
        meaning: "Motosiklet turu",
        example: "They went on a motorcycle tour around the country.",
        exampleTr: "Ülke genelinde motosiklet turuna çıktılar."
    },
    {
        word: "Car racing",
        type: "noun",
        meaning: "Araba yarışı",
        example: "Car racing is exciting but challenging.",
        exampleTr: "Araba yarışı heyecan verici ama zordur."
    },
    {
        word: "Jeep safari tour",
        type: "noun",
        meaning: "Jeep safarisi",
        example: "We went on a jeep safari tour during our holiday.",
        exampleTr: "Tatilimiz sırasında jeep safarisine çıktık."
    },
    {
        word: "Ice climbing",
        type: "noun",
        meaning: "Buz tırmanışı",
        example: "Ice climbing requires special equipment.",
        exampleTr: "Buz tırmanışı özel ekipman gerektirir."
    },
    {
        word: "Rock climbing",
        type: "noun",
        meaning: "Kaya tırmanışı",
        example: "Rock climbing is a challenging outdoor activity.",
        exampleTr: "Kaya tırmanışı zorlayıcı bir açık hava aktivitesidir."
    },
    {
        word: "Sand surfing",
        type: "noun",
        meaning: "Kum sörfü",
        example: "Sand surfing is popular in some deserts.",
        exampleTr: "Kum sörfü bazı çöllerde popülerdir."
    },
    {
        word: "Zorbing",
        type: "noun",
        meaning: "Topla yuvarlanma",
        example: "Zorbing looks exciting and unusual.",
        exampleTr: "Zorbing heyecan verici ve sıra dışı görünüyor."
    },
    {
        word: "Archery",
        type: "noun",
        meaning: "Okçuluk",
        example: "Archery requires concentration and skill.",
        exampleTr: "Okçuluk dikkat ve beceri gerektirir."
    },


    // ========================================
    // AIR SPORTS
    // ========================================

    {
        word: "Bungee jumping",
        type: "noun",
        meaning: "Yüksekten iple atlama",
        example: "Bungee jumping is an extreme sport.",
        exampleTr: "Bungee jumping ekstrem bir spordur."
    },
    {
        word: "Hang gliding",
        type: "noun",
        meaning: "Delta kanat uçuşu",
        example: "Hang gliding gives you an amazing view from the sky.",
        exampleTr: "Delta kanat uçuşu gökyüzünden harika bir manzara sunar."
    },
    {
        word: "Freefall",
        type: "noun",
        meaning: "Serbest düşüş",
        example: "The freefall was the most exciting part of the activity.",
        exampleTr: "Serbest düşüş aktivitenin en heyecan verici kısmıydı."
    },
    {
        word: "Paragliding",
        type: "noun",
        meaning: "Yamaç paraşütü",
        example: "Paragliding is popular in places with high mountains.",
        exampleTr: "Yamaç paraşütü yüksek dağların bulunduğu yerlerde popülerdir."
    },
    {
        word: "Parasailing",
        type: "noun",
        meaning: "Deniz paraşütü",
        example: "We tried parasailing during our holiday.",
        exampleTr: "Tatilimizde deniz paraşütünü denedik."
    },
    {
        word: "Parachuting",
        type: "noun",
        meaning: "Paraşütle atlama",
        example: "Parachuting is not suitable for everyone.",
        exampleTr: "Paraşütle atlama herkes için uygun değildir."
    },
    {
        word: "Skydiving",
        type: "noun",
        meaning: "Hava dalışı",
        example: "Skydiving is an exciting adventure activity.",
        exampleTr: "Hava dalışı heyecan verici bir macera aktivitesidir."
    },
    {
        word: "Base jumping",
        type: "noun",
        meaning: "Yapılardan paraşütle atlama",
        example: "Base jumping is an extreme activity.",
        exampleTr: "Base jumping ekstrem bir aktivitedir."
    },
    {
        word: "Heli-skiing",
        type: "noun",
        meaning: "Helikopter kayağı",
        example: "Heli-skiing combines helicopter travel and skiing.",
        exampleTr: "Helikopter kayağı helikopter yolculuğu ile kayağı birleştirir."
    },
    {
        word: "Ziplining",
        type: "noun",
        meaning: "Çelik halatla iniş",
        example: "Ziplining is a fun outdoor activity.",
        exampleTr: "Ziplining eğlenceli bir açık hava aktivitesidir."
    },
    {
        word: "Highlining",
        type: "noun",
        meaning: "İp üzerinde yürüme",
        example: "Highlining requires excellent balance.",
        exampleTr: "İp üzerinde yürüme mükemmel bir denge gerektirir."
    },


    // ========================================
    // WATER SPORTS
    // ========================================

    {
        word: "Diving",
        type: "noun",
        meaning: "Dalış",
        example: "Diving allows you to explore the underwater world.",
        exampleTr: "Dalış su altı dünyasını keşfetmeni sağlar."
    },
    {
        word: "Scuba diving",
        type: "noun",
        meaning: "Tüplü dalış",
        example: "Scuba diving is a great way to see sea creatures.",
        exampleTr: "Tüplü dalış deniz canlılarını görmek için harika bir yoldur."
    },
    {
        word: "Swimming",
        type: "noun",
        meaning: "Yüzme",
        example: "Swimming is good for your body.",
        exampleTr: "Yüzmek vücudun için faydalıdır."
    },
    {
        word: "Sailing",
        type: "noun",
        meaning: "Yelken sporu",
        example: "Sailing is popular on sunny days.",
        exampleTr: "Yelken sporu güneşli günlerde popülerdir."
    },
    {
        word: "Surfing",
        type: "noun",
        meaning: "Sörf",
        example: "Surfing is difficult when the waves are very high.",
        exampleTr: "Dalgalar çok yüksek olduğunda sörf yapmak zordur."
    },
    {
        word: "Canoeing",
        type: "noun",
        meaning: "Kano sporu",
        example: "We went canoeing on the river.",
        exampleTr: "Nehirde kano yaptık."
    },
    {
        word: "Kayaking",
        type: "noun",
        meaning: "Kano sporu",
        example: "Kayaking is an exciting water activity.",
        exampleTr: "Kayaking heyecan verici bir su aktivitesidir."
    },
    {
        word: "Rafting",
        type: "noun",
        meaning: "Rafting",
        example: "Rafting is popular on fast-flowing rivers.",
        exampleTr: "Rafting hızlı akan nehirlerde popülerdir."
    },
    {
        word: "Wind surfing",
        type: "noun",
        meaning: "Rüzgar sörfü",
        example: "Wind surfing requires strong winds.",
        exampleTr: "Rüzgar sörfü güçlü rüzgarlar gerektirir."
    },
    {
        word: "Kite surfing",
        type: "noun",
        meaning: "Uçurtma sörfü",
        example: "Kite surfing combines surfing and kite flying.",
        exampleTr: "Uçurtma sörfü sörf ve uçurtma uçurmayı birleştirir."
    },
    {
        word: "Underwater hockey",
        type: "noun",
        meaning: "Su altı hokeyi",
        example: "Underwater hockey is an unusual team sport.",
        exampleTr: "Su altı hokeyi sıra dışı bir takım sporudur."
    },
    {
        word: "Water polo",
        type: "noun",
        meaning: "Su topu",
        example: "Water polo is a popular team sport.",
        exampleTr: "Su topu popüler bir takım sporudur."
    },


    // ========================================
    // EQUIPMENT
    // ========================================

    {
        word: "Goggles",
        type: "noun",
        meaning: "Koruyucu gözlükler",
        example: "You should wear goggles while swimming.",
        exampleTr: "Yüzerken koruyucu gözlük takmalısın."
    },
    {
        word: "Diving suit",
        type: "noun",
        meaning: "Dalış kıyafeti",
        example: "A diving suit keeps divers warm.",
        exampleTr: "Dalış kıyafeti dalgıçları sıcak tutar."
    },
    {
        word: "Swim suit",
        type: "noun",
        meaning: "Mayo",
        example: "I need a new swim suit for the holiday.",
        exampleTr: "Tatil için yeni bir mayoya ihtiyacım var."
    },
    {
        word: "Wingsuit",
        type: "noun",
        meaning: "Kanatlı elbise",
        example: "A wingsuit helps people glide through the air.",
        exampleTr: "Kanatlı elbise insanların havada süzülmesine yardımcı olur."
    },
    {
        word: "Helmet",
        type: "noun",
        meaning: "Kask",
        example: "Always wear a helmet when cycling.",
        exampleTr: "Bisiklet sürerken her zaman kask tak."
    },
    {
        word: "Knee pad",
        type: "noun",
        meaning: "Dizlik",
        example: "Knee pads protect your knees.",
        exampleTr: "Dizlikler dizlerini korur."
    },
    {
        word: "Aircraft",
        type: "noun",
        meaning: "Hava aracı",
        example: "The aircraft landed safely.",
        exampleTr: "Hava aracı güvenli bir şekilde indi."
    },
    {
        word: "Hot air balloon",
        type: "noun",
        meaning: "Sıcak hava balonu",
        example: "We watched the hot air balloons in the sky.",
        exampleTr: "Gökyüzündeki sıcak hava balonlarını izledik."
    },
    {
        word: "Rope",
        type: "noun",
        meaning: "İp, halat",
        example: "The climber used a strong rope.",
        exampleTr: "Tırmanışçı sağlam bir halat kullandı."
    },
    {
        word: "Paddle",
        type: "noun",
        meaning: "Kürek",
        example: "He used a paddle to move the boat.",
        exampleTr: "Tekneyi hareket ettirmek için kürek kullandı."
    },
    {
        word: "Axe",
        type: "noun",
        meaning: "Balta",
        example: "The climber carried an axe.",
        exampleTr: "Tırmanışçı bir balta taşıdı."
    },
    {
        word: "Thermal clothes",
        type: "noun",
        meaning: "Termal giysiler",
        example: "You should wear thermal clothes in very cold weather.",
        exampleTr: "Çok soğuk havalarda termal giysiler giymelisin."
    },
    {
        word: "Flashlight",
        type: "noun",
        meaning: "El feneri",
        example: "Take a flashlight with you when you go caving.",
        exampleTr: "Mağaracılığa giderken yanına bir el feneri al."
    },
    {
        word: "Ice screw",
        type: "noun",
        meaning: "Buz vidası",
        example: "Ice climbers use an ice screw for safety.",
        exampleTr: "Buz tırmanışçıları güvenlik için buz vidası kullanır."
    },
    {
        word: "Boat",
        type: "noun",
        meaning: "Tekne",
        example: "We travelled across the lake by boat.",
        exampleTr: "Gölü tekneyle geçtik."
    },
    {
        word: "Parachute",
        type: "noun",
        meaning: "Paraşüt",
        example: "The parachute opened safely.",
        exampleTr: "Paraşüt güvenli bir şekilde açıldı."
    },
    {
        word: "Gloves",
        type: "noun",
        meaning: "Eldiven",
        example: "Wear gloves to protect your hands.",
        exampleTr: "Ellerini korumak için eldiven giy."
    },
    {
        word: "Skate",
        type: "noun",
        meaning: "Paten",
        example: "He put on his skates and went outside.",
        exampleTr: "Patenlerini giydi ve dışarı çıktı."
    },


    // ========================================
    // PLACES
    // ========================================

    {
        word: "Cave",
        type: "noun",
        meaning: "Mağara",
        example: "There is a dark cave near the mountain.",
        exampleTr: "Dağın yakınında karanlık bir mağara var."
    },
    {
        word: "Sky",
        type: "noun",
        meaning: "Gökyüzü",
        example: "The sky was clear and blue.",
        exampleTr: "Gökyüzü açık ve maviydi."
    },
    {
        word: "Land",
        type: "noun",
        meaning: "Kara",
        example: "Some animals live both on land and in water.",
        exampleTr: "Bazı hayvanlar hem karada hem suda yaşar."
    },
    {
        word: "Sea",
        type: "noun",
        meaning: "Deniz",
        example: "We went swimming in the sea.",
        exampleTr: "Denizde yüzmeye gittik."
    },
    {
        word: "Ocean",
        type: "noun",
        meaning: "Okyanus",
        example: "Whales live in the ocean.",
        exampleTr: "Balinalar okyanusta yaşar."
    },
    {
        word: "River",
        type: "noun",
        meaning: "Nehir",
        example: "They went rafting on the river.",
        exampleTr: "Nehirde rafting yaptılar."
    },
    {
        word: "Lake",
        type: "noun",
        meaning: "Göl",
        example: "There is a beautiful lake near our village.",
        exampleTr: "Köyümüzün yakınında güzel bir göl var."
    },
    {
        word: "Pool",
        type: "noun",
        meaning: "Havuz",
        example: "The children are swimming in the pool.",
        exampleTr: "Çocuklar havuzda yüzüyor."
    },
    {
        word: "Underwater",
        type: "adverb / adjective",
        meaning: "Su altı",
        example: "We saw many colorful fish underwater.",
        exampleTr: "Su altında birçok renkli balık gördük."
    },
    {
        word: "Forest",
        type: "noun",
        meaning: "Orman",
        example: "We went hiking in the forest.",
        exampleTr: "Ormanda doğa yürüyüşüne çıktık."
    },
    {
        word: "Hill",
        type: "noun",
        meaning: "Tepe",
        example: "We climbed the hill to see the scenery.",
        exampleTr: "Manzarayı görmek için tepeye tırmandık."
    },
    {
        word: "Cliff",
        type: "noun",
        meaning: "Uçurum",
        example: "The cliff is very high and dangerous.",
        exampleTr: "Uçurum çok yüksek ve tehlikelidir."
    },
    {
        word: "Desert",
        type: "noun",
        meaning: "Çöl",
        example: "The desert is extremely hot during the day.",
        exampleTr: "Çöl gündüzleri aşırı sıcaktır."
    },
    {
        word: "Bridge",
        type: "noun",
        meaning: "Köprü",
        example: "We crossed the bridge on foot.",
        exampleTr: "Köprüyü yürüyerek geçtik."
    },
    {
        word: "Building",
        type: "noun",
        meaning: "Bina",
        example: "The building is very tall.",
        exampleTr: "Bina çok yüksek."
    },
    {
        word: "Structure",
        type: "noun",
        meaning: "Yapı",
        example: "This structure is hundreds of years old.",
        exampleTr: "Bu yapı yüzlerce yıllık."
    },
    {
        word: "Roof",
        type: "noun",
        meaning: "Çatı",
        example: "The snow covered the roof.",
        exampleTr: "Kar çatıyı kapladı."
    },
    {
        word: "Nature",
        type: "noun",
        meaning: "Doğa",
        example: "I love spending time in nature.",
        exampleTr: "Doğada vakit geçirmeyi severim."
    },
    {
        word: "Rocky surface",
        type: "noun",
        meaning: "Kayalık yüzey",
        example: "Be careful on the rocky surface.",
        exampleTr: "Kayalık yüzeyde dikkatli ol."
    },
    {
        word: "Iced surface",
        type: "noun",
        meaning: "Buzlu yüzey",
        example: "The iced surface is very slippery.",
        exampleTr: "Buzlu yüzey çok kaygandır."
    },
    {
        word: "Mountain",
        type: "noun",
        meaning: "Dağ",
        example: "They climbed a high mountain.",
        exampleTr: "Yüksek bir dağa tırmandılar."
    },
    {
        word: "Waterfall",
        type: "noun",
        meaning: "Şelale",
        example: "We took photos near the waterfall.",
        exampleTr: "Şelalenin yakınında fotoğraflar çektik."
    },


    // ========================================
    // ADJECTIVES
    // ========================================

    {
        word: "Extreme",
        type: "adjective",
        meaning: "Sıradışı",
        example: "He enjoys extreme sports.",
        exampleTr: "Ekstrem sporlardan hoşlanır."
    },
    {
        word: "Adventurous",
        type: "adjective",
        meaning: "Maceralı",
        example: "It was an adventurous journey.",
        exampleTr: "Maceralı bir yolculuktu."
    },
    {
        word: "Amusing",
        type: "adjective",
        meaning: "Eğlenceli",
        example: "The activity was very amusing.",
        exampleTr: "Aktivite çok eğlenceliydi."
    },
    {
        word: "Boring",
        type: "adjective",
        meaning: "Sıkıcı",
        example: "The trip was boring.",
        exampleTr: "Gezi sıkıcıydı."
    },
    {
        word: "Challenging",
        type: "adjective",
        meaning: "Zorlayıcı",
        example: "Rock climbing is challenging.",
        exampleTr: "Kaya tırmanışı zorlayıcıdır."
    },
    {
        word: "Hard",
        type: "adjective",
        meaning: "Zor",
        example: "This activity is hard for beginners.",
        exampleTr: "Bu aktivite yeni başlayanlar için zordur."
    },
    {
        word: "High",
        type: "adjective",
        meaning: "Yüksek",
        example: "The mountain is very high.",
        exampleTr: "Dağ çok yüksek."
    },
    {
        word: "Crazy",
        type: "adjective",
        meaning: "Çılgın",
        example: "That sounds like a crazy adventure.",
        exampleTr: "Bu çılgın bir macera gibi görünüyor."
    },
    {
        word: "Disappointing",
        type: "adjective",
        meaning: "Hayal kırıklığına uğratan",
        example: "The trip was disappointing because of the weather.",
        exampleTr: "Hava nedeniyle gezi hayal kırıklığı yarattı."
    },
    {
        word: "Enjoyable",
        type: "adjective",
        meaning: "Keyifli",
        example: "We had an enjoyable journey.",
        exampleTr: "Keyifli bir yolculuk yaptık."
    },
    {
        word: "Entertaining",
        type: "adjective",
        meaning: "Eğlenceli",
        example: "The show was entertaining.",
        exampleTr: "Gösteri eğlenceliydi."
    },
    {
        word: "Mysterious",
        type: "adjective",
        meaning: "Gizemli",
        example: "The cave looks mysterious.",
        exampleTr: "Mağara gizemli görünüyor."
    },
    {
        word: "Exciting",
        type: "adjective",
        meaning: "Heyecan verici",
        example: "Paragliding is an exciting activity.",
        exampleTr: "Yamaç paraşütü heyecan verici bir aktivitedir."
    },
    {
        word: "Famous",
        type: "adjective",
        meaning: "Ünlü",
        example: "Cappadocia is famous for its hot air balloons.",
        exampleTr: "Kapadokya sıcak hava balonlarıyla ünlüdür."
    },
    {
        word: "Impressive",
        type: "adjective",
        meaning: "Etkileyici",
        example: "The scenery was impressive.",
        exampleTr: "Manzara etkileyiciydi."
    },
    {
        word: "Incredible",
        type: "adjective",
        meaning: "İnanılmaz",
        example: "We had an incredible experience.",
        exampleTr: "İnanılmaz bir deneyim yaşadık."
    },
    {
        word: "Risky",
        type: "adjective",
        meaning: "Riskli",
        example: "Some extreme sports are risky.",
        exampleTr: "Bazı ekstrem sporlar risklidir."
    },
    {
        word: "Safe",
        type: "adjective",
        meaning: "Güvenli",
        example: "Always make sure the equipment is safe.",
        exampleTr: "Her zaman ekipmanın güvenli olduğundan emin ol."
    },
    {
        word: "Eye-catching",
        type: "adjective",
        meaning: "Göz alıcı",
        example: "The colorful parachute was eye-catching.",
        exampleTr: "Renkli paraşüt göz alıcıydı."
    },
    {
        word: "Worth-seeing",
        type: "adjective",
        meaning: "Görülmeye değer",
        example: "The waterfall is definitely worth-seeing.",
        exampleTr: "Şelale kesinlikle görülmeye değer."
    },


    // ========================================
    // VERBS
    // ========================================

    {
        word: "Climb",
        type: "verb",
        meaning: "Tırmanmak",
        example: "They climb the mountain every summer.",
        exampleTr: "Her yaz dağa tırmanırlar."
    },
    {
        word: "Fall down",
        type: "phrasal verb",
        meaning: "Düşmek",
        example: "Be careful not to fall down.",
        exampleTr: "Düşmemeye dikkat et."
    },
    {
        word: "Drown",
        type: "verb",
        meaning: "Suda boğulmak",
        example: "You should wear a life jacket to avoid drowning.",
        exampleTr: "Boğulmaktan kaçınmak için can yeleği giymelisin."
    },
    {
        word: "Survive",
        type: "verb",
        meaning: "Hayatta kalmak",
        example: "Some animals can survive in extreme conditions.",
        exampleTr: "Bazı hayvanlar zorlu koşullarda hayatta kalabilir."
    },
    {
        word: "Attack",
        type: "verb",
        meaning: "Saldırmak",
        example: "The animal may attack if it feels threatened.",
        exampleTr: "Hayvan tehdit altında hissederse saldırabilir."
    },
    {
        word: "Spend time",
        type: "verb phrase",
        meaning: "Vakit geçirmek",
        example: "I like to spend time in nature.",
        exampleTr: "Doğada vakit geçirmeyi severim."
    },
    {
        word: "Describe",
        type: "verb",
        meaning: "Tanımlamak",
        example: "Can you describe your adventure?",
        exampleTr: "Maceranı tanımlayabilir misin?"
    },
    {
        word: "Explore",
        type: "verb",
        meaning: "Keşfetmek",
        example: "We want to explore new places.",
        exampleTr: "Yeni yerleri keşfetmek istiyoruz."
    },
    {
        word: "Blow",
        type: "verb",
        meaning: "Esmek",
        example: "The wind is blowing strongly today.",
        exampleTr: "Bugün rüzgar güçlü esiyor."
    },
    {
        word: "Hang around",
        type: "phrasal verb",
        meaning: "Takılmak",
        example: "We usually hang around at the park.",
        exampleTr: "Genellikle parkta takılırız."
    },
    {
        word: "Make a change",
        type: "verb phrase",
        meaning: "Değişiklik yapmak",
        example: "I want to make a change in my life.",
        exampleTr: "Hayatımda bir değişiklik yapmak istiyorum."
    },
    {
        word: "Take a risk",
        type: "verb phrase",
        meaning: "Risk almak",
        example: "You shouldn't take a risk without thinking.",
        exampleTr: "Düşünmeden risk almamalısın."
    },
    {
        word: "Push limits",
        type: "verb phrase",
        meaning: "Sınırları zorlamak",
        example: "Adrenaline lovers enjoy pushing their limits.",
        exampleTr: "Adrenalin tutkunları sınırlarını zorlamaktan hoşlanır."
    },
    {
        word: "Take a photo",
        type: "verb phrase",
        meaning: "Fotoğraf çekmek",
        example: "Let's take a photo of the scenery.",
        exampleTr: "Manzaranın fotoğrafını çekelim."
    },
    {
        word: "Meet sea creatures",
        type: "verb phrase",
        meaning: "Deniz canlılarıyla karşılaşmak",
        example: "You can meet sea creatures while scuba diving.",
        exampleTr: "Tüplü dalış yaparken deniz canlılarıyla karşılaşabilirsin."
    },
    {
        word: "Watch the scenery",
        type: "verb phrase",
        meaning: "Manzarayı izlemek",
        example: "We stopped to watch the scenery.",
        exampleTr: "Manzarayı izlemek için durduk."
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