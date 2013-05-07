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

    if Race.objects.filter(auditor=up,number=counter):
        data = {
            'currentRaceNum': Election.get_race_index(up.counter),
            'currentBallotNum': Election.get_ballot_index(up.counter),
            'numRaces': Election.get_num_races(),
            'numBallots':up.ballots
            }

        data['transition'] = True
        data['previousRaces'] = Election.get_previous_winners(list(Race.objects.filter(auditor=up, number__gte=(data['currentBallotNum']*Election.get_num_races()))))

        if counter == up.ballots*Election.get_num_races()-1:
            data['end'] = True
        
        return HttpResponse(json.dumps(data), mimetype='application/json')
    data = {
        'transition': False,
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

    data['previousRaces'] = Election.get_previous_winners(list(Race.objects.filter(auditor=up, number__gte=(data['currentBallotNum']*Election.get_num_races()))))

    return HttpResponse(json.dumps(data), mimetype='application/json')

@login_required()
def cast_vote(request):
    up = request.user.profile
    race_name = request.GET['race_name']
    winner = request.GET['winner']

    r = Race(number=up.counter, auditor=up, race_name=race_name,winner=winner)
    r.save()

    if up.counter%Election.get_num_races() != Election.get_num_races()-1:
        up.counter = F('counter')+1
        up.save()
    
        return get_candidates(request)
    else:
        data = {
            'currentRaceNum': Election.get_race_index(up.counter),
            'currentBallotNum': Election.get_ballot_index(up.counter),
            'numRaces': Election.get_num_races(),
            'numBallots':up.ballots
            }
        data['transition'] = True
        data['previousRaces'] = Election.get_previous_winners(list(Race.objects.filter(auditor=up, number__gte=(data['currentBallotNum']*Election.get_num_races()))))
        
        if up.counter == up.ballots*Election.get_num_races()-1:
            data['end'] = True
        
        return HttpResponse(json.dumps(data), mimetype='application/json')

@login_required()
def next_ballot(request):
    up = request.user.profile
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

@login_required()
def results(request):
    up = request.user.profile
    data = {}
    
    for r in Election.RACES:
        user = {}
        for c in Election.CANDIDATES[r]:
            user[c['name']] = Race.objects.filter(auditor=up,race_name=r,winner=c['name']).count()

        overall = {}
        for c in Election.CANDIDATES[r]:
            overall[c['name']] = Race.objects.filter(race_name=r,winner=c['name']).count()
        
        data[r] = (user,overall)
    
    return HttpResponse(json.dumps(data), mimetype='application/json')
