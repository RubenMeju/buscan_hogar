from django.db import models
from django.utils.text import slugify
from shelter.models import Shelter


class Pet(models.Model):
    SPECIES_CHOICES = [
        ('Dog', 'Dog'),
        ('Cat', 'Cat'),
        # Añadir más especies si es necesario
    ]
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]
    SIZE_CHOICES = [
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Large', 'Large'),
    ]
    STATUS_CHOICES = [
        ('Available', 'Available'),
        ('Adopted', 'Adopted'),
    ]

    shelter = models.ForeignKey(
        Shelter, related_name='pets', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    species = models.CharField(max_length=10, choices=SPECIES_CHOICES)
    breed = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES)
    description = models.TextField()
    vaccinated = models.BooleanField(default=False)
    neutered = models.BooleanField(default=False)
    microchipped = models.BooleanField(default=False)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            # Ensure the slug is unique
            original_slug = self.slug
            queryset = Pet.objects.filter(slug=original_slug).exists()
            count = 1
            while queryset:
                self.slug = f"{original_slug}-{count}"
                queryset = Pet.objects.filter(slug=self.slug).exists()
                count += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class PetImage(models.Model):
    pet = models.ForeignKey(Pet, related_name='images',
                            on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media/pets/', blank=True)

    def __str__(self):
        return f"Image for {self.pet.name}"
