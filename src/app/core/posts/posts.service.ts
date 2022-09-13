import { Injectable } from '@angular/core';
import { IPost } from 'src/app/model/post.model';
import { Observable, Subject, firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private httpClient: HttpClient) {}

  private posts: IPost[] = [];
  private postSubjectUpdated = new Subject<IPost[]>();

  async getAllPosts() {
    const url = 'http://localhost:3000/api/posts';
    // const result = await firstValueFrom(
    //   this.httpClient.get('http://localhost:3000/api/posts')
    // );
    this.httpClient
      .get<{ message: string; body: any }>(url)
      .pipe(
        map((data) => {
          return data.body.map(
            (singlePost: { title: string; content: string; _id: string }) => {
              return {
                title: singlePost.title,
                content: singlePost.content,
                id: singlePost._id,
              };
            }
          );
        })
      )
      .subscribe((transformedPostsViaPipeMap) => {
        this.posts = transformedPostsViaPipeMap;
        this.postSubjectUpdated.next(this.posts);
      });
  }

  getPostsObservable() {
    return this.postSubjectUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const url = 'http://localhost:3000/api/posts';
    const post: IPost = { id: '', title, content };
    this.httpClient
      .post<{ message: string; postId: string }>(url, post)
      .subscribe((response) => {
        console.log(response.message);
        post.id = response.postId;
        this.posts.push(post);
        this.postSubjectUpdated.next(this.posts);
      });
  }

  deletePost(id: string) {
    const url = 'http://localhost:3000/api/posts/' + id;
    this.httpClient
      .delete<{ message: string; body: string }>(url)
      .subscribe((response) => {
        const updatedPosts = this.posts.filter((post) => post.id !== id);
        this.posts = updatedPosts;
        this.postSubjectUpdated.next([...this.posts]);
      });
  }
}
