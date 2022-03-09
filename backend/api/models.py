from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    grateful_for = models.TextField(max_length=2000, blank=True)
    looking_forward_to = models.TextField(max_length=2000, blank=True)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        if self.grateful_for != '':
            return self.grateful_for[0:60]
        else:
            return self.looking_forward_to[0:60]
