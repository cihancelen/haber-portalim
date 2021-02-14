import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/core/models/news.model';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-add-or-update-new',
  templateUrl: 'add-or-update-new.component.html'
})

export class AddOrUpdateNewComponent implements OnInit {
  newsForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
    // img: new FormControl(''),
    tags: new FormControl('')
  });

  state: 'add' | 'update' = 'add';

  news!: News;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const { id } = params;

      if (id) {
        this.state = 'update';

        this.newsService.getNewsByFriendlyUrl(id).subscribe(result => {
          const news = result[0];

          if (news) {
            this.news = news;
            
            this.newsForm.setValue({
              title: news.title,
              description: news.description,
              tags: news.tags.join(',')
            })
          }
        });
      }
    })
  }

  submit() {
    if (this.newsForm.valid) {
      const news = this.newsForm.value as News;
      if (typeof news.tags === 'string') {
        news.tags = (news.tags as any).split(',');
      }

      if (this.state === 'add') {
        this.newsService.createNews(news).then(result => {
          this.router.navigate(['/manager']);
        })
      } else {
        news.id = this.news.id;
        news.friendlyUrl = this.news.friendlyUrl;
        
        this.newsService.updateNews(news).then(result => {
          this.router.navigate(['/manager']);
        })
      }
    }
  }

  onFileChange($event: any) {
    if ($event.target.files.length > 0) {
      const file = $event.target.files[0];

      file.objectURL = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
    }
  }
}