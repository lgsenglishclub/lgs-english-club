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
    example: "The teen is studying for an exam.",
    exampleTr: "Genç bir sınava çalışıyor."
},

{
    word: "Teenager",
    type: "noun",
    meaning: "Genç",
    example: "She is a teenager and goes to high school.",
    exampleTr: "O bir genç ve liseye gidiyor."
},

{
    word: "Adult",
    type: "noun",
    meaning: "Yetişkin",
    example: "Adults have many responsibilities.",
    exampleTr: "Yetişkinlerin birçok sorumluluğu vardır."
},

{
    word: "Boy",
    type: "noun",
    meaning: "Erkek çocuk",
    example: "The boy is playing football.",
    exampleTr: "Erkek çocuk futbol oynuyor."
},

{
    word: "Girl",
    type: "noun",
    meaning: "Kız çocuk",
    example: "The girl is reading a book.",
    exampleTr: "Kız çocuk kitap okuyor."
},

{
    word: "Man",
    type: "noun",
    meaning: "Adam",
    example: "The man is talking to his friend.",
    exampleTr: "Adam arkadaşıyla konuşuyor."
},

{
    word: "Woman",
    type: "noun",
    meaning: "Kadın",
    example: "The woman is working in an office.",
    exampleTr: "Kadın bir ofiste çalışıyor."
},

{
    word: "Children",
    type: "noun",
    meaning: "Çocuklar",
    example: "The children are playing in the park.",
    exampleTr: "Çocuklar parkta oynuyor."
},

{
    word: "Student",
    type: "noun",
    meaning: "Öğrenci",
    example: "The student is doing her homework.",
    exampleTr: "Öğrenci ödevini yapıyor."
},

{
    word: "Wake up",
    type: "phrasal verb",
    meaning: "Uyanmak",
    example: "I wake up at seven every morning.",
    exampleTr: "Her sabah saat yedide uyanırım."
},

{
    word: "Get up",
    type: "phrasal verb",
    meaning: "Kalkmak",
    example: "I get up early on school days.",
    exampleTr: "Okul günlerinde erken kalkarım."
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
    example: "I have breakfast with my family.",
    exampleTr: "Ailemle kahvaltı yaparım."
},

{
    word: "Brush teeth",
    type: "phrase",
    meaning: "Diş fırçalamak",
    example: "I brush my teeth twice a day.",
    exampleTr: "Günde iki kez dişlerimi fırçalarım."
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
    exampleTr: "Öğrenciler hafta içi her gün derslere katılır."
},

{
    word: "Have lunch",
    type: "phrase",
    meaning: "Öğle yemeği yemek",
    example: "I have lunch at school.",
    exampleTr: "Öğle yemeğini okulda yerim."
},

{
    word: "Come back home",
    type: "phrase",
    meaning: "Eve dönmek",
    example: "I come back home after school.",
    exampleTr: "Okuldan sonra eve dönerim."
},

{
    word: "Have a rest",
    type: "phrase",
    meaning: "Dinlenmek",
    example: "I have a rest after I come home.",
    exampleTr: "Eve geldikten sonra dinlenirim."
},

{
    word: "Do homework",
    type: "phrase",
    meaning: "Ödev yapmak",
    example: "I do my homework in the afternoon.",
    exampleTr: "Ödevimi öğleden sonra yaparım."
},

{
    word: "Study",
    type: "verb",
    meaning: "Ders çalışmak",
    example: "I study English every evening.",
    exampleTr: "Her akşam İngilizce çalışırım."
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
    example: "We have dinner together every evening.",
    exampleTr: "Her akşam birlikte akşam yemeği yeriz."
},

{
    word: "Go to bed",
    type: "phrase",
    meaning: "Yatağa gitmek",
    example: "I go to bed at ten o'clock.",
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
    example: "I usually hang out with my friends after school.",
    exampleTr: "Genellikle okuldan sonra arkadaşlarımla takılırım."
},

{
    word: "Meet friends",
    type: "phrase",
    meaning: "Arkadaşlarla buluşmak",
    example: "I meet my friends at the park.",
    exampleTr: "Arkadaşlarımla parkta buluşurum."
},

