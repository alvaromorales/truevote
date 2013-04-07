from django.conf.urls import patterns, include, url
from django.views.generic.simple import direct_to_template

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', direct_to_template, {
            'template':'login.html'
            }),
                       url(r'^audit$', direct_to_template, {
            'template':'index.html'
            }),
                       url(r'^warden$', direct_to_template, {
            'template':'warden.html'
            }),
)
