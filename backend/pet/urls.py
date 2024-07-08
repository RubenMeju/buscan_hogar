from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import PetViewSet, PetImageViewSet


router = SimpleRouter()
router.register(r'pets', PetViewSet)
router.register(r'pet-images', PetImageViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
