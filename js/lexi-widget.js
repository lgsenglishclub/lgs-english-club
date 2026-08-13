// =========================================
// LEXI GLOBAL WIDGET
// =========================================

(function () {

    // Giriş yapılmamışsa Lexi'yi gösterme
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        return;
    }

    // Zaten varsa tekrar oluşturma
    if (document.querySelector(".lexi-assistant")) {
        return;
    }

    const lexi = document.createElement("a");

    lexi.href = "/pages/ai-teacher/ai-teacher.html";

    lexi.className = "lexi-assistant";

    lexi.setAttribute(
        "aria-label",
        "Open Lexi AI English Teacher"
    );

    lexi.innerHTML = `

        <div class="lexi-message">

            <strong>Hi! I'm LEXi.</strong>

            <span>
                Your personal AI Teacher
            </span>

        </div>

        <div class="lexi-avatar">

            <img
                src="/pages/ai-teacher/images/lexi.png"
                alt="Lexi AI English Teacher"
            >

            <span class="lexi-status"></span>

        </div>

    `;

    document.body.appendChild(lexi);

})();