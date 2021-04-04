import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  formEdit: FormGroup;
  post: Post;
  submited: boolean = false;
  uSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postServise: PostService
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( (params: Params) => this.postServise.getPost(params['id']) )
      ).subscribe((post: Post) => {
        this.post = post;
        this.formEdit = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          content: new FormControl(post.content, Validators.required)
        });
      });
  }

  ngOnDestroy(): void {
    if(this.uSub) this.uSub.unsubscribe();
  }

  submit = (evt): void => {
    evt.preventDefault();
    if (this.formEdit.invalid) return;
    this.submited = true;



    this.uSub = this.postServise.update({
      ...this.post,
      title: this.formEdit.value.title,
      content: this.formEdit.value.content
    }).subscribe(() => {
      console.log(this.post.id);
      this.submited = false;
    })
  }
}
