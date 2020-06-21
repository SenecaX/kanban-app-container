import { NgModule } from '@angular/core';
import { AlertComponent } from './components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AlertComponent, HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, AlertComponent, HeaderComponent]
})
export class SharedModule {}
