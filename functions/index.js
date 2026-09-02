const { onRequest } =
    require("firebase-functions/v2/https");

const { defineSecret } =
    require("firebase-functions/params");

const { GoogleGenAI } =
    require("@google/genai");

const admin =
    require("firebase-admin");


// ========================================
// FIREBASE ADMIN
// ========================================

admin.initializeApp();

const db =
    admin.firestore();


// ========================================
// GEMINI SECRET
// ========================================

const geminiApiKey =
    defineSecret("GEMINI_API_KEY");


// ========================================
// PAYMENT SECRETS
// ========================================
//
// PayTR bilgilerini frontend'e koyma.
// Bunlar daha sonra Firebase Secrets
// olarak tanımlanacak.
//
// PAYTR_MERCHANT_ID
// PAYTR_MERCHANT_KEY
// PAYTR_MERCHANT_SALT
//
// ========================================

// PayTR secrets şimdilik tanımlanmıyor.
// PayTR hesabı hazır olduğunda tekrar eklenecek.

// ========================================
// PLAN PRICES
// ========================================
//
// Fiyatın güvenilir kaynağı backend olmalı.
// Frontend'den gelen fiyata güvenme.
//
// 69 TL  = 6900 kuruş
// 599 TL = 59900 kuruş
//
// ========================================

const PLANS = {

    monthly: {
        name: "Monthly",
        price: 69,
        amount: 6900,
        durationMonths: 1
    },

    yearly: {
        name: "Yearly",
        price: 599,
        amount: 59900,
        durationMonths: 12
    }

};


// ========================================
// LEXI AI TEACHER
// ========================================

