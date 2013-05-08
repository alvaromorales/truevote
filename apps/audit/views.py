from apps.audit.models import UserProfile, Race
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
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
    up = request.user.profile
    if up.finished_audit():
        return welcome(request)

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
def submit_audit(request):
    up = request.user.profile
    up.counter = F('counter')+1
    up.save()
    return render_to_response('results.html', 
                              {}, 
                              context_instance=RequestContext(request))

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
    data = []
    
    for r in Election.RACES:
        user = []
        for c in Election.CANDIDATES[r]:
            candidate_result = {}
            candidate_result['name'] = c['name']
            candidate_result['votes'] = Race.objects.filter(auditor=up,race_name=r,winner=c['name']).count()
            user.append(candidate_result)
        
        blank_result = {}
        blank_result['name'] = 'Blank'
        blank_result['votes'] = Race.objects.filter(auditor=up,race_name=r,winner='Blank').count()

        writein_result = {}
        writein_result['name'] = 'Write-In'
        writein_result['votes'] = Race.objects.filter(auditor=up,race_name=r,winner='Write-In').count()

        user.append(blank_result)
        user.append(writein_result)

        overall = []
        for c in Election.CANDIDATES[r]:
            candidate_result = {}
            candidate_result['name'] = c['name']
            candidate_result['votes'] = Race.objects.filter(race_name=r,winner=c['name']).count()
            overall.append(candidate_result)
        
        blank_result = {}
        blank_result['name'] = 'Blank'
        blank_result['votes'] = Race.objects.filter(race_name=r,winner='Blank').count()

        writein_result = {}
        writein_result['name'] = 'Write-In'
        writein_result['votes'] = Race.objects.filter(race_name=r,winner='Write-In').count()

        overall.append(blank_result)
        overall.append(writein_result)
            
        race_result = {}
        race_result['raceName'] = r
        race_result['results'] = [user,overall]
        data.append(race_result)
    
    return HttpResponse(json.dumps(data), mimetype='application/json')

def create_user(request):
    if request.method == 'POST':

        user_form = UserCreationForm(request.POST)
        if user_form.is_valid():
            username = user_form.clean_username()
            password = user_form.clean_password2()
            user_form.save()
            user = authenticate(username=username,
                                password=password)

            user.first_name = request.POST[u'first_name']
            user.last_name = request.POST[u'last_name']
            
            user.save()

            login(request, user)
            return welcome(request)
        else:
            return render_to_response('create_user.html', 
                              {
            'form': user_form,
            },
                               context_instance=RequestContext(request))
            
    return render_to_response('create_user.html', 
                              {
            'form': UserCreationForm(),
            },
                              context_instance=RequestContext(request))
