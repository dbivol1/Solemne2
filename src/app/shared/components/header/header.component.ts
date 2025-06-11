import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from '../../../core/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faBell = faBell;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  
  showNotifications = false;
  unreadCount$: Observable<number>;
  
  constructor(
    public notificationService: NotificationService
  ) {
    this.unreadCount$ = this.notificationService.getUnreadCount();
  }
  
  ngOnInit(): void {
  }
  
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }
  
  closeNotifications(): void {
    this.showNotifications = false;
  }
  
  markAsRead(id: number): void {
    this.notificationService.markAsRead(id);
  }
  
  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }
}