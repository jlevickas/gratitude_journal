from rest_framework.routers import SimpleRouter
from .views import EntryViewSet

router = SimpleRouter()

router.register('', EntryViewSet, basename='entries')

urlpatterns = router.urls
