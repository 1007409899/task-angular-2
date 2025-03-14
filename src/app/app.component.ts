import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HttpClientModule, MatSnackBarModule, ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-front';
}
