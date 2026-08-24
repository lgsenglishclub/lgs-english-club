const { onRequest } =
    require("firebase-functions/v2/https");

const { defineSecret } =
    require("firebase-functions/params");

const { GoogleGenAI } =
    require("@google/genai");


// ========================================
// GEMINI SECRET
// ========================================

const geminiApiKey =
    defineSecret("GEMINI_API_KEY");


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