import { SlicePipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Component, effect, linkedSignal, Resource, resourceFromSnapshots, ResourceSnapshot, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SortHeader } from './sort-header';
import { TNBSort } from './sort';

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function withPreviousValue<T>(input: Resource<T>):Resource<T> {
  
  const derived = linkedSignal<ResourceSnapshot<T>, ResourceSnapshot<T>>({
    source: input.snapshot,
    computation: (snap, previous) => {
      if (snap.status === 'loading' && previous && previous.value.status !== 'error') {
        return { status: 'loading' as const, value: previous.value.value  }
      }
      return snap
    }
  })

  return resourceFromSnapshots(derived) 
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SlicePipe, SortHeader, TNBSort],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('table-sort-basic');

  sort = signal('');
  order = signal('asc');

  updateSort(event: { active: string; direction: string}) {
    this.sort.set(event.active);
    this.order.set(event.direction);
  }

  commentsRes = httpResource<Comment[]>(() => ({
      url: 'https://jsonplaceholder.typicode.com/comments',
      params: {
        _limit: 10,
        _sort: this.sort(),
        _order: this.order()
      }
    }), {defaultValue: []},
  );

  comments = withPreviousValue(this.commentsRes);

  sortBy(field: string) {
    if(this.sort() === field) {
      const newDir = this.order() === 'asc' ? 'desc' : 'asc';
      this.order.set(newDir)
      return
    }

    this.sort.set(field);
    this.order.set('asc');
  }
}

