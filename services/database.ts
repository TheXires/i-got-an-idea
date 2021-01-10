import { IdeaType } from '../customTypes/ideaType';
import { BlockedUser } from '../customTypes/blockedUsers';
import { ProfileData } from '../customTypes/profileData';
import firebase from 'firebase/app'
import 'firebase/firestore'
import { getProfilePictureURL, getUID } from './auth';
import { Chat, ChatMessage } from '../customTypes/chat';
import { Tag } from '../customTypes/tags';

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
 * Fetches the profile data. Does'nt include ideas the user created.
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
 * Returns the query for the ideas the user has created
 * The current users ID can be retrieved by auth.js -> getUID()
 * 
 * @param userID ID of the user to fetch the profile of
 * @returns The idea query object
 */
function getUserIdeas(userID: string) {
    if (userID === null || userID === null) {
        throw "The userID is invalid: " + typeof userID;
    }
    return fs.collection('ideas').where('authorID', '==', userID).withConverter(ideaConverter);
}

/**
 * Returns a query object for fetching the existing ideas by the given order and filtered by the filters defined in the string array
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
 * @param oldestComesLast The sorting direction. True means the newest ideas are listed first, false is inverted. Defaults to true
 * @param filters Filters out ideas which are tagged with the given filter strings. Defaults to an empty array = all ideas are queried
 * 
 * @returns {Object[]} A query object for the ideas with the modifiers applied 
 * @throws Error (and alert) when more than 10 items at a time are checked
 */
function getIdeas(oldestComesLast = true, filters: Tag[] = []) {

    if (filters.length > 10) {
        alert('Searching with more than 10 tags at a time is not possible!');
        throw 'Searching with more than 10 tags at a time is not possible!';
    }

    if (filters.length == 0) {
        return fs.collection('ideas').orderBy("creationTimestamp", oldestComesLast ? 'asc' : 'desc').withConverter(ideaConverter);
    } else {
        return fs.collection('ideas').where('tags', 'array-contains-any', filters)
            .orderBy("creationTimestamp", oldestComesLast ? 'asc' : 'desc').withConverter(ideaConverter);
        //for exact search if needed any time:
        // return fs.collection('ideas')
        //     .
        //     where("tags.FRONTEND", '==', filters.find(e => e === Tag.FRONTEND) != undefined).
        //     where("tags.BACKEND", '==', filters.find(e => e === Tag.BACKEND) != undefined).
        //     where("tags.DATENHALTUNG", '==', filters.find(e => e === Tag.DATENHALTUNG) != undefined).
        //     where("tags.IOS", '==', filters.find(e => e === Tag.IOS) != undefined).
        //     where("tags.ANDROID", '==', filters.find(e => e === Tag.ANDROID) != undefined).
        //     where("tags.HARMONYOS", '==', filters.find(e => e === Tag.HARMONYOS) != undefined).
        //     where("tags.WEBSEITE", '==', filters.find(e => e === Tag.WEBSEITE) != undefined).
        //     where("tags.WINDOWS", '==', filters.find(e => e === Tag.WINDOWS) != undefined).
        //     where("tags.MACOS", '==', filters.find(e => e === Tag.MACOS) != undefined).
        //     where("tags.CHROMEOS", '==', filters.find(e => e === Tag.CHROMEOS) != undefined).
        //     where("tags.LINUX", '==', filters.find(e => e === Tag.LINUX) != undefined).
        //     where("tags.SMARTWATCH", '==', filters.find(e => e === Tag.SMARTWATCH) != undefined).
        //     where("tags.MICROCONTROLLER", '==', filters.find(e => e === Tag.MICROCONTROLLER) != undefined)
        //     .
        //     orderBy("creationTimestamp", oldestComesLast ? 'asc' : 'desc').withConverter(ideaConverter);
    }
}

/**
 * Creates a new idea. If this is called on an already existing idea it will overwrite the current information.
 * Make sure to use the update function to prevent data loss.
 * 
 * Following properties don't need to be set, they will be created automatically:
 * 
 * Idea authorID defaults to auth.ts -> getUID()
 * 
 * Timestamp defaults to now
 * 
 * id will be ignored, gets created by the database
 * 
 * @param idea The idea to create
 * @returns a promise which resolves when the data has been written
 */
