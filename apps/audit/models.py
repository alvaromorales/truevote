from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    ballots = models.PositiveIntegerField(default=5)
    counter = models.PositiveIntegerField(default=0)

    def __unicode__(self):
        return self.user.username

class Race(models.Model):
    auditor = models.ForeignKey(UserProfile)
    race_name = models.CharField(max_length=100)
    winner = models.CharField(max_length=100)

    def __unicode__(self):
        return self.race_name
    
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
