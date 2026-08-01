const membership = localStorage.getItem("membership");
const role = localStorage.getItem("role");


if (role !== "admin" && membership !== "premium") {

    window.location.href = "/pages/premium.html";

}