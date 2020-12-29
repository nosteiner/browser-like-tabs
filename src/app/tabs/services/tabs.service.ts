import { Injectable } from '@angular/core';
import { keys } from 'lodash';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

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

  private _tabList: Record<string, ITab> = this.createInitialTabList();
  private _tabList$ = new Subject<Record<string, ITab>>();
  readonly tabList$ = this._tabList$.asObservable().pipe(startWith(this._tabList));

  private _activeTabId = String(this.tabIdSequence);
  private _activeTabId$ = new Subject<string>();
  readonly activeTabId$ = this._activeTabId$.asObservable().pipe(startWith(this._activeTabId));;

  public get isExceededMaxTab() { return keys(this._tabList).length === this.MAX_TAB; }

  constructor() {
  }

  private createInitialTab(id: string): ITab {
    return {
      id,
      title: 'New tab'
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
    this._tabList[newId] = this.createInitialTab(newId);

    this._tabList$.next(this._tabList);
    this._activeTabId$.next(newId);
  }

  public update(tabInput: ITab): void {
    this._tabList[tabInput.id] = tabInput;
    this._tabList$.next(this._tabList);
  };

  public delete(id: string): void {
    delete this._tabList[id];
    this._tabList$.next(this._tabList);
  };

  public updateActiveTabId(id: string): void {
    this._activeTabId = id;
    this._activeTabId$.next(this._activeTabId);
  }
}
