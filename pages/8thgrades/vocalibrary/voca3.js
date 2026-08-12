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
    word: "Add",
    type: "verb",
    meaning: "Eklemek",
    example: "Add some salt to the soup.",
    exampleTr: "Çorbaya biraz tuz ekle."
},

{
    word: "Fatty",
    type: "adjective",
    meaning: "Yağlı",
    example: "I don't like fatty food.",
    exampleTr: "Yağlı yiyecekleri sevmiyorum."
},

{
    word: "After",
    type: "conjunction",
    meaning: "Yaptıktan sonra",
    example: "Wash your hands after cooking.",
    exampleTr: "Yemek yaptıktan sonra ellerini yıka."
},

{
    word: "Apple pie",
    type: "noun",
    meaning: "Elmalı turta",
    example: "My mother makes delicious apple pie.",
    exampleTr: "Annem lezzetli elmalı turta yapar."
},

{
    word: "Fish",
    type: "noun",
    meaning: "Balık",
    example: "We usually eat fish on Fridays.",
    exampleTr: "Cuma günleri genellikle balık yeriz."
},

{
    word: "Cuisine",
    type: "noun",
    meaning: "Mutfak kültürü",
    example: "I really enjoy Asian cuisine.",
    exampleTr: "Asya mutfağından gerçekten hoşlanıyorum."
},

{
    word: "Flavor",
    type: "noun",
    meaning: "Tat, lezzet",
    example: "This sauce has a delicious flavor.",
    exampleTr: "Bu sosun lezzetli bir tadı var."
},

{
    word: "Flour",
    type: "noun",
    meaning: "Un",
    example: "Add two cups of flour to the bowl.",
    exampleTr: "Kaseye iki fincan un ekle."
},

{
    word: "Baking powder",
    type: "noun",
    meaning: "Kabartma tozu",
    example: "Add some baking powder to the flour.",
    exampleTr: "Una biraz kabartma tozu ekle."
},

{
    word: "Baking tray",
    type: "noun",
    meaning: "Fırın tepsisi",
    example: "Put the cookies on the baking tray.",
    exampleTr: "Kurabiyeleri fırın tepsisine koy."
},

{
    word: "Banana",
    type: "noun",
    meaning: "Muz",
    example: "I eat a banana every morning.",
    exampleTr: "Her sabah bir muz yerim."
},

{
    word: "Fork",
    type: "noun",
    meaning: "Çatal",
    example: "Use a fork to eat the salad.",
    exampleTr: "Salatayı yemek için çatal kullan."
},

{
    word: "Freezer",
    type: "noun",
    meaning: "Dondurucu",
    example: "Keep the meat in the freezer.",
    exampleTr: "Eti dondurucuda sakla."
},

{
    word: "Bitter",
    type: "adjective",
    meaning: "Acı, buruk",
    example: "Dark chocolate can taste bitter.",
    exampleTr: "Bitter çikolatanın tadı acı olabilir."
},

{
    word: "Fruit",
    type: "noun",
    meaning: "Meyve",
    example: "Eating fresh fruit is healthy.",
    exampleTr: "Taze meyve yemek sağlıklıdır."
},

{
    word: "Black pepper",
    type: "noun",
    meaning: "Karabiber",
    example: "Add some black pepper to the soup.",
    exampleTr: "Çorbaya biraz karabiber ekle."
},

{
    word: "Fry",
    type: "verb",
    meaning: "Kızartmak",
    example: "Fry the potatoes in hot oil.",
    exampleTr: "Patatesleri kızgın yağda kızart."
},

{
    word: "Blueberries",
    type: "noun",
    meaning: "Yaban mersini",
    example: "I like eating blueberries with yogurt.",
    exampleTr: "Yoğurtla yaban mersini yemeyi severim."
},

{
    word: "Garlic",
    type: "noun",
    meaning: "Sarımsak",
    example: "Add some garlic to the sauce.",
    exampleTr: "Sosa biraz sarımsak ekle."
},

{
    word: "Boil",
    type: "verb",
    meaning: "Suda kaynatmak",
    example: "Boil the eggs for ten minutes.",
    exampleTr: "Yumurtaları on dakika kaynat."
},

{
    word: "Bottle",
    type: "noun",
    meaning: "Şişe",
    example: "There is a bottle of water on the table.",
    exampleTr: "Masanın üzerinde bir şişe su var."
},

{
    word: "Ginger",
    type: "noun",
    meaning: "Zencefil",
    example: "Add some ginger to the tea.",
    exampleTr: "Çaya biraz zencefil ekle."
},

