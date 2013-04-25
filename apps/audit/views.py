from apps.audit.models import UserProfile, Race
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

@login_required()
def welcome(request):
    up = request.user.profile
    return render_to_response('welcome.html', 
                              {
            'userprofile':up
            }, 
                              context_instance=RequestContext(request))

@login_required()
def cast_vote(request):
    up = request.user.profile
    # vote
    up.update(counter=F('counter')+1)
    pass
