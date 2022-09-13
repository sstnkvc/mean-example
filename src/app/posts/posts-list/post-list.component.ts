import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/model/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor() {}

  @Input() posts: IPost[] = [];

  ngOnInit(): void {}
}
