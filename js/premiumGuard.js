const membership = sessionStorage.getItem("membership");
const role = sessionStorage.getItem("role");


if (role !== "admin" && membership !== "premium") {

    window.location.href = "/pages/premium.html";

}