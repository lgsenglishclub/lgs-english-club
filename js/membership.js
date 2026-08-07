document.addEventListener("DOMContentLoaded", () => {

    const memberCard = document.getElementById("memberCard");

    const loggedIn = sessionStorage.getItem("loggedIn");

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


    const membership = sessionStorage.getItem("membership") || "free";
    const role = sessionStorage.getItem("role") || "user";

    const status = document.getElementById("premiumStatus");

    // Membership card renk değiştirme

if(memberCard){

    if(membership === "premium" || role === "admin"){

        memberCard.classList.remove("free");

        memberCard.classList.add("premium");

    }
    else{

        memberCard.classList.remove("premium");

        memberCard.classList.add("free");

    }

}


    // SENİN MEVCUT PREMIUM KODLARIN BURADAN DEVAM ETSİN

});

    document.addEventListener("DOMContentLoaded", () => {

    const membership = sessionStorage.getItem("membership");

    const badge = document.querySelector(".plan-badge");
    const text = document.querySelector(".membership-text");
    const button = document.querySelector(".premium-btn");

    console.log("Membership:", membership);

    const memberCard = document.getElementById("memberCard");

    if (!badge) return;

    if(memberCard){

    if(membership === "premium"){

        memberCard.classList.remove("free");
        memberCard.classList.add("premium");

    }
    else{

        memberCard.classList.remove("premium");
        memberCard.classList.add("free");

    }

}

    if (membership === "premium") {

        badge.className = "plan-badge premium";
        badge.innerHTML = "👑 PREMIUM MEMBER";

        if(text){
            text.innerHTML =
            "Thank you for supporting❤️";
        }

        if(button){
            button.style.display = "none";
        }

    } else {

        badge.className = "plan-badge free";
        badge.innerHTML = "🟢 FREE MEMBER";

    }

});

