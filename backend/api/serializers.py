from rest_framework.serializers import ModelSerializer
from .models import JournalEntry


class JournalEntrySerializer(ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = '__all__'
