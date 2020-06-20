import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanRoutingModule } from './kanban-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FontAwesomeModule,
    DragDropModule,
    KanbanRoutingModule
    // StoreModule.forFeature('users', reducer)
  ],
  exports: [FontAwesomeModule],
  declarations: [DashboardComponent]
})
export class KanbanModule {}
