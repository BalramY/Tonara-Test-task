from django.urls import path
from apps.assignments import views


urlpatterns = [
	path('assignment/', 
		views.AssignmentViewSet.as_view({'post': 'create', 'get': 'list'}), 
		name='assigment_create_list')
]
