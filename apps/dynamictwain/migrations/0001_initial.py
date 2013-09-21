# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'TempFormData'
        db.create_table('dynamictwain_tempformdata', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('json_get', self.gf('django.db.models.fields.TextField')()),
            ('json_post', self.gf('django.db.models.fields.TextField')()),
            ('orig_url', self.gf('django.db.models.fields.TextField')()),
            ('scan', self.gf('django.db.models.fields.files.FileField')(max_length=100)),
        ))
        db.send_create_signal('dynamictwain', ['TempFormData'])


    def backwards(self, orm):
        # Deleting model 'TempFormData'
        db.delete_table('dynamictwain_tempformdata')


    models = {
        'dynamictwain.tempformdata': {
            'Meta': {'object_name': 'TempFormData'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'json_get': ('django.db.models.fields.TextField', [], {}),
            'json_post': ('django.db.models.fields.TextField', [], {}),
            'orig_url': ('django.db.models.fields.TextField', [], {}),
            'scan': ('django.db.models.fields.files.FileField', [], {'max_length': '100'})
        }
    }

    complete_apps = ['dynamictwain']