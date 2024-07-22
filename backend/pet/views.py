from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Pet, PetImage
from .serializers import PetSerializer, PetImageSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    parser_classes = [MultiPartParser, FormParser]

    @action(detail=False, methods=['get'], url_path='slug/(?P<slug>[^/.]+)')
    def get_by_slug(self, request, slug=None):
        pet = Pet.objects.filter(slug=slug).first()
        print("el pet", pet)
        if pet:
            print("ebtramos al if pet", pet)
            serializer = PetSerializer(pet)
            return Response(serializer.data)
        return Response({"detail": "Not found."}, status=404)


class PetImageViewSet(viewsets.ModelViewSet):
    queryset = PetImage.objects.all()
    serializer_class = PetImageSerializer
