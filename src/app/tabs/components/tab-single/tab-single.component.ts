import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fromEvent, interval, Observable, Subject } from 'rxjs';
import { buffer, debounce, filter, map, takeUntil } from 'rxjs/operators';

import { ITab } from '../../services/tabs.service';

@Component({
  selector: 'app-tab-single',
  templateUrl: './tab-single.component.html',
  styleUrls: ['./tab-single.component.scss']
})
export class TabSingleComponent implements AfterViewInit {
  @Input() isActive = false;
  @Input() tab: ITab;
  @Output() tabChange = new EventEmitter<ITab>();
  @Output() closeTab = new EventEmitter<void>();
  @ViewChild('tabElement') tabElement: ElementRef<HTMLDivElement>;

  isEditMode = false;
  doubleClicks$: Observable<number>;
  private _unsubscribeAll = new Subject();

  constructor() { }

  onTitleChange(title: string): void {
    this.tabChange.emit({ ...this.tab, title });
  }

  ngAfterViewInit(): void {
    this.doubleClicks$ = this.createDoubleClicksObservable();

    this.doubleClicks$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(clicks => {
        this.isEditMode = true;
      });
  }

  createDoubleClicksObservable(): Observable<number> {
    const clicks$ = fromEvent(this.tabElement.nativeElement, 'click');

    return clicks$
      .pipe(
        buffer(clicks$.pipe(debounce(() => interval(200)))),
        map(clicksWithin300ms => clicksWithin300ms.length),
        filter(clicksWithin300ms => clicksWithin300ms === 2)
      );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  };

}
