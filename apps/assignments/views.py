""" assignments/views.py """
from django.shortcuts import render
from apps.assignments.serializers import AssignmentSerializer
from apps.assignments.models import Assignment
from rest_framework import viewsets 


class AssignmentViewSet(viewsets.ModelViewSet):
    """
    A viewset is for get and post request of 
    assignment
    """
    permission_classes = []
    authentication_classes = []
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()
