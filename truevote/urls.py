from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', TemplateView.as_view(template_name='login.html')),
                       url(r'^welcome/$', TemplateView.as_view(template_name='welcome.html')),
                       url(r'^audit/$', TemplateView.as_view(template_name='index.html')),
                       url(r'^help/$', TemplateView.as_view(template_name='helpmenu.html')),
                       url(r'^audit/results', TemplateView.as_view(template_name='resultsauditor.html')),
)
