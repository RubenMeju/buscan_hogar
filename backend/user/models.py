from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
import uuid
from django.utils import timezone
from djoser.signals import user_registered
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_superuser = True
        user.is_staff = True
        user.role = "Admin"
        user.verified = True
        user.save(using=self._db)

        return user


AUTH_PROVIDERS = {'google': 'google', 'email': 'email'}


class UserAccount(AbstractBaseUser, PermissionsMixin):
    roles = (
        ("customer", "Customer"),
        ("admin", "Admin"),
    )

    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100, unique=False)
    picture = models.ImageField(
        default="media/users/user_default_profile.png",
        upload_to="media/users/pictures/",
        blank=True,
        null=True,
        verbose_name="Picture",
    )

    # first_name = models.CharField(max_length=100)
   # last_name = models.CharField(max_length=100)

    is_online = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    role = models.CharField(max_length=20, choices=roles, default="customer")
    verified = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    auth_provider = models.CharField(
        max_length=255, blank=False,
        null=False, default=AUTH_PROVIDERS.get('email'))

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }
