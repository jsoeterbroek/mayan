from __future__ import absolute_import

import re

from django.http import HttpResponseRedirect
from django.conf import settings
from django.contrib.sessions.models import Session
from ..conf.settings import ALLOW_ANONYMOUS_ACCESS

EXEMPT_URLS = [re.compile(settings.LOGIN_URL.lstrip('/'))]
if hasattr(settings, 'LOGIN_EXEMPT_URLS'):
    EXEMPT_URLS += [re.compile(expr) for expr in settings.LOGIN_EXEMPT_URLS]


class LoginRequiredMiddleware:
    """
    Middleware that requires a user to be authenticated to view any page other
    than LOGIN_URL. Exemptions to this requirement can optionally be specified
    in settings via a list of regular expressions in LOGIN_EXEMPT_URLS (which
    you can copy from your urls.py).

    Requires authentication middleware and template context processors to be
    loaded. You'll get an error if they aren't.
    """

    def process_request(self, request):
        if not ALLOW_ANONYMOUS_ACCESS:
            user_is_valid = hasattr(request, 'user')

            assert user_is_valid, (
                "The Login Required middleware "
                "requires authentication middleware to be installed. Edit your "
                "MIDDLEWARE_CLASSES setting to insert "
                "'django.contrib.auth.middlware.AuthenticationMiddleware'. If that doesn't "
                "work, ensure your TEMPLATE_CONTEXT_PROCESSORS setting includes"
                "'django.core.context_processors.auth'."
            )

            session_is_valid = request.user.is_authenticated()
            if '/sources/upload/document/new/interactive/' in request.path:
                # allowing security exception for document upload
                session_is_valid = session_is_valid or self.validate_session(request)

            if not session_is_valid:

                path = request.path_info.lstrip('/')
                if not any(m.match(path) for m in EXEMPT_URLS):
                    return HttpResponseRedirect(settings.LOGIN_URL)

    def validate_session(self, request):
        key = request.COOKIES.get("sessionid")
        return key is not None and (Session.objects.filter(session_key=key).count() == 1)
