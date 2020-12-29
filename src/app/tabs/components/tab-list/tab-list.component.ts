import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { difference, filter, isNil, keys } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ITab, TabsService } from '../../services/tabs.service';

@Component({
  selector: 'app-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit, OnDestroy {
  orderedTabIds: string[] = [];

  get tabList$() { return this.tabsService.tabList$; }
  get activeTabId$() { return this.tabsService.activeTabId$; }

  private _unsubscribeAll = new Subject();

  constructor(private tabsService: TabsService) {
  }

  ngOnInit(): void {
    this.tabList$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(list => this.updateOrderedTabIdsValues(list));
  }

  onTabClick(id: string): void {
    this.tabsService.updateActiveTabId(id);
  };

  onTabChange(tabInput: ITab): void {
    this.tabsService.update(tabInput);
  }

  onCloseTab(tabId): void {
    this.tabsService.delete(tabId);
  }

  onAddNewTab(): void {
    this.tabsService.create();
  }

  onDropElement(
    event: CdkDragDrop<string[]>
  ): void {
    this.updateOrderedTabIdsOrder(event.previousIndex, event.currentIndex);
  }

  updateOrderedTabIdsValues(
    tabList: Record<number, ITab>
  ): void {
    const newValues = difference(keys(tabList), this.orderedTabIds);
    this.orderedTabIds = filter(this.orderedTabIds, id => !isNil(tabList[id]))
      .concat(newValues);
  }

  updateOrderedTabIdsOrder(
    previousIndex: number,
    currentIndex: number
  ): void {
    const tabId = this.orderedTabIds[previousIndex];
    moveItemInArray(this.orderedTabIds, previousIndex, currentIndex);
    this.tabsService.updateActiveTabId(tabId);
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  };

}
