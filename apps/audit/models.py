from django.db import models
from django.contrib.auth.models import User
from apps.audit.election import Election

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    ballots = models.PositiveIntegerField(default=5)
    counter = models.PositiveIntegerField(default=0)

    def finished_audit(self):
        return self.counter >= self.ballots*Election.get_num_races()

    def __unicode__(self):
        return self.user.username

class Race(models.Model):
    number = models.PositiveIntegerField()
    auditor = models.ForeignKey(UserProfile)
    race_name = models.CharField(max_length=100)
    winner = models.CharField(max_length=100)

    def __unicode__(self):
        return self.race_name

    class Meta:
        ordering = ['number']
    
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])
