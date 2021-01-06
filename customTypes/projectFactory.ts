import firebase from 'firebase/app';
import {getUID} from '../services/auth';
import {Project} from './project';
import {Tag} from './tags';
export class ProjectFactory {
    private _authorID?: string;
    private _creationTimestamp?: firebase.firestore.Timestamp;
    private _description?: string;
    private _imageURLs?: string[];
    private _name?: string;
    private _tags?: Tag[]
    private _id?: string;

    constructor() {
    }

    with(): ProjectFactory {
        return this;
    }

    and(): ProjectFactory {
        return this;
    }
    
    authorID(authorID: string) {
        this._authorID = authorID;
        return this;
    }

    /**
     * Default value is the current user
     */
    authorIDDefault() {
        this._authorID = getUID();
        return this;
    }
    
    creationTimestamp(creationTimestamp: firebase.firestore.Timestamp) {
        this._creationTimestamp = creationTimestamp;
        return this;
    }

    /**
     * Default value is now()
     */
    creationTimestampDefault() {
        this._creationTimestamp = firebase.firestore.Timestamp.now();
        return this;
    }
    
    description(description: string) {
        this._description = description;
        return this;
    }
    
    imageURLs(imageURLs: string[]) {
        this._imageURLs = imageURLs;
        return this;
    }
    
    name(name: string) {
        this._name = name;
        return this;
    }
    
    tags(tags: Tag[]) {
        this._tags = tags;
        return this;
    }

    /**
     * No tags specified
     */
    tagsEmpty() {
        this._tags = [];
        return this;
    }
    
    id(id: string) {
        this._id = id;
        return this;
    }

    build(): Project {
        const project = {
            authorID: this._authorID,
            creationTimestamp: this._creationTimestamp,
            description: this._description,
            imageURLs: this._imageURLs,
            name: this._name,
            tags: this._tags,
            id: this._id
        } as Project

        //clear 
        Object.keys(project).forEach(key => {
            if ((project as any)[key] == undefined) {
                delete (project as any)[key];
            }
        })

        return project;
    }
}