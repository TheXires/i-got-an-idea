import {Tag} from "./tags";

export interface Project {
    authorID: string;
    creationTimestamp: firebase.firestore.Timestamp;
    description: string;
    imageURLs: string[];
    name: string;
    tags: Tag[]
    id?: string;
}