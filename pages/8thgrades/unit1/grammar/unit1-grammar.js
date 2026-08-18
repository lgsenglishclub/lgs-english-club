document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       NORMAL QUESTIONS
    ================================================= */

    const questionCards =
        document.querySelectorAll(".question-card");


    questionCards.forEach(card => {

        const buttons =
            card.querySelectorAll(
                ".question-options button"
            );

        const feedback =
            card.querySelector(
                ".question-feedback"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    if (
                        card.dataset.answered === "true"
                    ) {
                        return;
                    }


                    card.dataset.answered = "true";


                    const isCorrect =
                        button.dataset.correct === "true";


                    buttons.forEach(btn => {

                        btn.disabled = true;

                        if (
                            btn.dataset.correct === "true"
                        ) {

                            btn.classList.add(
                                "correct"
                            );

                        }

                    });


                    if (isCorrect) {

                        button.classList.add(
                            "correct"
                        );

                        feedback.textContent =
                            "✅ Correct! Great job.";

                        feedback.style.color =
                            "#228451";

                    } else {

                        button.classList.add(
                            "wrong"
                        );

                        feedback.textContent =
                            "❌ Not quite. The correct answer is highlighted in green.";

                        feedback.style.color =
                            "#c04d4d";

                    }

                }
            );

        });

    });



    /* =================================================
       LGS QUESTION
    ================================================= */

    const lgsButtons =
        document.querySelectorAll(
            ".lgs-options button"
        );


    const lgsFeedback =
        document.querySelector(
            ".lgs-feedback"
        );


    lgsButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    document.querySelector(
                        ".lgs-options button:disabled"
                    )
                ) {
                    return;
                }


                lgsButtons.forEach(btn => {

                    btn.disabled = true;

                    if (
                        btn.dataset.correct === "true"
                    ) {

                        btn.classList.add(
                            "correct"
                        );

                    }

                });


                if (
                    button.dataset.correct === "true"
                ) {

                    button.classList.add(
                        "correct"
                    );

                    lgsFeedback.textContent =
                        "✅ Correct! Emma wants to join them, but she cannot accept the offer because she has another plan.";

                    lgsFeedback.style.color =
                        "#228451";

                } else {

                    button.classList.add(
                        "wrong"
                    );

                    lgsFeedback.textContent =
                        "❌ Look at Emma's response carefully. “I'd love to, but...” shows that she cannot accept the offer.";

                    lgsFeedback.style.color =
                        "#c04d4d";

                }

            }
        );

    });

});