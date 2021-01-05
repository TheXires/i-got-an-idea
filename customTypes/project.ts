import {Tag} from "./tags";

export interface Project {
    authorID: string;
    creationTimestamp: string;
    description: string;
    imageURLs: string[];
    name: string;
    tags: Tag[]
}