import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Article } from '@realworld/core/api-types';
@Component({
  selector: 'cdt-article-list-item',
  standalone: true,
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListItemComponent {
  @Input() article!: Article;
  @Output() favorite: EventEmitter<string> = new EventEmitter();
  @Output() unFavorite: EventEmitter<string> = new EventEmitter();
  @Output() navigateToArticle: EventEmitter<string> = new EventEmitter();
  toggleFavorite(article: Article) {
    if (article.favorited) {
      this.unFavorite.emit(article.slug);
    } else {
      this.favorite.emit(article.slug);
    }
  }

  // Define a custom function to split the array based on two empty strings
  splitArrayByTwoEmptyStrings(arr: string[]) {
    const result = [];
    let word = "";

    for (const item of arr) {
      if (item === "") {
        // Check if we've encountered two consecutive empty strings
        if (word !== "") {
          result.push(word);
          word = "";
        }
      } else {
        word += item;
      }
    }

    // Push the last word if it's not empty
    if (word !== "") {
      result.push(word);
    }

    return result;
  }
}
