import { httpResource } from '@angular/common/http';
import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const TABS = ['photos', 'posts', 'todos'];

@Component({
  selector: 'app-user-detail',
  imports: [NzTabsModule, RouterOutlet, NzPageHeaderModule],
  templateUrl: './detail.html',
  styleUrls: ['./details.css'],
})
export class Detail {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = input<number>();
  readonly selectedIndex = signal(0)

  private readonly userResource = httpResource<PlaceholderUser>(
    () => ({
      url: `https://jsonplaceholder.typicode.com/users/${this.id()}`,
    }),
    { defaultValue: {} as PlaceholderUser },
  );
  readonly user = this.userResource.value;

  // private currentChild = toSignal(
  //   this.router.events.pipe(
  //     filter((e) => e instanceof NavigationEnd),
  //     map(() => this.router.url.split('/').pop()),
  //     startWith(this.router.url.split('/').pop()),
  //   ),
  // );

  // selectedIndex = computed(() => TABS.indexOf(this.currentChild() ?? 'photos'));

  go(tab: string) {
    this.selectedIndex.set(TABS.indexOf(tab))
    this.router.navigate([tab], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['/users']);
  }
}
