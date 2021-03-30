import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  formEdit: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postServise: PostService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( (params: Params) => this.postServise.getPost(params['id']) )
      ).subscribe((post: Post) => {
        
        this.formEdit = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          content: new FormControl(post.content, Validators.required)
        });
        console.log(this.formEdit);
      });
  }

  submit = (evt): void => {
    evt.preventDefault();
    if (this.formEdit.invalid) return;
  }
}