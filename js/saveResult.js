import { auth, db } from "../firebase-config.js";

import {
    collection,
    addDoc,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


export async function saveToFirebase(result) {

    const user = auth.currentUser;

    if (!user) return;

    try {

        // Test tarihi
        const now = new Date();

        const dateKey =
            `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;


        // ============================
        // TESTİ KAYDET
        // ============================

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

            date: now,

            challenge:
                result.challenge || false

        });


        // ============================
        // STUDY DAY KAYDET
        // ============================

        await setDoc(
            doc(
                db,
                "studyDays",
                `${user.uid}_${dateKey}`
            ),
            {
                userId: user.uid,
                date: dateKey
            },
            {
                merge: true
            }
        );


        console.log(
            "Test and study day saved successfully."
        );


    } catch (error) {

        console.error(
            "Test save error:",
            error
        );

    }

}