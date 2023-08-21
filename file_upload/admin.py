from django.contrib import admin
from .models import UploadFile

# Register your models here.
class UploadFileAdmin(admin.ModelAdmin):
    list_display = ('file', 'uploaded_at')

admin.site.register(UploadFile, UploadFileAdmin)