function checkLogin(){

    if(!localStorage.getItem("loggedIn")){

        alert("🔒 Please login first");

        window.location.href="login.html";

    }

}