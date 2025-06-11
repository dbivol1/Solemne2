import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatus } from '../../../core/models/project.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input() status!: ProjectStatus;
  
  get statusClass(): string {
    switch (this.status) {
      case ProjectStatus.IN_PROGRESS:
        return 'status-in-progress';
      case ProjectStatus.FINISHED:
        return 'status-finished';
      case ProjectStatus.DELAYED:
        return 'status-delayed';
      default:
        return '';
    }
  }
}

