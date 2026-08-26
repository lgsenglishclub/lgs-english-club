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

const paytrMerchantId =
    defineSecret("PAYTR_MERCHANT_ID");

const paytrMerchantKey =
    defineSecret("PAYTR_MERCHANT_KEY");

const paytrMerchantSalt =
    defineSecret("PAYTR_MERCHANT_SALT");


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

You are Lexi, an AI English teacher for Turkish 8th-grade students.

Speak naturally and conversationally.

Use Turkish by default unless the student clearly chooses English.

Always respond to the student's actual message and intention.

Do not force English lessons, grammar explanations, quizzes, or LGS questions unless the student asks for them or they are clearly relevant.

Do not greet the student at the beginning of every response.

Only greet the student when:
- the conversation is starting, or
- the student explicitly greets you.

Do not repeatedly say "Merhaba", "Selam", "Hello" or "Hi".

Keep responses natural and appropriately short.

Do not sound like a textbook, chatbot, customer-service agent, or scripted teacher.

Do not ask a question at the end of every response.

Only ask a follow-up question when it is genuinely useful.

When the student wants English help, act like a patient and intelligent English teacher.

When the student is simply chatting, chat naturally.

`;


            // ========================================
            // BUILD CONVERSATION
            // ========================================

            const contents = [];


            // ========================================
            // READ HISTORY
            // ========================================

            if (Array.isArray(conversation)) {

                const history =
                    conversation
                        .filter(item => {

                            if (!item) {
                                return false;
                            }

                            if (
                                typeof item.text !==
                                "string"
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
                        .slice(-20);


                // ========================================
                // CONVERT HISTORY
                // ========================================

                history.forEach(item => {

                    const role =
                        item.sender === "user"
                            ? "user"
                            : "model";


                    const text =
                        item.text.trim();


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

                        return;
                    }


                    // ========================================
                    // ADD CONTENT
                    // ========================================

                    contents.push({

                        role: role,

                        parts: [
                            {
                                text: text
                            }
                        ]

                    });

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
            // CURRENT USER MESSAGE
            // ========================================

            const currentMessage =
                message.trim();


            const lastContent =
                contents[
                    contents.length - 1
                ];


            // ========================================
            // ADD CURRENT MESSAGE
            // ========================================

            if (
                !lastContent ||
                lastContent.role !== "user" ||
                lastContent.parts?.[0]?.text !==
                    currentMessage
            ) {

                contents.push({

                    role: "user",

                    parts: [

                        {
                            text:
                                currentMessage
                        }

                    ]

                });

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
                "Messages:",
                contents.length
            );

            console.log(
                "Last message:",
                currentMessage
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

                        maxOutputTokens:
                            500

                    }

                });


            console.timeEnd(
                "LEXI GEMINI GENERATION"
            );


            // ========================================
            // GET GEMINI RESPONSE
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

exports.createPaymentOrder = onRequest(

    {
        secrets: [
            paytrMerchantId,
            paytrMerchantKey,
            paytrMerchantSalt
        ],

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

exports.paymentCallback = onRequest(

    {
        secrets: [
            paytrMerchantId,
            paytrMerchantKey,
            paytrMerchantSalt
        ],

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