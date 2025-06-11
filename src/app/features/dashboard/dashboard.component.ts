import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faProjectDiagram, 
  faCheckCircle, 
  faExclamationTriangle, 
  faSpinner,
  faChartPie,
  faCalendarAlt,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../../core/services/project.service';
import { NotificationService } from '../../core/services/notification.service';
import { Project, ProjectStatus } from '../../core/models/project.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
    StatusBadgeComponent,
    ProgressBarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faProjectDiagram = faProjectDiagram;
  faCheckCircle = faCheckCircle;
  faExclamationTriangle = faExclamationTriangle;
  faSpinner = faSpinner;
  faChartPie = faChartPie;
  faCalendarAlt = faCalendarAlt;
  faUsers = faUsers;
  
  projects: Project[] = [];
  recentProjects: Project[] = [];
  delayedProjects: Project[] = [];
  clients: string[] = [];
  
  totalProjects = 0;
  completedProjects = 0;
  inProgressProjects = 0;
  delayedProjectsCount = 0;
  
  averageProgress = 0;
  
  constructor(
    public projectService: ProjectService,
    private notificationService: NotificationService
  ) { }
  
  ngOnInit(): void {
    this.loadProjects();
    this.notificationService.checkForDelayedProjects();
  }
  
  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.calculateStatistics();
      this.getRecentProjects();
      this.getDelayedProjects();
      this.clients = this.projectService.getClients();
    });
  }
  
  calculateStatistics(): void {
    this.totalProjects = this.projects.length;
    this.completedProjects = this.projects.filter(p => p.status === ProjectStatus.FINISHED).length;
    this.inProgressProjects = this.projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length;
    this.delayedProjectsCount = this.projects.filter(p => p.status === ProjectStatus.DELAYED).length;
    
    // Calcular progreso promedio
    if (this.totalProjects > 0) {
      const totalProgress = this.projects.reduce((sum, project) => sum + project.progress, 0);
      this.averageProgress = Math.round(totalProgress / this.totalProjects);
    }
  }
  
  getRecentProjects(): void {
    // Ordenar por fecha de inicio (más recientes primero) y tomar los 5 primeros
    this.recentProjects = [...this.projects]
      .sort((a, b) => {
        const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
        const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 5);
  }
  
  getDelayedProjects(): void {
    this.delayedProjects = this.projects.filter(p => p.status === ProjectStatus.DELAYED);
  }
  
  getClientProgress(client: string): number {
    const clientProjects = this.projects.filter(p => p.client === client);
    if (clientProjects.length === 0) return 0;
    
    const totalProgress = clientProjects.reduce((sum, project) => sum + project.progress, 0);
    return Math.round(totalProgress / clientProjects.length);
  }
  
  getClientProjectCount(client: string): number {
    return this.projects.filter(p => p.client === client).length;
  }
}

