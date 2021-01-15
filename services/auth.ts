import * as firebase from 'firebase/app';
import * as Google from 'expo-google-app-auth';

let currentAuthObject;

/**
 * Logs in with google and signs in on firebase, redirects automatically
 */
async function loginWithGoogle(): Promise<void> {
    try {
        const result = await Google.logInAsync({
            androidStandaloneAppClientId: "309914342547-eks7u0p0acbg84c4lom9fneet2h7ve7a.apps.googleusercontent.com",
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
function getUID(): string {
    const uid = firebase.auth().currentUser?.uid;
    if (uid !== undefined) {
        return uid;
    } else {
        throw 'Could not retrieve user ID!';
    }
}

/**
 * The current users profile picture url
 */
function getProfilePictureURL(): string {
    const pic = firebase.auth().currentUser?.photoURL;
    if (pic == undefined) {
        throw 'Can\'t retrieve profile picture!'
    }
    return pic;
}

export {loginWithGoogle, logOut, getUID, getProfilePictureURL}
