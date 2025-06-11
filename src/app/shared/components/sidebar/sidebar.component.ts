import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faTachometerAlt, 
  faProjectDiagram, 
  faClipboardList, 
  faBell, 
  faChartBar,
  faUsers,
  faCog
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  faTachometerAlt = faTachometerAlt;
  faProjectDiagram = faProjectDiagram;
  faClipboardList = faClipboardList;
  faBell = faBell;
  faChartBar = faChartBar;
  faUsers = faUsers;
  faCog = faCog;
  
  collapsed = false;
  
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}

