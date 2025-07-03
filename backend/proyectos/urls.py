from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProyectoViewSet, EntregableViewSet, ComentarioViewSet

router = DefaultRouter()
router.register(r'proyectos', ProyectoViewSet)
router.register(r'entregables', EntregableViewSet)
router.register(r'comentarios', ComentarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
