import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-list-news',
  templateUrl: 'list-news.component.html'
})

export class ListNewsComponent implements OnInit {

  $news: Observable<News[]> = new Observable();

  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.$news = this.newsService.getNews;
  }
}