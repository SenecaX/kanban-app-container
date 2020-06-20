import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule],
  exports: [CommonModule, AlertComponent]
})
export class SharedModule {}
