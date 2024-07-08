from django.contrib import admin
from .models import Pet, PetImage


class PetImageInline(admin.TabularInline):
    model = PetImage
    extra = 1


class PetAdmin(admin.ModelAdmin):
    inlines = [PetImageInline]
    list_display = ('name', 'species', 'breed', 'age',
                    'gender', 'size', 'status', 'shelter')
    list_filter = ('species', 'gender', 'size', 'status', 'shelter')
    search_fields = ('name', 'breed', 'description')


admin.site.register(Pet, PetAdmin)
