import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectListComponent } from './features/projects/project-list/project-list.component';
import { ProjectDetailComponent } from './features/projects/project-detail/project-detail.component';
import { NotificationsComponent } from './features/notifications/notifications.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'notifications', component: NotificationsComponent },
  // Otras rutas se agregarán a medida que se creen los componentes
  { path: '**', redirectTo: '/dashboard' } // Ruta para manejar rutas no encontradas
];

