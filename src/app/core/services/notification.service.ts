import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectService } from './project.service';
import { Project, Deliverable } from '../models/project.model';

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'warning' | 'info' | 'success' | 'danger';
  projectId?: number;
  deliverableId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: Notification[] = [];
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);

  constructor(private projectService: ProjectService) {
    // Inicializar notificaciones basadas en proyectos atrasados
    this.checkForDelayedProjects();
  }

  getNotifications(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }

  getUnreadCount(): Observable<number> {
    const unreadCount = new BehaviorSubject<number>(this.countUnread());
    return unreadCount.asObservable();
  }

  markAsRead(id: number): void {
    this.notifications = this.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(this.notifications);
  }

  markAllAsRead(): void {
    this.notifications = this.notifications.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(this.notifications);
  }

  addNotification(notification: Omit<Notification, 'id'>): void {
    const newId = this.notifications.length > 0 
      ? Math.max(...this.notifications.map(n => n.id)) + 1 
      : 1;
    
    const newNotification: Notification = {
      ...notification,
      id: newId
    };
    
    this.notifications = [newNotification, ...this.notifications];
    this.notificationsSubject.next(this.notifications);
  }

  private countUnread(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  checkForDelayedProjects(): void {
    this.projectService.getProjects().subscribe(projects => {
      const today = new Date();
      
      projects.forEach(project => {
        if (project.deliverables) {
          project.deliverables.forEach(deliverable => {
            const dueDate = new Date(deliverable.dueDate);
            
            // Si el entregable está atrasado y no ha sido entregado
            if (!deliverable.isDelivered && dueDate < today) {
              this.createDelayedDeliverableNotification(project, deliverable);
            }
          });
        }
      });
      
      this.notificationsSubject.next(this.notifications);
    });
  }

  private createDelayedDeliverableNotification(project: Project, deliverable: Deliverable): void {
    // Verificar si ya existe una notificación para este entregable
    const existingNotification = this.notifications.find(
      n => n.projectId === project.id && n.deliverableId === deliverable.id
    );
    
    if (!existingNotification) {
      const daysLate = this.calculateDaysLate(deliverable.dueDate);
      
      this.addNotification({
        title: 'Entregable atrasado',
        message: `El entregable "${deliverable.name}" del proyecto "${project.name}" está atrasado por ${daysLate} días.`,
        date: new Date(),
        read: false,
        type: 'danger',
        projectId: project.id,
        deliverableId: deliverable.id
      });
    }
  }

  private calculateDaysLate(dueDate: Date): number {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = Math.abs(today.getTime() - due.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

