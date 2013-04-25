from django.contrib import admin
from apps.audit.models import UserProfile, Race

admin.site.register(UserProfile)
admin.site.register(Race)
