import {Tag} from "./tags";

export interface Idea {
    authorID: string;
    authorName: string;
    authorProfilePictureURL: string;
    creationTimestamp: firebase.firestore.Timestamp;
    description: string;
    imageURLs: string[];
    name: string;
    tags: Tag[]
    id?: string;
}