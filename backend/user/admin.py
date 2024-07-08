from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import UserAccount


class UserAccountAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {"fields": ("username",  "picture")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
        ("Account status", {"fields": ("is_online", "verified")}),
        ("Role", {"fields": ("role",)}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password1", "password2"),
            },
        ),
    )

    list_display = (
        "id",
        "email",
        "username",
        "is_staff",
        "is_active",
        "role",
        "verified",
        "auth_provider"
    )
    search_fields = ("email", "username",  "auth_provider")
    ordering = ("email",)


admin.site.register(UserAccount, UserAccountAdmin)
