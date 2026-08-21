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
// UNIT 3 VOCABULARY
// =========================================

const vocabulary = [

    {
        word: "Baking tray",
        type: "noun",
        meaning: "Fırın tepsisi",
        example: "Put the cookies on the baking tray.",
        exampleTr: "Kurabiyeleri fırın tepsisine koy."
    },

    {
        word: "Bowl",
        type: "noun",
        meaning: "Kase",
        example: "Put the flour in a bowl.",
        exampleTr: "Unu bir kaseye koy."
    },

    {
        word: "Tablespoon",
        type: "noun",
        meaning: "Yemek kaşığı",
        example: "Add two tablespoons of sugar.",
        exampleTr: "İki yemek kaşığı şeker ekle."
    },

    {
        word: "Teaspoon",
        type: "noun",
        meaning: "Çay kaşığı",
        example: "Add a teaspoon of salt.",
        exampleTr: "Bir çay kaşığı tuz ekle."
    },

    {
        word: "Bottle",
        type: "noun",
        meaning: "Şişe",
        example: "There is a bottle of water on the table.",
        exampleTr: "Masanın üzerinde bir şişe su var."
    },

    {
        word: "Glass",
        type: "noun",
        meaning: "Bardak",
        example: "Pour the juice into a glass.",
        exampleTr: "Meyve suyunu bir bardağa dök."
    },

    {
        word: "Oven",
        type: "noun",
        meaning: "Fırın",
        example: "Preheat the oven before cooking.",
        exampleTr: "Pişirmeden önce fırını önceden ısıt."
    },

    {
        word: "Microwave",
        type: "noun",
        meaning: "Mikrodalga fırın",
        example: "Heat the soup in the microwave.",
        exampleTr: "Çorbayı mikrodalga fırında ısıt."
    },

    {
        word: "Freezer",
        type: "noun",
        meaning: "Dondurucu",
        example: "Keep the meat in the freezer.",
        exampleTr: "Eti dondurucuda sakla."
    },

    {
        word: "Refrigerator",
        type: "noun",
        meaning: "Buzdolabı",
        example: "Put the milk in the refrigerator.",
        exampleTr: "Sütü buzdolabına koy."
    },

    {
        word: "Pan",
        type: "noun",
        meaning: "Tava",
        example: "Heat the oil in a pan.",
        exampleTr: "Yağı bir tavada ısıt."
    },

    {
        word: "Pot",
        type: "noun",
        meaning: "Geniş kap, tencere",
        example: "Put the vegetables in the pot.",
        exampleTr: "Sebzeleri tencereye koy."
    },

    {
        word: "Saucepan",
        type: "noun",
        meaning: "Saplı tencere",
        example: "Heat the milk in a saucepan.",
        exampleTr: "Sütü saplı tencerede ısıt."
    },

    {
        word: "Cake pan",
        type: "noun",
        meaning: "Kek kalıbı",
        example: "Pour the mixture into the cake pan.",
        exampleTr: "Karışımı kek kalıbına dök."
    },

    {
        word: "Fork",
        type: "noun",
        meaning: "Çatal",
        example: "Use a fork to eat the pasta.",
        exampleTr: "Makarnayı yemek için çatal kullan."
    },

    {
        word: "Grater",
        type: "noun",
        meaning: "Rende",
        example: "Use a grater to grate the cheese.",
        exampleTr: "Peyniri rendelemek için rende kullan."
    },

    {
        word: "Knife",
        type: "noun",
        meaning: "Bıçak",
        example: "Cut the bread with a knife.",
        exampleTr: "Ekmeği bıçakla kes."
    },

    {
        word: "Spoon",
        type: "noun",
        meaning: "Kaşık",
        example: "Stir the soup with a spoon.",
        exampleTr: "Çorbayı kaşıkla karıştır."
    },

    {
        word: "Strainer",
        type: "noun",
        meaning: "Süzgeç",
        example: "Use a strainer to drain the pasta.",
        exampleTr: "Makarnayı süzmek için süzgeç kullan."
    },

    {
        word: "Plate",
        type: "noun",
        meaning: "Tabak",
        example: "Put the food on a plate.",
        exampleTr: "Yemeği tabağa koy."
    },

    {
        word: "Cup",
        type: "noun",
        meaning: "Fincan, kupa",
        example: "She is drinking a cup of tea.",
        exampleTr: "O bir fincan çay içiyor."
    },

    {
        word: "Peeler",
        type: "noun",
        meaning: "Soyacak",
        example: "Use a peeler to peel the potatoes.",
        exampleTr: "Patatesleri soymak için soyacak kullan."
    },

    {
        word: "Teapot",
        type: "noun",
        meaning: "Çaydanlık",
        example: "The tea is in the teapot.",
        exampleTr: "Çay çaydanlıkta."
    },

    {
        word: "Bake",
        type: "verb",
        meaning: "Fırında pişirmek",
        example: "Bake the cake for thirty minutes.",
        exampleTr: "Keki otuz dakika fırında pişir."
    },

    {
        word: "Boil",
        type: "verb",
        meaning: "Haşlamak, kaynatmak",
        example: "Boil the potatoes for ten minutes.",
        exampleTr: "Patatesleri on dakika haşla."
    },

    {
        word: "Fry",
        type: "verb",
        meaning: "Yağda kızartmak",
        example: "Fry the eggs in a pan.",
        exampleTr: "Yumurtaları tavada kızart."
    },

    {
        word: "Grill",
        type: "verb",
        meaning: "Izgara yapmak",
        example: "Grill the chicken for fifteen minutes.",
        exampleTr: "Tavuğu on beş dakika ızgara yap."
    },

    {
        word: "Roast",
        type: "verb",
        meaning: "Fırında kızartmak",
        example: "Roast the vegetables in the oven.",
        exampleTr: "Sebzeleri fırında kızart."
    },

    {
        word: "Steam",
        type: "verb",
        meaning: "Buharda pişirmek",
        example: "Steam the vegetables until they are soft.",
        exampleTr: "Sebzeleri yumuşayana kadar buharda pişir."
    },

    {
        word: "Add",
        type: "verb",
        meaning: "Eklemek",
        example: "Add some salt to the soup.",
        exampleTr: "Çorbaya biraz tuz ekle."
    },

    {
        word: "Chop",
        type: "verb",
        meaning: "Küçük doğramak",
        example: "Chop the onions into small pieces.",
        exampleTr: "Soğanları küçük parçalar halinde doğra."
    },

    {
        word: "Crack",
        type: "verb",
        meaning: "Kırmak",
        example: "Crack two eggs into the bowl.",
        exampleTr: "Kaseye iki yumurta kır."
    },

    {
        word: "Cut",
        type: "verb",
        meaning: "Kesmek",
        example: "Cut the bread into slices.",
        exampleTr: "Ekmeği dilimler halinde kes."
    },

    {
        word: "Cover",
        type: "verb",
        meaning: "Kapatmak, üzerini örtmek",
        example: "Cover the bowl with a plate.",
        exampleTr: "Kasenin üzerini bir tabakla kapat."
    },

    {
        word: "Dice",
        type: "verb",
        meaning: "Küp küp doğramak",
        example: "Dice the tomatoes into small cubes.",
        exampleTr: "Domatesleri küçük küpler halinde doğra."
    },

    {
        word: "Drain / Strain",
        type: "verb",
        meaning: "Süzmek",
        example: "Drain the pasta after boiling it.",
        exampleTr: "Makarnayı haşladıktan sonra süz."
    },

    {
        word: "Grate",
        type: "verb",
        meaning: "Rendelemek",
        example: "Grate some cheese over the pasta.",
        exampleTr: "Makarnanın üzerine biraz peynir rendele."
    },

    {
        word: "Knead",
        type: "verb",
        meaning: "Yoğurmak",
        example: "Knead the dough for five minutes.",
        exampleTr: "Hamuru beş dakika yoğur."
    },

    {
        word: "Place",
        type: "verb",
        meaning: "Yerleştirmek",
        example: "Place the vegetables on the plate.",
        exampleTr: "Sebzeleri tabağa yerleştir."
    },

    {
        word: "Shape",
        type: "verb",
        meaning: "Şekillendirmek",
        example: "Shape the dough into small balls.",
        exampleTr: "Hamuru küçük toplar şeklinde şekillendir."
    },

    {
        word: "Mash",
        type: "verb",
        meaning: "Ezmek",
        example: "Mash the potatoes with a fork.",
        exampleTr: "Patatesleri çatalla ez."
    },

    {
        word: "Melt",
        type: "verb",
        meaning: "Eritmek",
        example: "Melt the butter in a pan.",
        exampleTr: "Tereyağını tavada erit."
    },

    {
        word: "Mix / Stir",
        type: "verb",
        meaning: "Karıştırmak",
        example: "Mix the ingredients in a bowl.",
        exampleTr: "Malzemeleri bir kasede karıştır."
    },

    {
        word: "Peel",
        type: "verb",
        meaning: "Soymak",
        example: "Peel the potatoes before cooking them.",
        exampleTr: "Patatesleri pişirmeden önce soy."
    },

    {
        word: "Pour",
        type: "verb",
        meaning: "Dökmek",
        example: "Pour the milk into the glass.",
        exampleTr: "Sütü bardağa dök."
    },

    {
        word: "Press",
        type: "verb",
        meaning: "Bastırmak",
        example: "Press the dough gently.",
        exampleTr: "Hamura hafifçe bastır."
    },

    {
        word: "Put",
        type: "verb",
        meaning: "Koymak",
        example: "Put the ingredients in the bowl.",
        exampleTr: "Malzemeleri kaseye koy."
    },

    {
        word: "Remove",
        type: "verb",
        meaning: "Çıkarmak, ayırmak",
        example: "Remove the pan from the oven.",
        exampleTr: "Tavayı fırından çıkar."
    },

    {
        word: "Rinse",
        type: "verb",
        meaning: "Durulamak",
        example: "Rinse the vegetables with water.",
        exampleTr: "Sebzeleri suyla durula."
    },

    {
        word: "Roll",
        type: "verb",
        meaning: "Yuvarlamak, sarmak",
        example: "Roll the dough into a thin layer.",
        exampleTr: "Hamuru ince bir tabaka halinde aç."
    },

    {
        word: "Season",
        type: "verb",
        meaning: "Baharatlamak",
        example: "Season the chicken with salt and pepper.",
        exampleTr: "Tavuğu tuz ve karabiberle baharatla."
    },

    {
        word: "Serve",
        type: "verb",
        meaning: "Servis etmek",
        example: "Serve the soup while it is hot.",
        exampleTr: "Çorbayı sıcakken servis et."
    },

    {
        word: "Slice",
        type: "verb",
        meaning: "Dilimlemek",
        example: "Slice the tomatoes thinly.",
        exampleTr: "Domatesleri ince ince dilimle."
    },

    {
        word: "Spread",
        type: "verb",
        meaning: "Sürmek, yaymak",
        example: "Spread some butter on the bread.",
        exampleTr: "Ekmeğin üzerine biraz tereyağı sür."
    },

    {
        word: "Sprinkle",
        type: "verb",
        meaning: "Serpmek",
        example: "Sprinkle some cheese on the pizza.",
        exampleTr: "Pizzanın üzerine biraz peynir serp."
    },

    {
        word: "Squeeze",
        type: "verb",
        meaning: "Sıkmak",
        example: "Squeeze some lemon juice over the salad.",
        exampleTr: "Salatanın üzerine biraz limon suyu sık."
    },

    {
        word: "Whisk",
        type: "verb",
        meaning: "Çırpmak",
        example: "Whisk the eggs in a bowl.",
        exampleTr: "Yumurtaları bir kasede çırp."
    },

    {
        word: "Wrap",
        type: "verb",
        meaning: "Sarmak, paketlemek",
        example: "Wrap the sandwich in paper.",
        exampleTr: "Sandviçi kağıda sar."
    },

    {
        word: "Carrot",
        type: "noun",
        meaning: "Havuç",
        example: "Cut the carrot into small pieces.",
        exampleTr: "Havucu küçük parçalara kes."
    },

    {
        word: "Corn",
        type: "noun",
        meaning: "Mısır",
        example: "Add some corn to the salad.",
        exampleTr: "Salataya biraz mısır ekle."
    },

    {
        word: "Cucumber",
        type: "noun",
        meaning: "Salatalık",
        example: "Slice the cucumber for the salad.",
        exampleTr: "Salata için salatalığı dilimle."
    },

    {
        word: "Tomato",
        type: "noun",
        meaning: "Domates",
        example: "Chop the tomatoes into small pieces.",
        exampleTr: "Domatesleri küçük parçalar halinde doğra."
    },

    {
        word: "Garlic",
        type: "noun",
        meaning: "Sarımsak",
        example: "Add some garlic to the sauce.",
        exampleTr: "Sosa biraz sarımsak ekle."
    },

    {
        word: "Onion",
        type: "noun",
        meaning: "Soğan",
        example: "Chop the onion finely.",
        exampleTr: "Soğanı ince ince doğra."
    },

    {
        word: "Parsley",
        type: "noun",
        meaning: "Maydanoz",
        example: "Sprinkle some parsley on the soup.",
        exampleTr: "Çorbanın üzerine biraz maydanoz serp."
    },

    {
        word: "Pepper",
        type: "noun",
        meaning: "Biber",
        example: "Add a red pepper to the dish.",
        exampleTr: "Yemeğe bir kırmızı biber ekle."
    },

    {
        word: "Lemon",
        type: "noun",
        meaning: "Limon",
        example: "Squeeze a lemon over the fish.",
        exampleTr: "Balığın üzerine limon sık."
    },

    {
        word: "Potatoes",
        type: "noun",
        meaning: "Patates",
        example: "Boil the potatoes for ten minutes.",
        exampleTr: "Patatesleri on dakika haşla."
    },

    {
        word: "Lettuce",
        type: "noun",
        meaning: "Marul",
        example: "Wash the lettuce before making the salad.",
        exampleTr: "Salata yapmadan önce marulu yıka."
    },

    {
        word: "Zucchini",
        type: "noun",
        meaning: "Kabak",
        example: "Cut the zucchini into slices.",
        exampleTr: "Kabağı dilimler halinde kes."
    },

    {
        word: "Seaweed",
        type: "noun",
        meaning: "Su yosunu",
        example: "Seaweed is often used in some dishes.",
        exampleTr: "Su yosunu bazı yemeklerde sıklıkla kullanılır."
    },

    {
        word: "Apple",
        type: "noun",
        meaning: "Elma",
        example: "Cut the apple into small pieces.",
        exampleTr: "Elmayı küçük parçalara kes."
    },

    {
        word: "Banana",
        type: "noun",
        meaning: "Muz",
        example: "Peel the banana before eating it.",
        exampleTr: "Muzu yemeden önce soy."
    },

    {
        word: "Blueberries",
        type: "noun",
        meaning: "Yaban mersini",
        example: "Add some blueberries to the yogurt.",
        exampleTr: "Yoğurda biraz yaban mersini ekle."
    },

    {
        word: "Cherry",
        type: "noun",
        meaning: "Kiraz",
        example: "The cake is decorated with cherries.",
        exampleTr: "Kek kirazlarla süslenmiş."
    },

    {
        word: "Coconut",
        type: "noun",
        meaning: "Hindistan cevizi",
        example: "Add some coconut to the dessert.",
        exampleTr: "Tatlıya biraz Hindistan cevizi ekle."
    },

    {
        word: "Cranberries",
        type: "noun",
        meaning: "Turna yemişi",
        example: "Cranberries are used in some desserts.",
        exampleTr: "Turna yemişleri bazı tatlılarda kullanılır."
    },

    {
        word: "Grape",
        type: "noun",
        meaning: "Üzüm",
        example: "Wash the grapes before eating them.",
        exampleTr: "Üzümleri yemeden önce yıka."
    },

    {
        word: "Strawberry",
        type: "noun",
        meaning: "Çilek",
        example: "She put strawberries on the cake.",
        exampleTr: "Kekin üzerine çilek koydu."
    },

    {
        word: "Watermelon",
        type: "noun",
        meaning: "Karpuz",
        example: "We eat watermelon in summer.",
        exampleTr: "Yazın karpuz yeriz."
    },

    {
        word: "Orange",
        type: "noun",
        meaning: "Portakal",
        example: "Squeeze an orange to make juice.",
        exampleTr: "Meyve suyu yapmak için bir portakalı sık."
    },

    {
        word: "Water",
        type: "noun",
        meaning: "Su",
        example: "Drink plenty of water every day.",
        exampleTr: "Her gün bolca su iç."
    },

    {
        word: "Tea",
        type: "noun",
        meaning: "Çay",
        example: "I usually drink tea after breakfast.",
        exampleTr: "Genellikle kahvaltıdan sonra çay içerim."
    },

    {
        word: "Ice tea",
        type: "noun",
        meaning: "Soğuk çay",
        example: "She ordered an ice tea.",
        exampleTr: "O bir soğuk çay sipariş etti."
    },

    {
        word: "Milk",
        type: "noun",
        meaning: "Süt",
        example: "Add some milk to the mixture.",
        exampleTr: "Karışıma biraz süt ekle."
    },

    {
        word: "Coke",
        type: "noun",
        meaning: "Kola",
        example: "He ordered a bottle of Coke.",
        exampleTr: "Bir şişe kola sipariş etti."
    },

    {
        word: "Lemonade",
        type: "noun",
        meaning: "Limonata",
        example: "We made fresh lemonade.",
        exampleTr: "Taze limonata yaptık."
    },

    {
        word: "Coffee",
        type: "noun",
        meaning: "Kahve",
        example: "My father drinks coffee every morning.",
        exampleTr: "Babam her sabah kahve içer."
    },

    {
        word: "Fruit juice",
        type: "noun",
        meaning: "Meyve suyu",
        example: "I would like some fruit juice.",
        exampleTr: "Biraz meyve suyu istiyorum."
    },

    {
        word: "Cake",
        type: "noun",
        meaning: "Kek",
        example: "My mother baked a delicious cake.",
        exampleTr: "Annem lezzetli bir kek yaptı."
    },

    {
        word: "Apple pie",
        type: "noun",
        meaning: "Elmalı turta",
        example: "Apple pie is my favorite dessert.",
        exampleTr: "Elmalı turta en sevdiğim tatlıdır."
    },

    {
        word: "Ice cream",
        type: "noun",
        meaning: "Dondurma",
        example: "I would like some chocolate ice cream.",
        exampleTr: "Biraz çikolatalı dondurma istiyorum."
    },

    {
        word: "Dessert",
        type: "noun",
        meaning: "Tatlı",
        example: "We had dessert after dinner.",
        exampleTr: "Akşam yemeğinden sonra tatlı yedik."
    },

    {
        word: "Toast",
        type: "noun",
        meaning: "Tost",
        example: "I had cheese toast for breakfast.",
        exampleTr: "Kahvaltıda peynirli tost yedim."
    },

    {
        word: "Hamburger",
        type: "noun",
        meaning: "Hamburger",
        example: "He ordered a hamburger.",
        exampleTr: "O bir hamburger sipariş etti."
    },

    {
        word: "Sandwich",
        type: "noun",
        meaning: "Sandeviç",
        example: "I made a cheese sandwich.",
        exampleTr: "Peynirli bir sandviç yaptım."
    },

    {
        word: "Pizza",
        type: "noun",
        meaning: "Pizza",
        example: "We ordered a large pizza.",
        exampleTr: "Büyük bir pizza sipariş ettik."
    },

    {
        word: "Popcorn",
        type: "noun",
        meaning: "Patlamış mısır",
        example: "We ate popcorn while watching the movie.",
        exampleTr: "Film izlerken patlamış mısır yedik."
    },

    {
        word: "Omelet",
        type: "noun",
        meaning: "Omlet",
        example: "She made an omelet for breakfast.",
        exampleTr: "Kahvaltı için omlet yaptı."
    },

    {
        word: "Fish",
        type: "noun",
        meaning: "Balık",
        example: "We had grilled fish for dinner.",
        exampleTr: "Akşam yemeğinde ızgara balık yedik."
    },

    {
        word: "Chicken",
        type: "noun",
        meaning: "Tavuk",
        example: "Put the chicken in the oven.",
        exampleTr: "Tavuğu fırına koy."
    },

    {
        word: "Meat",
        type: "noun",
        meaning: "Et",
        example: "We need some meat for the recipe.",
        exampleTr: "Tarif için biraz ete ihtiyacımız var."
    },

    {
        word: "Steak",
        type: "noun",
        meaning: "Biftek",
        example: "He ordered a grilled steak.",
        exampleTr: "Izgara biftek sipariş etti."
    },

    {
        word: "Mince",
        type: "noun",
        meaning: "Kıyma",
        example: "Add the mince to the pan.",
        exampleTr: "Kıymayı tavaya ekle."
    },

    {
        word: "Meatball",
        type: "noun",
        meaning: "Köfte",
        example: "She made meatballs for dinner.",
        exampleTr: "Akşam yemeği için köfte yaptı."
    },

    {
        word: "Bread",
        type: "noun",
        meaning: "Ekmek",
        example: "We need some bread for breakfast.",
        exampleTr: "Kahvaltı için biraz ekmeğe ihtiyacımız var."
    },

    {
        word: "Cheese",
        type: "noun",
        meaning: "Peynir",
        example: "Add some cheese to the sandwich.",
        exampleTr: "Sandviçe biraz peynir ekle."
    },

    {
        word: "Olive",
        type: "noun",
        meaning: "Zeytin",
        example: "I like eating olives for breakfast.",
        exampleTr: "Kahvaltıda zeytin yemeyi severim."
    },

    {
        word: "Egg",
        type: "noun",
        meaning: "Yumurta",
        example: "Crack two eggs into the bowl.",
        exampleTr: "Kaseye iki yumurta kır."
    },

    {
        word: "Pasta",
        type: "noun",
        meaning: "Makarna",
        example: "She cooked pasta for lunch.",
        exampleTr: "Öğle yemeği için makarna pişirdi."
    },

    {
        word: "Rice",
        type: "noun",
        meaning: "Pirinç",
        example: "Wash the rice before cooking it.",
        exampleTr: "Pirinci pişirmeden önce yıka."
    },

    {
        word: "Lentil",
        type: "noun",
        meaning: "Mercimek",
        example: "Lentils are used to make soup.",
        exampleTr: "Mercimek çorba yapmak için kullanılır."
    },

    {
        word: "Flour",
        type: "noun",
        meaning: "Un",
        example: "Add two cups of flour.",
        exampleTr: "İki bardak un ekle."
    },

    {
        word: "Baking powder",
        type: "noun",
        meaning: "Kabartma tozu",
        example: "Add a teaspoon of baking powder.",
        exampleTr: "Bir çay kaşığı kabartma tozu ekle."
    },

    {
        word: "Butter",
        type: "noun",
        meaning: "Tereyağı",
        example: "Melt the butter in a pan.",
        exampleTr: "Tereyağını tavada erit."
    },

    {
        word: "Cream",
        type: "noun",
        meaning: "Krema",
        example: "Add some cream to the soup.",
        exampleTr: "Çorbaya biraz krema ekle."
    },

    {
        word: "Honey",
        type: "noun",
        meaning: "Bal",
        example: "I like honey with my breakfast.",
        exampleTr: "Kahvaltımda bal yemeyi severim."
    },

    {
        word: "Oil",
        type: "noun",
        meaning: "Yağ",
        example: "Heat some oil in the pan.",
        exampleTr: "Tavada biraz yağ ısıt."
    },

    {
        word: "Olive oil",
        type: "noun",
        meaning: "Zeytinyağı",
        example: "Add some olive oil to the salad.",
        exampleTr: "Salataya biraz zeytinyağı ekle."
    },

    {
        word: "Sugar",
        type: "noun",
        meaning: "Şeker",
        example: "Add two spoons of sugar.",
        exampleTr: "İki kaşık şeker ekle."
    },

    {
        word: "Powdered sugar",
        type: "noun",
        meaning: "Pudra şekeri",
        example: "Sprinkle powdered sugar on the cake.",
        exampleTr: "Kekin üzerine pudra şekeri serp."
    },

    {
        word: "Vanilla",
        type: "noun",
        meaning: "Vanilya",
        example: "Add some vanilla to the mixture.",
        exampleTr: "Karışıma biraz vanilya ekle."
    },

    {
        word: "Walnut",
        type: "noun",
        meaning: "Ceviz",
        example: "Add chopped walnuts to the cake.",
        exampleTr: "Keke doğranmış ceviz ekle."
    },

    {
        word: "Hazelnut",
        type: "noun",
        meaning: "Fındık",
        example: "The cake contains hazelnuts.",
        exampleTr: "Kekin içinde fındık var."
    },

    {
        word: "Lemon juice",
        type: "noun",
        meaning: "Limon suyu",
        example: "Add some lemon juice to the salad.",
        exampleTr: "Salataya biraz limon suyu ekle."
    },

    {
        word: "Black pepper",
        type: "noun",
        meaning: "Karabiber",
        example: "Sprinkle some black pepper on the meat.",
        exampleTr: "Etin üzerine biraz karabiber serp."
    },

    {
        word: "Cumin",
        type: "noun",
        meaning: "Kimyon",
        example: "Add some cumin to the meatballs.",
        exampleTr: "Köftelere biraz kimyon ekle."
    },

    {
        word: "Cinnamon",
        type: "noun",
        meaning: "Tarçın",
        example: "Sprinkle some cinnamon on the dessert.",
        exampleTr: "Tatlının üzerine biraz tarçın serp."
    },

    {
        word: "Mint",
        type: "noun",
        meaning: "Nane",
        example: "Add some fresh mint to the salad.",
        exampleTr: "Salataya biraz taze nane ekle."
    },

    {
        word: "Red pepper",
        type: "noun",
        meaning: "Pul biber",
        example: "Add some red pepper to the soup.",
        exampleTr: "Çorbaya biraz pul biber ekle."
    },

    {
        word: "Salt",
        type: "noun",
        meaning: "Tuz",
        example: "Add a little salt to the soup.",
        exampleTr: "Çorbaya biraz tuz ekle."
    },

    {
        word: "Soy sauce",
        type: "noun",
        meaning: "Soya sosu",
        example: "Add some soy sauce to the noodles.",
        exampleTr: "Eriştelere biraz soya sosu ekle."
    },

    {
        word: "Ginger",
        type: "noun",
        meaning: "Zencefil",
        example: "Add some ginger to the soup.",
        exampleTr: "Çorbaya biraz zencefil ekle."
    },

    {
        word: "Bitter",
        type: "adjective",
        meaning: "Acı, buruk",
        example: "The coffee tastes bitter.",
        exampleTr: "Kahvenin tadı acı."
    },

    {
        word: "Fatty / Greasy",
        type: "adjective",
        meaning: "Yağlı",
        example: "This food is too greasy.",
        exampleTr: "Bu yemek çok yağlı."
    },

    {
        word: "Healthy",
        type: "adjective",
        meaning: "Sağlıklı",
        example: "Vegetables are healthy foods.",
        exampleTr: "Sebzeler sağlıklı yiyeceklerdir."
    },

    {
        word: "Unhealthy",
        type: "adjective",
        meaning: "Sağlıksız",
        example: "Eating too much fast food is unhealthy.",
        exampleTr: "Çok fazla fast food yemek sağlıksızdır."
    },

    {
        word: "Milky",
        type: "adjective",
        meaning: "Sütlü",
        example: "I prefer milky coffee.",
        exampleTr: "Sütlü kahveyi tercih ederim."
    },

    {
        word: "Salty",
        type: "adjective",
        meaning: "Tuzlu",
        example: "The soup is too salty.",
        exampleTr: "Çorba çok tuzlu."
    },

    {
        word: "Sour",
        type: "adjective",
        meaning: "Ekşi",
        example: "The lemon tastes sour.",
        exampleTr: "Limonun tadı ekşi."
    },

    {
        word: "Spicy",
        type: "adjective",
        meaning: "Baharatlı",
        example: "I don't like spicy food.",
        exampleTr: "Baharatlı yemekleri sevmiyorum."
    },

    {
        word: "Sweet",
        type: "adjective",
        meaning: "Tatlı",
        example: "This cake is very sweet.",
        exampleTr: "Bu kek çok tatlı."
    },

    {
        word: "Tasty",
        type: "adjective",
        meaning: "Lezzetli",
        example: "The meal was really tasty.",
        exampleTr: "Yemek gerçekten lezzetliydi."
    },

    {
        word: "After",
        type: "preposition",
        meaning: "Sonra",
        example: "Wash the dishes after dinner.",
        exampleTr: "Akşam yemeğinden sonra bulaşıkları yıka."
    },

    {
        word: "Before",
        type: "preposition",
        meaning: "Önce",
        example: "Wash your hands before cooking.",
        exampleTr: "Yemek yapmadan önce ellerini yıka."
    },

    {
        word: "Enjoy it",
        type: "expression",
        meaning: "Afiyet olsun",
        example: "Here is your meal. Enjoy it!",
        exampleTr: "İşte yemeğiniz. Afiyet olsun!"
    },

    {
        word: "Flavor",
        type: "noun",
        meaning: "Tat, lezzet",
        example: "This sauce has a strong flavor.",
        exampleTr: "Bu sosun güçlü bir tadı var."
    },

    {
        word: "Homemade",
        type: "adjective",
        meaning: "Ev yapımı",
        example: "My grandmother makes homemade bread.",
        exampleTr: "Büyükannem ev yapımı ekmek yapar."
    },

    {
        word: "Preference",
        type: "noun",
        meaning: "Tercih",
        example: "Everyone has different food preferences.",
        exampleTr: "Herkesin farklı yemek tercihleri vardır."
    },

    {
        word: "Tip",
        type: "noun",
        meaning: "İpucu",
        example: "Here is a useful cooking tip.",
        exampleTr: "İşte kullanışlı bir yemek yapma ipucu."
    },

    {
        word: "Well-known",
        type: "adjective",
        meaning: "Ünlü, tanınmış",
        example: "Turkish cuisine is well-known around the world.",
        exampleTr: "Türk mutfağı dünya çapında tanınmıştır."
    },

    {
        word: "Food",
        type: "noun",
        meaning: "Yiyecek",
        example: "We need to buy some food.",
        exampleTr: "Biraz yiyecek almamız gerekiyor."
    },

    {
        word: "Meal",
        type: "noun",
        meaning: "Yemek, öğün",
        example: "Breakfast is my favorite meal.",
        exampleTr: "Kahvaltı en sevdiğim öğündür."
    },

    {
        word: "Dish",
        type: "noun",
        meaning: "Yemek, bulaşık",
        example: "This is a traditional Turkish dish.",
        exampleTr: "Bu geleneksel bir Türk yemeğidir."
    },

    {
        word: "Ingredients",
        type: "noun",
        meaning: "Malzemeler",
        example: "Check the ingredients before cooking.",
        exampleTr: "Yemek yapmadan önce malzemeleri kontrol et."
    },

    {
        word: "Cooking",
        type: "noun",
        meaning: "Pişirme, yemek yapma",
        example: "Cooking can be fun.",
        exampleTr: "Yemek yapmak eğlenceli olabilir."
    },

    {
        word: "Kitchen",
        type: "noun",
        meaning: "Mutfak",
        example: "My mother is in the kitchen.",
        exampleTr: "Annem mutfakta."
    },

    {
        word: "Cuisine",
        type: "noun",
        meaning: "Mutfak kültürü",
        example: "I love Italian cuisine.",
        exampleTr: "İtalyan mutfağını seviyorum."
    },

    {
        word: "Chef",
        type: "noun",
        meaning: "Şef, aşçı",
        example: "The chef prepared a delicious meal.",
        exampleTr: "Şef lezzetli bir yemek hazırladı."
    },

    {
        word: "Recipe",
        type: "noun",
        meaning: "Tarif",
        example: "I found a new recipe online.",
        exampleTr: "İnternette yeni bir tarif buldum."
    },

    {
        word: "Step",
        type: "noun",
        meaning: "Adım, aşama",
        example: "Follow each step of the recipe.",
        exampleTr: "Tarifin her adımını takip et."
    },

    {
        word: "Process",
        type: "noun",
        meaning: "İşlem, süreç",
        example: "The cooking process takes about an hour.",
        exampleTr: "Pişirme süreci yaklaşık bir saat sürer."
    },

    {
        word: "How long?",
        type: "expression",
        meaning: "Ne kadar süre?",
        example: "How long should I cook the chicken?",
        exampleTr: "Tavuğu ne kadar süre pişirmeliyim?"
    },

    {
        word: "Minute",
        type: "noun",
        meaning: "Dakika",
        example: "Cook it for ten minutes.",
        exampleTr: "On dakika pişir."
    },

    {
        word: "Lengthwise",
        type: "adverb",
        meaning: "Boylamasına",
        example: "Cut the cucumber lengthwise.",
        exampleTr: "Salatalığı boylamasına kes."
    },

    {
        word: "Bunch",
        type: "noun",
        meaning: "Demet",
        example: "Add a bunch of parsley.",
        exampleTr: "Bir demet maydanoz ekle."
    },

    {
        word: "Packet",
        type: "noun",
        meaning: "Paket",
        example: "Add a packet of baking powder.",
        exampleTr: "Bir paket kabartma tozu ekle."
    },

    {
        word: "Traditional",
        type: "adjective",
        meaning: "Geleneksel",
        example: "This is a traditional Turkish recipe.",
        exampleTr: "Bu geleneksel bir Türk tarifidir."
    },

    {
        word: "Various",
        type: "adjective",
        meaning: "Çeşitli",
        example: "The recipe uses various vegetables.",
        exampleTr: "Tarifte çeşitli sebzeler kullanılıyor."
    },

    {
        word: "Constantly",
        type: "adverb",
        meaning: "Sürekli",
        example: "Stir the mixture constantly.",
        exampleTr: "Karışımı sürekli karıştır."
    },

    {
        word: "Dried",
        type: "adjective",
        meaning: "Kuru, kurutulmuş",
        example: "Add some dried mint to the soup.",
        exampleTr: "Çorbaya biraz kuru nane ekle."
    },

    {
        word: "Plant",
        type: "noun",
        meaning: "Bitki",
        example: "Mint is a useful plant.",
        exampleTr: "Nane faydalı bir bitkidir."
    },

    {
        word: "Presentation",
        type: "noun",
        meaning: "Sunum",
        example: "The presentation of the food is important.",
        exampleTr: "Yemeğin sunumu önemlidir."
    },

    {
        word: "Taste",
        type: "verb",
        meaning: "Tadına bakmak",
        example: "Taste the soup before serving it.",
        exampleTr: "Servis etmeden önce çorbanın tadına bak."
    },

    {
        word: "Warm",
        type: "adjective",
        meaning: "Ilık, sıcak",
        example: "Serve the bread while it is warm.",
        exampleTr: "Ekmeği sıcakken servis et."
    },

    {
        word: "Preheated",
        type: "adjective",
        meaning: "Önceden ısıtılmış",
        example: "Put the cake in the preheated oven.",
        exampleTr: "Keki önceden ısıtılmış fırına koy."
    },

    {
        word: "Mixture",
        type: "noun",
        meaning: "Karışım",
        example: "Pour the mixture into the pan.",
        exampleTr: "Karışımı tavaya dök."
    },

    {
        word: "Surface",
        type: "noun",
        meaning: "Yüzey",
        example: "Put the dough on a clean surface.",
        exampleTr: "Hamuru temiz bir yüzeye koy."
    },

    {
        word: "Tex-Mex",
        type: "noun",
        meaning: "Teksas-Meksika mutfağı",
        example: "Tex-Mex cuisine is popular in many places.",
        exampleTr: "Tex-Mex mutfağı birçok yerde popülerdir."
    },

    {
        word: "Workshop",
        type: "noun",
        meaning: "Atölye, seminer",
        example: "We joined a cooking workshop.",
        exampleTr: "Bir yemek yapma atölyesine katıldık."
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
        "unit3"
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
                "No Unit 3 progress found."
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
            "Unit 3 progress loaded:",
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
                    `Unit 3 Vocabulary - ${learnedWordCount} words learned`,

                icon: "📚",

                date:
                    serverTimestamp()
            }
        );


        unitXPRewarded = true;


        console.log(
            `⭐ Unit 3 completed: +${totalXP} XP`
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
                    Unit 3 Complete
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