import { BlockedUser } from './blockedUsers';
export interface ProfileData {
    profilePictureURL: string;
    name: string;
    description: string;
    skills: string[];
    blockedUsers: BlockedUser[];
    id?: string;
    ideaChatsPinned: PinnedChat[];
}

export interface PinnedChat {
    ideaID: string;
    name: string;
    pictureURL: string;
}