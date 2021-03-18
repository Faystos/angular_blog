import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FbCreateResponse, Post } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class PostService {
 constructor(
   private http: HttpClient
   ) {}

  create = (post: Post): Observable<any> => {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: any) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }
    ));
  }
}
