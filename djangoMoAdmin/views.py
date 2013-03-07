#encoding:utf-8
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.template import RequestContext  # para hacer funcionar {% csrf_token %}

def home(request):
    ctx = {}
    return render_to_response('djangoMoAdmin/index.html', ctx, context_instance=RequestContext(request))
