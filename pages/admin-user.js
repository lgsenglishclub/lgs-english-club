import { db } from "../firebase.js";

import {
    doc,
    getDoc,
    deleteDoc

} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

async function loadUser() {

    const params = new URLSearchParams(window.location.search);
    const uid = params.get("id");

    const userInfo = document.getElementById("userInfo");

    if (!uid) {
        userInfo.innerHTML = "❌ User ID not found.";
        return;
    }

    try {

        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            userInfo.innerHTML = "❌ User not found.";
            return;
        }

        const user = userSnap.data();

        userInfo.innerHTML = `

<div class="info-row">
<span>👤 Name</span>
<strong>${user.name || "-"}</strong>
</div>

<div class="info-row">
<span>📧 Email</span>
<strong>${user.email || "-"}</strong>
</div>

<div class="info-row">
<span>👑 Membership</span>
<strong>
${user.membership==="premium"
? "👑 Premium"
: "🟢 Free"}
</strong>
</div>

<div class="info-row">
<span>🛡️ Role</span>
<strong>${user.role}</strong>
</div>

<div class="info-row">
<span>📅 Joined</span>
<strong>
${
user.createdAt
? new Date(user.createdAt).toLocaleDateString()
: "-"
}
</strong>
</div>

<div class="info-row">
<span>🕒 Last Login</span>
<strong>
${
user.lastLogin
? user.lastLogin.toDate().toLocaleString()
: "-"
}
</strong>
</div>

<div class="info-row">
<span>🚀 Premium Start</span>
<strong>
${
user.premiumStart
? new Date(user.premiumStart).toLocaleDateString()
: "-"
}
</strong>
</div>


<div class="info-row">
<span>⏳ Premium End</span>
<strong>
${
user.premiumEnd
? new Date(user.premiumEnd).toLocaleDateString()
: "-"
}
</strong>
</div>

`;
    } catch (error) {

        console.error(error);

        userInfo.innerHTML =
        "❌ Error loading user.";

    }

}

loadUser();

document
.getElementById("deleteUserBtn")
.addEventListener("click", async () => {

    const confirmDelete = confirm(
        "⚠️ Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(doc(db, "users", uid));

        alert("✅ User deleted.");

        window.location.href = "admin.html";

    } catch (error) {

        console.error(error);

        alert("❌ Failed to delete user.");

    }

});