import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { filter, map, startWith } from 'rxjs';
import { DashboardHeaderComponent } from '../../components/dashboard-header';

const TABS = ['photos', 'posts', 'todos'];

@Component({
  selector: 'app-user-detail',
  imports: [NzTabsModule, RouterOutlet, NzPageHeaderModule, DashboardHeaderComponent],
  templateUrl: './detail.html',
})
export class Detail {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private currentChild = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url.split('/').pop()),
      startWith(this.router.url.split('/').pop()),
    ),
  );

  selectedIndex = computed(() => TABS.indexOf(this.currentChild() ?? 'photos'));

  go(tab: string) {
    this.router.navigate([tab], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['/users']);
  }
}
