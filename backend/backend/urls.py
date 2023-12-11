"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
    3. Add a URL to urlpatterns:  path('admin/', admin.site.urls)
    http://127.0.0.1:8000/api/vendors
        "access":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0NTE1ODQ3LCJpYXQiOjE2ODQ1MTU1ND
        csImp0aSI6IjljZGE0NjQ2YWI4MzRjNTVhMGEwZWU4NmZkNDA5MmIwIiwidXNlcl9pZCI6MX0.cwsT_RM-eM4p0MSp18NJpZdsM6ALXkpFjDtKmSzQeSU"
            "refresh": 
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NDYwMjI3OSwiaWF0IjoxNjg0NTE1ODc5LCJqdGkiOiIwNDcwOWYyMTUzYTU0NzcxYTYyNjZhM2YxYmY4OTVkMiIsInVzZXJfaWQiOjF9.STnfN8xYyN8S3s6F8W524Y1_DEAO92aHMnjKi2non2A",
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from django.conf.urls.static import static  
from django.conf import settings

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("main.urls")),
    path("auth/", include("rest_framework.urls")),

    
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)  
