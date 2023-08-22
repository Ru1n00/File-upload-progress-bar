from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

app_name = 'file_upload'

urlpatterns = [
    path('upload/', views.CreateUploadFile.as_view(), name='index'),
    path('files/', views.get_files, name='files'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
