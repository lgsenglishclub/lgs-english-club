document.addEventListener("DOMContentLoaded", () => {

    const membership = localStorage.getItem("membership");
    const role = localStorage.getItem("role");

    const premiumLinks = document.querySelectorAll(".premium-link");

    premiumLinks.forEach(link => {

        if(role === "admin" || membership === "premium"){

            link.classList.remove("locked");

        }
        else{

            link.addEventListener("click", (e)=>{

                e.preventDefault();

                window.location.href = "pages/premium.html";

            });

        }

    });

});