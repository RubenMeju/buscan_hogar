from django.contrib import admin
from .models import Shelter


class ShelterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'phone', 'email', 'website')
    search_fields = ('name', 'address')


admin.site.register(Shelter, ShelterAdmin)