{
    word: "Bowl",
    type: "noun",
    meaning: "Kase",
    example: "Put the flour in a large bowl.",
    exampleTr: "Unu büyük bir kaseye koy."
},

{
    word: "Bread",
    type: "noun",
    meaning: "Ekmek",
    example: "We need some fresh bread.",
    exampleTr: "Biraz taze ekmeğe ihtiyacımız var."
},

{
    word: "Grape",
    type: "noun",
    meaning: "Üzüm",
    example: "These grapes are very sweet.",
    exampleTr: "Bu üzümler çok tatlı."
},

{
    word: "Grate",
    type: "verb",
    meaning: "Rendelemek",
    example: "Grate the cheese into the bowl.",
    exampleTr: "Peyniri kasenin içine rendele."
},

{
    word: "Bunch",
    type: "noun",
    meaning: "Demet",
    example: "I bought a bunch of bananas.",
    exampleTr: "Bir demet muz aldım."
},

{
    word: "Grater",
    type: "noun",
    meaning: "Rende",
    example: "Use a grater to grate the cheese.",
    exampleTr: "Peyniri rendelemek için rende kullan."
},

{
    word: "Butter",
    type: "noun",
    meaning: "Tereyağı",
    example: "Spread some butter on the bread.",
    exampleTr: "Ekmeğin üzerine biraz tereyağı sür."
},

{
    word: "Greasy",
    type: "adjective",
    meaning: "Yağlı",
    example: "I don't like greasy food.",
    exampleTr: "Yağlı yiyecekleri sevmiyorum."
},

{
    word: "Cake",
    type: "noun",
    meaning: "Kek",
    example: "She baked a chocolate cake.",
    exampleTr: "Çikolatalı bir kek pişirdi."
},

{
    word: "Onion",
    type: "noun",
    meaning: "Soğan",
    example: "Add some onion to the salad.",
    exampleTr: "Salataya biraz soğan ekle."
},

{
    word: "Cake pan",
    type: "noun",
    meaning: "Kek kalıbı",
    example: "Pour the mixture into the cake pan.",
    exampleTr: "Karışımı kek kalıbına dök."
},

{
    word: "Grill",
    type: "verb",
    meaning: "Izgara yapmak",
    example: "We grill chicken in the garden.",
    exampleTr: "Bahçede tavuk ızgara yaparız."
},


{
    word: "Carrot",
    type: "noun",
    meaning: "Havuç",
    example: "Cut the carrot into small pieces.",
    exampleTr: "Havucu küçük parçalara kes."
},

{
    word: "Half",
    type: "noun",
    meaning: "Yarım, yarısı",
    example: "Add half a cup of milk.",
    exampleTr: "Yarım fincan süt ekle."
},

{
    word: "Cheese",
    type: "noun",
    meaning: "Peynir",
    example: "I like cheese with my breakfast.",
    exampleTr: "Kahvaltımda peyniri severim."
},

{
    word: "Chef",
    type: "noun",
    meaning: "Şef, aşçı",
    example: "The chef prepared a delicious meal.",
    exampleTr: "Şef lezzetli bir yemek hazırladı."
},

{
    word: "Hazelnut",
    type: "noun",
    meaning: "Fındık",
    example: "Add some hazelnuts to the cake.",
    exampleTr: "Keke biraz fındık ekle."
},

{
    word: "Cherry",
    type: "noun",
    meaning: "Kiraz",
    example: "I love eating fresh cherries.",
    exampleTr: "Taze kiraz yemeyi çok severim."
},

{
    word: "Healthy",
    type: "adjective",
    meaning: "Sağlıklı",
    example: "Fresh vegetables are healthy.",
    exampleTr: "Taze sebzeler sağlıklıdır."
},

{
    word: "Chicken",
    type: "noun",
    meaning: "Tavuk",
    example: "We are cooking chicken for dinner.",
    exampleTr: "Akşam yemeği için tavuk pişiriyoruz."
},

{
    word: "Heat",
    type: "verb",
    meaning: "Isıtmak",
    example: "Heat the oil in a pan.",
    exampleTr: "Yağı bir tavada ısıt."
},

{
    word: "Pepper",
    type: "noun",
    meaning: "Biber",
    example: "Add a pepper to the sauce.",
    exampleTr: "Sosa bir biber ekle."
},

{
    word: "Homemade",
    type: "adjective",
    meaning: "Ev yapımı",
    example: "I love homemade cookies.",
    exampleTr: "Ev yapımı kurabiyeleri çok severim."
},

{
    word: "Chop",
    type: "verb",
    meaning: "Küçük doğramak",
    example: "Chop the onions into small pieces.",
    exampleTr: "Soğanları küçük parçalar halinde doğra."
},

