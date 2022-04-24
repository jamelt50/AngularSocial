import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './auth.guard';
import { GuestGuard } from './guest.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [GuestGuard] },
  {
    path: 'inscription',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  { path: 'utilisateurs', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'utilisateurs/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
  },

  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  {
    path: 'articles/:id',
    component: ArticleDetailComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
