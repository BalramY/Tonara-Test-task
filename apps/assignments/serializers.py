""" assignments/serializers.py """
from rest_framework import serializers
from apps.assignments.models import Assignment


class AssignmentSerializer(serializers.ModelSerializer):
	"""
	This serializer is for get and post request 
	"""
	class Meta:
		""" Assignment serializer meta class """
		model = Assignment
		fields = '__all__'
