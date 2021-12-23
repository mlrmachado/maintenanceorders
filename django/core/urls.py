from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Oauth
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    # Project URLs
    path('admin/', admin.site.urls),
    path('', include('blog.urls', namespace='blog')),
    # User Management
    path('api/user/', include('users.urls', namespace='users')),
    # maintenanceorders_api Application
    path('api/', include('maintenanceorders_api.urls',
                         namespace='maintenanceorders_api')),

    # API schema and Documentation
    path('project/docs/', include_docs_urls(title='MaintenanceOrdersAPI')),
    path('project/schema', get_schema_view(
        title="MaintenanceOrdersAPI",
        description="API for the MaintenanceOrdersAPI",
        version="1.0.0"
    ), name='openapi-schema'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
