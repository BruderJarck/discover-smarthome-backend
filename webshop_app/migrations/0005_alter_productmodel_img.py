# Generated by Django 3.2.9 on 2022-01-22 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webshop_app', '0004_alter_userprofile_profile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productmodel',
            name='img',
            field=models.URLField(),
        ),
    ]
