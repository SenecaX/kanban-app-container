import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from 'src/app/shared/services/auth.guard.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanRoutingModule } from './board-routing.module';
import { boardReducer } from './state/board.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BoardEffects } from './state/board.effects';
import { MaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  imports: [
    SharedModule,
    FontAwesomeModule,
    DragDropModule,
    KanbanRoutingModule,
    StoreModule.forFeature('board', boardReducer),
    EffectsModule.forFeature([BoardEffects]),
    MaterialModule
  ],
  exports: [FontAwesomeModule],
  declarations: [DashboardComponent]
})
export class BoardModule {}
