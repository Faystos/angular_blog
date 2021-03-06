import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FbCreateResponse, Post } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class PostService {
  constructor(
    private http: HttpClient
    ) {}  

  getAllPosts = (): Observable<Post[]> => {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(map((res: {[key: string]: any}) => {
      if (res !== null) {
        return Object
        .keys(res)
        .map(key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }))
      } else {
        return [];
      }      
    }))
  }

  getPost = (id: string): Observable<Post> => {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
    .pipe(map((post: Post) => {
      return {
        ...post, id,
        date: new Date(post.date)
      }
    }
  ));
  }

  create = (post: Post): Observable<Post> => {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }
    ));
  }

  update = (post: Post): Observable<Post> => {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

  remove = (id: string): Observable<void> => this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
}
