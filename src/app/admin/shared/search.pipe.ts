import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/shared/interfaces";

@Pipe({
  name: 'searchPosts'
})

export class SerchPipe implements PipeTransform {
  transform(posts: Post[], serch = ''): Post[] {
    if (!serch.trim()) return posts;

    return posts.filter(post => post.title.toLowerCase().includes(serch.toLowerCase()));
  }

  
}