{
    word: "Watch TV",
    type: "phrase",
    meaning: "Televizyon izlemek",
    example: "I watch TV in the evening.",
    exampleTr: "Akşamları televizyon izlerim."
},

{
    word: "Listen to music",
    type: "phrase",
    meaning: "Müzik dinlemek",
    example: "I listen to music in my free time.",
    exampleTr: "Boş zamanlarımda müzik dinlerim."
},

{
    word: "Play computer games",
    type: "phrase",
    meaning: "Bilgisayar oyunu oynamak",
    example: "My brother plays computer games after school.",
    exampleTr: "Erkek kardeşim okuldan sonra bilgisayar oyunu oynar."
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
    example: "I read a book before I go to bed.",
    exampleTr: "Yatmadan önce kitap okurum."
},

{
    word: "Go shopping",
    type: "phrase",
    meaning: "Alışverişe gitmek",
    example: "I go shopping with my mother at weekends.",
    exampleTr: "Hafta sonları annemle alışverişe giderim."
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
    example: "We watch movies together at weekends.",
    exampleTr: "Hafta sonları birlikte film izleriz."
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
    example: "We go swimming on hot days.",
    exampleTr: "Sıcak günlerde yüzmeye gideriz."
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
    example: "She likes to draw pictures in her free time.",
    exampleTr: "O boş zamanlarında resim çizmeyi sever."
},

{
    word: "Cook",
    type: "verb",
    meaning: "Yemek pişirmek",
    example: "I like to cook with my mother.",
    exampleTr: "Annemle yemek pişirmeyi severim."
},

{
    word: "Spend time with friends",
    type: "phrase",
    meaning: "Arkadaşlarla vakit geçirmek",
    example: "I like spending time with my friends.",
    exampleTr: "Arkadaşlarımla vakit geçirmeyi severim."
},

{
    word: "Visit relatives",
    type: "phrase",
    meaning: "Akrabaları ziyaret etmek",
    example: "We visit our relatives during the holidays.",
    exampleTr: "Tatil sırasında akrabalarımızı ziyaret ederiz."
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
    example: "I like doing puzzles in my free time.",
    exampleTr: "Boş zamanlarımda yapboz çözmeyi severim."
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
    example: "I attend an English course after school.",
    exampleTr: "Okuldan sonra İngilizce kursuna katılırım."
},

{
    word: "Play an instrument",
    type: "phrase",
    meaning: "Enstrüman çalmak",
    example: "I can play a musical instrument.",
    exampleTr: "Bir müzik aleti çalabilirim."
},

{
    word: "Take photos",
    type: "phrase",
    meaning: "Fotoğraf çekmek",
    example: "I like taking photos when I travel.",
    exampleTr: "Seyahat ettiğimde fotoğraf çekmeyi severim."
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
    example: "She likes to dance with her friends.",
    exampleTr: "Arkadaşlarıyla dans etmeyi sever."
},

{
    word: "Sing songs",
    type: "phrase",
    meaning: "Şarkı söylemek",
    example: "We sing songs together at parties.",
    exampleTr: "Partilerde birlikte şarkı söyleriz."
},

{
    word: "Go camping",
    type: "phrase",
    meaning: "Kamp yapmak",
    example: "We go camping in summer.",
    exampleTr: "Yazın kamp yaparız."
},

{
    word: "Tent",
    type: "noun",
    meaning: "Çadır",
    example: "We put up a tent before it gets dark.",
    exampleTr: "Hava kararmadan önce çadır kurarız."
},

{
    word: "Pocketknife",
    type: "noun",
    meaning: "Cep bıçağı",
    example: "He carries a pocketknife when he goes camping.",
    exampleTr: "Kampa gittiğinde yanında cep bıçağı taşır."
},

{
    word: "Sleeping bag",
    type: "noun",
    meaning: "Uyku tulumu",
    example: "I sleep in my sleeping bag at night.",
    exampleTr: "Gece uyku tulumumda uyurum."
},

