from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.RouteList.as_view(), name='api_routes'),
    path('entries/', include('api.routers'))
]
