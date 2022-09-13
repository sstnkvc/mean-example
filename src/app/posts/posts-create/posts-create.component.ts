import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/posts/posts.service';
import { IPost } from 'src/app/model/post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  private createMode: boolean = true;
  private postIdToBeEdited: string = '';
  public postToBeEdited: IPost = {} as IPost;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      if (paramMap.has('id')) {
        this.createMode = false;
        const id = paramMap.get('id');
        this.postIdToBeEdited = id as string;
        await this.postsService
          .getPost(this.postIdToBeEdited)
          .subscribe((post) => {
            this.postToBeEdited = {
              id: post.body._id,
              title: post.body.title,
              content: post.body.content,
            };
          });
      } else {
        this.createMode = true;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.createMode) {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this.postIdToBeEdited,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
