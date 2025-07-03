# FreeWorks - Panel de Gestión para Freelancers

FreeWorks es una aplicación web desarrollada como un MVP (Producto Mínimo Viable) que permite a freelancers gestionar sus proyectos, entregables, avances y comentarios de clientes de forma centralizada.

## 🧩 Funcionalidades

- Listado de proyectos activos, finalizados y pendientes.
- Agregado de entregables con fecha, descripción y archivos simulados.
- Visualización del progreso (%) de cada proyecto.
- Control manual del estado del proyecto (En progreso, Finalizado, Atrasado).
- Comentarios del cliente por cada proyecto.
- Tablero resumen de proyectos con estado visual.
- Filtros por cliente, estado y prioridad.
- Búsqueda por nombre del proyecto o entregable.
- Notificaciones por entregas atrasadas.
- Conexión a una API REST con backend en Django.
- Diseño profesional y modular en Angular.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** Angular 19
- **Backend:** Django REST Framework
- **Base de datos:** SQLite (modo desarrollo)
- **Contenerización:** Docker
- **Control de versiones:** Git y GitHub

## 📦 Estructura del Proyecto

Solemne2/
├── backend/ # Proyecto Django (API REST)
│ ├── Dockerfile
│ ├── requirements.txt
│ └── ...
├── frontend/ # Aplicación Angular
│ ├── src/
│ └── ...
└── README.md


## 🚀 Instrucciones para ejecutar

### Frontend

```bash
cd frontend
npm install
ng serve
Abrir en: http://localhost:4200

Backend
bash


cd backend
docker build -t freeworks-backend .
docker run -it -p 8000:8000 freeworks-backend
API disponible en: http://localhost:8000/api/

📌 Notas
Esta aplicación fue desarrollada con fines académicos.

El backend no está preparado para producción (usa servidor de desarrollo de Django).

El almacenamiento de archivos está simulado.

