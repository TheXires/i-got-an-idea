export interface ChatMessage {
    id: string;
    ideaID: string;
    chatID: string;
    authorID: string;
    timestamp: firebase.firestore.Timestamp;
    content: string;
}