{
    word: "Honey",
    type: "noun",
    meaning: "Bal",
    example: "I like honey in my tea.",
    exampleTr: "Çayımda balı severim."
},

{
    word: "How long?",
    type: "phrase",
    meaning: "Ne kadar süre?",
    example: "How long should I cook the chicken?",
    exampleTr: "Tavuğu ne kadar süre pişirmeliyim?"
},

{
    word: "Coconut",
    type: "noun",
    meaning: "Hindistan cevizi",
    example: "Add some coconut to the cake.",
    exampleTr: "Keke biraz Hindistan cevizi ekle."
},

{
    word: "Ice cream",
    type: "noun",
    meaning: "Dondurma",
    example: "I love eating ice cream in summer.",
    exampleTr: "Yazın dondurma yemeyi çok severim."
},

{
    word: "Ingredients",
    type: "noun",
    meaning: "Malzemeler",
    example: "Check all the ingredients before cooking.",
    exampleTr: "Yemek yapmadan önce tüm malzemeleri kontrol et."
},

{
    word: "Constantly",
    type: "adverb",
    meaning: "Sürekli",
    example: "Stir the mixture constantly.",
    exampleTr: "Karışımı sürekli karıştır."
},

{
    word: "Cook",
    type: "verb",
    meaning: "Pişirmek",
    example: "I cook dinner for my family.",
    exampleTr: "Ailem için akşam yemeği pişiririm."
},

{
    word: "Recipe",
    type: "noun",
    meaning: "Tarif",
    example: "Give the recipe of this soup, please.",
    exampleTr: "Bu çorbanın tarifini ver, lütfen."
},

{
    word: "Cooking",
    type: "noun",
    meaning: "Pişirme, yemek yapma",
    example: "Cooking is my favorite hobby.",
    exampleTr: "Yemek yapmak en sevdiğim hobimdir."
},

{
    word: "Kitchen",
    type: "noun",
    meaning: "Mutfak",
    example: "My mother is in the kitchen.",
    exampleTr: "Annem mutfakta."
},

{
    word: "Cooking methods",
    type: "noun",
    meaning: "Pişirme yöntemleri",
    example: "There are many different cooking methods.",
    exampleTr: "Birçok farklı pişirme yöntemi vardır."
},

{
    word: "Knead",
    type: "verb",
    meaning: "Yoğurmak",
    example: "Knead the dough for five minutes.",
    exampleTr: "Hamuru beş dakika yoğur."
},

{
    word: "Corn",
    type: "noun",
    meaning: "Mısır",
    example: "Add some corn to the salad.",
    exampleTr: "Salataya biraz mısır ekle."
},

{
    word: "Knife",
    type: "noun",
    meaning: "Bıçak",
    example: "Be careful with the knife.",
    exampleTr: "Bıçakla dikkatli ol."
},

{
    word: "Cover",
    type: "verb",
    meaning: "Kapatmak, üzerini örtmek",
    example: "Cover the bowl with a lid.",
    exampleTr: "Kâsenin üzerini bir kapakla kapat."
},

{
    word: "Lemon juice",
    type: "noun",
    meaning: "Limon suyu",
    example: "Add some lemon juice to the salad.",
    exampleTr: "Salataya biraz limon suyu ekle."
},

{
    word: "Crack",
    type: "verb",
    meaning: "Kırmak",
    example: "Crack two eggs into the bowl.",
    exampleTr: "Kaseye iki yumurta kır."
},

{
    word: "Lengthwise",
    type: "adverb",
    meaning: "Boylamasına",
    example: "Cut the cucumber lengthwise.",
    exampleTr: "Salatalığı boylamasına kes."
},

{
    word: "Cranberries",
    type: "noun",
    meaning: "Turna yemişi",
    example: "I like adding cranberries to my salad.",
    exampleTr: "Salatama turna yemişi eklemeyi severim."
},

{
    word: "Lentil",
    type: "noun",
    meaning: "Mercimek",
    example: "Lentil soup is very popular in Türkiye.",
    exampleTr: "Mercimek çorbası Türkiye'de çok popülerdir."
},

{
    word: "Crazy about",
    type: "adjective",
    meaning: "Tutkun olmak, çok sevmek",
    example: "She is crazy about chocolate cake.",
    exampleTr: "O, çikolatalı keke bayılır."
},

{
    word: "Marinate",
    type: "verb",
    meaning: "Terbiyelemek, marine etmek",
    example: "Marinate the chicken before cooking it.",
    exampleTr: "Tavuğu pişirmeden önce marine et."
},

