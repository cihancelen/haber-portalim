import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddOrUpdateNewComponent } from './components/add-or-update-new/add-or-update-new.component';
import { ListNewsComponent } from './components/list-news/list-news.component';
import { ManagerLayoutComponent } from './manager-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      { path: '', redirectTo: 'list-news', pathMatch: 'full' },
      { path: 'list-news', component: ListNewsComponent },
      { path: 'add-new', component: AddOrUpdateNewComponent },
      { path: 'new/:id', component: AddOrUpdateNewComponent }
    ],
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
    ManagerLayoutComponent,
    AddOrUpdateNewComponent,
    ListNewsComponent
  ],
  providers: [],
})
export class ManagerModule { }
