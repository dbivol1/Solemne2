from django.db import models

class Proyecto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    estado = models.CharField(max_length=50, default="En progreso")
    fecha_inicio = models.DateField(auto_now_add=True)
    fecha_entrega = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class Entregable(models.Model):
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, related_name='entregables')
    descripcion = models.TextField()
    fecha = models.DateField()
    archivo = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"Entregable de {self.proyecto.nombre} - {self.descripcion[:20]}"

class Comentario(models.Model):
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE, related_name='comentarios')
    texto = models.TextField()
    autor = models.CharField(max_length=100, blank=True)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario en {self.proyecto.nombre} - {self.texto[:30]}"
