import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  exports: [
      MatCardModule, MatFormFieldModule, MatTableModule, MatIconModule,
      MatSelectModule, MatInputModule, MatButtonModule, MatMenuModule
    ],
})
export class MaterialModule {}
