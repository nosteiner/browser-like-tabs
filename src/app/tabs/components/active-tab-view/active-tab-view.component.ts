import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITab, TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-active-tab-view',
  templateUrl: './active-tab-view.component.html',
  styleUrls: ['./active-tab-view.component.scss']
})
export class ActiveTabViewComponent implements OnInit {
  activeTab$: Observable<ITab>;

  constructor(private tabsService: TabsService) { }

  ngOnInit(): void {
    this.activeTab$ = this.createActiveTabObservable();
  }

  createActiveTabObservable(): Observable<ITab> {
    return combineLatest([
      this.tabsService.activeTabId$,
      this.tabsService.tabList$
    ]).pipe(map(([activeTabId, tabList]) => tabList[activeTabId]));
  }
}
