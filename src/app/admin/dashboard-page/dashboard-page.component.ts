import { PostService } from './../../shared/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchPost: string = '';

  constructor(
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.pSub = this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;      
    })
  }

  remove = (id: string): void => {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) this.pSub.unsubscribe;
    if (this.dSub) this.dSub.unsubscribe;
  }
}
