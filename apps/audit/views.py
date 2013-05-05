from apps.audit.models import UserProfile, Race
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from apps.audit.election import Election
from django.utils import simplejson as json
from django.http import HttpResponse
from django.db.models import F

@login_required()
def welcome(request):
    up = request.user.profile
    
    return render_to_response('welcome.html', 
                              {
            'userprofile':up,
            'remaining_ballots': up.ballots - (up.counter / Election.get_num_races())
            }, 
                              context_instance=RequestContext(request))

@login_required()
def audit(request):
    return render_to_response('index.html', 
                              {}, 
                              context_instance=RequestContext(request))

@login_required()
def get_candidates(request):
    up = request.user.profile
    counter = up.counter
    
    data = {
        'currentRace': {
            'name': Election.get_race_name(counter),
            'candidates': Election.get_candidates(counter)
            },
        'currentRaceNum': Election.get_race_index(counter),
        'currentBallotNum': Election.get_ballot_index(counter),
        'numRaces': Election.get_num_races(),
        'numBallots':up.ballots
        }

    current_ballot = Election.get_ballot_index(counter)

    if data['currentRaceNum'] ==0 and data['currentBallotNum'] != 0:
        data['previousRaces'] = Election.get_previous_winners(list(Race.objects.filter(auditor=up,number__gte=(counter-Election.get_num_races()))))[:Election.get_num_races()]
    else:
        data['previousRaces'] = Election.get_previous_winners(list(Race.objects.filter(auditor=up,number__gte=(max(counter-3,current_ballot*Election.get_num_races())))))[:3]
        
    return HttpResponse(json.dumps(data), mimetype='application/json')


@login_required()
def cast_vote(request):
    up = request.user.profile
    race_name = request.GET['race_name']
    winner = request.GET['winner']

    r = Race(number=up.counter, auditor=up, race_name=race_name,winner=winner)
    r.save()

    up.counter = F('counter')+1
    up.save()
    
    return get_candidates(request)

@login_required()
def fix_mistake(request):
    up = request.user.profile
    counter = up.counter
    current_ballot = Election.get_ballot_index(counter)
    previous_ballot = current_ballot -1

    return render_to_response('fix_mistake.html', 
                              {
            'userprofile':up,
            'current_ballot_num': current_ballot + 1,
            'previous_ballot_num': previous_ballot + 1,
            'previous_ballot': Election.get_previous_winners(list(Race.objects.filter(auditor=up,number__gte=(previous_ballot*Election.get_num_races()),number__lt=(current_ballot*Election.get_num_races())))),
            'current_ballot': Election.get_previous_winners(list(Race.objects.filter(auditor=up,number__gte=(current_ballot*Election.get_num_races()),number__lt=((current_ballot+1)*Election.get_num_races())))),
            }, 
                              context_instance=RequestContext(request))

@login_required()
def fix_race(request):
    up = request.user.profile
    n = request.GET['number']
    Race.objects.filter(auditor=up, number__gte=n).delete()
    up.counter = n
    up.save()
    return HttpResponse('')

@login_required()
def restart(request):
    up = request.user.profile
    Race.objects.filter(auditor=up).delete()
    up.counter = 0
    up.save()
    return welcome(request)
