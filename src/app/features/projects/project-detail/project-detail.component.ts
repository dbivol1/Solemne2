import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faPlus, 
  faCheck, 
  faTimes,
  faCalendarAlt,
  faFileAlt,
  faCommentAlt,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../../../core/services/project.service';
import { Project, Deliverable, Comment } from '../../../core/models/project.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    FontAwesomeModule,
    StatusBadgeComponent,
    ProgressBarComponent
  ],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;
  faCheck = faCheck;
  faTimes = faTimes;
  faCalendarAlt = faCalendarAlt;
  faFileAlt = faFileAlt;
  faCommentAlt = faCommentAlt;
  faArrowLeft = faArrowLeft;
  
  project: Project | undefined;
  
  // Para nuevos entregables
  newDeliverable: Partial<Deliverable> = {
    name: '',
    description: '',
    dueDate: new Date(),
    isDelivered: false
  };
  
  // Para nuevos comentarios
  newComment: string = '';
  
  // Pestañas
  activeTab: 'info' | 'deliverables' | 'comments' = 'info';
  
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectId = Number(params.get('id'));
      if (projectId) {
        this.loadProject(projectId);
      }
    });
  }
  
  loadProject(id: number): void {
    this.projectService.getProjectById(id).subscribe(project => {
      this.project = project;
    });
  }
  
  setActiveTab(tab: 'info' | 'deliverables' | 'comments'): void {
    this.activeTab = tab;
  }
  
  addDeliverable(): void {
    if (!this.project || !this.newDeliverable.name || !this.newDeliverable.description) {
      return;
    }
    
    this.projectService.addDeliverable(this.project.id, {
      id: 0, // Se asignará en el servicio
      projectId: this.project.id,
      name: this.newDeliverable.name,
      description: this.newDeliverable.description,
      dueDate: this.newDeliverable.dueDate || new Date(),
      isDelivered: false,
      attachments: []
    }).subscribe(deliverable => {
      // Limpiar el formulario
      this.newDeliverable = {
        name: '',
        description: '',
        dueDate: new Date(),
        isDelivered: false
      };
      
      // Recargar el proyecto para ver los cambios
      this.loadProject(this.project!.id);
    });
  }
  
  toggleDeliverableStatus(deliverable: Deliverable): void {
    if (!this.project) return;
    
    this.projectService.updateDeliverableStatus(
      this.project.id,
      deliverable.id,
      !deliverable.isDelivered
    ).subscribe(success => {
      if (success) {
        // Recargar el proyecto para ver los cambios
        this.loadProject(this.project!.id);
      }
    });
  }
  
  addComment(): void {
    if (!this.project || !this.newComment.trim()) {
      return;
    }
    
    this.projectService.addComment(this.project.id, {
      id: 0, // Se asignará en el servicio
      projectId: this.project.id,
      author: 'Usuario',
      content: this.newComment,
      date: new Date(),
      isClient: false
    }).subscribe(comment => {
      // Limpiar el formulario
      this.newComment = '';
      
      // Recargar el proyecto para ver los cambios
      this.loadProject(this.project!.id);
    });
  }
  
  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  }
  
  getCompletedDeliverables(): number {
    if (!this.project || !this.project.deliverables) return 0;
    return this.project.deliverables.filter(d => d.isDelivered).length;
  }
  
  getPendingDeliverables(): number {
    if (!this.project || !this.project.deliverables) return 0;
    return this.project.deliverables.filter(d => !d.isDelivered).length;
  }
}

