
import * as firebaseAdmin from "firebase-admin";

//Code from https://colinhacks.com/essays/nextjs-firebase-authentication

const privateKey = process.env["PRIVATE_KEY"];
const clientEmail = process.env["CLIENT_EMAIL"];
const projectId = process.env["PROJECT_ID"];

if (!privateKey || !clientEmail || !projectId) {
    console.log(
        `Failed to load Firebase credentials.`
    );
}

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: privateKey,
            clientEmail,
            projectId,
        }),
        databaseURL: `https://${projectId}.firebaseio.com`,
    });
}

export { firebaseAdmin };