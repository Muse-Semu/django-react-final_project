# Generated by Django 3.2.19 on 2023-06-17 03:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_alter_restuarant_manager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restuarant',
            name='manager',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
