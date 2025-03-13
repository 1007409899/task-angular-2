import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  public notification$: Subject<string> = new Subject();
  public Mensaje$: Subject<string> = new Subject();

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
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


}
