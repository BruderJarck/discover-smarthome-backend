# Generated by Django 3.2.9 on 2021-12-11 18:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webshop_app', '0004_auto_20211211_1903'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sensormodel',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='webshop_app.productmodel'),
        ),
    ]
