import * as firebase from 'firebase/app';
import * as Google from 'expo-google-app-auth';

let currentAuthObject;

/**
 * Logs in with google and signs in on firebase, redirects automatically
 */
async function loginWithGoogle(): Promise<void> {
    try {
        const result = await Google.logInAsync({
            androidClientId: "309914342547-vskojvul2d2joo1171jf37gfbn0llduv.apps.googleusercontent.com",
            iosClientId: "309914342547-6bln3jt9os6hpu6rh19mjh5q34lf463o.apps.googleusercontent.com",
            scopes: ["profile", "email"]
        });

        if (result.type === "success") {
            const {idToken, accessToken} = result;
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(res => {
                    currentAuthObject = res;
                })
                .catch(error => {
                    alert("Fehler im Login Prozess. Bitte stelle sicher, dass du den Chrome Browser installiert hast! (3) " + JSON.stringify(error));
                });
        } else {
            alert("Fehler im Login Prozess. Bitte stelle sicher, dass du den Chrome Browser installiert hast! (2) " + JSON.stringify(result));
            return;
        }
    } catch (err) {
        alert("Fehler im Login Prozess. Bitte stelle sicher, dass du den Chrome Browser installiert hast! " + JSON.stringify(err));
        console.log("err:", err);
    }
}

/**
 * Logs out from the current session
 */
function logOut(): void {
    firebase.auth().signOut();
}

/**
 * @returns The current user id
 */
function getUID(): string | undefined {
    return firebase.auth().currentUser?.uid;
}

/**
 * The current users profile picture url
 */
function getProfilePictureURL(): string | null | undefined {
    return firebase.auth().currentUser?.photoURL;
}

export {loginWithGoogle, logOut, getUID, getProfilePictureURL}
