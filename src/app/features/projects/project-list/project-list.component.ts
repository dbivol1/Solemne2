import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../../../core/services/project.service';
import { Project, ProjectStatus, ProjectPriority } from '../../../core/models/project.model';
import { ProjectCardComponent } from '../../../shared/components/project-card/project-card.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FontAwesomeModule, ProjectCardComponent],
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  faSearch = faSearch;
  faFilter = faFilter;
  faPlus = faPlus;
  
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  
  // Filtros
  searchTerm: string = '';
  clientFilter: string = '';
  statusFilter: ProjectStatus | '' = '';
  priorityFilter: ProjectPriority | '' = '';
  
  // Opciones para filtros
  clients: string[] = [];
  statuses = Object.values(ProjectStatus);
  priorities = Object.values(ProjectPriority);
  
  showFilters = false;
  
  constructor(private projectService: ProjectService) { }
  
  ngOnInit(): void {
    this.loadProjects();
    this.clients = this.projectService.getClients();
  }
  
  loadProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
      this.applyFilters();
    });
  }
  
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
  applyFilters(): void {
    this.projectService.getFilteredProjects(
      this.clientFilter || undefined,
      this.statusFilter || undefined,
      this.priorityFilter || undefined,
      this.searchTerm || undefined
    ).subscribe(filteredProjects => {
      this.filteredProjects = filteredProjects;
    });
  }
  
  resetFilters(): void {
    this.searchTerm = '';
    this.clientFilter = '';
    this.statusFilter = '';
    this.priorityFilter = '';
    this.applyFilters();
  }
}

