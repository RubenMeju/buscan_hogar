from djoser.serializers import PasswordResetConfirmSerializer
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from shelter.serializers import ShelterSerializer

User = get_user_model()


class UserSerializer(UserCreateSerializer):
    shelter = ShelterSerializer(read_only=True)

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = "__all__"


class CustomPasswordResetConfirmSerializer(PasswordResetConfirmSerializer):
    def build_password_reset_confirm_url(self, uid, token):
        url = f"?forgot_password_confirm=True&uid={uid}&token={token}"
        return url
