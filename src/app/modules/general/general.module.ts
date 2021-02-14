import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewComponent } from './components/new/new.component';
import { NewsComponent } from './components/news/news.component';
import { GeneralLayoutComponent } from './general-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      { path: '', redirectTo: 'news', pathMatch: 'full' },
      { path: 'news', component: NewsComponent },
      { path: 'news/:id', component: NewComponent }
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [],
  declarations: [
    GeneralLayoutComponent,
    NewsComponent,
    NewComponent
  ],
  providers: [],
})
export class GeneralModule { }
