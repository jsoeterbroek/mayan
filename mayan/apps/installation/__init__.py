from __future__ import absolute_import

from south.signals import post_migrate

from project_tools.api import register_tool

from django.db import transaction
from django.db.models.signals import post_save
from django.db.utils import DatabaseError
from django.dispatch import receiver

from .links import installation_details
from .models import Installation
    

@receiver(post_migrate, dispatch_uid='trigger_first_time')
def trigger_first_time(sender, **kwargs):
    if kwargs['app'] == 'installation':
        details = Installation.objects.get()
        details.is_first_run = True
        details.save()


@transaction.commit_on_success
def check_first_run():
    try:
        details = Installation.objects.get()
    except DatabaseError:
        # Avoid database errors when the app tables haven't been created yet
        transaction.rollback()        
    else:
        if details.is_first_run:
            details.submit()


register_tool(installation_details)

check_first_run()