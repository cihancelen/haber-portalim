import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: 'general', loadChildren: () => import('./modules/general/general.module').then(m => m.GeneralModule), canActivate: [AuthGuard] },
  { path: 'manager', loadChildren: () => import('./modules/manager/manager.module').then(m => m.ManagerModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
