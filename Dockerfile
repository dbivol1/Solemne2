# Etapa de construcción
FROM node:20 as build

WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción
COPY --from=build /app/dist/freeworks-panel/browser /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]