{
    word: "Cream",
    type: "noun",
    meaning: "Krema",
    example: "Add some cream to the soup.",
    exampleTr: "Çorbaya biraz krema ekle."
},

{
    word: "Mash",
    type: "verb",
    meaning: "Ezmek",
    example: "Mash the potatoes with a fork.",
    exampleTr: "Patatesleri çatalla ez."
},

{
    word: "Crush",
    type: "verb",
    meaning: "Ezmek, ufalamak",
    example: "Crush the biscuits into small pieces.",
    exampleTr: "Bisküvileri küçük parçalara ufala."
},

{
    word: "Mat",
    type: "noun",
    meaning: "Hasır, mat",
    example: "Put the hot dish on the mat.",
    exampleTr: "Sıcak yemeği matın üzerine koy."
},

{
    word: "Cucumber",
    type: "noun",
    meaning: "Salatalık",
    example: "Slice the cucumber for the salad.",
    exampleTr: "Salatalığı salata için dilimle."
},

{
    word: "Match",
    type: "verb",
    meaning: "Eşleştirmek, uymak",
    example: "Match the ingredients with the pictures.",
    exampleTr: "Malzemeleri resimlerle eşleştir."
},

{
    word: "Cumin",
    type: "noun",
    meaning: "Kimyon",
    example: "Add some cumin to the meatballs.",
    exampleTr: "Köftelere biraz kimyon ekle."
},

{
    word: "Meal",
    type: "noun",
    meaning: "Yemek, öğün",
    example: "We have three meals a day.",
    exampleTr: "Günde üç öğün yemek yeriz."
},

{
    word: "Cup",
    type: "noun",
    meaning: "Fincan, kupa",
    example: "Add one cup of milk.",
    exampleTr: "Bir fincan süt ekle."
},

{
    word: "Meat",
    type: "noun",
    meaning: "Et",
    example: "We don't eat much meat.",
    exampleTr: "Çok fazla et yemeyiz."
},

{
    word: "Cut",
    type: "verb",
    meaning: "Kesmek",
    example: "Cut the bread into small pieces.",
    exampleTr: "Ekmeği küçük parçalara kes."
},

{
    word: "Meatball",
    type: "noun",
    meaning: "Köfte",
    example: "My mother makes delicious meatballs.",
    exampleTr: "Annem lezzetli köfteler yapar."
},

{
    word: "Dessert",
    type: "noun",
    meaning: "Tatlı",
    example: "We had ice cream for dessert.",
    exampleTr: "Tatlı olarak dondurma yedik."
},

{
    word: "Microwave",
    type: "noun",
    meaning: "Mikrodalga fırın",
    example: "Heat the food in the microwave.",
    exampleTr: "Yemeği mikrodalga fırında ısıt."
},

{
    word: "Dice",
    type: "verb",
    meaning: "Küp küp doğramak",
    example: "Dice the tomatoes into small pieces.",
    exampleTr: "Domatesleri küçük küpler halinde doğra."
},

{
    word: "Milk",
    type: "noun",
    meaning: "Süt",
    example: "I drink a glass of milk every morning.",
    exampleTr: "Her sabah bir bardak süt içerim."
},

{
    word: "Drain",
    type: "verb",
    meaning: "Süzmek",
    example: "Drain the pasta after boiling it.",
    exampleTr: "Makarnayı kaynattıktan sonra süz."
},

{
    word: "Milky",
    type: "adjective",
    meaning: "Sütlü",
    example: "I like milky coffee.",
    exampleTr: "Sütlü kahveyi severim."
},

{
    word: "Dish",
    type: "noun",
    meaning: "Yemek, bulaşık",
    example: "This is my favorite dish.",
    exampleTr: "Bu benim en sevdiğim yemek."
},

{
    word: "Mince",
    type: "verb",
    meaning: "Kıyma haline getirmek",
    example: "Mince the meat before making meatballs.",
    exampleTr: "Köfte yapmadan önce eti kıyma haline getir."
},

{
    word: "Dough",
    type: "noun",
    meaning: "Hamur",
    example: "The dough needs to rest for ten minutes.",
    exampleTr: "Hamurun on dakika dinlenmesi gerekiyor."
},

{
    word: "Mint",
    type: "noun",
    meaning: "Nane",
    example: "Add some fresh mint to the salad.",
    exampleTr: "Salataya biraz taze nane ekle."
},

{
    word: "Dried",
    type: "adjective",
    meaning: "Kuru, kurutulmuş",
    example: "Add some dried fruit to the cake.",
    exampleTr: "Keke biraz kuru meyve ekle."
},

