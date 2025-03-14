import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {  MatIconModule } from '@angular/material/icon';
import {  MatTooltipModule } from '@angular/material/tooltip';

@Component({
  standalone:true,
  imports:[
    MatDialogModule,
    MatTooltipModule,
    MatIconModule
  ],
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  message = '¿Estás seguro que desea continuar?';
  confirmButtonText = '';
  cancelButtonText = '';
  confirmButtonIcon = 'done';
  cancelButtonIcon = 'close';

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmDialogComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if (data.buttonIcons) {
        this.confirmButtonIcon = data.buttonIcons.ok || this.confirmButtonIcon;
        this.cancelButtonIcon = data.buttonIcons.cancel || this.cancelButtonIcon;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
