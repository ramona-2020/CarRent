from django.shortcuts import render

from django.views import View


class HomepageView(View):

    @staticmethod
    def get(request, *args, **kwargs):
        return render(request, 'homepage.html')