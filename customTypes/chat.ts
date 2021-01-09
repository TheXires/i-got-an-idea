interface Chat {
    messages: ChatMessage[];
}

interface ChatMessage {
    authorID: string;
    timestamp: firebase.firestore.Timestamp;
    content: string;
}

export {Chat, ChatMessage}