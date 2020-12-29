import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ClickElsewhereDirective } from '../directives/click-elsewhere.directive';
import { ActiveTabViewComponent } from './components/active-tab-view/active-tab-view.component';
import { TabListComponent } from './components/tab-list/tab-list.component';
import { TabSingleComponent } from './components/tab-single/tab-single.component';
import { TabsPageComponent } from './pages/tabs-page/tabs-page.component';
import { TabsService } from './services/tabs.service';



@NgModule({
  declarations: [
    TabListComponent,
    TabSingleComponent,
    ActiveTabViewComponent,
    ClickElsewhereDirective,
    TabsPageComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule
  ],
  providers: [
    TabsService
  ],
  exports: [
    TabsPageComponent
  ]
})
export class TabsModule { }
