import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostListComponent } from './posts/posts-list/post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'create', component: PostsCreateComponent },
  { path: 'edit/:id', component: PostsCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
