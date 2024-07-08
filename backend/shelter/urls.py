from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import ShelterViewSet

router = SimpleRouter()
router.register(r'shelters', ShelterViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
