export enum Platform {
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  Instagram = 'Instagram',
  Facebook = 'Facebook'
}

export enum PostStatus {
  Draft = 'Draft',
  Scheduled = 'Scheduled',
  Published = 'Published'
}

export interface SocialPost {
  id: string;
  content: string;
  platform: Platform;
  scheduledDate: Date;
  status: PostStatus;
  topic?: string;
  imageUrl?: string; // Optional placeholder image
}

export interface ConnectedAccount {
  platform: Platform;
  isConnected: boolean;
  username?: string;
  avatarUrl?: string;
}

export interface GeneratePostParams {
  topic: string;
  platform: Platform;
  tone: string;
}

export interface AutoScheduleParams {
  topic: string;
  count: number;
  startDate: Date;
}