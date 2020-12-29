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

  /**
   * Create a new tab record with initial values. 
   * The id is serial and is equal to the current tabIdSequence.
   * Increece the sequence after creation
   * If the maximum tabs exceeded an alert will pop
   * Set the new values and update subscribers with changes
   */
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

  /**
   * Create a new tabList with the updated data
   * Set the new values and update subscribers with changes
   * @param tabInput is the data to update
   */
  public update(tabInput: ITab): void {
    this._tabList$.next({
      ...this._tabList$.value,
      [tabInput.id]: tabInput
    });
  };

  /**
   * Create a new tabList without the tab to delete 
   * Set the new values and update subscribers with changes
   * @param id is the id of the tab to delete
   */
  public delete(id: string): void {
    const { [id]: tabsToDelete, ...tabsToKeep } = this._tabList$.value;
    this._tabList$.next(tabsToKeep);
  };

  /**
   * Set the new ActiveTabId and update subscribers with changes
   * @param id is the new active tab id
   */
  public updateActiveTabId(id: string): void {
    this._activeTabId$.next(id);
  }
}
