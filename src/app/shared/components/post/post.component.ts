import { Post } from './../../interfaces';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
 @Input()post: Post;
  

  constructor(
   
  ) { }

  ngOnInit(): void {
    
  }

}