{
    word: "Backpack",
    type: "noun",
    meaning: "Sırt çantası",
    example: "I put my clothes in my backpack.",
    exampleTr: "Kıyafetlerimi sırt çantama koyarım."
},

{
    word: "Flashlight",
    type: "noun",
    meaning: "El feneri",
    example: "We need a flashlight when it gets dark.",
    exampleTr: "Hava karardığında bir el fenerine ihtiyacımız var."
},

{
    word: "Compass",
    type: "noun",
    meaning: "Pusula",
    example: "A compass helps us find the right direction.",
    exampleTr: "Pusula doğru yönü bulmamıza yardımcı olur."
},

{
    word: "Map",
    type: "noun",
    meaning: "Harita",
    example: "We use a map to find our way.",
    exampleTr: "Yolumuzu bulmak için harita kullanırız."
},

{
    word: "Rope",
    type: "noun",
    meaning: "İp",
    example: "We need a rope to secure the tent.",
    exampleTr: "Çadırı sabitlemek için bir ipe ihtiyacımız var."
},

{
    word: "First aid kit",
    type: "noun",
    meaning: "İlk yardım çantası",
    example: "Always take a first aid kit when you go camping.",
    exampleTr: "Kampa giderken her zaman bir ilk yardım çantası götür."
},

{
    word: "Match",
    type: "noun",
    meaning: "Kibrit",
    example: "We use matches to make a fire.",
    exampleTr: "Ateş yakmak için kibrit kullanırız."
},

{
    word: "Adventure",
    type: "noun",
    meaning: "Macera",
    example: "I love reading stories about adventure.",
    exampleTr: "Macera hakkında hikâyeler okumayı severim."
},

{
    word: "Biography",
    type: "noun",
    meaning: "Biyografi",
    example: "I am reading a biography of a famous scientist.",
    exampleTr: "Ünlü bir bilim insanının biyografisini okuyorum."
},

{
    word: "Detective",
    type: "noun",
    meaning: "Polisiye",
    example: "My favorite books are detective stories.",
    exampleTr: "En sevdiğim kitaplar polisiye hikâyelerdir."
},

{
    word: "Comic book",
    type: "noun",
    meaning: "Çizgi roman",
    example: "My brother loves reading comic books.",
    exampleTr: "Erkek kardeşim çizgi roman okumayı çok seviyor."
},

{
    word: "Fantasy",
    type: "noun",
    meaning: "Fantastik",
    example: "Fantasy books often have magical characters.",
    exampleTr: "Fantastik kitaplarda genellikle sihirli karakterler bulunur."
},

{
    word: "Science fiction",
    type: "noun",
    meaning: "Bilim kurgu",
    example: "She enjoys watching science fiction movies.",
    exampleTr: "Bilim kurgu filmleri izlemekten hoşlanıyor."
},

{
    word: "Horror",
    type: "noun",
    meaning: "Korku",
    example: "I don't like horror movies because they scare me.",
    exampleTr: "Korku filmlerini sevmiyorum çünkü beni korkutuyorlar."
},

{
    word: "Mystery",
    type: "noun",
    meaning: "Gizem",
    example: "This mystery story is very exciting.",
    exampleTr: "Bu gizem hikâyesi çok heyecanlı."
},

{
    word: "Poetry",
    type: "noun",
    meaning: "Şiir",
    example: "She enjoys reading poetry in her free time.",
    exampleTr: "Boş zamanlarında şiir okumaktan hoşlanıyor."
},

{
    word: "Fairy tale",
    type: "noun",
    meaning: "Masal",
    example: "My mother read fairy tales to me when I was a child.",
    exampleTr: "Annem ben çocukken bana masallar okurdu."
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
    example: "My brother likes listening to rock music.",
    exampleTr: "Erkek kardeşim rock müzik dinlemeyi sever."
},

{
    word: "Rap",
    type: "noun",
    meaning: "Rap müzik",
    example: "He listens to rap music every day.",
    exampleTr: "Her gün rap müzik dinler."
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
    example: "She often listens to classical music while studying.",
    exampleTr: "Ders çalışırken sık sık klasik müzik dinler."
},

