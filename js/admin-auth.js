import { auth, db } from "../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/15.26.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/15.26.0/firebase-firestore.js";
import { auth, db }from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "../login.html";
        return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        window.location.href = "../login.html";
        return;
    }

    const data = userSnap.data();

    if (data.role !== "admin") {
        alert("⛔ Access Denied");
        window.location.href = "../login.html";
        return;
    }

});
