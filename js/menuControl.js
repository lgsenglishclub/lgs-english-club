document.addEventListener("DOMContentLoaded", () => {

    const membership = sessionStorage.getItem("membership");
    const role = sessionStorage.getItem("role");

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