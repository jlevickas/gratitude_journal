from rest_framework.response import Response
from rest_framework import views
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import RegisterSerializer

# Create your views here.


class RouteList(views.APIView):
    def get(self, request, format=None):
        routes = [
            'auth/register/',
            'auth/token/',
            'auth/token/refresh/',
        ]
        return Response(routes)


class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
