from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.messages.views import SuccessMessageMixin

from .models import UploadFile

# Create your views here.
class CreateUploadFile(SuccessMessageMixin, CreateView):
    model = UploadFile
    fields = ['file']
    template_name = 'file_upload/upload.html'
    success_url = reverse_lazy('file_upload:index')
    
    def get_success_message(self, cleaned_data):
        return 'File uploaded successfully'


def get_files(request):
    files = UploadFile.objects.all()
    for file in files:
        print(file, file.file.url)
    return render(request, 'file_upload/index.html', {'files': files})