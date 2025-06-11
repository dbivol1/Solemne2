import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
  
  get progressClass(): string {
    if (this.progress < 25) {
      return 'progress-danger';
    } else if (this.progress < 75) {
      return 'progress-warning';
    } else {
      return 'progress-success';
    }
  }
}

