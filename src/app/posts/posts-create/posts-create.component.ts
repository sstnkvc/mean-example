import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPost } from 'src/app/model/post.model';

@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.scss'],
})
export class PostsCreateComponent implements OnInit {
  constructor() {}

  @Output() addPostEvent = new EventEmitter<IPost>();

  enteredValue: string = '';
  enteredTitle: string = '';

  ngOnInit(): void {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const createdPost: IPost = {
      title: form.value.title,
      content: form.value.content,
    };
    this.addPostEvent.emit(createdPost);
  }
}
