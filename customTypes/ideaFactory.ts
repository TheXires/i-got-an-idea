import firebase from 'firebase/app';
import {getUID} from '../services/auth';
import {IdeaType} from './ideaType';
import {Tag} from './tags';
export class IdeaFactory {
    private _authorID?: string;
    private _creationTimestamp?: firebase.firestore.Timestamp;
    private _description?: string;
    private _imageURLs?: string[];
    private _name?: string;
    private _tags?: Tag[]
    private _id?: string;

    constructor() {
    }

    // Getter
    public getDescription(){
        return this._description;
    }

    public getImageURLs(){
        return this._imageURLs;
    }
    
    public getName() {
        return this._name;
    }


    public getTags() {
        return this._tags;
    }
    

    // setter
    with(): IdeaFactory {
        return this;
    }

    and(): IdeaFactory {
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

    /**
     * Use when no images are defined
     */
    imageURLsEmpty() {
        this._imageURLs = [];
        return this;
    }

    name(name: string) {
        this._name = name;
        return this;
    }

    tags(tags: Tag[]) {
        this._tags = tags.filter((tag, index, self) => index === self.indexOf(tag));
        return this;
    }
    
    addTags(tags: Tag[]) {
        if(this._tags !== undefined){
          this._tags = [...this._tags,...tags];
          this._tags = this._tags?.filter((tag, index, self) => index === self.indexOf(tag));
        }else{
          this.tags(tags);
        }
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
    
    /**
     * Builds the idea. Handles unset attributes without errors.
     */
    build(): IdeaType {
        const idea = {
            authorID: this._authorID,
            creationTimestamp: this._creationTimestamp,
            description: this._description,
            imageURLs: this._imageURLs,
            name: this._name,
            tags: this._tags?.filter((tag, index, self) => index === self.indexOf(tag)),
            id: this._id
        } as IdeaType;

        //clear unused attributes
        Object.keys(idea).forEach(key => {
            if ((idea as any)[key] == undefined) {
                delete (idea as any)[key];
            }
        })

        return idea;
    }

    /**
     * Builds with checking for undefined attributes enabled. Use it if you want to make sure everything is set, according to the idea interface
     * !The id attribute is excluded from this check and still can be null!
     * 
     * @throws Throws an error when any attribute is not set!
     */
    buildWithChecks() {
        const idea = {
            authorID: this._authorID,
            creationTimestamp: this._creationTimestamp,
            description: this._description,
            imageURLs: this._imageURLs,
            name: this._name,
            tags: this._tags?.filter((tag, index, self) => index === self.indexOf(tag)),
            id: this._id
        } as IdeaType;

        //checks for unset attributes
        Object.keys(idea).forEach(key => {
            if (key == 'id' && (idea as any)[key] == undefined) {
                delete (idea as any)[key];
            } else if ((idea as any)[key] == undefined) {
                throw key + ' seems to be undefined which is forbidden in buildWithChecks!';
            }
        })

        return idea;
    }
}