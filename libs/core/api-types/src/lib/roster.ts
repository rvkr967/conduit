export interface RosterUserData {
    userName: string;
    articlesAuthored: number;
    likesReceived: number;
    firstArticleDate: Date | null; // Date or null if no articles
  }