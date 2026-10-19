import { httpResource } from '@angular/common/http';
import { Component, computed, input } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';

interface Column {
  key: string;
  label: string;
}

@Component({
  selector: 'app-section',
  imports: [NzTableModule],
  templateUrl: './section.html',
})
export class Section {
  title = input('');
  url = input('');
  listKey = input('');
  columns = input<Column[]>([]);

  resource = httpResource<unknown>(() => this.url() || undefined);

  rows = computed(() => {
    const data = this.resource.value() as any;
    const list = this.listKey() ? data?.[this.listKey()] : data;
    return Array.isArray(list) ? (list as Record<string, unknown>[]) : [];
  });
}
