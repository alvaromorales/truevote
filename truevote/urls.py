from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from apps.audit.views import *
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', welcome),
                       url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}),
                       url(r'^logout/$', 'django.contrib.auth.views.logout_then_login'),
                       url(r'^candidates/$',get_candidates),
                       url(r'^audit/$', audit),
                       url(r'^audit/vote/$', cast_vote),
                       url(r'^audit/fix/$', fix_mistake),
                       url(r'^audit/fix/race/$', fix_race),
                       url(r'^audit/restart/$',restart),
                       url(r'^audit/results/', TemplateView.as_view(template_name='resultsauditor.html')),
                       url(r'^help/$', TemplateView.as_view(template_name='helpmenu.html')),
                       url(r'^tutorial/', TemplateView.as_view(template_name='tutorial_index.html')),
)



