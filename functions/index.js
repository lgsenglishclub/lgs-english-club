const { onRequest } =
    require("firebase-functions/v2/https");

const { defineSecret } =
    require("firebase-functions/params");

const OpenAI =
    require("openai");


// ========================================
// OPENAI SECRET
// ========================================

const openaiApiKey =
    defineSecret("OPENAI_API_KEY");


// ========================================
// LEXI AI TEACHER
// ========================================

exports.lexiChat = onRequest(

    {
        secrets: [openaiApiKey],

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
            // GET MESSAGE
            // ========================================

            const {
                message,
                conversation
            } = req.body;


            if (
                !message ||
                !message.trim()
            ) {

                return res.status(400).json({
                    error: "Message is required"
                });

            }


            // ========================================
            // OPENAI
            // ========================================

            const openai =
                new OpenAI({
                    apiKey:
                        openaiApiKey.value()
                });


            // ========================================
            // LEXI PERSONALITY
            // ========================================

            const systemPrompt = `

You are Lexi, the AI English teacher of LGS English Club.

Your goal is to help Turkish 8th grade students prepare
for the LGS English exam.

When the student asks about grammar:
- Give a short explanation.
- Give 1-3 examples.
- Avoid unnecessary advanced grammar.

When correcting a sentence:
Always use this format:

❌ Original:
...

✅ Correct:
...

💡 Why:
...

When teaching vocabulary:
Always provide:
🇬🇧 Word
🇹🇷 Turkish meaning
📝 Example sentence

When creating LGS questions:
- Use 8th grade LGS difficulty.
- Use realistic LGS question styles.
- Do not make questions unnecessarily difficult.
- Give the answer only when the student asks for it.

When the student makes a mistake:
- Never shame the student.
- Explain the mistake positively.
- Encourage them to try again.

For conversation practice:
- Mainly speak English.
- Keep the difficulty appropriate for an 8th grade student.
- Correct important mistakes without interrupting the flow too much.

Keep answers concise and easy to read on a mobile screen.

`;


            // ========================================
            // CONVERSATION
            // ========================================

            const messages = [

                {
                    role: "system",
                    content: systemPrompt
                }

            ];


            // Previous messages

            if (
                Array.isArray(conversation)
            ) {

                conversation
                    .slice(-12)
                    .forEach(item => {

                        if (
                            !item ||
                            !item.text
                        ) {
                            return;
                        }


                        messages.push({

                            role:
                                item.sender === "user"
                                    ? "user"
                                    : "assistant",

                            content:
                                String(
                                    item.text
                                )

                        });

                    });

            }


            // Current message

            messages.push({

                role: "user",

                content:
                    message.trim()

            });


            // ========================================
            // OPENAI REQUEST
            // ========================================

            const response =
                await openai.chat.completions.create({

                    model: "gpt-4o-mini",

                    messages: messages,

                    temperature: 0.7,

                    max_tokens: 500

                });


            // ========================================
            // RESPONSE
            // ========================================

            const reply =
                response
                    .choices?.[0]
                    ?.message
                    ?.content
                    ?.trim();


            if (!reply) {

                return res.status(500).json({

                    error:
                        "Lexi could not generate a response."

                });

            }


            return res.status(200).json({

                reply: reply

            });


        }

        catch (error) {

            console.error(
                "Lexi AI error:",
                error
            );


            return res.status(500).json({

                error:
                    "Lexi is temporarily unavailable."

            });

        }

    }

);