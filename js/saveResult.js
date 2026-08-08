import { auth, db } from "../firebase-config.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


export async function saveToFirebase(result) {

    const user = auth.currentUser;

    if (!user) return;

    try {

        await addDoc(collection(db, "tests"), {

            userId: user.uid,

            username:
                user.displayName || result.username || "Student",

            email: user.email,

            testName:
                result.testName || "Test",

            correct:
                Number(result.correct) || 0,

            wrong:
                Number(result.wrong) || 0,

            net:
                Number(result.net) || 0,

            percent:
                Number(result.percent) || 0,

            date: new Date(),

            // Challenge bilgisi
            challenge:
                result.challenge || false

        });

        console.log("Test saved to Firebase successfully.");

    } catch (error) {

        console.error(
            "Test save error:",
            error
        );

    }

}