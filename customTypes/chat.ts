import {PinnedChat as PinnedIdea} from "./profileData";

export interface ChatMessage {
    id?: string;
    ideaID: string;
    authorID: string;
    authorName: string;
    authorProfilePictureURL: string;
    timestamp: firebase.firestore.Timestamp;
    content: string;
}

export interface Chat {
    pinnedIdea: PinnedIdea;
    messages: ChatMessage[];
    //The last synced message from the database to set cursor condition for refresh query
    lastSyncedMessageTimestamp: firebase.firestore.Timestamp;
}