# FreeWorks Panel

Panel de control para freelancers de FreeWorks, una plataforma que conecta freelancers con clientes. Este panel permite a los trabajadores autónomos gestionar sus proyectos, entregables y avances.

## Características

- **Gestión de proyectos**: Visualización y administración de proyectos activos, entregados y pendientes.
- **Seguimiento de progreso**: Cálculo automático del porcentaje de avance de cada proyecto.
- **Gestión de entregables**: Agregar entregables con fecha, descripción y archivos.
- **Comentarios de clientes**: Registro y visualización de comentarios de los clientes.
- **Tablero visual**: Dashboard con resumen visual de todos los proyectos.
- **Filtrado avanzado**: Filtrar proyectos por cliente, estado y prioridad.
- **Sistema de búsqueda**: Buscar por nombre de proyecto o entregable.
- **Notificaciones**: Alertas por entregas atrasadas.

## Tecnologías utilizadas

- **Frontend**: Angular 17
- **Estilos**: SCSS, Bootstrap 5
- **Iconos**: Font Awesome
- **Gráficos**: Chart.js

## Requisitos previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v17 o superior)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone "https://github.com/dbivol1/Solemne2"
   cd freeworks-panel
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
   ```

4. Abrir el navegador en `http://localhost:4200`

## Ejecución con Docker

1. Construir la imagen:
   ```bash
   docker build -t freeworks-panel .
   ```

2. Ejecutar el contenedor:
   ```bash
   docker run -p 4200:80 freeworks-panel
   ```

3. Abrir el navegador en `http://localhost:4200`

## Estructura del proyecto

```
src/
├── app/
│   ├── core/                  # Servicios core, modelos
│   │   ├── services/
│   │   └── models/
│   ├── shared/                # Componentes compartidos
│   │   ├── components/
│   │   ├── directives/
│   │   └── pipes/
│   ├── features/              # Módulos de características
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── deliverables/
│   │   └── notifications/
│   ├── app.ts
│   ├── app.html
│   ├── app.scss
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/                    # Imágenes, iconos, etc.
└── styles.scss                # Estilos globales
```

## Contribución

1. Crear una rama para la nueva funcionalidad:
   ```bash
   git checkout -b feature/nombre-funcionalidad
   ```

2. Realizar cambios y commits:
   ```bash
   git commit -m "Descripción de los cambios"
   ```

3. Enviar la rama al repositorio:
   ```bash
   git push origin feature/nombre-funcionalidad
   ```

4. Crear un Pull Request en GitHub.



