import { auth, db } from "../firebase.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


export async function saveToFirebase(result){

    const user = auth.currentUser;


    if(user){

        await addDoc(collection(db, "tests"), {
    userId: user.uid,
    username: user.displayName || result.username,
    email: user.email,

    testName: result.testName,
    correct: result.correct,
    wrong: result.wrong,
    net: result.net,
    percent: result.percent,
    date: new Date()
});

    }

}