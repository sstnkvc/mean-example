import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor() {}

  posts = [
    { title: 'First Post', content: 'This is the first posts content' },
    { title: 'Second Post', content: 'This is the second posts content' },
    { title: 'Third Post', content: 'This is the third posts content' },
  ];

  ngOnInit(): void {}
}