exports.lexiChat = onRequest(

    {
        secrets: [geminiApiKey],
        cors: true
    },

    async (req, res) => {

        try {

            // ========================================
            // ONLY POST
            // ========================================

            if (req.method !== "POST") {

                return res.status(405).json({
                    error: "Method not allowed"
                });

            }


            // ========================================
            // API KEY
            // ========================================

            const apiKey =
                geminiApiKey.value();

            if (!apiKey) {

                console.error(
                    "GEMINI_API_KEY is missing."
                );

                return res.status(500).json({
                    error:
                        "Gemini API key is not configured."
                });

            }


            // ========================================
            // REQUEST DATA
            // ========================================

            const {
                message,
                conversation
            } = req.body || {};


            // ========================================
            // VALIDATE MESSAGE
            // ========================================

            if (
                typeof message !== "string" ||
                !message.trim()
            ) {

                return res.status(400).json({
                    error:
                        "Message is required"
                });

            }


            const currentMessage =
                message.trim();


            // ========================================
            // GEMINI CLIENT
            // ========================================

            const ai =
                new GoogleGenAI({
                    apiKey: apiKey
                });


            // ========================================
            // LEXI SYSTEM PROMPT
            // ========================================

            const systemPrompt = `

You are Lexi, a natural and intelligent AI English teacher for Turkish 8th-grade students.

LANGUAGE:
- Speak Turkish by default.
- If the student clearly speaks English, respond in English.
- If the student mixes Turkish and English, follow the student's natural language.

CONVERSATION:
- Always respond ONLY to the student's latest message.
- Carefully use previous messages only to understand context.
- Never answer an older message again.
- Never repeat an answer that has already been given.
- Never pretend that the student asked something they did not ask.
- Never restart the conversation unnecessarily.
- Do not greet the student unless the student is greeting you or the conversation is genuinely starting.
- Do not say "Ben de iyiyim, teşekkürler" unless the student actually asks how you are.
- Do not automatically turn casual conversation into an English lesson.
- Do not force grammar explanations, vocabulary exercises, quizzes, or LGS questions.
- Do not ask a question at the end of every response.

NATURALNESS:
- Talk like a friendly, intelligent human teacher.
- Avoid robotic, repetitive or scripted responses.
- Keep casual conversation natural.
- Match the student's tone.
- If the student says something simple, give a natural response rather than an unnecessary long explanation.
- Do not repeat information the student already knows.
- Do not start every answer with the student's name.
- Do not start every answer with "Tabii", "Elbette", "Kesinlikle" or similar filler phrases.

ENGLISH TEACHING:
- When the student asks for English help, explain clearly at an appropriate 8th-grade level.
- When useful, give short examples.
- For LGS-style questions, focus on meaning, context, reading and reasoning rather than memorization.
- If the student makes an English mistake during a conversation, correct it only when useful or when the student asks for correction.

MOST IMPORTANT RULE:
The student's CURRENT message is the message you must answer.
Previous conversation is context, NOT a list of unanswered questions.

GÜNCEL BİLGİLER:

Kullanıcı güncel, anlık veya değişebilen bir bilgi sorarsa Google Search aracını kullan.

Özellikle:
- hava durumu
- güncel haberler
- spor sonuçları
- güncel fiyatlar
- döviz kurları
- bugün / şu an / son dakika bilgileri
- güncel etkinlikler
- yakın zamanda gerçekleşen olaylar

gibi konularda tahmin yapma. Önce Google Search ile güncel bilgiyi kontrol et.

Güncel bilgi gerektirmeyen eğitim sorularında gereksiz yere arama yapma.

`;


            // ========================================
            // BUILD CLEAN HISTORY
            // ========================================

            let history = [];


            if (Array.isArray(conversation)) {

                history =
                    conversation
                        .filter(item => {

                            if (!item) {
                                return false;
                            }

                            if (
                                typeof item.text !== "string"
                            ) {
                                return false;
                            }

                            if (
                                !item.text.trim()
                            ) {
                                return false;
                            }

                            if (
                                item.sender !== "user" &&
                                item.sender !== "model"
                            ) {
                                return false;
                            }

                            return true;

                        })
                        .map(item => ({

                            sender:
                                item.sender,

                            text:
                                item.text.trim()

                        }));

            }


            // ========================================
            // REMOVE DUPLICATE CONSECUTIVE MESSAGES
            // ========================================

            const cleanedHistory = [];

            for (const item of history) {

                const previous =
                    cleanedHistory[
                        cleanedHistory.length - 1
                    ];

                if (
                    previous &&
                    previous.sender === item.sender &&
                    previous.text === item.text
                ) {

                    continue;

                }

                cleanedHistory.push(item);

            }


            // ========================================
            // IMPORTANT:
            // CURRENT MESSAGE MUST NOT EXIST
            // TWICE IN HISTORY
            // ========================================

            let previousMessages =
                cleanedHistory;


            /*
             * If the frontend already placed the current
             * user message into conversation, remove that
             * final occurrence.
             *
             * We only remove the LAST user occurrence
             * when it is exactly the current message.
             */

            if (
                previousMessages.length > 0
            ) {

                const lastMessage =
                    previousMessages[
                        previousMessages.length - 1
                    ];

                if (
                    lastMessage.sender === "user" &&
                    lastMessage.text === currentMessage
                ) {

                    previousMessages =
                        previousMessages.slice(
                            0,
                            -1
                        );

                }

            }


            // ========================================
            // KEEP RECENT CONTEXT
            // ========================================

            previousMessages =
                previousMessages.slice(-20);


            // ========================================
            // BUILD GEMINI CONTENTS
            // ========================================

            const contents = [];


            for (
                const item of previousMessages
            ) {

                const role =
                    item.sender === "user"
                        ? "user"
                        : "model";


                const text =
                    item.text;


                const last =
                    contents[
                        contents.length - 1
                    ];


                // ========================================
                // MERGE SAME ROLES
                // ========================================

                if (
                    last &&
                    last.role === role
                ) {

                    last.parts[0].text +=
                        "\n" + text;

                    continue;

                }


                contents.push({

                    role:

                        role,

                    parts: [

                        {
                            text:
                                text
                        }

                    ]

                });

            }


            // ========================================
            // GEMINI CANNOT START WITH MODEL
            // ========================================

            while (
                contents.length > 0 &&
                contents[0].role === "model"
            ) {

                contents.shift();

            }


            // ========================================
            // ADD CURRENT USER MESSAGE
            // ========================================

            const lastContent =
                contents[
                    contents.length - 1
                ];


            if (
                !lastContent ||
                lastContent.role !== "user"
            ) {

                contents.push({

                    role:
                        "user",

                    parts: [

                        {
                            text:
                                currentMessage
                        }

                    ]

                });

            }

            else {

                /*
                 * The last content can only be a user
                 * message if the previous conversation
                 * ended with a user message.
                 *
                 * We must NOT accidentally append the
                 * same message twice.
                 */

                const lastText =
                    lastContent.parts?.[0]?.text
                    ?.trim() || "";


                if (
                    lastText !== currentMessage
                ) {

                    contents.push({

                        role:
                            "user",

                        parts: [

                            {
                                text:
                                    currentMessage
                            }

                        ]

                    });

                }

            }


            // ========================================
            // SAFETY CHECK
            // ========================================

            if (
                contents.length === 0
            ) {

                return res.status(400).json({

                    error:
                        "Conversation is empty."

                });

            }


            // ========================================
            // DEBUG
            // ========================================

            console.log(
                "================================"
            );

            console.log(
                "LEXI REQUEST"
            );

            console.log(
                "History messages:",
                previousMessages.length
            );

            console.log(
                "Gemini messages:",
                contents.length
            );

            console.log(
                "Current message:",
                currentMessage
            );

            console.log(
                "Last Gemini role:",
                contents[
                    contents.length - 1
                ]?.role
            );

            console.log(
                "================================"
            );


            // ========================================
            // GEMINI REQUEST
            // ========================================

            console.time(
                "LEXI GEMINI GENERATION"
            );


            const response =
    await ai.models.generateContent({

        model:
            "gemini-3.6-flash",

        contents:
            contents,

        config: {

            systemInstruction:
                systemPrompt,

            tools: [
                {
                    googleSearch: {}
                }
            ],

            maxOutputTokens:
                700

        }

    });


            console.timeEnd(
                "LEXI GEMINI GENERATION"
            );


            // ========================================
            // GET RESPONSE
            // ========================================

            const reply =
                response?.text?.trim();


            console.log(
                "LEXI RESPONSE:",
                reply
            );


            // ========================================
            // EMPTY RESPONSE
            // ========================================

            if (!reply) {

                console.error(
                    "Gemini returned an empty response."
                );

                return res.status(500).json({

                    error:
                        "Lexi could not generate a response."

                });

            }


            // ========================================
            // SUCCESS
            // ========================================

            return res.status(200).json({

                reply:
                    reply

            });

        }


        // ========================================
        // ERROR
        // ========================================

        catch (error) {

            console.error(
                "================================"
            );

            console.error(
                "LEXI GEMINI ERROR"
            );

            console.error(
                "MESSAGE:",
                error?.message
            );

            console.error(
                "STACK:",
                error?.stack
            );

            console.error(
                "FULL ERROR:",
                error
            );

            console.error(
                "================================"
            );


            return res.status(500).json({

                error:
                    error?.message ||
                    "Lexi is temporarily unavailable."

            });

        }

    }

);

