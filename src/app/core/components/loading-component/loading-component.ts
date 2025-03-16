import { Component, signal, effect, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';
import { LoadingService } from '@app/core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule],
  template: `
    <div *ngIf="isLoading()" class="overlay">
      <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
    `,
  ],
})
export class LoadingComponent {
  loadingService = inject(LoadingService);
  isLoading = this.loadingService.isLoading;
}
