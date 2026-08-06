import { db } from "../../firebase-config.js";

import {
    collection,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

emailjs.init({
    publicKey: "YLxy5NAOvJUUNlgVC",
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const button = document.querySelector(".send-btn");

    button.disabled = true;
    button.innerHTML = "Sending...";

    emailjs.send("service_aiwu0ds", "template_rlxco8h", {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })

    .then(async () => {

    await addDoc(collection(db, "messages"), {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        subject: document.getElementById("subject").value,

        message: document.getElementById("message").value,

        createdAt: serverTimestamp()

    });

    alert("✅ Your message has been sent successfully!");

    form.reset();

    button.disabled = false;

    button.innerHTML =
    '<i class="fa-solid fa-paper-plane"></i> Send Message';

})

    .catch((error) => {

        console.error(error);

        alert("❌ Failed to send message. Please try again.");

        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';

    });

});

const isLoggedIn = localStorage.getItem("loggedIn");

const backBtn = document.getElementById("backBtn");
const homeBtn = document.getElementById("homeBtn");

if (isLoggedIn === "true") {

    // Giriş yaptıysa
    backBtn.style.display = "none";
    homeBtn.style.display = "inline-block";

} else {

    // Giriş yapmadıysa
    homeBtn.style.display = "none";
    backBtn.style.display = "inline-block";

}