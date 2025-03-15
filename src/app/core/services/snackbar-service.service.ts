import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  public notification$: Subject<string> = new Subject();
  public Mensaje$: Subject<string> = new Subject();
  dialog = inject(MatDialog);

  constructor( private snackBar: MatSnackBar) {
    this.notification$.subscribe((message) => {
      this.snackBar.open(message, 'Cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    });
    this.Mensaje$.subscribe((message) => {
      this.snackBar.open(message, 'Cerrar', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 0,
      });
    });
  }
  confirmDialog(message: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if(result){
          observer.next(true);
        }
      });
    });

  }

}
