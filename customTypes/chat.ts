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
    ideaID: string;
    messages: ChatMessage[];
    //The last synced message from the database to set cursor condition for refresh query
    lastSyncedMessageTimestamp: firebase.firestore.Timestamp;
}