# Generated by Django 3.2.19 on 2023-05-30 15:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_restuarant_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restuarant',
            name='owner',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='main.restuarantowner'),
        ),
    ]