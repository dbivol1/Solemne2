import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Project, ProjectStatus, ProjectPriority, Deliverable, Comment } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      name: 'Página Web E-commerce',
      client: 'Cliente A',
      status: ProjectStatus.IN_PROGRESS,
      priority: ProjectPriority.HIGH,
      progress: 40,
      description: 'Desarrollo de una tienda online para productos electrónicos',
      startDate: new Date('2025-05-01'),
      endDate: new Date('2025-07-15'),
      deliverables: [
        {
          id: 1,
          projectId: 1,
          name: 'Diseño de interfaz',
          description: 'Mockups y wireframes de todas las páginas',
          dueDate: new Date('2025-05-15'),
          isDelivered: true,
          attachments: ['mockup.pdf', 'wireframes.png']
        },
        {
          id: 2,
          projectId: 1,
          name: 'Implementación frontend',
          description: 'Desarrollo de la interfaz de usuario con Angular',
          dueDate: new Date('2025-06-15'),
          isDelivered: false,
          attachments: []
        }
      ],
      comments: [
        {
          id: 1,
          projectId: 1,
          author: 'Juan Pérez',
          content: 'Me gusta el diseño propuesto, pero necesitamos ajustar los colores.',
          date: new Date('2025-05-16'),
          isClient: true
        }
      ]
    },
    {
      id: 2,
      name: 'Diseño de Logo',
      client: 'Cliente B',
      status: ProjectStatus.FINISHED,
      priority: ProjectPriority.MEDIUM,
      progress: 100,
      description: 'Diseño de identidad visual para startup tecnológica',
      startDate: new Date('2025-04-15'),
      endDate: new Date('2025-05-15'),
      deliverables: [
        {
          id: 3,
          projectId: 2,
          name: 'Propuestas iniciales',
          description: '3 conceptos diferentes para el logo',
          dueDate: new Date('2025-04-25'),
          isDelivered: true,
          attachments: ['propuestas.pdf']
        },
        {
          id: 4,
          projectId: 2,
          name: 'Logo final',
          description: 'Archivos en diferentes formatos y manual de marca',
          dueDate: new Date('2025-05-10'),
          isDelivered: true,
          attachments: ['logo_final.ai', 'manual_marca.pdf']
        }
      ],
      comments: [
        {
          id: 2,
          projectId: 2,
          author: 'María González',
          content: 'Excelente trabajo, estamos muy satisfechos con el resultado.',
          date: new Date('2025-05-12'),
          isClient: true
        }
      ]
    },
    {
      id: 3,
      name: 'Desarrollo App Móvil',
      client: 'Cliente C',
      status: ProjectStatus.DELAYED,
      priority: ProjectPriority.HIGH,
      progress: 20,
      description: 'Aplicación móvil para gestión de inventario',
      startDate: new Date('2025-04-01'),
      endDate: new Date('2025-06-30'),
      deliverables: [
        {
          id: 5,
          projectId: 3,
          name: 'Diseño de UI/UX',
          description: 'Interfaces de usuario para todas las pantallas',
          dueDate: new Date('2025-04-20'),
          isDelivered: true,
          attachments: ['ui_design.sketch']
        },
        {
          id: 6,
          projectId: 3,
          name: 'Desarrollo backend',
          description: 'API REST para la aplicación',
          dueDate: new Date('2025-05-15'),
          isDelivered: false,
          attachments: []
        },
        {
          id: 7,
          projectId: 3,
          name: 'Aplicación Android',
          description: 'Versión para dispositivos Android',
          dueDate: new Date('2025-06-15'),
          isDelivered: false,
          attachments: []
        }
      ],
      comments: [
        {
          id: 3,
          projectId: 3,
          author: 'Carlos Rodríguez',
          content: 'Necesitamos acelerar el desarrollo, estamos retrasados según el cronograma.',
          date: new Date('2025-05-20'),
          isClient: true
        }
      ]
    }
  ];

  private projectsSubject = new BehaviorSubject<Project[]>(this.projects);

  constructor() { }

  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const project = this.projects.find(p => p.id === id);
    return of(project);
  }

  addProject(project: Project): Observable<Project> {
    // Asignar un nuevo ID
    const newId = Math.max(...this.projects.map(p => p.id), 0) + 1;
    const newProject = { ...project, id: newId };
    
    this.projects = [...this.projects, newProject];
    this.projectsSubject.next(this.projects);
    
    return of(newProject);
  }

  updateProject(project: Project): Observable<Project> {
    this.projects = this.projects.map(p => 
      p.id === project.id ? { ...project } : p
    );
    this.projectsSubject.next(this.projects);
    
    return of(project);
  }

  deleteProject(id: number): Observable<boolean> {
    this.projects = this.projects.filter(p => p.id !== id);
    this.projectsSubject.next(this.projects);
    
    return of(true);
  }

  addDeliverable(projectId: number, deliverable: Deliverable): Observable<Deliverable> {
    const project = this.projects.find(p => p.id === projectId);
    
    if (project) {
      // Asignar un nuevo ID para el entregable
      const newId = Math.max(...(project.deliverables?.map(d => d.id) || [0]), 0) + 1;
      const newDeliverable = { ...deliverable, id: newId, projectId };
      
      if (!project.deliverables) {
        project.deliverables = [];
      }
      
      project.deliverables.push(newDeliverable);
      this.updateProjectProgress(project);
      this.projectsSubject.next(this.projects);
      
      return of(newDeliverable);
    }
    
    return of(undefined as unknown as Deliverable);
  }

  addComment(projectId: number, comment: Comment): Observable<Comment> {
    const project = this.projects.find(p => p.id === projectId);
    
    if (project) {
      // Asignar un nuevo ID para el comentario
      const newId = Math.max(...(project.comments?.map(c => c.id) || [0]), 0) + 1;
      const newComment = { ...comment, id: newId, projectId };
      
      if (!project.comments) {
        project.comments = [];
      }
      
      project.comments.push(newComment);
      this.projectsSubject.next(this.projects);
      
      return of(newComment);
    }
    
    return of(undefined as unknown as Comment);
  }

  updateDeliverableStatus(projectId: number, deliverableId: number, isDelivered: boolean): Observable<boolean> {
    const project = this.projects.find(p => p.id === projectId);
    
    if (project && project.deliverables) {
      const deliverable = project.deliverables.find(d => d.id === deliverableId);
      
      if (deliverable) {
        deliverable.isDelivered = isDelivered;
        this.updateProjectProgress(project);
        this.projectsSubject.next(this.projects);
        
        return of(true);
      }
    }
    
    return of(false);
  }

  private updateProjectProgress(project: Project): void {
    if (project.deliverables && project.deliverables.length > 0) {
      const totalDeliverables = project.deliverables.length;
      const completedDeliverables = project.deliverables.filter(d => d.isDelivered).length;
      
      project.progress = Math.round((completedDeliverables / totalDeliverables) * 100);
      
      // Actualizar el estado basado en el progreso y las fechas
      if (project.progress === 100) {
        project.status = ProjectStatus.FINISHED;
      } else {
        const today = new Date();
        const hasDelayedDeliverables = project.deliverables.some(
          d => !d.isDelivered && new Date(d.dueDate) < today
        );
        
        project.status = hasDelayedDeliverables ? ProjectStatus.DELAYED : ProjectStatus.IN_PROGRESS;
      }
    }
  }

  getFilteredProjects(
    clientFilter?: string,
    statusFilter?: ProjectStatus,
    priorityFilter?: ProjectPriority,
    searchTerm?: string
  ): Observable<Project[]> {
    let filteredProjects = this.projects;
    
    if (clientFilter) {
      filteredProjects = filteredProjects.filter(p => p.client === clientFilter);
    }
    
    if (statusFilter) {
      filteredProjects = filteredProjects.filter(p => p.status === statusFilter);
    }
    
    if (priorityFilter) {
      filteredProjects = filteredProjects.filter(p => p.priority === priorityFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProjects = filteredProjects.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.deliverables?.some(d => d.name.toLowerCase().includes(term))
      );
    }
    
    return of(filteredProjects);
  }

  getClients(): string[] {
    return [...new Set(this.projects.map(p => p.client))];
  }

  getDelayedProjects(): Project[] {
    return this.projects.filter(p => p.status === ProjectStatus.DELAYED);
  }
}

