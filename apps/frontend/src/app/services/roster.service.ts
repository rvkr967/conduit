import { Injectable } from '@angular/core';
import { ApiService } from '@realworld/core/http-client';
import { Observable, combineLatest, map } from 'rxjs';
import { RosterUserData, User, Article } from '@realworld/core/api-types';

@Injectable({
  providedIn: 'root'
})
export class RosterService {
  constructor(private apiService: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/user/all/');
  }

  getArticles(): Observable<{ articles: Article[]; articlesCount: number }> {
    return this.apiService.get<{ articles: Article[]; articlesCount: number }>('/articles/');
  }

  getConduitRosterData(): Observable<RosterUserData[]> {
    return combineLatest([
      this.getUsers(),
      this.getArticles()
    ]).pipe(
      map(([users, articles]) => {
        // Group articles by user and calculate statistics
        const userStats = users.map(user => {
          const userArticles = articles.articles.filter((article: Article) => article.author.id === user.id);
          return {
            userName: user.username,
            articlesAuthored: userArticles.length,
            likesReceived: userArticles.reduce((totalLikes: any, article: Article) => totalLikes + article.favoritesCount, 0),
            firstArticleDate: userArticles.length > 0 ? new Date(Math.min(...userArticles.map((article: Article) => new Date(article.createdAt).getTime()))) : null
          };
        });

        // Sort users by likes received (descending order)
        userStats.sort((a: any, b: any) => b.likesReceived - a.likesReceived);

        return userStats;
      })
    );
  }
}
