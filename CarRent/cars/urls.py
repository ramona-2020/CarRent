
from django.urls import  path

from CarRent.cars.views import HomepageView

urlpatterns = [
    path('', HomepageView.as_view())
]