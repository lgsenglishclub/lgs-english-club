function checkLogin(){

    if(!sessionStorage.getItem("loggedIn")){

        alert("🔒 Please login first");

        window.location.href="login.html";

    }

}