{
    word: "Folk",
    type: "noun",
    meaning: "Halk müziği",
    example: "My grandparents love listening to folk music.",
    exampleTr: "Büyükanne ve büyükbabam halk müziği dinlemeyi sever."
},

{
    word: "Heavy metal",
    type: "noun",
    meaning: "Ağır metal",
    example: "My friend is a big fan of heavy metal.",
    exampleTr: "Arkadaşım ağır metalin büyük bir hayranıdır."
},

{
    word: "Like",
    type: "verb",
    meaning: "Beğenmek, hoşlanmak",
    example: "I like spending time with my friends.",
    exampleTr: "Arkadaşlarımla vakit geçirmekten hoşlanırım."
},

{
    word: "Love",
    type: "verb",
    meaning: "Sevmek",
    example: "I love listening to music.",
    exampleTr: "Müzik dinlemeyi çok severim."
},

{
    word: "Prefer",
    type: "verb",
    meaning: "Tercih etmek",
    example: "I prefer reading books to watching TV.",
    exampleTr: "Televizyon izlemektense kitap okumayı tercih ederim."
},

{
    word: "Would rather",
    type: "phrase",
    meaning: "Tercih etmek",
    example: "I would rather stay at home tonight.",
    exampleTr: "Bu akşam evde kalmayı tercih ederim."
},

{
    word: "Fond of",
    type: "adjective",
    meaning: "Düşkün olmak",
    example: "She is fond of playing computer games.",
    exampleTr: "O, bilgisayar oyunları oynamaya düşkündür."
},

{
    word: "Keen on",
    type: "adjective",
    meaning: "Meraklı olmak, çok ilgili olmak",
    example: "He is keen on playing basketball.",
    exampleTr: "O, basketbol oynamaya çok meraklıdır."
},

{
    word: "Be into",
    type: "phrase",
    meaning: "İlgilenmek, meraklı olmak",
    example: "I am really into photography.",
    exampleTr: "Fotoğrafçılıkla gerçekten ilgileniyorum."
},

{
    word: "Interested in",
    type: "adjective",
    meaning: "İlgili olmak",
    example: "She is interested in learning English.",
    exampleTr: "O, İngilizce öğrenmekle ilgileniyor."
},

{
    word: "Crazy about",
    type: "adjective",
    meaning: "Çok sevmek, ... için çıldırmak",
    example: "My sister is crazy about pop music.",
    exampleTr: "Kız kardeşim pop müzik için çıldırıyor."
},

{
    word: "Enjoy",
    type: "verb",
    meaning: "Keyif almak, hoşlanmak",
    example: "I enjoy watching movies with my friends.",
    exampleTr: "Arkadaşlarımla film izlemekten keyif alırım."
},

{
    word: "Good at",
    type: "adjective",
    meaning: "... konusunda iyi olmak",
    example: "She is good at playing the piano.",
    exampleTr: "O, piyano çalmada iyidir."
},

{
    word: "Dislike",
    type: "verb",
    meaning: "Beğenmemek, hoşlanmamak",
    example: "I dislike getting up early.",
    exampleTr: "Erken kalkmaktan hoşlanmam."
},

{
    word: "Hate",
    type: "verb",
    meaning: "Nefret etmek",
    example: "I hate waiting for the bus.",
    exampleTr: "Otobüs beklemekten nefret ederim."
},

{
    word: "Would rather not",
    type: "phrase",
    meaning: "Tercih etmemek",
    example: "I would rather not go out tonight.",
    exampleTr: "Bu akşam dışarı çıkmamayı tercih ederim."
},

{
    word: "Not into",
    type: "phrase",
    meaning: "İlgilenmemek, meraklı olmamak",
    example: "I am not into playing computer games.",
    exampleTr: "Bilgisayar oyunları oynamakla ilgilenmiyorum."
},

{
    word: "Can't stand",
    type: "phrase",
    meaning: "Katlanamamak",
    example: "I can't stand listening to loud music.",
    exampleTr: "Yüksek sesli müzik dinlemeye katlanamıyorum."
},

