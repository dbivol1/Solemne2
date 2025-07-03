from rest_framework import serializers
from .models import Proyecto, Entregable, Comentario

class EntregableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entregable
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'

class ProyectoSerializer(serializers.ModelSerializer):
    entregables = EntregableSerializer(many=True, read_only=True)
    comentarios = ComentarioSerializer(many=True, read_only=True)

    class Meta:
        model = Proyecto
        fields = '__all__'
