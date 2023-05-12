import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
   // return this.http.get<Post[]>('http://localhost:3000/posts');
   return this.http.get<Post[]>(`${environment.apiUrl}/posts`);
  }
}