function createIdea(idea: IdeaType) {
    if (idea.authorID == undefined) {
        idea.authorID = getUID();
    }
    if (idea.creationTimestamp == undefined) {
        idea.creationTimestamp = firebase.firestore.Timestamp.now();
    }
    try {
        return fs.collection('ideas').doc().withConverter(ideaConverter).set(idea);
    } catch (error) {
        alert("Error while creating an idea." + JSON.stringify(error));
    }
}

/**
 * Updates idea to the given object. If an attribute should not be updated, set it to null (or leave it out).
 * In TypeScript, this can be achieved by casting an inline object like this:
 * ```typescript
 * let test = {
        name: "test",
        description: "test",
    } as Idea;
 * ```
 * 
 * !MUST BE CALLED ON AN ALREADY EXISTING IDEA!
 * 
 * @param idea The idea information to update
 * @returns A promise which resolves when the data has been written
 */
function updateIdea(idea: IdeaType) {
    if (idea.id == undefined) {
        throw 'The idea ID can\'t be undefined: ' + JSON.stringify(idea);
    }
    try {
        return fs.collection('ideas').doc(idea.id).withConverter(ideaConverter).update(idea);
    } catch (error) {
        alert("Error while updating a idea." + JSON.stringify(error));
    }
}

/**
 * Starts a chat with the idea owner of the given idea.
 * It is mandatory to call this method before starting to chat, because the permissions set in the backend require the chat
 * document to be existent before adding values to it.
 * 
 * This will set the chat document to en empty object and therefore creates it if non existant
 * !DO NOT CALL ON EXISTING CHAT! (It'll overwrite everything)
 *
 * @param ideaIdentifier An idea ID as a string or an idea object with a valid id property
 */
function startChat(ideaIdentifier: string | IdeaType) {
    console.log('starting: ', ideaIdentifier);

    if (ideaIdentifier == undefined) {
        throw 'The idea can\'t be undefined: ' + JSON.stringify(ideaIdentifier);
    }
    let id;
    if (typeof ideaIdentifier == 'string') {
        id = ideaIdentifier;
    } else {
        id = (ideaIdentifier as IdeaType).id
    }
    try {
        return fs.collection('ideas').doc(id).collection('chats').doc(getUID()).set({});
    } catch (error) {
        alert("Error while creating chat." + JSON.stringify(error));
    }
}

function sendChatMessage(chat: Chat, message: ChatMessage) {

}

export {
    createProfileData, updateProfileData, getProfileData,
    getUserIdeas, getIdeas, createIdea, updateIdea,
    startChat, sendChatMessage
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
        if (data.id != undefined) {
            delete data.id;
        }
        return data;
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): ProfileData {
        const data = snapshot.data(options);
        data.blockedUsers = Object.keys(data.blockedUsers).map((userKey: any) => {
            return { id: userKey, name: data.blockedUsers[userKey] } as BlockedUser;
        })
        data.id = snapshot.id;
        return data as ProfileData;
    }
};

const ideaConverter = {
    toFirestore(data: IdeaType): firebase.firestore.DocumentData {

        //for EXACT search, if needed any time:
        //reduces tags from format of array to an object where every tag is set like this: {ANDROID: true, IOS: false}
        //this is done whith EVERY key of the enum so every tag is definietly set in the resulting object
        //this is done because of the firebase filtered query, which wouldn't work otherwise
        // const transformedTags = Object.keys(Tag).filter((key: any) => !isNaN(Number(Tag[key]))).reduce((previousObject: any, keyName) => {
        //     previousObject[keyName] = data.tags.find(tag => Tag[tag] == keyName) !== undefined;
        //     return previousObject;
        // }, {});

        // data.tags = transformedTags;

        if (data.id != undefined) {
            delete data.id;
        }
        return data;
    },

    fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): IdeaType {
        const data = snapshot.data(options);
        // data.tags = Object.keys(data.tags).filter(key => data.tags[key]).map((key: any) => Tag[key]);

        data.id = snapshot.id;
        return data as IdeaType;
    }
};

// function sanitizeProfilePictureURL(url) {
//     // TODO: needed?
//     // https://lh3.googleusercontent.com/a-/AOh14GjTQVmEk-kWD1fKnagm2W7U6wyEKUx_S0yFV1IQGg=s200-p-k-no-mo
// }
