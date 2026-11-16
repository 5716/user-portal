import { HttpClient, httpResource } from '@angular/common/http';
import { inject, linkedSignal, Service } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

const API = 'https://jsonplaceholder.typicode.com/users';

@Service({ autoProvided: false })
export class UsersService {
  private http = inject(HttpClient);

  private readonly usersResource = httpResource<PlaceholderUser[]>(() => API, {
    defaultValue: [],
  });

  readonly isLoading = this.usersResource.isLoading;
  readonly users = linkedSignal(() => this.usersResource.value());

  reload() {
    this.usersResource.reload();
  }

  add(value: Partial<PlaceholderUser>): Observable<unknown> {
    return this.http
      .post<PlaceholderUser>(API, value)
      .pipe(tap((user) => this.users.update((list) => [...list, user])));
  }

  edit(current: PlaceholderUser, value: Partial<PlaceholderUser>): Observable<unknown> {
    const updated: PlaceholderUser = { ...current, ...value, phone: value.phone || current.phone };
    const request = current.id <= 10 ? this.http.put(`${API}/${current.id}`, updated) : of(updated);

    return request.pipe(
      tap(() => this.users.update((list) => list.map((u) => (u.id === updated.id ? updated : u)))),
    );
  }
}
