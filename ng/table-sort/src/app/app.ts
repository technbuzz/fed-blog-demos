import { SlicePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SlicePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('table-sort-basic');

  comments = httpResource<Comment[]>(() => ({
    url: 'https://jsonplaceholder.typicode.com/comments',
    params: {
      _limit: 10
    }
  }), {defaultValue: []},
  );

}