// ==================================================
// PAYMENT — CREATE ORDER
// ==================================================
//
// Bu endpoint şu anda yalnızca güvenli bir
// sipariş kaydı oluşturmak için iskelet olarak
// hazırlanmıştır.
//
// GERÇEK ÖDEME SONUCU BURADA PREMIUM VERMEZ.
//
// ==================================================

exports.createPaymentOrder = onRequest({

    cors: true
},

    async (req, res) => {

        try {

            // ========================================
            // ONLY POST
            // ========================================

            if (req.method !== "POST") {

                return res.status(405).json({

                    error:
                        "Method not allowed"

                });

            }


            // ========================================
            // REQUEST
            // ========================================

            const {
                uid,
                plan
            } = req.body || {};


            // ========================================
            // VALIDATE USER
            // ========================================

            if (
                typeof uid !== "string" ||
                !uid.trim()
            ) {

                return res.status(400).json({

                    error:
                        "User ID is required."

                });

            }


            // ========================================
            // VALIDATE PLAN
            // ========================================

            if (
                typeof plan !== "string" ||
                !PLANS[plan]
            ) {

                return res.status(400).json({

                    error:
                        "Invalid payment plan."

                });

            }


            const selectedPlan =
                PLANS[plan];


            // ========================================
            // ORDER ID
            // ========================================

            const orderRef =
                db.collection("paymentOrders").doc();


            const orderId =
                orderRef.id;


            // ========================================
            // ORDER DATA
            // ========================================

            const orderData = {

                orderId:

                    orderId,

                userId:

                    uid,

                plan:

                    plan,

                planName:

                    selectedPlan.name,

                amount:

                    selectedPlan.amount,

                price:

                    selectedPlan.price,

                currency:

                    "TRY",

                durationMonths:

                    selectedPlan.durationMonths,

                status:

                    "pending",

                createdAt:

                    admin.firestore.FieldValue
                        .serverTimestamp(),

                paidAt:

                    null,

                premiumActivated:

                    false

            };


            // ========================================
            // SAVE ORDER
            // ========================================

            await orderRef.set(
                orderData
            );


            // ========================================
            // IMPORTANT
            // ========================================
            //
            // Gerçek PayTR token/checkout oluşturma
            // burada yetkili ödeme hesabının server-side
            // entegrasyonu ile yapılmalıdır.
            //
            // Frontend'e Merchant Key/Salt gönderilmez.
            //
            // ========================================


            return res.status(200).json({

                success:
                    true,

                orderId:
                    orderId,

                plan:
                    selectedPlan.name,

                amount:
                    selectedPlan.amount,

                message:
                    "Payment order created."

            });


        }

        catch (error) {

            console.error(
                "PAYMENT ORDER ERROR:",
                error
            );


            return res.status(500).json({

                error:
                    "Unable to create payment order."

            });

        }

    }

);


// ==================================================
// PAYMENT — CALLBACK PLACEHOLDER
// ==================================================
//
// PayTR'nin ödeme bildirimi geldiğinde burada:
//
// 1. Callback doğrulanır
// 2. Sipariş bulunur
// 3. Tutar doğrulanır
// 4. Sipariş daha önce işlenmiş mi kontrol edilir
// 5. Başarılı ödeme ise Premium aktive edilir
//
// Şimdilik endpoint güvenli şekilde
// placeholder olarak duruyor.
//
// ==================================================

exports.paymentCallback = onRequest({

    cors: false
},

    async (req, res) => {

        try {

            // ========================================
            // PAYTR CALLBACK
            // ========================================

            if (req.method !== "POST") {

                return res.status(405).send(
                    "Method Not Allowed"
                );

            }


            console.log(
                "Payment callback received."
            );


            /*
                GERÇEK CALLBACK DOĞRULAMASI
                BURADA YAPILACAK.

                Özellikle:

                - merchant_oid
                - status
                - total_amount
                - hash

                doğrulanmadan Premium verilmemeli.
            */


            return res.status(200).send(
                "OK"
            );


        }

        catch (error) {

            console.error(
                "PAYMENT CALLBACK ERROR:",
                error
            );


            return res.status(500).send(
                "ERROR"
            );

        }

    }

);