const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn !== "true") {
    window.location.href = "/pages/login.html";
}