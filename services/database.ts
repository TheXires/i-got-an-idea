import { Project } from '../customTypes/project';
import {BlockedUser} from '../customTypes/blockedUsers';
import {ProfileData} from '../customTypes/profileData';
import firebase from 'firebase/app'
import 'firebase/firestore'
import {getProfilePictureURL, getUID} from './auth';

const fs = firebase.firestore();

/**
 * Creates a profile. If this is called on an already existing user profile it will overwrite the current information.
 * Make sure to use the update function to prevent data loss.
 * The profilePictureURL can be retrieved with auth.js -> getProfilePictureURL(). When left undefined this is done automatically
 * 
 * @param description
 * @returns A promise which resolves when the data has been written
 */
function createProfileData(user: ProfileData) {
    if (user.profilePictureURL === undefined) {
        const url = getProfilePictureURL();
        if (url !== undefined && url !== null) {
            user.profilePictureURL = url;
        }
    }
    try {
        return fs.collection('profileData').doc(getUID()).withConverter(profileDataConverter).set(user);
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
 * @returns A promise which resolves when the data has been written
 */
function updateProfileData(user: ProfileData) {
    try {
        return fs.collection('profileData').doc(getUID()).withConverter(profileDataConverter).update(user);
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
        .
        where("tags.0", '==', filters.find(e => e === "Frontend") != undefined).//TODO: Filter Fixen
        where("tags.1", '==', filters.find(e => e === "Backend") != undefined).
        where("tags.2", '==', filters.find(e => e === "Datenhaltung") != undefined).
        where("tags.3", '==', filters.find(e => e === "iOS") != undefined).
        where("tags.4", '==', filters.find(e => e === "Android") != undefined).
        where("tags.5", '==', filters.find(e => e === "HarmonyOS") != undefined).
        where("tags.6", '==', filters.find(e => e === "Webseite") != undefined).
        where("tags.7", '==', filters.find(e => e === "Windows") != undefined).
        where("tags.8", '==', filters.find(e => e === "MacOS") != undefined).
        where("tags.9", '==', filters.find(e => e === "ChromeOS") != undefined).
        where("tags.10", '==', filters.find(e => e === "Linux") != undefined).
        where("tags.11", '==', filters.find(e => e === "Smartwatch") != undefined).
        where("tags.12", '==', filters.find(e => e === "Microcontroller") != undefined)

        .orderBy("creationTimestamp", oldestComesLast ? 'asc' : 'desc').withConverter(projectConverter);
}

/**
 * Creates a new project. If this is called on an already existing project it will overwrite the current information.
 * Make sure to use the update function to prevent data loss.
 * 
 * Following properties don't need to be set, they will be created automatically:
 * 
 * Project UID defaults to auth.ts -> getUID()
 * 
 * Timestamp defaults to now
 * 
 * id will be ignored, gets created by the database
 * 
 * @param project The project to create
 * @returns a promise which resolves when the data has been written
 */
function createProject(project: Project) {
    if (project.authorID == undefined) {
        project.authorID = getUID();
    }
    if (project.creationTimestamp == undefined) {
        project.creationTimestamp = firebase.firestore.Timestamp.now();
    }
    if (project.id != undefined) {
        delete project.id;
    }
    try {
        return fs.collection('projects').doc().withConverter(projectConverter).set(project);
    } catch (error) {
        alert("Error while creating a projct." + JSON.stringify(error));
    }
}

/**
 * Updates project to the given object. If an attribute should not be updated, set it to null (or leave it out).
 * In TypeScript, this can be achieved by casting an inline object like this:
 * ```typescript
 * let test = {
        name: "test",
        description: "test",
    } as Project;
 * ```
 * 
 * !MUST BE CALLED ON AN ALREADY EXISTING PROJECT!
 * 
 * @param project The project information to update
 * @returns A promise which resolves when the data has been written
 */
function updateProject(project: Project) {
    if (project.id == undefined) {
        throw 'The project ID can\'t be undefined: ' + JSON.stringify(project);
    }
    try {
        return fs.collection('projects').doc(project.id).withConverter(projectConverter).update(project);
    } catch (error) {
        alert("Error while updating a projct." + JSON.stringify(error));
    }
}

export {
    createProfileData, updateProfileData, getProfileData,
    getUserProjects, getProjects, createProject, updateProject
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
        data.id = snapshot.id;
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
        data.id = snapshot.id;
        return data as Project;
    }
};

// function sanitizeProfilePictureURL(url) {
//     // TODO: needed?
//     // https://lh3.googleusercontent.com/a-/AOh14GjTQVmEk-kWD1fKnagm2W7U6wyEKUx_S0yFV1IQGg=s200-p-k-no-mo
// }
