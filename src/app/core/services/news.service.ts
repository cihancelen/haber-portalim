import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { News } from '../models/news.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  createNews(news: News) {
    news.createdDate = new Date();
    news.modifiedDate = new Date();
    news.author = {
      email: this.authService.isLoggedInManager?.email
    };
    news.friendlyUrl = this.toFriendlyUrl(news.title);

    return this.db.collection('news').add({
      ...news
    })
  }

  updateNews(news: News) {
    news.modifiedDate = new Date();
    news.friendlyUrl = this.toFriendlyUrl(news.title);

    const id = String(news.id);

    delete news.id;

    return this.db.collection('news').doc(id).update(news);
  }

  private toFriendlyUrl(value: string) {
    return value.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
  }

  get getNews() {
    return this.db.collection<News>('news', query => query.orderBy('createdDate', 'desc'))
      .snapshotChanges()
      .pipe(
        map(o => o.map(doc => ({ id: doc.payload.doc.id, ...doc.payload.doc.data() } as News)))
      );
  }

  getNewsByFriendlyUrl(url: string) {
    return this.db.collection<News>('news', query => query.where('friendlyUrl', '==', url))
      .snapshotChanges()
      .pipe(
        map(o => o.map(doc => ({ id: doc.payload.doc.id, ...doc.payload.doc.data() } as News)))
      );
  }

}