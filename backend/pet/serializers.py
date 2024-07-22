from rest_framework import serializers
from .models import Pet, PetImage


class PetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetImage
        fields = '__all__'


class PetSerializer(serializers.ModelSerializer):
    images = PetImageSerializer(many=True, read_only=True)
    image_files = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Pet
        fields = '__all__'

    def create(self, validated_data):
        image_files = validated_data.pop('image_files', [])
        pet = Pet.objects.create(**validated_data)
        for image in image_files:
            PetImage.objects.create(pet=pet, image=image)
        return pet
