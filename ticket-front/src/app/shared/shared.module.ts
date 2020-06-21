import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, AlertComponent]
})
export class SharedModule {}
