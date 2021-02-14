import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-new',
  templateUrl: 'new.component.html'
})

export class NewComponent implements OnInit {

  news: News = {} as News;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const { id } = params;

      if (id) {
        this.newsService.getNewsByFriendlyUrl(id).subscribe(result => {
          const news = result[0];

          if (news) {
            this.news = news;
          }
        });
      }
    })
  }
}