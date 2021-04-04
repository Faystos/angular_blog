import { AlertService } from './../shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Post } from 'src/app/shared/interfaces';
import { PostService } from '../../shared/post.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup

  constructor(
    private postService: PostService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      content: new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit = () => {
    if (this.form.invalid) return;

    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
      date: new Date()
    }

    this.postService.create(post)
    .subscribe(() => {
      this.form.reset();
      this.alertService.success('Пост добавлен');
    });
  }
}
