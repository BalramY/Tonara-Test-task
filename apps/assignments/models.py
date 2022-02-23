from django.db import models



class Assignment(models.Model):
	"""
	Assignment model
	"""
	title = models.CharField(max_length=255, null=True)
	description = models.TextField(null=True)
	music_genre = models.CharField(max_length=255, null=True)
	daily_practice_time = models.CharField(max_length=255, null=True)
	days = models.CharField(max_length=255, null=True)
	days_practiced = models.CharField(max_length=255, null=True)

	def __str__(self):
		return f'{self.title}'
