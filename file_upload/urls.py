from django.urls import path
from . import views

app_name = 'file_upload'

urlpatterns = [
    path('', views.CreateUploadFile.as_view(), name='index')
]
