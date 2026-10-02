import { httpResource } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-todos',
  imports: [NzTableModule, NzTagModule],
  templateUrl: './todos.html',
})
export class Todos {
  id = input<number>();

  todosResource = httpResource<PlaceholderTodo[]>(
    () => ({
      url: `https://jsonplaceholder.typicode.com/todos?userId=${this.id()}`,
    }),
    { defaultValue: [] },
  );

  toggle(id: number) {
    this.todosResource.value.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }
}
