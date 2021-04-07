import { PostService } from './../shared/post.service';
import { Observable } from 'rxjs';
import { Post } from './../shared/interfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {  
  posts$: Observable<Post[]>

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.getAllPosts();
  }

}
