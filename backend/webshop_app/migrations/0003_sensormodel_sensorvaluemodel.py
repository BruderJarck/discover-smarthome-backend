# Generated by Django 3.2.9 on 2021-12-11 17:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('webshop_app', '0002_auto_20211205_1146'),
    ]

    operations = [
        migrations.CreateModel(
            name='SensorModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('location', models.CharField(max_length=50)),
                ('name', models.CharField(max_length=50)),
                ('ip_address', models.GenericIPAddressField()),
                ('product', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='webshop_app.productmodel')),
                ('user', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SensorValueModel',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('temp', models.FloatField()),
                ('hum', models.FloatField()),
                ('pres', models.FloatField()),
                ('dt', models.DateTimeField()),
                ('sensor', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='webshop_app.sensormodel')),
            ],
        ),
    ]