{
    word: "Minute",
    type: "noun",
    meaning: "Dakika",
    example: "Cook the rice for twenty minutes.",
    exampleTr: "Pirinci yirmi dakika pişir."
},

{
    word: "Egg",
    type: "noun",
    meaning: "Yumurta",
    example: "Crack an egg into the bowl.",
    exampleTr: "Kaseye bir yumurta kır."
},

{
    word: "Mix / Stir",
    type: "verb",
    meaning: "Karıştırmak",
    example: "Mix the ingredients well.",
    exampleTr: "Malzemeleri iyice karıştır."
},

{
    word: "Extract",
    type: "verb",
    meaning: "Çıkarmak, özünü çıkarmak",
    example: "Extract the juice from the lemon.",
    exampleTr: "Limonun suyunu çıkar."
},

{
    word: "Mixture",
    type: "noun",
    meaning: "Karışım",
    example: "Pour the mixture into the cake pan.",
    exampleTr: "Karışımı kek kalıbına dök."
},

{
    word: "Eye-catching",
    type: "adjective",
    meaning: "Göz alıcı, dikkat çekici",
    example: "The cake has an eye-catching design.",
    exampleTr: "Kekin göz alıcı bir tasarımı var."
},

{
    word: "Oil",
    type: "noun",
    meaning: "Yağ",
    example: "Heat some oil in a pan.",
    exampleTr: "Bir tavada biraz yağ ısıt."
},

{
    word: "Olive",
    type: "noun",
    meaning: "Zeytin",
    example: "I like eating olives for breakfast.",
    exampleTr: "Kahvaltıda zeytin yemeyi severim."
},

{
    word: "Step",
    type: "noun",
    meaning: "Adım, aşama",
    example: "Follow each step of the recipe carefully.",
    exampleTr: "Tarifin her adımını dikkatlice takip et."
},

{
    word: "Olive oil",
    type: "noun",
    meaning: "Zeytinyağı",
    example: "Add some olive oil to the salad.",
    exampleTr: "Salataya biraz zeytinyağı ekle."
},

{
    word: "Spoon",
    type: "verb",
    meaning: "Kaşık",
    example: "Stir the soup with a spoon.",
    exampleTr: "Çorbayı kaşıkla karıştır."
},

{
    word: "Omelet",
    type: "noun",
    meaning: "Omlet",
    example: "I usually have an omelet for breakfast.",
    exampleTr: "Kahvaltıda genellikle omlet yerim."
},

{
    word: "Strainer",
    type: "noun",
    meaning: "Süzgeç",
    example: "Use a strainer to drain the pasta.",
    exampleTr: "Makarnayı süzmek için süzgeç kullan."
},

{
    word: "Parsley",
    type: "noun",
    meaning: "Maydanoz",
    example: "Chop the parsley into small pieces.",
    exampleTr: "Maydanozu küçük parçalar halinde doğra."
},

{
    word: "Strawberry",
    type: "noun",
    meaning: "Çilek",
    example: "These strawberries are very sweet.",
    exampleTr: "Bu çilekler çok tatlı."
},

{
    word: "Oven",
    type: "noun",
    meaning: "Fırın",
    example: "Preheat the oven before baking the cake.",
    exampleTr: "Keki pişirmeden önce fırını önceden ısıt."
},

{
    word: "Sugar",
    type: "noun",
    meaning: "Şeker",
    example: "Add two spoons of sugar to the tea.",
    exampleTr: "Çaya iki kaşık şeker ekle."
},

{
    word: "Pan",
    type: "noun",
    meaning: "Tava",
    example: "Heat the oil in a pan.",
    exampleTr: "Yağı bir tavada ısıt."
},

{
    word: "Enjoy it",
    type: "phrase",
    meaning: "Afiyet olsun",
    example: "Enjoy your pizza.",
    exampleTr: "Pizzanız afiyet olsun."
},

{
    word: "Surface",
    type: "noun",
    meaning: "Yüzey",
    example: "Clean the kitchen surface after cooking.",
    exampleTr: "Yemek yaptıktan sonra mutfak yüzeyini temizle."
},

{
    word: "Pasta",
    type: "noun",
    meaning: "Makarna",
    example: "I often cook pasta for dinner.",
    exampleTr: "Akşam yemeği için sık sık makarna pişiririm."
},

{
    word: "Sweet",
    type: "adjective",
    meaning: "Tatlı",
    example: "This cake is too sweet.",
    exampleTr: "Bu kek çok tatlı."
},

{
    word: "Peel",
    type: "verb",
    meaning: "Soymak",
    example: "Peel the potatoes before cooking them.",
    exampleTr: "Patatesleri pişirmeden önce soy."
},

