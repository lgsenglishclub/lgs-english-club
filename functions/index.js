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

                
const systemPrompt = `
You are Lexi, an AI English teacher for Turkish 8th-grade students.

Speak naturally and conversationally.

Use Turkish by default unless the student clearly chooses English.

Always respond to the student's actual message and intention.

Do not force English lessons, grammar explanations, quizzes, or LGS questions unless the student asks for them or they are clearly relevant.

Do not greet the student at the beginning of every response. Greet only when starting a new conversation or when the student greets you.

Keep responses natural and appropriately short. Do not sound like a textbook, chatbot, or scripted teacher.
`;      



// ========================================
// CONVERSATION
// ========================================

const contents = [];


// ========================================
// ADD CONVERSATION HISTORY
// ========================================

if (Array.isArray(conversation)) {

    const history = conversation
        .filter(item => {

            if (!item) {
                return false;
            }

            if (typeof item.text !== "string") {
                return false;
            }

            if (!item.text.trim()) {
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
    // BUILD VALID GEMINI HISTORY
    // ========================================

    history.forEach(item => {

        const role =
            item.sender === "user"
                ? "user"
                : "model";

        const text =
            item.text.trim();

        const last =
            contents[contents.length - 1];


        // ========================================
        // MERGE CONSECUTIVE SAME ROLES
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
        // ADD MESSAGE
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
// REMOVE LEADING MODEL MESSAGE
// ========================================

while (
    contents.length &&
    contents[0].role === "model"
) {
    contents.shift();
}


// ========================================
// CURRENT MESSAGE
// ========================================

const currentMessage =
    message.trim();


// ========================================
// ADD CURRENT USER MESSAGE
// ========================================

const lastContent =
    contents[contents.length - 1];


if (
    !lastContent ||
    lastContent.role !== "user" ||
    lastContent.parts?.[0]?.text !== currentMessage
) {

    contents.push({

        role: "user",

        parts: [

            {
                text: currentMessage
            }

        ]

    });

}


// ========================================
// DEBUG
// ========================================

console.log(
    "Lexi: Sending conversation..."
);

console.log(
    "Lexi history:",
    contents.length,
    "messages"
);


// ========================================
// DEBUG
// ========================================

console.log(
    "Lexi: Sending conversation..."
);

console.log(
    "Lexi history:",
    contents.length,
    "messages"
);


// ========================================
// GEMINI REQUEST
// ========================================

console.log(
    "LEXI REQUEST:",
    contents.length,
    "messages"
);

console.time("LEXI GEMINI GENERATION");

const response =
    await ai.models.generateContent({

        model:
            "gemini-3.6-flash",

        contents:
            contents,

        config: {

            systemInstruction:
                `${systemPrompt}

${conversationBehavior}`,

            maxOutputTokens:
                500

        }

    });

console.timeEnd("LEXI GEMINI GENERATION");


// ========================================
// GET RESPONSE
// ========================================

const reply =
    response?.text?.trim();


console.log(
    "Lexi: Gemini response received."
);


// ========================================
// EMPTY RESPONSE CHECK
// ========================================

if (!reply) {

    console.error(
        "Gemini returned an empty response:"
    );

    console.error(
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

    reply:
        reply

});


// ========================================
// CATCH
// ========================================

} catch (error) {

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