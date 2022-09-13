import { Injectable } from '@angular/core';
import { IPost } from 'src/app/model/post.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: IPost[] = [];
  private postSubjectUpdated = new Subject<IPost[]>();

  getAllPosts() {
    return [...this.posts];
  }

  getPostsObservable() {
    return this.postSubjectUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: IPost = { title, content };
    this.posts.push(post);
    this.postSubjectUpdated.next(this.posts);
  }

  constructor() {}
}