{
    word: "Sweet basil",
    type: "noun",
    meaning: "Fesleğen, reyhan",
    example: "Add some sweet basil to the pizza.",
    exampleTr: "Pizzaya biraz fesleğen ekle."
},

{
    word: "Red pepper",
    type: "noun",
    meaning: "Pul biber",
    example: "Add some red pepper to the soup.",
    exampleTr: "Çorbaya biraz pul biber ekle."
},

{
    word: "Sweet tooth",
    type: "noun",
    meaning: "Tatlıya düşkünlük",
    example: "I have a sweet tooth, so I love cakes.",
    exampleTr: "Tatlıya düşkünüm, bu yüzden kekleri severim."
},

{
    word: "Put",
    type: "verb",
    meaning: "Koymak",
    example: "Can you put some cheese in the mixture?",
    exampleTr: "Karışıma biraz peynir koyabilir misin?"
},

{
    word: "Tablespoon",
    type: "noun",
    meaning: "Yemek kaşığı",
    example: "Add one tablespoon of olive oil.",
    exampleTr: "Bir yemek kaşığı zeytinyağı ekle."
},

{
    word: "Place",
    type: "verb",
    meaning: "Koymak, yerleştirmek",
    example: "Place the vegetables on the plate.",
    exampleTr: "Sebzeleri tabağa koy."
},

{
    word: "Take part",
    type: "phrase",
    meaning: "Yer almak, katılmak",
    example: "I want to take part in the cooking competition.",
    exampleTr: "Yemek yarışmasına katılmak istiyorum."
},

{
    word: "Plant",
    type: "noun",
    meaning: "Bitki",
    example: "This plant needs plenty of water.",
    exampleTr: "Bu bitkinin bol suya ihtiyacı var."
},

{
    word: "Taste",
    type: "verb",
    meaning: "Tadına bakmak",
    example: "Taste the soup before serving it.",
    exampleTr: "Çorbayı servis etmeden önce tadına bak."
},

{
    word: "Plate",
    type: "noun",
    meaning: "Tabak",
    example: "Put the food on a clean plate.",
    exampleTr: "Yemeği temiz bir tabağa koy."
},

{
    word: "Tasty",
    type: "adjective",
    meaning: "Lezzetli",
    example: "The homemade soup is very tasty.",
    exampleTr: "Ev yapımı çorba çok lezzetli."
},

{
    word: "Popcorn",
    type: "noun",
    meaning: "Patlamış mısır",
    example: "We ate popcorn while watching the movie.",
    exampleTr: "Film izlerken patlamış mısır yedik."
},

{
    word: "Teaspoon",
    type: "noun",
    meaning: "Çay kaşığı",
    example: "Add one teaspoon of salt.",
    exampleTr: "Bir çay kaşığı tuz ekle."
},

{
    word: "Pot",
    type: "noun",
    meaning: "Geniş kap, tencere",
    example: "Put the soup in a large pot.",
    exampleTr: "Çorbayı büyük bir tencereye koy."
},

{
    word: "Tex-Mex",
    type: "noun",
    meaning: "Teksas-Meksika mutfağı",
    example: "Tex-Mex cuisine is very popular.",
    exampleTr: "Teksas-Meksika mutfağı çok popülerdir."
},

{
    word: "Potatoes",
    type: "noun",
    meaning: "Patates",
    example: "Peel the potatoes before cooking them.",
    exampleTr: "Patatesleri pişirmeden önce soy."
},

{
    word: "Tip",
    type: "noun",
    meaning: "İpucu",
    example: "Here is a useful cooking tip.",
    exampleTr: "İşte faydalı bir yemek yapma ipucu."
},

{
    word: "Pour",
    type: "verb",
    meaning: "Dökmek",
    example: "Pour the milk into the bowl.",
    exampleTr: "Sütü kasenin içine dök."
},

{
    word: "Toast",
    type: "noun",
    meaning: "Tost",
    example: "I had toast for breakfast.",
    exampleTr: "Kahvaltıda tost yedim."
},

{
    word: "Powdered sugar",
    type: "noun",
    meaning: "Pudra şekeri",
    example: "Sprinkle some powdered sugar on the cake.",
    exampleTr: "Kekin üzerine biraz pudra şekeri serp."
},

{
    word: "Prefer",
    type: "verb",
    meaning: "Tercih etmek",
    example: "I prefer homemade food.",
    exampleTr: "Ev yapımı yemekleri tercih ederim."
},

{
    word: "Traditional",
    type: "adjective",
    meaning: "Geleneksel",
    example: "This is a traditional Turkish dish.",
    exampleTr: "Bu geleneksel bir Türk yemeğidir."
},

