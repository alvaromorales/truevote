from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(models.User)
    ballots = models.PositiveIntegerField()
    counter = models.PositiveIntegerField()

class Race(models.Model):
    auditor = models.ForeignKey(UserProfile)
    race_name = models.CharField()
    winner = models.CharField()
    
