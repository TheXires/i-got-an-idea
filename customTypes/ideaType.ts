import {Tag} from "./tags";

export interface IdeaType {
    authorID: string;
    creationTimestamp: firebase.firestore.Timestamp;
    description: string;
    imageURLs: string[];
    name: string;
    tags: Tag[]
    id?: string;
}