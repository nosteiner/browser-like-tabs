import { Injectable } from '@angular/core';
import { keys } from 'lodash';
import { BehaviorSubject } from 'rxjs';

export interface ITab {
  id: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  MAX_TAB = 14;
  tabIdSequence = 0;

  private _tabList$ = new BehaviorSubject<Record<string, ITab>>(this.createInitialTabList());
  readonly tabList$ = this._tabList$.asObservable();

  private _activeTabId$ = new BehaviorSubject<string>(String(this.tabIdSequence));
  readonly activeTabId$ = this._activeTabId$.asObservable();

  public get isExceededMaxTab() {
    return keys(this._tabList$.value).length === this.MAX_TAB;
  }

  constructor() {
  }

  private createInitialTab(id: string): ITab {
    return {
      id,
      title: 'New Tab'
    };
  }

  private createInitialTabList(): Record<string, ITab> {
    this.tabIdSequence = 0;
    return {
      [this.tabIdSequence]: this.createInitialTab(String(this.tabIdSequence))
    };
  };

  public create(): void {
    if (this.isExceededMaxTab) {
      alert('Maximum tabs exceeded');
      return;
    }

    this.tabIdSequence++;
    const newId = String(this.tabIdSequence);
    const newTab = this.createInitialTab(newId);

    this._tabList$.next({
      ...this._tabList$.value,
      [newTab.id]: newTab
    });
    this._activeTabId$.next(newTab.id);
  }

  public update(tabInput: ITab): void {
    this._tabList$.next({
      ...this._tabList$.value,
      [tabInput.id]: tabInput
    });
  };

  public delete(id: string): void {
    const { [id]: tabsToDelete, ...tabsToKeep } = this._tabList$.value;
    this._tabList$.next(tabsToKeep);
  };

  public updateActiveTabId(id: string): void {
    this._activeTabId$.next(id);
  }
}
