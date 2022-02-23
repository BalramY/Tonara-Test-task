""" models.py file of accounts module """
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)
from django.utils.translation import gettext_lazy as _
from django.conf import settings


class UserAccountManager(BaseUserManager):
    """
    This is User Account Manager class
    """
    def create_user(self, role, email, password, **kwargs):
        """ This is create user method """

        if not email:
            raise ValueError('user must have an email')

        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)

        user.role = role
        user.set_password(password)
        user.is_active = True
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, password=None):
        """This is create superuser method"""
        user = self.create_user(UserAccount.SUPER_ADMIN, email, password)
        user.first_name = first_name
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.role = UserAccount.SUPER_ADMIN
        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    """
    This is UserAccount model class for
    creating account
    """
    SUPER_ADMIN = 0
    STUDENT = 1

    
    ROLE_TYPES = (
        (SUPER_ADMIN, 'SUPER_ADMIN'),
        (STUDENT, 'STUDENT'),
    )

    role = models.IntegerField(choices=ROLE_TYPES, default=STUDENT)
    email = models.EmailField(max_length=254, unique=True)
    first_name = models.CharField(max_length=150, null=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']
