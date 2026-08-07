const loggedIn = sessionStorage.getItem("loggedIn");

if (loggedIn !== "true") {
    window.location.href = "/pages/login.html";
}