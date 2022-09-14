import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/core/posts/posts.service';
import { IPost } from 'src/app/model/post.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostsService) {}

  posts: IPost[] = [];
  postSubscription: Subscription = new Subscription();
  isLoading: boolean = false;

  // pageinatorConfig: { totalPosts: number; postsPerPage: number } = {} as any;

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getAllPosts();
    this.initializeSubscriptions();
  }

  public onDeleteBtnClick(id: string) {
    this.postService.deletePost(id);
  }

  onChangePange(pageData: PageEvent) {
    console.log(pageData);
  }

  initializeSubscriptions() {
    this.postSubscription = this.postService
      .getPostsObservable()
      .subscribe((currentPosts: IPost[]) => {
        this.isLoading = false;
        this.posts = currentPosts;
      });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
