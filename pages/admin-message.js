import { auth, db } from "../firebase-config.js";

let message = null;

import {

doc,
getDoc,
deleteDoc,
updateDoc,
serverTimestamp

}

from "https://www.gstatic.com/firebasejs/15.26.0/firebase-firestore.js";

emailjs.init({
    publicKey: "YLxy5NAOvJUUNlgVC"
});

const params =
new URLSearchParams(window.location.search);

const id =
params.get("id");

const messageRef =
doc(db,"messages",id);

const messageSnap =
await getDoc(messageRef);

const container =
document.getElementById("messageInfo");

if(messageSnap.exists()){

message =
messageSnap.data();

container.innerHTML = `

<div class="info-row">

<span>👤 Name</span>

<strong>${message.name}</strong>

</div>

<div class="info-row">

<span>📧 Email</span>

<strong>${message.email}</strong>

</div>

<div class="info-row">

<span>📝 Subject</span>

<strong>${message.subject}</strong>

</div>

<div class="info-row">

<span>📅 Date</span>

<strong>

${
message.createdAt
?
message.createdAt.toDate().toLocaleString()
:
"-"
}

</strong>

</div>

<div style="margin-top:30px;">

<h3>💬 Message</h3>

<div class="message-box">

${message.message}

</div>

</div>

`;

}

document
.getElementById("deleteMessageBtn")
.addEventListener("click",async()=>{

const ok =
confirm("Delete this message?");

if(!ok) return;

await deleteDoc(doc(db,"messages",id));

alert("Message deleted.");

window.location.href="admin.html";

});

const modal =
document.getElementById("replyModal");

document
.getElementById("openReplyModal")
.onclick = ()=>{

    modal.style.display="flex";

};

document
.getElementById("closeModal")
.onclick = ()=>{

    modal.style.display="none";

};

document
.getElementById("cancelReply")
.onclick = ()=>{

    modal.style.display="none";

};

window.onclick = (e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};

document
.getElementById("sendReplyBtn")
.addEventListener("click", async () => {

    const reply =
    document.getElementById("replyText").value.trim();

    if(!reply){

        alert("Please write a reply.");

        return;

    }

    const button =
    document.getElementById("sendReplyBtn");

    button.disabled = true;

    button.innerHTML = "Sending...";

    try{

        await emailjs.send(

            "service_aiwu0ds",

            "template_yaywfrb",

            {

                student_name: message.name,

                student_email: message.email,

                reply_message: reply

            }

        );

        await updateDoc(doc(db,"messages",id),{

    status:"replied",

    repliedAt: serverTimestamp()

});

        alert("✅ Reply sent successfully!");

        button.innerHTML = "✅ Sent";

    }

    catch(error){

        console.error(error);

        alert("❌ Failed to send reply.");

        button.disabled = false;

        button.innerHTML = "📤 Send Reply";

    }

});