from rest_framework import serializers
from .models import Pet, PetImage


class PetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetImage
        fields = '__all__'


class PetSerializer(serializers.ModelSerializer):
    images = PetImageSerializer(many=True, read_only=True)

    class Meta:
        model = Pet
        fields = '__all__'
