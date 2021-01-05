import { Project } from '../customTypes/project';
import {BlockedUser} from '../customTypes/blockedUsers';
import {ProfileData} from '../customTypes/profileData';
import firebase from 'firebase/app'
import 'firebase/firestore'
import {getProfilePictureURL, getUID} from './auth';

const fs = firebase.firestore();

/**
 * Updates the users profile to the given parameters. OVERWRITES unset parameters to undefined.
 * The profilePictureURL can be retrieved with auth.js -> getProfilePictureURL(). When left undefined this is done automatically
 * 
 * @param description
 */
function createProfileData(user: ProfileData): void {
    if (user.profilePictureURL === undefined) {
        const url = getProfilePictureURL();
        if (url !== undefined && url !== null) {
            user.profilePictureURL = url;
        }
    }
    try {
        fs.collection('profileData').doc(getUID()).withConverter(profileDataConverter).set(user);
    } catch (error) {
        alert("Error while setting profile data." + JSON.stringify(error));
    }
}

/**
 * Updates the users profile to the given parameters. If a parameter should not be updated, set it to null (or leave it out).
 * In TypeScript, this can be achieved by casting an inline object like this:
 * ```typescript
 * let test = {
        name: "test",
        description: "test",
        skills: ["test"],
    } as ProfileData;
 * ```
 * The profilePictureURL can be retrieved with auth.js -> getProfilePictureURL().
 * 
 * !MUST BE CALLED ON AN ALREADY EXISTING PROFILE!
 * 
 * @param user The user information to update
 */
function updateProfileData(user: ProfileData): void {
    try {
        fs.collection('profileData').doc(getUID()).withConverter(profileDataConverter).update(user);
    } catch (error) {
        alert("Error while updating profile data. Make sure to call on existing profile!" + JSON.stringify(error));
    }
}

/**
 * Fetches the profile data. Does'nt include projects the user created.
 * The current users ID can be retrieved by auth.js -> getUID()
 * 
 * @param userID ID of the user to fetch the profile of
 * @returns The profile data query object
 */
function getProfileData(userID: string) {
    if (userID === null || userID === null) {
        throw "The userID is invalid: " + typeof userID;
    }
    return fs.collection('profileData').doc(userID).withConverter(profileDataConverter);
}

/**
 * Returns the query for the projects the user has created
 * The current users ID can be retrieved by auth.js -> getUID()
 * 
 * @param userID ID of the user to fetch the profile of
 * @returns The projcts query object
 */
function getUserProjects(userID: string) {
    if (userID === null || userID === null) {
        throw "The userID is invalid: " + typeof userID;
    }
    return fs.collection('projects').where('authorID', '==', userID).withConverter(profileDataConverter);
}


/**
 * Returns a query object for fetching the existing projects by the given order and filtered by the filters defined in the string array
 * possible entities are:
 * Frontend
 * Backend
 * Datenhaltung
 * iOS
 * Android
 * HarmonyOS
 * Webseite
 * Windows
 * MacOS
 * ChromeOS
 * Linux
 * Smartwatch
 * Microcontroller
 * 
 * @param oldestComesLast The sorting direction. True means the newest projects are listed first, false is inverted. Defaults to true
 * @param filters Filters out projects which are tagged with the given filter strings. Defaults to an empty array = all projects are queried
 * 
 * @returns {Object[]} A query object for the projects with the modifiers applied 
 */
function getProjects(oldestComesLast = true, filters = [""]) {
    return fs.collection('projects')
        // .
        // where("tags.0", '==', filters.find(e => e === "Frontend")).
        // where("tags.1", '==', filters.find(e => e === "Backend")).
        // where("tags.2", '==', filters.find(e => e === "Datenhaltung")).
        // where("tags.3", '==', filters.find(e => e === "iOS")).
        // where("tags.4", '==', filters.find(e => e === "Android")).
        // where("tags.5", '==', filters.find(e => e === "HarmonyOS")).
        // where("tags.6", '==', filters.find(e => e === "Webseite")).
        // where("tags.7", '==', filters.find(e => e === "Windows")).
        // where("tags.8", '==', filters.find(e => e === "MacOS")).
        // where("tags.9", '==', filters.find(e => e === "ChromeOS")).
        // where("tags.10", '==', filters.find(e => e === "Linux")).
        // where("tags.11", '==', filters.find(e => e === "Smartwatch")).
        // where("tags.12", '==', filters.find(e => e === "Microcontroller"))

        .orderBy("creationTimestamp", oldestComesLast ? 'asc' : 'desc').withConverter(projectConverter);
}

export {
    createProfileData, getUserProjects, updateProfileData, getProfileData,
    getProjects
}

const profileDataConverter = {
    toFirestore(data: ProfileData): firebase.firestore.DocumentData {
        if (data.blockedUsers !== undefined) {
            let transformedBlockedUsers = data.blockedUsers.reduce((map: any, user) => {
                map[user.id] = user.name;
                return map;
            }, {});
            data.blockedUsers = transformedBlockedUsers;
        }
        return data;
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): ProfileData {
        const data = snapshot.data(options);
        data.blockedUsers = Object.keys(data.blockedUsers).map((userKey: any) => {
            return {id: userKey, name: data.blockedUsers[userKey]} as BlockedUser;
        })
        return data as ProfileData;
    }
};

const projectConverter = {
    toFirestore(data: Project): firebase.firestore.DocumentData {
        if (data.tags !== undefined) {
            let transformedTags = data.tags.reduce((map: any, tag) => {
                map[tag] = true;
                return map;
            }, {});
            data.tags = transformedTags;
        }
        return data;
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Project {
        const data = snapshot.data(options);
        data.tags = Object.keys(data.tags).filter(key => data.tags[key]);
        return data as Project;
    }
};

// function sanitizeProfilePictureURL(url) {
//     // TODO: needed?
//     // https://lh3.googleusercontent.com/a-/AOh14GjTQVmEk-kWD1fKnagm2W7U6wyEKUx_S0yFV1IQGg=s200-p-k-no-mo
// }
