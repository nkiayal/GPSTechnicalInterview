import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationComponent } from './confirmation.component';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [ConfirmationComponent],
  exports: [ConfirmationComponent],
})
export class ConfirmationModule {}
