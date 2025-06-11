import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotificationService, Notification } from '../../core/services/notification.service';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  faBell = faBell;
  faCheck = faCheck;
  faTrash = faTrash;
  
  notifications: Notification[] = [];
  
  constructor(
    private notificationService: NotificationService,
    private projectService: ProjectService
  ) { }
  
  ngOnInit(): void {
    this.loadNotifications();
    // Verificar si hay nuevas notificaciones por entregas atrasadas
    this.notificationService.checkForDelayedProjects();
  }
  
  loadNotifications(): void {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }
  
  markAsRead(id: number): void {
    this.notificationService.markAsRead(id);
  }
  
  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }
  
  getNotificationIcon(type: string): any {
    return faBell;
  }
  
  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
  
  isAllReadDisabled(): boolean {
    return this.notifications.length === 0 || this.notifications.every(n => n.read);
  }
  
  getNotificationClass(notification: Notification): string {
    return 'notification-' + notification.type;
  }
  
  hasProjectId(notification: Notification): boolean {
    return notification.projectId !== undefined && notification.projectId !== null;
  }
  
  getProjectLink(notification: Notification): any[] {
    return ['/projects', notification.projectId];
  }
  
  hasNoNotifications(): boolean {
    return this.notifications.length === 0;
  }
}

