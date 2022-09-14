import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/core/posts/posts.service';
import { IPost } from 'src/app/model/post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent implements OnInit {
  private createMode: boolean = true;
  isLoading: boolean = false;

  private postIdToBeEdited: string = '';

  public postToBeEdited: IPost = {} as IPost;

  formGroup: FormGroup;
  imagePreviewPath: string = '';

  constructor(
    private postsService: PostsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.subscribeToRouteParams();
  }

  // onImagePicked(event: Event) {
  //   const file = (event.target as HTMLInputElement).files[0];
  //   this.formGroup.patchValue({ image: file });
  //   this.formGroup.get('image').updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.imagePreviewPath = reader.result as string;
  //   };

  //   reader.readAsDataURL(file);
  // }

  initializeFormGroup() {
    this.formGroup = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  subscribeToLoadingPostFromBackend() {
    this.postsService.getPost(this.postIdToBeEdited).subscribe((post) => {
      this.isLoading = false;
      this.postToBeEdited = {
        id: post.body._id,
        title: post.body.title,
        content: post.body.content,
      };

      this.formGroup.setValue({
        title: this.postToBeEdited.title,
        content: this.postToBeEdited.content,
      });
    });
  }

  subscribeToRouteParams() {
    this.activatedRoute.paramMap.subscribe(async (paramMap) => {
      if (paramMap.has('id')) {
        this.createMode = false;
        this.postIdToBeEdited = paramMap.get('id');
        this.isLoading = true;
        this.subscribeToLoadingPostFromBackend();
      } else {
        this.createMode = true;
      }
    });
  }

  onSavePost() {
    if (this.formGroup.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.createMode) {
      this.postsService.addPost(
        this.formGroup.value.title,
        this.formGroup.value.content
      );
    } else {
      this.postsService.updatePost(
        this.postIdToBeEdited,
        this.formGroup.value.title,
        this.formGroup.value.content
      );
    }
    this.formGroup.reset();
  }
}
