export interface ChatMessage {
    id?: string;
    ideaID: string;
    authorID: string;
    authorName: string;
    authorProfilePictureURL: string;
    timestamp: firebase.firestore.Timestamp;
    content: string;
}
