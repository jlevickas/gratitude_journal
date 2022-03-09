from rest_framework.response import Response
from rest_framework import views
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import JournalEntrySerializer

# Create your views here.


class RouteList(views.APIView):
    def get(self, request, format=None):
        routes = [
            'api/token',
            'api/token/refresh',
            'api/entries',
            'api/entries/id ',
        ]
        return Response(routes)


class EntryViewSet(viewsets.ModelViewSet):
    serializer_class = JournalEntrySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(self.request.user.journalentry_set.all())
        return self.request.user.journalentry_set.all()
