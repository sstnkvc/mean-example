import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/posts/posts.service';
import { IPost } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostsService) {}

  posts: IPost[] = [];
  postSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.posts = this.postService.getAllPosts();
    this.initializeSubscriptions();
  }

  initializeSubscriptions() {
    this.postSubscription = this.postService
      .getPostsObservable()
      .subscribe((currentPosts: IPost[]) => {
        this.posts = currentPosts;
      });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
