import { Component } from '@angular/core';
import { IPost } from './model/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mean-example';
  storedPosts: IPost[] = [];

  postAdded(post: any) {
    this.storedPosts.push(post);
  }
}
