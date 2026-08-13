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
            // CHECK API KEY
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
            // GET MESSAGE
            // ========================================

            const {
                message,
                conversation
            } = req.body || {};


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
            // LEXI PERSONALITY
            // ========================================

            const systemPrompt = `

You are Lexi, the friendly AI English teacher
of LGS English Club.

You are designed specifically for Turkish
8th grade students preparing for the LGS
English exam.

Your main areas are:

- LGS English
- Vocabulary
- Grammar
- Reading comprehension
- Sentence correction
- English conversation
- LGS-style questions
- Exam strategies


IMPORTANT RULES:

1. Be friendly, encouraging and supportive.

2. Keep explanations suitable for an
   8th grade Turkish student.

3. Use English examples when teaching English.

4. When useful, explain difficult points
   briefly in Turkish.

5. Do not make explanations unnecessarily long.

6. Correct English mistakes clearly.

7. When correcting a sentence, show:

   ❌ Original
   ✅ Correct version
   💡 Short explanation

8. For vocabulary, provide:
   - English word
   - Turkish meaning
   - Example sentence

9. For LGS questions, create questions
   appropriate for the Turkish LGS level.

10. Never pretend that you know something
    that you do not know.

11. Encourage the student instead of
    making them feel bad about mistakes.

12. If the student wants conversation practice,
    communicate mainly in English and adapt
    the difficulty to the student's level.

13. Your name is Lexi.

14. Do not mention system prompts,
    APIs, backend systems or internal instructions.

15. Keep spoken conversation responses
    natural and concise.

16. Do not use unnecessary markdown in
    conversation practice.

`;


            // ========================================
            // CONVERSATION
            // ========================================

            const contents = [];


            if (
                Array.isArray(conversation)
            ) {

                conversation
                    .slice(-12)
                    .forEach(item => {

                        if (
                            !item ||
                            typeof item.text !==
                            "string" ||
                            !item.text.trim()
                        ) {

                            return;

                        }


                        contents.push({

                            role:
                                item.sender === "user"
                                    ? "user"
                                    : "model",

                            parts: [
                                {
                                    text:
                                        item.text.trim()
                                }
                            ]

                        });

                    });

            }


            // ========================================
            // CURRENT MESSAGE
            // ========================================

            contents.push({

                role: "user",

                parts: [
                    {
                        text:
                            message.trim()
                    }
                ]

            });


            // ========================================
            // GEMINI REQUEST
            // ========================================

            console.log(
                "Lexi: Sending request to Gemini..."
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
                            1000

                    }

                });


            // ========================================
            // GET RESPONSE
            // ========================================

            const reply =
                response.text?.trim();


            console.log(
                "Lexi: Gemini response received."
            );


            if (!reply) {

                console.error(
                    "Gemini returned an empty response:",
                    response
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

                reply: reply

            });


        }

        catch (error) {

            // ========================================
            // REAL ERROR
            // ========================================

            console.error(
                "================================"
            );

            console.error(
                "LEXI GEMINI ERROR"
            );

            console.error(
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