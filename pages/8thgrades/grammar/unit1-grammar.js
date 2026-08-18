/* =========================================================
   UNIT 1 GRAMMAR
   ACCORDION + QUESTIONS
========================================================= */


/* =========================================================
   ACCORDION ICON
========================================================= */

const accordions = document.querySelectorAll(
    '.grammar-accordion'
);

accordions.forEach((accordion) => {

    accordion.addEventListener('toggle', () => {

        const icon = accordion.querySelector(
            '.accordion-icon'
        );

        if (!icon) return;

        if (accordion.open) {
            icon.textContent = '−';
        } else {
            icon.textContent = '+';
        }

    });

});



/* =========================================================
   QUESTIONS
========================================================= */

const questionCards = document.querySelectorAll(
    '.question-card'
);

questionCards.forEach((card) => {

    const options = card.querySelectorAll(
        '.question-options button'
    );

    const feedback = card.querySelector(
        '.question-feedback'
    );

    options.forEach((button) => {

        button.addEventListener('click', () => {

            const isCorrect =
                button.dataset.correct === 'true';


            /* Remove old states */

            options.forEach((option) => {

                option.classList.remove(
                    'correct',
                    'incorrect'
                );

            });


            /* Apply new state */

            if (isCorrect) {

                button.classList.add('correct');

                feedback.textContent =
                    '✅ Correct! Great job!';

                feedback.style.color =
                    '#24905b';

            } else {

                button.classList.add('incorrect');

                feedback.textContent =
                    '❌ Not quite. Try again!';

                feedback.style.color =
                    '#d25555';

            }

        });

    });

});