{
    word: "Not interested in",
    type: "adjective",
    meaning: "İlgilenmemek, ilgi duymamak",
    example: "She is not interested in playing tennis.",
    exampleTr: "O, tenis oynamakla ilgilenmiyor."
},

{
    word: "Bad at",
    type: "adjective",
    meaning: "... konusunda kötü olmak",
    example: "I am bad at playing the guitar.",
    exampleTr: "Gitar çalmada kötüyüm."
},

{
    word: "Amazing",
    type: "adjective",
    meaning: "Harika, şaşırtıcı",
    example: "The concert was amazing.",
    exampleTr: "Konser harikaydı."
},

{
    word: "Fascinating",
    type: "adjective",
    meaning: "Büyüleyici",
    example: "I think space is fascinating.",
    exampleTr: "Bence uzay büyüleyici."
},

{
    word: "Amusing",
    type: "adjective",
    meaning: "Eğlenceli, güldürücü",
    example: "The story was very amusing.",
    exampleTr: "Hikâye çok eğlenceliydi."
},

{
    word: "Entertaining",
    type: "adjective",
    meaning: "Eğlenceli, keyifli",
    example: "The movie was really entertaining.",
    exampleTr: "Film gerçekten eğlenceliydi."
},

{
    word: "Exciting",
    type: "adjective",
    meaning: "Heyecan verici",
    example: "The football match was exciting.",
    exampleTr: "Futbol maçı heyecan vericiydi."
},

{
    word: "Interesting",
    type: "adjective",
    meaning: "İlginç",
    example: "I find science very interesting.",
    exampleTr: "Bilimi çok ilginç buluyorum."
},

{
    word: "Unbearable",
    type: "adjective",
    meaning: "Katlanılmaz",
    example: "The noise was unbearable.",
    exampleTr: "Gürültü katlanılmazdı."
},

{
    word: "Ridiculous",
    type: "adjective",
    meaning: "Saçma, gülünç",
    example: "That idea sounds ridiculous.",
    exampleTr: "O fikir kulağa saçma geliyor."
},

{
    word: "Boring",
    type: "adjective",
    meaning: "Sıkıcı",
    example: "The movie was boring.",
    exampleTr: "Film sıkıcıydı."
},

{
    word: "Nonsense",
    type: "noun",
    meaning: "Saçmalık, mantıksız şey",
    example: "What he said was complete nonsense.",
    exampleTr: "Onun söylediği tamamen saçmalıktı."
},

{
    word: "Disappointed",
    type: "adjective",
    meaning: "Hayal kırıklığına uğramış",
    example: "I was disappointed with the result.",
    exampleTr: "Sonuçtan hayal kırıklığına uğradım."
},

{
    word: "Frightening",
    type: "adjective",
    meaning: "Korkutucu",
    example: "The horror movie was frightening.",
    exampleTr: "Korku filmi korkutucuydu."
},

{
    word: "All",
    type: "determiner",
    meaning: "Hepsi, tümü",
    example: "All of my friends like music.",
    exampleTr: "Arkadaşlarımın hepsi müziği sever."
},

{
    word: "Half",
    type: "noun",
    meaning: "Yarısı",
    example: "Half of the students like playing sports.",
    exampleTr: "Öğrencilerin yarısı spor yapmayı sever."
},

{
    word: "None",
    type: "pronoun",
    meaning: "Hiçbiri",
    example: "None of my friends like horror movies.",
    exampleTr: "Arkadaşlarımın hiçbiri korku filmlerini sevmez."
},

{
    word: "Almost",
    type: "adverb",
    meaning: "Neredeyse, yaklaşık olarak",
    example: "Almost all students enjoy the activity.",
    exampleTr: "Öğrencilerin neredeyse hepsi etkinlikten keyif alır."
},

{
    word: "Nearly",
    type: "adverb",
    meaning: "Neredeyse, yaklaşık olarak",
    example: "Nearly half of the class likes basketball.",
    exampleTr: "Sınıfın neredeyse yarısı basketbolu sever."
},

