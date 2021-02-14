import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: 'news.component.html'
})

export class NewsComponent implements OnInit {
  $news: Observable<News[]> = new Observable();

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.$news = this.newsService.getNews;
  }
}