{
    word: "Preference",
    type: "noun",
    meaning: "Tercih",
    example: "Everyone has different food preferences.",
    exampleTr: "Herkesin farklı yemek tercihleri vardır."
},

{
    word: "Unhealthy",
    type: "adjective",
    meaning: "Sağlıksız",
    example: "Eating too much fast food is unhealthy.",
    exampleTr: "Çok fazla fast food yemek sağlıksızdır."
},

{
    word: "Preheated oven",
    type: "noun",
    meaning: "Önceden ısıtılmış fırın",
    example: "Put the cake into the preheated oven.",
    exampleTr: "Keki önceden ısıtılmış fırına koy."
},

{
    word: "Vanilla",
    type: "noun",
    meaning: "Vanilya",
    example: "Add some vanilla to the cake mixture.",
    exampleTr: "Kek karışımına biraz vanilya ekle."
},

{
    word: "Prepare",
    type: "verb",
    meaning: "Hazırlamak",
    example: "I prepare breakfast for my family.",
    exampleTr: "Ailem için kahvaltı hazırlarım."
},

{
    word: "Various",
    type: "adjective",
    meaning: "Çeşitli",
    example: "The restaurant serves various dishes.",
    exampleTr: "Restoran çeşitli yemekler sunuyor."
},

{
    word: "Presentation",
    type: "noun",
    meaning: "Sunum",
    example: "The presentation of the dish looks amazing.",
    exampleTr: "Yemeğin sunumu harika görünüyor."
},

{
    word: "Vegetable",
    type: "noun",
    meaning: "Sebze",
    example: "You should eat fresh vegetables every day.",
    exampleTr: "Her gün taze sebzeler yemelisin."
},

{
    word: "Press",
    type: "verb",
    meaning: "Bastırmak",
    example: "Press the dough firmly with your hands.",
    exampleTr: "Hamura ellerinle sıkıca bastır."
},

{
    word: "Heat",
    type: "verb",
    meaning: "Isıtmak",
    example: "heat the oil in the pan.",
    exampleTr: "Yağı tavada ısıt."
},

{
    word: "Process",
    type: "noun",
    meaning: "İşlem, süreç",
    example: "Cooking can be a long process.",
    exampleTr: "Yemek yapmak uzun bir süreç olabilir."
},

{
    word: "Walnut",
    type: "noun",
    meaning: "Ceviz",
    example: "Add some walnuts to the cake.",
    exampleTr: "Keke biraz ceviz ekle."
},


{
    word: "Warm",
    type: "adjective",
    meaning: "Ilık, sıcak",
    example: "Serve the soup while it is warm.",
    exampleTr: "Çorbayı ılıkken servis et."
},


{
    word: "Watermelon",
    type: "noun",
    meaning: "Karpuz",
    example: "Watermelon is my favorite summer fruit.",
    exampleTr: "Karpuz en sevdiğim yaz meyvesidir."
},

{
    word: "Well-known",
    type: "adjective",
    meaning: "Ünlü, tanınmış",
    example: "This restaurant is well-known for its desserts.",
    exampleTr: "Bu restoran tatlılarıyla ünlüdür."
},

{
    word: "Refrigerator",
    type: "noun",
    meaning: "Buzdolabı",
    example: "Keep the milk in the refrigerator.",
    exampleTr: "Sütü buzdolabında sakla."
},

{
    word: "Whisk",
    type: "verb",
    meaning: "Çırpmak",
    example: "Whisk the eggs in a bowl.",
    exampleTr: "Yumurtaları bir kasede çırp."
},

{
    word: "Remove",
    type: "verb",
    meaning: "Çıkarmak, ayırmak",
    example: "Remove the pan from the oven.",
    exampleTr: "Tavayı fırından çıkar."
},

{
    word: "Workshop",
    type: "noun",
    meaning: "Atölye, seminer",
    example: "I joined a cooking workshop last weekend.",
    exampleTr: "Geçen hafta sonu bir yemek atölyesine katıldım."
},

{
    word: "Rice",
    type: "noun",
    meaning: "Pirinç",
    example: "Wash the rice before cooking it.",
    exampleTr: "Pirinci pişirmeden önce yıka."
},

{
    word: "Worth trying",
    type: "phrase",
    meaning: "Denemeye değer",
    example: "This recipe is definitely worth trying.",
    exampleTr: "Bu tarif kesinlikle denemeye değer."
},

{
    word: "Rice",
    type: "noun",
    meaning: "Pirinç",
    example: "We need some rice.",
    exampleTr: "Biraz pirinç lazım."
},

