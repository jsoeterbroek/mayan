from __future__ import absolute_import

from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ImproperlyConfigured

from navigation.api import register_sidebar_template
from navigation.classes import Link
from project_tools.api import register_tool

from .links import (link_formats_list, link_transformation_list,
    link_transformation_create, link_transformation_edit, link_transformation_delete)
from .models import Transformation

register_sidebar_template(['formats_list'], 'converter_file_formats_help.html')

Link.bind_links(['transformation_create', 'transformation_list', 'transformation_edit', 'transformation_delete'], [link_transformation_create], menu_name='sidebar')
Link.bind_links([Transformation], [link_transformation_edit, link_transformation_delete])

register_tool(link_formats_list)