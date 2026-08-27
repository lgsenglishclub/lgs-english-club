/* =========================================================
   UNIT 2 GRAMMAR
   Check Your Understanding
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {

    const questionCards = document.querySelectorAll(".question-card");


    questionCards.forEach(card => {

        const options = card.querySelectorAll(".question-options button");
        const feedback = card.querySelector(".question-feedback");


        options.forEach(option => {

            option.addEventListener("click", () => {

                // Daha önce cevaplandıysa tekrar işlem yapma
                if (card.dataset.answered === "true") {
                    return;
                }


                card.dataset.answered = "true";


                const isCorrect = option.dataset.correct === "true";


                // Tüm seçenekleri kilitle
                options.forEach(button => {
                    button.disabled = true;
                });


                if (isCorrect) {

                    option.classList.add("correct");

                    feedback.textContent = "✅ Correct! Great job!";

                    feedback.style.color = "#218838";

                } else {

                    option.classList.add("wrong");

                    feedback.textContent =
                        "❌ Not quite. Check the correct answer.";

                    feedback.style.color = "#c0392b";


                    // Doğru cevabı göster
                    options.forEach(button => {

                        if (button.dataset.correct === "true") {
                            button.classList.add("correct");
                        }

                    });

                }

            });

        });

    });


    /* =====================================================
       ACCORDION ICON
       ===================================================== */

    const accordions =
        document.querySelectorAll(".grammar-accordion");


    accordions.forEach(accordion => {

        accordion.addEventListener("toggle", () => {

            const icon =
                accordion.querySelector(".accordion-icon");


            if (!icon) return;


            if (accordion.open) {
                icon.textContent = "×";
            } else {
                icon.textContent = "+";
            }

        });

    });

});