from django.db import models

class Proyecto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    estado = models.CharField(max_length=50, default="En progreso")
    fecha_inicio = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.nombre
