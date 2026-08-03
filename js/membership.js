document.addEventListener("DOMContentLoaded", () => {

    const memberCard = document.getElementById("memberCard");

    const loggedIn = localStorage.getItem("loggedIn");

    // Giriş yapılmamışsa member kartı gizle
    if(loggedIn !== "true"){

        if(memberCard){
            memberCard.style.display = "none";
        }

        return;
    }

    // Giriş yapılmışsa göster
    if(memberCard){
        memberCard.style.display = "block";
    }


    const membership = localStorage.getItem("membership") || "free";
    const role = localStorage.getItem("role") || "user";

    const status = document.getElementById("premiumStatus");


    // SENİN MEVCUT PREMIUM KODLARIN BURADAN DEVAM ETSİN

});

    document.addEventListener("DOMContentLoaded", () => {

    const membership = localStorage.getItem("membership");

    const badge = document.querySelector(".plan-badge");
    const text = document.querySelector(".membership-text");
    const button = document.querySelector(".premium-btn");

    console.log("Membership:", membership);

    if (!badge) return;

    if (membership === "premium") {

        badge.className = "plan-badge premium";
        badge.innerHTML = "👑 PREMIUM MEMBER";

        if(text){
            text.innerHTML =
            "Thank you for supporting LGS English Club ❤️";
        }

        if(button){
            button.style.display = "none";
        }

    } else {

        badge.className = "plan-badge free";
        badge.innerHTML = "🟢 FREE MEMBER";

    }

});

