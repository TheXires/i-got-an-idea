import { BlockedUser } from './blockedUsers';
export interface ProfileData {
    profilePictureURL: string;
    name: string;
    description: string;
    skills: string[];
    blockedUsers: BlockedUser[];//TODO: Zu Objekt machen
}