document.addEventListener("DOMContentLoaded", () => {

    const membership = localStorage.getItem("membership") || "free";
    const role = localStorage.getItem("role") || "user";
    const status = document.getElementById("premiumStatus");


    if (role === "admin" || membership === "premium") {

        if (status) {
            status.innerHTML = "👑 You are already a Premium Member";
        }

        document.querySelectorAll(".premium-lock").forEach(lock => {
            lock.style.display = "none";
        });


    } else {

        if (status) {
            status.innerHTML = "🟢 You are currently a Free Member";
        }


        document.querySelectorAll(".premium-lock").forEach(lock => {

            lock.addEventListener("click", () => {

                window.location.href = "/pages/premium.html";

            });

        });


        const premiumLinks = document.querySelectorAll(".premium-link");

        premiumLinks.forEach(link => {

            link.addEventListener("click", (e) => {

                e.preventDefault();

                window.location.href = "/pages/premium.html";

            });

        });

    }

});