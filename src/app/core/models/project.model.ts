export enum ProjectStatus {
  IN_PROGRESS = 'En progreso',
  FINISHED = 'Finalizado',
  DELAYED = 'Atrasado'
}

export enum ProjectPriority {
  HIGH = 'Alta',
  MEDIUM = 'Media',
  LOW = 'Baja'
}

export interface Project {
  id: number;
  name: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  deliverables?: Deliverable[];
  comments?: Comment[];
}

export interface Deliverable {
  id: number;
  projectId: number;
  name: string;
  description: string;
  dueDate: Date;
  isDelivered: boolean;
  attachments?: string[];
}

export interface Comment {
  id: number;
  projectId: number;
  author: string;
  content: string;
  date: Date;
  isClient: boolean;
}