{
    word: "Wrap",
    type: "verb",
    meaning: "Sarmak, paketlemek",
    example: "Wrap the sandwich in some paper.",
    exampleTr: "Sandviçi biraz kâğıda sar."
},

{
    word: "Rinse",
    type: "verb",
    meaning: "Durulamak",
    example: "Rinse the vegetables before eating them.",
    exampleTr: "Sebzeleri yemeden önce durula."
},

{
    word: "Roast",
    type: "verb",
    meaning: "Fırında kızartmak",
    example: "Roast the chicken in the oven.",
    exampleTr: "Tavuğu fırında kızart."
},

{
    word: "Roll",
    type: "verb",
    meaning: "Yuvarlamak, sarmak",
    example: "Roll the dough into a thin sheet.",
    exampleTr: "Hamuru ince bir tabaka halinde aç."
},

{
    word: "Salt",
    type: "noun",
    meaning: "Tuz",
    example: "Add a little salt to the soup.",
    exampleTr: "Çorbaya biraz tuz ekle."
},

{
    word: "Salty",
    type: "adjective",
    meaning: "Tuzlu",
    example: "The soup is too salty.",
    exampleTr: "Çorba çok tuzlu."
},

{
    word: "Sauce",
    type: "noun",
    meaning: "Sos",
    example: "Pour the sauce over the pasta.",
    exampleTr: "Sosu makarnanın üzerine dök."
},

{
    word: "Saucepan",
    type: "noun",
    meaning: "Saplı tencere",
    example: "Heat the milk in a saucepan.",
    exampleTr: "Sütü saplı tencerede ısıt."
},

{
    word: "Season",
    type: "verb",
    meaning: "Baharatlamak",
    example: "Season the meat with salt and pepper.",
    exampleTr: "Eti tuz ve biberle baharatlandır."
},

{
    word: "Seaweed",
    type: "noun",
    meaning: "Su yosunu",
    example: "Seaweed is often used in Asian cuisine.",
    exampleTr: "Su yosunu Asya mutfağında sıkça kullanılır."
},

{
    word: "Serve",
    type: "verb",
    meaning: "Servis etmek",
    example: "Serve the soup while it is hot.",
    exampleTr: "Çorbayı sıcakken servis et."
},

{
    word: "Sesame oil",
    type: "noun",
    meaning: "Susam yağı",
    example: "Add a little sesame oil to the noodles.",
    exampleTr: "Eriştelere biraz susam yağı ekle."
},

{
    word: "Shape",
    type: "verb",
    meaning: "Şekillendirmek",
    example: "Shape the dough into small balls.",
    exampleTr: "Hamuru küçük toplar şeklinde şekillendir."
},

{
    word: "Share",
    type: "verb",
    meaning: "Paylaşmak",
    example: "Let's share the pizza.",
    exampleTr: "Pizzayı paylaşalım."
},

{
    word: "Slice",
    type: "verb",
    meaning: "Dilimlemek",
    example: "Slice the tomatoes thinly.",
    exampleTr: "Domatesleri ince ince dilimle."
},

{
    word: "Sour",
    type: "adjective",
    meaning: "Ekşi",
    example: "This lemon is very sour.",
    exampleTr: "Bu limon çok ekşi."
},

{
    word: "Soy sauce",
    type: "noun",
    meaning: "Soya sosu",
    example: "Add some soy sauce to the noodles.",
    exampleTr: "Eriştelere biraz soya sosu ekle."
},

{
    word: "Spicy",
    type: "adjective",
    meaning: "Baharatlı",
    example: "I don't like very spicy food.",
    exampleTr: "Çok baharatlı yemekleri sevmiyorum."
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
    word: "Steak",
    type: "noun",
    meaning: "Biftek",
    example: "He ordered a grilled steak.",
    exampleTr: "Izgara biftek sipariş etti."
},

{
    word: "Boil",
    type: "verb",
    meaning: "Haşlamak, kaynatmak",
    example: "Boil the water for 100 degree celcius.",
    exampleTr: "Suyu 100 derecede kaynat."
},

{
    word: "Steam",
    type: "verb",
    meaning: "Buharda pişirmek",
    example: "Steam the vegetables for ten minutes.",
    exampleTr: "Sebzeleri on dakika buharda pişir."
},

{
    word: "Fry",
    type: "verb",
    meaning: "Yağda kızartmak",
    example: "Fry the patatoes in the pan.",
    exampleTr: "Patatesleri tavanın içinde yağda kızart."
},

{
    word: "Bake",
    type: "verb",
    meaning: "Fırında pişirmek",
    example: "Bake the cake for 30 minutes.",
    exampleTr: "Keki 30 dakika fırında ğişir."
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