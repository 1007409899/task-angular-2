import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from './core/components/loading-component/loading-component';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  imports: [RouterOutlet, HttpClientModule, MatSnackBarModule, LoadingComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task-front';
}
