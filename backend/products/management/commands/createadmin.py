"""
Create superuser with username=admin and password=admin.
Run: python manage.py createadmin
"""
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()


class Command(BaseCommand):
    help = 'Create admin superuser (username=admin, password=admin)'

    def handle(self, *args, **options):
        username = 'admin'
        password = 'admin'
        if User.objects.filter(username=username).exists():
            self.stdout.write(self.style.WARNING(f'User "{username}" already exists.'))
            return
        User.objects.create_superuser(username=username, email='admin@evergrain.local', password=password)
        self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created with password "{password}".'))