{
    word: "More",
    type: "determiner",
    meaning: "Daha fazla, çoğu",
    example: "More students prefer playing football.",
    exampleTr: "Daha fazla öğrenci futbol oynamayı tercih ediyor."
},

{
    word: "The most",
    type: "phrase",
    meaning: "En çok",
    example: "I like English the most.",
    exampleTr: "En çok İngilizceyi severim."
},

{
    word: "Less",
    type: "determiner",
    meaning: "Daha az",
    example: "I spend less time watching TV.",
    exampleTr: "Televizyon izlemeye daha az zaman harcarım."
},

{
    word: "The least",
    type: "phrase",
    meaning: "En az",
    example: "I like horror movies the least.",
    exampleTr: "Korku filmlerini en az severim."
},

{
    word: "Same",
    type: "adjective",
    meaning: "Aynı",
    example: "We have the same interests.",
    exampleTr: "Aynı ilgi alanlarına sahibiz."
},

{
    word: "Similar",
    type: "adjective",
    meaning: "Benzer",
    example: "Our hobbies are similar.",
    exampleTr: "Hobilerimiz benzer."
},

{
    word: "Equal",
    type: "adjective",
    meaning: "Eşit",
    example: "The two teams have an equal number of players.",
    exampleTr: "İki takımın eşit sayıda oyuncusu var."
},

{
    word: "Always",
    type: "adverb",
    meaning: "Her zaman",
    example: "I always do my homework after school.",
    exampleTr: "Okuldan sonra her zaman ödevimi yaparım."
},

{
    word: "Generally",
    type: "adverb",
    meaning: "Genellikle",
    example: "I generally study in the evening.",
    exampleTr: "Genellikle akşamları ders çalışırım."
},

{
    word: "Usually",
    type: "adverb",
    meaning: "Genellikle",
    example: "I usually get up early on weekdays.",
    exampleTr: "Hafta içi genellikle erken kalkarım."
},

{
    word: "Often",
    type: "adverb",
    meaning: "Sık sık",
    example: "I often hang out with my friends.",
    exampleTr: "Arkadaşlarımla sık sık takılırım."
},

{
    word: "Once",
    type: "adverb",
    meaning: "Bir kez",
    example: "I go swimming once a week.",
    exampleTr: "Haftada bir kez yüzmeye giderim."
},

{
    word: "Twice",
    type: "adverb",
    meaning: "İki kez",
    example: "I play basketball twice a week.",
    exampleTr: "Haftada iki kez basketbol oynarım."
},

{
    word: "... times",
    type: "phrase",
    meaning: "... kez",
    example: "I exercise three times a week.",
    exampleTr: "Haftada üç kez egzersiz yaparım."
},

{
    word: "Sometimes",
    type: "adverb",
    meaning: "Bazen",
    example: "I sometimes watch movies with my family.",
    exampleTr: "Bazen ailemle film izlerim."
},

{
    word: "Rarely",
    type: "adverb",
    meaning: "Nadiren",
    example: "I rarely eat fast food.",
    exampleTr: "Nadiren fast food yerim."
},

{
    word: "Seldom",
    type: "adverb",
    meaning: "Nadiren",
    example: "I seldom watch television.",
    exampleTr: "Nadiren televizyon izlerim."
},

{
    word: "Never",
    type: "adverb",
    meaning: "Hiç, asla",
    example: "I never go to bed late on school days.",
    exampleTr: "Okul günlerinde asla geç yatmam."
},

{
    word: "Every day",
    type: "phrase",
    meaning: "Her gün",
    example: "I study English every day.",
    exampleTr: "Her gün İngilizce çalışırım."
},

{
    word: "Every",
    type: "determiner",
    meaning: "Her",
    example: "I read a book every night.",
    exampleTr: "Her gece bir kitap okurum."
},

{
    word: "3 times",
    type: "phrase",
    meaning: "Üç kez",
    example: "I go jogging three times a week.",
    exampleTr: "Haftada üç kez koşuya çıkarım."
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