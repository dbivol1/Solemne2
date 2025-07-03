from rest_framework import viewsets
from .models import Proyecto, Entregable, Comentario
from .serializers import ProyectoSerializer, EntregableSerializer, ComentarioSerializer

class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.all()
    serializer_class = ProyectoSerializer

class EntregableViewSet(viewsets.ModelViewSet):
    queryset = Entregable.objects.all()
    serializer_class = EntregableSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
